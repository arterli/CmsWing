// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
import API from 'wechat-api';
const api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
import pingpp from 'pingpp';
import http from 'http';
import fs from 'fs';
export default class extends think.controller.base {
    init(http) {
        super.init(http);

    }
    async __before() {
        //网站配置
        this.setup = await this.model("setup").getset();
    }
    /**
     * 微信服务器验证
     * index action
     * @return {Promise} []
     */
    indexAction(){
        let echostr = this.get('echostr');
        return this.end(echostr);
    }
    reply(message){
        this.http.res.reply(message);
    }
   async oauthAction(){
        //判断是否是微信浏览器
        //微信公众账号内自动登陆
       let openid = await this.session("wx_openid");
       // let openid = null;
        if(is_weixin(this.userAgent()) && think.isEmpty(openid)){
            this.cookie("cmswing_wx_url",this.http.url);
            var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode('wxe8c1b5ac7db990b6', 'http://www.cmswing.com/wechat/getopenid?showwxpaytitle=1');
            console.log(oauthUrl)
            this.redirect(oauthUrl);
        }

    }
    //用微信客户端获取getopenid
    async getopenidAction(){
        //获取用户openid
       let code =  this.get("code");
        //获取openid
        let getopenid = ()=>{
            let deferred = think.defer();
            pingpp.wxPubOauth.getOpenid('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6', code, function(err, openid){
                //console.log(openid);
                deferred.resolve(openid);
                // ...
                // pass openid to extra['open_id'] and create a charge
                // ...
            });
            return deferred.promise;
        };
        let openid = await getopenid();
        think.log(think.isEmpty(openid));
        let userinfo = await getUser(api,openid);
        console.log(userinfo);
        //如果没有关注先跳到关注页面
        if(userinfo.subscribe==0){
            console.log(1111111111111)
            this.redirect('/wechat/follow');
            return false;
        };
        userinfo.subscribe_time = userinfo.subscribe_time * 1000;

        let wx_user=await this.model("wx_user").where({openid:openid}).find();
        
        //存储Openid
        await this.session('wx_openid',openid);
        if(think.isEmpty(wx_user)){
            await this.model("wx_user").add(userinfo);
            this.redirect("/wechat/signin");
        }else {
            await this.model("wx_user").where({openid:openid}).update(userinfo);

            //检查微信号是否跟网站会员绑定
            if(think.isEmpty(wx_user.uid)){
                //没绑定跳转绑定页面
                this.redirect("/wechat/signin");

            }else {
                //更新微信头像
                let filePath=think.RESOURCE_PATH + '/upload/avatar/' + wx_user.uid+'/avatar.png';
                await this.spiderImage(userinfo.headimgurl,filePath)
                //绑定直接登陆
                let last_login_time = await this.model("member").where({id:wx_user.uid}).getField("last_login_time",true);

                let wx_userInfo = {
                    'uid': wx_user.uid,
                    'username': userinfo.nickname,
                    'last_login_time': last_login_time,

                };
                await this.session('webuser', wx_userInfo);
                this.redirect(this.cookie("cmswing_wx_url"));
            }
        }


    }

    /**
     * 更新微信头像
     */
    spiderImage(imgUrl,filePath) {
        let deferred = think.defer();
        http.get(imgUrl, function (res) {
            var imgData = "";
            res.setEncoding("binary");
            res.on("data", function (chunk) {
                imgData += chunk;
            });

            res.on("end", function () {
                fs.writeFileSync(filePath, imgData, "binary");
                deferred.resolve(filePath);
            });
        });
        return deferred.promise;
    }
    /**
     * 没有关注提示关注
     */
   async followAction(){
        //console.log(this.setup)
        //创建关注二维码
        //todo
        //let titck =await createLimitQRCode(api,1);
        let qrcod = api.showQRCodeURL("gQFF7zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL0xFemdKSlBsaWNid1pvVnhzbUFiAAIEZfoRVwMEAAAAAA==");
        this.assign("qrurl",qrcod);
        //think.log(qrcod);
        // this.end(qrcod);
        this.meta_title = `扫码关注`;
        //判断浏览客户端
        if(checkMobile(this.userAgent())){
            return this.display(`mobile/${this.http.controller}/${this.http.action}`)
        }else{
            return this.display();
        }
    }

