'use strict';
const Service = require('egg').Service;
const path = require('path');
const fs = require('fs/promises');
const fsSync = require('fs');
const fse = require('fs-extra');
const { Op } = require('sequelize');
class GenerateService extends Service {
  // 生成模型
  async models(uuid) {
    const { ctx } = this;
    // 获取模型信息
    const modInfo = await ctx.model.SysModels.findOne({ where: { uuid } });
    const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(modInfo.name));
    const tableName = modInfo.name;
    // 获取字段
    const fieldList = await ctx.model.SysModelsFields.findAll({ where: { models_uuid: uuid }, order: [[ 'sort', 'ASC' ]] });
    // console.log(fieldList);

    let flist = '';
    for (const v of fieldList) {
      const comment = `, comment: '${v.comment}'`;
      let defaultValue = '';
      let type = '';
      let autoIncrement = '';
      let primaryKey = '';
      if (v.primaryKey) {
        primaryKey = `, primaryKey: ${v.primaryKey}`;
      }
      if (v.type === 'UUID') {
        if (v.uuidtype === 'UUIDV4' || v.uuidtype === 'UUIDV1') {
          defaultValue = `, defaultValue: DataTypes.${v.uuidtype}`;
        }
      } else if (v.type === 'BOOLEAN') {
        if (v.booleantype) {
          defaultValue = `, defaultValue: ${v.booleantype}`;
        }
      } else if (v.type === 'DATE') {
        if (v.defaulttonow) {
          defaultValue = ', defaultValue: DataTypes.NOW';
        }
      } else if (v.type === 'TEXT' || v.type === 'JSON' || v.type === 'DATEONLY') {
        defaultValue = '';
      } else if (v.type === 'ENUM' || v.type === 'STRING') {
        if (v.defaultValue) {
          defaultValue = `, defaultValue: '${v.defaultValue}'`;
        }
      } else if (!ctx.helper._.isEmpty(v.defaultValue) && (ctx.helper.isStringNumber(v.defaultValue) || v.defaultValue === 'null')) {
        defaultValue = `, defaultValue: ${v.defaultValue}`;
      } else if (!ctx.helper._.isEmpty(v.defaultValue)) {
        defaultValue = `, defaultValue: '${v.defaultValue}'`;
      }
      if (v.type === 'STRING' || v.type === 'DATE') {
        if (v.lengths) {
          type = `type: DataTypes.${v.type}(${v.lengths})`;
        } else {
          type = `type: DataTypes.${v.type}`;
        }
      } else if (v.type === 'ENUM' && v.enumValue) {
        const evarr = v.enumValue.split('\n');
        type = `type: DataTypes.${v.type}, values: ${JSON.stringify(evarr)}`;
      } else if (v.type === 'INTEGER' || v.type === 'BIGINT') {
        const tt = `type: DataTypes.${v.type}`;
        if (v.unsigned && v.zerofill) {
          type = `${tt}.UNSIGNED.ZEROFILL`;
        } else if (v.unsigned) {
          type = `${tt}.UNSIGNED`;
        } else if (v.zerofill) {
          type = `${tt}.ZEROFILL`;
        } else {
          type = `${tt}`;
        }
        if (v.lengths) {
          type = `${type}(${v.lengths})`;
        }
        if (v.autoIncrement) {
          autoIncrement = `, autoIncrement:${v.autoIncrement}`;
        }
      } else if (v.type === 'FLOAT' || v.type === 'DOUBLE' || v.type === 'DOUBLE') {
        const tt = `type: DataTypes.${v.type}`;
        if (v.unsigned && v.zerofill) {
          type = `${tt}.UNSIGNED.ZEROFILL`;
        } else if (v.unsigned) {
          type = `${tt}.UNSIGNED`;
        } else if (v.zerofill) {
          type = `${tt}.ZEROFILL`;
        } else {
          type = `${tt}`;
        }
        if (v.lengths && v.point) {
          type = `${type}(${v.lengths},${v.point})`;
        } else if (v.lengths) {
          type = `${type}(${v.lengths})`;
        }
        if (v.autoIncrement && (v.type === 'FLOAT' || v.type === 'DOUBLE')) {
          autoIncrement = `, autoIncrement:${v.autoIncrement}`;
        }
      } else {
        type = `type: DataTypes.${v.type}`;
      }
      flist += `  ${v.name}: { ${type}${defaultValue}${autoIncrement}${primaryKey}${comment} },
  `;
    }
    const modIndexes = await ctx.model.SysModelsIndexes.findAll({ where: { models_uuid: uuid }, order: [[ 'sort', 'ASC' ]] });
    const indexesobj = [];
    for (const v of modIndexes) {
      const obj = {};
      obj.unique = v.unique;
      const indexsField = await ctx.model.SysModelsFields.findAll({ where: { uuid: { [Op.in]: v.fields.split(',') } } });
      const farr = [];
      for (const f of indexsField) {
        farr.push(f.name);
      }
      obj.fields = farr;
      indexesobj.push(obj);
    }
    // console.log(indexesobj);
    let indexesStr = '';
    if (indexesobj.length > 0) {
      indexesStr = `indexes:${JSON.stringify(indexesobj)},`;
    }
    const modAssociate = await ctx.model.SysModelsAssociate.findAll({ where: { models_uuid: uuid }, order: [[ 'sort', 'ASC' ]] });
    // console.log(modAssociate);
    let associateStr = '';
    if (modAssociate.length > 0) {
      let astr = '';
      for (const v of modAssociate) {
        const parent_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.parent_uuid } });
        const child_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.child_uuid } });
        const target_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.targetKey } });
        const foreign_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.foreignKey } });
        const parent = ctx.helper._.upperFirst(ctx.helper._.camelCase(parent_uuid.name));
        const child = ctx.helper._.upperFirst(ctx.helper._.camelCase(child_uuid.name));
        const targetKey = target_key.name;
        const foreignKey = foreign_key.name;
        if (v.type === 'HasOne' || v.type === 'HasMany') {
          astr += `app.model.${parent}.${ctx.helper._.lowerFirst(v.type)}(app.model.${child}, {
            foreignKey: '${foreignKey}',
            sourceKey: '${targetKey}',
            constraints: ${v.constraints},
          });
          `;
        }
        if (v.type === 'BelongsTo') {
          astr += ` app.model.${child}.belongsTo(app.model.${parent}, {
            foreignKey: '${foreignKey}',
            targetKey: '${targetKey}',
            constraints: ${v.constraints},
          });
          `;
        }
        if (v.type === 'BelongsToMany') {
          const through_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.through_uuid } });
          const through = ctx.helper._.upperFirst(ctx.helper._.camelCase(through_uuid.name));
          const through_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.throughKey } });
          const throughKey = through_key.name;
          astr += `app.model.${parent}.belongsToMany(app.model.${child}, {
            through: { model: app.model.${through}, unique: false },
            foreignKey: '${throughKey}',
            sourceKey: '${targetKey}',
            targetKey: '${foreignKey}',
            constraints: ${v.constraints},
          });
          `;
        }
      }
      associateStr = `${className}.associate = function() {
       ${astr}
      };`;
    }
    // console.log(indexesStr);
    // console.log(flist);
    // console.log(associate);
    const modeDoc = `
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const ${className} = app.model.define('${tableName}', {
  ${flist}},{
  ${indexesStr}
  paranoid: ${modInfo.paranoid},
});
  ${associateStr}
  ${className}.sync({ alter: true });
  return ${className};
};
`;
    // console.log(modeDoc);
    const file = path.join(this.app.baseDir, 'app', 'model', tableName + '.js');
    try {
      const data = new Uint8Array(Buffer.from(modeDoc));
      await fs.writeFile(file, data);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  }
  // 生成全部模型
  async modelsAll() {
    const { ctx } = this;
    const rootFolder = path.join(this.app.baseDir, 'app', 'model');
    await fse.remove(rootFolder);
    const exist = fsSync.existsSync(rootFolder);
    if (!exist) {
      await fs.mkdir(rootFolder);
    }
    const model = path.join(this.app.baseDir, 'app', 'core', 'model');
    const newmodel = path.join(this.app.baseDir, 'app', 'model');
    await fse.copy(model, newmodel);
    // 获取全部模型
    const allModels = await ctx.model.SysModels.findAll();
    for (const v of allModels) {
      await this.models(v.uuid);
    }
  }
  // 生成graphql
  async graphql(uuid) {
    const { ctx } = this;
    const modInfo = await ctx.model.SysModels.findOne({ where: { uuid } });
    const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(modInfo.name));
    const tableName = modInfo.name;
    // 分析关联模型
    let associateStr = ''; // 绑定resolver
    let associateFieldStr = '';// 绑定字段
    // 一对一
    const hasOne = await ctx.model.SysModelsAssociate.findAll({ where: { type: 'HasOne', parent_uuid: uuid } });
    for (const v of hasOne) {
      const child_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.child_uuid } });
      const target_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.targetKey } });
      const foreign_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.foreignKey } });
      const child = ctx.helper._.upperFirst(ctx.helper._.camelCase(child_uuid.name));
      const targetKey = target_key.name;
      const foreignKey = foreign_key.name;
      associateFieldStr += `${child_uuid.name}: ${child}
`;
      associateStr += `
  async ${child_uuid.name}(root, params, ctx) {
    const map = {};
    map.where = { ${foreignKey}: root.${targetKey} };
    return await ctx.connector.${child_uuid.name}.findOne(map);
  },
`;
    }
    // 一对多
    const hasMany = await ctx.model.SysModelsAssociate.findAll({ where: { type: 'HasMany', parent_uuid: uuid } });
    for (const v of hasMany) {
      const child_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.child_uuid } });
      const target_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.targetKey } });
      const foreign_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.foreignKey } });
      const child = ctx.helper._.upperFirst(ctx.helper._.camelCase(child_uuid.name));
      const targetKey = target_key.name;
      const foreignKey = foreign_key.name;
      associateFieldStr += `${child_uuid.name}(order:[[String]],limit:Int,offset:Int): [${child}]
`;
      associateStr += `
  async ${child_uuid.name}(root, params, ctx) {
    const map = {};
    map.where = { ${foreignKey}: root.${targetKey} };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.${child_uuid.name}.findAll(map);
  },
`;
    }
    // 所属关系
    const belongsTo = await ctx.model.SysModelsAssociate.findAll({ where: { type: 'BelongsTo', child_uuid: uuid } });
    for (const v of belongsTo) {
      const parent_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.parent_uuid } });
      const target_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.targetKey } });
      const foreign_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.foreignKey } });
      const parent = ctx.helper._.upperFirst(ctx.helper._.camelCase(parent_uuid.name));
      const targetKey = target_key.name;
      const foreignKey = foreign_key.name;
      associateFieldStr += `${parent_uuid.name}: ${parent}
 `;
      associateStr += `
  async ${parent_uuid.name}(root, params, ctx) {
    const map = {};
    map.where = { ${targetKey}: root.${foreignKey} };
    return await ctx.connector.${parent_uuid.name}.findOne(map);
  },
 `;
    }
    // 多对多
    const belongsToMany = await ctx.model.SysModelsAssociate.findAll({ where: { type: 'BelongsToMany', parent_uuid: uuid } });
    for (const v of belongsToMany) {
      const through_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.through_uuid } });
      const target_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.targetKey } });
      const through_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.throughKey } });
      const through = ctx.helper._.upperFirst(ctx.helper._.camelCase(through_uuid.name));
      const targetKey = target_key.name;
      const throughKey = through_key.name;
      associateFieldStr += `${through_uuid.name}(order:[[String]],limit:Int,offset:Int): [${through}]
    `;
      associateStr += `
      async ${through_uuid.name}(root, params, ctx) {
        const map = {};
        map.where = { ${throughKey}: root.${targetKey} };
        if (Object.hasOwnProperty.call(params, 'limit')) {
          map.limit = params.limit;
        }
        if (Object.hasOwnProperty.call(params, 'offset')) {
          map.offset = params.offset;
        }
        if (Object.hasOwnProperty.call(params, 'order')) {
          map.order = params.order;
        }
        return await ctx.connector.${through_uuid.name}.findAll(map);
      },
    `;
    }
    const throughs = await ctx.model.SysModelsAssociate.findAll({ where: { type: 'BelongsToMany', through_uuid: uuid } });
    for (const v of throughs) {
      const parent_uuid = await ctx.model.SysModels.findOne({ where: { uuid: v.parent_uuid } });
      const target_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.targetKey } });
      const through_key = await ctx.model.SysModelsFields.findOne({ where: { uuid: v.throughKey } });
      const parent = ctx.helper._.upperFirst(ctx.helper._.camelCase(parent_uuid.name));
      const targetKey = target_key.name;
      const throughKey = through_key.name;
      associateFieldStr += `${parent_uuid.name}: ${parent}
    `;
      associateStr += `
      async ${parent_uuid.name}(root, params, ctx) {
        const map = {};
        map.where = { ${targetKey}: root.${throughKey} };
        return await ctx.connector.${parent_uuid.name}.findOne(map);
      },
    `;
    }
    // console.log(associateFieldStr);
    // console.log(associateStr);

    // 生成 schema
    const fieldList = await ctx.model.SysModelsFields.findAll({ where: { models_uuid: uuid }, order: [[ 'sort', 'ASC' ]] });
    let fieldListStr = '';
    for (const v of fieldList) {
      let type;
      if (v.primaryKey) {
        type = 'ID';
      } else if (v.type === 'BOOLEAN') {
        type = 'Boolean';
      } else if (v.type === 'INTEGER' || v.type === 'BIGINT') {
        type = 'Int';
      } else if (v.type === 'FLOAT' || v.type === 'DOUBLE' || v.type === 'DECIMAL') {
        type = 'Float';
      } else if (v.type === 'STRING' || v.type === 'TEXT' || v.type === 'UUID' || v.type === 'JSON') {
        type = 'String';
      } else if (v.type === 'DATE' || v.type === 'DATEONLY') {
        type = 'Date';
      } else if (v.type === 'ENUM') {
        type = 'String';
      }
      fieldListStr += `${v.name}:${type}
      `;
    }
    // type
    const tableType = `
    type ${className} {
      ${fieldListStr}
      ${associateFieldStr}
    }
    `;
    // input where
    const whereList = await ctx.model.SysModelsFields.findAll({ where: { models_uuid: uuid, where: true }, order: [[ 'sort', 'ASC' ]] });
    let whereStr = '';
    let wherefs = '';
    let wfinput = '';
    for (const v of whereList) {
      let type;
      if (v.primaryKey) {
        type = 'ID';
      } else if (v.type === 'BOOLEAN') {
        type = 'Boolean';
      } else if (v.type === 'INTEGER' || v.type === 'BIGINT') {
        type = 'Int';
      } else if (v.type === 'FLOAT' || v.type === 'DOUBLE' || v.type === 'DECIMAL') {
        type = 'Float';
      } else if (v.type === 'STRING' || v.type === 'TEXT' || v.type === 'UUID' || v.type === 'JSON') {
        type = 'String';
      } else if (v.type === 'DATE' || v.type === 'DATEONLY') {
        type = 'Date';
      } else if (v.type === 'ENUM') {
        type = 'String';
      }
      wfinput += `input Where${className}_${v.name} {
        op_eq: ${type}
  op_ne: ${type}
  op_or: [${type}]
  op_gt: ${type}
  op_gte: ${type}
  op_lt: ${type}
  op_lte: ${type}
  op_between: [${type}]
  op_notBetween: [${type}]
  op_in: [${type}]
  op_notIn: [${type}]
  op_like: String
  op_notLike: String
  op_startsWith: String
  op_endsWith: String
  op_substring: String
      }
      `;
      wherefs += `${v.name}:Where${className}_${v.name}
      `;
      whereStr += `${v.name}: WhereField${className}
      `;
    }
    console.log(whereStr);
    const whereInput = `
    ${wfinput}
    input WhereField${className}{
    ${wherefs}
    }

    input Where${className} {
      ${wherefs}
      op_and: [WhereField${className}]
      op_or: [WhereField${className}]
      op_not: [WhereField${className}]
    }
    `;
    // inpt add
    const addList = await ctx.model.SysModelsFields.findAll({ where: { models_uuid: uuid, add: { [Op.eq]: true } }, order: [[ 'sort', 'ASC' ]] });
    let addStr = '';
    for (const v of addList) {
      let type;
      if (v.primaryKey) {
        type = 'ID';
      } else if (v.type === 'BOOLEAN') {
        type = 'Boolean';
      } else if (v.type === 'INTEGER' || v.type === 'BIGINT') {
        type = 'Int';
      } else if (v.type === 'FLOAT' || v.type === 'DOUBLE' || v.type === 'DECIMAL') {
        type = 'Float';
      } else if (v.type === 'STRING' || v.type === 'TEXT' || v.type === 'UUID' || v.type === 'JSON') {
        type = 'String';
      } else if (v.type === 'DATE' || v.type === 'DATEONLY') {
        type = 'Date';
      } else if (v.type === 'ENUM') {
        type = 'String';
      }
      const tt = !v.allowNull ? type : `${type}!`;
      addStr += `${v.name}: ${tt}
      `;
    }
    if (!addStr) return false;
    const addInput = `
    input Add${className} {
    ${addStr}
    }
    `;
    // inpt edit
    const editList = await ctx.model.SysModelsFields.findAll({ where: { models_uuid: uuid, edit: { [Op.eq]: true } }, order: [[ 'sort', 'ASC' ]] });
    let editStr = '';
    for (const v of editList) {
      let type;
      if (v.primaryKey) {
        type = 'ID';
      } else if (v.type === 'BOOLEAN') {
        type = 'Boolean';
      } else if (v.type === 'INTEGER' || v.type === 'BIGINT') {
        type = 'Int';
      } else if (v.type === 'FLOAT' || v.type === 'DOUBLE' || v.type === 'DECIMAL') {
        type = 'Float';
      } else if (v.type === 'STRING' || v.type === 'TEXT' || v.type === 'UUID' || v.type === 'JSON') {
        type = 'String';
      } else if (v.type === 'DATE' || v.type === 'DATEONLY') {
        type = 'Date';
      } else if (v.type === 'ENUM') {
        type = 'String';
      }
      editStr += `${v.name}: ${type}
      `;
    }
    if (!editStr) return false;
    const editInput = `
    input Edit${className} {
    ${editStr}
    }
    `;
    const schema = `
    ${tableType}
    ${whereInput}
    ${addInput}
    ${editInput}
    type Count${className} {
      count: Int
      rows: [${className}]
    }
    type ResDel${className} {
      count: Int
    }
    type ResEdit${className} {
      ids: [Int]
    }
    `;
    // console.log(schema);

    // 生成 connector
    const connector = `
'use strict';
class ${className}Connector {
  constructor(ctx) {
    this.ctx = ctx;
    this.model = ctx.app.model.${className};
  }
  async findAll(body) {
    const map = {};
    if (Object.hasOwnProperty.call(body, 'limit')) {
      map.limit = body.limit;
    }
    if (Object.hasOwnProperty.call(body, 'offset')) {
      map.offset = body.offset;
    }
    // 排序
    if (body.order && !this.ctx.helper._.isEmpty(this.ctx.helper._.compact(body.order[0]))) {
      map.order = body.order;
    }
    map.where = body.where;
    const res = await this.model.findAll(map);
    return res;
  }
  async findByPk(body) {
    const res = await this.model.findByPk(body.id);
    return res;
  }
  async findOne(body) {
    const map = {};
    map.where = body.where;
    const res = await this.model.findOne(map);
    return res;
  }
  async findAndCountAll(body) {
    const map = {};
    map.limit = body.limit;
    map.offset = body.offset;
    if (body.order && !this.ctx.helper._.isEmpty(this.ctx.helper._.compact(body.order[0]))) {
      map.order = body.order;
    }
    map.where = body.where;
    const res = await this.model.findAndCountAll(map);
    return res;
  }
  async create(body) {
    const res = await this.model.create(body.data);
    return res;
  }
  async destroy(body) {
    const map = {};
    map.where = body.where;
    const res = await this.model.destroy(map);
    return { count: res };
  }
  async update(body) {
    const map = {};
    map.where = body.where;
    const res = await this.model.update(body.data, map);
    return { ids: res };
  }
}
module.exports = ${className}Connector;
`;
    // console.log(connector);

    // 生成 resolver
    const assoc = associateStr ? `${className}: {${associateStr}},
    ` : '';
    const resolver = `
'use strict';
module.exports = {
  ${assoc}
  Query: {
    async ${className}_findAll(_root, params, ctx) {
      return await ctx.connector.${tableName}.findAll(params);
    },
    async ${className}_findByPk(_root, params, ctx) {
      return await ctx.connector.${tableName}.findByPk(params);
    },
    async ${className}_findOne(_root, params, ctx) {
      return await ctx.connector.${tableName}.findOne(params);
    },
    async ${className}_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.${tableName}.findAndCountAll(params);
    },
  },
  Mutation: {
    async ${className}_create(_root, params, ctx) {
      return await ctx.connector.${tableName}.create(params);
    },
    async ${className}_destroy(_root, params, ctx) {
      return await ctx.connector.${tableName}.destroy(params);
    },
    async ${className}_update(_root, params, ctx) {
      return await ctx.connector.${tableName}.update(params);
    },
  },
};
`;
    // console.log(resolver);
    // 生成目录
    const rootFolder = path.join(this.app.baseDir, 'app', 'graphql', tableName);
    const exist = fsSync.existsSync(rootFolder);
    if (!exist) {
      await fs.mkdir(rootFolder);
    }
    const schemafile = path.join(rootFolder, 'schema.graphql');
    try {
      const schemadata = new Uint8Array(Buffer.from(schema));
      await fs.writeFile(schemafile, schemadata);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
    const connectorfile = path.join(rootFolder, 'connector.js');
    try {
      const connectordata = new Uint8Array(Buffer.from(connector));
      await fs.writeFile(connectorfile, connectordata);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
    const resolverfile = path.join(rootFolder, 'resolver.js');
    try {
      const resolverdata = new Uint8Array(Buffer.from(resolver));
      await fs.writeFile(resolverfile, resolverdata);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
    return true;
  }
  // 生成全部 graphql
  async graphqlAll() {
    const { ctx } = this;
    const rootFolder = path.join(this.app.baseDir, 'app', 'graphql');
    await fse.remove(rootFolder);
    const common = path.join(this.app.baseDir, 'app', 'core', 'graphql', 'common');
    const newcommon = path.join(this.app.baseDir, 'app', 'graphql', 'common');
    await fse.copy(common, newcommon);
    const exist = fsSync.existsSync(rootFolder);
    if (!exist) {
      await fs.mkdir(rootFolder);
    }

    // 获取全部模型
    const allModels = await ctx.model.SysModels.findAll();
    let query = '';
    let mutation = '';
    for (const v of allModels) {
      const ok = await this.graphql(v.uuid);
      if (ok) {
        const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(v.name));
        query += `
  #${v.desc} findAll 方法. 它生成一个标准的 SELECT 查询,该查询将从表中检索所有条目(除非受到 where 子句的限制).
  ${className}_findAll(where:Where${className},order:[[String]],limit:Int,offset:Int):[${className}]
  #${v.desc} findByPk 方法使用提供的主键从表中仅获得一个条目.
  ${className}_findByPk(id:ID!):${className}
  #${v.desc} findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).
  ${className}_findOne(where:Where${className}):${className}
  #${v.desc} findAndCountAll 方法是结合了 findAll 和 count 的便捷方法. 在处理与分页有关的查询时非常有用,在分页中,你想检索带有 limit 和 offset 的数据,但又需要知道与查询匹配的记录总数.
  ${className}_findAndCountAll(where:Where${className},order:[[String]],limit:Int!,offset:Int!):Count${className}
`;
        mutation += `
  #${v.desc} 添加
  ${className}_create(data:Add${className}):${className}
  #${v.desc} 删除
  ${className}_destroy(where:Where${className}!):ResDel${className}
  #${v.desc} 更新
  ${className}_update(data:Edit${className}!,where:Where${className}!):ResEdit${className}
`;
      }

    }
    const queryStr = `
type Query {
${query}
}
`;
    const mutationStr = `
type Mutation {
${mutation}
}
`;
    // 生成query和mutation
    const querypath = path.join(this.app.baseDir, 'app', 'graphql', 'query');
    const existquerypath = fsSync.existsSync(querypath);
    if (!existquerypath) {
      await fs.mkdir(querypath);
    }
    const mutationpath = path.join(this.app.baseDir, 'app', 'graphql', 'mutation');
    const existmutationpath = fsSync.existsSync(mutationpath);
    if (!existmutationpath) {
      await fs.mkdir(mutationpath);
    }
    const queryfile = path.join(querypath, 'schema.graphql');
    try {
      const querydata = new Uint8Array(Buffer.from(queryStr));
      await fs.writeFile(queryfile, querydata);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
    const mutationfile = path.join(mutationpath, 'schema.graphql');
    try {
      const mutationdata = new Uint8Array(Buffer.from(mutationStr));
      await fs.writeFile(mutationfile, mutationdata);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  }
  // 生成路由
  async routes() {
    const { helper } = this.ctx;
    const rl = await this.ctx.model.SysRoutes.findAll({
      include: [{ model: this.ctx.model.SysRoutesClassify }],
      order: [[ 'sort', 'ASC' ]],
      where: { admin: true },
    });
    // console.log(JSON.stringify(rl, null, 2));
    let item = '';
    for (const v of rl) {
      let middleware = '';
      if (v.sys_routes_classify.middleware && v.middleware) {
        middleware = `${v.sys_routes_classify.middleware},${v.middleware}`;
      } else if (v.sys_routes_classify.middleware) {
        middleware = `${v.sys_routes_classify.middleware}`;
      } else if (v.middleware) {
        middleware = `${v.middleware}`;
      }
      const ignoreMiddleware = v.ignoreMiddleware ? v.ignoreMiddleware.split(',') : [];
      // console.log(middleware.split(','));
      // console.log([ ...ignoreMiddleware, '' ]);
      const mw = helper._.difference(middleware.split(','), [ ...ignoreMiddleware, '' ]);
      // console.log(cw._.uniq(mw));
      const marr = [];
      for (const m of helper._.uniq(mw)) {
        if (m) {
          marr.push(`app.middleware.${m}()`);
        }

      }
      // console.log(marr.join(','));
      const mstr = helper._.isEmpty(marr.join(', ')) ? ', ' : `, ${marr.join(', ')}, `;
      let controller;
      if (v.verb === 'resources') {
        controller = `'${v.controller}'`;
      } else if (v.verb === 'redirect') {
        controller = 302;
      } else {
        controller = `'${v.controller}.${v.action}'`;
      }
      item += `  app.router.${v.verb}('${v.name}', '${v.path}'${mstr}${controller});
`;
    }
    const routerData = `'use strict';
module.exports = app => {
${item}
};
`;
    const appDir = path.join(this.app.baseDir, 'app', 'router');
    const fileName = 'cw_router.js';
    const file = path.join(appDir, fileName);
    const exist = fsSync.existsSync(appDir);
    if (!exist) {
      await fs.mkdir(appDir);
    }
    try {
      const data = new Uint8Array(Buffer.from(routerData));
      await fs.writeFile(file, data);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  }
  // 生成页面
  async pages(data) {
    if (data.linkType === 'schemaApi' && !data.admin && !this.ctx.helper._.isEmpty(data.link)) {
      const url = data.link.split(':');
      if (url[0] === 'get') {
        const ff = path.join(this.app.baseDir, 'app', url[1]);
        console.log(ff);
        const exist = fsSync.existsSync(ff);
        console.log(exist);
        if (!exist) {
          const mulu = path.join(this.app.baseDir, 'app', path.dirname(url[1]));
          this.ctx.helper.mkdirsSync(mulu);
          const sdata = { type: 'page', title: data.name, body: [{ type: 'tpl', tpl: '请编辑您的页面' }] };
          try {
            const schemaData = new Uint8Array(Buffer.from(JSON.stringify(sdata)));
            await fs.writeFile(ff, schemaData);
          // Abort the request before the promise settles.
          } catch (err) {
          // When a request is aborted - err is an AbortError
            console.error(err);
          }
        }

      }
    }
  }
  // 生成 contract
  async contract() {
    const { ctx } = this;
    // 获取全部模型
    const map = {};
    map.include = [{
      model: ctx.model.SysModelsFields,
    }];
    const allModels = await ctx.model.SysModels.findAll(map);
    // console.log(JSON.stringify(allModels, null, 2));
    let contract = '';
    for (const v of allModels) {
      let item = '';
      let add = '';
      let edit = '';
      for (const f of v.sys_models_fields) {
        let type = '';
        if (f.type === 'BOOLEAN') {
          type = 'boolean';
        } else if (v.type === 'INTEGER' || v.type === 'BIGINT') {
          type = 'integer';
        } else if (f.type === 'FLOAT' || f.type === 'DOUBLE' || f.type === 'DECIMAL') {
          type = 'number';
        } else if (f.type === 'STRING' || f.type === 'TEXT' || f.type === 'UUID' || f.type === 'JSON') {
          type = 'string';
        } else if (v.type === 'DATE' || v.type === 'DATEONLY') {
          type = 'string';
        } else if (v.type === 'ENUM') {
          type = 'string';
        } else {
          type = 'string';
        }
        item += `${f.name}: { type: '${type}', description: '${f.comment}' },
    `;
        if (f.add) {
          add += `${f.name}: { type: '${type}', description: '${f.comment}', required: ${f.allowNull} },
    `;
        }
        if (f.edit) {
          edit += `${f.name}: { type: '${type}', description: '${f.comment}' },
    `;
        }
      }
      contract += `
  // ${v.desc}
  ${v.name}_item: {
    ${item}
  },
  ${v.name}_add: {
    ${add}
  },
  ${v.name}_edit: {
    ${edit}
  },
`;
    }
    // console.log(contract);
    const file = `
'use strict';
// 本文件由Cmswing系统生成，请勿修改！
module.exports = {
  ${contract}
};
`;
    // console.log(file);
    // console.log(modeDoc);
    const filepath = path.join(this.app.baseDir, 'app', 'contract', 'models.js');
    try {
      const data = new Uint8Array(Buffer.from(file));
      await fs.writeFile(filepath, data);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  }
}
module.exports = GenerateService;
