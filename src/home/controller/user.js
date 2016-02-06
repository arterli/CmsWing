'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * 用户中心主页
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.meta_title = "用户中心";
    return this.display();
  }
//   用户设置
  setingAction(){
      this.meta_title = "用户设置";
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