// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  // 更新回复
  async updates(data = null) {
    // 添加或者新增基础内容
    let id = null;
    if (think.isEmpty(data.answer_id)) { // 新增主题
      data.add_time = new Date().getTime();
      id = await this.add(data);
      if (id) {
        await this.model('question').where({id: data.question_id}).increment('answer_count');
        await this.model('question').where({id: data.question_id}).update({answer_users: data.uid, last_answer: id, update_time: data.add_time});
        // 更新用户统计信息
        // 初始化如果没有就添加
        const userup = await this.model('question_user').thenAdd({answer_count: 1, uid: data.uid}, {uid: data.uid});
        if (userup.type == 'exist') {
          await this.model('question_user').where({uid: userup.id}).increment('answer_count', 1);
        }
      }
    } else { // 更新主题
      await this.where({answer_id: data.answer_id}).update(data);
    }
    return {data: data, id: id};
  }
};
