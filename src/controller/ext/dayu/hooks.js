// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async smsRegistration(...val) {
    // 钩子业务处理
    let html;
    if (this.isMobile) {
      html = await this.hookRender('smsRegistration', 'dayu', 'm');
    } else {
      html = await this.hookRender('smsRegistration', 'dayu');
    }
    return html;
  }
};
