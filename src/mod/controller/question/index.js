'use strict';
import Base from '../../../topic/controller/base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
  indexAction(){
    //console.log(this);
    //auto render template file index_index.html

   this.end(2222)
   return this.display();
  }

  /**
   * 列表入口
   * @returns {*}
   */
 async listAction(){
    //跨域
    let method = this.http.method.toLowerCase();
    if(method === "options"){
      this.setCorsHeader();
      this.end();
      return;
    }
    this.setCorsHeader();
    let id=this.modget(0);
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
    let model = await this.model("model",{},'admin').get_model(cate.model);
    //console.log(model);
    this.assign('model', model);
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
      let pagenum=await this.model('model',{},'admin').get_model(cate.model,"list_row");
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
    let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
    this.assign('breadcrumb', breadcrumb);
    //console.log(breadcrumb)
    let map = {
      'category_id': ['IN', subcate]
    };
    //排序
    let o = {};
    let order = this.modget(1)||0;
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
    if(!think.isEmpty(this.modget(2)) && this.modget(2) !=0){
      map.group_id=this.modget(2);
      group_id = map.group_id;
    }
    console.log(map);
    this.assign("group_id",group_id);
    let data = await this.model(model.name).where(map).page(this.param('page'),num).order(o).countSelect();

    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    this.assign('list', data.data);
    this.assign('count',data.count);
    //console.log(cate)
    //获取当前模型名称
    let modname = await this.model("admin/model").get_model(cate.model,'name');
    //console.log(cate);
    //console.log(111)

    if(checkMobile(this.userAgent())){
      if(this.isAjax("get")){
        return this.json(data);
      }
      //手机端模版
      return this.modtemp(modname,"mobile");
    }else{
      //console.log(temp);
     // return this.display(temp);
      return this.modtemp(modname);
    }

  }

  /**
   * 详情入口
   * @returns {*}
   */
  detailAction(){

    return this.display();
  }
}