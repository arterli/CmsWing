
'use strict';
module.exports = {
  SysRoutesClassify: {
  async sys_routes(root, params, ctx) {
    const map = {};
    map.where = { class_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_routes.findAll(map);
  },
},
    
  Query: {
    async SysRoutesClassify_findAll(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.findAll(params);
    },
    async SysRoutesClassify_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.findByPk(params);
    },
    async SysRoutesClassify_findOne(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.findOne(params);
    },
    async SysRoutesClassify_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysRoutesClassify_create(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.create(params);
    },
    async SysRoutesClassify_destroy(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.destroy(params);
    },
    async SysRoutesClassify_update(_root, params, ctx) {
      return await ctx.connector.sys_routes_classify.update(params);
    },
  },
};
