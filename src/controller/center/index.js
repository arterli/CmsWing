// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../cmswing/home');
const fs = require('fs');
module.exports = class extends Home {
  /**
     * index action
     * 用户中心主页
     * @return {Promise} []
     */
  async indexAction() {
    // auto render template file index_index.html
    // if (!this.is_login) {
    //     return think.statusAction(700, this.http);
    // }
    // 判断是否登陆
    // await this.weblogin();
    if (!this.is_login) {
      // 判断浏览客户端
      if (this.isMobile) {
        // 手机端直接跳转到登录页面
        return this.redirect('/center/public/login');
      } else {
        return this.redirect('/cmswing/error/login');
      }
    }
    // this.http.error = new Error('成功信息！');
    // return think.statusAction(701, this.http);
    // this.http.error = new Error('错误信息！');
    // return think.statusAction(702, this.http);
    // 获取用户信息
    const userInfo = await this.model('member').join({
      table: 'member_group',
      join: 'left',
      as: 'c',
      on: ['groupid', 'groupid']
    }).find(this.user.uid);

    this.assign('userInfo', userInfo);
    // 订单交易总金额
    const order = await this.model('order').where({user_id: this.user.uid, pay_status: 1}).getField('order_amount');
    const orderTotal = eval(order.join('+'));
    this.assign('orderTotal', orderTotal);
    // 进行中的订单
    const onOrder = await this.model('order').where({status: 4, user_id: this.user.uid}).count('id');
    this.assign('onOrder', onOrder);
    // 带评价的商品 TODO
    this.meta_title = '用户中心';

    // 判断浏览客户端
    if (this.isMobile) {
      const mtype = this.get('mtype');
      if (mtype == 'vue') {
        // vue
        const vuedata = {orderTotal: orderTotal, onOrder: onOrder};
        return this.json(vuedata);
      } else { // 普通模板
        this.active = this.ctx.controller + '/' + this.ctx.action;
        return this.display(this.mtpl());
      }
    } else {
      return this.display();
    }
  }

  // 获取头像
  async avatarAction() {
    const uid = this.get('uid') || this.user.uid;
    var uploadPath = think.resource + '/upload/avatar/' + uid;
    const path = think.isFile(uploadPath + '/' + '/avatar.png');
    let pic;
    if (path) {
      pic = fs.readFileSync(uploadPath + '/' + '/avatar.png');
    } else {
      pic = fs.readFileSync(think.resource + '/upload/avatar/avatar.jpg');
    }
    this.header('Content-Type', 'image/png');
    return this.body = pic;
  }
};
