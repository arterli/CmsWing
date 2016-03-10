'use strict';

export default class extends think.controller.base {
  init(http) {
    super.init(http);
  }

  async __before() {
      //网站配置
      this.setup = await this.model("setup").getset();
      //当前登录状态
      this.is_login = await this.islogin();
       //用户信息
      this.user = await this.session('webuser');
      //console.log(this.user);

      //获取当前分类信息
      //console.log(action);
      // this.meta_title = cate.meta_title?cate.meta_title:cate.title;
      //设置主题
      //this.http.theme("default);
      //购物车
      let cartdata;
      if(this.is_login){
          let loadata = this.cookie("cart_goods_item");
         if(think.isEmpty(loadata)){
           cartdata = await this.model('cart').where({uid:this.user.uid}).select();  
         }else{
            loadata = JSON.parse(loadata); 
            for(let val of loadata){
                val.uid = this.user.uid;
                //验证原有的数据是否已经存在
                let res = await this.model('cart').where({product_id: val.product_id, type:val.type,uid:this.user.uid}).select();
                console.log(res);
                if(!think.isEmpty(res)){
                    val.qty =Number(val.qty)+Number(res[0].qty);
                    val.id = res[0].id;
                    await this.model('cart').update(val);
                }else{
                    await this.model('cart').add(val); 
                }
                
            }
           this.cookie("cart_goods_item",null);
            cartdata = await this.model('cart').where({uid:this.user.uid}).select();
         }
      }else{
          cartdata = this.cookie("cart_goods_item"); 
          if(cartdata){
          cartdata = JSON.parse(cartdata);
          }
      }
      this.cartdata = cartdata;
     
      let cartinfo;
      if(think.isEmpty(cartdata)){
           cartinfo = {
          total:0,
          num:0,
          data:null
         }
         
      }else{
          
          let total = [];
          let num = [];
          for(let val of cartdata){
              total.push(val.price);
              num.push(val.qty); 
          }
         cartinfo = {
          total:eval(total.join('+')),
          num:eval(num.join('+')),
          data:cartdata
         }
      }
      this.cart = cartinfo;
      
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
}
