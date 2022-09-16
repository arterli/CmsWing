/* eslint-disable jsdoc/check-tag-names */
'use strict';
/**
* @controller 文件上传
*/
const fs = require('fs/promises');
const Controller = require('../../core/base_controller');
class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    const data = ctx.request.body;
    const file = ctx.request.files[0];
    const { sessionKey } = ctx.params;
    try {
      // 处理文件，比如上传到云端
      console.log(file);
      // 身份验证
      let token = '';
      if (sessionKey) {
        token = ctx.session[sessionKey];
      } else {
        token = data.token || ctx.get('token');
      }
      if (!token) throw new Error('请在接口携带toekn');
      const userInfo = ctx.helper.deToken(token);
      if (!userInfo) throw new Error('无效toekn');
      data.resBody = data.resBody ? data.resBody : '{"status": 0,"msg": "","data":{"name":"{{name}}","mime":"{{mime}}","size":{{size}},"type":"{{type}}","savename":"{{savename}}","hash":"{{hash}}","value":"{{value}}"}}';
      const testresbody = await ctx.renderString(data.resBody, {
        name: '123 (1).png',
        mime: 'image/png',
        size: 11,
        type: 'qiniu',
        savename: '465ba8ef-8ea6-4d85-8c4c-dcda32f7f633.png',
        hash: 'FlS-VJYTDmH56gP0MJUIvvHQgsPS',
        url: 'https://data.cmswing.com/465ba8ef-8ea6-4d85-8c4c-dcda32f7f633.png',
      });
      JSON.parse(testresbody);
      const upload = await ctx.service.sys.upload.upload(data, file);
      if (upload) {
        const resdata = {};
        resdata.name = upload.name;// 原始文件名
        resdata.mime = upload.mime;// 文件mime类型
        resdata.size = upload.size;// 文件大小kb
        resdata.type = upload.location;// 文件保存位置
        resdata.savename = upload.savename;// 保存名称
        resdata.hash = upload.hash;// hash
        resdata.value = await ctx.service.sys.upload.getFile(upload);// 文件地址
        console.log(resdata);
        const reshtml = await ctx.renderString(data.resBody, resdata);
        ctx.body = JSON.parse(reshtml);
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

}
module.exports = UploadController;
