'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
    super.init(http);
    this.tactive = "article"
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let cate_id = this.get('cate_id')||null;
    let model_id = this.get('model_id')||null;
    let position = this.get('position')||null;
    let group_id = this.get('group_id')||null;
    let models;
    let groups;
    let model;
    if(!think.isEmpty(cate_id)){
      let pid = this.get("pid")||0;
      // 获取列表绑定的模型
      if(pid == 0){
        models = await this.model("category").get_category(cate_id,'model');
        // 获取分组定义
        groups = await this.model("category").get_category(cate_id,'groups');
        if(groups){
          groups	=	parse_config_attr(groups);
        }
      }else { // 子文档列表
        models = await this.model("category").get_category(cate_id,'model_sub');
      }
      if(think.isNumber(model_id) && think.isNumberString(models)){
        // 绑定多个模型 取基础模型的列表定义
        model = await this.model('model').where({name:'document'}).find();
      }else{
        model_id   =   model_id ?'': models;
        //获取模型信息
        model =  await this.model('model').where({id:['IN',[model_id]]}).select();;
        if (think.isEmpty(model['list_grid'])) {
          model['list_grid'] = await this.model('model').field('list_grid').where({name:'document'}).find();
        }
      }
      this.assign('model',models.split(","))
    }else { // 子文档列表
      //获取模型信息
      model = await this.model("model").where({name:"document"}).find();
      model_id = null;
      cate_id = 0;
      this.assign('model',null);
    }
    //解析列表规则
    let fields = [];
    let ngrids = [];
    let grids = model.list_grid.split("\r\n");
    for (let value of grids){
      //字段:标题:链接
      let val = value.split(":");
      //支持多个字段显示
      let field = val[0].split(",");
      value = {filed:field,title:val[1]}

      if(!think.isEmpty(val[2])){
        value.href  = val[2];
      }
     // console.log(value);
      if(val[1].indexOf('|') > -1){
        // 显示格式定义
        [values.title,values.format]    =   val[1].split('|');
      }
      console.log(field);
      for( let val  of field){
        let array	=	val.split('|');
        fields.push(array[0]) ;
      }
      ngrids.push(value);
    }
    // 文档模型列表始终要获取的数据字段 用于其他用途
    fields.push('category_id');
    fields.push('model_id');
    fields.push('pid');
    //过滤重复字段
    fields = unique(fields);
    //console.log(fields);
    //console.log(model);
    let list = await this.getDocumentList(cate_id,model_id,position,fields,group_id);
    list = await this.parseDocumentList(list,model_id);
    this.assign('model_id',model_id);
    this.assign('group_id',group_id);
    this.assign('position',position);
    this.assign('groups',groups);
    this.assign('list',list);
    this.assign('list_grids',ngrids);
    this.assign('model_list',model);
    this.meta_title='内容管理';
    return this.display();
  }
  /**
   * 默认文档列表方法
   * @param integer $cate_id 分类id
   * @param integer $model_id 模型id
   * @param integer $position 推荐标志
   * @param mixed $field 字段列表
   * @param integer $group_id 分组id
   */
  async getDocumentList(cate_id=0,model_id=null,position=null,field=true,group_id=null){
    /* 查询条件初始化 */
    let map = {};
    let status;
    if(!think.isEmpty(this.get('title'))){
      map.title  = ['like', '%'+this.param('title')+'%'];
    }
    if(!think.isEmpty(this.get('status'))){
      map.status = this.param('status');
      status = map.status;
    }else{
      status = null;
      map.status = ['IN', '0,1,2'];
    }
    if ( !think.isEmpty(this.get('time-start')) ) {
      map.update_time ={'>=': new Date(this.param('time-start').valueOf())};
    }
    if ( !think.isEmpty(this.get('time-end')) ) {
      map.update_time = {'<=':24*60*60 + new Date(this.param('time-end').valueOf())};
    }
    if ( !think.isEmpty(this.get('nickname')) ) {
      map.uid = this.model('member').where({'nickname':this.param('nickname')}).getField('uid');
    }

    // 构建列表数据
    let Document = this.model('document');

    if(cate_id){
      map.category_id =   cate_id;
    }
    map.pid         =   this.param('pid')||0;
    if(map.pid){ // 子文档列表忽略分类
      delete map.category_id;
    }
    Document.alias('DOCUMENT');
    if(!think.isEmpty(model_id)){
      map.model_id    =   model_id;

      if(think.isArray(field) && array_diff(await Document.getTableFields(),field)){
        let modelName  =   this.model('model').getFieldById(model_id,'name');
        Document.join('__DOCUMENT_'+strtoupper(modelName)+'__ '+modelName+' ON DOCUMENT.id='+modelName+'.id');
        let key = array_search('id',$field);
        if(false  !== key){
          delete field[key];
          field.push('DOCUMENT.id') ;
        }
      }
    }
    if(!think.isEmpty(position)){
      map[1] = "position & {$position} = {$position}";
    }
    if(!think.isEmpty(group_id)){
      map['group_id']	=	group_id;
    }
    let list = this.lists(Document,map,'level DESC,DOCUMENT.id DESC',field);

    if(map['pid']){
      // 获取上级文档
      let article    =   Document.field('id,title,type').find(map['pid']);
      this.assign('article',article);
    }
    //检查该分类是否允许发布内容
    let allow_publish  =   get_category($cate_id, 'allow_publish');

    this.assign('status', status);
    this.assign('allow',  allow_publish);
    this.assign('pid',    map.pid);

    this.meta_title = '文档列表';
    return list;
  }

}