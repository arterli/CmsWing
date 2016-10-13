'use strict';

import Base from '../../topic/controller/base.js';

export default class extends Base {
  init(http) {
    super.init(http);
  }

    /**
     * 模型公共参数
     * @private
     */
    async __before() {
        await super.__before();//继承父类before
       if(this.get('category').split("-")[0]||this.get("cid")){
           //获取当前模型栏目id
           this.m_cate= await this.category(this.get('category').split("-")[0]||this.get("cid"));

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
      let cxt  = think.require("mod/controller/"+this.mod.name+"/index");
      let cc =new cxt(this.http)
      await this.action(cc,"index")
    }
    catch (err)
    {
      //console.log(err);
        think.log(err.message,'ERROR');
      this.assign("err",err);
      return this.action("index","moderror");
    }
  }

  /**
   * 列表入口
   * @returns {*}
   */
  async listAction(){
    try
    {
      let cxt  = think.require("mod/controller/"+this.mod.name+"/index");
      let cc =new cxt(this.http)
      await this.action(cc,"list")
    }
    catch (err)
    {
        think.log(err.message,'ERROR');
      //console.log(err);
      this.assign("err",err);
     return this.action("index","moderror");
    }
    //
  }

  /**
   * 详情入口
   * @returns {*}
   */
  detailAction(){
    this.end(11)
    return this.display();
  }
//创建独立模型时错误提示
  moderrorAction(){

    return this.display(this.config("view.root_path")+think.sep+this.http.module+think.sep+this.http.controller+"_"+this.http.action+this.config("view.file_ext"))
  }
  //独立模型display方法封装
  modtemp(mod,moblie=false){
    if(!moblie){
      return this.display(think.ROOT_PATH+think.sep+"view"+think.sep+"mod"+think.sep+mod+think.sep+this.http.controller+"_"+this.http.action+this.config("view.file_ext"));
    }else {
      return this.display(think.ROOT_PATH+think.sep+"view"+think.sep+"mod"+think.sep+mod+think.sep+moblie+think.sep+this.http.controller+"_"+this.http.action+this.config("view.file_ext"));
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
     * @returns {PreventPromise}
     */
   async c_verify(ac){
        let roleid=8;//游客
        //访问控制
        if(this.is_login){
            roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
        }
        let priv = await this.model("category_priv").priv(this.m_cate.id,roleid,ac);
        if(!priv){
            this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
            return think.statusAction(702, this.http);
        }
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
            num =this.config("db.nums_per_page");
        }
        if(checkMobile(this.userAgent())){
            num=10;
        }
        return num;
    }
}