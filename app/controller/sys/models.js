/* eslint-disable jsdoc/check-tag-names */
'use strict';
/**
* @controller 模型管理
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class ModelsController extends Controller {
  /**
  * @summary 添加模型
  * @description 添加模型
  * @router post /admin/sys/models/addModels
  * @request body sys_models_add body desc
  * @response 200 baseRes desc
  */
  async addModels() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.SysModels.create(data);
    if (add.uuid) {
      const addData = [{
        primaryKey: true,
        allowNull: true,
        where: true,
        add: false,
        edit: false,
        models_uuid: add.uuid,
        name: 'id',
        comment: '主键',
        type: 'INTEGER',
        autoIncrement: true,
      },
      {
        primaryKey: false,
        allowNull: true,
        where: true,
        add: false,
        edit: false,
        models_uuid: add.uuid,
        name: 'createdAt',
        comment: '创建时间',
        type: 'DATE',
      },
      {
        primaryKey: false,
        allowNull: true,
        where: true,
        add: false,
        edit: false,
        models_uuid: add.uuid,
        name: 'updatedAt',
        comment: '更新时间',
        type: 'DATE',
      }];
      await ctx.model.SysModelsFields.bulkCreate(addData);
    }
    // 生成实体模型
    await ctx.service.sys.generate.modelsAll();
    // 生成graphql
    await ctx.service.sys.generate.graphqlAll();
    // 生成contract
    await ctx.service.sys.generate.contract();
    this.success(add);
  }
  /**
  * @summary 更新字段
  * @description 更新字段
  * @router post /admin/sys/models/updateFields
  * @request body sys_models_fields_edit body desc
  * @response 200 baseRes desc
  */
  async updateFields() {
    const { ctx } = this;
    const data = ctx.request.body;
    let i = 0;
    let models_uuid = '';
    const notids = [];
    for (const v of data.sys_models_fields) {
      v.sort = i;
      if (v.uuid) {
        await ctx.model.SysModelsFields.update(v, { where: { uuid: v.uuid } });
        notids.push(v.uuid);
      } else {
        const add = await ctx.model.SysModelsFields.create(v);
        notids.push(add.uuid);
      }
      models_uuid = v.models_uuid;
      i++;
    }
    // 查出需要删除的
    const deltiems = await ctx.model.SysModelsFields.findAll({ where: { uuid: { [Op.notIn]: notids }, models_uuid: { [Op.eq]: models_uuid } } });
    for (const v of deltiems) {
      await ctx.model.SysModelsFields.destroy({ where: { uuid: { [Op.eq]: v.uuid } } });
    }
    const res = await ctx.model.SysModelsFields.findAll({
      attributes: [ 'name', 'primaryKey', 'allowNull', 'where', 'add', 'edit', 'autoIncrement', 'unsigned', 'zerofill', 'type', 'comment', 'defaultValue', 'lengths', 'point', 'models_uuid', 'uuid', 'defaulttonow', 'uuidtype', 'booleantype', 'enumValue' ],
      where: { models_uuid: { [Op.eq]: models_uuid } },
      order: [[ 'sort', 'ASC' ]],
    });
    // 生成实体模型
    await ctx.service.sys.generate.modelsAll();
    // 生成graphql
    await ctx.service.sys.generate.graphqlAll();
    // 生成contract
    await ctx.service.sys.generate.contract();
    return this.success({ sys_models_fields: res });
  }

  /**
  * @summary 获取索引列表
  * @description 获取索引列表
  * @router get /admin/sys/models/indexes
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async indexes() {
    const { ctx } = this;
    const { id } = ctx.query;
    const map = {};
    map.where = { id };
    map.attributes = [[ 'uuid', 'm_uuid' ], 'name', 'desc' ];
    map.include = [{
      model: ctx.model.SysModelsFields,
      attributes: [[ 'uuid', 'value' ], [ 'name', 'label' ]],
    }, {
      model: ctx.model.SysModelsIndexes,
      attributes: [ 'uuid', 'models_uuid', 'unique', 'fields' ],
    }];
    map.order = [[ ctx.model.SysModelsIndexes, 'sort', 'ASC' ]];
    const res = await ctx.model.SysModels.findOne(map);
    this.success(res);
  }
  /**
  * @summary 更新索引
  * @description 更新索引
  * @router post /admin/sys/models/updateIndexes
  * @request body sys_models_indexes_add body desc
  * @response 200 baseRes desc
  */
  async updateIndexes() {
    const { ctx } = this;
    const data = ctx.request.body;
    let i = 0;
    let models_uuid = '';
    const notids = [];
    for (const v of data.sys_models_indexes) {
      v.sort = i;
      if (v.uuid) {
        await ctx.model.SysModelsIndexes.update(v, { where: { uuid: v.uuid } });
        notids.push(v.uuid);
      } else {
        const add = await ctx.model.SysModelsIndexes.create(v);
        notids.push(add.uuid);
      }
      models_uuid = v.models_uuid;
      i++;
    }
    // 查出需要删除的
    const deltiems = await ctx.model.SysModelsIndexes.findAll({ where: { uuid: { [Op.notIn]: notids }, models_uuid: { [Op.eq]: models_uuid } } });
    for (const v of deltiems) {
      await ctx.model.SysModelsIndexes.destroy({ where: { uuid: { [Op.eq]: v.uuid } } });
    }
    const res = await ctx.model.SysModelsIndexes.findAll({
      attributes: [ 'uuid', 'models_uuid', 'unique', 'fields' ],
      where: { models_uuid: { [Op.eq]: models_uuid } },
      order: [[ 'sort', 'ASC' ]],
    });
    // 生成实体模型
    await ctx.service.sys.generate.modelsAll();
    // 生成graphql
    await ctx.service.sys.generate.graphqlAll();
    // 生成contract
    await ctx.service.sys.generate.contract();
    this.success({ sys_models_indexes: res });
  }

  /**
  * @summary 获取索引列表
  * @description 获取索引列表
  * @router get /admin/sys/models/associate
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async associate() {
    const { ctx } = this;
    const { id } = ctx.query;
    const map = {};
    map.where = { id };
    map.attributes = [[ 'uuid', 'm_uuid' ], 'name', 'desc' ];
    map.include = [
      {
        model: ctx.model.SysModelsAssociate,
        attributes: [ 'uuid', 'models_uuid', 'type', 'parent_uuid', 'through_uuid', 'child_uuid', 'targetKey', 'foreignKey', 'constraints', 'throughKey' ],
      }];
    map.order = [[ ctx.model.SysModelsAssociate, 'sort', 'ASC' ]];
    const res = await ctx.model.SysModels.findOne(map);
    this.success(res);
  }
  // 添加索引
  /**
  * @summary 添加索引
  * @description 添加索引
  * @router post /admin/sys/models/updateAssociate
  * @request body sys_models_associate_add body desc
  * @response 200 baseRes desc
  */
  async updateAssociate() {
    const { ctx } = this;
    const data = ctx.request.body;
    let i = 0;
    let models_uuid = '';
    const notids = [];
    for (const v of data.sys_models_associates) {
      v.sort = i;
      if (v.uuid) {
        await ctx.model.SysModelsAssociate.update(v, { where: { uuid: v.uuid } });
        notids.push(v.uuid);
      } else {
        const add = await ctx.model.SysModelsAssociate.create(v);
        notids.push(add.uuid);
      }
      models_uuid = v.models_uuid;
      i++;
    }
    // 查出需要删除的
    const deltiems = await ctx.model.SysModelsAssociate.findAll({ where: { uuid: { [Op.notIn]: notids }, models_uuid: { [Op.eq]: models_uuid } } });
    for (const v of deltiems) {
      await ctx.model.SysModelsAssociate.destroy({ where: { uuid: { [Op.eq]: v.uuid } } });
    }
    const res = await ctx.model.SysModelsAssociate.findAll({
      attributes: [ 'uuid', 'models_uuid', 'type', 'parent_uuid', 'through_uuid', 'child_uuid', 'targetKey', 'foreignKey', 'constraints', 'throughKey' ],
      where: { models_uuid: { [Op.eq]: models_uuid } },
      order: [[ 'sort', 'ASC' ]],
    });

    // 生成实体模型
    await ctx.service.sys.generate.modelsAll();
    // 生成graphql
    await ctx.service.sys.generate.graphqlAll();
    // 生成contract
    await ctx.service.sys.generate.contract();
    this.success({ sys_models_associates: res });
  }

}
module.exports = ModelsController;
