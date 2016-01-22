'use strict';
/**
 * model
 */
export default class extends think.model.base {

    async info(id){
        //获取分类信息
        console.log(id);
        let map = {};
        if(think.isNumber(id)){
            map.id = id;
        }else{
            map.name = id;
        }
        return await this.where(map).find();
    }
    /**
     * 获取分类树，指定分类则返回指定分类及其子分类，不指定则返回所有分类树
     *
     */
    async gettree(id , field){
        id = id||0,field=field||true;
         /*获取当前分类信息*/

        //if(id){
        //    console.log(id);
        //    let ids = id;
        //    let info = await this.info(ids);
        //    console.log(info);
        //    let id   = info.id;
        //}

        //获取所有分类

        let map = {"status":{">":-1}}
        let list = await this.field(field).where(map).order('sort').select();
        //console.log(list);
        list = get_children(list,id);
        let info = list;

        return info;
     }
    /**
     * 获取分类信息并缓存分类
     * @param  integer id    分类ID
     * @param  string  field 要获取的字段名
     * @return string         分类信息
     */
    async get_category(id, field){
        field=field||null;
        /* 非法分类ID */
        if(think.isEmpty(id) || !think.isNumberString(id)){
            return '';
        }
            let list = await think.cache("sys_category_list", () => {
              return this.getallcate();
            }, {timeout: 365 * 24 * 3600});
        if(think.isEmpty(list) || 1 != list[id].status){//不存在分类，或分类被禁用
            return '';
        }
       //// console.log(list);
       // console.log(list[id]);
        //console.log(think.isNumber(field));
        return think.isEmpty(field) ? list[id] : list[id][field];
    }

    async getallcate(){
        let lists = {}
        let cate=  await this.select()
        for(let v of cate){
            lists[v.id] = v
        }
        return lists;
    }
    /**
     * 获取参数的所有父级分类
     * @param int id 分类id
     * @return array 参数分类和父类的信息集合
     * @author
     */
    async get_parent_category(id){
        let breadcrumb = []
        while (id!=0)
        {
            let nav = await this.where({'id':id,'status':1}).field("id,title,pid").find();
            breadcrumb.push(nav);
            id = nav.pid;

        }
       return breadcrumb.reverse()
    }

    /**
     * 验证分类是否允许发布内容
     * @param id 分类id
     * @returns {boolean} true-允许发布内容，false-不允许发布内容
     */
    async check_category(id){
        if(think.isObject(id)){
            id.type = !think.isEmpty(id.type)?id.type:2;
            let type = await this.get_category(id.category_id,'type');
            type = type.split(",");
            return in_array(id.type,type);
        }else {
            let publish = await this.get_category(id,'allow_publish');
            return publish ? true : false;
        }
    }

    /**
     * 获取当前分类的文档类型
     * @param id
     * @returns {*}文档类型对象
     */
   async get_type_bycate(id){
        id=id||null;
        if(think.isEmpty(id)){
            return false
        }
       let type_list = think.config("document_model_type");
       let model_type = await this.where({id:id}).getField("type",1);

       model_type = model_type[0].split(",");

      for (let key in type_list){
          if(!in_array(key,model_type)){
              delete type_list[key];
          }
      }
  return type_list;
    }

    async updates(data){
        if(think.isEmpty(data)){
            return false;
        }
        let res;
        /* 添加或更新数据 */
        if(think.isEmpty(data.id)){
            data.create_time=new Date().getTime();
            data.model =think.isArray(data.model)? data.model.join(","):data.model;
            data.model_sub = think.isArray(data.model_sub)?data.model_sub.join(","):data.model_sub;
            data.type = think.isArray(data.type)?data.type.join(","):data.model;
            res = this.add(data);

        }else{
            data.update_time=new Date().getTime();
            data.model =think.isArray(data.model)? data.model.join(","):data.model;
            data.model_sub = think.isArray(data.model_sub)?data.model_sub.join(","):data.model_sub;
            data.type = think.isArray(data.type)?data.type.join(","):"";
            res = this.update(data);
        }
        think.cache("sys_category_list",null);
        return res;

    }
}