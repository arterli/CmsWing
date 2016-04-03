// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
import pagination from 'think-pagination';
export default class extends Base {
    async init(http) {
        super.init(http);
        //let login = await super.islogin()
        ////是否验证登陆
        //if(!login){
        //    return this.fail("你木有登录！")
        //}
    }

    /**
     * index action
     * 用户中心主页
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        if (!this.is_login) {
            return think.statusAction(1000, this.http);
        }

        // this.http.error = new Error('成功信息！');
        // return think.statusAction(1001, this.http);
        // this.http.error = new Error('错误信息！');
        // return think.statusAction(1002, this.http);
        //获取用户信息
        let userInfo = await this.model("member").join({
            table: "customer",
            jion: "left",
            on: ["id", "user_id"]
        }).find(this.user.uid);
        this.assign("userInfo", userInfo);
        //订单交易总金额
        let order = await this.model("order").where({user_id: this.user.uid, pay_status: 1}).getField('order_amount');
        let orderTotal = eval(order.join("+"));
        this.assign("orderTotal", orderTotal);
        //进行中的订单
        let onOrder = await this.model("order").where({status: 4}).count("id");
        this.assign("onOrder", onOrder);
        //带评价的商品 TODO
        this.meta_title = "用户中心";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            return this.display(`mobile/${this.http.controller}/${this.http.action}`)
        } else {
            return this.display();
        }
    }

    //我的订单
    async orderAction() {
        if (!this.is_login) {
            return think.statusAction(1000, this.http);
        }
        let status = this.get("status")||null;
        let map;

        //当前位置
        if (!think.isEmpty(status)) {
            this.assign('status', status);
        }
        //筛选订单

        if(status==0){//未付款的订单
            map = {
                pay_status: 0,
                delivery_status: ["!=", 1],
                status: ["NOTIN", [4, 6]],
                is_del: 0,
                user_id: this.user.uid,
            }
        }else if(status==1){//代收货的订单
            //(item.pay_status == 1 or item.status ==3) and item.delivery_status != 1 and item.status != 6 and item.status != 4
            //item.delivery_status == 1 and item.status != 6 and item.status != 4
            // map={
            //     status: ["NOTIN", [4, 6]],
            //     delivery_status: ["!=", 1],
            //     is_del: 0,
            //     user_id: this.user.uid,
            //     _complex:{
            //         pay_status: 1,
            //         status: 3,
            //         _logic: "or"
            //     }
            // }
            map={
                status: ["NOTIN", [4, 6]],
                delivery_status: 1,
                is_del: 0,
                user_id: this.user.uid,
            }
        }else {
            map = {
                is_del: 0,
                user_id: this.user.uid,
            }
        }


        console.log(map);
        // this.config("db.nums_per_page",20)
        let data = await this.model("order").where(map).page(this.get('page')).order("create_time DESC").countSelect();
        let html = pagination(data, this.http, {
            desc: false, //show description
            pageNum: 2,
            url: '', //page url, when not set, it will auto generated
            class: 'nomargin', //pagenation extra class
            text: {
                next: '下一页',
                prev: '上一页',
                total: 'count: ${count} , pages: ${pages}'
            }
        });
        this.assign('pagination', html);
        for (let val of data.data) {
            switch (val.payment) {
                case 100:
                    val.channel = "预付款支付";
                    break;
                case 1001:
                    val.channel = "货到付款";
                    break;
                default:
                    val.channel = await this.model("pingxx").where({id: val.payment}).getField("title", true);
            }
            val.province = await this.model("area").where({id: val.province}).getField("name", true);
            val.city = await this.model("area").where({id: val.city}).getField("name", true);
            val.county = await this.model("area").where({id: val.county}).getField("name", true);
            //未付款订单倒计时
            if (val.pay_status == 0) {
                val.end_time = date_from(val.create_time + (Number(this.setup.ORDER_DELAY) * 60000))
            }
            //console.log(this.setup.ORDER_DELAY_BUND)
            //查出订单里面的商品列表
            val.goods = await this.model("order_goods").where({order_id: val.id}).select();

            for (let v of val.goods) {
                v.prom_goods = JSON.parse(v.prom_goods);
                v = think.extend(v, v.prom_goods);
                delete v.prom_goods;
            }
            //console.log(val.goods)
        }
        //未付款统计
        let nopaid = await this.model("order").where({
            pay_status: 0,
            delivery_status: ["!=", 1],
            status: ["NOTIN", [4, 6]],
            is_del: 0,
            user_id: this.user.uid,
        }).count("id");
        this.assign("nopaid",nopaid);
        //未付款统计
        let receipt = await this.model("order").where({
            status: ["NOTIN", [4, 6]],
            delivery_status: 1,
            is_del: 0,
            user_id: this.user.uid,
        }).count("id");
        this.assign("nopaid",nopaid);
        this.assign("receipt",receipt);
        // console.log(data.data);
        this.assign('list', data.data);
        this.meta_title = "我的订单";
        return this.display();
    }
   //删除订单
   async delorderAction() {
        if (!this.is_login) {
            return think.statusAction(1000, this.http);
        }

        let map = {
            id: this.get("id"),
            user_id: this.user.uid,
            status: ["IN", [4, 6]]
        }
       let res =await this.model("order").where(map).update({is_del:1});
       if(res){
           return this.success({name:"删除成功！"});
       }else {
           return this.fail("删除失败!");
       }
    }
    //确认收货
    async confirmreceiptAction(){
        if (!this.is_login) {return think.statusAction(1000, this.http);}
        let map = {
            id: this.get("id"),
            user_id: this.user.uid,
            delivery_status:1,
            status: ["NOTIN", [4, 6]]
        }
        let res =await this.model("order").where(map).update({status:4});
        if(res){
            return this.success({name:"操作成功！"});
        }else {
            return this.fail("操作失败!");
        }
    }

    /**
     * 收货地址管理
     * @returns {PreventPromise}
     */
   async addressAction(){
        if(!this.is_login){return think.statusAction(1000,this.http);}
       let data =await this.model("address").where({user_id:this.user.uid}).page(this.get('page')).order("is_default DESC,id DESC").countSelect();
       let html = pagination(data, this.http, {
           desc: false, //show description
           pageNum: 2,
           url: '', //page url, when not set, it will auto generated
           class: 'nomargin', //pagenation extra class
           text: {
               next: '下一页',
               prev: '上一页',
               total: 'count: ${count} , pages: ${pages}'
           }
       });
       //think.log(data);
       this.assign('pagination', html);
       if(!think.isEmpty(data.data)){
           for(let val of data.data){
               val.province_num = val.province;
               val.city_num = val.city;
               val.county_num = val.county;
               val.province = await this.model("area").where({id:val.province}).getField("name",true);
               val.city = await this.model("area").where({id:val.city}).getField("name",true);
               val.county = await this.model("area").where({id:val.county}).getField("name",true);
           }
       }
       this.assign("list",data.data);
        this.meta_title = "收货地址";
        this.display();
    }

