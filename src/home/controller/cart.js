// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
import crypto from "crypto";
import fs from 'fs';
export default class extends Base {
    init(http){
        super.init(http);
    }
  /**
   * index action
   * @return {Promise} []
   */
  //购物车展示
  indexAction(){
    //auto render template file index_index.html
    this.meta_title = "购物车";//标题1
    this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
    this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
    //console.log(checkMobile(this.userAgent()));
    //编辑购物车// todou
    return this.display();
  }
    //编辑购物车数量
   async stepperAction(){
       if(!this.is_login){
           return this.fail("请先登录");
       }
        let data = this.post();
        console.log(data);
        let ids = data.ids.split("||");
        //检查库存
        let stock = await this.model("order").getstock(ids[0],ids[1]);
        //think.log(stock);
        if(data.qty > stock){
            return this.fail("无货");
        }else {
            let goods = await this.model("cart").where({product_id:ids[0],type:ids[1]||"",uid:this.user.uid}).find();
            let datas = {
                id:goods.id,
                qty:data.qty,
                price:Number(data.qty) * goods.unit_price
            }
            await this.model("cart").update(datas);
            let res = await this.model("cart").find(goods.id);
            return this.success({name:"有货",data:res});
        }
    }
    //删除购物车
   async delcartAction(){
       if(!this.is_login){
           return this.fail("请先登录");
       }
       if(this.isAjax("post")){
           let ids = this.post("ids");
           for(let val of ids.split("<>")){

               let id = await this.model("cart").where({product_id:val.split("||")[0],type:val.split("||")[1]||"",uid:this.user.uid}).delete();
           }
           return this.success({name:"删除成功！"})
       }else {
           let ids = this.get("ids");
           if(think.isEmpty(ids)){
               return this.fail("选择要删除的商品")
           }

           this.assign("ids",ids);
           return this.display();
       }

    }
  //添加购物车
  async addcartAction(){
      let data = this.post();
      data = think.extend({},data);
      // 添加购物车前判断是否有库存
      let stock = await this.model("order").getstock(data.product_id,data.type);
      //think.log(stock);
      if(data.qty > stock){
          return this.json(false);
      }
    //console.log(data);
     //return false;
      let arr=[];
      let cart = this.cart.data;

      if(think.isEmpty(cart)){
         arr.push(data);
      }else{
          //cart = JSON.parse(cart);
          //console.log(cart);
          let typearr = []
          //已有购物车数量相加
         for(let item of cart){
             if(item.type == data.type){
                item.qty = Number(item.qty) + Number(data.qty);
             }
             arr.push(item);
             typearr.push(item.type);  
         }
         //没有直接添加商品
          if(!in_array(data.type,typearr)){
              arr.splice(0, 0,data);
          };
      }
      //console.log(arr);
      
      //获取商品详细信息
      //{total:222,data:[{title:"dfd",price:34,pic:2,}]}
       //arr.push(data);
       let dataarr = [];
       let total = [];
       let num = [];
       for(let val of arr){
           let dataobj = {}
          let goods = await this.model('document').find(val.product_id);
          let table = await this.model('model',{},'admin').get_table_name(goods.model_id);
          let info = await this.model(table).find(val.product_id);
          goods = think.extend(goods,info);
          dataobj.title=goods.title;
         //console.log(goods);
          if(think.isEmpty(goods.suk)){
            dataobj.price=get_price(goods.price,1) * Number(val.qty);
            dataobj.unit_price =get_price(goods.price,1);
              dataobj.weight = goods.weight;
              dataobj.pic = await get_cover(goods.pics.split(",")[0],'path');
          }else{
            let suk = JSON.parse(goods.suk);
            let arr_ = val.type.split(",");
            let getpr = getsuk(suk.data,arr_);
              //console.log(getpr);
              if(suk.is_pic==1){
                  dataobj.pic = await get_cover(getpr.pic,'path');
              }else {
                  dataobj.pic = await get_cover(goods.pics.split(",")[0],'path');
              }
            dataobj.price = Number(getpr.sku_price) * Number(val.qty);
            dataobj.unit_price =Number(getpr.sku_price);
              dataobj.weight = getpr.sku_weight;
            //console.log(dataobj.price);   
           }

          dataobj.url = get_url(goods.name,goods.id);
          dataobj.product_id = val.product_id;
          dataobj.type = val.type;
          dataobj.qty = Number(val.qty);
          dataarr.push(dataobj);
          total.push(dataobj.price);
          num.push(dataobj.qty);
       }
        //缓存购物车
     if(this.is_login){
         await this.model('cart').where({uid:this.user.uid}).delete()
         for(let val of dataarr){
                val.uid = this.user.uid;
                this.model('cart').add(val);
            }
     }else{
       await this.session("cart_goods_item",dataarr); //将 cookie theme 值设置为 default
     }
     
      let cartinfo = {
          total:eval(total.join('+')),
          num:eval(num.join('+')),
          data:dataarr
      }
    
     return this.json(cartinfo);
  }

