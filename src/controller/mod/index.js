// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Index = require('../common/home');
module.exports = class extends Index {

    /**
     * 模型公共参数
     * @private
     */
    async __before() {
        await super.__before();//继承父类before
        let getCategory = this.get('category')?this.get('category').split("-")[0]:false;
        if(this.get('category')||this.get("cid")){
           //获取当前模型栏目id
           this.m_cate= await this.category(getCategory||this.get("cid"));

           //当前模型信息
           this.mod = await this.model("model").get_model(this.m_cate.model);

           //seo
           this.meta_title = this.m_cate.meta_title ? this.m_cate.meta_title : this.m_cate.title; //标题
           this.keywords = this.m_cate.keywords ? this.m_cate.keywords : ''; //seo关键词
           this.description = this.m_cate.description ? this.m_cate.description : ""; //seo描述
       }

    }
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
 async indexAction(){
    try
    {
        await this.action('mod/'+this.mod.name+'/index',"index")
    }
    catch (err)
    {
      this.assign("err",err);
      return this.action("mod/index","moderror");
    }
  }

  /**
   * 列表入口
   * @returns {*}
   */
  async listAction(){
    try
    {
        await this.action('mod/'+this.mod.name+'/index',"list")
    }
    catch (err)
    {
        this.assign("err",err);
     return this.action("mod/index","moderror");
    }
    //
  }


//创建独立模型时错误提示
  moderrorAction(){

    return this.display('common/moderror')
  }
  //独立模型display方法封装
  modtemp(action,moblie=false){
     // console.log(this.ctx.controller);
    if(this.ctx.controller=='home/route'){
      if(!moblie){
              return this.display(`mod/${this.mod.name}/index_${action}`);
    }else {
          console.log(`mod/${this.mod.name}/mobile/index_${action}`);
          return this.display(`mod/${this.mod.name}/mobile/index_${action}`);
    }
    }else{

        let c = this.ctx.controller.split('/');
        c.splice((this.ctx.controller.split('/').length-1),0,'mobile');
        if(action === "m"||moblie){
            return this.display(`${c.join("/")}_${this.ctx.action}`);
        }else {
            return this.display();
        }
    }
  }
  //独立模型get方法封装,只针对index入口action,其他的请用 this.get()方法。
  modget(n){
    let get = this.get('category') || 0;
    let query = get.split("-");
    return query[n]
  }

    /**
     * 前台用户组栏目权限验证方法
     * await this.c_verify("visit") 访问验证
     * await this.c_verify("add") 投稿验证
     * await this.c_verify("edit") 前台编辑控制
     * @returns {PreventPromise}
     */
   async c_verify(ac,cid=this.m_cate.id,info='您所在的用户组,禁止访问本栏目！'){
        let roleid=8;//游客
        //访问控制
        if(this.is_login){
            roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
        }
        let priv = await this.model("category_priv").priv(cid,roleid,ac);
        // if(!priv){
        //     // this.http.error = new Error(info);
        //     // return think.statusAction(702, this.http);
        //     //return this.body="ddd"
        //     const error = this.controller('common/error');
        //     return error.noAction('您所在的用户组,禁止访问本栏目！');
        // }
        return priv;
    }

    /**
     * 当前栏目列表每页行数
     * @returns {*}
     */
     page_num(){
        let num;
        if(this.m_cate.list_row>0){
            num = this.m_cate.list_row;
        } else if(this.m_cate.model.split(",").length == 1){
            let pagenum=this.mod.list_row;
            if(pagenum !=0){
                num = pagenum;
            }
        }else {
            num =10;
        }
        if(this.isMobile){
            num=10;
        }
        return num;
    }
}