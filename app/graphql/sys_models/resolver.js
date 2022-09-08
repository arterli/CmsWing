
'use strict';
module.exports = {
  SysModels: {
  async sys_models_fields(root, params, ctx) {
    const map = {};
    map.where = { models_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_models_fields.findAll(map);
  },

  async sys_models_indexes(root, params, ctx) {
    const map = {};
    map.where = { models_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_models_indexes.findAll(map);
  },

  async sys_models_associate(root, params, ctx) {
    const map = {};
    map.where = { models_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_models_associate.findAll(map);
  },
},
    
  Query: {
    async SysModels_findAll(_root, params, ctx) {
      return await ctx.connector.sys_models.findAll(params);
    },
    async SysModels_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_models.findByPk(params);
    },
    async SysModels_findOne(_root, params, ctx) {
      return await ctx.connector.sys_models.findOne(params);
    },
    async SysModels_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_models.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysModels_create(_root, params, ctx) {
      return await ctx.connector.sys_models.create(params);
    },
    async SysModels_destroy(_root, params, ctx) {
      return await ctx.connector.sys_models.destroy(params);
    },
    async SysModels_update(_root, params, ctx) {
      return await ctx.connector.sys_models.update(params);
    },
  },
};
