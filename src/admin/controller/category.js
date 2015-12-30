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
        this.tactive = "setup";
    }
     indexAction(){

        //auto render template file index_index.html
         this.meta_title = "分类管理"
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
           console.log(this.post())
        }else{

            //获取模型信息；
            let model = await this.model("model").get_document_model();
            //console.log(obj_values(model));
            this.assign("models",obj_values(model));
            //获取运行的文档类型

            this.assign({
                "tactive":"sysm",
                "active":"/admin/category/index",
            })
            this.meta_title = "添加分类"
            return this.display();
        }

    }
}