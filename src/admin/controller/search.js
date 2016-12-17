'use strict';

import Base from './base.js';

export default class extends Base {
    init(http) {
        super.init(http);
        this.tactive = "setup";

    }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
      this.meta_title = "全站搜索";
    return this.display();
  }

   async createindexAction(){
      this.meta_title = "重建索引";
      this.active="admin/search/index"
      return this.display();
    }
}