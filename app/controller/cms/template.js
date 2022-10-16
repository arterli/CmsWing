'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
const fs = require('fs-extra');
const path = require('path');
const compressing = require('compressing');
/**
* @controller cms模板管理
*/
class TemplateController extends Controller {
  /**
  * @summary 模板列表
  * @description 模板列表
  * @router get /admin/cms/template
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    if (data.email) {
      map.where.email = { [Op.like]: `%${data.email}%` };
    }
    if (data.mobile) {
      map.where.mobile = { [Op.like]: `%${data.mobile}%` };
    }
    if (data.uuid) {
      map.where.uuid = { [Op.eq]: data.uuid };
    }
    if (data.state) {
      map.where.state = { [Op.eq]: data.state === '1' };
    }
    map.order = [[ 'id', 'asc' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.distinct = true;
    const list = await ctx.model.CmsTemplate.findAndCountAll(map);
    for (const v of list.rows) {
      v.dataValues.avatar = `/public/cms/${v.path}-${v.uuid}/images/logo/icon_512x512.png`;
    }
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 添加模板
  * @description 添加模板
  * @router post /admin/cms/template/add
  * @request body cms_template_add #body desc
  * @response 200 baseRes desc
  */
  async add() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.CmsTemplate.create(data);
    const def = await ctx.model.CmsTemplateList.findAll({ where: { template_uuid: '1f8dda2a-6e9e-4762-a273-1bc138ec9ffa' }, order: [[ 'id', 'ASC' ]] });
    for (const v of def) {
      const adddata = {};
      adddata.template_uuid = add.uuid;
      adddata.title = v.title;
      adddata.name = v.name;
      adddata.type = v.type;
      adddata.html = v.html;
      adddata.isd = v.isd;
      adddata.isu = v.isu;
      await ctx.model.CmsTemplateList.create(adddata);
    }
    const temp = path.join(this.app.baseDir, 'app', 'view', 'cms', 'default-1f8dda2a-6e9e-4762-a273-1bc138ec9ffa');
    const newtemp = path.join(this.app.baseDir, 'app', 'view', 'cms', `${add.path}-${add.uuid}`);
    ctx.helper.mkdirsSync(newtemp);
    await fs.copy(temp, newtemp);
    const pub = path.join(this.app.baseDir, 'app', 'public', 'cms', 'default-1f8dda2a-6e9e-4762-a273-1bc138ec9ffa');
    const newpub = path.join(this.app.baseDir, 'app', 'public', 'cms', `${add.path}-${add.uuid}`);
    ctx.helper.mkdirsSync(newpub);
    await fs.copy(pub, newpub);
    this.success(add);
  }
  /**
  * @summary 删除模板
  * @description 删除模板
  * @router get /admin/cms/template/del
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async del() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const info = await ctx.model.CmsTemplate.findOne({ where: { uuid } });
    if (!info) return this.fail('无效参数');
    const temp = path.join(this.app.baseDir, 'app', 'view', 'cms', `${info.path}-${info.uuid}`);
    await fs.remove(temp);
    const pub = path.join(this.app.baseDir, 'app', 'public', 'cms', `${info.path}-${info.uuid}`);
    await fs.remove(pub);
    const del = await ctx.model.CmsTemplate.destroy({ where: { uuid } });
    await ctx.model.CmsTemplateList.destroy({ where: { template_uuid: uuid } });
    this.success(del);
  }
  /**
  * @summary 编辑模板
  * @description 编辑模板
  * @router post /admin/cms/template/edit
  * @request body cms_template_add #body desc
  * @response 200 baseRes desc
  */
  async edit() {
    const { ctx } = this;
    const { info } = ctx.request.body;
    const add = await ctx.model.CmsTemplate.update(info, { where: { uuid: info.uuid } });
    this.success(add);
  }
  /**
  * @summary 使用模板
  * @description 使用模板
  * @router get /admin/cms/template/use
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async use() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const up = await ctx.model.CmsTemplate.update({ isu: true }, { where: { uuid } });
    await ctx.model.CmsTemplate.update({ isu: false }, { where: { uuid: { [Op.ne]: uuid } } });
    this.success(up);
  }
  /**
  * @summary 模板详情
  * @description 模板详情
  * @router get /admin/cms/template/info
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async info() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const info = (await ctx.model.CmsTemplate.findOne({ where: { uuid } })).toJSON();
    info.preview = `/public/cms/${info.path}-${info.uuid}/images/index.png`;
    this.success({ info });
  }
  /**
  * @summary 模板列表
  * @description 模板列表
  * @router get /admin/cms/template/list
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    map.include = 'cms_template';
    map.where.template_uuid = { [Op.eq]: data.template_uuid };
    map.where.type = data.cat || 'index';
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    if (data.title) {
      map.where.title = { [Op.like]: `%${data.title}%` };
    }
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    map.order = [[ 'isu', 'DESC' ], [ 'id', 'ASC' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.distinct = true;
    const list = await ctx.model.CmsTemplateList.findAndCountAll(map);
    for (const v of list.rows) {
      const temp = path.join(this.app.baseDir, 'app', 'view', 'cms', `${v.cms_template.path}-${v.cms_template.uuid}`, `${v.type}_${v.name}.html`);
      try {
        const html = await fs.readFile(temp, 'utf8');
        v.dataValues.html = html;
      } catch (err) {
        console.error(err);
      }
    }
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 添加模板文件
  * @description 添加模板文件
  * @router post /admin/cms/template/listadd
  * @request body cms_template_list_add *body desc
  * @response 200 baseRes desc
  */
  async listadd() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.CmsTemplateList.create(data);
    const mulu = path.join(this.app.baseDir, 'app', 'view', 'cms', data.path);
    ctx.helper.mkdirsSync(mulu);
    const wenjian = path.join(mulu, `${data.type}_${data.name}.html`);
    console.log(mulu, wenjian);
    try {
      const tempData = new Uint8Array(Buffer.from(data.html));
      await fs.writeFile(wenjian, tempData);
    } catch (err) {
      console.error(err);
    }
    this.success(add);
  }
  /**
  * @summary 编辑模板文件
  * @description 编辑模板文件
  * @router post /admin/cms/template/listedit
  * @request body cms_template_list_edit *body desc
  * @response 200 baseRes desc
  */
  async listedit() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.CmsTemplateList.update(data, { where: { uuid: data.uuid } });
    const mulu = path.join(this.app.baseDir, 'app', 'view', 'cms', data.path);
    ctx.helper.mkdirsSync(mulu);
    const wenjian = path.join(mulu, `${data.type}_${data.name}.html`);
    console.log(mulu, wenjian);
    try {
      const tempData = new Uint8Array(Buffer.from(data.html));
      await fs.writeFile(wenjian, tempData);
    } catch (err) {
      console.error(err);
    }
    this.success(edit);
  }
  /**
  * @summary 删除模板文件
  * @description 删除模板文件
  * @router get /admin/cms/template/listdel
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async listdel() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const info = await ctx.model.CmsTemplateList.findOne({ where: { uuid }, include: 'cms_template' });
    const mulu = path.join(this.app.baseDir, 'app', 'view', 'cms', `${info.cms_template.path}-${info.cms_template.uuid}`);
    const wenjian = path.join(mulu, `${info.type}_${info.name}.html`);
    try {
      await fs.remove(wenjian);
    } catch (err) {
      console.error(err);
    }
    const del = await ctx.model.CmsTemplateList.destroy({ where: { uuid } });
    this.success(del);
  }
  /**
  * @summary 使用首页模板
  * @description 使用首页模板
  * @router get /admin/cms/template/listuse
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async listuse() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const info = await ctx.model.CmsTemplateList.findOne({ where: { uuid }, include: 'cms_template' });
    const up = await ctx.model.CmsTemplateList.update({ isu: true }, { where: { uuid } });
    await ctx.model.CmsTemplateList.update({ isu: false }, { where: { uuid: { [Op.ne]: uuid }, template_uuid: info.template_uuid } });
    this.success(up);
  }
  /**
  * @summary 导出模板
  * @description 导出模板
  * @router get /admin/cms/template/export
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async export() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const temp = (await ctx.model.CmsTemplate.findOne({ where: { uuid }, attributes: { exclude: [ 'id', 'createdAt', 'updatedAt' ] } })).toJSON();
    const templist = (await ctx.model.CmsTemplateList.findAll({ where: { template_uuid: temp.uuid }, order: [[ 'id', 'ASC' ]], attributes: { exclude: [ 'id', 'createdAt', 'updatedAt' ] } })).map(item => item.toJSON());
    // console.log(temp);
    // console.log(templist);
    const mulu = path.join(this.app.baseDir, 'app', 'public', `export${new Date().getTime()}`);
    const tempmulu = path.join(mulu, 'template');
    ctx.helper.mkdirsSync(tempmulu);
    await fs.writeJSON(path.join(tempmulu, 'temp.json'), temp);
    await fs.writeJSON(path.join(tempmulu, 'templist.json'), { list: templist });
    const oldtemp = path.join(this.app.baseDir, 'app', 'view', 'cms', `${temp.path}-${temp.uuid}`);
    const newtemp = path.join(tempmulu, 'view', `${temp.path}-${temp.uuid}`);
    await fs.copy(oldtemp, newtemp);
    const pub = path.join(this.app.baseDir, 'app', 'public', 'cms', `${temp.path}-${temp.uuid}`);
    const newpub = path.join(tempmulu, 'public', `${temp.path}-${temp.uuid}`);
    await fs.copy(pub, newpub);
    const file = path.join(mulu, `${temp.path}-${temp.uuid}.tar`);
    // console.log(tempmulu, file);
    await compressing.tar.compressDir(tempmulu, file);
    const fileName = `${temp.path}-${temp.uuid}.tar`;
    // ctx.attachment([filename], [options]) 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。
    ctx.attachment(fileName, {
      fallback: true,
      type: 'attachment', // [string] attachment/inline
    });
    const fileSize = fs.statSync(file).size;
    ctx.set('Content-Length', fileSize);
    ctx.set('Content-Disposition', `attachment; filename=${fileName}`);
    ctx.body = fs.createReadStream(file);
    await fs.remove(mulu);
    // ctx.downloader('./package.json');
    // this.success(1);
  }
  /**
  * @summary 导入模板
  * @description 导入模板
  * @router post /admin/cms/template/import
  * @request body cms_template_add body desc
  * @response 200 baseRes desc
  */
  async import() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const mulu = path.join(this.app.baseDir, 'app', 'public', `import${new Date().getTime()}`);
    try {
      // 处理文件，比如上传到云端
      // console.log(file);
      await compressing.tar.uncompress(file.filepath, mulu);
      const temp = await fs.readJSON(path.join(mulu, 'template', 'temp.json'));
      const templist = await fs.readJSON(path.join(mulu, 'template', 'templist.json'));
      const [ cms_template, created ] = await ctx.model.CmsTemplate.findOrCreate({
        where: { uuid: temp.uuid },
        defaults: temp,
      });
      if (!created) throw new Error('该模板已经存在！');
      console.log(temp);
      console.log(templist);
      for (const v of templist.list) {
        await ctx.model.CmsTemplateList.findOrCreate({
          where: { uuid: v.uuid },
          defaults: v,
        });
      }
      const oldtemp = path.join(mulu, 'template', 'view', `${temp.path}-${temp.uuid}`);
      const newtemp = path.join(this.app.baseDir, 'app', 'view', 'cms', `${temp.path}-${temp.uuid}`);
      await fs.copy(oldtemp, newtemp);
      const pub = path.join(mulu, 'template', 'public', `${temp.path}-${temp.uuid}`);
      const newpub = path.join(this.app.baseDir, 'app', 'public', 'cms', `${temp.path}-${temp.uuid}`);
      await fs.copy(pub, newpub);
      // throw new Error('上传失败');
    } catch (e) {
      console.log(e);
      return this.fail(e.toString());
    } finally {
      // 需要删除临时文件
      await fs.remove(mulu);
      await fs.unlink(file.filepath);
    }
    this.success(1);
  }
  /**
  * @summary 获取模板
  * @description 获取模板
  * @router get /admin/cms/template/getTemplate
  * @request query string *type desc
  * @response 200 baseRes desc
  */
  async getTemplate() {
    const { ctx } = this;
    const { type } = ctx.query;
    const temp = await ctx.model.CmsTemplate.findOne({ where: { isu: true } });
    const map = {};
    map.where = {};
    map.where.type = type;
    map.where.template_uuid = temp.uuid;
    const list = await ctx.model.CmsTemplateList.findAll(map);
    const arr = [{ label: '默认模板', value: '' }];
    for (const v of list) {
      const obj = {};
      obj.label = `${v.title}(${v.type}_${v.name}.html)`;
      obj.value = `${v.type}_${v.name}.html`;
      arr.push(obj);
    }
    this.success(arr);
  }
}
module.exports = TemplateController;
