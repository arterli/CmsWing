// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';

export default class extends Base {
    init(http){
        super.init(http);
        this.tactive = "order"
    }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    
    return this.display();
  }
  //订单列表
  async listAction(){
        let status = this.get("status");
        let map={};
        if(!think.isEmpty(status)){
            map.status = status;
            this.assign('status',status);
        }

        map.is_del = 0
        map.type = 0;
       // this.config("db.nums_per_page",20)
        let data = await this.model("order").where(map).page(this.get('page')).order("create_time DESC").countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        //console.log(data.data);
        this.active="admin/order/list"
        for(let val of data.data){
            switch (val.payment){
                case 100:
                    val.channel = "预付款支付";
                    break;
                case 1001:
                    val.channel = "货到付款";
                    break;
                default:
                    val.channel = await this.model("pingxx").where({id:val.payment}).getField("title",true);
            }
        }
        this.assign('list', data.data);
        this.meta_title = "订单管理";
        return this.display();
  }

    /**
     * 审核订单
     */
    async auditAction(){
        if(this.isPost()){
            let id = this.post("id");
            let admin_remark = this.post("admin_remark");
            let audit =await this.model("order").where({id:id}).update({status:3,admin_remark:admin_remark});
            if(audit){
                return this.success({name:"审核成功！",url:this.http.header["referer"]})
            }else {
                return this.fail("审核失败！")
            }

        }else {
            let id = this.get("id");
            this.assign("id",id);
            this.meta_title = "审核订单";
            return this.display();
        }
    }

    /**
     * 删除订单
     */
    async delAction(){
        let id = this.get("id");
        //作废的订单才能删除
        let res =await this.model("order").where({id:id,status:6}).delete();
        if(res){
            return this.success({name:"删除成功！"});
        }else {
            return this.fail("删除失败！");
        }
    }
    /**
     * 作废订单
     */
    async voidAction(){
        if(this.isPost()){
            let id = this.post("id");
            let admin_remark = this.post("admin_remark");
            let voids =await this.model("order").where({id:id}).update({status:6,admin_remark:admin_remark});
            if(voids){
                //释放库存
                await this.model("order").stock(id,false);
                return this.success({name:"操作成功！",url:this.http.header["referer"]})
            }else {
                return this.fail("操作失败！")
            }

        }else {
            let id = this.get("id");
            this.assign("id",id);
            this.meta_title = "审核订单";
            return this.display();
        }
    }
    /**
     * 完成订单
     */
    async finishAction(){
        if(this.isPost()){
            let id = this.post("id");
            let admin_remark = this.post("admin_remark");
            let finish =await this.model("order").where({id:id}).update({status:4,admin_remark:admin_remark});
            if(finish){
                return this.success({name:"操作成功！",url:this.http.header["referer"]})
            }else {
                return this.fail("操作失败！")
            }

        }else {
            let id = this.get("id");
            this.assign("id",id);
            this.meta_title = "完成订单";
            return this.display();
        }
    }

    /**
     * 备注订单
     */
    async remarkAction(){
        if(this.isPost()){
            let id = this.post("id");
            let admin_remark = this.post("admin_remark");
            let remark =await this.model("order").where({id:id}).update({admin_remark:admin_remark});
            if(remark){
                return this.success({name:"操作成功！",url:this.http.header["referer"]})
            }else {
                return this.fail("操作失败！")
            }

        }else {
            let id = this.get("id");
            this.assign("id",id);
            this.meta_title = "备注订单";
            return this.display();
        }
    }
    /**
     * 查看订单
     * @returns {*}
     */
   async seeAction(){
       let id = this.get("id");
       console.log(id);
       this.meta_title = "查看订单";
       //获取订单信息
       let order = await this.model("order").find(id);
       //购物清单
       let goods = await this.model("order_goods").where({order_id:id}).select();
       let sum = [];
       for(let val of goods){
           val.title = JSON.parse(val.prom_goods).title;
           val.pic = JSON.parse(val.prom_goods).pic;
           val.type = JSON.parse(val.prom_goods).type;
           val.sum = JSON.parse(val.prom_goods).price;
           sum.push(val.goods_nums);
       }
       sum = eval(sum.join('+'));
       this.assign("sum",sum);
       this.assign("goods",goods);
       //获取购买人信息
       //购买人信息
       let user = await this.model("member").join({
           customer: {
               on: ["id", "user_id"]
           }
       }).find(order.user_id);
       this.assign("user",user);
       //订单信息
       switch (order.payment){
           case 100:
               order.payment = "预付款支付";
               break;
           case 1001:
               order.payment = "货到付款";
               break;
           default:
               order.payment = await this.model("pingxx").where({id:order.payment}).getField("title",true);
       }
       this.assign("order",order);
       //获取 快递公司
       let express_company = this.model("express_company").order("sort ASC").select();
       this.assign("express_company",express_company);
       //获取省份
       /**
        * 订单原价 = 商品真实价格 + 真实运费
        */
       let olde_order_amount = order.real_amount + order.real_freight
       this.assign("olde_order_amount",olde_order_amount);
       let province = await this.model('area').where({parent_id:0}).select();
       let city = await this.model('area').where({parent_id:order.province}).select();
       let county = await this.model('area').where({parent_id:order.city}).select();
       this.assign("province",province);
       this.assign("city",city);
       this.assign("county",county);
       return this.display();
   }
    /**
     * 编辑订单
     */
    async editAction(){
        if(this.isPost()){
          let data = this.post()

            let order = await this.model("order").find(data.id);
            /**
             * 订单原价 = 商品真实价格 + 真实运费
             */
            let olde_order_amount = order.real_amount + order.real_freight;
            data.order_amount =  Number(olde_order_amount)+Number(data.adjust_amount);
            //更新订单信息
            let res = await this.model("order").update(data);
            if(res){
                //记录日志
                let log;
                if(data.adjust_amount==0){
                    log = `修改了订单，订单编号：${order.order_no}`
                }else {
                    log = `修改了订单，订单编号：${order.order_no}，并调整订单金额 ${data.adjust_amount} 元，原订单金额：${olde_order_amount} 元，调整后订单金额：${data.order_amount} 元`
                }

                await this.model("action").log("order","order",log,this.user.uid,this.ip(),this.http.url);
                return this.success({name:"编辑成功！"});
            }else {
                return this.fail("编辑失败！");
            }
        }else {
            let id = this.get("id");
            console.log(id);
            this.meta_title = "编辑订单";
            //获取订单信息
            let order = await this.model("order").find(id);
            //在订单同时没有付款，没有审核，没有完成的情况下才能编辑
            if(order.pay_status == 1 && item.status == 3 && item.delivery_status == 1){
                return this.fail("订单已经付款，无法编辑！");
            }

            //购物清单
            let goods = await this.model("order_goods").where({order_id:id}).select();
            let sum = [];
            for(let val of goods){
                val.title = JSON.parse(val.prom_goods).title;
                val.pic = JSON.parse(val.prom_goods).pic;
                val.type = JSON.parse(val.prom_goods).type;
                val.sum = JSON.parse(val.prom_goods).price;
                sum.push(val.goods_nums);
            }
            sum = eval(sum.join('+'));
            this.assign("sum",sum);
            this.assign("goods",goods);
            //获取购买人信息
            //购买人信息
            let user = await this.model("member").join({
                customer: {
                    on: ["id", "user_id"]
                }
            }).find(order.user_id);
            this.assign("user",user);
            //订单信息
            switch (order.payment){
                case 100:
                    order.payment = "预付款支付";
                    break;
                case 1001:
                    order.payment = "货到付款";
                    break;
                default:
                    order.payment = await this.model("pingxx").where({id:order.payment}).getField("title",true);
            }
            this.assign("order",order);
            //获取 快递公司
            let express_company = this.model("express_company").order("sort ASC").select();
            this.assign("express_company",express_company);
            //获取省份
            /**
             * 订单原价 = 商品真实价格 + 真实运费
             */
            let olde_order_amount = order.real_amount + order.real_freight
            this.assign("olde_order_amount",olde_order_amount);
            let province = await this.model('area').where({parent_id:0}).select();
            let city = await this.model('area').where({parent_id:order.province}).select();
            let county = await this.model('area').where({parent_id:order.city}).select();
            this.assign("province",province);
            this.assign("city",city);
            this.assign("county",county);
            return this.display();
        }
    }
    /**
     * 发货设置
     */
    async shipAction(){
        if(this.isPost()){
            let data = this.post();
            data.admin = await get_nickname(this.user.uid);
            //生成快递单编号
            let kid = ['k',new Date().getTime()]
            data.invoice_no = kid.join("");
            
            data.create_time = new Date().getTime();
            let res = await this.model("doc_invoice").add(data);
            if(res){
                await this.model("order").where({id:data.order_id}).update({delivery_status:1});
            }
            return this.success({"name":"发货成功！","url":this.http.header["referer"]});
        }else {
            let id = this.get("id");
            let order = await this.model("order").find(id);
            if(order.status != 3 ){
                return this.fail("订单还没审核！，请先审核订单。")
            }
            switch (order.payment){
                case 100:
                    order.payment = "预付款支付";
                    break;
                case 1001:
                    order.payment = "货到付款";
                    break;
                default:
                    order.payment = await this.model("pingxx").where({id:order.payment}).getField("title",true);
            }
            //购物清单
            let goods = await this.model("order_goods").where({order_id:id}).select();
            let sum=[]
            for(let val of goods){
                val.title = JSON.parse(val.prom_goods).title;
                val.pic = JSON.parse(val.prom_goods).pic;
                val.type = JSON.parse(val.prom_goods).type;
                val.sum = JSON.parse(val.prom_goods).price;
                sum.push(val.goods_nums);
            }
            //购买人信息
            let user = await this.model("member").join({
                customer: {
                    on: ["id", "user_id"]
                }
            }).find(order.user_id);
            //获取 快递公司
            let express_company = this.model("express_company").order("sort ASC").select();
            this.assign("express_company",express_company);
            //获取省份
            let province = await this.model('area').where({parent_id:0}).select();
            let city = await this.model('area').where({parent_id:order.province}).select();
            let county = await this.model('area').where({parent_id:order.city}).select();
            this.assign("province",province);
            this.assign("city",city);
            this.assign("county",county);
            this.assign("user",user);
            sum = eval(sum.join('+'));
            this.assign("sum",sum);
            console.log(goods);
            this.assign("goods",goods);
            this.assign("order",order);
            this.meta_title = "发货";
            return this.display();
        }
    }
    /**
     * 查看订单
     */
    vieworderAction(){
        let list = [1,2,3];
        this.assign("list",list);
        return this.display();
    }

    /**
     * 收款单
     */

    async receivingAction(){
        let data = await this.model("doc_receiving").page(this.get('page')).order("create_time DESC").countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        //console.log(data.data);
        // this.active="admin/order/list"
        for(let val of data.data){
            switch (val.payment_id){
                case 100:
                    val.channel = "预付款支付";
                    break;
                case 1001:
                    val.channel = "货到付款";
                    break;
                default:
                    val.channel = await this.model("pingxx").where({id:val.payment_id}).getField("title",true);
            }
            val.order_id=await this.model("order").where({id:val.order_id}).getField("order_no",true);
        }
        this.assign('list', data.data);
        // this.active="admin/order/receiving"
        this.meta_title = "收款单";
        return this.display();
    }

    /**
     * 发货单
     */
    async invoiceAction(){
    
        let data = await this.model("doc_invoice").page(this.get('page')).order("create_time DESC").countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        for(let v of data.data){
            v.express_company_id = await this.model("express_company").where({id:v.express_company_id}).getField("name",true);
        }
        this.assign("list",data.data);
        this.active="admin/order/receiving"
        this.meta_title = "发货单";
        return this.display();
    }

    /**
     * 退款单
     */

    refundAction(){


        this.active="admin/order/receiving"
        this.meta_title = "退款单";
        return this.display();
    }

}