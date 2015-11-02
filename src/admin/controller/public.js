/**
 * Created by arter on 2015/10/29.
 */
'use strict';
import Base from './base.js';

export default class extends Base {

    /**
     * public action
     * @return {Promise} []
     */
    async signinAction(){

        if(this.isPost()){
            let username = this.post('username');
            let password = this.post('password');
            password = encryptPassword(password);
            let res = await this.model("member").signin("admin",password,this.ip());
            if(0<res.uid){
                await this.session('userInfo', res);
                //TODO 用户密钥
                this.redirect('/admin/index');
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

    async logoutAction(){

        if(1){
            await this.session();
            this.end("清除");
        }else {
            this.redirect('/admin/public/signin');
        }
    }
    async setUserInfo(userInfo) {
        this.userInfo = userInfo;
        await this.session('userInfo', userInfo);
    }
    verAction(){
       this.end("df11df")
    }

}