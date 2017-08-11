// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../common/home');
module.exports = class extends Home {
  //我的订单
  async indexAction() {
    //判断是否登陆
    await this.weblogin();
    let status = this.para("status") || null;
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
    let data = await this.model("order").where(map).page(this.para('page')).order("create_time DESC").countSelect();
    let html = this.pagination(data);
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
        val.end_time = date_from(val.create_time + (Number(this.config('setup.ORDER_DELAY')) * 60000))
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
    if (this.isMobile) {
      if(this.isAjax("get")){
        for(let v of data.data){
          v.create_time =this.moment(v.create_time).format('lll')
        }
        return this.json(data);
      }else {
        this.active = "user/index";
        return this.display(this.mtpl())
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


}