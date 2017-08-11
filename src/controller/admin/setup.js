// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        // 其他额外的操作
        this.db = this.model('setup');
        this.tactive = "setup"
    }
    //加载配置
    async loadsetup(){
        const fs = require('fs');
        let setup = await this.model("setup").lists();
        let path1 = think.getPath("common", "config");
        if(think.isDir(think.ROOT_PATH+'/src')){
            let data = "export default"+JSON.stringify(setup);
            fs.writeFileSync(think.ROOT_PATH+'/src/common/config/setup.js', data);
        }
        let data1 = "exports.__esModule = true;exports.default ="+JSON.stringify(setup);
        fs.writeFileSync(path1+'/setup.js', data1);
    }
    async indexAction(){
        //加载配置
        //await this.loadsetup();
        //auto render template file index_index.html
        let id = this.get('id')||1;
        let type = this.config('setup.CONFIG_GROUP_LIST');
        let list = await this.db.where({'status':1,'group':id}).field('id,name,title,extra,value,remark,type').order('sort').select();
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
        if(this.isGet){
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
            //console.log(gets);
            let lists = await this.db.limit(start, length).where(map).order("sort ASC").countSelect()
            lists.data.forEach(v =>{
                if(v.group){
                v.group=(this.config('setup.CONFIG_GROUP_LIST'))[v.group];
                }else{
                    v.group="未分组";
                }
                v.type =(this.config('setup.CONFIG_TYPE_LIST'))[v.type];
            })

            let data={
                "draw": draw,
                "recordsTotal": lists.count,
                "recordsFiltered": lists.count,
                "data": lists.data
            }
            return this.json(data);
        }
    }

    /**
     * 新增配置
     *
     */
    async addAction(){
        if(this.isPost){
            let data = this.post();
            data.status = 1;
            data.update_time = new Date().valueOf();
            let addres =await this.db.add(data);
            if(addres){
                think.cache("setup", null);
                process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
                //await this.loadsetup();
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
            return this.display();
        }
    }
    //编辑配置
    async editAction(){
        if(this.isPost){
            let data = this.post();
            data.status = 1;
            data.create_time = new Date().valueOf();
            let upres =await this.db.update(data);
            if(upres){
                think.cache("setup", null);
                process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令

                // await this.loadsetup();
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
            return this.display();
        }

    }
    async saveAction(){
        let post = this.post();
        //console.log(post);
        for(let v in post){
            this.db.where({name: v}).update({value: post[v]});
        }
        think.cache("setup", null);
        process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
        //await this.loadsetup();
        this.json(1)
    }

//删除配置
    async delAction(){
        let id = this.get("id");
        let res = await this.db.where({id:id}).delete();
        if(res){
            think.cache("setup", null);
            process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
            // console.log(process);
            // console.log("sdfsfasfa");
            //await this.loadsetup();
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