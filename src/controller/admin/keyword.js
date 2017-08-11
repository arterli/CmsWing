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
    this.tactive = "article";

  }
  /** 话题控制器
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //搜索
    let map = {};
    if(this.get("keyname")){
      map.keyname=["like","%"+this.get("keyname")+"%"]
    }
     if(this.get("type")=='parent'){
        map.is_parent=1;
     }
      let list = await this.model("keyword").where(map).order('add_time DESC').page(this.get("page")||1,20).countSelect();
    for (let v of list.data){
      v.lastuser = await this.model("keyword_data").where({tagid:v.id}).order("add_time DESC").getField("uid",true);
    }
      let html = this.pagination(list);
    this.assign('list', list);
    this.assign('pagerData', html); //分页展示使用
    this.meta_title="话题管理";
    //auto render template file index_index.html
    return this.display();
  }

    /**
     * 添加话题
     */
  async addAction(){
    if(this.isPost){
     let data = this.post();
        data.pic = data.pic||0;
        data.pid = (data.is_parent==1)?0:data.pid;
        data.add_time = new Date().getTime();
        let isadd = await this.model("keyword").where({keyname:data.keyname}).find();
        //console.log(data);
        if(!think.isEmpty(isadd)){
          return this.fail("已经存在相同的话题");
        }
        let res = this.model("keyword").add(data);
        if(res){
          return this.success({name:"添加成功！",url:"/admin/keyword/index"})
        }else {
          return this.fail("添加失败！")
        }
    }else {
      this.meta_title="新增话题";
      this.active ='admin/keyword/index';
      let parent = await this.model("keyword").where({is_parent:1}).select();
      this.assign("parent",parent);
     return this.display();
    }
  }

    /**
     * 编辑话题
     */
  async editAction(){
      if(this.isPost){
       let data = this.post();
          data.pic = data.pic||0;
          data.pid = (data.is_parent==1)?0:data.pid;
          data.discuss_count_update=new Date().getTime();
          console.log(data);
          let res = this.model("keyword").update(data)
          if(res){
              return this.success({name:"修改成功！",url:"/admin/keyword/index"})
          }else {
              return this.fail("修改失败！")
          }
      }else {
          let id = this.get("id");
          this.meta_title="编辑话题";
          this.active ='admin/keyword/index';
          let info = await this.model("keyword").find(id);
          let parent = await this.model("keyword").where({is_parent:1}).select();
          this.assign("parent",parent);
          this.assign("info",info);
          return this.display();
      }


  }
    /**
     * 删除话题
     */
  async delAction(){
      let ids = this.para("ids");
      if(think.isEmpty(ids)){
          return this.fail("参数不能为空!")
      }
      //删除话题
      await this.model("keyword").where({id:["IN",ids]}).delete();
      //清除相关数据
      await this.model("keyword_data").where({tagid:["IN",ids]}).delete();
      await this.model("keyword_focus").where({key_id:["IN",ids]}).delete();
      return this.success({name:"删除成功!"})
  }
  //锁定话题
  async lockAction(){
    let ids = this.para("ids");
    let lock = this.get("lock");
    let up = await this.model("keyword").where({id:["IN",ids]}).update({lock:lock});
    if(up){
      return this.success({name:"操作成功!"});
    }else {
      return this.fail("操作失败!")
    }
  }
}