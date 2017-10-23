// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const path = require('path');
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
  async unallcacheAction(){
    // const model = ['category', 'channel', 'model','ext','hooks'];
    // for (const m of model){
    //  await update_cache(m)
    // }
    think.rmdir(path.join(think.ROOT_PATH, 'runtime/cache'), true).then(()=>{
      console.log('删除完成')
    });
    process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
    return this.success({name:'更新全站缓存成功!'});
  }
};
