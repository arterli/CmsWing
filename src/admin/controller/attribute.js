// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
/**
 * 字段属性控制器
 * @author 阿特 <arterli@qq.com>
 * http://www.cmswing.com
 */
export default class extends Base {
    init(http) {
        super.init(http);
        this.tactive = "setup";
        this.db = this.model('attribute');
    }
    /**
     * 字段列表
     * @return {Promise} []
     */
    async indexAction(){
        let model_id = this.get('model_id');
        //await this.db.checkTableExist(model_id);
        //console.log(think.isNumber(85));
        let modelname = await this.model("model").field('title').find(model_id);
        let list = await this.db.where({model_id:model_id}).page(this.get('page')).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(list);
       // console.log(modelname);
        this.meta_title="字段列表";
        this.active = "admin/model/index"
        this.assign({
            list:list.data,
            model_id:model_id,
            pagerData:page,
            modelname:modelname.title
        })
        return this.display();
    }

    /**
     * 新增字段
     * @returns {*}
     */
    async addAction(){

            this.db.upattr("sdsds");
        let model_id = this.get('model_id');
        let modelname = await this.model("model").field('title').find(model_id);
        this.meta_title="新增字段";
        this.active = "admin/model/index";
        this.assign({
            meta_title:"新增",
            model_id:model_id,
            modelname:modelname.title
        })
        return this.display();

    }

    /**
     * 更新一条数据
     * @author
     */
    async updateAction(){
        let post = this.post();
        console.log(post);
        let res = await this.db.addField(post);
        console.log(res);
        if(res){
            this.success({name:res.id?'更新成功':'新增成功', url:`/admin/attribute/index?model_id=${res.model_id}`});
        }else{
            this.fail("更新失败")
        }
    }
}
