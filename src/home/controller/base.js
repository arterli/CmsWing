'use strict';

export default class extends think.controller.base {
  init(http) {
        super.init(http);
    }

    async __before() {
        //网站配置
        this.setup = await this.model("setup").getset();
        //获取当前分类信息
       //console.log(action);
      // this.meta_title = cate.meta_title?cate.meta_title:cate.title;
    }
  //获取分类信息
  async category(id , field){
      id = id||0;
      field = field||"";
      console.log(id);
      if(think.isEmpty(id)){
           this.fail( '没有指定数据分类！');
      }
      let cate = await this.model("category").info(id,field);

      if(cate && 1 == cate.status)
         {

          switch(cate.display){
               case 0 :
               this.fail('该分类禁止显示')
               break ;
               //TODO:更多分类显示状态判断
               default :

               return cate ;
          }

      }else{
          this.fail("分类不存在或者被禁用！");
      }
  }
}
