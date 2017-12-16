
// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
/**
 * 插件前台控制器
 * 如果插件有前台展示业务，写在这个控制器里面
 * 插件如需建立表务必遵循下面格式：
 * 单表：表前缀_ext_插件目录名
 * 多表：表前缀_ext_插件目录名，表前缀_ext_插件目录名_分表1，表前缀_ext_插件目录名_分表2...
 */
module.exports = class extends think.cmswing.extIndex {
  /**
   * index action
   *
   * @return {Promise} []
   */

  async indexAction() {
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

    if (this.isMobile) {
      return this.extDisplay('m');
    } else {
      return this.extDisplay();
    }
  }
};
