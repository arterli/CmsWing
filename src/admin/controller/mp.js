/**
 * Created by arter on 2015/10/29.
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

    }

    indexAction(){
        //auto render template file index_index.html
        console.log(this.adminmenu["99"]);
        this.meta_title= '微信管理';
        this.assign({
            "navxs":true,
            "bg":"bg-dark"
        });
        //fdsafsa
        return this.display();
    }
    aabbAction(){
        console.log(1)
    }
}