// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  // 添加话题
  /**
     * 添加话题
     * @param keyname "话题1,话题2.话题3"
     * @param id  "主题id"
     * @param uid "用户id"
     * @param mod_id "模型id"
     * @param mod_type "模型类型 0独立模型，1系统模型"
     */
  async addkey(keyname, id, uid, mod_id, mod_type = 1) {
    // 添加关键词
    if (!think.isEmpty(keyname)) {
      let keywrods;
      if (!think.isArray(keyname)) {
        keywrods = keyname.split(',');
      } else {
        keywrods = keyname;
      }
      for (const v of keywrods) {
        const add = await this.thenAdd({keyname: v, discuss_count_update: new Date().getTime(), videonum: 1}, {keyname: v});
        if (add.type == 'exist') {
          await this.where({id: add.id}).update({discuss_count_update: new Date().getTime()});
          await this.where({id: add.id}).increment('videonum', 1);
        }
        await this.model('keyword_data').add({tagid: add.id, docid: id, add_time: new Date().getTime(), uid: uid, mod_type: mod_type, mod_id: mod_id});
      }
    }
  }

  /**
     * 删除话题
     */
  async delkey(docid, mod_id) {
    const tagid = await this.model('keyword_data').where({docid: docid, mod_id: mod_id}).getField('tagid', true);
    if (tagid) {
      await this.model('keyword_data').where({docid: docid, mod_id: mod_id}).delete();
      await this.where({id: tagid}).decrement('videonum');
    }
  }
  /**
     * 添加话题
     * @param keyname "话题1,话题2.话题3"
     * @param id  "主题id"
     * @param uid "用户id"
     * @param mod_id "模型id"
     * @param mod_type "模型类型 0独立模型，1系统模型"
     */
  async updatekey(keyname, id, uid, mod_id, mod_type = 0) {
    const where = {};
    where.docid = id;
    where.mod_type = mod_type;
    where.mod_id = mod_id;
    let keyword;
    const topicid = await this.model('keyword_data').where(where).getField('tagid');
    if (!think.isEmpty(topicid)) {
      keyword = await this.where({id: ['IN', topicid]}).getField('keyname');
    }
    let newkn = keyname;// 新关键词
    if (!think.isEmpty(newkn)) {
      newkn = newkn.split(',');
    } else {
      newkn = [];
    }

    // 还存在的话题
    const okn = [];
    // 新的话题
    const nkn = [];
    for (const k of newkn) {
      if (think._.includes(keyword, k)) {
        okn.push(k);
      } else {
        nkn.push(k);
      }
    }
    // 要删除的话题
    const dkn = think._.xor(okn, keyword);
    // console.log("更新--"+okn);
    // console.log("添加--"+nkn);
    // console.log("删除--"+dkn);

    if (!think.isEmpty(dkn)) {
      const did = await this.where({keyname: ['IN', dkn]}).getField('id');
      where.tagid = ['in', did];
      await this.model('keyword_data').where(where).delete();
      await this.where({keyname: ['IN', dkn]}).decrement('videonum', 1);
    }
    await this.addkey(nkn, id, uid, mod_id, mod_type);
  }
};
