-- -----------------------------
-- CmsWing MySQL Data Transfer 
-- 
-- Host     : 127.0.0.1
-- Port     : 
-- Database : 
-- 
-- Part : #1
-- Date : 2016-01-14 16:24:52
-- -----------------------------

SET FOREIGN_KEY_CHECKS = 0;


-- -----------------------------
-- Table structure for `cmswing_action`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_action`;
CREATE TABLE `cmswing_action` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` char(30) NOT NULL DEFAULT '' COMMENT '行为唯一标识',
  `title` char(80) NOT NULL DEFAULT '' COMMENT '行为说明',
  `remark` char(140) NOT NULL DEFAULT '' COMMENT '行为描述',
  `rule` text COMMENT '行为规则',
  `log` text COMMENT '日志规则',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '类型',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统行为表';

-- -----------------------------
-- Records of `cmswing_action`
-- -----------------------------
INSERT INTO `cmswing_action` VALUES ('1', 'user_login', '用户登录', '积分+10，每天一次', 'table:member|field:score|condition:id=${self} AND status>-1|rule:10|cycle:24|max:1;', '[user|get_nickname]在[time|time_format]登录了后台', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('2', 'add_article', '发布文章', '积分+5，每天上限5次', 'table:member|field:score|condition:id=${self}|rule:5|cycle:24|max:5', '', '2', '0', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('3', 'review', '评论', '评论积分+1，无限制', 'table:member|field:score|condition:id=${self}|rule:1', '', '2', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('4', 'add_document', '发表文档', '积分+10，每天上限5次', 'table:member|field:score|condition:id=${self}|rule:10|cycle:24|max:5', '[user|get_nickname]在[time|time_format]发表了一篇文章。
表[model]，记录编号[record]。', '2', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('5', 'add_document_topic', '发表讨论', '积分+5，每天上限10次', 'table:member|field:score|condition:id=${self}|rule:5|cycle:24|max:10', '', '2', '0', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('6', 'update_config', '更新配置', '新增或修改或删除配置', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('7', 'update_model', '更新模型', '新增或修改模型', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('8', 'update_attribute', '更新属性', '新增或更新或删除属性', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('9', 'update_channel', '更新导航', '新增或修改或删除导航', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('10', 'update_menu', '更新菜单', '新增或修改或删除菜单', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('11', 'update_category', '更新分类', '新增或修改或删除分类', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('13', 'testaction', '测试行为日志', '积分+10，每天一次1111', 'table:member|field:score|condition:id=${self} AND status>-1|rule:10|cycle:24|max:1;', '[user|get_nickname]在[time|time_format]测试了日志[model]和[record]和[data]', '2', '1', '1452594160564');

-- -----------------------------
-- Table structure for `cmswing_action_log`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_action_log`;
CREATE TABLE `cmswing_action_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `action_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '行为id',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '执行用户id',
  `action_ip` bigint(20) NOT NULL COMMENT '执行行为者ip',
  `model` varchar(50) NOT NULL DEFAULT '' COMMENT '触发行为的表',
  `record_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '触发行为的数据id',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '日志备注',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '执行行为的时间',
  PRIMARY KEY (`id`),
  KEY `action_ip_ix` (`action_ip`),
  KEY `action_id_ix` (`action_id`),
  KEY `user_id_ix` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED COMMENT='行为日志表';

-- -----------------------------
-- Records of `cmswing_action_log`
-- -----------------------------
INSERT INTO `cmswing_action_log` VALUES ('28', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-12 18:58:38测试了日志member和1和[object Object]', '1', '1452596318078');
INSERT INTO `cmswing_action_log` VALUES ('29', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-12 19:06:19测试了日志member和1和[object Object]', '1', '1452596779737');
INSERT INTO `cmswing_action_log` VALUES ('30', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-12 19:22:01测试了日志member和1和[object Object]', '1', '1452597721474');
INSERT INTO `cmswing_action_log` VALUES ('31', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-12 19:22:03测试了日志member和1和[object Object]', '1', '1452597723317');
INSERT INTO `cmswing_action_log` VALUES ('32', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-12 19:22:04测试了日志member和1和[object Object]', '1', '1452597724742');
INSERT INTO `cmswing_action_log` VALUES ('33', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-13 11:54:43测试了日志member和1和[object Object]', '1', '1452657283187');
INSERT INTO `cmswing_action_log` VALUES ('34', '1', '1', '2130706433', 'member', '1', 'admin在2016-01-13 11:54:50登录了后台', '1', '1452657290591');
INSERT INTO `cmswing_action_log` VALUES ('35', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-13 11:54:50测试了日志member和1和[object Object]', '1', '1452657290624');
INSERT INTO `cmswing_action_log` VALUES ('36', '4', '1', '2130706433', 'document', '13', 'admin在2016-01-13 19:18:40发表了一篇文章。
表document，记录编号13。', '1', '1452683920418');
INSERT INTO `cmswing_action_log` VALUES ('37', '4', '1', '2130706433', 'document', '17', 'admin在2016-01-13 19:34:21发表了一篇文章。
表document，记录编号17。', '1', '1452684861360');
INSERT INTO `cmswing_action_log` VALUES ('38', '4', '1', '2130706433', 'document', '18', 'admin在2016-01-13 19:53:22发表了一篇文章。
表document，记录编号18。', '1', '1452686002598');
INSERT INTO `cmswing_action_log` VALUES ('39', '4', '1', '2130706433', 'document', '19', 'admin在2016-01-13 20:09:20发表了一篇文章。
表document，记录编号19。', '1', '1452686960510');
INSERT INTO `cmswing_action_log` VALUES ('40', '4', '1', '2130706433', 'document', '20', 'admin在2016-01-13 20:10:01发表了一篇文章。
表document，记录编号20。', '1', '1452687001413');
INSERT INTO `cmswing_action_log` VALUES ('41', '4', '1', '2130706433', 'document', '21', 'admin在2016-01-13 20:21:07发表了一篇文章。
表document，记录编号21。', '1', '1452687667917');
INSERT INTO `cmswing_action_log` VALUES ('42', '4', '1', '2130706433', 'document', '22', 'admin在2016-01-13 20:21:44发表了一篇文章。
表document，记录编号22。', '1', '1452687704526');
INSERT INTO `cmswing_action_log` VALUES ('43', '4', '1', '2130706433', 'document', '23', 'admin在2016-01-13 20:25:16发表了一篇文章。
表document，记录编号23。', '1', '1452687916949');
INSERT INTO `cmswing_action_log` VALUES ('44', '4', '1', '2130706433', 'document', '24', 'admin在2016-01-13 20:27:12发表了一篇文章。
表document，记录编号24。', '1', '1452688032213');
INSERT INTO `cmswing_action_log` VALUES ('45', '4', '1', '2130706433', 'document', '25', 'admin在2016-01-13 20:57:27发表了一篇文章。
表document，记录编号25。', '1', '1452689847742');
INSERT INTO `cmswing_action_log` VALUES ('46', '4', '1', '2130706433', 'document', '26', 'admin在2016-01-13 20:58:14发表了一篇文章。
表document，记录编号26。', '1', '1452689894287');
INSERT INTO `cmswing_action_log` VALUES ('47', '4', '1', '2130706433', 'document', '27', 'admin在2016-01-13 20:58:40发表了一篇文章。
表document，记录编号27。', '1', '1452689920395');
INSERT INTO `cmswing_action_log` VALUES ('48', '4', '1', '2130706433', 'document', '28', 'admin在2016-01-13 20:59:27发表了一篇文章。
表document，记录编号28。', '1', '1452689967672');
INSERT INTO `cmswing_action_log` VALUES ('49', '4', '1', '2130706433', 'document', '29', 'admin在2016-01-13 21:03:58发表了一篇文章。
表document，记录编号29。', '1', '1452690238140');
INSERT INTO `cmswing_action_log` VALUES ('50', '4', '1', '2130706433', 'document', '30', 'admin在2016-01-13 21:08:38发表了一篇文章。
表document，记录编号30。', '1', '1452690518668');
INSERT INTO `cmswing_action_log` VALUES ('51', '4', '1', '2130706433', 'document', '31', 'admin在2016-01-13 21:09:32发表了一篇文章。
表document，记录编号31。', '1', '1452690572982');
INSERT INTO `cmswing_action_log` VALUES ('52', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-13 21:14:37测试了日志member和1和[object Object]', '1', '1452690877033');
INSERT INTO `cmswing_action_log` VALUES ('53', '1', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:13:05登录了后台', '1', '1452748385029');
INSERT INTO `cmswing_action_log` VALUES ('54', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:13:05测试了日志member和1和[object Object]', '1', '1452748385277');
INSERT INTO `cmswing_action_log` VALUES ('55', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:26:31测试了日志member和1和[object Object]', '1', '1452749191872');
INSERT INTO `cmswing_action_log` VALUES ('56', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:35:02测试了日志member和1和[object Object]', '1', '1452749702299');
INSERT INTO `cmswing_action_log` VALUES ('57', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:47:25测试了日志member和1和[object Object]', '1', '1452750445227');
INSERT INTO `cmswing_action_log` VALUES ('58', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:48:21测试了日志member和1和[object Object]', '1', '1452750501186');
INSERT INTO `cmswing_action_log` VALUES ('59', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:53:55测试了日志member和1和[object Object]', '1', '1452750835589');
INSERT INTO `cmswing_action_log` VALUES ('60', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:54:28测试了日志member和1和[object Object]', '1', '1452750868312');
INSERT INTO `cmswing_action_log` VALUES ('61', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:54:40测试了日志member和1和[object Object]', '1', '1452750880380');
INSERT INTO `cmswing_action_log` VALUES ('62', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:55:09测试了日志member和1和[object Object]', '1', '1452750909043');
INSERT INTO `cmswing_action_log` VALUES ('63', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:55:19测试了日志member和1和[object Object]', '1', '1452750919913');
INSERT INTO `cmswing_action_log` VALUES ('64', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:56:22测试了日志member和1和[object Object]', '1', '1452750982701');
INSERT INTO `cmswing_action_log` VALUES ('65', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 13:56:29测试了日志member和1和[object Object]', '1', '1452750989515');
INSERT INTO `cmswing_action_log` VALUES ('66', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:05:31测试了日志member和1和[object Object]', '1', '1452751531607');
INSERT INTO `cmswing_action_log` VALUES ('67', '1', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:05:37登录了后台', '1', '1452751537475');
INSERT INTO `cmswing_action_log` VALUES ('68', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:05:37测试了日志member和1和[object Object]', '1', '1452751537503');
INSERT INTO `cmswing_action_log` VALUES ('69', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:08:23测试了日志member和1和[object Object]', '1', '1452751703510');
INSERT INTO `cmswing_action_log` VALUES ('70', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:41:19测试了日志member和1和[object Object]', '1', '1452753679362');
INSERT INTO `cmswing_action_log` VALUES ('71', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:41:21测试了日志member和1和[object Object]', '1', '1452753681458');
INSERT INTO `cmswing_action_log` VALUES ('72', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:42:00测试了日志member和1和[object Object]', '1', '1452753720288');
INSERT INTO `cmswing_action_log` VALUES ('73', '1', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:42:05登录了后台', '1', '1452753725532');
INSERT INTO `cmswing_action_log` VALUES ('74', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:42:05测试了日志member和1和[object Object]', '1', '1452753725596');
INSERT INTO `cmswing_action_log` VALUES ('75', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:42:48测试了日志member和1和[object Object]', '1', '1452753768223');
INSERT INTO `cmswing_action_log` VALUES ('76', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:46:21测试了日志member和1和[object Object]', '1', '1452753981878');
INSERT INTO `cmswing_action_log` VALUES ('77', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:47:34测试了日志member和1和[object Object]', '1', '1452754054256');
INSERT INTO `cmswing_action_log` VALUES ('78', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:53:53测试了日志member和1和[object Object]', '1', '1452754433856');
INSERT INTO `cmswing_action_log` VALUES ('79', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 14:54:38测试了日志member和1和[object Object]', '1', '1452754478340');
INSERT INTO `cmswing_action_log` VALUES ('80', '13', '1', '2130706433', 'member', '1', 'admin在2016-01-14 15:14:49测试了日志member和1和[object Object]', '1', '1452755689130');
INSERT INTO `cmswing_action_log` VALUES ('81', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:18:49测试了日志member和1和[object Object]', '1', '1452755929962');
INSERT INTO `cmswing_action_log` VALUES ('82', '1', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:51:16登录了后台', '1', '1452757876566');
INSERT INTO `cmswing_action_log` VALUES ('83', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:52:00测试了日志member和1和[object Object]', '1', '1452757920950');
INSERT INTO `cmswing_action_log` VALUES ('84', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:52:03测试了日志member和1和[object Object]', '1', '1452757923007');
INSERT INTO `cmswing_action_log` VALUES ('85', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:52:03测试了日志member和1和[object Object]', '1', '1452757923940');
INSERT INTO `cmswing_action_log` VALUES ('86', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:55:22测试了日志member和1和[object Object]', '1', '1452758122746');
INSERT INTO `cmswing_action_log` VALUES ('87', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:56:48测试了日志member和1和[object Object]', '1', '1452758208495');
INSERT INTO `cmswing_action_log` VALUES ('88', '1', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:57:24登录了后台', '1', '1452758244667');
INSERT INTO `cmswing_action_log` VALUES ('89', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:57:24测试了日志member和1和[object Object]', '1', '1452758244727');
INSERT INTO `cmswing_action_log` VALUES ('90', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:57:58测试了日志member和1和[object Object]', '1', '1452758278622');
INSERT INTO `cmswing_action_log` VALUES ('91', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:59:32测试了日志member和1和[object Object]', '1', '1452758372013');
INSERT INTO `cmswing_action_log` VALUES ('92', '1', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:59:36登录了后台', '1', '1452758376852');
INSERT INTO `cmswing_action_log` VALUES ('93', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:59:36测试了日志member和1和[object Object]', '1', '1452758376884');
INSERT INTO `cmswing_action_log` VALUES ('94', '13', '1', '2130706433', 'member', '1', '[object Generator]在2016-01-14 15:59:47测试了日志member和1和[object Object]', '1', '1452758387258');

-- -----------------------------
-- Table structure for `cmswing_attribute`
-- -----------------------------
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
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `validate_rule` varchar(255) NOT NULL DEFAULT '',
  `validate_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `error_info` varchar(100) NOT NULL DEFAULT '',
  `validate_type` varchar(25) NOT NULL DEFAULT '',
  `auto_rule` varchar(100) NOT NULL DEFAULT '',
  `auto_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `auto_type` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `model_id` (`model_id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COMMENT='模型属性表';

-- -----------------------------
-- Records of `cmswing_attribute`
-- -----------------------------
INSERT INTO `cmswing_attribute` VALUES ('1', 'uid', '用户ID', 'int(10) unsigned NOT NULL ', 'num', '0', '', '0', '', '1', '0', '1', '1384508362', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('2', 'name', '标识', 'char(40) NOT NULL ', 'string', '', '同一根节点下标识不重复', '1', '', '1', '0', '1', '1383894743', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('3', 'title', '标题', 'char(80) NOT NULL ', 'string', '', '文档标题', '1', '', '1', '0', '1', '1383894778', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('4', 'category_id', '所属分类', 'int(10) unsigned NOT NULL ', 'string', '', '', '0', '', '1', '0', '1', '1384508336', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('5', 'description', '描述', 'char(140) NOT NULL ', 'textarea', '', '', '1', '', '1', '0', '1', '1383894927', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('6', 'root', '根节点', 'int(10) unsigned NOT NULL ', 'num', '0', '该文档的顶级文档编号', '0', '', '1', '0', '1', '1384508323', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('7', 'pid', '所属ID', 'int(10) unsigned NOT NULL ', 'num', '0', '父文档编号', '0', '', '1', '0', '1', '1384508543', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('8', 'model_id', '内容模型ID', 'tinyint(3) unsigned NOT NULL ', 'num', '0', '该文档所对应的模型', '0', '', '1', '0', '1', '1384508350', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('9', 'type', '内容类型', 'tinyint(3) unsigned NOT NULL ', 'select', '2', '', '1', '1:目录
2:主题
3:段落', '1', '0', '1', '1384511157', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('10', 'position', '推荐位', 'smallint(5) unsigned NOT NULL ', 'checkbox', '0', '多个推荐则将其推荐值相加', '1', '1:列表推荐
2:频道推荐
4:首页推荐', '1', '0', '1', '1451019960368', '1383891233', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('11', 'link_id', '外链', 'int(10) unsigned NOT NULL ', 'num', '0', '0-非外链，大于0-外链ID,需要函数进行链接与编号的转换', '1', '', '1', '0', '1', '1383895757', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('12', 'cover_id', '封面', 'int(10) unsigned NOT NULL ', 'picture', '0', '0-无封面，大于0-封面图片ID，需要函数处理', '1', '', '1', '0', '1', '1384147827', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('13', 'display', '可见性', 'tinyint(3) unsigned NOT NULL ', 'radio', '1', '', '1', '0:不可见
1:所有人可见', '1', '0', '1', '1386662271', '1383891233', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('14', 'deadline', '截至时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '0-永久有效', '1', '', '1', '0', '1', '1387163248', '1383891233', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('15', 'attach', '附件数量', 'tinyint(3) unsigned NOT NULL ', 'num', '0', '', '0', '', '1', '0', '1', '1387260355', '1383891233', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('16', 'view', '浏览量', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '1', '0', '1', '1383895835', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('17', 'comment', '评论数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '1', '0', '1', '1383895846', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('18', 'extend', '扩展统计字段', 'int(10) unsigned NOT NULL ', 'num', '0', '根据需求自行使用', '0', '', '1', '0', '1', '1384508264', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('19', 'level', '优先级', 'int(10) unsigned NOT NULL ', 'num', '0', '越高排序越靠前', '1', '', '1', '0', '1', '1383895894', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('20', 'create_time', '创建时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '', '1', '', '1', '0', '1', '1383895903', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('21', 'update_time', '更新时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '', '0', '', '1', '0', '1', '1384508277', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('22', 'status', '数据状态', 'tinyint(4) NOT NULL ', 'radio', '0', '', '0', '-1:删除
0:禁用
1:正常
2:待审核
3:草稿', '1', '0', '1', '1384508496', '1383891233', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('23', 'parse', '内容解析类型', 'tinyint(3) unsigned NOT NULL ', 'select', '0', '', '0', '0:html
1:ubb
2:markdown', '2', '0', '1', '1384511049', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('24', 'content', '文章内容', 'text NOT NULL ', 'editor', '', '', '1', '', '2', '0', '1', '1383896225', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('25', 'template', '详情页显示模板', 'varchar(100) NOT NULL ', 'string', '', '参照display方法参数的定义', '1', '', '2', '0', '1', '1383896190', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('26', 'bookmark', '收藏数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '2', '0', '1', '1383896103', '1383891243', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('27', 'parse', '内容解析类型', 'tinyint(3) unsigned NOT NULL ', 'select', '0', '', '0', '0:html
1:ubb
2:markdown', '3', '0', '1', '1387260461', '1383891252', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('28', 'content', '下载详细描述', 'text NOT NULL ', 'editor', '', '', '1', '', '3', '0', '1', '1383896438', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('29', 'template', '详情页显示模板', 'varchar(100) NOT NULL ', 'string', '', '', '1', '', '3', '0', '1', '1383896429', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('30', 'file_id', '文件ID', 'int(10) unsigned NOT NULL ', 'file', '0', '需要函数处理', '1', '', '3', '0', '1', '1383896415', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('31', 'download', '下载次数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '3', '0', '1', '1383896380', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('32', 'size', '文件大小', 'bigint(20) unsigned NOT NULL ', 'num', '0', '单位bit', '1', '', '3', '0', '1', '1383896371', '1383891252', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('33', 'title', '标题', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '38', '0', '1', '1449654579', '1449654579', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('34', 'user', 'user', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '38', '0', '1', '1449654738', '1449654738', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('43', 'testtext', '测试文本框', 'text NOT NULL', 'textarea', '', '', '1', '', '40', '0', '1', '0', '4294967295', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('37', 'aaaaa', '测试', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '38', '0', '0', '0', '0', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('44', 'testvarchar', '测试字符串', 'varchar(255) NOT NULL', 'string', '测试字符串默认值', '', '1', '', '40', '0', '1', '0', '4294967295', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('40', 'username', '用户名称', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '39', '0', '1', '0', '4294967295', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('45', 'testdate', '测试日期', 'bigint(13) NOT NULL', 'date', '', '', '1', '', '40', '0', '1', '0', '1450412511553', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('46', 'testnun', '测试数字', 'int(10) UNSIGNED NOT NULL', 'num', '', '', '1', '', '40', '0', '1', '0', '1450412574764', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('47', 'testbool', '测试布尔', 'tinyint(2) NOT NULL', 'bool', '1', '', '1', '1:是
2:否', '40', '0', '1', '0', '1450412802959', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('48', 'testpicture', '测试上传图片', 'int(10) UNSIGNED NOT NULL', 'picture', '', '', '1', '', '40', '0', '1', '0', '1450416534420', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('49', 'testfile', '测试上传附件', 'int(10) UNSIGNED NOT NULL', 'file', '', '', '1', '', '40', '0', '1', '0', '1450416616549', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('50', 'title', '文章标题', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '41', '0', '1', '0', '1450534650444', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('51', 'picurl', '上传图片', 'int(10) UNSIGNED NOT NULL', 'picture', '', '', '1', '', '43', '0', '1', '0', '1451110019548', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('53', 'testeidtor', '测试编辑器', 'text NOT NULL', 'editor', '', '', '1', '', '2', '0', '1', '0', '1451394866041', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('58', 'uppic', '图片上传', 'int(10) UNSIGNED NOT NULL', 'picture', '', '', '1', '', '44', '0', '1', '0', '1451878043164', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('60', 'picinfo', '图片说明', 'text NOT NULL', 'textarea', '', '', '1', '', '44', '0', '1', '0', '1451878215891', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('61', 'bbq', '编辑器', 'text NOT NULL', 'editor', '', '', '1', '', '44', '0', '1', '0', '1451878885909', '', '3', '', 'regex', '', '3', 'function');

-- -----------------------------
-- Table structure for `cmswing_auth_role`
-- -----------------------------
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

-- -----------------------------
-- Records of `cmswing_auth_role`
-- -----------------------------
INSERT INTO `cmswing_auth_role` VALUES ('1', '规则', '分身55111', '1', '10,12,13', 'admin', '1');
INSERT INTO `cmswing_auth_role` VALUES ('2', '测试用户组', '', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_role` VALUES ('19', '版主', '2222', '1', '2', 'admin', '1');

-- -----------------------------
-- Table structure for `cmswing_auth_rule`
-- -----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `cmswing_auth_rule`
-- -----------------------------
INSERT INTO `cmswing_auth_rule` VALUES ('1', 'article/index', '文档列表', '0', '-1', '', 'admin', '1');
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
INSERT INTO `cmswing_auth_rule` VALUES ('53', 'Attribute/index', '属性管理', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('54', 'Attribute/add', '新增', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('55', 'Attribute/edit', '编辑', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('56', 'Attribute/setStatus', '改变状态', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('57', 'Attribute/update', '保存数据', '0', '-1', '', 'admin', '1');
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
INSERT INTO `cmswing_auth_rule` VALUES ('92', 'wenz/mang', '其他', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('93', 'admin/index/index', '首页', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('94', 'admin/user/index', '用户信息', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('95', 'Addons/index', '插件管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('96', 'admin/setup/index', '网站设置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('97', 'Article/index', '网站内容', '0', '-1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('98', 'admin/auth/index', '权限管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('99', 'Addons/hooks', '钩子管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('100', 'admin/category/index', '分类管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('101', 'user', '用户管理', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('102', 'admin/user/action', '用户行为', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('103', 'admin/model/index', '模型管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('104', 'setup', '系统设置', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('105', 'admin/setup/group', '配置管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('106', 'admin/action/actionlog', '行为日志', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('107', 'admin/menu/index', '菜单管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('108', 'other', '其他', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('109', 'admin/channel/index', '导航管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('110', 'Addons/index', '扩展', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('111', 'admin/database/index', '备份数据库', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('112', 'admin/database/imports', '还原数据库', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('113', 'admin/attribute/index', '属性管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('114', 'admin/attribute/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('115', 'admin/attribute/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('116', 'admin/attribute/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('117', 'admin/attribute/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('118', 'admin/article/index', '内容管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('119', 'article', '网站内容', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('120', 'admin/action/index', '用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('121', 'admin/action/log', '行为日志', '0', '1', '', 'admin', '1');

-- -----------------------------
-- Table structure for `cmswing_auth_user_role`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_auth_user_role`;
CREATE TABLE `cmswing_auth_user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role` (`user_id`,`role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `cmswing_auth_user_role`
-- -----------------------------
INSERT INTO `cmswing_auth_user_role` VALUES ('1', '1', '1');
INSERT INTO `cmswing_auth_user_role` VALUES ('2', '1', '2');
INSERT INTO `cmswing_auth_user_role` VALUES ('3', '14', '19');

-- -----------------------------
-- Table structure for `cmswing_category`
-- -----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='分类表';

-- -----------------------------
-- Records of `cmswing_category`
-- -----------------------------
INSERT INTO `cmswing_category` VALUES ('1', 'blog', '博客', '0', '0', '10', '', '', '', '', '', '', '', '2,3', '2', '2,1', '0', '0', '1', '0', '0', '1', '', '1379474947', '1382701539', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('2', 'default_blog', '默认分类', '1', '1', '10', '', '', '', '', '', '', '', '2,3', '2', '2,1', '0', '1', '1', '0', '1', '1', '', '1379475028', '1386839751', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('39', '222', '2222', '2', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '2,1,3', '0', '2', '1', '0', '0', '1', '', '1447235659', '1447235770', '1', '0', '11111');
INSERT INTO `cmswing_category` VALUES ('40', 'pic', '图片上传', '0', '0', '10', '', '', '', '', '', '', '', '2,44', '2,44', '', '0', '1', '0', '0', '0', '1', '', '4294967295', '4294967295', '1', '0', '');

-- -----------------------------
-- Table structure for `cmswing_document`
-- -----------------------------
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
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  PRIMARY KEY (`id`),
  KEY `idx_category_status` (`category_id`,`status`),
  KEY `idx_status_type_pid` (`status`,`uid`,`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='文档模型基础表';

-- -----------------------------
-- Records of `cmswing_document`
-- -----------------------------
INSERT INTO `cmswing_document` VALUES ('1', '1', '', 'CmsWing1.0测试版发布', '2', '0', '期待已久的最新版发布', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '8', '0', '0', '0', '1450337973080', '1450337973080', '1');
INSERT INTO `cmswing_document` VALUES ('3', '1', '', '6546456', '39', '0', '465464', '0', '0', '3', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1450510498', '1450510498', '1');
INSERT INTO `cmswing_document` VALUES ('2', '1', '', '46456456', '2', '0', '456546546', '0', '0', '2', '2', '0', '0', '1', '1', '1451018700', '0', '0', '0', '0', '0', '1451018700', '1451030139', '1');
INSERT INTO `cmswing_document` VALUES ('4', '1', '', 'gfdgd', '2', '0', '', '0', '0', '2', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452670981', '1452670981', '1');
INSERT INTO `cmswing_document` VALUES ('5', '0', '', '11111', '2', '0', '111111111', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('6', '0', '', '11111111', '2', '0', '222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('7', '0', '', '1111111111111', '2', '0', '2222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('8', '0', '', '1111111111111', '2', '0', '2222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('9', '0', '', '1111111111111', '2', '0', '2222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('10', '1', '', '2222222222222222', '2', '0', '2222222222222222222222222222222222222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('11', '1', '', '111111111111111111', '2', '0', '2222222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('12', '1', '', '222222222222222222222', '2', '0', '22222222222222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('13', '1', '', '222222222222222222222222221111111111111', '2', '0', '21212', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('14', '1', '', '666666666', '2', '0', '666666666', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('15', '1', '', '66666666611', '2', '0', '66666666611', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('16', '1', '', '6666666661133', '2', '0', '6666666661133333333333', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('17', '1', '', '245546456546', '2', '0', '456546', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('18', '1', '', '3123123', '2', '0', '132213', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0');
INSERT INTO `cmswing_document` VALUES ('19', '1', '', '456546', '2', '0', '546546', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '2016', '0', '0');
INSERT INTO `cmswing_document` VALUES ('20', '1', '', '456546456', '2', '0', '546', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '2016', '0', '0');
INSERT INTO `cmswing_document` VALUES ('21', '1', '', '8888888888', '39', '0', '45654', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452687667869', '0', '0');
INSERT INTO `cmswing_document` VALUES ('22', '1', '', '9999999999', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452687704515', '0', '0');
INSERT INTO `cmswing_document` VALUES ('23', '1', '', '77777777', '39', '0', '7777777777777', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452687916935', '0', '0');
INSERT INTO `cmswing_document` VALUES ('24', '1', '', '6666666', '39', '0', '6666666666', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452688032174', '1452688032174', '0');
INSERT INTO `cmswing_document` VALUES ('25', '1', '', '5654', '39', '0', '6546', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452689847691', '1452689847691', '1');
INSERT INTO `cmswing_document` VALUES ('26', '1', '', '555555', '2', '0', '555555555', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452689894271', '1452689894271', '2');
INSERT INTO `cmswing_document` VALUES ('27', '1', '', '似的大师傅但是f'd's', '2', '0', ' f第三方打撒放', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452689920378', '1452689920378', '2');
INSERT INTO `cmswing_document` VALUES ('28', '1', '', '犯得上发射点f都是富士达', '2', '0', '都是放大撒冯绍峰是', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1441717080000', '1452689967653', '2');
INSERT INTO `cmswing_document` VALUES ('29', '1', '', '333333', '40', '0', '', '0', '0', '44', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452690238124', '1452690238124', '1');
INSERT INTO `cmswing_document` VALUES ('30', '1', '', '555555555', '2', '0', '5555555', '0', '0', '2', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452690518649', '1452690518649', '2');
INSERT INTO `cmswing_document` VALUES ('31', '1', '', '546456', '2', '0', '', '0', '30', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452690572967', '1452690572967', '2');

-- -----------------------------
-- Table structure for `cmswing_document_article`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_document_article`;
CREATE TABLE `cmswing_document_article` (
  `id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文档ID',
  `parse` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容解析类型',
  `content` text NOT NULL COMMENT '文章内容',
  `template` varchar(100) NOT NULL DEFAULT '' COMMENT '详情页显示模板',
  `bookmark` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '收藏数',
  `testeidtor` text NOT NULL COMMENT '测试编辑器',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='文档模型文章表';

-- -----------------------------
-- Records of `cmswing_document_article`
-- -----------------------------
INSERT INTO `cmswing_document_article` VALUES ('1', '范德萨范德萨测试1·11111111111111111111111111', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('4', '<p>gfdgdf<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('7', '<p>111111111111111<br/></p>', '', '0', '<p>111111111111<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('8', '<p>111111111111111<br/></p>', '', '0', '<p>111111111111<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('9', '<p>111111111111111<br/></p>', '', '0', '<p>111111111111<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('10', '<p>222222222222222222222222222222222<br/></p>', '', '0', '<p>222222222222222222<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('11', '<p>22222222222222222222222<br/></p>', '', '0', '<p>222222222222222<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('12', '<p>222222222222222222222<br/></p>', '', '0', '<p>22222222222222<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('13', '<p>2121<br/></p>', '', '0', '<p>212<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('14', '<p>66666666666666666<br/></p>', '', '0', '<p>666666666666<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('15', '<p>111111111<br/></p>', '', '0', '<p>11111111111<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('16', '<p>333333333333333<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('17', '<p>6546546<br/></p>', '', '0', '<p>6546546<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('18', '<p>3123123<br/></p>', '', '0', '<p>32131<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('19', '<p>546<br/></p>', '', '0', '<p>6546<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('20', '<p>654645<br/></p>', '', '0', '<p>6546<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('21', '<p>654646546<br/></p>', '', '0', '<p>65464<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('22', '<p>999999999999999999<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('23', '<p>77777777777<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('24', '<p>66666666666<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('25', '<p>546<br/></p>', '', '0', '<p>6546<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('26', '<p>55555555555<br/></p>', '', '0', '<p>55555555555<br/></p>');
INSERT INTO `cmswing_document_article` VALUES ('27', '<p>f都是放大撒放大撒富士达是<img alt="logo.png" src="/upload/editor/image/20160113/1452689918161817419.png" title="1452689918161817419.png"/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('28', '<p><img src="/upload/editor/image/20160113/1452689943289153964.png" title="1452689943289153964.png" alt="scrawl.png"/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('30', '<p>555555555555555<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('31', '<p>654654654<br/></p>', '', '0', '');
INSERT INTO `cmswing_document_article` VALUES ('2', '4654645645', '', '0', '');

-- -----------------------------
-- Table structure for `cmswing_document_download`
-- -----------------------------
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

-- -----------------------------
-- Records of `cmswing_document_download`
-- -----------------------------
INSERT INTO `cmswing_document_download` VALUES ('3', '456456464', '', '1', '0', '103928');

-- -----------------------------
-- Table structure for `cmswing_document_modelpic`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_document_modelpic`;
CREATE TABLE `cmswing_document_modelpic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uppic` int(10) unsigned NOT NULL COMMENT '图片上传',
  `picinfo` text NOT NULL COMMENT '图片说明',
  `bbq` text NOT NULL COMMENT '编辑器',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- -----------------------------
-- Records of `cmswing_document_modelpic`
-- -----------------------------
INSERT INTO `cmswing_document_modelpic` VALUES ('29', '20', '14345', '<p>6546<br/></p>');

-- -----------------------------
-- Table structure for `cmswing_document_picsys`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_document_picsys`;
CREATE TABLE `cmswing_document_picsys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `picurl` int(10) unsigned NOT NULL COMMENT '上传图片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


-- -----------------------------
-- Table structure for `cmswing_document_testmode`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_document_testmode`;
CREATE TABLE `cmswing_document_testmode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


-- -----------------------------
-- Table structure for `cmswing_document_testmodel`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_document_testmodel`;
CREATE TABLE `cmswing_document_testmodel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `testtext` text NOT NULL COMMENT '测试文本框',
  `testvarchar` varchar(255) NOT NULL DEFAULT '测试字符串默认值' COMMENT '测试字符串',
  `testdate` bigint(13) NOT NULL COMMENT '测试日期',
  `testnun` int(10) unsigned NOT NULL COMMENT '测试数字',
  `testbool` tinyint(2) NOT NULL DEFAULT '1' COMMENT '测试布尔',
  `testpicture` int(10) unsigned NOT NULL COMMENT '测试上传图片',
  `testfile` int(10) unsigned NOT NULL COMMENT '测试上传附件',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


-- -----------------------------
-- Table structure for `cmswing_file`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_file`;
CREATE TABLE `cmswing_file` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `name` char(30) NOT NULL DEFAULT '' COMMENT '原始文件名',
  `savename` char(30) NOT NULL DEFAULT '' COMMENT '保存名称',
  `savepath` char(30) NOT NULL DEFAULT '' COMMENT '文件保存路径',
  `ext` char(5) NOT NULL DEFAULT '' COMMENT '文件后缀',
  `mime` char(40) NOT NULL DEFAULT '' COMMENT '文件mime类型',
  `size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小',
  `md5` char(32) NOT NULL DEFAULT '' COMMENT '文件md5',
  `sha1` char(40) NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `location` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '文件保存位置',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '远程地址',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '上传时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_md5` (`md5`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='文件表';

-- -----------------------------
-- Records of `cmswing_file`
-- -----------------------------
INSERT INTO `cmswing_file` VALUES ('1', 'moban112.rar', '7oxGhtNhy1_e9VP2Ru4_mzaP.rar', '/upload/download/2015-12-28/', '', 'application/octet-stream', '592673', '2d2dde4c500f81674bd22c9a6338da7a', '', '0', '', '1451307240706');
INSERT INTO `cmswing_file` VALUES ('2', 'phpcms_v9.5.10_UTF8.zip', 'dO_l1-u7cEotnGzHhyTVzsSD.zip', '/upload/download/2015-12-28/', '', '"application/octet-stream', '8723992', 'c42373e0aa56b52c9e8556e638fe6919', '', '0', '', '1451307241462');
INSERT INTO `cmswing_file` VALUES ('3', '悦蕾网设计文件.zip', 'm5Cui2KNThJXZh06idj9QVD4.zip', '/upload/download/2015-12-28/', '', '"application/octet-stream', '20521434', 'f87ff613f19c83329445ffde24994b89', '', '0', '', '1451307242115');
INSERT INTO `cmswing_file` VALUES ('4', 'moban112.rar', 'ey3_2TwS5t0-PE1Oya_U4C6r.rar', '/upload/download/2015-12-28/', '', 'application/octet-stream', '592673', 'ab5d018ad9e839bbeb6e4eff04a38d1d', '', '0', '', '1451308335223');
INSERT INTO `cmswing_file` VALUES ('5', 'fex-team-webuploader-0.1.5-56-', 'sa7e06WygQCHs9iWStUoh88P.zip', '/upload/download/2015-12-28/', '', '"application/octet-stream', '3703904', '889b7f0e638d0048d98d6f794073f58b', '', '0', '', '1451308989436');
INSERT INTO `cmswing_file` VALUES ('6', 'proui(1).rar', 'y-x_4UmVkUJ1X84d8A42OqSP.rar', '/upload/download/2015-12-28/', '', 'application/octet-stream', '7179376', '4744342697b42fa9a0027c4ca264321c', '', '0', '', '1451309847621');
INSERT INTO `cmswing_file` VALUES ('7', '1448609511220.tar.gz', 'MXuucSEw9QTLG5-H36jFLGul.gz', '/upload/download/2015-12-28/', '', 'application/gzip', '8113', '6b60a7131d182c7a97932e5a61d0d8db', '', '0', '', '1451310113941');

-- -----------------------------
-- Table structure for `cmswing_member`
-- -----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- -----------------------------
-- Records of `cmswing_member`
-- -----------------------------
INSERT INTO `cmswing_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '130', 'arterli@qq.com', '9', '', '1452513965683', '0', '1452758376844', '2130706433', '0', '1');

-- -----------------------------
-- Table structure for `cmswing_menu`
-- -----------------------------
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

-- -----------------------------
-- Records of `cmswing_menu`
-- -----------------------------
INSERT INTO `cmswing_menu` VALUES ('1', '首页', '0', '1', 'admin/index/index', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('2', '网站内容', '0', '2', 'article', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('3', '内容管理', '2', '0', 'admin/article/index', '0', '', '1', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('19', '用户行为', '16', '3', 'admin/action/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('20', '新增用户行为', '19', '0', 'User/addaction', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('21', '编辑用户行为', '19', '0', 'User/editaction', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('22', '保存用户行为', '19', '0', 'User/saveAction', '0', '"用户->用户行为"保存编辑和新增的用户行为', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('23', '变更行为状态', '19', '0', 'User/setStatus', '0', '"用户->用户行为"中的启用,禁用和删除权限', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('24', '禁用会员', '19', '0', 'User/changeStatus?method=forbidUser', '0', '"用户->用户信息"中的禁用', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('25', '启用会员', '19', '0', 'User/changeStatus?method=resumeUser', '0', '"用户->用户信息"中的启用', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('26', '删除会员', '19', '0', 'User/changeStatus?method=deleteUser', '0', '"用户->用户信息"中的删除', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('27', '权限管理', '16', '2', 'admin/auth/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('28', '删除', '27', '0', 'AuthManager/changeStatus?method=deleteGroup', '0', '删除用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('29', '禁用', '27', '0', 'AuthManager/changeStatus?method=forbidGroup', '0', '禁用用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('30', '恢复', '27', '0', 'AuthManager/changeStatus?method=resumeGroup', '0', '恢复已禁用的用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('31', '新增', '27', '0', 'AuthManager/createGroup', '0', '创建新的用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('32', '编辑', '27', '0', 'AuthManager/editGroup', '0', '编辑用户组名称和描述', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('33', '保存用户组', '27', '0', 'AuthManager/writeGroup', '0', '新增和编辑用户组的"保存"按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('34', '授权', '27', '0', 'AuthManager/group', '0', '"后台  用户  用户信息"列表页的"授权"操作按钮,用于设置用户所属用户组', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('35', '访问授权', '27', '0', 'AuthManager/access', '0', '"后台  用户  权限管理"列表页的"访问授权"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('36', '成员授权', '27', '0', 'AuthManager/user', '0', '"后台  用户  权限管理"列表页的"成员授权"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('37', '解除授权', '27', '0', 'AuthManager/removeFromGroup', '0', '"成员授权"列表页内的解除授权操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('38', '保存成员授权', '27', '0', 'AuthManager/addToGroup', '0', '"用户信息"列表页"授权"时的"保存"按钮和"成员授权"里右上角的"添加"按钮)', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('39', '分类授权', '27', '0', 'AuthManager/category', '0', '"后台  用户  权限管理"列表页的"分类授权"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('40', '保存分类授权', '27', '0', 'AuthManager/addToCategory', '0', '"分类授权"页面的"保存"按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('41', '模型授权', '27', '0', 'AuthManager/modelauth', '0', '"后台  用户  权限管理"列表页的"模型授权"操作按钮', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('42', '保存模型授权', '27', '0', 'AuthManager/addToModel', '0', '"分类授权"页面的"保存"按钮', '0', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('63', '属性管理', '68', '0', 'admin/attribute/index', '1', '网站属性配置。', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('64', '新增', '63', '0', 'admin/attribute/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('65', '编辑', '63', '0', 'admin/attribute/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('66', '改变状态', '63', '0', 'admin/attribute/setStatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('67', '保存数据', '63', '0', 'admin/attribute/update', '0', '', '0', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('106', '行为日志', '16', '4', 'admin/action/log', '0', '', '3', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('126', '其他', '2', '0', 'wenz/mang', '0', '12152', '1', '0', '1');

-- -----------------------------
-- Table structure for `cmswing_model`
-- -----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='文档模型表';

-- -----------------------------
-- Records of `cmswing_model`
-- -----------------------------
INSERT INTO `cmswing_model` VALUES ('1', 'document', '基础文档', '0', '', '1', '{"1":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"]}', '1:基础', '', '', '', '', '', 'id:编号
title:标题:[EDIT]
type:类型
update_time:最后更新
status:状态
view:浏览
id:操作:[EDIT]|编辑,[DELETE]|删除', '0', '', '', '1449340764453', '1384507827', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('2', 'article', '文章', '1', '', '1', '{"1":["2","3","5","9","12","24","53"],"2":["10","11","13","14","16","17","19","20","25","26"]}', '1:基础,2:扩展', '24,25,26,53,2,3,5,9,10,11,12,13,14,16,17,19,20', '', '', '', '', 'id:编号
title:标题:[EDIT]
type:类型
update_time:最后更新
status:状态
view:浏览
id:操作:[EDIT]|编辑,[DELETE]|删除', '0', '', '', '1449340764453', '1451395546129', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('3', 'download', '下载', '1', '', '1', '{"1":["3","28","30","32","2","5","31"],"2":["13","10","27","9","12","16","17","19","11","20","14","29"]}', '1:基础,2:扩展', '', '', '', '', '', '', '0', '', '', '1449340764453', '1387260449', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('40', 'testmodel', '测试继承模型', '1', '', '1', '{"1":["3","43","44","45","46","47"]}', '1:基础', '43,44,45,46,47,3', '', '', '', '', 'id:编号
testtext:测试文本框
testvarchar:测试字符串
testdate:测试日期
testnum:测试数字
testbool:测试布尔
id:操作:[EDIT]|编辑,[DELETE]|删除', '10', '', '', '1450410826136', '1450417019831', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('41', 'testmode', '测试模型', '1', '', '1', '{"1":["50","1"]}', '1:基础', '50,1', '', '', '', '', 'title:文章标题:[EDIT]
uid:用户
id:操作:[DELETE]|删除', '10', '', '', '1450534617546', '1450534885804', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('43', 'picsys', '图片系统', '1', '', '1', '{"1":["3","51"]}', '1:基础', '51,3', '', '', '', '', 'title:标题
picurl:上传图片', '10', '', '', '1451109883722', '1451110136896', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('44', 'modelpic', '图片系统1', '1', '', '1', '{"1":["3","58","60","61"]}', '1:基础', '58,60,61,3', '', '', '', '', 'title:标题
', '10', '', '', '1451877945364', '1451878897362', '1', 'MyISAM');

-- -----------------------------
-- Table structure for `cmswing_picture`
-- -----------------------------
DROP TABLE IF EXISTS `cmswing_picture`;
CREATE TABLE `cmswing_picture` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id自增',
  `path` varchar(255) NOT NULL DEFAULT '' COMMENT '路径',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '图片链接',
  `md5` char(32) NOT NULL DEFAULT '' COMMENT '文件md5',
  `sha1` char(40) NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `cmswing_picture`
-- -----------------------------
INSERT INTO `cmswing_picture` VALUES ('1', '/Uploads/Picture/2015-12-25/567cf54a36ea6.png', '', 'f3eaa6c12a36de8a052d1d77cd9dc1e1', 'd4a24c871be2dc3be7607d3102b42523b1f4a683', '1', '1451029834');
INSERT INTO `cmswing_picture` VALUES ('2', '/Uploads/Picture/2015-12-25/567d3a8788fe6.png', '', 'ca283b4bfceaf203177b9e9acf3241c3', '9ff89de6ae933c3b0de83652c101fb1b284e0d65', '1', '1451047559');
INSERT INTO `cmswing_picture` VALUES ('3', '/upload/picture/2015-12-25/rbLGp9vjY1DemXO0DRY7JzVT.png', '', '', '', '1', '1451051924514');
INSERT INTO `cmswing_picture` VALUES ('4', '/upload/picture/2015-12-25/2sSUNAWwQ-yPaPS9boIcBY2K.jpg', '', '', '', '1', '1451051961775');
INSERT INTO `cmswing_picture` VALUES ('5', '/upload/picture/2015-12-25/1KlWY4ut1DqYl6bmX_DoQ6B1.png', '', '', '', '1', '1451052022238');
INSERT INTO `cmswing_picture` VALUES ('6', '/upload/picture/2015-12-25/4HLlzNvjnlyUnKY8X6Y-U6h1.jpg', '', '', '', '1', '1451052030761');
INSERT INTO `cmswing_picture` VALUES ('7', '/upload/picture/2015-12-25/gax_wWo9sZR-JZ_b0DBiugta.jpg', '', '', '', '1', '1451052354530');
INSERT INTO `cmswing_picture` VALUES ('8', '/upload/picture/2015-12-25/NZ4-YBz5LHnCqp2sqDFwIfWs.png', '', '', '', '1', '1451052483035');
INSERT INTO `cmswing_picture` VALUES ('9', '/upload/picture/2015-12-26/BUNOS_nHpdGFKtdZvYKDRQ49.png', '', '', '', '1', '1451110257877');
INSERT INTO `cmswing_picture` VALUES ('10', '/upload/picture/2015-12-26/VD4YVQCeo2mvRJ_KkMGYHKSW.png', '', '', '', '1', '1451110401131');
INSERT INTO `cmswing_picture` VALUES ('11', '/upload/picture/2015-12-28/eoBllez-pPPyHe1Lj-pWxr7W.jpg', '', '', '', '1', '1451301404071');
INSERT INTO `cmswing_picture` VALUES ('12', '/upload/picture/2015-12-28/_K9Z1B2lCgpRsXhRou2dwdlg.jpg', '', '', '', '1', '1451303946844');
INSERT INTO `cmswing_picture` VALUES ('13', '/upload/picture/2015-12-28/rk4XLHU1fZ_XsS1YA6atoOWB.jpg', '', '', '', '1', '1451303973834');
INSERT INTO `cmswing_picture` VALUES ('14', '/upload/picture/2015-12-28/9keT7MphBbnHeWjHIIqRaXdj.jpg', '', '', '', '1', '1451307702105');
INSERT INTO `cmswing_picture` VALUES ('15', '/upload/picture/2015-12-28/FlgennevswlBDjJUcr0RtRTP.jpg', '', '', '', '1', '1451307713630');
INSERT INTO `cmswing_picture` VALUES ('16', '/upload/picture/2015-12-28/otYhAIEH88KXND-CWLYB-Vbc.png', '', '', '', '1', '1451309044762');
INSERT INTO `cmswing_picture` VALUES ('17', '/upload/picture/2015-12-29/eSiieCg7cLbJClblvYeklqF7.jpg', '', '', '', '1', '1451395596202');
INSERT INTO `cmswing_picture` VALUES ('18', '/upload/picture/2015-12-30/dR7zwL2u8nMHxkpmJLDH-6Ht.png', '', '', '', '1', '1451464802409');
INSERT INTO `cmswing_picture` VALUES ('19', '/upload/picture/2016-01-04/G5cGMPq8xeUIPmAIli83-HdK.png', '', '', '', '1', '1451878852719');
INSERT INTO `cmswing_picture` VALUES ('20', '/upload/picture/2016-01-13/9TLUUw6FONF2lLRLwMknhzLN.png', '', '', '', '1', '1452690230397');

-- -----------------------------
-- Table structure for `cmswing_session`
-- -----------------------------
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


-- -----------------------------
-- Table structure for `cmswing_setup`
-- -----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- -----------------------------
-- Records of `cmswing_setup`
-- -----------------------------
INSERT INTO `cmswing_setup` VALUES ('1', 'WEB_SITE_TITLE', '1', '网站标题', '1', '', '网站标题前台显示标题', '4294967295', '1379235274', '1', 'CmsWing内容管理框架', '0');
INSERT INTO `cmswing_setup` VALUES ('2', 'WEB_SITE_DESCRIPTION', '2', '网站描述', '1', '', '网站搜索引擎描述', '1378898976', '1379235841', '1', 'CmsWing内容管理框架', '1');
INSERT INTO `cmswing_setup` VALUES ('3', 'WEB_SITE_KEYWORD', '2', '网站关键字', '1', '', '网站搜索引擎关键字', '1378898976', '1381390100', '1', 'nodej,comswing,内容管理框架,thinkjs', '8');
INSERT INTO `cmswing_setup` VALUES ('4', 'WEB_SITE_CLOSE', '4', '关闭站点', '1', '0:关闭,1:开启', '站点关闭后其他用户不能访问，管理员可以正常访问', '1378898976', '1379235296', '1', '1', '1');
INSERT INTO `cmswing_setup` VALUES ('9', 'CONFIG_TYPE_LIST', '3', '配置类型列表', '4', '', '主要用于数据解析和页面表单的生成', '1378898976', '1379235348', '1', '0:数字
1:字符
2:文本
3:数组
4:枚举', '2');
INSERT INTO `cmswing_setup` VALUES ('10', 'WEB_SITE_ICP', '1', '网站备案号', '1', '', '设置在网站底部显示的备案号，如“沪ICP备12007941号-2', '1378900335', '1379235859', '1', '', '9');
INSERT INTO `cmswing_setup` VALUES ('11', 'DOCUMENT_POSITION', '3', '文档推荐位', '2', '', '文档推荐位，推荐到多个位置KEY值相加即可', '1379053380', '1379235329', '1', '1:列表推荐
2:频道推荐
4:首页推荐', '3');
INSERT INTO `cmswing_setup` VALUES ('12', 'DOCUMENT_DISPLAY', '3', '文档可见性', '2', '', '文章可见性仅影响前台显示，后台不收影响', '1379056370', '1379235322', '1', '0:所有人可见
1:仅注册会员可见
2:仅管理员可见', '4');
INSERT INTO `cmswing_setup` VALUES ('13', 'COLOR_STYLE', '4', '后台色系', '1', 'default_color:默认
blue_color:紫罗兰', '后台颜色风格', '1379122533', '1379235904', '1', 'default_color', '10');
INSERT INTO `cmswing_setup` VALUES ('20', 'CONFIG_GROUP_LIST', '3', '配置分组', '4', '', '配置分组', '1379228036', '1384418383', '1', '1:基本
2:内容
3:用户
4:系统', '4');
INSERT INTO `cmswing_setup` VALUES ('21', 'HOOKS_TYPE', '3', '钩子的类型', '4', '', '类型 1-用于扩展显示内容，2-用于扩展业务处理', '1379313397', '1379313407', '1', '1:视图
2:控制器', '6');
INSERT INTO `cmswing_setup` VALUES ('22', 'AUTH_CONFIG', '3', 'Auth配置', '4', '', '自定义Auth.class.php类配置', '1379409310', '1379409564', '1', 'AUTH_ON:1
AUTH_TYPE:2', '8');
INSERT INTO `cmswing_setup` VALUES ('23', 'OPEN_DRAFTBOX', '4', '是否开启草稿功能', '2', '0:关闭草稿功能
1:开启草稿功能
', '新增文章时的草稿功能配置', '1379484332', '1379484591', '1', '1', '1');
INSERT INTO `cmswing_setup` VALUES ('24', 'DRAFT_AOTOSAVE_INTERVAL', '0', '自动保存草稿时间', '2', '', '自动保存草稿的时间间隔，单位：秒', '1379484574', '1386143323', '1', '60', '2');
INSERT INTO `cmswing_setup` VALUES ('25', 'LIST_ROWS', '0', '后台每页记录数', '2', '', '后台数据每页显示记录数', '1379503896', '1380427745', '1', '10', '10');
INSERT INTO `cmswing_setup` VALUES ('26', 'USER_ALLOW_REGISTER', '4', '是否允许用户注册', '3', '0:关闭注册
1:允许注册', '是否开放用户注册', '1379504487', '1379504580', '1', '1', '3');
INSERT INTO `cmswing_setup` VALUES ('27', 'CODEMIRROR_THEME', '4', '预览插件的CodeMirror主题', '4', '3024-day:3024 day
3024-night:3024 night
ambiance:ambiance
base16-dark:base16 dark
base16-light:base16 light
blackboard:blackboard
cobalt:cobalt
eclipse:eclipse
elegant:elegant
erlang-dark:erlang-dark
lesser-dark:lesser-dark
midnight:midnight', '详情见CodeMirror官网', '1379814385', '1384740813', '1', 'ambiance', '3');
INSERT INTO `cmswing_setup` VALUES ('28', 'DATA_BACKUP_PATH', '1', '数据库备份根路径', '4', '', '路径必须以 / 结尾', '1381482411', '1381482411', '1', './Data/', '5');
INSERT INTO `cmswing_setup` VALUES ('29', 'DATA_BACKUP_PART_SIZE', '0', '数据库备份卷大小', '4', '', '该值用于限制压缩后的分卷最大长度。单位：B；建议设置20M', '1381482488', '1381729564', '1', '20971520', '7');
INSERT INTO `cmswing_setup` VALUES ('30', 'DATA_BACKUP_COMPRESS', '4', '数据库备份文件是否启用压缩', '4', '0:不压缩
1:启用压缩', '压缩备份文件需要PHP环境支持gzopen,gzwrite函数', '1381713345', '1381729544', '1', '1', '9');
INSERT INTO `cmswing_setup` VALUES ('31', 'DATA_BACKUP_COMPRESS_LEVEL', '4', '数据库备份文件压缩级别', '4', '1:普通
4:一般
9:最高', '数据库备份文件的压缩级别，该配置在开启压缩时生效', '1381713408', '1381713408', '1', '9', '10');
INSERT INTO `cmswing_setup` VALUES ('32', 'DEVELOP_MODE', '4', '开启开发者模式', '4', '0:关闭
1:开启', '是否开启开发者模式', '1383105995', '1383291877', '1', '1', '11');
INSERT INTO `cmswing_setup` VALUES ('33', 'ALLOW_VISIT', '3', '不受限控制器方法', '0', '', '', '1386644047', '1386644741', '1', '0:article/draftbox
1:article/mydocument
2:Category/tree
3:Index/verify
4:file/upload
5:file/download
6:user/updatePassword
7:user/updateNickname
8:user/submitPassword
9:user/submitNickname
10:file/uploadpicture', '0');
INSERT INTO `cmswing_setup` VALUES ('34', 'DENY_VISIT', '3', '超管专限控制器方法', '0', '', '仅超级管理员可访问的控制器方法', '1386644141', '1386644659', '1', '0:Addons/addhook
1:Addons/edithook
2:Addons/delhook
3:Addons/updateHook
4:Admin/getMenus
5:Admin/recordList
6:AuthManager/updateRules
7:AuthManager/tree', '0');
INSERT INTO `cmswing_setup` VALUES ('35', 'REPLY_LIST_ROWS', '0', '回复列表每页条数', '2', '', '', '4294967295', '1387178083', '1', '10', '0');
INSERT INTO `cmswing_setup` VALUES ('36', 'ADMIN_ALLOW_IP', '2', '后台允许访问IP', '4', '', '多个用逗号分隔，如果不配置表示不限制IP访问', '1387165454', '1387165553', '1', '', '12');
INSERT INTO `cmswing_setup` VALUES ('37', 'SHOW_PAGE_TRACE', '4', '是否显示页面Trace', '4', '0:关闭
1:开启', '是否显示页面Trace信息', '1387165685', '1387165685', '1', '0', '1');
INSERT INTO `cmswing_setup` VALUES ('56', 'MENU_GROUP', '3', '后台菜单分组', '4', '', '后台菜单分组，左侧栏显示', '4294967295', '4294967295', '1', '0:不分组
1:内容
3:系统
99:微信', '33');
INSERT INTO `cmswing_setup` VALUES ('57', 'haha', '4', '教师', '4', '0:体育老师
1:音乐老师
2:其他老师', '', '0', '4294967295', '1', '', '0');
INSERT INTO `cmswing_setup` VALUES ('58', 'aaaa', '3', '的撒大', '4', '0:sss
1:aaaa', '', '4294967295', '4294967295', '1', '1', '0');
