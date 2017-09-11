// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.Controller {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    // auto render template file index_index.html
    return this.display();
  }
  async cloaAction() {
    // 订单在规定时间为付款自动作废执行方法
    // 禁止 URL 访问该 Action
    if (!this.isCli) {
      const error = this.controller('common/error');
      return error.noAction('only invoked in cli mode！');
    }

    // 查询未付款，未作废的订单的订单
    const map = {
      pay_status: 0,
      status: 2,
      create_time: ['<', (new Date().getTime() - (Number(this.config('setup.ORDER_DELAY')) * 60000))],
      type: 0
    };
    const order = await this.model('order').where(map).field('id').select();
    if (!think.isEmpty(order)) {
      for (const v of order) {
        await this.model('order').where({id: v.id}).update({status: 6, admin_remark: '规定时间未付款系统自动作废'});
        // 释放库存
        await this.model('order').stock(v.id, false);
      }
    }

    think.logger.debug(new Date(), '订单作废任务执行时间');
    // this.end();
    return this.body = '';
  }
};
