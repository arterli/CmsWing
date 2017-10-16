// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的homeEnd钩子方法
   * 【视图】
   * @param ...val
   */
  async homeEnd(...val) {
    // 钩子业务处理
    // 首页底部显示友情链接
    const data = await this.model('ext_link').cache(1000 * 1000).where({passed: 1}).limit(24).order('sort Asc').select();
    this.assign('link', data);
    const html = await this.hookRender('homeEnd', 'link');
    return html;
  }
};
