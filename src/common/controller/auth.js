/**
 * Created by arter on 2015/11/3.
 */
/**
 * 权限认证类
 * 功能特性：
 * 1，是对规则进行认证，不是对节点进行认证。用户可以把节点当作规则名称实现对节点进行认证。
 *      $auth=new Auth();  $auth->check('规则名称','用户id')
 * 2，可以同时对多条规则进行认证，并设置多条规则的关系（or或者and）
 *      $auth=new Auth();  $auth->check('规则1,规则2','用户id','and')
 *      第三个参数为and时表示，用户需要同时具有规则1和规则2的权限。 当第三个参数为or时，表示用户值需要具备其中一个条件即可。默认为or
 * 3，一个用户可以属于多个用户组(think_auth_group_access表 定义了用户所属用户组)。我们需要设置每个用户组拥有哪些规则(think_auth_group 定义了用户组权限)
 *
 * 4，支持规则表达式。
 *      在think_auth_rule 表中定义一条规则时，如果type为1， condition字段就可以定义规则表达式。 如定义{score}>5  and {score}<100  表示用户的分数在5-100之间时这条规则才会通过。
 */

//数据库
/*
 -- ----------------------------
 -- think_auth_rule，规则表，
 -- id:主键，name：规则唯一标识, title：规则中文名称 status 状态：为1正常，为0禁用，condition：规则表达式，为空表示存在就验证，不为空表示按照条件验证
 -- ----------------------------
 DROP TABLE IF EXISTS `think_auth_rule`;
 CREATE TABLE `think_auth_rule` (
 `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
 `name` char(80) NOT NULL DEFAULT '',
 `title` char(20) NOT NULL DEFAULT '',
 `type` tinyint(1) NOT NULL DEFAULT '1',
 `status` tinyint(1) NOT NULL DEFAULT '1',
 `condition` char(100) NOT NULL DEFAULT '',  # 规则附件条件,满足附加条件的规则,才认为是有效的规则
 PRIMARY KEY (`id`),
 UNIQUE KEY `name` (`name`)
 ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
 -- ----------------------------
 -- think_auth_group 用户组表，
 -- id：主键， title:用户组中文名称， rules：用户组拥有的规则id， 多个规则","隔开，status 状态：为1正常，为0禁用
 -- ----------------------------
 DROP TABLE IF EXISTS `think_auth_group`;
 CREATE TABLE `think_auth_group` (
 `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
 `title` char(100) NOT NULL DEFAULT '',
 `status` tinyint(1) NOT NULL DEFAULT '1',
 `rules` char(80) NOT NULL DEFAULT '',
 PRIMARY KEY (`id`)
 ) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
 -- ----------------------------
 -- think_auth_group_access 用户组明细表
 -- uid:用户id，group_id：用户组id
 -- ----------------------------
 DROP TABLE IF EXISTS `think_auth_group_access`;
 CREATE TABLE `think_auth_group_access` (
 `uid` mediumint(8) unsigned NOT NULL,
 `group_id` mediumint(8) unsigned NOT NULL,
 UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
 KEY `uid` (`uid`),
 KEY `group_id` (`group_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
 */
'use strict';
var Url = require('url');
export default class extends think.controller.base {
    //默认配置

    init(http) {
        super.init(http);
        this._config = {
            'AUTH_ON'           : true,                      // 认证开关
            'AUTH_TYPE'         : 1,                         // 认证方式，1为实时认证；2为登录认证。
            'AUTH_GROUP'        : 'auth_group',        // 用户组数据表名
            'AUTH_GROUP_ACCESS' : 'auth_group_access', // 用户-用户组关系表
            'AUTH_RULE'         : 'auth_rule',         // 权限规则表
            'AUTH_USER'         : 'member'             // 用户信息表
        };

        let prefix = think.config("db.prefix");
        this._config.AUTH_GROUP = prefix+this._config.AUTH_GROUP;
        this._config.AUTH_RULE  = prefix+this._config.AUTH_RULE;
        this._config.AUTH_USER  = prefix+this._config.AUTH_USER;
        this._config.AUTH_GROUP_ACCESS  = prefix+this._config.AUTH_GROUP_ACCESS;
        if(think.config("auth")){
            this._config=Object.assign(this._config,think.config("auth"));
        }
    }


