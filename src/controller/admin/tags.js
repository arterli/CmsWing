// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.admin {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    // auto render template file index_index.html
    return this.display();
  }
  // ajax添加tags
  async ajaxaddtagsAction() {
    const data = this.post();
    data.model_id = Number(data.model_id);
    const model = this.model('tags');
    const res = await model.where({name: data.name}).thenAdd(data);
    if (res.type == 'exist') {
      await model.where({id: res.id}).increment('num');
      return this.fail('已经存在，不要重复添加，请直接选择！');
    }
    const rdata = {
      errno: 0,
      id: res.id,
      name: data.name
    };
    return this.json(rdata);
  }
  async ajaxgettagsAction() {
    const map = this.get();
    const model = this.model('tags');
    const res = await model.where(map).select();
    return this.json(res);
  }
};
