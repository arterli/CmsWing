'use strict';
/**
 * model
 */
export default class extends think.model.base {

    /**
     * 新增或更新一个属性
     * @return Boolean  fasle 失败 ， int  成功 返回完整的数据
     * @author
     */
    async upattr(data,create) {
        //获取数据对象
      if(think.isEmpty(data)){
          return false;
      }

        if(think.isEmpty(data.id)){//新增字段
            data.create_time = new Date().valueOf();
            let id = await this.add(data);
            if(!id){
                return false;
            }
            if(create){
                //新增表字段

            }

        }else {

        }
        return data;
    }
    /**
     * 检查当前表是否存在
     * @param Number model_id 模型id
     * @return Number 是否存在
     * @author
     */
    async checkTableExist(model_id){
        let table_name;
        let extend_model;
        let Model = this.model("model");
        let model = await Model.where({id:model_id}).field("name,extend").find();
        if(model.extend == 0){//独立模型表名
         table_name = this.table_name = think.config("db").prefix+model.name.toLowerCase();
        }else {
            extend_model = await Model.where({id:model.extend}).field("name,extend").find();
            table_name = this.table_name = think.config("db").prefix+extend_model.name.toLowerCase()+'_'+model.name.toLowerCase();
        }
        let res =  await think.model('mysql',think.config("db")).query(`SHOW TABLES LIKE '${table_name}'`)
        return res.length;
    }

    /**
     * 新建表字段
     * @param Array field 需要新建的字段属性
     * @return Boolean  true 成功 ， false 失败
     * @author
     */
    async addField(_filed){
        //检查表是否存在
        let table_exist = await this.checkTableExist(_filed.model_id);
        var def;
        var sql;
        //获取默认值
        if(_filed.value === ''){
            def = '';
        }else if(think.isNumberString(_filed.value)){
            def = ' DEFAULT '+_field.value;
        }else if(think.isString(_filed.value)){
            def = ' DEFAULT \''+_field.value+'\'';
        }else {
            def = '';
        }

       // let sql1= " CREATE TABLE IF NOT EXISTS \`"+this.table_name+"\` (\`id \` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT \'主键\' ,\`"+ fil.name+"\`  ${field.field} ${def} COMMENT \'${field.title}\' ," ;
        if(table_exist){
            console.log(this.table_name)
            sql = `ALTER TABLE ${this.table_name} ADD COLUMN ${field.name}  ${field.field}  ${def} COMMENT '${field.title}';`
        }else {//新建表时是否默认新增‘id主键’字段

            let model_info = await this.model('model').where({id:_filed.model_id}).field('engine_type,need_pk').find();
            if(model_info.need_pk){
                let fil=_filed;
                sql =" CREATE TABLE IF NOT EXISTS \`"+this.table_name+"\` (\`id \` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT \'主键\' ,\`"+ fil.name +"\`  ${field.field} ${def} COMMENT \'${field.title}\' ,"
               //" PRIMARY KEY (id))"+
               // "ENGINE=${model_info.engine_type}"+
               // "DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci"+
               // "CHECKSUM=0"+
               // "ROW_FORMAT=DYNAMIC"+
               // "DELAY_KEY_WRITE=0;"
            }else {
                sql = ` CREATE TABLE IF NOT EXISTS ${this.table_name} (
                ${field.name}  ${field.field} ${def} COMMENT '${field.title}'
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`
            }
        }
        //let res = await think.model('mysql',think.config("db")).execute(sql);
        console.log(sql);
    }

}