    /**
     * 检查权限
     * @param name string|array  需要验证的规则列表,支持逗号分隔的权限规则或索引数组
     * @param uid  int           认证用户的id
     * @param string mode        执行check的模式
     * @param relation string    如果为 'or' 表示满足任一条规则即通过验证;如果为 'and'则表示需满足所有规则才能通过验证
     * @return boolean           通过验证返回true;失败返回false
     */

    async check(name, uid, type=1, mode='url', relation='or'){
       // console.log(this._config);
       // console.log(uid);
        if (!this._config.AUTH_ON)
            return true;
        let authList = await this.getAuthList(uid,type); //获取用户需要验证的所有有效规则列表
          // console.log(authList);

        if (think.isString(name)) {
            name = name.toLowerCase();
            if (name.indexOf(',') !== -1) {
                name = name.split(',');
            } else {
                name = [name];
            }
        }
       // console.log(name);
        let list = []; //保存验证通过的规则名
        if (mode=='url') {
            var REQUEST = JSON.stringify(this.param()).toLowerCase();
        }
        authList.forEach(v=>{
           // console.log(v)
            let query = Url.parse(v,true).query;
                query = JSON.stringify(query).toLowerCase();
            //console.log();
            if(mode=='url' && query == REQUEST && in_array(v,name)){
                list.push(v)
            }else if(in_array(v,name)){
                list.push(v)
            }
        })
        console.log(list);
        if (relation == 'or' && !think.isEmpty(list)) {
            return true;
        }else{
            return false;
        }
    }





    /**
     * 获得权限列表
     * @param integer $uid  用户id
     * @param integer $type
     */
    async getAuthList(uid,type) {
        let _authList = {}; //保存用户验证通过的权限列表
        let a = [];
        a.push(type);
        let t = a.join(',');
        if (!(typeof(_authList[uid + t]) == "undefined")) {
            return _authList[uid + t];
        }
        let session = await this.session('_AUTH_LIST_' + uid + t);
        if (this._config.AUTH_TYPE == 2 && !(typeof(session) == "undefined")) {
            return session;
        }

        //读取用户所属用户组
        let groups = await this.getGroups(uid);
        //console.log(groups);
        //let ids ={};
        let ids = [];
        groups.forEach(v=> {
            ids = ids.concat(v.rules.split(","));

        });
        ids = unique(ids)
        //console.log(ids);

        if (think.isEmpty(ids)) {
            _authList[uid.t] = {};
            return {};
        }
        let map = {
            'id': ['in', ids],
            'type': type,
            'status': 1,
        };

        //读取用户组所有权限规则
        let rules = await this.model(this._config.AUTH_RULE)
            .where(map).field('condition,name').select()

       // console.log(rules);

        //循环规则，判断结果。
        let authList = [];   //
        rules.forEach ( rule => {
            if (!think.isEmpty(rule['condition'])) { //根据condition进行验证
                //let user = this.getUserInfo(uid);//获取用户信息,一维数组

               // let command = preg_replace('/\{(\w*?)\}/', '$user[\'\\1\']', $rule['condition']);
                //dump($command);//debug
           // @(eval('$condition=(' . $command . ');'));
               // if ($condition) {
                  //  $authList[] = strtolower($rule['name']);
                //}
            } else {
                //只要存在就记录
                authList.push(rule.name.toLowerCase());
            }
        })
        //console.log(authList);
        _authList[uid.t] = authList;
        if(this._config['AUTH_TYPE']==2){
            //规则列表结果保存到session
            await this.session('_AUTH_LIST_' + uid + t,authList);
        }
        return unique(authList);
    }
    /**
     * 根据用户id获取用户组,返回值为数组
     * @param  uid int     用户id
     * @return array       用户所属的用户组 array(
     *                                         array('uid'=>'用户id','group_id'=>'用户组id','title'=>'用户组名称','rules'=>'用户组拥有的规则id,多个,号隔开'),
     *                                         ...)
     */
    async getGroups(uid) {
        let groups = {};
        if (!(typeof(groups[uid])=="undefined"))
            return groups[uid];
        let db=this.model(this._config['AUTH_GROUP_ACCESS']);
        let user_groups = await db.join({
            table: this._config['AUTH_GROUP'],
            //join: "inner", //join 方式，有 left, right, inner 3 种方式
            as: "c", // 表别名
            on: ["group_id", "id"] //ON 条件
        }).where({uid: uid, status: 1}).field("rules").select();

        groups[uid]=user_groups;
        return groups[uid];
    }
}