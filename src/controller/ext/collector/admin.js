// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
// 本文件不能删除
module.exports = class extends think.cmswing.extAdmin {
  /**
   * index action
   * 插件管理入口
   * @return {Promise} []
   */
  async indexAction() {
    // 分页列表实例

    // -- 获取插件目录名
    // this.ext.ext;

    // -- 获取当前分类
    // await this.gettype()

    // -- model调用
    // const list = await this.extModel('demo').select();
    // const list2 = await this.extModel('demo').demo();
    // const list3 = await think.extModel('demo','demo').demo();

    // -- 分页
    // const model = this.extModel('demo');
    // const data = await model.page(this.get('page')).countSelect(); // 获取分页数据
    // console.log(data);
    // const html = this.pagination(data); // 调取分页
    // this.assign('pagerData', html); // 分页展示使用

    // -- ext service
    // 无参数类的实例化
    // const Ser1 = this.extService('demo');
    // const Ser1 = think.extService('demo','demo');
    // const ser1 = Ser1.bbb('bbb');
    // console.log(ser1);
    // 有参数类的实例化
    // const Ser2 = this.extService('demo','demo','aaa','bbb');
    // const Ser2 = think.extService('demo','demo','aaa','bbb');
    // const ser2 = Ser2.aaa();
    // console.log(ser2);
    // 入口模版渲染
    return this.extDisplay();
  }

  /**
   * 添加
   * @returns {*}
   */
  async addAction() {
    // d

  }

  /**
     * 修改
     */
  async editAction() {

  }

  /**
     * 删除
     */
  async delAction() {

  }
};
