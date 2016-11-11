'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.db = this.model('ext');
    this.tactive = "ext"
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let data = await this.db.page(this.get('page')).countSelect();
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(this.http); //实例化 Adapter
    let page = pages.pages(data);
    this.assign('pagerData', page); //分页展示使用
    this.assign('list', data.data);
    this.meta_title = "插件管理";
    return this.display();
  }
}