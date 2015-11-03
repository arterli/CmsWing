/**
 * Created by Arterli on 2015/11/2.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        this.assign({
            "datatables":true,
            "active":""
        })
        return this.display();
    }
}