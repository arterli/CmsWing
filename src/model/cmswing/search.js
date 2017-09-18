// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Segment = require('segment');
module.exports = class extends think.Model {
  /**
     * 添加搜索
     * await this.model("cmswing/search").addsearch(m_id,d_id,data);
     * @param m_id
     * @param d_id
     * @param data
     * @returns {Promise.<void>}
     */
  async addsearch(m_id, d_id, data, db = false) {
    let smodel;
    if (!db) {
      smodel = this.model('search_model');
    } else {
      smodel = this.model('search_model').db(db);
    }
    const search_model = await smodel.where({mod: m_id}).find();
    if (!think.isEmpty(search_model)) {
      const obj = {};
      obj.m_id = m_id;
      obj.d_id = d_id;
      obj.add_time = data[search_model.addtime] || new Date().getTime();
      const dataarr = [];
      for (const v of search_model.data.split(',')) {
        dataarr.push(data[v]);
      }
      // obj.data = dataarr.join(" ");
      const segment = new Segment();
      // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
      segment.useDefault();
      // 开始分词
      const segment_q = segment.doSegment(dataarr.join(' '), {
        simple: true,
        stripPunctuation: true
      });
      obj.data = dataarr.join(' ') + ' ' + segment_q.join(' ');
      await this.add(obj);
    }
  }

  /**
     * 更新搜索
     * await this.model("cmswing/search").updatesearch(m_id,data);
     * @param m_id
     * @param data
     * @returns {Promise.<void>}
     */
  async updatesearch(m_id, data, db = false) {
    let smodel;
    if (!db) {
      smodel = this.model('search_model');
    } else {
      smodel = this.model('search_model').db(db);
    }
    const search_model = await smodel.where({mod: m_id}).find();
    if (!think.isEmpty(search_model)) {
      const obj = {};
      obj.m_id = m_id;
      obj.d_id = data[search_model.pk];
      const dataarr = [];
      for (const v of search_model.data.split(',')) {
        dataarr.push(data[v]);
      }
      // obj.data = dataarr.join(" ");
      const segment = new Segment();
      // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
      segment.useDefault();
      // 开始分词
      const segment_q = segment.doSegment(dataarr.join(' '), {
        simple: true,
        stripPunctuation: true
      });
      obj.data = dataarr.join(' ') + ' ' + segment_q.join(' ');
      await this.where({d_id: obj.d_id, m_id: m_id}).update(obj);
    }
  }

  /**
     * 删除搜索
     * await this.model('cmswing/search').delsearch(m_id,d_id)
     * @param d_id
     * @param m_id
     * @returns {Promise.<void>}
     */
  async delsearch(m_id, d_id) {
    if (!think.isEmpty(d_id)) {
      await this.where({d_id: d_id, m_id: m_id}).delete();
    }
  }
};
