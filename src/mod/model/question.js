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
            data.focus_count =1;
            id = await this.add(data);
                 //添加关注
            if(id){
                await this.model("question_focus").add({question_id:id,uid:data.uid,add_time:new Date().getTime()});
            }
        }else {//更新主题

        }
        return {data:data,id:id};
    }
}