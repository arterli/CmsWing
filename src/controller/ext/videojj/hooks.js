// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async videoPlayer(info) {
    // 钩子业务处理
    this.assign('info', info);
    let html;
    if (this.isMobile) {
      html = await this.hookRender('videoPlayer', 'videojj', 'm');
    } else {
      html = await this.hookRender('videoPlayer', 'videojj');
    }
    return html;
  }
};
