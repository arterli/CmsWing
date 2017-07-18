// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
module.exports = class extends Base {

    constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
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
      let Page = this.service('pagination');
      let page = new Page();
      let html = page.page(list,this.ctx,{
          desc: true, //show description
          pageNum: 2,
          url: '', //page url, when not set, it will auto generated
          class: 'nomargin', //pagenation extra class
          text: {
              next: '下一页',
              prev: '上一页',
              total: '总数: ${count} , 页数: ${pages}'
          }
      });
      this.assign('pagerData', html); //分页展示使用
      this.assign('list', list);
      let modlist = await this.model("model").get_model(null,null,{is_approval:1});
      for(let val of modlist){
          val.count = await this.db.where({model:val.id}).count();
      }
      //console.log(modlist);
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
        //console.log(info);
        this.assign("info",info)
        this.meta_title = "查看详情";
        return this.display();
    }

    /**
     * 通过审核
     */
    async adoptaAction(){
    let ids = this.para("ids");
    if(think.isEmpty(ids)){
        return this.fail("参数错误！");
    }
    let datalist = await this.db.where({id:["IN",ids]}).select();
        //console.log(datalist);
        for(let v of datalist){
            let table = await this.model("model").get_table_name(v.model,true);
            let res = null;
            switch (table.extend){
                case 0:
                    //console.log(table);
                     res = await this.model(table.table).updates(JSON.parse(v.data),v.time);
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

        let ids = this.para("ids");
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