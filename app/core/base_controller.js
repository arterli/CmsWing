'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    const { Sequelize } = this.app;
    // 系统导航标签 {{'sys'|@navigation}}
    this.app.nunjucks.addFilter('@navigation', async (m, callback) => {
      // console.log(m);
      // if (m !== 'sys') return [];
      const map = {};
      map.order = [[ 'sort', 'ASC' ], [ 'id', 'ASC' ]];
      map.where = {};
      map.status = true;
      const list = (await ctx.model.SysNavigation.findAll(map)).map(item => item.toJSON());
      const tree = ctx.helper.arr_to_tree(list, 0);
      callback(null, tree);
    }, true);

    // findAll {{'mdoel'|@findOne('{where:{a:1}}')}}
    this.app.nunjucks.addFilter('@findOne', async (model, map, callback) => {
      const modelName = ctx.helper._.upperFirst(ctx.helper._.camelCase(model));
      // Sequelize.where(Sequelize.fn('FIND_IN_SET', v, Sequelize.col('position')), '>', 0)
      // console.log('dfsafdsafdsafdsafasfas', modelName, map);
      if (map.where) {
        for (const key in map.where) {
          if (Object.hasOwnProperty.call(map.where, key)) {
            if (key === 'FIND_IN_SET') {
              map.where.op_and = [];
              map.where.op_and.push(Sequelize.where(Sequelize.fn('FIND_IN_SET', map.where.FIND_IN_SET[1], Sequelize.col(map.where.FIND_IN_SET[0])), '>', 0));
              delete map.where.FIND_IN_SET;
            }
          }
        }
      }
      let res = await ctx.model[modelName].findOne(map);
      res = res ? res.toJSON() : res;
      callback(null, res);
    }, true);
    // findAll {{'mdoel'|@findAll('{where:{a:1}}')}}
    this.app.nunjucks.addFilter('@findAll', async (model, map, callback) => {
      const modelName = ctx.helper._.upperFirst(ctx.helper._.camelCase(model));
      // Sequelize.where(Sequelize.fn('FIND_IN_SET', v, Sequelize.col('position')), '>', 0)
      // console.log('dfsafdsafdsafdsafasfas', modelName, map);
      if (map.where) {
        for (const key in map.where) {
          if (Object.hasOwnProperty.call(map.where, key)) {
            if (key === 'FIND_IN_SET') {
              map.where.op_and = [];
              map.where.op_and.push(Sequelize.where(Sequelize.fn('FIND_IN_SET', map.where.FIND_IN_SET[1], Sequelize.col(map.where.FIND_IN_SET[0])), '>', 0));
              delete map.where.FIND_IN_SET;
            }
          }
        }
      }
      const res = (await ctx.model[modelName].findAll(map)).map(item => item.toJSON());
      callback(null, res);
    }, true);
  }
  get user() {
    return this.ctx.session.user;
  }

  success(data, msg = '操作成功') {
    this.ctx.body = {
      status: 0,
      msg,
      data,
    };
  }
  fail(msg, errorCode = 1000, data) {
    this.ctx.body = {
      status: errorCode,
      msg,
      data,
    };
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
