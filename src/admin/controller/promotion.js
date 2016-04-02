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
  init(http){
    super.init(http);
    this.tactive = "promotion"
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
   * goods action
   * 商品促销
   */
  goodsAction(){
    this.end("商品促销");
  }

  /**
   * 订单促销
   */
  orderAction(){
    this.end("订单促销")
  }

  /**
   * 捆绑销售
   */
  bundingAction(){
    this.end("捆绑销售")
  }

  /**
   * 团购
   */
  tuanAction(){
    this.end("团购")
  }

  /**
   * 限时抢购
   */
  flashAction(){
    this.end("限时抢购")
  }

  /**
   * 代金卷
   */
  voucherAction(){
    this.end("代金卷")
  }
}