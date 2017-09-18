// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
/**
 * Role-Based Access Control

 DROP TABLE IF EXISTS `think_auth_role`;
 CREATE TABLE `think_auth_role` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `desc` varchar(255) NOT NULL DEFAULT '',
 `status` tinyint(11) NOT NULL DEFAULT '1',
 `rule_ids` varchar(255) DEFAULT '' COMMENT '',
 PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 DROP TABLE IF EXISTS `think_auth_rule`;
 CREATE TABLE `think_auth_rule` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL DEFAULT '' COMMENT '',
 `desc` varchar(255) NOT NULL DEFAULT '' COMMENT '',
 `pid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '',
 `status` tinyint(11) NOT NULL DEFAULT '1',
 `condition` varchar(255) DEFAULT '' COMMENT '',
 PRIMARY KEY (`id`),
 UNIQUE KEY `name` (`name`),
 KEY `status` (`status`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 DROP TABLE IF EXISTS `think_auth_user_role`;
 CREATE TABLE `think_auth_user_role` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL,
 `role_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `user_role` (`user_id`,`role_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

 * @type {Class}
 */
module.exports = class extends think.Service {
  /**
   * init
   * @param  {Number} userId []
   * @param  {Object} config []
   * @param  {Object} http   []
   * @return {}        []
   */
  constructor(userId, config, http) {
    super(http);
    if (think.isObject(userId)) {
      config = userId;
      userId = config.id;
    }
    this.userId = userId;
    this.config = think.extend({
      type: 1, // auth type, 2 is session auth
      user: 'member', // user info table
      role: 'auth_role', // role table
      rule: 'auth_rule', // rule table
      user_role: 'auth_user_role', // user - role relation table
      userInfo: null
    }, config);
    this.http = http;
  }
  /**
   * check auth
   * @param  {String} name [auth type]
   * @param  {Boolean} and  [condition]
   * @return {Promise}      []
   */
  async check(name, and) {
    if (think.isString(name)) {
      name = name.split(',');
    }
    const authList = await this.getAuthList();

    if (name.length === 1) {
      return authList.indexOf(name[0]) > -1;
    }

    const logic = and ? 'every' : 'some';

    return name[logic](item => {
      return authList.indexOf(item) > -1;
    });
  }
  async _getAuthList() {
    let data;
    if (this.config.type === 1) {
      data = await this.flushAuthList();
    } else {
      const http = this.http;
      const key = this.config('auth_key');
      think.session(this.http);
      let data = await http.session.get(key);
      if (think.isEmpty(data)) {
        data = await this.flushAuthList();
        await http.session.set(key, data);
      }
    }
    return data;
  }
  /**
   * get auth list
   * @return {Promise} []
   */
  async getAuthList() {
    const data = await Promise.all([this._getAuthList(), this.getUserInfo()]);

    const authList = data[0];
    const userInfo = data[1];
    const result = [];

    authList.forEach(item => {
      if (!item.condition) {
        result.push(item.name);
      } else {
        const condition = item.condition.replace(/\w+/, a => `userInfo.${a}`);
        /* jslint evil: true */
        const fn = new Function('userInfo', `return ${condition}`);
        const flag = fn(userInfo);
        if (flag) {
          result.push(item.name);
        }
      }
    });
    return result;
  }
  /**
   * flush auth list
   * @return {Promise} []
   */
  async flushAuthList() {
    const ids = await this.getRuleIds();
    const model = think.model(this.config.rule);
    return model.field('name,condition').where({id: ['IN', ids], status: 1}).select();
  }
  /**
   * get user info
   * @return {Promise} []
   */
  async getUserInfo() {
    if (!think.isEmpty(this.config.userInfo)) {
      return this.config.userInfo;
    }
    const data = await think.model(this.config.user).where({id: this.userId}).find();
    this.config.userInfo = data;
    return data;
  }
  /**
   * get rule ids
   * @return {Promise} []
   */
  async getRuleIds() {
    const data = await this.getRoles();
    // console.log(data);
    let ids = [];
    data.forEach(item => {
      const ruleIds = (item.rule_ids || '').split(',');
      ids = ids.concat(ruleIds);
    });
    return ids;
  }
  /**
   * get roles
   * @return {Promise} []
   */
  getRoles() {
    return think.model(this.config.user_role).alias('a').join({
      table: this.config.role,
      as: 'b',
      on: ['role_id', 'id']
    }).where({
      'a.user_id': this.userId,
      'b.status': 1
    }).select();
  }
};