    /**
     * 微信账号与网站会员绑定
     */
    signinAction(){
        //todo
        this.end("网站会员绑定页面")
    }
    /**
     * 本地数据测试
     */  
    async localAction(){
        let self = this;
        var key = 'a';
        let kmodel = self.model('wx_keywords');
        let isKey = await kmodel.field('rule_id').where({keyword_name: key}).select();
        if(!think.isEmpty(isKey)){
            //是关键字
            let rulemodel = self.model('wx_keywords_rule');
            let replyliststr = await rulemodel.where({id: isKey[0].rule_id}).getField('reply_id', true);
            let replylisttmp = replyliststr.split(',');
            let replylist = [];
            for(let i in replylisttmp){
                if(replylisttmp[i] != ''){
                    replylist.push(replylisttmp[i]);
                }
            }
            if(!think.isEmpty(replylist)){
                let  randomi = parseInt(Math.random()*replylist.length);
                let replymodel = self.model('wx_replylist');
                let data = await replymodel.where({id: replylist[randomi]}).getField('content', true);
                return self.end(data);
            }
        }
        //普通消息回复
        let replymodel = self.model('wx_replylist');
        let data = await replymodel.where({reply_type: 2}).getField('content', true);
        return self.end(data);
    }
    async textAction(){
        let self = this;
        var key = 'a';
        let kmodel = self.model('wx_keywords');
        let isKey = await kmodel.field('rule_id').where({keyword_name: key}).select();
        if(!think.isEmpty(isKey)){
            //是关键字
            let rulemodel = self.model('wx_keywords_rule');
            let replyliststr = await rulemodel.where({id: isKey[0].rule_id}).getField('reply_id', true);
            let replylisttmp = replyliststr.split(',');
            let replylist = [];
            for(let i in replylisttmp){
                if(replylisttmp[i] != ''){
                    replylist.push(replylisttmp[i]);
                }
            }
            if(!think.isEmpty(replylist)){
                let  randomi = parseInt(Math.random()*replylist.length);
                let replymodel = self.model('wx_replylist');
                let data = await replymodel.where({id: replylist[randomi]}).getField('content', true);
                return self.reply(data);
            }
        }
        //普通消息回复
        let replymodel = self.model('wx_replylist');
        let data = await replymodel.where({reply_type: 2}).getField('content', true);
        return self.reply(data);
        
    // var message = this.post();
    // var msg = message.Content.trim();
    // if(msg =="我是谁"){
    // this.reply("我是鞠焕尧");
    // }else{
    // this.reply('测试成功:'+msg);
    // }
    }
  eventAction(){
    var message = this.post();
    this.reply(JSON.stringify(message));
  }
  __call(){
    this.reply(DEFULT_AUTO_REPLY);
  }
  
