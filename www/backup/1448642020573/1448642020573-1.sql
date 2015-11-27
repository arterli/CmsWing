-- -----------------------------
-- Think MySQL Data Transfer 
-- 
-- Host     : 127.0.0.1
-- Port     : 3306
-- Database : vkj
-- 
-- Part : #1
-- Date : 2015-11-28 00:33:40
-- -----------------------------

SET FOREIGN_KEY_CHECKS = 0;


-- -----------------------------
-- Table structure for `vkj_auth_role`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_auth_role`;
CREATE TABLE `vkj_auth_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(80) NOT NULL DEFAULT '' COMMENT '描述信息',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `rule_ids` varchar(255) DEFAULT '',
  `module` varchar(20) NOT NULL DEFAULT '' COMMENT '用户组所属模块',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '组类型',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `vkj_auth_role`
-- -----------------------------
INSERT INTO `vkj_auth_role` VALUES ('1', '规则', '分身55111', '1', '10,12,13', 'admin', '1');
INSERT INTO `vkj_auth_role` VALUES ('2', '测试用户组', '', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_role` VALUES ('19', '版主', '2222', '1', '2', 'admin', '1');

-- -----------------------------
-- Table structure for `vkj_auth_rule`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_auth_rule`;
CREATE TABLE `vkj_auth_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `desc` varchar(255) NOT NULL DEFAULT '',
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `condition` varchar(255) DEFAULT '',
  `module` varchar(20) NOT NULL COMMENT '规则所属module',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1-url;2-主菜单',
  PRIMARY KEY (`id`),
  KEY `module` (`module`,`status`,`type`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `vkj_auth_rule`
-- -----------------------------
INSERT INTO `vkj_auth_rule` VALUES ('9', 'admin/article/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('10', 'admin/Article/index', '内容', '0', '1', '', 'admin', '2');
INSERT INTO `vkj_auth_rule` VALUES ('11', 'admin/Index/index', '首页', '0', '1', '', 'admin', '2');
INSERT INTO `vkj_auth_rule` VALUES ('12', 'admin/article/add1', '新增1', '0', '-1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('13', 'admin/1111', '222', '0', '-1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('14', 'admin/user/add', '333', '0', '-1', '', 'admin', '2');
INSERT INTO `vkj_auth_rule` VALUES ('15', 'admin/article/index', '文档列表', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('16', 'admin/article/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('17', 'admin/article/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('18', 'admin/article/update', '保存', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('19', 'admin/article/autoSave', '保存草稿', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('20', 'admin/article/move', '移动', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('21', 'admin/article/copy', '复制', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('22', 'admin/article/paste', '粘贴', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('23', 'admin/article/batchOperate', '导入', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('24', 'admin/article/recycle', '回收站', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('25', 'admin/article/permit', '还原', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('26', 'admin/article/clear', '清空', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('27', 'admin/User/index', '用户信息', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('28', 'admin/User/add', '新增用户', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('29', 'admin/User/action', '用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('30', 'admin/User/addaction', '新增用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('31', 'admin/User/editaction', '编辑用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('32', 'admin/User/saveAction', '保存用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('33', 'admin/User/setStatus', '变更行为状态', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('34', 'admin/User/changeStatus?method=forbidUser', '禁用会员', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('35', 'admin/User/changeStatus?method=resumeUser', '启用会员', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('36', 'admin/User/changeStatus?method=deleteUser', '删除会员', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('37', 'admin/AuthManager/index', '权限管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('38', 'admin/AuthManager/changeStatus?method=deleteGroup', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('39', 'admin/AuthManager/changeStatus?method=forbidGroup', '禁用', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('40', 'admin/AuthManager/changeStatus?method=resumeGroup', '恢复', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('41', 'admin/AuthManager/createGroup', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('42', 'admin/AuthManager/editGroup', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('43', 'admin/AuthManager/writeGroup', '保存用户组', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('44', 'admin/AuthManager/group', '授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('45', 'admin/AuthManager/access', '访问授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('46', 'admin/AuthManager/user', '成员授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('47', 'admin/AuthManager/removeFromGroup', '解除授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('48', 'admin/AuthManager/addToGroup', '保存成员授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('49', 'admin/AuthManager/category', '分类授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('50', 'admin/AuthManager/addToCategory', '保存分类授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('51', 'admin/AuthManager/modelauth', '模型授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('52', 'admin/AuthManager/addToModel', '保存模型授权', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('53', 'admin/Addons/create', '创建', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('54', 'admin/Addons/checkForm', '检测创建', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('55', 'admin/Addons/preview', '预览', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('56', 'admin/Addons/build', '快速生成插件', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('57', 'admin/Addons/config', '设置', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('58', 'admin/Addons/disable', '禁用', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('59', 'admin/Addons/enable', '启用', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('60', 'admin/Addons/install', '安装', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('61', 'admin/Addons/uninstall', '卸载', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('62', 'admin/Addons/saveconfig', '更新配置', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('63', 'admin/Addons/adminList', '插件后台列表', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('64', 'admin/Addons/execute', 'URL方式访问插件', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('65', 'admin/model/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('66', 'admin/model/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('67', 'admin/model/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('68', 'admin/model/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('69', 'admin/Attribute/index', '属性管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('70', 'admin/Attribute/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('71', 'admin/Attribute/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('72', 'admin/Attribute/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('73', 'admin/Attribute/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('74', 'admin/Config/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('75', 'admin/Config/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('76', 'admin/Config/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('77', 'admin/Config/save', '保存', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('78', 'admin/Channel/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('79', 'admin/Channel/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('80', 'admin/Channel/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('81', 'admin/Category/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('82', 'admin/Category/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('83', 'admin/Category/remove', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('84', 'admin/Category/operate/type/move', '移动', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('85', 'admin/Category/operate/type/merge', '合并', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('86', 'admin/Database/index?type=export', '备份数据库', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('87', 'admin/Database/export', '备份', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('88', 'admin/Database/optimize', '优化表', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('89', 'admin/Database/repair', '修复表', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('90', 'admin/Database/index?type=import', '还原数据库', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('91', 'admin/Database/import', '恢复', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('92', 'admin/Database/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('93', 'admin/Menu/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('94', 'admin/Menu/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('95', 'admin/Action/actionlog', '行为日志', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('96', 'admin/User/updatePassword', '修改密码', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('97', 'admin/User/updateNickname', '修改昵称', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('98', 'admin/action/edit', '查看行为日志', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('99', 'admin/think/add', '新增数据', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('100', 'admin/think/edit', '编辑数据', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('101', 'admin/Menu/import', '导入', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('102', 'admin/Model/generate', '生成', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('103', 'admin/Addons/addHook', '新增钩子', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('104', 'admin/Addons/edithook', '编辑钩子', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('105', 'admin/Article/sort', '文档排序', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('106', 'admin/Config/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('107', 'admin/Menu/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('108', 'admin/Channel/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('109', 'admin/think/lists', '数据列表', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('110', 'admin/Article/examine', '审核列表', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('111', 'admin/Addons/index', '插件管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('112', 'admin/Config/group', '网站设置', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('113', 'admin/Addons/hooks', '钩子管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('114', 'admin/Category/index', '分类管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('115', 'admin/User/index', '用户', '0', '1', '', 'admin', '2');
INSERT INTO `vkj_auth_rule` VALUES ('116', 'admin/Model/index', '模型管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('117', 'admin/Config/group', '系统', '0', '1', '', 'admin', '2');
INSERT INTO `vkj_auth_rule` VALUES ('118', 'admin/Config/index', '配置管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('119', 'admin/Menu/index', '菜单管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('120', 'admin/other', '其他', '0', '1', '', 'admin', '2');
INSERT INTO `vkj_auth_rule` VALUES ('121', 'admin/Channel/index', '导航管理', '0', '1', '', 'admin', '1');
INSERT INTO `vkj_auth_rule` VALUES ('122', 'admin/Addons/index', '扩展', '0', '1', '', 'admin', '2');

-- -----------------------------
-- Table structure for `vkj_auth_user_role`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_auth_user_role`;
CREATE TABLE `vkj_auth_user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role` (`user_id`,`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `vkj_auth_user_role`
-- -----------------------------
INSERT INTO `vkj_auth_user_role` VALUES ('1', '1', '1');
INSERT INTO `vkj_auth_user_role` VALUES ('2', '1', '2');
INSERT INTO `vkj_auth_user_role` VALUES ('3', '14', '19');

-- -----------------------------
-- Table structure for `vkj_category`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_category`;
CREATE TABLE `vkj_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(30) NOT NULL COMMENT '标志',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序（同级有效）',
  `list_row` tinyint(3) unsigned NOT NULL DEFAULT '10' COMMENT '列表每页行数',
  `meta_title` varchar(50) NOT NULL DEFAULT '' COMMENT 'SEO的网页标题',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '关键字',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `template_index` varchar(100) NOT NULL DEFAULT '' COMMENT '频道页模板',
  `template_lists` varchar(100) NOT NULL DEFAULT '' COMMENT '列表页模板',
  `template_detail` varchar(100) NOT NULL DEFAULT '' COMMENT '详情页模板',
  `template_edit` varchar(100) NOT NULL DEFAULT '' COMMENT '编辑页模板',
  `model` varchar(100) NOT NULL DEFAULT '' COMMENT '列表绑定模型',
  `model_sub` varchar(100) NOT NULL DEFAULT '' COMMENT '子文档绑定模型',
  `type` varchar(100) NOT NULL DEFAULT '' COMMENT '允许发布的内容类型',
  `link_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '外链',
  `allow_publish` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否允许发布内容',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '可见性',
  `reply` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '是否允许回复',
  `check` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '发布的文章是否需要审核',
  `reply_model` varchar(100) NOT NULL DEFAULT '',
  `extend` text COMMENT '扩展设置',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  `icon` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类图标',
  `groups` varchar(255) NOT NULL DEFAULT '' COMMENT '分组定义',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`),
  KEY `pid` (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COMMENT='分类表';

-- -----------------------------
-- Records of `vkj_category`
-- -----------------------------
INSERT INTO `vkj_category` VALUES ('1', 'blog', '博客', '0', '0', '10', '', '', '', '', '', '', '', '2,3', '2', '2,1', '0', '0', '1', '0', '0', '1', '', '1379474947', '1382701539', '1', '0', '');
INSERT INTO `vkj_category` VALUES ('2', 'default_blog', '默认分类d]\', '1', '1', '10', '', '', '', '', '', '', '', '2,3', '2', '2,1,3', '0', '1', '1', '0', '1', '1', '', '1379475028', '1447945186', '1', '0', '');
INSERT INTO `vkj_category` VALUES ('39', 'bbb', '22', '2', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '2,1,3', '0', '1', '1', '0', '0', '', '', '1447946910', '1447946910', '1', '0', 'dfsafa');

-- -----------------------------
-- Table structure for `vkj_member`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_member`;
CREATE TABLE `vkj_member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` char(16) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `score` mediumint(8) NOT NULL DEFAULT '0' COMMENT '用户积分',
  `email` char(32) NOT NULL COMMENT '用户邮箱',
  `login` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `mobile` char(15) NOT NULL DEFAULT '' COMMENT '用户手机',
  `reg_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `reg_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '注册IP',
  `last_login_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `last_login_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '最后登录IP',
  `update_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) DEFAULT '0' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- -----------------------------
-- Records of `vkj_member`
-- -----------------------------
INSERT INTO `vkj_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '0', 'fdsa@fasf.com', '0', '', '1446275814', '0', '1448635342629', '2130706433', '1446275814', '1');
INSERT INTO `vkj_member` VALUES ('2', 'aaa', '11111', '0', 'fdsa@fsaf.com', '0', '', '0', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('3', '111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fsa@fasfsa.com', '0', '', '0', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('17', '444', 'f7e25d9f66d34161c7fba005eae01f8f', '0', 'fdafdsa@fa.com', '0', '', '1448635409436', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('18', '4444', 'd7aff02efcfd6598838a793e0e56bc16', '0', 'dafa@fas.com', '0', '', '1448635774111', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('19', 'wwww', 'd7aff02efcfd6598838a793e0e56bc16', '0', '111111@fasfa.com', '0', '', '1448635802250', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('20', 'eeee', 'd7aff02efcfd6598838a793e0e56bc16', '0', 'ljllj@sfa.com', '0', '', '1448635944022', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('21', 'fdsfas', '824afcbcb4524936b2f5190cf3631f55', '0', 'faa@ddddd.com', '0', '', '1448635989804', '0', '0', '0', '0', '1');
INSERT INTO `vkj_member` VALUES ('22', 'tttttt', 'd7aff02efcfd6598838a793e0e56bc16', '0', '111111@fdsaf.ocm', '0', '', '1448636118837', '0', '0', '0', '0', '1');

-- -----------------------------
-- Table structure for `vkj_menu`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_menu`;
CREATE TABLE `vkj_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文档ID',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序（同级有效）',
  `url` char(255) NOT NULL DEFAULT '' COMMENT '链接地址',
  `hide` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否隐藏',
  `tip` varchar(255) NOT NULL DEFAULT '' COMMENT '提示',
  `group` varchar(50) DEFAULT '' COMMENT '分组',
  `is_dev` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否仅开发者模式可见',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `vkj_menu`
-- -----------------------------
INSERT INTO `vkj_menu` VALUES ('1', '首页', '0', '1', 'Index/index', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('2', '内容', '0', '2', 'Article/index', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('3', '文档列表', '2', '0', 'article/index', '1', '', '内容', '0', '1');
INSERT INTO `vkj_menu` VALUES ('4', '新增', '3', '0', 'article/add', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('5', '编辑', '3', '0', 'article/edit', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('6', '改变状态', '3', '0', 'article/setStatus', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('7', '保存', '3', '0', 'article/update', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('8', '保存草稿', '3', '0', 'article/autoSave', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('9', '移动', '3', '0', 'article/move', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('10', '复制', '3', '0', 'article/copy', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('11', '粘贴', '3', '0', 'article/paste', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('12', '导入', '3', '0', 'article/batchOperate', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('13', '回收站', '2', '0', 'article/recycle', '1', '', '内容', '0', '1');
INSERT INTO `vkj_menu` VALUES ('14', '还原', '13', '0', 'article/permit', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('15', '清空', '13', '0', 'article/clear', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('16', '用户', '0', '3', 'User/index', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('17', '用户信息', '16', '0', 'User/index', '0', '', '用户管理', '0', '1');
INSERT INTO `vkj_menu` VALUES ('18', '新增用户', '17', '0', 'User/add', '0', '添加新用户', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('19', '用户行为', '16', '0', 'User/action', '0', '', '行为管理', '0', '1');
INSERT INTO `vkj_menu` VALUES ('20', '新增用户行为', '19', '0', 'User/addaction', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('21', '编辑用户行为', '19', '0', 'User/editaction', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('22', '保存用户行为', '19', '0', 'User/saveAction', '0', '"用户->用户行为"保存编辑和新增的用户行为', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('23', '变更行为状态', '19', '0', 'User/setStatus', '0', '"用户->用户行为"中的启用,禁用和删除权限', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('24', '禁用会员', '19', '0', 'User/changeStatus?method=forbidUser', '0', '"用户->用户信息"中的禁用', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('25', '启用会员', '19', '0', 'User/changeStatus?method=resumeUser', '0', '"用户->用户信息"中的启用', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('26', '删除会员', '19', '0', 'User/changeStatus?method=deleteUser', '0', '"用户->用户信息"中的删除', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('27', '权限管理', '16', '0', 'AuthManager/index', '0', '', '用户管理', '0', '1');
INSERT INTO `vkj_menu` VALUES ('28', '删除', '27', '0', 'AuthManager/changeStatus?method=deleteGroup', '0', '删除用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('29', '禁用', '27', '0', 'AuthManager/changeStatus?method=forbidGroup', '0', '禁用用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('30', '恢复', '27', '0', 'AuthManager/changeStatus?method=resumeGroup', '0', '恢复已禁用的用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('31', '新增', '27', '0', 'AuthManager/createGroup', '0', '创建新的用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('32', '编辑', '27', '0', 'AuthManager/editGroup', '0', '编辑用户组名称和描述', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('33', '保存用户组', '27', '0', 'AuthManager/writeGroup', '0', '新增和编辑用户组的"保存"按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('34', '授权', '27', '0', 'AuthManager/group', '0', '"后台 \ 用户 \ 用户信息"列表页的"授权"操作按钮,用于设置用户所属用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('35', '访问授权', '27', '0', 'AuthManager/access', '0', '"后台 \ 用户 \ 权限管理"列表页的"访问授权"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('36', '成员授权', '27', '0', 'AuthManager/user', '0', '"后台 \ 用户 \ 权限管理"列表页的"成员授权"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('37', '解除授权', '27', '0', 'AuthManager/removeFromGroup', '0', '"成员授权"列表页内的解除授权操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('38', '保存成员授权', '27', '0', 'AuthManager/addToGroup', '0', '"用户信息"列表页"授权"时的"保存"按钮和"成员授权"里右上角的"添加"按钮)', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('39', '分类授权', '27', '0', 'AuthManager/category', '0', '"后台 \ 用户 \ 权限管理"列表页的"分类授权"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('40', '保存分类授权', '27', '0', 'AuthManager/addToCategory', '0', '"分类授权"页面的"保存"按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('41', '模型授权', '27', '0', 'AuthManager/modelauth', '0', '"后台 \ 用户 \ 权限管理"列表页的"模型授权"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('42', '保存模型授权', '27', '0', 'AuthManager/addToModel', '0', '"分类授权"页面的"保存"按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('43', '扩展', '0', '7', 'Addons/index', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('44', '插件管理', '43', '1', 'Addons/index', '0', '', '扩展', '0', '1');
INSERT INTO `vkj_menu` VALUES ('45', '创建', '44', '0', 'Addons/create', '0', '服务器上创建插件结构向导', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('46', '检测创建', '44', '0', 'Addons/checkForm', '0', '检测插件是否可以创建', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('47', '预览', '44', '0', 'Addons/preview', '0', '预览插件定义类文件', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('48', '快速生成插件', '44', '0', 'Addons/build', '0', '开始生成插件结构', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('49', '设置', '44', '0', 'Addons/config', '0', '设置插件配置', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('50', '禁用', '44', '0', 'Addons/disable', '0', '禁用插件', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('51', '启用', '44', '0', 'Addons/enable', '0', '启用插件', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('52', '安装', '44', '0', 'Addons/install', '0', '安装插件', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('53', '卸载', '44', '0', 'Addons/uninstall', '0', '卸载插件', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('54', '更新配置', '44', '0', 'Addons/saveconfig', '0', '更新插件配置处理', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('55', '插件后台列表', '44', '0', 'Addons/adminList', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('56', 'URL方式访问插件', '44', '0', 'Addons/execute', '0', '控制是否有权限通过url访问插件控制器方法', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('57', '钩子管理', '43', '2', 'Addons/hooks', '0', '', '扩展', '0', '1');
INSERT INTO `vkj_menu` VALUES ('58', '模型管理', '68', '3', 'Model/index', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('59', '新增', '58', '0', 'model/add', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('60', '编辑', '58', '0', 'model/edit', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('61', '改变状态', '58', '0', 'model/setStatus', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('62', '保存数据', '58', '0', 'model/update', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('63', '属性管理', '68', '0', 'Attribute/index', '1', '网站属性配置。', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('64', '新增', '63', '0', 'Attribute/add', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('65', '编辑', '63', '0', 'Attribute/edit', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('66', '改变状态', '63', '0', 'Attribute/setStatus', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('67', '保存数据', '63', '0', 'Attribute/update', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('68', '系统', '0', '4', 'Config/group', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('69', '网站设置', '68', '1', 'Config/group', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('70', '配置管理', '68', '4', 'Config/index', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('71', '编辑', '70', '0', 'Config/edit', '0', '新增编辑和保存配置', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('72', '删除', '70', '0', 'Config/del', '0', '删除配置', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('73', '新增', '70', '0', 'Config/add', '0', '新增配置', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('74', '保存', '70', '0', 'Config/save', '0', '保存配置', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('75', '菜单管理', '68', '5', 'Menu/index', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('76', '导航管理', '68', '6', 'Channel/index', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('77', '新增', '76', '0', 'Channel/add', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('78', '编辑', '76', '0', 'Channel/edit', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('79', '删除', '76', '0', 'Channel/del', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('80', '分类管理', '68', '2', 'Category/index', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('81', '编辑', '80', '0', 'Category/edit', '0', '编辑和保存栏目分类', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('82', '新增', '80', '0', 'Category/add', '0', '新增栏目分类', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('83', '删除', '80', '0', 'Category/remove', '0', '删除栏目分类', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('84', '移动', '80', '0', 'Category/operate/type/move', '0', '移动栏目分类', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('85', '合并', '80', '0', 'Category/operate/type/merge', '0', '合并栏目分类', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('86', '备份数据库', '68', '0', 'Database/index?type=export', '0', '', '数据备份', '0', '1');
INSERT INTO `vkj_menu` VALUES ('87', '备份', '86', '0', 'Database/export', '0', '备份数据库', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('88', '优化表', '86', '0', 'Database/optimize', '0', '优化数据表', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('89', '修复表', '86', '0', 'Database/repair', '0', '修复数据表', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('90', '还原数据库', '68', '0', 'Database/index?type=import', '0', '', '数据备份', '0', '1');
INSERT INTO `vkj_menu` VALUES ('91', '恢复', '90', '0', 'Database/import', '0', '数据库恢复', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('92', '删除', '90', '0', 'Database/del', '0', '删除备份文件', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('93', '其他', '0', '5', 'other', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('96', '新增', '75', '0', 'Menu/add', '0', '', '系统设置', '0', '1');
INSERT INTO `vkj_menu` VALUES ('98', '编辑', '75', '0', 'Menu/edit', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('106', '行为日志', '16', '0', 'Action/actionlog', '0', '', '行为管理', '0', '1');
INSERT INTO `vkj_menu` VALUES ('108', '修改密码', '16', '0', 'User/updatePassword', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('109', '修改昵称', '16', '0', 'User/updateNickname', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('110', '查看行为日志', '106', '0', 'action/edit', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('112', '新增数据', '58', '0', 'think/add', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('113', '编辑数据', '58', '0', 'think/edit', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('114', '导入', '75', '0', 'Menu/import', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('115', '生成', '58', '0', 'Model/generate', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('116', '新增钩子', '57', '0', 'Addons/addHook', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('117', '编辑钩子', '57', '0', 'Addons/edithook', '0', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('118', '文档排序', '3', '0', 'Article/sort', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('119', '排序', '70', '0', 'Config/sort', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('120', '排序', '75', '0', 'Menu/sort', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('121', '排序', '76', '0', 'Channel/sort', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('122', '数据列表', '58', '0', 'think/lists', '1', '', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('123', '审核列表', '3', '0', 'Article/examine', '1', '', '', '0', '1');

-- -----------------------------
-- Table structure for `vkj_session`
-- -----------------------------
DROP TABLE IF EXISTS `vkj_session`;
CREATE TABLE `vkj_session` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cookie` varchar(255) NOT NULL DEFAULT '',
  `data` text,
  `expire` bigint(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cookie` (`cookie`),
  KEY `expire` (`expire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

