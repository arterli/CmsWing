'use strict';
const Controller = require('../../core/base_controller');
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
    const json = require(jsonDir);
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
    map.where = { admin: false };
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
    // const site = {
    //   pages: [
    //     {
    //       label: '模块',
    //       children: [
    //         {
    //           label: '首页',
    //           url: '/',
    //           redirect: '/index/1',
    //           icon: 'fa-solid fa-house-chimney-window',
    //         },

    //         {
    //           label: 'BBS',
    //           icon: 'fa-solid fa-b',
    //           schema: {
    //             type: 'page',
    //             title: '页面B',
    //             body: '页面B',
    //           },
    //         },
    //         {
    //           label: '测试模块',
    //           icon: 'fa fa-cube',
    //           children: [
    //             {
    //               label: '列表',
    //               url: '/crud/list',
    //               icon: 'fa fa-list',
    //               schemaApi: 'get:/pages/crud-list.json',
    //             },
    //             {
    //               label: '新增',
    //               url: '/crud/new',
    //               icon: 'fa fa-plus',
    //               schemaApi: 'get:/pages/crud-new.json',
    //             },
    //             {
    //               label: '查看',
    //               url: '/crud/:id',
    //               schemaApi: 'get:/pages/crud-view.json',
    //             },
    //             {
    //               label: '修改',
    //               url: '/crud/:id/edit',
    //               schemaApi: 'get:/pages/crud-edit.json',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       label: '系统',
    //       icon: 'fa-solid fa-user',
    //       children: [
    //         {
    //           label: '会员管理',
    //           icon: 'fa-solid fa-user',
    //           schemaApi: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/service/form?tpl=tpl3',
    //         },
    //         {
    //           label: '系统用户',
    //           icon: 'fa-solid fa-user-gear',
    //           schemaApi: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/service/form?tpl=tpl3',
    //         },
    //         {
    //           label: '模型管理',
    //           icon: 'fa-solid fa-database',
    //           url: '/sys/models',
    //           schemaApi: 'get:/pages/sys/models/index.json',
    //         },
    //         {
    //           label: '路由管理',
    //           icon: 'fa-solid fa-route',
    //           url: '/sys/routes',
    //           schemaApi: 'get:/pages/sys/routes/index.json',
    //         },
    //         {
    //           label: '权限管理',
    //           icon: 'fa-solid fa-shield-virus',
    //           schemaApi: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/service/form?tpl=tpl3',
    //         },
    //         {
    //           label: '外部链接',
    //           icon: 'fa-solid fa-link',
    //           link: 'http://baidu.gitee.io/amis',
    //         },
    //       ],
    //     },
    //   ],
    // };
    this.success({ pages: tree });
  }
  async test() {
    const { Op } = require('sequelize');
    const res = await this.ctx.model.SysModels.destroy({
      where: {
        id: { [Op.in]: [ 18, 19 ] },
      },
    });
    console.log('destroy', res);
    this.success(res);
  }
}
module.exports = IndexController;
