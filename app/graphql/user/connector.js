'use strict';

const DataLoader = require('dataloader');
const { Op } = require('sequelize');
class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }
  async fetch(ids) {
    console.log('ttttt', ids[0].id);
    const users = await this.ctx.app.model.Admin.User.findAll({
      where: {
        id: {
          [Op.in]: [ ids[0].id ],
        },
      },
    });
    // console.log('dddddd', users);
    return users;
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  async fetchById(id) {
    console.log('dddd', id);
    const res = await this.loader.load(id);
    return res;
  }
}

module.exports = UserConnector;

