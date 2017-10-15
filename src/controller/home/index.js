// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.center {
  /**
     * index action
     * @return {Promise} []
     */
  async indexAction() {
    // let p = this.get();
    // return this.body="dfdfdfd";
    // let ss = think.service("geetest");
    // let sss = new ss();

    // console.log(this.config("view").nunjucks.extname);
    // auto render template file index_index.html
    this.meta_title = '首页';// 标题1
    this.keywords = this.config('setup.WEB_SITE_KEYWORD') ? this.config('setup.WEB_SITE_KEYWORD') : '';// seo关键词
    this.description = this.config('setup.WEB_SITE_DESCRIPTION') ? this.config('setup.WEB_SITE_DESCRIPTION') : '';// seo描述
    this.active = ['/', '/index', '/index.html'];
    // 首页内容钩子
    await this.hook('mod_hometitle');
    await this.hook('mod_homelist');
    // 右边的钩子
    await this.hook('mod_homeright');
    await this.hook('homeright');
    // debugger;
    // 判断浏览客户端
    if (this.isMobile) {
      const map = {
        'pid': 0,
        'status': 1
      };
      // 排序
      const o = {};
      let order = this.get('order') || 100;
      // console.log(order);
      order = Number(order);
      switch (order) {
        case 1:
          o.update_time = 'ASC';
          break;
        case 2:
          o.view = 'DESC';
          break;
        case 3:
          o.view = 'ASC';
          break;
        default:
          o.update_time = 'DESC';
      }

      this.assign('order', order);
      const data = await this.model('document').where(map).page(this.get('page'), 10).order(o).countSelect();
      this.assign('list', data);
      // console.log(data);
      if (this.isAjax('get')) {
        for (const v of data.data) {
          if (!think.isEmpty(v.pics)) {
            const arr = [];
            for (const i of v.pics.split(',')) {
              arr.push(await get_pic(i, 1, 300, 300));
            }
            v.pics = arr;
          }
          if (!think.isEmpty(v.cover_id)) {
            v.cover_id = await get_pic(v.cover_id, 1, 300, 169);
          }
          if (!think.isEmpty(v.price)) {
            if (!think.isEmpty(get_price_format(v.price, 2))) {
              v.price2 = get_price_format(v.price, 2);
            }
            v.price = get_price_format(v.price, 1);
          }
          v.uid = await get_nickname(v.uid);
          v.url = get_url(v.name, v.id);
          v.update_time = this.moment(v.update_time).fromNow();
        }
        return this.json(data);
      }
      return this.display(this.mtpl());
    } else {
      // debugger;
      // console.log(think.datetime(new Date(), "YYYY-MM-DD"));
      await this.hook('homeEnd');
      return this.display();
    }
  }

};
