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
    async indexAction(){
        this.assign({
            "tactive":"sysm",
            "active":"/admin/category/index",
        })
        //auto render template file index_index.html
        return this.display();
    }
    async gettreeAction(){
        let tree = await this.model('category').gettree(0,"id,name,title,sort,pid,allow_publish,status");
        return this.json(tree);
    }

    /**
     * 添加栏目
     */
    async addAction(){
        this.assign({
            "tactive":"sysm",
            "active":"/admin/category/index",
        })
        return this.display();
    }
}