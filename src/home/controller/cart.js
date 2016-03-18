'use strict';

import Base from './base.js';

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
  //添加购物车
  async addcartAction(){
      let data = this.post();
      data = think.extend({},data);

      let arr=[];
      let cart = this.cartdata;
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
      console.log(arr);
      
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
          }else{
            let suk = JSON.parse(goods.suk);
            let arr_ = val.type.split(",");
            let getpr = getsuk(suk.data,arr_);
            dataobj.price = Number(getpr.sku_price) * Number(val.qty);
            dataobj.unit_price =Number(getpr.sku_price);
            //console.log(dataobj.price);   
           }
          dataobj.pic = await get_cover(goods.pics.split(",")[0],'path');
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
       this.cookie("cart_goods_item",JSON.stringify(dataarr)); //将 cookie theme 值设置为 default  
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
      if(!this.is_login){
          return this.fail("你木有登录！")
      }
      if(think.isEmpty(this.cart.data)){ return this.fail("木有宝贝提交啥订单呢？") }
      
      let order_amount;//订单金额
      let payable_amount;//应付金额，商品的原价
      let real_amount;//商品参与获得的价格
      let payable_freight;//应付运费
      let real_freight//实际运费
      
      //TODO购物清单 todo
      //购物车Post过来的商品id;暂时去购物车内所有的商品
      //购物车内的宝贝
      //let cart_goods = await this.model("cart").where({uid:this.user.uid}).select();
      let cart_goods = this.cartdata;
      //应付金额
      let parr = [];
      for(let val of cart_goods){
          parr.push(val.price);
      }
      console.log(parr);
      real_amount = eval(parr.join('+'));
      //联系人
      let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select();
      for(let val of addrlist){
              val.province_num = val.province;
              val.city_num = val.city;
              val.county_num = val.county;
              val.province = await this.model("area").where({id:val.province}).getField("name",true);
              val.city = await this.model("area").where({id:val.city}).getField("name",true);
              val.county = await this.model("area").where({id:val.county}).getField("name",true);
          }
      this.assign("addrlist",addrlist);
      //支付方式
      let paylist = await this.model("payment").where({status:1}).order("sort ASC").select();
      for(let val of paylist){
           val.logo =  await this.model("pay_plugin").where({id:val.plugin_id}).getField("logo",true);
        }
      this.assign("paylist",paylist);
        
        
       //运费计算
        //    1、如果店铺只使用统一运费，那么顾客下单计算时按最低运费收取。
        //    2、如果店铺只使用一种运费模板规则，那么顾客下单计算时均按此规则收取运费。
        //    3、如果店铺使用了不同的运费模板规则，那么顾客下单时各运费模板规则先单独计算运费再叠加。
        //    4、如果店铺同时使用统一运费和不同的运费模板规则，那么顾客下单时统一运费单独计算运费，不同的运费模板
       //TODO
       let area = addrlist[0].province_num+"_"+addrlist[0].city_num+"_"+addrlist[0].county_num;
       let fare = await this.model("fare").where({is_default:1}).find();
       let zoning = JSON.parse(fare.zoning)
       if(think.isEmpty(zoning)){
           real_freight =fare.first_price
       }else{
           //console.log(zoning)
           for(let val of zoning){
               if(in_array(fare,val.area)){
                  console.log(1);
               }else{
                  console.log(2)
               }
              
           }
          real_freight = 8; 
       }
       
       //real_freight = 8;
       this.assign("real_freight",real_freight);
       //订单促销优惠信息
       //TODO
       
        
        //订单金融 实付金额+邮费-订单优惠金额
        //TODO
        console.log(real_amount);
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
     if(!this.is_login){
          return this.fail("你木有登录！")
      }
      
      let data = this.post();
      data.user_id = this.user.uid;
      if(data.is_default == 1){
          let find = await this.model("address").where({user_id:this.user.uid,is_default:1}).select();
          for(let val of find){
              val.is_default = 0;
              await this.model("address").update(val);
          }
      }
      let res
      if(think.isEmpty(data.id)){
        res =await this.model("address").add(data);  
      }else{
        res = await this.model("address").update(data);
      }
      
      if(res){
          let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select();
          for(let val of addrlist){
              val.province = await this.model("area").where({id:val.province}).getField("name",true);
              val.city = await this.model("area").where({id:val.city}).getField("name",true);
              val.county = await this.model("area").where({id:val.county}).getField("name",true);
          }
          return this.success({name:'添加收货人地址成功',data:addrlist});
      }else{
          return this.fail( '添加失败！'); 
          
      }
     
  }
  
 //联系人设置为默认
async addrisdefaultAction(){
     if(!this.is_login){
          return this.fail("你木有登录！")
      }
      let id = this.get("id");
      let find = await this.model("address").where({user_id:this.user.uid}).select();
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
//删除地址
async deladdrAction(){
     if(!this.is_login){return this.fail("你木有登录！")};
     let id = this.get("id");
     let res = await this.model("address").where({user_id:this.user.uid,id:id}).delete();
      if(res){
          let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select();
          for(let val of addrlist){
              val.province = await this.model("area").where({id:val.province}).getField("name",true);
              val.city = await this.model("area").where({id:val.city}).getField("name",true);
              val.county = await this.model("area").where({id:val.county}).getField("name",true);
          }
          return this.success({name:'删除成功！',data:addrlist});
      }else{
          return this.fail( '删除失败！'); 
          
      }
}
//编辑地址
async editaddrmodalAction(){
    if(!this.is_login){return this.fail("你木有登录！")};
    let id = this.get("id");
    //获取地址信息
    let address = await this.model("address").where({user_id:this.user.uid}).find(id);
    //获取省份
    let province = await this.model('area').where({parent_id:0}).select();
    let city = await this.model('area').where({parent_id:address.province}).select();
    let county = await this.model('area').where({parent_id:address.city}).select();
    this.assign("province",province);
    this.assign("city",city);
    this.assign("county",county);
    this.assign("info",address);
    return this.display();
}
//创建订单
async createorderAction(){
    if(!this.is_login){return this.fail("你木有登录！")};
    let data = this.post();
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
    data.order_no = nowtime;
    //添加送货地址
    let address = await this.model("address").fieldReverse("id,user_id,is_default").find(data.address);
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
       real_freight = 8;
       data.real_freight = real_freight;
       
       
        
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
        console.log(real_amount);
        order_amount =Number(real_amount) + Number(real_freight)
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
    
    return this.success({name:'订单创建成功，正在跳转支付页面！',url:`/home/cart/pay/order/${order_id}/setp/3`});
    
}
   //支付
 async  payAction(){
       if(!this.is_login){return this.fail("你木有登录！")};
       let order_id = this.get("order");
       let setp = this.get("setp")||"";
       //this.end(order_id  + "=" + setp)
       //订单信息
       let order = await this.model("order").where({user_id:this.user.uid}).find(order_id);
       console.log(order);
       this.assign("order",order);
       
        //支付方式
      let paylist = await this.model("payment").where({status:1}).order("sort ASC").select();
      for(let val of paylist){
           val.logo =  await this.model("pay_plugin").where({id:val.plugin_id}).getField("logo",true);
        }
        this.assign("paylist",paylist);
        this.assign("setp",setp);
        this.meta_title = "订单支付";//标题1
        this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
        this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
        return this.display();
   }
}