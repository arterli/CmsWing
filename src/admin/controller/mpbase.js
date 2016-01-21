'use strict';

import Base from './base.js';

export default class extends Base {
    /**
    * index action
    * @return {Promise} []
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
    *setingAction() {
        let map = { 'status': ['>', -1] }
        if (!this.is_admin()) {//管理员可以管理全部公共账号
            map.uid = this.user.uid;
        }
        
        let data = yield this.model('member_public').where(map).page(this.get('page')).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        this.assign('list', data.data);
        console.log(data.data);
        for(let val of data.data){
            val.uid = yield this.model('member').get_nickname(val.uid);
        }
        this.assign({"navxs": true,"bg": "bg-dark"});
        this.meta_title = "公共账号管理";
        return this.display();
    }
    
    
     * huifuAction(){
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
    * setstatusAction() {
        yield super.setstatusAction(this,'member_public');
    }
    /**
     * 自定义菜单
     */
    * customAction() {
        this.meta_title="自定义菜单";
        
        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
    }
}