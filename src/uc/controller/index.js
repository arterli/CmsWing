'use strict';
import Base from './base.js';
import fs from 'fs';
export default class extends Base {
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
        table: "member_group",
        join: "left",
        as: "c",
        on: ["groupid", "groupid"]
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

}