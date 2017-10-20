// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.modIndex {
  /**
     * index action
     * @return {Promise} []
     * 封面入口
     */
  indexAction() {
    // console.log(this);
    // auto render template file index_index.html

    return this.display();
  }

  /**
     * ajax获取栏目分组
     * @param cid 栏目id
     * @returns {*}
     */
  async getgroupsAction() {
    const cid = this.get('cid');
    let groups = await this.model('cmswing/category').get_groups(cid);
    if (think.isEmpty(groups)) {
      groups = false;
    }
    return this.json(groups);
  }
  // 关注
  async ajaxquestionfocusAction() {
    // 前端验证登录
    await this.weblogin();
    // 获取关注的类型，1关注，2取消关注
    const type = this.get('type');
    // 获取要关注的id;
    const id = this.get('id');
    let res;
    switch (Number(type)) {
      case 1:
        // 关注
        await this.model('question_focus').add({question_id: id, uid: this.user.uid, add_time: new Date().getTime()});
        await this.model('question').where({id: id}).increment('focus_count');
        this.success({name: '关注成功!'});
        break;
      case 2:
        // 取消关注
        await this.model('question_focus').where({question_id: id, uid: this.user.uid}).delete();
        await this.model('question').where({id: id}).decrement('focus_count');
        this.success({name: '取消关注成功!'});
        break;
      default:
        return this.fail('缺少参数!');
    }
  }
  // 获取评论
  async ajaxanswercommentsAction() {
    const answer_id = this.get('answer_id');
    // let comments =
    const comments = await this.model('question_answer_comments').where({answer_id: answer_id}).select();
    for (const c of comments) {
      c.username = await get_nickname(c.uid);
      c.time = this.moment(c.time).fromNow();
    }
    // 判断是不是超级管理员
    let is_admin = false;
    if (this.is_login) {
      is_admin = in_array(Number(this.user.uid), this.config('user_administrator'));
    }
    this.json({data: comments, is_login: this.is_login, is_admin: is_admin});
  }
  async ajaxanswercommentspostAction() {
    // 前端验证登录
    await this.weblogin();

    const data = this.post();
    data.uid = this.user.uid;
    data.time = new Date().getTime();
    const add = await this.model('question_answer_comments').add(data);
    if (add) {
      return this.success({name: '评论成功!'});
    } else {
      return this.fail('评论失败！');
    }
  }
  // 编辑回复
  async editanswerAction() {
    // 前端登录验证
    await this.weblogin();
    const answer_id = this.get('id');
    const answer = await this.model('question_answer').where({answer_id: answer_id}).find();

    // 后台管理员跳过验证
    if (!in_array(Number(this.user.uid), this.config('user_administrator'))) {
      // await this.c_verify("edit");
      // 安全判断
      if (answer.uid != this.user.uid) {
        const error = this.controller('common/error');
        return error.noAction('你不能编辑，不属于自己的东西！');
      }
    }
    this.assign('answer', answer);
    // pc
    await this.hook('homeEdit', 'answer_content', answer.answer_content, {$hook_key: 'answer_content', $hook_type: '2_2_300'});
    this.meta_title='编辑回复'
    return this.modDisplay();
  }
  async delanswerAction() {
    // 前端登录验证
    await this.weblogin();
    const answer_id = this.get('id');
    const answer = await this.model('question_answer').where({answer_id: answer_id}).find();
    // 后台管理员跳过验证
    if (!in_array(Number(this.user.uid), this.config('user_administrator'))) {
      // await this.c_verify("edit");
      // 安全判断
      if (answer.uid != this.user.uid) {
        const error = this.controller('common/error');
        return error.noAction('你不能编辑，不属于自己的东西！');
      }
    }
    // 删除相关回复
    await this.model('question_answer').where({answer_id: answer_id}).delete();
    // 删除相关的回复评论
    await this.model('question_answer_comments').where({answer_id: answer_id}).delete();
    // 删除统计
    await this.model('question').where({id: this.get('qid')}).decrement('answer_count', 1);
    return this.success({name: '删除成功!'});
  }
  async delcommentsAction() {
    // 前端登录验证
    await this.weblogin();
    const id = this.get('id');
    const comments = await this.model('question_answer_comments').where({id: id}).find();
    // 后台管理员跳过验证
    if (!in_array(Number(this.user.uid), this.config('user_administrator'))) {
      // await this.c_verify("edit");
      // 安全判断
      if (comments.uid != this.user.uid) {
        const error = this.controller('common/error');
        return error.noAction('你不能编辑，不属于自己的东西！');
      }
    }
    // 删除相关的回复评论
    await this.model('question_answer_comments').where({id: id}).delete();
    return this.success({name: '删除成功!'});
  }
};
