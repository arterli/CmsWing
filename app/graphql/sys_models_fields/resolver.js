
'use strict';
module.exports = {
  SysModelsFields: {
  async sys_models(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.models_uuid };
    return await ctx.connector.sys_models.findOne(map);
  },
 },
    
  Query: {
    async SysModelsFields_findAll(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.findAll(params);
    },
    async SysModelsFields_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.findByPk(params);
    },
    async SysModelsFields_findOne(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.findOne(params);
    },
    async SysModelsFields_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysModelsFields_create(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.create(params);
    },
    async SysModelsFields_destroy(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.destroy(params);
    },
    async SysModelsFields_update(_root, params, ctx) {
      return await ctx.connector.sys_models_fields.update(params);
    },
  },
};
