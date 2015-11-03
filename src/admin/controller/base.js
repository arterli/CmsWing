'use strict';
import Auth from './auth.js';
export default class extends Auth {
  /**
   * some base method in here
   */
  async init(http) {
    super.init(http);
     // http.action = http.method.toLowerCase();
      //console.log(http.method.toLowerCase())

  }

async __before(action){
    //登陆验证
    let is_login=await this.islogin();
    if(!is_login){
        this.redirect('/admin/public/signin');
    }
    this.assign({
        "navxs":false,
        "active":"/admin",
        "datatables":false,
        "bg":"bg-black"

    })
}
    checks(name, uid, type=1, mode='url', relation='or'){
        this.check(name, uid, type, mode, relation);
    }
    async islogin(){
      //判断是否登录
        let user = await this.session('userInfo');
        let res = think.isEmpty(user) ? false : true;
        return res;
    }
}