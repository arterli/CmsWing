// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
   
  }

  rechargeAction(){
    this.rules = {
     // order_amount: "float|post|currency|required"
    }
  }
  //修改用户信息表单验证
  updateinfoAction(){
    this.rules={
     
    }
  }
//修改密码数据验证
  updatepasswordAction(){
    this.rules = {
      oldpassword:"required",
      password:"byteLength:6,20|required",
      repassword:"equals:password"
    }
  }
}