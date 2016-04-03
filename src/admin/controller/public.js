// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

export default class extends think.controller.base {

    /**
     * public action
     * @return {Promise} []
     */
    async signinAction(){
        //用户登录
        let is_login = await this.islogin();
        if(this.isPost()){
            let username = this.post('username');
            let password = this.post('password');
            password = encryptPassword(password);
            let res = await this.model("member").signin(username,password,this.ip(),1,1);
            if(0<res.uid){
                //记录用户登录行为
                await this.model("action").log("user_login","member",res.uid,res.uid,this.ip(),this.http.url);
                //console.log(11111111111111);
                await this.session('userInfo', res);
                //TODO 用户密钥
                this.redirect('/admin/index');
            }else { //登录失败
                let fail;
                switch(res) {
                    case -1: fail = '用户不存在或被禁用'; break; //系统级别禁用
                    case -2: fail = '密码错误'; break;
                    case -3: fail = '您无权登陆后台！'; break;
                    default: fail = '未知错误';  // 0-接口参数错误（调试阶段使用）
                }
                this.http.error = new Error(fail);
                return think.statusAction(1002, this.http);
            }

        }else{
            if(is_login){
                this.redirect('/admin/index');
            }else{
                return this.display();
            }
        }
    }

    async logoutAction(){
        //退出登录
        let is_login = await this.islogin();
        if(is_login){
            await this.session('userInfo', null);
            this.redirect('/admin/public/signin');
        }else{
            this.redirect('/admin/public/signin');
        }
    }

    async islogin(){
        let user = await this.session('userInfo');
        let res = think.isEmpty(user) ? false : true;
        return res;
    }
    verAction(){
       this.end("df11df")
    }

}