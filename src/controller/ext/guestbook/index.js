
// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.extIndex {
  /**
   * index action
   *
   * @return {Promise} []
   */

  async indexAction() {
    if (this.isPost) {
      const data = this.post();
      if (think.isEmpty(data.mobile)) {
        return this.fail('手机号码不能为空！');
      }
      if (think.isEmpty(data.title)) {
        return this.fail('留言标题不能为空！');
      }
      if (think.isEmpty(data.content)) {
        return this.fail('留言内容不能为空！');
      }
      data.create_time = new Date().valueOf();
      const res = await this.model('ext_guestbook').add(data);
      if (res) {
        return this.success({name: '反馈建议提交成功!', url: '/home/index'});
      } else {
        return this.fail('反馈建议提交失败！');
      }
    } else {
      this.meta_title = '提交反馈建议';
      // 获取用户信息
      const userInfo = await this.model('member').join({
        table: 'member_group',
        join: 'left',
        as: 'c',
        on: ['groupid', 'groupid']
      }).find(this.user.uid);
      this.assign('userInfo', userInfo);
      if (!this.is_login) {
        // 判断浏览客户端
        if (this.isMobile) {
          // 手机端直接跳转到登录页面
          return this.redirect('/center/public/login');
        } else {
          return this.redirect('/cmswing/error/login');
        }
      }
      if (this.isMobile) {
        return this.extDisplay('m');
      } else {
        return this.extDisplay();
      }
    }
  }
};
