'use strict';
import Base from '../../../topic/controller/base.js';

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
      let cate = await this.category(cid);
      console.log(cate);
      //获取面包屑信息
      let breadcrumb = await this.model('category',{},'admin').get_parent_category(cid,true);
      this.assign('breadcrumb', breadcrumb);
      console.log(breadcrumb)
      this.assign('category', cate);
      this.meta_title = "发布";
      return this.display();
  }
}