// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.center {
  // 列表页[核心]
  async indexAction() {
    // console.log(this.moment(1499788799000).fromNow());
    // console.log(GetDateStr(5)+" "+"00:00:00");
    // console.log(new Date(GetDateStr(0)+" "+"23:59:59").getTime());
    const get = this.get('category') || 0;
    let id = 0;
    const query = get.split('-');
    if (get != 0) {
      id = query[0].slice(1);
    }

    let cate = await this.category(id);
    cate = think.extend({}, cate);
    let roleid = 8;// 游客
    // 访问控制
    if (this.is_login) {
      roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
    }
    const priv = await this.model('cmswing/category_priv').priv(cate.id, roleid, 'visit');
    if (!priv) {
      const error = this.controller('cmswing/error');
      return error.noAction('您所在的用户组,禁止访问本栏目！');
    }
    // 获取当前栏目的模型
    const models = await this.model('cmswing/category').get_category(cate.id, 'model');
    // 获取模型信息
    let modellist = [];
    // console.log(111111111)
    if (think.isEmpty(models)) {
      modellist = null;
    } else {
      for (const val of models.split(',')) {
        const modelobj = {};
        modelobj.id = val;
        modelobj.title = await this.model('cmswing/model').get_model(val, 'title');
        modellist.push(modelobj);
      }
    }
    this.assign('modellist', modellist);
    this.assign('model', models.split(','));
    // console.log(cate);
    // 获取当前分类的所有子栏目
    const subcate = await this.model('cmswing/category').get_sub_category(cate.id);
    // console.log(subcate);
    subcate.push(cate.id);
    // 获取模型列表数据个数
    // console.log(cate);
    let num;
    if (cate.list_row > 0) {
      num = cate.list_row;
    } else if (cate.model.split(',').length === 1) {
      const pagenum = await this.model('cmswing/model').get_model(cate.model, 'list_row');
      if (pagenum !== 0) {
        num = pagenum;
      }
    } else {
      num = this.config('db.nums_per_page');
    }
    if (this.isMobile) {
      num = 10;
    }

    // console.log(subcate);
    const map = {
      'pid': 0,
      'status': 1,
      'category_id': ['IN', subcate]
    };
    // 排序
    const o = {};
    o.level = 'DESC';
    let order = query[1] || 0;
    order = Number(order);
    switch (order) {
      case 1:
        o.create_time = 'ASC';
        break;
      case 2:
        o.view = 'DESC';
        break;
      case 3:
        o.view = 'ASC';
        break;
      case 4:
        map.create_time = {'>': new Date(GetDateStr(0) + ' ' + '00:00:00').getTime(), '<': new Date(GetDateStr(0) + ' ' + '23:59:59').getTime()};
        o.create_time = 'DESC';
        break;
      case 5:
        map.create_time = {'>': new Date(GetDateStr(1) + ' ' + '00:00:00').getTime(), '<': new Date(GetDateStr(5) + ' ' + '23:59:59').getTime()};
        o.create_time = 'DESC';
        break;
      case 6:
        map.create_time = {'<': new Date().getTime()};
        map.deadline = {'>': new Date().getTime()};
        o.create_time = 'DESC';
        break;
      case 7:
        map.deadline = {'<': new Date().getTime()};
        o.create_time = 'DESC';
        break;
      default:
        o.create_time = 'DESC';
    }
    this.assign('order', order);
    // 获取分类信息
    let sortid = query[3] || 0;
    if (!think.isEmpty(sortid)) {
      map.sort_id = sortid;
    }
    let sortarr = query[4] ? decodeURIComponent(query[4]) : null;
    let nsobj = {};
    let sort = await this.model('cmswing/category').get_category(cate.id, 'documentsorts');
    if (sort) {
      this.assign('sorturl', get.split('-')[4]);
      sort = JSON.parse(sort);
      if (sortid == 0) {
        sortid = sort.defaultshow;
      }
      const typevar = await this.model('typevar').where({sortid: sortid}).order('displayorder ASC').select();
      // console.log(typevar);
      for (const val of typevar) {
        val.option = await this.model('typeoption').where({optionid: val.optionid}).find();
        if (val.option.type == 'select' || val.option.type == 'radio') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = parse_type_attr(val.option.rules.choices);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            // console.log(val.rules);
          }
        } else if (val.option.type == 'checkbox') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = parse_type_attr(val.option.rules.choices);
            // console.log(val.rules);
            for (const v of val.rules) {
              v.id = 'l>' + v.id;
            }
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            // console.log(val.rules);
          }
        } else if (val.option.type == 'range') {
          if (!think.isEmpty(val.option.rules)) {
            const searchtxt = JSON.parse(val.option.rules).searchtxt;
            const searcharr = [];
            if (!think.isEmpty(searchtxt)) {
              const arr = searchtxt.split(',');
              const len = arr.length;
              for (var i = 0; i < len; i++) {
                const obj = {};
                if (!think.isEmpty(arr[i - 1])) {
                  if (i == 1) {
                    obj.id = 'd>' + arr[i];
                    obj.name = '低于' + arr[i];
                    obj.pid = 0;
                    searcharr.push(obj);
                  } else {
                    obj.id = arr[i - 1] + '>' + arr[i];
                    obj.name = arr[i - 1] + '-' + arr[i];
                    obj.pid = 0;
                    searcharr.push(obj);
                  }
                }
              }
              searcharr.push({id: 'u>' + arr[len - 1], name: '高于' + arr[len - 1], pid: 0});
            }
            // console.log(searcharr);
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = searcharr;
            // val.option.rules.choices = parse_config_attr(val.option.rules.choices);
          }
        }
      }
      console.log(typevar);
      this.assign('typevar', typevar);
    }
    // console.log(sortarr);
    // console.log(!think.isEmpty(sortarr));
    if (!think.isEmpty(sortarr)) {
      // console.log(sortarr);
      sortarr = sortarr.split('|');

      nsobj = {};
      const optionidarr = [];
      const valuearr = [];
      for (const v of sortarr) {
        const qarr = v.split('_');
        nsobj[qarr[0]] = qarr[1];
        if (qarr[1] != 0) {
          const vv = qarr[1].split('>');
          // console.log(vv);
          if (vv[0] == 'd' && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['<', vv[1]];
          } else if (vv[0] == 'u' && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['>', vv[1]];
          } else if (vv[0] == 'l' && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['like', `%"${vv[1]}"%`];
          } else if (!think.isEmpty(vv[0]) && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['BETWEEN', Number(vv[0]), Number(vv[1])];
          } else {
            map['t.' + qarr[0]] = qarr[1];
          }
        }
      }
      map.fid = cate.id;
      // where.optionid = ["IN",optionidarr];
      // where['value'] = ["IN",valuearr];
      // let type= await this.model("typeoptionvar").where(where).select();
      //  console.log(type);
      // console.log(map);
    }
    // console.log(map);
    // return false;
    console.log(sort);
    console.log(nsobj);
    this.assign('sort', sort);
    this.assign('nsobj', nsobj);

    this.assign('sortid', sortid);
    let group_id = 0;
    if (!think.isEmpty(query[2]) && query[2] != 0) {
      map.group_id = query[2];
      group_id = map.group_id;
    }
    this.assign('group_id', group_id);
    // console.log(map);
    let data;
    if (!think.isEmpty(sortarr)) {
      data = await this.model('document').join({
        table: 'type_optionvalue' + sortid,
        join: 'left', // 有 left,right,inner 3 个值
        as: 't',
        on: ['id', 'tid']

      }).where(map).page(this.get('page'), num).order(o).countSelect();
    } else {
      data = await this.model('document').where(map).page(this.get('page'), num).order(o).countSelect();
    }

    const html = this.pagination(data);
    this.assign('pagination', html);
    // seo
    this.meta_title = cate.meta_title ? cate.meta_title : cate.title; // 标题
    this.keywords = cate.keywords ? cate.keywords : ''; // seo关键词
    this.description = cate.description ? cate.description : ''; // seo描述

    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(cate.id, true);
    this.assign('breadcrumb', breadcrumb);
    // console.log(breadcrumb)

    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    this.assign('list', data.data);
    this.assign('count', data.count);
    if (this.get('rss') == 1) {
      this.header('Content-Type', 'text/xml');
      return this.display('cmswing/rss.xml');
    }
    // console.log(cate)
    let temp = cate.template_lists ? `${cate.template_lists}` : 'index';
    // console.log(cate);
    // console.log(111)
    if (this.isMobile) {
      if (this.isAjax('get')) {
        // console.log("ssdfsdf");
        for (const v of data.data) {
          if (!think.isEmpty(v.pics)) {
            const arr = [];
            for (const i of v.pics.split(',')) {
              arr.push(await get_pic(i, 1, 300, 300));
            }
            v.pics = arr;
          }
          if (!think.isEmpty(v.cover_id)) {
            v.cover_id = await get_pic(v.cover_id, 1, 300, 169);
          }
          if (!think.isEmpty(v.price)) {
            if (!think.isEmpty(get_price_format(v.price, 2))) {
              v.price2 = get_price_format(v.price, 2);
            }
            v.price = get_price_format(v.price, 1);
          }
          v.uid = await get_nickname(v.uid);
          v.url = get_url(v.name, v.id);
          v.update_time = this.moment(v.create_time).fromNow();
        }
        return this.json(data);
      }
      // 手机端模版
      temp = cate.template_m_lists ? `${cate.template_m_lists}` : `index`;
      // think.log(temp);
      return this.display('home/mobile/list_' + temp);
    } else {
      // console.log(temp);
      return this.display('home/list_' + temp);
    }
  }
};
