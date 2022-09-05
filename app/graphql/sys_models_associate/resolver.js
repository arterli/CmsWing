
'use strict';
module.exports = {
  SysModelsAssociate: {
  async sys_models(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.models_uuid };
    return await ctx.connector.sys_models.findOne(map);
  },
 },
    
  Query: {
    async SysModelsAssociate_findAll(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.findAll(params);
    },
    async SysModelsAssociate_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.findByPk(params);
    },
    async SysModelsAssociate_findOne(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.findOne(params);
    },
    async SysModelsAssociate_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysModelsAssociate_create(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.create(params);
    },
    async SysModelsAssociate_destroy(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.destroy(params);
    },
    async SysModelsAssociate_update(_root, params, ctx) {
      return await ctx.connector.sys_models_associate.update(params);
    },
  },
};
