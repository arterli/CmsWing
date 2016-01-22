'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  //频道页
  async indexAction(){
    //auto render template file index_index.html
   let id = this.get('category')||0;
   let cate = await this.category(id);
   this.meta_title = cate.meta_title ? cate.meta_title : cate.title;//标题
   this.keywords = cate.keywords ? cate.keywords : '';//seo关键词
   this.description = cate.description ? cate.description : "";//seo描述
   this.assign('category',cate);
    return this.display();
  }
  //列表页
  listAction(){
      return this.display();
  }
  //详情页
  detailAction(){
      return this.display();
  }
 
}