'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.tactive = "article"
  }

  /**
   * __before action
   * @private
     */
  async __before() {
   await super.__before();
   let typeoption = await this.model("typeoption").where({classid:0}).select();
    this.assign("typeoption",typeoption);
  }
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction(){
    //auto render template file index_index.html
    let type = this.model("type");
    let list = await type.order('displayorder ASC,typeid DESC').select();
    //console.log(list);
    this.assign("list",list);
    this.meta_title="分类管理"
    return this.display();
  }
    //分类信息设置
 async typeviewAction(){
     let id = this.get("typeid");
     let info = await this.model('type').find({typeid:id});
     this.active="admin/type/index"
     console.log(info);
     this.meta_title=`${info.name}-分类设置`
  return this.display();
 }
  /**
   * topic action
   *
   */
  topicAction(){
    return this.display();
  }

  /**
   * type Action
   */
  typeAction(){
    return this.display();
  }

  /**
   * 更新/修改数据
   */
 async updateAction(){
   let data = this.post("data");
      data = JSON.parse(data);
      console.log(data);
      for(let val of data){
          //添加
          if(val.isdel==0 && val.name != 0 && val.typeid ==0){//添加
             this.model('type').add(val);
          }else if(val.isdel==0 && val.name != 0 && val.typeid !=0){//更新
              this.model('type').update(val,{typeid:val.typeid});
          }else if(val.isdel == 1){
              this.model('type').delete({
                  where: {typeid: val.typeid}
              })
          }
      }

      //todo
      return this.success({name:"操作成功"})
  }
}
