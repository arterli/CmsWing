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
    }

    async indexAction(){
        //auto render template file index_index.html
        let id = this.get('id')||1;
        let list   = await this.model("setup").where({'status':1,'group':id}).field('id,name,title,extra,value,remark,type').order('sort').select();
        console.log(list);
        this.assign({
            "tactive":"sysm",
            "active":"/admin/setup/index",
        })
        return this.display();
    }

   groupAction(){
       this.assign({
           "tactive":"sysm",
           "active":"/admin/setup/group",
       })
        return this.display();
    }
    async groupdataAction(){
        if(this.isGet()){
            let map = {};
            map.status = 1;
            let gets = this.get();
            console.log(gets);
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
    async aabbAction(){

        //obj = "export default "+JSON.stringify(obj)
        //let filename = think.getPath("common", "model");
        //this.config("setup",{"aa":"bbb"})

        let value = await this.model("setup").getset();
        this.end(value);
        //fs.writeFileSync(filename, obj, [options])
    }
}