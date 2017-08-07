// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../common/home');
module.exports = class extends Home {
  constructor(ctx){
    super(ctx);
  }
  /**
   * index action
   * @return {Promise} []
   */
  //购物车展示
  indexAction(){
    //auto render template file index_index.html
    this.meta_title = "购物车";//标题1
    this.keywords = this.config('setup.WEB_SITE_KEYWORD') ? this.config('setup.WEB_SITE_KEYWORD') : '';//seo关键词
    this.description = this.config('setup.WEB_SITE_DESCRIPTION') ? this.config('setup.WEB_SITE_DESCRIPTION') : "";//seo描述
    this.active = this.ctx.controller+"/"+this.ctx.action;
    //console.log(checkMobile(this.userAgent()));
    //编辑购物车// todou
    //判断浏览客户端
    if (this.isMobile) {
      return this.display(this.mtpl())
    } else {
      return this.display();
    }
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
      if (this.isMobile) {
        return this.success({name:"删除成功！",url:"/center/cart/index"})
      } else {
        return this.success({name:"删除成功！"})
      }

    }else {
      let ids = this.get("ids");
        console.log(ids);
        if(think.isEmpty(ids)){
        return this.fail("选择要删除的商品")
      }

      this.assign("ids",decodeURI(ids));
      this.meta_title="删除";
      this.active = "/center/cart/index";
      //判断浏览客户端
      if (this.isMobile) {
        return this.display(this.mtpl())
      } else {
        return this.display();
      }
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
    console.log(data);
    //return false;
    let arr=[];
    let cart = this.cart.data;

    if(think.isEmpty(cart)){
      arr.push(data);
    }else{
      //cart = JSON.parse(cart);
      console.log(cart);
      let typearr = []
      let idarr = []
      //已有购物车数量相加
      for(let item of cart){
        if((item.type == data.type)&&(item.product_id == data.product_id) ){
          item.qty = Number(item.qty) + Number(data.qty);
        }
        arr.push(item);
        idarr.push(item.product_id)
        typearr.push(item.type);
      }
      //没有直接添加商品
      if(!think.isEmpty(data.type)){
        if(!in_array(data.type,typearr)){
          arr.splice(0, 0,data);
        };
      }else {
        if(!in_array(data.product_id,idarr)){
          arr.splice(0, 0,data);
        };
      }

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
      let table = await this.model('model').get_table_name(goods.model_id);
      let info = await this.model(table).find(val.product_id);
      goods = think.extend(goods,info);
      dataobj.title=goods.title;
      //console.log(goods);
      if(think.isEmpty(goods.suk)){
        dataobj.price=get_price(goods.price,1) * Number(val.qty);
        dataobj.unit_price =get_price(goods.price,1);
        dataobj.weight = goods.weight;
        dataobj.pic = await get_pic(goods.pics.split(",")[0],1,100,100);
      }else{
        let suk = JSON.parse(goods.suk);
        let arr_ = val.type.split(",");
        let getpr = getsuk(suk.data,arr_);
        //console.log(getpr);
        if(suk.is_pic==1){
          dataobj.pic = await get_pic(getpr.pic,1,100,100);
        }else {
          dataobj.pic = await get_pic(goods.pics.split(",")[0],1,100,100);
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
    let post = this.para("ids");
    let addrid = this.get("addrid");
    if(think.isEmpty(post)){
        const error = this.controller("common/error");
        return error.noAction('木有选项要结算的宝贝');
    }
    if(think.isEmpty(this.cart.data)){
        const error = this.controller("common/error");
        return error.noAction('木有宝贝提交啥订单呢!');
    }

    //手机端接收
    if (!think.isEmpty(addrid) && this.isMobile) {
      post = JSON.parse(post);
    }
    this.assign("goodsget",post);
    this.assign("goodsget",post);
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
    //手机端接收
    let map;
    if (this.isMobile) {
      if(think.isEmpty(addrid)){
        map={user_id:this.user.uid,is_default:1}
      }else {
        map={user_id:this.user.uid,id:addrid}
      }
    }else {
      map={user_id:this.user.uid};
    }
    //联系人
    let addrlist = await this.model("address").where(map).order("is_default DESC,id DESC").select();
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
        //根据不同的客户端调用不同的支付方式
    let type;
    if (this.isMobile) {
      type = 2;
    }else {
      type = 1;
    }
    let paylist = await this.model("pingxx").where({type:type,status:1}).order("sort ASC").select();
    this.assign("paylist",paylist);

    //运费计算
    //    1、如果店铺只使用统一运费，那么顾客下单计算时按最低运费收取。
    //    2、如果店铺只使用一种运费模板规则，那么顾客下单计算时均按此规则收取运费。
    //    3、如果店铺使用了不同的运费模板规则，那么顾客下单时各运费模板规则先单独计算运费再叠加。
    //    4、如果店铺同时使用统一运费和不同的运费模板规则，那么顾客下单时统一运费单独计算运费，不同的运费模板
    //TODO
      //拿到运费模板
      let farr = [];
      for(let cg of check_goods){
        cg.fare = await this.model("document_shop").where({id:cg.product_id}).getField('fare',true);
        if(cg.fare !=0){
          let isd = await this.model("fare").where({id:cg.fare}).getField('is_default',true);
          if(isd==1){
            cg.fare=0;
          }
        }
        farr.push(cg.fare);
      }
     //去重
      farr=think._.uniq(farr);
      console.log(farr);
      let cgarr=[];
      for(let fa of farr){
        let fobj = {};
        fobj.id = fa;
        fobj.cg=think._.filter(check_goods, ['fare', fa]);
        cgarr.push(fobj);
      }

      //计算运费模板
      let rarr =[];
    for(let r of cgarr){
        let rf = await this.model("fare").getfare(r.cg,null,this.user.uid,r.id);
        rarr.push(rf);
    }
      //console.log(rarr);
      real_freight = think._.sum(rarr);
     // console.log(real_freight);
      // real_freight = await this.model("fare").getfare(check_goods,null,this.user.uid);
    this.assign("real_freight",real_freight);
    //订单促销优惠信息
    //TODO


    //订单金融 实付金额+邮费-订单优惠金额
    //TODO
    //console.log(real_amount);
    order_amount =Number(real_amount) + Number(real_freight)
    this.assign("order_amount",order_amount);

    //this.end(cart_goods);
    this.meta_title = "确认订单信息";//标题1
    this.keywords = this.config('setup.WEB_SITE_KEYWORD') ? this.config('setup.WEB_SITE_KEYWORD') : '';//seo关键词
    this.description = this.config('setup.WEB_SITE_DESCRIPTION') ? this.config('setup.WEB_SITE_DESCRIPTION') : "";//seo描述
    if (this.isMobile) {
      return this.display(this.mtpl())
    } else {
      return this.display();
    }
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


//创建订单
  async createorderAction(){
    await this.weblogin();
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
    // let nowtime = new Date().valueOf();
    // let oid =["d",this.user.uid,nowtime]
    // data.order_no = oid.join("");
    data.order_no = await this.model("order").orderid();
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
    //客户订单备注
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

    return this.success({name:'订单创建成功，正在跳转支付页面！',url:`/center/pay/pay?order=${order_id}&setp=3`});

  }
  //实时查询商品库存
  async getstockAction(){
    let data = this.get();
    let stock = await this.model("order").getstock(data.id,data.type);
    return this.json(stock);
  }
}