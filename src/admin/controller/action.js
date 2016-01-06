'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.tactive = "user";
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let action = await this.model('action').where({'status':['>',-1]}).order("id DESC").page(this.get('page')).countSelect();
    let _pages = think.adapter("pages","page");
    let pages = new _pages();
    let page = pages.pages(action);
    this.assign("pagerData",page);
    this.assign("list",action.data);
    this.meta_title = "用户行为";
    return this.display();
  }

  async logAction(){
    //获取列表数据
    let map={}
     map.status = ['>',-1];
    let list = await this.model("action_log").where({'status':['>',-1]}).order("id DESC").page(this.get('page')).countSelect();
    console.log(list);
    let _pages = think.adapter("pages","page");
    let pages = new _pages();
    let page = pages.pages(list);
    this.assign("pagerData",page);
    for(let itme of list.data){
       itme.action_id=await this.model("action").get_action(itme.action_id,"title");
      itme.user_id = await this.model("member").get_nickname(itme.user_id);
    }
    this.assign("list",list.data);
    this.meta_title = "行为日志";
   return this.display();
  }
}