// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  /**
     * 新增或更新一个属性
     * @return Boolean  fasle 失败 ， int  成功 返回完整的数据
     * @author
     */
  async upattr(data, create) {
    // 获取数据对象
    if (think.isEmpty(data)) {
      return false;
    }

    if (think.isEmpty(data.id)) { // 新增字段
      data.create_time = new Date().valueOf();
      data.status = 1;
      const id = await this.add(data);
      if (!id) {
        return false;
      }
      if (create) {
        // 新增表字段
        const res = await this.addField(data);
        console.log(res);
        // return false;
        if (!res) {
          this.delete(id);
          return false;
        }
      }
    } else { // 更新数据
      if (create) {
        // 更新表字段
        const res = await this.updateField(data);
      }
      data.update_time = new Date().valueOf();
      const status = await this.update(data);
    }
    return data;
  }

  /**
     * 检查当前表是否存在
     * @param Number model_id 模型id
     * @return Number 是否存在
     * @author
     */
  async checkTableExist(model_id) {
    let table_name;
    let extend_model;
    const Model = this.model('model');
    const model = await Model.where({id: model_id}).field('name,extend').find();
    if (model.extend == 0) { // 独立模型表名
      table_name = this.table_name = think.config('model.mysql.prefix') + model.name.toLowerCase();
    } else {
      extend_model = await Model.where({id: model.extend}).field('name,extend').find();
      table_name = this.table_name = think.config('model.mysql.prefix') + extend_model.name.toLowerCase() + '_' + model.name.toLowerCase();
    }
    const res = await this.model('mysql').query(`SHOW TABLES LIKE '${table_name}'`);
    return res.length;
  }

  /**
     * 独立模型初始化表结构
     * @param mod_id 模型id;
     */
  async addtable(mod_id) {
    const table_exist = await this.checkTableExist(mod_id);
    let sql;
    if (!table_exist) {
      const model_info = await this.model('model').where({id: mod_id}).field('engine_type,need_pk').find();
      console.log(model_info);
      if (model_info.need_pk) {
        sql = ` CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
                \`id\`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,
                \`title\` char(80) NOT NULL COMMENT '标题',
                \`category_id\` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '栏目目录',
                \`group_id\` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '所属分组',
                \`model_id\` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容模型ID',
                \`create_time\` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
                \`update_time\` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
                \`status\` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态0禁用，1启用，-1删除',
                \`sort_id\` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '分类信息关联id',
                PRIMARY KEY (\`id\`),
                KEY \`category_id\` (\`category_id\`),
                KEY \`group_id\` (\`group_id\`),
                KEY \`status\` (\`status\`),
                KEY \`sort_id\` (\`sort_id\`)
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`;
        sql = this.parseSql(sql);
      } else {
        sql = ` CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
                \`title\` char(80) NOT NULL COMMENT '标题',
                \`category_id\` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '栏目目录',
                \`group_id\` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '所属分组',
                \`model_id\` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容模型ID',
                \`create_time\` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
                \`update_time\` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
                \`status\` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态0禁用，1启用，-1删除',
                \`sort_id\` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '分类信息关联id',
                KEY \`category_id\` (\`category_id\`),
                KEY \`group_id\` (\`group_id\`),
                KEY \`status\` (\`status\`),
                KEY \`sort_id\` (\`sort_id\`)
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`;
        sql = this.parseSql(sql);
      }
    }
    const res = await this.model('mysql').execute(sql);
    return res >= 0;
  }
  /**
     * 新建表字段
     * @param Array field 需要新建的字段属性
     * @return Boolean  true 成功 ， false 失败
     * @author
     */
  async addField(_filed) {
    // 检查表是否存在
    const table_exist = await this.checkTableExist(_filed.model_id);
    var def;
    var sql;
    // 获取默认值
    var value = _filed.value;
    if (value === '') {
      def = '';
    } else if (think.isNumber(value) || think.isNumberString(value)) {
      def = ' DEFAULT ' + value;
    } else if (think.isString(value)) {
      def = `DEFAULT '${value}'`;
    } else {
      def = '';
    }

    if (table_exist) {
      const fie = _filed;
      sql = `ALTER TABLE \`${this.table_name}\` ADD COLUMN \`${fie.name}\`  ${fie.field}  ${def} COMMENT '${fie.title}';`;
      sql = this.parseSql(sql);
    } else { // 新建表时是否默认新增‘id主键’字段
      const model_info = await this.model('model').where({id: _filed.model_id}).field('engine_type,need_pk').find();
      if (model_info.need_pk) {
        const fie = _filed;
        sql = ` CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
                \`id\`  int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键' ,
                \`${fie.name}\`  ${fie.field} ${def} COMMENT '${fie.title}' ,
                PRIMARY KEY (\`id\`)
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`;
        sql = this.parseSql(sql);
      } else {
        const fie = _filed;
        sql = `  CREATE TABLE IF NOT EXISTS \`${this.table_name}\` (
                \`${fie.name}\`  ${fie.field} ${def} COMMENT '${fie.title}'
                )
                ENGINE=${model_info.engine_type}
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
                CHECKSUM=0
                ROW_FORMAT=DYNAMIC
                DELAY_KEY_WRITE=0
                ;`;
        sql = this.parseSql(sql);
      }
    }
    const res = await this.model('mysql').execute(sql);

    return res >= 0;
  }

  /**
     * 更新表字段
     * @param array _field 需要更新的字段属性
     * @return boolean true 成功 ， false 失败
     * @author
     */
  async updateField(_field) {
    // 检查表是否存在
    await this.checkTableExist(_field.model_id);
    // 获取原字段名
    const last_field = await this.where({id: _field.id}).getField('name');
    // 获取默认值
    let def;
    var value = _field.value;
    if (value === '') {
      def = '';
    } else if (think.isNumber(value) || think.isNumberString(value)) {
      def = ' DEFAULT ' + value;
    } else if (think.isString(value)) {
      def = `DEFAULT '${value}'`;
    } else {
      def = '';
    }
    let sql = `ALTER TABLE \`${this.table_name}\` CHANGE COLUMN \`${last_field}\` \`${_field.name}\`  ${_field.field} ${def} COMMENT \'${_field.title}\' ;`;
    sql = this.parseSql(sql);
    const res = await this.model('mysql').execute(sql);
    return res == 0;
  }

  /**
     * 删除一个字段
     * @param array field 需要删除的字段属性
     * @return boolean true 成功 ， false 失败
     * @author
     */
  async deleteField(_field) {
    // 检查表是否存在
    await this.checkTableExist(_field.model_id);

    let sql = `ALTER TABLE \`${this.table_name}\` DROP COLUMN \`${_field.name}\`;`;

    sql = this.parseSql(sql);
    // console.log(sql);
    const res = await this.model('mysql').execute(sql);
    return res == 0;
  }

  /**
     * 检查同一张表是否有相同的字段
     * @param name 要验证的字段名称
     * @param model_id 要验证的字段的模型id
     * @author
     */
  async checkName(name, model_id, id) {
    const map = {'name': name, 'model_id': model_id};
    if (!think.isEmpty(id)) {
      map.id = ['!=', id];
    }
    const res = await this.where(map).find();
    return think.isEmpty(res);
  }

  /**
     * 获取属性信息并缓存
     * @param int id 属性id
     * @param string field 要获取的字段名
     * @return string  属性信息
     */
  async get_model_attribute(model_id, group, fields) {
    // group=group?true:false;
    // fields=fields?true:false;
    let map;
    // 验证ID
    if (think.isEmpty(model_id) || !think.isNumberString(model_id)) {
      return '';
    }
    // 获取属性
    map = {model_id: model_id};
    const extend = await this.model('model').where({id: model_id}).getField('extend', true);
    // console.log(extend);
    if (extend) {
      map = {model_id: ['IN', [model_id, extend]]};
    }
    const info = await this.where(map).field(fields).select();
    let attr = {};
    if (group) {
      for (const val of info) {
        attr[val.id] = val;
      }
      const model = await this.model('model').field('field_sort,attribute_list,attribute_alias').find(model_id);
      let attribute;
      if (model.attribute_list) {
        attribute = model.attribute_list.split(',');
      } else {
        attribute = [];
      }
      let group;
      if (think.isEmpty(model.field_sort)) {
        group = {1: obj_values(attr)};
      } else {
        group = JSON.parse(model.field_sort);
        const keys = Object.keys(group);
        // console.log(group);
        const _group = {};
        for (var k in group) {
          const __group = [];
          for (const val of group[k]) {
            __group.push(attr[val]);
            delete attr[val];
          }
          _group[k] = __group;
        }
        group = _group;

        if (!think.isEmpty(attr)) {
          const narr = [];
          for (const k in attr) {
            if (!in_array(attr[k].id, attribute)) {
              delete attr[k];
            } else {
              narr.push(attr[k]);
            }
          }
          group[keys[0]] = group[keys[0]].concat(narr);
        }
        if (!think.isEmpty(model.attribute_alias)) {
          // let alias  = preg_split('/[;\r\n]+/s', model.attribute_alias);
          const alias = model.attribute_alias.split('\r\n');
          // think.log(alias);
          const fields = {};
          for (const value of alias) {
            const val = value.split(':');
            // think.log(val);
            fields[val[0]] = val[1];
          }
          // think.log(fields);
          for (const value in group) {
            group[value].forEach((v, k) => {
              if (!think.isEmpty(fields[v.name])) {
                // think.log(group[value][k]);
                group[value][k]['title'] = fields[v.name];
              }
            });
            // think.log(group[value]['title']);
          }
        }
        attr = group;
        // think.log(attr);
      }
    } else {
      for (const v of info) {
        attr[v.name] = v;
      }
    }
    return attr;
  }
};
