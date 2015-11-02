'use strict';

export default class extends think.controller.base {
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
        "bg":"bg-black"

    })
}

    async islogin(){
      //判断是否登录
        let user = await this.session('userInfo');
        let res = think.isEmpty(user) ? false : true;
        return res;
    }
}