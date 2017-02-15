// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
import moment from "moment"
moment.locale('zh-cn');
import Base from './base.js';
import pagination from 'think-pagination';
export default class extends Base {
  //列表页[核心]
  async indexAction() {
      console.log(GetDateStr(5)+" "+"00:00:00");
      console.log(new Date(GetDateStr(0)+" "+"23:59:59").getTime());
      //跨域
    let method = this.http.method.toLowerCase();
    if(method === "options"){
      this.setCorsHeader();
      this.end();
      return;
    }
    this.setCorsHeader();
    let get = this.get('category') || 0;
    let id=0;
    let query = get.split("-");
    if(get != 0){
      id = query[0];
    }

    let cate = await this.category(id);
    cate = think.extend({}, cate);
    let roleid=8;//游客
    //访问控制
    if(this.is_login){
      roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
    }
    let priv = await this.model("category_priv").priv(cate.id,roleid,'visit');
    if(!priv){
      this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
      return think.statusAction(702, this.http);
    }
    // 获取当前栏目的模型
    let models = await this.model("category").get_category(cate.id, 'model');
    //获取模型信息
    let modellist = [];
    //console.log(111111111)
    if (think.isEmpty(models)) {
      modellist = null;
    } else {
      for (let val of models.split(",")) {
        let modelobj = {}
        modelobj.id = val;
        modelobj.title = await this.model("model").get_model(val, "title");
        modellist.push(modelobj);
      }
    }
    this.assign('modellist', modellist);
    this.assign('model', models.split(","));
    //console.log(cate);
    //获取当前分类的所有子栏目
    let subcate = await this.model('category').get_sub_category(cate.id);
    // console.log(subcate);
    subcate.push(cate.id);
    //获取模型列表数据个数
    // console.log(cate);
    let num;
    if(cate.list_row>0){
      num = cate.list_row;
    } else if(cate.model.split(",").length == 1){
      let pagenum=await this.model('model').get_model(cate.model,"list_row");
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
    o.level = 'DESC';
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
        case 4:
          map.create_time = {">": new Date(GetDateStr(0)+" "+"00:00:00").getTime(), "<": new Date(GetDateStr(0)+" "+"23:59:59").getTime()}
            o.update_time = 'DESC';
          break;
        case 5:
            map.create_time = {">": new Date(GetDateStr(1)+" "+"00:00:00").getTime(), "<": new Date(GetDateStr(5)+" "+"23:59:59").getTime()}
            o.update_time = 'DESC';
            break;
        case 6:
            map.create_time = {"<": new Date().getTime()}
            map.deadline = {">": new Date().getTime()}
            o.update_time = 'DESC';
            break;
        case 7:
            map.deadline = {"<": new Date().getTime()}
            o.update_time = 'DESC';
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
    let sort = await this.model("category").get_category(cate.id, 'documentsorts');
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
    //console.log(map);
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
    //console.log(data);
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
    let breadcrumb = await this.model('category').get_parent_category(cate.id,true);
    this.assign('breadcrumb', breadcrumb);
    //console.log(breadcrumb)


    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    this.assign('list', data.data);
    this.assign('count',data.count);
    //console.log(cate)
    let temp = cate.template_lists ? `${cate.template_lists}` : "";
    //console.log(cate);
    //console.log(111)
    if(checkMobile(this.userAgent())){
      if(this.isAjax("get")){
        for(let v of data.data){
          if(!think.isEmpty(v.pics)){
            let arr = []
            for (let i of v.pics.split(",")){
              arr.push(await get_pic(i,1,300,169))
            }
            v.pics = arr;
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
          v.uid = await get_nickname(v.uid);
          v.url = get_url(v.name,v.id);
          v.update_time = moment(v.update_time).fromNow()
        }
        return this.json(data);
      }
      //手机端模版
      temp = cate.template_m_lists ? `${cate.template_m_lists}` : `${this.http.action}`;
      //think.log(temp);
      return this.display(`mobile/${this.http.controller}/${temp}`)
    }else{
      //console.log(temp);
      return this.display(temp);
    }



  }
  //keywrods列表
  async keywordsAction(){
    let keywords = this.get("key");
    let map = {keyname:["like",`%${keywords}%`]}
    let data = await this.model('document').where(map).page(this.get('page')).countSelect();
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
    this.assign("list",data);
    //seo
    this.meta_title = keywords; //标题
    this.keywords = keywords; //seo关键词
    this.description = keywords; //seo描述
    return this.display();
  }

  /**
   * 独立模型 questionAction
   */
  async questionAction(){
    //跨域
    let method = this.http.method.toLowerCase();
    if(method === "options"){
      this.setCorsHeader();
      this.end();
      return;
    }
    this.setCorsHeader();
    let get = this.get('category') || 0;
    let id=0;
    let query = get.split("-");
    if(get != 0){id = query[0];}
    let cate = await this.category(id);
    cate = think.extend({}, cate);
    let roleid=8;//游客
    //访问控制
    if(this.is_login){
      roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
    }
    let priv = await this.model("category_priv").priv(cate.id,roleid,'visit');
    if(!priv){
      this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
      return think.statusAction(702, this.http);
    }
    // 获取当前栏目的模型
    let model = await this.model("model").get_model(cate.model);
    //console.log(model);
    this.assign('model', model);
    //console.log(cate);
    //获取当前分类的所有子栏目
    let subcate = await this.model('category').get_sub_category(cate.id);
    // console.log(subcate);
    subcate.push(cate.id);
    //获取模型列表数据个数
    // console.log(cate);
    let num;
    if(cate.list_row>0){
      num = cate.list_row;
    } else if(cate.model.split(",").length == 1){
      let pagenum=await this.model('model').get_model(cate.model,"list_row");
      if(pagenum !=0){
        num = pagenum;
      }
    }else {
      num =this.config("db.nums_per_page");
    }
    if(checkMobile(this.userAgent())){
      num=10;
    }
    //seo
    this.meta_title = cate.meta_title ? cate.meta_title : cate.title; //标题
    this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
    this.description = cate.description ? cate.description : ""; //seo描述

    //获取面包屑信息
    let breadcrumb = await this.model('category').get_parent_category(cate.id,true);
    this.assign('breadcrumb', breadcrumb);
    //console.log(breadcrumb)
    let map = {
      'category_id': ['IN', subcate]
    };
    //排序
    let o = {};
    let order = query[1]||0;
    order = Number(order);
    switch (order){
      case 1:
        o.popular_value = 'DESC';
        break;
      case 2:
        map.is_recommend = 1;
        break;
      case 3:
        map.answer_count = 0;
        break;
      default:
        o.create_time = 'DESC';
    }
    this.assign('order',order);
    //分组
    let group_id = 0;
    if(!think.isEmpty(query[2]) && query[2] !=0){
      map.group_id=query[2];
      group_id = map.group_id;
    }
    console.log(map);
    this.assign("group_id",group_id);
    let data = await this.model(model.name).where(map).page(this.param('page'),num).order(o);

    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    this.assign('list', data.data);
    this.assign('count',data.count);
    //console.log(cate)
    let temp = cate.template_lists ? `${cate.template_lists}` : "";
    //console.log(cate);
    //console.log(111)
    if(checkMobile(this.userAgent())){
      if(this.isAjax("get")){
        return this.json(data);
      }
      //手机端模版
      temp = cate.template_m_lists ? `${cate.template_m_lists}` : `${this.http.action}`;
      //think.log(temp);
      return this.display(`mobile/${this.http.controller}/${temp}`)
    }else{
      //console.log(temp);
      return this.display(temp);
    }
  }

}