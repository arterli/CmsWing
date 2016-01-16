
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
    *upattr(data, create) {
        //获取数据对象
        if (think.isEmpty(data)) {
            return false;
        }

        if (think.isEmpty(data.id)) {//新增字段
            data.create_time = new Date().valueOf();
            data.status = 1;
            let id = yield this.add(data);
            if (!id) {
                return false;
            }
            if (create) {
                //新增表字段
                let res = yield this.addField(data);
                if (!res) {
                    this.delete(id)
                    return false;
                }
            }

        } else {//更新数据
            if (create) {
                //更新表字段
                let res = yield this.updateField(data);
                if (!res) {
                    return false;
                }
            }
            data.update_time = new Date().valueOf();
            let status = yield this.update(data);
            if (!status) {
                return false;
            }
        }
        return data;
    }

    /**
     * 检查当前表是否存在
     * @param Number model_id 模型id
     * @return Number 是否存在
     * @author
     */
    * checkTableExist(model_id) {
        let table_name;
        let extend_model;
        let Model = this.model("model");
        let model = yield Model.where({id: model_id}).field("name,extend").find();
        if (model.extend == 0) {//独立模型表名
            table_name = this.table_name = think.parseConfig(true, think.config("db")).prefix + model.name.toLowerCase();
        } else {
            extend_model = yield Model.where({id: model.extend}).field("name,extend").find();
            table_name = this.table_name = think.parseConfig(true, think.config("db")).prefix + extend_model.name.toLowerCase() + '_' + model.name.toLowerCase();
        }
        let res = yield think.model('mysql', think.config("db")).query(`SHOW TABLES LIKE '${table_name}'`)
        return res.length;
    }

    /**
     * 新建表字段
     * @param Array field 需要新建的字段属性
     * @return Boolean  true 成功 ， false 失败
     * @author
     */
    * addField(_filed) {
        //检查表是否存在
        let table_exist = yield this.checkTableExist(_filed.model_id);
        var def;
        var sql;
        //获取默认值
        var value = _filed.value;
        if (value === '') {
            def = '';
        } else if (think.isNumberString(value)) {
            def = ' DEFAULT ' + value;
        } else if (think.isString(value)) {
            def = ' DEFAULT \'' + value + '\'';
        } else {
            def = '';
        }

        if (table_exist) {
            let fie = _filed;
            sql = `ALTER TABLE \`${this.table_name}\` ADD COLUMN \`${fie.name}\`  ${fie.field}  ${def} COMMENT \'${fie.title}\';`
            sql = this.parseSql(sql);
        } else {//新建表时是否默认新增‘id主键’字段

            let model_info = yield this.model('model').where({id: _filed.model_id}).field('engine_type,need_pk').find();
            if (model_info.need_pk) {
                let fie = _filed;
                sql = ` CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
                \`id\`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT \'主键\' ,
                \`${fie.name}\`  ${fie.field} ${def} COMMENT \'${fie.title}\' ,
                PRIMARY KEY (\`id\`)
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`
                sql = this.parseSql(sql);
            } else {
                let fie = _filed;
                sql = `  CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
                \`${fie.name}\`  ${fie.field} ${def} COMMENT \'${fie.title}\'
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`
                sql = this.parseSql(sql);
            }
        }
        let res = yield think.model('mysql', think.config("db")).execute(sql);

        return res == 0;

    }

    /**
     * 更新表字段
     * @param array _field 需要更新的字段属性
     * @return boolean true 成功 ， false 失败
     * @author
     */
    * updateField(_field) {
        //检查表是否存在
        let table_exist = yield this.checkTableExist(_field.model_id);

        //获取原字段名
        let last_field = yield this.where({id: _field.id}).getField('name');

        //获取默认值
        let def = _field.value != '' ? ' DEFAULT ' + _field.value : '';

        let sql = `ALTER TABLE \`${this.table_name}\` CHANGE COLUMN \`${last_field}\` \`${_field.name}\`  ${_field.field} ${def} COMMENT \'${_field.title}\' ;`
        sql = this.parseSql(sql);
        console.log(sql);
        let res = yield think.model('mysql', think.config("db")).execute(sql);
        return res == 0;
    }

    /**
     * 删除一个字段
     * @param array field 需要删除的字段属性
     * @return boolean true 成功 ， false 失败
     * @author
     */
    *  deleteField(_field) {
        //检查表是否存在
        let table_exist = yield this.checkTableExist(_field.model_id);

        let sql = `ALTER TABLE \`${this.table_name}\` DROP COLUMN \`${_field.name}\`;`

        sql = this.parseSql(sql);
        console.log(sql);
        let res = yield think.model('mysql', think.config("db")).execute(sql);
        return res == 0;
    }


    /**
     * 检查同一张表是否有相同的字段
     * @param name 要验证的字段名称
     * @param model_id 要验证的字段的模型id
     * @author
     */
    * checkName(name, model_id, id) {
        let map = {'name': name, 'model_id': model_id};
        if (!think.isEmpty(id)) {
            map.id = ["!=", id];
        }
        let res = yield this.where(map).find();
        return think.isEmpty(res);
    }

    /**
     * 获取属性信息并缓存
     * @param int id 属性id
     * @param string field 要获取的字段名
     * @return string  属性信息
     */
    * get_model_attribute(model_id, group, fields) {
        //group=group?true:false;
        //fields=fields?true:false;
        let map;
        //验证ID
        if (think.isEmpty(model_id) || !think.isNumberString(model_id)) {
            return '';
        }
        //获取属性
        map = {model_id: model_id};
        let extend = yield this.model('model').where({id: model_id}).getField('extend', true);
        //console.log(extend);
        if (extend) {
            map = {model_id: ['IN', [model_id, extend]]}
        }
        let info = yield this.where(map).field(fields).select();
        let attr = {};
        if (group) {
            for (let val of info) {
                attr[val.id] = val;
            }
            let model = yield this.model('model').field("field_sort,attribute_list,attribute_alias").find(model_id);
            let attribute;
            if (model.attribute_list) {
                attribute = model.attribute_list.split(",")
            } else {
                attribute = [];
            }
            let group;
            if (think.isEmpty(model.field_sort)) {
                group = {1: obj_values(attr)}
            } else {
                group = JSON.parse(model.field_sort);
                let keys = Object.keys(group);
                //console.log(group);
                let _group = {};
                for (var k in group) {
                    let __group = []
                    for (let val of group[k]) {
                        __group.push(attr[val]);
                        delete attr[val];
                    }
                    _group[k] = __group;
                }
                group = _group;

                if (!think.isEmpty(attr)) {
                    let narr = []
                    for (let k in attr) {
                        if (!in_array(attr[k].id, attribute)) {
                            delete attr[k];
                        } else {
                            narr.push(attr[k]);
                        }
                    }
                    group[keys[0]] = group[keys[0]].concat(narr)

                }
                if (!think.isEmpty(model.attribute_alias)) {
                    //let alias  = preg_split('/[;\r\n]+/s', model.attribute_alias);
                    let alias = model.attribute_alias.split('\r\n');
                    let fields = {};
                    for (let value of alias) {
                        let val = value.split(':');
                        fields[val[0]] = val[1];
                    }

                    for (let value in group) {
                        group[value].forEach((v, k)=> {
                            if (!think.isEmpty(fields[v.name])) {
                                group[value]['title'] = fields[v.name];
                            }
                        })
                    }
                }
                attr = group;
            }
        } else {
            for (let v of info) {
                attr[v.name] = v;
            }
        }
        return attr;
    }
}