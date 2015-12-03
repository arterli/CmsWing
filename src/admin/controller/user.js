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
        this.tactive = "user";
    }

    /**
     * 用户首页
     * @returns {*}
     */

    indexAction(){
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

    /**
     * adduser
     * 添加用户
     * @returns {Promise|*}
     */
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

    /**
     * userdel
     * 用户删除
     * @returns {Promise|*}
     */
    async userdelAction() {
        let id = this.post("id");
        //console.log(id);
        let res = await this.db.where({id: id}).delete();
        return this.json(res);
    }
    /**
     * 改变角色状态
     * @returns {Promise|*}
     */
    async chstaAction(){
        let res = await this.db.update(this.get());
        if(res){
            return this.json(res);
        }
    }

    /**
     * 注册异步验证用户数据
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


}