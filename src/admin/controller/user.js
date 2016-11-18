// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
import fs from 'fs';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http) {
        super.init(http);
        this.db=this.model("member");
        this.tactive = "user";
      
    }

    /**
     * 用户首页
     * @returns {*}
     */
  
   async indexAction(){
        let map = {'status': ['>', -1]}
        let data = await this.db.where(map).page(this.get('page'),20).order('id DESC').countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(this.http); //实例化 Adapter
        let page = pages.pages(data);
        // for(let v of data.data){
        //     console.log(await this.model("member_group").getgroup({groupid:v.groupid}));
        // }
        this.assign('pagerData', page); //分页展示使用
        this.assign('list', data.data);
        this.meta_title="用户列表";
        //获取管理组
        let role = this.model("auth_role").where({status:1}).select();
        this.assign("role",role);
        return this.display();
    }

    async userlistAction(){
        //用户列表
        let gets = this.get()
        let start = parseInt(gets.start);
        let length = parseInt(gets.length);
        let draw = gets.draw;
        let key = gets['search[value]'];
        let userList =await this.db.join({
            table:"customer",
            join:"left",
            as:"u",
            on:['id','user_id']
        }).field("id,username,score,login,last_login_ip,last_login_time,status,u.real_name,u.group_id,u.balance").limit(start, length).where({username: ["like", "%"+key+"%"],status:[">",-1]}).order("id DESC").countSelect()
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
     * 会员充值
     */
    async rechargeAction(){
        if(this.isAjax("POST")){
            let data = this.post();
           let res =  await this.model("customer").where({user_id:data.id}).increment("balance",data.balance);
            console.log(res);
            if(res){
                let amount_log = await this.model("customer").where({user_id:data.id}).getField("balance",true);
                console.log(amount_log);
                //充值成功后插入日志
                let log = {
                    admin_id:this.user.uid,
                    user_id:data.id,
                    type:2,
                    time:new Date().valueOf(),
                    amount:data.balance,
                    amount_log:amount_log,
                    note:`管理员（${await get_nickname(this.user.uid)}）为您充值，充值的金额为：${data.balance} 元`
                }
                await this.model('balance_log').add(log);
                return this.success({name:"充值成功！"});
            }else {
                return this.fail("充值失败！");
            }
        }else {
            let id = this.get("ids");
            let name = get_nickname(id);
            this.assign("name",name);
            this.assign("id",id);
            this.meta_title = "会员充值";
            return this.display();
        }

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
             //用户副表
             await this.model("customer").add({user_id:res});

             //添加角色
             if(data.is_admin == 1){
                 await this.model("auth_user_role").add({user_id:res,role_id:data.role_id});
             }
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
        let id = this.param("ids");
        //console.log(id);
        let res;
        let isadmin = await this.is_admin(id);
        // 判断是否是管理员，如果是不能删除;
        if(isadmin){
           return this.fail("不能删除管理员!")
        }else{
             //res = await this.db.where({id: id}).delete();
            //逻辑删除
            res = await this.db.where({id:["IN",id]}).update({status:-1});
            if(res){
                return this.success({name:"删除成功！"})
            }else {
                return this.fail("删除失败！")
            }
        }


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

    /**
     * 获取用户头像
     */
    async avatarAction() {
        var uploadPath = think.RESOURCE_PATH + '/upload/avatar/' + this.user.uid;
        let path = think.isFile(uploadPath + "/" + "/avatar.png");
        this.type("image/png");
        let pic;
        if (path) {
            // this.download(uploadPath + "/" + "/avatar.png");
            pic = fs.readFileSync(uploadPath + "/" + "/avatar.png")
        } else {
            //this.download(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
            pic = fs.readFileSync(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
        }
        this.end(pic)
    }

}