  //获取订单信息
 async getorderinfoAction(){
      //判断是否登陆
      //!this.is_login || this.fail('您木有登陆'); 
      await this.weblogin();
      let post = this.post("ids");
      if(think.isEmpty(post)){
          this.http.error = new Error('木有选项要结算的宝贝');
          return think.statusAction(1002, this.http);
      }
      if(think.isEmpty(this.cart.data)){
          this.http.error = new Error('木有宝贝提交啥订单呢？');
          return think.statusAction(1002, this.http);
      }
     //构造购物车要结算的宝贝
      let ids=[];
      if(think.isArray(post)){
          for(let v of post){
              ids.push( v.split("||"));
          }
      }else {
          ids.push(post.split("||"));
      }
      let order_amount;//订单金额
      let payable_amount;//应付金额，商品的原价
      let real_amount;//商品参与获得的价格
      let payable_freight;//应付运费
      let real_freight//实际运费

      //TODO购物清单 todo
      //购物车Post过来的商品id;暂时去购物车内所有的商品
      //购物车内的宝贝
      //let cart_goods = await this.model("cart").where({uid:this.user.uid}).select();
      let cart_goods = this.cart.data;
     //筛选要结算的商品
     let check_goods =[];
     for(let val of cart_goods){
         for (let v of ids){
            if(think.isEmpty(v[1]) && think.isEmpty(val.type)){
                if(v[0]==val.product_id){
                    check_goods.push(val);
                }
            }else {
                if(v[0]==val.product_id && v[1]==val.type){
                    check_goods.push(val);
                }
            }
         }
     }
     this.assign("check_goods",check_goods);
     //   console.log(cart_goods);
      console.log(check_goods);
      //应付金额
      let parr = [];
      let nums = [];
      for(let val of check_goods){
          parr.push(val.price);
          nums.push(val.qty)
      }
      //console.log(parr);
      real_amount = eval(parr.join('+'));
     this.assign("real_amount",real_amount);
     //商品总数量
     this.assign("nums",eval(nums.join('+')));
      //联系人
      let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC,id DESC").select();
     if(!think.isEmpty(addrlist)){
      for(let val of addrlist){
              val.province_num = val.province;
              val.city_num = val.city;
              val.county_num = val.county;
              val.province = await this.model("area").where({id:val.province}).getField("name",true);
              val.city = await this.model("area").where({id:val.city}).getField("name",true);
              val.county = await this.model("area").where({id:val.county}).getField("name",true);
          }
     }
      this.assign("addrlist",addrlist);

     /** 现在用ping++集成直接，但接入暂时屏蔽
      //支付方式
      let paylist = await this.model("payment").where({status:1}).order("sort ASC").select();
      for(let val of paylist){
           val.logo =  await this.model("pay_plugin").where({id:val.plugin_id}).getField("logo",true);
        }
      this.assign("paylist",paylist);
        **/
        //ping++ 支付渠道 pc网页

         let paylist = await this.model("pingxx").where({type:1,status:1}).order("sort ASC").select();
         this.assign("paylist",paylist);

       //运费计算
        //    1、如果店铺只使用统一运费，那么顾客下单计算时按最低运费收取。
        //    2、如果店铺只使用一种运费模板规则，那么顾客下单计算时均按此规则收取运费。
        //    3、如果店铺使用了不同的运费模板规则，那么顾客下单时各运费模板规则先单独计算运费再叠加。
        //    4、如果店铺同时使用统一运费和不同的运费模板规则，那么顾客下单时统一运费单独计算运费，不同的运费模板
       //TODO
       //计算商品的总重量
       real_freight = await this.model("fare").getfare(check_goods,null,this.user.uid);
       this.assign("real_freight",real_freight);
       //订单促销优惠信息
       //TODO
       
        
        //订单金融 实付金额+邮费-订单优惠金额
        //TODO
       // console.log(real_amount);
        order_amount =Number(real_amount) + Number(real_freight)
        this.assign("order_amount",order_amount);

       //this.end(cart_goods);
        this.meta_title = "确认订单信息";//标题1
        this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
        this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
        return this.display();
      
  }
  //获取省市三级联动
  async getareaAction(){
      
      let pid = this.get("pid");
      let area = await this.model('area').where({parent_id:pid}).select()
      return this.json(area);
  }
  
