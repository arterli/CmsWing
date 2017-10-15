// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  // 更新主题
  async updates(data = null, time = new Date().getTime()) {
    // 添加或者新增基础内容
    let id = null;
    data.update_time = time;
    if (think.isEmpty(data.id)) { // 新增主题
      data.create_time = new Date().getTime();
      data.focus_count = 1;
      id = await this.add(data);
      // 添加关注
      if (id) {
        await this.model('question_focus').add({question_id: id, uid: data.uid, add_time: new Date().getTime()});
        // 添加关键词
        /**
                 * 添加话题
                 * @param keyname "话题1,话题2.话题3"
                 * @param id  "主题id"
                 * @param uid "用户id"
                 * @param mod_id "模型id"
                 * @param mod_type "模型类型 0独立模型，1系统模型"
                 */
        await think.model('cmswing/keyword').addkey(data.keyname, id, data.uid, data.mod_id, 1);
        // 更新用户统计信息
        // 初始化如果没有就添加
        const userup = await this.model('question_user').thenAdd({question_count: 1, uid: data.uid}, {uid: data.uid});
        if (userup.type == 'exist') {
          await this.model('question_user').where({id: userup.id}).increment('question_count', 1);
        }
        // 添加搜索
        await think.model('cmswing/search').addsearch(data.mod_id, id, data);
        // if(!think.isEmpty(data.keyname)){
        //     let keywrods = data.keyname.split(",");
        //     console.log(keywrods);
        //     for (let v of keywrods){
        //         let add = await this.model("keyword").thenAdd({keyname:v}, {keyname:v});
        //         if(add.type=='exist'){
        //             await this.model("keyword").where({id:add.id}).in
        // crement("videonum", 1);
        //         }
        //         await this.model("keyword_data").add({tagid:add.id,docid:id,add_time:new Date().getTime(),uid:data.uid,mod_type:1,mod_id:data.mod_id});
        //     }
        //
        // }
      }
    } else { // 更新主题
      const status = this.update(data);
      console.log(data);
      // 更新关键词
      // 获取相关话题;
      await think.model('cmswing/keyword').updatekey(data.keyname, data.id, data.userid, data.mod_id, 1);
      // 更新搜索
      await think.model('cmswing/search').updatesearch(data.mod_id, data);
    }
    return {data: data, id: id};
  }
};
