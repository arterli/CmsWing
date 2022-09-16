'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller cms文档
*/
class DocController extends Controller {
  /**
  * @summary 分类列表
  * @description 分类列表
  * @router get /admin/cms/doc/index
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    const map = {};
    map.where = {};
    let isSub,
      type,
      classifyId,
      modelName,
      models_uuid,
      title;
    if (data.classifyId && data.classifyId !== '0') {
      const classify = await ctx.model.CmsClassify.findByPk(data.classifyId);
      const model = await ctx.model.SysModels.findOne({ where: { uuid: classify.models_uuid } });
      isSub = !!classify.sub;
      title = classify.title;
      classifyId = classify.id;
      modelName = model.desc;
      models_uuid = classify.models_uuid;
      type = [];
      for (const v of classify.type.split(',')) {
        const obj = {};
        if (v == 1) {
          obj.label = '目录';
          obj.value = v;
        } else if (v == 2) {
          obj.label = '主题';
          obj.value = v;
        } else if (v == 3) {
          obj.label = '段落';
          obj.value = v;
        }
        type.push(obj);
      }
      const ids = await ctx.service.cms.classify.getSubClassifyIds(data.classifyId);
      map.where.classify_id = { [Op.in]: ids };
    } else {
      isSub = false;
      title = '全部分类';
    }
    // console.log(ctx.query);
    const page = data.page || 1;
    const limit = data.perPage || 15;
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'level', 'DESC' ], [ 'id', 'DESC' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    const sub = await ctx.service.cms.classify.subQuery(data.classifyId, data);
    console.log(JSON.stringify(sub, null, 2));
    if (!ctx.helper._.isEmpty(sub)) {
      map.where.classify_sub = sub;
    }
    if (data.doc_title) {
      map.where.title = { [Op.like]: `%${data.doc_title}%` };
    }
    if (data.doc_position) {
      map.where.op_or = [];
      const { Sequelize } = this.app;
      for (const v of data.doc_position.split(',')) {
        map.where.op_or.push(Sequelize.where(Sequelize.fn('FIND_IN_SET', v, Sequelize.col('position')), '>', 0));
      }
    }
    if (data.doc_type) {
      map.where.type = { [Op.eq]: data.doc_type };
    }
    if (data.doc_status) {
      map.where.status = { [Op.eq]: data.doc_status };
    }
    map.where.pid = 0;
    if (data.pid) {
      map.where.pid = data.pid;
    }
    console.log(map);

    const list = await ctx.model.CmsDoc.findAndCountAll(map);
    for (const v of list.rows) {
      v.dataValues.positionarr = v.position ? v.position.split(',') : [];
      const models = await ctx.model.SysModels.findOne({ where: { uuid: v.models_uuid } });
      const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(models.name));
      v.dataValues[models.name] = await ctx.model[className].findOne({ where: { doc_id: v.id } });
      v.dataValues.modelName = models.desc;
      v.dataValues.pathTitle = (await ctx.service.cms.classify.info(v.classify_id)).pathTitle;
    }
    this.success({ items: list.rows, total: list.count, classify: { isSub, title, type, id: classifyId, modelName, models_uuid } });
  }
  /**
  * @summary 获取父级文档
  * @description 获取父级稳定
  * @router get /admin/cms/doc/pdoc
  * @request query integer pid desc
  * @response 200 baseRes desc
  */
  async pdoc() {
    const { ctx } = this;
    const { pid } = ctx.query;
    const pdoc = await ctx.service.cms.doc.pdoc(pid);
    console.log(pdoc);
    const buttons = [];
    for (const v of pdoc) {
      buttons.push({
        type: 'button',
        label: `${v.title}`,
        tooltip: `${v.title}`,
        icon: 'fa-solid fa-chevron-left',
        actionType: 'reload',
        target: `docList?pid=${v.pid}`,
      });
    }
    const breadcrumb = {
      type: 'button-group',
      buttons,
    };
    this.success(breadcrumb);
  }
  /**
  * @summary 获取全部分类节点
  * @description 获取全部分类节点
  * @router get /admin/cms/doc/topClassify
  * @response 200 baseRes errorCode:0成功
  */
  async topClassify() {
    const { ctx } = this;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    map.attributes = [[ 'title', 'label' ], [ 'id', 'value' ], 'id', 'pid', 'sub' ];
    const list = await ctx.model.CmsClassify.findAll(map);
    for (const v of list) {
      v.dataValues.sub = !!v.sub;
    }
    const tree = ctx.helper.arr_to_tree(list, 0);
    this.success({ options: [{ label: '全部分类', value: 0, sub: false }, ...tree ] });
  }
  /**
 * @summary 获取子分类
 * @description 获取子分类
 * @router get /admin/cms/doc/classifySub
 * @request query integer id desc
 * @response 200 baseRes desc
 */
  async classifySub() {
    const { ctx } = this;
    const { id } = ctx.query;
    let res = [];
    if (id && id !== '0') {
      const classify = await ctx.model.CmsClassify.findByPk(id);
      // isSub = !!classify.sub;
      // console.log(JSON.parse(classify.sub, null, 2));
      const sub = classify.sub ? JSON.parse(classify.sub) : [];
      const subarr = [];
      // let i = 0;
      for (const v of sub) {
        const obj = {};
        obj.label = v.label;
        obj.name = `${v.name}${classify.id}`;
        obj.type = v.type;
        if (obj.type === 'radios') {
          obj.selectFirst = true;
          obj.options = [{ label: '全部', value: 'all' }];
        } else {
          obj.options = [];
          obj.checkAll = true;
        }
        for (const key in v.options) {
          if (Object.hasOwnProperty.call(v.options, key)) {
            const optobj = {};
            const element = v.options[key];
            optobj.label = key;
            optobj.value = element;
            obj.options.push(optobj);
          }
        }
        subarr.push(obj);
      }
      // console.log(JSON.stringify(subarr, null, 2));
      res = subarr;
    }
    this.success(res);
  }
  /**
 * @summary 获取子分类
 * @description 获取子分类
 * @router get /admin/cms/doc/classifySubFrom
 * @request query integer id desc
 * @response 200 baseRes desc
 */
  async classifySubFrom() {
    const { ctx } = this;
    const { id } = ctx.query;
    let res = [];
    if (id && id !== '0') {
      const classify = await ctx.model.CmsClassify.findByPk(id);
      // isSub = !!classify.sub;
      // console.log(JSON.parse(classify.sub, null, 2));
      const sub = classify.sub ? JSON.parse(classify.sub) : [];
      const subarr = [];
      // let i = 0;
      for (const v of sub) {
        const obj = {};
        obj.label = v.label;
        obj.name = `classify_sub.${v.name}${classify.id}`;
        obj.type = 'select';
        obj.options = [];
        if (v.type === 'radios') {
          obj.multiple = false;
        } else {
          obj.multiple = true;
        }
        for (const key in v.options) {
          if (Object.hasOwnProperty.call(v.options, key)) {
            const optobj = {};
            const element = v.options[key];
            optobj.label = key;
            optobj.value = element;
            obj.options.push(optobj);
          }
        }
        subarr.push(obj);
      }
      // console.log(JSON.stringify(subarr, null, 2));
      const subobj = {};
      if (subarr.length > 0) {
        subobj.type = 'group';
        subobj.mode = 'normal';
        subobj.body = subarr;
      }
      res = subobj;
    }
    this.success(res);
  }
  /**
  * @summary 获取模型表单
  * @description 获取模型表单
  * @router get /admin/cms/doc/getContent
  * @request query string models_uuid desc
  * @response 200 baseRes desc
  */
  async getContent() {
    const { ctx } = this;
    const { models_uuid, type } = ctx.query;
    const map = {};
    map.include = [{
      model: ctx.model.SysModelsFields,
      where: {
        [type]: {
          [Op.eq]: true,
        },
      },
    }];
    map.where = {};
    map.where.uuid = models_uuid;
    const model = await ctx.model.SysModels.findOne(map);
    const body = [];
    // if (model.name === 'cms_doc_article') {
    //   const obj = {};
    //   obj.type = 'input-rich-text';
    //   obj.name = `${model.name}.content`;
    //   obj.label = '内容';
    //   obj.required = true;
    //   obj.options = {
    //     height: 600,
    //   };
    //   body.push(obj);
    // }
    // console.log(JSON.stringify(model, null, 2));
    for (const v of model.sys_models_fields) {
      const obj = {};
      obj.name = `${model.name}.${v.name}`;
      obj.label = v.comment;
      if (v.allowNull) {
        obj.required = true;
      }
      if (model.name === 'cms_doc_article') {
        // 文章
        if (v.name === 'content') {
          obj.type = 'input-rich-text';
          obj.options = {
            height: 600,
          };
        } else {
          obj.type = 'input-text';
        }

      } else if (model.name === 'cms_doc_picture') {
        // 图片
        if (v.name === 'content') {
          obj.type = 'combo';
          obj.multiple = true;
          obj.unique = true;
          obj.draggable = true;
          obj.multiLine = true;
          obj.items = [
            {
              type: 'group',
              mode: 'horizontal',
              className: 'pr-5',
              body: [
                {
                  type: 'input-image',
                  name: 'url',
                  label: '图片',
                  maxLength: 1,
                  receiver: '/upload/adminToken',
                  columnRatio: 2,
                },
                {
                  name: 'desc',
                  type: 'textarea',
                  clearable: true,
                  minRows: 4,
                  showCounter: true,
                  maxLength: 800,
                  label: '简介',
                },
              ],
            },

          ];
        } else {
          obj.type = 'input-text';
        }

      } else if (model.name === 'cms_doc_download') {
        // 下载
        if (v.name === 'content') {
          obj.type = 'combo';
          obj.multiple = true;
          obj.unique = true;
          obj.draggable = true;
          obj.multiLine = true;
          obj.items = [
            {
              type: 'group',
              mode: 'horizontal',
              className: 'pr-5',
              body: [
                {
                  name: 'd_title',
                  label: '下载名称',
                  clearable: true,
                  type: 'input-text',
                  columnRatio: 3,
                },
                {
                  name: 'd_type',
                  label: '下载类型',
                  type: 'select',
                  options: [
                    {
                      label: '本地',
                      value: '1',
                    },
                    {
                      label: '网盘',
                      value: '2',
                    },
                  ],
                  columnRatio: 2,
                },
                {
                  type: 'input-file',
                  name: 'd_url',
                  label: '上传文件',
                  accept: '*',
                  receiver: '/upload/adminToken',
                  visibleOn: '${d_type==="1"}',
                },
                {
                  name: 'd_url',
                  label: '网盘地址',
                  type: 'input-text',
                  clearable: true,
                  visibleOn: '${d_type==="2"}',
                },
                {
                  name: 'd_password',
                  type: 'input-text',
                  clearable: true,
                  label: '网盘密码',
                  visibleOn: '${d_type==="2"}',
                  columnRatio: 2,
                },
              ],
            },

          ];
        } else {
          obj.type = 'input-text';
        }
      }
      body.push(obj);
    }
    this.success(body);
  }
  /**
  * @summary 添加内容
  * @description 添加内容
  * @router post /admin/cms/doc/docAdd
  * @request body cms_classify_add body desc
  * @response 200 baseRes desc
  */
  async docAdd() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.CmsDoc.create(data);
    if (data.cms_doc_article) {
      data.cms_doc_article.doc_id = add.id;
      await ctx.model.CmsDocArticle.create(data.cms_doc_article);
    } else if (data.cms_doc_picture) {
      data.cms_doc_picture.doc_id = add.id;
      await ctx.model.CmsDocPicture.create(data.cms_doc_picture);
    } else if (data.cms_doc_download) {
      data.cms_doc_download.doc_id = add.id;
      await ctx.model.CmsDocDownload.create(data.cms_doc_download);
    }
    this.success(add);
  }
  /**
  * @summary 编辑内容
  * @description 编辑内容
  * @router post /admin/cms/doc/docEdit
  * @request body cms_doc_edit body desc
  * @response 200 baseRes desc
  */
  async docEdit() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.CmsDoc.update(data, { where: { id: data.id } });
    if (data.cms_doc_article) {
      await ctx.model.CmsDocArticle.update(data.cms_doc_article, { where: { doc_id: { [Op.eq]: data.id } } });
    } else if (data.cms_doc_picture) {
      await ctx.model.CmsDocPicture.update(data.cms_doc_picture, { where: { doc_id: { [Op.eq]: data.id } } });
    } else if (data.cms_doc_download) {
      await ctx.model.CmsDocDownload.update(data.cms_doc_download, { where: { doc_id: { [Op.eq]: data.id } } });
    }
    this.success(edit);
  }
  /**
  * @summary 删除文档
  * @description 删除文档
  * @router get /admin/cms/doc/docDel
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async docDel() {
    const { ctx } = this;
    const { id } = ctx.query;
    const ids = await ctx.service.cms.doc.getSubDocIds(id);
    // console.log(ids);
    const doc = await ctx.model.CmsDoc.findOne({ where: { id } });
    const del = await ctx.model.CmsDoc.destroy({ where: { id: { [Op.in]: ids } } });
    const data = await ctx.model.SysModels.findOne({ where: { uuid: doc.models_uuid } });
    const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(data.name));
    await ctx.model[className].destroy({ where: { doc_id: { [Op.in]: ids } } });
    this.success(del);
  }
  /**
  * @summary 获取所属分类
  * @description 获取所属分类
  * @router get /admin/cms/doc/selectClassify
  * @request query string models_uuid desc
  * @response 200 baseRes desc
  */
  async selectClassify() {
    const { ctx } = this;
    const { models_uuid } = ctx.query;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    map.where.models_uuid = models_uuid;
    map.attributes = [[ 'title', 'label' ], [ 'id', 'value' ], 'id', 'pid', 'sub' ];
    const list = await ctx.model.CmsClassify.findAll(map);
    const tree = ctx.helper.arr_to_tree(list, 0);
    this.success({ options: tree });
  }
  /**
  * @summary 排序
  * @description 排序
  * @router get /admin/cms/doc/saveOrder
  * @request body cms_doc_add body desc
  * @response 200 baseRes desc
  */
  async saveOrder() {
    const { ctx } = this;
    const data = ctx.request.body;
    const paixun = async rows => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        await ctx.model.CmsClassify.update({ sort: index }, { where: { id: element.id } });
        if (element.children) {
          paixun(element.children);
        }
      }
    };
    await paixun(data.rows);
    this.success(1);
  }
}
module.exports = DocController;
