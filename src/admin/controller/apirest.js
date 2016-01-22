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
  async getAction(){
    console.log(this.resource)
    console.log(this.id)
    let data;
    if (think.isNumberString(this.id)) {
      let pk = await this.modelInstance.getPk();
      data = await this.modelInstance.where({[pk]: this.id}).find();
      return this.success(data);
    }else {
      data = await this.modelInstance.select();
    }

    return this.success(data);
  }

}