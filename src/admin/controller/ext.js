'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.db = this.model('ext');
    this.tactive = "ext"
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    let data = await this.db.page(this.get('page')).countSelect();
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(this.http); //实例化 Adapter
    let page = pages.pages(data);
    this.assign('pagerData', page); //分页展示使用
    this.assign('list', data.data);
    this.meta_title = "插件管理";
    return this.display();
  }

    /**
     * 添加插件
     * @returns {*}
     */
  async addAction(){
        if(this.isPost()){
            let data = this.post();
            data.setting="{}";
            if(think.isEmpty(data.installtime)){
             data.installtime = new Date().getTime();
            }else {
                data.installtime = new Date(data.installtime).valueOf();
            }
            if(think.isEmpty(data.updatetime)){
                data.updatetime = new Date().getTime();
            }else {
                data.updatetime = new Date(data.updatetime).valueOf();
            }
            let res = await this.model("ext").add(data);
            if(res){
                return this.success({name:"添加插件成功！",url:"/admin/ext/index"})
            }else {
                return this.fail("添加失败！")
            }
        }else {
            this.active="admin/ext/index"
            this.meta_title = "新增插件";
            return this.display()
        }

  }

    /**
     * 更新插件
     * @returns {*}
     */
  async editAction(){
      if(this.isPost()){
          let data = this.post();
          data.setting="{}";
          if(think.isEmpty(data.updatetime)){
              data.updatetime = new Date().getTime();
          }else {
              data.updatetime = new Date(data.updatetime).getTime();
          }
          let res = await this.model("ext").where({ext:data.ext}).update(data);
          if(res){
              return this.success({name:"更新插件成功！"})
          }else {
              return this.fail("更新失败！")
          }
      }else {
          let ids = this.get("ids");
          let info = await this.model("ext").where({ext:ids}).find();
          this.assign("info",info);
          this.meta_title = "更新插件";
          return this.display()
      }
  }
    /**
     * 验证同一张表是否存在相同的子段值
     * @returns {*}
     */
  async checkextAction(){
      let get = this.get();
      // let key = think._.keys(get)[0];
      // let val = get[key];
      let res = await this.model("ext").where(get).count("ext");
      if(res){
          return this.json(0);
      }else {
          return this.json(1);
      }
  }
}