'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  //支付
  async  payAction(){
    console.log(this.post());
    //判断是否登录
    await this.weblogin();
    if(this.isAjax("post")){
      let payment;
      let pay;
      let charges;
      let post = this.post();
      //获取订单信息
      let order = await this.model("order").where({pay_status:0,user_id:this.user.uid}).find(post.order_id);
      if(think.isEmpty(order)){
        return this.fail("订单不存在！");
      }
      //更新订单的支付方式
      await this.model("order").where({id:order.id}).update({payment:post.payment});
      //支付日志
      let receiving = {
        order_id:post.order_id,
        user_id:this.user.uid,
        amount:order.order_amount,
        create_time:new Date().getTime(),
        payment_time:new Date().getTime(),
        doc_type:0,
        payment_id:post.payment,
        pay_status:0
      }

      //100预付款支付

      if(post.payment == 100){
        //先检查下用户余额
        let balance = await this.model("customer").where({user_id:this.user.uid}).getField("balance",true);
        if(Number(balance) < Number(order.order_amount)){
          return this.fail("您余额不足，请充值，或者选择其他支付方式！")
        }else {
          //扣款
          let decrement = this.model("customer").where({user_id:this.user.uid}).decrement("balance",Number(order.order_amount));
          if(decrement){
            //扣款成功改变订单状态
            await this.model("order").where({order_no:order.order_no}).update({status:3,pay_status:1});
            //扣款成功后插入日志
            let log = {
              admin_id:0,
              user_id:this.user.uid,
              type:2,
              time:new Date().valueOf(),
              amount:(0 - Number(order.order_amount)),
              amount_log:await this.model("customer").where({user_id:this.user.uid}).getField("balance",true),
              note:`${await get_nickname(this.user.uid)} 通过余额支付方式进行商品购买,订单编号：${order.order_no}`
            }
            await this.model('balance_log').add(log);
            receiving.pay_status=1;
            await this.model("doc_receiving").add(receiving);
            let url = `/cart/payres/c_o_id/${post.order_id}`;
            return this.success({name:"支付订单对接成功，正在转跳！",url:url})
          }else {
            return this.fail("您没有要支付的订单");
          }
        }

      }
      if(post.payment == 1001){
        let url = `/cart/payres/c_o_id/${post.order_id}`;
        return this.success({name:"支付订单对接成功，正在转跳！",url:url})
      }
      //1001货到付款
      if(think.isEmpty(order)){
        return this.fail("您没有要支付的订单");
      }else {
        //判断是否已经绑定pingxx_id,如果已绑定查询pingxx订单直接支付。防止订单重复生成。
        // console.log(order.id);
        if(think.isEmpty(order.pingxx_id)){
          // console.log(111111111)
          //获取渠道
          let channel = await this.model("pingxx").where({id:post.payment}).getField("channel",true);
          let open_id;
          if(channel == "wx_pub"){
            open_id=await this.session("wx_openid")
          }
          //调用ping++ 服务端
          payment = think.service("payment");
          pay = new payment(this.http);
          //传入 channel,order_no,order_amount,this.ip()
          charges = await pay.pingxx(channel,order.order_no,order.order_amount,this.ip(),open_id);
          //把pingxx_id存到订单
          await this.model('order').where({id:post.order_id}).update({pingxx_id:charges.id});
        }else {
          // console.log(33333333);
          //调用ping++ 服务端
          payment = think.service("payment");
          pay = new payment(this.http);
          charges = await pay.charge(order.pingxx_id);
        }
        //console.log(charges);
        if(charges){
          await this.model("doc_receiving").add(receiving);
          return this.success({name:"支付订单对接成功，正在转跳！",data:charges})
        }else {
          return this.fail("调用接口失败！");
        }


      }

    }else {
      let order_id = this.get("order");
      let setp = this.get("setp")||"";
      //this.end(order_id  + "=" + setp)
      //订单信息
      let order = await this.model("order").where({pay_status:0,user_id:this.user.uid}).find(order_id);
      if(think.isEmpty(order)){
        this.http.error = new Error('订单不存在或者已经支付！');
        return think.statusAction(702, this.http);
      }
      order.end_time = date_from(order.create_time+(Number(this.setup.ORDER_DELAY)*60000))
      //console.log(order);
      this.assign("order",order);

      //   //支付方式
      // let paylist = await this.model("payment").where({status:1}).order("sort ASC").select();
      // for(let val of paylist){
      //      val.logo =  await this.model("pay_plugin").where({id:val.plugin_id}).getField("logo",true);
      //   }
      //   this.assign("paylist",paylist);
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
      this.assign("paylist",paylist);
      this.assign("setp",setp);
      this.meta_title = "订单支付";//标题1
      this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
      this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
      //判断浏览客户端
      if (checkMobile(this.userAgent())) {
        return this.display(`mobile/${this.http.controller}/${this.http.action}`)
      } else {
        return this.display();
      }
    }


  }
  //Webhooks
  async webhokksAction (){
    let data = this.post()


// 验证 webhooks 签名
    var verify_signature = function(raw_data, signature, pub_key_path) {
      var verifier = crypto.createVerify('RSA-SHA256').update(raw_data, "utf8");
      var pub_key = fs.readFileSync(pub_key_path, "utf8");
      return verifier.verify(pub_key, signature, 'base64');
    }

// POST 原始请求数据是待验签数据，请根据实际情况获取
    var raw_data =JSON.stringify(data);
// 签名在头部信息的 x-pingplusplus-signature 字段
    var signature =this.http.headers["x-pingplusplus-signature"];
// 请从 https://dashboard.pingxx.com 获取「Webhooks 验证 Ping++ 公钥」
    var pub_key_path = think.RESOURCE_PATH + "/upload/pingpp/pingpp_rsa_public_key.pem";

    if (!verify_signature(raw_data, signature, pub_key_path,fs,crypto)) {
      return this.fail("服务其验证失败！")
    }

    switch (data.type) {
      case "charge.succeeded":
        // 开发者在此处加入对支付异步通知的处理代码
        //console.log(data.data.object.paid);
        if(data.data.object.paid){
          let order = await this.model("order").where({order_no:data.data.object.order_no}).find();
          //支付成功改变订单状态
          let update = await this.model("order").where({order_no:data.data.object.order_no}).update({status:3,pay_status:1,pay_time:(data.data.object.time_paid*1000)});
          if(order.type == 1 && update) {
            await this.model("customer").where({user_id:order.user_id}).increment("balance",order.order_amount);
            //充值成功后插入日志
            let log = {
              admin_id:0,
              user_id:order.user_id,
              type:2,
              time:new Date().valueOf(),
              amount:Number(order.order_amount),
              amount_log:await this.model("customer").where({user_id:order.user_id}).getField("balance",true),
              note:`${await get_nickname(order.user_id)} 通过[${await this.model("pingxx").where({id: order.payment}).getField("title", true)}]支付方式进行充值,订单编号：${data.data.object.order_no}`
            }
            await this.model('balance_log').add(log);

          }
          //记录支付日志
          await this.model("doc_receiving").where({order_id:order.id}).update({pay_status:1,payment_time:(data.data.object.time_paid*1000)});
          this.success({name:"成功！"});
        }else {
          this.fail("失败！");
        }
        break;
      case "refund.succeeded":
        // 开发者在此处加入对退款异步通知的处理代码sfdsfs
        break;
      default:
    }
  }
  //支付回掉
  async payresAction(){
    let code = this.param();

    //orderId: '1458722092073', respMsg: 'success'
    console.log(code);
    //站内支付回掉
    if(code.c_o_id){
      let order = await this.model("order").find(code.c_o_id);
      order.amount = order.order_amount;
      switch (order.payment){
        case 100:
          order.channel = "预付款支付";
          break;
        default:
          order.channel = "货到付款";
          break;
      }
      this.assign("order",order);
    }else {
      //支付接口回掉
      let order = await this.model("order").where({order_no:code.out_trade_no||code.orderId||code.order_no}).find();
      //调用ping++ 服务端
      let payment = think.service("payment");
      let pay = new payment(this.http);
      let charges = await pay.charge(order.pingxx_id);

      if(charges.paid && order.pay_status == 0){
        //支付成功改变订单状态
        let update = await this.model("order").where({order_no:charges.order_no}).update({status:3,pay_status:1,pay_time:(charges.time_paid*1000)});

        if(order.type == 1 && update){
          await this.model("customer").where({user_id:order.user_id}).increment("balance",order.order_amount);

          //充值成功后插入日志
          let log = {
            admin_id:0,
            user_id:order.user_id,
            type:2,
            time:new Date().valueOf(),
            amount:Number(order.order_amount),
            amount_log:await this.model("customer").where({user_id:order.user_id}).getField("balance",true),
            note:`${await get_nickname(order.user_id)} 通过[${await this.model("pingxx").where({id: order.payment}).getField("title", true)}]支付方式进行充值,订单编号：${order.order_no}`
          }
          await this.model('balance_log').add(log);

        }
        //记录支付日志
        await this.model("doc_receiving").where({order_id:order.id}).update({pay_status:1,payment_time:(charges.time_paid*1000)});
      }
      if(charges.paid && order.pay_status == 0 && order.type==1){
        await this.model("order").where({order_no:order.order_no}).delete();
      }
      charges.amount = charges.amount/100;
      charges.channel = await this.model("pingxx").where({channel:charges.channel}).getField("title",true);
      this.assign("order",charges);
    }


    this.meta_title = "支付结果";//标题1
    this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
    this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
    //判断浏览客户端
    if (checkMobile(this.userAgent())) {
      return this.display(`mobile/${this.http.controller}/${this.http.action}`)
    } else {
      return this.display();
    }
  }
}