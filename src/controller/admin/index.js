// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
const Os = require('os');
// const fs = require('fs');
module.exports = class extends Base {
    async indexAction(){
        //auto render template file index_index.html
        //console.log(think.parseConfig(true,think.config("db")).prefix);
        //await this.model("action").log("testaction","member","sdffds",this.user.uid,this.ip,this.ctx.url);//测试日志行为
        //console.log(think.config('model.mysql.prefix'));
       // let pa = JSON.parse(fs.readFileSync(think.ROOT_PATH+"/package.json",'utf-8'));

        console.log(this.config('setup.WEB_SITE_TITLE'));
        //console.log(process);

        //服务器信息
        this.meta_title='首页';
        let mysqlv=await this.model('mysql').query("select version()");
        let node = process.versions;
        this.assign({
            'version':1.1,
            'OS':Os.type(),
            'nodejs_v':node.node,
            'thinkjs':think.version,
            'mysqlv':mysqlv[0]['version()']
        })

        //用户统计
        let user_count = await this.model("member").count('id');
        //行为
        let action_count = await this.model("action").count("id");
        //栏目
        let cate_count = await this.model("category").count("id");
        //模型
        let model_count = await this.model("model").count("id");
        //插件
        let ext_count = await this.model("ext").count();
        //分类信息
        let type_count = await this.model("type").count();
        this.assign({
            user_count:user_count,
            action_count:action_count,
            cate_count:cate_count,
            model_count:model_count,
            ext_count:ext_count,
            type_count:type_count
        })
        //console.log(111)
        return this.display();
    }

}