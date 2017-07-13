// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../common/home');
module.exports = class extends Home{
    /**
     * index action
     * @return {Promise} []
     */
    //频道页
    async indexAction() {

        //网站配置
        this.setup = await this.model("setup").getset();
        // console.log(this.setup);
        //当前登录状态
        this.is_login = await this.islogin();
        //console.log(this.is_login);
        //关闭站点
        if(this.setup.WEB_SITE_CLOSE==0){
            let isshow = await this.session('userInfo');
            if (think.isEmpty(isshow)){
                this.http.error = new Error('该网站已关闭，只有管理员可以正常访问');
                return think.statusAction(404, this.http);
            }
        }
        //用户信息
        this.user = {};
        this.user.roleid=8;//游客
        //访问控制
        if(this.is_login){
            this.user.roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
        }
        this.user = think.extend(this.user,await this.session('webuser'));
        //获取当前分类信息
        //console.log(action);
        // this.meta_title = cate.meta_title?cate.meta_title:cate.title;
        //设置主题
        //this.http.theme("default);
        //购物车
        //关闭商品模型时同时关闭购物车
        if(!think.isEmpty(await this.model('model').get_model(4)) && this.ctx.action != "avatar" ){
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

        //auto render template file index_index.html
        let get = this.get('category') || 0;
        let id=0;
        if(get != 0){
            id = get.split("-")[0];
        }

        let cate = await this.category(id);
        cate = think.extend({}, cate);

        //console.log(cate);
        let roleid=8;//游客
        //访问控制
        if(this.is_login){
            roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
        }
        let priv = await this.model("category_priv").priv(cate.id,roleid,'visit');
        if(!priv){
            this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
            return think.statusAction(702, this.http);
        }
        this.meta_title = cate.meta_title ? cate.meta_title : cate.title; //标题
        this.keywords = cate.keywords ? cate.keywords : ''; //seo关键词
        this.description = cate.description ? cate.description : ""; //seo描述
        //频道页只显示模板，默认不读取任何内容
        //内容可以通过模板标签自行定制
        //获取面包屑信息
        let breadcrumb = await this.model('category').get_parent_category(cate.id,true);
        this.assign('breadcrumb', breadcrumb);
        /* 模板赋值并渲染模板 */
        this.assign('category', cate);
        let temp = cate.template_index ? `${cate.template_index}` : `index`;

        //判断浏览客户端
        if(checkMobile(this.ctx.userAgent)){
            temp = cate.template_m_index ? `${cate.template_m_index}` : `index`
            return this.display(`mobile/${this.http.controller}/${temp}`)
        }else{
            return this.display("home/cover_"+temp);
        }
    }

}