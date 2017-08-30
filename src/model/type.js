// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {



    /**
     * 检查当前表是否存在
     * @param Number typeid 分类信息id
     * @return Number 是否存在
     * @author
     */
    async checkTableExist(typeid) {
        this.table_name = think.config('model.mysql.prefix') + 'type_optionvalue'+typeid;
        //console.log(this.table_name);
        let res = await this.model('mysql').query(`SHOW TABLES LIKE '${this.table_name}'`)
        return res.length;
    }

    /**
     * 新建表字段
     * @param Array field 需要新建的字段属性
     * @return Boolean  true 成功 ， false 失败
     * @author
     */
    async addField(_filed) {
        // console.log(_filed);
        let sql;
        //检查表是否存在
        let table_exist = await this.checkTableExist(_filed.id);

        //console.log(this.table_name);
        for(let v of _filed.datarr){
            if(!table_exist){

                sql = `CREATE TABLE IF NOT EXISTS \`${this.table_name}\`(
                 \`tid\` int(10) UNSIGNED NOT NULL DEFAULT '0',
                 \`fid\` int(10) UNSIGNED NOT NULL DEFAULT '0',
                 \`dateline\` int(10) UNSIGNED NOT NULL DEFAULT '0',
                 \`expiration\` int(10) UNSIGNED NOT NULL DEFAULT '0',
                 KEY \`fid\` (\`fid\`),
                 KEY \`dateline\` (\`dateline\`)
                 )
                 ENGINE=InnoDB DEFAULT CHARSET=utf8`
                //console.log(sql);
                let res = await this.model('mysql').execute(sql);
                //console.log(res);
            }
            let fieldinfo = await this.getfieldsinfo(v.optionid);
           // console.log(v.optionid);
            let result = await this.model('mysql').query(`show columns from \`${this.table_name}\` like '${fieldinfo.name}'`);
            if(think.isEmpty(result)){//添加字段
                sql = `ALTER TABLE \`${this.table_name}\` ${fieldinfo.sql};`
                let res = await this.model('mysql').execute(sql);
                console.log(sql);
            }else {//更新字段 TODO

            }

            //console.log(result);
        }
        //return false;
        // var def;
        // var sql;
        // //获取默认值
        // var value = _filed.value;
        // if (value === '') {
        //     def = '';
        // } else if (think.isNumberString(value)) {
        //     def = ' DEFAULT ' + value;
        // } else if (think.isString(value)) {
        //     def = ' DEFAULT \'' + value + '\'';
        // } else {
        //     def = '';
        // }
        //
        // if (table_exist) {
        //     let fie = _filed;
        //     sql = `ALTER TABLE \`${this.table_name}\` ADD COLUMN \`${fie.name}\`  ${fie.field}  ${def} COMMENT \'${fie.title}\';`
        //     sql = this.parseSql(sql);
        // } else {//新建表时是否默认新增‘id主键’字段
        //
        //     let model_info = await this.model('model').where({id: _filed.model_id}).field('engine_type,need_pk').find();
        //     if (model_info.need_pk) {
        //         let fie = _filed;
        //         sql = ` CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
        //         \`id\`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT \'主键\' ,
        //         \`${fie.name}\`  ${fie.field} ${def} COMMENT \'${fie.title}\' ,
        //         PRIMARY KEY (\`id\`)
        //         )
        //         ENGINE=${model_info.engine_type}
        //         DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
        //         CHECKSUM=0
        //         ROW_FORMAT=DYNAMIC
        //         DELAY_KEY_WRITE=0
        //         ;`
        //         sql = this.parseSql(sql);
        //     } else {
        //         let fie = _filed;
        //         sql = `  CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
        //         \`${fie.name}\`  ${fie.field} ${def} COMMENT \'${fie.title}\'
        //         )
        //         ENGINE=${model_info.engine_type}
        //         DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
        //         CHECKSUM=0
        //         ROW_FORMAT=DYNAMIC
        //         DELAY_KEY_WRITE=0
        //         ;`
        //         sql = this.parseSql(sql);
        //     }
        // }
        // let res = await think.model('mysql', think.config("db")).execute(sql);
        //
        // return res == 0;

    }
   async getfieldsinfo(id){
        let filed = await this.model("typeoption").where({optionid:id}).find();
       // console.log(filed);
       let data={};
      switch (filed.type){
          case "number":
          case "range":
              data.sql = `ADD COLUMN \`${filed.identifier}\` int(10) UNSIGNED NOT NULL DEFAULT '0'`;

              break;
          case "text":
          case "textarea":
          case "checkbox":
          case "calendar":
          case "email":
          case "image":
          case "url":

              data.sql = `ADD COLUMN \`${filed.identifier}\` mediumtext `;
              break;
          case "radio":
              data.sql = `ADD COLUMN \`${filed.identifier}\` smallint(6) UNSIGNED NOT NULL DEFAULT '0',ADD KEY \`${filed.identifier}\` (\`${filed.identifier}\`)`;

              break;
          case "select":
              data.sql = `ADD COLUMN \`${filed.identifier}\` varchar(50) NOT NULL DEFAULT '0',ADD KEY \`${filed.identifier}\` (\`${filed.identifier}\`)`;

              break;

      }
      data.name=filed.identifier;
       return data;
   }
}