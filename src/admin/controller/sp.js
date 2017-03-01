'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.tactive = "article";
    this.db = this.model("category_sp");
  }
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction(){
    let cate_id = this.get('cate_id') || null;
    if(think.isEmpty(cate_id)){
      this.http.error = new Error('该栏目不存在！');
      return think.statusAction(702, this.http);
    }
      //权限验证
      await this.admin_priv("init",cate_id,"您没有权限查看本栏目！")
    let name = await this.model("category").get_category(cate_id, 'name')||cate_id;
    //获取面包屑信息
    let nav = await this.model('category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    //获取内容
    //console.log(cate_id);
    let info = await this.db.find({where:{cid:cate_id}});
    //console.log(info);
    //auto render template file index_index.html
    this.meta_title = 'PC单页内容';
    this.assign({
      "navxs": true,
      "name":name,
      "info":info
    });
    return this.display();
  }

  /**
   * index action
   * @return {Promise} []
   */
  async mobileAction(){
    let cate_id = this.get('cate_id') || null;
    if(think.isEmpty(cate_id)){
      this.http.error = new Error('该栏目不存在！');
      return think.statusAction(702, this.http);
    }
      //权限验证
      await this.admin_priv("init",cate_id,"您没有权限查看本栏目！")
    let name = await this.model("category").get_category(cate_id, 'name')||cate_id;
    //获取面包屑信息
    let nav = await this.model('category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    //auto render template file index_index.html
    let info = await this.db.find({where:{cid:cate_id}});
    this.meta_title = '手机单页内容';
    this.assign({
      "navxs": true,
      "name":name,
      "info":info
    });
    return this.display();
  }

  //编辑
  async updateAction(){
    let data = this.post();
      console.log(data);
      //权限验证
      await this.admin_priv("edit",data.cid);
      let isup = await this.db.thenAdd(data, {cid:data.cid});
    if(isup.type == 'exist'){
      await this.db.update(data, {where:{cid:data.cid}})
    }
    return this.success({name:"编辑成功！"})
  }
}