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
      if(! (think.isObject(info) || 1 !== info.status)){
          this.fail('文档被禁用或已删除！');
          return false;
      }
     //获取模型数据

      return info;
  }
}