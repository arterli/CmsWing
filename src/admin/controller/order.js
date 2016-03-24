
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
            let audit = this.model("order").where({id:id}).update({status:3,admin_remark:admin_remark});
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
     * 发货设置
     */
    async shipAction(){
        if(this.isPost()){
            let data = this.post();
            data.admin = await get_nickname(this.user.uid);
            //生成快递单编号
            data.invoice_no = new Date().getTime();
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

    receivingAction(){
        this.active="admin/order/receiving"
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