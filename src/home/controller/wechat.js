'use strict';

import Base from './base.js';
import crypto from 'crypto';
import API from 'wechat-api';
import wechat from 'wechat';
export default class extends Base {
    /**
     * 微信服务器验证
     * index action
     * @return {Promise} []
     */
    indexAction() {
        let echostr = this.get('echostr');
        return this.end(echostr);
    }
    reply(message){
        this.http.res.reply(message);
    }
    textAction(){
        var message = this.post();
        var msg = message.Content.trim();
        this.reply('测试成功:'+msg);
    }
    eventAction(){
        var message = this.post();
        this.reply(JSON.stringify(message));
    }
    __call(){
        this.reply(DEFULT_AUTO_REPLY);
    }
}