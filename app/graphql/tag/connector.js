'use strict';

class TagConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Admin.Tag;
  }

  async fetchByItemId(itemID) {
    const tags = await this.proxy.findAll({
      where: {
        item_id: itemID,
      },
    });
    return tags.map(t => t.content);
  }

  async attach(itemID, content) {
    const tag = await this.proxy.create({ item_id: itemID, content });
    return tag.toJSON();
  }

  async remove(id) {
    const item = await this.proxy.findOne({ where: { id } });
    const ret = item.toJSON();
    await item.destroy();
    return ret;
  }

  async fetchRecommandation() {
    const tags = await this.proxy.findAll({
      attributes: [ 'content' ],
      group: [ 'content' ],
      limit: 10,
    });
    return tags.map(t => t.content);
  }
}

module.exports = TagConnector;

