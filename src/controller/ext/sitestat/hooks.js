// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async AdminIndex(...val) {
    // 钩子业务处理
    // 用户统计
    const user_count = await this.model('member').count('id');
    // 行为
    const action_count = await this.model('action').count('id');
    // 栏目
    const cate_count = await this.model('category').count('id');
    // 模型
    const model_count = await this.model('model').count('id');
    // 插件
    const ext_count = await this.model('ext').count('ext');
    // 分类信息
    const type_count = await this.model('type').count('typeid');
    this.assign({
      user_count: user_count,
      action_count: action_count,
      cate_count: cate_count,
      model_count: model_count,
      ext_count: ext_count,
      type_count: type_count
    });
    const html = await this.hookRender('AdminIndex', 'sitestat');
    return html;
  }
}