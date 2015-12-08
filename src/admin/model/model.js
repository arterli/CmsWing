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
             table_name = think.config('db').prefix+model.name.toLowerCase();
        }else if(model.extend == 1){
            table_name = think.config('db').prefix+'document_'+model.name.toLowerCase();
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

}