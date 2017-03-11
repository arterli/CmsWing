// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    init(http) {
        super.init(http);
    }

    async __before() {
        //登陆验证
        let is_login = await this.islogin();
        if (!is_login) {
           return this.redirect('/admin/public/signin');
        }

        //用户信息
        this.user = await this.session('userInfo');
        this.assign("userinfo", this.user);
        this.roleid = await this.model("member").where({id:this.user.uid}).getField('groupid', true);
        //网站配置
        this.setup = await this.model("setup").getset();
        // console.log(this.setup);
        this.is_admin = await this.isadmin();
        //后台菜单
        this.adminmenu = await this.model('menu').getallmenu(this.user.uid,this.is_admin);
        //console.log(this.adminmenu);
        this.assign("setup", this.setup);
        //菜单当前状态

        /**
         * 权限验证超级管理员
         */
        //let url = `${this.http.module}/${this.http.controller}/${think.sep+this.http.action}`;
        //console.log(url);

        //console.log(is_admin);
        let url = `${this.http.module}/${this.http.controller}/${this.http.action}`;
        //console.log(url);
        if (!this.is_admin) {
            let Auth = think.adapter("auth", "rbac");
            let auth = new Auth(this.user.uid);
            let res = await auth.check(url);
            if (!res) {
                //return this.fail('未授权访问!');
                this.http.error = new Error('未授权访问!');
                return think.statusAction(702, this.http);
            }
        }

        //console.log(this.user.uid);
        //this.active = this.http.url.slice(1),
            // console.log(this.active);
            this.active =this.http.module+"/"+this.http.controller+"/"+this.http.action;
            //think.log(this.active);
        //后台提示
        //审核提示
        let notifications ={};
        notifications.count = 0;
        notifications.data = [];
        let approval = await this.model("approval").count();
        if(approval>0){
            notifications.count = notifications.count+Number(approval);
            notifications.data.push({type:"approval",info:`有 ${approval} 条内容待审核`,url:"/admin/approval/index",ico:"fa-umbrella"});
        }

        //console.log(notifications);
        this.assign({
                "navxs": false,
                "bg": "bg-black",
                "notifications":notifications
            })
    }

    /**
     * 判断是否登录
     * @returns {boolean}
     */
    async islogin() {
        //判断是否登录
        let user = await this.session('userInfo');
        let res = think.isEmpty(user) ? false : user.uid;
        return res;

    }

    /**
     * 检查当前用户是否为管理员
     * @param uid
     * @returns {*|boolean}
     */
    async isadmin(uid) {
        uid = uid || null;
        uid = think.isEmpty(uid) ? await this.islogin() : uid;
        return uid && (in_array(parseInt(uid), this.config('user_administrator')));
    }
    /**
     * 对数据表中的单行或多行记录执行修改 GET参数id为数字或逗号分隔的数字
     *
     * @param {String} model 模型名称,供M函数使用的参数
     * @param {Object}  data  修改的数据
     * @param {Object}  where 查询时的where()方法的参数
     * @param {Object}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                      url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
    async editRow(model, data, where, msg) {
        let id = this.param('id');
        id = think.isArray(id) ? id : id;
        //如存在id字段，则加入该条件
        let fields = this.model(model).getSchema();
        if (in_array('id', fields) && !think.isEmpty(id)) {
            where = think.extend({ 'id': ['IN', id] }, where);
        }
        msg = think.extend({ 'success': '操作成功！', 'error': '操作失败！', 'url': '', 'ajax': this.isAjax() }, msg);
        let res = await this.model(model).where(where).update(data);
        if (res) {
            switch (model){
                case 'channel'://更新频道缓存信息
                    update_cache("channel")//更新频道缓存信息
                    res = true;
                    msg = "更新导航缓存成功！";
                    break;
                case 'category'://更新全站分类缓存
                    update_cache("category")//更新栏目缓存
                    res = true;
                    msg = "更新栏目缓存成功！";
                    break;
            }
            this.success({ name: msg.success, url: msg.url });
        } else {
            this.fail(msg.error, msg.url);
        }
    }

    /**
     * 禁用条目
     * @param {String} model 模型名称,供D函数使用的参数
     * @param {Object}  where 查询时的 where()方法的参数
     * @param {Object}  msg   执行正确和错误的消息,可以设置四个元素 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
    async forbid(model, where, msg) {
        where = where || {}, msg = msg || { 'success': '状态禁用成功！', 'error': '状态禁用失败！' };
        let data = { 'status': 0 };
        await this.editRow(model, data, where, msg);
    }

    /**
     * 恢复条目
     * @param {String} model 模型名称,供D函数使用的参数
     * @param {Object}  where 查询时的where()方法的参数
     * @param {Object}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
    async resume(model, where, msg) {
        where = where || {}, msg = msg || { 'success': '状态恢复成功！', 'error': '状态恢复失败！' };
        let data = { 'status': 1 };
        await this.editRow(model, data, where, msg);
    }

    /**
     * 还原条目
     * @param {string} model 模型名称,供D函数使用的参数
     * @param {array}  where 查询时的where()方法的参数
     * @param {array}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     * @author arterli <arterli@qq.com>
     */
    async restore(model, where, msg) {
        where = where || {}, msg = msg || { 'success': '状态还原成功！', 'error': '状态还原失败！' };
        let data = { 'status': 1 };
        where = think.extend({ 'status': -1 }, where);
        await this.editRow(model, data, where, msg);
    }

    /**
     * 条目假删除
     * @param {string} model 模型名称,供D函数使用的参数
     * @param {array}  where 查询时的where()方法的参数
     * @param {array} msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
    async delete(model, where, msg) {
        where = where || {}, msg = msg || { 'success': '删除成功！', 'error': '删除失败！' };
        let data = { 'status': -1 };
        await this.editRow(model, data, where, msg);
    }

    /**
     * 设置一条或者多条数据的状态
     */
    async setstatusAction(self, model,pk="id") {
        if(think.isEmpty(this.param('model'))){
            model = model || this.http.controller;
        }else {
            model = this.param('model');
        }
        let ids = this.param('ids');
        let status = this.param('status');
        status = parseInt(status);
        if (think.isEmpty(ids)) {
            this.fail("请选择要操作的数据");
        }
        let map = {};
        if(!think.isEmpty(this.param('pk'))){
            pk=this.param('pk');
        }
         map[pk] = ['IN', ids];
        //let get = this.get();
        //this.end(status);
        switch (status) {
            case -1:
                await this.delete(model, map, { 'success': '删除成功', 'error': '删除失败' });
                break;
            case 0:
                await this.forbid(model, map, { 'success': '禁用成功', 'error': '禁用失败' });
                break;
            case 1:
                await this.resume(model, map, { 'success': '启用成功', 'error': '启用失败' });
                break;
            default:
                this.fail('参数错误');
                break;
        }

    }

    /**
     * 排序
     */
   async sortAction(self,model,id='id'){
    model = model||this.http.controller;
    let param = this.param();
        let sort = JSON.parse(param.sort);
       let data =[]
       for(let v of sort){
           let map={}
           map[id]=v.id;
           map.sort =v.sort;
           data.push(map)
       }
        let res = await this.model(model).updateMany(data);
        if (res>0) {
            //更新缓存
            switch (model){
                case 'channel'://更新频道缓存信息
                    update_cache("channel")//更新频道缓存信息
                    break;
                case 'category'://更新全站分类缓存
                    update_cache("category")//更新栏目缓存
                    break;
            }
           return this.success({ name: "更新排序成功！"});
        } else {
           return this.fail("排序失败！");
        }
    }
    async puliccacheAction(self,model){
        let type = this.param('type');
        if(think.isEmpty(type)){
            type = model||this.http.controller;
        }
        let res = false;
        let msg = "未知错误！";
        switch (type){
            case 'channel'://更新频道缓存信息
                update_cache("channel")//更新频道缓存信息
                res = true;
                msg = "更新导航缓存成功！";
                break;
            case 'category'://更新全站分类缓存
                update_cache("category")//更新栏目缓存
                res = true;
                msg = "更新栏目缓存成功！";
                break;
        }
        if(res){
            return this.success({ name: msg});
        }else {
            return this.fail(msg)
        }

    }
    /**
     * 返回后台节点数据
     * @param {boolean} tree    是否返回多维数组结构(生成菜单时用到),为false返回一维数组(生成权限节点时用到)
     * @retrun {array}
     *
     * 注意,返回的主菜单节点数组中有'controller'元素,以供区分子节点和主节点
     *
     * @author
     */
    async returnnodes(tree) {
        tree = tree || true;
        let http = this.http;
        //let modelname = http.module;
        let tree_nodes = [];
        if (tree && !think.isEmpty(tree_nodes)) {
            return tree_nodes;
        }
        let nodes;
        if (tree) {
            var list = await this.model('menu').field('id,pid,title,url,tip,hide').order('sort asc').select();
            nodes = get_children(list, 0);
        } else {
            nodes = await this.model('menu').field('title,url,tip,pid').order('sort asc').select();

        }
        tree_nodes = nodes;
        return nodes;
    }

    /**
     * 处理文档列表显示
     * @param {array} list 列表数据
     * @param {integer} model_id 模型id
     */
    async parseDocumentList(list, model_id) {
        model_id = model_id || 1;
        let attrList = await this.model('attribute').get_model_attribute(model_id, false, 'id,name,type,extra');
        //attrList=attrList[model_id];
        //this.end(attrList);
        // console.log(attrList);
        if (think.isArray(list)) {
            list.forEach((data, k) => {
                //console.log(data);
                for (let key in data) {
                    //console.log(key)
                    if (!think.isEmpty(attrList[key])) {
                        let extra = attrList[key]['extra'];
                        let type = attrList[key]['type'];
                        //console.log(extra);
                        if ('select' == type || 'checkbox' == type || 'radio' == type || 'bool' == type) {
                            // 枚举/多选/单选/布尔型
                            let options = parse_config_attr(extra);
                            let oparr = Object.keys(options);
                            if (options && in_array(data[key], oparr)) {
                                data[key] = options[data[key]];
                            }
                        } else if ('date' == type) { // 日期型
                            data[key] = dateformat('Y-m-d', data[key]);
                        } else if ('datetime' == type) { // 时间型
                            data[key] = dateformat('Y-m-d H:i', data[key]);
                        } else if ('pics' === type) {
                            data[key] = `<span class="thumb-sm"><img alt="..." src="${data[key]}" class="img-responsive img-thumbnail"></span>`;
                        }
                    }
                }
                data.model_id = model_id;
                list[k] = data;
            })
            //console.log(222)
            return list;
        }
    }
    /**
     * 后台栏目权限验证方法
     * await this.admin_priv("init",cid,error) 查看
     * @param ac //init:查看,add:添加,edit:编辑,delete:删除,listorder:排序,push:推送,move:移动，examine：审核，disable：禁用
     * @param cid //栏目id
     * @param error //错误提示
     * @returns {PreventPromise}
     */
    async admin_priv(ac,cid,error="您所在的用户组,禁止本操作！"){
        if(!this.is_admin){
            //访问控制
            let priv = await this.model("category_priv").priv(cid,this.roleid,ac,1);
            if(!priv){
                this.http.error = new Error(error);
                return think.statusAction(702, this.http);
            }
        }

    }
}
