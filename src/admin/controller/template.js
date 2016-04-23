'use strict';

import Base from './base.js';
import fs from 'fs';
export default class extends Base {
  init(http) {
    super.init(http);
    this.tactive = "template";
  }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.meta_title= '模板管理';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }

  /**
   * 网站首页模版编辑
   * @returns {*}
     */
  async homeAction(){
    //首页网站编辑
    //console.log(this.adminmenu["10"]);
    this.meta_title= '首页模板';
    let templateFile = think.ROOT_PATH + '/view/home/index/index.html';
    console.log(templateFile)
    let tempcon = fs.readFileSync(templateFile,"utf8");

    console.log(tempcon);
    this.assign({
      "navxs":true,
      "tempcon":tempcon
    });
    return this.display();
  }

  channelAction(){
    this.meta_title= '封面模板';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
  columnAction(){
    this.meta_title= '列表模板';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
  detailAction(){
    this.meta_title='内容模板'
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
  incAction(){
    this.meta_title='公共模板'
  }
}