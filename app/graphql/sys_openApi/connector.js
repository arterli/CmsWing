
'use strict';
class SysOpenApiConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.model = ctx.app.model.SysOpenApi;
  }
  async findAll(body) {
    const map = {};
    if (Object.hasOwnProperty.call(body, 'limit')) {
      map.limit = body.limit;
    }
    if (Object.hasOwnProperty.call(body, 'offset')) {
      map.offset = body.offset;
    }
    // 排序
    if (body.order && !this.ctx.helper._.isEmpty(this.ctx.helper._.compact(body.order[0]))) {
      map.order = body.order;
    }
    map.where = body.where;
    const res = await this.model.findAll(map);
    return res;
  }
  async findByPk(body) {
    const res = await this.model.findByPk(body.id);
    return res;
  }
  async findOne(body) {
    const map = {};
    map.where = body.where;
    const res = await this.model.findOne(map);
    return res;
  }
  async findAndCountAll(body) {
    const map = {};
    map.limit = body.limit;
    map.offset = body.offset;
    if (body.order && !this.ctx.helper._.isEmpty(this.ctx.helper._.compact(body.order[0]))) {
      map.order = body.order;
    }
    map.where = body.where;
    const res = await this.model.findAndCountAll(map);
    return res;
  }
  async create(body) {
    const res = await this.model.create(body.data);
    return res;
  }
  async destroy(body) {
    const map = {};
    map.where = body.where;
    const res = await this.model.destroy(map);
    return { count: res };
  }
  async update(body) {
    const map = {};
    map.where = body.where;
    const res = await this.model.update(body.data, map);
    return { ids: res };
  }
}
module.exports = SysOpenApiConnector;
