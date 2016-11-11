'use strict';
/**
 * 插件后台控制器
 * 如果插件有后台管理业务写在这个控制器里面
 */
import Base from '../admin.js';

export default class extends Base {
  /**
   * index action
   * 插件管理入口
   * 友情链接管理列表
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html

    return this.display();
  }

  /**
   *  插件配置管理。
   */
  settingAction(){
    return this.display();
  }

  /**
   * 插件分类管理
   * @returns {*}
   */
  typeAction(){
    return this.display();
  }
  /**
   *  友情链接审核申请
   * @returns {*}
   */
  applyAction(){
    return this.display();
  }

}