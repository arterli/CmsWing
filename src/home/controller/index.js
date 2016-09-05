// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

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
       return this.display(`mobile/${this.http.controller}/${this.http.action}`)
    }else{
      //debugger;
       return this.display();  
    }
   
  }
}
