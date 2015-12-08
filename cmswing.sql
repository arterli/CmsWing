/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-12-08 15:40:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_attribute
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_attribute`;
CREATE TABLE `cmswing_attribute` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '字段名',
  `title` varchar(100) NOT NULL DEFAULT '' COMMENT '字段注释',
  `field` varchar(100) NOT NULL DEFAULT '' COMMENT '字段定义',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT '数据类型',
  `value` varchar(100) NOT NULL DEFAULT '' COMMENT '字段默认值',
  `remark` varchar(100) NOT NULL DEFAULT '' COMMENT '备注',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示',
  `extra` varchar(255) NOT NULL DEFAULT '' COMMENT '参数',
  `model_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '模型id',
  `is_must` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否必填',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `validate_rule` varchar(255) NOT NULL DEFAULT '',
  `validate_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `error_info` varchar(100) NOT NULL DEFAULT '',
  `validate_type` varchar(25) NOT NULL DEFAULT '',
  `auto_rule` varchar(100) NOT NULL DEFAULT '',
  `auto_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `auto_type` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `model_id` (`model_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='模型属性表';

-- ----------------------------
-- Records of cmswing_attribute
-- ----------------------------
INSERT INTO `cmswing_attribute` VALUES ('1', 'uid', '用户ID', 'int(10) unsigned NOT NULL ', 'num', '0', '', '0', '', '1', '0', '1', '1384508362', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('2', 'name', '标识', 'char(40) NOT NULL ', 'string', '', '同一根节点下标识不重复', '1', '', '1', '0', '1', '1383894743', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('3', 'title', '标题', 'char(80) NOT NULL ', 'string', '', '文档标题', '1', '', '1', '0', '1', '1383894778', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('4', 'category_id', '所属分类', 'int(10) unsigned NOT NULL ', 'string', '', '', '0', '', '1', '0', '1', '1384508336', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('5', 'description', '描述', 'char(140) NOT NULL ', 'textarea', '', '', '1', '', '1', '0', '1', '1383894927', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('6', 'root', '根节点', 'int(10) unsigned NOT NULL ', 'num', '0', '该文档的顶级文档编号', '0', '', '1', '0', '1', '1384508323', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('7', 'pid', '所属ID', 'int(10) unsigned NOT NULL ', 'num', '0', '父文档编号', '0', '', '1', '0', '1', '1384508543', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('8', 'model_id', '内容模型ID', 'tinyint(3) unsigned NOT NULL ', 'num', '0', '该文档所对应的模型', '0', '', '1', '0', '1', '1384508350', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('9', 'type', '内容类型', 'tinyint(3) unsigned NOT NULL ', 'select', '2', '', '1', '1:目录\r\n2:主题\r\n3:段落', '1', '0', '1', '1384511157', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('10', 'position', '推荐位', 'smallint(5) unsigned NOT NULL ', 'checkbox', '0', '多个推荐则将其推荐值相加', '1', '[DOCUMENT_POSITION]', '1', '0', '1', '1383895640', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('11', 'link_id', '外链', 'int(10) unsigned NOT NULL ', 'num', '0', '0-非外链，大于0-外链ID,需要函数进行链接与编号的转换', '1', '', '1', '0', '1', '1383895757', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('12', 'cover_id', '封面', 'int(10) unsigned NOT NULL ', 'picture', '0', '0-无封面，大于0-封面图片ID，需要函数处理', '1', '', '1', '0', '1', '1384147827', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('13', 'display', '可见性', 'tinyint(3) unsigned NOT NULL ', 'radio', '1', '', '1', '0:不可见\r\n1:所有人可见', '1', '0', '1', '1386662271', '1383891233', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('14', 'deadline', '截至时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '0-永久有效', '1', '', '1', '0', '1', '1387163248', '1383891233', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('15', 'attach', '附件数量', 'tinyint(3) unsigned NOT NULL ', 'num', '0', '', '0', '', '1', '0', '1', '1387260355', '1383891233', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('16', 'view', '浏览量', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '1', '0', '1', '1383895835', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('17', 'comment', '评论数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '1', '0', '1', '1383895846', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('18', 'extend', '扩展统计字段', 'int(10) unsigned NOT NULL ', 'num', '0', '根据需求自行使用', '0', '', '1', '0', '1', '1384508264', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('19', 'level', '优先级', 'int(10) unsigned NOT NULL ', 'num', '0', '越高排序越靠前', '1', '', '1', '0', '1', '1383895894', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('20', 'create_time', '创建时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '', '1', '', '1', '0', '1', '1383895903', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('21', 'update_time', '更新时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '', '0', '', '1', '0', '1', '1384508277', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('22', 'status', '数据状态', 'tinyint(4) NOT NULL ', 'radio', '0', '', '0', '-1:删除\r\n0:禁用\r\n1:正常\r\n2:待审核\r\n3:草稿', '1', '0', '1', '1384508496', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('23', 'parse', '内容解析类型', 'tinyint(3) unsigned NOT NULL ', 'select', '0', '', '0', '0:html\r\n1:ubb\r\n2:markdown', '2', '0', '1', '1384511049', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('24', 'content', '文章内容', 'text NOT NULL ', 'editor', '', '', '1', '', '2', '0', '1', '1383896225', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('25', 'template', '详情页显示模板', 'varchar(100) NOT NULL ', 'string', '', '参照display方法参数的定义', '1', '', '2', '0', '1', '1383896190', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('26', 'bookmark', '收藏数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '2', '0', '1', '1383896103', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('27', 'parse', '内容解析类型', 'tinyint(3) unsigned NOT NULL ', 'select', '0', '', '0', '0:html\r\n1:ubb\r\n2:markdown', '3', '0', '1', '1387260461', '1383891252', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('28', 'content', '下载详细描述', 'text NOT NULL ', 'editor', '', '', '1', '', '3', '0', '1', '1383896438', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('29', 'template', '详情页显示模板', 'varchar(100) NOT NULL ', 'string', '', '', '1', '', '3', '0', '1', '1383896429', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('30', 'file_id', '文件ID', 'int(10) unsigned NOT NULL ', 'file', '0', '需要函数处理', '1', '', '3', '0', '1', '1383896415', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('31', 'download', '下载次数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '3', '0', '1', '1383896380', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('32', 'size', '文件大小', 'bigint(20) unsigned NOT NULL ', 'num', '0', '单位bit', '1', '', '3', '0', '1', '1383896371', '1383891252', '', '0', '', '', '', '0', '');

-- ----------------------------
-- Table structure for cmswing_auth_role
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_auth_role`;
CREATE TABLE `cmswing_auth_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(80) NOT NULL DEFAULT '' COMMENT '描述信息',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `rule_ids` varchar(255) DEFAULT '',
  `module` varchar(20) NOT NULL DEFAULT '' COMMENT '用户组所属模块',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '组类型',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_auth_role
-- ----------------------------
INSERT INTO `cmswing_auth_role` VALUES ('1', '规则', '分身55111', '1', '10,12,13', 'admin', '1');
INSERT INTO `cmswing_auth_role` VALUES ('2', '测试用户组', '', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_role` VALUES ('19', '版主', '2222', '1', '2', 'admin', '1');

-- ----------------------------
-- Table structure for cmswing_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_auth_rule`;
CREATE TABLE `cmswing_auth_rule` (
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
) ENGINE=MyISAM AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_auth_rule
-- ----------------------------
INSERT INTO `cmswing_auth_rule` VALUES ('1', 'article/index', '文档列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('2', 'article/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('3', 'article/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('4', 'article/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('5', 'article/update', '保存', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('6', 'article/autoSave', '保存草稿', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('7', 'article/move', '移动', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('8', 'article/copy', '复制', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('9', 'article/paste', '粘贴', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('10', 'article/batchOperate', '导入', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('11', 'article/recycle', '回收站', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('12', 'article/permit', '还原', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('13', 'article/clear', '清空', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('14', 'User/add', '新增用户', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('15', 'User/addaction', '新增用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('16', 'User/editaction', '编辑用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('17', 'User/saveAction', '保存用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('18', 'User/setStatus', '变更行为状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('19', 'User/changeStatus?method=forbidUser', '禁用会员', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('20', 'User/changeStatus?method=resumeUser', '启用会员', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('21', 'User/changeStatus?method=deleteUser', '删除会员', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('22', 'AuthManager/changeStatus?method=deleteGroup', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('23', 'AuthManager/changeStatus?method=forbidGroup', '禁用', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('24', 'AuthManager/changeStatus?method=resumeGroup', '恢复', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('25', 'AuthManager/createGroup', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('26', 'AuthManager/editGroup', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('27', 'AuthManager/writeGroup', '保存用户组', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('28', 'AuthManager/group', '授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('29', 'AuthManager/access', '访问授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('30', 'AuthManager/user', '成员授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('31', 'AuthManager/removeFromGroup', '解除授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('32', 'AuthManager/addToGroup', '保存成员授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('33', 'AuthManager/category', '分类授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('34', 'AuthManager/addToCategory', '保存分类授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('35', 'AuthManager/modelauth', '模型授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('36', 'AuthManager/addToModel', '保存模型授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('37', 'Addons/create', '创建', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('38', 'Addons/checkForm', '检测创建', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('39', 'Addons/preview', '预览', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('40', 'Addons/build', '快速生成插件', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('41', 'Addons/config', '设置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('42', 'Addons/disable', '禁用', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('43', 'Addons/enable', '启用', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('44', 'Addons/install', '安装', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('45', 'Addons/uninstall', '卸载', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('46', 'Addons/saveconfig', '更新配置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('47', 'Addons/adminList', '插件后台列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('48', 'Addons/execute', 'URL方式访问插件', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('49', 'model/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('50', 'model/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('51', 'model/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('52', 'model/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('53', 'Attribute/index', '属性管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('54', 'Attribute/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('55', 'Attribute/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('56', 'Attribute/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('57', 'Attribute/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('58', 'Config/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('59', 'Config/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('60', 'Config/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('61', 'Config/save', '保存', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('62', 'Channel/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('63', 'Channel/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('64', 'Channel/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('65', 'Category/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('66', 'Category/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('67', 'Category/remove', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('68', 'Category/operate/type/move', '移动', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('69', 'Category/operate/type/merge', '合并', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('70', 'Database/export', '备份', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('71', 'Database/optimize', '优化表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('72', 'Database/repair', '修复表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('73', 'Database/import', '恢复', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('74', 'Database/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('75', 'Menu/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('76', 'Menu/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('77', 'User/updatePassword', '修改密码', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('78', 'User/updateNickname', '修改昵称', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('79', 'action/edit', '查看行为日志', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('80', 'think/add', '新增数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('81', 'think/edit', '编辑数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('82', 'Menu/import', '导入', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('83', 'Model/generate', '生成', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('84', 'Addons/addHook', '新增钩子', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('85', 'Addons/edithook', '编辑钩子', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('86', 'Article/sort', '文档排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('87', 'Config/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('88', 'Menu/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('89', 'Channel/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('90', 'think/lists', '数据列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('91', 'Article/examine', '审核列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('92', 'wenz/mang', '内容管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('93', 'admin/index/index', '首页', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('94', 'admin/user/index', '用户信息', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('95', 'Addons/index', '插件管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('96', 'admin/setup/index', '网站设置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('97', 'Article/index', '网站内容', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('98', 'admin/auth/index', '权限管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('99', 'Addons/hooks', '钩子管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('100', 'admin/category/index', '分类管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('101', 'user', '用户管理', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('102', 'admin/user/action', '用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('103', 'admin/model/index', '模型管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('104', 'setup', '系统设置', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('105', 'admin/setup/group', '配置管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('106', 'admin/action/actionlog', '行为日志', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('107', 'admin/menu/index', '菜单管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('108', 'other', '其他', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('109', 'admin/channel/index', '导航管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('110', 'Addons/index', '扩展', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('111', 'admin/database/index', '备份数据库', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('112', 'admin/database/imports', '还原数据库', '0', '1', '', 'admin', '1');

-- ----------------------------
-- Table structure for cmswing_auth_user_role
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_auth_user_role`;
CREATE TABLE `cmswing_auth_user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role` (`user_id`,`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_auth_user_role
-- ----------------------------
INSERT INTO `cmswing_auth_user_role` VALUES ('1', '1', '1');
INSERT INTO `cmswing_auth_user_role` VALUES ('2', '1', '2');
INSERT INTO `cmswing_auth_user_role` VALUES ('3', '14', '19');

-- ----------------------------
-- Table structure for cmswing_category
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_category`;
CREATE TABLE `cmswing_category` (
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

-- ----------------------------
-- Records of cmswing_category
-- ----------------------------
INSERT INTO `cmswing_category` VALUES ('1', 'blog', '博客', '0', '0', '10', '', '', '', '', '', '', '', '2,3', '2', '2,1', '0', '0', '1', '0', '0', '1', '', '1379474947', '1382701539', '1', '0', '');

-- ----------------------------
-- Table structure for cmswing_document
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_document`;
CREATE TABLE `cmswing_document` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文档ID',
  `uid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `name` char(40) NOT NULL DEFAULT '' COMMENT '标识',
  `title` char(80) NOT NULL DEFAULT '' COMMENT '标题',
  `category_id` int(10) unsigned NOT NULL COMMENT '所属分类',
  `group_id` smallint(3) unsigned NOT NULL COMMENT '所属分组',
  `description` char(140) NOT NULL DEFAULT '' COMMENT '描述',
  `root` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '根节点',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属ID',
  `model_id` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容模型ID',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '2' COMMENT '内容类型',
  `position` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '推荐位',
  `link_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '外链',
  `cover_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '封面',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '可见性',
  `deadline` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '截至时间',
  `attach` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '附件数量',
  `view` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '浏览量',
  `comment` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评论数',
  `extend` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '扩展统计字段',
  `level` int(10) NOT NULL DEFAULT '0' COMMENT '优先级',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  PRIMARY KEY (`id`),
  KEY `idx_category_status` (`category_id`,`status`),
  KEY `idx_status_type_pid` (`status`,`uid`,`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='文档模型基础表';

-- ----------------------------
-- Records of cmswing_document
-- ----------------------------
INSERT INTO `cmswing_document` VALUES ('1', '1', '', 'OneThink1.1开发版发布', '2', '0', '期待已久的OneThink最新版发布', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '8', '0', '0', '0', '1406001413', '1406001413', '1');

-- ----------------------------
-- Table structure for cmswing_document_article
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_document_article`;
CREATE TABLE `cmswing_document_article` (
  `id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文档ID',
  `parse` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容解析类型',
  `content` text NOT NULL COMMENT '文章内容',
  `template` varchar(100) NOT NULL DEFAULT '' COMMENT '详情页显示模板',
  `bookmark` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '收藏数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='文档模型文章表';

-- ----------------------------
-- Records of cmswing_document_article
-- ----------------------------
INSERT INTO `cmswing_document_article` VALUES ('1', '0', '<h1>\r\n	OneThink1.1开发版发布&nbsp;\r\n</h1>\r\n<p>\r\n	<br />\r\n</p>\r\n<p>\r\n	<strong>OneThink是一个开源的内容管理框架，基于最新的ThinkPHP3.2版本开发，提供更方便、更安全的WEB应用开发体验，采用了全新的架构设计和命名空间机制，融合了模块化、驱动化和插件化的设计理念于一体，开启了国内WEB应用傻瓜式开发的新潮流。&nbsp;</strong> \r\n</p>\r\n<h2>\r\n	主要特性：\r\n</h2>\r\n<p>\r\n	1. 基于ThinkPHP最新3.2版本。\r\n</p>\r\n<p>\r\n	2. 模块化：全新的架构和模块化的开发机制，便于灵活扩展和二次开发。&nbsp;\r\n</p>\r\n<p>\r\n	3. 文档模型/分类体系：通过和文档模型绑定，以及不同的文档类型，不同分类可以实现差异化的功能，轻松实现诸如资讯、下载、讨论和图片等功能。\r\n</p>\r\n<p>\r\n	4. 开源免费：OneThink遵循Apache2开源协议,免费提供使用。&nbsp;\r\n</p>\r\n<p>\r\n	5. 用户行为：支持自定义用户行为，可以对单个用户或者群体用户的行为进行记录及分享，为您的运营决策提供有效参考数据。\r\n</p>\r\n<p>\r\n	6. 云端部署：通过驱动的方式可以轻松支持平台的部署，让您的网站无缝迁移，内置已经支持SAE和BAE3.0。\r\n</p>\r\n<p>\r\n	7. 云服务支持：即将启动支持云存储、云安全、云过滤和云统计等服务，更多贴心的服务让您的网站更安心。\r\n</p>\r\n<p>\r\n	8. 安全稳健：提供稳健的安全策略，包括备份恢复、容错、防止恶意攻击登录，网页防篡改等多项安全管理功能，保证系统安全，可靠、稳定的运行。&nbsp;\r\n</p>\r\n<p>\r\n	9. 应用仓库：官方应用仓库拥有大量来自第三方插件和应用模块、模板主题，有众多来自开源社区的贡献，让您的网站“One”美无缺。&nbsp;\r\n</p>\r\n<p>\r\n	<br />\r\n</p>\r\n<p>\r\n	<strong>&nbsp;OneThink集成了一个完善的后台管理体系和前台模板标签系统，让你轻松管理数据和进行前台网站的标签式开发。&nbsp;</strong> \r\n</p>\r\n<p>\r\n	<br />\r\n</p>\r\n<h2>\r\n	后台主要功能：\r\n</h2>\r\n<p>\r\n	1. 用户Passport系统\r\n</p>\r\n<p>\r\n	2. 配置管理系统&nbsp;\r\n</p>\r\n<p>\r\n	3. 权限控制系统\r\n</p>\r\n<p>\r\n	4. 后台建模系统&nbsp;\r\n</p>\r\n<p>\r\n	5. 多级分类系统&nbsp;\r\n</p>\r\n<p>\r\n	6. 用户行为系统&nbsp;\r\n</p>\r\n<p>\r\n	7. 钩子和插件系统\r\n</p>\r\n<p>\r\n	8. 系统日志系统&nbsp;\r\n</p>\r\n<p>\r\n	9. 数据备份和还原\r\n</p>\r\n<p>\r\n	<br />\r\n</p>\r\n<p>\r\n	&nbsp;[ 官方下载：&nbsp;<a href=\"http://www.onethink.cn/download.html\" target=\"_blank\">http://www.onethink.cn/download.html</a>&nbsp;&nbsp;开发手册：<a href=\"http://document.onethink.cn/\" target=\"_blank\">http://document.onethink.cn/</a>&nbsp;]&nbsp;\r\n</p>\r\n<p>\r\n	<br />\r\n</p>\r\n<p>\r\n	<strong>OneThink开发团队 2013~2014</strong> \r\n</p>', '', '0');

-- ----------------------------
-- Table structure for cmswing_document_download
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_document_download`;
CREATE TABLE `cmswing_document_download` (
  `id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文档ID',
  `parse` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容解析类型',
  `content` text NOT NULL COMMENT '下载详细描述',
  `template` varchar(100) NOT NULL DEFAULT '' COMMENT '详情页显示模板',
  `file_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文件ID',
  `download` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '下载次数',
  `size` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='文档模型下载表';

-- ----------------------------
-- Records of cmswing_document_download
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_member
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_member`;
CREATE TABLE `cmswing_member` (
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
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of cmswing_member
-- ----------------------------
INSERT INTO `cmswing_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '0', 'fdsa@fasf.com', '0', '', '1446275814', '0', '1449555552723', '2130706433', '1446275814', '1');
INSERT INTO `cmswing_member` VALUES ('3', '111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fsa@fasfsa.com', '0', '', '0', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('5', '111111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fs@fasfsa.com', '0', '', '0', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('6', '1111111', '310d5bedeea2159d7d8c2b0d639715ad', '0', 'fs@fa11sfsa.com', '0', '', '0', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('2', 'aaa', '11111', '0', 'fdsa@fsaf.com', '0', '', '0', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('17', '444', 'f7e25d9f66d34161c7fba005eae01f8f', '0', 'fdafdsa@fa.com', '0', '', '1448635409436', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('18', '4444', 'd7aff02efcfd6598838a793e0e56bc16', '0', 'dafa@fas.com', '0', '', '1448635774111', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('19', 'wwww', 'd7aff02efcfd6598838a793e0e56bc16', '0', '111111@fasfa.com', '0', '', '1448635802250', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('20', 'eeee', 'd7aff02efcfd6598838a793e0e56bc16', '0', 'ljllj@sfa.com', '0', '', '1448635944022', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('21', 'fdsfas', '824afcbcb4524936b2f5190cf3631f55', '0', 'faa@ddddd.com', '0', '', '1448635989804', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_member` VALUES ('22', 'tttttt', 'd7aff02efcfd6598838a793e0e56bc16', '0', '111111@fdsaf.ocm', '0', '', '1448636118837', '0', '0', '0', '0', '1');

-- ----------------------------
-- Table structure for cmswing_menu
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_menu`;
CREATE TABLE `cmswing_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文档ID',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '标题',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '排序（同级有效）',
  `url` char(255) NOT NULL DEFAULT '' COMMENT '链接地址',
  `hide` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否隐藏',
  `tip` varchar(255) NOT NULL DEFAULT '' COMMENT '提示',
  `group` int(10) NOT NULL COMMENT '分组',
  `is_dev` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否仅开发者模式可见',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_menu
-- ----------------------------
INSERT INTO `cmswing_menu` VALUES ('1', '首页', '0', '1', 'admin/index/index', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('2', '网站内容', '0', '2', 'Article/index', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('3', '文档列表', '2', '0', 'article/index', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('4', '新增', '3', '0', 'article/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('5', '编辑', '3', '0', 'article/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('6', '改变状态', '3', '0', 'article/setStatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('7', '保存', '3', '0', 'article/update', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('8', '保存草稿', '3', '0', 'article/autoSave', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('9', '移动', '3', '0', 'article/move', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('10', '复制', '3', '0', 'article/copy', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('11', '粘贴', '3', '0', 'article/paste', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('12', '导入', '3', '0', 'article/batchOperate', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('13', '回收站', '2', '0', 'article/recycle', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('14', '还原', '13', '0', 'article/permit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('15', '清空', '13', '0', 'article/clear', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('16', '用户管理', '0', '3', 'user', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('17', '用户信息', '16', '1', 'admin/user/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('18', '新增用户', '17', '0', 'User/add', '0', '添加新用户', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('19', '用户行为', '16', '3', 'admin/user/action', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('20', '新增用户行为', '19', '0', 'User/addaction', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('21', '编辑用户行为', '19', '0', 'User/editaction', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('22', '保存用户行为', '19', '0', 'User/saveAction', '0', '\"用户->用户行为\"保存编辑和新增的用户行为', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('23', '变更行为状态', '19', '0', 'User/setStatus', '0', '\"用户->用户行为\"中的启用,禁用和删除权限', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('24', '禁用会员', '19', '0', 'User/changeStatus?method=forbidUser', '0', '\"用户->用户信息\"中的禁用', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('25', '启用会员', '19', '0', 'User/changeStatus?method=resumeUser', '0', '\"用户->用户信息\"中的启用', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('26', '删除会员', '19', '0', 'User/changeStatus?method=deleteUser', '0', '\"用户->用户信息\"中的删除', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('27', '权限管理', '16', '2', 'admin/auth/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('28', '删除', '27', '0', 'AuthManager/changeStatus?method=deleteGroup', '0', '删除用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('29', '禁用', '27', '0', 'AuthManager/changeStatus?method=forbidGroup', '0', '禁用用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('30', '恢复', '27', '0', 'AuthManager/changeStatus?method=resumeGroup', '0', '恢复已禁用的用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('31', '新增', '27', '0', 'AuthManager/createGroup', '0', '创建新的用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('32', '编辑', '27', '0', 'AuthManager/editGroup', '0', '编辑用户组名称和描述', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('33', '保存用户组', '27', '0', 'AuthManager/writeGroup', '0', '新增和编辑用户组的\"保存\"按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('34', '授权', '27', '0', 'AuthManager/group', '0', '\"后台  用户  用户信息\"列表页的\"授权\"操作按钮,用于设置用户所属用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('35', '访问授权', '27', '0', 'AuthManager/access', '0', '\"后台  用户  权限管理\"列表页的\"访问授权\"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('36', '成员授权', '27', '0', 'AuthManager/user', '0', '\"后台  用户  权限管理\"列表页的\"成员授权\"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('37', '解除授权', '27', '0', 'AuthManager/removeFromGroup', '0', '\"成员授权\"列表页内的解除授权操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('38', '保存成员授权', '27', '0', 'AuthManager/addToGroup', '0', '\"用户信息\"列表页\"授权\"时的\"保存\"按钮和\"成员授权\"里右上角的\"添加\"按钮)', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('39', '分类授权', '27', '0', 'AuthManager/category', '0', '\"后台  用户  权限管理\"列表页的\"分类授权\"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('40', '保存分类授权', '27', '0', 'AuthManager/addToCategory', '0', '\"分类授权\"页面的\"保存\"按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('41', '模型授权', '27', '0', 'AuthManager/modelauth', '0', '\"后台  用户  权限管理\"列表页的\"模型授权\"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('42', '保存模型授权', '27', '0', 'AuthManager/addToModel', '0', '\"分类授权\"页面的\"保存\"按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('43', '扩展', '0', '7', 'Addons/index', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('44', '插件管理', '43', '1', 'Addons/index', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('45', '创建', '44', '0', 'Addons/create', '0', '服务器上创建插件结构向导', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('46', '检测创建', '44', '0', 'Addons/checkForm', '0', '检测插件是否可以创建', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('47', '预览', '44', '0', 'Addons/preview', '0', '预览插件定义类文件', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('48', '快速生成插件', '44', '0', 'Addons/build', '0', '开始生成插件结构', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('49', '设置', '44', '0', 'Addons/config', '0', '设置插件配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('50', '禁用', '44', '0', 'Addons/disable', '0', '禁用插件', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('51', '启用', '44', '0', 'Addons/enable', '0', '启用插件', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('52', '安装', '44', '0', 'Addons/install', '0', '安装插件', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('53', '卸载', '44', '0', 'Addons/uninstall', '0', '卸载插件', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('54', '更新配置', '44', '0', 'Addons/saveconfig', '0', '更新插件配置处理', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('55', '插件后台列表', '44', '0', 'Addons/adminList', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('56', 'URL方式访问插件', '44', '0', 'Addons/execute', '0', '控制是否有权限通过url访问插件控制器方法', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('57', '钩子管理', '43', '2', 'Addons/hooks', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('58', '模型管理', '68', '3', 'admin/model/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('59', '新增', '58', '0', 'model/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('60', '编辑', '58', '0', 'model/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('61', '改变状态', '58', '0', 'model/setStatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('62', '保存数据', '58', '0', 'model/update', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('63', '属性管理', '68', '0', 'Attribute/index', '1', '网站属性配置。', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('64', '新增', '63', '0', 'Attribute/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('65', '编辑', '63', '0', 'Attribute/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('66', '改变状态', '63', '0', 'Attribute/setStatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('67', '保存数据', '63', '0', 'Attribute/update', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('68', '系统设置', '0', '4', 'setup', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('69', '网站设置', '68', '1', 'admin/setup/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('70', '配置管理', '68', '4', 'admin/setup/group', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('71', '编辑', '70', '0', 'Config/edit', '0', '新增编辑和保存配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('72', '删除', '70', '0', 'Config/del', '0', '删除配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('73', '新增', '70', '0', 'Config/add', '0', '新增配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('74', '保存', '70', '0', 'Config/save', '0', '保存配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('75', '菜单管理', '68', '5', 'admin/menu/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('76', '导航管理', '68', '6', 'admin/channel/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('77', '新增', '76', '0', 'Channel/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('78', '编辑', '76', '0', 'Channel/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('79', '删除', '76', '0', 'Channel/del', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('80', '分类管理', '68', '2', 'admin/category/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('81', '编辑', '80', '0', 'Category/edit', '0', '编辑和保存栏目分类', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('82', '新增', '80', '0', 'Category/add', '0', '新增栏目分类', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('83', '删除', '80', '0', 'Category/remove', '0', '删除栏目分类', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('84', '移动', '80', '0', 'Category/operate/type/move', '0', '移动栏目分类', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('85', '合并', '80', '0', 'Category/operate/type/merge', '0', '合并栏目分类', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('86', '备份数据库', '68', '7', 'admin/database/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('87', '备份', '86', '0', 'Database/export', '0', '备份数据库', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('88', '优化表', '86', '0', 'Database/optimize', '0', '优化数据表', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('89', '修复表', '86', '0', 'Database/repair', '0', '修复数据表', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('90', '还原数据库', '68', '8', 'admin/database/imports', '1', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('91', '恢复', '90', '0', 'Database/import', '0', '数据库恢复', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('92', '删除', '90', '0', 'Database/del', '0', '删除备份文件', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('93', '其他', '0', '5', 'other', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('96', '新增', '75', '0', 'Menu/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('98', '编辑', '75', '0', 'Menu/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('106', '行为日志', '16', '4', 'admin/action/actionlog', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('108', '修改密码', '16', '0', 'User/updatePassword', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('109', '修改昵称', '16', '0', 'User/updateNickname', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('110', '查看行为日志', '106', '0', 'action/edit', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('112', '新增数据', '58', '0', 'think/add', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('113', '编辑数据', '58', '0', 'think/edit', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('114', '导入', '75', '0', 'Menu/import', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('115', '生成', '58', '0', 'Model/generate', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('116', '新增钩子', '57', '0', 'Addons/addHook', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('117', '编辑钩子', '57', '0', 'Addons/edithook', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('118', '文档排序', '3', '0', 'Article/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('119', '排序', '70', '0', 'Config/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('120', '排序', '75', '0', 'Menu/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('121', '排序', '76', '0', 'Channel/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('122', '数据列表', '58', '0', 'think/lists', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('123', '审核列表', '3', '0', 'Article/examine', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('126', '内容管理', '2', '0', 'wenz/mang', '0', '12152', '1', '0', '1');

-- ----------------------------
-- Table structure for cmswing_model
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_model`;
CREATE TABLE `cmswing_model` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '模型ID',
  `name` char(30) NOT NULL DEFAULT '' COMMENT '模型标识',
  `title` char(30) NOT NULL DEFAULT '' COMMENT '模型名称',
  `extend` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '继承的模型',
  `relation` varchar(30) NOT NULL DEFAULT '' COMMENT '继承与被继承模型的关联字段',
  `need_pk` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '新建表时是否需要主键字段',
  `field_sort` text COMMENT '表单字段排序',
  `field_group` varchar(255) NOT NULL DEFAULT '1:基础' COMMENT '字段分组',
  `attribute_list` text COMMENT '属性列表（表的字段）',
  `attribute_alias` varchar(255) NOT NULL DEFAULT '' COMMENT '属性别名定义',
  `template_list` varchar(100) NOT NULL DEFAULT '' COMMENT '列表模板',
  `template_add` varchar(100) NOT NULL DEFAULT '' COMMENT '新增模板',
  `template_edit` varchar(100) NOT NULL DEFAULT '' COMMENT '编辑模板',
  `list_grid` text COMMENT '列表定义',
  `list_row` smallint(2) unsigned NOT NULL DEFAULT '10' COMMENT '列表数据长度',
  `search_key` varchar(50) NOT NULL DEFAULT '' COMMENT '默认搜索字段',
  `search_list` varchar(255) NOT NULL DEFAULT '' COMMENT '高级搜索的字段',
  `create_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(15) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `engine_type` varchar(25) NOT NULL DEFAULT 'MyISAM' COMMENT '数据库引擎',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='文档模型表';

-- ----------------------------
-- Records of cmswing_model
-- ----------------------------
INSERT INTO `cmswing_model` VALUES ('1', 'document', '基础文档', '0', '', '1', '{\"1\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"]}', '1:基础', '', '', '', '', '', 'id:编号\r\ntitle:标题:[EDIT]\r\ntype:类型\r\nupdate_time:最后更新\r\nstatus:状态\r\nview:浏览\r\nid:操作:[EDIT]|编辑,[DELETE]|删除', '0', '', '', '1449340764453', '1384507827', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('2', 'article', '文章', '1', '', '1', '{\"1\":[\"3\",\"24\",\"2\",\"5\"],\"2\":[\"9\",\"13\",\"19\",\"10\",\"12\",\"16\",\"17\",\"26\",\"20\",\"14\",\"11\",\"25\"]}', '1:基础,2:扩展', '', '', '', '', '', '', '0', '', '', '1449340764453', '1387260622', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('3', 'download', '下载', '1', '', '1', '{\"1\":[\"3\",\"28\",\"30\",\"32\",\"2\",\"5\",\"31\"],\"2\":[\"13\",\"10\",\"27\",\"9\",\"12\",\"16\",\"17\",\"19\",\"11\",\"20\",\"14\",\"29\"]}', '1:基础,2:扩展', '', '', '', '', '', '', '0', '', '', '1449340764453', '1387260449', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('5', 'arterli', '测试模型', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '0', '0', '0', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('6', 'abcs', '222', '1', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449491907904', '1449491907905', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('12', '111', '222', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449493887353', '1449493887353', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('13', '111', '222', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449493925446', '1449493925446', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('14', '1111', '1111', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449494039079', '1449494039079', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('15', '1111', '2222', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449494083198', '1449494083198', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('16', '1111', '2222', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449494104781', '1449494104781', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('17', '1111', '2222', '0', '', '1', null, '1:基础', null, '', '', '', '', null, '10', '', '', '1449494265830', '1449494265830', '1', 'MyISAM');

-- ----------------------------
-- Table structure for cmswing_session
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_session`;
CREATE TABLE `cmswing_session` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cookie` varchar(255) NOT NULL DEFAULT '',
  `data` text,
  `expire` bigint(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cookie` (`cookie`),
  KEY `expire` (`expire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_session
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_setup
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_setup`;
CREATE TABLE `cmswing_setup` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '配置名称',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '配置类型',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '配置说明',
  `group` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '配置分组',
  `extra` varchar(255) NOT NULL DEFAULT '' COMMENT '配置值',
  `remark` varchar(100) NOT NULL DEFAULT '' COMMENT '配置说明',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `value` text COMMENT '配置值',
  `sort` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`),
  KEY `type` (`type`),
  KEY `group` (`group`)
) ENGINE=MyISAM AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_setup
-- ----------------------------
INSERT INTO `cmswing_setup` VALUES ('1', 'WEB_SITE_TITLE', '1', '网站标题', '1', '', '网站标题前台显示标题', '4294967295', '1379235274', '1', 'CmsWing内容管理框架', '0');
INSERT INTO `cmswing_setup` VALUES ('2', 'WEB_SITE_DESCRIPTION', '2', '网站描述', '1', '', '网站搜索引擎描述', '1378898976', '1379235841', '1', 'CmsWing内容管理框架', '1');
INSERT INTO `cmswing_setup` VALUES ('3', 'WEB_SITE_KEYWORD', '2', '网站关键字', '1', '', '网站搜索引擎关键字', '1378898976', '1381390100', '1', 'nodej,comswing,内容管理框架,thinkjs', '8');
INSERT INTO `cmswing_setup` VALUES ('4', 'WEB_SITE_CLOSE', '4', '关闭站点', '1', '0:关闭,1:开启', '站点关闭后其他用户不能访问，管理员可以正常访问', '1378898976', '1379235296', '1', '1', '1');
INSERT INTO `cmswing_setup` VALUES ('9', 'CONFIG_TYPE_LIST', '3', '配置类型列表', '4', '', '主要用于数据解析和页面表单的生成', '1378898976', '1379235348', '1', '0:数字\r\n1:字符\r\n2:文本\r\n3:数组\r\n4:枚举', '2');
INSERT INTO `cmswing_setup` VALUES ('10', 'WEB_SITE_ICP', '1', '网站备案号', '1', '', '设置在网站底部显示的备案号，如“沪ICP备12007941号-2', '1378900335', '1379235859', '1', '', '9');
INSERT INTO `cmswing_setup` VALUES ('11', 'DOCUMENT_POSITION', '3', '文档推荐位', '2', '', '文档推荐位，推荐到多个位置KEY值相加即可', '1379053380', '1379235329', '1', '1:列表推荐\r\n2:频道推荐\r\n4:首页推荐', '3');
INSERT INTO `cmswing_setup` VALUES ('12', 'DOCUMENT_DISPLAY', '3', '文档可见性', '2', '', '文章可见性仅影响前台显示，后台不收影响', '1379056370', '1379235322', '1', '0:所有人可见\r\n1:仅注册会员可见\r\n2:仅管理员可见', '4');
INSERT INTO `cmswing_setup` VALUES ('13', 'COLOR_STYLE', '4', '后台色系', '1', 'default_color:默认\r\nblue_color:紫罗兰', '后台颜色风格', '1379122533', '1379235904', '1', 'default_color', '10');
INSERT INTO `cmswing_setup` VALUES ('20', 'CONFIG_GROUP_LIST', '3', '配置分组', '4', '', '配置分组', '1379228036', '1384418383', '1', '1:基本\r\n2:内容\r\n3:用户\r\n4:系统', '4');
INSERT INTO `cmswing_setup` VALUES ('21', 'HOOKS_TYPE', '3', '钩子的类型', '4', '', '类型 1-用于扩展显示内容，2-用于扩展业务处理', '1379313397', '1379313407', '1', '1:视图\r\n2:控制器', '6');
INSERT INTO `cmswing_setup` VALUES ('22', 'AUTH_CONFIG', '3', 'Auth配置', '4', '', '自定义Auth.class.php类配置', '1379409310', '1379409564', '1', 'AUTH_ON:1\r\nAUTH_TYPE:2', '8');
INSERT INTO `cmswing_setup` VALUES ('23', 'OPEN_DRAFTBOX', '4', '是否开启草稿功能', '2', '0:关闭草稿功能\r\n1:开启草稿功能\r\n', '新增文章时的草稿功能配置', '1379484332', '1379484591', '1', '1', '1');
INSERT INTO `cmswing_setup` VALUES ('24', 'DRAFT_AOTOSAVE_INTERVAL', '0', '自动保存草稿时间', '2', '', '自动保存草稿的时间间隔，单位：秒', '1379484574', '1386143323', '1', '60', '2');
INSERT INTO `cmswing_setup` VALUES ('25', 'LIST_ROWS', '0', '后台每页记录数', '2', '', '后台数据每页显示记录数', '1379503896', '1380427745', '1', '10', '10');
INSERT INTO `cmswing_setup` VALUES ('26', 'USER_ALLOW_REGISTER', '4', '是否允许用户注册', '3', '0:关闭注册\r\n1:允许注册', '是否开放用户注册', '1379504487', '1379504580', '1', '1', '3');
INSERT INTO `cmswing_setup` VALUES ('27', 'CODEMIRROR_THEME', '4', '预览插件的CodeMirror主题', '4', '3024-day:3024 day\r\n3024-night:3024 night\r\nambiance:ambiance\r\nbase16-dark:base16 dark\r\nbase16-light:base16 light\r\nblackboard:blackboard\r\ncobalt:cobalt\r\neclipse:eclipse\r\nelegant:elegant\r\nerlang-dark:erlang-dark\r\nlesser-dark:lesser-dark\r\nmidnight:midnight', '详情见CodeMirror官网', '1379814385', '1384740813', '1', 'ambiance', '3');
INSERT INTO `cmswing_setup` VALUES ('28', 'DATA_BACKUP_PATH', '1', '数据库备份根路径', '4', '', '路径必须以 / 结尾', '1381482411', '1381482411', '1', './Data/', '5');
INSERT INTO `cmswing_setup` VALUES ('29', 'DATA_BACKUP_PART_SIZE', '0', '数据库备份卷大小', '4', '', '该值用于限制压缩后的分卷最大长度。单位：B；建议设置20M', '1381482488', '1381729564', '1', '20971520', '7');
INSERT INTO `cmswing_setup` VALUES ('30', 'DATA_BACKUP_COMPRESS', '4', '数据库备份文件是否启用压缩', '4', '0:不压缩\r\n1:启用压缩', '压缩备份文件需要PHP环境支持gzopen,gzwrite函数', '1381713345', '1381729544', '1', '1', '9');
INSERT INTO `cmswing_setup` VALUES ('31', 'DATA_BACKUP_COMPRESS_LEVEL', '4', '数据库备份文件压缩级别', '4', '1:普通\r\n4:一般\r\n9:最高', '数据库备份文件的压缩级别，该配置在开启压缩时生效', '1381713408', '1381713408', '1', '9', '10');
INSERT INTO `cmswing_setup` VALUES ('32', 'DEVELOP_MODE', '4', '开启开发者模式', '4', '0:关闭\r\n1:开启', '是否开启开发者模式', '1383105995', '1383291877', '1', '1', '11');
INSERT INTO `cmswing_setup` VALUES ('33', 'ALLOW_VISIT', '3', '不受限控制器方法', '0', '', '', '1386644047', '1386644741', '1', '0:article/draftbox\r\n1:article/mydocument\r\n2:Category/tree\r\n3:Index/verify\r\n4:file/upload\r\n5:file/download\r\n6:user/updatePassword\r\n7:user/updateNickname\r\n8:user/submitPassword\r\n9:user/submitNickname\r\n10:file/uploadpicture', '0');
INSERT INTO `cmswing_setup` VALUES ('34', 'DENY_VISIT', '3', '超管专限控制器方法', '0', '', '仅超级管理员可访问的控制器方法', '1386644141', '1386644659', '1', '0:Addons/addhook\r\n1:Addons/edithook\r\n2:Addons/delhook\r\n3:Addons/updateHook\r\n4:Admin/getMenus\r\n5:Admin/recordList\r\n6:AuthManager/updateRules\r\n7:AuthManager/tree', '0');
INSERT INTO `cmswing_setup` VALUES ('35', 'REPLY_LIST_ROWS', '0', '回复列表每页条数', '2', '', '', '1386645376', '1387178083', '1', '10', '0');
INSERT INTO `cmswing_setup` VALUES ('36', 'ADMIN_ALLOW_IP', '2', '后台允许访问IP', '4', '', '多个用逗号分隔，如果不配置表示不限制IP访问', '1387165454', '1387165553', '1', '', '12');
INSERT INTO `cmswing_setup` VALUES ('37', 'SHOW_PAGE_TRACE', '4', '是否显示页面Trace', '4', '0:关闭\r\n1:开启', '是否显示页面Trace信息', '1387165685', '1387165685', '1', '0', '1');
INSERT INTO `cmswing_setup` VALUES ('56', 'MENU_GROUP', '3', '后台菜单分组', '4', '', '后台菜单分组，左侧栏显示', '4294967295', '4294967295', '1', '0:不分组\r\n1:内容\r\n3:系统\r\n99:微信', '33');

-- ----------------------------
-- Table structure for onethink_document
-- ----------------------------
DROP TABLE IF EXISTS `onethink_document`;
CREATE TABLE `onethink_document` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文档ID',
  `uid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `name` char(40) NOT NULL DEFAULT '' COMMENT '标识',
  `title` char(80) NOT NULL DEFAULT '' COMMENT '标题',
  `category_id` int(10) unsigned NOT NULL COMMENT '所属分类',
  `group_id` smallint(3) unsigned NOT NULL COMMENT '所属分组',
  `description` char(140) NOT NULL DEFAULT '' COMMENT '描述',
  `root` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '根节点',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属ID',
  `model_id` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容模型ID',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '2' COMMENT '内容类型',
  `position` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '推荐位',
  `link_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '外链',
  `cover_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '封面',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '可见性',
  `deadline` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '截至时间',
  `attach` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '附件数量',
  `view` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '浏览量',
  `comment` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评论数',
  `extend` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '扩展统计字段',
  `level` int(10) NOT NULL DEFAULT '0' COMMENT '优先级',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  PRIMARY KEY (`id`),
  KEY `idx_category_status` (`category_id`,`status`),
  KEY `idx_status_type_pid` (`status`,`uid`,`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='文档模型基础表';

-- ----------------------------
-- Records of onethink_document
-- ----------------------------
INSERT INTO `onethink_document` VALUES ('1', '1', '', 'OneThink1.1开发版发布', '2', '0', '期待已久的OneThink最新版发布', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '8', '0', '0', '0', '1406001413', '1406001413', '1');
