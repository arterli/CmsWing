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
import fs from 'fs';
import Jimp from "jimp";
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
        // if (!this.is_login) {
        //     return think.statusAction(700, this.http);
        // }
        //判断是否登陆
        await this.weblogin();
        // this.http.error = new Error('成功信息！');
        // return think.statusAction(701, this.http);
        // this.http.error = new Error('错误信息！');
        // return think.statusAction(702, this.http);
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
        let onOrder = await this.model("order").where({status: 4,user_id: this.user.uid}).count("id");
        this.assign("onOrder", onOrder);
        //带评价的商品 TODO
        this.meta_title = "用户中心";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            let mtype = this.get('mtype')
            if(mtype == 'vue'){
            //vue
                let vuedata = {orderTotal:orderTotal,onOrder:onOrder}
                return this.json(vuedata)
            }else {//普通模板
                this.active = this.http.controller+"/"+this.http.action;
                return this.display(`mobile/${this.http.controller}/${this.http.action}`)
            }
            
        } else {
            return this.display();
        }
    }

    //我的订单
    async orderAction() {
        //判断是否登陆
        await this.weblogin();
        let status = this.param("status") || null;
        //console.log(status);
        let map;

        //当前位置
        if (!think.isEmpty(status)) {
            this.assign('status', status);
        }
        //筛选订单

        if (status == 0) {//未付款的订单
            map = {
                type: 0,
                pay_status: 0,
                delivery_status: ["!=", 1],
                status: ["NOTIN", [4, 6]],
                is_del: 0,
                user_id: this.user.uid,
            }
        } else if (status == 1) {//代收货的订单
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
            map = {
                type: 0,
                status: ["NOTIN", [4, 6]],
                delivery_status: 1,
                is_del: 0,
                user_id: this.user.uid,
            }
        } else {
            map = {
                type: 0,
                is_del: 0,
                user_id: this.user.uid,
            }
        }


        //console.log(map);
        // this.config("db.nums_per_page",20)
        let data = await this.model("order").where(map).page(this.param('page')).order("create_time DESC").countSelect();
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
             let numarr=[];
            for (let v of val.goods) {
                v.prom_goods = JSON.parse(v.prom_goods);
                numarr.push(v.goods_nums);
                v = think.extend(v, v.prom_goods);
                delete v.prom_goods;
            }
            console.log(val.goods)
            val.nums = eval(numarr.join("+"));
        }
        //未付款统计
        let nopaid = await this.model("order").where({
            type: 0,
            pay_status: 0,
            delivery_status: ["!=", 1],
            status: ["NOTIN", [4, 6]],
            is_del: 0,
            user_id: this.user.uid,
        }).count("id");
        this.assign("nopaid", nopaid);
        //未付款统计
        let receipt = await this.model("order").where({
            type: 0,
            status: ["NOTIN", [4, 6]],
            delivery_status: 1,
            is_del: 0,
            user_id: this.user.uid,
        }).count("id");
        this.assign("nopaid", nopaid);
        this.assign("receipt", receipt);
         console.log(data.data);
        this.assign('list', data.data);
        this.meta_title = "我的订单";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            if(this.isAjax("POST")){
                return this.json(data);
            }else {
                this.active = "user/index";
                return this.display(`mobile/${this.http.controller}/${this.http.action}`)
            }
        } else {
            return this.display();
        }
    }

    //删除订单
    async delorderAction() {
        //判断是否登陆
        await this.weblogin();

        let res;
        let type = this.get("type") || null;
        if (think.isEmpty(type)) {
            let map = {
                id: this.get("id"),
                user_id: this.user.uid,
                status: ["IN", [4, 6]]
            }
            res = await this.model("order").where(map).update({is_del: 1});
        } else {
            res = await this.model("order").where({id: this.get("id"), user_id: this.user.uid}).delete()
        }

        if (res) {
            return this.success({name: "删除成功！"});
        } else {
            return this.fail("删除失败!");
        }
    }

    //确认收货
    async confirmreceiptAction() {
        //判断是否登陆
        await this.weblogin();
        let map = {
            id: this.get("id"),
            user_id: this.user.uid,
            delivery_status: 1,
            status: ["NOTIN", [4, 6]]
        }
        let res = await this.model("order").where(map).update({status: 4});
        if (res) {
            return this.success({name: "操作成功！"});
        } else {
            return this.fail("操作失败!");
        }
    }

    /**
     * 收货地址管理
     * @returns {PreventPromise}
     */
    async addressAction() {
        //判断是否登陆
        await this.weblogin();
        let data = await this.model("address").where({user_id: this.user.uid}).page(this.get('page')).order("is_default DESC,id DESC").countSelect();
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
        if (!think.isEmpty(data.data)) {
            for (let val of data.data) {
                val.province_num = val.province;
                val.city_num = val.city;
                val.county_num = val.county;
                val.province = await this.model("area").where({id: val.province}).getField("name", true);
                val.city = await this.model("area").where({id: val.city}).getField("name", true);
                val.county = await this.model("area").where({id: val.county}).getField("name", true);
            }
        }
        this.assign("list", data.data);
        this.meta_title = "收货地址";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            this.active = "user/index";
            return this.display(`mobile/${this.http.controller}/${this.http.action}`)
        } else {
            return this.display();
        }
    }

    /**
     * 账户金额管理
     * @returns {PreventPromise}
     */
    async accountAction() {
        //判断是否登陆
        await this.weblogin();
        let type = this.get("type") || null;
        let data;
        if (think.isEmpty(type)) {
            data = await this.model("balance_log").where({user_id: this.user.uid}).page(this.param('page')).order("time DESC").countSelect();
        } else if (type == 1) {
            data = await this.model("balance_log").where({user_id: 10000}).page(this.param('page')).order("time DESC").countSelect();
        } else {
            data = await this.model("order").where({
                user_id: this.user.uid,
                type: 1,
                is_del: 0
            }).page(this.get('page')).order("create_time DESC").countSelect();
            for (let val of data.data) {

                val.channel = await this.model("pingxx").where({id: val.payment}).getField("title", true);
            }
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
        this.assign("list", data.data);
        this.assign("type", type);
        //获取用户信息
        let userInfo = await this.model("member").join({
            table: "customer",
            jion: "left",
            on: ["id", "user_id"]
        }).find(this.user.uid);
        this.assign("userInfo", userInfo);
        //未付款的充值订单统计
        let unpaid = await this.model("order").where({
            user_id: this.user.uid,
            type: 1,
            is_del: 0,
            pay_status: 0
        }).count("id");
        this.assign("unpaid", unpaid);
        this.meta_title = "账户金额管理";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            if(this.isAjax("POST")){
                return this.json(data);
            }else {
                this.active = "user/index";
                return this.display(`mobile/${this.http.controller}/${this.http.action}`)
            }

        } else {
            return this.display();
        }
    }

    /**
     * 充值
     */
    async rechargeAction() {
        //判断是否登陆
        await this.weblogin();
        if (this.isAjax("POST")) {
            let data = this.post();
            if (think.isEmpty(data.order_amount)) {
                return this.fail("请输入金额！");
            } else if (!think.isNumberString(data.order_amount)) {
                return this.fail("金额类型错误！")
            } else if (think.isEmpty(data.payment)) {
                return this.fail("必须选一种支付方式！")
            }

            //用户
            data.user_id = this.user.uid;
            //生成订单编号//todo
            let nowtime = new Date().valueOf();
            let oid = ["c", this.user.uid, nowtime]
            data.order_no = oid.join("");
            //支付状态 pay_stayus 0:未付款 ,1:已付款
            data.pay_status = 0;
            //订单状态 status 2:等待审核，3:已审核
            data.status = 2;
            //发货状态 type 0:普通，1:充值
            data.type = 1;
            //订单创建时间 create_time
            data.create_time = new Date().valueOf();
            //生成订单

            //判断是否已经绑定pingxx_id,如果已绑定查询pingxx订单直接支付。防止订单重复生成。
            // console.log(111111111)
            //获取渠道
            let channel = await this.model("pingxx").where({id: data.payment}).getField("channel", true);
            let open_id;
            if(channel == "wx_pub"){
                open_id=await this.session("wx_openid")
            }
            //调用ping++ 服务端
            let payment = think.service("payment");
            let pay = new payment(this.http);
            //传入 channel,order_no,order_amount,this.ip()
            let charges = await pay.pingxx(channel, data.order_no, data.order_amount, this.ip(),open_id);


            //console.log(charges);
            if (charges) {
                //把pingxx_id存到订单
                data.pingxx_id = charges.id;
                let order_id = await this.model("order").add(data);

                //支付日志
                let receiving = {
                    order_id: order_id,
                    user_id: this.user.uid,
                    amount: data.order_amount,
                    create_time: new Date().getTime(),
                    payment_time: new Date().getTime(),
                    doc_type: 1,
                    payment_id: data.payment,
                    pay_status: 0
                }
                await this.model("doc_receiving").add(receiving);
                return this.success({name: "支付订单对接成功，正在转跳！", data: charges})
            } else {
                return this.fail("调用接口失败！");
            }
            // think.log(data);
        } else {
            //ping++ 支付渠道 pc网页
             //根据不同的客户端调用不同的支付方式
           let map;
           if (checkMobile(this.userAgent())) {
               map={
                   type:2,
                   status:1
               }
               if(!is_weixin(this.userAgent())){
                  map.channel =["!=","wx_pub"]
               }
              
           }else {
               map={
                    type:1,
                    status:1
               }
              
           }
                let paylist = await this.model("pingxx").where(map).order("sort ASC").select();
                this.assign("paylist", paylist);
                this.meta_title = "充值";
            if (checkMobile(this.userAgent())) {
                this.active = "user/index";
                return this.display(`mobile/${this.http.controller}/${this.http.action}`)
            } else {
               
                this.display();
            }

        }

    }

