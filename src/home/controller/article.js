'use strict';

import Base from './base.js';
import pagination from 'think-pagination';
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
      //频道页只显示模板，默认不读取任何内容
      //内容可以通过模板标签自行定制

      /* 模板赋值并渲染模板 */
   this.assign('category',cate);
      let temp=cate.template_index?`index_${cate.template_index}`:"";

    return this.display(temp);
  }
  //列表页
  async listAction(){

      let id = this.get('category')||0;
      let cate = await this.category(id);
      let map = {'status': ['>', -1]}
      let data = await this.model('document').where(map).page(this.get('page')).order('update_time DESC').countSelect();
      let html = pagination(data, this.http, {});
      this.assign('pagination', html);

      //seo
      this.meta_title = cate.meta_title ? cate.meta_title : cate.title;//标题
      this.keywords = cate.keywords ? cate.keywords : '';//seo关键词
      this.description = cate.description ? cate.description : "";//seo描述


      /* 模板赋值并渲染模板 */
      this.assign('category',cate);
      this.assign('list',data.data);
      //console.log(data)
      let temp=cate.template_index?`index_${cate.template_index}`:"";
      return this.display(temp);
  }
  //详情页
  detailAction(){
      //let temp=cate.template_index?`index_${cate.template_index}`:"";
      return this.display();
  }
 
}