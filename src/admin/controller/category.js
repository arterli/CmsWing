/**
 * Created by arter on 2015/11/20.
 */
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
         this.meta_title = "分类管理";
        
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
            let res = await this.model("category").updates(data);
            if(res){
                this.success({name:"新增成功！",url:"/admin/category/index"});
            }else {
                this.fail("更新失败！");
            }
        }else{

            //获取模型信息；
            let model = await this.model("model").get_document_model();
            //console.log(obj_values(model));
            this.assign("models",obj_values(model));
            //获取运行的文档类型
            this.active="admin/category/index";
            this.action = "/admin/category/add"
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
            //console.log(info);
            //获取模型信息；
            let model = await this.model("model").get_document_model();
            //console.log(obj_values(model));
            this.assign("models",obj_values(model));
            this.active="admin/category/index";
                this.action = "/admin/category/edit";
                this.meta_title = "编辑分类";
           return this.display();
        }
    }


}
