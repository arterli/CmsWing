'use strict';

import Base from './base.js';
import API from 'wechat-api';
export default class extends Base {
    /**
    * index action
    * @return {Promise} []1212
    */
    init(http) {
        super.init(http);

    }
    /**
     * index action
     * @return {Promise} []
     */
   
    indexAction() {
        //auto render template file index_index.html
        this.meta_title = '微信管理';
        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
    }
    /**
     * 公众账号管理
     */
    async setingAction() {
        let map = { 'status': ['>', -1] }
        if (!this.is_admin()) {//管理员可以管理全部公共账号
            map.uid = this.user.uid;
        }
        
        let data = await this.model('member_public').where(map).page(this.get('page')).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        this.assign('list', data.data);
        for(let val of data.data){
            val.uid = await this.model('member').get_nickname(val.uid);
        }
        this.assign({"navxs": true,"bg": "bg-dark"});
        this.meta_title = "公共账号管理";
        return this.display();
    }
    
    
     async huifuAction(){
        if(this.isPost()){
            let post = this.post();
             if(think.isEmpty(post)){
                post =  JSON.stringify(post)
                 //console.log(post);
                 this.success({name:post,url:"/admin/mpbase"});
             }else{
                 this.fail("dffdsfs");
             }
        }else{
       
         this.meta_title="自动回复";
         this.assign({"navxs": true,"bg": "bg-dark"});
         return this.display();
         }
        }
    /**
     * 设置一条或者多条数据的状态
     */
    async setstatusAction() {
        await super.setstatusAction(this,'member_public');
    }
    
    
     /**
     * 群发功能
     */
     async massAction(){
        this.meta_title="群发功能";

        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let self = this;
        //调用用户分组API
        let aa = function(api){
            let deferred = think.defer();
            api.getGroups((err,result)=>{
                if(!think.isEmpty(result)){
                    deferred.resolve(result['groups']);
                }else{
                    console.error(err);
                }
            });
            return deferred.promise;
        }
            let res =await aa(api);
        this.assign('groups', res);//用户分组
        this.assign({"navxs": true,"bg": "bg-dark"});
        return self.display();
    }
    
    /**
     * 监听微信关注或取消，进行本地用户数据更新
     */
    async updateusersAction(){
        let FromUserName = 'openid';//发送方帐号（一个OpenID）
        let Event = 'subscribe';//subscribe(订阅)、unsubscribe(取消订阅)
        let user_model = this.model('wx_user');
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        if(Event == 'subscribe' && !thik.isEmpty(FromUserName)){
            //通过openid获取用户基本信息
             let userinfo = function(api) {
                    let deferinfo = think.defer();
                    api.getUser(FromUserName,(err,result)=>{
                        if(!think.isEmpty(result)){
                        deferinfo.resolve(result);
                        }else{
                            Console.error('err'+err);
                        } 
                    });
                    return deferinfo.promise;
             }
             let resusers = await userinfo(api);
             //添加到本地库中
             await user_model.add(resusers);            
        }else{
            //修改取消订阅用户的状态
            await user_model.where({'openid':FromUserName}).update({'subscribe':0});
        }
        
        
    }
    
    
    /**
     * 获取微信公众账号用户信息并保存到本地库
     */
    async getusersAction(){
        this.meta_title="获取粉丝信息";
        let user_model = this.model('wx_user');
        let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        //let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        //let finduser = await this.model('user').countSelect();
        let self = this;
        //获取关注者列表
        let users = function(api) {
            let deferred = think.defer();
            api.getFollowers((err,result)=>{
                if(!think.isEmpty(result)){
                   deferred.resolve(result);
                }else{
                    Console.error('err'+err);
                } 
            });
            return deferred.promise;
        }
        let res = await users(api);
        let useropenid = res['data']['openid'];
        let count = res['count'];
       //self.end(useropenid);
       //判断数据是否存在
       
        
        //批量获取用户基本信息
        let isadd = false;
        let tmp_openids = [];
        for(let i=0;i<count;i++){
            tmp_openids.push(useropenid[i]);
            if((i+1)%100 == 0 || i == (count-1)){
                //think.log('dd','aaa');
                 let userinfo = function(api) {
                    let deferinfo = think.defer();
                    api.batchGetUsers(tmp_openids,(err,result)=>{
                        if(!think.isEmpty(result)){
                        deferinfo.resolve(result);
                        }else{
                            Console.error('err'+err);
                        } 
                    });
                    return deferinfo.promise;
                }
                let resusers = await userinfo(api);
                let resinfo = resusers['user_info_list'];
                //console.log(resinfo);
                //self.end(resinfo);
               console.log("开始：")
               for (var key in resinfo) {
                       var element = resinfo[key];
                       //self.end(element.openid);
                       console.log('-------------'+element.openid);
                       //let addres = await user_model.add(element);
                       //let nickname = element.nickname.replace(/(\\x[a-fA-F0-9]{2})*/g, ' ');
                       let nickname = element.nickname.replace(/[\x80-\xfe]*/g, ' ');
                       //let nickname = removeFourChar(element.nickname);
                       element.nickname = nickname;
                       
                       let addres = await user_model.thenAdd(element,{openid:element.openid});
                       console.log('+++++++++'+addres);
                       if(addres){
                           isadd = true;
                       }else{
                           isadd = false;
                       }        
               }
               tmp_openids = [];
            }
        }
        if(isadd){
            this.success({name:"操作成功！",url:"/admin/mpbase/menu"}); 
        }else{
            this.fail("error");
        }
              
    }
    
