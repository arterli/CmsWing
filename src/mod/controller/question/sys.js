'use strict';
import Base from '../index.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
  indexAction(){
    //console.log(this);
    //auto render template file index_index.html

   return this.display();
  }

  async addAction(){
      //auto render template file index_index.html
      let cid = this.get("cid");
      //获取面包屑信息
      let breadcrumb = await this.model('category').get_parent_category(cid,true);
      this.assign('breadcrumb', breadcrumb);
      console.log(breadcrumb)
      this.assign('category', this.m_cate);
      this.meta_title = "发布";
      return this.display();
  }
  async testAction(){
      return this.display();
  }
}