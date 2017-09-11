// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../common/home');
module.exports = class extends Home {
  /**
     * 解析路由，判断是频道页面还是列表页面
     */
  async indexAction() {
    const cate = await this.category(this.get('category').split('-')[0]);
    if (think.isEmpty(cate)) {
      return cate;
    }
    let type = cate.allow_publish;
    if (Number(cate.mold) === 2) {
      type = 'sp';
    }

    switch (type) {
      case 0:
        if (Number(cate.mold) === 1) {
          await this.action('mod/index', 'index');
        } else {
          await this.action('home/cover', 'index');
        }
        break;
      case 1:
      case 2:
        if (Number(cate.mold) === 1) {
          await this.action('mod/index', 'list');
        } else {
          await this.action('home/list', 'index');
        }
        break;
      case 'sp':
        await this.action('home/sp', 'index');
        break;
      default:
        return this.body = 'haha';
    }
    // this.end(cate.allow_publish)
    // 获取当前栏目的模型
    // let models = await this.model("category",{},'admin').get_category(cate.id, 'model');
  }
};
