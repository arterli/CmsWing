// hooks
module.exports = class extends think.cmswing.modIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async hometitle() {
    // 钩子业务处理
    const html = await this.hookRender('hometitle', 'question');
    return html;
  }
  async homelist() {
    // 钩子业务处理
    const html = await this.hookRender('homelist', 'question');
    return html;
  }
  async homeright() {
    const html = await this.hookRender('homeright', 'question');
    return html;
  }
};
