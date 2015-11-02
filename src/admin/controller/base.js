'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  async init(http) {
    super.init(http);
     // http.action = http.method.toLowerCase();
      //console.log(http.method.toLowerCase())
      this.is_login=await this.islogin();
  }

async __before(action){
    //登陆验证

    //if(!this.is_login){
    //    this.redirect('/admin/public/signin');
    //}
    this.assign({
        "navxs":false,
        "bg":"bg-black"
    })
}

    async islogin(){
        let user = await this.session('userInfo');
        if(think.isEmpty(user)){
            return 0;
        }else{
            return 1;
        }
    }
}