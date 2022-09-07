
'use strict';
module.exports = {
  SysUserGroup: {
  async sys_user(root, params, ctx) {
    const map = {};
    map.where = { group_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_user.findAll(map);
  },
},
    
  Query: {
    async SysUserGroup_findAll(_root, params, ctx) {
      return await ctx.connector.sys_user_group.findAll(params);
    },
    async SysUserGroup_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_user_group.findByPk(params);
    },
    async SysUserGroup_findOne(_root, params, ctx) {
      return await ctx.connector.sys_user_group.findOne(params);
    },
    async SysUserGroup_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_user_group.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysUserGroup_create(_root, params, ctx) {
      return await ctx.connector.sys_user_group.create(params);
    },
    async SysUserGroup_destroy(_root, params, ctx) {
      return await ctx.connector.sys_user_group.destroy(params);
    },
    async SysUserGroup_update(_root, params, ctx) {
      return await ctx.connector.sys_user_group.update(params);
    },
  },
};
