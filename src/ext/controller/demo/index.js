'use strict';
/**
 * 插件前台控制器
 * 如果插件有前台展示业务，写在这个控制器里面
 * 插件如需建立表务必遵循下面格式：
 * 单表：表前缀_ext_插件目录名
 * 多表：表前缀_ext_插件目录名，表前缀_ext_插件目录名_分表1，表前缀_ext_插件目录名_分表2...
 */
import Base from '../index.js';
export default class extends Base {
  /**
   * index action
   *
   * @return {Promise} []
   */
  async indexAction(){
    //获取插件目录名
    //this.ext.ext;
    //获取当前分类
      //await this.gettype()
    //获取友情链接
   //渲染模版
    return this.display();
  }
}