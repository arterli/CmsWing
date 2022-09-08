
'use strict';
module.exports = {
  SysRole: {
      async sys_user_role(root, params, ctx) {
        const map = {};
        map.where = { role_uuid: root.uuid };
        if (Object.hasOwnProperty.call(params, 'limit')) {
          map.limit = params.limit;
        }
        if (Object.hasOwnProperty.call(params, 'offset')) {
          map.offset = params.offset;
        }
        if (Object.hasOwnProperty.call(params, 'order')) {
          map.order = params.order;
        }
        return await ctx.connector.sys_user_role.findAll(map);
      },
    },
    
  Query: {
    async SysRole_findAll(_root, params, ctx) {
      return await ctx.connector.sys_role.findAll(params);
    },
    async SysRole_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_role.findByPk(params);
    },
    async SysRole_findOne(_root, params, ctx) {
      return await ctx.connector.sys_role.findOne(params);
    },
    async SysRole_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_role.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysRole_create(_root, params, ctx) {
      return await ctx.connector.sys_role.create(params);
    },
    async SysRole_destroy(_root, params, ctx) {
      return await ctx.connector.sys_role.destroy(params);
    },
    async SysRole_update(_root, params, ctx) {
      return await ctx.connector.sys_role.update(params);
    },
  },
};
