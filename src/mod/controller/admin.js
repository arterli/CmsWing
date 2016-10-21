'use strict';
import Base from '../../admin/controller/base.js';
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
    if(this.get('cate_id')){
      //获取当前模型栏目id
      this.m_cate= await this.category(this.get('cate_id'));

      //当前模型信息
      this.mod = await this.model("model").get_model(this.m_cate.model);
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
      let cxt  = think.require("mod/controller/"+this.mod.name+"/admin");
      let cc =new cxt(this.http)
      await this.action(cc,"index")
    }
    catch (err)
    {
      think.log(err.message,'ERROR');
      this.assign("err",err);
      return this.action("index","moderror");
    }
  }


  //获取分类信息
  async category(id, field) {
    id = id || 0;
    field = field || "";
    if (think.isEmpty(id)) {
      //this.fail('没有指定数据分类！');
      this.http.error = new Error('没有指定数据分类！');
      return think.statusAction(702, this.http);
    }
    let cate = await this.model("category").info(id, field);
    //console.log(cate);
    if (cate && 1 == cate.status) {

      switch (cate.display) {
        case 0:
          //this.fail('该分类禁止显示')
          this.http.error = new Error('该分类禁止显示！');
          return think.statusAction(702, this.http);
          break;
          //TODO:更多分类显示状态判断
        default:

          return cate;
      }

    } else {

      //this.fail("分类不存在或者被禁用！");
      this.http.error = new Error('分类不存在或者被禁用！');
      return think.statusAction(702, this.http);
    }
  }

  //独立模型display方法封装
  modtemp(mod,moblie=false){
    let ctr = (this.http.controller).split("/");
    if(!moblie){
      if(ctr[1]){
        return this.display();
      }else {
        return this.display(think.ROOT_PATH+think.sep+"view"+think.sep+"mod"+think.sep+mod+think.sep+this.http.controller+"_"+this.http.action+this.config("view.file_ext"));
      }

    }else {
      if(ctr[1]){
        return this.display(think.ROOT_PATH+think.sep+"view"+think.sep+"mod"+think.sep+ctr[0]+think.sep+moblie+think.sep+ctr[1]+"_"+this.http.action+this.config("view.file_ext"));
      }else {
        return this.display(think.ROOT_PATH+think.sep+"view"+think.sep+"mod"+think.sep+mod+think.sep+moblie+think.sep+this.http.controller+"_"+this.http.action+this.config("view.file_ext"));
      }
    }
  }
}