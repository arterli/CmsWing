// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
const fs = require('fs');
module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        // 其他额外的操作
        this.tactive = "user";

    }
    /**
     * 后台节点配置的url作为规则存入auth_rule
     * 执行新节点的插入,已有节点的更新,无效规则的删除三项任务
     * @author
     */
    async updaterules() {
        //需要新增的节点必然位于$nodes
        let nodes = await this.returnnodes(false);
        //console.log(nodes);
        let AuthRule = this.model('auth_rule');
        let map = {'module': 'admin', 'type': ['in', [1, 2]]};//status全部取出,以进行更新
        //需要更新和删除的节点必然位于$rules
        let rules = await AuthRule.where(map).order('name').select();
        //构建insert数据
        let data = {};//保存需要插入和更新的新节点

        nodes.forEach(value=> {
            let temp = {};
            temp.name = value.url;
            temp.desc = value.title;
            temp.module = 'admin';
            if (value.pid > 0) {
                temp.type = 1;
            } else {
                temp.type = 2;
            }
            temp.status = 1;
            let url = temp.name + temp.module + temp.type;
            url = url.toLocaleLowerCase();
            data[url] = temp;

        })
        //console.log(rules);
        let update = [];//保存需要更新的节点
        let ids = [];//保存需要删除的节点的id
        let diff = {};
        rules.forEach((rule, i) => {
            let key = rule.name + rule.module + rule.type;
            key = key.toLocaleLowerCase();
            if (!think.isEmpty(data[key])) {//如果数据库中的规则与配置的节点匹配,说明是需要更新的节点
                data[key].id = rule.id;//为需要更新的节点补充id值
                update.push(data[key]);
                delete data[key];
                // console.log(i);
                // rules.splice(i,1);
                delete rule.condition;
                delete rule.pid;
                //console.log(rule);
                diff[rule.id] = rule;
            } else {
                if (rule.status == 1) {
                    ids.push(rule.id);
                }
            }
        });

        // console.log(update);
        //console.log(rules);
        // console.log(diff);
        //console.log(data);
        if (!think.isEmpty(update)) {
            update.forEach(row=> {
                //console.log(isObjectValueEqual(row, diff[row.id]))
               // console.log(row)
                //console.log(diff[row.id])
                if (!isObjectValueEqual(row, diff[row.id])) {

                    AuthRule.where({id: row.id}).update(row);
                    //console.log(row);
                }
            })
        }
        //console.log(ids);
        if (!think.isEmpty(ids)) {
            AuthRule.where({id: ['IN', ids]}).update({'status': -1});
            //删除规则是否需要从每个用户组的访问授权表中移除该规则?
        }
        // console.log(data);
        if (!think.isEmpty(data)) {
            AuthRule.addMany(obj_values(data));
        }

        return true;
    }


    /**
     * 用户分组管理首页
     * @returns {*}
     */
   async indexAction() {
        let list = await this.model("member_group").order("sort ASC").select();
        for(let v of list){
            v.count=await this.model('member').where({groupid:v.groupid,status:1}).count('id');
        }
        this.assign("list",list);
        this.meta_title = "会员组管理";
        return this.display();
    }

    /**
     * 添加会员组
     */
    async adduserAction(){
        if(this.isPost){
            let data = this.post();
            let add = await this.model("member_group").add(data);

                if (add) {
                    return this.success({ name: "添加成功！",url:"/admin/auth/index"});
                } else {
                    return this.fail("添加失败！");
                }

        }else {
            this.meta_title="添加会员组";
            this.active="admin/auth/index";
            return this.display();
        }

    }
    /**
     * 编辑会员组
     */
    async edituserAction(){
        if(this.isPost){
            let data = this.post();
            data.allowpost= data.allowpost||0;
            data.allowpostverify= data.allowpostverify||0;
            data.allowupgrade= data.allowupgrade||0;
            data.allowsendmessage= data.allowsendmessage||0;
            data.allowattachment= data.allowattachment||0;
            data.allowsearch= data.allowsearch||0;
            let update = await this.model("member_group").where({groupid:data.groupid}).update(data);

            if (update) {
                return this.success({ name: "编辑成功！",url:"/admin/auth/index"});
            } else {
                return this.fail("编辑失败！");
            }

        }else {
            let info = await this.model("member_group").where({groupid:this.get("id")}).find();
            this.assign("info",info);
            this.meta_title="编辑会员组";
            this.active="admin/auth/index";
            return this.display();
        }

    }
    /**
     * 删除会员组
     */
    async deluserAction(){
        if(this.isPost){
            let ids = this.post("ids");
            let dels = await this.model('member_group').where({groupid:['IN',ids]}).delete();
            if(dels){
                return this.success({ name: "删除成功！"});
            }else {
                return this.fail("删除失败！");
            }
        }else {
            let id = this.get("id");
            let issystem = await this.model('member_group').where({groupid:id}).getField("issystem",true);
            if(issystem>0){
                return this.fail("系统组，不能删除！")
            }
            let del = await this.model('member_group').where({groupid:id}).delete();
            if(del){
                return this.success({ name: "删除成功！"});
            }else {
                return this.fail("删除失败！");
            }
        }

    }
    /**
     * 排序
     */
    async sortAction() {
     if(this.para('type')==1){
         await super.sortAction('member_group','groupid');
     }else {
         await super.sortAction('auth_role','id');
     }
    }
    /**
     * 管理角色管理首页
     * @returns {*}
     */
   async adminAction() {
        let list = await this.model('auth_role').order("id ASC").select();
        this.assign({
            "datatables": true,
            "tactive": "/admin/user",
            "selfjs": "auth",
            "list":list
        })
        this.active = "admin/auth/index";
        this.meta_title = "权限管理";
        return this.display();
    }
    /**
     * role
     * 权限管理首页ajax角色列表
     * @returns {Promise|*}
     */
    async roleAction() {
        let gets = this.get();
        let draw = gets.draw;
        let res = await this.model('auth_role').field("id,desc,status,description").order("id ASC").select();
        let data = {
            "draw": draw,
            "data": res
        }
        //console.log(data);
        return this.json(data);
    }

    async roleeditAction() {
        if (this.isAjax("post")) {
            let id = this.post("id");
            let desc = this.post("desc");
            let description = this.post("description");
            let data = await this.model('auth_role').where({id: id}).update({desc: desc, description: description});
            if(data){
                return this.success({ name: "修改成功！"});
            }else {
                return this.fail("修改失败！");
            }
        } else {
            let id = this.get("id");
            let res = await this.model('auth_role').where({id: id}).find();
            this.assign({
                data: res
            })
            return this.display();
        }
    }

    async roleaddAction() {
        if(this.isPost){
            let data = this.post();
            //console.log(1111111111111111)
            let res = await this.model('auth_role').add(data);

            if(res){
                return this.success({ name: "添加成功！"});
            }else {
                return this.fail("添加失败！");
            }
        }else {
            return this.display();
        }

    }

    /**
     * roldel
     * 角色删除
     * @returns {Promise|*}
     */
    async roledelAction() {
        let id = this.para("ids");
        //console.log(id);
        if(think.isEmpty(id)){
            return this.fail("参数不能为空！")
        }
        let res = await this.model('auth_role').where({id: ['IN',id]}).delete();
        if(res){
            return this.success({ name: "删除成功！"});
        }else {
            return this.fail("删除失败！");
        }
    }

    /**
     * 权限列表
     * @returns {*}
     */
    async accessAction() {
        await this.updaterules();//更新权限节点
        let auth_role = await this.model('auth_role').where({status:["!=",0],module :"admin",'type':1}).field('id,desc,rule_ids').select();
        //let node_list = await this.returnnodes();
        //let map       = {module:"admin",type:2,status:1};
        //let main_rules= await this.model('auth_rule').where(map).field("name,id").select();
        //let nap       = {module:"admin",type:1,status:1};
        //let child_rules = await this.model('auth_rule').where(nap).field('name,id').select();
        let this_role = {};
            auth_role.forEach(role=>{
                if(role.id==this.get("id")){
                    this_role = role;
                }
            })
        //console.log(node_list);
        this.active="admin/auth/index";
        this.meta_title="权限管理"
        this.assign({
            "tactive": "/admin/user",
            "selfjs": "auth",
            "thisid":this.get("id"),
            "auth_role":auth_role,
            "this_role":this_role
        })
        return this.display();
    }


    async accessdataAction() {
        await this.updaterules();//更新权限节点
        let auth_role = await this.model('auth_role').where({status:["!=",0],module :"admin",'type':1}).field('id,desc,rule_ids').select();
        let node_list = await this.returnnodes();
        let map       = {module:"admin",type:['IN',[1,2]],status:1};
        let main_rules=await this.model('auth_rule').where(map).field("name,id").select();
        //let nap       = {module:"admin",type:1,status:1};
        //let child_rules =await this.model('auth_rule').where(nap).field('name,id').select();
        let this_role = {};
        auth_role.forEach(role=>{
            if(role.id==this.post("id")){
                this_role = role;
            }
        })
        let m_rules = {}
        main_rules.forEach(v=>{
            let obj = {}
             obj[v.name]=v.id;
            Object.assign(m_rules,obj)
        })
        let data = {
            "main_rules":m_rules,
            "node_list":node_list,
            "this_role":this_role
        }
        return this.json(data);
    }

    /**
     * 栏目权限
     */
    async cateprivAction(){
        if(this.isPost){
            let data = this.post();
            //构造权限
            let priv =[]
            if(!think.isEmpty(data.priv_roleid)){
                if(think.isArray(data.priv_roleid)){
                    //构造 角色权限
                    for (let v of data.priv_roleid){
                        let arr = v.split(",")
                        let obj = {};
                        obj.catid = arr[1];
                        obj.roleid= arr[2];
                        obj.action = arr[0];
                        obj.is_admin = 1;
                        priv.push(obj)
                    }
                }else {
                    let arr = (data.priv_roleid).split(",")
                    priv.push({ catid:arr[1],  roleid: arr[2], action: arr[0], is_admin: 1 })
                }

            }
            await this.model("category_priv").delete({where:{is_admin:1,roleid:data.roleid}});
            if(!think.isEmpty(priv)){
                await this.model("category_priv").addMany(priv)
            }
            think.cache("all_priv",null);//栏目权限缓存
           return this.success({name:"修改成功！"})
        }else {
            let tree = await this.model('category').gettree(0,"id,name,title,sort,pid,allow_publish,status,model,mold,isapp");
            this.assign({
                "tactive": "/admin/user",
                "tree":tree
            })
            this.active = "admin/auth/index";
            this.meta_title = "栏目权限";
            return this.display();
        }

    }

    /**
     * 成员管理
     */
    async userlistAction(){
        let id = this.get("id");
        let userid = await this.model("auth_user_role").where({role_id:id}).getField("user_id");
        let userdata;
        if(!think.isEmpty(userid)){
            userdata=await this.model("member").where({id:["IN",userid]}).select();
            for(let v of userdata){
                let role_id = await this.model("auth_user_role").where({user_id:v.id}).getField("role_id",true);
                v.role = await this.model("auth_role").where({id:role_id}).getField("desc",true)
            }
        }

        this.assign("userlist",userdata);
        this.meta_title = "成员管理";
        this.active = "admin/auth/index";
        return this.display();
    }
    async testAction() {

        let ss = await this.updaterules();
        //console.log(ss);
        this.end();
    }

    /**
     * 管理员用户组数据写入/更新
     *
     */
    async writeroleAction(){
        let map={};
        map.rule_ids = this.post("rules");
        if(think.isArray(map.rule_ids)){
        map.rule_ids = map.rule_ids.sort(function(a,b){return a-b}).join(",");
        }
        map.module = "admin";
        map.type = 1;
        let id = this.post("id");
        let role = this.model("auth_role");
            await role.where({id:id}).update(map);
            return this.success({name:"更新成功"});

    }

    /**
     * 改变角色状态
     * @returns {Promise|*}
     */
    async chstaAction(){
        let role = this.model("auth_role");
        let res = await role.update(this.get());
        if(res){
            return this.json(res);
        }
    }
}