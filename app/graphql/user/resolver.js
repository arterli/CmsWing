'use strict';

module.exports = {
  Query: {
    async user(root, params, ctx) {
      console.log(params);
      const res = await ctx.connector.user.fetchById(params);
      return res;
    },
    tags(root, params, ctx) {
      return ctx.connector.tag.fetchRecommandation();
    },
  },
};
