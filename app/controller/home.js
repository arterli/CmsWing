'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs/promises');
const fsSync = require('fs');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const q = { query: 'mutation{\n  createItem(userID:1,content:"dfsafafdsa12312"){\n    id content\n  }\n}', variables: null };
    // const res = await ctx.graphqlQuery(JSON.stringify(q));
    // await ctx.service.sys.generate.models('1796faf3-5ec8-42ee-8db9-9cf86af0fe12');
    // await ctx.service.sys.generate.graphqlAll();
    // await ctx.service.sys.generate.routes();
    // 生成目录
    // const rootFolder = path.join(this.app.baseDir, 'app', 'pages', 'aaa', 'bbbbb');
    // ctx.helper.mkdirsSync(rootFolder);
    const mulu = path.join(this.app.baseDir, 'app', path.dirname('/fdsafsda/fdsaf/fsda.js'));
    console.log(mulu);
    ctx.body = 'dd';
  }
}

module.exports = HomeController;
