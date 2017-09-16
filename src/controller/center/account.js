// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Jimp = require('jimp');
module.exports = class extends think.cmswing.center {
  async __before() {
    await super.__before();
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
  }
  /**
   * 账户金额管理
   * @returns {PreventPromise}
   */
  async indexAction() {
    const type = this.get('type') || null;
    let data;
    if (think.isEmpty(type)) {
      data = await this.model('balance_log').where({user_id: this.user.uid}).page(this.get('page')).order('time DESC').countSelect();
    } else if (type == 1) {
      data = await this.model('balance_log').where({user_id: 10000}).page(this.get('page')).order('time DESC').countSelect();
    } else {
      data = await this.model('order').where({
        user_id: this.user.uid,
        type: 1,
        is_del: 0
      }).page(this.get('page')).order('create_time DESC').countSelect();
      for (const val of data.data) {
        val.channel = await this.model('pingxx').where({id: val.payment}).getField('title', true);
      }
    }

    const html = this.pagination(data);
    // think.log(data);
    this.assign('pagination', html);
    this.assign('list', data.data);
    this.assign('type', type);
    this.assign('count', data.count);
    // 获取用户信息
    const userInfo = await this.model('member').find(this.user.uid);
    this.assign('userInfo', userInfo);
    // 未付款的充值订单统计
    const unpaid = await this.model('order').where({
      user_id: this.user.uid,
      type: 1,
      is_del: 0,
      pay_status: 0
    }).count('id');
    this.assign('unpaid', unpaid);
    this.meta_title = '账户金额管理';
    // 判断浏览客户端
    if (this.isMobile) {
      if (this.isAjax('get')) {
        for (const v of data.data) {
          v.time = this.moment(v.create_time).format('YYYY-MM-DD HH:mm:ss');
          v.amount = formatCurrency(v.amount);
          v.amount_log = formatCurrency(v.amount_log);
        }
        return this.json(data);
      } else {
        this.active = 'user/index';
        return this.display(this.mtpl());
      }
    } else {
      return this.display();
    }
  }

  /**
   * 充值
   */
  async rechargeAction() {
    if (this.isAjax('POST')) {
      const data = this.post();
      if (think.isEmpty(data.order_amount)) {
        return this.fail('请输入金额！');
      } else if (!think.isNumberString(data.order_amount)) {
        return this.fail('金额类型错误！');
      } else if (think.isEmpty(data.payment)) {
        return this.fail('必须选一种支付方式！');
      }

      // 用户
      data.user_id = this.user.uid;
      // 生成订单编号//todo
      // let nowtime = new Date().valueOf();
      // let oid = ["c", this.user.uid, nowtime]
      data.order_no = await this.model('order').orderid(this.user.uid);
      // 支付状态 pay_stayus 0:未付款 ,1:已付款
      data.pay_status = 0;
      // 订单状态 status 2:等待审核，3:已审核
      data.status = 2;
      // 发货状态 type 0:普通，1:充值
      data.type = 1;
      // 订单创建时间 create_time
      data.create_time = new Date().valueOf();
      // 生成订单

      // 判断是否已经绑定pingxx_id,如果已绑定查询pingxx订单直接支付。防止订单重复生成。
      // console.log(111111111)
      // 获取渠道
      const channel = await this.model('pingxx').where({id: data.payment}).getField('channel', true);
      let open_id;
      if (channel == 'wx_pub') {
        open_id = await this.session('wx_openid');
      }
      // 调用ping++ 服务端
      const payment = this.service('cmswing/payment', this.ctx);
      // 传入 channel,order_no,order_amount,this.ip()
      const charges = await payment.pingxx(channel, data.order_no, data.order_amount, this.ip, open_id);
      // console.log(charges);
      if (charges) {
        // 把pingxx_id存到订单
        data.pingxx_id = charges.id;
        const order_id = await this.model('order').add(data);

        // 支付日志
        const receiving = {
          order_id: order_id,
          user_id: this.user.uid,
          amount: data.order_amount,
          create_time: new Date().getTime(),
          payment_time: new Date().getTime(),
          doc_type: 1,
          payment_id: data.payment,
          pay_status: 0
        };
        await this.model('doc_receiving').add(receiving);
        return this.success({name: '支付订单对接成功，正在转跳！', data: charges});
      } else {
        return this.fail('调用接口失败！');
      }
      // think.log(data);
    } else {
      // ping++ 支付渠道 pc网页
      // 根据不同的客户端调用不同的支付方式
      let map;
      if (this.isMobile) {
        map = {
          type: 2,
          status: 1
        };
        if (!this.isweixin) {
          map.channel = ['!=', 'wx_pub'];
        }
      } else {
        map = {
          type: 1,
          status: 1
        };
      }
      const paylist = await this.model('pingxx').where(map).order('sort ASC').select();
      this.assign('paylist', paylist);
      this.meta_title = '充值';
      if (this.isMobile) {
        this.active = 'user/index';
        return this.display(this.mtpl());
      } else {
        this.display();
      }
    }
  }
};
