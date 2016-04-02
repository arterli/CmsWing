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