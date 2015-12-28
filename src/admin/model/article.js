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
  async detail(id){
        //获取基础数据
      let info=await this.field(true).find(id);


      return info;
  }
}