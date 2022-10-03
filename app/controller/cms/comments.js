'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller cms评论
*/
class CommentsController extends Controller {
  async index() {
    const { ctx } = this;
    this.success(1);
  }
  /**
  * @summary 后台管理评论
  * @description 后台管理评论
  * @router get /admin/cms/comments/adminList
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async adminList() {
    const { ctx } = this;
    const data = ctx.query;
    const map = {};
    map.include = [{
      model: ctx.model.McMember,
    }, {
      model: ctx.model.CmsCommentsReply,
      include: ctx.model.McMember,
    }, {
      model: ctx.model.CmsDoc,
    }];
    const page = data.page || 1;
    const limit = data.perPage || 15;
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'id', 'DESC' ]];
    map.where = {};
    if (data.content) {
      map.where.op_or = [{ content: { [Op.like]: `%${data.content}%` } }];
    }
    map.distinct = true; // 去重，返回的 count 把 include 的数量算进去
    const list = await ctx.model.CmsComments.findAndCountAll(map);
    const arr = [];
    for (const item of list.rows) {
      arr.push({ ...item.toJSON(), children: item.cms_comments_replies });
    }
    this.success({ items: arr, total: list.count });
  }
  /**
  * @summary 管理员批量删除
  * @description 管理员批量删除
  * @router post /admin/cms/comments/adminBulkDel
  * @request body cms_comments_edit *body desc
  * @response 200 baseRes desc
  */
  async adminBulkDel() {
    const { ctx } = this;
    const data = ctx.request.body;
    for (const v of data.selectedItems) {
      if (v.doc_id) {
        await ctx.model.CmsComments.destroy({ where: { id: v.id } });
        await ctx.model.CmsCommentsReply.destroy({ where: { comments_id: v.id } });
      } else {
        await ctx.model.CmsCommentsReply.destroy({ where: { id: v.id } });
      }
    }
    this.success(null, '删除成功');
  }
  /**
  * @summary 管理员删除评论
  * @description 管理员删除评论
  * @router get /admin/cms/comments/adminDel
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async adminDel() {
    const { ctx } = this;
    const data = ctx.query;
    console.log(data);
    if (data.doc_id > 0) {
      await ctx.model.CmsComments.destroy({ where: { id: data.id } });
      await ctx.model.CmsCommentsReply.destroy({ where: { comments_id: data.id } });
    } else {
      await ctx.model.CmsCommentsReply.destroy({ where: { id: data.id } });
    }
    this.success(null, '删除成功');
  }
  /**
  * @summary 添加评论
  * @description 添加评论
  * @router post /cms/comments/add
  * @request body cms_comments_add *body desc
  * @response 200 baseRes desc
  */
  async add() {
    const { ctx } = this;
    const { content, doc_id } = ctx.request.body;
    const addData = { content, doc_id };
    addData.member_uuid = ctx.userInfo.uuid;
    const add = await ctx.model.CmsComments.create(addData);
    this.success(add);
  }
  /**
  * @summary 删除评论
  * @description 删除评论
  * @router get /cms/comments/del
  * @request query integer *id desc
  * @request query integer *page desc
  * @response 200 baseRes desc
  */
  async del() {
    const { ctx } = this;
    const { id, page } = ctx.query;
    const del = await ctx.model.CmsComments.destroy({ where: { id, member_uuid: ctx.userInfo.uuid } });
    if (del) {
      await ctx.model.CmsCommentsReply.destroy({ where: { comments_id: id } });
    }
    this.success(page, '删除成功');
  }
  /**
  * @summary 编辑评论
  * @description 编辑评论
  * @router post /cms/comments/edit
  * @request body cms_comments_edit *body desc
  * @response 200 baseRes desc
  */
  async edit() {
    const { ctx } = this;
    const { id, content } = ctx.request.body;
    const { page } = ctx.query;
    await ctx.model.CmsComments.update({ content }, { where: { id, member_uuid: ctx.userInfo.uuid } });
    this.success(page);
  }
  /**
  * @summary ajax 编辑评论
  * @description ajax 编辑评论
  * @router get /cms/comments/modalCommentEdit
  * @request query integer *id 评论id
  * @response 200 baseRes desc
  */
  async modalCommentEdit() {
    const { ctx } = this;
    const { id } = ctx.query;
    const info = await ctx.model.CmsComments.findOne({ where: { id } });
    const templatePath = await this.cmsTemplatePath();
    await ctx.render(`cms/${templatePath}/comment_ajax_edit`, { info });
  }
  /**
  * @summary ajax回复评论
  * @description ajax回复评论
  * @router get /cms/comments/modalCommentReply
  * @request query integer *id desc
  * @response 200 baseRes desc
  */
  async modalCommentReply() {
    const { ctx } = this;
    const { id } = ctx.query;
    const templatePath = await this.cmsTemplatePath();
    await ctx.render(`cms/${templatePath}/comment_ajax_reply`, { id });
  }
  /**
  * @summary ajax回复编辑
  * @description ajax回复编辑
  * @router get /cms/comments/modalCommentReplyEdit
  * @request query integer *id desc
  * @response 200 baseRes desc
  */
  async modalCommentReplyEdit() {
    const { ctx } = this;
    const { id } = ctx.query;
    const info = await ctx.model.CmsCommentsReply.findOne({ where: { id } });
    const templatePath = await this.cmsTemplatePath();
    await ctx.render(`cms/${templatePath}/comment_ajax_reply_edit`, { info });
  }
  /**
  * @summary 添加回复
  * @description 添加回复
  * @router post /cms/comments/replyAdd
  * @request body cms_comments_reply_add *body desc
  * @response 200 baseRes desc
  */
  async replyAdd() {
    const { ctx } = this;
    const { content, comments_id } = ctx.request.body;
    const { page } = ctx.query;
    const addData = { content, comments_id };
    addData.member_uuid = ctx.userInfo.uuid;
    const add = await ctx.model.CmsCommentsReply.create(addData);
    this.success(page);
  }
  /**
  * @summary 编辑回复
  * @description 编辑回复
  * @router post /cms/comments/replyEdit
  * @request body cms_comments_reply_edit *body desc
  * @response 200 baseRes desc
  */
  async replyEdit() {
    const { ctx } = this;
    const { id, content } = ctx.request.body;
    const { page } = ctx.query;
    await ctx.model.CmsCommentsReply.update({ content }, { where: { id, member_uuid: ctx.userInfo.uuid } });
    this.success(page);
  }
  /**
  * @summary 删除回复
  * @description 删除回复
  * @router get /cms/comments/replyDel
  * @request query integer *id desc
  * @request query integer *page desc
  * @response 200 baseRes desc
  */
  async replyDel() {
    const { ctx } = this;
    const { id, page } = ctx.query;
    const del = await ctx.model.CmsCommentsReply.destroy({ where: { id, member_uuid: ctx.userInfo.uuid } });
    this.success(page, '删除成功');
  }
  /**
  * @summary ajax获取评论列表
  * @description ajax获取评论列表
  * @router get /cms/comments/ajaxList
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async ajaxList() {
    const { ctx } = this;
    ctx.userInfo = ctx.helper.deToken(ctx.session.mcToken);
    const data = ctx.query;
    const map = {};
    map.include = [{
      model: ctx.model.McMember,
    }, {
      model: ctx.model.CmsCommentsReply,
      include: ctx.model.McMember,
    }];
    const page = data.page || 1;
    const limit = data.perPage || 5;
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'id', 'DESC' ]];
    map.where = { doc_id: data.doc_id };
    map.distinct = true; // 去重，返回的 count 把 include 的数量算进去
    const list = await ctx.model.CmsComments.findAndCountAll(map);
    const html = ctx.service.sys.pagination.pagination(list, { limit });
    const reg = new RegExp('class="page-link" href="', 'g'); // 创建正则RegExp对象
    const pagination = html.replace(reg, 'data-ajax-target-container="#cms_comments_container" data-ajax-update-url="false" class="page-link js-ajax" href="#" data-href="/cms/comments/ajaxList');
    const templatePath = await this.cmsTemplatePath();
    await ctx.render(`cms/${templatePath}/comment_ajax_list`, { list, pagination });
  }
}
module.exports = CommentsController;
