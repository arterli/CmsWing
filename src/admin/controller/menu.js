// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http){
        super.init(http);
        this.db = this.model('menu');
        this.tactive = "setup"
    }

    indexAction(){
        //auto render template file index_index.html
        this.meta_title='菜单管理';
        return this.display();
    }

    /**
     * getlist
     */
    * getlistAction(){
        let pid = this.get("pid")||0;
        let draw = this.get("draw");
        if(pid){
        let data = yield this.db.where({id:pid}).find();
        }
        let i = pid;
        //
        let breadcrumb = []
        while (i!=0)
        {
            let nav = yield this.db.where({id:i}).field("id,title,pid").find();
            breadcrumb.push(nav);
            i = nav.pid;

        }
        let all_menu = yield this.db.field('id,title').select();
        //all_men
        let obj = {};
          all_menu.forEach(v=>{
              obj[v.id]=v.title;
          })

        let map = {};
        map.pid = pid;
        let list = yield this.db.where(map).order("sort asc ,id asc").select();
        //list
        if(list){
            list.forEach((v,k)=>{
                if(v.pid){
                    v.up_title=obj[v.pid];
                }else{
                    v.up_title="一级菜单";
                }
                //console.log(this.setup.MEUN_GROUP)
                v.group=this.setup.MENU_GROUP[v.group];
            })
        }
        let relist = {
            "draw": draw,
            "data": list,
            "breadcrumb":breadcrumb.reverse()
        }
        //console.log(data);
        return this.json(relist);

    }
    /**
     * 改变状态
     * @returns {Promise|*}
     */
    * chstaAction(){
          //let gets = this.get();
          let map = {};
        //console.log(gets);
        if(this.get("key")==1){
            map.hide = this.get("status");
        }else{
            map.is_dev = this.get("status");
        }
        map.id = this.get("id");
        let res = yield this.db.update(map);
        if(res){
            think.cache("adminenu", null);//清除菜单缓存
            return this.json(res);
        }
    }
    /**
     * 编辑菜单
     * @returns {*}
     */
    * editAction() {
        if (this.isAjax("post")) {
            let id = this.post("id");
            let data = yield this.db.where({id: id}).update(this.post());
            think.cache("adminenu", null);//清除菜单缓存
            return this.json(data);
        } else {
            let id = this.get("id");
            let res = yield this.db.where({id: id}).find();
           // console.log(res);
            this.assign({
                data: res
            })
            return this.display();
        }
    }

    /**
     * 添加菜单
     * @returns {*}
     */
    * addAction(){
        if(this.isAjax("post")){
         let data = this.post();
            data.status = 1;
            let add = yield this.db.add(data);
            think.cache("adminenu", null);//清除菜单缓存
            return this.json(add);
        }else{
        return this.display();
        }
    }

    /**
     * 删除菜单
     * @returns {Promise|*}
     */
      * deleteAction(){
          let id = this.post("id");
          //console.log(id);
          let res = yield this.db.where({id: id}).delete();
        think.cache("adminenu", null);//清除菜单缓存
          return this.json(res);
        }

    /**
     * 获取上级菜单
     * @returns {Promise|*}
     */
    * getmenuAction(){
        let menu = yield this.returnnodes();
       // console.log(menu);
        return this.json(menu);
    }
    * aabbAction(){
        let value = yield this.model("menu").getallmenu();
        this.end(value);
    }
}