// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async logins(...val) {
    // 钩子业务处理
    let html;
    if (this.isMobile) {
      html = await this.hookRender('logins', 'qq', 'm');
    } else {
      html = await this.hookRender('logins', 'qq');
    }
    return html;
  }
};
