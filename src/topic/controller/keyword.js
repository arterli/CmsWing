'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction(){
    let model = await this.model("model").get_model(null,null,{key_show:1});
    this.assign("model",model);
    //auto render template file index_index.html
    return this.display();
  }

 async listAction(){
     let model = await this.model("model").get_model(null,null,{key_show:1});
     this.assign("model",model);
     return this.display();
 }
}