'use strict';

import Base from '../admin.js';

export default class extends Base {
    init(http) {
        super.init(http);
        this.tactive = "article";
    }
    /**
     * 模型后台管理入口
     * index action
     * @return {Promise} []
     */
    async indexAction(){
        let cate_id = this.get('cate_id') || null;
        let group_id =  this.get('group_id') || 0;
        let sortid = this.get('sortid')||0;
        if(think.isEmpty(cate_id)){
            this.http.error = new Error('该栏目不存在！');
            return think.statusAction(702, this.http);
        }
        //获取面包屑信息
        let nav = await this.model('category').get_parent_category(cate_id);
        this.assign('breadcrumb', nav);
        // 获取分类信息
        let sort = await this.model("category").get_category(cate_id, 'documentsorts');
        if (sort) {
            sort = JSON.parse(sort);
            if(sortid==0){
                sortid=sort.defaultshow;
            }
            let typevar = await this.model("typevar").where({sortid:sortid}).select();
            for (let val of typevar){

                val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
                if(val.option.type == 'select'||val.option.type == 'radio'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=parse_type_attr(val.option.rules.choices);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                    }

                }else if(val.option.type == 'checkbox'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=parse_type_attr(val.option.rules.choices);
                        console.log(val.rules);
                        for(let v of val.rules){
                            v.id = "l>"+v.id
                        }
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        //console.log(val.rules);
                    }
                }else if(val.option.type == 'range'){
                    if(!think.isEmpty(val.option.rules)){
                        let searchtxt = JSON.parse(val.option.rules).searchtxt;
                        let searcharr = []
                        if(!think.isEmpty(searchtxt)){
                            let arr = searchtxt.split(",");
                            let len = arr.length;
                            for (var i=0;i<len;i++)
                            {
                                let obj = {}
                                if (!think.isEmpty(arr[i-1])){
                                    if(i==1){
                                        obj.id = 'd>'+arr[i];
                                        obj.name = '低于'+arr[i]+val.option.unit;
                                        obj.pid=0
                                        searcharr.push(obj);
                                    }else {
                                        obj.id = arr[i-1]+'>'+arr[i];
                                        obj.name = arr[i-1]+"-"+arr[i]+val.option.unit;
                                        obj.pid=0
                                        searcharr.push(obj)
                                    }

                                }

                            }
                            searcharr.push({id:'u>'+arr[len-1],name:'高于'+arr[len-1]+val.option.unit,pid:0})
                        }
                        //console.log(searcharr);
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=searcharr;
                        // val.option.rules.choices = parse_config_attr(val.option.rules.choices);

                    }
                }
            }
            //console.log(typevar);
            this.assign("typevar",typevar);
        }
        //console.log(sort);
        this.assign("sort",sort);
        this.assign('sortid',sortid);
        //获取内容
        // 构建列表数据
        let db = this.model(this.mod.name);
        let map = {}
        if (cate_id) {
            //获取当前分类的所有子栏目
            let subcate = await this.model('category').get_sub_category(cate_id);
            // console.log(subcate);
            subcate.push(cate_id);
            map.category_id = ['IN', subcate];
        }
        if(group_id != 0){
            map.group_id=group_id;
        }
        let nsobj = {};
        if(!think.isEmpty(this.get('sortval'))) {
            let sortval = this.get('sortval').split("|");
            nsobj = {}
            for (let v of sortval) {
                let qarr = v.split("_");
                nsobj[qarr[0]] = qarr[1];
                if(qarr[1] !=0){
                    let vv = qarr[1].split(">");
                    //console.log(vv);
                    if(vv[0]=="d" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["<",vv[1]];
                    }else if(vv[0]=="u" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = [">",vv[1]];
                    }else if(vv[0]=="l" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["like",`%"${vv[1]}"%`];
                    }else if(!think.isEmpty(vv[0])&&!think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["BETWEEN", Number(vv[0]), Number(vv[1])];
                    }else {
                        map["t."+qarr[0]] = qarr[1];
                    }

                }
            }
            this.assign("nsobj",nsobj);

        }
        console.log(map);
        //获取分组
        let  groups = await this.model("category").get_category(cate_id, 'groups');
        if (groups) {
            groups = parse_config_attr(groups);
        }
        this.assign('groups', groups);
        //搜索
        if(this.get("title")){
            map.title=["like","%"+this.get("title")+"%"]
        }
        let list;
        if(!think.isEmpty(this.get('sortval'))){
            list = await db.join({
                table: "type_optionvalue"+sortid,
                join: "left", // 有 left,right,inner 3 个值
                as: "t",
                on: ["id", "tid"]

            }).where(map).order('update_time DESC').page(this.get("page"),20).countSelect();
        }else {
            list = await db.where(map).order('update_time DESC').page(this.get("page"),20).countSelect();
        }

        console.log(list);
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(this.http); //实例化 Adapter
        let page = pages.pages(list);
        this.assign('list', list);
        this.assign('pagerData', page); //分页展示使用
        console.log(map);
        this.meta_title = this.m_cate.title;
        this.assign({
            "navxs": true,
            "name":this.m_cate.name,
        });
        this.assign('group_id', group_id);
        //渲染模版
        return this.modtemp(this.mod.name);
    }

    /**
     * 添加名家
     * @returns {Promise.<void>}
     */
    async addAction(){
        let cate_id = this.get('cate_id') || null;
        let group_id =  this.get('group_id') || 0;
        let sortid = this.get('sortid')||0;
        //权限验证
        await this.admin_priv("add",cate_id);
        // 获取分组定义
        let groups = await this.model("category").get_category(cate_id, 'groups');
        if (groups) {
            groups = parse_config_attr(groups);
        }
        this.assign('groups',groups);
        // 获取分类信息
        let sort = await this.model("category").get_category(cate_id, 'documentsorts');
        if (sort) {
            sort = JSON.parse(sort);
            if(sortid==0){
                sortid=sort.defaultshow;
            }
            let typevar = await this.model("typevar").where({sortid:sortid}).select();
            for (let val of typevar){

                val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
                if(val.option.type == 'select'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=parse_type_attr(val.option.rules.choices);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                    }

                }else if (val.option.type =="radio" || val.option.type =="checkbox"){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                    }
                }else {
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                    }
                }
            }

            this.assign("typevar",typevar);
        }
        //console.log(sort);
        this.assign("sort",sort);
        if(think.isEmpty(cate_id)){
            this.http.error = new Error('该栏目不存在！');
            return think.statusAction(702, this.http);
        }
        //获取面包屑信息
        let nav = await this.model('category').get_parent_category(cate_id);
        this.assign('breadcrumb', nav);

        this.meta_title = "添加"+this.m_cate.title;
        this.assign({
            "navxs": true,
            "name":this.m_cate.name,
        });
        //渲染模版
       return this.modtemp(this.mod.name);
    }

    /**
     * 编辑
     *
     */
  async editAction(){
        let id = this.get("id")||"";
        let sortid = this.get("sortid")||0;
        if(think.isEmpty(id)){
            return this.fail("参数不能为空");
        }
        let db = this.model("author");
        let data = await db.find(id);
        console.log(data);
        //权限验证
        await this.admin_priv("edit",data.category_id);
        let model = await this.model("model").get_model(data.model_id);
        console.log(model);
        // 获取分组定义
        let groups = await this.model("category").get_category(data.category_id, 'groups');
        if (groups) {
            groups = parse_config_attr(groups);
        }
        this.assign('groups',groups);
        // 获取分类信息
        let sort = await this.model("category").get_category(data.category_id, 'documentsorts');
        if (sort) {
            sort = JSON.parse(sort);
            if(sortid !=0){
                data.sort_id=sortid;
            }else if(data.sort_id==0){
                data.sort_id=sort.defaultshow;
            }
            let typevar = await this.model("typevar").where({sortid:data.sort_id}).select();
            for (let val of typevar){

                val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
                if(val.option.type == 'select'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        val.option.value = await this.model("typeoptionvar").where({sortid:data.sort_id,tid:data.id,fid:data.category_id,optionid:val.option.optionid}).getField("value",true)||"";
                    }

                }else if (val.option.type =="radio" || val.option.type =="checkbox"){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        val.option.value = await this.model("typeoptionvar").where({sortid:data.sort_id,tid:data.id,fid:data.category_id,optionid:val.option.optionid}).getField("value",true)||"";
                    }
                }else {
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.value = await this.model("typeoptionvar").where({sortid:data.sort_id,tid:data.id,fid:data.category_id,optionid:val.option.optionid}).getField("value",true)||"";
                    }
                }
            }
             console.log(typevar);
            this.assign("typevar",typevar);

        }
        //console.log(sort);
        this.assign("sort",sort);
        //获取面包屑信息
        let nav = await this.model('category').get_parent_category(data.category_id);
        //console.log(model);
        this.assign('breadcrumb', nav);
        this.meta_title = '编辑' + model.title;
        this.active = "admin/article/index";
        this.assign({
            "navxs": true,
        });
        this.assign('data', data);
        this.assign('model_id', data.model_id);
        this.assign('model', model);
        return this.modtemp(model.name);
   }
    /**
     * 更新或者添加数据
     */
    async updateAction() {
        let data = this.post();
        let res = await this.model('author').updates(data);

        if (res) {
            //行为记录
            if (!res.data.id) {
                await this.model("action").log("add_document", "document", res.id, this.user.uid, this.ip(), this.http.url);
                this.success({name: "添加成功", url: "/mod/admin/index/cate_id/" + res.data.category_id});
            } else {
                this.success({name: "更新成功", url: "/mod/admin/index/cate_id/" + res.data.category_id});
            }

        } else {
            this.fail("操作失败！");
        }


    }

}