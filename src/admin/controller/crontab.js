// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';

export default class extends think.controller.base {
  init(http){
    super.init(http);
    //网站配置

  }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  async cloaAction(){
    //订单在规定时间为付款自动作废执行方法
    // 禁止 URL 访问该 Action
    if(!this.isCli()){
      this.http.error = new Error('only invoked in cli mode！');
      return think.statusAction(1002, this.http);
    }

    //查询未付款，未作废的订单的订单
    let setup = await this.model("setup").getset();
    let map = {
      pay_status:0,
      status:2,
      create_time:["<",(new Date().getTime()-(Number(setup.ORDER_DELAY)*60000))],
      _logic: "and"
    }
    let order = await this.model("order").where(map).field("id").select();
    if(!think.isEmpty(order)){
      for(let v of order){
       await this.model("order").where({id:v.id}).update({status:6,admin_remark:"规定时间未付款系统自动作废"})
        //释放库存
        await this.model("order").stock(v.id,false);
      }
    }

    //think.log(new Date(),"订单作废任务执行时间")
    this.end();
  }
}