  //添加或者更新联系人地址
 async addaddrAction(){
    await this.weblogin();
      
      let data = this.post();
      data.user_id = this.user.uid;
      if(data.is_default == 1){
          let find = await this.model("address").where({user_id:this.user.uid,is_default:1}).select();
          for(let val of find){
              val.is_default = 0;
              await this.model("address").update(val);
          }
      }
     //判断浏览客户端
     if (checkMobile(this.userAgent())) {
         if (!think.isEmpty(data.city_picke)) {
             let city_picke = data.city_picke.split(" ");
             data.province = await this.model("area").where({
                 name: ["like", `%${city_picke[0]}%`],
                 parent_id: 0
             }).getField("id", true);
             data.city = await this.model("area").where({
                 name: ["like", `%${city_picke[1]}%`],
                 parent_id: data.province
             }).getField("id", true);
             data.county = await this.model("area").where({
                 name: ["like", `%${city_picke[2]}%`],
                 parent_id: data.city
             }).getField("id", true);
         }
     }
      let res
      if(think.isEmpty(data.id)){
        res =await this.model("address").add(data);  
      }else{
        res = await this.model("address").update(data);
      }
      
      if(res){

          //判断浏览客户端
          if (checkMobile(this.userAgent())) {
              return this.success({name:'操作成功',url:"/user/address"});
          } else {
              let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC,id DESC").select();
              for(let val of addrlist){
                  val.province = await this.model("area").where({id:val.province}).getField("name",true);
                  val.city = await this.model("area").where({id:val.city}).getField("name",true);
                  val.county = await this.model("area").where({id:val.county}).getField("name",true);
              }
              return this.success({name:'操作成功',data:addrlist,type:data.type});
          }

      }else{
          return this.fail( '操作失败！');
          
      }
     
  }
  
