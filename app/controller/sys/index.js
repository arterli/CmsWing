/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
const fs = require('fs-extra');
const path = require('path');
const { Op } = require('sequelize');
/**
* @controller 系统入口
*/
class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('sys/index');
  }
  async login() {
    const { ctx } = this;
    if (ctx.session.adminToken) {
      ctx.redirect('/admin');
    }
    await ctx.render('sys/login');
  }
  /**
  * @summary 登录接口
  * @description 登录接口
  * @router post /admin/loginPost
  * @request body sys_user_add *body desc
  * @response 200 baseRes desc
  */
  async lginPost() {
    const { ctx } = this;
    let { username, password } = ctx.request.body;
    password = ctx.helper.cipher(password);
    const user = await ctx.model.SysUser.findOne({
      where: {
        username,
        password,
      },
    });
    if (user) {
      const token = ctx.helper.generateToken(user);
      // 设置 Session
      ctx.session.adminToken = token;
      console.log(token);
      this.success('登录成功');
    } else {
      this.fail('账号密码错误');
    }
  }
  /**
  * @summary 退出登录
  * @description 退出登录
  * @router get /admin/logout
  * @response 200 baseRes desc
  */
  async logout() {
    const { ctx } = this;
    ctx.session.adminToken = null;
    ctx.redirect('/admin/login');
  }
  async getJson() {
    const { ctx } = this;
    const name = ctx.params[0];
    console.log(name);
    const jsonDir = path.join(this.app.baseDir, 'app', 'pages', name);
    const json = await fs.readJson(jsonDir, { throws: false });
    ctx.body = json;
  }
  // graphql接口暴漏
  async graphql() {
    const body = this.ctx.request.body;
    const { model } = this.ctx.params;
    // 后台接口
    if (!model || model === 'admin') {
      // 验证权限
      const token = this.ctx.session.adminToken || this.ctx.get('token');
      const userInfo = this.ctx.helper.deToken(token);
      if (userInfo) {
        if (!userInfo.admin) {
          const check = await this.service.sys.rbac.graphql(body.query, userInfo.uuid);
          if (!check) {
            this.ctx.body = {
              status: 403,
              msg: '对不起，您无权访问此接口。',
              data: {
                path: this.ctx.url,
              },
            };
            return false;
          }
        }
      } else {
        this.ctx.body = {
          status: 401,
          msg: '未登录',
          data: { isLogin: false },
        };
        return false;
      }
    } else if (model === 'open') {
      // 开放接口
      const check = await this.service.sys.rbac.openApi(body.query);
      if (!check) {
        this.ctx.body = {
          status: 403,
          msg: '对不起，您无权访问此接口。',
          data: {
            path: this.ctx.url,
          },
        };
        return false;
      }
    } else {
      this.ctx.body = {
        status: 403,
        msg: '对不起，您无权访问此接口。',
        data: {
          path: this.ctx.url,
        },
      };
      return false;
    }
    const res = await this.ctx.graphqlQuery(JSON.stringify(body));
    // console.log(body);
    // console.log(JSON.stringify(res.data, null, 2));
    this.ctx.body = {
      status: 0,
      msg: '',
      data: res.data,
    };
  }
  async site() {
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = { admin: false, class_uuid: '8f5757a3-8af9-45db-8819-d767aaddfadb' };
    const roleIds = await this.ctx.service.sys.rbac.getRoleIds(this.ctx.userInfo.uuid);
    if (!this.ctx.helper._.isEmpty(roleIds)) {
      map.where.uuid = { [Op.in]: roleIds };
    }
    const ml = await this.ctx.model.SysRoutes.findAll(map);
    const arr = [];
    for (const v of ml) {
      const obj = {};
      obj.label = v.name;
      obj.uuid = v.uuid;
      obj.puuid = v.puuid;
      if (v.icon) {
        obj.icon = v.icon;
      }
      if (v.path) {
        obj.url = v.path;
      }
      if (v.link) {
        obj[v.linkType] = v.link;
      }
      arr.push(obj);
    }
    const tree = this.ctx.helper.arr_to_tree(arr, '0', 'uuid', 'puuid');
    this.success({ pages: tree });
  }
  async team() {
    const items = [];
    items.push({ name: '总策划&主开发', value: '<a href=\'https://www.cmswing.com\' target=\'_blank\'>阿特</a>' });
    items.push({ name: '研发团队', value: '<a href=\'https://www.cmswing.com\' target=\'_blank\'>阿特</a>' });
    items.push({ name: '开源贡献者', value: '-' });
    items.push({ name: '开源协议', value: '<a href=\'https://gitee.com/cmswing/CmsWing/blob/master/LICENSE\' target=\'_blank\'> MulanPSL-2.0</a>' });
    items.push({ name: '相关链接', value: '<a href=\'https://www.cmswing.com\' target=\'_blank\'>CmsWing官网</a>，<a href=\'https://www.eggjs.org/zh-CN\' target=\'_blank\'>EggJS官网</a>' });
    this.success({ items });
  }
  async sysInfo() {
    const items = [];
    const packagePath = path.join(this.app.baseDir, 'package.json');
    const packageInfo = await fs.readJson(packagePath, { throws: false });
    items.push({ name: 'CmsWing 程序版本', value: packageInfo.version });
    items.push({ name: 'egg 程序版本', value: packageInfo.dependencies.egg });
    items.push({ name: 'Node.js 版本', value: process.version });
    items.push({ name: '服务器系统', value: `${process.platform}/${process.arch}` });
    items.push({ name: '服务器 MySQL 版本', value: (await this.ctx.model.query('select version()'))[0][0]['version()'] });
    // console.log(packageInfo);
    console.log((await this.ctx.model.query('select version()')));
    this.success({ items });
  }
  async gitee() {
    this.ctx.body = `<script src='https://gitee.com/cmswing/CmsWing/widget_preview' async defer></script>
    <div id="osc-gitee-widget-tag"></div>
    <script>
    window.onload=function(){
    var aList = document.getElementsByTagName('a');//获取所有的标签a
    for(var i=0;i<aList.length;i++){
      aList[i].target='_blank';//定义成打开新窗口
      }
   }
    </script>
    <style>
    body {
      display: block;
      margin: 0px;
      padding:0;
    }
    .osc_pro_color {color: #4183c4 !important;}
    .osc_panel_color {background-color: #ffffff !important;}
    .osc_background_color {background-color: #ffffff !important;}
    .osc_border_color {border-color: #e3e9ed !important;}
    .osc_desc_color {color: #666666 !important;}
    .osc_link_color * {color: #9b9b9b !important;}
    </style>`;
  }
}
module.exports = IndexController;
