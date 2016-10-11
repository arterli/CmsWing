'use strict';
/**
 * model
 */
export default class extends think.model.base {
  //更新主题
    async updates(data=null){
        //添加或者新增基础内容
        let id = null;
        data.update_time=new Date().getTime();
        if(think.isEmpty(data.id)) {//新增主题
            data.create_time = new Date().getTime();
            id = await this.add(data);
        }else {//更新主题

        }
        return {data:data,id:id};
    }
}