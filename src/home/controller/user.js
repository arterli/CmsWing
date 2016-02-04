'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  /**
   * 注册页面
   */
  registerAction(){
      this.meta_title = "用户注册";
      return this.display();
  }
//   登陆页面
  loginAction(){
      this.meta_title = "用户登录";
      return this.display();
  }
}