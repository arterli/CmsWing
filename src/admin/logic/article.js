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

  updateAction(){
    this.rules = {
      name:"alphaNumericDash",
      title:"required|maxLength:80",
      group_id:"int|default:0",

    }
  }
}