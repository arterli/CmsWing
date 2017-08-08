// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Admin = require('../common/admin');
 module.exports = class extends Admin {

  /**
   * 模型公共参数
   * @private
   */
  async __before() {
   await super.__before();//继承父类before
    if(this.get('cate_id')){
      //获取当前模型栏目id
      this.m_cate= await this.category(this.get('cate_id'));
      if(think.isEmpty(this.m_cate)){
          return this.m_cate;
      }
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
        return this.action('mod/'+this.mod.name+'/admin',"index")
    }
    catch (err)
    {
      think.logger.debug(err.message);
      this.assign("err",err);
        return this.action("mod/index","moderror");
    }
  }


  //获取分类信息
  async category(id, field) {
    id = id || 0;
    field = field || "";
    if (think.isEmpty(id)) {
      //this.fail('没有指定数据分类！');
      const error = this.controller('common/error');
      return error.noAction('没有指定数据分类！');
    }
    let cate = await this.model("category").info(id, field);
    //console.log(cate);
    if (cate && 1 == cate.status) {

      switch (cate.display) {
        case 0:
          //this.fail('该分类禁止显示')
            const error = this.controller('common/error');
            return error.noAction('该分类禁止显示！');
          break;
          //TODO:更多分类显示状态判断
        default:

          return cate;
      }

    } else {

      //this.fail("分类不存在或者被禁用！");
        const error = this.controller('common/error');
        return error.noAction('该分类禁止显示！');
    }
  }

     //独立模型display方法封装
     modtemp(action,moblie=false){
         console.log(this.ctx.controller);
         if(this.ctx.controller=='mod/admin'){
             if(!moblie){
                 return this.display(`mod/${this.mod.name}/admin_${action}`);
             }else {
                 console.log(`mod/${this.mod.name}/mobile/index_${action}`);
                 return this.display(`mod/${this.mod.name}/mobile/admin_${action}`);
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
}