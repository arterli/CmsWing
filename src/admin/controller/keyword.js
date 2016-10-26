// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.tactive = "article";

  }
  /** 话题控制器
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //搜索
    let map = {};
    if(this.get("title")){
      map.title=["like","%"+this.get("title")+"%"]
    }
    let list = await this.model("keyword").where(map).order('discuss_count_update DESC').page(this.get("page"),20).countSelect();
    for (let v of list.data){
      v.lastuser = await this.model("keyword_data").where({tagid:v.id}).order("add_time DESC").getField("uid",true);
    }
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(this.http); //实例化 Adapter
    let page = pages.pages(list);
    this.assign('list', list);
    this.assign('pagerData', page); //分页展示使用
    this.meta_title="话题管理";
    //auto render template file index_index.html
    return this.display();
  }
  //锁定话题
  async lockAction(){
    let id = this.get("ids");
    let lock = this.get("lock");
    let up = await this.model("keyword").where({id:id}).update({lock:lock});
    if(up){
      return this.success({name:"操作成功!"});
    }else {
      return this.fail("操作失败!")
    }
  }
}