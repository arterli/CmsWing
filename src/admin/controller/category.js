// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

    init(http){
        super.init(http);
        this.db = this.model('category');
        this.tactive = "article";
    }
    async indexAction(){

        //auto render template file index_index.html
         let tree = await this.db.gettree(0,"id,name,title,sort,pid,allow_publish,status");
        //console.log(tree)
         this.assign("list",tree)
         this.meta_title = "栏目管理";
        
        return this.display();

    }
    async gettreeAction(){
        let tree = await this.db.gettree(0,"id,name,title,sort,pid,allow_publish,status");
        return this.json(tree);
    }

    /**
     * 添加栏目
     */
    async addAction(){
        if(this.isPost()){
            let data = this.post();
            data.status = 1;
            console.log(data);
            if(!think.isEmpty(data.name)){
                let check = await this.model("category").where({name:data.name,pid:data.pid}).find();
                if(!think.isEmpty(check)){
                    return this.fail("同节点下,分类标示不能重复");
                }
            }
            let res = await this.model("category").updates(data);
            if(res){
                this.success({name:"新增成功！",url:"/admin/category/index"});
            }else {
                this.fail("更新失败！");
            }
        }else{
            let sortid = await this.model("typevar").getField("sortid");
            let type;
            if(!think.isEmpty(sortid)){
                sortid = unique(sortid);
                console.log(sortid);
                //获取分类信息
                type= await this.model("type").where({typeid:['IN',sortid]}).order('displayorder ASC').select();
            }

            this.assign("typelist",type);
            //获取模型信息；
            let model = await this.model("model").get_document_model();
            //console.log(obj_values(model));
            this.assign("models",obj_values(model));
            //获取运行的文档类型
            this.active="admin/category/index";
            this.action = "/admin/category/add";
            //获取模版列表
            let temp = await this.model("temp").where({type:1}).select();
            //封面模版
            let template_index =[]
            for(let v of temp){
                let obj = {}
                let action = v.action.split("_")
                //console.log(action[1]);
                if(action[0]=='index' && action[1] != undefined && v.controller=='topic'){
                    obj.name=v.name;
                    obj.action=action[1]+this.config("view.file_ext");
                    template_index.push(obj);
                }

            }
            //列表模版
            let template_lists =[]
            for(let v of temp){
              let obj = {}
                let action = v.action.split("_");
                //console.log(action[1]);
                if(action[0]=='list' && action[1] != undefined && v.controller=='topic'){
                    obj.name=v.name;
                    obj.action=action[1]+this.config("view.file_ext");
                    template_lists.push(obj);
                }

            }
            //详情页模版
            let template_detail =[];
            for(let v of temp){
                let obj ={};
                let action = v.action.split("_");
                if(action[0]=='detail' && action[1] != undefined && v.controller=='topic'){
                    obj.name=v.name;
                    obj.action=action[1]+this.config("view.file_ext");
                    template_detail.push(obj);
                }
            }
            this.assign({
                template_lists:template_lists,
                template_detail:template_detail,
                template_index:template_index
            })
            //template_lists
            this.meta_title = "添加分类"
            return this.display();
        }

    }

    /**编辑分类
     *
     */
    async editAction(){
       let category = this.model("category");
        if(this.isPost()){
            let data = this.post();
            data.status = 1;
            console.log(data);
            //检查同节点下分类标示是否重复
            if(!think.isEmpty(data.name)){
             let check = await this.model("category").where({id:["!=",data.id],name:data.name,pid:data.pid}).find();
                if(!think.isEmpty(check)){
                    return this.fail("同节点下,分类标示不能重复");
                }
            }
            let res = await this.model("category").updates(data);
            if(res){
                this.success({name:"更新成功！",url:"/admin/category/index"});
            }else {
                this.fail("更新失败！");
            }
        }else {
          let id = this.get("cid");
           //console.log(id);
            //获取分类信息
            let info = await category.find(id);
            this.assign("info",info);
            console.log(info);
            if(!think.isEmpty(info.documentsorts)){
                let types = JSON.parse(info.documentsorts);
                let typeobj = {};
                for(let val of types.types){
                    typeobj[val.enable]=val
                }
                this.assign("typeobj",typeobj)
            }

            let sortid = await this.model("typevar").getField("sortid");
            let type;
            if(!think.isEmpty(sortid)){
                sortid = unique(sortid);
                console.log(sortid);
                //获取分类信息
                type= await this.model("type").where({typeid:['IN',sortid]}).order('displayorder ASC').select();
            }

            this.assign("typelist",type);
            //获取模型信息；
            let model = await this.model("model").get_document_model();
            //console.log(obj_values(model));
            this.assign("models",obj_values(model));
            this.active="admin/category/index";
                this.action = "/admin/category/edit";
                this.meta_title = "编辑栏目";
            //获取模版列表
            let temp = await this.model("temp").where({type:1}).select();
            //封面模版
            let template_index =[]
            for(let v of temp){
                let obj = {}
                let action = v.action.split("_")
                //console.log(action[1]);
                if(action[0]=='index' && action[1] != undefined && v.controller=='topic'){
                    obj.name=v.name;
                    obj.action=action[1]+this.config("view.file_ext");
                    template_index.push(obj);
                }

            }
            //列表模版
            let template_lists =[]
            for(let v of temp){
                let obj = {}
                let action = v.action.split("_")
                //console.log(action[1]);
                if(action[0]=='list' && action[1] != undefined && v.controller=='topic'){
                    obj.name=v.name;
                    obj.action=action[1]+this.config("view.file_ext");
                    template_lists.push(obj);
                }

            }
            //详情页模版
            let template_detail =[];
            for(let v of temp){
                let obj ={};
                let action = v.action.split("_");
                if(action[0]=='detail' && action[1] != undefined && v.controller=='topic'){
                    obj.name=v.name;
                    obj.action=action[1]+this.config("view.file_ext");
                    template_detail.push(obj);
                }
            }
            this.assign({
                template_lists:template_lists,
                template_detail:template_detail,
                template_index:template_index
            })
           return this.display();
        }
    }
    //删除栏目
    async delAction(){
        //let id
    }
    //移动栏目
    async moveAction(){
        if(this.isPost()){
        let data = this.post();
            console.log(data);
            //检查源栏目是否 跟目标栏目重复
            if(data.source == data.target){
                return this.fail("源栏目不能与目标栏目重复！")
            }
            let source = await this.model("category").find(data.source);
            let target = await this.model("category").find(data.target);
          //获取栏目模型信息
            console.log(target);
            let s_model_id=[];
            if(!think.isEmpty(source.model)){
                s_model_id = source.model.split(",");
            }
            let t_model_id=[];
            if(!think.isEmpty(target.model)){
                t_model_id = target.model.split(",");
            }
            let ntarget=target;
            //检查源栏目与目标栏目的模型，如果相等，直接复制，如果不相等合并。
            if(!a2a(s_model_id,t_model_id)){
                ntarget.model = unique(t_model_id.concat(s_model_id)).sort().join(",")
            };
            //检查源栏目是否有分类信息和分组，如果有跳转到处理页面
            // if(think.isEmpty(target.groups) && think.isEmpty(target.documentsorts)) {//判断目标栏目是否有设置分组
            //     if (!think.isEmpty(source.groups)) {
            //         ntarget.groups = source.groups
            //     }
            //     if (!think.isEmpty(source.documentsorts)) {
            //         ntarget.documentsorts = source.documentsorts
            //     }
            //     //console.log(ntarget);
            //     this.model("category").update(ntarget);//复制栏目信息
            //     //更新栏目缓存
            //     think.cache("sys_category_list",null);
            //     think.cache("all_category",null);
            //     this.model("document").where({category_id: source.id}).update({category_id: ntarget.id});//移动文章
            //     //如果存在分类信息移动分类信息内容
            //     if(!think.isEmpty(source.documentsorts)){
            //         let documentsorts = JSON.parse(source.documentsorts);
            //         if(!think.isEmpty(documentsorts.types)){
            //             for(let v of documentsorts.types){
            //                 this.model("type_optionvalue"+v.enable).where({fid: source.id}).update({fid: ntarget.id});
            //                 this.model("typeoptionvar").where({fid: source.id,sortid:v.enable}).update({fid: ntarget.id});
            //             }
            //         }
            //     }
            //     return this.success({name: "成功！"})
            // }else {
                if((!think.isEmpty(source.groups) && source.groups != target.groups && !think.isEmpty(target.groups)) || (!think.isEmpty(source.documentsorts) && source.documentsorts != target.documentsorts && !think.isEmpty(target.documentsorts))){
                    //如果源栏目和目标栏目都有分类信息和分组，并且不相等，跳转配置页面
                    console.log(111111)
                }else {
                    console.log(2222222);
                    if (!think.isEmpty(source.groups) && think.isEmpty(target.groups)) {
                        ntarget.groups = source.groups
                    }
                    if (!think.isEmpty(source.documentsorts) && think.isEmpty(target.documentsorts)) {
                        ntarget.documentsorts = source.documentsorts
                    }
                    //console.log(ntarget);
                    this.model("category").update(ntarget);//复制栏目信息
                    //更新栏目缓存
                    think.cache("sys_category_list",null);
                    think.cache("all_category",null);
                    this.model("document").where({category_id: source.id}).update({category_id: ntarget.id});//移动文章
                    //如果存在分类信息移动分类信息内容
                    if(!think.isEmpty(source.documentsorts)){
                        let documentsorts = JSON.parse(source.documentsorts);
                        if(!think.isEmpty(documentsorts.types)){
                            for(let v of documentsorts.types){
                                this.model("type_optionvalue"+v.enable).where({fid: source.id}).update({fid: ntarget.id});
                                this.model("typeoptionvar").where({fid: source.id,sortid:v.enable}).update({fid: ntarget.id});
                            }
                        }
                    }
                    return this.success({name: "成功！"})
                }
            // }
            //console.log(ntarget);
        }else {
            let from = this.get("from");
            this.assign("from",from);
            this.active="admin/category/index";
            this.meta_title = "移动栏目";
            return this.display();
        }

    }
}
