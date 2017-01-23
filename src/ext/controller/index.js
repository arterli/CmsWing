'use strict';

import Base from '../../topic/controller/base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async __before(){
    await  super.__before();
    this.ext = await this.model("ext").where({ext:this.http.controller.split("/")[0]}).find();
    //console.log(this.ext);
    this.meta_title = this.ext.name;
    //获取插件配置
    if(!think.isEmpty(this.ext.setting)){
      this.setting = JSON.parse(this.ext.setting)
    }else {
      this.setting = {}
    }
  }
  /**
   * 获取当前插件分类
   * @returns {*}
   */
  async gettype(){
    let data = await this.model("ext_type").where({ext:this.ext.ext}).order("sort ASC").select();
    return data;
  }
}