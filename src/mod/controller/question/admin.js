'use strict';

import Base from '../admin.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.tactive = "article";
  }
  /**
   * 模型后台管理入口
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let cate_id = this.get('cate_id') || null;
    if(think.isEmpty(cate_id)){
      this.http.error = new Error('该栏目不存在！');
      return think.statusAction(702, this.http);
    }
    let name = await this.model("category").get_category(cate_id, 'name')||cate_id;
    //获取面包屑信息
    let nav = await this.model('category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    //获取内容

    this.meta_title = '独立模型';
    this.assign({
      "navxs": true,
      "name":name,
    });
    return this.modtemp(this.mod.name);
  }
}