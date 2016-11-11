'use strict';
import Base from '../../admin/controller/base.js';
export default class extends Base {
  /**
   * some base method in here
   */
  async __before(){
    await  super.__before();
    this.tactive = "ext";
    this.active ='admin/ext/index';
    this.ext = await this.model("ext").where({ext:this.http.controller.split("/")[0]}).find();
    console.log(this.ext);
    this.meta_title = this.ext.name+"管理";
  }
}