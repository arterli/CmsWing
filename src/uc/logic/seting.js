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
  //修改密码数据验证
  updatepasswordAction(){
    this.rules = {
      oldpassword:"required",
      password:"byteLength:6,20|required",
      repassword:"equals:password"
    }
  }
}