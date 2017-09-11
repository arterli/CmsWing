/* eslint-disable no-undef,no-tabs */
const nunjucks = require('think-view-nunjucks');
const path = require('path');
module.exports = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks,
    beforeRender: (env, nunjucks, config) => {
    // env.addGlobal('config', think.config());
    // env.addGlobal('JSON', JSON);
      /**
      * 格式化字节大小
      * @param  number size      字节数
      * @param  string delimiter 数字和单位分隔符
      * @return string            格式化后的带单位的大小
      */
      env.addFilter('format_bytes', function(size, delimiter = '') {
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        for (var i = 0; size >= 1024 && i < 5; i++) size /= 1024;
        return Math.round(size * 100) / 100 + delimiter + units[i];
      });

      /**
      * 格式化时间
      */
      env.addFilter('format_time', function(D, sec) {
        let time;
        const date = new Date(D);
        const y = date.getFullYear();
        let M = date.getMonth() + 1;
        M = M < 10 ? '0' + M : M;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        let h = date.getHours();
        h = h < 10 ? '0' + h : h;
        let m = date.getMinutes();
        m = m < 10 ? '0' + m : m;
        let s = date.getSeconds();
        s = s < 10 ? '0' + s : s;
        if (sec) {
          time = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
        } else {
          time = y + '-' + M + '-' + d + ' ' + h + ':' + m;
        }
        return time;
      });
      /**
      * moment
      * YYYY-MM-DD HH:mm:ss
      * lll
      */
      env.addFilter('moment', function(time, config) {
        const moment = require('moment');
        moment.locale('zh-cn');
        if (think.isEmpty(config)) {
          return moment(time).fromNow();
        } else {
          return moment(time).format(config);
        }
      });
      /**
      *分析枚举类型配置值 格式 a:名称1,b:名称2
      */
      env.addFilter('parse_config_attr', function(str) {
        return parse_config_attr(str);
      });
      env.addFilter('show_status_op', (status) => { // 获取数据的状态操作
        switch (status) {
          case 0:
            return '启用';
          case 1:
            return '禁用';
          case 2:
            return '审核';
          default:
            return false;
        }
      });
      /**
      * 获取文档的类型文字
      */
      env.addFilter('get_document_type', function(type = null) {
        if (think.isEmpty(type)) {
          return false;
        }
        switch (type) {
          case 1:
            return '目录';
          case 2:
            return '主题';
          case 3:
            return '段落';
          default:
            return false;
        }
      });
      env.addFilter('strToJson', function(str) {
        if (!think.isEmpty(str) && str != 0) {
          return JSON.parse(str);
        }
      });
      env.addFilter('jsonToStr', function(json) {
        if (!think.isEmpty(json)) {
          return JSON.stringify(json);
        }
      });
      env.addFilter('strToArray', function(str, sn = ',') {
        if (!think.isEmpty(str)) {
          const ss = str.split(sn);// 在每个逗号(,)处进行分解。
          // console.log(ss);
          return ss;
        } else {
          return str;
        }
      });

      env.addFilter('in_Array', function(str, arr) {
        arr = arr || 0;
        if (!think.isArray(arr)) {
          if (think.isNumber(arr)) {
            arr = "'" + arr + "'";
          }
          arr = arr.split(',');
        }
        // console.log(arr);
        return in_array(str, arr);
      });

      env.addFilter('isempty', function(any) {
        return think.isEmpty(any);
      });

      // 获取字段类型信息
      env.addFilter('get_attribute_type', function(str) {
        return get_attribute_type(str);
      });
      // 格式化字段列表
      env.addFilter('get_list_field', function(data, grid, controller, module) {
        return get_list_field(data, grid, controller, module);
      });
      // 表情图标正则替换
      env.addFilter('get_bq', function(wx_bq, emoji) {
        for (const key in emoji) {
          const img = '<img src="https:\/\/res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + key + '.gif" />';
          const reg = new RegExp('\\[' + emoji[key] + '\\]', 'g');
          wx_bq = wx_bq.replace(reg, img);
        }
        return wx_bq;
      });
      // 解析分类信息url
      env.addFilter('sort_url', function(id, val, arr, http) {
        return sort_url(id, val, arr, http);
      });
      // 解析分类信息当前状态
      env.addFilter('sort_act', function(id, getid) {
        // console.log(decodeURI(getid));
        // console.log(in_array(id, sanjiao(getid.split("."))));
        if (!think.isEmpty(getid)) {
          return in_array(id, sanjiao(decodeURI(getid).split('.')));
        }
      });
      /**
			 * 时间戳格式化 dateformat('Y-m-d H:i:s')
			 * @param extra 'Y-m-d H:i:s'
			 * @param date  时间戳
			 * @return  '2015-12-17 15:39:44'
			 */
      env.addFilter('dateformat', function(extra, date) {
        return dateformat(date, extra);
      });

      /**
			 * 获取行为类型
			 * @param intger type 类型
			 * @param bool all 是否返回全部类型
			 * @author arterli <arterli@qq.com>
			 */
      env.addFilter('get_action_type', function(type, all = false) {
        return get_action_type(type, all);
      });
      /**
			 * 数字转ip
			 */
      env.addFilter('int2ip', function(int) {
        return _int2iP(int);
      });
      /**
			 * 获取模型字段信息
			 * @param model_id 模型id 或 模型名称
			 * @param id 数据id
			 * @param field 字段
			 * @param return 整条数据或字段数据
			 * @author arterli <arterli@qq.com>
			 */
      env.addFilter('getmodelfield', async(id, model_id, field, callback) => {
        const data = await getmodelfield(model_id, id, field);
        callback(null, data);
      }, true);
      /**
			 * 获取模型信息
			 * @param model_id 模型id 或 模型名称
			 * @param field 字段
			 * @param return 整条数据或字段数据
			 * @author arterli <arterli@qq.com>
			 */
      env.addFilter('getmode', async(model_id, field, callback) => {
        const data = await get_model(model_id, field);
        callback(null, data);
      }, true);
      /**
			 * 获取用户名称
			 */
      env.addFilter('get_nickname', async(uid, callback) => {
        const data = await get_nickname(uid);
        callback(null, data);
      }, true);
      /**
			 * 获取关联
			 */
      env.addFilter('get_relation', async(id, model, pk, val, callback) => {
        const map = {};
        map[pk] = id;
        const data = await think.model(model, think.config('db')).where(map).getField(val, true);
        callback(null, data);
      }, true);
      /**
			 * 获取文档url
			 */
      env.addFilter('get_url', (name, id) => {
        return get_url(name, id);
      });
      /**
			 * 获取文档封面图
			 */
      env.addFilter('get_cover', async(cover_id, field, callback) => {
        const data = await get_cover(cover_id, field);
        callback(null, data);
      }, true);
      /**
			 * {{id|get_pic("m=1,w=200,h=200")}}
			 */
      env.addFilter('get_pic', async(id, type, callback) => {
        let m, w, h;
        // console.log(type);
        const obj = {};
        for (let v of type.split(',')) {
          v = v.split('=');
          obj[v[0]] = v[1];
        }
        m = obj.m;
        w = obj.w;
        h = obj.h;
        const data = await get_pic(id, m, w, h);
        callback(null, data);
      }, true);
      /**
			 * 根据栏目id获取栏目信息
			 *
			 */
      env.addFilter('get_cate', async(id, callback) => {
        const data = await get_cate(id);
        callback(null, data);
      }, true);
      // 价格格式化
      env.addFilter('get_price_format', function(price, type) {
        return get_price_format(price, type);
      });
      /**
			 * is_weixin
			 * 判断是否是微信访问
			 */
      env.addFilter('is_weixin', (agent) => {
        return is_weixin(agent);
      });
      /**
			 * 将数值四舍五入(保留1位小数)后格式化成金额形式
			 *
			 * @param num 数值(Number或者String)
			 * @return 金额格式的字符串,如'1,234,567.4'
			 * @type String
			 */
      env.addFilter('formatCurrency', function(num) {
        if (!think.isEmpty(num)) {
          return formatCurrency(num);
        }
      });
      /**
			 * 获取商品价格不格式
			 */
      env.addFilter('get_price', function(price, type) {
        return get_price(price, type);
      });
      /**
			 * 获取当前事件 时间戳
			 */
      env.addFilter('getnow', function() {
        return new Date().getTime();
      });
      /**
			 * 字符串在指定位置插入内容
			 * str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
			 */
      env.addFilter('insert_flg', (str, flg, sn) => {
        let newstr = '';
        for (let i = 0; i < str.length; i += sn) {
          var tmp = str.substring(i, i + sn);
          newstr += tmp + flg;
        }
        return newstr;
      });
      /**
			 * 字符串在指定位截断
			 * str表示原字符串变量，flg表示要插入的字符串，sn表示要截断位置
			 */
      env.addFilter('block', (str, sn, flg) => {
        let newstr = '';
        if (think.isEmpty(flg)) {
          flg = '...';
        }
        if (!think.isEmpty(str)) {
          if (sn >= str.length) {
            newstr = str;
          } else {
            newstr = str.substring(0, sn);
          }
        }
        return newstr + flg;
      });
      /**
			 * 过滤html标签
			 *
			 */
      env.addFilter('delhtmltags', (str) => {
        if (!think.isEmpty(str)) {
          return str.replace(/<[^>]+>/g, '');// 去掉所有的html标记
        } else {
          return '';
        }
      });
      /**
			 * 获取文件信息
			 * @param file_id 文件id
			 * @param field 字段名,如果为空则返回整个记录集
			 * @returns {*}
			 */
      env.addFilter('get_file', async(file_id, field, key, callback) => {
        const data = await get_file(file_id, field, key);
        callback(null, data);
      }, true);
      /**
			 * 获取用户组
			 */
      env.addFilter('get_member_group', async(groupid, callback) => {
        const data = await think.model('member_group', think.config('db')).getgroup({groupid: groupid});
        callback(null, data[0]);
      }, true);
      /**
			 * 提取文本内容中的图片
			 * @param html 文本内容
			 * @param w kuan 高
			 * @returns []
			 */
      env.addFilter('img_text_view', (html, w = 200, h = 200) => {
        return img_text_view(html, w, h);
      });
      /**
			 *缓存权限列表 all_priv
			 * @param catid 要验证的栏目id
			 * @param roleid 用户组
			 * @param action 权限类型
			 * @param is_admin 谁否前台 0前台，1后台
			 * @returns {bool} 返回flase 或true flase:没权限，true:有权限。
			 */
      env.addFilter('priv', async(catid, roleid, action, is_admin = 0, type = true, callback) => {
        const isp = await priv(catid, roleid, action, is_admin, type);
        // console.log(isp);
        callback(null, isp);
      }, true);

      env.addFilter('get_type', async(sort_id, id, category_id, callback) => {
        const type = await think.model('type').get_type(sort_id, id, category_id);
        callback(null, type);
      }, true);
      /**
			 * 获取地区
			 */
      env.addFilter('get_area', async(id, callback) => {
        const data = await think.model('area').get_area(id);
        callback(null, data);
      }, true);
      env.addExtension('tagtest', new mytags(), true);
      /**
			 * 获取分类标签
			 */
      env.addExtension('column', new column(), true);
      /**
			 * 获取导航标签
			 */
      env.addExtension('channel', new channel(), true);
      /**
			 * 获取数据标签
			 */
      env.addExtension('topic', new topic(), true);
      /**
			 * 获取分类分组
			 */
      env.addExtension('groups', new groups(), true);
      /**
			 * 获取话题
			 */
      env.addExtension('keywords', new keywords(), true);
      env.addExtension('rkeywords', new rkeywords(), true);
      // 基于thinkjs model的万能查询
      env.addExtension('model', new model(), true);
      /**
			 * 广告位调用
			 * //返回代码
			 * {{广告位id|show_ad('code')|safe}}
			 * //json调用
			 * {% set adlist = 广告位id|show_ad('json')%}
			 * {%for ad in adlist%}
			 * ....
			 * {%endfor%}
			 */
      env.addFilter('show_ad', async(spaceid, type, callback) => {
        const data = await think.model('ext_ad_space').showad(spaceid);
        let res = '';
        if (!think.isEmpty(data)) {
          if (type === 'code') {
            res = data[0].code;
          } else {
            res = JSON.parse(data[0].json);
          }
        }
        callback(null, res);
      }, true);
    }
  }
};
