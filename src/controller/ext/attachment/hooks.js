// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async homeUpPic(name, val) {
    // 钩子业务处理
    this.assign({name: name, val: val});
    const html = await this.hookRender('homeUpPic', 'attachment');
    return html;
  };
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async homeUpPics(name, val) {
    // 钩子业务处理
    this.assign({name: name, val: val});
    const html = await this.hookRender('homeUpPics', 'attachment');
    return html;
  };
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async homeUpFile(name, val) {
    // 钩子业务处理
    this.assign({name: name, val: val});
    const html = await this.hookRender('homeUpFile', 'attachment');
    return html;
  };
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async adminUpPic(name, val) {
    // 钩子业务处理
    this.assign({name: name, val: val});
    const html = await this.hookRender('adminUpPic', 'attachment');
    return html;
  };
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async adminUpPics(name, val) {
    // 钩子业务处理
    this.assign({name: name, val: val});
    const html = await this.hookRender('adminUpPics', 'attachment');
    return html;
  };
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async adminUpFile(name, val) {
    // 钩子业务处理
    this.assign({name: name, val: val});
    const html = await this.hookRender('adminUpFile', 'attachment');
    return html;
  }
};
