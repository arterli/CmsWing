'use strict';
/**
 * model
 */
export default class extends think.model.base {


    /**
     * 获取详情页数据
     * @param id
     * @returns {*}
     */
  * detail(id){
        //获取基础数据
      let info=yield this.find(id);


      return info;
  }
}