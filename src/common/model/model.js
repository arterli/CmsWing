'use strict';
/**
 * model
 */
export default class extends think.model.base {


    /**
     * 删除数据
     */
    async del(id){
        let table_name;
        let model =await this.field('name,extend').find(id);
        console.log(model);
        if(model.extend == 0){
             table_name = think.parseConfig(true, think.config("db")).prefix+model.name.toLowerCase();
        }else if(model.extend == 1){
            table_name = think.parseConfig(true, think.config("db")).prefix+'document_'+model.name.toLowerCase();
        }else {
            //think.fail("只支持删除文档模型和独立模型");
            return false;
        }
        //console.log(table_name);
        //删除属性数据
       // this.model('attribute').where({model_id:id}).delete();
        //删除模型数据
        this.delete(id);
        let sql =`SHOW TABLES LIKE '${table_name}'`;
        let istable =  await think.model('mysql',think.config('db')).query(sql);
        if(!think.isEmpty(istable)){
            sql = `DROP TABLE ${table_name}`;
            let res = await think.model('mysql', think.config('db')).execute(sql);
        }

        return true;
    }
    /**
     * 检查是否有相同的表名
     * @param name 要验证的字段名称
     * @param model_id 要验证的字段的模型id
     * @author
     */
    async checkName(name,id){
        let map = {'name':name};
        if(!think.isEmpty(id)){
            map.id = ["!=", id];
        }
        let res = await this.where(map).find();
        return think.isEmpty(res);
    }
    /**
     * 获取表名（不含表前缀）
     * @param string $model_id
     * @return string 表名
     *
     */
    async get_table_name(model_id,extend=false){
        model_id=model_id||null;
        if(think.isEmpty(model_id)){
            return false;
        }
       let name;
        let info = await this.where({id:model_id}).find();
        if(info.extend != 0){
            name = await this.where({id:info.extend}).find();
            name = name.name+'_'
        }
        name += info.name;
        if(extend){
            return{
                table:name.replace(/undefined/, ""),
                extend:info.extend
            }
        }else {
            return name.replace(/undefined/, "");
        }

    }
    /**
     * 获取文档模型信息并缓存
     * @param  integer id    模型ID
     * @param  string  field 模型字段
     * @return array
     */

    async get_document_model(id, field){
        id=id||null,field=field||null;
        /* 非法分类ID */
        //if(!(think.isNumberString(id) || think.isNumber(id))){
        //    return '555';
        //}
       //console.log(333333333)
        /* 读取缓存数据 */
        let list = await think.cache("get_document_model", () => {
            return this._get_document_model();
        }, {timeout: 365 * 24 * 3600});


        /* 根据条件返回数据 */
        if(think.isEmpty(id)){
            return list;
        } else if(think.isEmpty(field)){
            return list[id];
        } else {
            try{
                return list[id][field];
            }catch(err) {
             return false;
            }

        }
    }
    /* 获取模型名称 */
    async _get_document_model(){
        let lists = {}
        let map   = {'status' : 1, 'extend': 1};
        let model = await this.where(map).select();
        for(let v of model){
            lists[v.id] = v
        }
        return lists;
    }
    //获取模型信息并缓存
   async get_model(id=null,field=null,extend={}){
        /* 读取缓存数据 */
        let list = await think.cache("get_model", () => {
            return this._get_model();
        }, {timeout: 365 * 24 * 3600});
       if(!think.isEmpty(id)&&think.isEmpty(field)){
          return think._.find(list, {id: Number(id)})
       }
       if(!think.isEmpty(id)&&!think.isEmpty(field)){
           let arr = think._.find(list, {id: Number(id)});
           //console.log(arr);
           if(!think.isEmpty(arr)){
               return arr[field]
           }else {
               return "";
           }

       }
       if(think.isEmpty(id)&&think.isEmpty(field)&&(!think.isEmpty(extend))){

           return think._.filter(list, extend)
       }

   }
    //获取模型信息
    /* 获取模型名称 */
    async _get_model(){
        let map   = {'status' : 1,'id':["!=",1]};
        return await this.where(map).select();
    }
}