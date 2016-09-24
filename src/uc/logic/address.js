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
  addaddrAction(){
    this.rules={
      "mobile":"required",
      addr:"required",
      accept_name:"required"
    }
  }
}