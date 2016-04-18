// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
  }

  async __before() {
      await this.action("wechat", "oauth");
      //网站配置
      this.setup = await this.model("setup").getset();
      //当前登录状态
      this.is_login = await this.islogin();
       //用户信息
      this.user = await this.session('webuser');
      console.log(this.user);

      //获取当前分类信息
      //console.log(action);
      // this.meta_title = cate.meta_title?cate.meta_title:cate.title;
      //设置主题
      //this.http.theme("default);
      //购物车
      let cartList = await this.shopCart();
      let cartInfo;
      if(think.isEmpty(cartList)){
           cartInfo = {
          total:0,
          num:0,
          data:null
         }
         
      }else{
          
          let total = [];
          let num = [];
          for(let val of cartList){
              total.push(val.price);
              num.push(val.qty);
              //判断是否有库存
              let stock = await this.model("order").getstock(val.product_id,val.type);

              if(val.qty > stock){
                 val.stock = 0;
              }else {
                  val.stock =stock;
              }
          }
         cartInfo = {
          total:eval(total.join('+')),
          num:eval(num.join('+')),
          data:cartList
         }
      }
      this.cart = cartInfo;
      
    }
    /**
     * 判断是否登录
     * @returns {boolean}
     */
    async islogin() {
        //前台判断是否登录
        let user = await this.session('webuser');
        let res = think.isEmpty(user) ? false : user.uid;
        return res;

    }
    async weblogin(){
        let islogin =await this.islogin();
        if(!islogin){
            //判断浏览客户端
            if (checkMobile(this.userAgent())) {
                //手机端直接跳转到登录页面
                this.redirect('/user/login')
            } else {
                //pc端跳转到错误页面
                return think.statusAction(1000,this.http);
            }

        }
    }
    
    //获取分类信息
  async category(id, field) {
    id = id || 0;
    field = field || "";
    if (think.isEmpty(id)) {
      this.fail('没有指定数据分类！');
    }
    let cate = await this.model("category").info(id, field);

    if (cate && 1 == cate.status) {

      switch (cate.display) {
        case 0:
          this.fail('该分类禁止显示')
          break;
          //TODO:更多分类显示状态判断
        default:

          return cate;
      }

    } else {
      this.fail("分类不存在或者被禁用！");
    }
  }
    //购物车
    async shopCart(){
        let cartdata =null;
        if(this.is_login){
            let loadata = await this.session("cart_goods_item");
            if(think.isEmpty(loadata)){
                cartdata = await this.model('cart').where({uid:this.user.uid}).select();
            }else{
                //loadata = JSON.parse(loadata);
                for(let val of loadata){
                    val.uid = this.user.uid;
                    //验证原有的数据是否已经存在
                    let res = await this.model('cart').where({product_id: val.product_id, type:val.type,uid:this.user.uid}).select();
                    //console.log(res);
                    if(!think.isEmpty(res)){
                        val.qty =Number(val.qty)+Number(res[0].qty);
                        val.id = res[0].id;
                        await this.model('cart').update(val);
                    }else{
                        await this.model('cart').add(val);
                    }

                }
                await this.session("cart_goods_item",null);
                cartdata = await this.model('cart').where({uid:this.user.uid}).select();
            }
        }else{
            cartdata =await this.session("cart_goods_item");
            // if(cartdata){
            // cartdata = JSON.parse(cartdata);
            // }
        }
       //console.log(cartdata);
        return cartdata;
    }
}
