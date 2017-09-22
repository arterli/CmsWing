/* eslint-disable indent */
// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
  /**
     * 获取行为数据
     * @param string id 行为id
     * @param string field 需要获取的字段
     * @author arterli <arterli@qq.com>
     */
  async get_action(id, field) {
    id = id || null, field = field || null;
    if (think.isEmpty(id) && !think.isNumberString(id)) {
      return false;
    }
    const list = {};
    const map = {'status': ['>', -1], 'id': id};
    list[id] = await this.where(map).field(true).find();

    return think.isEmpty(field) ? list[id] : list[id][field];
  }

  /**
     * 记录行为日志，并执行该行为的规则
     * await this.model("cmswing/action").log("action","model","record_id","user_id",this.ip(),this.http.url)
     * @param string action 行为标识
     * @param string model 触发行为的模型名
     * @param int record_id 触发行为的记录id
     * @param int user_id 执行行为的用户id
     * @return boolean
     * @author arterli <arterli@qq.com>
     */
  async log(action, model, record_id, user_id, ip, url) {
    // action=action||null,model=model||null,record_id=record_id||null,user_id=user_id||null;
    // 参数检查
    if (think.isEmpty(action) || think.isEmpty(model) || think.isEmpty(record_id)) {
      return '参数不能为空';
    }

    if (think.isEmpty(user_id)) {
      const user = await think.session('userInfo');
      const id = user.id;
      user_id = id;
    }

    // 查询行为，判断是否执行

    const action_info = await this.where({name: action}).find();
    if (action_info.status != 1) {
      return '该行为被禁用';
    }

    // 插入行为日志

    const data = {
      action_id: action_info.id,
      user_id: user_id,
      action_ip: _ip2int(ip),
      model: model,
      record_id: record_id,
      create_time: new Date().valueOf()
    };
    data.remark = '';
    // 解析日志规则，生成日志备注；
    if (!think.isEmpty(action_info.log)) {
      const match = action_info.log.match(/\[(\S+?)\]/g);
      if (!think.isEmpty(match)) {
        const log = {
          user: user_id,
          record: record_id,
          model: model,
          time: new Date().valueOf(),
          data: {
            user: user_id,
            record: record_id,
            model: model,
            time: new Date().valueOf()
          }
        };

        const replace = [];
        for (let val of match) {
          val = val.replace(/(^\[)|(\]$)/g, '');
          const param = val.split('|');
          // console.log(param);
          if (!think.isEmpty(param[1])) {
            if (param[0] == 'user') {
              replace.push(await call_user_func(param[1], log[param[0]]));
            } else {
              replace.push(call_user_func(param[1], log[param[0]]));
            }
          } else {
            replace.push(log[param[0]]);
          }
        }

        data.remark = str_replace(match, replace, action_info.log);
        // console.log(data.remark)
      } else {
        data.remark = action_info.log;
      }
    } else {
      // 未定义日志规则,记录操作URL
      data.remark = '操作url:' + url;
    }
    if (!think.isNumber(record_id)) {
      data.record_id = 0;
    }
    await this.model('action_log').add(data);

    if (!think.isEmpty(action_info.rule)) {
      const rules = await this.parse_action(action, user_id);
      // console.log(rules);
      const res = await this.execute_action(rules, action_info.id, user_id);
    }
  }

  /**
     * 解析行为规则
     * 规则定义  table:table|field:field|condition:condition|rule:rule[|cycle:cycle|max:max][;......]
     * 规则字段解释：table->要操作的数据表，不需要加表前缀；
     *              field->要操作的字段；
     *              condition->操作的条件，目前支持字符串，默认变量 ${self} 为执行行为的用户
     *              rule->对字段进行的具体操作，目前支持加或者减，如：10，-10
     *              cycle->执行周期，单位（小时），表示cycle小时内最多执行max次
     *              max->单个周期内的最大执行次数（cycle和max必须同时定义，否则无效）
     * 单个行为后可加 ； 连接其他规则
     * @param string action 行为id或者name
     * @param int self 替换规则里的变量为执行用户的id
     * @return boolean|array: false解析出错 ， 成功返回规则数组
     * @author arterli <arterli@qq.com>
     */

  async parse_action(action, self) {
    if (think.isEmpty(action)) {
      return false;
    }
    // 参数支持id或者name
    let map;
    if (think.isNumberString(action)) {
      map = {'id': action};
    } else {
      map = {'name': action};
    }
    // 查询行为信息
    const info = await this.where(map).find();
    if (!info || info.status != 1) {
      return false;
    }

    // 解析规则:table:table|field:field|condition:condition|rule:rule[|cycle:cycle|max:max][;......]

    let rules = info.rule;
    rules = str_replace('${self}', self, rules);
    rules = rules.split(';');
    // console.log(rules);
    const ret = [];
    for (const val of rules) {
      if (val) {
        const obj = {};
        const rule = val.split('|');
        for (const v of rule) {
          const field = think.isEmpty(v) ? [] : v.split(':');
          console.log(field);
          if (!think.isEmpty(field)) {
            obj[field[0]] = field[1];
          }
        }
        ret.push(obj);
      }
    }
    return ret;
  }

  /**
     * 执行行为
     * @param array $rules 解析后的规则数组
     * @param int $action_id 行为id
     * @param array $user_id 执行的用户id
     * @return boolean false 失败 ， true 成功
     * @author arterli <arterli@qq.com>
     */
  async execute_action(rules, action_id, user_id) {
    // console.log(rules + action_id + user_id);

    if (!rules || think.isEmpty(action_id) || think.isEmpty(user_id)) {
      return false;
    }

    let ret = true;
    for (const rule of rules) {
      // 检查执行周期
      const map = {
        action_id: action_id,
        user_id: user_id
      };
      if (!think.isEmpty(rule.cycle) && !think.isEmpty(rule.max)) {
        map.create_time = ['>', new Date().valueOf() - rule.cycle * 3600 * 1000];
        // console.log(map);
        const exec_count = await this.model('action_log').where(map).count();
        // console.log(exec_count);
        if (exec_count > rule.max) {
          continue;
        }
      }
      // 执行数据库操作
      const model = this.model(rule.table);
      const field = rule.field;
      let step = parseInt(rule.rule);
      let res;
      if (step >= 0) {
        res = await model.where(rule.condition).increment(field, step);
      } else {
        step = Math.abs(step);
        res = await model.where(rule.condition).decrement(field, step);
      }
      // console.log(Math.abs(step));
      if (!res) {
        ret = false;
      }
    }
    return ret;
  }
};
