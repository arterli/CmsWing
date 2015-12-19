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
        this.db = this.model('setup');
        this.tactive = "setup"
    }

    async indexAction(){
        //auto render template file index_index.html
        let id = this.get('id')||1;
        let type = this.setup.CONFIG_GROUP_LIST;
        let list = await this.model("setup").where({'status':1,'group':id}).field('id,name,title,extra,value,remark,type').order('sort').select();
       if(list){
           this.assign('list',list);
       }
        this.assign({
            "meta_title":type[id]+"设置",
            "id":id
        })
        this.meta_title='网站配置';
        return this.display();
    }

    groupAction(){
        this.meta_title = "配置管理"
        return this.display();
    }
    async groupdataAction(){
        if(this.isGet()){
            let map = {};
            map.status = 1;
            let gets = this.get();
            let start = parseInt(gets.start);
            let length = parseInt(gets.length);
            let draw = gets.draw;
            let key = gets['search[value]'];
            map["name|title"] = ["like", "%"+key+"%"];
            if(gets.group){
                map.group   =   gets.group||0;
            }
            //如果缓存 userList 不存在，则查询数据库，并将值设置到缓存中
            let list = await this.db.limit(start, length).where(map).order("sort ASC").countSelect()
            list.data.forEach(v =>{
                if(v.group){
                v.group=this.setup.CONFIG_GROUP_LIST[v.group];
                }else{
                    v.group="未分组";
                }
                v.type =this.setup.CONFIG_TYPE_LIST[v.type];
            })

            let data={
                "draw": draw,
                "recordsTotal": list.count,
                "recordsFiltered": list.count,
                "data": list.data
            }
            return this.json(data);
        }
    }

    /**
     * 新增配置
     *
     */
    async addAction(){
        if(this.isPost()){
            let data = this.post();
            data.status = 1;
            data.update_time = new Date().valueOf();
            let addres =await this.db.add(data);
            if(addres){
                think.cache("setup", null);
                return this.json(1)
            }else {
                return this.json(0)
            }
        }else {
            this.assign({
                "action":"/admin/setup/add"
            })
            this.active = "admin/model/index"
            this.meta_title="新增配置";
            this.display();
        }
    }
    //编辑配置
    async editAction(){
        if(this.isPost()){
            let data = this.post();
            data.status = 1;
            data.create_time = new Date().valueOf();
            let upres =await this.db.update(data);
            if(upres){
                think.cache("setup", null);
                return this.json(1)
            }else {
                return this.json(0)
            }
        }else {
            let map = {};
            map.id = this.get("id");
            let info = await this.db.where(map).find();
            this.assign("info",info);
            this.assign({
                "action":"/admin/setup/edit"
            })
            this.active = "admin/model/index"
            this.meta_title="编辑新增";
            this.display();
        }

    }
    async saveAction(){
        let post = this.post();
        //console.log(post);
        for(let v in post){
            this.db.where({name: v}).update({value: post[v]});
        }
        think.cache("setup", null);
        this.json(1)
    }

//删除配置
    async delAction(){
        let id = this.get("id");
        let res = await this.db.where({id:id}).delete();
        if(res){
            think.cache("setup", null);
            return this.json(1)
        }else {
            return this.json(0)
        }
    }
    /**
     * 添加配置异步验证数据
     * @returns {Promise|*}
     */
    async parsleyAction(){
        //验证
        let data=this.get();
        // console.log(data);
        let res = await this.db.where(data).find();
        // console.log(res);
        if(think.isEmpty(res)){
            return this.json(1);
        }else{
            return this.json(0);
        }
    }


    async aabbAction(){

        //obj = "export default "+JSON.stringify(obj)
        //let filename = think.getPath("common", "model");
        //this.config("setup",{"aa":"bbb"})

        let value = await this.model("menu").getallmenu();
        this.end(value);
        //fs.writeFileSync(filename, obj, [options])
    }
}