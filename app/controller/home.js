'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const q = { query: 'mutation{\n  createItem(userID:1,content:"dfsafafdsa12312"){\n    id content\n  }\n}', variables: null };

    const res = await ctx.graphqlQuery(JSON.stringify(q));
    ctx.body = res;
  }
}

module.exports = HomeController;
