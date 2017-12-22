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
   * 接口管理
   * @returns {Promise<void>}
   */
  async apiAction() {
    // -- 分页
    const model = this.extModel('collector');
    const data = await model.page(this.get('page')).countSelect(); // 获取分页数据
    const html = this.pagination(data); // 调取分页
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.extDisplay();
  }

  /**
   * 添加入库接口
   * @returns {Promise<*>}
   */
  async addapiAction() {
    if (this.isPost) {
      const data = this.post();
      data.create_time = new Date().getTime();
      data.update_time = new Date().getTime();
      const add = await this.extModel('collector').add(data);
      if (add) {
        return this.success({name: '添加成功!', url: `/${this.ctx.controller}/api`});
      } else {
        return this.fail('添加失败!');
      }
    } else {
      // 获取所有可用模型
      const modellist = await this.model('model').where({id: ['!=', 1]}).select();
      this.assign('modellist', modellist);
      this.meta_title = '添加入库接口';
      return this.extDisplay();
    }
  }
  async editapiAction() {
    if (this.isPost) {
      const data = this.post();
      data.update_time = new Date().getTime();
      const up = await this.extModel('collector').update(data);
      if (up) {
        return this.success({name: '修改成功!', url: `/${this.ctx.controller}/api`});
      } else {
        return this.fail('修改失败!');
      }
    } else {
      const id = this.get('id');
      // 获取修改数据
      const info = await this.extModel('collector').find(id);
      this.assign('info', info);
      // 获取所有可用模型
      const modellist = await this.model('model').where({id: ['!=', 1]}).select();
      this.assign('modellist', modellist);
      this.meta_title = '修改入库接口';
      return this.extDisplay();
    }
  }
  /**
   * 新增字段检查同一张表是否有相同的字段
   */
  async checknameAction() {
    const name = this.get('name');
    const res = await this.extModel('collector').where({name: name}).find();
    if (think.isEmpty(res)) {
      return this.json(1);
    } else {
      return this.json(0);
    }
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
