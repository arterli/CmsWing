/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : vkj

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-11-09 23:37:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for vkj_auth_role
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_role`;
CREATE TABLE `vkj_auth_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(80) NOT NULL DEFAULT '' COMMENT '描述信息',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `rule_ids` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_role
-- ----------------------------
INSERT INTO `vkj_auth_role` VALUES ('1', '规则', '分身55', '1', '1,2');
INSERT INTO `vkj_auth_role` VALUES ('2', '测试用户组', '', '1', '');
INSERT INTO `vkj_auth_role` VALUES ('19', '版主', '2222', '1', '2');

-- ----------------------------
-- Table structure for vkj_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_rule`;
CREATE TABLE `vkj_auth_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `desc` varchar(255) NOT NULL DEFAULT '',
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `condition` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_rule
-- ----------------------------
INSERT INTO `vkj_auth_rule` VALUES ('1', '/admin/index', '规则名称', '0', '1', '');
INSERT INTO `vkj_auth_rule` VALUES ('2', '/admin/test', '用户编辑', '0', '1', '');

-- ----------------------------
-- Table structure for vkj_auth_user_role
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_user_role`;
CREATE TABLE `vkj_auth_user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role` (`user_id`,`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_user_role
-- ----------------------------
INSERT INTO `vkj_auth_user_role` VALUES ('1', '1', '1');
INSERT INTO `vkj_auth_user_role` VALUES ('2', '1', '2');
INSERT INTO `vkj_auth_user_role` VALUES ('3', '14', '19');

