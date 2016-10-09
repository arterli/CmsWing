'use strict';

import Base from '../../topic/controller/base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
  indexAction(){
    //console.log(this);
    //auto render template file index_index.html
    console.log(this.http.controller);
    this.end(111)
    return this.display();
  }

  /**
   * 列表入口
   * @returns {*}
   */
  async listAction(){
    let cxt  = think.require("mod/controller/question/index");
    let cc =new cxt(this.http)
  await this.action(cc,"index")
  }

  /**
   * 详情入口
   * @returns {*}
   */
  detailAction(){

    return this.display();
  }
}