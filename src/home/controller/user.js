'use strict';

import Base from './base.js';

export default class extends Base {
   async init(http){
        super.init(http);
        //let login = await super.islogin()
        ////是否验证登陆
        //if(!login){
        //    return this.fail("你木有登录！")
        //}

    }
  /**
   * index action
   * 用户中心主页
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
      if(!this.is_login){
          return think.statusAction(1000, this.http);
      }

      this.meta_title = "用户中心";
    return this.display();
  }
//   用户设置
  setingAction(){
      if(!this.is_login){
          return this.fail("你木有登录！")
      }

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
  async loginAction(){
      this.meta_title = "用户登录";
      if(this.isAjax("post")){
          let data = this.post();
          //console.log(data); 
           let username = this.post('username');
            let password = this.post('password');
            password = encryptPassword(password);
            let res = await this.model("member",{},"admin").signin(username,password,this.ip(),1); 
             if(0<res.uid){
                //记录用户登录行为
                await this.model("action",{},"admin").log("user_login","member",res.uid,res.uid,this.ip(),this.http.url);
                //console.log(11111111111111);
                await this.session('webuser', res);
                //TODO 用户密钥
                return this.success({name:'登录成功！'});
            }else { //登录失败
                let fail;
                switch(res) {
                    case -1: fail = '用户不存在或被禁用'; break; //系统级别禁用
                    case -2: fail = '密码错误'; break;
                    default: fail = '未知错误'; break; // 0-接口参数错误（调试阶段使用）
                }
                this.fail(res, fail);
            } 
      }else{
          
          return this.display();
      }
      
  }
  //退出登录
  async logoutAction(){
        //退出登录
        let is_login = await this.islogin();
        if(is_login){
            
           await this.session('webuser', null);
            
            this.redirect(this.http.headers.referer);
        }else{
            this.redirect(this.http.headers.referer);
        }
    }
}