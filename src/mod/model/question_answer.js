'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //更新回复
    async updates(data=null){
        //添加或者新增基础内容
        let id = null;
        if(think.isEmpty(data.id)) {//新增主题
            data.add_time = new Date().getTime();
            id = await this.add(data);
            if(id){
                await this.model("question").where({id:data.question_id}).increment('answer_count');
                await this.model("question").where({id:data.question_id}).update({answer_users:data.uid,last_answer:id,update_time:data.add_time});
            }
        }else {//更新主题

        }
        return {data:data,id:id};
    }
}