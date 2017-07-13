const Admin = require('../admin');
module.exports =  class extends Admin {
  init(http) {
    super.init(http);
    this.tactive = "article";
  }
  /**
   * 模型后台管理入口
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let cate_id = this.get('cate_id') || null;
    let group_id =  this.get('group_id') || 0;
    if(think.isEmpty(cate_id)){
      this.http.error = new Error('该栏目不存在！');
      return think.statusAction(702, this.http);
    }
    let name = await this.model("category").get_category(cate_id, 'name')||cate_id;
    //获取面包屑信息
    let nav = await this.model('category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    //获取内容
    // 构建列表数据
    let question = this.model('question');
    let map = {}
    if (cate_id) {
      //获取当前分类的所有子栏目
      let subcate = await this.model('category').get_sub_category(cate_id);
      // console.log(subcate);
      subcate.push(cate_id);
      map.category_id = ['IN', subcate];
    }
    if(group_id){
        map.group_id=group_id;
    }

    //获取分组
    let  groups = await this.model("category").get_category(cate_id, 'groups');
    if (groups) {
      groups = parse_config_attr(groups);
    }
    this.assign('groups', groups);
    //搜索
    if(this.get("title")){
      map.title=["like","%"+this.get("title")+"%"]
    }
    let list = await question.where(map).order('update_time DESC').page(this.get("page"),20).countSelect();
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(this.http); //实例化 Adapter
    let page = pages.pages(list);
    this.assign('list', list);
    this.assign('pagerData', page); //分页展示使用
    console.log(map);
    this.meta_title = this.m_cate.title;
    this.assign({
      "navxs": true,
      "name":name,
    });
      this.assign('group_id', group_id);
    return this.modtemp(this.mod.name);
  }
  //删除
  async delAction(){
    let ids = this.post("ids");
    if(think.isEmpty(ids)){
      return this.fail("至少选择一条数据！")
    }
    //删除帖子
     await this.model("question").where({id:["IN",ids]}).delete();
    //查出相关的回复id
    let qm = await this.model("question_answer").where({question_id:["IN",ids]}).getField("answer_id");
    //删除相关回复
    await this.model("question_answer").where({question_id:["IN",ids]}).delete();
    //删除相关的回复评论
    if(!think.isEmpty(qm)){
      await this.model("question_answer_comments").where({answer_id:["IN",qm]}).delete();
    }
      //console.log(ids);
      //删除搜索
     if(think.isArray(ids)){
      for(let id of ids){
          await this.model("search").delsearch(8,id);
          //删除话题
          await this.model("keyword").delkey(id,8);
      }
     }else {
         await this.model('search').delsearch(8,ids);
         //话题
         await this.model("keyword").delkey(ids,8);
     }
    //删除相关的
    return this.success({name:"删除成功！"});
  }
}