// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * model
 */
export default class extends think.model.base {

   async detail(id){
        //获取基础数据
        let map;
        if(think.isNumberString(id)){
            map = {id:id}
        }else {
            map = {name:id}
        }
       //console.log(map);
        let info = await this.where(map).find();
       //console.log(info);
        if(think.isEmpty(info)){
           return {errno: 702, errmsg: "数据不存在"};
        }else if(!(think.isObject(info) || 1 != info.status)){
            return {errno: 702, errmsg: "文档被禁用或已删除"};
        }
        //获取模型数据
        let table =await this.model("model",{},"admin").get_table_name(info.model_id);
        let details = await this.model(table).find(info.id);
        info = think.extend({},info,details);
        return info;
    }
    
    

}