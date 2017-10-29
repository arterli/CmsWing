// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */

global.mytags = function() {
  this.tags = ['tagtest'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    // console.log(args);

    for (var arg in args) {
      // console.log(arg);
      if (arg !== '__keywords') {
        const map = args[arg].split(',');
        const maps = {};
        for (let val of map) {
          val = val.split('=');
          // console.log(val[1].indexOf("["));
          if (val[1].indexOf('[') === 0) {
            val[1] = val[1].replace('[', '').replace(']', '').split('-');
            // console.log(val[1]);
          }
          maps[val[0]] = val[1];
        }
        // console.log(maps);
        let model_id;
        // model
        if (think.isEmpty(maps.mid)) {
          model_id = 1;
        } else {
          model_id = maps.mid;
          delete maps.mid;
        }
        const model = await think.model('cmswing/model').get_table_name(model_id);
        // console.log(model);
        // limit
        let offset, length;
        if (think.isEmpty(maps.limit)) {
          offset = 10;
        } else {
          if (think.isArray(maps.limit)) {
            offset = parseInt(maps.limit[0]);
            length = parseInt(maps.limit[1]);
          } else {
            offset = parseInt(maps.limit);
          }
          delete maps.limit;
        }
        // where
        const where = {};
        if (!think.isEmpty(maps.cid) && think.isNumberString(maps.cid)) {
          where.category_id = maps.cid;
        }
        let order;
        if (!think.isEmpty(maps.order)) {
          order = maps.order;
        }
        // console.log(maps);
        // console.log(offset);
        const data = await think.model(model).where(where).limit(offset, length).order(order).select();
        // console.log(data);
        context.ctx[arg] = data;
      }
    }
    return callback(null, '');
  };
};
/**
 * 获取同一级栏目标签
 *{%column data = "list"%}
 * @param data:接受返回数据的变量名称，例: data = "list"
 *  {% column data="list",pid=1 %}
 * @param pid: 获取同级栏目
 * {% column data="list",cid=1 %}
 * @param cid: 获取里栏目
 * {% column data="list",tree=1 %}
 * @param tree:获取栏目的树结构 tree="0",从pid为0开始获取
 * @param isapp: 是否在在移动端调用 iaapp="all" 调用全部栏目 isapp="1" pid为0的栏目,isindex="1",除去封面。
 * @parpm isnum = "1" ,1-获取栏目条数,默认不获取
 */
global.column = function() {
  this.tags = ['column'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    // console.log(args);
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    const pid = !think.isEmpty(args.pid) ? args.pid : false;
    const cid = !think.isEmpty(args.cid) ? args.cid : false;
    const tree = !think.isEmpty(args.tree) ? args.tree : false;
    const isapp = !think.isEmpty(args.isapp) ? args.isapp : false;
    const isindex = !think.isEmpty(args.isindex) ? args.isindex : false;

    const column = await think.model('cmswing/category').get_all_category();
    if (args.isnum == 1) {
      for (const v of column) {
        v.doc_num = await think.model('document').where({category_id: v.id, status: ['>', 0]}).count('id');
      }
    }
    // console.log(column);
    let arr;
    // 获取同级栏目
    const map = {};
    if (pid) {
      map.pid = think._.toInteger(pid);
      arr = think._.filter(column, map);
    } else if (cid) {
      map.pid = think._.toInteger(cid);
      arr = think._.filter(column, map);
      // console.log(arr);
    } else if (tree) {
      const trees = arr_to_tree(column, tree);
      // console.log(trees)
      arr = !think.isEmpty(trees) ? trees : false;
    } else if (isapp || isapp == 0) {
      map.isapp = 1;
      if (think.isNumberString(isapp) || think.isNumber(isapp)) {
        map.pid = think._.toInteger(isapp);
      }
      arr = think._.filter(column, map);
      if (isindex) {
        for (const v of arr) {
          v.url = (v.url).replace(/channel/, 'column');
        }
      }
    }
    context.ctx[data] = arr;
    return callback(null, '');
  };
};

/**
 *获取导航标签
 * {chan}
 */

global.channel = function() {
  this.tags = ['channel'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    let channel = await think.model('cmswing/channel').get_channel_cache();
    channel = arr_to_tree(channel, 0);
    // console.log(channel);
    context.ctx[data] = channel;
    return callback(null, '');
  };
};
/**
 *获取分类分组标签
 *  {% groups data="groups",cid="1"%}
 */

global.groups = function() {
  this.tags = ['groups'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    context.ctx[data] = await think.model('cmswing/category').get_groups(args.cid);
    return callback(null, '');
  };
};

