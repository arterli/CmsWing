// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.admin {
  async indexAction() {
    // auto render template file index_index.html
    // console.log(think.parseConfig(true,think.config("db")).prefix);
    // await this.model("action").log("testaction","member","sdffds",this.user.uid,this.ip,this.ctx.url);//测试日志行为
    // console.log(think.config('model.mysql.prefix'));
    // let pa = JSON.parse(fs.readFileSync(think.ROOT_PATH+"/package.json",'utf-8'));
    // console.log(cmswing);
    // console.log(this.config('setup.WEB_SITE_TITLE'));
    // console.log(process);
    // 服务器信息
    this.meta_title = '首页';
    // console.log(111)
    // 钩子
    await this.hook('AdminIndex');
    return this.display();
  }
};
