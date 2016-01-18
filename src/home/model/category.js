'use strict';
/**
 * model
 */
export default class extends think.model.base {
   
   /**
    * 获取分类详细信息
    * @param  {milit} id 分类ID或者标识
    * @param  {string} field 查询字段
    * @return {array} 分类信息
    */
   *info(id,field){
       field=think.isEmpty(field)||'';
       let map = {};
       if(think.isNumberString(id)){
           map.id = id;
       }else{
           map.name = id;
       }
       return this.field(field).where(map).find();
   }
   
}