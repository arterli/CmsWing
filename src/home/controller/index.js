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
  async indexAction(){
    //auto render template file index_index.html

   return this.display();
  }
}