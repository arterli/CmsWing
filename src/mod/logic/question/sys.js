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
  updateanswerAction(){
    this.rules = {
      answer_content: "required" //answer_content 的值必填
    }
  }
}