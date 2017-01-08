'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.db = this.model("approval");
    this.tactive = "approval";
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
      let map = {};
      if(!think.isEmpty(this.get("model"))){
          map.model = this.get("model");
      }
      let list = await this.db.where(map).page(this.get('page'),20).order('time DESC').countSelect();
      let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
      let pages = new Pages(this.http); //实例化 Adapter
      let page = pages.pages(list);
      this.assign('pagerData', page); //分页展示使用
      this.assign('list', list);
      let modlist = await this.model("model").get_model(null,null,{is_approval:1});
      for(let val of modlist){
          val.count = await this.db.where({model:val.id}).count();
      }
      console.log(modlist);
      this.assign("model",modlist);
      this.assign("count",await this.db.count())
      this.meta_title = "内容审核";
    return this.display();
  }
}