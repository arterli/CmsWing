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
      let get = this.get('category') || 0;
      let id=0;
      if(get != 0){
          id = get.split("/")[0];
      }
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
      let temp = cate.template_index ? `index_${cate.template_index}` : `${this.http.action}`;
      
      //判断浏览客户端
      if(checkMobile(this.userAgent())){
          return this.display(`mobile/${this.http.controller}/${temp}`)
      }else{
          return this.display(temp);
      }
    }
    //列表页
  async listAction() {

      let get = this.get('category') || 0;
      let id=0;
      if(get != 0){
          id = get.split("/")[0];
      }

      let cate = await this.category(id);
      cate = think.extend({}, cate);

      //获取当前分类的所有子栏目
      let subcate = await this.model('category', {}, 'admin').get_sub_category(cate.id);
      // console.log(subcate);
      subcate.push(cate.id);
      //获取模型列表数据个数
      // console.log(cate);
      let num;
      if(cate.list_row>0){
         num = cate.list_row;
      } else if(cate.model.split(",").length == 1){
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

      //console.log(subcate);
      let map = {
          'pid':0,
        'status': 1,
        'category_id': ['IN', subcate]
      };
      let group_id = 0
      if(!think.isEmpty(get.split("/")[1])){
       map.group_id=get.split("/")[1];
          group_id = map.group_id;
      }
      this.assign("group_id",group_id)
      console.log(map);
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
    //详情页[核心]
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
      if(info.errno==702){
          this.http.error = new Error(info.errmsg);
          return think.statusAction(702, this.http);
      }

      //不同的设备,压缩不同的图片尺寸
      let str = info.content;
      if(!think.isEmpty(str)){
          let img;
      if(checkMobile(this.userAgent())){
          //手机端
          img = image_view(str,640,4);
      }else {
          //pc端

          img = image_view(str,847,0);
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
    if (!think.isEmpty(info.template) && info.template !=0) {
      temp = 'detail_' + model + '_' + info.template; //已设置详情模板
    } else if (!think.isEmpty(cate.template_detail)) {
      temp = 'detail_' + model + '_' + cate.template_detail; //分类已经设置模板
    } else {
      temp = 'detail_' + model;
    }
      //内容分页
      if(!think.isEmpty(info.content)){
          info.content=info.content.split("_ueditor_page_break_tag_");
      }

    this.assign('category', cate);

      console.log(info);
      //目录/文章/段落
      let pid;
      let pinfo;
      if(info.pid !=0){
          let i = info.id;
          //
          while (i!=0)
          {
              let nav = await this.model('document').where({id:i}).find();
              if(nav.pid==0) {
                  pinfo = nav;
                  pid= nav.id;
              }
              i = nav.pid;

          }

      }else {
          pinfo = info;
          pid= info.id;
      }
      console.log(pid);
      let plist = await this.model('document').where({pid:pid}).order("level DESC").select();
      this.assign("pinfo",pinfo);
      this.assign("plist",plist);
      //console.log(plist);
      let lastlevel = plist[0].level;
      console.log(lastlevel);
      this.assign("lastlevel",lastlevel);
      //如果是目录，目录id，显示最后更新的主题
      if(info.type == 1){
          if(plist[0]){
             let model_id =  plist[0].model_id;
              let p_id = plist[0].id;
              let table = await this.model("model",{},"admin").get_table_name(model_id);
              let p_info = await this.model(table).find(p_id);
              info = think.extend(info,p_info);

          }
      }
      console.log(info);
      this.assign('info', info);
      //判断浏览客户端
      if(checkMobile(this.userAgent())){
          return this.display(`mobile/${this.http.controller}/${temp}`)
      }else{
          return this.display(temp);
      }
  }

    /**
     * 下载
     */
    async downloadAction(){
        let id = this.get("id");
        let location = await this.model('file').where({id:id}).getField("location",true);
        console.log(location);
        let key = await get_file(id,"savename");
        console.log(key);
        let type;
        if(this.setup.IS_QINIU==1 && location==1){
            let qiniu = think.service("qiniu");
            let instance = new qiniu();
            let info = await instance.stat(key);
            type = info.mimeType;
        }
        let down = await get_file(id,"savename",true);
        //this.type(type);
        return this.redirect(down+"?attname=");
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
