'use strict';

import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  init(http) {
    super.init(http);
  }
  indexAction(){
    //auto render template file index_index.html
    //console.log(this.is_login);
    this.checks(33);
    //this.islogin();
    return this.display();
  }
}