//   用户设置
    async setingAction() {
        //判断是否登陆
        await this.weblogin();
        //获取用户信息
        let userInfo = await this.model("member").join({
            table: "customer",
            jion: "left",
            on: ["id", "user_id"]
        }).find(this.user.uid);
        //console.log(userInfo);
        this.assign("userInfo", userInfo);
        let province, city, county;
        //获取省份
        if (checkMobile(this.userAgent())) {
            province = await this.model('area').where({id: userInfo.province}).getField("name", true);
            city = await this.model('area').where({id: userInfo.city}).getField("name", true);
            county = await this.model('area').where({id: userInfo.county}).getField("name", true);
        } else {
            province = await this.model('area').where({parent_id: 0}).select();
            city = await this.model('area').where({parent_id: userInfo.province}).select();
            county = await this.model('area').where({parent_id: userInfo.city}).select();
        }

        this.assign("province", province);
        this.assign("city", city);
        this.assign("county", county);
        this.meta_title = "用户设置";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            this.active = "user/index";
            return this.display(`mobile/${this.http.controller}/${this.http.action}`)
        } else {
            return this.display();
        }
    }

    //更新用户信息
    async updateinfoAction() {
        //判断是否登陆
        await this.weblogin();
        let data = this.post();
        // think.log(data);
        let member = {
            email: data.email,
            mobile: data.mobile
        }
        let customer = {
            real_name: data.real_name,
            sex: data.sex,
            birthday: new Date(data.birthday).getTime(),
            phone: data.phone,
            province: data.province,
            city: data.city,
            county: data.county,
            addr: data.addr
        }

        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            if (!think.isEmpty(data.city_picke)) {
                let city_picke = data.city_picke.split(" ");
                customer.province = await this.model("area").where({
                    name: ["like", `%${city_picke[0]}%`],
                    parent_id: 0
                }).getField("id", true);
                customer.city = await this.model("area").where({
                    name: ["like", `%${city_picke[1]}%`],
                    parent_id: customer.province
                }).getField("id", true);
                customer.county = await this.model("area").where({
                    name: ["like", `%${city_picke[2]}%`],
                    parent_id: customer.city
                }).getField("id", true);
            }
        }

        let update1 = await this.model("member").where({id: this.user.uid}).update(member);
        let update2 = await this.model("customer").where({user_id: this.user.uid}).update(customer);

        // think.log(customer);
        if (update1 && update2) {
            return this.success({name: "更新用户资料成功！"})
        } else {
            return this.fail("更新失败！")
        }

    }

    //修改密码
    async updatepasswordAction() {
        //判断是否登陆
        await this.weblogin();
        let data = this.post();
        let password = await this.model("member").where({id: this.user.uid}).getField("password", true);
        if (password === encryptPassword(data.oldpassword)) {
            await this.model("member").where({id: this.user.uid}).update({password: encryptPassword(data.password)})
            return this.success({name: "密码修改成功，请用新密码重新登陆！"});
        } else {
            return this.fail("旧密码不正确，请重新输入。")
        }

    }

    //上传头像
    async updateavatarAction() {
        //判断是否登陆
        await this.weblogin();
        let file = think.extend({}, this.file('file'));
        console.log(file);
        //think.log(avatar_data);
        var filepath = file.path;
        //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
        var uploadPath = think.RESOURCE_PATH + '/upload/avatar/' + this.user.uid;
        think.mkdir(uploadPath);
        let res;
        if (checkMobile(this.userAgent())) {
            let jimp2 = ()=> {
                console.log(111)
                let deferred = think.defer();
                let self = this;
                Jimp.read(filepath, function (err, lenna) {
                    if (err) throw err;
                    lenna.resize(200, 200)            // resize
                        .quality(60)                 // set JPEG quality
                        .write(uploadPath + "/avatar.png", function (e, r) {
                            deferred.resolve('/upload/avatar/' + self.user.uid + "/avatar.png");
                        }); // save
                });
                return deferred.promise;
            }
            res = await jimp2();
        } else {
            let post = this.post();
            let avatar_data = JSON.parse(post.avatar_data);
            let jimp = () => {
                let deferred = think.defer();
                let self = this;
                Jimp.read(filepath, function (err, lenna) {
                    //console.log(lenna)

                    if (err) throw err;
                    lenna.crop(avatar_data.x, avatar_data.y, avatar_data.width, avatar_data.height)            // resize
                        .quality(60)
                        .write(uploadPath + "/avatar.png", function (e, r) {
                            deferred.resolve('/upload/avatar/' + self.user.uid + "/avatar.png");
                        }); // save

                });
                return deferred.promise;
            }
            res = await jimp();
        }


        //think.log(res);
        let data = {
            "result": res,
            "errno": 0,
            "message": "头像上传成功！"
        }
        return this.end(data);
    }

    //获取头像
    async avatarAction() {
        let uid = this.get("uid")||this.user.uid
        var uploadPath = think.RESOURCE_PATH + '/upload/avatar/' + uid;
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

    /**
     * 注册页面
     */
    async registerAction() {
        if(this.isPost()){
            let data = this.post();
            console.log(data);
            //验证
            let res;
            if(think.isEmpty(data.username)){
                return this.fail("用户昵称不能为空！");
            }else{
                res = await this.model("member").where({username:ltrim(data.username)}).find();
                if(!think.isEmpty(res)){
                    return this.fail("用户昵称已存在，请重新填写！")
                }
            }
            if(think.isEmpty(data.mobile)){
                return this.fail("手机号码不能为空！")
            }else{
                res = await this.model("member").where({mobile:data.mobile}).find();
                if(!think.isEmpty(res)){
                    return this.fail("手机号码已存在，请重新填写！")
                }
            }
            if(think.isEmpty(data.email)){
                return this.fail("电子邮箱不能为空！")
            }else{
                res = await this.model("member").where({email:data.email}).find();
                if(!think.isEmpty(res)){
                    return this.fail("电子邮箱已存在，请重新填写！")
                }
            }
            if(think.isEmpty(data.password) && think.isEmpty(data.password2)){
                return this.fail("密码不能为空！")
            }else{

                if(data.password != data.password2){
                    return this.fail("两次输入的密码不一致，请重新填写！")
                }
            }
            if(data.clause != "on"){
                return this.fail("必须要同意,网站服务条款")
            }

            data.status = 1;
            data.reg_time = new Date().valueOf();
            data.reg_ip = _ip2int(this.ip());
            data.password = encryptPassword(data.password);
            let reg = await this.model("member").add(data);
            if(reg){
                //用户副表
                await this.model("customer").add({user_id:reg});
            }
            await this.model("member",{},"admin").autoLogin({id:reg}, this.ip());//更新用户登录信息，自动登陆
            let userInfo = {
                'uid':reg,
                'username': data.username,
                'last_login_time': data.reg_time,
            };
            await this.session('webuser', userInfo);
            return this.success({name:"注册成功,登录中!",url:"/user/index"});
        }else {
            this.meta_title = "用户注册";
            return this.display();
        }

    }
    async publishAction(){
        await this.weblogin();
        let cate_id = this.get('cate_id') || null;
        let model_id = this.get('model_id') || null;
        let position = this.get('position') || null;
        let group_id = this.get('group_id') || 0;
        let sortid = this.get('sortid')||0;
        let sortval = this.get('sortval')||null;
        let models;
        let groups;
        let model;
        let _model;
        if (!think.isEmpty(cate_id)) {
        let pid = this.get("pid") || 0;
        // 获取列表绑定的模型
        if (pid == 0) {
            models = await this.model("category",{},'admin').get_category(cate_id, 'model');
            // 获取分组定义
            groups = await this.model("category",{},'admin').get_category(cate_id, 'groups');
            if (groups) {
                groups = parse_config_attr(groups);
            }
        } else { // 子文档列表
            models = await this.model("category",{},'admin').get_category(cate_id, 'model_sub');
        }
        //获取面包屑信息
        let nav = await this.model('category',{},'admin').get_parent_category(cate_id||0);
        this.assign('breadcrumb', nav);
        if (think.isEmpty(model_id) && !think.isNumberString(models)) {

            // 绑定多个模型 取基础模型的列表定义
            model = await this.model('model').where({name: 'document'}).find();
            //console.log(model);
        } else {

            model_id = model_id ? model_id : models;
            //获取模型信息
            model = await this.model('model').where({id: ['IN', [model_id]]}).find();
            ;

            if (think.isEmpty(model['list_grid'])) {
                let data = await this.model('model').field('list_grid').where({name: 'document'}).find();
                model.list_grid = data.list_grid;
                //console.log(33);
            }
        }
        this.assign('model', models.split(","))
        _model = models.split(",")
    } else { // 子文档列表
    //获取模型信息
    model = await this.model("model").where({name: "document"}).find();
    model_id = null;
    cate_id = 0;
    this.assign('model', null);
    _model = null;
}
//解析列表规则
let fields = [];
let ngrids = [];
//console.log(model);
let grids = model.list_grid.split("\r\n");
for (let value of grids) {
    //字段:标题:链接
    let val = value.split(":");
    //支持多个字段显示
    let field = val[0].split(",");
    value = {field: field, title: val[1]}

    if (!think.isEmpty(val[2])) {
        value.href = val[2];
    }
    // console.log(222);
    if (val[1]) {
        if (val[1].indexOf('|') > -1) {
            // 显示格式定义
            [values.title, values.format] = val[1].split('|');
        }
    }
    //console.log(field);
    for (let val  of field) {
        let array = val.split('|');
        fields.push(array[0]);
    }
    ngrids.push(value);
}
// 文档模型列表始终要获取的数据字段 用于其他用途
fields.push('category_id');
fields.push('model_id');
fields.push('pid');
//过滤重复字段
fields = unique(fields);
//console.log(fields);
// console.log(model_id);
let list = await this.getDocumentList(cate_id, model_id, position, fields, group_id,sortval,sortid);
for(let val of list){
    if(val.pics){
        //val.pics = await get_pics_one(val.pics,"path");
        val.pics = await get_pic(val.pics.split(",")[0],1,100)
    }else {
        val.pics = '/static/noimg.jpg';
    }
}
// console.log(list);
list = await this.parseDocumentList(list, model_id);
        //获取模型信息
        let modellist = [];
        //console.log(111111111)
        if (think.isEmpty(_model)) {
            modellist = null;
        } else {
            for (let val of _model) {
                let modelobj = {}
                modelobj.id = val;
                modelobj.title = await this.model("model",{},'admin').get_document_model(val, "title");
                modellist.push(modelobj);
            }
        }
        this.meta_title="在线投稿";
        this.assign('modellist', modellist);
        this.assign('cate_id', cate_id);
        this.assign('model_id', model_id);
        this.assign('group_id', group_id);
        this.assign('sortid',sortid);
        this.assign('position', position);
        this.assign('groups', groups);
        this.assign('list', list);
        this.assign('list_grids', ngrids);
        this.assign('model_list', model);
        return this.display();

    }
    /**
     * 默认文档列表方法
     * @param integer $cate_id 分类id
     * @param integer $model_id 模型id
     * @param integer $position 推荐标志
     * @param mixed $field 字段列表
     * @param integer $group_id 分组id
     */
    async getDocumentList(cate_id, model_id, position, field, group_id,sortval,sortid) {
        //console.log(2222222);
        /* 查询条件初始化 */
        cate_id = cate_id||0,field=field||true;
        let map = {};
        let status;
        if (!think.isEmpty(this.get('title'))) {
            map.title = ['like', '%' + this.param('title') + '%'];
        }
        if (!think.isEmpty(this.get('status'))) {
            map.status = this.param('status');
            status = map.status;
        } else {
            status = null;
            map.status = ['IN', '0,1,2'];
        }
        if (!think.isEmpty(this.get('time-start'))) {
            map.update_time = {'>=': new Date(this.param('time-start').valueOf())};
        }
        if (!think.isEmpty(this.get('time-end'))) {
            map.update_time = {'<=': 24 * 60 * 60 + new Date(this.param('time-end').valueOf())};
        }
        if (!think.isEmpty(this.get('nickname'))) {
            map.uid = await this.model('member').where({'nickname': this.param('nickname')}).getField('uid');
        }

        // 构建列表数据
        let Document = this.model('document');

        if (cate_id) {
            //获取当前分类的所有子栏目
            let subcate = await this.model('category', {}, 'admin').get_sub_category(cate_id);
            // console.log(subcate);
            subcate.push(cate_id);
            map.category_id = ['IN', subcate];
        }
        // console.log(map);
        map.pid = this.param('pid') || 0;
        //console.log(map.pid);
        if (map.pid != 0) { // 子文档列表忽略分类
            delete map.category_id;
        }

        //console.log(array_diff(tablefields,field));
        if (!think.isEmpty(model_id)) {
            map.model_id = model_id;
            await Document.select();
            let tablefields = Object.keys(await Document.getSchema());
            //console.log(array_diff(tablefields,field));
            // console.log(field);
            //return
            if (think.isArray(field) && array_diff(tablefields, field)) {
                let modelName = await this.model('model').where({id: model_id}).getField('name');
                //console.log('__DOCUMENT_'+modelName[0].toUpperCase()+'__ '+modelName[0]+' ON DOCUMENT.id='+modelName[0]+'.id');
                // let sql = Document.parseSql(sql)
                //console.log(`${this.config('db.prefix')}document_${modelName[0]} ${modelName[0]} ON DOCUMENT.id=${modelName[0]}.id`);
                // return
                //Document.join('__DOCUMENT_'+modelName[0].toUpperCase()+'__ '+modelName[0]+' ON DOCUMENT.id='+modelName[0]+'.id');
                //Document.alias('DOCUMENT').join(`${this.config('db.prefix')}document_${modelName[0]} ${modelName[0]} ON DOCUMENT.id=${modelName[0]}.id`);
                //console.log(3333333333);
                Document.alias('DOCUMENT').join({
                    table: `document_${modelName[0]}`,
                    join: "inner",
                    as: modelName[0],
                    on: ["id", "id"]
                })
                let key = array_search(field, 'id');
                //console.log(key)
                if (false !== key) {
                    delete field[key];
                    field[key] = 'DOCUMENT.id';
                }
            }
        }
        //console.log(field);
        //console.log(1111111);
        if (!think.isEmpty(position)) {
            map[1] = "position & {$position} = {$position}";
        }
        if (!think.isEmpty(group_id)) {
            map['group_id'] = group_id;
        }
        if(!think.isEmpty(sortid)){
            map.sort_id = ["IN",[sortid,0]];
        }
        let nsobj = {};
        if(!think.isEmpty(sortval)) {
            sortval = sortval.split("|");
            nsobj = {}
            let optionidarr = [];
            let valuearr = [];
            for (let v of sortval) {
                let qarr = v.split("_");
                nsobj[qarr[0]] = qarr[1];
                if(qarr[1] !=0){
                    let vv = qarr[1].split(">");
                    //console.log(vv);
                    if(vv[0]=="d" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["<",vv[1]];
                    }else if(vv[0]=="u" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = [">",vv[1]];
                    }else if(vv[0]=="l" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["like",`%"${vv[1]}"%`];
                    }else if(!think.isEmpty(vv[0])&&!think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["BETWEEN", Number(vv[0]), Number(vv[1])];
                    }else {
                        map["t."+qarr[0]] = qarr[1];
                    }

                }
            }
            map.fid = cate_id;
            // where.optionid = ["IN",optionidarr];
            // where['value'] = ["IN",valuearr];
            // let type= await this.model("typeoptionvar").where(where).select();
            //  console.log(type);
            // console.log(map);
        }
        console.log(map);
        let list;
        if(!think.isEmpty(sortval)){
            list = await Document.alias('DOCUMENT').join({
                table: "type_optionvalue"+sortid,
                join: "left", // 有 left,right,inner 3 个值
                as: "t",
                on: ["id", "tid"]

            }).where(map).order('level DESC,DOCUMENT.id DESC').field(field.join(",")).page(this.get("page"),20).countSelect();
        }else {
            list = await Document.alias('DOCUMENT').where(map).order('level DESC,DOCUMENT.id DESC').field(field.join(",")).page(this.get("page"),20).countSelect();
        }
        //let list=await this.model('document').where(map).order('level DESC').field(field.join(",")).page(this.get("page")).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(list);


        if (map['pid'] != 0) {
            // 获取上级文档
            let article = await Document.field('id,title,type').find(map['pid']);
            this.assign('article', article);
            // console.log(article);
        }

        //检查该分类是否允许发布内容
        let allow_publish = await this.model("category",{},'admin').get_category(cate_id, 'allow_publish');
        this.assign("nsobj",nsobj);
        this.assign('_total', list.count);//该分类下的文档总数
        this.assign('pagerData', page); //分页展示使用
        this.assign('status', status);
        this.assign('allow', allow_publish);
        this.assign('pid', map.pid);
        //console.log(list.data);
        this.meta_title = '文档列表';
        return list.data;
    }
//alipay_in_weixin 在微信客户端中使用支付宝手机网页支付（alipay_wap）
    alipayinweixinAction(){
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
            let res = await this.model("member", {}, "admin").signin(username, password, this.ip(), 5,0);
            if (0 < res.uid) {
                //记录用户登录行为
                // await this.model("action", {}, "admin").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
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
                this.active = "user/index";
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
            //清楚cy_id
            //await this.session("wx_openid",null);
            // cysoIp9AH
           return this.display()

        } else {
            this.redirect("/index");
        }
    }
}