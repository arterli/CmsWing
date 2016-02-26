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
     * 获取微信公众账号用户信息并保存到本地库
     */
    async getusersAction(){
        this.meta_title="获取粉丝信息";
        let user_model = this.model('user');
        //let api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        let api = new API('wxec8fffd0880eefbe', 'a084f19ebb6cc5dddd2988106e739a07');
        //let finduser = await this.model('user').countSelect();
        let self = this;
        //获取关注者列表
        let users = function(api) {
            let deferred = think.defer();
            api.getFollowers((err,result)=>{
                if(!think.isEmpty(result)){
                   deferred.resolve(result);
                }else{
                    Console.error('err'+err)
                } 
            });
            return deferred.promise;
        }
        let res = await users(api);
        let useropenid = res['data']['openid'];
        let count = res['count'];
       //self.end(useropenid);
        
        //批量获取用户基本信息
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
               //self.end(resinfo);
                console.log("开始：")
               for (var key in resinfo) {
                       var element = resinfo[key];
                       await user_model.add(element);         
               }
               tmp_openids = [];
            }
        }       
    }
    
    /**
     * 群发信息
     */
    async bymasssendAction(media_id,receivers){
        let self = this;
        self.end(media_id);
         let mass = function(api){
            let deferred = think.defer();
            api.massSendNews(media_id,receivers,(err,result)=>{
                if(!think.isEmpty(result)){
                    deferred.resolve(result);
                }else{
                    console.error('err'+err);
                }
            });
            return deferred.promise;
        }
        let res = await mass(api);
        self.end(res);
        return res;
    }
    

    /**
     * 根据条件筛选进行群发--通过openid,只能是认证服务号使用
     * 通过分组groupid进行群发，认证后的订阅号和服务号都可以使用
     */
    async masssendAction(){
        let model = this.model('user');
        let self = this;
        let group_id = this.post('group_id');
        //let media_id = this.post('media_id');
        //let group_type = this.post('group_type');
        //let sex = this.post('sex');
        //let province = this.post('province');
        //let city = this.post('city');
        let media_id = 'ys1SXTdWnZhTZQB77MODarSaJ36xfoTG15deo5aGM3eRvEiuT034AMaUocc66uq9';
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
            self.end('1');
            //分组群发
            res = this.bymasssendAction(media_id,group_id);
        }else{
            //self.end('0');
            if(think.isEmpty(province)){
                //self.end(province);
                //全部群发
                res = this.bymasssendAction(media_id,true);
            }else{
                //self.end('openid');
                //根据条件通过openid进行群发
                res = this.bymasssendAction(media_id,openids);
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
     * 自定义菜单
     */
    async customAction() {
        this.meta_title="自定义菜单";
        
        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
    }
}