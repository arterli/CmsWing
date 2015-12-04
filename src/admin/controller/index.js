'use strict';

import Base from './base.js';
import Os from 'os';
/**
 * 后台首页控制器
 * @author 阿特 <arterli@qq.com>
 * http://www.cmswing.com
 */
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    this.meta_title=this.locale('meta_title_admin');
    let node = process.versions;
    this.assign({
      'version':think.CMSWING_VERSION,
      'OS':Os.type(),
      'nodejs_v':node.node
    })
    //console.log()
    return this.display();
  }
}
