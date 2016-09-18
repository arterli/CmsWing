'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction(){
    //auto render template file index_index.html
    let get = this.get('category') || 0;

      let cate = await this.category(get);
      let sp = await this.model('category_sp').find({where:{cid:cate.id}});
       cate = think.extend({}, cate,sp);
      console.log(cate);

      this.meta_title = cate.meta_title ? cate.meta_title : cate.title; //标题
    this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
    this.description = cate.description ? cate.description : ""; //seo描述
    //频道页只显示模板，默认不读取任何内容
    //内容可以通过模板标签自行定制
    //获取面包屑信息
    let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
      //console.log(breadcrumb);
      this.assign('breadcrumb', breadcrumb);
    /* 模板赋值并渲染模板 */
    this.assign('category', cate);

    let temp = cate.template_index ? cate.template_index : this.http.action;

    //判断浏览客户端
    if(checkMobile(this.userAgent())){
      temp = cate.template_m_index ? `index_${cate.template_m_index}` : `${this.http.action}`
      return this.display(`mobile/${this.http.controller}/sys/${temp}`)
    }else{
      return this.display(`${this.http.controller}/sys/${temp}`);
    }
  }
}