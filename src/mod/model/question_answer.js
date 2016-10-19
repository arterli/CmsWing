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
                //更新用户统计信息
                //初始化如果没有就添加
                let userup = await this.model("question_user").thenAdd({answer_count:1,uid:data.uid},{uid:data.uid});
                if(userup.type=="exist"){
                    await this.model("question_user").where({uid:userup.id}).increment("answer_count", 1);
                }
            }
        }else {//更新主题

        }
        return {data:data,id:id};
    }
}