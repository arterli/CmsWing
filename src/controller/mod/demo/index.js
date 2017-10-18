
// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
/**
 * 模型前台控制器
 * 如果插件有前台展示业务，写在这个控制器里面
 */
module.exports = class extends think.cmswing.modIndex {
  /**
   * 封面
   * @returns {Promise.<*>}
   */
  async indexAction() {
    // -- model调用
    // const list = await this.modModel('demo').select();
    // const list2 = await this.modModel('demo').demo();
    // const list3 = await think.modModel('demo','demo').demo();

    // -- 分页
    // const model = this.modModel('demo');
    // const data = await model.page(this.get('page')).countSelect(); // 获取分页数据
    // console.log(data);
    // const html = this.pagination(data); // 调取分页
    // this.assign('pagerData', html); // 分页展示使用

    // -- ext service
    // 无参数类的实例化
    // const Ser1 = this.modService('demo');
    // const Ser1 = think.modService('demo','demo');
    // const ser1 = Ser1.bbb('bbb');
    // console.log(ser1);
    // 有参数类的实例化
    // const Ser2 = this.modService('demo','demo','aaa','bbb');
    // const Ser2 = think.modService('demo','demo','aaa','bbb');
    // const ser2 = Ser2.aaa();
    // console.log(ser2);
    // 获取栏目信息
    const cate = this.m_cate;
    this.assign('category', cate);

    // 获取当前栏目的模型
    const model = this.mod;
    this.assign('model', model);

    // 面包屑
    await this.breadcrumb();
    if (this.isMobile) {
      return this.modDisplay('m');
    } else {
      return this.modDisplay();
    }
  }

  /**
   * 列表
   * @returns {Promise.<*>}
   */
  async listAction() {
    // 获取栏目信息
    const cate = this.m_cate;
    this.assign('category', cate);

    // 获取当前栏目的模型
    const model = this.mod;
    this.assign('model', model);

    // 面包屑
    await this.breadcrumb();

    // 模版渲染
    if (this.isMobile) {
      return this.modDisplay('m');
    } else {
      return this.modDisplay();
    }
  }
};
