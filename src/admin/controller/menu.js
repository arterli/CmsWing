/**
 * Created by arter on 2015/11/16.
 */
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
    }

    indexAction(){
        //auto render template file index_index.html
        this.assign({
            "tactive":"sysm",
            "active":"/admin/menu/index",
        })
        return this.display();
    }

    /**
     * ajax获取菜单列表
     */
    async getlistAction(){
        let pid = this.get("pid")||0;
        let draw = this.get("draw");
        if(pid){
        let data = await this.db.where({id:pid}).find();
        }
        let i = pid;
        //循环查找pid，直到pid=0
        let breadcrumb = []
        while (i!=0)
        {
            let nav = await this.db.where({id:i}).field("id,title,pid").find();
            breadcrumb.push(nav);
            i = nav.pid;

        }
        let all_menu = await this.db.field('id,title').select();
        //all_men转换
        let obj = {};
          all_menu.forEach(v=>{
              obj[v.id]=v.title;
          })

        let map = {};
        map.pid = pid;
        let list = await this.db.where(map).order("sort asc ,id asc").select();
        //list重组
        if(list){
            list.forEach((v,k)=>{
                if(v.pid){
                    v.up_title=obj[v.pid];
                }else{
                    v.up_title="一级菜单";
                }
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
    async chstaAction(){
          //let gets = this.get();
          let map = {};
        //console.log(gets);
        if(this.get("key")==1){
            map.hide = this.get("status");
        }else{
            map.is_dev = this.get("status");
        }
        map.id = this.get("id");
        let res = await this.db.update(map);
        if(res){
            return this.json(res);
        }
    }
    aabbAction(){
        console.log(1)
    }
}