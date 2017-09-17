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

    return this.body = '封面入口';
    //return this.display();
  }

  /**
   * 列表入口
   * @returns {*}
   */
  async listAction() {
    // 获取栏目信息
    let cate = this.m_cate;

    cate = think.extend({}, cate);

    // 栏目权限验证
    if (!await this.c_verify('visit')) {
      const error = this.controller('cmswing/error');
      return error.noAction('您所在的用户组,禁止访问本栏目！');
    }

    // 获取当前栏目的模型
    const model = this.mod;
    this.assign('model', model);

    // 获取当前分类的所有子栏目
    const subcate = await this.model('cmswing/category').get_sub_category(cate.id);
    subcate.push(cate.id);

    // 当前栏目列表每页行数
    const num = this.page_num();

    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(cate.id, true);

    // 获取列表数据
    // 条件
    const map = {
      'category_id': ['IN', subcate]
    };
    // 排序
    const o = {};

    let order = this.modget(1) || 0;
    order = Number(order);
    switch (order) {
      case 1:
        o.popular_value = 'DESC';
        break;
      case 2:
        map.is_recommend = 1;
        o.id = 'DESC';
        break;
      case 3:
        map.answer_count = 0;
        o.id = 'DESC';
        break;
      default:
        o.update_time = 'DESC';
    }
    this.assign('order', order);
    // 分组
    let group_id = 0;
    if (!think.isEmpty(this.modget(2)) && this.modget(2) != 0) {
      map.group_id = this.modget(2);
      group_id = map.group_id;
    }

    const data = await this.model(this.mod.name).where(map).page(this.get('page'), num).order(o).countSelect();
    for (const v of data.data) {
      v.imgs = img_text_view(v.detail, 200, 120);
    }
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    /* 模板赋值并渲染模板 */
    this.assign('group_id', group_id);
    this.assign('category', cate);
    this.assign('list', data.data);
    this.assign('count', data.count);
    this.assign('breadcrumb', breadcrumb);

    // 跨屏
    if (this.isMobile) {
      if (this.isAjax('get')) {
        for (const v of data.data) {
          v.nickname = await get_nickname(v.uid);
          v.create_time = moment(v.create_time).fromNow();
          v.catename = await this.model('category').get_category(v.category_id, 'title');
          v.detail = (v.detail).replace(/<[^>]+>/g, '');
          v.answer_username = await get_nickname(v.answer_users);
          v.update_time = moment(v.update_time).fromNow();
        }

        return this.json(data);
      }
      // console.log(this.mod.name);
      console.log(this.ctx.controller);
      // 手机端模版
      return this.modtemp('list', 'm');
    } else {
      return this.modtemp('list');
    }
  }

  /**
   * 详情入口
   * @returns {*}
   */
  async detailAction() {
    // 获取详情id
    const id = this.get('id');
    const error = this.controller('cmswing/error');
    // 判断请求参数是否合法。
    if (!think.isNumberString(id)) {
      return error.noAction('请求参数不合法！');
    }
    // 获取详情信息
    const info = await this.model('question').find(id);
    // 判断信息是否存在
    if (think.isEmpty(info)) {
      return error.noAction('信息不存在！');
    }
    // TODO
    // 访问控制

    // 栏目权限验证
    if (!await this.c_verify('visit', info.category_id)) {
      return error.noAction('您所在的用户组,禁止访问本栏目！');
    }
    this.assign('info', info);

    // seo
    this.meta_title = info.title; // 标题
    this.keywords = info.keyname ? info.keyname : ''; // seo关键词
    this.description = info.description ? info.description : ''; // seo描述

    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(info.category_id, true);
    this.assign('breadcrumb', breadcrumb);
    // 获取栏目信息
    const cate = await this.category(info.category_id);
    this.assign('category', cate);
    // 当前用户是否关注
    if (this.is_login) {
      const focus = await this.model('question_focus').where({question_id: id, uid: this.user.uid}).find();
      this.assign('focus', focus);
    }
    // 获取当前主题所有关注的用户
    const focususer = await this.model('question_focus').where({question_id: id}).getField('uid');
    this.assign('focususer', focususer);
    // 访问统计
    await this.model('question').where({id: info.id}).increment('view');
    // 话题
    // let topicid = await this.model("keyword_data").where({docid:id,mod_type:1,mod_id:cate.model}).getField("tagid");
    // if(!think.isEmpty(topicid)){
    //     let topic = await this.model("keyword").where({id:["IN",topicid]}).select();
    //     console.log(topic);
    // }
    // 获取回复
    const answer = await this.model('question_answer').where({question_id: id}).select();
    for (const a of answer) {
      a.ccount = await this.model('question_answer_comments').where({answer_id: a.answer_id}).count('id');
    }
    this.assign('answer', answer);
    // console.log(cate);
    // 相关问题
    const where = {docid: id, mod_type: 1, mod_id: cate.model};
    // 获取相关tagid
    const tagid = await this.model('keyword_data').where(where).getField('tagid');
    if (!think.isEmpty(tagid)) {
      // 找出相关的tagid
      const rtid = await this.model('keyword_data').where({tagid: ['IN', tagid], mod_id: cate.model}).getField('docid');
      // 相关问题
      const rq = await this.model('question').where({id: ['IN', rtid]}).limit(10).select();
      this.assign('rq', rq);
    }

    // 不同的设备,压缩不同的图片尺寸
    const str = info.detail;
    if (!think.isEmpty(str)) {
      let img;
      if (this.isMobile) {
        // 手机端
        img = image_view(str, 640, 4);
      } else {
        // pc端

        img = image_view(str, 847, 0);
      }
      info.detail = img;
    }
    if (this.isMobile) {
      if (this.isAjax('get')) {
        for (const v of data.data) {
          v.nickname = await get_nickname(v.uid);
          v.create_time = this.moment(v.create_time).fromNow();
          v.catename = await this.model('cmswing/category').get_category(v.category_id, 'title');
          v.detail = (v.detail).replace(/<[^>]+>/g, '');
          v.answer_username = await get_nickname(v.answer_users);
          v.update_time = moment(v.update_time).fromNow();
        }
        return this.json(data);
      }
      // 手机端模版
      return this.modtemp('question', 'mobile');
    } else {
      return this.modtemp();
    }
  }
};
