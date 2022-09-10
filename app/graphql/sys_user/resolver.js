
'use strict';
module.exports = {
  SysUser: {
  async cms_doc(root, params, ctx) {
    const map = {};
    map.where = { user_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.cms_doc.findAll(map);
  },

  async sys_user_group(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.group_uuid };
    return await ctx.connector.sys_user_group.findOne(map);
  },
 
      async sys_user_role(root, params, ctx) {
        const map = {};
        map.where = { user_uuid: root.uuid };
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
    async SysUser_findAll(_root, params, ctx) {
      return await ctx.connector.sys_user.findAll(params);
    },
    async SysUser_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_user.findByPk(params);
    },
    async SysUser_findOne(_root, params, ctx) {
      return await ctx.connector.sys_user.findOne(params);
    },
    async SysUser_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_user.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysUser_create(_root, params, ctx) {
      return await ctx.connector.sys_user.create(params);
    },
    async SysUser_destroy(_root, params, ctx) {
      return await ctx.connector.sys_user.destroy(params);
    },
    async SysUser_update(_root, params, ctx) {
      return await ctx.connector.sys_user.update(params);
    },
  },
};
