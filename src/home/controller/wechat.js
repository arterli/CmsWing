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
        //auto render template file index_index.html
        //let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        //  let self = this;
        //   api.getUser("oVe9Ew0zHFp0up1CeNcK2J5RL4xs", (err,result)=>{
        //       if(think.isEmpty(err)){
        //             think.log(result,"fds");
        //             self.end(result);
        //       }else{
        //           console.error(err);
        //       }
        //
        //    });
        // console.log(ss);

         //let signature = this.get("signature");
         //let timestamp = this.get("timestamp");
         //let nonce = this.get("nonce");
         //let token = "cmswing";
         //let tmpArr = [token, timestamp, nonce].sort().join("");
         //let tmpStr = crypto.createHash('sha1').update(tmpArr + '').digest('hex');
         //if (tmpStr == signature) {
         //    let echoStr = this.get("echostr");
         //    this.end(echoStr);
         //} else {
         //    this.end("haha");
         //}
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