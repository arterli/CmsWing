// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async adminAtlas(name,val) {
    // 钩子业务处理
    this.assign('name',name);
    this.assign('val',val);
    const html = await this.hookRender('adminAtlas', 'atlas');
    return html;
  };
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async homeAtlas(name,val) {
    // 钩子业务处理
    this.assign('name',name);
    this.assign('val',val);
    const html = await this.hookRender('homeAtlas', 'atlas');
    return html;
  }
}