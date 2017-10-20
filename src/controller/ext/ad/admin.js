// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.extAdmin {
  /**
   * index action
   * 插件管理入口
   * 广告管理列表
   * @return {Promise} []
   */
  async indexAction() {
    // 获取广告位置列表
    const data = await this.extModel('ad_space').page(this.get('page')).order('spaceid DESC').countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.extDisplay();
  }

  /**
     * 添加广告位
     */
  async addspaceAction() {
    if (this.isPost) {
      const data = this.post();
      const res = await this.model('ext_ad_space').add(data);
      if (res) {
        return this.success({name: '添加成功!'});
      } else {
        return this.fail('添加失败!');
      }
    } else {
      const temp = await this.model('ext_ad_temp').field('tempid,title,name').select();
      // console.log(temp);
      this.assign('temp', temp);
      this.meta_title = '添加广告位';
      return this.extDisplay();
    }
  }

  /**
     * 编辑广告位
     * @returns {Promise.<void>}
     */
  async editspaceAction() {
    if (this.isPost) {
      const data = this.post();
      const res = await this.model('ext_ad_space').where({spaceid: data.spaceid}).update(data);
      if (res) {
        return this.success({name: '更新成功!'});
      } else {
        return this.fail('更新失败!');
      }
    } else {
      const spaceid = this.get('spaceid');
      const temp = await this.model('ext_ad_temp').select();
      // console.log(temp);
      this.assign('temp', temp);
      const space = await this.model('ext_ad_space').find({where: {spaceid: spaceid}});
      this.assign('space', space);
      this.meta_title = '添加广告位';
      return this.extDisplay();
    }
  }
  /**
     * 调用代码
     * @returns {Promise.<void>}
     */
  async codeAction() {
    const spaceid = this.get('spaceid');
    const space = await this.model('ext_ad_space').find({where: {spaceid: spaceid}});
    this.assign('space', space);
    return this.extDisplay();
  }

  /**
     * 预览广告
     * @returns {Promise.<void>}
     */
  async showadAction() {
    const spaceid = this.get('spaceid');
    const ad = await this.model('ext_ad_space').find({where: {spaceid: spaceid}});
    this.assign('ad', ad);
    return this.extDisplay();
  }
  /**
     * 删除广告
     * @returns {Promise.<void>}
     */
  async delspaceAction() {
    const ids = this.para('ids');
    // return this.fail(ids);
    if (think.isEmpty(ids)) {
      return this.fail('缺少参数!');
    }
    // 删除广告位
    const res = await this.model('ext_ad_space').where({spaceid: ['IN', ids]}).delete();
    await this.model('ext_ad').where({spaceid: ['IN', ids]}).delete();
    if (res) {
      // todo 广告缓存后续
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除成功!');
    }
  }
  /**
     * 更新广告缓存
     * @returns {Promise.<void>}
     */
  async adcacheAction() {
    // 获取所有广告位
    const space = await this.model('ext_ad_space').order('spaceid DESC').select();
    for (const v of space) {
      await this.extModel('ad_space').upad(v.spaceid);
    }
    return this.success({name: '更新广告缓存成功!'});
  }
  /**
     * 获取广告模板
     * @returns {Promise.<void>}
     */
  async gettempAction() {
    const name = this.get('name');
    const res = await this.model('ext_ad_temp').fieldReverse('temp').where({name: name}).find();
    return this.json(res);
  }

  /**
     * 广告列表
     * @returns {Promise.<void>}
     */
  async adlistAction() {
    const spaceid = this.get('spaceid');
    const space = await this.model('ext_ad_space').find({where: {spaceid: spaceid}});
    this.assign('space', space);
    const map = {};
    map.spaceid = spaceid;
    // map.status = 1;
    // 获取广告位置列表
    const data = await this.model('ext_ad').page(this.get('page')).where(map).order('sort ASC,addtime DESC').countSelect();
    // console.log(data);
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.extDisplay();
  }

  /**
     * 添加广告
     * @returns {Promise.<void>}
     */
  async addadAction() {
    if (this.isPost) {
      const data = this.post();
      data.addtime = new Date().getTime();
      data.startdate = think.isEmpty(data.startdate) ? new Date().getTime() : new Date(data.startdate).valueOf();
      data.enddate = think.isEmpty(data.enddate) ? new Date(data.startdate).getTime() + (86400000 * 30) : new Date(data.enddate).valueOf();
      if (!think.isEmpty(data.code)) {
        const arr = [];
        const obj = {};
        obj.code = data.code;
        arr.push(obj);
        data.setting = JSON.stringify(arr);
      }
      // console.log(data);
      // return this.fail(1);
      const res = await this.model('ext_ad').add(data);
      // let res =1;
      if (res) {
        // 更新广告位
        await this.extModel('ad_space').upad(data.spaceid);
        // return this.fail(1)
        return this.success({name: '添加成功!', url: '/ext/ad/admin/adlist/?spaceid=' + data.spaceid});
      } else {
        return this.success('添加失败!');
      }
    } else {
      // 获取广告位
      const spaceid = this.get('spaceid');
      const space = await this.model('ext_ad_space').find({where: {spaceid: spaceid}});
      // 获取广告模板
      const temp = await this.model('ext_ad_temp').find({where: {name: space.type}});
      this.assign('space', space);
      this.assign('temp', temp);
      this.meta_title = '添加广告';
      return this.extDisplay();
    }
  }
  /**
     * 编辑广告
     * @returns {Promise.<void>}
     */
  async editadAction() {
    if (this.isPost) {
      const data = this.post();
      data.startdate = think.isEmpty(data.startdate) ? new Date().getTime() : new Date(data.startdate).valueOf();
      data.enddate = think.isEmpty(data.enddate) ? new Date(data.startdate).getTime() + (86400000 * 30) : new Date(data.enddate).valueOf();
      if (!think.isEmpty(data.code)) {
        const arr = [];
        const obj = {};
        obj.code = data.code[data.code.length - 1];
        arr.push(obj);
        data.setting = JSON.stringify(arr);
      }
      // console.log(data);
      // return this.fail(1);
      const res = await this.model('ext_ad').where({id: data.id}).update(data);
      // let res =1;
      if (res) {
        // 更新广告位
        await this.extModel('ad_space').upad(data.spaceid);
        // return this.fail(1)
        return this.success({name: '编辑成功!', url: '/ext/ad/admin/adlist/?spaceid=' + data.spaceid});
      } else {
        return this.success('编辑失败!');
      }
    } else {
      const id = this.get('id');
      const ad = await this.model('ext_ad').find(id);
      this.assign('ad', ad);
      // 获取广告位
      const spaceid = ad.spaceid;
      const space = await this.model('ext_ad_space').find({where: {spaceid: spaceid}});
      // 获取广告模板
      const temp = await this.model('ext_ad_temp').find({where: {name: space.type}});
      this.assign('space', space);
      this.assign('temp', temp);
      this.meta_title = '编辑广告';
      return this.extDisplay();
    }
  }
  /**
     * 删除广告
     * @returns {Promise.<void>}
     */
  async deladAction() {
    const ids = this.para('ids');
    if (think.isEmpty(ids)) {
      return this.fail('缺少参数!');
    }
    const res = await this.model('ext_ad').where({id: ['IN', ids]}).delete();
    if (res) {
      // todo 广告缓存后续
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除成功!');
    }
  }
  /**
     * 广告模板
     * @returns {Promise.<void>}
     */
  async tempAction() {
    // 获取广告位置列表
    const data = await this.extModel('ad_temp').page(this.get('page')).countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.extDisplay();
  }

  /**
     * 添加广告模板
     *
     */
  async addtempAction() {
    if (this.isPost) {
      const data = this.post();
      data.type_images = data.type_images || 0;
      data.type_flash = data.type_flash || 0;
      data.type_text = data.type_text || 0;
      data.type_code = data.type_code || 0;
      // console.log(data);
      const type = {};
      for (const v in data) {
        if (v.split('_')[0] == 'type') {
          type[v.split('_')[1]] = data[v];
        }
      }
      data.type = JSON.stringify(type);
      const res = await this.model('ext_ad_temp').add(data);
      if (res) {
        return this.success({name: '添加成功！', url: '/ext/ad/admin/temp'});
      } else {
        return this.fail('添加失败!');
      }
    } else {
      this.meta_title = '添加广告模板';
      return this.extDisplay();
    }
  }

  /**
     * 编辑模板
     * @returns {Promise.<void>}
     */
  async edittempAction() {
    if (this.isPost) {
      const data = this.post();
      data.type_images = data.type_images || 0;
      data.type_flash = data.type_flash || 0;
      data.type_text = data.type_text || 0;
      data.type_code = data.type_code || 0;
      // console.log(data);
      const type = {};
      for (const v in data) {
        if (v.split('_')[0] == 'type') {
          type[v.split('_')[1]] = data[v];
        }
      }
      data.type = JSON.stringify(type);
      const res = await this.model('ext_ad_temp').where({tempid: data.tempid}).update(data);
      if (res) {
        return this.success({name: '编辑成功！', url: '/ext/ad/admin/temp'});
      } else {
        return this.fail('编辑失败!');
      }
    } else {
      const tempid = this.get('tempid');
      const temp = await this.model('ext_ad_temp').find({where: {tempid: tempid}});
      this.assign('temp', temp);
      this.meta_title = '添加广告模板';
      return this.extDisplay();
    }
  }

  /**
     * 删除广告模板
     * @returns {Promise.<void>}
     */
  async deltempAction() {
    const ids = this.para('ids');
    if (think.isEmpty(ids)) {
      return this.fail('缺少参数!');
    }
    const res = await this.model('ext_ad_temp').where({tempid: ['IN', ids]}).delete();
    if (res) {
      // todo 广告缓存后续
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除成功!');
    }
  }
};
