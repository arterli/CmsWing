// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的documentDetailAfter钩子方法
   * 【视图】
   * @param ...val
   */
  async documentDetailAfter(info) {
    // 钩子业务处理
    this.assign('sid', info.id);
    let html;
    if (this.isMobile) {
      html = await this.hookRender('documentDetailAfter', 'changyan', 'm');
    } else {
      html = await this.hookRender('documentDetailAfter', 'changyan');
    }
    return html;
  }
};