-- ----------------------------
-- Table structure for vkj_member
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of vkj_member
-- ----------------------------
INSERT INTO `vkj_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '0', 'fdsa@fasf.com', '0', '', '1446275814', '0', '1447075940516', '2130706433', '1446275814', '1');
INSERT INTO `vkj_member` VALUES ('2', 'aaa', '11111', '0', 'fdsa@fsaf.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('3', '111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fsa@fasfsa.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('4', '', '', '0', '', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('5', '111111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fs@fasfsa.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('6', '1111111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fs@fa11sfsa.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('7', '11111111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fs@fa111sfsa.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('8', '1111111111', '820cb75001125e8ca9341be7b9a88b5f', '0', 'fsa11@fdsaf.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('9', 'admin1', 'd7aff02efcfd6598838a793e0e56bc16', '0', 'fs@fa11sfs1a.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('10', 'gfdg', 'd7aff02efcfd6598838a793e0e56bc16', '0', 'admin@dfsa.cm', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('11', '444', '0128c1c4b9433fa200058bc710adc784', '0', 'fdsf@fsa.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('12', '888', '3ae1333424aca381773ca6aee2ad9654', '0', '888@saa.com', '0', '', '0', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('13', '123', '331be45924e51dd5ddaa7245d8afd9da', '0', '1123@fsdf.com', '0', '', '1446799913659', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('14', '阿特', 'db1ad0e28f22ed36007fb49d004ea404', '0', 'arterli@qq.com', '0', '', '1446800106502', '0', '0', '0', '0', '0');
INSERT INTO `vkj_member` VALUES ('15', '88899', 'f986263503f81f23690f2148145b2dff', '0', 'fafs@fasf.com', '0', '', '1447042561625', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for vkj_menu
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_menu
-- ----------------------------
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
INSERT INTO `vkj_menu` VALUES ('22', '保存用户行为', '19', '0', 'User/saveAction', '0', '\"用户->用户行为\"保存编辑和新增的用户行为', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('23', '变更行为状态', '19', '0', 'User/setStatus', '0', '\"用户->用户行为\"中的启用,禁用和删除权限', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('24', '禁用会员', '19', '0', 'User/changeStatus?method=forbidUser', '0', '\"用户->用户信息\"中的禁用', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('25', '启用会员', '19', '0', 'User/changeStatus?method=resumeUser', '0', '\"用户->用户信息\"中的启用', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('26', '删除会员', '19', '0', 'User/changeStatus?method=deleteUser', '0', '\"用户->用户信息\"中的删除', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('27', '权限管理', '16', '0', 'AuthManager/index', '0', '', '用户管理', '0', '1');
INSERT INTO `vkj_menu` VALUES ('28', '删除', '27', '0', 'AuthManager/changeStatus?method=deleteGroup', '0', '删除用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('29', '禁用', '27', '0', 'AuthManager/changeStatus?method=forbidGroup', '0', '禁用用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('30', '恢复', '27', '0', 'AuthManager/changeStatus?method=resumeGroup', '0', '恢复已禁用的用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('31', '新增', '27', '0', 'AuthManager/createGroup', '0', '创建新的用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('32', '编辑', '27', '0', 'AuthManager/editGroup', '0', '编辑用户组名称和描述', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('33', '保存用户组', '27', '0', 'AuthManager/writeGroup', '0', '新增和编辑用户组的\"保存\"按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('34', '授权', '27', '0', 'AuthManager/group', '0', '\"后台 \\ 用户 \\ 用户信息\"列表页的\"授权\"操作按钮,用于设置用户所属用户组', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('35', '访问授权', '27', '0', 'AuthManager/access', '0', '\"后台 \\ 用户 \\ 权限管理\"列表页的\"访问授权\"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('36', '成员授权', '27', '0', 'AuthManager/user', '0', '\"后台 \\ 用户 \\ 权限管理\"列表页的\"成员授权\"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('37', '解除授权', '27', '0', 'AuthManager/removeFromGroup', '0', '\"成员授权\"列表页内的解除授权操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('38', '保存成员授权', '27', '0', 'AuthManager/addToGroup', '0', '\"用户信息\"列表页\"授权\"时的\"保存\"按钮和\"成员授权\"里右上角的\"添加\"按钮)', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('39', '分类授权', '27', '0', 'AuthManager/category', '0', '\"后台 \\ 用户 \\ 权限管理\"列表页的\"分类授权\"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('40', '保存分类授权', '27', '0', 'AuthManager/addToCategory', '0', '\"分类授权\"页面的\"保存\"按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('41', '模型授权', '27', '0', 'AuthManager/modelauth', '0', '\"后台 \\ 用户 \\ 权限管理\"列表页的\"模型授权\"操作按钮', '', '0', '1');
INSERT INTO `vkj_menu` VALUES ('42', '保存模型授权', '27', '0', 'AuthManager/addToModel', '0', '\"分类授权\"页面的\"保存\"按钮', '', '0', '1');
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

-- ----------------------------
-- Table structure for vkj_session
-- ----------------------------
DROP TABLE IF EXISTS `vkj_session`;
CREATE TABLE `vkj_session` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cookie` varchar(255) NOT NULL DEFAULT '',
  `data` text,
  `expire` bigint(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cookie` (`cookie`),
  KEY `expire` (`expire`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_session
-- ----------------------------
INSERT INTO `vkj_session` VALUES ('8', 'cxMuvu16OXQ0H0RJzO7jTdhxZRXoBpdQ', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446810438696');
INSERT INTO `vkj_session` VALUES ('9', 'q7awxcI7ZoSzmwsdIeWB_01G_eBKbvQ9', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1446742563230}}', '1446886816922');
INSERT INTO `vkj_session` VALUES ('10', '1_t_wccNGgVSPPUFpHqb6OWFZ5rUiwc1', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1446779193061}}', '1446904186687');
INSERT INTO `vkj_session` VALUES ('11', 'O_LiD7L9il9_5ydPAu0R1t2POQEHVCVP', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1446817744856}}', '1447067811510');
INSERT INTO `vkj_session` VALUES ('12', 'ixnFu7zPMdcQex6WAqeirVaAij82e_Wi', null, '1447057007515');
INSERT INTO `vkj_session` VALUES ('13', 'wtMBariZOl9r27e1J2R60hgb9zYC73Rr', null, '1447057008927');
INSERT INTO `vkj_session` VALUES ('14', 'HIO1t81vIgVYOfIK5zEFW9xwEVY2dMer', null, '1447057203021');
INSERT INTO `vkj_session` VALUES ('15', 'KlyVb1KnvjFHLqeog7lLt5KF8amofYAn', null, '1447057205157');
INSERT INTO `vkj_session` VALUES ('16', 'buPmGYYiQy9KHs1NlVl_1EO3X1_w8d3c', null, '1447057205775');
INSERT INTO `vkj_session` VALUES ('17', 'PEbPtzUD3TBUDa5tG__BuiMlouR2Qh4R', null, '1447057206493');
INSERT INTO `vkj_session` VALUES ('18', '1nDapZz4XimiJBCchqWeTt5ugPYoXczg', null, '1447057207022');
INSERT INTO `vkj_session` VALUES ('19', 'OOkFSwu_anVQaGUqTnWSbgrivFYRdcgT', null, '1447057208100');
INSERT INTO `vkj_session` VALUES ('20', 'l8xE3EADVNbpK5GlF8q8obLXXHS5eK2H', null, '1447057208618');
INSERT INTO `vkj_session` VALUES ('21', '7hvzhKQLOWAQW09qc2mUGHZ6vOxqMFpc', null, '1447057210711');
INSERT INTO `vkj_session` VALUES ('22', 'ZY0TtaQOarHV7ygB4dX3Y1iNN5Iznyku', null, '1447057219151');
INSERT INTO `vkj_session` VALUES ('23', 'tIjsWQn_FrJpKwtRD4By4XQpqKDvLu9m', null, '1447057220196');
INSERT INTO `vkj_session` VALUES ('24', 'GsahjSI_ibwbZWQTW1W_oVHB3op2sXq3', null, '1447057220853');
INSERT INTO `vkj_session` VALUES ('25', 'EydxsKOB3xV3q6ZeDD7m20ju51p5Wvfp', null, '1447057222165');
INSERT INTO `vkj_session` VALUES ('26', 'f0M_sDfICQQev3NpcmWM1Og84bh_RG7p', null, '1447057222898');
INSERT INTO `vkj_session` VALUES ('27', 'igpGUiXEvj91ckel0snUnx7_4uPm4y6u', null, '1447057223489');
INSERT INTO `vkj_session` VALUES ('28', 'iUIWhOMBguCI_7Ywt_i9wc8BTCxG2MLJ', null, '1447057831057');
INSERT INTO `vkj_session` VALUES ('29', '_oiDPM_d8JRhKOMTsKQYFk2tihVPkzux', null, '1447057831839');
INSERT INTO `vkj_session` VALUES ('30', 'tCA_4fmv8IaY3pO_REhcERFsqgse463Q', null, '1447057833055');
INSERT INTO `vkj_session` VALUES ('31', 'Ol8L57Aase0_XmioJScFxOYEvLjP8y_K', null, '1447057834068');
INSERT INTO `vkj_session` VALUES ('32', '8nF5FfsdVkBGKy0j3j9Gq3cRJM4884R0', null, '1447057840289');
INSERT INTO `vkj_session` VALUES ('33', 'VyuZbuAKdtbpC6cKKi7HGNKYxk10iDdQ', null, '1447058542369');
INSERT INTO `vkj_session` VALUES ('34', 'idLkANekmOZv1tsBnMIZKtRlcqVYzXnU', null, '1447058602999');
INSERT INTO `vkj_session` VALUES ('35', 'a0eOehJigjkCc5nXF_OyZkhErCoYc15C', null, '1447058807770');
INSERT INTO `vkj_session` VALUES ('36', 'F6K78Yet_Qo9ZjkgSJPrLIrKr_0BMUw6', null, '1447058864310');
INSERT INTO `vkj_session` VALUES ('37', 'K4y7Ja7NPg931vRJVEinT70QvyzSe3L3', null, '1447059034319');
INSERT INTO `vkj_session` VALUES ('38', 'RZnQhFsjfwzPejiIqDsbFkR6R_bgIdkN', null, '1447059387592');
INSERT INTO `vkj_session` VALUES ('39', '__txknCGSv5GM2besYqQc3tt_0fTzkPV', null, '1447059541943');
INSERT INTO `vkj_session` VALUES ('40', 'tjn93wg53ihWzS1_BsWZzak3bA5BEynZ', null, '1447059545857');
INSERT INTO `vkj_session` VALUES ('41', 'eNodWBT4BFV30k5iitPcrgZLBJmwwuOR', null, '1447059569601');
INSERT INTO `vkj_session` VALUES ('42', 'mzxgoO0tPSOSj484pOYf2MJR9DFEpHgh', null, '1447059595006');
INSERT INTO `vkj_session` VALUES ('43', 'zrqYxG8tu_jo5maxhZQMuvHBd4uWxXty', null, '1447059635827');
INSERT INTO `vkj_session` VALUES ('44', '7YUi7BD_zleqhdGtyp8roIBKmswnXmQ7', null, '1447059712217');
INSERT INTO `vkj_session` VALUES ('45', '7j_gJF0xanHikWfv1Y7z5x8y_tlqS_kL', null, '1447059804921');
INSERT INTO `vkj_session` VALUES ('46', '_CgEx5pwuriZQO6ezOdxEHD5pE_wQKol', null, '1447059839572');
INSERT INTO `vkj_session` VALUES ('47', 'oe30jg2xiC9YAp1hK6XxpWCIfMToOoMz', null, '1447059865464');
INSERT INTO `vkj_session` VALUES ('48', 'GPFMKD_UDdwmZJYmvmTlvMHvnEmeb0Gw', null, '1447059929477');
INSERT INTO `vkj_session` VALUES ('49', 'dGENKuVpfm2YGnZ59xWSNjZf5lzV3x4W', null, '1447060021675');
INSERT INTO `vkj_session` VALUES ('50', '2ykpYdTt0NyNF5D78BLZxsSmvO7pghle', null, '1447060022682');
INSERT INTO `vkj_session` VALUES ('51', '1RGn_w3Zz53LTWmlmvpkK2pTALMq_yO2', null, '1447060024518');
INSERT INTO `vkj_session` VALUES ('52', 'H5IR2nDG2ZJqzBi9G82DKpaYTFk4WVWL', null, '1447061660097');
INSERT INTO `vkj_session` VALUES ('53', 'XnS4ssnJ_ZT0Bc8Jj1XB5JbQQHgWj8Xx', null, '1447061662157');
INSERT INTO `vkj_session` VALUES ('54', 'JKUKSMKr5VLKiYf3x8w6RAFqDkBJOt7I', null, '1447061663224');
INSERT INTO `vkj_session` VALUES ('55', 'EKzvt_bSo2EiGQFFTtthsPih5_6tTgTJ', null, '1447061672024');
INSERT INTO `vkj_session` VALUES ('56', 'iv4KkPVAjw7hac5ZrTLp_W4tl53wQ_18.Xdtrq1ND4FL0uEP1/izklrWZNzZS11wIM6rybwW3kKE', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1446999149314}}', '1447085617060');
