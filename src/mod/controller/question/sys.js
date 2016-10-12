'use strict';
import Base from '../index.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
  indexAction(){
    //console.log(this);
    //auto render template file index_index.html

   return this.display();
  }

  async addAction(){
      //前台登录验证
      await this.weblogin();
      let cid = this.get("cid");
      //获取面包屑信息
      let breadcrumb = await this.model('category').get_parent_category(cid,true);
      this.assign('breadcrumb', breadcrumb);
      console.log(breadcrumb)
      this.assign('category', this.m_cate);
      this.meta_title = "发布";
      return this.display();
  }
  async testAction(){
      return this.display();
  }
  //添加或编辑主题
  async updateAction(){
      //前台登录验证
      await this.weblogin();

      let data = this.post();
      data.uid = this.user.uid;
      data.ip = _ip2int(this.ip());
      data.anonymous = data.anonymous||1;
      console.log(data);
      // return this.fail(data);
      let res = await this.model('question').updates(data);
      if (res) {
          //行为记录
          if (!res.data.id) {
              //添加操作日志，可根据需求后台设置日志类型。
              //await this.model("action").log("add_document", "document", res.id, this.user.uid, this.ip(), this.http.url);

              this.success({name: "添加成功", url: data.backurl});
          } else {
              this.success({name: "更新成功", url: data.backurl});
          }

      } else {
          this.fail("操作失败！");
      }

  }

}