// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
import {type} from 'os';
/**
 * 后台首页控制器
 * @author 阿特 <arterli@qq.com>
 * http://www.cmswing.com
 */
export default class extends Base {
  init(http){
    super.init(http);

  }
  /**
   * index action
   * @return {Promise} []
   */

  async indexAction(){
    //auto render template file index_index.html
    console.log(think.parseConfig(true,think.config("db")).prefix);
    await this.model("action").log("chufa","member","sdffds",this.user.uid,this.ip(),this.http.url);//测试日志行为
    this.meta_title=this.locale('meta_title_admin');
    let mysqlv=await this.model('mysql').query("select version()");
    let node = process.versions;
    this.assign({
      'version':think.CMSWING_VERSION,
      'OS':type(),
      'nodejs_v':node.node,
      'thinkjs':think.version,
      'mysqlv':mysqlv[0]['version()']
    })
    //console.log(111)
    return this.display();
  }
}