/**
 * 获取数据标签
 * {% topic data = "data"%}
 * topic:标签名称
 * data:接受返回数据的变量名称，例: data = "data"
 * limit: 设置查询结果的条数，例: limit="10",limit="3,10"
 * cid: 栏目id ,单个栏目 cid="1",多个栏目 cid = "1,2,3,4" , 不写调取全部栏目
 * {{name|get_url(id)}}文章链接
 * type: 标签类型,hot-安装浏览量从高到底,level-安装优先级从高到低排序,默认安装更新时间排序
 * //{% topic data = "data",limit= "5",cid=category.id,type="hot"%}
 * position:1:列表推荐,2:频道推荐,4:首页推荐
 * ispic:是否包涵缩略图,1:包含缩略图的内容,2:不包含缩略图,默认所有
 * issub:1:包含自栏目,2:不包含自栏目,默认包含自栏目
 * isstu:1:获取副表内容,2:只从主表拿数据,默认只从主表拿
 * group:分组id，单个分组：group="1",多个分组 :group="1,2,3,4",不写调取全部分组。
 * where:查询条件''
 * tid ;分类信息id
 * tval;分类信息条件
 * cache {Number} 缓存有效时间，单位为秒,建议1000秒
 */
global.topic = function() {
  this.tags = ['topic'];
  this.parse = function(parser, nodes, lexer) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    // console.log(args);
    let where = {'status': 1, 'pid': 0};
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    const limit = think.isEmpty(args.limit) ? '10' : args.limit;
    // 获取当前分类的所有子栏目
    if (args.issub != 2) {
      if (!think.isEmpty(args.cid)) {
        const cids = `${args.cid}`;
        let cidarr = [];
        for (const v of cids.split(',')) {
          const subcate = await think.model('cmswing/category').get_sub_category(v);
          cidarr = cidarr.concat(subcate);
          cidarr.push(Number(v));
        }

        args.cid = unique(cidarr).sort();
      }
    }

    // subcate.push(cate.id);
    const cid = think.isEmpty(args.cid) ? false : {'category_id': ['IN', args.cid]};
    if (cid) {
      where = think.extend({}, where, cid);
    }
    // 分组
    if (!think.isEmpty(args.group)) {
      where = think.extend(where, {'group_id': ['IN', args.group]});
    }
    let type = 'create_time DESC';
    if (!think.isEmpty(args.type)) {
      if (args.type == 'hot') {
        type = 'view DESC';
      } else if (args.type == 'level') {
        type = 'level DESC';
      }
    }
    // 推荐
    if (!think.isEmpty(args.position)) {
      where = think.extend(where, {position: args.position});
    }
    // 条件
    if (!think.isEmpty(args.where)) {
      where = think.extend(where,JSON.parse(args.where));
    }
    // 是否缩略图
    if (!think.isEmpty(args.ispic)) {
      if (args.ispic == 1) {
        where = think.extend(where, {cover_id: ['>', 0]});
      } else if (args.ispic == 2) {
        where = think.extend(where, {cover_id: 0});
      }
    }

    // console.log(where);
    const model = think.model('document');
    const cache = think.isEmpty(args.cache) ? false : Number(args.cache) * 1000;
    // 缓存
    if (cache) {
      model.cache(cache);
    }
    if (args.tid && !think.isEmpty(args.tval)) {
      // console.log();
      for (const v in JSON.parse(args.tval)) {
        where['t.' + v] = JSON.parse(args.tval)[v];
      }
      // console.log(where);
      model.join({
        table: 'type_optionvalue' + args.tid,
        join: 'left', // 有 left,right,inner 3 个值
        as: 't',
        on: ['id', 'tid']

      });
    }

    let topic = await model.where(where).limit(limit).order(type).select();

    // 副表数据
    if (args.isstu == 1) {
      let topicarr = [];
      let stuwhere = {};

      for (const v of topic) {
        const table = await think.model('cmswing/model').get_table_name(v.model_id);
        const details = await think.model(table).find(v.id);
        topicarr.push(think.extend({}, v, details));
      }
      if (!think.isEmpty(args.stuwhere)) {
        stuwhere = JSON.parse(args.stuwhere);
        topicarr = think._.filter(topicarr, stuwhere);
      }
      topic = topicarr;
    }
    // console.log(topic)
    context.ctx[data] = topic;
    return callback(null, '');
  };
};

/**
 *获取话题标签
 * {% keywords data ="kws"%}
 *
 * data:接受返回数据的变量名称，例: data = "data"
 * limit: 设置查询结果的条数，例: limit="10",limit="3,10"
 * type: hot
 * cache {Number} 缓存有效时间，单位为秒,建议1000秒
 */

