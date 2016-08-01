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
          id = get.split("-")[0];
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
    //列表页[核心]
  async listAction() {

      let get = this.get('category') || 0;
      let id=0;
      let query = get.split("-");
      if(get != 0){
          id = query[0];
      }

      let cate = await this.category(id);
      cate = think.extend({}, cate);
      //console.log(cate);
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
      //排序
      let o = {};
      let order = query[1]||0;
      order = Number(order);
      switch (order){
          case 1:
              o.update_time = 'ASC';
              break;
          case 2:
              o.view = 'DESC';
              break;
          case 3:
              o.view = 'ASC';
              break;
          default:
              o.update_time = 'DESC';
      }
      this.assign('order',order);
      // 获取分类信息
      let sortid = query[3]||0;
      if(!think.isEmpty(sortid)){
          map.sort_id = sortid;
      }
      let sortarr = query[4]||null;
      let nsobj = {};
      let sort = await this.model("category", {}, 'admin').get_category(cate.id, 'documentsorts');
      if (sort) {
          this.assign("sorturl",get.split("-")[4])
          sort = JSON.parse(sort);
          if(sortid==0){
              sortid=sort.defaultshow;
          }
          let typevar = await this.model("typevar").where({sortid:sortid}).order('displayorder ASC').select();
          for (let val of typevar){

              val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
              if(val.option.type == 'select' ||val.option.type == 'radio'){
                  if(!think.isEmpty(val.option.rules)){
                      val.option.rules = JSON.parse(val.option.rules);
                      val.rules=parse_type_attr(val.option.rules.choices);
                      val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                      //console.log(val.rules);
                  }

              }else if(val.option.type == 'checkbox'){
                  if(!think.isEmpty(val.option.rules)){
                      val.option.rules = JSON.parse(val.option.rules);
                      val.rules=parse_type_attr(val.option.rules.choices);
                      console.log(val.rules);
                      for(let v of val.rules){
                          v.id = "l>"+v.id
                      }
                      val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                      //console.log(val.rules);
                  }
              }else if(val.option.type == 'range'){
                  if(!think.isEmpty(val.option.rules)){
                      let searchtxt = JSON.parse(val.option.rules).searchtxt;
                      let searcharr = []
                      if(!think.isEmpty(searchtxt)){
                          let arr = searchtxt.split(",");
                            let len = arr.length;
                          for (var i=0;i<len;i++)
                          {
                              let obj = {}
                              if (!think.isEmpty(arr[i-1])){
                                  if(i==1){
                                      obj.id = 'd>'+arr[i];
                                      obj.name = '低于'+arr[i];
                                      obj.pid=0
                                      searcharr.push(obj);
                                  }else {
                                      obj.id = arr[i-1]+'>'+arr[i];
                                      obj.name = arr[i-1]+"-"+arr[i];
                                      obj.pid=0
                                      searcharr.push(obj)
                                  }

                              }

                          }
                          searcharr.push({id:'u>'+arr[len-1],name:'高于'+arr[len-1],pid:0})
                      }
                      //console.log(searcharr);
                       val.option.rules = JSON.parse(val.option.rules);
                        val.rules=searcharr;
                      // val.option.rules.choices = parse_config_attr(val.option.rules.choices);

                  }
              }
          }
         // console.log(typevar);
          this.assign("typevar",typevar);
      }
      if(!think.isEmpty(sortarr)) {
          sortarr = sortarr.split("|");
           nsobj = {}
          let optionidarr = [];
          let valuearr = [];
          for (let v of sortarr) {
              let qarr = v.split("_");
              nsobj[qarr[0]] = qarr[1];
              if(qarr[1] !=0){
                  let vv = qarr[1].split(">");
                  //console.log(vv);
                  if(vv[0]=="d" && !think.isEmpty(vv[1])){
                      map["t."+qarr[0]] = ["<",vv[1]];
                  }else if(vv[0]=="u" && !think.isEmpty(vv[1])){
                      map["t."+qarr[0]] = [">",vv[1]];
                  }else if(vv[0]=="l" && !think.isEmpty(vv[1])){
                      map["t."+qarr[0]] = ["like",`%"${vv[1]}"%`];
                  }else if(!think.isEmpty(vv[0])&&!think.isEmpty(vv[1])){
                      map["t."+qarr[0]] = ["BETWEEN", Number(vv[0]), Number(vv[1])];
                  }else {
                      map["t."+qarr[0]] = qarr[1];
                  }

              }
          }
          map.fid = cate.id;
          // where.optionid = ["IN",optionidarr];
          // where['value'] = ["IN",valuearr];
         // let type= await this.model("typeoptionvar").where(where).select();
         //  console.log(type);
         // console.log(map);

      }
      console.log(map);
      //return false;
      //console.log(sort);
      this.assign("sort",sort);
          this.assign("nsobj",nsobj);

      this.assign("sortid",sortid);
      let group_id = 0;
      if(!think.isEmpty(query[2]) && query[2] !=0){
          map.group_id=query[2];
          group_id = map.group_id;
      }
      this.assign("group_id",group_id)
      //console.log(map);
      let data;
      if(!think.isEmpty(sortarr)){
          data = await this.model('document').join({
                      table: "type_optionvalue"+sortid,
                      join: "left", // 有 left,right,inner 3 个值
                      as: "t",
                      on: ["id", "tid"]

              }).where(map).page(this.param('page'),num).order(o).countSelect();
      }else {
          data = await this.model('document').where(map).page(this.param('page'),num).order(o).countSelect();
      }
      console.log(data);
      // let data = await this.model('document').join({
      //     typeoptionvar: {
      //         join: "left", // 有 left,right,inner 3 个值
      //         as: "c",
      //         on: ["sort_id", "sortid"]
      //     }
      // }).where(map).page(this.param('page'),num).order('update_time DESC').countSelect();
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
      this.assign('count',data.count);
      //console.log(cate)
      let temp = cate.template_lists ? `list_${cate.template_lists}` : "";
      //console.log(cate);
      //console.log(111)
      if(checkMobile(this.userAgent())){
         if(this.isAjax("POST")){
             for(let v of data.data){
                 if(!think.isEmpty(v.pics)){
                     v.pics = await get_pic(v.pics.split(",")[0],1,300,169) ;
                 }
                 if(!think.isEmpty(v.cover_id)){
                     v.cover_id = await get_pic(v.cover_id,1,300,169);
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
    await document.where({id:info.id}).increment('view');

      //获取面包屑信息
      let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
      this.assign('breadcrumb', breadcrumb);

      // 上一篇
      let previous = await document.where({id:['>',info.id],category_id:info.category_id,'pid':0, 'status': 1}).order('id DESC').find();
      this.assign('previous',previous)
      // 下一篇
      let next = await document.where({id:['<',info.id],category_id:info.category_id,'pid':0, 'status': 1}).order('id DESC').find();
      this.assign('next',next)

      //获取模板
    let temp;
    let model = await this.model('model', {}, 'admin').get_document_model(info.model_id, 'name');
    if (!think.isEmpty(info.template) && info.template !=0) {
      temp = 'detail_' + info.template; //已设置详情模板
    } else if (!think.isEmpty(cate.template_detail)) {
      temp = 'detail_' + cate.template_detail; //分类已经设置模板
    } else {
      temp = 'detail_' + model;
    }
      //内容分页
      if(!think.isEmpty(info.content)){
          info.content=info.content.split("_ueditor_page_break_tag_");
      }

    this.assign('category', cate);

      //console.log(info);
      //目录/文章/段落
      let pid;
      let pinfo;
      if(info.pid !=0){
          let i = info.id;
          //
          while (i!=0)
          {
              let nav = await document.where({id:i}).find();
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
      let plist = await document.where({pid:pid}).order("level DESC").select();
      this.assign("pinfo",pinfo);
      this.assign("plist",plist);
      //console.log(plist);
      if(plist[0]){
      let lastlevel = plist[0].level;
      console.log(lastlevel);
      this.assign("lastlevel",lastlevel);
      }
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
