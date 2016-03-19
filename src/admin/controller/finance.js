'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.tactive = "finance";
  }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  /**
   * 财务日志
   */
  async logAction(){
    let list = await this.model("balance_log").order("id DESC").page(this.get('page')).countSelect();
    //console.log(list);
    let _pages = think.adapter("pages","page");
    let pages = new _pages();
    let page = pages.pages(list);
    this.assign("pagerData",page);
    for(let itme of list.data){
      itme.user_id = await this.model("member").get_nickname(itme.user_id);
      itme.admin_id = get_nickname(itme.admin_id);
    }
    this.assign("list",list.data);
    this.meta_title = "财务日志";
    this.display();
  }
}