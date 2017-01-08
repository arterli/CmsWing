'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 添加审核
     * @param model
     * @param uid
     * @param data
     * @returns {Promise}
     */
  async adds(model,uid,data){
      let res = await this.add({model:model,uid:uid,data:JSON.stringify(data),time:new Date().getTime()});
      return res;
  }
}