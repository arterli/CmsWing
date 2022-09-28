'use strict';
const Controller = require('../../core/base_controller');
const fs = require('fs/promises');
const { Op } = require('sequelize');
/**
* @controller 会员设置
*/
class IndexController extends Controller {
  /**
  * @summary 会员设置
  * @description 会员设置
  * @router get /mc/setup
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    ctx.meta_title = '会员设置';
    const member = await ctx.model.McMember.findOne({ where: { uuid: ctx.userInfo.uuid } });
    await ctx.render('mc/setup_index', { member });
  }
  /**
  * @summary 更新头像
  * @description 更新头像
  * @router post /mc/setup/avatar
  * @request body mc_member_edit *body desc
  * @response 200 baseRes desc
  */
  async avatar() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (data.action === 'delete') {
      await ctx.model.McMember.update({ avatar: '' }, { where: { uuid: ctx.userInfo.uuid } });
      const member = await ctx.model.McMember.findOne({ where: { uuid: ctx.userInfo.uuid } });
      const token = ctx.helper.generateToken(member);
      ctx.session.mcToken = token;
      return this.success(member);
    }
    const file = ctx.request.files[0];
    try {
      // 处理文件，比如上传到云端
      console.log(file);
      const upload = await ctx.service.sys.objectStorage.upload(data, file);
      if (upload) {
        await ctx.model.McMember.update({ avatar: upload.url }, { where: { uuid: ctx.userInfo.uuid } });
        const member = await ctx.model.McMember.findOne({ where: { uuid: ctx.userInfo.uuid } });
        const token = ctx.helper.generateToken(member);
        ctx.session.mcToken = token;
        this.success(upload);
      } else {
        throw new Error('上传失败');
      }
    } catch (e) {
      console.log(e);
      this.fail(e.toString());
    } finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath);
    }
  }
  /**
  * @summary 更新会员信息
  * @description 更新会员信息
  * @router post /mc/setup/updateInfo
  * @request body mc_member_edit *body desc
  * @response 200 baseRes desc
  */
  async updateInfo() {
    const { ctx } = this;
    const data = ctx.request.body;
    const exist = await ctx.model.McMember.findOne({ where: { [Op.or]: [{ username: data.username }, { mobile: data.mobile }], uuid: { [Op.ne]: ctx.userInfo.uuid } } });
    if (exist) {
      return this.fail('已存在相同的用户名或电话，请重试！');
    }
    await ctx.model.McMember.update(data, { where: { uuid: ctx.userInfo.uuid } });
    const member = await ctx.model.McMember.findOne({ where: { uuid: ctx.userInfo.uuid } });
    ctx.session.mcToken = ctx.helper.generateToken(member);
    this.success(member);
  }
  /**
  * @summary 更新邮箱
  * @description 更新邮箱
  * @router post /mc/setup/upEmail
  * @request body mc_member_edit *body desc
  * @response 200 baseRes desc
  */
  async upEmail() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    const info = await ctx.model.McMember.findOne({ where: { password: ctx.helper.cipher(password), uuid: ctx.userInfo.uuid } });
    if (!info) return this.fail('密码错误！');
    await ctx.model.McMember.update({ email }, { where: { uuid: info.uuid } });
    const member = await ctx.model.McMember.findOne({ where: { uuid: ctx.userInfo.uuid } });
    ctx.session.mcToken = ctx.helper.generateToken(member);
    this.success(member);
  }
  /**
  * @summary 更新密码
  * @description 更新密码
  * @router post /mc/setup/upPassword
  * @request body mc_member_edit *body desc
  * @response 200 baseRes desc
  */
  async upPassword() {
    const { ctx } = this;
    const { password_new, password } = ctx.request.body;
    const info = await ctx.model.McMember.findOne({ where: { password: ctx.helper.cipher(password), uuid: ctx.userInfo.uuid } });
    if (!info) return this.fail('密码错误！');
    await ctx.model.McMember.update({ password: ctx.helper.cipher(password_new) }, { where: { uuid: info.uuid } });
    this.success('ok');
  }
}
module.exports = IndexController;
