'use strict';
/**
 * error controller
 */
export default class extends think.controller.base {
  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
  displayErrorPage(status){
    let module = 'common';
    if(think.mode !== think.mode_module){
      module = this.config('default_module');
    }
    let file = `${module}/error/${status}.html`;
    let options = this.config('tpl');
    options = think.extend({}, options, {type: 'ejs', file_depr: '_'});
   
    return this.display(file, options);
  }
  /**
   * Bad Request 
   * @return {Promise} []
   */
  _400Action(){
    return this.displayErrorPage(400);
  }
  /**
   * Forbidden 
   * @return {Promise} []
   */
  _403Action(){
    return this.displayErrorPage(403);
  }
  /**
   * Not Found 
   * @return {Promise}      []
   */
  _404Action(){
    return this.displayErrorPage(404);
  }
  /**
   * Internal Server Error
   * @return {Promise}      []
   */
  _500Action(){
    return this.displayErrorPage(500);
  }
  /**
   * Service Unavailable
   * @return {Promise}      []
   */
  _503Action(){
    return this.displayErrorPage(503);
  }
  //未登录
  _700Action(){
    return this.displayErrorPage(700);
  }
  // 正确跳转对应的模板文件
  _701Action(){
    return this.displayErrorPage(701);
  }
  // 错误跳转对应的模板文件
  _702Action(){
    return this.displayErrorPage(702);
  }
}