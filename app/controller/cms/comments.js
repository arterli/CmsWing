'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller cms评论
*/
class CommentsController extends Controller {
  async index() {
    const { ctx } = this;
    this.success(1);
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
  * @summary ajax回复评论
  * @description ajax回复评论
  * @router get /cms/comments/modalCommentReply
  * @request query integer *id desc
  * @response 200 baseRes desc
  */
  async modalCommentReply() {
    const { ctx } = this;
    const { id } = ctx.query;
    await ctx.render('cms/ajax_modal_comment_reply', { id });
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
    await ctx.render('cms/ajax_comments_list', { list, pagination });
  }
}
module.exports = CommentsController;
