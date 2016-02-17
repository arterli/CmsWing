'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    this.meta_title = "首页";//标题1
    this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
    this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
    return this.display();

  }
}
