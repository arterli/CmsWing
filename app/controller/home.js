'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const q = { query: 'mutation{\n  createItem(userID:1,content:"dfsafafdsa12312"){\n    id content\n  }\n}', variables: null };
    // const res = await ctx.graphqlQuery(JSON.stringify(q));
    // await ctx.service.sys.generate.models('1796faf3-5ec8-42ee-8db9-9cf86af0fe12');
    // await ctx.service.sys.generate.graphqlAll();
    await ctx.service.sys.generate.routes();
    ctx.body = 'dd';
  }
}

module.exports = HomeController;
