'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  //购物车展示
  indexAction(){
    //auto render template file index_index.html
    this.meta_title = "购物车";//标题1
    this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
    this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
    //console.log(checkMobile(this.userAgent()));
    return this.display();
  }
  //添加购物车
  async addcartAction(){
      let data = this.post();
      data = think.extend({},data);
      let arr=[];
      let cart = this.cartdata;
      if(think.isEmpty(cart)){
         arr.push(data);
      }else{
          //cart = JSON.parse(cart);
          //console.log(cart);
          let typearr = []
          //已有购物车数量相加
         for(let item of cart){
             if(item.type == data.type){
                item.qty = Number(item.qty) + Number(data.qty);
             }
             arr.push(item);
             typearr.push(item.type);  
         }
         //没有直接添加商品
          if(!in_array(data.type,typearr)){
              arr.splice(0, 0,data);
          };
      }
      console.log(arr);
      
      //获取商品详细信息
      //{total:222,data:[{title:"dfd",price:34,pic:2,}]}
       //arr.push(data);
       let dataarr = [];
       let total = [];
       let num = [];
       for(let val of arr){
           let dataobj = {}
          let goods = await this.model('document').find(val.product_id);
          let table = await this.model('model',{},'admin').get_table_name(goods.model_id);
          let info = await this.model(table).find(val.product_id);
          goods = think.extend(goods,info);
          dataobj.title=goods.title;
         //console.log(goods);
          if(think.isEmpty(goods.suk)){
            dataobj.price=get_price(goods.price,1) * Number(val.qty);
            dataobj.unit_price =get_price(goods.price,1);
          }else{
            let suk = JSON.parse(goods.suk);
            let arr_ = val.type.split(",");
            let getpr = getsuk(suk.data,arr_);
            dataobj.price = Number(getpr.sku_price) * Number(val.qty);
            dataobj.unit_price =Number(getpr.sku_price);
            //console.log(dataobj.price);   
           }
          dataobj.pic = await get_cover(goods.pics.split(",")[0],'path');
          dataobj.url = get_url(goods.name,goods.id);
          dataobj.product_id = val.product_id;
          dataobj.type = val.type;
          dataobj.qty = Number(val.qty);
          dataarr.push(dataobj);
          total.push(dataobj.price);
          num.push(dataobj.qty);
       }
        //缓存购物车
     if(this.is_login){
         await this.model('cart').where({uid:this.user.uid}).delete()
         for(let val of dataarr){
                val.uid = this.user.uid;
                this.model('cart').add(val);
            }
     }else{
       this.cookie("cart_goods_item",JSON.stringify(dataarr)); //将 cookie theme 值设置为 default  
     }
     
      let cartinfo = {
          total:eval(total.join('+')),
          num:eval(num.join('+')),
          data:dataarr
      }
    
     return this.json(cartinfo);
  }

  //获取订单信息
 async getorderinfoAction(){
      //判断是否登陆
      //!this.is_login || this.fail('您木有登陆'); 
      if(!this.is_login){
          return this.fail("你木有登录！")
      }
      this.meta_title = "确认订单信息";//标题1
    this.keywords = this.setup.WEB_SITE_KEYWORD ? this.setup.WEB_SITE_KEYWORD : '';//seo关键词
    this.description = this.setup.WEB_SITE_DESCRIPTION ? this.setup.WEB_SITE_DESCRIPTION : "";//seo描述
    
      //let cart_goods = await this.model("cart").where({uid:this.user.uid}).select();
      let cart_goods = this.cartdata;
      
      //联系人
      let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select();
      this.assign("addrlist",addrlist);
       //this.end(cart_goods);
      return this.display();
      
  }
  //获取省市三级联动
  async getareaAction(){
      
      let pid = this.get("pid");
      let area = await this.model('area').where({parent_id:pid}).select()
      return this.json(area);
  }
  
  //添加联系人地址
 async addaddrAction(){
     if(!this.is_login){
          return this.fail("你木有登录！")
      }
      
      let data = this.post();
      data.user_id = this.user.uid;
      if(data.is_default == 1){
          let find = await this.model("address").where({user_id:this.user.uid,is_default:1}).select();
          for(let val of find){
              val.is_default = 0;
              await this.model("address").update(val);
          }
      }
      let res =await this.model("address").add(data);
      if(res){
          let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select()
           return this.success({name:'添加收货人地址成功',data:addrlist});
      }else{
          return this.fail( '添加失败！'); 
          
      }
     
  }
  
 //联系人设置为默认
}