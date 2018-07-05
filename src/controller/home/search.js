// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Segment = require('segment');
module.exports = class extends think.cmswing.center {
  /**
   * index action import Segment from 'segment';
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const qq = this.get('q');
    const q = decodeURI(qq);
    this.meta_title = '搜索';
    if (think.isEmpty(q)) {
      if (this.isMobile) {
        return this.display('home/mobile/search_index');
      } else {
        return this.display();
      }
    } else {
      const time = this.get('d');
      let search_time, sql_time, sql;
      const m_id = Number(this.get('m')) || 0;
      // 按时间搜索
      if (time == 'day') {
        search_time = new Date().getTime() - 86400000;
        sql_time = ` AND add_time > ${search_time}`;
      } else if (time == 'week') {
        search_time = new Date().getTime() - 604800000;
        sql_time = ` AND add_time > ${search_time}`;
      } else if (time == 'month') {
        search_time = new Date().getTime() - 2592000000;
        sql_time = ` AND add_time > ${search_time}`;
      } else if (time == 'year') {
        search_time = new Date().getTime() - 31536000000;
        sql_time = ` AND add_time > ${search_time}`;
      } else {
        search_time = 0;
        sql_time = '';
      }
      const segment = new Segment();
      // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
      segment.useDefault();
      // 开始分词
      const segment_q = segment.doSegment(q, {
        simple: true,
        stripPunctuation: true
      });
      // 检查全文搜索配置
      const variables = await this.model('mysql').query(`show variables`);
      const ft_min_word_len = think._.find(variables, ['Variable_name', 'ft_min_word_len']).Value;
      if (ft_min_word_len == 1) {
        console.log(segment_q.join(' '));
        sql = '';
        sql = `MATCH (data) AGAINST ('${segment_q.join(' ')}' IN BOOLEAN MODE)`;
        if (m_id) {
          sql += ` AND m_id=${m_id}`;
        }
        if (search_time != 0) {
          sql += sql_time;
        }
      } else {
        sql = '';
        sql += '(';
        for (let k = 0; k < segment_q.length; k++) {
          sql += "`data` like '%" + segment_q[k] + "%'";
          if (segment_q[k + 1]) {
            sql += ' OR ';
          }
        }
        sql += ')';
        if (m_id) {
          sql += ` AND m_id=${m_id}`;
        }
        if (search_time != 0) {
          sql += sql_time;
        }
      }
      const numsPerPage = 10;
      const currentPage = Number(this.get('page')) || 1;
      const count = await this.model('mysql').query(`SELECT count(search_id) FROM __SEARCH__ WHERE ${sql}`);
      const res = await this.model('mysql').query(`SELECT * FROM __SEARCH__ WHERE ${sql} order by search_id DESC LIMIT ${(currentPage - 1) * numsPerPage},${numsPerPage}`);
      const hs = this.cookie('cmswing_historical_search');
      const ehs = decodeURI(hs);
      let hss = [];
      if (!think.isEmpty(hs)) {
        hss = ehs.split('|').reverse();
      }
      this.assign('hs', hss);
      // 搜索记录
      if (count[0]['count(search_id)'] > 0) {
        let hsq;
        if (think.isEmpty(hs)) {
          this.cookie('cmswing_historical_search', encodeURI(q));
        } else {
          if (!in_array(q, ehs.split('|'))) {
            hsq = ehs + '|' + q;
            this.cookie('cmswing_historical_search', encodeURI(hsq));
          }
        }
      }

      const modlist = await this.model('search_model').order('sort ASC').select();
      // console.log(modlist);
      const data = [];
      for (const v of res) {
        const extend = await this.model('cmswing/model').get_model(v.m_id, 'extend');
        v.m_type = extend;
        let table;
        if (extend == 0) {
          table = await this.model('cmswing/model').get_model(v.m_id, 'name');
        } else {
          table = 'document';
        }
        const pk = await this.model('search_model').where({mod: v.m_id}).getField('pk', true);
        const map = {};
        map[pk] = v.d_id;
        data.push(think.extend(await this.model(table).where(map).find(), v));
      }
      // console.log(data);
      const list = {
        numsPerPage: numsPerPage, // 每页显示的条数
        currentPage: currentPage, // 当前页
        count: count[0]['count(search_id)'], // 总条数
        totalPages: Math.ceil(count[0]['count(search_id)'] / numsPerPage), // 总页数
        data: data
      };
      // 查询数据

      const html = this.pagination(list);
      this.assign('pagination', html);
      this.assign('modlist', modlist);
      this.assign('list', list);
      if (this.isMobile) {
        if (this.isAjax('get')) {
          for (const v of list.data) {
            v.model = await this.model('cmswing/model').get_model(v.m_id, 'title');
            if (v.m_type == 1) {
              v.url = get_url(v.name, v.id);
            } else {
              v.url = `/mod/${await this.model('cmswing/model').get_model(v.m_id, 'name')}/index/detail/id/${v.d_id}`;
            }
            v.categoryname = await this.model('cmswing/category').get_category(v.category_id, 'title');
            v.add_time = this.moment(v.add_time).format('YYYY-MM-DD HH:mm');
          }
          return this.json(list);
        }
        return this.display('home/mobile/search_index');
      } else {
        return this.display('home/search_result');
      }
    }
  }
};
