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
    }
     indexAction(){
        this.assign({
            "tactive":"sysm",
            "active":"/admin/category/index",
        })
        //auto render template file index_index.html
        return this.display();
       
    }
    * gettreeAction(){
        let tree = yield this.db.gettree(0,"id,name,title,sort,pid,allow_publish,status");
        return this.json(tree);
    }

    /**
     * 添加栏目
     */
    addAction(){
        if(this.isPost()){
           console.log(this.post())
        }else{
            this.assign({
                "tactive":"sysm",
                "active":"/admin/category/index",
            })
            return this.display();
        }

    }
}