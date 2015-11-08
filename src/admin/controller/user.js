/**
 * Created by Arterli on 2015/11/2.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http) {
        super.init(http);
        this.db=this.model("member")
    }

    indexAction(){
        this.assign({
            "datatables":true,
            "active":"/admin/user/index",
            "tactive":"/admin/user",
            "selfjs":"list"
        })
        return this.display();
    }

    async userlistAction(){
        //用户列表
        let gets = this.get()
        let start = parseInt(gets.start);
        let length = parseInt(gets.length);
        let draw = gets.draw;
        let key = gets['search[value]'];
        let userList =await this.db.limit(start, length).where({username: ["like", "%"+key+"%"]}).field("id,username,score,login,last_login_ip,last_login_time,status").order("id DESC").countSelect()
        userList.data.forEach(v=>{
            v.last_login_time=times(v.last_login_time)
            v.last_login_ip=_int2iP(v.last_login_ip)
        })
        //console.log(userList)
        let data={
            "draw": draw,
            "recordsTotal": userList.count,
            "recordsFiltered": userList.count,
            "data": userList.data
        }
       return this.json(data);
    }

    async adduserAction(){
         let data=this.post();
             data.password = encryptPassword(data.password);
             data.reg_time = new Date().valueOf();
        let res = await this.db.add(data);
        if(res){
            return this.json(1);
        }else{
            return this.json(0)
        }

    }
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

    authAction(){
        this.assign({
            "datatables":true,
            "active":"/admin/user/auth",
            "tactive":"/admin/user",
            "selfjs":"auth"
        })
        return this.display();
    }

    async roleAction(){
        let gets = this.get();
        let draw = gets.draw;
        let res = await this.model('auth_role').field("id,desc,status,description").order("id DESC").select();
        let data={
            "draw": draw,
            "data": res
        }

        console.log(data);
        return this.json(data);
    }

    async roleeditAction(){
        if(this.isAjax("post")){
            let id=this.post("id");
            let desc = this.post("desc");
            let description = this.post("description");
            let data = await this.model('auth_role').where({id:id}).update({desc:desc,description:description});
            return this.json(data);
        }else{
        let id = this.get("id");
        let res = await this.model('auth_role').where({id:id}).find();
        this.assign({
            data:res
        })
        return this.display();
        }
    }

    async roleaddAction(){
        let data=this.post();
        //console.log(1111111111111111)
        let res = await this.model('auth_role').add(data);

        if(res){
            return this.json(1);
        }else{
            return this.json(0)
        }
    }
    async roledelAction(){
        let id = this.post("id");
        //console.log(id);
        let res = await this.model('auth_role').where({id:id}).delete();
        return this.json(res);
    }
}