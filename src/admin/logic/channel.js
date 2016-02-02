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
  //添加导航验证
  updatesAction(){
    this.rules = {
      title:"required",
      url:"required",
      status:"int|default:1"
    }
  }
}
