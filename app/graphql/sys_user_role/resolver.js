
'use strict';
module.exports = {
  SysUserRole: {
      async sys_user(root, params, ctx) {
        const map = {};
        map.where = { uuid: root.user_uuid };
        return await ctx.connector.sys_user.findOne(map);
      },
    
      async sys_role(root, params, ctx) {
        const map = {};
        map.where = { uuid: root.role_uuid };
        return await ctx.connector.sys_role.findOne(map);
      },
    },
    
  Query: {
    async SysUserRole_findAll(_root, params, ctx) {
      return await ctx.connector.sys_user_role.findAll(params);
    },
    async SysUserRole_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_user_role.findByPk(params);
    },
    async SysUserRole_findOne(_root, params, ctx) {
      return await ctx.connector.sys_user_role.findOne(params);
    },
    async SysUserRole_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_user_role.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysUserRole_create(_root, params, ctx) {
      return await ctx.connector.sys_user_role.create(params);
    },
    async SysUserRole_destroy(_root, params, ctx) {
      return await ctx.connector.sys_user_role.destroy(params);
    },
    async SysUserRole_update(_root, params, ctx) {
      return await ctx.connector.sys_user_role.update(params);
    },
  },
};
