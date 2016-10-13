'use strict';
/**
 * model
 */
export default class extends think.model.base {

    //添加话题
    /**
     * 添加话题
     * @param keyname "话题1,话题2.话题3"
     * @param id  "主题id"
     * @param uid "用户id"
     * @param mod_id "模型id"
     * @param mod_type "模型类型 0独立模型，1系统模型"
     */
   async addkey(keyname,id,uid,mod_id,mod_type=0){
        //添加关键词
        if(!think.isEmpty(keyname)){
            let keywrods = keyname.split(",");
            for (let v of keywrods){
                let add = await this.thenAdd({keyname:v}, {keyname:v});
                if(add.type=='exist'){
                    await this.where({id:add.id}).increment("videonum", 1);
                }
                await this.model("keyword_data").add({tagid:add.id,docid:id,add_time:new Date().getTime(),uid:uid,mod_type:mod_type,mod_id:mod_id});
            }

        }
    }
}