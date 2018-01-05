// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  // 获取表结构
  async getSchema() {
    return await this.db().getSchema();
  }
  // 获取基础数据
  async detail(id) {
    let map;
    if (think.isNumberString(id)) {
      map = {id: id};
    } else {
      map = {name: id};
    }
    // console.log(map);
    let info = await this.where(map).find();
    if (think.isEmpty(info)) {
      return {errno: 702, errmsg: '数据不存在'};
    } else if (!think.isObject(info) || info.status != 1) {
      return {errno: 702, errmsg: '文档被禁用或已删除'};
    }
    // 获取模型数据
    const table = await this.model('cmswing/model').get_table_name(info.model_id);
    const details = await this.model(table).find(info.id);
    info = think.extend({}, info, details);
    return info;
  }

  /**
     * 获取详情页数据
     * @param id
     * @returns {*}
     */
  async details(id) {
    // 获取基础数据
    let info = await this.field(true).find(id);
    if (!(think.isObject(info) || info.status !== 1)) {
      this.fail('文档被禁用或已删除！');
      return false;
    }
    // 获取模型数据
    const table = await this.model('cmswing/model').get_table_name(info.model_id);
    const detail = await this.model(table).find(id);
    info = think.extend({}, info, detail);
    return info;
  }

  /**
     * 更新或者新增一个文档
     * @param data 手动传入的数据
     * @returns boolean fasle 失败 ， int  成功 返回完整的数据
     */
  async updates(data, time = new Date().getTime()) {

    if(!think.isEmpty(data.position)){
      if(!think.isArray(data.position)){
        data.position = data.position || 0;
      } else {
        let pos = 0;
        for (let p of data.position){
          pos += p;
        }
        data.position = pos;
      }
    }
    // 获取子表的表明
    const model = await this.modelinfo(data.model_id);
    // console.log(model);

    for (const v in data) {
      const vs = v.split('|||');

      if (vs.length > 1) {
        // console.log(data[v]);
        data[vs[1]] = (think.isEmpty(data[v]) || data[v] == 0) ? 0 : new Date(data[v]).getTime();
      };
    }
    // console.log(data);
    data = data || null;
    console.log(data);
    // 检查文档类型是否符合要求
    const type = data.type || 2;
    const pid = data.pid;
    const res = await this.checkdoctype(type, pid);
    if (res.errno > 0) {
      this.error = res.errmsg;
      return false;
    }
    data.update_time = new Date().getTime();
    // console.log(data);
    // return false;
    // 添加或者新增基础内容
    if (think.isEmpty(data.id)) {
      const result = await this.transaction(async() => {
        // 新增数据
        if (think.isEmpty(data.create_time)) {
          data.create_time = time;
        } else {
          data.create_time = data.create_time != 0 ? new Date(data.create_time).valueOf() : time;
        }
        // 获取状态
        const check = await this.model('category').db(this.db()).where({id: data.category_id}).getField('check', true);
        data.status = check ? 2 : 1;
        const id = await this.add(data);// 添加基础数据
        // 添加分类信息
        if (data.sort_id != 0 && !think.isEmpty(data.sort_id)) {
          const sortarr = [];
          const sortdata = {};
          for (const k in data) {
            const arr = k.split('_');
            if (arr[0] == 'sortid' && !think.isEmpty(arr[1])) {
              const obj = {};
              obj.value = think.isArray(data[k]) ? JSON.stringify(data[k]) : data[k];
              obj.optionid = await this.model('typeoption').db(this.db()).where({identifier: arr[1]}).getField('optionid', true);
              obj.sortid = data.sort_id;
              obj.fid = data.category_id;
              obj.tid = id;
              sortarr.push(obj);
              sortdata[arr[1]] = think.isArray(data[k]) ? JSON.stringify(data[k]) : data[k];
              sortdata.tid = id;
              sortdata.fid = data.category_id;
            }
          }
          // 添加分类
          await this.model('typeoptionvar').db(this.db()).addMany(sortarr);
          await this.model('type_optionvalue' + data.sort_id).db(this.db()).add(sortdata);
        }
        // 添加关键词
        /**
         * 添加话题
         * @param keyname "话题1,话题2.话题3"
         * @param id  "主题id"
         * @param uid "用户id"
         * @param mod_id "模型id"
         * @param mod_type "模型类型 0系统模型，1独立模型"
         */
        await this.model('cmswing/keyword').db(this.db()).addkey(data.keyname, id, data.uid, data.model_id, 0, this.db());
        // 添加到搜索
        await this.model('cmswing/search').db(this.db()).addsearch(data.model_id, id, data, this.db());
        data.id = id;
        await this.model(model).db(this.db()).add(data);
        data.id = null;
        return id;
      });
      // console.log(result);
      if (result) {
        return {data: data, id: result};
      } else {
        return false;
      }
    } else { // 更新内容
      const result = await this.transaction(async() => {
        data.status = await this.getStatus(data.id, data.category_id);
        if (!think.isEmpty(data.create_time)) {
          data.create_time = data.create_time != 0 ? new Date(data.create_time).valueOf() : new Date().getTime();
        }
        // 更新关键词
        await this.model('cmswing/keyword').db(this.db()).updatekey(data.keyname, data.id, data.userid, data.model_id, 0, this.db());
        const status = await this.update(data);

        // 更新搜索
        await this.model('cmswing/search').db(this.db()).updatesearch(data.model_id, data, this.db());
        if (data.sort_id != 0 && !think.isEmpty(data.sort_id)) {
          const sortdata = {};
          const sortarr = [];
          for (const k in data) {
            const arr = k.split('_');
            if (arr[0] == 'sortid' && !think.isEmpty(arr[1])) {
              const obj = {};
              obj.value = think.isArray(data[k]) ? JSON.stringify(data[k]) : data[k];
              obj.optionid = await this.model('typeoption').db(this.db()).where({identifier: arr[1]}).getField('optionid', true);
              obj.sortid = data.sort_id;
              obj.fid = data.category_id;
              obj.tid = data.id;
              sortarr.push(obj);
              sortdata[arr[1]] = think.isArray(data[k]) ? JSON.stringify(data[k]) : data[k];
              sortdata.tid = data.id;
              sortdata.fid = data.category_id;
            }
          }
          // console.log(sortarr);
          // console.log(sortdata);
          const cou = await this.model('type_optionvalue' + data.sort_id).db(this.db()).where({tid: data.id}).count('tid');
          if (cou > 0) {
            await this.model('type_optionvalue' + data.sort_id).db(this.db()).where({tid: data.id}).update(sortdata);
          } else {
            await this.model('type_optionvalue' + data.sort_id).db(this.db()).add(sortdata);
          }
          await this.model('typeoptionvar').db(this.db()).where({tid: data.id}).delete();
          // 添加分类
          await this.model('typeoptionvar').db(this.db()).addMany(sortarr);
        }

        await this.model(model).db(this.db()).update(data);
        return status;
      });
      if (!result) {
        return false;
      } else {
        return {data: data, id: false};
      }
    }
  }
  /**
   * 添加或者新增扩展内容
   * 获取当前扩模型表名字
   * @type {array}
   */
  async modelinfo(mdoelid) {
    const modelinfo = await this.model('cmswing/model').get_document_model(mdoelid);
    let model;
    if (modelinfo.extend == 1) {
      model = `document_${modelinfo.name}`;
    } else {
      model = modelinfo.name;
    }
    return model;
  }
  /**
     * 检擦指定文档下面自文档的类型
     * @param type 子文档的类型
     * @param pid  父文档类型
     * @returns {errno: 0,errmsg: "",data: {name: ""}}
     */

  async checkdoctype(type, pid) {
    type = type || null, pid = pid || null;
    const res = {
      errno: 0,
      errmsg: '',
      data: {
        name: ''
      }
    };
    if (think.isEmpty(type)) {
      return {
        errno: 100,
        errmsg: '文档类型不能为空',
        data: ''
      };
    }
    if (think.isEmpty(pid) || pid == 0) {
      return res;
    }
    // 查询父文档的类型
    const ptype = think.isNumberString(pid) ? await this.where({id: pid}).getField('type', true) : await this.where({name: pid}).getField('type', true);
    // console.log(ptype);
    // 父文档为目录时
    switch (ptype) {
      case 1: // 目录
      case 2: // 主题
        break;
      case 3: // 段落
        return {
          errno: 100,
          errmsg: '段落下面不允许再添加子内容',
          data: ''
        };
      default:
        return {
          errno: 100,
          errmsg: '父文档类型不正确',
          data: ''
        };
    }
    return res;
  }

  /**
     * 获取数据状态
     * @param id  文章id
     * @param cid 分类id
     * @returns {*}
     */
  async getStatus(id, cid) {
    id = id || null;
    let status;
    if (think.isEmpty(id)) { // 新增
      const check =	await this.model('category').where({id: cid}).getField('check', true);
      status = check ? 2 : 1;
    } else { // 更新
      status = await this.where({id: id}).getField('status', true);
      // 编辑草稿改变状态
      if (status == 3) {
        status = 1;
      }
    }
    return status;
  }

  /**
     * 返回模型的错误信息
     * @access public
     * @return string
     */
  getError() {
    return this.error;
  }
};
