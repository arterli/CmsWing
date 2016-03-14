'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  //ajax添加tags
  async ajaxaddtagsAction(){
    let data = this.post();
    data.model_id = Number(data.model_id);
    let model= this.model("tags");
    let res = await model.where({name:data.name}).thenAdd(data);
    if(res.type == "exist"){
      await model.where({id:res.id}).increment('num');
      return this.fail("已经存在，不要重复添加，请直接选择！")
    }
    let rdata = {
      errno:0,
      id:res.id,
      name:data.name
    }
    return this.json(rdata);
  }
  async ajaxgettagsAction(){
    let map = this.get();
    let model= this.model("tags");
    let res = await model.where(map).select();
    return this.json(res);
  }
}