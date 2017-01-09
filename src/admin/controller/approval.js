'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.db = this.model("approval");
    this.tactive = "approval";
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
      let map = {};
      if(!think.isEmpty(this.get("model"))){
          map.model = this.get("model");
      }
      let list = await this.db.where(map).page(this.get('page'),20).order('time DESC').countSelect();
      let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
      let pages = new Pages(this.http); //实例化 Adapter
      let page = pages.pages(list);
      this.assign('pagerData', page); //分页展示使用
      this.assign('list', list);
      let modlist = await this.model("model").get_model(null,null,{is_approval:1});
      for(let val of modlist){
          val.count = await this.db.where({model:val.id}).count();
      }
      console.log(modlist);
      this.assign("model",modlist);
      this.assign("count",await this.db.count())
      this.meta_title = "内容审核";
    return this.display();
  }

    /**
     * 查看详情
     */
    async detailsAction(){
        let id = this.get("id");
        let details = await this.db.find(id);
        let info = JSON.parse(details.data);
        console.log(info);
        this.assign("info",info)
        this.meta_title = "查看详情";
        return this.display();
    }

    /**
     * 通过审核
     */
    async adoptaAction(){
    let ids = this.param("ids");
    if(think.isEmpty(ids)){
        return this.fail("参数错误！");
    }
    let datalist = await this.db.where({id:["IN",ids]}).select();
        console.log(datalist);
        for(let v of datalist){
            let table = await this.model("model").get_table_name(v.model,true);
            let res = null;
            switch (table.extend){
                case 0:
                    console.log(table);
                     res = await this.model("mod/"+table.table).updates(JSON.parse(v.data),v.time);
                    if (res) {
                            //添加操作日志，可根据需求后台设置日志类型。
                            await this.model("action").log("addquestion", "question", res.id, res.data.uid, this.ip(), this.http.url);
                             //审核成功后删掉审核表中内容
                            await this.db.where({id:v.id}).delete();
                            return this.success({name: "审核成功"});
                    } else {
                        return this.fail("操作失败！");
                    }
                    break;
                case 1:
                    //todo
                     res = await this.model("document").updates(JSON.parse(v.data),v.time);
                    if (res) {
                        //添加操作日志，可根据需求后台设置日志类型。
                       // await this.model("action").log("addquestion", "question", res.id, res.data.uid, this.ip(), this.http.url);
                        //审核成功后删掉审核表中内容
                        await this.db.where({id:v.id}).delete();
                        return this.success({name: "审核成功"});
                    } else {
                        return this.fail("操作失败！");
                    }
                    break;
            }
        }
    }

    /**
     * 拒绝审核
     */
    async refuseAction(){
        let ids = this.param("ids");
        if(think.isEmpty(ids)){
            return this.fail("参数错误！");
        }
        let res = await this.db.where({id:["IN",ids]}).delete();
        if(res){
            return this.success({name:"操作成功！"})
        }else {
            return this.fail("操作失败！")
        }
    }
}