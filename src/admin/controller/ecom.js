'use strict';

import Base from './base.js';

export default class extends Base {
    //支付与配送控制区
     init(http){
        super.init(http);
        this.tactive = "ecom"
    }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  /**
   * 正在使用的支付方式
   */
 async paymentAction(){
    this.meta_title="正在使用的支付方式";
    let data = await this.model("payment").page(this.get('page')).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        for(let val of data.data){
           val.logo =  await this.model("pay_plugin").where({id:val.plugin_id}).getField("logo",true);
        }
        this.assign('pagerData', page); //分页展示使用
        this.assign('list', data.data);
       return this.display();
  }
  /**编辑支付方式 */
 async editpayAction(){
     if(this.isAjax("POST")){
         let data = this.post();
        let res = await this.model("payment").update(data);
        if(res){
            return this.success({name:'编辑支付方式成功！',url: "/admin/ecom/payment"});
        }else{
            return this.fail( '编辑支付方式失败！');
            
        }
     }else{
           let id = this.get("id");
    let info = await this.model("payment").find(id);
    this.assign("info",info);
    this.meta_title = "配置支付方式";
    return this.display();
     }
  }
   /**添加支付方式 */
 async addpayAction(){
    if(this.isAjax("POST")){
        let data = this.post();
        let res = await this.model("payment").add(data);
        if(res){
            return this.success({name:'添加支付方式成功！',url: "/admin/ecom/payment"});
        }else{
            return this.fail( '添加支付方式失败！');
            
        }
    }else{
           let id = this.get("id");
    let info = await this.model("pay_plugin").find(id);
    this.assign("info",info);
    this.meta_title = "添加支付方式";
   return this.display();
    }
 
  }
  /**删除正在使用的支付方式 */
  async delpayAction(){
      let id = this.get("id");
      let res = await this.model("payment").where({id:id}).delete();
      if(!think.isEmpty(res)){
        return this.success({name:'删除成功！'});
          
      }else{
          return this.fail('删除失败！'); 
          
      }
  }
  
  /**支付插件 */
  
  async paypluginAction(){
    this.meta_title="全部支付方式";
    // this.end(11);
     this.active = "admin/ecom/payment";
     let data = await this.model("pay_plugin").page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(); //实例化 Adapter
     let page = pages.pages(data); 
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', data.data);
    return this.display(); 
  }
  /**运费模板 */
  fareAction(){
      this.meta_title="运费模板";
    return this.display();
  }
  /**快递公司管理 */
  expressAction(){
      this.meta_title="快递公司管理";
    return this.display();
  }
  
  /**
     * 设置一条或者多条数据的状态
     */
    async setstatusAction() {
        let table = this.get("table");
        await super.setstatusAction(this,table);
    }
    
}