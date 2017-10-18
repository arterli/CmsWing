// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.modAdmin {
  constructor(ctx) {
    super(ctx);
    this.tactive = 'article';
  }
  /**
   * 模型后台管理入口
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const cate_id = this.get('cate_id') || null;
    const group_id = this.get('group_id') || 0;
    if (think.isEmpty(cate_id)) {
      const error = this.controller('cmswing/error');
      return error.noAction('该栏目不存在！');
    }
    const name = await this.model('cmswing/category').get_category(cate_id, 'name') || cate_id;
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    // 获取内容
    // 构建列表数据
    const question = this.model('question');
    const map = {};
    if (cate_id) {
      // 获取当前分类的所有子栏目
      const subcate = await this.model('cmswing/category').get_sub_category(cate_id);
      // console.log(subcate);
      subcate.push(cate_id);
      map.category_id = ['IN', subcate];
    }
    if (group_id) {
      map.group_id = group_id;
    }

    // 获取分组
    await this.groups();
    // 搜索
    if (this.get('title')) {
      map.title = ['like', '%' + this.get('title') + '%'];
    }
    const list = await question.where(map).order('update_time DESC').page(this.get('page'), 20).countSelect();
    const html = this.pagination(list);
    this.assign('list', list);
    this.assign('pagerData', html); // 分页展示使用
    console.log(map);
    this.meta_title = this.m_cate.title;
    this.assign({
      'navxs': true,
      'name': name
    });
    this.assign('group_id', group_id);
    return this.modDisplay();
  }
  // 删除
  async delAction() {
    const ids = this.post('ids');
    if (think.isEmpty(ids)) {
      return this.fail('至少选择一条数据！');
    }
    // 删除帖子
    await this.model('question').where({id: ['IN', ids]}).delete();
    // 查出相关的回复id
    const qm = await this.model('question_answer').where({question_id: ['IN', ids]}).getField('answer_id');
    // 删除相关回复
    await this.model('question_answer').where({question_id: ['IN', ids]}).delete();
    // 删除相关的回复评论
    if (!think.isEmpty(qm)) {
      await this.model('question_answer_comments').where({answer_id: ['IN', qm]}).delete();
    }
    // console.log(ids);
    // 删除搜索
    if (think.isArray(ids)) {
      for (const id of ids) {
        await this.model('cmswing/search').delsearch(8, id);
        // 删除话题
        await this.model('cmswing/keyword').delkey(id, 8);
      }
    } else {
      await this.model('cmswing/search').delsearch(8, ids);
      // 话题
      await this.model('cmswing/keyword').delkey(ids, 8);
    }
    // 删除相关的
    return this.success({name: '删除成功！'});
  }
};