    /**
     * 账户金额管理
     * @returns {PreventPromise}
     */
   async accountAction(){
        if(!this.is_login){return think.statusAction(1000,this.http);}
        let type = this.get("type")||null;
       let data;
       if(think.isEmpty(type)){
        data =await this.model("balance_log").where({user_id:this.user.uid}).page(this.get('page')).order("time DESC").countSelect();
       }else {
         data = await this.model("balance_log").where({user_id:10000}).page(this.get('page')).order("time DESC").countSelect();
       }

        let html = pagination(data, this.http, {
            desc: false, //show description
            pageNum: 2,
            url: '', //page url, when not set, it will auto generated
            class: 'nomargin', //pagenation extra class
            text: {
                next: '下一页',
                prev: '上一页',
                total: 'count: ${count} , pages: ${pages}'
            }
        });
        //think.log(data);
        this.assign('pagination', html);
        this.assign("list",data.data);
       this.assign("type",type);
       //获取用户信息
       let userInfo = await this.model("member").join({
           table: "customer",
           jion: "left",
           on: ["id", "user_id"]
       }).find(this.user.uid);
       this.assign("userInfo", userInfo);
        this.meta_title = "账户金额管理";
        this.display();
    }
//   用户设置
    setingAction() {
        if (!this.is_login) {
            return this.fail("你木有登录！")
        }

        this.meta_title = "用户设置";
        return this.display();
    }

    /**
     * 注册页面
     */
    registerAction() {
        this.meta_title = "用户注册";
        return this.display();
    }


//   登陆页面
    async loginAction() {

        if (this.isAjax("post")) {
            let data = this.post();
            //console.log(data);
            let username = this.post('username');
            let password = this.post('password');
            password = encryptPassword(password);
            let res = await this.model("member", {}, "admin").signin(username, password, this.ip(), 1);
            if (0 < res.uid) {
                //记录用户登录行为
                await this.model("action", {}, "admin").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
                //console.log(11111111111111);
                await this.session('webuser', res);
                //TODO 用户密钥
                return this.success({name: '登录成功！'});
            } else { //登录失败
                let fail;
                switch (res) {
                    case -1:
                        fail = '用户不存在或被禁用';
                        break; //系统级别禁用
                    case -2:
                        fail = '密码错误';
                        break;
                    default:
                        fail = '未知错误';
                        break; // 0-接口参数错误（调试阶段使用）
                }
                this.fail(res, fail);
            }
        } else {
            //如果已经登陆直接跳转到用户中心
            if (this.is_login) {
                this.redirect("/user/index")
            }
            this.meta_title = "用户登录";
            //判断浏览客户端
            if (checkMobile(this.userAgent())) {
                return this.display(`mobile/${this.http.controller}/${this.http.action}`)
            } else {
                return this.display();
            }
        }

    }

    //退出登录
    async logoutAction() {
        //退出登录

        if (this.is_login) {

            await this.session('webuser', null);

            this.redirect("/index");
        } else {
            this.redirect("/index");
        }
    }
}