 //联系人设置为默认
async addrisdefaultAction(){
     if(!this.is_login){
         return think.statusAction(1000, this.http);
      }
      let id = this.get("id");
      let find = await this.model("address").where({user_id:this.user.uid}).order("is_default ASC").select();
          for(let val of find){
              if(val.id == id){
                val.is_default = 1;  
              }else{
                val.is_default = 0;   
              }
              await this.model("address").update(val);
               val.province = await this.model("area").where({id:val.province}).getField("name",true);
              val.city = await this.model("area").where({id:val.city}).getField("name",true);
              val.county = await this.model("area").where({id:val.county}).getField("name",true);
          }
      return this.success({name:'设置成功！',data:find});
          
}
    //获取当前选择的地址
    async getaddrAction(){
        if(!this.is_login){
            return think.statusAction(1000, this.http);
        }
        let id = this.get("id");
        let addr = await this.model("address").where({user_id:this.user.uid}).find(id);
        addr.province = await this.model("area").where({id:addr.province}).getField("name",true);
        addr.city = await this.model("area").where({id:addr.city}).getField("name",true);
        addr.county = await this.model("area").where({id:addr.county}).getField("name",true);
        return this.success({name:"选择地址！",data:addr});
    }
    //计算运费
    async getfareAction(){
        if(!this.is_login){
            return this.fail("你木有登录！")
        }
        let cart_goods = this.cart.data;
        //应付金额
        let parr = [];
        for(let val of cart_goods){
            parr.push(val.price);
        }
        //console.log(parr);
        let real_amount = eval(parr.join('+'));
        let real_freight =  await this.model("fare").getfare(cart_goods,this.get("id"),this.user.uid);
        let order_amount =Number(real_amount) + Number(real_freight);
        let res = {
            real_freight:real_freight,
            order_amount:order_amount
        }
        return this.json(res);
    }
    //订单总额

//删除地址
async deladdrAction(){
     await this.weblogin();
    let id = this.param("id");
     let res = await this.model("address").where({user_id:this.user.uid,id:id}).delete();
      if(res){
          let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select();
          for(let val of addrlist){
              val.province = await this.model("area").where({id:val.province}).getField("name",true);
              val.city = await this.model("area").where({id:val.city}).getField("name",true);
              val.county = await this.model("area").where({id:val.county}).getField("name",true);
          }
          //判断浏览客户端
          if (checkMobile(this.userAgent())) {
              return this.success({name:'删除成功',url:"/user/address"});
          } else {
              return this.success({name:'删除成功！',data:addrlist});
          }

      }else{
          return this.fail( '删除失败！'); 
          
      }
}
//编辑地址
async editaddrmodalAction(){
    if(!this.is_login){return think.statusAction(1000, this.http);};
    let id = this.get("id");
    if(!think.isEmpty(id)){

    //获取地址信息
    let address = await this.model("address").where({user_id:this.user.uid}).find(id);

    let province, city, county;
    //获取省份
    if (checkMobile(this.userAgent())) {
        province = await this.model('area').where({id: address.province}).getField("name", true);
        city = await this.model('area').where({id: address.city}).getField("name", true);
        county = await this.model('area').where({id: address.county}).getField("name", true);
    } else {
        province = await this.model('area').where({parent_id: 0}).select();
        city = await this.model('area').where({parent_id: address.province}).select();
        county = await this.model('area').where({parent_id: address.city}).select();
    }
    this.assign("province",province);
    this.assign("city",city);
    this.assign("county",county);
    this.assign("info",address);
    this.assign("type",this.get("type"));
    }
    this.meta_title="编辑地址"
    if (checkMobile(this.userAgent())) {
        return this.display(`mobile/${this.http.controller}/${this.http.action}`)
    } else {
        return this.display();
    }
}
//创建订单
async createorderAction(){
    if(!this.is_login){return think.statusAction(1000, this.http)};
    let data = this.post();
    // console.log(data);
    // return false;
    let order_amount;//订单金额
    let payable_amount;//应付金额，商品的原价
    let real_amount;//商品参与获得的价格
    let payable_freight;//应付运费
    let real_freight//实际运费
    //判断购物车内是否有商品如果没有停止执行，如果有则删除
    let goodsids;
    let goodslist =JSON.parse(data.goodslist);
    let goodsarr=[];
    for (let goods of goodslist){
        //检查购物车内的宝贝是否有库存
        let stock = await this.model("order").getstock(goods.product_id,goods.type);
        //think.log(stock);
        if(goods.qty > stock){
            return this.fail("购物车内有已经售罄的商品，请返回购物车重新编辑！");
        }
        goodsarr.push(goods.id);
    }
    let isgoods = await this.model("cart").where({id:['IN',goodsarr]}).select();
    delete data.goodslist;
    //isgoods = [];
    if(think.isEmpty(isgoods)){
        return this.fail('请不要重复创建表单！'); 
    }else{
        //清空购物车内已经提交的商品
       await this.model("cart").where({id:['IN',goodsarr]}).delete()
    }
    
    //用户
    data.user_id=this.user.uid;
    //生成订单编号//todo
    let nowtime = new Date().valueOf();
    let oid =["d",this.user.uid,nowtime]
    data.order_no = oid.join("");
    //添加送货地址
    let address = await this.model("address").fieldReverse("id,user_id,is_default").find(data.address);
    console.log(address);
    data = think.extend(data,address);

     //应付金额
      let parr = [];
      for(let val of isgoods){
          parr.push(val.price);
      }
      console.log(parr);
      real_amount = eval(parr.join('+'));
      data.real_amount = real_amount;
      
     //运费计算
        //    1、如果店铺只使用统一运费，那么顾客下单计算时按最低运费收取。
        //    2、如果店铺只使用一种运费模板规则，那么顾客下单计算时均按此规则收取运费。
        //    3、如果店铺使用了不同的运费模板规则，那么顾客下单时各运费模板规则先单独计算运费再叠加。
        //    4、如果店铺同时使用统一运费和不同的运费模板规则，那么顾客下单时统一运费单独计算运费，不同的运费模板
       //TODO
    //计算商品的总重量

       data.real_freight = await this.model("fare").getfare(isgoods,data.address,this.user.uid);;
       
       
        
        //支付状态 pay_stayus 0:未付款 ,1:已付款
        data.pay_status = 0;
        //订单状态 status 2:等待审核，3:已审核
        data.status = 2;
        //发货状态 delivery_status 0:未发货，1:已发货
        data.delivery_status = 0;
        //订单创建时间 create_time
        data.create_time = new Date().valueOf();
        
        //订单金融 实付金额+邮费-订单优惠金额
        //TODO
        //console.log(real_amount);
        order_amount =Number(data.real_amount) + Number(data.real_freight)
        data.order_amount = order_amount;
        //生成订单
       let order_id = await this.model("order").add(data);

    //储存宝贝
    //let order_id = 22;
    console.log(isgoods);
    let ngoods = [];
    for(let goods of isgoods){
      let newgoods = {};
      newgoods.order_id = order_id;
      newgoods.goods_id = goods.product_id;
      newgoods.goods_price = goods.unit_price;
      newgoods.goods_real_price = goods.unit_price;
      newgoods.goods_nums = goods.qty;
      newgoods.prom_goods = JSON.stringify(goods);
      ngoods.push(newgoods);
    }
    console.log(ngoods);
    await this.model("order_goods").addMany(ngoods);
    console.log(data);
    //减少订单中商品的库存
    await this.model("order").stock(order_id,true);
    
    return this.success({name:'订单创建成功，正在跳转支付页面！',url:`/home/cart/pay/order/${order_id}/setp/3`});
    
}
    //实时查询商品库存
    async getstockAction(){
        let data = this.get();
        let stock = await this.model("order").getstock(data.id,data.type);
        return this.json(stock);
    }
   //支付
 async  payAction(){
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
               console.log(order.id);
               if(think.isEmpty(order.pingxx_id)){
                   console.log(111111111)
                   //获取渠道
                   let channel = await this.model("pingxx").where({id:post.payment}).getField("channel",true);
                   //调用ping++ 服务端
                    payment = think.service("payment");
                    pay = new payment(this.http);
                   //传入 channel,order_no,order_amount,this.ip()
                   charges = await pay.pingxx(channel,order.order_no,order.order_amount,this.ip());
                   //把pingxx_id存到订单
                   await this.model('order').where({id:post.order_id}).update({pingxx_id:charges.id});
               }else {
                   console.log(33333333);
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
               return think.statusAction(1002, this.http);
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
           let type;
           if (checkMobile(this.userAgent())) {
               type = 2;
           }else {
               type = 1;
           }
           let paylist = await this.model("pingxx").where({type:type,status:1}).order("sort ASC").select();
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
                    let order = await this.model("order").where({order_no:data.data.object.order_no}).field("id,tpye,user_id,order_amount,payment").find();
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
                    return this.success({name:"成功！"});
                }else {
                    return this.fail("失败！");
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