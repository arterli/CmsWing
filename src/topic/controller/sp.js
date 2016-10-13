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
    //console.log(cate);
    //访问控制
    let roleid=8;//游客
    if(this.is_login){
      roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
    }
    let priv = await this.model("category_priv").priv(cate.id,roleid,'visit');
    if(!priv){
      this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
      return think.statusAction(702, this.http);
    }

    this.meta_title = cate.meta_title ? cate.meta_title : cate.title; //标题
    this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
    this.description = cate.description ? cate.description : ""; //seo描述
    //频道页只显示模板，默认不读取任何内容
    //内容可以通过模板标签自行定制
    //获取面包屑信息
    let breadcrumb = await this.model('category').get_parent_category(cate.id,true);
    //console.log(breadcrumb);
    this.assign('breadcrumb', breadcrumb);
    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    let temp;
    console.log(sp);
    //判断浏览客户端
    if(checkMobile(this.userAgent())){
      switch (cate.ismt){
        case 0:
          //系统模版
          temp = cate.template_m_index ? cate.template_m_index : this.http.action;
          temp =`mobile/${this.http.controller}/${temp}`;
          break;
        case 1:
          //用户的自定义模版统一放在view/sp/目录下，可以但文件或者文件夹
          temp = think.ROOT_PATH+'/view/sp/'+cate.sp_temp_m;
          break;
        case 2:
          //转跳 http://www.xxxx.com
          temp = cate.m_url;
          return this.redirect(temp);
          break;

      }
      return this.display(temp)
    }else{

      switch (cate.ispct){
        case 0:
          //系统模版
          temp = cate.template_index ? cate.template_index : this.http.action;
          temp =`${this.http.controller}/${temp}`
          break;
        case 1:
          //用户的自定义模版统一放在view/sp/目录下，可以但文件或者文件夹
          temp = think.ROOT_PATH+'/view/sp/'+cate.sp_temp_pc;
          break;
        case 2:
          //转跳 http://www.xxxx.com
          temp = cate.pc_url;
          return this.redirect(temp);
          break;

      }

      return this.display(temp);
    }
  }
}