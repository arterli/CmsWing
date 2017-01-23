// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
import moment from "moment"
moment.locale('zh-cn');
import Base from './base.js';
export default class extends Base {
  init(http){
    super.init(http);
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    this.meta_title = "首页";//标题1
    this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
    this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
    //debugger;
    //判断浏览客户端
    if(checkMobile(this.userAgent())){
      //跨域
      let method = this.http.method.toLowerCase();
      if(method === "options"){
        this.setCorsHeader();
        this.end();
        return;
      }
      this.setCorsHeader();
      let map = {
        'pid':0,
        'status': 1,
      };
      //排序
      let o = {};
      let order =this.get('order')||100;
      //console.log(order);
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
      let data = await this.model('document').where(map).page(this.param('page'),10).order(o).countSelect();
      this.assign("list",data);
      //console.log(data);
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
      return this.display(`mobile/${this.http.controller}/${this.http.action}`)
    }else{
      //debugger;
      //console.log(think.datetime(new Date(), "YYYY-MM-DD"));
      return this.display();
    }

  }
  /**
   * 解析路由，判断是频道页面还是列表页面
   */
  async routeAction(){
    // this.end( this.get('category'));
    let cate = await this.category(this.get('category').split("-")[0]);
    let type = cate.allow_publish;
    if(cate.mold == 2){
      type = 'sp';
    }

    switch (type){
      case 0:
        if(cate.mold==1){
          await this.action("mod/index","index");
        }else {
          await this.action("cover","index");
        }
            break;
      case 1:
      case 2:
        if(cate.mold==1){
         // await this.action('question/list', 'index', 'mod')
          await this.action("mod/index","list");
        }else {
          await this.action("list","index");
        }
            break;
      case 'sp':
         await this.action("sp","index");
            break;
      default:
        this.end(111)
    }
    //this.end(cate.allow_publish)
    // 获取当前栏目的模型
    //let models = await this.model("category",{},'admin').get_category(cate.id, 'model');
  }
}
