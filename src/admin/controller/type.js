'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.tactive = "article"
  }

  /**
   * __before action
   * @private
     */
  async __before() {
   await super.__before();
   let typeoption = await this.model("typeoption").where({classid:0}).select();
    this.assign("typeoption",typeoption);
  }
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction(){
    //auto render template file index_index.html
    let type = this.model("type");
    let list = await type.select();
    //console.log(list);
    this.assign("list",list);
    this.meta_title="分类管理"
    return this.display();
  }

  /**
   * topic action
   *
   */
  topicAction(){
    return this.display();
  }

  /**
   * type Action
   */
  typeAction(){
    return this.display();
  }

  /**
   * 更新/修改数据
   */
  updateAction(){
    console.log(this.post())
    //todo
  }
}
