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
    signinAction(){
        //后台登陆入口
        return this.display();
    }

    logoutAction(){
        //退出登录
        console.log(2);
    }

    verifyAction(){
        //验证码
    }
}