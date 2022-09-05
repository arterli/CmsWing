
'use strict';
module.exports = {
  SysModelsIndexes: {
  async sys_models(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.models_uuid };
    return await ctx.connector.sys_models.findOne(map);
  },
 },
    
  Query: {
    async SysModelsIndexes_findAll(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.findAll(params);
    },
    async SysModelsIndexes_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.findByPk(params);
    },
    async SysModelsIndexes_findOne(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.findOne(params);
    },
    async SysModelsIndexes_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysModelsIndexes_create(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.create(params);
    },
    async SysModelsIndexes_destroy(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.destroy(params);
    },
    async SysModelsIndexes_update(_root, params, ctx) {
      return await ctx.connector.sys_models_indexes.update(params);
    },
  },
};
