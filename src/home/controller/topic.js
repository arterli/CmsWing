// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
import pagination from 'think-pagination';
export default class extends Base {
    init(http){
        super.init(http);

    }
  /**
   * index action
   * @return {Promise} []
   */
  //频道页
  async indexAction() {
      //auto render template file index_index.html
      let id = this.get('category') || 0;
      let cate = await this.category(id);
      cate = think.extend({}, cate);
      this.meta_title = cate.meta_title ? cate.meta_title : cate.title; //标题
      this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
      this.description = cate.description ? cate.description : ""; //seo描述
      //频道页只显示模板，默认不读取任何内容
      //内容可以通过模板标签自行定制
      //获取面包屑信息
      let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
      this.assign('breadcrumb', breadcrumb);
      /* 模板赋值并渲染模板 */
      this.assign('category', cate);
      let temp = cate.template_index ? `index_${cate.template_index}` : "";

      //判断浏览客户端
      if(checkMobile(this.userAgent())){
          return this.display(`mobile/${this.http.controller}/${temp}`)
      }else{
          return this.display(temp);
      }
    }
    //列表页
  async listAction() {
      //console.log(111);
      console.log(1111 / 100);
      let id = this.get('category') || 0;
      //console.log(id);
      let cate = await this.category(id);
      cate = think.extend({}, cate);

      //获取当前分类的所有子栏目
      let subcate = await this.model('category', {}, 'admin').get_sub_category(cate.id);
      // console.log(subcate);
      subcate.push(cate.id);
      //获取模型列表数据个数
      // console.log(cate);
      let num;
      if(cate.model.split(",").length == 1){
         let pagenum=await think.model('model',{},'admin').get_document_model(cate.model,"list_row");
         if(pagenum !=0){
             num = pagenum;
         }
      }else {
          num =this.config("db.nums_per_page");
      }
      if(checkMobile(this.userAgent())){
          num=10;
      }

      console.log(subcate);
      let map = {
        'status': 1,
        'category_id': ['IN', subcate]
      };

      let data = await this.model('document').where(map).page(this.param('page'),num).order('update_time DESC').countSelect();


      let html = pagination(data, this.http, {
      desc: false, //show description
      pageNum: 2, 
      url: '', //page url, when not set, it will auto generated
      class: 'nomargin', //pagenation extra class
      text: {
      next: '下一页',
      prev: '上一页',
      total: 'count: ${count} , pages: ${pages}'
     }
     });
      this.assign('pagination', html);

      //seo
      this.meta_title = cate.meta_title ? cate.meta_title : cate.title; //标题
      this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
      this.description = cate.description ? cate.description : ""; //seo描述
      
       //获取面包屑信息
      let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
      this.assign('breadcrumb', breadcrumb);
      //console.log(breadcrumb)
      /* 模板赋值并渲染模板 */
      this.assign('category', cate);
      this.assign('list', data.data);
      //console.log(cate)
      let temp = cate.template_lists ? `list_${cate.template_lists}` : "";


      if(checkMobile(this.userAgent())){
         if(this.isAjax("POST")){
             for(let v of data.data){
                 if(!think.isEmpty(v.pics)){
                     v.pics = await get_cover(v.pics.split(",")[0],'path') ;
                 }
                 if(!think.isEmpty(v.cover_id)){
                     v.cover_id = await get_cover(v.cover_id,"path");
                 }
                 if(!think.isEmpty(v.price)){
                     if(!think.isEmpty(get_price_format(v.price,2))){
                         v.price2 = get_price_format(v.price,2);
                     }
                         v.price = get_price_format(v.price,1);

                 }
                 v.url = get_url(v.name,v.id)
             }
             return this.json(data);
         }
          temp = cate.template_lists ? `list_${cate.template_lists}` : `${this.http.action}`;
          //think.log(temp);
          return this.display(`mobile/${this.http.controller}/${temp}`)
      }else{
          //console.log(temp);
          return this.display(temp);
      }


     
    }
    //详情页
  async detailAction() {
    /* 标识正确性检测*/
    let id = this.get('id') || 0;
    //if(!(id && think.isString(id))){
    //    this.fail('文档ID错误！');
    //} //if(!(id && think.isString(id))){
    //    this.fail('文档ID错误！');
    //}

    /* 页码检测*/
    //TODO

    /* 获取详细信息*/
    let document = this.model('document');
    let info = await document.detail(id);
      //不同的设备,压缩不同的图片尺寸
      let str = info.content;
      if(!think.isEmpty(str)){
          let img;
      if(checkMobile(this.userAgent())){
          //手机端
          img = image_view(str,640);
      }else {
          //pc端

          img = image_view(str,847);
      }
          info.content=img
      }
    //console.log(info);
    //分类信息
    let cate = await this.category(info.category_id);
    cate = think.extend({}, cate);
    //seo
    this.meta_title = info.title; //标题
    this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
    this.description = cate.description ? cate.description : ""; //seo描述
    
    //访问统计
    await this.model('document').where({id:info.id}).increment('view');
    //获取面包屑信息
      let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
      this.assign('breadcrumb', breadcrumb);
    //获取模板
    let temp;
    let model = await this.model('model', {}, 'admin').get_document_model(info.model_id, 'name');
    if (!think.isEmpty(info.template)) {
      temp = 'detail_' + model + '_' + info.template; //已设置详情模板
    } else if (!think.isEmpty(cate.template_detail)) {
      temp = 'detail_' + model + '_' + cate.template_detail; //分类已经设置模板
    } else {
      temp = 'detail_' + model;
    }
    this.assign('category', cate);
    this.assign('info', info);
      //console.log(info);
      //判断浏览客户端
      if(checkMobile(this.userAgent())){
          return this.display(`mobile/${this.http.controller}/${temp}`)
      }else{
          return this.display(temp);
      }
  }
    async ajaxlistAction(){
        let id = this.get('category') || 0;
        //console.log(id);
        let cate = await this.category(id);
        cate = think.extend({}, cate);

        //获取当前分类的所有子栏目
        let subcate = await this.model('category', {}, 'admin').get_sub_category(cate.id);
        // console.log(subcate);
        subcate.push(cate.id);
        //获取模型列表数据个数
        // console.log(cate);
        if(cate.model.split(",").length == 1){
            let pagenum=await think.model('model',{},'admin').get_document_model(cate.model,"list_row");
            if(pagenum !=0){
                this.config("db.nums_per_page",pagenum);
            }

        }
        //console.log(subcate);
        let map = {
            'status': ['=', 1],
            'category_id': ['IN', subcate]
        };
        let data = await this.model('document').where(map).page(this.param('page')).order('update_time DESC').countSelect();
        for(let item of data.data){
            if(item.cover_id != 0){
                item.img = await get_cover(item.cover_id,'path');
            }
        }
        let ajaxdata ={
            count:data.count,
            data:data.data
        }
        return this.json(ajaxdata);

    }

}
