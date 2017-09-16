// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const fs = require('fs');
const Segment = require('segment');
module.exports = class extends think.cmswing.admin {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.tactive = 'setup';
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const list = await this.model('search_model').order('sort ASC').select();
    this.assign('list', list);
    this.meta_title = '全站搜索';
    // 检查全文搜索配置
    const variables = await this.model('mysql').query(`show variables`);
    const ft_min_word_len = think._.find(variables, ['Variable_name', 'ft_min_word_len']).Value;
    this.assign('ft_min_word_len', ft_min_word_len);
    return this.display();
  }

  /**
     * 添加搜索分类
     * @returns {Promise.<void>}
     */
  async addAction() {
    if (this.isPost) {
      const data = this.post();
      const extend = await this.model('cmswing/model').get_model(data.mod, 'extend');
      data.extend = extend;
      const add = await this.model('search_model').add(data);
      if (add) {
        return this.success({name: '添加成功!'});
      } else {
        return this.fail('添加失败!');
      }
    } else {
      const modlist = await this.model('model').where({status: 1, id: ['>', 1]}).select();
      // console.log(modlist);
      this.assign('modlist', modlist);
      this.meta_title = '添加搜索分类';
      return this.display();
    }
  }

  /**
     * 编辑
     * @returns {Promise.<void>}
     */
  async editAction() {
    if (this.isPost) {
      const data = this.post();
      const extend = await this.model('cmswing/model').get_model(data.mod, 'extend');
      data.extend = extend;
      const up = await this.model('search_model').update(data);
      if (up) {
        return this.success({name: '编辑成功!'});
      } else {
        return this.fail('编辑失败!');
      }
    } else {
      const info = await this.model('search_model').find(this.get('id'));
      this.assign('info', info);
      const modlist = await this.model('model').where({status: 1, id: ['>', 1]}).select();
      this.assign('modlist', modlist);
      this.meta_title = '编辑搜索分类';
      return this.display();
    }
  }
  async delAction() {
    const id = this.get('id');
    const del = await this.model('search_model').where({id: id}).delete();
    if (del) {
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除失败!');
    }
  }
  async sortAction() {
    await super.sortAction('search_model');
  }
  /**
     * 重建索引
     * @returns {Promise.<void>}
     */
  async createindexAction() {
    const paths = think.resource + '/backup/';
    const lock = paths + 'createindex.lock';
    // 检查全文搜索配置
    const variables = await this.model('mysql').query(`show variables`);
    const ft_min_word_len = think._.find(variables, ['Variable_name', 'ft_min_word_len']).Value;
    if (this.isAjax('post') && !think.isEmpty(this.post())) {
      think.mkdir(paths);
      // 检查是否有正在执行的任务
      if (think.isFile(lock)) {
        return this.fail(20, '检测到有一个重建任务正在执行，请稍后再试！');
      } else {
        // 创建锁文件
        fs.writeFileSync(lock, new Date());
      }
      const tables = await this.model('search_model').select();
      for (const v of tables) {
        if (v.extend == 0) {
          v.table = await this.model('cmswing/model').get_model(v.mod, 'name');
        } else {
          v.table = 'document';
        }
      }
      // console.log(tables);
      await this.session('createindex_tables', tables);
      // 清空缓存表
      await this.model('search').where('1=1').delete();
      const page = {'id': 0, 'page': 1, 'pagesize': this.post('pagesize')};
      return this.json({
        'msg': {progress: 0, info: '开始索引更新'},
        'page': page,
        'status': 1
      });
    } else if (this.isAjax('get') && !think.isEmpty(this.get())) {
      const tables = await this.session('createindex_tables');
      // console.log(tables);
      let id = this.get('id');
      const start = this.get('start');
      const page = this.get('page');
      const pagesize = this.get('pagesize');
      // console.log(this.get());
      const map = {};
      if (tables[id].extend == 1) {
        map.model_id = tables[id].mod;
        map.status = 1;
      }
      const field = (tables[id].data).split(',');
      field.push(tables[id].pk);
      field.push(tables[id].addtime);
      const olist = await this.model(tables[id].table).page(page, pagesize).where(map).field(field).countSelect();

      if (olist.count) {
        const narr = [];
        for (const v of olist.data) {
          const obj = {};
          obj.m_id = tables[id].mod;
          obj.d_id = v[tables[id].pk];
          obj.add_time = v[tables[id].addtime];
          const arr = [];
          for (const d of tables[id].data.split(',')) {
            arr.push(v[d]);
          }
          if (ft_min_word_len == 1) {
            const segment = new Segment();
            // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
            segment.useDefault();
            // 开始分词
            const segment_q = segment.doSegment(arr.join(' '), {
              simple: true,
              stripPunctuation: true
            });
            obj.data = arr.join(' ') + ' ' + segment_q.join(' ');
          } else {
            obj.data = arr.join(' ').replace(/<[^>]+>/g, '');
          }
          narr.push(obj);
        }
        console.log('wwww' + narr);
        await this.model('search').addMany(narr);
        if (olist.totalPages > olist.currentPage) {
          const page = {'id': id, 'page': olist.currentPage + 1, 'pagesize': olist.numsPerPage};
          const rate = Math.floor(100 * ((olist.currentPage + 1) / olist.totalPages));
          return this.json({
            'msg': {progress: rate, info: `正在更新： <span style='color:#ff0000;font-size:14px;text-decoration:underline;' >${tables[id].name}</span> - 总数：${olist.count} - 当前第 <font color='red'>${olist.currentPage}</font> 页 `},
            'page': page,
            'status': 1
          });
        } else {
          if (tables[++id]) {
            const page = {'id': id, 'page': 1, 'pagesize': pagesize};
            return this.json({
              'msg': `<span style='color:#ff0000;font-size:14px;text-decoration:underline;' >${tables[id - 1].name}</span>索引更新完成`,
              'page': page,
              'status': 1
            });
          } else {
            if (think.isFile(lock)) {
              fs.unlinkSync(lock);
            }
            await this.session('createindex_tables', null);
            return this.json({
              'msg': {progress: 100, info: "<span style='color:#ff0000;font-size:14px;text-decoration:underline;' >全站</span>索引更新完成"},
              'status': 1
            });
          }
        }
      } else if (tables[id]) {
        const page = {'id': ++id, 'page': 1, 'pagesize': 1};
        return this.json({
          'msg': `<span style='color:#ff0000;font-size:14px;text-decoration:underline;' >${tables[id - 1].name}</span>索引更新完成`,
          'page': page,
          'status': 1
        });
      }
      if (think.isFile(lock)) {
        fs.unlinkSync(lock);
      }
      return this.json({
        'msg': {progress: 100, info: "<span style='color:#ff0000;font-size:14px;text-decoration:underline;' >全站</span>索引更新完成"},
        'status': 1
      });
    } else {
      // 检查全文搜索配置
      const variables = await this.model('mysql').query(`show variables`);
      const ft_min_word_len = think._.find(variables, ['Variable_name', 'ft_min_word_len']).Value;
      this.assign('ft_min_word_len', ft_min_word_len);
      this.meta_title = '重建索引';
      this.active = 'admin/search/index';
      return this.display();
    }
  }
  /**
  * 解锁
  */
  unlockAction() {
    const paths = think.resource + '/backup/';
    const lock = paths + 'createindex.lock';
    // 检查是否有正在执行的任务
    if (think.isFile(lock)) {
      fs.unlinkSync(lock);
      return this.success({name: '解锁成功!'});
    } else {
      // 创建锁文件
      return this.success({name: '无需解锁!'});
    }
  }
};
