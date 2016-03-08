
'use strict';

import Base from './base.js';

export default class extends Base {
    init(http){
        super.init(http);
        this.tactive = "order"
    }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    
    return this.display();
  }
  //订单列表
  async listAction(){
        let status = this.get("status");
        let map={};
        if(!think.isEmpty(status)){
            map.status = status;
            this.assign('status',status);
        }

        map.is_del = 0
        this.config("db.nums_per_page",20)
        let data = await this.model("order").where(map).page(this.get('page')).order("create_time DESC").countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        //console.log(data.data);
        this.active="admin/order/list"
        this.assign('list', data.data);
        this.meta_title = "订单管理";
        return this.display();
  }

    /**
     * 查看订单
     */
    vieworderAction(){
        let list = [1,2,3];
        this.assign("list",list);
        return this.display();
    }

    /**
     * 收款单
     */

    receivingAction(){
        this.active="admin/order/receiving"
        this.meta_title = "收款单";
        return this.display();
    }

    /**
     * 发货单
     */
    invoiceAction(){
        this.active="admin/order/receiving"
        this.meta_title = "发货单";
        return this.display();
    }

    /**
     * 退款单
     */

    refundAction(){
        this.active="admin/order/receiving"
        this.meta_title = "退款单";
        return this.display();
    }

}