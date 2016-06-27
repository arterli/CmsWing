'use strict';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.tactive = "article"
  }

  /**
   * __before action
   * @private
     */
  async __before() {
   await super.__before();
   let typeoption = await this.model("typeoption").where({classid:0}).select();
    this.assign("typeoption",typeoption);
  }
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction(){
    //auto render template file index_index.html
    let type = this.model("type");
    let list = await type.order('displayorder ASC,typeid DESC').select();
    //console.log(list);
    this.assign("list",list);
    this.meta_title="分类管理"
    return this.display();
  }
    //分类信息设置
 async typeviewAction(){
     let id = this.get("typeid");
     let info = await this.model('type').find({where:{typeid:id}});
     let typeoption = await this.model('typeoption').where({classid:0}).select();
     let option = await this.model('typeoption').where({classid:['!=',0]}).select();
     for (let val of option){
         let sortid = await this.model('typevar').where({optionid:val.optionid}).getField('sortid');
         val.sortid = sortid;
     }
     let typevar = await this.model('typevar').join({
         typeoption:{
             on:['optionid','optionid']
         }
     }).where({sortid:id}).select();
     this.active="admin/type/index"
     console.log(typevar);
     this.assign({
         info:info,
         typeoption:typeoption,
         option:option,
         typevar:typevar
     })
     this.meta_title=`${info.name}-分类设置`
  return this.display();
 }
    async updatetypevarAction(){
        let data = this.post('data');
        data = JSON.parse(data);
       let del= await this.model('typevar').delete({
            where: {sortid: data.id}
        });


           let add= await this.model('typevar').addMany (data.datarr);

if(!think.isEmpty(add)){
    return this.success({name:"操作成功"})
}
    }
  /**
   * topic action
   *
   */
  topicAction(){
    return this.display();
  }

  /**
   * type Action
   */
  async typeoptionAction(){
    let optionid = this.get("classid");
      let option = await this.model('typeoption').find({where:{optionid:optionid}});
      let optionlist = await this.model('typeoption').where({classid:optionid}).select();
      console.log(option);
      this.assign({
          option:option,
          optionlist:optionlist
      })
      this.meta_title=option.title;
      this.active="admin/type/index";
      return this.display();
  }
    async updatetypeoptionAction(){
     let data = this.post("data");
        data =JSON.parse(data);
     console.log(data)
        for(let val of data){
            //添加
            if(val.isdel==0 && val.title != 0 && val.optionid ==0){//添加
                this.model('typeoption').add(val);
            }else if(val.isdel==0 && val.title != 0 && val.optionid !=0){//更新
                this.model('typeoption').update(val,{optionid:val.optionid});
            }else if(val.isdel == 1){
                this.model('typeoption').delete({
                    where: {optionid: val.optionid}
                })
            }
        }
        return this.success({name:"操作成功"})
 }
  /**
   * 更新/修改数据
   */
 async updateAction(){
   let data = this.post("data");
      data = JSON.parse(data);
      console.log(data);
      for(let val of data){
          //添加
          if(val.isdel==0 && val.name != 0 && val.typeid ==0){//添加
             this.model('type').add(val);
          }else if(val.isdel==0 && val.name != 0 && val.typeid !=0){//更新
              this.model('type').update(val,{typeid:val.typeid});
          }else if(val.isdel == 1){
              this.model('type').delete({
                  where: {typeid: val.typeid}
              })
          }
      }

      //todo
      return this.success({name:"操作成功"})
  }
}
