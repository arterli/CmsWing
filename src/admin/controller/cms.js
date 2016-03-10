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
 * 模型数据管理控制器
 * @author 阿特 <arterli@qq.com>
 * http://www.cmswing.com
 */
export default class extends Base {
    init(http) {
        super.init(http);
        this.tactive = "setup";
    }
    /**
     * list action
     * @return {Promise} []
     */
    //id:编号
    //title:标题:[EDIT]
    //type:类型
    //update_time:最后更新
    //status:状态
    //view:浏览
    //id:操作:[EDIT]|编辑,[DELETE]|删除
    async listAction(){
        
        //auto render template file index_index.html
        let model = this.get('model')
         !think.isEmpty(model)|| this.fail("模型名标识必须有！");

        //获取模型信息
        model = await this.model('model').where({name:model}).find();
        !think.isEmpty(model) || this.fail("模型不存在！");
        //解析列表规则
        let fields = [];
        let grids  = trim(model.list_grid).split('\r\n');
        console.log(model)
        let ngrids=[];
        for (var value of grids){
            if(trim(value) === ''){
                continue;
            }
            // 字段:标题:链接
            let val      = value.split(':');
            // 支持多个字段显示
            let field   = val[0].split(',');
            let values    = {'field' : field, 'title': val[1]};
            if(!think.isEmpty(val[2])){
                values.href	=	val[2];
            }
            if(val[1].indexOf('|') > -1){
                // 显示格式定义
                [values.title,values.format]    =   val[1].split('|');
            }
            for( var v  of field){
                let array	=	v.split('|');
                fields.push(array[0]) ;
            }
            ngrids.push(values);
        }

        //console.log(ngrids)
        // 过滤重复字段信息
        fields=unique(fields);
        //console.log(model)
        //关键字搜索
        let map = {}
        let key = model.search_key?model.search_key:'title';
        let iskey = this.param()
        if(!think.isEmpty(iskey[key])){
            map[key] = ['like',`%${this.get(key)}%`];
            delete iskey[key];
        }
       
        //console.log(iskey)
        //条件搜索
        for(let k in iskey){
           if(in_array(k,fields)){
               map[k]=iskey[k];
           }
        }
       //console.log(map);
        if(!think.isEmpty(model.list_row)){
            this.config("db.nums_per_page",model.list_row)
        }
        //let http =this.http;
        //读取模型数据列表
        let name;
        let data;
        if(model.extend){
                name =await this.model('model').get_table_name(model.id);
            let parent = await this.model('model').get_table_name(model.extend);
            let fix = this.config('db.prefix');
            let key = array_search(fields,'id');
            //console.log(key);
            if(false === key){
                fields.push(`${fix}${parent}.id as id`);
            }else {
                fields[key] = `${fix}${parent}.id as id`;

            }
           // console.log(fields);
            data=await this.model(parent).join({
                table: name,
                join: "inner", //join 方式，有 left, right, inner 3 种方式
                as: "c", // 表别名
                on: ["id", "id"] //ON 条件
            }).field(fields).order(`${fix}${parent}.id DESC`).where(map).page(this.get("page")).countSelect();
        }else {
            if(model.need_pk){
                in_array('id', fields) || fields.push('id');
            }
            //console.log(fields)
            name =await this.model('model').get_table_name(model.id);
            //console.log(name)
            data=await this.model(name)
                /* 查询指定字段，不指定则查询所有字段 */
                  .field(fields)
                 // 查询条件
                  .where(map)
                 /* 默认通过id逆序排列 */
                 .order(model.need_pk?'id DESC':'')
                 /* 数据分页 */
                 .page(this.get("page"))
                 /* 执行查询 */
                .countSelect();
        }
        
       // console.log(ngrids);
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        data.data = await this.parseDocumentList(data.data,model.id)
        this.assign('pagerData', page); //分页展示使用
        this.meta_title=model.title + '列表';
        this.active = "admin/model/index";
        this.assign('model', model);
        this.assign('list_grids', ngrids);
        this.assign('list_data',data.data);
        return this.display();
    }
    /**
     * 设置一条或者多条数据的状态
     */
    async setstatusAction() {
        await super.setstatusAction(this,'document');
    }
    //TODO 模型添加数据
   async addAction(){
       //获取模型信息
       let model_id = this.get("model")
       let model = await this.model("model").where({status:1,id:model_id}).find();
       model || this.fail('模型不存在！');
       if(this.isPost()){
           //TODO 后台验证后续天极

       }
   }
    // TODO 模型编辑数据
    editAction(){
        // TODO
    }
    // TODO  模型数据验证
    checkAttr(Model,model_id){
        // TODO

    }
}