    /**
     * 根据条件筛选进行群发--通过openid,只能是认证服务号使用
     * 通过分组groupid进行群发，认证后的订阅号和服务号都可以使用
     */
    async masssendAction(){
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        let model = this.model('wx_user');
        let self = this;
        //let send_type = this.post('send_type');//1:图文2：文字3：图片4：语音5：视频6：卡卷
        let send_type = 1;
        let group_id = this.post('group_id');
        //let media_id = this.post('media_id');
        //let group_type = this.post('group_type');
        //let sex = this.post('sex');
        //let province = this.post('province');
        //let city = this.post('city');
        let media_id = 'WnHaYbbZUpy6xrrbADac_zObgAaFqh474Row6ar4PLJXEfVeA2OnR65uUSREYn_i';
        let content = '文本消息';
        let group_type = 0;
        let sex = 1;
        let province = '陕西';
        let city = '西安';
        //通过条件查询本地库数据
        let userinfo = await model.where({'sex':sex,'province':province,'city':city}).field('openid').select();
        //let userinfo ='aaa';
       //self.end(userinfo);
        
        let openids = [];
        for (var key in userinfo) {
            if (userinfo.hasOwnProperty(key)) {
                openids.push(userinfo[key].openid);    
            }
        }
        //self.end(aa);
        let res = '';
        
        //判断是通过groupid还是openid进行群发
        if(group_type == 1){
            //分组群发
            switch (send_type) {
                case 1://图文
                    res = await massSendNews(api,media_id,group_id);
                    break;
                case 2://文本
                    res = await massSendText(api,content,group_id);
                    break;
                case 3://图片
                    res = await massSendImage(api,media_id,group_id);
                    break;
                case 4://语音
                    res = await massSendVoice(api,media_id,group_id);
                    break;
                case 5://视频
                    res = await massSendVideo(api,media_id,group_id);
                    break;
            }
            
        }else{
            //self.end('0');
            if(think.isEmpty(province)){
                //self.end('10');
                //全部群发
                res =await bymasssend(api,media_id,true);
            }else{
                //self.end('openid');
                //根据条件通过openid进行群发
                switch (send_type) {
                    case 1://图文
                        res = await massSendNews(api,media_id,openids);
                        break;
                    case 2://文本
                        res = await massSendText(api,content,openids);
                        break;
                    case 3://图片
                        res = await massSendImage(api,media_id,openids);
                        break;
                    case 4://语音
                        res = await massSendVoice(api,media_id,openids);
                        break;
                    case 5://视频
                        res = await massSendVideo(api,media_id,openids);
                        break;
                }
            }
        }
        
        let msg_id = res['msg_id'];//发送成功返回消息ID
        self.end(msg_id);
        
        //判断是否群发消息是否成功
        if(res['errcode'] == 0){
            //本地保存media_id和msg_id

        }

        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
        
        
        
    }
    /**
     * 查看用户列表
     */
    async menuAction(){
        let data = await this.model('wx_user').page(this.get('page')).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        this.assign('list', data.data);
        
        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
    }
    
    
    
    /**
     * 自定义菜单
     */
    async customAction() {
        this.meta_title="自定义菜单";
        
        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
    }
}