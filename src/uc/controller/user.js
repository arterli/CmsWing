// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
import moment from "moment"
moment.locale('zh-cn');
import Base from './base.js';
import pagination from 'think-pagination';
import fs from 'fs';
import Jimp from "jimp";
export default class extends Base {
     init(http) {
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
            //console.log(val.goods)
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
         //console.log(data.data);
        this.assign("count",data.count);
        this.assign('list', data.data);
        this.meta_title = "我的订单";
        //判断浏览客户端
        if (checkMobile(this.userAgent())) {
            if(this.isAjax("get")){
                for(let v of data.data){
                    v.create_time =moment(v.create_time).format('lll')
                }
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
        this.assign("count",data.count)
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

            if(this.isAjax("get")){
                for(let v of data.data){
                    v.time =moment(v.create_time).format('YYYY-MM-DD HH:mm:ss');
                    v.amount = formatCurrency(v.amount);
                    v.amount_log = formatCurrency(v.amount_log);
                }
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
        let path = think.isFile(uploadPath + "/" + "avatar.png");
        this.type("image/png");
        let pic;
        if (path) {
            // this.download(uploadPath + "/" + "/avatar.png");
            pic = fs.readFileSync(uploadPath + "/" + "avatar.png")
        } else {
            //this.download(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
            pic = fs.readFileSync(think.RESOURCE_PATH + '/upload/avatar/avatar.jpg')
        }
        this.end(pic)
    }


    /**
     * 显示左边菜单，进行权限控制
     * @author
     */

    async priv(cate_id) {
        let cate = cate_id || await this.model("category",{},'admin').get_all_category();
        let roleid = await this.model("member").where({id:this.user.uid}).getField('groupid', true);
        let cates= [];
        if(cate_id){
            let priv = await this.model("category_priv").priv(cate_id,roleid,'add');
            if(priv==1){
                cates.push(priv)
            }
        }else {
            // let priv = await this.model("category_priv").where({catid:39,is_admin:0,roleid:2,action:'add'}).select();
            // console.log(priv);
            //前台投稿分类
            //TODO 权限控制(管理员)
            let parr =[];
            for (let val of cate) {
                let priv = await this.model("category_priv").priv(val.id,roleid,'add');
                val.priv=priv
                if(priv==1 && val.pid !=0){
                    parr.push(val.pid)
                }
            }

            if(think.isEmpty(parr)){
                cates=cate;
            }else {

                for(let val of cate){
                    if(in_array(val.id,parr)){
                        val.priv=1
                    }
                }

                for(let val of cate){
                    if(val.priv==1){
                        cates.push(val);
                    }
                }
            }
        }



        return think.isEmpty(cates)
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
        //获取当前用户的信息
        map.uid = this.user.uid;
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
        //console.log(map);
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

    /**
     * 新增投稿
     */
    async addAction() {
        await this.weblogin();
        let cate_id = this.get("cate_id") || 0;
        //权限控制
        let priv = await this.priv(cate_id);
        if(priv){
            this.http.error = new Error('您所在的会员组,禁止在本栏目投稿！');
            return think.statusAction(702, this.http);
        }
        let model_id = this.get("model_id") || 0;
        let group_id = this.get("group_id") || '';
        let sortid = this.get('sortid')||0;
        think.isEmpty(cate_id) && this.fail("参数不能为空");
        think.isEmpty(model_id) && this.fail("该分类未绑定模型");
        // 获取分组定义
        let groups = await this.model("category",{},'admin').get_category(cate_id, 'groups');
        if (groups) {
            groups = parse_config_attr(groups);
        }
        // 获取分类信息
        let sort = await this.model("category",{},'admin').get_category(cate_id, 'documentsorts');
        if (sort) {
            sort = JSON.parse(sort);
            if(sortid==0){
                sortid=sort.defaultshow;
            }
            let typevar = await this.model("typevar",{},'admin').where({sortid:sortid}).select();
            for (let val of typevar){

                val.option= await this.model("typeoption",{},'admin').where({optionid:val.optionid}).find();
                if(val.option.type == 'select'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=parse_type_attr(val.option.rules.choices);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                    }

                }else if (val.option.type =="radio" || val.option.type =="checkbox"){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                    }
                }else {
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                    }
                }
            }
            //console.log(typevar);
            this.assign("typevar",typevar);
        }
        //console.log(sort);
        this.assign("sort",sort);
        //检查该分类是否允许发布
        let allow_publish = await this.model("category",{},'admin').check_category(cate_id);
        //console.log(allow_publish);
        !allow_publish && this.fail("该分类不允许发布内容");

        //获取当先的模型信息
        let model = await this.model("model",{},'admin').get_document_model(model_id);

        //处理结果
        let info = {};
        info.pid = this.get("pid") ? this.get("pid") : 0;
        info.model_id = model_id;
        info.category_id = cate_id;
        info.group_id = group_id;

        if (info.pid) {
            let article = await this.model("document",{},'admin').field('id,title,type').find(info.pid);
            this.assign("article", article);
        }
        //获取表单字段排序
        let fields = await this.model("attribute",{},'admin').get_model_attribute(model.id,true);
        think.log(fields);
        //获取当前分类文档的类型
        let type_list = await this.model("category",{},'admin').get_type_bycate(cate_id);
        //console.log(type_list);
        //获取面包屑信息
        let nav = await this.model('category',{},'admin').get_parent_category(cate_id);
        //console.log(model);
        this.assign('groups',groups);
        this.assign('breadcrumb', nav);
        this.assign('info', info);
        this.assign('fields', fields);
        this.assign('type_list', type_list);
        this.assign('model', model);
        this.meta_title = '新增' + model.title;
        this.active = "admin/article/index";
        return this.display();
    }

    //编辑文档
    async editAction() {
        await this.weblogin();
        let id = this.get('id') || "";
        let sortid = this.get('sortid')||0;
        if (think.isEmpty(id)) {
            this.fail("参数不能为空");
        }
        //获取详细数据；
        let document = this.model("document",{},'admin')
        let data = await document.details(id);
        //安全验证
        if(data.uid != this.user.uid){
            this.http.error = new Error('只能编辑自己的稿件哦(*^_^*)!');
            return think.statusAction(702, this.http);
        }
        //let model =  this.model("model").getmodel(2);
        if (data.pid != 0) {
            //获取上级文档
            let article = document.field("id,title,type").find(data.pid);
            this.assign('article', article);
        }
        let model = await this.model("model",{},'admin').get_document_model(data.model_id);

        // 获取分组定义
        let groups = await this.model("category",{},'admin').get_category(data.category_id, 'groups');
        if (groups) {
            groups = parse_config_attr(groups);
        }
        this.assign('groups',groups);
        // 获取分类信息
        let sort = await this.model("category",{},'admin').get_category(data.category_id, 'documentsorts');
        if (sort) {
            sort = JSON.parse(sort);
            if(sortid !=0){
                data.sort_id=sortid;
            }else if(data.sort_id==0){
                data.sort_id=sort.defaultshow;
            }
            let typevar = await this.model("typevar").where({sortid:data.sort_id}).select();
            for (let val of typevar){

                val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
                if(val.option.type == 'select'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        val.option.value = await this.model("typeoptionvar").where({sortid:data.sort_id,tid:data.id,fid:data.category_id,optionid:val.option.optionid}).getField("value",true)||"";
                    }

                }else if (val.option.type =="radio" || val.option.type =="checkbox"){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        val.option.value = await this.model("typeoptionvar").where({sortid:data.sort_id,tid:data.id,fid:data.category_id,optionid:val.option.optionid}).getField("value",true)||"";
                    }
                }else {
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.option.value = await this.model("typeoptionvar").where({sortid:data.sort_id,tid:data.id,fid:data.category_id,optionid:val.option.optionid}).getField("value",true)||"";
                    }
                }
            }
            // console.log(typevar);
            this.assign("typevar",typevar);
        }
        //console.log(sort);
        this.assign("sort",sort);
        //获取表单字段排序
        let fields = await this.model("attribute",{},'admin').get_model_attribute(model.id,true);
        this.assign('fields', fields);
        //获取当前分类文档的类型
        let type_list = await this.model("category",{},'admin').get_type_bycate(data.category_id)
        //获取suk tags
        let tags = await this.model('tags').where({model_id:data.model_id}).select();
        this.assign('tags',tags);
        //获取面包屑信息
        let nav = await this.model('category',{},'admin').get_parent_category(data.category_id);
        //console.log(model);
        this.assign('breadcrumb', nav);
        //console.log(model);
        this.assign('type_list', type_list);
        this.meta_title = '编辑' + model.title;
        this.active = "admin/article/index";
        this.assign({
            "navxs": true,
        });
        //console.log(data);
        this.assign('data', data);
        this.assign('model_id', data.model_id);
        this.assign('model', model);
        this.display();
    }
    /**
     * 更新或者添加数据
     */
    async updateAction() {
        await this.weblogin();
        let data = this.post();
        //绑定发布者id
        data.uid=this.user.uid;
        //安全验证
        if(data.is_ajax != 'true'){
            return this.fail("非法提交！");
        }
        //console.log(data);
        //return false;
        let res = await this.model('document',{},'admin').updates(data);
        // let res ={ data:
        // { name: '',
        //     title: '1111',
        //     description: '',
        //     type: '2',
        //     cover_id: '',
        //     file: '',
        //     link_id: '0',
        //     display: '1',
        //     deadline: '',
        //     view: '0',
        //     comment: '0',
        //     level: '0',
        //     create_time: 1470888723186,
        //     template: '',
        //     bookmark: '0',
        //     id: null,
        //     pid: '0',
        //     model_id: '2',
        //     category_id: '39',
        //     uid: 2,
        //     is_ajax: 'true',
        //     update_time: 1470888723186,
        //     status: 1 },
        //     id: 248 }
        //console.log(res);
        if (res) {
            //行为记录
            if (!res.data.id) {
                //await this.model("action").log("add_document", "document", res.id, this.user.uid, this.ip(), this.http.url);//添加行为日志
               return this.success({name: "添加成功", url: "/user/publish/cate_id/" + res.data.category_id});
            } else {
               return this.success({name: "更新成功", url: "/user/publish/cate_id/" + res.data.category_id});
            }

        } else {
           return this.fail("操作失败！");
        }


    }

//alipay_in_weixin 在微信客户端中使用支付宝手机网页支付（alipay_wap）
    alipayinweixinAction(){
        return this.display();
    }

}