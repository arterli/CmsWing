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
    __before(){
        this.assign({
            "navxs":true,
            "active":"/admin",
            "tactive":"/admin",
            "selfjs":"admin",
            "datatables":false,
            "bg":"bg-dark"
        });
    }
    indexAction(){
        //auto render template file index_index.html
        this.assign({

        })
        return this.display();
    }
    aabbAction(){
        console.log(1)
    }
}