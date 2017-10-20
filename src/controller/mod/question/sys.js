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

  async addAction() {
    // 前台登录验证
    await this.weblogin();
    const cid = this.get('cid');
    // 验证用户权限
    await this.c_verify('add', cid, '您所在的用户组，没有发布权限！');
    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(cid, true);
    this.assign('breadcrumb', breadcrumb);
    // console.log(breadcrumb);
    this.assign('category', this.m_cate);
    this.meta_title = '发布';
    await this.hook('homeEdit', 'detail', '', {$hook_key: 'detail', $hook_type: '2_2_300'});
    if (this.isMobile) {
      // 手机端模版
      return this.modDisplay('m');
    } else {
      return this.modDisplay();
    }
  }
  async testAction() {
    return this.display();
  }
  // 编辑主题
  async editAction() {
    // 前台登录验证
    await this.weblogin();
    const info = await this.model('question').find(this.get('id'));
    // console.log(info);
    this.assign('info', info);
    // 后台管理员跳过验证
    if (!in_array(parseInt(this.user.uid), this.config('user_administrator'))) {
      // await this.c_verify("edit");
      // 安全判断
      if (info.uid != this.user.uid) {
        const error = this.controller('cmswing/error');
        return error.noAction('你不能编辑，不属于自己的东西！');
      }
    }
    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(info.category_id, true);
    this.assign('breadcrumb', breadcrumb);
    // 获取栏目信息
    const cate = await this.category(info.category_id);
    // console.log(cate);
    this.assign('category', cate);
    // 获取分组
    const group = await this.model('cmswing/category').get_groups(cate.id);
    // console.log(group);
    if (!think.isEmpty(group)) {
      this.assign('group', think._.filter(group, {'id': info.group_id}));
    }
    // 获取相关话题;
    const where = {};
    where.docid = info.id;
    where.mod_type = 1;
    where.mod_id = cate.model;
    let keyword;
    const topicid = await this.model('keyword_data').where(where).getField('tagid');
    if (!think.isEmpty(topicid)) {
      keyword = await this.model('keyword').where({id: ['IN', topicid]}).getField('keyname');
      if (!think.isEmpty(keyword)) {
        this.assign('keyword', keyword.join(','));
      }
    }
    // seo
    this.meta_title = '编辑'; // 标题
      await this.hook('homeEdit', 'detail', info.detail, {$hook_key: 'detail', $hook_type: '2_2_300'});
    return this.modDisplay();
  }
  // 添加或编辑主题
  async updateAction() {
    // 前台登录验证
    await this.weblogin();
    const data = this.post();
    if (think.isEmpty(data.id)) { // 发布
      data.uid = this.user.uid;
      data.ip = _ip2int(this.ip);
      // 检查本栏目发布是否需要审核
      const roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
      const addexa = await this.model('cmswing/category_priv').priv(data.category_id, roleid, 'addexa');
      if (addexa) {
        const addp = await this.model('cmswing/approval').adds(data.mod_id, this.user.uid, data.title, data);
        if (addp) {
          return this.success({name: '发布成功, 请等待管理员审核...', url: '/' + data.category_id});
        } else {
          return this.fail('操作失败！');
        }
      }
    } else { // 修改
      data.userid = this.user.uid;
    }
    data.anonymous = data.anonymous || 1;
    // console.log(data);
    // return this.fail(data);
    const res = await this.modModel('question').updates(data);
    if (res) {
      // 行为记录
      if (!res.data.id) {
        // 添加操作日志，可根据需求后台设置日志类型。
        await this.model('cmswing/action').log('addquestion', 'question', res.id, this.user.uid, this.ip, this.ctx.url);
        return this.success({name: '添加成功', url: '/q/' + res.id});
      } else {
        return this.success({name: '更新成功', url: '/q/' + res.data.id});
      }
    } else {
      return this.fail('操作失败！');
    }
  }
  // 添加或编辑回复
  async updateanswerAction() {
    // 前台登录验证
    await this.weblogin();
    const data = this.post();
    if (think.isEmpty(data.answer_id)) {
      data.uid = this.user.uid;
      data.ip = _ip2int(this.ip);
      data.anonymous = data.anonymous || 1;
    }
    // console.log(data);
    const res = await this.modModel('question_answer').updates(data);
    if (res) {
      // 行为记录
      if (!res.data.answer_id) {
        // 添加操作日志，可根据需求后台设置日志类型。
        // await this.model("action").log("add_document", "document", res.id, this.user.uid, this.ip(), this.http.url);
        return this.success({name: '添加成功', data: res});
      } else {
        return this.success({name: '更新成功', data: res,url:'/q/' + data.question_id});
      }
    } else {
      return this.fail('操作失败！');
    }
  }
};
