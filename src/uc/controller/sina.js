'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * 新浪授权回掉地址
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //检测是否开启微博登陆
      if(this.setup.IS_SINA_LOGIN == 0){
          this.http.error = new Error('没有开启QQ登陆，请到后台开启！');
          return think.statusAction(702, this.http);
      }
      //检测是否登陆
      if(this.is_login){
          return this.redirect('/uc/index')
      }
      let http_;
      if(this.config().http_==1){
          http_="http://"
      }else {
          http_ ="https://"
      }
      let redirectURI = `${http_}${this.http.host}/uc/sina/index`;
      //检查是否回掉code，如果没有跳转授权接口
      if(think.isEmpty(this.get("code"))){

          return this.redirect(`https://api.weibo.com/oauth2/authorize?client_id=${this.setup.SINA_APPKEY}&redirect_uri=${redirectURI}&response_type=code`)
      }else {
        let code = this.get("code");
          let SINA = think.service("sina");
          let sina = new SINA(code,redirectURI);
          let token =await sina.gettoken();
          this.end(token)

      }
  }
}