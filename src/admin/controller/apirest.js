'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
    //this._method = "_method";
    let model = this.get('model');
    this.modelInstance = this.model(model);
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  __before(){

  }
  * getAction(){
    console.log(this.resource)
    console.log(this.id)
    let data;
    if (think.isNumberString(this.id)) {
      let pk = yield this.modelInstance.getPk();
      data = yield this.modelInstance.where({[pk]: this.id}).find();
      return this.success(data);
    }else {
      data = yield this.modelInstance.select();
    }

    return this.success(data);
  }

}