global.keywords = function() {
  this.tags = ['keywords'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    const where = {};
    const limit = think.isEmpty(args.limit) ? '10' : args.limit;
    const mod = think.isEmpty(args.mod) ? '' : ',' + args.mod;
    let type = 'discuss_count_update DESC';
    if (!think.isEmpty(args.type)) {
      if (args.type == 'hot') {
        type = 'videonum DESC';
      }
    }
    const model = think.model('keyword');
    const cache = think.isEmpty(args.cache) ? false : Number(args.cache) * 1000;
    // 缓存
    if (cache) {
      model.cache(cache);
    }
    const keywrod = await model.where(where).limit(limit).order(type).select();
    // console.log(channel);
    for (const k of keywrod) {
      k.url = `/t/${k.keyname}${mod}`;
    }
    context.ctx[data] = keywrod;
    return callback(null, '');
  };
};
/**
 *获取相关话题
 * {% rkeywords data ="topic",type="0",mod_id="8",id="1"%}
 *
 * data:接受返回数据的变量名称，例: data = "data"
 * limit: 设置查询结果的条数，例: limit="10",limit="3,10"
 * type: 0系统模型，1,独立模型
 * mod_id:模型id,
 * id:文章的的id,
 */
global.rkeywords = function() {
  this.tags = ['rkeywords'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    // console.log(args);
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    const where = {};
    const limit = think.isEmpty(args.limit) ? '5' : args.limit;
    const type = think.isEmpty(args.type) ? '0' : args.type;
    const mod_id = think.isEmpty(args.mod_id) ? '1' : args.mod_id;
    const id = think.isEmpty(args.id) ? '0' : args.id;
    where.docid = id;
    where.mod_type = type;
    where.mod_id = mod_id;
    let keyword;
    const topicid = await think.model('keyword_data').where(where).getField('tagid');
    if (!think.isEmpty(topicid)) {
      keyword = await think.model('keyword').where({id: ['IN', topicid]}).limit(limit).select();

      for (const k of keyword) {
        k.url = `/t/${k.keyname},${mod_id}`;
      }
    }
    // console.log(keyword);
    context.ctx[data] = keyword;
    return callback(null, '');
  };
};

/**
 * thinkjs model 万能数据调用标签
 * {% model data ="data"%}
 *
 * data:接受返回数据的变量名称，例: data = "data"
 * table:要查询的主表比如 table = "uuu"
 * join :{Object} 要组合的查询语句，默认为 LEFT JOIN
 * field {String} 设置要查询的字段，必须是字符串
 * fieldReverse:{String} 反选字段，即查询的时候不包含这些字段
 * alias:{String} 表别名
 * limit(offset, length) :offset {Number} 设置查询的起始位置 length {Number} 设置查询的数据长度
 * where(where):where {Object} where 条件
 * order {String} 排序方式
 * cache {Number} 缓存有效时间，单位为秒,建议1000秒
 */
global.model = function() {
  this.tags = ['model'];
  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtensionAsync(this, 'run', args);
  };
  this.run = async function(context, args, callback) {
    // console.log(args);
    const data = think.isEmpty(args.data) ? 'data' : args.data;
    const table = think.isEmpty(args.table) ? '5' : args.table;
    const join = think.isEmpty(args.join) ? false : JSON.parse(args.join);
    const fieldReverse = think.isEmpty(args.fieldReverse) ? false : args.fieldReverse;
    const alias = think.isEmpty(args.alias) ? false : args.alias;
    const limit = think.isEmpty(args.limit) ? false : args.limit;
    const where = think.isEmpty(args.where) ? false : JSON.parse(args.where);
    const order = think.isEmpty(args.order) ? false : args.order;
    const cache = think.isEmpty(args.cache) ? false : Number(args.cache) * 1000;
    const field = think.isEmpty(args.field) ? false : args.field;
    const model = think.model(table);
    // console.log(cache);
    // 缓存
    if (cache) {
      model.cache(cache);
    }
    // 表别名
    if (alias) {
      model.alias(alias);
    }
    // where
    if (where) {
      model.where(where);
    }
    // order
    if (order) {
      model.order(order);
    }
    // 查询的字段
    if (field) {
      model.field(field);
    }
    // 排除字段
    if (fieldReverse) {
      model.fieldReverse(fieldReverse);
    }
    // 查询条数
    if (limit) {
      model.limit(limit);
    }
    // join查询c
    if (join) {
      model.join(join);
    }

    const ret = await model.select();

    // console.log(ret);
    context.ctx[data] = ret;
    return callback(null, '');
  };
};