   /**
     * 获取用户分组
     */
    groupsAction(){
        //let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        let self = this;
        api.getGroups((err,result)=>{
            if(!think.isEmpty(result)){
                //think.log(result['groups'],"test");
                for(let val of result['groups']){
                    think.log(val['name'],"test");
                };
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }
    /**
     * 查询用户在哪个分组
     */
    getwithgroupAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.getWhichGroup('oVe9Ew0zHFp0up1CeNcK2J5RL4xs',(err,result)=>{
            if(!think.isEmpty(result)){
               think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 创建用户分组
     */
    creategroupAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.createGroup('旅游',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 群发文本消息
     */
    masssendtextAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        //let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        let self = this;
        api.massSendText('你好，恭喜你中奖了',['oVe9Ew0zHFp0up1CeNcK2J5RL4xs','oVe9Ew1nEItmuu-H5NoeZpK0xLzo'],(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }
    /**
     * 群发图文消息
     */
    masssendnewsAction(){
        //let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        let self = this;
        api.massSendNews('kiW60VzuoCNnoIgdpmrQ8mUaCeDHGOTg4z_ug1DtPkI',['o33lBt0nWQQQD3Yq3pdysE24ambA','o33lBt6Zey0M52UM5EWYLZgXDE0E'],(err,result)=>{
        //api.massSendNews('ys1SXTdWnZhTZQB77MODarSaJ36xfoTG15deo5aGM3eRvEiuT034AMaUocc66uq9','0',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 获取永久素材列表
     */
    getmaterialsAction(){
        //let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        let self = this;
        api.getMaterials('image',0,10,(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 上传永久素材（缩略图）
     */
    uploadmaterialAction(){

        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        //{"media_id":"Snt_yv6I9f5KMAJKz4GNZAjZSXJeIgZVbUgRey2STH8","url":"https://mmbiz.qlogo.cn/mmbiz/yNHpDQhqmZmaEjdMt6hokMa5ic2a8tjEmDp2tHVAxe3orww1bN4YIiayUBThKC9k3PKyr7OxeZ0vIklb2tMaKDXw/0?wx_fmt=jpeg"}
        api.uploadMaterial('D:\\webStorm\\CmsWing\\www\\static\\admin\\img\\m0.jpg','thumb',(err,result)=>{
        //api.uploadThumbMaterial('D:\\webStorm\\CmsWing\\www\\static\\admin\\img\\m21.jpg',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 获取永久素材
     */
    getmaterialAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.getMaterial('PW4hZzpj-j3qdr_hpRFsePOXn8w4YkAPcKfrOfnvVDCHcYZsp81YZcjLiUMiKg3s',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getmaterial");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 获取临时素材
     */
    getmediaAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.getMedia('PW4hZzpj-j3qdr_hpRFsePOXn8w4YkAPcKfrOfnvVDCHcYZsp81YZcjLiUMiKg3s',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getmedia");
                self.end(result);
            }else{
                console.error('err'+err);
            }
        });
    }
    
    /**
     * 新增永久图文素材
     */
    uploadNewsMaterialAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.uploadNewsMaterial({"articles":[{
                "thumb_media_id":"_P6PWPwDdEROB-VD0RWrThuI-CfLgi3vm88mOWHvqtyAmU8Jp3UU1sNs2wfAaYf7",
                "author":"HH",
                "title":"Happy Day",
                "content_source_url":"www.qq.com",
                "content":"hello word",
                "digest":"test",
                "show_cover_pic":"1"
            }]},(err,result)=>{
                if(!think.isEmpty(result)){
                    think.log(result,"test");
                    self.end(result);
                }else{
                    console.error('err'+err);
                }
        });
    }
    

    /**
     * 上传多媒体文件（图文）
     */
    uploadnewsAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.uploadNews({"articles":[{
                "thumb_media_id":"_P6PWPwDdEROB-VD0RWrThuI-CfLgi3vm88mOWHvqtyAmU8Jp3UU1sNs2wfAaYf7",
                "author":"HH",
                "title":"Happy Day",
                "content_source_url":"www.qq.com",
                "content":"hello word",
                "digest":"test",
                "show_cover_pic":"1"
            }]}
            ,(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"test");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 上传图文消息内的图片获取URL
     */
    uploadimageAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.uploadImage('D:\\webStorm\\CmsWing\\www\\static\\admin\\img\\a3.png',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getmaterial");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

    /**
     * 临时(获取thumb_media_id)
     */
    uploadmediaAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.uploadMedia('D:\\webStorm\\CmsWing\\www\\static\\admin\\img\\m0.jpg','thumb',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getmaterial");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }

/**
 * 测试
 */
    async testAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        let picpath = await this.model('picture').find(34);
        api.uploadMedia(think.ROOT_PATH+'/www/'+picpath.path,'thumb',(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getmaterial");
                self.end(result);
            }else{
                console.error('err'+err);
            }

        });
    }
    
    /**
     * 获取关注者列表
     */
    async getusersAction(){
        //let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        let self = this;
        api.getFollowers((err,result)=>{
            if(!think.isEmpty(result)){
                
                think.log(result,"getuser");
                self.end(result['data']);
            }else{
                Console.error('err'+err)
            } 
        });
    }
    /**
     * 获取用户基本信息
     */
    async getuserinfoAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.getUser({openid: 'oVe9Ew0zHFp0up1CeNcK2J5RL4xs', lang: 'zh_CN'},(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getuser");
                self.end(result);
            }else{
                Console.error('err'+err)
            } 
        });
    }
    
    /**
     * 批量获取用户基本信息
     */
    async getusersinfoAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        api.batchGetUsers(['oVe9Ew0zHFp0up1CeNcK2J5RL4xs','oVe9Ewyd7Lw1bKPTtBvCSbB13DtU'],(err,result)=>{
            if(!think.isEmpty(result)){
                think.log(result,"getuser");
                self.end(result);
            }else{
                Console.error('err'+err)
            } 
        });       
    }
    
    /**
     * 
     */
  
}