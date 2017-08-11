// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
module.exports = class extends Base {
    constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        // 其他额外的操作
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
        let html = this.pagination(list);
       // console.log(modelname);
        this.meta_title="字段列表";
        this.active = "admin/model/index";
        this.assign({
            list:list.data,
            model_id:model_id,
            pagerData:html,
            modelname:modelname.title
        });
        return this.display();
    }

    /**
     * 独立模型字段列表
     */
    async extAction(){
        let model_id = this.get('model_id');
        let model = await this.model("model").find(model_id);
        let table = think.config('model.mysql.prefix') + model.name;
        let db = think.model('mysql', think.config('db'));
        let result = await db.getSchema(table);
        console.log(result);
        this.meta_title="字段列表";
        this.active = "admin/model/index";
        this.assign("table",table);
        this.assign("list",result);
        return this.display();
    }
    /**
     * 新增字段
     * @returns {*}
     */
    async addAction(){
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
     * 编辑页面初始化
     * @author huajie <banhuajie@163.com>
     */
    async editAction(){
        let id = this.get('id');
        if(think.isEmpty(id)){
            this.fail('参数不能为空！');
        }

        /*获取一条记录的详细数据*/
        let data = await this.db.find(id);
        if(!data){
            this.fail('错误');
        }
        let model  =  await this.model('model').field('title,name,field_group').find(data.model_id);
        let modelname = await this.model("model").field('title').find(data.model_id);
        this.assign('model',model);
        this.assign('info', data);
        this.active = "admin/model/index";
        this.assign({
            meta_title:"编辑",
            model_id:data.model_id,
            modelname:modelname.title
        })
        this.meta_title = '编辑属性';
        return this.display("admin/attribute_add");
    }
    /**
     * 更新一条数据
     * @author
     */
    async updateAction(){
        let post = this.post();
        //console.log(post);
        let res = await this.db.upattr(post,true);
        //console.log(res);
        if(res){
            this.success({name:res.id?'更新成功':'新增成功', url:`/admin/attribute/index/?model_id=${res.model_id}`});
        }else{
            this.fail("更新失败")
        }
    }

    /**
     * 删除一条数据
     * @author
     */
    async delAction(){
        let id = this.get('id');
        think.isEmpty(id) && this.fail('参数错误！');

        let info = await this.db.where({id:id}).find();
        //console.log(info)
        think.isEmpty(info) && this.fail('该字段不存在！');

        //删除属性数据
        let res = await this.db.where({id:id}).delete();

        //删除表字段
        await this.db.deleteField(info);
        if(!res){
            this.fail('操作失败！');
        }else{
            //记录行为
            //action_log('update_attribute', 'attribute', $id, UID);
            this.success({name:'删除成功', url:`/admin/attribute/index/?model_id=${info.model_id}`});
        }
    }

    /**
     * 新增字段检查同一张表是否有相同的字段
     */
    async checknameAction(){
       let name = this.get('name');
        let model_id = this.get('model_id');
        let id = this.get('id');
       let res = await this.db.checkName(name,model_id,id);
        if(res){
            return this.json(1);
        }else {
            return this.json(0);
        }
    }
}
