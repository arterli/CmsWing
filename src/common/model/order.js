// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 增减库存
     * @param oder_id 订单id
     * @param regulation true-减库存，false-加库存
     * @param sku sku字段 默认 "suk",自建模型减少库存是需要填写自己新建的字段名
     * @param stock 库存 默认 "total_stock",
     */
   async stock(oder_id,regulation=true,sku="suk",stock ="total_stock"){

        let goodlist = await this.model("order_goods").where({order_id:oder_id}).select();
        for (let val of goodlist){
            let model_id = await this.model("document").where({id:val.goods_id}).getField("model_id",true);
            //获取模型数据
            let table =await this.model("model",{},"admin").get_table_name(model_id);
            let model =this.model(table);
            let prom_goods=JSON.parse(val.prom_goods);
            if(!think.isEmpty(prom_goods.type)){

                let data = await model.where({id:val.goods_id}).getField(sku,true);
                data = JSON.parse(data);
                let type = prom_goods.type.split(",");
                console.log(type);
                for(let v of data.data){
                    if(v.ch && v.name==type[0]){
                        for (let _v of v.ch){
                            if(_v.ch && _v.name == type[1]){

                                for(let __v of _v.ch){
                                    if(__v.name == type[2]){
                                        if (regulation) {
                                            __v.sku_stock=Number(__v.sku_stock)-val.goods_nums;
                                        }else {
                                            __v.sku_stock=Number(__v.sku_stock)+val.goods_nums;
                                        }

                                    }
                                }
                            }else {
                                if(_v.name == type[1]){
                                    if(regulation){
                                        _v.sku_stock=Number(_v.sku_stock)-val.goods_nums;
                                    }else {
                                        _v.sku_stock=Number(_v.sku_stock)+val.goods_nums;
                                    }

                                }
                            }
                        }
                    }else {
                        if(v.name == type[0]){
                            if(regulation){
                                v.sku_stock=Number(v.sku_stock)-val.goods_nums;
                            }else {
                                v.sku_stock=Number(v.sku_stock)+val.goods_nums;
                            }

                        }
                    }

                }
                think.log(data)
                let date = {}
                date[sku]=JSON.stringify(data);
                await model.where({id:val.goods_id}).update(date);
            }
            if(regulation){
                //减库存
                await model.where({id:val.goods_id}).decrement(stock, val.goods_nums);
            }else {
                //加库存
                await model.where({id:val.goods_id}).increment(stock, val.goods_nums);
            }


        }


    }

    /**
     *
     * @param goods_id 商品id
     * @param type 商品sku类型
     * @param sku  新建模型的 sku 字段名
     * @param stock 新建模型的 总库存字段名
     * @returns {*} 库存数量
     */
    async getstock(goods_id,type,sku="suk",stock ="total_stock"){
        let ressku;
        let model_id = await this.model("document").where({id:goods_id}).getField("model_id",true);
        //获取模型数据
        let table =await this.model("model",{},"admin").get_table_name(model_id);
        let model =this.model(table);
        if(think.isEmpty(type)){
            ressku = await model.where({id:goods_id}).getField(stock,true);
        }else {
            let data = await model.where({id:goods_id}).getField(sku,true);
            data = JSON.parse(data);
            type = type.split(",");
            let skuarr = [];
            for(let v of data.data){
                if(v.ch && v.name==type[0]){
                    for (let _v of v.ch){
                        if(_v.ch && _v.name == type[1]){

                            for(let __v of _v.ch){
                                if(__v.name == type[2]){

                                        skuarr.push(Number(__v.sku_stock));

                                }
                            }
                        }else {
                            if(_v.name == type[1]){
                                skuarr.push(Number(_v.sku_stock));

                            }
                        }
                    }
                }else {
                    if(v.name == type[0]){
                        skuarr.push(Number(v.sku_stock));
                    }
                }

            }
            ressku = skuarr[0]
        }
        return ressku;
    }
    async orderid(){
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth()+1 <10 ?"0"+(date.getMonth()+1):date.getMonth()+1;
        let d = date.getDate()<10?"0"+date.getDate():date.getDate();
        let v_timestr = y+m+d;
        let prefix=think.parseConfig(true,think.config("db")).prefix;
        await this.execute(`call seq_no(1)`);
        let order_no= await this.query(`SELECT CONCAT(${v_timestr},LPAD(order_sn,7,0)) AS order_sn FROM cmswing_order_seq WHERE timestr=${v_timestr}`);
        return order_no[0].order_sn;
    }
}