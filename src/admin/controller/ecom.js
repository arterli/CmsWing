'use strict';

import Base from './base.js';

export default class extends Base {
    //支付与配送控制区
     init(http){
        super.init(http);
        this.tactive = "ecom"
    }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  /**
   * 正在使用的支付方式
   */
  paymentAction(){
    this.meta_title="正在使用的支付方式";
    return this.display();
  }
  
  /**支付插件 */
  
  paypluginAction(){
    this.meta_title="全部支付方式";
    // this.end(11);
     this.active = "admin/ecom/payment"
    return this.display(); 
  }
  /**运费模板 */
  fareAction(){
      this.meta_title="运费模板";
    return this.display();
  }
  /**快递公司管理 */
  expressAction(){
      this.meta_title="快递公司管理";
    return this.display();
  }
}