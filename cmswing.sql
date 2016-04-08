/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-04-09 00:23:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_action
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='系统行为表';

-- ----------------------------
-- Records of cmswing_action
-- ----------------------------
INSERT INTO `cmswing_action` VALUES ('1', 'user_login', '用户登录', '积分+10，每天一次', 'table:member|field:score|condition:id=${self} AND status>-1|rule:10|cycle:24|max:1;', '[user|get_nickname]在[time|time_format]登录了后台', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('2', 'add_article', '发布文章', '积分+5，每天上限5次', 'table:member|field:score|condition:id=${self}|rule:5|cycle:24|max:5', '', '2', '0', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('3', 'review', '评论', '评论积分+1，无限制', 'table:member|field:score|condition:id=${self}|rule:1', '', '2', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('4', 'add_document', '发表文档', '积分+10，每天上限5次', 'table:member|field:score|condition:id=${self}|rule:10|cycle:24|max:5', '[user|get_nickname]在[time|time_format]发表了一篇文章。\r\n表[model]，记录编号[record]。', '2', '1', '1458985259863');
INSERT INTO `cmswing_action` VALUES ('5', 'add_document_topic', '发表讨论', '积分+5，每天上限10次', 'table:member|field:score|condition:id=${self}|rule:5|cycle:24|max:10', '', '2', '0', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('6', 'update_config', '更新配置', '新增或修改或删除配置', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('7', 'update_model', '更新模型', '新增或修改模型', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('8', 'update_attribute', '更新属性', '新增或更新或删除属性', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('9', 'update_channel', '更新导航', '新增或修改或删除导航', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('10', 'update_menu', '更新菜单', '新增或修改或删除菜单', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('11', 'update_category', '更新分类', '新增或修改或删除分类', '', '', '1', '1', '1452591992289');
INSERT INTO `cmswing_action` VALUES ('13', 'testaction', '测试行为日志', '积分+10，每天一次1111', 'table:member|field:score|condition:id=${self} AND status>-1|rule:10|cycle:24|max:1;', '[user|get_nickname]在[time|time_format]测试了日志[model]和[record]和[data]', '2', '1', '1452594160564');
INSERT INTO `cmswing_action` VALUES ('14', 'order', '订单日志', '修改订单时记录', '', '[user|get_nickname]在[time|time_format],[record]', '2', '1', '1458986486185');

-- ----------------------------
-- Table structure for cmswing_action_log
-- ----------------------------
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
) ENGINE=MyISAM AUTO_INCREMENT=485 DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED COMMENT='行为日志表';

-- ----------------------------
-- Records of cmswing_action_log
-- ----------------------------
INSERT INTO `cmswing_action_log` VALUES ('311', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-07 17:00:34登录了后台', '1', '1457341234073');
INSERT INTO `cmswing_action_log` VALUES ('312', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-07 17:02:32登录了后台', '1', '1457341352889');
INSERT INTO `cmswing_action_log` VALUES ('313', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-07 18:35:51登录了后台', '1', '1457346951575');
INSERT INTO `cmswing_action_log` VALUES ('314', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-07 18:45:29登录了后台', '1', '1457347529369');
INSERT INTO `cmswing_action_log` VALUES ('315', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-08 09:32:36登录了后台', '1', '1457400756170');
INSERT INTO `cmswing_action_log` VALUES ('316', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-08 13:11:29登录了后台', '1', '1457413889573');
INSERT INTO `cmswing_action_log` VALUES ('317', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-08 14:33:11登录了后台', '1', '1457418791494');
INSERT INTO `cmswing_action_log` VALUES ('318', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-08 14:36:26登录了后台', '1', '1457418986623');
INSERT INTO `cmswing_action_log` VALUES ('319', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-08 20:21:57登录了后台', '1', '1457439717461');
INSERT INTO `cmswing_action_log` VALUES ('320', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 09:02:29登录了后台', '1', '1457485349516');
INSERT INTO `cmswing_action_log` VALUES ('321', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 09:27:01登录了后台', '1', '1457486821263');
INSERT INTO `cmswing_action_log` VALUES ('322', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 09:48:27登录了后台', '1', '1457488107006');
INSERT INTO `cmswing_action_log` VALUES ('323', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 11:06:54登录了后台', '1', '1457492814389');
INSERT INTO `cmswing_action_log` VALUES ('324', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 15:32:41登录了后台', '1', '1457508761367');
INSERT INTO `cmswing_action_log` VALUES ('325', '4', '1', '2130706433', 'document', '71', 'admin在2016-03-09 16:05:24发表了一篇文章。\r\n表document，记录编号71。fdsfsa', '1', '1457510724126');
INSERT INTO `cmswing_action_log` VALUES ('326', '4', '1', '2130706433', 'document', '72', 'admin在2016-03-09 16:12:04发表了一篇文章。\r\n表document，记录编号72。fdsfsa', '1', '1457511124158');
INSERT INTO `cmswing_action_log` VALUES ('327', '4', '1', '2130706433', 'document', '73', 'admin在2016-03-09 16:14:09发表了一篇文章。\r\n表document，记录编号73。fdsfsa', '1', '1457511249204');
INSERT INTO `cmswing_action_log` VALUES ('328', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 16:23:24登录了后台', '1', '1457511804632');
INSERT INTO `cmswing_action_log` VALUES ('329', '4', '1', '2130706433', 'document', '74', 'admin在2016-03-09 16:20:53发表了一篇文章。\r\n表document，记录编号74。fdsfsa', '1', '1457511653858');
INSERT INTO `cmswing_action_log` VALUES ('330', '4', '1', '2130706433', 'document', '75', 'admin在2016-03-09 16:28:13发表了一篇文章。\r\n表document，记录编号75。fdsfsa', '1', '1457512093518');
INSERT INTO `cmswing_action_log` VALUES ('331', '4', '1', '2130706433', 'document', '76', 'admin在2016-03-09 16:41:01发表了一篇文章。\r\n表document，记录编号76。fdsfsa', '1', '1457512861966');
INSERT INTO `cmswing_action_log` VALUES ('332', '4', '1', '2130706433', 'document', '77', 'admin在2016-03-09 16:42:30发表了一篇文章。\r\n表document，记录编号77。fdsfsa', '1', '1457512950829');
INSERT INTO `cmswing_action_log` VALUES ('333', '4', '1', '2130706433', 'document', '78', 'admin在2016-03-09 17:01:24发表了一篇文章。\r\n表document，记录编号78。fdsfsa', '1', '1457514084933');
INSERT INTO `cmswing_action_log` VALUES ('334', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-09 18:04:13登录了后台', '1', '1457517853502');
INSERT INTO `cmswing_action_log` VALUES ('335', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-10 09:08:47登录了后台', '1', '1457572127039');
INSERT INTO `cmswing_action_log` VALUES ('336', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-10 09:18:06登录了后台', '1', '1457572686636');
INSERT INTO `cmswing_action_log` VALUES ('337', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-10 09:59:36登录了后台', '1', '1457575176049');
INSERT INTO `cmswing_action_log` VALUES ('338', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-10 11:12:55登录了后台', '1', '1457579575257');
INSERT INTO `cmswing_action_log` VALUES ('339', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-10 13:59:23登录了后台', '1', '1457589563668');
INSERT INTO `cmswing_action_log` VALUES ('340', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 08:36:58登录了后台', '1', '1457656618181');
INSERT INTO `cmswing_action_log` VALUES ('341', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 09:09:35登录了后台', '1', '1457658575385');
INSERT INTO `cmswing_action_log` VALUES ('342', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 08:58:06登录了后台', '1', '1457657886433');
INSERT INTO `cmswing_action_log` VALUES ('343', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 08:58:06登录了后台', '1', '1457657886436');
INSERT INTO `cmswing_action_log` VALUES ('344', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 11:35:20登录了后台', '1', '1457667320286');
INSERT INTO `cmswing_action_log` VALUES ('345', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 18:03:53登录了后台', '1', '1457690633435');
INSERT INTO `cmswing_action_log` VALUES ('346', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-11 18:03:53登录了后台', '1', '1457690633860');
INSERT INTO `cmswing_action_log` VALUES ('347', '4', '1', '2130706433', 'document', '79', 'admin在2016-03-11 20:26:34发表了一篇文章。\r\n表document，记录编号79。fdsfsa', '1', '1457699194360');
INSERT INTO `cmswing_action_log` VALUES ('348', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-12 09:01:33登录了后台', '1', '1457744493895');
INSERT INTO `cmswing_action_log` VALUES ('349', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-12 09:07:18登录了后台', '1', '1457744838182');
INSERT INTO `cmswing_action_log` VALUES ('350', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-12 11:22:29登录了后台', '1', '1457752949925');
INSERT INTO `cmswing_action_log` VALUES ('351', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-12 14:06:15登录了后台', '1', '1457762775844');
INSERT INTO `cmswing_action_log` VALUES ('352', '4', '1', '2130706433', 'document', '80', 'admin在2016-03-12 19:01:14发表了一篇文章。\r\n表document，记录编号80。fdsfsa', '1', '1457780474273');
INSERT INTO `cmswing_action_log` VALUES ('353', '4', '1', '2130706433', 'document', '81', 'admin在2016-03-12 19:06:17发表了一篇文章。\r\n表document，记录编号81。fdsfsa', '1', '1457780777344');
INSERT INTO `cmswing_action_log` VALUES ('354', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-12 19:19:37登录了后台', '1', '1457781577831');
INSERT INTO `cmswing_action_log` VALUES ('355', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 08:55:05登录了后台', '1', '1457916905814');
INSERT INTO `cmswing_action_log` VALUES ('356', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 10:31:32登录了后台', '1', '1457922692333');
INSERT INTO `cmswing_action_log` VALUES ('357', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:08:25登录了后台', '1', '1457924905294');
INSERT INTO `cmswing_action_log` VALUES ('358', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:08:25登录了后台', '1', '1457924905297');
INSERT INTO `cmswing_action_log` VALUES ('359', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:20:28登录了后台', '1', '1457925628386');
INSERT INTO `cmswing_action_log` VALUES ('360', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:23:08登录了后台', '1', '1457925788062');
INSERT INTO `cmswing_action_log` VALUES ('361', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:27:38登录了后台', '1', '1457926058245');
INSERT INTO `cmswing_action_log` VALUES ('362', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:33:21登录了后台', '1', '1457926401392');
INSERT INTO `cmswing_action_log` VALUES ('363', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 11:35:15登录了后台', '1', '1457926515031');
INSERT INTO `cmswing_action_log` VALUES ('364', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:01:14登录了后台', '1', '1457938874935');
INSERT INTO `cmswing_action_log` VALUES ('365', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:04:05登录了后台', '1', '1457939045448');
INSERT INTO `cmswing_action_log` VALUES ('366', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:16:40登录了后台', '1', '1457939800912');
INSERT INTO `cmswing_action_log` VALUES ('367', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:24:20登录了后台', '1', '1457940260810');
INSERT INTO `cmswing_action_log` VALUES ('368', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:27:01登录了后台', '1', '1457940421492');
INSERT INTO `cmswing_action_log` VALUES ('369', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:28:14登录了后台', '1', '1457940494513');
INSERT INTO `cmswing_action_log` VALUES ('370', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:29:04登录了后台', '1', '1457940544803');
INSERT INTO `cmswing_action_log` VALUES ('371', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:29:51登录了后台', '1', '1457940591553');
INSERT INTO `cmswing_action_log` VALUES ('372', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:31:13登录了后台', '1', '1457940673714');
INSERT INTO `cmswing_action_log` VALUES ('373', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:32:51登录了后台', '1', '1457940771270');
INSERT INTO `cmswing_action_log` VALUES ('374', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:33:08登录了后台', '1', '1457940788885');
INSERT INTO `cmswing_action_log` VALUES ('375', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:38:50登录了后台', '1', '1457941130836');
INSERT INTO `cmswing_action_log` VALUES ('376', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-14 15:42:00登录了后台', '1', '1457941320591');
INSERT INTO `cmswing_action_log` VALUES ('377', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-15 09:01:36登录了后台', '1', '1458003696354');
INSERT INTO `cmswing_action_log` VALUES ('378', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-16 08:52:22登录了后台', '1', '1458089542473');
INSERT INTO `cmswing_action_log` VALUES ('379', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-16 14:52:27登录了后台', '1', '1458111147397');
INSERT INTO `cmswing_action_log` VALUES ('380', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-18 13:56:31登录了后台', '1', '1458280591124');
INSERT INTO `cmswing_action_log` VALUES ('381', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-18 19:36:08登录了后台', '1', '1458300968414');
INSERT INTO `cmswing_action_log` VALUES ('382', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-18 20:23:21登录了后台', '1', '1458303801739');
INSERT INTO `cmswing_action_log` VALUES ('383', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-18 22:27:34登录了后台', '1', '1458311254160');
INSERT INTO `cmswing_action_log` VALUES ('384', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-19 09:31:48登录了后台', '1', '1458351108940');
INSERT INTO `cmswing_action_log` VALUES ('385', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-19 10:17:39登录了后台', '1', '1458353859977');
INSERT INTO `cmswing_action_log` VALUES ('386', '4', '1', '2130706433', 'document', '82', 'admin在2016-03-19 21:35:50发表了一篇文章。\r\n表document，记录编号82。fdsfsa', '1', '1458394550734');
INSERT INTO `cmswing_action_log` VALUES ('387', '4', '1', '2130706433', 'document', '83', 'admin在2016-03-19 21:59:36发表了一篇文章。\r\n表document，记录编号83。fdsfsa', '1', '1458395976760');
INSERT INTO `cmswing_action_log` VALUES ('388', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-21 13:58:52登录了后台', '1', '1458539932241');
INSERT INTO `cmswing_action_log` VALUES ('389', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-21 18:28:25登录了后台', '1', '1458556105740');
INSERT INTO `cmswing_action_log` VALUES ('390', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-22 10:02:18登录了后台', '1', '1458612138962');
INSERT INTO `cmswing_action_log` VALUES ('391', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-22 14:48:59登录了后台', '1', '1458629339460');
INSERT INTO `cmswing_action_log` VALUES ('392', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-22 17:43:29登录了后台', '1', '1458639809274');
INSERT INTO `cmswing_action_log` VALUES ('393', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-23 11:01:41登录了后台', '1', '1458702101987');
INSERT INTO `cmswing_action_log` VALUES ('394', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-23 11:56:43登录了后台', '1', '1458705403283');
INSERT INTO `cmswing_action_log` VALUES ('395', '4', '1', '2130706433', 'document', '84', 'admin在2016-03-23 19:00:59发表了一篇文章。\r\n表document，记录编号84。fdsfsa', '1', '1458730859605');
INSERT INTO `cmswing_action_log` VALUES ('396', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-24 11:03:01登录了后台', '1', '1458788581037');
INSERT INTO `cmswing_action_log` VALUES ('397', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-24 11:06:19登录了后台', '1', '1458788779006');
INSERT INTO `cmswing_action_log` VALUES ('398', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-25 16:26:23登录了后台', '1', '1458894383721');
INSERT INTO `cmswing_action_log` VALUES ('399', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-25 16:28:05登录了后台', '1', '1458894485925');
INSERT INTO `cmswing_action_log` VALUES ('400', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-25 20:28:24登录了后台', '1', '1458908904449');
INSERT INTO `cmswing_action_log` VALUES ('401', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-26 15:42:18登录了后台', '1', '1458978138961');
INSERT INTO `cmswing_action_log` VALUES ('402', '14', '1', '2130706433', 'fdsf', '222', 'admin在2016-03-26 17:50:27测试了日志fdsf和222和[object Object]', '1', '1458985827988');
INSERT INTO `cmswing_action_log` VALUES ('403', '14', '1', '2130706433', '1458725553803', '222', 'admin在2016-03-26 17:51:30测试了日志1458725553803和222和[object Object]', '1', '1458985890720');
INSERT INTO `cmswing_action_log` VALUES ('404', '14', '1', '2130706433', 'order', '0', 'admin在2016-03-26 17:57:52,修改了订单，订单编号：1458722092073，并调整订单金额5', '1', '1458986272319');
INSERT INTO `cmswing_action_log` VALUES ('405', '14', '1', '2130706433', 'order', '0', 'admin在2016-03-26 18:00:21,修改了订单，订单编号：1458721606032，并调整订单金额 6 元，原订单金额：120 元，调整后订单金额：126 元', '1', '1458986421638');
INSERT INTO `cmswing_action_log` VALUES ('406', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-26 20:16:21登录了后台', '1', '1458994581646');
INSERT INTO `cmswing_action_log` VALUES ('407', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-26 20:17:54登录了后台', '1', '1458994674652');
INSERT INTO `cmswing_action_log` VALUES ('408', '1', '8', '2130706433', 'member', '8', 'arterli在2016-03-26 20:22:10登录了后台', '1', '1458994930196');
INSERT INTO `cmswing_action_log` VALUES ('409', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-26 20:36:49登录了后台', '1', '1458995809868');
INSERT INTO `cmswing_action_log` VALUES ('410', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-26 20:54:11登录了后台', '1', '1458996851145');
INSERT INTO `cmswing_action_log` VALUES ('411', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-27 11:02:53登录了后台', '1', '1459047773055');
INSERT INTO `cmswing_action_log` VALUES ('412', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-27 11:03:56登录了后台', '1', '1459047836426');
INSERT INTO `cmswing_action_log` VALUES ('413', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-28 02:33:20登录了后台', '1', '1459103600875');
INSERT INTO `cmswing_action_log` VALUES ('414', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-28 03:00:08登录了后台', '1', '1459105208802');
INSERT INTO `cmswing_action_log` VALUES ('415', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-28 03:42:55登录了后台', '1', '1459107775836');
INSERT INTO `cmswing_action_log` VALUES ('416', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-28 05:47:12登录了后台', '1', '1459115232473');
INSERT INTO `cmswing_action_log` VALUES ('417', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-29 21:46:40登录了后台', '1', '1459259200759');
INSERT INTO `cmswing_action_log` VALUES ('418', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-30 00:55:11登录了后台', '1', '1459270511656');
INSERT INTO `cmswing_action_log` VALUES ('419', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-30 03:41:47登录了后台', '1', '1459280507935');
INSERT INTO `cmswing_action_log` VALUES ('420', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-30 22:49:19登录了后台', '1', '1459349359295');
INSERT INTO `cmswing_action_log` VALUES ('421', '4', '1', '2130706433', 'document', '85', 'admin在2016-03-31 00:49:44发表了一篇文章。\r\n表document，记录编号85。', '1', '1459356584730');
INSERT INTO `cmswing_action_log` VALUES ('422', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-31 04:25:53登录了后台', '1', '1459369553439');
INSERT INTO `cmswing_action_log` VALUES ('423', '4', '1', '2130706433', 'document', '86', 'admin在2016-03-31 04:45:39发表了一篇文章。\r\n表document，记录编号86。', '1', '1459370739824');
INSERT INTO `cmswing_action_log` VALUES ('424', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-31 12:37:59登录了后台', '1', '1459399079806');
INSERT INTO `cmswing_action_log` VALUES ('425', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-31 12:43:51登录了后台', '1', '1459399431528');
INSERT INTO `cmswing_action_log` VALUES ('426', '4', '1', '2130706433', 'document', '87', 'admin在2016-03-31 13:01:57发表了一篇文章。\r\n表document，记录编号87。', '1', '1459400517644');
INSERT INTO `cmswing_action_log` VALUES ('427', '4', '1', '2130706433', 'document', '88', 'admin在2016-03-31 14:14:17发表了一篇文章。\r\n表document，记录编号88。', '1', '1459404857252');
INSERT INTO `cmswing_action_log` VALUES ('428', '1', '1', '2130706433', 'member', '1', 'admin在2016-03-31 16:40:38登录了后台', '1', '1459413638632');
INSERT INTO `cmswing_action_log` VALUES ('429', '9', '1', '2130706433', 'channel', '0', '操作url:/admin/channel/updates', '1', '1459417061206');
INSERT INTO `cmswing_action_log` VALUES ('430', '9', '1', '2130706433', 'channel', '0', '操作url:/admin/channel/updates', '1', '1459417083533');
INSERT INTO `cmswing_action_log` VALUES ('431', '9', '1', '2130706433', 'channel', '0', '操作url:/admin/channel/updates', '1', '1459417120026');
INSERT INTO `cmswing_action_log` VALUES ('432', '9', '1', '2130706433', 'channel', '0', '操作url:/admin/channel/updates', '1', '1459417153820');
INSERT INTO `cmswing_action_log` VALUES ('433', '9', '1', '2130706433', 'channel', '0', '操作url:/admin/channel/updates', '1', '1459417183649');
INSERT INTO `cmswing_action_log` VALUES ('434', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-03-31 17:58:10登录了后台', '1', '1459418290687');
INSERT INTO `cmswing_action_log` VALUES ('435', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-01 01:30:59登录了后台', '1', '1459445459321');
INSERT INTO `cmswing_action_log` VALUES ('436', '1', '1', '2130706433', 'member', '1', 'admin在2016-04-01 04:38:13登录了后台', '1', '1459456693023');
INSERT INTO `cmswing_action_log` VALUES ('437', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-02 21:40:29登录了后台', '1', '1459604429229');
INSERT INTO `cmswing_action_log` VALUES ('438', '1', '1', '2130706433', 'member', '1', 'admin在2016-04-03 00:18:29登录了后台', '1', '1459613909591');
INSERT INTO `cmswing_action_log` VALUES ('439', '1', '1', '2130706433', 'member', '1', 'admin在2016-04-03 00:59:26登录了后台', '1', '1459616366604');
INSERT INTO `cmswing_action_log` VALUES ('440', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-03 00:59:40登录了后台', '1', '1459616380661');
INSERT INTO `cmswing_action_log` VALUES ('441', '1', '1', '2130706433', 'member', '1', 'admin在2016-04-04 02:12:19登录了后台', '1', '1459707139208');
INSERT INTO `cmswing_action_log` VALUES ('442', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-04 03:34:18登录了后台', '1', '1459712058463');
INSERT INTO `cmswing_action_log` VALUES ('443', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-04 04:27:27登录了后台', '1', '1459715247541');
INSERT INTO `cmswing_action_log` VALUES ('444', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-04 15:41:07登录了后台', '1', '1459755667274');
INSERT INTO `cmswing_action_log` VALUES ('445', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-04 15:51:24登录了后台', '1', '1459756284073');
INSERT INTO `cmswing_action_log` VALUES ('446', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-04 19:46:29登录了后台', '1', '1459770389026');
INSERT INTO `cmswing_action_log` VALUES ('447', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-04 22:02:41登录了后台', '1', '1459778561055');
INSERT INTO `cmswing_action_log` VALUES ('448', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-05 22:54:16登录了后台', '1', '1459868056889');
INSERT INTO `cmswing_action_log` VALUES ('449', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-05 23:46:23登录了后台', '1', '1459871183091');
INSERT INTO `cmswing_action_log` VALUES ('450', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-05 23:47:42登录了后台', '1', '1459871262112');
INSERT INTO `cmswing_action_log` VALUES ('451', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-05 23:48:48登录了后台', '1', '1459871328991');
INSERT INTO `cmswing_action_log` VALUES ('452', '1', '1', '3232235878', 'member', '1', 'admin在2016-04-05 23:57:51登录了后台', '1', '1459871871787');
INSERT INTO `cmswing_action_log` VALUES ('453', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-06 00:41:40登录了后台', '1', '1459874500974');
INSERT INTO `cmswing_action_log` VALUES ('454', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-06 00:53:36登录了后台', '1', '1459875216284');
INSERT INTO `cmswing_action_log` VALUES ('455', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-06 01:48:59登录了后台', '1', '1459878539770');
INSERT INTO `cmswing_action_log` VALUES ('456', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-06 11:16:58登录了后台', '1', '1459912618741');
INSERT INTO `cmswing_action_log` VALUES ('457', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-06 11:26:10登录了后台', '1', '1459913170525');
INSERT INTO `cmswing_action_log` VALUES ('458', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-06 12:46:33登录了后台', '1', '1459917993485');
INSERT INTO `cmswing_action_log` VALUES ('459', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-06 12:46:41登录了后台', '1', '1459918001214');
INSERT INTO `cmswing_action_log` VALUES ('460', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-06 12:46:50登录了后台', '1', '1459918010186');
INSERT INTO `cmswing_action_log` VALUES ('461', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-06 12:47:06登录了后台', '1', '1459918026798');
INSERT INTO `cmswing_action_log` VALUES ('462', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-06 12:48:17登录了后台', '1', '1459918097854');
INSERT INTO `cmswing_action_log` VALUES ('463', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-06 14:24:27登录了后台', '1', '1459923867801');
INSERT INTO `cmswing_action_log` VALUES ('464', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-06 15:15:54登录了后台', '1', '1459926954307');
INSERT INTO `cmswing_action_log` VALUES ('465', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-06 15:16:40登录了后台', '1', '1459927000976');
INSERT INTO `cmswing_action_log` VALUES ('466', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-06 15:39:47登录了后台', '1', '1459928387774');
INSERT INTO `cmswing_action_log` VALUES ('467', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-06 18:48:50登录了后台', '1', '1459939730200');
INSERT INTO `cmswing_action_log` VALUES ('468', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-06 22:59:49登录了后台', '1', '1459954789608');
INSERT INTO `cmswing_action_log` VALUES ('469', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-07 00:28:08登录了后台', '1', '1459960088862');
INSERT INTO `cmswing_action_log` VALUES ('470', '1', '1', '2130706433', 'member', '1', 'admin在2016-04-07 16:11:28登录了后台', '1', '1460016688125');
INSERT INTO `cmswing_action_log` VALUES ('471', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-07 18:15:07登录了后台', '1', '1460024107267');
INSERT INTO `cmswing_action_log` VALUES ('472', '1', '2', '2130706433', 'member', '2', 'cmswing在2016-04-07 18:15:09登录了后台', '1', '1460024109831');
INSERT INTO `cmswing_action_log` VALUES ('473', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-07 20:23:31登录了后台', '1', '1460031811006');
INSERT INTO `cmswing_action_log` VALUES ('474', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-07 21:29:38登录了后台', '1', '1460035778863');
INSERT INTO `cmswing_action_log` VALUES ('475', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-07 21:51:27登录了后台', '1', '1460037087519');
INSERT INTO `cmswing_action_log` VALUES ('476', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-07 21:56:15登录了后台', '1', '1460037375797');
INSERT INTO `cmswing_action_log` VALUES ('477', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-07 21:56:43登录了后台', '1', '1460037403213');
INSERT INTO `cmswing_action_log` VALUES ('478', '1', '2', '3232235879', 'member', '2', 'cmswing在2016-04-07 22:02:39登录了后台', '1', '1460037759670');
INSERT INTO `cmswing_action_log` VALUES ('479', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-07 22:19:44登录了后台', '1', '1460038784007');
INSERT INTO `cmswing_action_log` VALUES ('480', '1', '1', '3232235878', 'member', '1', 'admin在2016-04-07 22:36:17登录了后台', '1', '1460039777214');
INSERT INTO `cmswing_action_log` VALUES ('481', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-08 22:16:41登录了后台', '1', '1460125001834');
INSERT INTO `cmswing_action_log` VALUES ('482', '1', '2', '3232235878', 'member', '2', 'cmswing在2016-04-08 22:23:42登录了后台', '1', '1460125422400');
INSERT INTO `cmswing_action_log` VALUES ('483', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-08 22:54:02登录了后台', '1', '1460127242197');
INSERT INTO `cmswing_action_log` VALUES ('484', '1', '2', '3232235877', 'member', '2', 'cmswing在2016-04-09 00:21:17登录了后台', '1', '1460132477706');

-- ----------------------------
-- Table structure for cmswing_address
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_address`;
CREATE TABLE `cmswing_address` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `accept_name` varchar(20) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `province` bigint(20) NOT NULL,
  `city` bigint(20) NOT NULL,
  `county` bigint(20) NOT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `addr` varchar(250) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_address
-- ----------------------------
INSERT INTO `cmswing_address` VALUES ('1', '1', '晓飞 宁', '13589100333', '13589100475', '370000', '370100', '370102', '250000', '山东省ddddddd', '1');
INSERT INTO `cmswing_address` VALUES ('2', '3', 'hgfhfgh', '18681851637', '8688854', '310000', '310100', '310104', '822225', 'htgfhfghgfhgfhgfhfg', '1');
INSERT INTO `cmswing_address` VALUES ('3', '1', '天津帅小伙', '18651569374', '', '120000', '120100', '120107', '300021', '六大街72号', '0');
INSERT INTO `cmswing_address` VALUES ('4', '1', '路人丁', '18681851637', '', '110000', '110100', '110101', '710065', '东花市北里20号楼6单元501室 ', '0');
INSERT INTO `cmswing_address` VALUES ('27', '2', '多啦A梦', '18681841347', '0298888888', '610000', '610100', '610113', '710065', '高新路王座国际3号楼8单元 308号', '0');
INSERT INTO `cmswing_address` VALUES ('32', '2', '郭德纲', '18688888888', null, '110000', '110100', '110102', '10001', '北京德云社吗一路金子一号', '1');

-- ----------------------------
-- Table structure for cmswing_area
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_area`;
CREATE TABLE `cmswing_area` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parent_id` bigint(20) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=910011 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_area
-- ----------------------------
INSERT INTO `cmswing_area` VALUES ('110000', '北京市', '0', '1');
INSERT INTO `cmswing_area` VALUES ('120000', '天津市', '0', '2');
INSERT INTO `cmswing_area` VALUES ('130000', '河北省', '0', '3');
INSERT INTO `cmswing_area` VALUES ('140000', '山西省', '0', '4');
INSERT INTO `cmswing_area` VALUES ('150000', '内蒙古', '0', '5');
INSERT INTO `cmswing_area` VALUES ('210000', '辽宁省', '0', '6');
INSERT INTO `cmswing_area` VALUES ('220000', '吉林省', '0', '7');
INSERT INTO `cmswing_area` VALUES ('230000', '黑龙江', '0', '8');
INSERT INTO `cmswing_area` VALUES ('310000', '上海市', '0', '9');
INSERT INTO `cmswing_area` VALUES ('320000', '江苏省', '0', '10');
INSERT INTO `cmswing_area` VALUES ('330000', '浙江省', '0', '11');
INSERT INTO `cmswing_area` VALUES ('340000', '安徽省', '0', '12');
INSERT INTO `cmswing_area` VALUES ('350000', '福建省', '0', '13');
INSERT INTO `cmswing_area` VALUES ('360000', '江西省', '0', '14');
INSERT INTO `cmswing_area` VALUES ('370000', '山东省', '0', '15');
INSERT INTO `cmswing_area` VALUES ('410000', '河南省', '0', '16');
INSERT INTO `cmswing_area` VALUES ('420000', '湖北省', '0', '17');
INSERT INTO `cmswing_area` VALUES ('430000', '湖南省', '0', '18');
INSERT INTO `cmswing_area` VALUES ('440000', '广东省', '0', '19');
INSERT INTO `cmswing_area` VALUES ('450000', '广西省', '0', '20');
INSERT INTO `cmswing_area` VALUES ('460000', '海南省', '0', '21');
INSERT INTO `cmswing_area` VALUES ('500000', '重庆市', '0', '22');
INSERT INTO `cmswing_area` VALUES ('510000', '四川省', '0', '23');
INSERT INTO `cmswing_area` VALUES ('520000', '贵州省', '0', '24');
INSERT INTO `cmswing_area` VALUES ('530000', '云南省', '0', '25');
INSERT INTO `cmswing_area` VALUES ('540000', '西　藏', '0', '26');
INSERT INTO `cmswing_area` VALUES ('610000', '陕西省', '0', '27');
INSERT INTO `cmswing_area` VALUES ('620000', '甘肃省', '0', '28');
INSERT INTO `cmswing_area` VALUES ('630000', '青海省', '0', '29');
INSERT INTO `cmswing_area` VALUES ('640000', '宁　夏', '0', '30');
INSERT INTO `cmswing_area` VALUES ('650000', '新　疆', '0', '31');
INSERT INTO `cmswing_area` VALUES ('710000', '台湾省', '0', '32');
INSERT INTO `cmswing_area` VALUES ('810000', '香　港', '0', '33');
INSERT INTO `cmswing_area` VALUES ('820000', '澳　门', '0', '34');
INSERT INTO `cmswing_area` VALUES ('110100', '北京市', '110000', '1');
INSERT INTO `cmswing_area` VALUES ('110200', '县', '110000', '2');
INSERT INTO `cmswing_area` VALUES ('120100', '市辖区', '120000', '1');
INSERT INTO `cmswing_area` VALUES ('120200', '县', '120000', '2');
INSERT INTO `cmswing_area` VALUES ('130100', '石家庄市', '130000', '1');
INSERT INTO `cmswing_area` VALUES ('130200', '唐山市', '130000', '2');
INSERT INTO `cmswing_area` VALUES ('130300', '秦皇岛市', '130000', '3');
INSERT INTO `cmswing_area` VALUES ('130400', '邯郸市', '130000', '4');
INSERT INTO `cmswing_area` VALUES ('130500', '邢台市', '130000', '5');
INSERT INTO `cmswing_area` VALUES ('130600', '保定市', '130000', '6');
INSERT INTO `cmswing_area` VALUES ('130700', '张家口市', '130000', '7');
INSERT INTO `cmswing_area` VALUES ('130800', '承德市', '130000', '8');
INSERT INTO `cmswing_area` VALUES ('130900', '沧州市', '130000', '9');
INSERT INTO `cmswing_area` VALUES ('131000', '廊坊市', '130000', '10');
INSERT INTO `cmswing_area` VALUES ('131100', '衡水市', '130000', '11');
INSERT INTO `cmswing_area` VALUES ('140100', '太原市', '140000', '1');
INSERT INTO `cmswing_area` VALUES ('140200', '大同市', '140000', '2');
INSERT INTO `cmswing_area` VALUES ('140300', '阳泉市', '140000', '3');
INSERT INTO `cmswing_area` VALUES ('140400', '长治市', '140000', '4');
INSERT INTO `cmswing_area` VALUES ('140500', '晋城市', '140000', '5');
INSERT INTO `cmswing_area` VALUES ('140600', '朔州市', '140000', '6');
INSERT INTO `cmswing_area` VALUES ('140700', '晋中市', '140000', '7');
INSERT INTO `cmswing_area` VALUES ('140800', '运城市', '140000', '8');
INSERT INTO `cmswing_area` VALUES ('140900', '忻州市', '140000', '9');
INSERT INTO `cmswing_area` VALUES ('141000', '临汾市', '140000', '10');
INSERT INTO `cmswing_area` VALUES ('141100', '吕梁市', '140000', '11');
INSERT INTO `cmswing_area` VALUES ('150100', '呼和浩特市', '150000', '1');
INSERT INTO `cmswing_area` VALUES ('150200', '包头市', '150000', '2');
INSERT INTO `cmswing_area` VALUES ('150300', '乌海市', '150000', '3');
INSERT INTO `cmswing_area` VALUES ('150400', '赤峰市', '150000', '4');
INSERT INTO `cmswing_area` VALUES ('150500', '通辽市', '150000', '5');
INSERT INTO `cmswing_area` VALUES ('150600', '鄂尔多斯市', '150000', '6');
INSERT INTO `cmswing_area` VALUES ('150700', '呼伦贝尔市', '150000', '7');
INSERT INTO `cmswing_area` VALUES ('150800', '巴彦淖尔市', '150000', '8');
INSERT INTO `cmswing_area` VALUES ('150900', '乌兰察布市', '150000', '9');
INSERT INTO `cmswing_area` VALUES ('152200', '兴安盟', '150000', '10');
INSERT INTO `cmswing_area` VALUES ('152500', '锡林郭勒盟', '150000', '11');
INSERT INTO `cmswing_area` VALUES ('152900', '阿拉善盟', '150000', '12');
INSERT INTO `cmswing_area` VALUES ('210100', '沈阳市', '210000', '1');
INSERT INTO `cmswing_area` VALUES ('210200', '大连市', '210000', '2');
INSERT INTO `cmswing_area` VALUES ('210300', '鞍山市', '210000', '3');
INSERT INTO `cmswing_area` VALUES ('210400', '抚顺市', '210000', '4');
INSERT INTO `cmswing_area` VALUES ('210500', '本溪市', '210000', '5');
INSERT INTO `cmswing_area` VALUES ('210600', '丹东市', '210000', '6');
INSERT INTO `cmswing_area` VALUES ('210700', '锦州市', '210000', '7');
INSERT INTO `cmswing_area` VALUES ('210800', '营口市', '210000', '8');
INSERT INTO `cmswing_area` VALUES ('210900', '阜新市', '210000', '9');
INSERT INTO `cmswing_area` VALUES ('211000', '辽阳市', '210000', '10');
INSERT INTO `cmswing_area` VALUES ('211100', '盘锦市', '210000', '11');
INSERT INTO `cmswing_area` VALUES ('211200', '铁岭市', '210000', '12');
INSERT INTO `cmswing_area` VALUES ('211300', '朝阳市', '210000', '13');
INSERT INTO `cmswing_area` VALUES ('211400', '葫芦岛市', '210000', '14');
INSERT INTO `cmswing_area` VALUES ('220100', '长春市', '220000', '1');
INSERT INTO `cmswing_area` VALUES ('220200', '吉林市', '220000', '2');
INSERT INTO `cmswing_area` VALUES ('220300', '四平市', '220000', '3');
INSERT INTO `cmswing_area` VALUES ('220400', '辽源市', '220000', '4');
INSERT INTO `cmswing_area` VALUES ('220500', '通化市', '220000', '5');
INSERT INTO `cmswing_area` VALUES ('220600', '白山市', '220000', '6');
INSERT INTO `cmswing_area` VALUES ('220700', '松原市', '220000', '7');
INSERT INTO `cmswing_area` VALUES ('220800', '白城市', '220000', '8');
INSERT INTO `cmswing_area` VALUES ('222400', '延边朝鲜族自治州', '220000', '9');
INSERT INTO `cmswing_area` VALUES ('230100', '哈尔滨市', '230000', '1');
INSERT INTO `cmswing_area` VALUES ('230200', '齐齐哈尔市', '230000', '2');
INSERT INTO `cmswing_area` VALUES ('230300', '鸡西市', '230000', '3');
INSERT INTO `cmswing_area` VALUES ('230400', '鹤岗市', '230000', '4');
INSERT INTO `cmswing_area` VALUES ('230500', '双鸭山市', '230000', '5');
INSERT INTO `cmswing_area` VALUES ('230600', '大庆市', '230000', '6');
INSERT INTO `cmswing_area` VALUES ('230700', '伊春市', '230000', '7');
INSERT INTO `cmswing_area` VALUES ('230800', '佳木斯市', '230000', '8');
INSERT INTO `cmswing_area` VALUES ('230900', '七台河市', '230000', '9');
INSERT INTO `cmswing_area` VALUES ('231000', '牡丹江市', '230000', '10');
INSERT INTO `cmswing_area` VALUES ('231100', '黑河市', '230000', '11');
INSERT INTO `cmswing_area` VALUES ('231200', '绥化市', '230000', '12');
INSERT INTO `cmswing_area` VALUES ('232700', '大兴安岭地区', '230000', '13');
INSERT INTO `cmswing_area` VALUES ('310100', '市辖区', '310000', '1');
INSERT INTO `cmswing_area` VALUES ('310200', '县', '310000', '2');
INSERT INTO `cmswing_area` VALUES ('320100', '南京市', '320000', '1');
INSERT INTO `cmswing_area` VALUES ('320200', '无锡市', '320000', '2');
INSERT INTO `cmswing_area` VALUES ('320300', '徐州市', '320000', '3');
INSERT INTO `cmswing_area` VALUES ('320400', '常州市', '320000', '4');
INSERT INTO `cmswing_area` VALUES ('320500', '苏州市', '320000', '5');
INSERT INTO `cmswing_area` VALUES ('320600', '南通市', '320000', '6');
INSERT INTO `cmswing_area` VALUES ('320700', '连云港市', '320000', '7');
INSERT INTO `cmswing_area` VALUES ('320800', '淮安市', '320000', '8');
INSERT INTO `cmswing_area` VALUES ('320900', '盐城市', '320000', '9');
INSERT INTO `cmswing_area` VALUES ('321000', '扬州市', '320000', '10');
INSERT INTO `cmswing_area` VALUES ('321100', '镇江市', '320000', '11');
INSERT INTO `cmswing_area` VALUES ('321200', '泰州市', '320000', '12');
INSERT INTO `cmswing_area` VALUES ('321300', '宿迁市', '320000', '13');
INSERT INTO `cmswing_area` VALUES ('330100', '杭州市', '330000', '1');
INSERT INTO `cmswing_area` VALUES ('330200', '宁波市', '330000', '2');
INSERT INTO `cmswing_area` VALUES ('330300', '温州市', '330000', '3');
INSERT INTO `cmswing_area` VALUES ('330400', '嘉兴市', '330000', '4');
INSERT INTO `cmswing_area` VALUES ('330500', '湖州市', '330000', '5');
INSERT INTO `cmswing_area` VALUES ('330600', '绍兴市', '330000', '6');
INSERT INTO `cmswing_area` VALUES ('330700', '金华市', '330000', '7');
INSERT INTO `cmswing_area` VALUES ('330800', '衢州市', '330000', '8');
INSERT INTO `cmswing_area` VALUES ('330900', '舟山市', '330000', '9');
INSERT INTO `cmswing_area` VALUES ('331000', '台州市', '330000', '10');
INSERT INTO `cmswing_area` VALUES ('331100', '丽水市', '330000', '11');
INSERT INTO `cmswing_area` VALUES ('340100', '合肥市', '340000', '1');
INSERT INTO `cmswing_area` VALUES ('340200', '芜湖市', '340000', '2');
INSERT INTO `cmswing_area` VALUES ('340300', '蚌埠市', '340000', '3');
INSERT INTO `cmswing_area` VALUES ('340400', '淮南市', '340000', '4');
INSERT INTO `cmswing_area` VALUES ('340500', '马鞍山市', '340000', '5');
INSERT INTO `cmswing_area` VALUES ('340600', '淮北市', '340000', '6');
INSERT INTO `cmswing_area` VALUES ('340700', '铜陵市', '340000', '7');
INSERT INTO `cmswing_area` VALUES ('340800', '安庆市', '340000', '8');
INSERT INTO `cmswing_area` VALUES ('341000', '黄山市', '340000', '9');
INSERT INTO `cmswing_area` VALUES ('341100', '滁州市', '340000', '10');
INSERT INTO `cmswing_area` VALUES ('341200', '阜阳市', '340000', '11');
INSERT INTO `cmswing_area` VALUES ('341300', '宿州市', '340000', '12');
INSERT INTO `cmswing_area` VALUES ('341500', '六安市', '340000', '13');
INSERT INTO `cmswing_area` VALUES ('341600', '亳州市', '340000', '14');
INSERT INTO `cmswing_area` VALUES ('341700', '池州市', '340000', '15');
INSERT INTO `cmswing_area` VALUES ('341800', '宣城市', '340000', '16');
INSERT INTO `cmswing_area` VALUES ('350100', '福州市', '350000', '1');
INSERT INTO `cmswing_area` VALUES ('350200', '厦门市', '350000', '2');
INSERT INTO `cmswing_area` VALUES ('350300', '莆田市', '350000', '3');
INSERT INTO `cmswing_area` VALUES ('350400', '三明市', '350000', '4');
INSERT INTO `cmswing_area` VALUES ('350500', '泉州市', '350000', '5');
INSERT INTO `cmswing_area` VALUES ('350600', '漳州市', '350000', '6');
INSERT INTO `cmswing_area` VALUES ('350700', '南平市', '350000', '7');
INSERT INTO `cmswing_area` VALUES ('350800', '龙岩市', '350000', '8');
INSERT INTO `cmswing_area` VALUES ('350900', '宁德市', '350000', '9');
INSERT INTO `cmswing_area` VALUES ('360100', '南昌市', '360000', '1');
INSERT INTO `cmswing_area` VALUES ('360200', '景德镇市', '360000', '2');
INSERT INTO `cmswing_area` VALUES ('360300', '萍乡市', '360000', '3');
INSERT INTO `cmswing_area` VALUES ('360400', '九江市', '360000', '4');
INSERT INTO `cmswing_area` VALUES ('360500', '新余市', '360000', '5');
INSERT INTO `cmswing_area` VALUES ('360600', '鹰潭市', '360000', '6');
INSERT INTO `cmswing_area` VALUES ('360700', '赣州市', '360000', '7');
INSERT INTO `cmswing_area` VALUES ('360800', '吉安市', '360000', '8');
INSERT INTO `cmswing_area` VALUES ('360900', '宜春市', '360000', '9');
INSERT INTO `cmswing_area` VALUES ('361000', '抚州市', '360000', '10');
INSERT INTO `cmswing_area` VALUES ('361100', '上饶市', '360000', '11');
INSERT INTO `cmswing_area` VALUES ('370100', '济南市', '370000', '1');
INSERT INTO `cmswing_area` VALUES ('370200', '青岛市', '370000', '2');
INSERT INTO `cmswing_area` VALUES ('370300', '淄博市', '370000', '3');
INSERT INTO `cmswing_area` VALUES ('370400', '枣庄市', '370000', '4');
INSERT INTO `cmswing_area` VALUES ('370500', '东营市', '370000', '5');
INSERT INTO `cmswing_area` VALUES ('370600', '烟台市', '370000', '6');
INSERT INTO `cmswing_area` VALUES ('370700', '潍坊市', '370000', '7');
INSERT INTO `cmswing_area` VALUES ('370800', '济宁市', '370000', '8');
INSERT INTO `cmswing_area` VALUES ('370900', '泰安市', '370000', '9');
INSERT INTO `cmswing_area` VALUES ('371000', '威海市', '370000', '10');
INSERT INTO `cmswing_area` VALUES ('371100', '日照市', '370000', '11');
INSERT INTO `cmswing_area` VALUES ('371200', '莱芜市', '370000', '12');
INSERT INTO `cmswing_area` VALUES ('371300', '临沂市', '370000', '13');
INSERT INTO `cmswing_area` VALUES ('371400', '德州市', '370000', '14');
INSERT INTO `cmswing_area` VALUES ('371500', '聊城市', '370000', '15');
INSERT INTO `cmswing_area` VALUES ('371600', '滨州市', '370000', '16');
INSERT INTO `cmswing_area` VALUES ('371700', '菏泽市', '370000', '17');
INSERT INTO `cmswing_area` VALUES ('410100', '郑州市', '410000', '1');
INSERT INTO `cmswing_area` VALUES ('410200', '开封市', '410000', '2');
INSERT INTO `cmswing_area` VALUES ('410300', '洛阳市', '410000', '3');
INSERT INTO `cmswing_area` VALUES ('410400', '平顶山市', '410000', '4');
INSERT INTO `cmswing_area` VALUES ('410500', '安阳市', '410000', '5');
INSERT INTO `cmswing_area` VALUES ('410600', '鹤壁市', '410000', '6');
INSERT INTO `cmswing_area` VALUES ('410700', '新乡市', '410000', '7');
INSERT INTO `cmswing_area` VALUES ('410800', '焦作市', '410000', '8');
INSERT INTO `cmswing_area` VALUES ('410900', '濮阳市', '410000', '9');
INSERT INTO `cmswing_area` VALUES ('411000', '许昌市', '410000', '10');
INSERT INTO `cmswing_area` VALUES ('411100', '漯河市', '410000', '11');
INSERT INTO `cmswing_area` VALUES ('411200', '三门峡市', '410000', '12');
INSERT INTO `cmswing_area` VALUES ('411300', '南阳市', '410000', '13');
INSERT INTO `cmswing_area` VALUES ('411400', '商丘市', '410000', '14');
INSERT INTO `cmswing_area` VALUES ('411500', '信阳市', '410000', '15');
INSERT INTO `cmswing_area` VALUES ('411600', '周口市', '410000', '16');
INSERT INTO `cmswing_area` VALUES ('411700', '驻马店市', '410000', '17');
INSERT INTO `cmswing_area` VALUES ('420100', '武汉市', '420000', '1');
INSERT INTO `cmswing_area` VALUES ('420200', '黄石市', '420000', '2');
INSERT INTO `cmswing_area` VALUES ('420300', '十堰市', '420000', '3');
INSERT INTO `cmswing_area` VALUES ('420500', '宜昌市', '420000', '4');
INSERT INTO `cmswing_area` VALUES ('420600', '襄樊市', '420000', '5');
INSERT INTO `cmswing_area` VALUES ('420700', '鄂州市', '420000', '6');
INSERT INTO `cmswing_area` VALUES ('420800', '荆门市', '420000', '7');
INSERT INTO `cmswing_area` VALUES ('420900', '孝感市', '420000', '8');
INSERT INTO `cmswing_area` VALUES ('421000', '荆州市', '420000', '9');
INSERT INTO `cmswing_area` VALUES ('421100', '黄冈市', '420000', '10');
INSERT INTO `cmswing_area` VALUES ('421200', '咸宁市', '420000', '11');
INSERT INTO `cmswing_area` VALUES ('421300', '随州市', '420000', '12');
INSERT INTO `cmswing_area` VALUES ('422800', '恩施土家族苗族自治州', '420000', '13');
INSERT INTO `cmswing_area` VALUES ('429000', '省直辖行政单位', '420000', '14');
INSERT INTO `cmswing_area` VALUES ('430100', '长沙市', '430000', '1');
INSERT INTO `cmswing_area` VALUES ('430200', '株洲市', '430000', '2');
INSERT INTO `cmswing_area` VALUES ('430300', '湘潭市', '430000', '3');
INSERT INTO `cmswing_area` VALUES ('430400', '衡阳市', '430000', '4');
INSERT INTO `cmswing_area` VALUES ('430500', '邵阳市', '430000', '5');
INSERT INTO `cmswing_area` VALUES ('430600', '岳阳市', '430000', '6');
INSERT INTO `cmswing_area` VALUES ('430700', '常德市', '430000', '7');
INSERT INTO `cmswing_area` VALUES ('430800', '张家界市', '430000', '8');
INSERT INTO `cmswing_area` VALUES ('430900', '益阳市', '430000', '9');
INSERT INTO `cmswing_area` VALUES ('431000', '郴州市', '430000', '10');
INSERT INTO `cmswing_area` VALUES ('431100', '永州市', '430000', '11');
INSERT INTO `cmswing_area` VALUES ('431200', '怀化市', '430000', '12');
INSERT INTO `cmswing_area` VALUES ('431300', '娄底市', '430000', '13');
INSERT INTO `cmswing_area` VALUES ('433100', '湘西土家族苗族自治州', '430000', '14');
INSERT INTO `cmswing_area` VALUES ('440100', '广州市', '440000', '1');
INSERT INTO `cmswing_area` VALUES ('440200', '韶关市', '440000', '2');
INSERT INTO `cmswing_area` VALUES ('440300', '深圳市', '440000', '3');
INSERT INTO `cmswing_area` VALUES ('440400', '珠海市', '440000', '4');
INSERT INTO `cmswing_area` VALUES ('440500', '汕头市', '440000', '5');
INSERT INTO `cmswing_area` VALUES ('440600', '佛山市', '440000', '6');
INSERT INTO `cmswing_area` VALUES ('440700', '江门市', '440000', '7');
INSERT INTO `cmswing_area` VALUES ('440800', '湛江市', '440000', '8');
INSERT INTO `cmswing_area` VALUES ('440900', '茂名市', '440000', '9');
INSERT INTO `cmswing_area` VALUES ('441200', '肇庆市', '440000', '10');
INSERT INTO `cmswing_area` VALUES ('441300', '惠州市', '440000', '11');
INSERT INTO `cmswing_area` VALUES ('441400', '梅州市', '440000', '12');
INSERT INTO `cmswing_area` VALUES ('441500', '汕尾市', '440000', '13');
INSERT INTO `cmswing_area` VALUES ('441600', '河源市', '440000', '14');
INSERT INTO `cmswing_area` VALUES ('441700', '阳江市', '440000', '15');
INSERT INTO `cmswing_area` VALUES ('441800', '清远市', '440000', '16');
INSERT INTO `cmswing_area` VALUES ('441900', '东莞市', '440000', '17');
INSERT INTO `cmswing_area` VALUES ('442000', '中山市', '440000', '18');
INSERT INTO `cmswing_area` VALUES ('445100', '潮州市', '440000', '19');
INSERT INTO `cmswing_area` VALUES ('445200', '揭阳市', '440000', '20');
INSERT INTO `cmswing_area` VALUES ('445300', '云浮市', '440000', '21');
INSERT INTO `cmswing_area` VALUES ('450100', '南宁市', '450000', '1');
INSERT INTO `cmswing_area` VALUES ('450200', '柳州市', '450000', '2');
INSERT INTO `cmswing_area` VALUES ('450300', '桂林市', '450000', '3');
INSERT INTO `cmswing_area` VALUES ('450400', '梧州市', '450000', '4');
INSERT INTO `cmswing_area` VALUES ('450500', '北海市', '450000', '5');
INSERT INTO `cmswing_area` VALUES ('450600', '防城港市', '450000', '6');
INSERT INTO `cmswing_area` VALUES ('450700', '钦州市', '450000', '7');
INSERT INTO `cmswing_area` VALUES ('450800', '贵港市', '450000', '8');
INSERT INTO `cmswing_area` VALUES ('450900', '玉林市', '450000', '9');
INSERT INTO `cmswing_area` VALUES ('451000', '百色市', '450000', '10');
INSERT INTO `cmswing_area` VALUES ('451100', '贺州市', '450000', '11');
INSERT INTO `cmswing_area` VALUES ('451200', '河池市', '450000', '12');
INSERT INTO `cmswing_area` VALUES ('451300', '来宾市', '450000', '13');
INSERT INTO `cmswing_area` VALUES ('451400', '崇左市', '450000', '14');
INSERT INTO `cmswing_area` VALUES ('460100', '海口市', '460000', '1');
INSERT INTO `cmswing_area` VALUES ('460200', '三亚市', '460000', '2');
INSERT INTO `cmswing_area` VALUES ('469000', '省直辖县级行政单位', '460000', '3');
INSERT INTO `cmswing_area` VALUES ('500100', '市辖区', '500000', '1');
INSERT INTO `cmswing_area` VALUES ('500200', '县', '500000', '2');
INSERT INTO `cmswing_area` VALUES ('500300', '市', '500000', '3');
INSERT INTO `cmswing_area` VALUES ('510100', '成都市', '510000', '1');
INSERT INTO `cmswing_area` VALUES ('510300', '自贡市', '510000', '2');
INSERT INTO `cmswing_area` VALUES ('510400', '攀枝花市', '510000', '3');
INSERT INTO `cmswing_area` VALUES ('510500', '泸州市', '510000', '4');
INSERT INTO `cmswing_area` VALUES ('510600', '德阳市', '510000', '5');
INSERT INTO `cmswing_area` VALUES ('510700', '绵阳市', '510000', '6');
INSERT INTO `cmswing_area` VALUES ('510800', '广元市', '510000', '7');
INSERT INTO `cmswing_area` VALUES ('510900', '遂宁市', '510000', '8');
INSERT INTO `cmswing_area` VALUES ('511000', '内江市', '510000', '9');
INSERT INTO `cmswing_area` VALUES ('511100', '乐山市', '510000', '10');
INSERT INTO `cmswing_area` VALUES ('511300', '南充市', '510000', '11');
INSERT INTO `cmswing_area` VALUES ('511400', '眉山市', '510000', '12');
INSERT INTO `cmswing_area` VALUES ('511500', '宜宾市', '510000', '13');
INSERT INTO `cmswing_area` VALUES ('511600', '广安市', '510000', '14');
INSERT INTO `cmswing_area` VALUES ('511700', '达州市', '510000', '15');
INSERT INTO `cmswing_area` VALUES ('511800', '雅安市', '510000', '16');
INSERT INTO `cmswing_area` VALUES ('511900', '巴中市', '510000', '17');
INSERT INTO `cmswing_area` VALUES ('512000', '资阳市', '510000', '18');
INSERT INTO `cmswing_area` VALUES ('513200', '阿坝藏族羌族自治州', '510000', '19');
INSERT INTO `cmswing_area` VALUES ('513300', '甘孜藏族自治州', '510000', '20');
INSERT INTO `cmswing_area` VALUES ('513400', '凉山彝族自治州', '510000', '21');
INSERT INTO `cmswing_area` VALUES ('520100', '贵阳市', '520000', '1');
INSERT INTO `cmswing_area` VALUES ('520200', '六盘水市', '520000', '2');
INSERT INTO `cmswing_area` VALUES ('520300', '遵义市', '520000', '3');
INSERT INTO `cmswing_area` VALUES ('520400', '安顺市', '520000', '4');
INSERT INTO `cmswing_area` VALUES ('522200', '铜仁地区', '520000', '5');
INSERT INTO `cmswing_area` VALUES ('522300', '黔西南布依族苗族自治州', '520000', '6');
INSERT INTO `cmswing_area` VALUES ('522400', '毕节地区', '520000', '7');
INSERT INTO `cmswing_area` VALUES ('522600', '黔东南苗族侗族自治州', '520000', '8');
INSERT INTO `cmswing_area` VALUES ('522700', '黔南布依族苗族自治州', '520000', '9');
INSERT INTO `cmswing_area` VALUES ('530100', '昆明市', '530000', '1');
INSERT INTO `cmswing_area` VALUES ('530300', '曲靖市', '530000', '2');
INSERT INTO `cmswing_area` VALUES ('530400', '玉溪市', '530000', '3');
INSERT INTO `cmswing_area` VALUES ('530500', '保山市', '530000', '4');
INSERT INTO `cmswing_area` VALUES ('530600', '昭通市', '530000', '5');
INSERT INTO `cmswing_area` VALUES ('530700', '丽江市', '530000', '6');
INSERT INTO `cmswing_area` VALUES ('530800', '思茅市', '530000', '7');
INSERT INTO `cmswing_area` VALUES ('530900', '临沧市', '530000', '8');
INSERT INTO `cmswing_area` VALUES ('532300', '楚雄彝族自治州', '530000', '9');
INSERT INTO `cmswing_area` VALUES ('532500', '红河哈尼族彝族自治州', '530000', '10');
INSERT INTO `cmswing_area` VALUES ('532600', '文山壮族苗族自治州', '530000', '11');
INSERT INTO `cmswing_area` VALUES ('532800', '西双版纳傣族自治州', '530000', '12');
INSERT INTO `cmswing_area` VALUES ('532900', '大理白族自治州', '530000', '13');
INSERT INTO `cmswing_area` VALUES ('533100', '德宏傣族景颇族自治州', '530000', '14');
INSERT INTO `cmswing_area` VALUES ('533300', '怒江傈僳族自治州', '530000', '15');
INSERT INTO `cmswing_area` VALUES ('533400', '迪庆藏族自治州', '530000', '16');
INSERT INTO `cmswing_area` VALUES ('540100', '拉萨市', '540000', '1');
INSERT INTO `cmswing_area` VALUES ('542100', '昌都地区', '540000', '2');
INSERT INTO `cmswing_area` VALUES ('542200', '山南地区', '540000', '3');
INSERT INTO `cmswing_area` VALUES ('542300', '日喀则地区', '540000', '4');
INSERT INTO `cmswing_area` VALUES ('542400', '那曲地区', '540000', '5');
INSERT INTO `cmswing_area` VALUES ('542500', '阿里地区', '540000', '6');
INSERT INTO `cmswing_area` VALUES ('542600', '林芝地区', '540000', '7');
INSERT INTO `cmswing_area` VALUES ('610100', '西安市', '610000', '1');
INSERT INTO `cmswing_area` VALUES ('610200', '铜川市', '610000', '2');
INSERT INTO `cmswing_area` VALUES ('610300', '宝鸡市', '610000', '3');
INSERT INTO `cmswing_area` VALUES ('610400', '咸阳市', '610000', '4');
INSERT INTO `cmswing_area` VALUES ('610500', '渭南市', '610000', '5');
INSERT INTO `cmswing_area` VALUES ('610600', '延安市', '610000', '6');
INSERT INTO `cmswing_area` VALUES ('610700', '汉中市', '610000', '7');
INSERT INTO `cmswing_area` VALUES ('610800', '榆林市', '610000', '8');
INSERT INTO `cmswing_area` VALUES ('610900', '安康市', '610000', '9');
INSERT INTO `cmswing_area` VALUES ('611000', '商洛市', '610000', '10');
INSERT INTO `cmswing_area` VALUES ('620100', '兰州市', '620000', '1');
INSERT INTO `cmswing_area` VALUES ('620200', '嘉峪关市', '620000', '2');
INSERT INTO `cmswing_area` VALUES ('620300', '金昌市', '620000', '3');
INSERT INTO `cmswing_area` VALUES ('620400', '白银市', '620000', '4');
INSERT INTO `cmswing_area` VALUES ('620500', '天水市', '620000', '5');
INSERT INTO `cmswing_area` VALUES ('620600', '武威市', '620000', '6');
INSERT INTO `cmswing_area` VALUES ('620700', '张掖市', '620000', '7');
INSERT INTO `cmswing_area` VALUES ('620800', '平凉市', '620000', '8');
INSERT INTO `cmswing_area` VALUES ('620900', '酒泉市', '620000', '9');
INSERT INTO `cmswing_area` VALUES ('621000', '庆阳市', '620000', '10');
INSERT INTO `cmswing_area` VALUES ('621100', '定西市', '620000', '11');
INSERT INTO `cmswing_area` VALUES ('621200', '陇南市', '620000', '12');
INSERT INTO `cmswing_area` VALUES ('622900', '临夏回族自治州', '620000', '13');
INSERT INTO `cmswing_area` VALUES ('623000', '甘南藏族自治州', '620000', '14');
INSERT INTO `cmswing_area` VALUES ('630100', '西宁市', '630000', '1');
INSERT INTO `cmswing_area` VALUES ('632100', '海东地区', '630000', '2');
INSERT INTO `cmswing_area` VALUES ('632200', '海北藏族自治州', '630000', '3');
INSERT INTO `cmswing_area` VALUES ('632300', '黄南藏族自治州', '630000', '4');
INSERT INTO `cmswing_area` VALUES ('632500', '海南藏族自治州', '630000', '5');
INSERT INTO `cmswing_area` VALUES ('632600', '果洛藏族自治州', '630000', '6');
INSERT INTO `cmswing_area` VALUES ('632700', '玉树藏族自治州', '630000', '7');
INSERT INTO `cmswing_area` VALUES ('632800', '海西蒙古族藏族自治州', '630000', '8');
INSERT INTO `cmswing_area` VALUES ('640100', '银川市', '640000', '1');
INSERT INTO `cmswing_area` VALUES ('640200', '石嘴山市', '640000', '2');
INSERT INTO `cmswing_area` VALUES ('640300', '吴忠市', '640000', '3');
INSERT INTO `cmswing_area` VALUES ('640400', '固原市', '640000', '4');
INSERT INTO `cmswing_area` VALUES ('640500', '中卫市', '640000', '5');
INSERT INTO `cmswing_area` VALUES ('650100', '乌鲁木齐市', '650000', '1');
INSERT INTO `cmswing_area` VALUES ('650200', '克拉玛依市', '650000', '2');
INSERT INTO `cmswing_area` VALUES ('652100', '吐鲁番地区', '650000', '3');
INSERT INTO `cmswing_area` VALUES ('652200', '哈密地区', '650000', '4');
INSERT INTO `cmswing_area` VALUES ('652300', '昌吉回族自治州', '650000', '5');
INSERT INTO `cmswing_area` VALUES ('652700', '博尔塔拉蒙古自治州', '650000', '6');
INSERT INTO `cmswing_area` VALUES ('652800', '巴音郭楞蒙古自治州', '650000', '7');
INSERT INTO `cmswing_area` VALUES ('652900', '阿克苏地区', '650000', '8');
INSERT INTO `cmswing_area` VALUES ('653000', '克孜勒苏柯尔克孜自治州', '650000', '9');
INSERT INTO `cmswing_area` VALUES ('653100', '喀什地区', '650000', '10');
INSERT INTO `cmswing_area` VALUES ('653200', '和田地区', '650000', '11');
INSERT INTO `cmswing_area` VALUES ('654000', '伊犁哈萨克自治州', '650000', '12');
INSERT INTO `cmswing_area` VALUES ('654200', '塔城地区', '650000', '13');
INSERT INTO `cmswing_area` VALUES ('654300', '阿勒泰地区', '650000', '14');
INSERT INTO `cmswing_area` VALUES ('659000', '省直辖行政单位', '650000', '15');
INSERT INTO `cmswing_area` VALUES ('110101', '东城区', '110100', '1');
INSERT INTO `cmswing_area` VALUES ('110102', '西城区', '110100', '2');
INSERT INTO `cmswing_area` VALUES ('110103', '崇文区', '110100', '3');
INSERT INTO `cmswing_area` VALUES ('110104', '宣武区', '110100', '4');
INSERT INTO `cmswing_area` VALUES ('110105', '朝阳区', '110100', '5');
INSERT INTO `cmswing_area` VALUES ('110106', '丰台区', '110100', '6');
INSERT INTO `cmswing_area` VALUES ('110107', '石景山区', '110100', '7');
INSERT INTO `cmswing_area` VALUES ('110108', '海淀区', '110100', '8');
INSERT INTO `cmswing_area` VALUES ('110109', '门头沟区', '110100', '9');
INSERT INTO `cmswing_area` VALUES ('110111', '房山区', '110100', '10');
INSERT INTO `cmswing_area` VALUES ('110112', '通州区', '110100', '11');
INSERT INTO `cmswing_area` VALUES ('110113', '顺义区', '110100', '12');
INSERT INTO `cmswing_area` VALUES ('110114', '昌平区', '110100', '13');
INSERT INTO `cmswing_area` VALUES ('110115', '大兴区', '110100', '14');
INSERT INTO `cmswing_area` VALUES ('110116', '怀柔区', '110100', '15');
INSERT INTO `cmswing_area` VALUES ('110117', '平谷区', '110100', '16');
INSERT INTO `cmswing_area` VALUES ('110228', '密云县', '110200', '1');
INSERT INTO `cmswing_area` VALUES ('110229', '延庆县', '110200', '2');
INSERT INTO `cmswing_area` VALUES ('120101', '和平区', '120100', '1');
INSERT INTO `cmswing_area` VALUES ('120102', '河东区', '120100', '2');
INSERT INTO `cmswing_area` VALUES ('120103', '河西区', '120100', '3');
INSERT INTO `cmswing_area` VALUES ('120104', '南开区', '120100', '4');
INSERT INTO `cmswing_area` VALUES ('120105', '河北区', '120100', '5');
INSERT INTO `cmswing_area` VALUES ('120106', '红桥区', '120100', '6');
INSERT INTO `cmswing_area` VALUES ('120107', '塘沽区', '120100', '7');
INSERT INTO `cmswing_area` VALUES ('120108', '汉沽区', '120100', '8');
INSERT INTO `cmswing_area` VALUES ('120109', '大港区', '120100', '9');
INSERT INTO `cmswing_area` VALUES ('120110', '东丽区', '120100', '10');
INSERT INTO `cmswing_area` VALUES ('120111', '西青区', '120100', '11');
INSERT INTO `cmswing_area` VALUES ('120112', '津南区', '120100', '12');
INSERT INTO `cmswing_area` VALUES ('120113', '北辰区', '120100', '13');
INSERT INTO `cmswing_area` VALUES ('120114', '武清区', '120100', '14');
INSERT INTO `cmswing_area` VALUES ('120115', '宝坻区', '120100', '15');
INSERT INTO `cmswing_area` VALUES ('120221', '宁河县', '120200', '1');
INSERT INTO `cmswing_area` VALUES ('120223', '静海县', '120200', '2');
INSERT INTO `cmswing_area` VALUES ('120225', '蓟　县', '120200', '3');
INSERT INTO `cmswing_area` VALUES ('130101', '市辖区', '130100', '1');
INSERT INTO `cmswing_area` VALUES ('130102', '长安区', '130100', '2');
INSERT INTO `cmswing_area` VALUES ('130103', '桥东区', '130100', '3');
INSERT INTO `cmswing_area` VALUES ('130104', '桥西区', '130100', '4');
INSERT INTO `cmswing_area` VALUES ('130105', '新华区', '130100', '5');
INSERT INTO `cmswing_area` VALUES ('130107', '井陉矿区', '130100', '6');
INSERT INTO `cmswing_area` VALUES ('130108', '裕华区', '130100', '7');
INSERT INTO `cmswing_area` VALUES ('130121', '井陉县', '130100', '8');
INSERT INTO `cmswing_area` VALUES ('130123', '正定县', '130100', '9');
INSERT INTO `cmswing_area` VALUES ('130124', '栾城县', '130100', '10');
INSERT INTO `cmswing_area` VALUES ('130125', '行唐县', '130100', '11');
INSERT INTO `cmswing_area` VALUES ('130126', '灵寿县', '130100', '12');
INSERT INTO `cmswing_area` VALUES ('130127', '高邑县', '130100', '13');
INSERT INTO `cmswing_area` VALUES ('130128', '深泽县', '130100', '14');
INSERT INTO `cmswing_area` VALUES ('130129', '赞皇县', '130100', '15');
INSERT INTO `cmswing_area` VALUES ('130130', '无极县', '130100', '16');
INSERT INTO `cmswing_area` VALUES ('130131', '平山县', '130100', '17');
INSERT INTO `cmswing_area` VALUES ('130132', '元氏县', '130100', '18');
INSERT INTO `cmswing_area` VALUES ('130133', '赵　县', '130100', '19');
INSERT INTO `cmswing_area` VALUES ('130181', '辛集市', '130100', '20');
INSERT INTO `cmswing_area` VALUES ('130182', '藁城市', '130100', '21');
INSERT INTO `cmswing_area` VALUES ('130183', '晋州市', '130100', '22');
INSERT INTO `cmswing_area` VALUES ('130184', '新乐市', '130100', '23');
INSERT INTO `cmswing_area` VALUES ('130185', '鹿泉市', '130100', '24');
INSERT INTO `cmswing_area` VALUES ('130201', '市辖区', '130200', '1');
INSERT INTO `cmswing_area` VALUES ('130202', '路南区', '130200', '2');
INSERT INTO `cmswing_area` VALUES ('130203', '路北区', '130200', '3');
INSERT INTO `cmswing_area` VALUES ('130204', '古冶区', '130200', '4');
INSERT INTO `cmswing_area` VALUES ('130205', '开平区', '130200', '5');
INSERT INTO `cmswing_area` VALUES ('130207', '丰南区', '130200', '6');
INSERT INTO `cmswing_area` VALUES ('130208', '丰润区', '130200', '7');
INSERT INTO `cmswing_area` VALUES ('130223', '滦　县', '130200', '8');
INSERT INTO `cmswing_area` VALUES ('130224', '滦南县', '130200', '9');
INSERT INTO `cmswing_area` VALUES ('130225', '乐亭县', '130200', '10');
INSERT INTO `cmswing_area` VALUES ('130227', '迁西县', '130200', '11');
INSERT INTO `cmswing_area` VALUES ('130229', '玉田县', '130200', '12');
INSERT INTO `cmswing_area` VALUES ('130230', '唐海县', '130200', '13');
INSERT INTO `cmswing_area` VALUES ('130281', '遵化市', '130200', '14');
INSERT INTO `cmswing_area` VALUES ('130283', '迁安市', '130200', '15');
INSERT INTO `cmswing_area` VALUES ('130301', '市辖区', '130300', '1');
INSERT INTO `cmswing_area` VALUES ('130302', '海港区', '130300', '2');
INSERT INTO `cmswing_area` VALUES ('130303', '山海关区', '130300', '3');
INSERT INTO `cmswing_area` VALUES ('130304', '北戴河区', '130300', '4');
INSERT INTO `cmswing_area` VALUES ('130321', '青龙满族自治县', '130300', '5');
INSERT INTO `cmswing_area` VALUES ('130322', '昌黎县', '130300', '6');
INSERT INTO `cmswing_area` VALUES ('130323', '抚宁县', '130300', '7');
INSERT INTO `cmswing_area` VALUES ('130324', '卢龙县', '130300', '8');
INSERT INTO `cmswing_area` VALUES ('130401', '市辖区', '130400', '1');
INSERT INTO `cmswing_area` VALUES ('130402', '邯山区', '130400', '2');
INSERT INTO `cmswing_area` VALUES ('130403', '丛台区', '130400', '3');
INSERT INTO `cmswing_area` VALUES ('130404', '复兴区', '130400', '4');
INSERT INTO `cmswing_area` VALUES ('130406', '峰峰矿区', '130400', '5');
INSERT INTO `cmswing_area` VALUES ('130421', '邯郸县', '130400', '6');
INSERT INTO `cmswing_area` VALUES ('130423', '临漳县', '130400', '7');
INSERT INTO `cmswing_area` VALUES ('130424', '成安县', '130400', '8');
INSERT INTO `cmswing_area` VALUES ('130425', '大名县', '130400', '9');
INSERT INTO `cmswing_area` VALUES ('130426', '涉　县', '130400', '10');
INSERT INTO `cmswing_area` VALUES ('130427', '磁　县', '130400', '11');
INSERT INTO `cmswing_area` VALUES ('130428', '肥乡县', '130400', '12');
INSERT INTO `cmswing_area` VALUES ('130429', '永年县', '130400', '13');
INSERT INTO `cmswing_area` VALUES ('130430', '邱　县', '130400', '14');
INSERT INTO `cmswing_area` VALUES ('130431', '鸡泽县', '130400', '15');
INSERT INTO `cmswing_area` VALUES ('130432', '广平县', '130400', '16');
INSERT INTO `cmswing_area` VALUES ('130433', '馆陶县', '130400', '17');
INSERT INTO `cmswing_area` VALUES ('130434', '魏　县', '130400', '18');
INSERT INTO `cmswing_area` VALUES ('130435', '曲周县', '130400', '19');
INSERT INTO `cmswing_area` VALUES ('130481', '武安市', '130400', '20');
INSERT INTO `cmswing_area` VALUES ('130501', '市辖区', '130500', '1');
INSERT INTO `cmswing_area` VALUES ('130502', '桥东区', '130500', '2');
INSERT INTO `cmswing_area` VALUES ('130503', '桥西区', '130500', '3');
INSERT INTO `cmswing_area` VALUES ('130521', '邢台县', '130500', '4');
INSERT INTO `cmswing_area` VALUES ('130522', '临城县', '130500', '5');
INSERT INTO `cmswing_area` VALUES ('130523', '内丘县', '130500', '6');
INSERT INTO `cmswing_area` VALUES ('130524', '柏乡县', '130500', '7');
INSERT INTO `cmswing_area` VALUES ('130525', '隆尧县', '130500', '8');
INSERT INTO `cmswing_area` VALUES ('130526', '任　县', '130500', '9');
INSERT INTO `cmswing_area` VALUES ('130527', '南和县', '130500', '10');
INSERT INTO `cmswing_area` VALUES ('130528', '宁晋县', '130500', '11');
INSERT INTO `cmswing_area` VALUES ('130529', '巨鹿县', '130500', '12');
INSERT INTO `cmswing_area` VALUES ('130530', '新河县', '130500', '13');
INSERT INTO `cmswing_area` VALUES ('130531', '广宗县', '130500', '14');
INSERT INTO `cmswing_area` VALUES ('130532', '平乡县', '130500', '15');
INSERT INTO `cmswing_area` VALUES ('130533', '威　县', '130500', '16');
INSERT INTO `cmswing_area` VALUES ('130534', '清河县', '130500', '17');
INSERT INTO `cmswing_area` VALUES ('130535', '临西县', '130500', '18');
INSERT INTO `cmswing_area` VALUES ('130581', '南宫市', '130500', '19');
INSERT INTO `cmswing_area` VALUES ('130582', '沙河市', '130500', '20');
INSERT INTO `cmswing_area` VALUES ('130601', '市辖区', '130600', '1');
INSERT INTO `cmswing_area` VALUES ('130602', '新市区', '130600', '2');
INSERT INTO `cmswing_area` VALUES ('130603', '北市区', '130600', '3');
INSERT INTO `cmswing_area` VALUES ('130604', '南市区', '130600', '4');
INSERT INTO `cmswing_area` VALUES ('130621', '满城县', '130600', '5');
INSERT INTO `cmswing_area` VALUES ('130622', '清苑县', '130600', '6');
INSERT INTO `cmswing_area` VALUES ('130623', '涞水县', '130600', '7');
INSERT INTO `cmswing_area` VALUES ('130624', '阜平县', '130600', '8');
INSERT INTO `cmswing_area` VALUES ('130625', '徐水县', '130600', '9');
INSERT INTO `cmswing_area` VALUES ('130626', '定兴县', '130600', '10');
INSERT INTO `cmswing_area` VALUES ('130627', '唐　县', '130600', '11');
INSERT INTO `cmswing_area` VALUES ('130628', '高阳县', '130600', '12');
INSERT INTO `cmswing_area` VALUES ('130629', '容城县', '130600', '13');
INSERT INTO `cmswing_area` VALUES ('130630', '涞源县', '130600', '14');
INSERT INTO `cmswing_area` VALUES ('130631', '望都县', '130600', '15');
INSERT INTO `cmswing_area` VALUES ('130632', '安新县', '130600', '16');
INSERT INTO `cmswing_area` VALUES ('130633', '易　县', '130600', '17');
INSERT INTO `cmswing_area` VALUES ('130634', '曲阳县', '130600', '18');
INSERT INTO `cmswing_area` VALUES ('130635', '蠡　县', '130600', '19');
INSERT INTO `cmswing_area` VALUES ('130636', '顺平县', '130600', '20');
INSERT INTO `cmswing_area` VALUES ('130637', '博野县', '130600', '21');
INSERT INTO `cmswing_area` VALUES ('130638', '雄　县', '130600', '22');
INSERT INTO `cmswing_area` VALUES ('130681', '涿州市', '130600', '23');
INSERT INTO `cmswing_area` VALUES ('130682', '定州市', '130600', '24');
INSERT INTO `cmswing_area` VALUES ('130683', '安国市', '130600', '25');
INSERT INTO `cmswing_area` VALUES ('130684', '高碑店市', '130600', '26');
INSERT INTO `cmswing_area` VALUES ('130701', '市辖区', '130700', '1');
INSERT INTO `cmswing_area` VALUES ('130702', '桥东区', '130700', '2');
INSERT INTO `cmswing_area` VALUES ('130703', '桥西区', '130700', '3');
INSERT INTO `cmswing_area` VALUES ('130705', '宣化区', '130700', '4');
INSERT INTO `cmswing_area` VALUES ('130706', '下花园区', '130700', '5');
INSERT INTO `cmswing_area` VALUES ('130721', '宣化县', '130700', '6');
INSERT INTO `cmswing_area` VALUES ('130722', '张北县', '130700', '7');
INSERT INTO `cmswing_area` VALUES ('130723', '康保县', '130700', '8');
INSERT INTO `cmswing_area` VALUES ('130724', '沽源县', '130700', '9');
INSERT INTO `cmswing_area` VALUES ('130725', '尚义县', '130700', '10');
INSERT INTO `cmswing_area` VALUES ('130726', '蔚　县', '130700', '11');
INSERT INTO `cmswing_area` VALUES ('130727', '阳原县', '130700', '12');
INSERT INTO `cmswing_area` VALUES ('130728', '怀安县', '130700', '13');
INSERT INTO `cmswing_area` VALUES ('130729', '万全县', '130700', '14');
INSERT INTO `cmswing_area` VALUES ('130730', '怀来县', '130700', '15');
INSERT INTO `cmswing_area` VALUES ('130731', '涿鹿县', '130700', '16');
INSERT INTO `cmswing_area` VALUES ('130732', '赤城县', '130700', '17');
INSERT INTO `cmswing_area` VALUES ('130733', '崇礼县', '130700', '18');
INSERT INTO `cmswing_area` VALUES ('130801', '市辖区', '130800', '1');
INSERT INTO `cmswing_area` VALUES ('130802', '双桥区', '130800', '2');
INSERT INTO `cmswing_area` VALUES ('130803', '双滦区', '130800', '3');
INSERT INTO `cmswing_area` VALUES ('130804', '鹰手营子矿区', '130800', '4');
INSERT INTO `cmswing_area` VALUES ('130821', '承德县', '130800', '5');
INSERT INTO `cmswing_area` VALUES ('130822', '兴隆县', '130800', '6');
INSERT INTO `cmswing_area` VALUES ('130823', '平泉县', '130800', '7');
INSERT INTO `cmswing_area` VALUES ('130824', '滦平县', '130800', '8');
INSERT INTO `cmswing_area` VALUES ('130825', '隆化县', '130800', '9');
INSERT INTO `cmswing_area` VALUES ('130826', '丰宁满族自治县', '130800', '10');
INSERT INTO `cmswing_area` VALUES ('130827', '宽城满族自治县', '130800', '11');
INSERT INTO `cmswing_area` VALUES ('130828', '围场满族蒙古族自治县', '130800', '12');
INSERT INTO `cmswing_area` VALUES ('130901', '市辖区', '130900', '1');
INSERT INTO `cmswing_area` VALUES ('130902', '新华区', '130900', '2');
INSERT INTO `cmswing_area` VALUES ('130903', '运河区', '130900', '3');
INSERT INTO `cmswing_area` VALUES ('130921', '沧　县', '130900', '4');
INSERT INTO `cmswing_area` VALUES ('130922', '青　县', '130900', '5');
INSERT INTO `cmswing_area` VALUES ('130923', '东光县', '130900', '6');
INSERT INTO `cmswing_area` VALUES ('130924', '海兴县', '130900', '7');
INSERT INTO `cmswing_area` VALUES ('130925', '盐山县', '130900', '8');
INSERT INTO `cmswing_area` VALUES ('130926', '肃宁县', '130900', '9');
INSERT INTO `cmswing_area` VALUES ('130927', '南皮县', '130900', '10');
INSERT INTO `cmswing_area` VALUES ('130928', '吴桥县', '130900', '11');
INSERT INTO `cmswing_area` VALUES ('130929', '献　县', '130900', '12');
INSERT INTO `cmswing_area` VALUES ('130930', '孟村回族自治县', '130900', '13');
INSERT INTO `cmswing_area` VALUES ('130981', '泊头市', '130900', '14');
INSERT INTO `cmswing_area` VALUES ('130982', '任丘市', '130900', '15');
INSERT INTO `cmswing_area` VALUES ('130983', '黄骅市', '130900', '16');
INSERT INTO `cmswing_area` VALUES ('130984', '河间市', '130900', '17');
INSERT INTO `cmswing_area` VALUES ('131001', '市辖区', '131000', '1');
INSERT INTO `cmswing_area` VALUES ('131002', '安次区', '131000', '2');
INSERT INTO `cmswing_area` VALUES ('131003', '广阳区', '131000', '3');
INSERT INTO `cmswing_area` VALUES ('131022', '固安县', '131000', '4');
INSERT INTO `cmswing_area` VALUES ('131023', '永清县', '131000', '5');
INSERT INTO `cmswing_area` VALUES ('131024', '香河县', '131000', '6');
INSERT INTO `cmswing_area` VALUES ('131025', '大城县', '131000', '7');
INSERT INTO `cmswing_area` VALUES ('131026', '文安县', '131000', '8');
INSERT INTO `cmswing_area` VALUES ('131028', '大厂回族自治县', '131000', '9');
INSERT INTO `cmswing_area` VALUES ('131081', '霸州市', '131000', '10');
INSERT INTO `cmswing_area` VALUES ('131082', '三河市', '131000', '11');
INSERT INTO `cmswing_area` VALUES ('131101', '市辖区', '131100', '1');
INSERT INTO `cmswing_area` VALUES ('131102', '桃城区', '131100', '2');
INSERT INTO `cmswing_area` VALUES ('131121', '枣强县', '131100', '3');
INSERT INTO `cmswing_area` VALUES ('131122', '武邑县', '131100', '4');
INSERT INTO `cmswing_area` VALUES ('131123', '武强县', '131100', '5');
INSERT INTO `cmswing_area` VALUES ('131124', '饶阳县', '131100', '6');
INSERT INTO `cmswing_area` VALUES ('131125', '安平县', '131100', '7');
INSERT INTO `cmswing_area` VALUES ('131126', '故城县', '131100', '8');
INSERT INTO `cmswing_area` VALUES ('131127', '景　县', '131100', '9');
INSERT INTO `cmswing_area` VALUES ('131128', '阜城县', '131100', '10');
INSERT INTO `cmswing_area` VALUES ('131181', '冀州市', '131100', '11');
INSERT INTO `cmswing_area` VALUES ('131182', '深州市', '131100', '12');
INSERT INTO `cmswing_area` VALUES ('140101', '市辖区', '140100', '1');
INSERT INTO `cmswing_area` VALUES ('140105', '小店区', '140100', '2');
INSERT INTO `cmswing_area` VALUES ('140106', '迎泽区', '140100', '3');
INSERT INTO `cmswing_area` VALUES ('140107', '杏花岭区', '140100', '4');
INSERT INTO `cmswing_area` VALUES ('140108', '尖草坪区', '140100', '5');
INSERT INTO `cmswing_area` VALUES ('140109', '万柏林区', '140100', '6');
INSERT INTO `cmswing_area` VALUES ('140110', '晋源区', '140100', '7');
INSERT INTO `cmswing_area` VALUES ('140121', '清徐县', '140100', '8');
INSERT INTO `cmswing_area` VALUES ('140122', '阳曲县', '140100', '9');
INSERT INTO `cmswing_area` VALUES ('140123', '娄烦县', '140100', '10');
INSERT INTO `cmswing_area` VALUES ('140181', '古交市', '140100', '11');
INSERT INTO `cmswing_area` VALUES ('140201', '市辖区', '140200', '1');
INSERT INTO `cmswing_area` VALUES ('140202', '城　区', '140200', '2');
INSERT INTO `cmswing_area` VALUES ('140203', '矿　区', '140200', '3');
INSERT INTO `cmswing_area` VALUES ('140211', '南郊区', '140200', '4');
INSERT INTO `cmswing_area` VALUES ('140212', '新荣区', '140200', '5');
INSERT INTO `cmswing_area` VALUES ('140221', '阳高县', '140200', '6');
INSERT INTO `cmswing_area` VALUES ('140222', '天镇县', '140200', '7');
INSERT INTO `cmswing_area` VALUES ('140223', '广灵县', '140200', '8');
INSERT INTO `cmswing_area` VALUES ('140224', '灵丘县', '140200', '9');
INSERT INTO `cmswing_area` VALUES ('140225', '浑源县', '140200', '10');
INSERT INTO `cmswing_area` VALUES ('140226', '左云县', '140200', '11');
INSERT INTO `cmswing_area` VALUES ('140227', '大同县', '140200', '12');
INSERT INTO `cmswing_area` VALUES ('140301', '市辖区', '140300', '1');
INSERT INTO `cmswing_area` VALUES ('140302', '城　区', '140300', '2');
INSERT INTO `cmswing_area` VALUES ('140303', '矿　区', '140300', '3');
INSERT INTO `cmswing_area` VALUES ('140311', '郊　区', '140300', '4');
INSERT INTO `cmswing_area` VALUES ('140321', '平定县', '140300', '5');
INSERT INTO `cmswing_area` VALUES ('140322', '盂　县', '140300', '6');
INSERT INTO `cmswing_area` VALUES ('140401', '市辖区', '140400', '1');
INSERT INTO `cmswing_area` VALUES ('140402', '城　区', '140400', '2');
INSERT INTO `cmswing_area` VALUES ('140411', '郊　区', '140400', '3');
INSERT INTO `cmswing_area` VALUES ('140421', '长治县', '140400', '4');
INSERT INTO `cmswing_area` VALUES ('140423', '襄垣县', '140400', '5');
INSERT INTO `cmswing_area` VALUES ('140424', '屯留县', '140400', '6');
INSERT INTO `cmswing_area` VALUES ('140425', '平顺县', '140400', '7');
INSERT INTO `cmswing_area` VALUES ('140426', '黎城县', '140400', '8');
INSERT INTO `cmswing_area` VALUES ('140427', '壶关县', '140400', '9');
INSERT INTO `cmswing_area` VALUES ('140428', '长子县', '140400', '10');
INSERT INTO `cmswing_area` VALUES ('140429', '武乡县', '140400', '11');
INSERT INTO `cmswing_area` VALUES ('140430', '沁　县', '140400', '12');
INSERT INTO `cmswing_area` VALUES ('140431', '沁源县', '140400', '13');
INSERT INTO `cmswing_area` VALUES ('140481', '潞城市', '140400', '14');
INSERT INTO `cmswing_area` VALUES ('140501', '市辖区', '140500', '1');
INSERT INTO `cmswing_area` VALUES ('140502', '城　区', '140500', '2');
INSERT INTO `cmswing_area` VALUES ('140521', '沁水县', '140500', '3');
INSERT INTO `cmswing_area` VALUES ('140522', '阳城县', '140500', '4');
INSERT INTO `cmswing_area` VALUES ('140524', '陵川县', '140500', '5');
INSERT INTO `cmswing_area` VALUES ('140525', '泽州县', '140500', '6');
INSERT INTO `cmswing_area` VALUES ('140581', '高平市', '140500', '7');
INSERT INTO `cmswing_area` VALUES ('140601', '市辖区', '140600', '1');
INSERT INTO `cmswing_area` VALUES ('140602', '朔城区', '140600', '2');
INSERT INTO `cmswing_area` VALUES ('140603', '平鲁区', '140600', '3');
INSERT INTO `cmswing_area` VALUES ('140621', '山阴县', '140600', '4');
INSERT INTO `cmswing_area` VALUES ('140622', '应　县', '140600', '5');
INSERT INTO `cmswing_area` VALUES ('140623', '右玉县', '140600', '6');
INSERT INTO `cmswing_area` VALUES ('140624', '怀仁县', '140600', '7');
INSERT INTO `cmswing_area` VALUES ('140701', '市辖区', '140700', '1');
INSERT INTO `cmswing_area` VALUES ('140702', '榆次区', '140700', '2');
INSERT INTO `cmswing_area` VALUES ('140721', '榆社县', '140700', '3');
INSERT INTO `cmswing_area` VALUES ('140722', '左权县', '140700', '4');
INSERT INTO `cmswing_area` VALUES ('140723', '和顺县', '140700', '5');
INSERT INTO `cmswing_area` VALUES ('140724', '昔阳县', '140700', '6');
INSERT INTO `cmswing_area` VALUES ('140725', '寿阳县', '140700', '7');
INSERT INTO `cmswing_area` VALUES ('140726', '太谷县', '140700', '8');
INSERT INTO `cmswing_area` VALUES ('140727', '祁　县', '140700', '9');
INSERT INTO `cmswing_area` VALUES ('140728', '平遥县', '140700', '10');
INSERT INTO `cmswing_area` VALUES ('140729', '灵石县', '140700', '11');
INSERT INTO `cmswing_area` VALUES ('140781', '介休市', '140700', '12');
INSERT INTO `cmswing_area` VALUES ('140801', '市辖区', '140800', '1');
INSERT INTO `cmswing_area` VALUES ('140802', '盐湖区', '140800', '2');
INSERT INTO `cmswing_area` VALUES ('140821', '临猗县', '140800', '3');
INSERT INTO `cmswing_area` VALUES ('140822', '万荣县', '140800', '4');
INSERT INTO `cmswing_area` VALUES ('140823', '闻喜县', '140800', '5');
INSERT INTO `cmswing_area` VALUES ('140824', '稷山县', '140800', '6');
INSERT INTO `cmswing_area` VALUES ('140825', '新绛县', '140800', '7');
INSERT INTO `cmswing_area` VALUES ('140826', '绛　县', '140800', '8');
INSERT INTO `cmswing_area` VALUES ('140827', '垣曲县', '140800', '9');
INSERT INTO `cmswing_area` VALUES ('140828', '夏　县', '140800', '10');
INSERT INTO `cmswing_area` VALUES ('140829', '平陆县', '140800', '11');
INSERT INTO `cmswing_area` VALUES ('140830', '芮城县', '140800', '12');
INSERT INTO `cmswing_area` VALUES ('140881', '永济市', '140800', '13');
INSERT INTO `cmswing_area` VALUES ('140882', '河津市', '140800', '14');
INSERT INTO `cmswing_area` VALUES ('140901', '市辖区', '140900', '1');
INSERT INTO `cmswing_area` VALUES ('140902', '忻府区', '140900', '2');
INSERT INTO `cmswing_area` VALUES ('140921', '定襄县', '140900', '3');
INSERT INTO `cmswing_area` VALUES ('140922', '五台县', '140900', '4');
INSERT INTO `cmswing_area` VALUES ('140923', '代　县', '140900', '5');
INSERT INTO `cmswing_area` VALUES ('140924', '繁峙县', '140900', '6');
INSERT INTO `cmswing_area` VALUES ('140925', '宁武县', '140900', '7');
INSERT INTO `cmswing_area` VALUES ('140926', '静乐县', '140900', '8');
INSERT INTO `cmswing_area` VALUES ('140927', '神池县', '140900', '9');
INSERT INTO `cmswing_area` VALUES ('140928', '五寨县', '140900', '10');
INSERT INTO `cmswing_area` VALUES ('140929', '岢岚县', '140900', '11');
INSERT INTO `cmswing_area` VALUES ('140930', '河曲县', '140900', '12');
INSERT INTO `cmswing_area` VALUES ('140931', '保德县', '140900', '13');
INSERT INTO `cmswing_area` VALUES ('140932', '偏关县', '140900', '14');
INSERT INTO `cmswing_area` VALUES ('140981', '原平市', '140900', '15');
INSERT INTO `cmswing_area` VALUES ('141001', '市辖区', '141000', '1');
INSERT INTO `cmswing_area` VALUES ('141002', '尧都区', '141000', '2');
INSERT INTO `cmswing_area` VALUES ('141021', '曲沃县', '141000', '3');
INSERT INTO `cmswing_area` VALUES ('141022', '翼城县', '141000', '4');
INSERT INTO `cmswing_area` VALUES ('141023', '襄汾县', '141000', '5');
INSERT INTO `cmswing_area` VALUES ('141024', '洪洞县', '141000', '6');
INSERT INTO `cmswing_area` VALUES ('141025', '古　县', '141000', '7');
INSERT INTO `cmswing_area` VALUES ('141026', '安泽县', '141000', '8');
INSERT INTO `cmswing_area` VALUES ('141027', '浮山县', '141000', '9');
INSERT INTO `cmswing_area` VALUES ('141028', '吉　县', '141000', '10');
INSERT INTO `cmswing_area` VALUES ('141029', '乡宁县', '141000', '11');
INSERT INTO `cmswing_area` VALUES ('141030', '大宁县', '141000', '12');
INSERT INTO `cmswing_area` VALUES ('141031', '隰　县', '141000', '13');
INSERT INTO `cmswing_area` VALUES ('141032', '永和县', '141000', '14');
INSERT INTO `cmswing_area` VALUES ('141033', '蒲　县', '141000', '15');
INSERT INTO `cmswing_area` VALUES ('141034', '汾西县', '141000', '16');
INSERT INTO `cmswing_area` VALUES ('141081', '侯马市', '141000', '17');
INSERT INTO `cmswing_area` VALUES ('141082', '霍州市', '141000', '18');
INSERT INTO `cmswing_area` VALUES ('141101', '市辖区', '141100', '1');
INSERT INTO `cmswing_area` VALUES ('141102', '离石区', '141100', '2');
INSERT INTO `cmswing_area` VALUES ('141121', '文水县', '141100', '3');
INSERT INTO `cmswing_area` VALUES ('141122', '交城县', '141100', '4');
INSERT INTO `cmswing_area` VALUES ('141123', '兴　县', '141100', '5');
INSERT INTO `cmswing_area` VALUES ('141124', '临　县', '141100', '6');
INSERT INTO `cmswing_area` VALUES ('141125', '柳林县', '141100', '7');
INSERT INTO `cmswing_area` VALUES ('141126', '石楼县', '141100', '8');
INSERT INTO `cmswing_area` VALUES ('141127', '岚　县', '141100', '9');
INSERT INTO `cmswing_area` VALUES ('141128', '方山县', '141100', '10');
INSERT INTO `cmswing_area` VALUES ('141129', '中阳县', '141100', '11');
INSERT INTO `cmswing_area` VALUES ('141130', '交口县', '141100', '12');
INSERT INTO `cmswing_area` VALUES ('141181', '孝义市', '141100', '13');
INSERT INTO `cmswing_area` VALUES ('141182', '汾阳市', '141100', '14');
INSERT INTO `cmswing_area` VALUES ('150101', '市辖区', '150100', '1');
INSERT INTO `cmswing_area` VALUES ('150102', '新城区', '150100', '2');
INSERT INTO `cmswing_area` VALUES ('150103', '回民区', '150100', '3');
INSERT INTO `cmswing_area` VALUES ('150104', '玉泉区', '150100', '4');
INSERT INTO `cmswing_area` VALUES ('150105', '赛罕区', '150100', '5');
INSERT INTO `cmswing_area` VALUES ('150121', '土默特左旗', '150100', '6');
INSERT INTO `cmswing_area` VALUES ('150122', '托克托县', '150100', '7');
INSERT INTO `cmswing_area` VALUES ('150123', '和林格尔县', '150100', '8');
INSERT INTO `cmswing_area` VALUES ('150124', '清水河县', '150100', '9');
INSERT INTO `cmswing_area` VALUES ('150125', '武川县', '150100', '10');
INSERT INTO `cmswing_area` VALUES ('150201', '市辖区', '150200', '1');
INSERT INTO `cmswing_area` VALUES ('150202', '东河区', '150200', '2');
INSERT INTO `cmswing_area` VALUES ('150203', '昆都仑区', '150200', '3');
INSERT INTO `cmswing_area` VALUES ('150204', '青山区', '150200', '4');
INSERT INTO `cmswing_area` VALUES ('150205', '石拐区', '150200', '5');
INSERT INTO `cmswing_area` VALUES ('150206', '白云矿区', '150200', '6');
INSERT INTO `cmswing_area` VALUES ('150207', '九原区', '150200', '7');
INSERT INTO `cmswing_area` VALUES ('150221', '土默特右旗', '150200', '8');
INSERT INTO `cmswing_area` VALUES ('150222', '固阳县', '150200', '9');
INSERT INTO `cmswing_area` VALUES ('150223', '达尔罕茂明安联合旗', '150200', '10');
INSERT INTO `cmswing_area` VALUES ('150301', '市辖区', '150300', '1');
INSERT INTO `cmswing_area` VALUES ('150302', '海勃湾区', '150300', '2');
INSERT INTO `cmswing_area` VALUES ('150303', '海南区', '150300', '3');
INSERT INTO `cmswing_area` VALUES ('150304', '乌达区', '150300', '4');
INSERT INTO `cmswing_area` VALUES ('150401', '市辖区', '150400', '1');
INSERT INTO `cmswing_area` VALUES ('150402', '红山区', '150400', '2');
INSERT INTO `cmswing_area` VALUES ('150403', '元宝山区', '150400', '3');
INSERT INTO `cmswing_area` VALUES ('150404', '松山区', '150400', '4');
INSERT INTO `cmswing_area` VALUES ('150421', '阿鲁科尔沁旗', '150400', '5');
INSERT INTO `cmswing_area` VALUES ('150422', '巴林左旗', '150400', '6');
INSERT INTO `cmswing_area` VALUES ('150423', '巴林右旗', '150400', '7');
INSERT INTO `cmswing_area` VALUES ('150424', '林西县', '150400', '8');
INSERT INTO `cmswing_area` VALUES ('150425', '克什克腾旗', '150400', '9');
INSERT INTO `cmswing_area` VALUES ('150426', '翁牛特旗', '150400', '10');
INSERT INTO `cmswing_area` VALUES ('150428', '喀喇沁旗', '150400', '11');
INSERT INTO `cmswing_area` VALUES ('150429', '宁城县', '150400', '12');
INSERT INTO `cmswing_area` VALUES ('150430', '敖汉旗', '150400', '13');
INSERT INTO `cmswing_area` VALUES ('150501', '市辖区', '150500', '1');
INSERT INTO `cmswing_area` VALUES ('150502', '科尔沁区', '150500', '2');
INSERT INTO `cmswing_area` VALUES ('150521', '科尔沁左翼中旗', '150500', '3');
INSERT INTO `cmswing_area` VALUES ('150522', '科尔沁左翼后旗', '150500', '4');
INSERT INTO `cmswing_area` VALUES ('150523', '开鲁县', '150500', '5');
INSERT INTO `cmswing_area` VALUES ('150524', '库伦旗', '150500', '6');
INSERT INTO `cmswing_area` VALUES ('150525', '奈曼旗', '150500', '7');
INSERT INTO `cmswing_area` VALUES ('150526', '扎鲁特旗', '150500', '8');
INSERT INTO `cmswing_area` VALUES ('150581', '霍林郭勒市', '150500', '9');
INSERT INTO `cmswing_area` VALUES ('150602', '东胜区', '150600', '1');
INSERT INTO `cmswing_area` VALUES ('150621', '达拉特旗', '150600', '2');
INSERT INTO `cmswing_area` VALUES ('150622', '准格尔旗', '150600', '3');
INSERT INTO `cmswing_area` VALUES ('150623', '鄂托克前旗', '150600', '4');
INSERT INTO `cmswing_area` VALUES ('150624', '鄂托克旗', '150600', '5');
INSERT INTO `cmswing_area` VALUES ('150625', '杭锦旗', '150600', '6');
INSERT INTO `cmswing_area` VALUES ('150626', '乌审旗', '150600', '7');
INSERT INTO `cmswing_area` VALUES ('150627', '伊金霍洛旗', '150600', '8');
INSERT INTO `cmswing_area` VALUES ('150701', '市辖区', '150700', '1');
INSERT INTO `cmswing_area` VALUES ('150702', '海拉尔区', '150700', '2');
INSERT INTO `cmswing_area` VALUES ('150721', '阿荣旗', '150700', '3');
INSERT INTO `cmswing_area` VALUES ('150722', '莫力达瓦达斡尔族自治旗', '150700', '4');
INSERT INTO `cmswing_area` VALUES ('150723', '鄂伦春自治旗', '150700', '5');
INSERT INTO `cmswing_area` VALUES ('150724', '鄂温克族自治旗', '150700', '6');
INSERT INTO `cmswing_area` VALUES ('150725', '陈巴尔虎旗', '150700', '7');
INSERT INTO `cmswing_area` VALUES ('150726', '新巴尔虎左旗', '150700', '8');
INSERT INTO `cmswing_area` VALUES ('150727', '新巴尔虎右旗', '150700', '9');
INSERT INTO `cmswing_area` VALUES ('150781', '满洲里市', '150700', '10');
INSERT INTO `cmswing_area` VALUES ('150782', '牙克石市', '150700', '11');
INSERT INTO `cmswing_area` VALUES ('150783', '扎兰屯市', '150700', '12');
INSERT INTO `cmswing_area` VALUES ('150784', '额尔古纳市', '150700', '13');
INSERT INTO `cmswing_area` VALUES ('150785', '根河市', '150700', '14');
INSERT INTO `cmswing_area` VALUES ('150801', '市辖区', '150800', '1');
INSERT INTO `cmswing_area` VALUES ('150802', '临河区', '150800', '2');
INSERT INTO `cmswing_area` VALUES ('150821', '五原县', '150800', '3');
INSERT INTO `cmswing_area` VALUES ('150822', '磴口县', '150800', '4');
INSERT INTO `cmswing_area` VALUES ('150823', '乌拉特前旗', '150800', '5');
INSERT INTO `cmswing_area` VALUES ('150824', '乌拉特中旗', '150800', '6');
INSERT INTO `cmswing_area` VALUES ('150825', '乌拉特后旗', '150800', '7');
INSERT INTO `cmswing_area` VALUES ('150826', '杭锦后旗', '150800', '8');
INSERT INTO `cmswing_area` VALUES ('150901', '市辖区', '150900', '1');
INSERT INTO `cmswing_area` VALUES ('150902', '集宁区', '150900', '2');
INSERT INTO `cmswing_area` VALUES ('150921', '卓资县', '150900', '3');
INSERT INTO `cmswing_area` VALUES ('150922', '化德县', '150900', '4');
INSERT INTO `cmswing_area` VALUES ('150923', '商都县', '150900', '5');
INSERT INTO `cmswing_area` VALUES ('150924', '兴和县', '150900', '6');
INSERT INTO `cmswing_area` VALUES ('150925', '凉城县', '150900', '7');
INSERT INTO `cmswing_area` VALUES ('150926', '察哈尔右翼前旗', '150900', '8');
INSERT INTO `cmswing_area` VALUES ('150927', '察哈尔右翼中旗', '150900', '9');
INSERT INTO `cmswing_area` VALUES ('150928', '察哈尔右翼后旗', '150900', '10');
INSERT INTO `cmswing_area` VALUES ('150929', '四子王旗', '150900', '11');
INSERT INTO `cmswing_area` VALUES ('150981', '丰镇市', '150900', '12');
INSERT INTO `cmswing_area` VALUES ('152201', '乌兰浩特市', '152200', '1');
INSERT INTO `cmswing_area` VALUES ('152202', '阿尔山市', '152200', '2');
INSERT INTO `cmswing_area` VALUES ('152221', '科尔沁右翼前旗', '152200', '3');
INSERT INTO `cmswing_area` VALUES ('152222', '科尔沁右翼中旗', '152200', '4');
INSERT INTO `cmswing_area` VALUES ('152223', '扎赉特旗', '152200', '5');
INSERT INTO `cmswing_area` VALUES ('152224', '突泉县', '152200', '6');
INSERT INTO `cmswing_area` VALUES ('152501', '二连浩特市', '152500', '1');
INSERT INTO `cmswing_area` VALUES ('152502', '锡林浩特市', '152500', '2');
INSERT INTO `cmswing_area` VALUES ('152522', '阿巴嘎旗', '152500', '3');
INSERT INTO `cmswing_area` VALUES ('152523', '苏尼特左旗', '152500', '4');
INSERT INTO `cmswing_area` VALUES ('152524', '苏尼特右旗', '152500', '5');
INSERT INTO `cmswing_area` VALUES ('152525', '东乌珠穆沁旗', '152500', '6');
INSERT INTO `cmswing_area` VALUES ('152526', '西乌珠穆沁旗', '152500', '7');
INSERT INTO `cmswing_area` VALUES ('152527', '太仆寺旗', '152500', '8');
INSERT INTO `cmswing_area` VALUES ('152528', '镶黄旗', '152500', '9');
INSERT INTO `cmswing_area` VALUES ('152529', '正镶白旗', '152500', '10');
INSERT INTO `cmswing_area` VALUES ('152530', '正蓝旗', '152500', '11');
INSERT INTO `cmswing_area` VALUES ('152531', '多伦县', '152500', '12');
INSERT INTO `cmswing_area` VALUES ('152921', '阿拉善左旗', '152900', '1');
INSERT INTO `cmswing_area` VALUES ('152922', '阿拉善右旗', '152900', '2');
INSERT INTO `cmswing_area` VALUES ('152923', '额济纳旗', '152900', '3');
INSERT INTO `cmswing_area` VALUES ('210101', '市辖区', '210100', '1');
INSERT INTO `cmswing_area` VALUES ('210102', '和平区', '210100', '2');
INSERT INTO `cmswing_area` VALUES ('210103', '沈河区', '210100', '3');
INSERT INTO `cmswing_area` VALUES ('210104', '大东区', '210100', '4');
INSERT INTO `cmswing_area` VALUES ('210105', '皇姑区', '210100', '5');
INSERT INTO `cmswing_area` VALUES ('210106', '铁西区', '210100', '6');
INSERT INTO `cmswing_area` VALUES ('210111', '苏家屯区', '210100', '7');
INSERT INTO `cmswing_area` VALUES ('210112', '东陵区', '210100', '8');
INSERT INTO `cmswing_area` VALUES ('210113', '新城子区', '210100', '9');
INSERT INTO `cmswing_area` VALUES ('210114', '于洪区', '210100', '10');
INSERT INTO `cmswing_area` VALUES ('210122', '辽中县', '210100', '11');
INSERT INTO `cmswing_area` VALUES ('210123', '康平县', '210100', '12');
INSERT INTO `cmswing_area` VALUES ('210124', '法库县', '210100', '13');
INSERT INTO `cmswing_area` VALUES ('210181', '新民市', '210100', '14');
INSERT INTO `cmswing_area` VALUES ('210201', '市辖区', '210200', '1');
INSERT INTO `cmswing_area` VALUES ('210202', '中山区', '210200', '2');
INSERT INTO `cmswing_area` VALUES ('210203', '西岗区', '210200', '3');
INSERT INTO `cmswing_area` VALUES ('210204', '沙河口区', '210200', '4');
INSERT INTO `cmswing_area` VALUES ('210211', '甘井子区', '210200', '5');
INSERT INTO `cmswing_area` VALUES ('210212', '旅顺口区', '210200', '6');
INSERT INTO `cmswing_area` VALUES ('210213', '金州区', '210200', '7');
INSERT INTO `cmswing_area` VALUES ('210224', '长海县', '210200', '8');
INSERT INTO `cmswing_area` VALUES ('210281', '瓦房店市', '210200', '9');
INSERT INTO `cmswing_area` VALUES ('210282', '普兰店市', '210200', '10');
INSERT INTO `cmswing_area` VALUES ('210283', '庄河市', '210200', '11');
INSERT INTO `cmswing_area` VALUES ('210301', '市辖区', '210300', '1');
INSERT INTO `cmswing_area` VALUES ('210302', '铁东区', '210300', '2');
INSERT INTO `cmswing_area` VALUES ('210303', '铁西区', '210300', '3');
INSERT INTO `cmswing_area` VALUES ('210304', '立山区', '210300', '4');
INSERT INTO `cmswing_area` VALUES ('210311', '千山区', '210300', '5');
INSERT INTO `cmswing_area` VALUES ('210321', '台安县', '210300', '6');
INSERT INTO `cmswing_area` VALUES ('210323', '岫岩满族自治县', '210300', '7');
INSERT INTO `cmswing_area` VALUES ('210381', '海城市', '210300', '8');
INSERT INTO `cmswing_area` VALUES ('210401', '市辖区', '210400', '1');
INSERT INTO `cmswing_area` VALUES ('210402', '新抚区', '210400', '2');
INSERT INTO `cmswing_area` VALUES ('210403', '东洲区', '210400', '3');
INSERT INTO `cmswing_area` VALUES ('210404', '望花区', '210400', '4');
INSERT INTO `cmswing_area` VALUES ('210411', '顺城区', '210400', '5');
INSERT INTO `cmswing_area` VALUES ('210421', '抚顺县', '210400', '6');
INSERT INTO `cmswing_area` VALUES ('210422', '新宾满族自治县', '210400', '7');
INSERT INTO `cmswing_area` VALUES ('210423', '清原满族自治县', '210400', '8');
INSERT INTO `cmswing_area` VALUES ('210501', '市辖区', '210500', '1');
INSERT INTO `cmswing_area` VALUES ('210502', '平山区', '210500', '2');
INSERT INTO `cmswing_area` VALUES ('210503', '溪湖区', '210500', '3');
INSERT INTO `cmswing_area` VALUES ('210504', '明山区', '210500', '4');
INSERT INTO `cmswing_area` VALUES ('210505', '南芬区', '210500', '5');
INSERT INTO `cmswing_area` VALUES ('210521', '本溪满族自治县', '210500', '6');
INSERT INTO `cmswing_area` VALUES ('210522', '桓仁满族自治县', '210500', '7');
INSERT INTO `cmswing_area` VALUES ('210601', '市辖区', '210600', '1');
INSERT INTO `cmswing_area` VALUES ('210602', '元宝区', '210600', '2');
INSERT INTO `cmswing_area` VALUES ('210603', '振兴区', '210600', '3');
INSERT INTO `cmswing_area` VALUES ('210604', '振安区', '210600', '4');
INSERT INTO `cmswing_area` VALUES ('210624', '宽甸满族自治县', '210600', '5');
INSERT INTO `cmswing_area` VALUES ('210681', '东港市', '210600', '6');
INSERT INTO `cmswing_area` VALUES ('210682', '凤城市', '210600', '7');
INSERT INTO `cmswing_area` VALUES ('210701', '市辖区', '210700', '1');
INSERT INTO `cmswing_area` VALUES ('210702', '古塔区', '210700', '2');
INSERT INTO `cmswing_area` VALUES ('210703', '凌河区', '210700', '3');
INSERT INTO `cmswing_area` VALUES ('210711', '太和区', '210700', '4');
INSERT INTO `cmswing_area` VALUES ('210726', '黑山县', '210700', '5');
INSERT INTO `cmswing_area` VALUES ('210727', '义　县', '210700', '6');
INSERT INTO `cmswing_area` VALUES ('210781', '凌海市', '210700', '7');
INSERT INTO `cmswing_area` VALUES ('210782', '北宁市', '210700', '8');
INSERT INTO `cmswing_area` VALUES ('210801', '市辖区', '210800', '1');
INSERT INTO `cmswing_area` VALUES ('210802', '站前区', '210800', '2');
INSERT INTO `cmswing_area` VALUES ('210803', '西市区', '210800', '3');
INSERT INTO `cmswing_area` VALUES ('210804', '鲅鱼圈区', '210800', '4');
INSERT INTO `cmswing_area` VALUES ('210811', '老边区', '210800', '5');
INSERT INTO `cmswing_area` VALUES ('210881', '盖州市', '210800', '6');
INSERT INTO `cmswing_area` VALUES ('210882', '大石桥市', '210800', '7');
INSERT INTO `cmswing_area` VALUES ('210901', '市辖区', '210900', '1');
INSERT INTO `cmswing_area` VALUES ('210902', '海州区', '210900', '2');
INSERT INTO `cmswing_area` VALUES ('210903', '新邱区', '210900', '3');
INSERT INTO `cmswing_area` VALUES ('210904', '太平区', '210900', '4');
INSERT INTO `cmswing_area` VALUES ('210905', '清河门区', '210900', '5');
INSERT INTO `cmswing_area` VALUES ('210911', '细河区', '210900', '6');
INSERT INTO `cmswing_area` VALUES ('210921', '阜新蒙古族自治县', '210900', '7');
INSERT INTO `cmswing_area` VALUES ('210922', '彰武县', '210900', '8');
INSERT INTO `cmswing_area` VALUES ('211001', '市辖区', '211000', '1');
INSERT INTO `cmswing_area` VALUES ('211002', '白塔区', '211000', '2');
INSERT INTO `cmswing_area` VALUES ('211003', '文圣区', '211000', '3');
INSERT INTO `cmswing_area` VALUES ('211004', '宏伟区', '211000', '4');
INSERT INTO `cmswing_area` VALUES ('211005', '弓长岭区', '211000', '5');
INSERT INTO `cmswing_area` VALUES ('211011', '太子河区', '211000', '6');
INSERT INTO `cmswing_area` VALUES ('211021', '辽阳县', '211000', '7');
INSERT INTO `cmswing_area` VALUES ('211081', '灯塔市', '211000', '8');
INSERT INTO `cmswing_area` VALUES ('211101', '市辖区', '211100', '1');
INSERT INTO `cmswing_area` VALUES ('211102', '双台子区', '211100', '2');
INSERT INTO `cmswing_area` VALUES ('211103', '兴隆台区', '211100', '3');
INSERT INTO `cmswing_area` VALUES ('211121', '大洼县', '211100', '4');
INSERT INTO `cmswing_area` VALUES ('211122', '盘山县', '211100', '5');
INSERT INTO `cmswing_area` VALUES ('211201', '市辖区', '211200', '1');
INSERT INTO `cmswing_area` VALUES ('211202', '银州区', '211200', '2');
INSERT INTO `cmswing_area` VALUES ('211204', '清河区', '211200', '3');
INSERT INTO `cmswing_area` VALUES ('211221', '铁岭县', '211200', '4');
INSERT INTO `cmswing_area` VALUES ('211223', '西丰县', '211200', '5');
INSERT INTO `cmswing_area` VALUES ('211224', '昌图县', '211200', '6');
INSERT INTO `cmswing_area` VALUES ('211281', '调兵山市', '211200', '7');
INSERT INTO `cmswing_area` VALUES ('211282', '开原市', '211200', '8');
INSERT INTO `cmswing_area` VALUES ('211301', '市辖区', '211300', '1');
INSERT INTO `cmswing_area` VALUES ('211302', '双塔区', '211300', '2');
INSERT INTO `cmswing_area` VALUES ('211303', '龙城区', '211300', '3');
INSERT INTO `cmswing_area` VALUES ('211321', '朝阳县', '211300', '4');
INSERT INTO `cmswing_area` VALUES ('211322', '建平县', '211300', '5');
INSERT INTO `cmswing_area` VALUES ('211324', '喀喇沁左翼蒙古族自治县', '211300', '6');
INSERT INTO `cmswing_area` VALUES ('211381', '北票市', '211300', '7');
INSERT INTO `cmswing_area` VALUES ('211382', '凌源市', '211300', '8');
INSERT INTO `cmswing_area` VALUES ('211401', '市辖区', '211400', '1');
INSERT INTO `cmswing_area` VALUES ('211402', '连山区', '211400', '2');
INSERT INTO `cmswing_area` VALUES ('211403', '龙港区', '211400', '3');
INSERT INTO `cmswing_area` VALUES ('211404', '南票区', '211400', '4');
INSERT INTO `cmswing_area` VALUES ('211421', '绥中县', '211400', '5');
INSERT INTO `cmswing_area` VALUES ('211422', '建昌县', '211400', '6');
INSERT INTO `cmswing_area` VALUES ('211481', '兴城市', '211400', '7');
INSERT INTO `cmswing_area` VALUES ('220101', '市辖区', '220100', '1');
INSERT INTO `cmswing_area` VALUES ('220102', '南关区', '220100', '2');
INSERT INTO `cmswing_area` VALUES ('220103', '宽城区', '220100', '3');
INSERT INTO `cmswing_area` VALUES ('220104', '朝阳区', '220100', '4');
INSERT INTO `cmswing_area` VALUES ('220105', '二道区', '220100', '5');
INSERT INTO `cmswing_area` VALUES ('220106', '绿园区', '220100', '6');
INSERT INTO `cmswing_area` VALUES ('220112', '双阳区', '220100', '7');
INSERT INTO `cmswing_area` VALUES ('220122', '农安县', '220100', '8');
INSERT INTO `cmswing_area` VALUES ('220181', '九台市', '220100', '9');
INSERT INTO `cmswing_area` VALUES ('220182', '榆树市', '220100', '10');
INSERT INTO `cmswing_area` VALUES ('220183', '德惠市', '220100', '11');
INSERT INTO `cmswing_area` VALUES ('220201', '市辖区', '220200', '1');
INSERT INTO `cmswing_area` VALUES ('220202', '昌邑区', '220200', '2');
INSERT INTO `cmswing_area` VALUES ('220203', '龙潭区', '220200', '3');
INSERT INTO `cmswing_area` VALUES ('220204', '船营区', '220200', '4');
INSERT INTO `cmswing_area` VALUES ('220211', '丰满区', '220200', '5');
INSERT INTO `cmswing_area` VALUES ('220221', '永吉县', '220200', '6');
INSERT INTO `cmswing_area` VALUES ('220281', '蛟河市', '220200', '7');
INSERT INTO `cmswing_area` VALUES ('220282', '桦甸市', '220200', '8');
INSERT INTO `cmswing_area` VALUES ('220283', '舒兰市', '220200', '9');
INSERT INTO `cmswing_area` VALUES ('220284', '磐石市', '220200', '10');
INSERT INTO `cmswing_area` VALUES ('220301', '市辖区', '220300', '1');
INSERT INTO `cmswing_area` VALUES ('220302', '铁西区', '220300', '2');
INSERT INTO `cmswing_area` VALUES ('220303', '铁东区', '220300', '3');
INSERT INTO `cmswing_area` VALUES ('220322', '梨树县', '220300', '4');
INSERT INTO `cmswing_area` VALUES ('220323', '伊通满族自治县', '220300', '5');
INSERT INTO `cmswing_area` VALUES ('220381', '公主岭市', '220300', '6');
INSERT INTO `cmswing_area` VALUES ('220382', '双辽市', '220300', '7');
INSERT INTO `cmswing_area` VALUES ('220401', '市辖区', '220400', '1');
INSERT INTO `cmswing_area` VALUES ('220402', '龙山区', '220400', '2');
INSERT INTO `cmswing_area` VALUES ('220403', '西安区', '220400', '3');
INSERT INTO `cmswing_area` VALUES ('220421', '东丰县', '220400', '4');
INSERT INTO `cmswing_area` VALUES ('220422', '东辽县', '220400', '5');
INSERT INTO `cmswing_area` VALUES ('220501', '市辖区', '220500', '1');
INSERT INTO `cmswing_area` VALUES ('220502', '东昌区', '220500', '2');
INSERT INTO `cmswing_area` VALUES ('220503', '二道江区', '220500', '3');
INSERT INTO `cmswing_area` VALUES ('220521', '通化县', '220500', '4');
INSERT INTO `cmswing_area` VALUES ('220523', '辉南县', '220500', '5');
INSERT INTO `cmswing_area` VALUES ('220524', '柳河县', '220500', '6');
INSERT INTO `cmswing_area` VALUES ('220581', '梅河口市', '220500', '7');
INSERT INTO `cmswing_area` VALUES ('220582', '集安市', '220500', '8');
INSERT INTO `cmswing_area` VALUES ('220601', '市辖区', '220600', '1');
INSERT INTO `cmswing_area` VALUES ('220602', '八道江区', '220600', '2');
INSERT INTO `cmswing_area` VALUES ('220621', '抚松县', '220600', '3');
INSERT INTO `cmswing_area` VALUES ('220622', '靖宇县', '220600', '4');
INSERT INTO `cmswing_area` VALUES ('220623', '长白朝鲜族自治县', '220600', '5');
INSERT INTO `cmswing_area` VALUES ('220625', '江源县', '220600', '6');
INSERT INTO `cmswing_area` VALUES ('220681', '临江市', '220600', '7');
INSERT INTO `cmswing_area` VALUES ('220701', '市辖区', '220700', '1');
INSERT INTO `cmswing_area` VALUES ('220702', '宁江区', '220700', '2');
INSERT INTO `cmswing_area` VALUES ('220721', '前郭尔罗斯蒙古族自治县', '220700', '3');
INSERT INTO `cmswing_area` VALUES ('220722', '长岭县', '220700', '4');
INSERT INTO `cmswing_area` VALUES ('220723', '乾安县', '220700', '5');
INSERT INTO `cmswing_area` VALUES ('220724', '扶余县', '220700', '6');
INSERT INTO `cmswing_area` VALUES ('220801', '市辖区', '220800', '1');
INSERT INTO `cmswing_area` VALUES ('220802', '洮北区', '220800', '2');
INSERT INTO `cmswing_area` VALUES ('220821', '镇赉县', '220800', '3');
INSERT INTO `cmswing_area` VALUES ('220822', '通榆县', '220800', '4');
INSERT INTO `cmswing_area` VALUES ('220881', '洮南市', '220800', '5');
INSERT INTO `cmswing_area` VALUES ('220882', '大安市', '220800', '6');
INSERT INTO `cmswing_area` VALUES ('222401', '延吉市', '222400', '1');
INSERT INTO `cmswing_area` VALUES ('222402', '图们市', '222400', '2');
INSERT INTO `cmswing_area` VALUES ('222403', '敦化市', '222400', '3');
INSERT INTO `cmswing_area` VALUES ('222404', '珲春市', '222400', '4');
INSERT INTO `cmswing_area` VALUES ('222405', '龙井市', '222400', '5');
INSERT INTO `cmswing_area` VALUES ('222406', '和龙市', '222400', '6');
INSERT INTO `cmswing_area` VALUES ('222424', '汪清县', '222400', '7');
INSERT INTO `cmswing_area` VALUES ('222426', '安图县', '222400', '8');
INSERT INTO `cmswing_area` VALUES ('230101', '市辖区', '230100', '1');
INSERT INTO `cmswing_area` VALUES ('230102', '道里区', '230100', '2');
INSERT INTO `cmswing_area` VALUES ('230103', '南岗区', '230100', '3');
INSERT INTO `cmswing_area` VALUES ('230104', '道外区', '230100', '4');
INSERT INTO `cmswing_area` VALUES ('230106', '香坊区', '230100', '5');
INSERT INTO `cmswing_area` VALUES ('230107', '动力区', '230100', '6');
INSERT INTO `cmswing_area` VALUES ('230108', '平房区', '230100', '7');
INSERT INTO `cmswing_area` VALUES ('230109', '松北区', '230100', '8');
INSERT INTO `cmswing_area` VALUES ('230111', '呼兰区', '230100', '9');
INSERT INTO `cmswing_area` VALUES ('230123', '依兰县', '230100', '10');
INSERT INTO `cmswing_area` VALUES ('230124', '方正县', '230100', '11');
INSERT INTO `cmswing_area` VALUES ('230125', '宾　县', '230100', '12');
INSERT INTO `cmswing_area` VALUES ('230126', '巴彦县', '230100', '13');
INSERT INTO `cmswing_area` VALUES ('230127', '木兰县', '230100', '14');
INSERT INTO `cmswing_area` VALUES ('230128', '通河县', '230100', '15');
INSERT INTO `cmswing_area` VALUES ('230129', '延寿县', '230100', '16');
INSERT INTO `cmswing_area` VALUES ('230181', '阿城市', '230100', '17');
INSERT INTO `cmswing_area` VALUES ('230182', '双城市', '230100', '18');
INSERT INTO `cmswing_area` VALUES ('230183', '尚志市', '230100', '19');
INSERT INTO `cmswing_area` VALUES ('230184', '五常市', '230100', '20');
INSERT INTO `cmswing_area` VALUES ('230201', '市辖区', '230200', '1');
INSERT INTO `cmswing_area` VALUES ('230202', '龙沙区', '230200', '2');
INSERT INTO `cmswing_area` VALUES ('230203', '建华区', '230200', '3');
INSERT INTO `cmswing_area` VALUES ('230204', '铁锋区', '230200', '4');
INSERT INTO `cmswing_area` VALUES ('230205', '昂昂溪区', '230200', '5');
INSERT INTO `cmswing_area` VALUES ('230206', '富拉尔基区', '230200', '6');
INSERT INTO `cmswing_area` VALUES ('230207', '碾子山区', '230200', '7');
INSERT INTO `cmswing_area` VALUES ('230208', '梅里斯达斡尔族区', '230200', '8');
INSERT INTO `cmswing_area` VALUES ('230221', '龙江县', '230200', '9');
INSERT INTO `cmswing_area` VALUES ('230223', '依安县', '230200', '10');
INSERT INTO `cmswing_area` VALUES ('230224', '泰来县', '230200', '11');
INSERT INTO `cmswing_area` VALUES ('230225', '甘南县', '230200', '12');
INSERT INTO `cmswing_area` VALUES ('230227', '富裕县', '230200', '13');
INSERT INTO `cmswing_area` VALUES ('230229', '克山县', '230200', '14');
INSERT INTO `cmswing_area` VALUES ('230230', '克东县', '230200', '15');
INSERT INTO `cmswing_area` VALUES ('230231', '拜泉县', '230200', '16');
INSERT INTO `cmswing_area` VALUES ('230281', '讷河市', '230200', '17');
INSERT INTO `cmswing_area` VALUES ('230301', '市辖区', '230300', '1');
INSERT INTO `cmswing_area` VALUES ('230302', '鸡冠区', '230300', '2');
INSERT INTO `cmswing_area` VALUES ('230303', '恒山区', '230300', '3');
INSERT INTO `cmswing_area` VALUES ('230304', '滴道区', '230300', '4');
INSERT INTO `cmswing_area` VALUES ('230305', '梨树区', '230300', '5');
INSERT INTO `cmswing_area` VALUES ('230306', '城子河区', '230300', '6');
INSERT INTO `cmswing_area` VALUES ('230307', '麻山区', '230300', '7');
INSERT INTO `cmswing_area` VALUES ('230321', '鸡东县', '230300', '8');
INSERT INTO `cmswing_area` VALUES ('230381', '虎林市', '230300', '9');
INSERT INTO `cmswing_area` VALUES ('230382', '密山市', '230300', '10');
INSERT INTO `cmswing_area` VALUES ('230401', '市辖区', '230400', '1');
INSERT INTO `cmswing_area` VALUES ('230402', '向阳区', '230400', '2');
INSERT INTO `cmswing_area` VALUES ('230403', '工农区', '230400', '3');
INSERT INTO `cmswing_area` VALUES ('230404', '南山区', '230400', '4');
INSERT INTO `cmswing_area` VALUES ('230405', '兴安区', '230400', '5');
INSERT INTO `cmswing_area` VALUES ('230406', '东山区', '230400', '6');
INSERT INTO `cmswing_area` VALUES ('230407', '兴山区', '230400', '7');
INSERT INTO `cmswing_area` VALUES ('230421', '萝北县', '230400', '8');
INSERT INTO `cmswing_area` VALUES ('230422', '绥滨县', '230400', '9');
INSERT INTO `cmswing_area` VALUES ('230501', '市辖区', '230500', '1');
INSERT INTO `cmswing_area` VALUES ('230502', '尖山区', '230500', '2');
INSERT INTO `cmswing_area` VALUES ('230503', '岭东区', '230500', '3');
INSERT INTO `cmswing_area` VALUES ('230505', '四方台区', '230500', '4');
INSERT INTO `cmswing_area` VALUES ('230506', '宝山区', '230500', '5');
INSERT INTO `cmswing_area` VALUES ('230521', '集贤县', '230500', '6');
INSERT INTO `cmswing_area` VALUES ('230522', '友谊县', '230500', '7');
INSERT INTO `cmswing_area` VALUES ('230523', '宝清县', '230500', '8');
INSERT INTO `cmswing_area` VALUES ('230524', '饶河县', '230500', '9');
INSERT INTO `cmswing_area` VALUES ('230601', '市辖区', '230600', '1');
INSERT INTO `cmswing_area` VALUES ('230602', '萨尔图区', '230600', '2');
INSERT INTO `cmswing_area` VALUES ('230603', '龙凤区', '230600', '3');
INSERT INTO `cmswing_area` VALUES ('230604', '让胡路区', '230600', '4');
INSERT INTO `cmswing_area` VALUES ('230605', '红岗区', '230600', '5');
INSERT INTO `cmswing_area` VALUES ('230606', '大同区', '230600', '6');
INSERT INTO `cmswing_area` VALUES ('230621', '肇州县', '230600', '7');
INSERT INTO `cmswing_area` VALUES ('230622', '肇源县', '230600', '8');
INSERT INTO `cmswing_area` VALUES ('230623', '林甸县', '230600', '9');
INSERT INTO `cmswing_area` VALUES ('230624', '杜尔伯特蒙古族自治县', '230600', '10');
INSERT INTO `cmswing_area` VALUES ('230701', '市辖区', '230700', '1');
INSERT INTO `cmswing_area` VALUES ('230702', '伊春区', '230700', '2');
INSERT INTO `cmswing_area` VALUES ('230703', '南岔区', '230700', '3');
INSERT INTO `cmswing_area` VALUES ('230704', '友好区', '230700', '4');
INSERT INTO `cmswing_area` VALUES ('230705', '西林区', '230700', '5');
INSERT INTO `cmswing_area` VALUES ('230706', '翠峦区', '230700', '6');
INSERT INTO `cmswing_area` VALUES ('230707', '新青区', '230700', '7');
INSERT INTO `cmswing_area` VALUES ('230708', '美溪区', '230700', '8');
INSERT INTO `cmswing_area` VALUES ('230709', '金山屯区', '230700', '9');
INSERT INTO `cmswing_area` VALUES ('230710', '五营区', '230700', '10');
INSERT INTO `cmswing_area` VALUES ('230711', '乌马河区', '230700', '11');
INSERT INTO `cmswing_area` VALUES ('230712', '汤旺河区', '230700', '12');
INSERT INTO `cmswing_area` VALUES ('230713', '带岭区', '230700', '13');
INSERT INTO `cmswing_area` VALUES ('230714', '乌伊岭区', '230700', '14');
INSERT INTO `cmswing_area` VALUES ('230715', '红星区', '230700', '15');
INSERT INTO `cmswing_area` VALUES ('230716', '上甘岭区', '230700', '16');
INSERT INTO `cmswing_area` VALUES ('230722', '嘉荫县', '230700', '17');
INSERT INTO `cmswing_area` VALUES ('230781', '铁力市', '230700', '18');
INSERT INTO `cmswing_area` VALUES ('230801', '市辖区', '230800', '1');
INSERT INTO `cmswing_area` VALUES ('230802', '永红区', '230800', '2');
INSERT INTO `cmswing_area` VALUES ('230803', '向阳区', '230800', '3');
INSERT INTO `cmswing_area` VALUES ('230804', '前进区', '230800', '4');
INSERT INTO `cmswing_area` VALUES ('230805', '东风区', '230800', '5');
INSERT INTO `cmswing_area` VALUES ('230811', '郊　区', '230800', '6');
INSERT INTO `cmswing_area` VALUES ('230822', '桦南县', '230800', '7');
INSERT INTO `cmswing_area` VALUES ('230826', '桦川县', '230800', '8');
INSERT INTO `cmswing_area` VALUES ('230828', '汤原县', '230800', '9');
INSERT INTO `cmswing_area` VALUES ('230833', '抚远县', '230800', '10');
INSERT INTO `cmswing_area` VALUES ('230881', '同江市', '230800', '11');
INSERT INTO `cmswing_area` VALUES ('230882', '富锦市', '230800', '12');
INSERT INTO `cmswing_area` VALUES ('230901', '市辖区', '230900', '1');
INSERT INTO `cmswing_area` VALUES ('230902', '新兴区', '230900', '2');
INSERT INTO `cmswing_area` VALUES ('230903', '桃山区', '230900', '3');
INSERT INTO `cmswing_area` VALUES ('230904', '茄子河区', '230900', '4');
INSERT INTO `cmswing_area` VALUES ('230921', '勃利县', '230900', '5');
INSERT INTO `cmswing_area` VALUES ('231001', '市辖区', '231000', '1');
INSERT INTO `cmswing_area` VALUES ('231002', '东安区', '231000', '2');
INSERT INTO `cmswing_area` VALUES ('231003', '阳明区', '231000', '3');
INSERT INTO `cmswing_area` VALUES ('231004', '爱民区', '231000', '4');
INSERT INTO `cmswing_area` VALUES ('231005', '西安区', '231000', '5');
INSERT INTO `cmswing_area` VALUES ('231024', '东宁县', '231000', '6');
INSERT INTO `cmswing_area` VALUES ('231025', '林口县', '231000', '7');
INSERT INTO `cmswing_area` VALUES ('231081', '绥芬河市', '231000', '8');
INSERT INTO `cmswing_area` VALUES ('231083', '海林市', '231000', '9');
INSERT INTO `cmswing_area` VALUES ('231084', '宁安市', '231000', '10');
INSERT INTO `cmswing_area` VALUES ('231085', '穆棱市', '231000', '11');
INSERT INTO `cmswing_area` VALUES ('231101', '市辖区', '231100', '1');
INSERT INTO `cmswing_area` VALUES ('231102', '爱辉区', '231100', '2');
INSERT INTO `cmswing_area` VALUES ('231121', '嫩江县', '231100', '3');
INSERT INTO `cmswing_area` VALUES ('231123', '逊克县', '231100', '4');
INSERT INTO `cmswing_area` VALUES ('231124', '孙吴县', '231100', '5');
INSERT INTO `cmswing_area` VALUES ('231181', '北安市', '231100', '6');
INSERT INTO `cmswing_area` VALUES ('231182', '五大连池市', '231100', '7');
INSERT INTO `cmswing_area` VALUES ('231201', '市辖区', '231200', '1');
INSERT INTO `cmswing_area` VALUES ('231202', '北林区', '231200', '2');
INSERT INTO `cmswing_area` VALUES ('231221', '望奎县', '231200', '3');
INSERT INTO `cmswing_area` VALUES ('231222', '兰西县', '231200', '4');
INSERT INTO `cmswing_area` VALUES ('231223', '青冈县', '231200', '5');
INSERT INTO `cmswing_area` VALUES ('231224', '庆安县', '231200', '6');
INSERT INTO `cmswing_area` VALUES ('231225', '明水县', '231200', '7');
INSERT INTO `cmswing_area` VALUES ('231226', '绥棱县', '231200', '8');
INSERT INTO `cmswing_area` VALUES ('231281', '安达市', '231200', '9');
INSERT INTO `cmswing_area` VALUES ('231282', '肇东市', '231200', '10');
INSERT INTO `cmswing_area` VALUES ('231283', '海伦市', '231200', '11');
INSERT INTO `cmswing_area` VALUES ('232721', '呼玛县', '232700', '1');
INSERT INTO `cmswing_area` VALUES ('232722', '塔河县', '232700', '2');
INSERT INTO `cmswing_area` VALUES ('232723', '漠河县', '232700', '3');
INSERT INTO `cmswing_area` VALUES ('310101', '黄浦区', '310100', '1');
INSERT INTO `cmswing_area` VALUES ('310103', '卢湾区', '310100', '2');
INSERT INTO `cmswing_area` VALUES ('310104', '徐汇区', '310100', '3');
INSERT INTO `cmswing_area` VALUES ('310105', '长宁区', '310100', '4');
INSERT INTO `cmswing_area` VALUES ('310106', '静安区', '310100', '5');
INSERT INTO `cmswing_area` VALUES ('310107', '普陀区', '310100', '6');
INSERT INTO `cmswing_area` VALUES ('310108', '闸北区', '310100', '7');
INSERT INTO `cmswing_area` VALUES ('310109', '虹口区', '310100', '8');
INSERT INTO `cmswing_area` VALUES ('310110', '杨浦区', '310100', '9');
INSERT INTO `cmswing_area` VALUES ('310112', '闵行区', '310100', '10');
INSERT INTO `cmswing_area` VALUES ('310113', '宝山区', '310100', '11');
INSERT INTO `cmswing_area` VALUES ('310114', '嘉定区', '310100', '12');
INSERT INTO `cmswing_area` VALUES ('310115', '浦东新区', '310100', '13');
INSERT INTO `cmswing_area` VALUES ('310116', '金山区', '310100', '14');
INSERT INTO `cmswing_area` VALUES ('310117', '松江区', '310100', '15');
INSERT INTO `cmswing_area` VALUES ('310118', '青浦区', '310100', '16');
INSERT INTO `cmswing_area` VALUES ('310119', '南汇区', '310100', '17');
INSERT INTO `cmswing_area` VALUES ('310120', '奉贤区', '310100', '18');
INSERT INTO `cmswing_area` VALUES ('310230', '崇明县', '310200', '1');
INSERT INTO `cmswing_area` VALUES ('320101', '市辖区', '320100', '1');
INSERT INTO `cmswing_area` VALUES ('320102', '玄武区', '320100', '2');
INSERT INTO `cmswing_area` VALUES ('320103', '白下区', '320100', '3');
INSERT INTO `cmswing_area` VALUES ('320104', '秦淮区', '320100', '4');
INSERT INTO `cmswing_area` VALUES ('320105', '建邺区', '320100', '5');
INSERT INTO `cmswing_area` VALUES ('320106', '鼓楼区', '320100', '6');
INSERT INTO `cmswing_area` VALUES ('320107', '下关区', '320100', '7');
INSERT INTO `cmswing_area` VALUES ('320111', '浦口区', '320100', '8');
INSERT INTO `cmswing_area` VALUES ('320113', '栖霞区', '320100', '9');
INSERT INTO `cmswing_area` VALUES ('320114', '雨花台区', '320100', '10');
INSERT INTO `cmswing_area` VALUES ('320115', '江宁区', '320100', '11');
INSERT INTO `cmswing_area` VALUES ('320116', '六合区', '320100', '12');
INSERT INTO `cmswing_area` VALUES ('320124', '溧水县', '320100', '13');
INSERT INTO `cmswing_area` VALUES ('320125', '高淳县', '320100', '14');
INSERT INTO `cmswing_area` VALUES ('320201', '市辖区', '320200', '1');
INSERT INTO `cmswing_area` VALUES ('320202', '崇安区', '320200', '2');
INSERT INTO `cmswing_area` VALUES ('320203', '南长区', '320200', '3');
INSERT INTO `cmswing_area` VALUES ('320204', '北塘区', '320200', '4');
INSERT INTO `cmswing_area` VALUES ('320205', '锡山区', '320200', '5');
INSERT INTO `cmswing_area` VALUES ('320206', '惠山区', '320200', '6');
INSERT INTO `cmswing_area` VALUES ('320211', '滨湖区', '320200', '7');
INSERT INTO `cmswing_area` VALUES ('320281', '江阴市', '320200', '8');
INSERT INTO `cmswing_area` VALUES ('320282', '宜兴市', '320200', '9');
INSERT INTO `cmswing_area` VALUES ('320301', '市辖区', '320300', '1');
INSERT INTO `cmswing_area` VALUES ('320302', '鼓楼区', '320300', '2');
INSERT INTO `cmswing_area` VALUES ('320303', '云龙区', '320300', '3');
INSERT INTO `cmswing_area` VALUES ('320304', '九里区', '320300', '4');
INSERT INTO `cmswing_area` VALUES ('320305', '贾汪区', '320300', '5');
INSERT INTO `cmswing_area` VALUES ('320311', '泉山区', '320300', '6');
INSERT INTO `cmswing_area` VALUES ('320321', '丰　县', '320300', '7');
INSERT INTO `cmswing_area` VALUES ('320322', '沛　县', '320300', '8');
INSERT INTO `cmswing_area` VALUES ('320323', '铜山县', '320300', '9');
INSERT INTO `cmswing_area` VALUES ('320324', '睢宁县', '320300', '10');
INSERT INTO `cmswing_area` VALUES ('320381', '新沂市', '320300', '11');
INSERT INTO `cmswing_area` VALUES ('320382', '邳州市', '320300', '12');
INSERT INTO `cmswing_area` VALUES ('320401', '市辖区', '320400', '1');
INSERT INTO `cmswing_area` VALUES ('320402', '天宁区', '320400', '2');
INSERT INTO `cmswing_area` VALUES ('320404', '钟楼区', '320400', '3');
INSERT INTO `cmswing_area` VALUES ('320405', '戚墅堰区', '320400', '4');
INSERT INTO `cmswing_area` VALUES ('320411', '新北区', '320400', '5');
INSERT INTO `cmswing_area` VALUES ('320412', '武进区', '320400', '6');
INSERT INTO `cmswing_area` VALUES ('320481', '溧阳市', '320400', '7');
INSERT INTO `cmswing_area` VALUES ('320482', '金坛市', '320400', '8');
INSERT INTO `cmswing_area` VALUES ('320501', '市辖区', '320500', '1');
INSERT INTO `cmswing_area` VALUES ('320502', '沧浪区', '320500', '2');
INSERT INTO `cmswing_area` VALUES ('320503', '平江区', '320500', '3');
INSERT INTO `cmswing_area` VALUES ('320504', '金阊区', '320500', '4');
INSERT INTO `cmswing_area` VALUES ('320505', '虎丘区', '320500', '5');
INSERT INTO `cmswing_area` VALUES ('320506', '吴中区', '320500', '6');
INSERT INTO `cmswing_area` VALUES ('320507', '相城区', '320500', '7');
INSERT INTO `cmswing_area` VALUES ('320581', '常熟市', '320500', '8');
INSERT INTO `cmswing_area` VALUES ('320582', '张家港市', '320500', '9');
INSERT INTO `cmswing_area` VALUES ('320583', '昆山市', '320500', '10');
INSERT INTO `cmswing_area` VALUES ('320584', '吴江市', '320500', '11');
INSERT INTO `cmswing_area` VALUES ('320585', '太仓市', '320500', '12');
INSERT INTO `cmswing_area` VALUES ('320601', '市辖区', '320600', '1');
INSERT INTO `cmswing_area` VALUES ('320602', '崇川区', '320600', '2');
INSERT INTO `cmswing_area` VALUES ('320611', '港闸区', '320600', '3');
INSERT INTO `cmswing_area` VALUES ('320621', '海安县', '320600', '4');
INSERT INTO `cmswing_area` VALUES ('320623', '如东县', '320600', '5');
INSERT INTO `cmswing_area` VALUES ('320681', '启东市', '320600', '6');
INSERT INTO `cmswing_area` VALUES ('320682', '如皋市', '320600', '7');
INSERT INTO `cmswing_area` VALUES ('320683', '通州市', '320600', '8');
INSERT INTO `cmswing_area` VALUES ('320684', '海门市', '320600', '9');
INSERT INTO `cmswing_area` VALUES ('320701', '市辖区', '320700', '1');
INSERT INTO `cmswing_area` VALUES ('320703', '连云区', '320700', '2');
INSERT INTO `cmswing_area` VALUES ('320705', '新浦区', '320700', '3');
INSERT INTO `cmswing_area` VALUES ('320706', '海州区', '320700', '4');
INSERT INTO `cmswing_area` VALUES ('320721', '赣榆县', '320700', '5');
INSERT INTO `cmswing_area` VALUES ('320722', '东海县', '320700', '6');
INSERT INTO `cmswing_area` VALUES ('320723', '灌云县', '320700', '7');
INSERT INTO `cmswing_area` VALUES ('320724', '灌南县', '320700', '8');
INSERT INTO `cmswing_area` VALUES ('320801', '市辖区', '320800', '1');
INSERT INTO `cmswing_area` VALUES ('320802', '清河区', '320800', '2');
INSERT INTO `cmswing_area` VALUES ('320803', '楚州区', '320800', '3');
INSERT INTO `cmswing_area` VALUES ('320804', '淮阴区', '320800', '4');
INSERT INTO `cmswing_area` VALUES ('320811', '清浦区', '320800', '5');
INSERT INTO `cmswing_area` VALUES ('320826', '涟水县', '320800', '6');
INSERT INTO `cmswing_area` VALUES ('320829', '洪泽县', '320800', '7');
INSERT INTO `cmswing_area` VALUES ('320830', '盱眙县', '320800', '8');
INSERT INTO `cmswing_area` VALUES ('320831', '金湖县', '320800', '9');
INSERT INTO `cmswing_area` VALUES ('320901', '市辖区', '320900', '1');
INSERT INTO `cmswing_area` VALUES ('320902', '亭湖区', '320900', '2');
INSERT INTO `cmswing_area` VALUES ('320903', '盐都区', '320900', '3');
INSERT INTO `cmswing_area` VALUES ('320921', '响水县', '320900', '4');
INSERT INTO `cmswing_area` VALUES ('320922', '滨海县', '320900', '5');
INSERT INTO `cmswing_area` VALUES ('320923', '阜宁县', '320900', '6');
INSERT INTO `cmswing_area` VALUES ('320924', '射阳县', '320900', '7');
INSERT INTO `cmswing_area` VALUES ('320925', '建湖县', '320900', '8');
INSERT INTO `cmswing_area` VALUES ('320981', '东台市', '320900', '9');
INSERT INTO `cmswing_area` VALUES ('320982', '大丰市', '320900', '10');
INSERT INTO `cmswing_area` VALUES ('321001', '市辖区', '321000', '1');
INSERT INTO `cmswing_area` VALUES ('321002', '广陵区', '321000', '2');
INSERT INTO `cmswing_area` VALUES ('321003', '邗江区', '321000', '3');
INSERT INTO `cmswing_area` VALUES ('321011', '郊　区', '321000', '4');
INSERT INTO `cmswing_area` VALUES ('321023', '宝应县', '321000', '5');
INSERT INTO `cmswing_area` VALUES ('321081', '仪征市', '321000', '6');
INSERT INTO `cmswing_area` VALUES ('321084', '高邮市', '321000', '7');
INSERT INTO `cmswing_area` VALUES ('321088', '江都市', '321000', '8');
INSERT INTO `cmswing_area` VALUES ('321101', '市辖区', '321100', '1');
INSERT INTO `cmswing_area` VALUES ('321102', '京口区', '321100', '2');
INSERT INTO `cmswing_area` VALUES ('321111', '润州区', '321100', '3');
INSERT INTO `cmswing_area` VALUES ('321112', '丹徒区', '321100', '4');
INSERT INTO `cmswing_area` VALUES ('321181', '丹阳市', '321100', '5');
INSERT INTO `cmswing_area` VALUES ('321182', '扬中市', '321100', '6');
INSERT INTO `cmswing_area` VALUES ('321183', '句容市', '321100', '7');
INSERT INTO `cmswing_area` VALUES ('321201', '市辖区', '321200', '1');
INSERT INTO `cmswing_area` VALUES ('321202', '海陵区', '321200', '2');
INSERT INTO `cmswing_area` VALUES ('321203', '高港区', '321200', '3');
INSERT INTO `cmswing_area` VALUES ('321281', '兴化市', '321200', '4');
INSERT INTO `cmswing_area` VALUES ('321282', '靖江市', '321200', '5');
INSERT INTO `cmswing_area` VALUES ('321283', '泰兴市', '321200', '6');
INSERT INTO `cmswing_area` VALUES ('321284', '姜堰市', '321200', '7');
INSERT INTO `cmswing_area` VALUES ('321301', '市辖区', '321300', '1');
INSERT INTO `cmswing_area` VALUES ('321302', '宿城区', '321300', '2');
INSERT INTO `cmswing_area` VALUES ('321311', '宿豫区', '321300', '3');
INSERT INTO `cmswing_area` VALUES ('321322', '沭阳县', '321300', '4');
INSERT INTO `cmswing_area` VALUES ('321323', '泗阳县', '321300', '5');
INSERT INTO `cmswing_area` VALUES ('321324', '泗洪县', '321300', '6');
INSERT INTO `cmswing_area` VALUES ('330101', '市辖区', '330100', '1');
INSERT INTO `cmswing_area` VALUES ('330102', '上城区', '330100', '2');
INSERT INTO `cmswing_area` VALUES ('330103', '下城区', '330100', '3');
INSERT INTO `cmswing_area` VALUES ('330104', '江干区', '330100', '4');
INSERT INTO `cmswing_area` VALUES ('330105', '拱墅区', '330100', '5');
INSERT INTO `cmswing_area` VALUES ('330106', '西湖区', '330100', '6');
INSERT INTO `cmswing_area` VALUES ('330108', '滨江区', '330100', '7');
INSERT INTO `cmswing_area` VALUES ('330109', '萧山区', '330100', '8');
INSERT INTO `cmswing_area` VALUES ('330110', '余杭区', '330100', '9');
INSERT INTO `cmswing_area` VALUES ('330122', '桐庐县', '330100', '10');
INSERT INTO `cmswing_area` VALUES ('330127', '淳安县', '330100', '11');
INSERT INTO `cmswing_area` VALUES ('330182', '建德市', '330100', '12');
INSERT INTO `cmswing_area` VALUES ('330183', '富阳市', '330100', '13');
INSERT INTO `cmswing_area` VALUES ('330185', '临安市', '330100', '14');
INSERT INTO `cmswing_area` VALUES ('330201', '市辖区', '330200', '1');
INSERT INTO `cmswing_area` VALUES ('330203', '海曙区', '330200', '2');
INSERT INTO `cmswing_area` VALUES ('330204', '江东区', '330200', '3');
INSERT INTO `cmswing_area` VALUES ('330205', '江北区', '330200', '4');
INSERT INTO `cmswing_area` VALUES ('330206', '北仑区', '330200', '5');
INSERT INTO `cmswing_area` VALUES ('330211', '镇海区', '330200', '6');
INSERT INTO `cmswing_area` VALUES ('330212', '鄞州区', '330200', '7');
INSERT INTO `cmswing_area` VALUES ('330225', '象山县', '330200', '8');
INSERT INTO `cmswing_area` VALUES ('330226', '宁海县', '330200', '9');
INSERT INTO `cmswing_area` VALUES ('330281', '余姚市', '330200', '10');
INSERT INTO `cmswing_area` VALUES ('330282', '慈溪市', '330200', '11');
INSERT INTO `cmswing_area` VALUES ('330283', '奉化市', '330200', '12');
INSERT INTO `cmswing_area` VALUES ('330301', '市辖区', '330300', '1');
INSERT INTO `cmswing_area` VALUES ('330302', '鹿城区', '330300', '2');
INSERT INTO `cmswing_area` VALUES ('330303', '龙湾区', '330300', '3');
INSERT INTO `cmswing_area` VALUES ('330304', '瓯海区', '330300', '4');
INSERT INTO `cmswing_area` VALUES ('330322', '洞头县', '330300', '5');
INSERT INTO `cmswing_area` VALUES ('330324', '永嘉县', '330300', '6');
INSERT INTO `cmswing_area` VALUES ('330326', '平阳县', '330300', '7');
INSERT INTO `cmswing_area` VALUES ('330327', '苍南县', '330300', '8');
INSERT INTO `cmswing_area` VALUES ('330328', '文成县', '330300', '9');
INSERT INTO `cmswing_area` VALUES ('330329', '泰顺县', '330300', '10');
INSERT INTO `cmswing_area` VALUES ('330381', '瑞安市', '330300', '11');
INSERT INTO `cmswing_area` VALUES ('330382', '乐清市', '330300', '12');
INSERT INTO `cmswing_area` VALUES ('330401', '市辖区', '330400', '1');
INSERT INTO `cmswing_area` VALUES ('330402', '秀城区', '330400', '2');
INSERT INTO `cmswing_area` VALUES ('330411', '秀洲区', '330400', '3');
INSERT INTO `cmswing_area` VALUES ('330421', '嘉善县', '330400', '4');
INSERT INTO `cmswing_area` VALUES ('330424', '海盐县', '330400', '5');
INSERT INTO `cmswing_area` VALUES ('330481', '海宁市', '330400', '6');
INSERT INTO `cmswing_area` VALUES ('330482', '平湖市', '330400', '7');
INSERT INTO `cmswing_area` VALUES ('330483', '桐乡市', '330400', '8');
INSERT INTO `cmswing_area` VALUES ('330501', '市辖区', '330500', '1');
INSERT INTO `cmswing_area` VALUES ('330502', '吴兴区', '330500', '2');
INSERT INTO `cmswing_area` VALUES ('330503', '南浔区', '330500', '3');
INSERT INTO `cmswing_area` VALUES ('330521', '德清县', '330500', '4');
INSERT INTO `cmswing_area` VALUES ('330522', '长兴县', '330500', '5');
INSERT INTO `cmswing_area` VALUES ('330523', '安吉县', '330500', '6');
INSERT INTO `cmswing_area` VALUES ('330601', '市辖区', '330600', '1');
INSERT INTO `cmswing_area` VALUES ('330602', '越城区', '330600', '2');
INSERT INTO `cmswing_area` VALUES ('330621', '绍兴县', '330600', '3');
INSERT INTO `cmswing_area` VALUES ('330624', '新昌县', '330600', '4');
INSERT INTO `cmswing_area` VALUES ('330681', '诸暨市', '330600', '5');
INSERT INTO `cmswing_area` VALUES ('330682', '上虞市', '330600', '6');
INSERT INTO `cmswing_area` VALUES ('330683', '嵊州市', '330600', '7');
INSERT INTO `cmswing_area` VALUES ('330701', '市辖区', '330700', '1');
INSERT INTO `cmswing_area` VALUES ('330702', '婺城区', '330700', '2');
INSERT INTO `cmswing_area` VALUES ('330703', '金东区', '330700', '3');
INSERT INTO `cmswing_area` VALUES ('330723', '武义县', '330700', '4');
INSERT INTO `cmswing_area` VALUES ('330726', '浦江县', '330700', '5');
INSERT INTO `cmswing_area` VALUES ('330727', '磐安县', '330700', '6');
INSERT INTO `cmswing_area` VALUES ('330781', '兰溪市', '330700', '7');
INSERT INTO `cmswing_area` VALUES ('330782', '义乌市', '330700', '8');
INSERT INTO `cmswing_area` VALUES ('330783', '东阳市', '330700', '9');
INSERT INTO `cmswing_area` VALUES ('330784', '永康市', '330700', '10');
INSERT INTO `cmswing_area` VALUES ('330801', '市辖区', '330800', '1');
INSERT INTO `cmswing_area` VALUES ('330802', '柯城区', '330800', '2');
INSERT INTO `cmswing_area` VALUES ('330803', '衢江区', '330800', '3');
INSERT INTO `cmswing_area` VALUES ('330822', '常山县', '330800', '4');
INSERT INTO `cmswing_area` VALUES ('330824', '开化县', '330800', '5');
INSERT INTO `cmswing_area` VALUES ('330825', '龙游县', '330800', '6');
INSERT INTO `cmswing_area` VALUES ('330881', '江山市', '330800', '7');
INSERT INTO `cmswing_area` VALUES ('330901', '市辖区', '330900', '1');
INSERT INTO `cmswing_area` VALUES ('330902', '定海区', '330900', '2');
INSERT INTO `cmswing_area` VALUES ('330903', '普陀区', '330900', '3');
INSERT INTO `cmswing_area` VALUES ('330921', '岱山县', '330900', '4');
INSERT INTO `cmswing_area` VALUES ('330922', '嵊泗县', '330900', '5');
INSERT INTO `cmswing_area` VALUES ('331001', '市辖区', '331000', '1');
INSERT INTO `cmswing_area` VALUES ('331002', '椒江区', '331000', '2');
INSERT INTO `cmswing_area` VALUES ('331003', '黄岩区', '331000', '3');
INSERT INTO `cmswing_area` VALUES ('331004', '路桥区', '331000', '4');
INSERT INTO `cmswing_area` VALUES ('331021', '玉环县', '331000', '5');
INSERT INTO `cmswing_area` VALUES ('331022', '三门县', '331000', '6');
INSERT INTO `cmswing_area` VALUES ('331023', '天台县', '331000', '7');
INSERT INTO `cmswing_area` VALUES ('331024', '仙居县', '331000', '8');
INSERT INTO `cmswing_area` VALUES ('331081', '温岭市', '331000', '9');
INSERT INTO `cmswing_area` VALUES ('331082', '临海市', '331000', '10');
INSERT INTO `cmswing_area` VALUES ('331101', '市辖区', '331100', '1');
INSERT INTO `cmswing_area` VALUES ('331102', '莲都区', '331100', '2');
INSERT INTO `cmswing_area` VALUES ('331121', '青田县', '331100', '3');
INSERT INTO `cmswing_area` VALUES ('331122', '缙云县', '331100', '4');
INSERT INTO `cmswing_area` VALUES ('331123', '遂昌县', '331100', '5');
INSERT INTO `cmswing_area` VALUES ('331124', '松阳县', '331100', '6');
INSERT INTO `cmswing_area` VALUES ('331125', '云和县', '331100', '7');
INSERT INTO `cmswing_area` VALUES ('331126', '庆元县', '331100', '8');
INSERT INTO `cmswing_area` VALUES ('331127', '景宁畲族自治县', '331100', '9');
INSERT INTO `cmswing_area` VALUES ('331181', '龙泉市', '331100', '10');
INSERT INTO `cmswing_area` VALUES ('340101', '市辖区', '340100', '1');
INSERT INTO `cmswing_area` VALUES ('340102', '瑶海区', '340100', '2');
INSERT INTO `cmswing_area` VALUES ('340103', '庐阳区', '340100', '3');
INSERT INTO `cmswing_area` VALUES ('340104', '蜀山区', '340100', '4');
INSERT INTO `cmswing_area` VALUES ('340111', '包河区', '340100', '5');
INSERT INTO `cmswing_area` VALUES ('340121', '长丰县', '340100', '6');
INSERT INTO `cmswing_area` VALUES ('340122', '肥东县', '340100', '7');
INSERT INTO `cmswing_area` VALUES ('340123', '肥西县', '340100', '8');
INSERT INTO `cmswing_area` VALUES ('340201', '市辖区', '340200', '1');
INSERT INTO `cmswing_area` VALUES ('340202', '镜湖区', '340200', '2');
INSERT INTO `cmswing_area` VALUES ('340203', '马塘区', '340200', '3');
INSERT INTO `cmswing_area` VALUES ('340204', '新芜区', '340200', '4');
INSERT INTO `cmswing_area` VALUES ('340207', '鸠江区', '340200', '5');
INSERT INTO `cmswing_area` VALUES ('340221', '芜湖县', '340200', '6');
INSERT INTO `cmswing_area` VALUES ('340222', '繁昌县', '340200', '7');
INSERT INTO `cmswing_area` VALUES ('340223', '南陵县', '340200', '8');
INSERT INTO `cmswing_area` VALUES ('340301', '市辖区', '340300', '1');
INSERT INTO `cmswing_area` VALUES ('340302', '龙子湖区', '340300', '2');
INSERT INTO `cmswing_area` VALUES ('340303', '蚌山区', '340300', '3');
INSERT INTO `cmswing_area` VALUES ('340304', '禹会区', '340300', '4');
INSERT INTO `cmswing_area` VALUES ('340311', '淮上区', '340300', '5');
INSERT INTO `cmswing_area` VALUES ('340321', '怀远县', '340300', '6');
INSERT INTO `cmswing_area` VALUES ('340322', '五河县', '340300', '7');
INSERT INTO `cmswing_area` VALUES ('340323', '固镇县', '340300', '8');
INSERT INTO `cmswing_area` VALUES ('340401', '市辖区', '340400', '1');
INSERT INTO `cmswing_area` VALUES ('340402', '大通区', '340400', '2');
INSERT INTO `cmswing_area` VALUES ('340403', '田家庵区', '340400', '3');
INSERT INTO `cmswing_area` VALUES ('340404', '谢家集区', '340400', '4');
INSERT INTO `cmswing_area` VALUES ('340405', '八公山区', '340400', '5');
INSERT INTO `cmswing_area` VALUES ('340406', '潘集区', '340400', '6');
INSERT INTO `cmswing_area` VALUES ('340421', '凤台县', '340400', '7');
INSERT INTO `cmswing_area` VALUES ('340501', '市辖区', '340500', '1');
INSERT INTO `cmswing_area` VALUES ('340502', '金家庄区', '340500', '2');
INSERT INTO `cmswing_area` VALUES ('340503', '花山区', '340500', '3');
INSERT INTO `cmswing_area` VALUES ('340504', '雨山区', '340500', '4');
INSERT INTO `cmswing_area` VALUES ('340521', '当涂县', '340500', '5');
INSERT INTO `cmswing_area` VALUES ('340601', '市辖区', '340600', '1');
INSERT INTO `cmswing_area` VALUES ('340602', '杜集区', '340600', '2');
INSERT INTO `cmswing_area` VALUES ('340603', '相山区', '340600', '3');
INSERT INTO `cmswing_area` VALUES ('340604', '烈山区', '340600', '4');
INSERT INTO `cmswing_area` VALUES ('340621', '濉溪县', '340600', '5');
INSERT INTO `cmswing_area` VALUES ('340701', '市辖区', '340700', '1');
INSERT INTO `cmswing_area` VALUES ('340702', '铜官山区', '340700', '2');
INSERT INTO `cmswing_area` VALUES ('340703', '狮子山区', '340700', '3');
INSERT INTO `cmswing_area` VALUES ('340711', '郊　区', '340700', '4');
INSERT INTO `cmswing_area` VALUES ('340721', '铜陵县', '340700', '5');
INSERT INTO `cmswing_area` VALUES ('340801', '市辖区', '340800', '1');
INSERT INTO `cmswing_area` VALUES ('340802', '迎江区', '340800', '2');
INSERT INTO `cmswing_area` VALUES ('340803', '大观区', '340800', '3');
INSERT INTO `cmswing_area` VALUES ('340811', '郊　区', '340800', '4');
INSERT INTO `cmswing_area` VALUES ('340822', '怀宁县', '340800', '5');
INSERT INTO `cmswing_area` VALUES ('340823', '枞阳县', '340800', '6');
INSERT INTO `cmswing_area` VALUES ('340824', '潜山县', '340800', '7');
INSERT INTO `cmswing_area` VALUES ('340825', '太湖县', '340800', '8');
INSERT INTO `cmswing_area` VALUES ('340826', '宿松县', '340800', '9');
INSERT INTO `cmswing_area` VALUES ('340827', '望江县', '340800', '10');
INSERT INTO `cmswing_area` VALUES ('340828', '岳西县', '340800', '11');
INSERT INTO `cmswing_area` VALUES ('340881', '桐城市', '340800', '12');
INSERT INTO `cmswing_area` VALUES ('341001', '市辖区', '341000', '1');
INSERT INTO `cmswing_area` VALUES ('341002', '屯溪区', '341000', '2');
INSERT INTO `cmswing_area` VALUES ('341003', '黄山区', '341000', '3');
INSERT INTO `cmswing_area` VALUES ('341004', '徽州区', '341000', '4');
INSERT INTO `cmswing_area` VALUES ('341021', '歙　县', '341000', '5');
INSERT INTO `cmswing_area` VALUES ('341022', '休宁县', '341000', '6');
INSERT INTO `cmswing_area` VALUES ('341023', '黟　县', '341000', '7');
INSERT INTO `cmswing_area` VALUES ('341024', '祁门县', '341000', '8');
INSERT INTO `cmswing_area` VALUES ('341101', '市辖区', '341100', '1');
INSERT INTO `cmswing_area` VALUES ('341102', '琅琊区', '341100', '2');
INSERT INTO `cmswing_area` VALUES ('341103', '南谯区', '341100', '3');
INSERT INTO `cmswing_area` VALUES ('341122', '来安县', '341100', '4');
INSERT INTO `cmswing_area` VALUES ('341124', '全椒县', '341100', '5');
INSERT INTO `cmswing_area` VALUES ('341125', '定远县', '341100', '6');
INSERT INTO `cmswing_area` VALUES ('341126', '凤阳县', '341100', '7');
INSERT INTO `cmswing_area` VALUES ('341181', '天长市', '341100', '8');
INSERT INTO `cmswing_area` VALUES ('341182', '明光市', '341100', '9');
INSERT INTO `cmswing_area` VALUES ('341201', '市辖区', '341200', '1');
INSERT INTO `cmswing_area` VALUES ('341202', '颍州区', '341200', '2');
INSERT INTO `cmswing_area` VALUES ('341203', '颍东区', '341200', '3');
INSERT INTO `cmswing_area` VALUES ('341204', '颍泉区', '341200', '4');
INSERT INTO `cmswing_area` VALUES ('341221', '临泉县', '341200', '5');
INSERT INTO `cmswing_area` VALUES ('341222', '太和县', '341200', '6');
INSERT INTO `cmswing_area` VALUES ('341225', '阜南县', '341200', '7');
INSERT INTO `cmswing_area` VALUES ('341226', '颍上县', '341200', '8');
INSERT INTO `cmswing_area` VALUES ('341282', '界首市', '341200', '9');
INSERT INTO `cmswing_area` VALUES ('341301', '市辖区', '341300', '1');
INSERT INTO `cmswing_area` VALUES ('341302', '墉桥区', '341300', '2');
INSERT INTO `cmswing_area` VALUES ('341321', '砀山县', '341300', '3');
INSERT INTO `cmswing_area` VALUES ('341322', '萧　县', '341300', '4');
INSERT INTO `cmswing_area` VALUES ('341323', '灵璧县', '341300', '5');
INSERT INTO `cmswing_area` VALUES ('341324', '泗　县', '341300', '6');
INSERT INTO `cmswing_area` VALUES ('341401', '庐江县', '340100', '9');
INSERT INTO `cmswing_area` VALUES ('341402', '巢湖市', '340100', '10');
INSERT INTO `cmswing_area` VALUES ('341422', '无为县', '340200', '9');
INSERT INTO `cmswing_area` VALUES ('341423', '含山县', '340500', '6');
INSERT INTO `cmswing_area` VALUES ('341424', '和　县', '340500', '7');
INSERT INTO `cmswing_area` VALUES ('341501', '市辖区', '341500', '1');
INSERT INTO `cmswing_area` VALUES ('341502', '金安区', '341500', '2');
INSERT INTO `cmswing_area` VALUES ('341503', '裕安区', '341500', '3');
INSERT INTO `cmswing_area` VALUES ('341521', '寿　县', '341500', '4');
INSERT INTO `cmswing_area` VALUES ('341522', '霍邱县', '341500', '5');
INSERT INTO `cmswing_area` VALUES ('341523', '舒城县', '341500', '6');
INSERT INTO `cmswing_area` VALUES ('341524', '金寨县', '341500', '7');
INSERT INTO `cmswing_area` VALUES ('341525', '霍山县', '341500', '8');
INSERT INTO `cmswing_area` VALUES ('341601', '市辖区', '341600', '1');
INSERT INTO `cmswing_area` VALUES ('341602', '谯城区', '341600', '2');
INSERT INTO `cmswing_area` VALUES ('341621', '涡阳县', '341600', '3');
INSERT INTO `cmswing_area` VALUES ('341622', '蒙城县', '341600', '4');
INSERT INTO `cmswing_area` VALUES ('341623', '利辛县', '341600', '5');
INSERT INTO `cmswing_area` VALUES ('341701', '市辖区', '341700', '1');
INSERT INTO `cmswing_area` VALUES ('341702', '贵池区', '341700', '2');
INSERT INTO `cmswing_area` VALUES ('341721', '东至县', '341700', '3');
INSERT INTO `cmswing_area` VALUES ('341722', '石台县', '341700', '4');
INSERT INTO `cmswing_area` VALUES ('341723', '青阳县', '341700', '5');
INSERT INTO `cmswing_area` VALUES ('341801', '市辖区', '341800', '1');
INSERT INTO `cmswing_area` VALUES ('341802', '宣州区', '341800', '2');
INSERT INTO `cmswing_area` VALUES ('341821', '郎溪县', '341800', '3');
INSERT INTO `cmswing_area` VALUES ('341822', '广德县', '341800', '4');
INSERT INTO `cmswing_area` VALUES ('341823', '泾　县', '341800', '5');
INSERT INTO `cmswing_area` VALUES ('341824', '绩溪县', '341800', '6');
INSERT INTO `cmswing_area` VALUES ('341825', '旌德县', '341800', '7');
INSERT INTO `cmswing_area` VALUES ('341881', '宁国市', '341800', '8');
INSERT INTO `cmswing_area` VALUES ('350101', '市辖区', '350100', '1');
INSERT INTO `cmswing_area` VALUES ('350102', '鼓楼区', '350100', '2');
INSERT INTO `cmswing_area` VALUES ('350103', '台江区', '350100', '3');
INSERT INTO `cmswing_area` VALUES ('350104', '仓山区', '350100', '4');
INSERT INTO `cmswing_area` VALUES ('350105', '马尾区', '350100', '5');
INSERT INTO `cmswing_area` VALUES ('350111', '晋安区', '350100', '6');
INSERT INTO `cmswing_area` VALUES ('350121', '闽侯县', '350100', '7');
INSERT INTO `cmswing_area` VALUES ('350122', '连江县', '350100', '8');
INSERT INTO `cmswing_area` VALUES ('350123', '罗源县', '350100', '9');
INSERT INTO `cmswing_area` VALUES ('350124', '闽清县', '350100', '10');
INSERT INTO `cmswing_area` VALUES ('350125', '永泰县', '350100', '11');
INSERT INTO `cmswing_area` VALUES ('350128', '平潭县', '350100', '12');
INSERT INTO `cmswing_area` VALUES ('350181', '福清市', '350100', '13');
INSERT INTO `cmswing_area` VALUES ('350182', '长乐市', '350100', '14');
INSERT INTO `cmswing_area` VALUES ('350201', '市辖区', '350200', '1');
INSERT INTO `cmswing_area` VALUES ('350203', '思明区', '350200', '2');
INSERT INTO `cmswing_area` VALUES ('350205', '海沧区', '350200', '3');
INSERT INTO `cmswing_area` VALUES ('350206', '湖里区', '350200', '4');
INSERT INTO `cmswing_area` VALUES ('350211', '集美区', '350200', '5');
INSERT INTO `cmswing_area` VALUES ('350212', '同安区', '350200', '6');
INSERT INTO `cmswing_area` VALUES ('350213', '翔安区', '350200', '7');
INSERT INTO `cmswing_area` VALUES ('350301', '市辖区', '350300', '1');
INSERT INTO `cmswing_area` VALUES ('350302', '城厢区', '350300', '2');
INSERT INTO `cmswing_area` VALUES ('350303', '涵江区', '350300', '3');
INSERT INTO `cmswing_area` VALUES ('350304', '荔城区', '350300', '4');
INSERT INTO `cmswing_area` VALUES ('350305', '秀屿区', '350300', '5');
INSERT INTO `cmswing_area` VALUES ('350322', '仙游县', '350300', '6');
INSERT INTO `cmswing_area` VALUES ('350401', '市辖区', '350400', '1');
INSERT INTO `cmswing_area` VALUES ('350402', '梅列区', '350400', '2');
INSERT INTO `cmswing_area` VALUES ('350403', '三元区', '350400', '3');
INSERT INTO `cmswing_area` VALUES ('350421', '明溪县', '350400', '4');
INSERT INTO `cmswing_area` VALUES ('350423', '清流县', '350400', '5');
INSERT INTO `cmswing_area` VALUES ('350424', '宁化县', '350400', '6');
INSERT INTO `cmswing_area` VALUES ('350425', '大田县', '350400', '7');
INSERT INTO `cmswing_area` VALUES ('350426', '尤溪县', '350400', '8');
INSERT INTO `cmswing_area` VALUES ('350427', '沙　县', '350400', '9');
INSERT INTO `cmswing_area` VALUES ('350428', '将乐县', '350400', '10');
INSERT INTO `cmswing_area` VALUES ('350429', '泰宁县', '350400', '11');
INSERT INTO `cmswing_area` VALUES ('350430', '建宁县', '350400', '12');
INSERT INTO `cmswing_area` VALUES ('350481', '永安市', '350400', '13');
INSERT INTO `cmswing_area` VALUES ('350501', '市辖区', '350500', '1');
INSERT INTO `cmswing_area` VALUES ('350502', '鲤城区', '350500', '2');
INSERT INTO `cmswing_area` VALUES ('350503', '丰泽区', '350500', '3');
INSERT INTO `cmswing_area` VALUES ('350504', '洛江区', '350500', '4');
INSERT INTO `cmswing_area` VALUES ('350505', '泉港区', '350500', '5');
INSERT INTO `cmswing_area` VALUES ('350521', '惠安县', '350500', '6');
INSERT INTO `cmswing_area` VALUES ('350524', '安溪县', '350500', '7');
INSERT INTO `cmswing_area` VALUES ('350525', '永春县', '350500', '8');
INSERT INTO `cmswing_area` VALUES ('350526', '德化县', '350500', '9');
INSERT INTO `cmswing_area` VALUES ('350527', '金门县', '350500', '10');
INSERT INTO `cmswing_area` VALUES ('350581', '石狮市', '350500', '11');
INSERT INTO `cmswing_area` VALUES ('350582', '晋江市', '350500', '12');
INSERT INTO `cmswing_area` VALUES ('350583', '南安市', '350500', '13');
INSERT INTO `cmswing_area` VALUES ('350601', '市辖区', '350600', '1');
INSERT INTO `cmswing_area` VALUES ('350602', '芗城区', '350600', '2');
INSERT INTO `cmswing_area` VALUES ('350603', '龙文区', '350600', '3');
INSERT INTO `cmswing_area` VALUES ('350622', '云霄县', '350600', '4');
INSERT INTO `cmswing_area` VALUES ('350623', '漳浦县', '350600', '5');
INSERT INTO `cmswing_area` VALUES ('350624', '诏安县', '350600', '6');
INSERT INTO `cmswing_area` VALUES ('350625', '长泰县', '350600', '7');
INSERT INTO `cmswing_area` VALUES ('350626', '东山县', '350600', '8');
INSERT INTO `cmswing_area` VALUES ('350627', '南靖县', '350600', '9');
INSERT INTO `cmswing_area` VALUES ('350628', '平和县', '350600', '10');
INSERT INTO `cmswing_area` VALUES ('350629', '华安县', '350600', '11');
INSERT INTO `cmswing_area` VALUES ('350681', '龙海市', '350600', '12');
INSERT INTO `cmswing_area` VALUES ('350701', '市辖区', '350700', '1');
INSERT INTO `cmswing_area` VALUES ('350702', '延平区', '350700', '2');
INSERT INTO `cmswing_area` VALUES ('350721', '顺昌县', '350700', '3');
INSERT INTO `cmswing_area` VALUES ('350722', '浦城县', '350700', '4');
INSERT INTO `cmswing_area` VALUES ('350723', '光泽县', '350700', '5');
INSERT INTO `cmswing_area` VALUES ('350724', '松溪县', '350700', '6');
INSERT INTO `cmswing_area` VALUES ('350725', '政和县', '350700', '7');
INSERT INTO `cmswing_area` VALUES ('350781', '邵武市', '350700', '8');
INSERT INTO `cmswing_area` VALUES ('350782', '武夷山市', '350700', '9');
INSERT INTO `cmswing_area` VALUES ('350783', '建瓯市', '350700', '10');
INSERT INTO `cmswing_area` VALUES ('350784', '建阳市', '350700', '11');
INSERT INTO `cmswing_area` VALUES ('350801', '市辖区', '350800', '1');
INSERT INTO `cmswing_area` VALUES ('350802', '新罗区', '350800', '2');
INSERT INTO `cmswing_area` VALUES ('350821', '长汀县', '350800', '3');
INSERT INTO `cmswing_area` VALUES ('350822', '永定县', '350800', '4');
INSERT INTO `cmswing_area` VALUES ('350823', '上杭县', '350800', '5');
INSERT INTO `cmswing_area` VALUES ('350824', '武平县', '350800', '6');
INSERT INTO `cmswing_area` VALUES ('350825', '连城县', '350800', '7');
INSERT INTO `cmswing_area` VALUES ('350881', '漳平市', '350800', '8');
INSERT INTO `cmswing_area` VALUES ('350901', '市辖区', '350900', '1');
INSERT INTO `cmswing_area` VALUES ('350902', '蕉城区', '350900', '2');
INSERT INTO `cmswing_area` VALUES ('350921', '霞浦县', '350900', '3');
INSERT INTO `cmswing_area` VALUES ('350922', '古田县', '350900', '4');
INSERT INTO `cmswing_area` VALUES ('350923', '屏南县', '350900', '5');
INSERT INTO `cmswing_area` VALUES ('350924', '寿宁县', '350900', '6');
INSERT INTO `cmswing_area` VALUES ('350925', '周宁县', '350900', '7');
INSERT INTO `cmswing_area` VALUES ('350926', '柘荣县', '350900', '8');
INSERT INTO `cmswing_area` VALUES ('350981', '福安市', '350900', '9');
INSERT INTO `cmswing_area` VALUES ('350982', '福鼎市', '350900', '10');
INSERT INTO `cmswing_area` VALUES ('360101', '市辖区', '360100', '1');
INSERT INTO `cmswing_area` VALUES ('360102', '东湖区', '360100', '2');
INSERT INTO `cmswing_area` VALUES ('360103', '西湖区', '360100', '3');
INSERT INTO `cmswing_area` VALUES ('360104', '青云谱区', '360100', '4');
INSERT INTO `cmswing_area` VALUES ('360105', '湾里区', '360100', '5');
INSERT INTO `cmswing_area` VALUES ('360111', '青山湖区', '360100', '6');
INSERT INTO `cmswing_area` VALUES ('360121', '南昌县', '360100', '7');
INSERT INTO `cmswing_area` VALUES ('360122', '新建县', '360100', '8');
INSERT INTO `cmswing_area` VALUES ('360123', '安义县', '360100', '9');
INSERT INTO `cmswing_area` VALUES ('360124', '进贤县', '360100', '10');
INSERT INTO `cmswing_area` VALUES ('360201', '市辖区', '360200', '1');
INSERT INTO `cmswing_area` VALUES ('360202', '昌江区', '360200', '2');
INSERT INTO `cmswing_area` VALUES ('360203', '珠山区', '360200', '3');
INSERT INTO `cmswing_area` VALUES ('360222', '浮梁县', '360200', '4');
INSERT INTO `cmswing_area` VALUES ('360281', '乐平市', '360200', '5');
INSERT INTO `cmswing_area` VALUES ('360301', '市辖区', '360300', '1');
INSERT INTO `cmswing_area` VALUES ('360302', '安源区', '360300', '2');
INSERT INTO `cmswing_area` VALUES ('360313', '湘东区', '360300', '3');
INSERT INTO `cmswing_area` VALUES ('360321', '莲花县', '360300', '4');
INSERT INTO `cmswing_area` VALUES ('360322', '上栗县', '360300', '5');
INSERT INTO `cmswing_area` VALUES ('360323', '芦溪县', '360300', '6');
INSERT INTO `cmswing_area` VALUES ('360401', '市辖区', '360400', '1');
INSERT INTO `cmswing_area` VALUES ('360402', '庐山区', '360400', '2');
INSERT INTO `cmswing_area` VALUES ('360403', '浔阳区', '360400', '3');
INSERT INTO `cmswing_area` VALUES ('360421', '九江县', '360400', '4');
INSERT INTO `cmswing_area` VALUES ('360423', '武宁县', '360400', '5');
INSERT INTO `cmswing_area` VALUES ('360424', '修水县', '360400', '6');
INSERT INTO `cmswing_area` VALUES ('360425', '永修县', '360400', '7');
INSERT INTO `cmswing_area` VALUES ('360426', '德安县', '360400', '8');
INSERT INTO `cmswing_area` VALUES ('360427', '星子县', '360400', '9');
INSERT INTO `cmswing_area` VALUES ('360428', '都昌县', '360400', '10');
INSERT INTO `cmswing_area` VALUES ('360429', '湖口县', '360400', '11');
INSERT INTO `cmswing_area` VALUES ('360430', '彭泽县', '360400', '12');
INSERT INTO `cmswing_area` VALUES ('360481', '瑞昌市', '360400', '13');
INSERT INTO `cmswing_area` VALUES ('360501', '市辖区', '360500', '1');
INSERT INTO `cmswing_area` VALUES ('360502', '渝水区', '360500', '2');
INSERT INTO `cmswing_area` VALUES ('360521', '分宜县', '360500', '3');
INSERT INTO `cmswing_area` VALUES ('360601', '市辖区', '360600', '1');
INSERT INTO `cmswing_area` VALUES ('360602', '月湖区', '360600', '2');
INSERT INTO `cmswing_area` VALUES ('360622', '余江县', '360600', '3');
INSERT INTO `cmswing_area` VALUES ('360681', '贵溪市', '360600', '4');
INSERT INTO `cmswing_area` VALUES ('360701', '市辖区', '360700', '1');
INSERT INTO `cmswing_area` VALUES ('360702', '章贡区', '360700', '2');
INSERT INTO `cmswing_area` VALUES ('360721', '赣　县', '360700', '3');
INSERT INTO `cmswing_area` VALUES ('360722', '信丰县', '360700', '4');
INSERT INTO `cmswing_area` VALUES ('360723', '大余县', '360700', '5');
INSERT INTO `cmswing_area` VALUES ('360724', '上犹县', '360700', '6');
INSERT INTO `cmswing_area` VALUES ('360725', '崇义县', '360700', '7');
INSERT INTO `cmswing_area` VALUES ('360726', '安远县', '360700', '8');
INSERT INTO `cmswing_area` VALUES ('360727', '龙南县', '360700', '9');
INSERT INTO `cmswing_area` VALUES ('360728', '定南县', '360700', '10');
INSERT INTO `cmswing_area` VALUES ('360729', '全南县', '360700', '11');
INSERT INTO `cmswing_area` VALUES ('360730', '宁都县', '360700', '12');
INSERT INTO `cmswing_area` VALUES ('360731', '于都县', '360700', '13');
INSERT INTO `cmswing_area` VALUES ('360732', '兴国县', '360700', '14');
INSERT INTO `cmswing_area` VALUES ('360733', '会昌县', '360700', '15');
INSERT INTO `cmswing_area` VALUES ('360734', '寻乌县', '360700', '16');
INSERT INTO `cmswing_area` VALUES ('360735', '石城县', '360700', '17');
INSERT INTO `cmswing_area` VALUES ('360781', '瑞金市', '360700', '18');
INSERT INTO `cmswing_area` VALUES ('360782', '南康市', '360700', '19');
INSERT INTO `cmswing_area` VALUES ('360801', '市辖区', '360800', '1');
INSERT INTO `cmswing_area` VALUES ('360802', '吉州区', '360800', '2');
INSERT INTO `cmswing_area` VALUES ('360803', '青原区', '360800', '3');
INSERT INTO `cmswing_area` VALUES ('360821', '吉安县', '360800', '4');
INSERT INTO `cmswing_area` VALUES ('360822', '吉水县', '360800', '5');
INSERT INTO `cmswing_area` VALUES ('360823', '峡江县', '360800', '6');
INSERT INTO `cmswing_area` VALUES ('360824', '新干县', '360800', '7');
INSERT INTO `cmswing_area` VALUES ('360825', '永丰县', '360800', '8');
INSERT INTO `cmswing_area` VALUES ('360826', '泰和县', '360800', '9');
INSERT INTO `cmswing_area` VALUES ('360827', '遂川县', '360800', '10');
INSERT INTO `cmswing_area` VALUES ('360828', '万安县', '360800', '11');
INSERT INTO `cmswing_area` VALUES ('360829', '安福县', '360800', '12');
INSERT INTO `cmswing_area` VALUES ('360830', '永新县', '360800', '13');
INSERT INTO `cmswing_area` VALUES ('360881', '井冈山市', '360800', '14');
INSERT INTO `cmswing_area` VALUES ('360901', '市辖区', '360900', '1');
INSERT INTO `cmswing_area` VALUES ('360902', '袁州区', '360900', '2');
INSERT INTO `cmswing_area` VALUES ('360921', '奉新县', '360900', '3');
INSERT INTO `cmswing_area` VALUES ('360922', '万载县', '360900', '4');
INSERT INTO `cmswing_area` VALUES ('360923', '上高县', '360900', '5');
INSERT INTO `cmswing_area` VALUES ('360924', '宜丰县', '360900', '6');
INSERT INTO `cmswing_area` VALUES ('360925', '靖安县', '360900', '7');
INSERT INTO `cmswing_area` VALUES ('360926', '铜鼓县', '360900', '8');
INSERT INTO `cmswing_area` VALUES ('360981', '丰城市', '360900', '9');
INSERT INTO `cmswing_area` VALUES ('360982', '樟树市', '360900', '10');
INSERT INTO `cmswing_area` VALUES ('360983', '高安市', '360900', '11');
INSERT INTO `cmswing_area` VALUES ('361001', '市辖区', '361000', '1');
INSERT INTO `cmswing_area` VALUES ('361002', '临川区', '361000', '2');
INSERT INTO `cmswing_area` VALUES ('361021', '南城县', '361000', '3');
INSERT INTO `cmswing_area` VALUES ('361022', '黎川县', '361000', '4');
INSERT INTO `cmswing_area` VALUES ('361023', '南丰县', '361000', '5');
INSERT INTO `cmswing_area` VALUES ('361024', '崇仁县', '361000', '6');
INSERT INTO `cmswing_area` VALUES ('361025', '乐安县', '361000', '7');
INSERT INTO `cmswing_area` VALUES ('361026', '宜黄县', '361000', '8');
INSERT INTO `cmswing_area` VALUES ('361027', '金溪县', '361000', '9');
INSERT INTO `cmswing_area` VALUES ('361028', '资溪县', '361000', '10');
INSERT INTO `cmswing_area` VALUES ('361029', '东乡县', '361000', '11');
INSERT INTO `cmswing_area` VALUES ('361030', '广昌县', '361000', '12');
INSERT INTO `cmswing_area` VALUES ('361101', '市辖区', '361100', '1');
INSERT INTO `cmswing_area` VALUES ('361102', '信州区', '361100', '2');
INSERT INTO `cmswing_area` VALUES ('361121', '上饶县', '361100', '3');
INSERT INTO `cmswing_area` VALUES ('361122', '广丰县', '361100', '4');
INSERT INTO `cmswing_area` VALUES ('361123', '玉山县', '361100', '5');
INSERT INTO `cmswing_area` VALUES ('361124', '铅山县', '361100', '6');
INSERT INTO `cmswing_area` VALUES ('361125', '横峰县', '361100', '7');
INSERT INTO `cmswing_area` VALUES ('361126', '弋阳县', '361100', '8');
INSERT INTO `cmswing_area` VALUES ('361127', '余干县', '361100', '9');
INSERT INTO `cmswing_area` VALUES ('361128', '鄱阳县', '361100', '10');
INSERT INTO `cmswing_area` VALUES ('361129', '万年县', '361100', '11');
INSERT INTO `cmswing_area` VALUES ('361130', '婺源县', '361100', '12');
INSERT INTO `cmswing_area` VALUES ('361181', '德兴市', '361100', '13');
INSERT INTO `cmswing_area` VALUES ('370101', '市辖区', '370100', '1');
INSERT INTO `cmswing_area` VALUES ('370102', '历下区', '370100', '2');
INSERT INTO `cmswing_area` VALUES ('370103', '市中区', '370100', '3');
INSERT INTO `cmswing_area` VALUES ('370104', '槐荫区', '370100', '4');
INSERT INTO `cmswing_area` VALUES ('370105', '天桥区', '370100', '5');
INSERT INTO `cmswing_area` VALUES ('370112', '历城区', '370100', '6');
INSERT INTO `cmswing_area` VALUES ('370113', '长清区', '370100', '7');
INSERT INTO `cmswing_area` VALUES ('370124', '平阴县', '370100', '8');
INSERT INTO `cmswing_area` VALUES ('370125', '济阳县', '370100', '9');
INSERT INTO `cmswing_area` VALUES ('370126', '商河县', '370100', '10');
INSERT INTO `cmswing_area` VALUES ('370181', '章丘市', '370100', '11');
INSERT INTO `cmswing_area` VALUES ('370201', '市辖区', '370200', '1');
INSERT INTO `cmswing_area` VALUES ('370202', '市南区', '370200', '2');
INSERT INTO `cmswing_area` VALUES ('370203', '市北区', '370200', '3');
INSERT INTO `cmswing_area` VALUES ('370205', '四方区', '370200', '4');
INSERT INTO `cmswing_area` VALUES ('370211', '黄岛区', '370200', '5');
INSERT INTO `cmswing_area` VALUES ('370212', '崂山区', '370200', '6');
INSERT INTO `cmswing_area` VALUES ('370213', '李沧区', '370200', '7');
INSERT INTO `cmswing_area` VALUES ('370214', '城阳区', '370200', '8');
INSERT INTO `cmswing_area` VALUES ('370281', '胶州市', '370200', '9');
INSERT INTO `cmswing_area` VALUES ('370282', '即墨市', '370200', '10');
INSERT INTO `cmswing_area` VALUES ('370283', '平度市', '370200', '11');
INSERT INTO `cmswing_area` VALUES ('370284', '胶南市', '370200', '12');
INSERT INTO `cmswing_area` VALUES ('370285', '莱西市', '370200', '13');
INSERT INTO `cmswing_area` VALUES ('370301', '市辖区', '370300', '1');
INSERT INTO `cmswing_area` VALUES ('370302', '淄川区', '370300', '2');
INSERT INTO `cmswing_area` VALUES ('370303', '张店区', '370300', '3');
INSERT INTO `cmswing_area` VALUES ('370304', '博山区', '370300', '4');
INSERT INTO `cmswing_area` VALUES ('370305', '临淄区', '370300', '5');
INSERT INTO `cmswing_area` VALUES ('370306', '周村区', '370300', '6');
INSERT INTO `cmswing_area` VALUES ('370321', '桓台县', '370300', '7');
INSERT INTO `cmswing_area` VALUES ('370322', '高青县', '370300', '8');
INSERT INTO `cmswing_area` VALUES ('370323', '沂源县', '370300', '9');
INSERT INTO `cmswing_area` VALUES ('370401', '市辖区', '370400', '1');
INSERT INTO `cmswing_area` VALUES ('370402', '市中区', '370400', '2');
INSERT INTO `cmswing_area` VALUES ('370403', '薛城区', '370400', '3');
INSERT INTO `cmswing_area` VALUES ('370404', '峄城区', '370400', '4');
INSERT INTO `cmswing_area` VALUES ('370405', '台儿庄区', '370400', '5');
INSERT INTO `cmswing_area` VALUES ('370406', '山亭区', '370400', '6');
INSERT INTO `cmswing_area` VALUES ('370481', '滕州市', '370400', '7');
INSERT INTO `cmswing_area` VALUES ('370501', '市辖区', '370500', '1');
INSERT INTO `cmswing_area` VALUES ('370502', '东营区', '370500', '2');
INSERT INTO `cmswing_area` VALUES ('370503', '河口区', '370500', '3');
INSERT INTO `cmswing_area` VALUES ('370521', '垦利县', '370500', '4');
INSERT INTO `cmswing_area` VALUES ('370522', '利津县', '370500', '5');
INSERT INTO `cmswing_area` VALUES ('370523', '广饶县', '370500', '6');
INSERT INTO `cmswing_area` VALUES ('370601', '市辖区', '370600', '1');
INSERT INTO `cmswing_area` VALUES ('370602', '芝罘区', '370600', '2');
INSERT INTO `cmswing_area` VALUES ('370611', '福山区', '370600', '3');
INSERT INTO `cmswing_area` VALUES ('370612', '牟平区', '370600', '4');
INSERT INTO `cmswing_area` VALUES ('370613', '莱山区', '370600', '5');
INSERT INTO `cmswing_area` VALUES ('370634', '长岛县', '370600', '6');
INSERT INTO `cmswing_area` VALUES ('370681', '龙口市', '370600', '7');
INSERT INTO `cmswing_area` VALUES ('370682', '莱阳市', '370600', '8');
INSERT INTO `cmswing_area` VALUES ('370683', '莱州市', '370600', '9');
INSERT INTO `cmswing_area` VALUES ('370684', '蓬莱市', '370600', '10');
INSERT INTO `cmswing_area` VALUES ('370685', '招远市', '370600', '11');
INSERT INTO `cmswing_area` VALUES ('370686', '栖霞市', '370600', '12');
INSERT INTO `cmswing_area` VALUES ('370687', '海阳市', '370600', '13');
INSERT INTO `cmswing_area` VALUES ('370701', '市辖区', '370700', '1');
INSERT INTO `cmswing_area` VALUES ('370702', '潍城区', '370700', '2');
INSERT INTO `cmswing_area` VALUES ('370703', '寒亭区', '370700', '3');
INSERT INTO `cmswing_area` VALUES ('370704', '坊子区', '370700', '4');
INSERT INTO `cmswing_area` VALUES ('370705', '奎文区', '370700', '5');
INSERT INTO `cmswing_area` VALUES ('370724', '临朐县', '370700', '6');
INSERT INTO `cmswing_area` VALUES ('370725', '昌乐县', '370700', '7');
INSERT INTO `cmswing_area` VALUES ('370781', '青州市', '370700', '8');
INSERT INTO `cmswing_area` VALUES ('370782', '诸城市', '370700', '9');
INSERT INTO `cmswing_area` VALUES ('370783', '寿光市', '370700', '10');
INSERT INTO `cmswing_area` VALUES ('370784', '安丘市', '370700', '11');
INSERT INTO `cmswing_area` VALUES ('370785', '高密市', '370700', '12');
INSERT INTO `cmswing_area` VALUES ('370786', '昌邑市', '370700', '13');
INSERT INTO `cmswing_area` VALUES ('370801', '市辖区', '370800', '1');
INSERT INTO `cmswing_area` VALUES ('370802', '市中区', '370800', '2');
INSERT INTO `cmswing_area` VALUES ('370811', '任城区', '370800', '3');
INSERT INTO `cmswing_area` VALUES ('370826', '微山县', '370800', '4');
INSERT INTO `cmswing_area` VALUES ('370827', '鱼台县', '370800', '5');
INSERT INTO `cmswing_area` VALUES ('370828', '金乡县', '370800', '6');
INSERT INTO `cmswing_area` VALUES ('370829', '嘉祥县', '370800', '7');
INSERT INTO `cmswing_area` VALUES ('370830', '汶上县', '370800', '8');
INSERT INTO `cmswing_area` VALUES ('370831', '泗水县', '370800', '9');
INSERT INTO `cmswing_area` VALUES ('370832', '梁山县', '370800', '10');
INSERT INTO `cmswing_area` VALUES ('370881', '曲阜市', '370800', '11');
INSERT INTO `cmswing_area` VALUES ('370882', '兖州市', '370800', '12');
INSERT INTO `cmswing_area` VALUES ('370883', '邹城市', '370800', '13');
INSERT INTO `cmswing_area` VALUES ('370901', '市辖区', '370900', '1');
INSERT INTO `cmswing_area` VALUES ('370902', '泰山区', '370900', '2');
INSERT INTO `cmswing_area` VALUES ('370903', '岱岳区', '370900', '3');
INSERT INTO `cmswing_area` VALUES ('370921', '宁阳县', '370900', '4');
INSERT INTO `cmswing_area` VALUES ('370923', '东平县', '370900', '5');
INSERT INTO `cmswing_area` VALUES ('370982', '新泰市', '370900', '6');
INSERT INTO `cmswing_area` VALUES ('370983', '肥城市', '370900', '7');
INSERT INTO `cmswing_area` VALUES ('371001', '市辖区', '371000', '1');
INSERT INTO `cmswing_area` VALUES ('371002', '环翠区', '371000', '2');
INSERT INTO `cmswing_area` VALUES ('371081', '文登市', '371000', '3');
INSERT INTO `cmswing_area` VALUES ('371082', '荣成市', '371000', '4');
INSERT INTO `cmswing_area` VALUES ('371083', '乳山市', '371000', '5');
INSERT INTO `cmswing_area` VALUES ('371101', '市辖区', '371100', '1');
INSERT INTO `cmswing_area` VALUES ('371102', '东港区', '371100', '2');
INSERT INTO `cmswing_area` VALUES ('371103', '岚山区', '371100', '3');
INSERT INTO `cmswing_area` VALUES ('371121', '五莲县', '371100', '4');
INSERT INTO `cmswing_area` VALUES ('371122', '莒　县', '371100', '5');
INSERT INTO `cmswing_area` VALUES ('371201', '市辖区', '371200', '1');
INSERT INTO `cmswing_area` VALUES ('371202', '莱城区', '371200', '2');
INSERT INTO `cmswing_area` VALUES ('371203', '钢城区', '371200', '3');
INSERT INTO `cmswing_area` VALUES ('371301', '市辖区', '371300', '1');
INSERT INTO `cmswing_area` VALUES ('371302', '兰山区', '371300', '2');
INSERT INTO `cmswing_area` VALUES ('371311', '罗庄区', '371300', '3');
INSERT INTO `cmswing_area` VALUES ('371312', '河东区', '371300', '4');
INSERT INTO `cmswing_area` VALUES ('371321', '沂南县', '371300', '5');
INSERT INTO `cmswing_area` VALUES ('371322', '郯城县', '371300', '6');
INSERT INTO `cmswing_area` VALUES ('371323', '沂水县', '371300', '7');
INSERT INTO `cmswing_area` VALUES ('371324', '苍山县', '371300', '8');
INSERT INTO `cmswing_area` VALUES ('371325', '费　县', '371300', '9');
INSERT INTO `cmswing_area` VALUES ('371326', '平邑县', '371300', '10');
INSERT INTO `cmswing_area` VALUES ('371327', '莒南县', '371300', '11');
INSERT INTO `cmswing_area` VALUES ('371328', '蒙阴县', '371300', '12');
INSERT INTO `cmswing_area` VALUES ('371329', '临沭县', '371300', '13');
INSERT INTO `cmswing_area` VALUES ('371401', '市辖区', '371400', '1');
INSERT INTO `cmswing_area` VALUES ('371402', '德城区', '371400', '2');
INSERT INTO `cmswing_area` VALUES ('371421', '陵　县', '371400', '3');
INSERT INTO `cmswing_area` VALUES ('371422', '宁津县', '371400', '4');
INSERT INTO `cmswing_area` VALUES ('371423', '庆云县', '371400', '5');
INSERT INTO `cmswing_area` VALUES ('371424', '临邑县', '371400', '6');
INSERT INTO `cmswing_area` VALUES ('371425', '齐河县', '371400', '7');
INSERT INTO `cmswing_area` VALUES ('371426', '平原县', '371400', '8');
INSERT INTO `cmswing_area` VALUES ('371427', '夏津县', '371400', '9');
INSERT INTO `cmswing_area` VALUES ('371428', '武城县', '371400', '10');
INSERT INTO `cmswing_area` VALUES ('371481', '乐陵市', '371400', '11');
INSERT INTO `cmswing_area` VALUES ('371482', '禹城市', '371400', '12');
INSERT INTO `cmswing_area` VALUES ('371501', '市辖区', '371500', '1');
INSERT INTO `cmswing_area` VALUES ('371502', '东昌府区', '371500', '2');
INSERT INTO `cmswing_area` VALUES ('371521', '阳谷县', '371500', '3');
INSERT INTO `cmswing_area` VALUES ('371522', '莘　县', '371500', '4');
INSERT INTO `cmswing_area` VALUES ('371523', '茌平县', '371500', '5');
INSERT INTO `cmswing_area` VALUES ('371524', '东阿县', '371500', '6');
INSERT INTO `cmswing_area` VALUES ('371525', '冠　县', '371500', '7');
INSERT INTO `cmswing_area` VALUES ('371526', '高唐县', '371500', '8');
INSERT INTO `cmswing_area` VALUES ('371581', '临清市', '371500', '9');
INSERT INTO `cmswing_area` VALUES ('371601', '市辖区', '371600', '1');
INSERT INTO `cmswing_area` VALUES ('371602', '滨城区', '371600', '2');
INSERT INTO `cmswing_area` VALUES ('371621', '惠民县', '371600', '3');
INSERT INTO `cmswing_area` VALUES ('371622', '阳信县', '371600', '4');
INSERT INTO `cmswing_area` VALUES ('371623', '无棣县', '371600', '5');
INSERT INTO `cmswing_area` VALUES ('371624', '沾化县', '371600', '6');
INSERT INTO `cmswing_area` VALUES ('371625', '博兴县', '371600', '7');
INSERT INTO `cmswing_area` VALUES ('371626', '邹平县', '371600', '8');
INSERT INTO `cmswing_area` VALUES ('371701', '市辖区', '371700', '1');
INSERT INTO `cmswing_area` VALUES ('371702', '牡丹区', '371700', '2');
INSERT INTO `cmswing_area` VALUES ('371721', '曹　县', '371700', '3');
INSERT INTO `cmswing_area` VALUES ('371722', '单　县', '371700', '4');
INSERT INTO `cmswing_area` VALUES ('371723', '成武县', '371700', '5');
INSERT INTO `cmswing_area` VALUES ('371724', '巨野县', '371700', '6');
INSERT INTO `cmswing_area` VALUES ('371725', '郓城县', '371700', '7');
INSERT INTO `cmswing_area` VALUES ('371726', '鄄城县', '371700', '8');
INSERT INTO `cmswing_area` VALUES ('371727', '定陶县', '371700', '9');
INSERT INTO `cmswing_area` VALUES ('371728', '东明县', '371700', '10');
INSERT INTO `cmswing_area` VALUES ('410101', '市辖区', '410100', '1');
INSERT INTO `cmswing_area` VALUES ('410102', '中原区', '410100', '2');
INSERT INTO `cmswing_area` VALUES ('410103', '二七区', '410100', '3');
INSERT INTO `cmswing_area` VALUES ('410104', '管城回族区', '410100', '4');
INSERT INTO `cmswing_area` VALUES ('410105', '金水区', '410100', '5');
INSERT INTO `cmswing_area` VALUES ('410106', '上街区', '410100', '6');
INSERT INTO `cmswing_area` VALUES ('410108', '邙山区', '410100', '7');
INSERT INTO `cmswing_area` VALUES ('410122', '中牟县', '410100', '8');
INSERT INTO `cmswing_area` VALUES ('410181', '巩义市', '410100', '9');
INSERT INTO `cmswing_area` VALUES ('410182', '荥阳市', '410100', '10');
INSERT INTO `cmswing_area` VALUES ('410183', '新密市', '410100', '11');
INSERT INTO `cmswing_area` VALUES ('410184', '新郑市', '410100', '12');
INSERT INTO `cmswing_area` VALUES ('410185', '登封市', '410100', '13');
INSERT INTO `cmswing_area` VALUES ('410201', '市辖区', '410200', '1');
INSERT INTO `cmswing_area` VALUES ('410202', '龙亭区', '410200', '2');
INSERT INTO `cmswing_area` VALUES ('410203', '顺河回族区', '410200', '3');
INSERT INTO `cmswing_area` VALUES ('410204', '鼓楼区', '410200', '4');
INSERT INTO `cmswing_area` VALUES ('410205', '南关区', '410200', '5');
INSERT INTO `cmswing_area` VALUES ('410211', '郊　区', '410200', '6');
INSERT INTO `cmswing_area` VALUES ('410221', '杞　县', '410200', '7');
INSERT INTO `cmswing_area` VALUES ('410222', '通许县', '410200', '8');
INSERT INTO `cmswing_area` VALUES ('410223', '尉氏县', '410200', '9');
INSERT INTO `cmswing_area` VALUES ('410224', '开封县', '410200', '10');
INSERT INTO `cmswing_area` VALUES ('410225', '兰考县', '410200', '11');
INSERT INTO `cmswing_area` VALUES ('410301', '市辖区', '410300', '1');
INSERT INTO `cmswing_area` VALUES ('410302', '老城区', '410300', '2');
INSERT INTO `cmswing_area` VALUES ('410303', '西工区', '410300', '3');
INSERT INTO `cmswing_area` VALUES ('410304', '廛河回族区', '410300', '4');
INSERT INTO `cmswing_area` VALUES ('410305', '涧西区', '410300', '5');
INSERT INTO `cmswing_area` VALUES ('410306', '吉利区', '410300', '6');
INSERT INTO `cmswing_area` VALUES ('410307', '洛龙区', '410300', '7');
INSERT INTO `cmswing_area` VALUES ('410322', '孟津县', '410300', '8');
INSERT INTO `cmswing_area` VALUES ('410323', '新安县', '410300', '9');
INSERT INTO `cmswing_area` VALUES ('410324', '栾川县', '410300', '10');
INSERT INTO `cmswing_area` VALUES ('410325', '嵩　县', '410300', '11');
INSERT INTO `cmswing_area` VALUES ('410326', '汝阳县', '410300', '12');
INSERT INTO `cmswing_area` VALUES ('410327', '宜阳县', '410300', '13');
INSERT INTO `cmswing_area` VALUES ('410328', '洛宁县', '410300', '14');
INSERT INTO `cmswing_area` VALUES ('410329', '伊川县', '410300', '15');
INSERT INTO `cmswing_area` VALUES ('410381', '偃师市', '410300', '16');
INSERT INTO `cmswing_area` VALUES ('410401', '市辖区', '410400', '1');
INSERT INTO `cmswing_area` VALUES ('410402', '新华区', '410400', '2');
INSERT INTO `cmswing_area` VALUES ('410403', '卫东区', '410400', '3');
INSERT INTO `cmswing_area` VALUES ('410404', '石龙区', '410400', '4');
INSERT INTO `cmswing_area` VALUES ('410411', '湛河区', '410400', '5');
INSERT INTO `cmswing_area` VALUES ('410421', '宝丰县', '410400', '6');
INSERT INTO `cmswing_area` VALUES ('410422', '叶　县', '410400', '7');
INSERT INTO `cmswing_area` VALUES ('410423', '鲁山县', '410400', '8');
INSERT INTO `cmswing_area` VALUES ('410425', '郏　县', '410400', '9');
INSERT INTO `cmswing_area` VALUES ('410481', '舞钢市', '410400', '10');
INSERT INTO `cmswing_area` VALUES ('410482', '汝州市', '410400', '11');
INSERT INTO `cmswing_area` VALUES ('410501', '市辖区', '410500', '1');
INSERT INTO `cmswing_area` VALUES ('410502', '文峰区', '410500', '2');
INSERT INTO `cmswing_area` VALUES ('410503', '北关区', '410500', '3');
INSERT INTO `cmswing_area` VALUES ('410505', '殷都区', '410500', '4');
INSERT INTO `cmswing_area` VALUES ('410506', '龙安区', '410500', '5');
INSERT INTO `cmswing_area` VALUES ('410522', '安阳县', '410500', '6');
INSERT INTO `cmswing_area` VALUES ('410523', '汤阴县', '410500', '7');
INSERT INTO `cmswing_area` VALUES ('410526', '滑　县', '410500', '8');
INSERT INTO `cmswing_area` VALUES ('410527', '内黄县', '410500', '9');
INSERT INTO `cmswing_area` VALUES ('410581', '林州市', '410500', '10');
INSERT INTO `cmswing_area` VALUES ('410601', '市辖区', '410600', '1');
INSERT INTO `cmswing_area` VALUES ('410602', '鹤山区', '410600', '2');
INSERT INTO `cmswing_area` VALUES ('410603', '山城区', '410600', '3');
INSERT INTO `cmswing_area` VALUES ('410611', '淇滨区', '410600', '4');
INSERT INTO `cmswing_area` VALUES ('410621', '浚　县', '410600', '5');
INSERT INTO `cmswing_area` VALUES ('410622', '淇　县', '410600', '6');
INSERT INTO `cmswing_area` VALUES ('410701', '市辖区', '410700', '1');
INSERT INTO `cmswing_area` VALUES ('410702', '红旗区', '410700', '2');
INSERT INTO `cmswing_area` VALUES ('410703', '卫滨区', '410700', '3');
INSERT INTO `cmswing_area` VALUES ('410704', '凤泉区', '410700', '4');
INSERT INTO `cmswing_area` VALUES ('410711', '牧野区', '410700', '5');
INSERT INTO `cmswing_area` VALUES ('410721', '新乡县', '410700', '6');
INSERT INTO `cmswing_area` VALUES ('410724', '获嘉县', '410700', '7');
INSERT INTO `cmswing_area` VALUES ('410725', '原阳县', '410700', '8');
INSERT INTO `cmswing_area` VALUES ('410726', '延津县', '410700', '9');
INSERT INTO `cmswing_area` VALUES ('410727', '封丘县', '410700', '10');
INSERT INTO `cmswing_area` VALUES ('410728', '长垣县', '410700', '11');
INSERT INTO `cmswing_area` VALUES ('410781', '卫辉市', '410700', '12');
INSERT INTO `cmswing_area` VALUES ('410782', '辉县市', '410700', '13');
INSERT INTO `cmswing_area` VALUES ('410801', '市辖区', '410800', '1');
INSERT INTO `cmswing_area` VALUES ('410802', '解放区', '410800', '2');
INSERT INTO `cmswing_area` VALUES ('410803', '中站区', '410800', '3');
INSERT INTO `cmswing_area` VALUES ('410804', '马村区', '410800', '4');
INSERT INTO `cmswing_area` VALUES ('410811', '山阳区', '410800', '5');
INSERT INTO `cmswing_area` VALUES ('410821', '修武县', '410800', '6');
INSERT INTO `cmswing_area` VALUES ('410822', '博爱县', '410800', '7');
INSERT INTO `cmswing_area` VALUES ('410823', '武陟县', '410800', '8');
INSERT INTO `cmswing_area` VALUES ('410825', '温　县', '410800', '9');
INSERT INTO `cmswing_area` VALUES ('410881', '济源市', '410800', '10');
INSERT INTO `cmswing_area` VALUES ('410882', '沁阳市', '410800', '11');
INSERT INTO `cmswing_area` VALUES ('410883', '孟州市', '410800', '12');
INSERT INTO `cmswing_area` VALUES ('410901', '市辖区', '410900', '1');
INSERT INTO `cmswing_area` VALUES ('410902', '华龙区', '410900', '2');
INSERT INTO `cmswing_area` VALUES ('410922', '清丰县', '410900', '3');
INSERT INTO `cmswing_area` VALUES ('410923', '南乐县', '410900', '4');
INSERT INTO `cmswing_area` VALUES ('410926', '范　县', '410900', '5');
INSERT INTO `cmswing_area` VALUES ('410927', '台前县', '410900', '6');
INSERT INTO `cmswing_area` VALUES ('410928', '濮阳县', '410900', '7');
INSERT INTO `cmswing_area` VALUES ('411001', '市辖区', '411000', '1');
INSERT INTO `cmswing_area` VALUES ('411002', '魏都区', '411000', '2');
INSERT INTO `cmswing_area` VALUES ('411023', '许昌县', '411000', '3');
INSERT INTO `cmswing_area` VALUES ('411024', '鄢陵县', '411000', '4');
INSERT INTO `cmswing_area` VALUES ('411025', '襄城县', '411000', '5');
INSERT INTO `cmswing_area` VALUES ('411081', '禹州市', '411000', '6');
INSERT INTO `cmswing_area` VALUES ('411082', '长葛市', '411000', '7');
INSERT INTO `cmswing_area` VALUES ('411101', '市辖区', '411100', '1');
INSERT INTO `cmswing_area` VALUES ('411102', '源汇区', '411100', '2');
INSERT INTO `cmswing_area` VALUES ('411103', '郾城区', '411100', '3');
INSERT INTO `cmswing_area` VALUES ('411104', '召陵区', '411100', '4');
INSERT INTO `cmswing_area` VALUES ('411121', '舞阳县', '411100', '5');
INSERT INTO `cmswing_area` VALUES ('411122', '临颍县', '411100', '6');
INSERT INTO `cmswing_area` VALUES ('411201', '市辖区', '411200', '1');
INSERT INTO `cmswing_area` VALUES ('411202', '湖滨区', '411200', '2');
INSERT INTO `cmswing_area` VALUES ('411221', '渑池县', '411200', '3');
INSERT INTO `cmswing_area` VALUES ('411222', '陕　县', '411200', '4');
INSERT INTO `cmswing_area` VALUES ('411224', '卢氏县', '411200', '5');
INSERT INTO `cmswing_area` VALUES ('411281', '义马市', '411200', '6');
INSERT INTO `cmswing_area` VALUES ('411282', '灵宝市', '411200', '7');
INSERT INTO `cmswing_area` VALUES ('411301', '市辖区', '411300', '1');
INSERT INTO `cmswing_area` VALUES ('411302', '宛城区', '411300', '2');
INSERT INTO `cmswing_area` VALUES ('411303', '卧龙区', '411300', '3');
INSERT INTO `cmswing_area` VALUES ('411321', '南召县', '411300', '4');
INSERT INTO `cmswing_area` VALUES ('411322', '方城县', '411300', '5');
INSERT INTO `cmswing_area` VALUES ('411323', '西峡县', '411300', '6');
INSERT INTO `cmswing_area` VALUES ('411324', '镇平县', '411300', '7');
INSERT INTO `cmswing_area` VALUES ('411325', '内乡县', '411300', '8');
INSERT INTO `cmswing_area` VALUES ('411326', '淅川县', '411300', '9');
INSERT INTO `cmswing_area` VALUES ('411327', '社旗县', '411300', '10');
INSERT INTO `cmswing_area` VALUES ('411328', '唐河县', '411300', '11');
INSERT INTO `cmswing_area` VALUES ('411329', '新野县', '411300', '12');
INSERT INTO `cmswing_area` VALUES ('411330', '桐柏县', '411300', '13');
INSERT INTO `cmswing_area` VALUES ('411381', '邓州市', '411300', '14');
INSERT INTO `cmswing_area` VALUES ('411401', '市辖区', '411400', '1');
INSERT INTO `cmswing_area` VALUES ('411402', '梁园区', '411400', '2');
INSERT INTO `cmswing_area` VALUES ('411403', '睢阳区', '411400', '3');
INSERT INTO `cmswing_area` VALUES ('411421', '民权县', '411400', '4');
INSERT INTO `cmswing_area` VALUES ('411422', '睢　县', '411400', '5');
INSERT INTO `cmswing_area` VALUES ('411423', '宁陵县', '411400', '6');
INSERT INTO `cmswing_area` VALUES ('411424', '柘城县', '411400', '7');
INSERT INTO `cmswing_area` VALUES ('411425', '虞城县', '411400', '8');
INSERT INTO `cmswing_area` VALUES ('411426', '夏邑县', '411400', '9');
INSERT INTO `cmswing_area` VALUES ('411481', '永城市', '411400', '10');
INSERT INTO `cmswing_area` VALUES ('411501', '市辖区', '411500', '1');
INSERT INTO `cmswing_area` VALUES ('411502', '师河区', '411500', '2');
INSERT INTO `cmswing_area` VALUES ('411503', '平桥区', '411500', '3');
INSERT INTO `cmswing_area` VALUES ('411521', '罗山县', '411500', '4');
INSERT INTO `cmswing_area` VALUES ('411522', '光山县', '411500', '5');
INSERT INTO `cmswing_area` VALUES ('411523', '新　县', '411500', '6');
INSERT INTO `cmswing_area` VALUES ('411524', '商城县', '411500', '7');
INSERT INTO `cmswing_area` VALUES ('411525', '固始县', '411500', '8');
INSERT INTO `cmswing_area` VALUES ('411526', '潢川县', '411500', '9');
INSERT INTO `cmswing_area` VALUES ('411527', '淮滨县', '411500', '10');
INSERT INTO `cmswing_area` VALUES ('411528', '息　县', '411500', '11');
INSERT INTO `cmswing_area` VALUES ('411601', '市辖区', '411600', '1');
INSERT INTO `cmswing_area` VALUES ('411602', '川汇区', '411600', '2');
INSERT INTO `cmswing_area` VALUES ('411621', '扶沟县', '411600', '3');
INSERT INTO `cmswing_area` VALUES ('411622', '西华县', '411600', '4');
INSERT INTO `cmswing_area` VALUES ('411623', '商水县', '411600', '5');
INSERT INTO `cmswing_area` VALUES ('411624', '沈丘县', '411600', '6');
INSERT INTO `cmswing_area` VALUES ('411625', '郸城县', '411600', '7');
INSERT INTO `cmswing_area` VALUES ('411626', '淮阳县', '411600', '8');
INSERT INTO `cmswing_area` VALUES ('411627', '太康县', '411600', '9');
INSERT INTO `cmswing_area` VALUES ('411628', '鹿邑县', '411600', '10');
INSERT INTO `cmswing_area` VALUES ('411681', '项城市', '411600', '11');
INSERT INTO `cmswing_area` VALUES ('411701', '市辖区', '411700', '1');
INSERT INTO `cmswing_area` VALUES ('411702', '驿城区', '411700', '2');
INSERT INTO `cmswing_area` VALUES ('411721', '西平县', '411700', '3');
INSERT INTO `cmswing_area` VALUES ('411722', '上蔡县', '411700', '4');
INSERT INTO `cmswing_area` VALUES ('411723', '平舆县', '411700', '5');
INSERT INTO `cmswing_area` VALUES ('411724', '正阳县', '411700', '6');
INSERT INTO `cmswing_area` VALUES ('411725', '确山县', '411700', '7');
INSERT INTO `cmswing_area` VALUES ('411726', '泌阳县', '411700', '8');
INSERT INTO `cmswing_area` VALUES ('411727', '汝南县', '411700', '9');
INSERT INTO `cmswing_area` VALUES ('411728', '遂平县', '411700', '10');
INSERT INTO `cmswing_area` VALUES ('411729', '新蔡县', '411700', '11');
INSERT INTO `cmswing_area` VALUES ('420101', '市辖区', '420100', '1');
INSERT INTO `cmswing_area` VALUES ('420102', '江岸区', '420100', '2');
INSERT INTO `cmswing_area` VALUES ('420103', '江汉区', '420100', '3');
INSERT INTO `cmswing_area` VALUES ('420104', '乔口区', '420100', '4');
INSERT INTO `cmswing_area` VALUES ('420105', '汉阳区', '420100', '5');
INSERT INTO `cmswing_area` VALUES ('420106', '武昌区', '420100', '6');
INSERT INTO `cmswing_area` VALUES ('420107', '青山区', '420100', '7');
INSERT INTO `cmswing_area` VALUES ('420111', '洪山区', '420100', '8');
INSERT INTO `cmswing_area` VALUES ('420112', '东西湖区', '420100', '9');
INSERT INTO `cmswing_area` VALUES ('420113', '汉南区', '420100', '10');
INSERT INTO `cmswing_area` VALUES ('420114', '蔡甸区', '420100', '11');
INSERT INTO `cmswing_area` VALUES ('420115', '江夏区', '420100', '12');
INSERT INTO `cmswing_area` VALUES ('420116', '黄陂区', '420100', '13');
INSERT INTO `cmswing_area` VALUES ('420117', '新洲区', '420100', '14');
INSERT INTO `cmswing_area` VALUES ('420201', '市辖区', '420200', '1');
INSERT INTO `cmswing_area` VALUES ('420202', '黄石港区', '420200', '2');
INSERT INTO `cmswing_area` VALUES ('420203', '西塞山区', '420200', '3');
INSERT INTO `cmswing_area` VALUES ('420204', '下陆区', '420200', '4');
INSERT INTO `cmswing_area` VALUES ('420205', '铁山区', '420200', '5');
INSERT INTO `cmswing_area` VALUES ('420222', '阳新县', '420200', '6');
INSERT INTO `cmswing_area` VALUES ('420281', '大冶市', '420200', '7');
INSERT INTO `cmswing_area` VALUES ('420301', '市辖区', '420300', '1');
INSERT INTO `cmswing_area` VALUES ('420302', '茅箭区', '420300', '2');
INSERT INTO `cmswing_area` VALUES ('420303', '张湾区', '420300', '3');
INSERT INTO `cmswing_area` VALUES ('420321', '郧　县', '420300', '4');
INSERT INTO `cmswing_area` VALUES ('420322', '郧西县', '420300', '5');
INSERT INTO `cmswing_area` VALUES ('420323', '竹山县', '420300', '6');
INSERT INTO `cmswing_area` VALUES ('420324', '竹溪县', '420300', '7');
INSERT INTO `cmswing_area` VALUES ('420325', '房　县', '420300', '8');
INSERT INTO `cmswing_area` VALUES ('420381', '丹江口市', '420300', '9');
INSERT INTO `cmswing_area` VALUES ('420501', '市辖区', '420500', '1');
INSERT INTO `cmswing_area` VALUES ('420502', '西陵区', '420500', '2');
INSERT INTO `cmswing_area` VALUES ('420503', '伍家岗区', '420500', '3');
INSERT INTO `cmswing_area` VALUES ('420504', '点军区', '420500', '4');
INSERT INTO `cmswing_area` VALUES ('420505', '猇亭区', '420500', '5');
INSERT INTO `cmswing_area` VALUES ('420506', '夷陵区', '420500', '6');
INSERT INTO `cmswing_area` VALUES ('420525', '远安县', '420500', '7');
INSERT INTO `cmswing_area` VALUES ('420526', '兴山县', '420500', '8');
INSERT INTO `cmswing_area` VALUES ('420527', '秭归县', '420500', '9');
INSERT INTO `cmswing_area` VALUES ('420528', '长阳土家族自治县', '420500', '10');
INSERT INTO `cmswing_area` VALUES ('420529', '五峰土家族自治县', '420500', '11');
INSERT INTO `cmswing_area` VALUES ('420581', '宜都市', '420500', '12');
INSERT INTO `cmswing_area` VALUES ('420582', '当阳市', '420500', '13');
INSERT INTO `cmswing_area` VALUES ('420583', '枝江市', '420500', '14');
INSERT INTO `cmswing_area` VALUES ('420601', '市辖区', '420600', '1');
INSERT INTO `cmswing_area` VALUES ('420602', '襄城区', '420600', '2');
INSERT INTO `cmswing_area` VALUES ('420606', '樊城区', '420600', '3');
INSERT INTO `cmswing_area` VALUES ('420607', '襄阳区', '420600', '4');
INSERT INTO `cmswing_area` VALUES ('420624', '南漳县', '420600', '5');
INSERT INTO `cmswing_area` VALUES ('420625', '谷城县', '420600', '6');
INSERT INTO `cmswing_area` VALUES ('420626', '保康县', '420600', '7');
INSERT INTO `cmswing_area` VALUES ('420682', '老河口市', '420600', '8');
INSERT INTO `cmswing_area` VALUES ('420683', '枣阳市', '420600', '9');
INSERT INTO `cmswing_area` VALUES ('420684', '宜城市', '420600', '10');
INSERT INTO `cmswing_area` VALUES ('420701', '市辖区', '420700', '1');
INSERT INTO `cmswing_area` VALUES ('420702', '梁子湖区', '420700', '2');
INSERT INTO `cmswing_area` VALUES ('420703', '华容区', '420700', '3');
INSERT INTO `cmswing_area` VALUES ('420704', '鄂城区', '420700', '4');
INSERT INTO `cmswing_area` VALUES ('420801', '市辖区', '420800', '1');
INSERT INTO `cmswing_area` VALUES ('420802', '东宝区', '420800', '2');
INSERT INTO `cmswing_area` VALUES ('420804', '掇刀区', '420800', '3');
INSERT INTO `cmswing_area` VALUES ('420821', '京山县', '420800', '4');
INSERT INTO `cmswing_area` VALUES ('420822', '沙洋县', '420800', '5');
INSERT INTO `cmswing_area` VALUES ('420881', '钟祥市', '420800', '6');
INSERT INTO `cmswing_area` VALUES ('420901', '市辖区', '420900', '1');
INSERT INTO `cmswing_area` VALUES ('420902', '孝南区', '420900', '2');
INSERT INTO `cmswing_area` VALUES ('420921', '孝昌县', '420900', '3');
INSERT INTO `cmswing_area` VALUES ('420922', '大悟县', '420900', '4');
INSERT INTO `cmswing_area` VALUES ('420923', '云梦县', '420900', '5');
INSERT INTO `cmswing_area` VALUES ('420981', '应城市', '420900', '6');
INSERT INTO `cmswing_area` VALUES ('420982', '安陆市', '420900', '7');
INSERT INTO `cmswing_area` VALUES ('420984', '汉川市', '420900', '8');
INSERT INTO `cmswing_area` VALUES ('421001', '市辖区', '421000', '1');
INSERT INTO `cmswing_area` VALUES ('421002', '沙市区', '421000', '2');
INSERT INTO `cmswing_area` VALUES ('421003', '荆州区', '421000', '3');
INSERT INTO `cmswing_area` VALUES ('421022', '公安县', '421000', '4');
INSERT INTO `cmswing_area` VALUES ('421023', '监利县', '421000', '5');
INSERT INTO `cmswing_area` VALUES ('421024', '江陵县', '421000', '6');
INSERT INTO `cmswing_area` VALUES ('421081', '石首市', '421000', '7');
INSERT INTO `cmswing_area` VALUES ('421083', '洪湖市', '421000', '8');
INSERT INTO `cmswing_area` VALUES ('421087', '松滋市', '421000', '9');
INSERT INTO `cmswing_area` VALUES ('421101', '市辖区', '421100', '1');
INSERT INTO `cmswing_area` VALUES ('421102', '黄州区', '421100', '2');
INSERT INTO `cmswing_area` VALUES ('421121', '团风县', '421100', '3');
INSERT INTO `cmswing_area` VALUES ('421122', '红安县', '421100', '4');
INSERT INTO `cmswing_area` VALUES ('421123', '罗田县', '421100', '5');
INSERT INTO `cmswing_area` VALUES ('421124', '英山县', '421100', '6');
INSERT INTO `cmswing_area` VALUES ('421125', '浠水县', '421100', '7');
INSERT INTO `cmswing_area` VALUES ('421126', '蕲春县', '421100', '8');
INSERT INTO `cmswing_area` VALUES ('421127', '黄梅县', '421100', '9');
INSERT INTO `cmswing_area` VALUES ('421181', '麻城市', '421100', '10');
INSERT INTO `cmswing_area` VALUES ('421182', '武穴市', '421100', '11');
INSERT INTO `cmswing_area` VALUES ('421201', '市辖区', '421200', '1');
INSERT INTO `cmswing_area` VALUES ('421202', '咸安区', '421200', '2');
INSERT INTO `cmswing_area` VALUES ('421221', '嘉鱼县', '421200', '3');
INSERT INTO `cmswing_area` VALUES ('421222', '通城县', '421200', '4');
INSERT INTO `cmswing_area` VALUES ('421223', '崇阳县', '421200', '5');
INSERT INTO `cmswing_area` VALUES ('421224', '通山县', '421200', '6');
INSERT INTO `cmswing_area` VALUES ('421281', '赤壁市', '421200', '7');
INSERT INTO `cmswing_area` VALUES ('421301', '市辖区', '421300', '1');
INSERT INTO `cmswing_area` VALUES ('421302', '曾都区', '421300', '2');
INSERT INTO `cmswing_area` VALUES ('421381', '广水市', '421300', '3');
INSERT INTO `cmswing_area` VALUES ('422801', '恩施市', '422800', '1');
INSERT INTO `cmswing_area` VALUES ('422802', '利川市', '422800', '2');
INSERT INTO `cmswing_area` VALUES ('422822', '建始县', '422800', '3');
INSERT INTO `cmswing_area` VALUES ('422823', '巴东县', '422800', '4');
INSERT INTO `cmswing_area` VALUES ('422825', '宣恩县', '422800', '5');
INSERT INTO `cmswing_area` VALUES ('422826', '咸丰县', '422800', '6');
INSERT INTO `cmswing_area` VALUES ('422827', '来凤县', '422800', '7');
INSERT INTO `cmswing_area` VALUES ('422828', '鹤峰县', '422800', '8');
INSERT INTO `cmswing_area` VALUES ('429004', '仙桃市', '429000', '1');
INSERT INTO `cmswing_area` VALUES ('429005', '潜江市', '429000', '2');
INSERT INTO `cmswing_area` VALUES ('429006', '天门市', '429000', '3');
INSERT INTO `cmswing_area` VALUES ('429021', '神农架林区', '429000', '4');
INSERT INTO `cmswing_area` VALUES ('430101', '市辖区', '430100', '1');
INSERT INTO `cmswing_area` VALUES ('430102', '芙蓉区', '430100', '2');
INSERT INTO `cmswing_area` VALUES ('430103', '天心区', '430100', '3');
INSERT INTO `cmswing_area` VALUES ('430104', '岳麓区', '430100', '4');
INSERT INTO `cmswing_area` VALUES ('430105', '开福区', '430100', '5');
INSERT INTO `cmswing_area` VALUES ('430111', '雨花区', '430100', '6');
INSERT INTO `cmswing_area` VALUES ('430121', '长沙县', '430100', '7');
INSERT INTO `cmswing_area` VALUES ('430122', '望城县', '430100', '8');
INSERT INTO `cmswing_area` VALUES ('430124', '宁乡县', '430100', '9');
INSERT INTO `cmswing_area` VALUES ('430181', '浏阳市', '430100', '10');
INSERT INTO `cmswing_area` VALUES ('430201', '市辖区', '430200', '1');
INSERT INTO `cmswing_area` VALUES ('430202', '荷塘区', '430200', '2');
INSERT INTO `cmswing_area` VALUES ('430203', '芦淞区', '430200', '3');
INSERT INTO `cmswing_area` VALUES ('430204', '石峰区', '430200', '4');
INSERT INTO `cmswing_area` VALUES ('430211', '天元区', '430200', '5');
INSERT INTO `cmswing_area` VALUES ('430221', '株洲县', '430200', '6');
INSERT INTO `cmswing_area` VALUES ('430223', '攸　县', '430200', '7');
INSERT INTO `cmswing_area` VALUES ('430224', '茶陵县', '430200', '8');
INSERT INTO `cmswing_area` VALUES ('430225', '炎陵县', '430200', '9');
INSERT INTO `cmswing_area` VALUES ('430281', '醴陵市', '430200', '10');
INSERT INTO `cmswing_area` VALUES ('430301', '市辖区', '430300', '1');
INSERT INTO `cmswing_area` VALUES ('430302', '雨湖区', '430300', '2');
INSERT INTO `cmswing_area` VALUES ('430304', '岳塘区', '430300', '3');
INSERT INTO `cmswing_area` VALUES ('430321', '湘潭县', '430300', '4');
INSERT INTO `cmswing_area` VALUES ('430381', '湘乡市', '430300', '5');
INSERT INTO `cmswing_area` VALUES ('430382', '韶山市', '430300', '6');
INSERT INTO `cmswing_area` VALUES ('430401', '市辖区', '430400', '1');
INSERT INTO `cmswing_area` VALUES ('430405', '珠晖区', '430400', '2');
INSERT INTO `cmswing_area` VALUES ('430406', '雁峰区', '430400', '3');
INSERT INTO `cmswing_area` VALUES ('430407', '石鼓区', '430400', '4');
INSERT INTO `cmswing_area` VALUES ('430408', '蒸湘区', '430400', '5');
INSERT INTO `cmswing_area` VALUES ('430412', '南岳区', '430400', '6');
INSERT INTO `cmswing_area` VALUES ('430421', '衡阳县', '430400', '7');
INSERT INTO `cmswing_area` VALUES ('430422', '衡南县', '430400', '8');
INSERT INTO `cmswing_area` VALUES ('430423', '衡山县', '430400', '9');
INSERT INTO `cmswing_area` VALUES ('430424', '衡东县', '430400', '10');
INSERT INTO `cmswing_area` VALUES ('430426', '祁东县', '430400', '11');
INSERT INTO `cmswing_area` VALUES ('430481', '耒阳市', '430400', '12');
INSERT INTO `cmswing_area` VALUES ('430482', '常宁市', '430400', '13');
INSERT INTO `cmswing_area` VALUES ('430501', '市辖区', '430500', '1');
INSERT INTO `cmswing_area` VALUES ('430502', '双清区', '430500', '2');
INSERT INTO `cmswing_area` VALUES ('430503', '大祥区', '430500', '3');
INSERT INTO `cmswing_area` VALUES ('430511', '北塔区', '430500', '4');
INSERT INTO `cmswing_area` VALUES ('430521', '邵东县', '430500', '5');
INSERT INTO `cmswing_area` VALUES ('430522', '新邵县', '430500', '6');
INSERT INTO `cmswing_area` VALUES ('430523', '邵阳县', '430500', '7');
INSERT INTO `cmswing_area` VALUES ('430524', '隆回县', '430500', '8');
INSERT INTO `cmswing_area` VALUES ('430525', '洞口县', '430500', '9');
INSERT INTO `cmswing_area` VALUES ('430527', '绥宁县', '430500', '10');
INSERT INTO `cmswing_area` VALUES ('430528', '新宁县', '430500', '11');
INSERT INTO `cmswing_area` VALUES ('430529', '城步苗族自治县', '430500', '12');
INSERT INTO `cmswing_area` VALUES ('430581', '武冈市', '430500', '13');
INSERT INTO `cmswing_area` VALUES ('430601', '市辖区', '430600', '1');
INSERT INTO `cmswing_area` VALUES ('430602', '岳阳楼区', '430600', '2');
INSERT INTO `cmswing_area` VALUES ('430603', '云溪区', '430600', '3');
INSERT INTO `cmswing_area` VALUES ('430611', '君山区', '430600', '4');
INSERT INTO `cmswing_area` VALUES ('430621', '岳阳县', '430600', '5');
INSERT INTO `cmswing_area` VALUES ('430623', '华容县', '430600', '6');
INSERT INTO `cmswing_area` VALUES ('430624', '湘阴县', '430600', '7');
INSERT INTO `cmswing_area` VALUES ('430626', '平江县', '430600', '8');
INSERT INTO `cmswing_area` VALUES ('430681', '汨罗市', '430600', '9');
INSERT INTO `cmswing_area` VALUES ('430682', '临湘市', '430600', '10');
INSERT INTO `cmswing_area` VALUES ('430701', '市辖区', '430700', '1');
INSERT INTO `cmswing_area` VALUES ('430702', '武陵区', '430700', '2');
INSERT INTO `cmswing_area` VALUES ('430703', '鼎城区', '430700', '3');
INSERT INTO `cmswing_area` VALUES ('430721', '安乡县', '430700', '4');
INSERT INTO `cmswing_area` VALUES ('430722', '汉寿县', '430700', '5');
INSERT INTO `cmswing_area` VALUES ('430723', '澧　县', '430700', '6');
INSERT INTO `cmswing_area` VALUES ('430724', '临澧县', '430700', '7');
INSERT INTO `cmswing_area` VALUES ('430725', '桃源县', '430700', '8');
INSERT INTO `cmswing_area` VALUES ('430726', '石门县', '430700', '9');
INSERT INTO `cmswing_area` VALUES ('430781', '津市市', '430700', '10');
INSERT INTO `cmswing_area` VALUES ('430801', '市辖区', '430800', '1');
INSERT INTO `cmswing_area` VALUES ('430802', '永定区', '430800', '2');
INSERT INTO `cmswing_area` VALUES ('430811', '武陵源区', '430800', '3');
INSERT INTO `cmswing_area` VALUES ('430821', '慈利县', '430800', '4');
INSERT INTO `cmswing_area` VALUES ('430822', '桑植县', '430800', '5');
INSERT INTO `cmswing_area` VALUES ('430901', '市辖区', '430900', '1');
INSERT INTO `cmswing_area` VALUES ('430902', '资阳区', '430900', '2');
INSERT INTO `cmswing_area` VALUES ('430903', '赫山区', '430900', '3');
INSERT INTO `cmswing_area` VALUES ('430921', '南　县', '430900', '4');
INSERT INTO `cmswing_area` VALUES ('430922', '桃江县', '430900', '5');
INSERT INTO `cmswing_area` VALUES ('430923', '安化县', '430900', '6');
INSERT INTO `cmswing_area` VALUES ('430981', '沅江市', '430900', '7');
INSERT INTO `cmswing_area` VALUES ('431001', '市辖区', '431000', '1');
INSERT INTO `cmswing_area` VALUES ('431002', '北湖区', '431000', '2');
INSERT INTO `cmswing_area` VALUES ('431003', '苏仙区', '431000', '3');
INSERT INTO `cmswing_area` VALUES ('431021', '桂阳县', '431000', '4');
INSERT INTO `cmswing_area` VALUES ('431022', '宜章县', '431000', '5');
INSERT INTO `cmswing_area` VALUES ('431023', '永兴县', '431000', '6');
INSERT INTO `cmswing_area` VALUES ('431024', '嘉禾县', '431000', '7');
INSERT INTO `cmswing_area` VALUES ('431025', '临武县', '431000', '8');
INSERT INTO `cmswing_area` VALUES ('431026', '汝城县', '431000', '9');
INSERT INTO `cmswing_area` VALUES ('431027', '桂东县', '431000', '10');
INSERT INTO `cmswing_area` VALUES ('431028', '安仁县', '431000', '11');
INSERT INTO `cmswing_area` VALUES ('431081', '资兴市', '431000', '12');
INSERT INTO `cmswing_area` VALUES ('431101', '市辖区', '431100', '1');
INSERT INTO `cmswing_area` VALUES ('431102', '芝山区', '431100', '2');
INSERT INTO `cmswing_area` VALUES ('431103', '冷水滩区', '431100', '3');
INSERT INTO `cmswing_area` VALUES ('431121', '祁阳县', '431100', '4');
INSERT INTO `cmswing_area` VALUES ('431122', '东安县', '431100', '5');
INSERT INTO `cmswing_area` VALUES ('431123', '双牌县', '431100', '6');
INSERT INTO `cmswing_area` VALUES ('431124', '道　县', '431100', '7');
INSERT INTO `cmswing_area` VALUES ('431125', '江永县', '431100', '8');
INSERT INTO `cmswing_area` VALUES ('431126', '宁远县', '431100', '9');
INSERT INTO `cmswing_area` VALUES ('431127', '蓝山县', '431100', '10');
INSERT INTO `cmswing_area` VALUES ('431128', '新田县', '431100', '11');
INSERT INTO `cmswing_area` VALUES ('431129', '江华瑶族自治县', '431100', '12');
INSERT INTO `cmswing_area` VALUES ('431201', '市辖区', '431200', '1');
INSERT INTO `cmswing_area` VALUES ('431202', '鹤城区', '431200', '2');
INSERT INTO `cmswing_area` VALUES ('431221', '中方县', '431200', '3');
INSERT INTO `cmswing_area` VALUES ('431222', '沅陵县', '431200', '4');
INSERT INTO `cmswing_area` VALUES ('431223', '辰溪县', '431200', '5');
INSERT INTO `cmswing_area` VALUES ('431224', '溆浦县', '431200', '6');
INSERT INTO `cmswing_area` VALUES ('431225', '会同县', '431200', '7');
INSERT INTO `cmswing_area` VALUES ('431226', '麻阳苗族自治县', '431200', '8');
INSERT INTO `cmswing_area` VALUES ('431227', '新晃侗族自治县', '431200', '9');
INSERT INTO `cmswing_area` VALUES ('431228', '芷江侗族自治县', '431200', '10');
INSERT INTO `cmswing_area` VALUES ('431229', '靖州苗族侗族自治县', '431200', '11');
INSERT INTO `cmswing_area` VALUES ('431230', '通道侗族自治县', '431200', '12');
INSERT INTO `cmswing_area` VALUES ('431281', '洪江市', '431200', '13');
INSERT INTO `cmswing_area` VALUES ('431301', '市辖区', '431300', '1');
INSERT INTO `cmswing_area` VALUES ('431302', '娄星区', '431300', '2');
INSERT INTO `cmswing_area` VALUES ('431321', '双峰县', '431300', '3');
INSERT INTO `cmswing_area` VALUES ('431322', '新化县', '431300', '4');
INSERT INTO `cmswing_area` VALUES ('431381', '冷水江市', '431300', '5');
INSERT INTO `cmswing_area` VALUES ('431382', '涟源市', '431300', '6');
INSERT INTO `cmswing_area` VALUES ('433101', '吉首市', '433100', '1');
INSERT INTO `cmswing_area` VALUES ('433122', '泸溪县', '433100', '2');
INSERT INTO `cmswing_area` VALUES ('433123', '凤凰县', '433100', '3');
INSERT INTO `cmswing_area` VALUES ('433124', '花垣县', '433100', '4');
INSERT INTO `cmswing_area` VALUES ('433125', '保靖县', '433100', '5');
INSERT INTO `cmswing_area` VALUES ('433126', '古丈县', '433100', '6');
INSERT INTO `cmswing_area` VALUES ('433127', '永顺县', '433100', '7');
INSERT INTO `cmswing_area` VALUES ('433130', '龙山县', '433100', '8');
INSERT INTO `cmswing_area` VALUES ('440101', '市辖区', '440100', '1');
INSERT INTO `cmswing_area` VALUES ('440102', '东山区', '440100', '2');
INSERT INTO `cmswing_area` VALUES ('440103', '荔湾区', '440100', '3');
INSERT INTO `cmswing_area` VALUES ('440104', '越秀区', '440100', '4');
INSERT INTO `cmswing_area` VALUES ('440105', '海珠区', '440100', '5');
INSERT INTO `cmswing_area` VALUES ('440106', '天河区', '440100', '6');
INSERT INTO `cmswing_area` VALUES ('440107', '芳村区', '440100', '7');
INSERT INTO `cmswing_area` VALUES ('440111', '白云区', '440100', '8');
INSERT INTO `cmswing_area` VALUES ('440112', '黄埔区', '440100', '9');
INSERT INTO `cmswing_area` VALUES ('440113', '番禺区', '440100', '10');
INSERT INTO `cmswing_area` VALUES ('440114', '花都区', '440100', '11');
INSERT INTO `cmswing_area` VALUES ('440183', '增城市', '440100', '12');
INSERT INTO `cmswing_area` VALUES ('440184', '从化市', '440100', '13');
INSERT INTO `cmswing_area` VALUES ('440201', '市辖区', '440200', '1');
INSERT INTO `cmswing_area` VALUES ('440203', '武江区', '440200', '2');
INSERT INTO `cmswing_area` VALUES ('440204', '浈江区', '440200', '3');
INSERT INTO `cmswing_area` VALUES ('440205', '曲江区', '440200', '4');
INSERT INTO `cmswing_area` VALUES ('440222', '始兴县', '440200', '5');
INSERT INTO `cmswing_area` VALUES ('440224', '仁化县', '440200', '6');
INSERT INTO `cmswing_area` VALUES ('440229', '翁源县', '440200', '7');
INSERT INTO `cmswing_area` VALUES ('440232', '乳源瑶族自治县', '440200', '8');
INSERT INTO `cmswing_area` VALUES ('440233', '新丰县', '440200', '9');
INSERT INTO `cmswing_area` VALUES ('440281', '乐昌市', '440200', '10');
INSERT INTO `cmswing_area` VALUES ('440282', '南雄市', '440200', '11');
INSERT INTO `cmswing_area` VALUES ('440301', '市辖区', '440300', '1');
INSERT INTO `cmswing_area` VALUES ('440303', '罗湖区', '440300', '2');
INSERT INTO `cmswing_area` VALUES ('440304', '福田区', '440300', '3');
INSERT INTO `cmswing_area` VALUES ('440305', '南山区', '440300', '4');
INSERT INTO `cmswing_area` VALUES ('440306', '宝安区', '440300', '5');
INSERT INTO `cmswing_area` VALUES ('440307', '龙岗区', '440300', '6');
INSERT INTO `cmswing_area` VALUES ('440308', '盐田区', '440300', '7');
INSERT INTO `cmswing_area` VALUES ('440401', '市辖区', '440400', '1');
INSERT INTO `cmswing_area` VALUES ('440402', '香洲区', '440400', '2');
INSERT INTO `cmswing_area` VALUES ('440403', '斗门区', '440400', '3');
INSERT INTO `cmswing_area` VALUES ('440404', '金湾区', '440400', '4');
INSERT INTO `cmswing_area` VALUES ('440501', '市辖区', '440500', '1');
INSERT INTO `cmswing_area` VALUES ('440507', '龙湖区', '440500', '2');
INSERT INTO `cmswing_area` VALUES ('440511', '金平区', '440500', '3');
INSERT INTO `cmswing_area` VALUES ('440512', '濠江区', '440500', '4');
INSERT INTO `cmswing_area` VALUES ('440513', '潮阳区', '440500', '5');
INSERT INTO `cmswing_area` VALUES ('440514', '潮南区', '440500', '6');
INSERT INTO `cmswing_area` VALUES ('440515', '澄海区', '440500', '7');
INSERT INTO `cmswing_area` VALUES ('440523', '南澳县', '440500', '8');
INSERT INTO `cmswing_area` VALUES ('440601', '市辖区', '440600', '1');
INSERT INTO `cmswing_area` VALUES ('440604', '禅城区', '440600', '2');
INSERT INTO `cmswing_area` VALUES ('440605', '南海区', '440600', '3');
INSERT INTO `cmswing_area` VALUES ('440606', '顺德区', '440600', '4');
INSERT INTO `cmswing_area` VALUES ('440607', '三水区', '440600', '5');
INSERT INTO `cmswing_area` VALUES ('440608', '高明区', '440600', '6');
INSERT INTO `cmswing_area` VALUES ('440701', '市辖区', '440700', '1');
INSERT INTO `cmswing_area` VALUES ('440703', '蓬江区', '440700', '2');
INSERT INTO `cmswing_area` VALUES ('440704', '江海区', '440700', '3');
INSERT INTO `cmswing_area` VALUES ('440705', '新会区', '440700', '4');
INSERT INTO `cmswing_area` VALUES ('440781', '台山市', '440700', '5');
INSERT INTO `cmswing_area` VALUES ('440783', '开平市', '440700', '6');
INSERT INTO `cmswing_area` VALUES ('440784', '鹤山市', '440700', '7');
INSERT INTO `cmswing_area` VALUES ('440785', '恩平市', '440700', '8');
INSERT INTO `cmswing_area` VALUES ('440801', '市辖区', '440800', '1');
INSERT INTO `cmswing_area` VALUES ('440802', '赤坎区', '440800', '2');
INSERT INTO `cmswing_area` VALUES ('440803', '霞山区', '440800', '3');
INSERT INTO `cmswing_area` VALUES ('440804', '坡头区', '440800', '4');
INSERT INTO `cmswing_area` VALUES ('440811', '麻章区', '440800', '5');
INSERT INTO `cmswing_area` VALUES ('440823', '遂溪县', '440800', '6');
INSERT INTO `cmswing_area` VALUES ('440825', '徐闻县', '440800', '7');
INSERT INTO `cmswing_area` VALUES ('440881', '廉江市', '440800', '8');
INSERT INTO `cmswing_area` VALUES ('440882', '雷州市', '440800', '9');
INSERT INTO `cmswing_area` VALUES ('440883', '吴川市', '440800', '10');
INSERT INTO `cmswing_area` VALUES ('440901', '市辖区', '440900', '1');
INSERT INTO `cmswing_area` VALUES ('440902', '茂南区', '440900', '2');
INSERT INTO `cmswing_area` VALUES ('440903', '茂港区', '440900', '3');
INSERT INTO `cmswing_area` VALUES ('440923', '电白县', '440900', '4');
INSERT INTO `cmswing_area` VALUES ('440981', '高州市', '440900', '5');
INSERT INTO `cmswing_area` VALUES ('440982', '化州市', '440900', '6');
INSERT INTO `cmswing_area` VALUES ('440983', '信宜市', '440900', '7');
INSERT INTO `cmswing_area` VALUES ('441201', '市辖区', '441200', '1');
INSERT INTO `cmswing_area` VALUES ('441202', '端州区', '441200', '2');
INSERT INTO `cmswing_area` VALUES ('441203', '鼎湖区', '441200', '3');
INSERT INTO `cmswing_area` VALUES ('441223', '广宁县', '441200', '4');
INSERT INTO `cmswing_area` VALUES ('441224', '怀集县', '441200', '5');
INSERT INTO `cmswing_area` VALUES ('441225', '封开县', '441200', '6');
INSERT INTO `cmswing_area` VALUES ('441226', '德庆县', '441200', '7');
INSERT INTO `cmswing_area` VALUES ('441283', '高要市', '441200', '8');
INSERT INTO `cmswing_area` VALUES ('441284', '四会市', '441200', '9');
INSERT INTO `cmswing_area` VALUES ('441301', '市辖区', '441300', '1');
INSERT INTO `cmswing_area` VALUES ('441302', '惠城区', '441300', '2');
INSERT INTO `cmswing_area` VALUES ('441303', '惠阳区', '441300', '3');
INSERT INTO `cmswing_area` VALUES ('441322', '博罗县', '441300', '4');
INSERT INTO `cmswing_area` VALUES ('441323', '惠东县', '441300', '5');
INSERT INTO `cmswing_area` VALUES ('441324', '龙门县', '441300', '6');
INSERT INTO `cmswing_area` VALUES ('441401', '市辖区', '441400', '1');
INSERT INTO `cmswing_area` VALUES ('441402', '梅江区', '441400', '2');
INSERT INTO `cmswing_area` VALUES ('441421', '梅　县', '441400', '3');
INSERT INTO `cmswing_area` VALUES ('441422', '大埔县', '441400', '4');
INSERT INTO `cmswing_area` VALUES ('441423', '丰顺县', '441400', '5');
INSERT INTO `cmswing_area` VALUES ('441424', '五华县', '441400', '6');
INSERT INTO `cmswing_area` VALUES ('441426', '平远县', '441400', '7');
INSERT INTO `cmswing_area` VALUES ('441427', '蕉岭县', '441400', '8');
INSERT INTO `cmswing_area` VALUES ('441481', '兴宁市', '441400', '9');
INSERT INTO `cmswing_area` VALUES ('441501', '市辖区', '441500', '1');
INSERT INTO `cmswing_area` VALUES ('441502', '城　区', '441500', '2');
INSERT INTO `cmswing_area` VALUES ('441521', '海丰县', '441500', '3');
INSERT INTO `cmswing_area` VALUES ('441523', '陆河县', '441500', '4');
INSERT INTO `cmswing_area` VALUES ('441581', '陆丰市', '441500', '5');
INSERT INTO `cmswing_area` VALUES ('441601', '市辖区', '441600', '1');
INSERT INTO `cmswing_area` VALUES ('441602', '源城区', '441600', '2');
INSERT INTO `cmswing_area` VALUES ('441621', '紫金县', '441600', '3');
INSERT INTO `cmswing_area` VALUES ('441622', '龙川县', '441600', '4');
INSERT INTO `cmswing_area` VALUES ('441623', '连平县', '441600', '5');
INSERT INTO `cmswing_area` VALUES ('441624', '和平县', '441600', '6');
INSERT INTO `cmswing_area` VALUES ('441625', '东源县', '441600', '7');
INSERT INTO `cmswing_area` VALUES ('441701', '市辖区', '441700', '1');
INSERT INTO `cmswing_area` VALUES ('441702', '江城区', '441700', '2');
INSERT INTO `cmswing_area` VALUES ('441721', '阳西县', '441700', '3');
INSERT INTO `cmswing_area` VALUES ('441723', '阳东县', '441700', '4');
INSERT INTO `cmswing_area` VALUES ('441781', '阳春市', '441700', '5');
INSERT INTO `cmswing_area` VALUES ('441801', '市辖区', '441800', '1');
INSERT INTO `cmswing_area` VALUES ('441802', '清城区', '441800', '2');
INSERT INTO `cmswing_area` VALUES ('441821', '佛冈县', '441800', '3');
INSERT INTO `cmswing_area` VALUES ('441823', '阳山县', '441800', '4');
INSERT INTO `cmswing_area` VALUES ('441825', '连山壮族瑶族自治县', '441800', '5');
INSERT INTO `cmswing_area` VALUES ('441826', '连南瑶族自治县', '441800', '6');
INSERT INTO `cmswing_area` VALUES ('441827', '清新县', '441800', '7');
INSERT INTO `cmswing_area` VALUES ('441881', '英德市', '441800', '8');
INSERT INTO `cmswing_area` VALUES ('441882', '连州市', '441800', '9');
INSERT INTO `cmswing_area` VALUES ('445101', '市辖区', '445100', '1');
INSERT INTO `cmswing_area` VALUES ('445102', '湘桥区', '445100', '2');
INSERT INTO `cmswing_area` VALUES ('445121', '潮安县', '445100', '3');
INSERT INTO `cmswing_area` VALUES ('445122', '饶平县', '445100', '4');
INSERT INTO `cmswing_area` VALUES ('445201', '市辖区', '445200', '1');
INSERT INTO `cmswing_area` VALUES ('445202', '榕城区', '445200', '2');
INSERT INTO `cmswing_area` VALUES ('445221', '揭东县', '445200', '3');
INSERT INTO `cmswing_area` VALUES ('445222', '揭西县', '445200', '4');
INSERT INTO `cmswing_area` VALUES ('445224', '惠来县', '445200', '5');
INSERT INTO `cmswing_area` VALUES ('445281', '普宁市', '445200', '6');
INSERT INTO `cmswing_area` VALUES ('445301', '市辖区', '445300', '1');
INSERT INTO `cmswing_area` VALUES ('445302', '云城区', '445300', '2');
INSERT INTO `cmswing_area` VALUES ('445321', '新兴县', '445300', '3');
INSERT INTO `cmswing_area` VALUES ('445322', '郁南县', '445300', '4');
INSERT INTO `cmswing_area` VALUES ('445323', '云安县', '445300', '5');
INSERT INTO `cmswing_area` VALUES ('445381', '罗定市', '445300', '6');
INSERT INTO `cmswing_area` VALUES ('450101', '市辖区', '450100', '1');
INSERT INTO `cmswing_area` VALUES ('450102', '兴宁区', '450100', '2');
INSERT INTO `cmswing_area` VALUES ('450103', '青秀区', '450100', '3');
INSERT INTO `cmswing_area` VALUES ('450105', '江南区', '450100', '4');
INSERT INTO `cmswing_area` VALUES ('450107', '西乡塘区', '450100', '5');
INSERT INTO `cmswing_area` VALUES ('450108', '良庆区', '450100', '6');
INSERT INTO `cmswing_area` VALUES ('450109', '邕宁区', '450100', '7');
INSERT INTO `cmswing_area` VALUES ('450122', '武鸣县', '450100', '8');
INSERT INTO `cmswing_area` VALUES ('450123', '隆安县', '450100', '9');
INSERT INTO `cmswing_area` VALUES ('450124', '马山县', '450100', '10');
INSERT INTO `cmswing_area` VALUES ('450125', '上林县', '450100', '11');
INSERT INTO `cmswing_area` VALUES ('450126', '宾阳县', '450100', '12');
INSERT INTO `cmswing_area` VALUES ('450127', '横　县', '450100', '13');
INSERT INTO `cmswing_area` VALUES ('450201', '市辖区', '450200', '1');
INSERT INTO `cmswing_area` VALUES ('450202', '城中区', '450200', '2');
INSERT INTO `cmswing_area` VALUES ('450203', '鱼峰区', '450200', '3');
INSERT INTO `cmswing_area` VALUES ('450204', '柳南区', '450200', '4');
INSERT INTO `cmswing_area` VALUES ('450205', '柳北区', '450200', '5');
INSERT INTO `cmswing_area` VALUES ('450221', '柳江县', '450200', '6');
INSERT INTO `cmswing_area` VALUES ('450222', '柳城县', '450200', '7');
INSERT INTO `cmswing_area` VALUES ('450223', '鹿寨县', '450200', '8');
INSERT INTO `cmswing_area` VALUES ('450224', '融安县', '450200', '9');
INSERT INTO `cmswing_area` VALUES ('450225', '融水苗族自治县', '450200', '10');
INSERT INTO `cmswing_area` VALUES ('450226', '三江侗族自治县', '450200', '11');
INSERT INTO `cmswing_area` VALUES ('450301', '市辖区', '450300', '1');
INSERT INTO `cmswing_area` VALUES ('450302', '秀峰区', '450300', '2');
INSERT INTO `cmswing_area` VALUES ('450303', '叠彩区', '450300', '3');
INSERT INTO `cmswing_area` VALUES ('450304', '象山区', '450300', '4');
INSERT INTO `cmswing_area` VALUES ('450305', '七星区', '450300', '5');
INSERT INTO `cmswing_area` VALUES ('450311', '雁山区', '450300', '6');
INSERT INTO `cmswing_area` VALUES ('450321', '阳朔县', '450300', '7');
INSERT INTO `cmswing_area` VALUES ('450322', '临桂县', '450300', '8');
INSERT INTO `cmswing_area` VALUES ('450323', '灵川县', '450300', '9');
INSERT INTO `cmswing_area` VALUES ('450324', '全州县', '450300', '10');
INSERT INTO `cmswing_area` VALUES ('450325', '兴安县', '450300', '11');
INSERT INTO `cmswing_area` VALUES ('450326', '永福县', '450300', '12');
INSERT INTO `cmswing_area` VALUES ('450327', '灌阳县', '450300', '13');
INSERT INTO `cmswing_area` VALUES ('450328', '龙胜各族自治县', '450300', '14');
INSERT INTO `cmswing_area` VALUES ('450329', '资源县', '450300', '15');
INSERT INTO `cmswing_area` VALUES ('450330', '平乐县', '450300', '16');
INSERT INTO `cmswing_area` VALUES ('450331', '荔蒲县', '450300', '17');
INSERT INTO `cmswing_area` VALUES ('450332', '恭城瑶族自治县', '450300', '18');
INSERT INTO `cmswing_area` VALUES ('450401', '市辖区', '450400', '1');
INSERT INTO `cmswing_area` VALUES ('450403', '万秀区', '450400', '2');
INSERT INTO `cmswing_area` VALUES ('450404', '蝶山区', '450400', '3');
INSERT INTO `cmswing_area` VALUES ('450405', '长洲区', '450400', '4');
INSERT INTO `cmswing_area` VALUES ('450421', '苍梧县', '450400', '5');
INSERT INTO `cmswing_area` VALUES ('450422', '藤　县', '450400', '6');
INSERT INTO `cmswing_area` VALUES ('450423', '蒙山县', '450400', '7');
INSERT INTO `cmswing_area` VALUES ('450481', '岑溪市', '450400', '8');
INSERT INTO `cmswing_area` VALUES ('450501', '市辖区', '450500', '1');
INSERT INTO `cmswing_area` VALUES ('450502', '海城区', '450500', '2');
INSERT INTO `cmswing_area` VALUES ('450503', '银海区', '450500', '3');
INSERT INTO `cmswing_area` VALUES ('450512', '铁山港区', '450500', '4');
INSERT INTO `cmswing_area` VALUES ('450521', '合浦县', '450500', '5');
INSERT INTO `cmswing_area` VALUES ('450601', '市辖区', '450600', '1');
INSERT INTO `cmswing_area` VALUES ('450602', '港口区', '450600', '2');
INSERT INTO `cmswing_area` VALUES ('450603', '防城区', '450600', '3');
INSERT INTO `cmswing_area` VALUES ('450621', '上思县', '450600', '4');
INSERT INTO `cmswing_area` VALUES ('450681', '东兴市', '450600', '5');
INSERT INTO `cmswing_area` VALUES ('450701', '市辖区', '450700', '1');
INSERT INTO `cmswing_area` VALUES ('450702', '钦南区', '450700', '2');
INSERT INTO `cmswing_area` VALUES ('450703', '钦北区', '450700', '3');
INSERT INTO `cmswing_area` VALUES ('450721', '灵山县', '450700', '4');
INSERT INTO `cmswing_area` VALUES ('450722', '浦北县', '450700', '5');
INSERT INTO `cmswing_area` VALUES ('450801', '市辖区', '450800', '1');
INSERT INTO `cmswing_area` VALUES ('450802', '港北区', '450800', '2');
INSERT INTO `cmswing_area` VALUES ('450803', '港南区', '450800', '3');
INSERT INTO `cmswing_area` VALUES ('450804', '覃塘区', '450800', '4');
INSERT INTO `cmswing_area` VALUES ('450821', '平南县', '450800', '5');
INSERT INTO `cmswing_area` VALUES ('450881', '桂平市', '450800', '6');
INSERT INTO `cmswing_area` VALUES ('450901', '市辖区', '450900', '1');
INSERT INTO `cmswing_area` VALUES ('450902', '玉州区', '450900', '2');
INSERT INTO `cmswing_area` VALUES ('450921', '容　县', '450900', '3');
INSERT INTO `cmswing_area` VALUES ('450922', '陆川县', '450900', '4');
INSERT INTO `cmswing_area` VALUES ('450923', '博白县', '450900', '5');
INSERT INTO `cmswing_area` VALUES ('450924', '兴业县', '450900', '6');
INSERT INTO `cmswing_area` VALUES ('450981', '北流市', '450900', '7');
INSERT INTO `cmswing_area` VALUES ('451001', '市辖区', '451000', '1');
INSERT INTO `cmswing_area` VALUES ('451002', '右江区', '451000', '2');
INSERT INTO `cmswing_area` VALUES ('451021', '田阳县', '451000', '3');
INSERT INTO `cmswing_area` VALUES ('451022', '田东县', '451000', '4');
INSERT INTO `cmswing_area` VALUES ('451023', '平果县', '451000', '5');
INSERT INTO `cmswing_area` VALUES ('451024', '德保县', '451000', '6');
INSERT INTO `cmswing_area` VALUES ('451025', '靖西县', '451000', '7');
INSERT INTO `cmswing_area` VALUES ('451026', '那坡县', '451000', '8');
INSERT INTO `cmswing_area` VALUES ('451027', '凌云县', '451000', '9');
INSERT INTO `cmswing_area` VALUES ('451028', '乐业县', '451000', '10');
INSERT INTO `cmswing_area` VALUES ('451029', '田林县', '451000', '11');
INSERT INTO `cmswing_area` VALUES ('451030', '西林县', '451000', '12');
INSERT INTO `cmswing_area` VALUES ('451031', '隆林各族自治县', '451000', '13');
INSERT INTO `cmswing_area` VALUES ('451101', '市辖区', '451100', '1');
INSERT INTO `cmswing_area` VALUES ('451102', '八步区', '451100', '2');
INSERT INTO `cmswing_area` VALUES ('451121', '昭平县', '451100', '3');
INSERT INTO `cmswing_area` VALUES ('451122', '钟山县', '451100', '4');
INSERT INTO `cmswing_area` VALUES ('451123', '富川瑶族自治县', '451100', '5');
INSERT INTO `cmswing_area` VALUES ('451201', '市辖区', '451200', '1');
INSERT INTO `cmswing_area` VALUES ('451202', '金城江区', '451200', '2');
INSERT INTO `cmswing_area` VALUES ('451221', '南丹县', '451200', '3');
INSERT INTO `cmswing_area` VALUES ('451222', '天峨县', '451200', '4');
INSERT INTO `cmswing_area` VALUES ('451223', '凤山县', '451200', '5');
INSERT INTO `cmswing_area` VALUES ('451224', '东兰县', '451200', '6');
INSERT INTO `cmswing_area` VALUES ('451225', '罗城仫佬族自治县', '451200', '7');
INSERT INTO `cmswing_area` VALUES ('451226', '环江毛南族自治县', '451200', '8');
INSERT INTO `cmswing_area` VALUES ('451227', '巴马瑶族自治县', '451200', '9');
INSERT INTO `cmswing_area` VALUES ('451228', '都安瑶族自治县', '451200', '10');
INSERT INTO `cmswing_area` VALUES ('451229', '大化瑶族自治县', '451200', '11');
INSERT INTO `cmswing_area` VALUES ('451281', '宜州市', '451200', '12');
INSERT INTO `cmswing_area` VALUES ('451301', '市辖区', '451300', '1');
INSERT INTO `cmswing_area` VALUES ('451302', '兴宾区', '451300', '2');
INSERT INTO `cmswing_area` VALUES ('451321', '忻城县', '451300', '3');
INSERT INTO `cmswing_area` VALUES ('451322', '象州县', '451300', '4');
INSERT INTO `cmswing_area` VALUES ('451323', '武宣县', '451300', '5');
INSERT INTO `cmswing_area` VALUES ('451324', '金秀瑶族自治县', '451300', '6');
INSERT INTO `cmswing_area` VALUES ('451381', '合山市', '451300', '7');
INSERT INTO `cmswing_area` VALUES ('451401', '市辖区', '451400', '1');
INSERT INTO `cmswing_area` VALUES ('451402', '江洲区', '451400', '2');
INSERT INTO `cmswing_area` VALUES ('451421', '扶绥县', '451400', '3');
INSERT INTO `cmswing_area` VALUES ('451422', '宁明县', '451400', '4');
INSERT INTO `cmswing_area` VALUES ('451423', '龙州县', '451400', '5');
INSERT INTO `cmswing_area` VALUES ('451424', '大新县', '451400', '6');
INSERT INTO `cmswing_area` VALUES ('451425', '天等县', '451400', '7');
INSERT INTO `cmswing_area` VALUES ('451481', '凭祥市', '451400', '8');
INSERT INTO `cmswing_area` VALUES ('460101', '市辖区', '460100', '1');
INSERT INTO `cmswing_area` VALUES ('460105', '秀英区', '460100', '2');
INSERT INTO `cmswing_area` VALUES ('460106', '龙华区', '460100', '3');
INSERT INTO `cmswing_area` VALUES ('460107', '琼山区', '460100', '4');
INSERT INTO `cmswing_area` VALUES ('460108', '美兰区', '460100', '5');
INSERT INTO `cmswing_area` VALUES ('460201', '市辖区', '460200', '1');
INSERT INTO `cmswing_area` VALUES ('469001', '五指山市', '469000', '1');
INSERT INTO `cmswing_area` VALUES ('469002', '琼海市', '469000', '2');
INSERT INTO `cmswing_area` VALUES ('469003', '儋州市', '469000', '3');
INSERT INTO `cmswing_area` VALUES ('469005', '文昌市', '469000', '4');
INSERT INTO `cmswing_area` VALUES ('469006', '万宁市', '469000', '5');
INSERT INTO `cmswing_area` VALUES ('469007', '东方市', '469000', '6');
INSERT INTO `cmswing_area` VALUES ('469025', '定安县', '469000', '7');
INSERT INTO `cmswing_area` VALUES ('469026', '屯昌县', '469000', '8');
INSERT INTO `cmswing_area` VALUES ('469027', '澄迈县', '469000', '9');
INSERT INTO `cmswing_area` VALUES ('469028', '临高县', '469000', '10');
INSERT INTO `cmswing_area` VALUES ('469030', '白沙黎族自治县', '469000', '11');
INSERT INTO `cmswing_area` VALUES ('469031', '昌江黎族自治县', '469000', '12');
INSERT INTO `cmswing_area` VALUES ('469033', '乐东黎族自治县', '469000', '13');
INSERT INTO `cmswing_area` VALUES ('469034', '陵水黎族自治县', '469000', '14');
INSERT INTO `cmswing_area` VALUES ('469035', '保亭黎族苗族自治县', '469000', '15');
INSERT INTO `cmswing_area` VALUES ('469036', '琼中黎族苗族自治县', '469000', '16');
INSERT INTO `cmswing_area` VALUES ('469037', '西沙群岛', '469000', '17');
INSERT INTO `cmswing_area` VALUES ('469038', '南沙群岛', '469000', '18');
INSERT INTO `cmswing_area` VALUES ('469039', '中沙群岛的岛礁及其海域', '469000', '19');
INSERT INTO `cmswing_area` VALUES ('500101', '万州区', '500100', '1');
INSERT INTO `cmswing_area` VALUES ('500102', '涪陵区', '500100', '2');
INSERT INTO `cmswing_area` VALUES ('500103', '渝中区', '500100', '3');
INSERT INTO `cmswing_area` VALUES ('500104', '大渡口区', '500100', '4');
INSERT INTO `cmswing_area` VALUES ('500105', '江北区', '500100', '5');
INSERT INTO `cmswing_area` VALUES ('500106', '沙坪坝区', '500100', '6');
INSERT INTO `cmswing_area` VALUES ('500107', '九龙坡区', '500100', '7');
INSERT INTO `cmswing_area` VALUES ('500108', '南岸区', '500100', '8');
INSERT INTO `cmswing_area` VALUES ('500109', '北碚区', '500100', '9');
INSERT INTO `cmswing_area` VALUES ('500110', '万盛区', '500100', '10');
INSERT INTO `cmswing_area` VALUES ('500111', '双桥区', '500100', '11');
INSERT INTO `cmswing_area` VALUES ('500112', '渝北区', '500100', '12');
INSERT INTO `cmswing_area` VALUES ('500113', '巴南区', '500100', '13');
INSERT INTO `cmswing_area` VALUES ('500114', '黔江区', '500100', '14');
INSERT INTO `cmswing_area` VALUES ('500115', '长寿区', '500100', '15');
INSERT INTO `cmswing_area` VALUES ('500222', '綦江县', '500200', '1');
INSERT INTO `cmswing_area` VALUES ('500223', '潼南县', '500200', '2');
INSERT INTO `cmswing_area` VALUES ('500224', '铜梁县', '500200', '3');
INSERT INTO `cmswing_area` VALUES ('500225', '大足县', '500200', '4');
INSERT INTO `cmswing_area` VALUES ('500226', '荣昌县', '500200', '5');
INSERT INTO `cmswing_area` VALUES ('500227', '璧山县', '500200', '6');
INSERT INTO `cmswing_area` VALUES ('500228', '梁平县', '500200', '7');
INSERT INTO `cmswing_area` VALUES ('500229', '城口县', '500200', '8');
INSERT INTO `cmswing_area` VALUES ('500230', '丰都县', '500200', '9');
INSERT INTO `cmswing_area` VALUES ('500231', '垫江县', '500200', '10');
INSERT INTO `cmswing_area` VALUES ('500232', '武隆县', '500200', '11');
INSERT INTO `cmswing_area` VALUES ('500233', '忠　县', '500200', '12');
INSERT INTO `cmswing_area` VALUES ('500234', '开　县', '500200', '13');
INSERT INTO `cmswing_area` VALUES ('500235', '云阳县', '500200', '14');
INSERT INTO `cmswing_area` VALUES ('500236', '奉节县', '500200', '15');
INSERT INTO `cmswing_area` VALUES ('500237', '巫山县', '500200', '16');
INSERT INTO `cmswing_area` VALUES ('500238', '巫溪县', '500200', '17');
INSERT INTO `cmswing_area` VALUES ('500240', '石柱土家族自治县', '500200', '18');
INSERT INTO `cmswing_area` VALUES ('500241', '秀山土家族苗族自治县', '500200', '19');
INSERT INTO `cmswing_area` VALUES ('500242', '酉阳土家族苗族自治县', '500200', '20');
INSERT INTO `cmswing_area` VALUES ('500243', '彭水苗族土家族自治县', '500200', '21');
INSERT INTO `cmswing_area` VALUES ('500381', '江津市', '500300', '1');
INSERT INTO `cmswing_area` VALUES ('500382', '合川市', '500300', '2');
INSERT INTO `cmswing_area` VALUES ('500383', '永川市', '500300', '3');
INSERT INTO `cmswing_area` VALUES ('500384', '南川市', '500300', '4');
INSERT INTO `cmswing_area` VALUES ('510101', '市辖区', '510100', '1');
INSERT INTO `cmswing_area` VALUES ('510104', '锦江区', '510100', '2');
INSERT INTO `cmswing_area` VALUES ('510105', '青羊区', '510100', '3');
INSERT INTO `cmswing_area` VALUES ('510106', '金牛区', '510100', '4');
INSERT INTO `cmswing_area` VALUES ('510107', '武侯区', '510100', '5');
INSERT INTO `cmswing_area` VALUES ('510108', '成华区', '510100', '6');
INSERT INTO `cmswing_area` VALUES ('510112', '龙泉驿区', '510100', '7');
INSERT INTO `cmswing_area` VALUES ('510113', '青白江区', '510100', '8');
INSERT INTO `cmswing_area` VALUES ('510114', '新都区', '510100', '9');
INSERT INTO `cmswing_area` VALUES ('510115', '温江区', '510100', '10');
INSERT INTO `cmswing_area` VALUES ('510121', '金堂县', '510100', '11');
INSERT INTO `cmswing_area` VALUES ('510122', '双流县', '510100', '12');
INSERT INTO `cmswing_area` VALUES ('510124', '郫　县', '510100', '13');
INSERT INTO `cmswing_area` VALUES ('510129', '大邑县', '510100', '14');
INSERT INTO `cmswing_area` VALUES ('510131', '蒲江县', '510100', '15');
INSERT INTO `cmswing_area` VALUES ('510132', '新津县', '510100', '16');
INSERT INTO `cmswing_area` VALUES ('510181', '都江堰市', '510100', '17');
INSERT INTO `cmswing_area` VALUES ('510182', '彭州市', '510100', '18');
INSERT INTO `cmswing_area` VALUES ('510183', '邛崃市', '510100', '19');
INSERT INTO `cmswing_area` VALUES ('510184', '崇州市', '510100', '20');
INSERT INTO `cmswing_area` VALUES ('510301', '市辖区', '510300', '1');
INSERT INTO `cmswing_area` VALUES ('510302', '自流井区', '510300', '2');
INSERT INTO `cmswing_area` VALUES ('510303', '贡井区', '510300', '3');
INSERT INTO `cmswing_area` VALUES ('510304', '大安区', '510300', '4');
INSERT INTO `cmswing_area` VALUES ('510311', '沿滩区', '510300', '5');
INSERT INTO `cmswing_area` VALUES ('510321', '荣　县', '510300', '6');
INSERT INTO `cmswing_area` VALUES ('510322', '富顺县', '510300', '7');
INSERT INTO `cmswing_area` VALUES ('510401', '市辖区', '510400', '1');
INSERT INTO `cmswing_area` VALUES ('510402', '东　区', '510400', '2');
INSERT INTO `cmswing_area` VALUES ('510403', '西　区', '510400', '3');
INSERT INTO `cmswing_area` VALUES ('510411', '仁和区', '510400', '4');
INSERT INTO `cmswing_area` VALUES ('510421', '米易县', '510400', '5');
INSERT INTO `cmswing_area` VALUES ('510422', '盐边县', '510400', '6');
INSERT INTO `cmswing_area` VALUES ('510501', '市辖区', '510500', '1');
INSERT INTO `cmswing_area` VALUES ('510502', '江阳区', '510500', '2');
INSERT INTO `cmswing_area` VALUES ('510503', '纳溪区', '510500', '3');
INSERT INTO `cmswing_area` VALUES ('510504', '龙马潭区', '510500', '4');
INSERT INTO `cmswing_area` VALUES ('510521', '泸　县', '510500', '5');
INSERT INTO `cmswing_area` VALUES ('510522', '合江县', '510500', '6');
INSERT INTO `cmswing_area` VALUES ('510524', '叙永县', '510500', '7');
INSERT INTO `cmswing_area` VALUES ('510525', '古蔺县', '510500', '8');
INSERT INTO `cmswing_area` VALUES ('510601', '市辖区', '510600', '1');
INSERT INTO `cmswing_area` VALUES ('510603', '旌阳区', '510600', '2');
INSERT INTO `cmswing_area` VALUES ('510623', '中江县', '510600', '3');
INSERT INTO `cmswing_area` VALUES ('510626', '罗江县', '510600', '4');
INSERT INTO `cmswing_area` VALUES ('510681', '广汉市', '510600', '5');
INSERT INTO `cmswing_area` VALUES ('510682', '什邡市', '510600', '6');
INSERT INTO `cmswing_area` VALUES ('510683', '绵竹市', '510600', '7');
INSERT INTO `cmswing_area` VALUES ('510701', '市辖区', '510700', '1');
INSERT INTO `cmswing_area` VALUES ('510703', '涪城区', '510700', '2');
INSERT INTO `cmswing_area` VALUES ('510704', '游仙区', '510700', '3');
INSERT INTO `cmswing_area` VALUES ('510722', '三台县', '510700', '4');
INSERT INTO `cmswing_area` VALUES ('510723', '盐亭县', '510700', '5');
INSERT INTO `cmswing_area` VALUES ('510724', '安　县', '510700', '6');
INSERT INTO `cmswing_area` VALUES ('510725', '梓潼县', '510700', '7');
INSERT INTO `cmswing_area` VALUES ('510726', '北川羌族自治县', '510700', '8');
INSERT INTO `cmswing_area` VALUES ('510727', '平武县', '510700', '9');
INSERT INTO `cmswing_area` VALUES ('510781', '江油市', '510700', '10');
INSERT INTO `cmswing_area` VALUES ('510801', '市辖区', '510800', '1');
INSERT INTO `cmswing_area` VALUES ('510802', '市中区', '510800', '2');
INSERT INTO `cmswing_area` VALUES ('510811', '元坝区', '510800', '3');
INSERT INTO `cmswing_area` VALUES ('510812', '朝天区', '510800', '4');
INSERT INTO `cmswing_area` VALUES ('510821', '旺苍县', '510800', '5');
INSERT INTO `cmswing_area` VALUES ('510822', '青川县', '510800', '6');
INSERT INTO `cmswing_area` VALUES ('510823', '剑阁县', '510800', '7');
INSERT INTO `cmswing_area` VALUES ('510824', '苍溪县', '510800', '8');
INSERT INTO `cmswing_area` VALUES ('510901', '市辖区', '510900', '1');
INSERT INTO `cmswing_area` VALUES ('510903', '船山区', '510900', '2');
INSERT INTO `cmswing_area` VALUES ('510904', '安居区', '510900', '3');
INSERT INTO `cmswing_area` VALUES ('510921', '蓬溪县', '510900', '4');
INSERT INTO `cmswing_area` VALUES ('510922', '射洪县', '510900', '5');
INSERT INTO `cmswing_area` VALUES ('510923', '大英县', '510900', '6');
INSERT INTO `cmswing_area` VALUES ('511001', '市辖区', '511000', '1');
INSERT INTO `cmswing_area` VALUES ('511002', '市中区', '511000', '2');
INSERT INTO `cmswing_area` VALUES ('511011', '东兴区', '511000', '3');
INSERT INTO `cmswing_area` VALUES ('511024', '威远县', '511000', '4');
INSERT INTO `cmswing_area` VALUES ('511025', '资中县', '511000', '5');
INSERT INTO `cmswing_area` VALUES ('511028', '隆昌县', '511000', '6');
INSERT INTO `cmswing_area` VALUES ('511101', '市辖区', '511100', '1');
INSERT INTO `cmswing_area` VALUES ('511102', '市中区', '511100', '2');
INSERT INTO `cmswing_area` VALUES ('511111', '沙湾区', '511100', '3');
INSERT INTO `cmswing_area` VALUES ('511112', '五通桥区', '511100', '4');
INSERT INTO `cmswing_area` VALUES ('511113', '金口河区', '511100', '5');
INSERT INTO `cmswing_area` VALUES ('511123', '犍为县', '511100', '6');
INSERT INTO `cmswing_area` VALUES ('511124', '井研县', '511100', '7');
INSERT INTO `cmswing_area` VALUES ('511126', '夹江县', '511100', '8');
INSERT INTO `cmswing_area` VALUES ('511129', '沐川县', '511100', '9');
INSERT INTO `cmswing_area` VALUES ('511132', '峨边彝族自治县', '511100', '10');
INSERT INTO `cmswing_area` VALUES ('511133', '马边彝族自治县', '511100', '11');
INSERT INTO `cmswing_area` VALUES ('511181', '峨眉山市', '511100', '12');
INSERT INTO `cmswing_area` VALUES ('511301', '市辖区', '511300', '1');
INSERT INTO `cmswing_area` VALUES ('511302', '顺庆区', '511300', '2');
INSERT INTO `cmswing_area` VALUES ('511303', '高坪区', '511300', '3');
INSERT INTO `cmswing_area` VALUES ('511304', '嘉陵区', '511300', '4');
INSERT INTO `cmswing_area` VALUES ('511321', '南部县', '511300', '5');
INSERT INTO `cmswing_area` VALUES ('511322', '营山县', '511300', '6');
INSERT INTO `cmswing_area` VALUES ('511323', '蓬安县', '511300', '7');
INSERT INTO `cmswing_area` VALUES ('511324', '仪陇县', '511300', '8');
INSERT INTO `cmswing_area` VALUES ('511325', '西充县', '511300', '9');
INSERT INTO `cmswing_area` VALUES ('511381', '阆中市', '511300', '10');
INSERT INTO `cmswing_area` VALUES ('511401', '市辖区', '511400', '1');
INSERT INTO `cmswing_area` VALUES ('511402', '东坡区', '511400', '2');
INSERT INTO `cmswing_area` VALUES ('511421', '仁寿县', '511400', '3');
INSERT INTO `cmswing_area` VALUES ('511422', '彭山县', '511400', '4');
INSERT INTO `cmswing_area` VALUES ('511423', '洪雅县', '511400', '5');
INSERT INTO `cmswing_area` VALUES ('511424', '丹棱县', '511400', '6');
INSERT INTO `cmswing_area` VALUES ('511425', '青神县', '511400', '7');
INSERT INTO `cmswing_area` VALUES ('511501', '市辖区', '511500', '1');
INSERT INTO `cmswing_area` VALUES ('511502', '翠屏区', '511500', '2');
INSERT INTO `cmswing_area` VALUES ('511521', '宜宾县', '511500', '3');
INSERT INTO `cmswing_area` VALUES ('511522', '南溪县', '511500', '4');
INSERT INTO `cmswing_area` VALUES ('511523', '江安县', '511500', '5');
INSERT INTO `cmswing_area` VALUES ('511524', '长宁县', '511500', '6');
INSERT INTO `cmswing_area` VALUES ('511525', '高　县', '511500', '7');
INSERT INTO `cmswing_area` VALUES ('511526', '珙　县', '511500', '8');
INSERT INTO `cmswing_area` VALUES ('511527', '筠连县', '511500', '9');
INSERT INTO `cmswing_area` VALUES ('511528', '兴文县', '511500', '10');
INSERT INTO `cmswing_area` VALUES ('511529', '屏山县', '511500', '11');
INSERT INTO `cmswing_area` VALUES ('511601', '市辖区', '511600', '1');
INSERT INTO `cmswing_area` VALUES ('511602', '广安区', '511600', '2');
INSERT INTO `cmswing_area` VALUES ('511621', '岳池县', '511600', '3');
INSERT INTO `cmswing_area` VALUES ('511622', '武胜县', '511600', '4');
INSERT INTO `cmswing_area` VALUES ('511623', '邻水县', '511600', '5');
INSERT INTO `cmswing_area` VALUES ('511681', '华莹市', '511600', '6');
INSERT INTO `cmswing_area` VALUES ('511701', '市辖区', '511700', '1');
INSERT INTO `cmswing_area` VALUES ('511702', '通川区', '511700', '2');
INSERT INTO `cmswing_area` VALUES ('511721', '达　县', '511700', '3');
INSERT INTO `cmswing_area` VALUES ('511722', '宣汉县', '511700', '4');
INSERT INTO `cmswing_area` VALUES ('511723', '开江县', '511700', '5');
INSERT INTO `cmswing_area` VALUES ('511724', '大竹县', '511700', '6');
INSERT INTO `cmswing_area` VALUES ('511725', '渠　县', '511700', '7');
INSERT INTO `cmswing_area` VALUES ('511781', '万源市', '511700', '8');
INSERT INTO `cmswing_area` VALUES ('511801', '市辖区', '511800', '1');
INSERT INTO `cmswing_area` VALUES ('511802', '雨城区', '511800', '2');
INSERT INTO `cmswing_area` VALUES ('511821', '名山县', '511800', '3');
INSERT INTO `cmswing_area` VALUES ('511822', '荥经县', '511800', '4');
INSERT INTO `cmswing_area` VALUES ('511823', '汉源县', '511800', '5');
INSERT INTO `cmswing_area` VALUES ('511824', '石棉县', '511800', '6');
INSERT INTO `cmswing_area` VALUES ('511825', '天全县', '511800', '7');
INSERT INTO `cmswing_area` VALUES ('511826', '芦山县', '511800', '8');
INSERT INTO `cmswing_area` VALUES ('511827', '宝兴县', '511800', '9');
INSERT INTO `cmswing_area` VALUES ('511901', '市辖区', '511900', '1');
INSERT INTO `cmswing_area` VALUES ('511902', '巴州区', '511900', '2');
INSERT INTO `cmswing_area` VALUES ('511921', '通江县', '511900', '3');
INSERT INTO `cmswing_area` VALUES ('511922', '南江县', '511900', '4');
INSERT INTO `cmswing_area` VALUES ('511923', '平昌县', '511900', '5');
INSERT INTO `cmswing_area` VALUES ('512001', '市辖区', '512000', '1');
INSERT INTO `cmswing_area` VALUES ('512002', '雁江区', '512000', '2');
INSERT INTO `cmswing_area` VALUES ('512021', '安岳县', '512000', '3');
INSERT INTO `cmswing_area` VALUES ('512022', '乐至县', '512000', '4');
INSERT INTO `cmswing_area` VALUES ('512081', '简阳市', '512000', '5');
INSERT INTO `cmswing_area` VALUES ('513221', '汶川县', '513200', '1');
INSERT INTO `cmswing_area` VALUES ('513222', '理　县', '513200', '2');
INSERT INTO `cmswing_area` VALUES ('513223', '茂　县', '513200', '3');
INSERT INTO `cmswing_area` VALUES ('513224', '松潘县', '513200', '4');
INSERT INTO `cmswing_area` VALUES ('513225', '九寨沟县', '513200', '5');
INSERT INTO `cmswing_area` VALUES ('513226', '金川县', '513200', '6');
INSERT INTO `cmswing_area` VALUES ('513227', '小金县', '513200', '7');
INSERT INTO `cmswing_area` VALUES ('513228', '黑水县', '513200', '8');
INSERT INTO `cmswing_area` VALUES ('513229', '马尔康县', '513200', '9');
INSERT INTO `cmswing_area` VALUES ('513230', '壤塘县', '513200', '10');
INSERT INTO `cmswing_area` VALUES ('513231', '阿坝县', '513200', '11');
INSERT INTO `cmswing_area` VALUES ('513232', '若尔盖县', '513200', '12');
INSERT INTO `cmswing_area` VALUES ('513233', '红原县', '513200', '13');
INSERT INTO `cmswing_area` VALUES ('513321', '康定县', '513300', '1');
INSERT INTO `cmswing_area` VALUES ('513322', '泸定县', '513300', '2');
INSERT INTO `cmswing_area` VALUES ('513323', '丹巴县', '513300', '3');
INSERT INTO `cmswing_area` VALUES ('513324', '九龙县', '513300', '4');
INSERT INTO `cmswing_area` VALUES ('513325', '雅江县', '513300', '5');
INSERT INTO `cmswing_area` VALUES ('513326', '道孚县', '513300', '6');
INSERT INTO `cmswing_area` VALUES ('513327', '炉霍县', '513300', '7');
INSERT INTO `cmswing_area` VALUES ('513328', '甘孜县', '513300', '8');
INSERT INTO `cmswing_area` VALUES ('513329', '新龙县', '513300', '9');
INSERT INTO `cmswing_area` VALUES ('513330', '德格县', '513300', '10');
INSERT INTO `cmswing_area` VALUES ('513331', '白玉县', '513300', '11');
INSERT INTO `cmswing_area` VALUES ('513332', '石渠县', '513300', '12');
INSERT INTO `cmswing_area` VALUES ('513333', '色达县', '513300', '13');
INSERT INTO `cmswing_area` VALUES ('513334', '理塘县', '513300', '14');
INSERT INTO `cmswing_area` VALUES ('513335', '巴塘县', '513300', '15');
INSERT INTO `cmswing_area` VALUES ('513336', '乡城县', '513300', '16');
INSERT INTO `cmswing_area` VALUES ('513337', '稻城县', '513300', '17');
INSERT INTO `cmswing_area` VALUES ('513338', '得荣县', '513300', '18');
INSERT INTO `cmswing_area` VALUES ('513401', '西昌市', '513400', '1');
INSERT INTO `cmswing_area` VALUES ('513422', '木里藏族自治县', '513400', '2');
INSERT INTO `cmswing_area` VALUES ('513423', '盐源县', '513400', '3');
INSERT INTO `cmswing_area` VALUES ('513424', '德昌县', '513400', '4');
INSERT INTO `cmswing_area` VALUES ('513425', '会理县', '513400', '5');
INSERT INTO `cmswing_area` VALUES ('513426', '会东县', '513400', '6');
INSERT INTO `cmswing_area` VALUES ('513427', '宁南县', '513400', '7');
INSERT INTO `cmswing_area` VALUES ('513428', '普格县', '513400', '8');
INSERT INTO `cmswing_area` VALUES ('513429', '布拖县', '513400', '9');
INSERT INTO `cmswing_area` VALUES ('513430', '金阳县', '513400', '10');
INSERT INTO `cmswing_area` VALUES ('513431', '昭觉县', '513400', '11');
INSERT INTO `cmswing_area` VALUES ('513432', '喜德县', '513400', '12');
INSERT INTO `cmswing_area` VALUES ('513433', '冕宁县', '513400', '13');
INSERT INTO `cmswing_area` VALUES ('513434', '越西县', '513400', '14');
INSERT INTO `cmswing_area` VALUES ('513435', '甘洛县', '513400', '15');
INSERT INTO `cmswing_area` VALUES ('513436', '美姑县', '513400', '16');
INSERT INTO `cmswing_area` VALUES ('513437', '雷波县', '513400', '17');
INSERT INTO `cmswing_area` VALUES ('520101', '市辖区', '520100', '1');
INSERT INTO `cmswing_area` VALUES ('520102', '南明区', '520100', '2');
INSERT INTO `cmswing_area` VALUES ('520103', '云岩区', '520100', '3');
INSERT INTO `cmswing_area` VALUES ('520111', '花溪区', '520100', '4');
INSERT INTO `cmswing_area` VALUES ('520112', '乌当区', '520100', '5');
INSERT INTO `cmswing_area` VALUES ('520113', '白云区', '520100', '6');
INSERT INTO `cmswing_area` VALUES ('520114', '小河区', '520100', '7');
INSERT INTO `cmswing_area` VALUES ('520121', '开阳县', '520100', '8');
INSERT INTO `cmswing_area` VALUES ('520122', '息烽县', '520100', '9');
INSERT INTO `cmswing_area` VALUES ('520123', '修文县', '520100', '10');
INSERT INTO `cmswing_area` VALUES ('520181', '清镇市', '520100', '11');
INSERT INTO `cmswing_area` VALUES ('520201', '钟山区', '520200', '1');
INSERT INTO `cmswing_area` VALUES ('520203', '六枝特区', '520200', '2');
INSERT INTO `cmswing_area` VALUES ('520221', '水城县', '520200', '3');
INSERT INTO `cmswing_area` VALUES ('520222', '盘　县', '520200', '4');
INSERT INTO `cmswing_area` VALUES ('520301', '市辖区', '520300', '1');
INSERT INTO `cmswing_area` VALUES ('520302', '红花岗区', '520300', '2');
INSERT INTO `cmswing_area` VALUES ('520303', '汇川区', '520300', '3');
INSERT INTO `cmswing_area` VALUES ('520321', '遵义县', '520300', '4');
INSERT INTO `cmswing_area` VALUES ('520322', '桐梓县', '520300', '5');
INSERT INTO `cmswing_area` VALUES ('520323', '绥阳县', '520300', '6');
INSERT INTO `cmswing_area` VALUES ('520324', '正安县', '520300', '7');
INSERT INTO `cmswing_area` VALUES ('520325', '道真仡佬族苗族自治县', '520300', '8');
INSERT INTO `cmswing_area` VALUES ('520326', '务川仡佬族苗族自治县', '520300', '9');
INSERT INTO `cmswing_area` VALUES ('520327', '凤冈县', '520300', '10');
INSERT INTO `cmswing_area` VALUES ('520328', '湄潭县', '520300', '11');
INSERT INTO `cmswing_area` VALUES ('520329', '余庆县', '520300', '12');
INSERT INTO `cmswing_area` VALUES ('520330', '习水县', '520300', '13');
INSERT INTO `cmswing_area` VALUES ('520381', '赤水市', '520300', '14');
INSERT INTO `cmswing_area` VALUES ('520382', '仁怀市', '520300', '15');
INSERT INTO `cmswing_area` VALUES ('520401', '市辖区', '520400', '1');
INSERT INTO `cmswing_area` VALUES ('520402', '西秀区', '520400', '2');
INSERT INTO `cmswing_area` VALUES ('520421', '平坝县', '520400', '3');
INSERT INTO `cmswing_area` VALUES ('520422', '普定县', '520400', '4');
INSERT INTO `cmswing_area` VALUES ('520423', '镇宁布依族苗族自治县', '520400', '5');
INSERT INTO `cmswing_area` VALUES ('520424', '关岭布依族苗族自治县', '520400', '6');
INSERT INTO `cmswing_area` VALUES ('520425', '紫云苗族布依族自治县', '520400', '7');
INSERT INTO `cmswing_area` VALUES ('522201', '铜仁市', '522200', '1');
INSERT INTO `cmswing_area` VALUES ('522222', '江口县', '522200', '2');
INSERT INTO `cmswing_area` VALUES ('522223', '玉屏侗族自治县', '522200', '3');
INSERT INTO `cmswing_area` VALUES ('522224', '石阡县', '522200', '4');
INSERT INTO `cmswing_area` VALUES ('522225', '思南县', '522200', '5');
INSERT INTO `cmswing_area` VALUES ('522226', '印江土家族苗族自治县', '522200', '6');
INSERT INTO `cmswing_area` VALUES ('522227', '德江县', '522200', '7');
INSERT INTO `cmswing_area` VALUES ('522228', '沿河土家族自治县', '522200', '8');
INSERT INTO `cmswing_area` VALUES ('522229', '松桃苗族自治县', '522200', '9');
INSERT INTO `cmswing_area` VALUES ('522230', '万山特区', '522200', '10');
INSERT INTO `cmswing_area` VALUES ('522301', '兴义市', '522300', '1');
INSERT INTO `cmswing_area` VALUES ('522322', '兴仁县', '522300', '2');
INSERT INTO `cmswing_area` VALUES ('522323', '普安县', '522300', '3');
INSERT INTO `cmswing_area` VALUES ('522324', '晴隆县', '522300', '4');
INSERT INTO `cmswing_area` VALUES ('522325', '贞丰县', '522300', '5');
INSERT INTO `cmswing_area` VALUES ('522326', '望谟县', '522300', '6');
INSERT INTO `cmswing_area` VALUES ('522327', '册亨县', '522300', '7');
INSERT INTO `cmswing_area` VALUES ('522328', '安龙县', '522300', '8');
INSERT INTO `cmswing_area` VALUES ('522401', '毕节市', '522400', '1');
INSERT INTO `cmswing_area` VALUES ('522422', '大方县', '522400', '2');
INSERT INTO `cmswing_area` VALUES ('522423', '黔西县', '522400', '3');
INSERT INTO `cmswing_area` VALUES ('522424', '金沙县', '522400', '4');
INSERT INTO `cmswing_area` VALUES ('522425', '织金县', '522400', '5');
INSERT INTO `cmswing_area` VALUES ('522426', '纳雍县', '522400', '6');
INSERT INTO `cmswing_area` VALUES ('522427', '威宁彝族回族苗族自治县', '522400', '7');
INSERT INTO `cmswing_area` VALUES ('522428', '赫章县', '522400', '8');
INSERT INTO `cmswing_area` VALUES ('522601', '凯里市', '522600', '1');
INSERT INTO `cmswing_area` VALUES ('522622', '黄平县', '522600', '2');
INSERT INTO `cmswing_area` VALUES ('522623', '施秉县', '522600', '3');
INSERT INTO `cmswing_area` VALUES ('522624', '三穗县', '522600', '4');
INSERT INTO `cmswing_area` VALUES ('522625', '镇远县', '522600', '5');
INSERT INTO `cmswing_area` VALUES ('522626', '岑巩县', '522600', '6');
INSERT INTO `cmswing_area` VALUES ('522627', '天柱县', '522600', '7');
INSERT INTO `cmswing_area` VALUES ('522628', '锦屏县', '522600', '8');
INSERT INTO `cmswing_area` VALUES ('522629', '剑河县', '522600', '9');
INSERT INTO `cmswing_area` VALUES ('522630', '台江县', '522600', '10');
INSERT INTO `cmswing_area` VALUES ('522631', '黎平县', '522600', '11');
INSERT INTO `cmswing_area` VALUES ('522632', '榕江县', '522600', '12');
INSERT INTO `cmswing_area` VALUES ('522633', '从江县', '522600', '13');
INSERT INTO `cmswing_area` VALUES ('522634', '雷山县', '522600', '14');
INSERT INTO `cmswing_area` VALUES ('522635', '麻江县', '522600', '15');
INSERT INTO `cmswing_area` VALUES ('522636', '丹寨县', '522600', '16');
INSERT INTO `cmswing_area` VALUES ('522701', '都匀市', '522700', '1');
INSERT INTO `cmswing_area` VALUES ('522702', '福泉市', '522700', '2');
INSERT INTO `cmswing_area` VALUES ('522722', '荔波县', '522700', '3');
INSERT INTO `cmswing_area` VALUES ('522723', '贵定县', '522700', '4');
INSERT INTO `cmswing_area` VALUES ('522725', '瓮安县', '522700', '5');
INSERT INTO `cmswing_area` VALUES ('522726', '独山县', '522700', '6');
INSERT INTO `cmswing_area` VALUES ('522727', '平塘县', '522700', '7');
INSERT INTO `cmswing_area` VALUES ('522728', '罗甸县', '522700', '8');
INSERT INTO `cmswing_area` VALUES ('522729', '长顺县', '522700', '9');
INSERT INTO `cmswing_area` VALUES ('522730', '龙里县', '522700', '10');
INSERT INTO `cmswing_area` VALUES ('522731', '惠水县', '522700', '11');
INSERT INTO `cmswing_area` VALUES ('522732', '三都水族自治县', '522700', '12');
INSERT INTO `cmswing_area` VALUES ('530101', '市辖区', '530100', '1');
INSERT INTO `cmswing_area` VALUES ('530102', '五华区', '530100', '2');
INSERT INTO `cmswing_area` VALUES ('530103', '盘龙区', '530100', '3');
INSERT INTO `cmswing_area` VALUES ('530111', '官渡区', '530100', '4');
INSERT INTO `cmswing_area` VALUES ('530112', '西山区', '530100', '5');
INSERT INTO `cmswing_area` VALUES ('530113', '东川区', '530100', '6');
INSERT INTO `cmswing_area` VALUES ('530121', '呈贡县', '530100', '7');
INSERT INTO `cmswing_area` VALUES ('530122', '晋宁县', '530100', '8');
INSERT INTO `cmswing_area` VALUES ('530124', '富民县', '530100', '9');
INSERT INTO `cmswing_area` VALUES ('530125', '宜良县', '530100', '10');
INSERT INTO `cmswing_area` VALUES ('530126', '石林彝族自治县', '530100', '11');
INSERT INTO `cmswing_area` VALUES ('530127', '嵩明县', '530100', '12');
INSERT INTO `cmswing_area` VALUES ('530128', '禄劝彝族苗族自治县', '530100', '13');
INSERT INTO `cmswing_area` VALUES ('530129', '寻甸回族彝族自治县', '530100', '14');
INSERT INTO `cmswing_area` VALUES ('530181', '安宁市', '530100', '15');
INSERT INTO `cmswing_area` VALUES ('530301', '市辖区', '530300', '1');
INSERT INTO `cmswing_area` VALUES ('530302', '麒麟区', '530300', '2');
INSERT INTO `cmswing_area` VALUES ('530321', '马龙县', '530300', '3');
INSERT INTO `cmswing_area` VALUES ('530322', '陆良县', '530300', '4');
INSERT INTO `cmswing_area` VALUES ('530323', '师宗县', '530300', '5');
INSERT INTO `cmswing_area` VALUES ('530324', '罗平县', '530300', '6');
INSERT INTO `cmswing_area` VALUES ('530325', '富源县', '530300', '7');
INSERT INTO `cmswing_area` VALUES ('530326', '会泽县', '530300', '8');
INSERT INTO `cmswing_area` VALUES ('530328', '沾益县', '530300', '9');
INSERT INTO `cmswing_area` VALUES ('530381', '宣威市', '530300', '10');
INSERT INTO `cmswing_area` VALUES ('530401', '市辖区', '530400', '1');
INSERT INTO `cmswing_area` VALUES ('530402', '红塔区', '530400', '2');
INSERT INTO `cmswing_area` VALUES ('530421', '江川县', '530400', '3');
INSERT INTO `cmswing_area` VALUES ('530422', '澄江县', '530400', '4');
INSERT INTO `cmswing_area` VALUES ('530423', '通海县', '530400', '5');
INSERT INTO `cmswing_area` VALUES ('530424', '华宁县', '530400', '6');
INSERT INTO `cmswing_area` VALUES ('530425', '易门县', '530400', '7');
INSERT INTO `cmswing_area` VALUES ('530426', '峨山彝族自治县', '530400', '8');
INSERT INTO `cmswing_area` VALUES ('530427', '新平彝族傣族自治县', '530400', '9');
INSERT INTO `cmswing_area` VALUES ('530428', '元江哈尼族彝族傣族自治县', '530400', '10');
INSERT INTO `cmswing_area` VALUES ('530501', '市辖区', '530500', '1');
INSERT INTO `cmswing_area` VALUES ('530502', '隆阳区', '530500', '2');
INSERT INTO `cmswing_area` VALUES ('530521', '施甸县', '530500', '3');
INSERT INTO `cmswing_area` VALUES ('530522', '腾冲县', '530500', '4');
INSERT INTO `cmswing_area` VALUES ('530523', '龙陵县', '530500', '5');
INSERT INTO `cmswing_area` VALUES ('530524', '昌宁县', '530500', '6');
INSERT INTO `cmswing_area` VALUES ('530601', '市辖区', '530600', '1');
INSERT INTO `cmswing_area` VALUES ('530602', '昭阳区', '530600', '2');
INSERT INTO `cmswing_area` VALUES ('530621', '鲁甸县', '530600', '3');
INSERT INTO `cmswing_area` VALUES ('530622', '巧家县', '530600', '4');
INSERT INTO `cmswing_area` VALUES ('530623', '盐津县', '530600', '5');
INSERT INTO `cmswing_area` VALUES ('530624', '大关县', '530600', '6');
INSERT INTO `cmswing_area` VALUES ('530625', '永善县', '530600', '7');
INSERT INTO `cmswing_area` VALUES ('530626', '绥江县', '530600', '8');
INSERT INTO `cmswing_area` VALUES ('530627', '镇雄县', '530600', '9');
INSERT INTO `cmswing_area` VALUES ('530628', '彝良县', '530600', '10');
INSERT INTO `cmswing_area` VALUES ('530629', '威信县', '530600', '11');
INSERT INTO `cmswing_area` VALUES ('530630', '水富县', '530600', '12');
INSERT INTO `cmswing_area` VALUES ('530701', '市辖区', '530700', '1');
INSERT INTO `cmswing_area` VALUES ('530702', '古城区', '530700', '2');
INSERT INTO `cmswing_area` VALUES ('530721', '玉龙纳西族自治县', '530700', '3');
INSERT INTO `cmswing_area` VALUES ('530722', '永胜县', '530700', '4');
INSERT INTO `cmswing_area` VALUES ('530723', '华坪县', '530700', '5');
INSERT INTO `cmswing_area` VALUES ('530724', '宁蒗彝族自治县', '530700', '6');
INSERT INTO `cmswing_area` VALUES ('530801', '市辖区', '530800', '1');
INSERT INTO `cmswing_area` VALUES ('530802', '翠云区', '530800', '2');
INSERT INTO `cmswing_area` VALUES ('530821', '普洱哈尼族彝族自治县', '530800', '3');
INSERT INTO `cmswing_area` VALUES ('530822', '墨江哈尼族自治县', '530800', '4');
INSERT INTO `cmswing_area` VALUES ('530823', '景东彝族自治县', '530800', '5');
INSERT INTO `cmswing_area` VALUES ('530824', '景谷傣族彝族自治县', '530800', '6');
INSERT INTO `cmswing_area` VALUES ('530825', '镇沅彝族哈尼族拉祜族自治县', '530800', '7');
INSERT INTO `cmswing_area` VALUES ('530826', '江城哈尼族彝族自治县', '530800', '8');
INSERT INTO `cmswing_area` VALUES ('530827', '孟连傣族拉祜族佤族自治县', '530800', '9');
INSERT INTO `cmswing_area` VALUES ('530828', '澜沧拉祜族自治县', '530800', '10');
INSERT INTO `cmswing_area` VALUES ('530829', '西盟佤族自治县', '530800', '11');
INSERT INTO `cmswing_area` VALUES ('530901', '市辖区', '530900', '1');
INSERT INTO `cmswing_area` VALUES ('530902', '临翔区', '530900', '2');
INSERT INTO `cmswing_area` VALUES ('530921', '凤庆县', '530900', '3');
INSERT INTO `cmswing_area` VALUES ('530922', '云　县', '530900', '4');
INSERT INTO `cmswing_area` VALUES ('530923', '永德县', '530900', '5');
INSERT INTO `cmswing_area` VALUES ('530924', '镇康县', '530900', '6');
INSERT INTO `cmswing_area` VALUES ('530925', '双江拉祜族佤族布朗族傣族自治县', '530900', '7');
INSERT INTO `cmswing_area` VALUES ('530926', '耿马傣族佤族自治县', '530900', '8');
INSERT INTO `cmswing_area` VALUES ('530927', '沧源佤族自治县', '530900', '9');
INSERT INTO `cmswing_area` VALUES ('532301', '楚雄市', '532300', '1');
INSERT INTO `cmswing_area` VALUES ('532322', '双柏县', '532300', '2');
INSERT INTO `cmswing_area` VALUES ('532323', '牟定县', '532300', '3');
INSERT INTO `cmswing_area` VALUES ('532324', '南华县', '532300', '4');
INSERT INTO `cmswing_area` VALUES ('532325', '姚安县', '532300', '5');
INSERT INTO `cmswing_area` VALUES ('532326', '大姚县', '532300', '6');
INSERT INTO `cmswing_area` VALUES ('532327', '永仁县', '532300', '7');
INSERT INTO `cmswing_area` VALUES ('532328', '元谋县', '532300', '8');
INSERT INTO `cmswing_area` VALUES ('532329', '武定县', '532300', '9');
INSERT INTO `cmswing_area` VALUES ('532331', '禄丰县', '532300', '10');
INSERT INTO `cmswing_area` VALUES ('532501', '个旧市', '532500', '1');
INSERT INTO `cmswing_area` VALUES ('532502', '开远市', '532500', '2');
INSERT INTO `cmswing_area` VALUES ('532522', '蒙自县', '532500', '3');
INSERT INTO `cmswing_area` VALUES ('532523', '屏边苗族自治县', '532500', '4');
INSERT INTO `cmswing_area` VALUES ('532524', '建水县', '532500', '5');
INSERT INTO `cmswing_area` VALUES ('532525', '石屏县', '532500', '6');
INSERT INTO `cmswing_area` VALUES ('532526', '弥勒县', '532500', '7');
INSERT INTO `cmswing_area` VALUES ('532527', '泸西县', '532500', '8');
INSERT INTO `cmswing_area` VALUES ('532528', '元阳县', '532500', '9');
INSERT INTO `cmswing_area` VALUES ('532529', '红河县', '532500', '10');
INSERT INTO `cmswing_area` VALUES ('532530', '金平苗族瑶族傣族自治县', '532500', '11');
INSERT INTO `cmswing_area` VALUES ('532531', '绿春县', '532500', '12');
INSERT INTO `cmswing_area` VALUES ('532532', '河口瑶族自治县', '532500', '13');
INSERT INTO `cmswing_area` VALUES ('532621', '文山县', '532600', '1');
INSERT INTO `cmswing_area` VALUES ('532622', '砚山县', '532600', '2');
INSERT INTO `cmswing_area` VALUES ('532623', '西畴县', '532600', '3');
INSERT INTO `cmswing_area` VALUES ('532624', '麻栗坡县', '532600', '4');
INSERT INTO `cmswing_area` VALUES ('532625', '马关县', '532600', '5');
INSERT INTO `cmswing_area` VALUES ('532626', '丘北县', '532600', '6');
INSERT INTO `cmswing_area` VALUES ('532627', '广南县', '532600', '7');
INSERT INTO `cmswing_area` VALUES ('532628', '富宁县', '532600', '8');
INSERT INTO `cmswing_area` VALUES ('532801', '景洪市', '532800', '1');
INSERT INTO `cmswing_area` VALUES ('532822', '勐海县', '532800', '2');
INSERT INTO `cmswing_area` VALUES ('532823', '勐腊县', '532800', '3');
INSERT INTO `cmswing_area` VALUES ('532901', '大理市', '532900', '1');
INSERT INTO `cmswing_area` VALUES ('532922', '漾濞彝族自治县', '532900', '2');
INSERT INTO `cmswing_area` VALUES ('532923', '祥云县', '532900', '3');
INSERT INTO `cmswing_area` VALUES ('532924', '宾川县', '532900', '4');
INSERT INTO `cmswing_area` VALUES ('532925', '弥渡县', '532900', '5');
INSERT INTO `cmswing_area` VALUES ('532926', '南涧彝族自治县', '532900', '6');
INSERT INTO `cmswing_area` VALUES ('532927', '巍山彝族回族自治县', '532900', '7');
INSERT INTO `cmswing_area` VALUES ('532928', '永平县', '532900', '8');
INSERT INTO `cmswing_area` VALUES ('532929', '云龙县', '532900', '9');
INSERT INTO `cmswing_area` VALUES ('532930', '洱源县', '532900', '10');
INSERT INTO `cmswing_area` VALUES ('532931', '剑川县', '532900', '11');
INSERT INTO `cmswing_area` VALUES ('532932', '鹤庆县', '532900', '12');
INSERT INTO `cmswing_area` VALUES ('533102', '瑞丽市', '533100', '1');
INSERT INTO `cmswing_area` VALUES ('533103', '潞西市', '533100', '2');
INSERT INTO `cmswing_area` VALUES ('533122', '梁河县', '533100', '3');
INSERT INTO `cmswing_area` VALUES ('533123', '盈江县', '533100', '4');
INSERT INTO `cmswing_area` VALUES ('533124', '陇川县', '533100', '5');
INSERT INTO `cmswing_area` VALUES ('533321', '泸水县', '533300', '1');
INSERT INTO `cmswing_area` VALUES ('533323', '福贡县', '533300', '2');
INSERT INTO `cmswing_area` VALUES ('533324', '贡山独龙族怒族自治县', '533300', '3');
INSERT INTO `cmswing_area` VALUES ('533325', '兰坪白族普米族自治县', '533300', '4');
INSERT INTO `cmswing_area` VALUES ('533421', '香格里拉县', '533400', '1');
INSERT INTO `cmswing_area` VALUES ('533422', '德钦县', '533400', '2');
INSERT INTO `cmswing_area` VALUES ('533423', '维西傈僳族自治县', '533400', '3');
INSERT INTO `cmswing_area` VALUES ('540101', '市辖区', '540100', '1');
INSERT INTO `cmswing_area` VALUES ('540102', '城关区', '540100', '2');
INSERT INTO `cmswing_area` VALUES ('540121', '林周县', '540100', '3');
INSERT INTO `cmswing_area` VALUES ('540122', '当雄县', '540100', '4');
INSERT INTO `cmswing_area` VALUES ('540123', '尼木县', '540100', '5');
INSERT INTO `cmswing_area` VALUES ('540124', '曲水县', '540100', '6');
INSERT INTO `cmswing_area` VALUES ('540125', '堆龙德庆县', '540100', '7');
INSERT INTO `cmswing_area` VALUES ('540126', '达孜县', '540100', '8');
INSERT INTO `cmswing_area` VALUES ('540127', '墨竹工卡县', '540100', '9');
INSERT INTO `cmswing_area` VALUES ('542121', '昌都县', '542100', '1');
INSERT INTO `cmswing_area` VALUES ('542122', '江达县', '542100', '2');
INSERT INTO `cmswing_area` VALUES ('542123', '贡觉县', '542100', '3');
INSERT INTO `cmswing_area` VALUES ('542124', '类乌齐县', '542100', '4');
INSERT INTO `cmswing_area` VALUES ('542125', '丁青县', '542100', '5');
INSERT INTO `cmswing_area` VALUES ('542126', '察雅县', '542100', '6');
INSERT INTO `cmswing_area` VALUES ('542127', '八宿县', '542100', '7');
INSERT INTO `cmswing_area` VALUES ('542128', '左贡县', '542100', '8');
INSERT INTO `cmswing_area` VALUES ('542129', '芒康县', '542100', '9');
INSERT INTO `cmswing_area` VALUES ('542132', '洛隆县', '542100', '10');
INSERT INTO `cmswing_area` VALUES ('542133', '边坝县', '542100', '11');
INSERT INTO `cmswing_area` VALUES ('542221', '乃东县', '542200', '1');
INSERT INTO `cmswing_area` VALUES ('542222', '扎囊县', '542200', '2');
INSERT INTO `cmswing_area` VALUES ('542223', '贡嘎县', '542200', '3');
INSERT INTO `cmswing_area` VALUES ('542224', '桑日县', '542200', '4');
INSERT INTO `cmswing_area` VALUES ('542225', '琼结县', '542200', '5');
INSERT INTO `cmswing_area` VALUES ('542226', '曲松县', '542200', '6');
INSERT INTO `cmswing_area` VALUES ('542227', '措美县', '542200', '7');
INSERT INTO `cmswing_area` VALUES ('542228', '洛扎县', '542200', '8');
INSERT INTO `cmswing_area` VALUES ('542229', '加查县', '542200', '9');
INSERT INTO `cmswing_area` VALUES ('542231', '隆子县', '542200', '10');
INSERT INTO `cmswing_area` VALUES ('542232', '错那县', '542200', '11');
INSERT INTO `cmswing_area` VALUES ('542233', '浪卡子县', '542200', '12');
INSERT INTO `cmswing_area` VALUES ('542301', '日喀则市', '542300', '1');
INSERT INTO `cmswing_area` VALUES ('542322', '南木林县', '542300', '2');
INSERT INTO `cmswing_area` VALUES ('542323', '江孜县', '542300', '3');
INSERT INTO `cmswing_area` VALUES ('542324', '定日县', '542300', '4');
INSERT INTO `cmswing_area` VALUES ('542325', '萨迦县', '542300', '5');
INSERT INTO `cmswing_area` VALUES ('542326', '拉孜县', '542300', '6');
INSERT INTO `cmswing_area` VALUES ('542327', '昂仁县', '542300', '7');
INSERT INTO `cmswing_area` VALUES ('542328', '谢通门县', '542300', '8');
INSERT INTO `cmswing_area` VALUES ('542329', '白朗县', '542300', '9');
INSERT INTO `cmswing_area` VALUES ('542330', '仁布县', '542300', '10');
INSERT INTO `cmswing_area` VALUES ('542331', '康马县', '542300', '11');
INSERT INTO `cmswing_area` VALUES ('542332', '定结县', '542300', '12');
INSERT INTO `cmswing_area` VALUES ('542333', '仲巴县', '542300', '13');
INSERT INTO `cmswing_area` VALUES ('542334', '亚东县', '542300', '14');
INSERT INTO `cmswing_area` VALUES ('542335', '吉隆县', '542300', '15');
INSERT INTO `cmswing_area` VALUES ('542336', '聂拉木县', '542300', '16');
INSERT INTO `cmswing_area` VALUES ('542337', '萨嘎县', '542300', '17');
INSERT INTO `cmswing_area` VALUES ('542338', '岗巴县', '542300', '18');
INSERT INTO `cmswing_area` VALUES ('542421', '那曲县', '542400', '1');
INSERT INTO `cmswing_area` VALUES ('542422', '嘉黎县', '542400', '2');
INSERT INTO `cmswing_area` VALUES ('542423', '比如县', '542400', '3');
INSERT INTO `cmswing_area` VALUES ('542424', '聂荣县', '542400', '4');
INSERT INTO `cmswing_area` VALUES ('542425', '安多县', '542400', '5');
INSERT INTO `cmswing_area` VALUES ('542426', '申扎县', '542400', '6');
INSERT INTO `cmswing_area` VALUES ('542427', '索　县', '542400', '7');
INSERT INTO `cmswing_area` VALUES ('542428', '班戈县', '542400', '8');
INSERT INTO `cmswing_area` VALUES ('542429', '巴青县', '542400', '9');
INSERT INTO `cmswing_area` VALUES ('542430', '尼玛县', '542400', '10');
INSERT INTO `cmswing_area` VALUES ('542521', '普兰县', '542500', '1');
INSERT INTO `cmswing_area` VALUES ('542522', '札达县', '542500', '2');
INSERT INTO `cmswing_area` VALUES ('542523', '噶尔县', '542500', '3');
INSERT INTO `cmswing_area` VALUES ('542524', '日土县', '542500', '4');
INSERT INTO `cmswing_area` VALUES ('542525', '革吉县', '542500', '5');
INSERT INTO `cmswing_area` VALUES ('542526', '改则县', '542500', '6');
INSERT INTO `cmswing_area` VALUES ('542527', '措勤县', '542500', '7');
INSERT INTO `cmswing_area` VALUES ('542621', '林芝县', '542600', '1');
INSERT INTO `cmswing_area` VALUES ('542622', '工布江达县', '542600', '2');
INSERT INTO `cmswing_area` VALUES ('542623', '米林县', '542600', '3');
INSERT INTO `cmswing_area` VALUES ('542624', '墨脱县', '542600', '4');
INSERT INTO `cmswing_area` VALUES ('542625', '波密县', '542600', '5');
INSERT INTO `cmswing_area` VALUES ('542626', '察隅县', '542600', '6');
INSERT INTO `cmswing_area` VALUES ('542627', '朗　县', '542600', '7');
INSERT INTO `cmswing_area` VALUES ('610101', '市辖区', '610100', '1');
INSERT INTO `cmswing_area` VALUES ('610102', '新城区', '610100', '2');
INSERT INTO `cmswing_area` VALUES ('610103', '碑林区', '610100', '3');
INSERT INTO `cmswing_area` VALUES ('610104', '莲湖区', '610100', '4');
INSERT INTO `cmswing_area` VALUES ('610111', '灞桥区', '610100', '5');
INSERT INTO `cmswing_area` VALUES ('610112', '未央区', '610100', '6');
INSERT INTO `cmswing_area` VALUES ('610113', '雁塔区', '610100', '7');
INSERT INTO `cmswing_area` VALUES ('610114', '阎良区', '610100', '8');
INSERT INTO `cmswing_area` VALUES ('610115', '临潼区', '610100', '9');
INSERT INTO `cmswing_area` VALUES ('610116', '长安区', '610100', '10');
INSERT INTO `cmswing_area` VALUES ('610122', '蓝田县', '610100', '11');
INSERT INTO `cmswing_area` VALUES ('610124', '周至县', '610100', '12');
INSERT INTO `cmswing_area` VALUES ('610125', '户　县', '610100', '13');
INSERT INTO `cmswing_area` VALUES ('610126', '高陵县', '610100', '14');
INSERT INTO `cmswing_area` VALUES ('610201', '市辖区', '610200', '1');
INSERT INTO `cmswing_area` VALUES ('610202', '王益区', '610200', '2');
INSERT INTO `cmswing_area` VALUES ('610203', '印台区', '610200', '3');
INSERT INTO `cmswing_area` VALUES ('610204', '耀州区', '610200', '4');
INSERT INTO `cmswing_area` VALUES ('610222', '宜君县', '610200', '5');
INSERT INTO `cmswing_area` VALUES ('610301', '市辖区', '610300', '1');
INSERT INTO `cmswing_area` VALUES ('610302', '渭滨区', '610300', '2');
INSERT INTO `cmswing_area` VALUES ('610303', '金台区', '610300', '3');
INSERT INTO `cmswing_area` VALUES ('610304', '陈仓区', '610300', '4');
INSERT INTO `cmswing_area` VALUES ('610322', '凤翔县', '610300', '5');
INSERT INTO `cmswing_area` VALUES ('610323', '岐山县', '610300', '6');
INSERT INTO `cmswing_area` VALUES ('610324', '扶风县', '610300', '7');
INSERT INTO `cmswing_area` VALUES ('610326', '眉　县', '610300', '8');
INSERT INTO `cmswing_area` VALUES ('610327', '陇　县', '610300', '9');
INSERT INTO `cmswing_area` VALUES ('610328', '千阳县', '610300', '10');
INSERT INTO `cmswing_area` VALUES ('610329', '麟游县', '610300', '11');
INSERT INTO `cmswing_area` VALUES ('610330', '凤　县', '610300', '12');
INSERT INTO `cmswing_area` VALUES ('610331', '太白县', '610300', '13');
INSERT INTO `cmswing_area` VALUES ('610401', '市辖区', '610400', '1');
INSERT INTO `cmswing_area` VALUES ('610402', '秦都区', '610400', '2');
INSERT INTO `cmswing_area` VALUES ('610403', '杨凌区', '610400', '3');
INSERT INTO `cmswing_area` VALUES ('610404', '渭城区', '610400', '4');
INSERT INTO `cmswing_area` VALUES ('610422', '三原县', '610400', '5');
INSERT INTO `cmswing_area` VALUES ('610423', '泾阳县', '610400', '6');
INSERT INTO `cmswing_area` VALUES ('610424', '乾　县', '610400', '7');
INSERT INTO `cmswing_area` VALUES ('610425', '礼泉县', '610400', '8');
INSERT INTO `cmswing_area` VALUES ('610426', '永寿县', '610400', '9');
INSERT INTO `cmswing_area` VALUES ('610427', '彬　县', '610400', '10');
INSERT INTO `cmswing_area` VALUES ('610428', '长武县', '610400', '11');
INSERT INTO `cmswing_area` VALUES ('610429', '旬邑县', '610400', '12');
INSERT INTO `cmswing_area` VALUES ('610430', '淳化县', '610400', '13');
INSERT INTO `cmswing_area` VALUES ('610431', '武功县', '610400', '14');
INSERT INTO `cmswing_area` VALUES ('610481', '兴平市', '610400', '15');
INSERT INTO `cmswing_area` VALUES ('610501', '市辖区', '610500', '1');
INSERT INTO `cmswing_area` VALUES ('610502', '临渭区', '610500', '2');
INSERT INTO `cmswing_area` VALUES ('610521', '华　县', '610500', '3');
INSERT INTO `cmswing_area` VALUES ('610522', '潼关县', '610500', '4');
INSERT INTO `cmswing_area` VALUES ('610523', '大荔县', '610500', '5');
INSERT INTO `cmswing_area` VALUES ('610524', '合阳县', '610500', '6');
INSERT INTO `cmswing_area` VALUES ('610525', '澄城县', '610500', '7');
INSERT INTO `cmswing_area` VALUES ('610526', '蒲城县', '610500', '8');
INSERT INTO `cmswing_area` VALUES ('610527', '白水县', '610500', '9');
INSERT INTO `cmswing_area` VALUES ('610528', '富平县', '610500', '10');
INSERT INTO `cmswing_area` VALUES ('610581', '韩城市', '610500', '11');
INSERT INTO `cmswing_area` VALUES ('610582', '华阴市', '610500', '12');
INSERT INTO `cmswing_area` VALUES ('610601', '市辖区', '610600', '1');
INSERT INTO `cmswing_area` VALUES ('610602', '宝塔区', '610600', '2');
INSERT INTO `cmswing_area` VALUES ('610621', '延长县', '610600', '3');
INSERT INTO `cmswing_area` VALUES ('610622', '延川县', '610600', '4');
INSERT INTO `cmswing_area` VALUES ('610623', '子长县', '610600', '5');
INSERT INTO `cmswing_area` VALUES ('610624', '安塞县', '610600', '6');
INSERT INTO `cmswing_area` VALUES ('610625', '志丹县', '610600', '7');
INSERT INTO `cmswing_area` VALUES ('610626', '吴旗县', '610600', '8');
INSERT INTO `cmswing_area` VALUES ('610627', '甘泉县', '610600', '9');
INSERT INTO `cmswing_area` VALUES ('610628', '富　县', '610600', '10');
INSERT INTO `cmswing_area` VALUES ('610629', '洛川县', '610600', '11');
INSERT INTO `cmswing_area` VALUES ('610630', '宜川县', '610600', '12');
INSERT INTO `cmswing_area` VALUES ('610631', '黄龙县', '610600', '13');
INSERT INTO `cmswing_area` VALUES ('610632', '黄陵县', '610600', '14');
INSERT INTO `cmswing_area` VALUES ('610701', '市辖区', '610700', '1');
INSERT INTO `cmswing_area` VALUES ('610702', '汉台区', '610700', '2');
INSERT INTO `cmswing_area` VALUES ('610721', '南郑县', '610700', '3');
INSERT INTO `cmswing_area` VALUES ('610722', '城固县', '610700', '4');
INSERT INTO `cmswing_area` VALUES ('610723', '洋　县', '610700', '5');
INSERT INTO `cmswing_area` VALUES ('610724', '西乡县', '610700', '6');
INSERT INTO `cmswing_area` VALUES ('610725', '勉　县', '610700', '7');
INSERT INTO `cmswing_area` VALUES ('610726', '宁强县', '610700', '8');
INSERT INTO `cmswing_area` VALUES ('610727', '略阳县', '610700', '9');
INSERT INTO `cmswing_area` VALUES ('610728', '镇巴县', '610700', '10');
INSERT INTO `cmswing_area` VALUES ('610729', '留坝县', '610700', '11');
INSERT INTO `cmswing_area` VALUES ('610730', '佛坪县', '610700', '12');
INSERT INTO `cmswing_area` VALUES ('610801', '市辖区', '610800', '1');
INSERT INTO `cmswing_area` VALUES ('610802', '榆阳区', '610800', '2');
INSERT INTO `cmswing_area` VALUES ('610821', '神木县', '610800', '3');
INSERT INTO `cmswing_area` VALUES ('610822', '府谷县', '610800', '4');
INSERT INTO `cmswing_area` VALUES ('610823', '横山县', '610800', '5');
INSERT INTO `cmswing_area` VALUES ('610824', '靖边县', '610800', '6');
INSERT INTO `cmswing_area` VALUES ('610825', '定边县', '610800', '7');
INSERT INTO `cmswing_area` VALUES ('610826', '绥德县', '610800', '8');
INSERT INTO `cmswing_area` VALUES ('610827', '米脂县', '610800', '9');
INSERT INTO `cmswing_area` VALUES ('610828', '佳　县', '610800', '10');
INSERT INTO `cmswing_area` VALUES ('610829', '吴堡县', '610800', '11');
INSERT INTO `cmswing_area` VALUES ('610830', '清涧县', '610800', '12');
INSERT INTO `cmswing_area` VALUES ('610831', '子洲县', '610800', '13');
INSERT INTO `cmswing_area` VALUES ('610901', '市辖区', '610900', '1');
INSERT INTO `cmswing_area` VALUES ('610902', '汉滨区', '610900', '2');
INSERT INTO `cmswing_area` VALUES ('610921', '汉阴县', '610900', '3');
INSERT INTO `cmswing_area` VALUES ('610922', '石泉县', '610900', '4');
INSERT INTO `cmswing_area` VALUES ('610923', '宁陕县', '610900', '5');
INSERT INTO `cmswing_area` VALUES ('610924', '紫阳县', '610900', '6');
INSERT INTO `cmswing_area` VALUES ('610925', '岚皋县', '610900', '7');
INSERT INTO `cmswing_area` VALUES ('610926', '平利县', '610900', '8');
INSERT INTO `cmswing_area` VALUES ('610927', '镇坪县', '610900', '9');
INSERT INTO `cmswing_area` VALUES ('610928', '旬阳县', '610900', '10');
INSERT INTO `cmswing_area` VALUES ('610929', '白河县', '610900', '11');
INSERT INTO `cmswing_area` VALUES ('611001', '市辖区', '611000', '1');
INSERT INTO `cmswing_area` VALUES ('611002', '商州区', '611000', '2');
INSERT INTO `cmswing_area` VALUES ('611021', '洛南县', '611000', '3');
INSERT INTO `cmswing_area` VALUES ('611022', '丹凤县', '611000', '4');
INSERT INTO `cmswing_area` VALUES ('611023', '商南县', '611000', '5');
INSERT INTO `cmswing_area` VALUES ('611024', '山阳县', '611000', '6');
INSERT INTO `cmswing_area` VALUES ('611025', '镇安县', '611000', '7');
INSERT INTO `cmswing_area` VALUES ('611026', '柞水县', '611000', '8');
INSERT INTO `cmswing_area` VALUES ('620101', '市辖区', '620100', '1');
INSERT INTO `cmswing_area` VALUES ('620102', '城关区', '620100', '2');
INSERT INTO `cmswing_area` VALUES ('620103', '七里河区', '620100', '3');
INSERT INTO `cmswing_area` VALUES ('620104', '西固区', '620100', '4');
INSERT INTO `cmswing_area` VALUES ('620105', '安宁区', '620100', '5');
INSERT INTO `cmswing_area` VALUES ('620111', '红古区', '620100', '6');
INSERT INTO `cmswing_area` VALUES ('620121', '永登县', '620100', '7');
INSERT INTO `cmswing_area` VALUES ('620122', '皋兰县', '620100', '8');
INSERT INTO `cmswing_area` VALUES ('620123', '榆中县', '620100', '9');
INSERT INTO `cmswing_area` VALUES ('620201', '市辖区', '620200', '1');
INSERT INTO `cmswing_area` VALUES ('620301', '市辖区', '620300', '1');
INSERT INTO `cmswing_area` VALUES ('620302', '金川区', '620300', '2');
INSERT INTO `cmswing_area` VALUES ('620321', '永昌县', '620300', '3');
INSERT INTO `cmswing_area` VALUES ('620401', '市辖区', '620400', '1');
INSERT INTO `cmswing_area` VALUES ('620402', '白银区', '620400', '2');
INSERT INTO `cmswing_area` VALUES ('620403', '平川区', '620400', '3');
INSERT INTO `cmswing_area` VALUES ('620421', '靖远县', '620400', '4');
INSERT INTO `cmswing_area` VALUES ('620422', '会宁县', '620400', '5');
INSERT INTO `cmswing_area` VALUES ('620423', '景泰县', '620400', '6');
INSERT INTO `cmswing_area` VALUES ('620501', '市辖区', '620500', '1');
INSERT INTO `cmswing_area` VALUES ('620502', '秦城区', '620500', '2');
INSERT INTO `cmswing_area` VALUES ('620503', '北道区', '620500', '3');
INSERT INTO `cmswing_area` VALUES ('620521', '清水县', '620500', '4');
INSERT INTO `cmswing_area` VALUES ('620522', '秦安县', '620500', '5');
INSERT INTO `cmswing_area` VALUES ('620523', '甘谷县', '620500', '6');
INSERT INTO `cmswing_area` VALUES ('620524', '武山县', '620500', '7');
INSERT INTO `cmswing_area` VALUES ('620525', '张家川回族自治县', '620500', '8');
INSERT INTO `cmswing_area` VALUES ('620601', '市辖区', '620600', '1');
INSERT INTO `cmswing_area` VALUES ('620602', '凉州区', '620600', '2');
INSERT INTO `cmswing_area` VALUES ('620621', '民勤县', '620600', '3');
INSERT INTO `cmswing_area` VALUES ('620622', '古浪县', '620600', '4');
INSERT INTO `cmswing_area` VALUES ('620623', '天祝藏族自治县', '620600', '5');
INSERT INTO `cmswing_area` VALUES ('620701', '市辖区', '620700', '1');
INSERT INTO `cmswing_area` VALUES ('620702', '甘州区', '620700', '2');
INSERT INTO `cmswing_area` VALUES ('620721', '肃南裕固族自治县', '620700', '3');
INSERT INTO `cmswing_area` VALUES ('620722', '民乐县', '620700', '4');
INSERT INTO `cmswing_area` VALUES ('620723', '临泽县', '620700', '5');
INSERT INTO `cmswing_area` VALUES ('620724', '高台县', '620700', '6');
INSERT INTO `cmswing_area` VALUES ('620725', '山丹县', '620700', '7');
INSERT INTO `cmswing_area` VALUES ('620801', '市辖区', '620800', '1');
INSERT INTO `cmswing_area` VALUES ('620802', '崆峒区', '620800', '2');
INSERT INTO `cmswing_area` VALUES ('620821', '泾川县', '620800', '3');
INSERT INTO `cmswing_area` VALUES ('620822', '灵台县', '620800', '4');
INSERT INTO `cmswing_area` VALUES ('620823', '崇信县', '620800', '5');
INSERT INTO `cmswing_area` VALUES ('620824', '华亭县', '620800', '6');
INSERT INTO `cmswing_area` VALUES ('620825', '庄浪县', '620800', '7');
INSERT INTO `cmswing_area` VALUES ('620826', '静宁县', '620800', '8');
INSERT INTO `cmswing_area` VALUES ('620901', '市辖区', '620900', '1');
INSERT INTO `cmswing_area` VALUES ('620902', '肃州区', '620900', '2');
INSERT INTO `cmswing_area` VALUES ('620921', '金塔县', '620900', '3');
INSERT INTO `cmswing_area` VALUES ('620922', '安西县', '620900', '4');
INSERT INTO `cmswing_area` VALUES ('620923', '肃北蒙古族自治县', '620900', '5');
INSERT INTO `cmswing_area` VALUES ('620924', '阿克塞哈萨克族自治县', '620900', '6');
INSERT INTO `cmswing_area` VALUES ('620981', '玉门市', '620900', '7');
INSERT INTO `cmswing_area` VALUES ('620982', '敦煌市', '620900', '8');
INSERT INTO `cmswing_area` VALUES ('621001', '市辖区', '621000', '1');
INSERT INTO `cmswing_area` VALUES ('621002', '西峰区', '621000', '2');
INSERT INTO `cmswing_area` VALUES ('621021', '庆城县', '621000', '3');
INSERT INTO `cmswing_area` VALUES ('621022', '环　县', '621000', '4');
INSERT INTO `cmswing_area` VALUES ('621023', '华池县', '621000', '5');
INSERT INTO `cmswing_area` VALUES ('621024', '合水县', '621000', '6');
INSERT INTO `cmswing_area` VALUES ('621025', '正宁县', '621000', '7');
INSERT INTO `cmswing_area` VALUES ('621026', '宁　县', '621000', '8');
INSERT INTO `cmswing_area` VALUES ('621027', '镇原县', '621000', '9');
INSERT INTO `cmswing_area` VALUES ('621101', '市辖区', '621100', '1');
INSERT INTO `cmswing_area` VALUES ('621102', '安定区', '621100', '2');
INSERT INTO `cmswing_area` VALUES ('621121', '通渭县', '621100', '3');
INSERT INTO `cmswing_area` VALUES ('621122', '陇西县', '621100', '4');
INSERT INTO `cmswing_area` VALUES ('621123', '渭源县', '621100', '5');
INSERT INTO `cmswing_area` VALUES ('621124', '临洮县', '621100', '6');
INSERT INTO `cmswing_area` VALUES ('621125', '漳　县', '621100', '7');
INSERT INTO `cmswing_area` VALUES ('621126', '岷　县', '621100', '8');
INSERT INTO `cmswing_area` VALUES ('621201', '市辖区', '621200', '1');
INSERT INTO `cmswing_area` VALUES ('621202', '武都区', '621200', '2');
INSERT INTO `cmswing_area` VALUES ('621221', '成　县', '621200', '3');
INSERT INTO `cmswing_area` VALUES ('621222', '文　县', '621200', '4');
INSERT INTO `cmswing_area` VALUES ('621223', '宕昌县', '621200', '5');
INSERT INTO `cmswing_area` VALUES ('621224', '康　县', '621200', '6');
INSERT INTO `cmswing_area` VALUES ('621225', '西和县', '621200', '7');
INSERT INTO `cmswing_area` VALUES ('621226', '礼　县', '621200', '8');
INSERT INTO `cmswing_area` VALUES ('621227', '徽　县', '621200', '9');
INSERT INTO `cmswing_area` VALUES ('621228', '两当县', '621200', '10');
INSERT INTO `cmswing_area` VALUES ('622901', '临夏市', '622900', '1');
INSERT INTO `cmswing_area` VALUES ('622921', '临夏县', '622900', '2');
INSERT INTO `cmswing_area` VALUES ('622922', '康乐县', '622900', '3');
INSERT INTO `cmswing_area` VALUES ('622923', '永靖县', '622900', '4');
INSERT INTO `cmswing_area` VALUES ('622924', '广河县', '622900', '5');
INSERT INTO `cmswing_area` VALUES ('622925', '和政县', '622900', '6');
INSERT INTO `cmswing_area` VALUES ('622926', '东乡族自治县', '622900', '7');
INSERT INTO `cmswing_area` VALUES ('622927', '积石山保安族东乡族撒拉族自治县', '622900', '8');
INSERT INTO `cmswing_area` VALUES ('623001', '合作市', '623000', '1');
INSERT INTO `cmswing_area` VALUES ('623021', '临潭县', '623000', '2');
INSERT INTO `cmswing_area` VALUES ('623022', '卓尼县', '623000', '3');
INSERT INTO `cmswing_area` VALUES ('623023', '舟曲县', '623000', '4');
INSERT INTO `cmswing_area` VALUES ('623024', '迭部县', '623000', '5');
INSERT INTO `cmswing_area` VALUES ('623025', '玛曲县', '623000', '6');
INSERT INTO `cmswing_area` VALUES ('623026', '碌曲县', '623000', '7');
INSERT INTO `cmswing_area` VALUES ('623027', '夏河县', '623000', '8');
INSERT INTO `cmswing_area` VALUES ('630101', '市辖区', '630100', '1');
INSERT INTO `cmswing_area` VALUES ('630102', '城东区', '630100', '2');
INSERT INTO `cmswing_area` VALUES ('630103', '城中区', '630100', '3');
INSERT INTO `cmswing_area` VALUES ('630104', '城西区', '630100', '4');
INSERT INTO `cmswing_area` VALUES ('630105', '城北区', '630100', '5');
INSERT INTO `cmswing_area` VALUES ('630121', '大通回族土族自治县', '630100', '6');
INSERT INTO `cmswing_area` VALUES ('630122', '湟中县', '630100', '7');
INSERT INTO `cmswing_area` VALUES ('630123', '湟源县', '630100', '8');
INSERT INTO `cmswing_area` VALUES ('632121', '平安县', '632100', '1');
INSERT INTO `cmswing_area` VALUES ('632122', '民和回族土族自治县', '632100', '2');
INSERT INTO `cmswing_area` VALUES ('632123', '乐都县', '632100', '3');
INSERT INTO `cmswing_area` VALUES ('632126', '互助土族自治县', '632100', '4');
INSERT INTO `cmswing_area` VALUES ('632127', '化隆回族自治县', '632100', '5');
INSERT INTO `cmswing_area` VALUES ('632128', '循化撒拉族自治县', '632100', '6');
INSERT INTO `cmswing_area` VALUES ('632221', '门源回族自治县', '632200', '1');
INSERT INTO `cmswing_area` VALUES ('632222', '祁连县', '632200', '2');
INSERT INTO `cmswing_area` VALUES ('632223', '海晏县', '632200', '3');
INSERT INTO `cmswing_area` VALUES ('632224', '刚察县', '632200', '4');
INSERT INTO `cmswing_area` VALUES ('632321', '同仁县', '632300', '1');
INSERT INTO `cmswing_area` VALUES ('632322', '尖扎县', '632300', '2');
INSERT INTO `cmswing_area` VALUES ('632323', '泽库县', '632300', '3');
INSERT INTO `cmswing_area` VALUES ('632324', '河南蒙古族自治县', '632300', '4');
INSERT INTO `cmswing_area` VALUES ('632521', '共和县', '632500', '1');
INSERT INTO `cmswing_area` VALUES ('632522', '同德县', '632500', '2');
INSERT INTO `cmswing_area` VALUES ('632523', '贵德县', '632500', '3');
INSERT INTO `cmswing_area` VALUES ('632524', '兴海县', '632500', '4');
INSERT INTO `cmswing_area` VALUES ('632525', '贵南县', '632500', '5');
INSERT INTO `cmswing_area` VALUES ('632621', '玛沁县', '632600', '1');
INSERT INTO `cmswing_area` VALUES ('632622', '班玛县', '632600', '2');
INSERT INTO `cmswing_area` VALUES ('632623', '甘德县', '632600', '3');
INSERT INTO `cmswing_area` VALUES ('632624', '达日县', '632600', '4');
INSERT INTO `cmswing_area` VALUES ('632625', '久治县', '632600', '5');
INSERT INTO `cmswing_area` VALUES ('632626', '玛多县', '632600', '6');
INSERT INTO `cmswing_area` VALUES ('632721', '玉树县', '632700', '1');
INSERT INTO `cmswing_area` VALUES ('632722', '杂多县', '632700', '2');
INSERT INTO `cmswing_area` VALUES ('632723', '称多县', '632700', '3');
INSERT INTO `cmswing_area` VALUES ('632724', '治多县', '632700', '4');
INSERT INTO `cmswing_area` VALUES ('632725', '囊谦县', '632700', '5');
INSERT INTO `cmswing_area` VALUES ('632726', '曲麻莱县', '632700', '6');
INSERT INTO `cmswing_area` VALUES ('632801', '格尔木市', '632800', '1');
INSERT INTO `cmswing_area` VALUES ('632802', '德令哈市', '632800', '2');
INSERT INTO `cmswing_area` VALUES ('632821', '乌兰县', '632800', '3');
INSERT INTO `cmswing_area` VALUES ('632822', '都兰县', '632800', '4');
INSERT INTO `cmswing_area` VALUES ('632823', '天峻县', '632800', '5');
INSERT INTO `cmswing_area` VALUES ('640101', '市辖区', '640100', '1');
INSERT INTO `cmswing_area` VALUES ('640104', '兴庆区', '640100', '2');
INSERT INTO `cmswing_area` VALUES ('640105', '西夏区', '640100', '3');
INSERT INTO `cmswing_area` VALUES ('640106', '金凤区', '640100', '4');
INSERT INTO `cmswing_area` VALUES ('640121', '永宁县', '640100', '5');
INSERT INTO `cmswing_area` VALUES ('640122', '贺兰县', '640100', '6');
INSERT INTO `cmswing_area` VALUES ('640181', '灵武市', '640100', '7');
INSERT INTO `cmswing_area` VALUES ('640201', '市辖区', '640200', '1');
INSERT INTO `cmswing_area` VALUES ('640202', '大武口区', '640200', '2');
INSERT INTO `cmswing_area` VALUES ('640205', '惠农区', '640200', '3');
INSERT INTO `cmswing_area` VALUES ('640221', '平罗县', '640200', '4');
INSERT INTO `cmswing_area` VALUES ('640301', '市辖区', '640300', '1');
INSERT INTO `cmswing_area` VALUES ('640302', '利通区', '640300', '2');
INSERT INTO `cmswing_area` VALUES ('640323', '盐池县', '640300', '3');
INSERT INTO `cmswing_area` VALUES ('640324', '同心县', '640300', '4');
INSERT INTO `cmswing_area` VALUES ('640381', '青铜峡市', '640300', '5');
INSERT INTO `cmswing_area` VALUES ('640401', '市辖区', '640400', '1');
INSERT INTO `cmswing_area` VALUES ('640402', '原州区', '640400', '2');
INSERT INTO `cmswing_area` VALUES ('640422', '西吉县', '640400', '3');
INSERT INTO `cmswing_area` VALUES ('640423', '隆德县', '640400', '4');
INSERT INTO `cmswing_area` VALUES ('640424', '泾源县', '640400', '5');
INSERT INTO `cmswing_area` VALUES ('640425', '彭阳县', '640400', '6');
INSERT INTO `cmswing_area` VALUES ('640501', '市辖区', '640500', '1');
INSERT INTO `cmswing_area` VALUES ('640502', '沙坡头区', '640500', '2');
INSERT INTO `cmswing_area` VALUES ('640521', '中宁县', '640500', '3');
INSERT INTO `cmswing_area` VALUES ('640522', '海原县', '640500', '4');
INSERT INTO `cmswing_area` VALUES ('650101', '市辖区', '650100', '1');
INSERT INTO `cmswing_area` VALUES ('650102', '天山区', '650100', '2');
INSERT INTO `cmswing_area` VALUES ('650103', '沙依巴克区', '650100', '3');
INSERT INTO `cmswing_area` VALUES ('650104', '新市区', '650100', '4');
INSERT INTO `cmswing_area` VALUES ('650105', '水磨沟区', '650100', '5');
INSERT INTO `cmswing_area` VALUES ('650106', '头屯河区', '650100', '6');
INSERT INTO `cmswing_area` VALUES ('650107', '达坂城区', '650100', '7');
INSERT INTO `cmswing_area` VALUES ('650108', '东山区', '650100', '8');
INSERT INTO `cmswing_area` VALUES ('650121', '乌鲁木齐县', '650100', '9');
INSERT INTO `cmswing_area` VALUES ('650201', '市辖区', '650200', '1');
INSERT INTO `cmswing_area` VALUES ('650202', '独山子区', '650200', '2');
INSERT INTO `cmswing_area` VALUES ('650203', '克拉玛依区', '650200', '3');
INSERT INTO `cmswing_area` VALUES ('650204', '白碱滩区', '650200', '4');
INSERT INTO `cmswing_area` VALUES ('650205', '乌尔禾区', '650200', '5');
INSERT INTO `cmswing_area` VALUES ('652101', '吐鲁番市', '652100', '1');
INSERT INTO `cmswing_area` VALUES ('652122', '鄯善县', '652100', '2');
INSERT INTO `cmswing_area` VALUES ('652123', '托克逊县', '652100', '3');
INSERT INTO `cmswing_area` VALUES ('652201', '哈密市', '652200', '1');
INSERT INTO `cmswing_area` VALUES ('652222', '巴里坤哈萨克自治县', '652200', '2');
INSERT INTO `cmswing_area` VALUES ('652223', '伊吾县', '652200', '3');
INSERT INTO `cmswing_area` VALUES ('652301', '昌吉市', '652300', '1');
INSERT INTO `cmswing_area` VALUES ('652302', '阜康市', '652300', '2');
INSERT INTO `cmswing_area` VALUES ('652303', '米泉市', '652300', '3');
INSERT INTO `cmswing_area` VALUES ('652323', '呼图壁县', '652300', '4');
INSERT INTO `cmswing_area` VALUES ('652324', '玛纳斯县', '652300', '5');
INSERT INTO `cmswing_area` VALUES ('652325', '奇台县', '652300', '6');
INSERT INTO `cmswing_area` VALUES ('652327', '吉木萨尔县', '652300', '7');
INSERT INTO `cmswing_area` VALUES ('652328', '木垒哈萨克自治县', '652300', '8');
INSERT INTO `cmswing_area` VALUES ('652701', '博乐市', '652700', '1');
INSERT INTO `cmswing_area` VALUES ('652722', '精河县', '652700', '2');
INSERT INTO `cmswing_area` VALUES ('652723', '温泉县', '652700', '3');
INSERT INTO `cmswing_area` VALUES ('652801', '库尔勒市', '652800', '1');
INSERT INTO `cmswing_area` VALUES ('652822', '轮台县', '652800', '2');
INSERT INTO `cmswing_area` VALUES ('652823', '尉犁县', '652800', '3');
INSERT INTO `cmswing_area` VALUES ('652824', '若羌县', '652800', '4');
INSERT INTO `cmswing_area` VALUES ('652825', '且末县', '652800', '5');
INSERT INTO `cmswing_area` VALUES ('652826', '焉耆回族自治县', '652800', '6');
INSERT INTO `cmswing_area` VALUES ('652827', '和静县', '652800', '7');
INSERT INTO `cmswing_area` VALUES ('652828', '和硕县', '652800', '8');
INSERT INTO `cmswing_area` VALUES ('652829', '博湖县', '652800', '9');
INSERT INTO `cmswing_area` VALUES ('652901', '阿克苏市', '652900', '1');
INSERT INTO `cmswing_area` VALUES ('652922', '温宿县', '652900', '2');
INSERT INTO `cmswing_area` VALUES ('652923', '库车县', '652900', '3');
INSERT INTO `cmswing_area` VALUES ('652924', '沙雅县', '652900', '4');
INSERT INTO `cmswing_area` VALUES ('652925', '新和县', '652900', '5');
INSERT INTO `cmswing_area` VALUES ('652926', '拜城县', '652900', '6');
INSERT INTO `cmswing_area` VALUES ('652927', '乌什县', '652900', '7');
INSERT INTO `cmswing_area` VALUES ('652928', '阿瓦提县', '652900', '8');
INSERT INTO `cmswing_area` VALUES ('652929', '柯坪县', '652900', '9');
INSERT INTO `cmswing_area` VALUES ('653001', '阿图什市', '653000', '1');
INSERT INTO `cmswing_area` VALUES ('653022', '阿克陶县', '653000', '2');
INSERT INTO `cmswing_area` VALUES ('653023', '阿合奇县', '653000', '3');
INSERT INTO `cmswing_area` VALUES ('653024', '乌恰县', '653000', '4');
INSERT INTO `cmswing_area` VALUES ('653101', '喀什市', '653100', '1');
INSERT INTO `cmswing_area` VALUES ('653121', '疏附县', '653100', '2');
INSERT INTO `cmswing_area` VALUES ('653122', '疏勒县', '653100', '3');
INSERT INTO `cmswing_area` VALUES ('653123', '英吉沙县', '653100', '4');
INSERT INTO `cmswing_area` VALUES ('653124', '泽普县', '653100', '5');
INSERT INTO `cmswing_area` VALUES ('653125', '莎车县', '653100', '6');
INSERT INTO `cmswing_area` VALUES ('653126', '叶城县', '653100', '7');
INSERT INTO `cmswing_area` VALUES ('653127', '麦盖提县', '653100', '8');
INSERT INTO `cmswing_area` VALUES ('653128', '岳普湖县', '653100', '9');
INSERT INTO `cmswing_area` VALUES ('653129', '伽师县', '653100', '10');
INSERT INTO `cmswing_area` VALUES ('653130', '巴楚县', '653100', '11');
INSERT INTO `cmswing_area` VALUES ('653131', '塔什库尔干塔吉克自治县', '653100', '12');
INSERT INTO `cmswing_area` VALUES ('653201', '和田市', '653200', '1');
INSERT INTO `cmswing_area` VALUES ('653221', '和田县', '653200', '2');
INSERT INTO `cmswing_area` VALUES ('653222', '墨玉县', '653200', '3');
INSERT INTO `cmswing_area` VALUES ('653223', '皮山县', '653200', '4');
INSERT INTO `cmswing_area` VALUES ('653224', '洛浦县', '653200', '5');
INSERT INTO `cmswing_area` VALUES ('653225', '策勒县', '653200', '6');
INSERT INTO `cmswing_area` VALUES ('653226', '于田县', '653200', '7');
INSERT INTO `cmswing_area` VALUES ('653227', '民丰县', '653200', '8');
INSERT INTO `cmswing_area` VALUES ('654002', '伊宁市', '654000', '1');
INSERT INTO `cmswing_area` VALUES ('654003', '奎屯市', '654000', '2');
INSERT INTO `cmswing_area` VALUES ('654021', '伊宁县', '654000', '3');
INSERT INTO `cmswing_area` VALUES ('654022', '察布查尔锡伯自治县', '654000', '4');
INSERT INTO `cmswing_area` VALUES ('654023', '霍城县', '654000', '5');
INSERT INTO `cmswing_area` VALUES ('654024', '巩留县', '654000', '6');
INSERT INTO `cmswing_area` VALUES ('654025', '新源县', '654000', '7');
INSERT INTO `cmswing_area` VALUES ('654026', '昭苏县', '654000', '8');
INSERT INTO `cmswing_area` VALUES ('654027', '特克斯县', '654000', '9');
INSERT INTO `cmswing_area` VALUES ('654028', '尼勒克县', '654000', '10');
INSERT INTO `cmswing_area` VALUES ('654201', '塔城市', '654200', '1');
INSERT INTO `cmswing_area` VALUES ('654202', '乌苏市', '654200', '2');
INSERT INTO `cmswing_area` VALUES ('654221', '额敏县', '654200', '3');
INSERT INTO `cmswing_area` VALUES ('654223', '沙湾县', '654200', '4');
INSERT INTO `cmswing_area` VALUES ('654224', '托里县', '654200', '5');
INSERT INTO `cmswing_area` VALUES ('654225', '裕民县', '654200', '6');
INSERT INTO `cmswing_area` VALUES ('654226', '和布克赛尔蒙古自治县', '654200', '7');
INSERT INTO `cmswing_area` VALUES ('654301', '阿勒泰市', '654300', '1');
INSERT INTO `cmswing_area` VALUES ('654321', '布尔津县', '654300', '2');
INSERT INTO `cmswing_area` VALUES ('654322', '富蕴县', '654300', '3');
INSERT INTO `cmswing_area` VALUES ('654323', '福海县', '654300', '4');
INSERT INTO `cmswing_area` VALUES ('654324', '哈巴河县', '654300', '5');
INSERT INTO `cmswing_area` VALUES ('654325', '青河县', '654300', '6');
INSERT INTO `cmswing_area` VALUES ('654326', '吉木乃县', '654300', '7');
INSERT INTO `cmswing_area` VALUES ('659001', '石河子市', '659000', '1');
INSERT INTO `cmswing_area` VALUES ('659002', '阿拉尔市', '659000', '2');
INSERT INTO `cmswing_area` VALUES ('659003', '图木舒克市', '659000', '3');
INSERT INTO `cmswing_area` VALUES ('659004', '五家渠市', '659000', '4');
INSERT INTO `cmswing_area` VALUES ('810001', '香港', '810000', '1');
INSERT INTO `cmswing_area` VALUES ('810002', '中西区', '810001', '1');
INSERT INTO `cmswing_area` VALUES ('810003', '九龙城区', '810001', '2');
INSERT INTO `cmswing_area` VALUES ('810004', '南区', '810001', '3');
INSERT INTO `cmswing_area` VALUES ('810005', '黄大仙区', '810001', '4');
INSERT INTO `cmswing_area` VALUES ('810006', '油尖旺区', '810001', '5');
INSERT INTO `cmswing_area` VALUES ('810007', '葵青区', '810001', '6');
INSERT INTO `cmswing_area` VALUES ('810008', '西贡区', '810001', '7');
INSERT INTO `cmswing_area` VALUES ('810009', '屯门区', '810001', '8');
INSERT INTO `cmswing_area` VALUES ('810010', '荃湾区', '810001', '9');
INSERT INTO `cmswing_area` VALUES ('810011', '东区', '810001', '10');
INSERT INTO `cmswing_area` VALUES ('810012', '观塘区', '810001', '11');
INSERT INTO `cmswing_area` VALUES ('810013', '深水步区', '810001', '12');
INSERT INTO `cmswing_area` VALUES ('810014', '湾仔区', '810001', '13');
INSERT INTO `cmswing_area` VALUES ('810015', '离岛区', '810001', '14');
INSERT INTO `cmswing_area` VALUES ('810016', '北区', '810001', '15');
INSERT INTO `cmswing_area` VALUES ('810017', '沙田区', '810001', '16');
INSERT INTO `cmswing_area` VALUES ('810018', '大埔区', '810001', '17');
INSERT INTO `cmswing_area` VALUES ('810019', '元朗区', '810001', '18');
INSERT INTO `cmswing_area` VALUES ('820001', '澳门', '820000', '1');
INSERT INTO `cmswing_area` VALUES ('820002', '澳门', '820001', '1');
INSERT INTO `cmswing_area` VALUES ('710001', '台北市', '710000', '1');
INSERT INTO `cmswing_area` VALUES ('710002', '台北县', '710001', '1');
INSERT INTO `cmswing_area` VALUES ('710003', '基隆市', '710000', '2');
INSERT INTO `cmswing_area` VALUES ('910005', '中山市', '442000', '1');
INSERT INTO `cmswing_area` VALUES ('710004', '花莲县', '710003', '1');
INSERT INTO `cmswing_area` VALUES ('910006', '东莞市', '441900', '1');
INSERT INTO `cmswing_area` VALUES ('910010', '1111', '910007', '1');

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
  `remark` text NOT NULL COMMENT '备注',
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
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COMMENT='模型属性表';

-- ----------------------------
-- Records of cmswing_attribute
-- ----------------------------
INSERT INTO `cmswing_attribute` VALUES ('1', 'uid', '用户ID', 'int(10) unsigned NOT NULL ', 'num', '0', '', '0', '', '1', '0', '1', '1384508362', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('2', 'name', '标识', 'char(40) NOT NULL ', 'string', '', '同一根节点下标识不重复', '1', '', '1', '0', '1', '1383894743', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('3', 'title', '标题', 'char(80) NOT NULL ', 'string', '', '文档标题', '1', '', '1', '0', '1', '1383894778', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('4', 'category_id', '所属分类', 'int(10) unsigned NOT NULL ', 'string', '', '', '0', '', '1', '0', '1', '1384508336', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('5', 'description', '描述', 'char(140) NOT NULL ', 'textarea', '', '简介(选填，微信分享给好友时会显示这里的文案)', '1', '', '1', '0', '1', '1456398274652', '1455692156629', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('6', 'root', '根节点', 'int(10) unsigned NOT NULL ', 'num', '0', '该文档的顶级文档编号', '0', '', '1', '0', '1', '1384508323', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('7', 'pid', '所属ID', 'int(10) unsigned NOT NULL ', 'num', '0', '父文档编号', '0', '', '1', '0', '1', '1384508543', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('8', 'model_id', '内容模型ID', 'tinyint(3) unsigned NOT NULL ', 'num', '0', '该文档所对应的模型', '0', '', '1', '0', '1', '1384508350', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('9', 'type', '内容类型', 'tinyint(3) unsigned NOT NULL ', 'select', '2', '', '1', '1:目录\r\n2:主题\r\n3:段落', '1', '0', '1', '1384511157', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('10', 'position', '推荐位', 'smallint(5) unsigned NOT NULL ', 'checkbox', '0', '多个推荐则将其推荐值相加', '1', '1:列表推荐\r\n2:频道推荐\r\n4:首页推荐', '1', '0', '1', '1451019960368', '1455692156629', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('11', 'link_id', '外链', 'int(10) unsigned NOT NULL ', 'num', '0', '0-非外链，大于0-外链ID,需要函数进行链接与编号的转换', '1', '', '1', '0', '1', '1383895757', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('12', 'cover_id', '封面', 'int(10) unsigned NOT NULL ', 'picture', '0', '0-无封面，大于0-封面图片ID，需要函数处理', '1', '', '1', '0', '1', '1384147827', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('13', 'display', '可见性', 'tinyint(3) unsigned NOT NULL ', 'radio', '1', '', '1', '0:不可见\r\n1:所有人可见', '1', '0', '1', '1386662271', '1455692156629', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('14', 'deadline', '截至时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '0-永久有效', '1', '', '1', '0', '1', '1387163248', '1455692156629', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('15', 'attach', '附件数量', 'tinyint(3) unsigned NOT NULL ', 'num', '0', '', '0', '', '1', '0', '1', '1387260355', '1455692156629', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('16', 'view', '浏览量', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '1', '0', '1', '1383895835', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('17', 'comment', '评论数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '1', '0', '1', '1383895846', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('18', 'extend', '扩展统计字段', 'int(10) unsigned NOT NULL ', 'num', '0', '根据需求自行使用', '0', '', '1', '0', '1', '1384508264', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('19', 'level', '优先级', 'int(10) unsigned NOT NULL ', 'num', '0', '越高排序越靠前', '1', '', '1', '0', '1', '1383895894', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('20', 'create_time', '创建时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '', '1', '', '1', '0', '1', '1383895903', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('21', 'update_time', '更新时间', 'int(10) unsigned NOT NULL ', 'datetime', '0', '', '0', '', '1', '0', '1', '1384508277', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('22', 'status', '数据状态', 'tinyint(4) NOT NULL ', 'radio', '0', '', '0', '-1:删除\r\n0:禁用\r\n1:正常\r\n2:待审核\r\n3:草稿', '1', '0', '1', '1384508496', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('23', 'parse', '内容解析类型', 'tinyint(3) unsigned NOT NULL ', 'select', '0', '', '0', '0:html\r\n1:ubb\r\n2:markdown', '2', '0', '1', '1384511049', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('24', 'content', '文章内容', 'text NOT NULL ', 'editor', '', '', '1', '', '2', '0', '1', '1383896225', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('25', 'template', '详情页显示模板', 'varchar(100) NOT NULL ', 'string', '', '参照display方法参数的定义', '1', '', '2', '0', '1', '1383896190', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('26', 'bookmark', '收藏数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '2', '0', '1', '1383896103', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('27', 'parse', '内容解析类型', 'tinyint(3) unsigned NOT NULL ', 'select', '0', '', '0', '0:html\r\n1:ubb\r\n2:markdown', '3', '0', '1', '1387260461', '1455692156629', '', '0', '', 'regex', '', '0', 'function');
INSERT INTO `cmswing_attribute` VALUES ('28', 'content', '下载详细描述', 'text NOT NULL ', 'editor', '', '', '1', '', '3', '0', '1', '1383896438', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('29', 'template', '详情页显示模板', 'varchar(100) NOT NULL ', 'string', '', '', '1', '', '3', '0', '1', '1383896429', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('30', 'file_id', '文件ID', 'int(10) unsigned NOT NULL ', 'file', '0', '需要函数处理', '1', '', '3', '0', '1', '1383896415', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('31', 'download', '下载次数', 'int(10) unsigned NOT NULL ', 'num', '0', '', '1', '', '3', '0', '1', '1383896380', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('32', 'size', '文件大小', 'bigint(20) unsigned NOT NULL ', 'num', '0', '单位bit', '1', '', '3', '0', '1', '1383896371', '1455692156629', '', '0', '', '', '', '0', '');
INSERT INTO `cmswing_attribute` VALUES ('33', 'title', '标题', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '38', '0', '1', '1449654579', '1455692156629', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('34', 'user', 'user', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '38', '0', '1', '1449654738', '1455692156629', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('43', 'testtext', '测试文本框', 'text NOT NULL', 'textarea', '', '', '1', '', '40', '0', '1', '0', '4294967295', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('37', 'aaaaa', '测试', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '38', '0', '0', '0', '0', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('44', 'testvarchar', '测试字符串', 'varchar(255) NOT NULL', 'string', '测试字符串默认值', '', '1', '', '40', '0', '1', '0', '4294967295', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('40', 'username', '用户名称', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '39', '0', '1', '0', '4294967295', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('45', 'testdate', '测试日期', 'bigint(13) NOT NULL', 'date', '', '', '1', '', '40', '0', '1', '0', '1450412511553', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('46', 'testnun', '测试数字', 'int(10) UNSIGNED NOT NULL', 'num', '', '', '1', '', '40', '0', '1', '0', '1450412574764', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('47', 'testbool', '测试布尔', 'tinyint(2) NOT NULL', 'bool', '1', '', '1', '1:是\r\n2:否', '40', '0', '1', '0', '1450412802959', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('48', 'testpicture', '测试上传图片', 'int(10) UNSIGNED NOT NULL', 'picture', '', '', '1', '', '40', '0', '1', '0', '1450416534420', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('49', 'testfile', '测试上传附件', 'int(10) UNSIGNED NOT NULL', 'file', '', '', '1', '', '40', '0', '1', '0', '1450416616549', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('50', 'title', '文章标题', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '41', '0', '1', '0', '1450534650444', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('51', 'picurl', '上传图片', 'int(10) UNSIGNED NOT NULL', 'picture', '', '', '1', '', '43', '0', '1', '0', '1451110019548', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('58', 'uppic', '图片上传', 'int(10) UNSIGNED NOT NULL', 'picture', '', '', '1', '', '44', '0', '1', '0', '1451878043164', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('60', 'picinfo', '图片说明', 'text NOT NULL', 'textarea', '', '', '1', '', '44', '0', '1', '0', '1451878215891', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('61', 'bbq', '编辑器', 'text NOT NULL', 'editor', '', '', '1', '', '44', '0', '1', '0', '1451878885909', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('62', 'picss', '图片', 'int(10) UNSIGNED NOT NULL', 'picture', '', '上传图片，不大于400兆', '1', '', '45', '0', '1', '0', '1452918866690', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('63', 'suk', '库存/规格', 'text NOT NULL', 'suk', '', '', '1', '', '4', '0', '1', '1455769829822', '1455680862339', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('65', 'pics', '多图上传', 'varchar(255) NOT NULL', 'pics', '', '', '1', '', '1', '0', '1', '0', '1455692156629', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('67', 'price', '价格', 'varchar(255) NOT NULL', 'price', '', '', '1', '', '1', '0', '1', '0', '1456122357598', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('69', 'goods_no', '商家编码', 'varchar(255) NOT NULL', 'string', '', '', '1', '', '4', '0', '1', '1456128840440', '1456128738327', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('71', 'total_stock', '总库存', 'int(10) unsigned NOT NULL', 'num', '0', '总库存为 0 时，会上架到『已售罄的商品』列表里  发布后商品同步更新，以库存数字为准', '1', '', '4', '0', '1', '1456129021000', '1456128960735', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('73', 'quota', '每人限购', 'int(10) unsigned NOT NULL', 'num', '0', ' 0 代表不限购', '1', '', '4', '0', '1', '0', '1456129417690', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('75', 'join_level_discount', '会员折扣', 'varchar(100) NOT NULL', 'checkbox', '1', '', '1', '1:参加会员折扣', '4', '0', '1', '0', '1456129558129', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('77', 'invoice', '发票', 'char(10) NOT NULL', 'radio', '0', '', '1', '0:无\r\n1:有', '4', '0', '1', '0', '1456129640083', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('79', 'warranty', '保修', 'char(10) NOT NULL', 'radio', '0', '', '1', '0:无\r\n1:有', '4', '0', '1', '0', '1456129729338', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('81', 'goods_detail', '商品详情', 'text NOT NULL', 'editor', '', '', '1', '', '4', '1', '1', '0', '1456130237178', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('83', 'freight', '设置运费', 'varchar(255) NOT NULL', 'freight', '', ' <a class=\"js-refresh-delivery text-info-dk\" href=\"javascript:;\">刷新</a>\r\n                                <span class=\"c-gray\">|</span>\r\n                                <a href=\"#\" target=\"_blank\" class=\"text-info-dk\">新建</a>\r\n                                <span class=\"c-gray\">|</span>\r\n                                <a href=\"#\" target=\"_blank\" class=\"text-info-dk\">如何设置合适的运费模板？</a>', '1', '', '4', '1', '1', '1456206927526', '1456205924096', '', '3', '', 'regex', '', '3', 'function');
INSERT INTO `cmswing_attribute` VALUES ('85', 'weight', '重量(g)', 'int(10) unsigned NOT NULL', 'num', '0', '请输入商品的重量单位为（g）,如果商品有多个规格，以规格重量为准。', '1', '', '4', '1', '1', '0', '1457779557990', '', '3', '', 'regex', '', '3', 'function');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_auth_role
-- ----------------------------
INSERT INTO `cmswing_auth_role` VALUES ('1', '默认用户组', '默认用户组', '1', '1', 'admin', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=200 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_auth_rule
-- ----------------------------
INSERT INTO `cmswing_auth_rule` VALUES ('1', 'admin/index/index', '首页', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('2', 'other', '其他', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('3', 'user', '用户管理', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('4', 'User/updatePassword', '修改密码', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('5', 'User/updateNickname', '修改昵称', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('6', 'admin/user/userlist', '获取用户列表（ajax）', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('7', 'admin/user/recharge', '会员充值', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('8', 'admin/user/index', '用户信息', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('9', 'admin/user/adduser', '新增用户', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('10', 'admin/user/userdel', '删除用户', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('11', 'admin/user/chsta', '禁用用户', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('12', 'admin/user/parsley', '验证用户', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('13', 'admin/auth/index', '权限管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('14', 'AuthManager/changeStatus?method=deleteGroup', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('15', 'AuthManager/addToModel', '保存模型授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('16', 'AuthManager/changeStatus?method=resumeGroup', '恢复', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('17', 'AuthManager/createGroup', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('18', 'AuthManager/editGroup', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('19', 'AuthManager/writeGroup', '保存用户组', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('20', 'AuthManager/group', '授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('21', 'AuthManager/changeStatus?method=forbidGroup', '禁用', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('22', 'AuthManager/user', '成员授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('23', 'AuthManager/removeFromGroup', '解除授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('24', 'AuthManager/addToGroup', '保存成员授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('25', 'AuthManager/category', '分类授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('26', 'AuthManager/addToCategory', '保存分类授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('27', 'AuthManager/modelauth', '模型授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('28', 'AuthManager/access', '访问授权', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('29', 'admin/action/index', '用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('30', 'User/addaction', '新增用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('31', 'User/editaction', '编辑用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('32', 'User/saveAction', '保存用户行为', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('33', 'User/setStatus', '变更行为状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('34', 'User/changeStatus?method=forbidUser', '禁用会员', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('35', 'User/changeStatus?method=resumeUser', '启用会员', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('36', 'User/changeStatus?method=deleteUser', '删除会员', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('37', 'admin/action/log', '行为日志', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('38', 'action/edit', '查看行为日志', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('39', 'promotion', '营销推广', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('40', 'admin/promotion/goods', '商品促销', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('41', 'admin/promotion/order', '订单促销', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('42', 'admin/promotion/bunding', '捆绑销售', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('43', 'admin/promotion/tuan', '团购', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('44', 'admin/promotin/flash', '限时抢购', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('45', 'admin/promotion/voucher', '代金卷', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('46', 'order', '订单中心', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('47', 'admin/order/list', '订单管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('48', 'admin/order/vieworder', '查看订单', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('49', 'admin/order/receiving', '收款单', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('50', 'admin/order/invoice', '发货单', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('51', 'admin/order/refund', '退款单', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('52', 'article', '网站内容', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('53', 'admin/article/index', '内容管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('54', 'article/add', '新增', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('55', 'Article/examine', '审核列表', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('56', 'article/setStatus', '改变状态', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('57', 'article/update', '保存', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('58', 'article/autoSave', '保存草稿', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('59', 'article/edit', '编辑', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('60', 'article/copy', '复制', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('61', 'article/paste', '粘贴', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('62', 'article/batchOperate', '导入', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('63', 'Article/sort', '文档排序', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('64', 'article/move', '移动', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('65', 'admin/category/index', '分类管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('66', 'Category/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('67', 'Category/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('68', 'Category/remove', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('69', 'Category/operate/type/move', '移动', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('70', 'Category/operate/type/merge', '合并', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('71', 'admin/article/recycle', '回收站', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('72', 'article/permit', '还原', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('73', 'article/clear', '清空', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('74', 'admin/tags/index', 'tags', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('75', 'admin/tags/ajaxaddtags', '添加tags（ajax）', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('76', 'admin/tags/ajaxgettags', '获取tags（ajax）', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('77', 'wenz/mang', '其他', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('78', 'admin/mpbase/index', '微信', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('79', 'admin/mpbase/seting', '公共账号管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('80', 'admin/mpbase/mass', '群发消息', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('81', 'admin/mpbase2/fodderlist', '素材管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('82', 'admin/mpbase/menu', '微信用户管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('83', 'admin/mpbase2/autoreply', '自动回复', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('84', 'admin/mpbase2/custommenu', '自定义菜单', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('85', 'finance', '财务管理', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('86', 'admin/finance/log', '财务日志', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('87', 'admin/finance/withdraw', '提现申请', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('88', 'setup', '系统设置', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('89', 'admin/attribute/index', '属性管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('90', 'admin/attribute/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('91', 'admin/attribute/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('92', 'admin/attribute/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('93', 'admin/attribute/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('94', 'admin/setup/index', '网站设置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('95', 'admin/model/index', '模型管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('96', 'model/add', '新增', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('97', 'model/edit', '编辑', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('98', 'model/setStatus', '改变状态', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('99', 'model/update', '保存数据', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('100', 'think/add', '新增数据', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('101', 'think/edit', '编辑数据', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('102', 'Model/generate', '生成', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('103', 'think/lists', '数据列表', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('104', 'admin/setup/group', '配置管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('105', 'Config/edit', '编辑', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('106', 'Config/del', '删除', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('107', 'Config/add', '新增', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('108', 'Config/save', '保存', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('109', 'Config/sort', '排序', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('110', 'admin/menu/index', '菜单管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('111', 'Menu/add', '新增', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('112', 'Menu/edit', '编辑', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('113', 'Menu/import', '导入', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('114', 'Menu/sort', '排序', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('115', 'admin/channel/index', '导航管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('116', 'Channel/add', '新增', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('117', 'Channel/edit', '编辑', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('118', 'Channel/del', '删除', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('119', 'Channel/sort', '排序', '0', '-1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('120', 'admin/database/index', '备份数据库', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('121', 'Database/export', '备份', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('122', 'Database/optimize', '优化表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('123', 'Database/repair', '修复表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('124', 'admin/database/imports', '还原数据库', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('125', 'Database/import', '恢复', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('126', 'Database/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('127', 'Addons/index', '扩展', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('128', 'Addons/index', '插件管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('129', 'Addons/create', '创建', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('130', 'Addons/execute', 'URL方式访问插件', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('131', 'Addons/preview', '预览', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('132', 'Addons/build', '快速生成插件', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('133', 'Addons/config', '设置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('134', 'Addons/disable', '禁用', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('135', 'Addons/checkForm', '检测创建', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('136', 'Addons/install', '安装', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('137', 'Addons/uninstall', '卸载', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('138', 'Addons/saveconfig', '更新配置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('139', 'Addons/adminList', '插件后台列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('140', 'Addons/enable', '启用', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('141', 'Addons/hooks', '钩子管理', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('142', 'Addons/addHook', '新增钩子', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('143', 'Addons/edithook', '编辑钩子', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('144', 'ecom', '支付与配送', '0', '1', '', 'admin', '2');
INSERT INTO `cmswing_auth_rule` VALUES ('145', 'admin/ecom/payment', '支付方式', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('146', 'admin/ecom/payplugin', '支付插件', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('147', 'admin/ecom/fare', '运费模板', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('148', 'admin/ecom/addfare', '添加运费模板', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('149', 'admin/ecom/farearea', '选择配送地区', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('150', 'admin/ecom/editfare', '编辑运费模板', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('151', 'admin/ecom/delfare', '删除运费模板', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('152', 'admin/ecom/defaulffare', '设置默认模板', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('153', 'admin/ecom/express', '快递公司', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('154', 'admin/ecom/pingxx', '支付配置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('155', 'admin/ecom/addappid', '设置App_ID', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('156', 'admin/ecom/addlivesecretkey', '设置Live Secret Key', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('157', 'admin/ecom/setstatus', '启用/禁用支付渠道', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('158', 'admin/order/see', '查看', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('159', 'admin/order/audit', '审核', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('160', 'admin/order/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('161', 'admin/order/ship', '发货', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('162', 'admin/setup/save', '保存', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('163', 'admin/model/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('164', 'admin/model/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('165', 'admin/model/setstatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('166', 'admin/model/update', '保存数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('167', 'admin/cms/add', '新增数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('168', 'admin/cms/edit', '编辑数据', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('169', 'admin/cms/list', '数据列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('170', 'admin/setup/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('171', 'admin/setup/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('172', 'admin/setup/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('173', 'admin/setup/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('174', 'admin/menu/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('175', 'admin/menu/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('176', 'admin/menu/import', '导入', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('177', 'admin/menu/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('178', 'admin/menu/getmenu', '上级菜单', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('179', 'admin/channel/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('180', 'admin/channel/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('181', 'admin/channel/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('182', 'admin/channel/sort', '排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('183', 'admin/ecom/rsa', '设置商户私钥', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('184', 'admin/ecom/webhokks', 'Webhooks配置', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('185', 'admin/order/finish', '完成', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('186', 'admin/order/void', '作废', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('187', 'admin/order/del', '删除', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('188', 'admin/order/remark', '备注', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('189', 'admin/article/add', '新增', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('190', 'admin/article/examine', '审核列表', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('191', 'admin/article/setStatus', '改变状态', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('192', 'admin/article/update', '保存', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('193', 'admin/article/autoSave', '保存草稿', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('194', 'admin/article/edit', '编辑', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('195', 'admin/article/copy', '复制', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('196', 'admin/article/paste', '粘贴', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('197', 'admin/article/batchOperate', '导入', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('198', 'admin/article/sort', '文档排序', '0', '1', '', 'admin', '1');
INSERT INTO `cmswing_auth_rule` VALUES ('199', 'admin/article/move', '移动', '0', '1', '', 'admin', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_auth_user_role
-- ----------------------------
INSERT INTO `cmswing_auth_user_role` VALUES ('1', '1', '1');
INSERT INTO `cmswing_auth_user_role` VALUES ('2', '1', '2');
INSERT INTO `cmswing_auth_user_role` VALUES ('3', '14', '19');
INSERT INTO `cmswing_auth_user_role` VALUES ('4', '6', '1');
INSERT INTO `cmswing_auth_user_role` VALUES ('5', '8', '1');

-- ----------------------------
-- Table structure for cmswing_balance_log
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_balance_log`;
CREATE TABLE `cmswing_balance_log` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `admin_id` bigint(11) DEFAULT '0',
  `user_id` bigint(11) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `time` bigint(13) DEFAULT NULL,
  `amount` float(10,2) NOT NULL,
  `amount_log` float(10,2) NOT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_balance_log
-- ----------------------------
INSERT INTO `cmswing_balance_log` VALUES ('22', '1', '2', '2', '1459613929073', '1.00', '801.00', '管理员（admin）为您充值，充值的金额为：1 元');
INSERT INTO `cmswing_balance_log` VALUES ('23', '1', '2', '2', '1459614714987', '1.00', '802.00', '管理员（admin）为您充值，充值的金额为：1 元');
INSERT INTO `cmswing_balance_log` VALUES ('24', '1', '2', '2', '1459614719886', '1.00', '803.00', '管理员（admin）为您充值，充值的金额为：1 元');
INSERT INTO `cmswing_balance_log` VALUES ('25', '1', '2', '2', '1459614723994', '1.00', '804.00', '管理员（admin）为您充值，充值的金额为：1 元');
INSERT INTO `cmswing_balance_log` VALUES ('26', '1', '2', '2', '1459614740104', '2.00', '806.00', '管理员（admin）为您充值，充值的金额为：2 元');
INSERT INTO `cmswing_balance_log` VALUES ('10', '1', '1', '2', '1458381526021', '1.00', '98925.73', null);
INSERT INTO `cmswing_balance_log` VALUES ('11', '1', '1', '2', '1458381626851', '1.00', '98926.73', '管理员（admin）为您充值，充值的金额为：1 元');
INSERT INTO `cmswing_balance_log` VALUES ('12', '1', '1', '2', '1458383085852', '33.00', '98959.73', '管理员（admin）为您充值，充值的金额为：33 元');
INSERT INTO `cmswing_balance_log` VALUES ('13', '1', '1', '2', '1458384002913', '8.00', '98967.73', '管理员（admin）为您充值，充值的金额为：8 元');
INSERT INTO `cmswing_balance_log` VALUES ('14', '1', '1', '2', '1458384860557', '12.00', '98979.73', '管理员（admin）为您充值，充值的金额为：12 元');
INSERT INTO `cmswing_balance_log` VALUES ('15', '0', '1', '2', '1458728503324', '120.00', '98739.73', 'admin 通过余额支付方式进行商品购买,订单编号：1458728497615');
INSERT INTO `cmswing_balance_log` VALUES ('16', '0', '1', '2', '1458728616943', '-235.00', '98504.73', 'admin 通过余额支付方式进行商品购买,订单编号：1458728609828');
INSERT INTO `cmswing_balance_log` VALUES ('17', '0', '1', '2', '1458908969609', '-102.00', '98402.73', 'admin 通过余额支付方式进行商品购买,订单编号：1458908875350');
INSERT INTO `cmswing_balance_log` VALUES ('18', '1', '2', '2', '1458989966829', '10.00', '10.00', '管理员（admin）为您充值，充值的金额为：10 元');
INSERT INTO `cmswing_balance_log` VALUES ('19', '1', '2', '2', '1459072703341', '1000.00', '1010.00', '管理员（admin）为您充值，充值的金额为：1000 元');
INSERT INTO `cmswing_balance_log` VALUES ('20', '0', '2', '2', '1459072709499', '-105.00', '905.00', 'cmswing 通过余额支付方式进行商品购买,订单编号：1459071640873');
INSERT INTO `cmswing_balance_log` VALUES ('21', '0', '2', '2', '1459270332518', '-105.00', '800.00', 'cmswing 通过余额支付方式进行商品购买,订单编号：d21459269259683');
INSERT INTO `cmswing_balance_log` VALUES ('27', '1', '2', '2', '1459614745280', '3.00', '809.00', '管理员（admin）为您充值，充值的金额为：3 元');
INSERT INTO `cmswing_balance_log` VALUES ('28', '1', '2', '2', '1459614749889', '4.00', '813.00', '管理员（admin）为您充值，充值的金额为：4 元');
INSERT INTO `cmswing_balance_log` VALUES ('29', '0', '2', '2', '1459663848688', '312.00', '1125.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459660400589');
INSERT INTO `cmswing_balance_log` VALUES ('30', '0', '2', '2', '1459664058006', '3.00', '1128.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459664053173');
INSERT INTO `cmswing_balance_log` VALUES ('31', '0', '2', '2', '1459664629300', '1.00', '1129.00', 'cmswing 通过[银联网关支付]支付方式进行充值,订单编号：c21459656748141');
INSERT INTO `cmswing_balance_log` VALUES ('32', '0', '2', '2', '1459664661351', '10.00', '1139.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459656644912');
INSERT INTO `cmswing_balance_log` VALUES ('33', '0', '2', '2', '1459666098428', '10.00', '1149.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459656644910');
INSERT INTO `cmswing_balance_log` VALUES ('34', '0', '2', '2', '1459666121367', '10.00', '1159.00', 'cmswing 通过[银联网关支付]支付方式进行充值,订单编号：c21459666119178');
INSERT INTO `cmswing_balance_log` VALUES ('35', '0', '2', '2', '1459667105970', '100.00', '1259.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459667055710');
INSERT INTO `cmswing_balance_log` VALUES ('36', '0', '2', '2', '1459940265338', '1.00', '1260.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459940262279');
INSERT INTO `cmswing_balance_log` VALUES ('37', '0', '2', '2', '1459940304213', '1.00', '1261.00', 'cmswing 通过[支付宝 PC 网页支付]支付方式进行充值,订单编号：c21459940290629');

-- ----------------------------
-- Table structure for cmswing_cart
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_cart`;
CREATE TABLE `cmswing_cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `product_id` int(11) NOT NULL DEFAULT '0',
  `qty` int(11) NOT NULL COMMENT '商品数量',
  `type` varchar(255) NOT NULL COMMENT '商品类型',
  `price` int(11) NOT NULL COMMENT '商品价格小计',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `unit_price` int(11) NOT NULL COMMENT '商品单价',
  `pic` varchar(255) NOT NULL COMMENT '商品图片',
  `url` varchar(255) NOT NULL COMMENT '商品地址',
  `weight` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_cart
-- ----------------------------

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
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态',
  `icon` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类图标',
  `groups` varchar(255) NOT NULL DEFAULT '' COMMENT '分组定义',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`),
  KEY `pid` (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COMMENT='分类表';

-- ----------------------------
-- Records of cmswing_category
-- ----------------------------
INSERT INTO `cmswing_category` VALUES ('1', 'blog', '博客', '0', '0', '10', '', 'fsf,犯得上发射点,', 'fdsfdsafdsafas', '', '', '', '', '2,3', '2', '2,1', '0', '0', '1', '0', '0', '1', '', '1379474947', '1382701539', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('2', 'it', 'it', '1', '1', '10', '', '', '', '', '', '', '', '2,3,4', '2,3,4', '1,2,3', '0', '1', '1', '0', '0', '1', '', '1379475028', '1457513149411', '1', '0', '0:aaaa\r\n1:bbbb\r\n2:cccc\r\n3:dddd');
INSERT INTO `cmswing_category` VALUES ('39', 'telecom', '通信', '2', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '1,2,3', '0', '2', '1', '0', '0', '1', '', '1447235659', '1457513185483', '1', '0', '11111');
INSERT INTO `cmswing_category` VALUES ('40', 'pic', '图片上传', '0', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '', '0', '1', '1', '0', '0', '1', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('41', 'aaaa', '三级分类测试', '39', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('42', 'tttttt', '四级分类', '41', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('43', 'ssg', '五级', '42', '0', '10', '', '', '', '', '', '', '', '2', '2', '1,2,3', '0', '1', '1', '0', '1', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('44', 'hhh', '六级', '43', '0', '10', '', '', '', '', '', '', '', '2,3', '2,3', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('45', 'shop', '商城', '0', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('46', 'doc', '文档', '0', '0', '10', '', '', '', '', '', '', '', '2', '2', '', '0', '0', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('47', 'start', '快速入门', '46', '0', '10', '', '', '', '', '', '', '', '2', '2,3', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('48', 'tags', '模板标签', '46', '0', '10', '', '', '', '', '', '', '', '2', '2', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '0', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('49', 'architecture', '构架设计', '46', '0', '10', '', '', '', '', '', '', '', '2', '2,3', '', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('50', 'Tech', '科技', '45', '1', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '1459399681439', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('51', 'numerical', '数码', '50', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '1459399839920', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('52', 'mobile', '手机', '50', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '1459399752069', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('53', 'computer', '电脑', '50', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '1459399788118', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('54', 'women', '女士', '45', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '4', '0', '1', '1', '0', '0', '', null, '4294967295', '0', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('55', 'wsneakers', '鞋', '54', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '0', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('56', 'wclothing', '服装', '54', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '0', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('57', 'waccessories', '配饰', '54', '0', '10', '', '', '', '', 'shop.html', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '0', '', null, '4294967295', '4294967295', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('58', 'www', '222', '53', '0', '10', '', '', '', '', '', '', '', '4', '4', '1,2,3', '0', '1', '1', '0', '1', '', null, '1457502485699', '0', '1', '0', '');
INSERT INTO `cmswing_category` VALUES ('59', 'rtre', '8646', '53', '0', '10', '', '', '', '', '', '', '', '4', '4', '4', '0', '0', '1', '0', '0', '', null, '1457502645665', '0', '1', '0', '');

-- ----------------------------
-- Table structure for cmswing_channel
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_channel`;
CREATE TABLE `cmswing_channel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '频道ID',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '上级频道ID',
  `title` char(30) NOT NULL COMMENT '频道标题',
  `url` char(100) NOT NULL COMMENT '频道连接',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '导航排序',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `target` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '新窗口打开',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_channel
-- ----------------------------
INSERT INTO `cmswing_channel` VALUES ('1', '0', '首页', '/', '1', '1379475111', '1379923177', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('2', '0', '博客', '/topic/index?category=blog', '2', '1379475131', '1379483713', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('3', '0', '外部链接', 'http://www.cmswing.com', '3', '1379475154', '1454396773062', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('10', '0', '测试导航', '11111', '5', '1454399423443', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('11', '10', '222', '1111', '0', '1454400241024', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('12', '10', '1111', '222211', '0', '1454400255255', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('13', '0', '文档', '/channel/doc', '3', '1454405194251', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('14', '13', '快速入门', '/column/start', '0', '1454405426043', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('15', '13', '模板标签', '/column/tags', '1', '1454405476532', '1454405553528', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('16', '13', '构架设计', '/column/architecture', '3', '1454405517570', '1454405567389', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('17', '10', '测试1', '1111', '0', '1454405619456', '1454405627281', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('18', '10', '测试2', '22222', '0', '1454405643640', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('19', '18', '测试21', '212121', '0', '1454405662868', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('20', '18', '测试22', '33333', '0', '1454405679378', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('21', '0', '商城', '/column/shop', '5', '1455681109020', '1456284882283', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('22', '21', '科技', '/column/Tech', '0', '1456385981567', '1459417083529', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('23', '21', '女士', '/column/women', '0', '1456386031139', '0', '1', '1');
INSERT INTO `cmswing_channel` VALUES ('24', '22', '数码', '/column/numerical', '0', '1456386084280', '1459417120022', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('25', '22', '手机', '/column/mobile', '0', '1456386107187', '1459417153816', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('26', '22', '电脑', '/column/computer', '0', '1456386192230', '1459417183645', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('27', '23', '鞋', '/column/wsneakers', '0', '1456386241191', '1456386248008', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('28', '23', '服装', '/column/wclothing', '0', '1456386280696', '0', '1', '0');
INSERT INTO `cmswing_channel` VALUES ('29', '23', '配饰', '/column/waccessories', '0', '1456386307640', '0', '1', '0');

-- ----------------------------
-- Table structure for cmswing_customer
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_customer`;
CREATE TABLE `cmswing_customer` (
  `user_id` bigint(20) NOT NULL,
  `real_name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `province` bigint(20) DEFAULT NULL,
  `city` bigint(20) DEFAULT NULL,
  `county` bigint(20) DEFAULT NULL,
  `addr` varchar(250) DEFAULT NULL,
  `qq` varchar(15) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT '1',
  `birthday` bigint(13) DEFAULT NULL,
  `group_id` int(6) DEFAULT '0',
  `point` int(11) DEFAULT '0',
  `message_ids` text,
  `prop` text,
  `balance` float(10,2) DEFAULT '0.00',
  `custom` varchar(255) DEFAULT NULL,
  `checkin_time` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_customer
-- ----------------------------
INSERT INTO `cmswing_customer` VALUES ('1', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '98402.73', null, null);
INSERT INTO `cmswing_customer` VALUES ('2', '柯南1', '029888888', '150000', '150300', '150304', '打撒打撒', null, '1', '513475200000', '0', '0', null, null, '1261.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('3', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('4', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('5', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('6', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('7', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('8', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);
INSERT INTO `cmswing_customer` VALUES ('9', null, null, null, null, null, null, null, '1', null, '0', '0', null, null, '0.00', null, null);

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
  `group_id` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '所属分组',
  `description` char(200) NOT NULL COMMENT '描述',
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
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态0禁用，1启用，-1删除',
  `pics` varchar(255) NOT NULL DEFAULT '' COMMENT '多图上传',
  `price` varchar(255) NOT NULL DEFAULT '' COMMENT '价格',
  PRIMARY KEY (`id`),
  KEY `idx_category_status` (`category_id`,`status`) USING BTREE,
  KEY `idx_status_type_pid` (`status`,`uid`,`pid`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COMMENT='文档模型基础表';

-- ----------------------------
-- Records of cmswing_document
-- ----------------------------
INSERT INTO `cmswing_document` VALUES ('1', '1', 'cmswing', 'CmsWing1.0测试版发布', '2', '0', '期待已久的最新版发布', '0', '0', '2', '2', '0', '0', '84', '1', '1970', '0', '8', '0', '0', '0', '0', '1457521000744', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('3', '1', '', '6546456', '39', '0', '465464', '0', '0', '3', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1450510498', '1450510498', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('2', '1', '', '46456456', '2', '0', '456546546', '0', '0', '2', '2', '0', '0', '152', '1', '1970', '0', '0', '0', '0', '0', '1450980000', '1457519910793', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('4', '1', '', 'gfdgd', '2', '0', '', '0', '0', '2', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452670981', '1452670981', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('55', '1', '', '简介', '47', '0', 'CmsWing是一个开源的内容管理框架，基于最新的ThinkJs开发，提供更方便、更安全的WEB应用开发体验，采用了全新的架构设计和命名空间机制，融合了模块化、驱动化和插件化的设计理念于一体，开启了国内nodejs WEB应用傻瓜式开发的新潮流。', '0', '0', '2', '1', '0', '0', '0', '1', '0', '0', '3', '0', '0', '0', '1453711202518', '1453711202518', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('56', '1', 'install', '安装', '47', '0', 'ThinkJS 是一款 Node.js 的 MVC 框架，所以安装 ThinkJS 之前，需要先安装 Node.js 环境，可以去 官方 下载最新的安装包进行安装，也可以通过其他一些渠道安装。\r\n\r\n安装完成后，在命令行执行 node -v，如果能看到对应的版本号输出，则表示安装', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '17', '0', '0', '0', '1453777763757', '1453777763757', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('57', '1', '', '法大师傅大师傅山风都是', '47', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '1970', '0', '5', '0', '0', '0', '2016', '1453789112170', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('10', '1', '', '2222222222222222', '2', '0', '2222222222222222222222222222222222222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('11', '1', '', '111111111111111111', '2', '0', '2222222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('12', '1', '', '222222222222222222222', '2', '0', '22222222222222222222222', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('13', '1', '', '222222222222222222222222221111111111111', '2', '0', '21212', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('14', '1', '', '666666666', '2', '0', '666666666', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('15', '1', '', '66666666611', '2', '0', '66666666611', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('16', '1', '', '6666666661133', '2', '0', '6666666661133333333333', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('17', '1', '', '245546456546', '2', '0', '456546', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('18', '1', '', '3123123', '2', '0', '132213', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('19', '1', '', '456546', '2', '0', '546546', '0', '4', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '2016', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('20', '1', '', '456546456', '2', '0', '546', '0', '0', '2', '2', '0', '0', '86', '1', '1970', '0', '0', '0', '0', '0', '1970', '1456307199726', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('21', '1', '', '8888888888', '39', '0', '45654', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452687667869', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('22', '1', '', '9999999999', '39', '0', '', '0', '0', '2', '2', '0', '0', '155', '1', '1970', '0', '0', '0', '0', '0', '1452687660000', '1457519949985', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('23', '1', '', '77777777', '39', '0', '7777777777777', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452687916935', '0', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('24', '1', '', '6666666', '39', '0', '6666666666', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452688032174', '1452688032174', '0', '', '0');
INSERT INTO `cmswing_document` VALUES ('25', '1', '', '5654', '39', '0', '6546', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452689847691', '1452689847691', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('26', '1', '', '555555', '2', '0', '555555555', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452689894271', '1452689894271', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('27', '1', '', '似的大师傅但是f\'d\'s', '2', '0', ' f第三方打撒放', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452689920378', '1452689920378', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('28', '1', '', '犯得上发射点f都是富士达', '2', '0', '都是放大撒冯绍峰是', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1441717080000', '1452689967653', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('29', '1', '', '333333', '40', '0', '', '0', '0', '44', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452690238124', '1452690238124', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('30', '1', '', '555555555', '2', '0', '5555555', '0', '0', '2', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452690518649', '1452690518649', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('31', '1', '', '546456', '2', '0', '', '0', '30', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452690572967', '1452690572967', '2', '', '0');
INSERT INTO `cmswing_document` VALUES ('32', '1', '', 'fdgfdsg', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452761583069', '1452761583069', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('33', '1', '', '563546456', '39', '0', '', '0', '0', '2', '2', '0', '0', '154', '1', '1970', '0', '0', '0', '0', '0', '1452761880000', '1457519937334', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('34', '1', '', '', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452762563599', '1452762563599', '-1', '', '0');
INSERT INTO `cmswing_document` VALUES ('35', '1', '', '', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452764041381', '1452764041381', '-1', '', '0');
INSERT INTO `cmswing_document` VALUES ('36', '1', '', 'gfdsg gfds gds', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452764244127', '1452764244127', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('37', '1', '', '11111111', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452766628568', '1452766628568', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('38', '1', '', '房贷', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452766677479', '1452766677479', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('39', '1', '', '法大师傅士大夫的萨芬', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '1970', '0', '0', '0', '0', '0', '1452766860000', '1457701077200', '1', '', '0');
INSERT INTO `cmswing_document` VALUES ('40', '1', '', '上范德萨范德萨范德萨啊法大师傅士大夫大师傅顺丰速递放大撒放大撒放大撒山风放大撒分身都是分身富士达富士达放大撒', '39', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1452767005593', '1452767005593', '-1', '', '0');
INSERT INTO `cmswing_document` VALUES ('41', '1', 'asda', '的撒旦撒旦撒打算hfghggfhgfhgfhgf', '39', '0', 'hgfhfgh', '0', '0', '2', '2', '0', '0', '0', '1', '1970', '0', '0', '0', '0', '0', '1970', '1452772003048', '-1', '', '0');
INSERT INTO `cmswing_document` VALUES ('68', '1', '', '测试商品多个商品图', '57', '0', '111111111111', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '18', '0', '0', '0', '1456467172623', '1456467172623', '1', '109,110,111,112,113,114,115,116,117,118,119,120,121,122', '{\"present_price\":\"100\",\"discount_price\":\"150\"}');
INSERT INTO `cmswing_document` VALUES ('69', '1', '', '测试商品多个规格相同价格', '57', '0', '111111111111', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '79', '0', '0', '0', '1456467332547', '1456467402367', '1', '123,124', '{\"present_price\":\"167\",\"discount_price\":\"180\"}');
INSERT INTO `cmswing_document` VALUES ('70', '1', '', '测试商品多规格多价格', '57', '0', '111111111111111111111', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '357', '0', '0', '0', '1456468367173', '1456569698580', '1', '125,126', '{\"present_price\":\"50-200\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('67', '1', '', '测试商品没有库存', '57', '0', '放大是放大撒放大撒放大撒放大撒', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '35', '0', '0', '0', '1456460661557', '1456460661557', '1', '107,108', '{\"present_price\":\"999\",\"discount_price\":\"1500\"}');
INSERT INTO `cmswing_document` VALUES ('54', '1', 'fdsf', 'sdfds', '42', '0', 'fdsf', '0', '0', '2', '2', '0', '0', '34', '1', '1970', '0', '0', '0', '0', '0', '2016', '1453703628809', '1', '', '');
INSERT INTO `cmswing_document` VALUES ('58', '1', '', 'gfdgfdgfdgdfgdfg', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1455708692570', '1456305969296', '1', '72,73,74', '{\"present_price\":8,\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('59', '1', '', 'hgfhhgfhgfhfghfghfghfgfdgdfg', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1456203072311', '1456305816537', '1', '79,80', '{\"present_price\":100,\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('60', '1', '', 'fdsfsdf5555', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1456203178151', '1456305771036', '1', '81', '{\"present_price\":100,\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('61', '1', '', 'gfdgdf', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1456215551669', '1456304825972', '1', '82', '{\"present_price\":\"10-101\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('62', '1', '', '测试唱片', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '1', '0', '0', '0', '1456236857429', '1456305874738', '1', '75,76', '{\"present_price\":100,\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('63', '1', '', '犯得上发生', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1456388778234', '1456388778234', '1', '81', '{\"present_price\":\"12-23\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('64', '1', '', '2222', '45', '0', '', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1456390496719', '1456390496719', '1', '87', '{\"present_price\":\"10-20\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('65', '1', '', '测试商品的价格长度', '57', '0', '这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '68', '0', '0', '0', '1457777821723', '1457777821674', '1', '88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105', '{\"present_price\":\"99999-999991\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('66', '1', '', '测试商品的长度测试商品的长度测试商品的长度测试商品的长度测试商品的长度', '57', '0', '法大师傅大师傅放的说法都是放到富士达电风扇放到', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '43', '0', '0', '0', '1456459666532', '1456459682701', '1', '106', '{\"present_price\":\"100\",\"discount_price\":\"120\"}');
INSERT INTO `cmswing_document` VALUES ('79', '1', 'css', 'css文档测试', '2', '0', 'css文档测试', '0', '0', '2', '2', '0', '0', '158', '1', '0', '0', '1', '0', '0', '0', '1457699194187', '1457699194187', '1', '', '');
INSERT INTO `cmswing_document` VALUES ('72', '1', '', '654645', '44', '0', '65464', '0', '0', '2', '2', '0', '0', '153', '1', '1970', '0', '0', '0', '0', '0', '1457511120000', '1457519920848', '1', '', '');
INSERT INTO `cmswing_document` VALUES ('73', '1', '', '美的董事长回应董明珠：怎么能说我们是骗子', '2', '0', '美的董事长回应董明珠：怎么能说我们是骗子美的董事长回应董明珠：怎么能说我们是骗子美的董事长回应董明珠：怎么能说我们是骗子美的董事长回应董明珠：怎么能说我们是骗子美的董事长回应董明珠：怎么能说我们是骗子美的董事长回应董明珠：怎么能说我们是骗子美的董事长回应董明珠：怎么能说我们是骗子', '0', '0', '2', '2', '0', '0', '146', '1', '0', '0', '1', '0', '0', '0', '1457511248923', '1457511248923', '1', '', '');
INSERT INTO `cmswing_document` VALUES ('74', '1', '', '654645', '58', '0', '654645', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1457614851546', '1457614851540', '2', '157', '{\"present_price\":\"100\",\"discount_price\":\"80\"}');
INSERT INTO `cmswing_document` VALUES ('75', '1', '', 'fdsfdsfsd', '2', '0', '', '0', '0', '2', '2', '0', '0', '0', '1', '1970', '0', '0', '0', '0', '0', '1457512080000', '1457512826072', '-1', '', '');
INSERT INTO `cmswing_document` VALUES ('76', '1', '', '46546546', '2', '0', '', '0', '0', '2', '2', '0', '0', '147', '1', '0', '0', '0', '0', '0', '0', '1457512861815', '1457512861815', '-1', '', '');
INSERT INTO `cmswing_document` VALUES ('77', '1', '', '终于来了 亚马逊招开发经理打造VR平台', '2', '0', '今年作为VR的第三个元年，与VR相关的厂商不仅在CES上抢尽风头，还在WMC上引爆关注。而作为电商巨头的亚马逊似乎也想在这个拥有巨大前景的领域中分得一杯羹。', '0', '0', '2', '2', '0', '0', '148', '1', '0', '0', '0', '0', '0', '0', '1457512950753', '1457512950753', '1', '', '');
INSERT INTO `cmswing_document` VALUES ('78', '1', '', '混合模型商品测试', '2', '0', '混合模型商品测试混合模型商品测试混合模型商品测试混合模型商品测试', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1457514112429', '1457514112426', '1', '150,151', '{\"present_price\":\"100\",\"discount_price\":\"80\"}');
INSERT INTO `cmswing_document` VALUES ('80', '1', '', '测试商品重量包邮', '55', '0', '测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1457780474141', '1457780474141', '1', '159,160,161,162,163,164', '{\"present_price\":\"100-150\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('81', '1', '', '测试商品重量包邮', '57', '0', '测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '91', '0', '0', '0', '1458281080520', '1458281080515', '1', '165,166,167,168,169,170', '{\"present_price\":\"100\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('82', '1', '', '4635464564', '44', '0', '6546546', '0', '0', '2', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1458394550498', '1458394550498', '-1', '', '');
INSERT INTO `cmswing_document` VALUES ('83', '1', '', 'fdsfdsf', '44', '0', 'fdsfadsafads', '0', '0', '2', '2', '0', '0', '176', '1', '0', '0', '0', '0', '0', '0', '1458395976686', '1458395976686', '-1', '', '');
INSERT INTO `cmswing_document` VALUES ('84', '1', '', '在线支付测试测试', '57', '0', '在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '24', '0', '0', '0', '1458730859521', '1458730859521', '1', '177,178', '{\"present_price\":\"1\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('85', '1', '', '测试商品规格图片1', '57', '0', '测试商品规格图片测试商品规格图片测试商品规格图片', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '43', '0', '0', '0', '1459365534365', '1459365534363', '1', '183,184,185', '{\"present_price\":\"107-109\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('86', '1', '', '单sku商品测试', '57', '0', '单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '9', '0', '0', '0', '1459370757681', '1459370757678', '1', '192', '{\"present_price\":\"80\",\"discount_price\":\"40\"}');
INSERT INTO `cmswing_document` VALUES ('87', '1', '', '系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色', '51', '0', '系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '36', '0', '0', '0', '1459400517632', '1459400517632', '1', '193,194,195,196,197', '{\"present_price\":\"4399-7199\",\"discount_price\":\"0\"}');
INSERT INTO `cmswing_document` VALUES ('88', '1', '', '三星 Galaxy S7（G9300）32G版  移动联通电信4G手机 双卡双待 骁龙820手机', '52', '0', '三星 Galaxy S7（G9300）32G版  移动联通电信4G手机 双卡双待 骁龙820手机三星 Galaxy S7（G9300）32G版  移动联通电信4G手机 双卡双待 骁龙820手机', '0', '0', '4', '2', '0', '0', '0', '1', '0', '0', '7', '0', '0', '0', '1459405078511', '1459405078508', '1', '211,212,213,214,215', '{\"present_price\":\"4888-5688\",\"discount_price\":\"0\"}');

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
INSERT INTO `cmswing_document_article` VALUES ('1', '0', '<p>范德萨范德萨测试1·11111111111111111111111111</p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('4', '0', '<p>gfdgdf<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('7', '0', '<p>111111111111111<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('8', '0', '<p>111111111111111<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('9', '0', '<p>111111111111111<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('10', '0', '<p>222222222222222222222222222222222<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('11', '0', '<p>22222222222222222222222<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('12', '0', '<p>222222222222222222222<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('13', '0', '<p>2121<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('14', '0', '<p>66666666666666666<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('15', '0', '<p>111111111<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('16', '0', '<p>333333333333333<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('17', '0', '<p>6546546<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('18', '0', '<p>3123123<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('19', '0', '<p>546<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('20', '0', '<p>654645<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('21', '0', '<p>654646546<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('22', '0', '<p>999999999999999999<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('23', '0', '<p>77777777777<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('24', '0', '<p>66666666666<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('25', '0', '<p>546<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('26', '0', '<p>55555555555<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('27', '0', '<p>f都是放大撒放大撒富士达是<img alt=\"logo.png\" src=\"/upload/editor/image/20160113/1452689918161817419.png\" title=\"1452689918161817419.png\"/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('28', '0', '<p><img src=\"/upload/editor/image/20160113/1452689943289153964.png\" title=\"1452689943289153964.png\" alt=\"scrawl.png\"/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('30', '0', '<p>555555555555555<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('31', '0', '<p>654654654<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('32', '0', '<p>gfdsgfds<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('33', '0', '<p>6546546<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('34', '0', '', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('35', '0', '', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('36', '0', '<p>gfdsgfds gfdsgdsf<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('37', '0', '<p>gdfdgfdg<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('38', '0', '', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('39', '0', '<p>312321313<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('40', '0', '<p>放大撒富士达富士达<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('41', '0', '<p>打撒打撒打撒fdsfdsfdsfdgfdgsfsdgfdsg<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('54', '0', '<p>fdsfs<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('55', '0', '<p>CmsWing是一个开源的内容管理框架，基于最新的ThinkJs开发，提供更方便、更安全的WEB应用开发体验，采用了全新的架构设计和命名空间机制，融合了模块化、驱动化和插件化的设计理念于一体，开启了国内nodejs WEB应用傻瓜式开发的新潮流。</p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('2', '0', '<p>4654645645</p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('56', '0', '<h3>安装 Node.js</h3><p>ThinkJS 是一款 Node.js 的 MVC 框架，所以安装 ThinkJS 之前，需要先安装 Node.js 环境，可以去 <a href=\"https://nodejs.org/\">官方</a> 下载最新的安装包进行安装，也可以通过其他一些渠道安装。</p><p>安装完成后，在命令行执行 <code>node -v</code>，如果能看到对应的版本号输出，则表示安装成功。</p><p>ThinkJS 需要 Node.js 的版本 <code>&gt;=0.12.0</code>，如果版本小于这个版本，需要升级 Node.js，否则无法启动服务。建议将 Node.js 版本升级到 <code>4.2.1</code> 或更高版本。</p><p><br/></p><h3 id=\"toc-36c\">安装 ThinkJS</h3><p>通过下面的命令即可安装 ThinkJS：</p><pre class=\"brush:bash;toolbar:false\">npm&nbsp;install&nbsp;thinkjs@2&nbsp;-g&nbsp;--verbose</pre><p>如果安装很慢的话，可以尝试使用 <a href=\"http://npm.taobao.org/\">taobao</a> 的源进行安装。具体如下：</p><pre class=\"brush:bash;toolbar:false\">npm&nbsp;install&nbsp;thinkjs@2&nbsp;-g&nbsp;--registry=https://registry.npm.taobao.org&nbsp;--verbose</pre><p>安装完成后，可以通过 <code>thinkjs --version</code> 或 <code>thinkjs -V</code> 命令查看安装的版本。</p><p><code>注</code>：如果之前安装过 ThinkJS 1.x 的版本，可能需要将之前的版本删除掉，可以通过 <code>npm uninstall -g thinkjs-cmd</code> 命令删除。</p><p><br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('57', '0', '<h3>放大萨法第三方打撒</h3><pre class=\"brush:css;toolbar:false\">html&nbsp;{\r\n&nbsp;&nbsp;background-color:&nbsp;#f2f4f8;\r\n&nbsp;&nbsp;overflow-x:&nbsp;hidden;\r\n}\r\nbody&nbsp;{\r\n&nbsp;&nbsp;font-family:&nbsp;&quot;Source&nbsp;Sans&nbsp;Pro&quot;,&nbsp;&quot;Helvetica&nbsp;Neue&quot;,&nbsp;Helvetica,&nbsp;Arial,&nbsp;sans-serif;\r\n&nbsp;&nbsp;font-size:&nbsp;14px;\r\n&nbsp;&nbsp;color:&nbsp;#788188;\r\n&nbsp;&nbsp;background-color:&nbsp;transparent;\r\n&nbsp;&nbsp;-webkit-font-smoothing:&nbsp;antialiased;\r\n&nbsp;&nbsp;line-height:&nbsp;1.40;\r\n}\r\n.h1,\r\n.h2,\r\n.h3,\r\n.h4,\r\n.h5,\r\n.h6&nbsp;{\r\n&nbsp;&nbsp;margin:&nbsp;0;\r\n}\r\na&nbsp;{\r\n&nbsp;&nbsp;color:&nbsp;#545a5f;\r\n&nbsp;&nbsp;text-decoration:&nbsp;none;\r\n}\r\na:hover,\r\na:focus&nbsp;{\r\n&nbsp;&nbsp;color:&nbsp;#303437;\r\n&nbsp;&nbsp;text-decoration:&nbsp;none;\r\n}\r\nlabel&nbsp;{\r\n&nbsp;&nbsp;font-weight:&nbsp;normal;\r\n}</pre><table><tbody><tr class=\"firstRow\"><td valign=\"top\" width=\"95\">1<br/></td><td valign=\"top\" width=\"95\">2<br/></td><td valign=\"top\" width=\"95\">2<br/></td><td valign=\"top\" width=\"95\">3<br/></td><td valign=\"top\" width=\"95\">1<br/></td><td valign=\"top\" width=\"95\">1<br/></td><td valign=\"top\" width=\"95\">1<br/></td><td valign=\"top\" width=\"95\">1<br/></td><td valign=\"top\" width=\"95\">1<br/></td></tr><tr><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td></tr><tr><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td></tr><tr><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td></tr><tr><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td></tr><tr><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td><td valign=\"top\" width=\"95\"><br/></td></tr></tbody></table><p><br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('75', '0', '<p>fdsfsdffdsfs112131gfdgfd<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('76', '0', '<p class=\"f_center\"><img alt=\"美的董事长回应董明珠：怎么能说我们是骗子\" src=\"/upload/editor/image/catcher/20160309/1457512855899406264.jpg\"/><br/></p><p>文_本刊记者 黄燕 （公众号：诸葛阿瞒）</p><p>一贯“打不还手，骂不还口”的波哥终于憋不住了。3月8日，<a href=\"http://tech.163.com/company/midea/\">美的</a>集团董事长方洪波在上海现身美的经销商大会，开始还拒绝上台的波哥一上去滔滔不绝半小时，还是一贯的脱稿演讲。一篇干货满满的讲话最后“迫不得已”提到了<a href=\"http://tech.163.com/company/gree/\">格力</a>，实在是“无数次被碰瓷“，方洪波忍无可忍了。</p><p>以下是方洪波讲话原文，已经方洪波本人审阅。对格力的攻击，方洪波的原话是这么说的：</p><p>”去年年底春节前，格力员工举报我们，说我们学术造假，我们无奈被迫也举报格力、反击，我们也发了声明。不到迫不得已我们不会发声。</p><p>现在我讲了，国家科技进步二等奖这件事，在获奖之前已经被多次举报，进行了多次评测，最后还是获奖了。我们持开放态度，欢迎国家任何机构、全世界任何机构来进行论证，我们不惧怕，关于这件事这是第一。</p><p>第二点，多年来格力在各种场合对我们进行指责和攻击，我们没有发声，低调、隐忍。</p><p>我\r\n在这里讲，美的1968年创业，到今天快50年时间，在市场经济、改革开放大风大雨中自生自灭，发展壮大到今天，成为中国家电行业收入最高的企业，这么多\r\n品类、这么多产品进入千家万户，2015年美的交税108亿，盈利100多亿，向全世界200多个国家出口，2015年出口80多亿美金，我们的产品为全\r\n世界服务，怎么能说我们是骗子？我们欺骗了谁？</p><p>我们的内心并不会因此而气愤。我可以认真的讲，这样的指责只会使我们更加坚强、自信。好比一棵树，不断的受伤、皮刮掉了，长出来虽然有节疤，但是这棵树更加粗壮，更加经风历雨。</p><p>为什么自信？你不断指责我，说明我比你强大，否则你指责我干什么？你攻击我干什么？你的指责只会让我们更加自信。</p><p>看任何一个企业的发展十几年，看谁能够成为时间的朋友，时间是十年、三十年、五十年，谁到最后谁才是时间的朋友，谁就是胜利。你跟时间成为一年的朋友，那不是一个基业常青的企业。时间到了，高下立见，谁高谁低自然会分得清清楚楚。”</p><p>3月6日，方洪波发了一条意味深长的朋友圈：“奔驰公司祝贺宝马100岁生日，左下角德文的意思是：感谢100年来的竞争，没有你的那三十年其实感觉很无聊。向竞争者致敬，伟大企业应有之胸怀！”</p><p><strong>以下是方洪波这次讲话的原文</strong></p><p>“现在家电产业竞争环境不太好，为什么？牛鬼蛇神太多。</p><p>我在各种场合多次讲过，中国家电业过去30年发展的旧时代已经结束，旧模式已经失效。大规模制造、大规模分销，靠人口红利和廉价劳动力的低成本优势获得增长，大规模传播，靠广告炒概念销售。</p><p>家电业的现状是，各个品类严重过剩，工厂开工不足，渠道效益下滑，重新回到价格战，竞争加剧。大家都很焦虑，为什么？因为大家都一样，都在做相同的事情。最近有些企业对我们的指责就是典型的焦虑症，完全失去了风度、品格甚至人格。</p><p>旧\r\n的时代已经结束，新的时代是什么？不同的企业，不同的人有不同的理解。我们怎么样抓住新时代的机会？我认为整个中国家电业从厂家到供应、上游下游，面临内\r\n外部压力下，进入了重大调整窗口期，将会产生强烈的“马太效应”，就是圣经上说的，拥有者还会拥有更多，失去者连现在有的也要失去，强者更强，弱者会被淘\r\n汰。</p><p>每个人必须要改变，不改变是不行了，大势不能违背，时代变革无法阻挡。</p><p>面对这个重大转折，我们怎么办？怎么抓住重大转折期去改变？大势不能违背，你不能随波逐流，我们必须迎难而上。这种时代变革，行业变革的大势是任何人不能阻挡的，我们必须顺应这个大势去发展。</p><p>怎样抓住这个机会？我先讲一下美的这几年转型的体会。2011年我们开始讲转型，这个过程中做了很多事我不多说，仅举一个例子，2015年下半年中央经济工作会议提出去产能，去库存、去杠杆，我可以告诉大家，这“三去”我们从2011年就开始做了，美的是最早的实践者。</p><p>我们最早去产能，这几年我们关了多少工厂？全国各地，美的已经退回了6000亩土地，过去几年我们没有新增一家工厂、一条生产线，未来三年也不会新增一个基地，这就是去产能。</p><p>去库存，由于历史原因，我们分轻重缓急。现在去库存最慢的是家用空调，由于历史上形成了严重的渠道泡沫，过去几年渠道积压的泡沫太大。但是我们现在去库存的决心也很坚定，2015年第四季度我们基本上压住工厂没怎么出货，各地销售公司都没怎么出货，强制性渠道去库存。</p><p>家用空调之外其他产品去库存力度很大，比如说洗衣机，2015年收入盈利双增长，但是库存是历史最低水平，比以前卖50个亿的库存都还低。其他的产品都在去库存，我们比较早的去做。</p><p>去杠杆，以前美的集团资产负债率最高的时候也有70%、80%，现在60%，我们的有息负债非常少，就是一些商业票据。我们的现金流非常好，自有资金700多亿，资产结构非常好，总资产1400多亿，其中现金就800多亿，流动性非常好。</p><p>现在国家讲供给侧改革，同样我们也是最早的实践者。供给侧改革从经济学上是总需求和总供给平衡。过去三个增长动力，出口、投资、内需，现在失效了。过去有需求，行业有增长就能解决问题，出口也是，现在不行了。我们比较早进行了转型。</p><p>供给侧的改革从宏观经济上讲，第一个是解决劳动力供给，对工厂来讲就是要提高劳动力素质，提高劳动者的技术水平，培养更多产业工人。所以我们这几年工人人数下降。</p><p>第二个是全要素生产率，同样生产一件产品原来要100元，现在人、财、物生产力的提高，我只要80元，效率提高了，企业盈利多了，工人收入多了，企业就有钱投入到新的生产中。全要素生产率的提高，这是美的过去四年做的最核心的事情。</p><p>”\r\n三去“我们是最早的实践者。供给侧改革，我们也是实践得比较早，就是向市场提供更高附加值，更有竞争力的产品，而不是以前低附加值、搞价格战的产品。大家\r\n看前面发布的这些产品，我举了美的转型例子，过去几年给我们的教训。我们提前四年进行了改革实践，那么多事情，需要大量投入。</p><p>我们现在站在一个新的起点上，美的这些年构建了好的团队，刚才上台的六位总经理，共同的特点是年富力强，跟着美的一起成长，并且他们个人的利益和美的利益是绑在一起的，在一个战壕里。所以美的形成了一个核心团队，这个团队也是家电业最有竞争力的。</p><p>那么问题来了，包括我在内，我们核心团队站在一个新的起点上，我们必须要回答一个问题，美的2025年要成为一个什么样的企业？这是我们必须要交出的第一张答卷。</p><p>作为我个人，我真的不是在那里哗众取宠，像某些人那样虚张声势，我是发自内心，带着高度责任感带领美的团队去经营企业。我不为钱、不为名、不为利，我相信我们所有核心团队成员都是这样。</p><p>所以我们必须要交出这张答卷，这张答卷是什么？我不多讲，我们会慢慢务实、扎实、稳健、低调地去推进美的的变革。</p><p>万变不离其宗，第一句话，我们必须要解决如何做到不同？美的怎样和其他家电企业不同？不能相同，相同就会焦虑。我们必须要靠美的的独特性来驱动美的未来发展，这是我们必须要找到的。</p><p>面对新的行业变革格局，我们能做到就是勇于下注，看准了就下注。包括智慧家居系统，一年投好几个亿，现在智能家居工程师有500人，和产品没关系，就是搞智能家居。包括我们做<a href=\"http://tech.163.com/company/smartphone/\">智能机</a>器人也是。</p><p>另外就是重新想象，我们所有的商业模式、经营方法、管理体制要重新想象，把过去的都否定。对我们在座的渠道商都也是这样，必须要改变我们的经营模式。</p><p>我们要布局未来，用独特性驱动美的发展。</p><p>勇于下注，重新想象，布局未来。这是包括我在内的管理层必须要回答的答卷。这是我讲的第二点。</p><p>第三点，我想说一下渠道，这是我们美的生存发展的基石。中国市场靠你们，海外市场靠中国，你们是我们的基石。围绕这个链条我们现在能做的，我把它归纳一下：</p><p>第一个，产品领先，各个品类厚积薄发，加大对基础的投入。美的现在40个研发基地，2015年盈利100多亿，这是税后净利。我们有资源、有钱去投，我们没有投到工厂、产能，就要投到研发上，确保产品品质。</p><p>大家已经看到了美的品质的进步，我也可以给产品背书，美的空调的品质行业领先，不输给任何一个厂家。现在我们在做精品系列、高端系列，在这个基础上我们要做产品的差异化。</p><p>第\r\n二个，渠道效率，我们一定要解决渠道效率，把过去的大规模压货、大规模分销，层层压货坚决改掉。美的推动渠道变革的决心毫无动摇，坚定推动下去，我们要通\r\n过精益管理，&quot;T+3 &quot;,一致性物流，把过去多年积累的渠道泡沫慢慢消化掉。所以洗衣机的“T+3”模式，我们必须坚决的无条件的复制到所有产品上。</p><p>以\r\n前卖一台冰箱物流搬动平均6.4次，从工厂出来要搬6次，现在减少到了3次，这就是渠道效率。在座各位都要提高效率，你以前开个店几百平米，你到香港、日\r\n本去看看，人家的店多么紧凑，寸土寸金。香港一个小餐馆，点菜、开票、上菜就一个人，这就是效率。所以我们现在不要看劳动力成本上升，一定要抓人财物效率\r\n的提升。</p><p>第三，用户中心。一定要抓服务的一致性，标准性。我们现在要求多少公里范围内24小时解决用户的维修问题。</p><p><br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('77', '0', '<p class=\"f_center\"><img alt=\"终于来了，亚马逊招开发经理打造VR平台\" src=\"/upload/editor/image/catcher/20160309/1457512925679874477.jpg\" style=\"border: medium none; max-width: 100%; height: auto;\"/></p><p>via：engadget</p><p>今年作为VR的第三个元年，与VR相关的厂商不仅在CES上抢尽风头，还在WMC上引爆关注。而作为电商巨头的<a href=\"http://tech.163.com/company/amazon/\">亚马逊</a>似乎也想在这个拥有巨大前景的领域中分得一杯羹。</p><p>根据外媒的报道，亚马逊发布招聘广告，寻找一名高级软件开发经理，负责带领团队在其视频平台<a href=\"http://tech.163.com/company/amazon/\">Amazon</a> Video内打造一个VR平台。根据招聘广告的描述，亚马逊希望“探索以及创造一个身临其境的叙事平台，包括一个VR拍摄及播放平台”。</p><p>通过描述我们可以看到，亚马逊的野心不止于一个VR视频观看平台，而是一个类似YouTube的内容分发平台。虽说，像亚马逊这样的巨头进入VR是一件早晚的事情，不过它具体要扮演怎样的角色，暂时还不好下结论。</p><p>不过，需要一提的是，亚马逊在硬件这块的跟进总是比较迅速的，无论是快递无人机、半导体、机器人，</p><p>还是AR眼镜……</p><p><br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('79', '0', '<pre class=\"brush:css;toolbar:false\">#uploader&nbsp;.filelist::after&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;clear:&nbsp;both;\r\n&nbsp;&nbsp;&nbsp;&nbsp;content:&nbsp;&quot;&quot;;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;block;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;0;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;rgba(0,&nbsp;0,&nbsp;0,&nbsp;0)&nbsp;url(&quot;../img/bg.png&quot;)&nbsp;no-repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline;\r\n&nbsp;&nbsp;&nbsp;&nbsp;float:&nbsp;left;\r\n&nbsp;&nbsp;&nbsp;&nbsp;font-size:&nbsp;12px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;110px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;margin:&nbsp;0&nbsp;8px&nbsp;20px&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;relative;\r\n&nbsp;&nbsp;&nbsp;&nbsp;text-align:&nbsp;center;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;110px;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;p.log&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;relative;\r\n&nbsp;&nbsp;&nbsp;&nbsp;top:&nbsp;-45px;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;p.title&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;left:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;text-align:&nbsp;left;\r\n&nbsp;&nbsp;&nbsp;&nbsp;text-indent:&nbsp;5px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;text-overflow:&nbsp;ellipsis;\r\n&nbsp;&nbsp;&nbsp;&nbsp;top:&nbsp;5px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;white-space:&nbsp;nowrap;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;p.progress&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;rgba(0,&nbsp;0,&nbsp;0,&nbsp;0)&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;border-radius:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;bottom:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;8px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;left:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;margin:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;\r\n&nbsp;&nbsp;&nbsp;&nbsp;z-index:&nbsp;50;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;p.progress&nbsp;span&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;animation:&nbsp;2s&nbsp;linear&nbsp;0s&nbsp;normal&nbsp;none&nbsp;infinite&nbsp;running&nbsp;progressmove;\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#1483d8&nbsp;url(&quot;../img/progress.png&quot;)&nbsp;repeat-x&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;none;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;100%;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;transition:&nbsp;width&nbsp;200ms&nbsp;linear&nbsp;0s;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;0;\r\n}\r\n@keyframes&nbsp;progressmove&nbsp;{\r\n0%&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;0&nbsp;0;\r\n}\r\n100%&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;17px&nbsp;0;\r\n}\r\n}\r\n@keyframes&nbsp;progressmove&nbsp;{\r\n0%&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;0&nbsp;0;\r\n}\r\n100%&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;17px&nbsp;0;\r\n}\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;p.imgWrap&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;110px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;line-height:&nbsp;110px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;relative;\r\n&nbsp;&nbsp;&nbsp;&nbsp;transform-origin:&nbsp;50%&nbsp;50%&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;transition:&nbsp;all&nbsp;200ms&nbsp;ease-out&nbsp;0s;\r\n&nbsp;&nbsp;&nbsp;&nbsp;vertical-align:&nbsp;middle;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;110px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;z-index:&nbsp;2;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;img&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;p.error&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#f43838&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;bottom:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;#fff;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;28px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;left:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;line-height:&nbsp;28px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;\r\n&nbsp;&nbsp;&nbsp;&nbsp;z-index:&nbsp;100;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;li&nbsp;.success&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;rgba(0,&nbsp;0,&nbsp;0,&nbsp;0)&nbsp;url(&quot;../img/success.png&quot;)&nbsp;no-repeat&nbsp;scroll&nbsp;right&nbsp;bottom;\r\n&nbsp;&nbsp;&nbsp;&nbsp;bottom:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;block;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;40px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;left:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;\r\n&nbsp;&nbsp;&nbsp;&nbsp;z-index:&nbsp;200;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;rgba(0,&nbsp;0,&nbsp;0,&nbsp;0.5)&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;left:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;top:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;100%;\r\n&nbsp;&nbsp;&nbsp;&nbsp;z-index:&nbsp;300;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;rgba(0,&nbsp;0,&nbsp;0,&nbsp;0)&nbsp;url(&quot;../img/icons.png&quot;)&nbsp;no-repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;cursor:&nbsp;pointer;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline;\r\n&nbsp;&nbsp;&nbsp;&nbsp;float:&nbsp;right;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;24px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;margin:&nbsp;5px&nbsp;1px&nbsp;1px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;overflow:&nbsp;hidden;\r\n&nbsp;&nbsp;&nbsp;&nbsp;text-indent:&nbsp;-9999px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;24px;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span.rotateLeft&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;0&nbsp;-24px;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span.rotateLeft:hover&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;0&nbsp;0;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span.rotateRight&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;-24px&nbsp;-24px;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span.rotateRight:hover&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;-24px&nbsp;0;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span.cancel&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;-48px&nbsp;-24px;\r\n}\r\n#uploader&nbsp;.filelist&nbsp;div.file-panel&nbsp;span.cancel:hover&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background-position:&nbsp;-48px&nbsp;0;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;border-top:&nbsp;1px&nbsp;solid&nbsp;#dadada;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;63px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;line-height:&nbsp;63px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;padding:&nbsp;0&nbsp;20px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;relative;\r\n&nbsp;&nbsp;&nbsp;&nbsp;vertical-align:&nbsp;middle;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.progress&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#fff&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;border:&nbsp;1px&nbsp;solid&nbsp;#1483d8;\r\n&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;#6dbfff;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline-block;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;18px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;line-height:&nbsp;20px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;margin:&nbsp;0&nbsp;10px&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;relative;\r\n&nbsp;&nbsp;&nbsp;&nbsp;text-align:&nbsp;center;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;198px;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.progress&nbsp;span.percentage&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#1483d8&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;100%;\r\n&nbsp;&nbsp;&nbsp;&nbsp;left:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;top:&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;0;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.progress&nbsp;span.text&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;relative;\r\n&nbsp;&nbsp;&nbsp;&nbsp;z-index:&nbsp;10;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.info&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;#666666;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline-block;\r\n&nbsp;&nbsp;&nbsp;&nbsp;font-size:&nbsp;14px;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;line-height:&nbsp;40px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;position:&nbsp;absolute;\r\n&nbsp;&nbsp;&nbsp;&nbsp;right:&nbsp;20px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;top:&nbsp;10px;\r\n}\r\n#filePicker2&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline-block;\r\n&nbsp;&nbsp;&nbsp;&nbsp;float:&nbsp;left;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.webuploader-pick,&nbsp;#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn,&nbsp;#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn.state-uploading,&nbsp;#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn.state-paused&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#ffffff&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;border:&nbsp;1px&nbsp;solid&nbsp;#cfcfcf;\r\n&nbsp;&nbsp;&nbsp;&nbsp;border-radius:&nbsp;3px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;#565656;\r\n&nbsp;&nbsp;&nbsp;&nbsp;cursor:&nbsp;pointer;\r\n&nbsp;&nbsp;&nbsp;&nbsp;display:&nbsp;inline-block;\r\n&nbsp;&nbsp;&nbsp;&nbsp;float:&nbsp;left;\r\n&nbsp;&nbsp;&nbsp;&nbsp;font-size:&nbsp;14px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;margin-left:&nbsp;10px;\r\n&nbsp;&nbsp;&nbsp;&nbsp;padding:&nbsp;0&nbsp;18px;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.webuploader-pick-hover,&nbsp;#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn:hover,&nbsp;#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn.state-uploading:hover,&nbsp;#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn.state-paused:hover&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#f0f0f0&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#00b7ee&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n&nbsp;&nbsp;&nbsp;&nbsp;border-color:&nbsp;transparent;\r\n&nbsp;&nbsp;&nbsp;&nbsp;color:&nbsp;#fff;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn:hover&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;background:&nbsp;#00a2d4&nbsp;none&nbsp;repeat&nbsp;scroll&nbsp;0&nbsp;0;\r\n}\r\n#uploader&nbsp;.statusBar&nbsp;.btns&nbsp;.uploadBtn.disabled&nbsp;{\r\n&nbsp;&nbsp;&nbsp;&nbsp;opacity:&nbsp;0.6;\r\n&nbsp;&nbsp;&nbsp;&nbsp;pointer-events:&nbsp;none;\r\n}\r\n.dropdown-menu-right{\r\n&nbsp;&nbsp;left:&nbsp;auto;\r\n&nbsp;&nbsp;right:&nbsp;0;\r\n}\r\n.text-dep1{\r\n&nbsp;&nbsp;color:&nbsp;#333;\r\n&nbsp;&nbsp;font-size:&nbsp;14px;\r\n}\r\n\r\n.text-dep2{\r\n&nbsp;&nbsp;color:&nbsp;#555;\r\n&nbsp;&nbsp;font-size:&nbsp;13px;\r\n}\r\n.text-dep3{\r\n\r\n&nbsp;&nbsp;font-size:&nbsp;12px;\r\n}</pre><p><br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('82', '0', '<p>546546<br/></p>', '', '0');
INSERT INTO `cmswing_document_article` VALUES ('83', '0', '<p>fdsfadsafdsafdsaf<br/></p>', '', '0');

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
INSERT INTO `cmswing_document_download` VALUES ('3', '0', '456456464', '', '1', '0', '103928');

-- ----------------------------
-- Table structure for cmswing_document_shop
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_document_shop`;
CREATE TABLE `cmswing_document_shop` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `suk` text NOT NULL COMMENT '库存/规格',
  `goods_no` varchar(255) NOT NULL DEFAULT '' COMMENT '商家编码',
  `total_stock` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '总库存',
  `quota` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '每人限购',
  `join_level_discount` varchar(100) NOT NULL DEFAULT '1' COMMENT '会员折扣',
  `invoice` char(10) NOT NULL DEFAULT '0' COMMENT '发票',
  `warranty` char(10) NOT NULL DEFAULT '0' COMMENT '保修',
  `goods_detail` text NOT NULL COMMENT '商品详情',
  `freight` varchar(255) NOT NULL DEFAULT '' COMMENT '设置运费',
  `weight` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '重量(g)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cmswing_document_shop
-- ----------------------------
INSERT INTO `cmswing_document_shop` VALUES ('58', '{\"type\":[\"颜色\"],\"data\":[{\"name\":\"11\",\"type\":\"颜色\",\"sku_price\":\"8\",\"sku_stock\":\"9\",\"sku_code\":\"\"}]}', '', '0', '0', '1', '0', '0', '', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('59', '{\"type\":[\"颜色\"],\"data\":[{\"name\":\"11\",\"type\":\"颜色\",\"sku_price\":\"8\",\"sku_stock\":\"9\",\"sku_code\":\"\"}]}', '', '0', '0', '1', '0', '0', '<p>fsdfdsfsd<br/></p>', '{\"type\":1,\"val\":\"1\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('60', '', '', '10', '0', '1', '0', '0', '<p>5454<br/></p>', '{\"type\":0,\"val\":\"20\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('61', '{\"type\":[\"颜色\",\"颜色\",\"颜色\"],\"data\":[{\"name\":\"2121\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fdsf\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fsdf\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"f s\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"ssss\",\"type\":\"颜色\",\"sku_price\":\"101\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]},{\"name\":\"fds\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fsdf\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"f s\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"ssss\",\"type\":\"颜色\",\"sku_price\":\"101\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]}]},{\"name\":\"sfs\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fdsf\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fsdf\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"f s\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"ssss\",\"type\":\"颜色\",\"sku_price\":\"101\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]},{\"name\":\"fds\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fsdf\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"f s\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"ssss\",\"type\":\"颜色\",\"sku_price\":\"101\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]}]},{\"name\":\"fds\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fdsf\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fsdf\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"f s\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"ssss\",\"type\":\"颜色\",\"sku_price\":\"101\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]},{\"name\":\"fds\",\"type\":\"颜色\",\"ch\":[{\"name\":\"fsdf\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"f s\",\"type\":\"颜色\",\"sku_price\":\"10\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"ssss\",\"type\":\"颜色\",\"sku_price\":\"101\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]}]}]}', '', '1440', '0', '1', '0', '0', '<p>54545454545<br/></p>', '{\"type\":1,\"val\":\"2\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('62', '{\"type\":[\"颜色\",\"颜色\",\"颜色\"],\"data\":[{\"name\":\"11\",\"type\":\"颜色\",\"ch\":[{\"name\":\"222\",\"type\":\"颜色\",\"ch\":[{\"name\":\"333\",\"type\":\"颜色\",\"sku_price\":\"100\",\"sku_stock\":\"222\",\"sku_code\":\"\"}]}]}]}', '', '100', '0', '1', '0', '0', '<p>1111111111<br/></p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('63', '{\"type\":[\"颜色\"],\"data\":[{\"name\":\"aa\",\"type\":\"颜色\",\"ch\":[{\"name\":\"bb\",\"sku_price\":\"12\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]},{\"name\":\"cc\",\"type\":\"颜色\",\"ch\":[{\"name\":\"bb\",\"sku_price\":\"23\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]}]}', '', '0', '0', '1', '0', '0', '<p>1111111111111111<br/></p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('64', '{\"type\":[\"颜色\"],\"data\":[{\"name\":\"111\",\"type\":\"颜色\",\"ch\":[{\"name\":\"222\",\"sku_price\":\"10\",\"sku_stock\":\"12\",\"sku_code\":\"\"}]},{\"name\":\"11\",\"type\":\"颜色\",\"ch\":[{\"name\":\"222\",\"sku_price\":\"20\",\"sku_stock\":\"12\",\"sku_code\":\"\"}]}]}', '', '0', '0', '1', '0', '0', '<p>111<br/></p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('65', '{\"type\":[\"颜色\",\"颜色\"],\"data\":[{\"name\":\"S\",\"type\":\"颜色\",\"ch\":[{\"name\":\"黑色\",\"type\":\"颜色\",\"sku_price\":\"99999\",\"sku_stock\":\"10\",\"sku_code\":\"UY7321987\"},{\"name\":\"红色\",\"type\":\"颜色\",\"sku_price\":\"999991\",\"sku_stock\":\"101\",\"sku_code\":\"UY7321988\"}]},{\"name\":\"M\",\"type\":\"颜色\",\"ch\":[{\"name\":\"黑色\",\"type\":\"颜色\",\"sku_price\":\"99999\",\"sku_stock\":\"10\",\"sku_code\":\"UY7321987\"},{\"name\":\"红色\",\"type\":\"颜色\",\"sku_price\":\"999991\",\"sku_stock\":\"101\",\"sku_code\":\"UY7321988\"}]},{\"name\":\"L\",\"type\":\"颜色\",\"ch\":[{\"name\":\"黑色\",\"type\":\"颜色\",\"sku_price\":\"99999\",\"sku_stock\":\"10\",\"sku_code\":\"UY7321987\"},{\"name\":\"红色\",\"type\":\"颜色\",\"sku_price\":\"999991\",\"sku_stock\":\"101\",\"sku_code\":\"UY7321988\"}]},{\"name\":\"XL\",\"type\":\"颜色\",\"ch\":[{\"name\":\"黑色\",\"type\":\"颜色\",\"sku_price\":\"99999\",\"sku_stock\":\"10\",\"sku_code\":\"UY7321987\"},{\"name\":\"红色\",\"type\":\"颜色\",\"sku_price\":\"999991\",\"sku_stock\":\"101\",\"sku_code\":\"UY7321988\"}]}]}', 'UY7321987 ', '80', '0', '1', '0', '0', '<p>111111111111111111111111111111111111111111111111111111111111111111111111111<br/></p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('66', '', '', '10', '0', '1', '0', '0', '<p>放大撒放大撒放到士大夫但是是放大撒是</p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('67', '', '', '0', '0', '1', '0', '0', '<p>&nbsp;放大撒放大撒放大撒放到电风扇犯得上发射点</p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('68', '', '', '10', '0', '1', '0', '0', '<p>1111222222222222222</p>', '{\"type\":1,\"val\":\"2\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('69', '{\"type\":[\"颜色\",\"颜色\"],\"data\":[{\"name\":\"红色\",\"type\":\"颜色\",\"ch\":[{\"name\":\"S\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"101\",\"sku_code\":\"\"},{\"name\":\"M\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"L\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]},{\"name\":\"黄色\",\"type\":\"颜色\",\"ch\":[{\"name\":\"S\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"M\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"L\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]},{\"name\":\"蓝色\",\"type\":\"颜色\",\"ch\":[{\"name\":\"S\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"M\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"},{\"name\":\"L\",\"type\":\"颜色\",\"sku_price\":\"167\",\"sku_stock\":\"10\",\"sku_code\":\"\"}]}]}', 'UK2545843664', '70', '0', '1', '0', '0', '<p>22222222222222222</p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('70', '{\"type\":[\"颜色\",\"尺码\"],\"data\":[{\"name\":\"紫不溜秋\",\"type\":\"颜色\",\"ch\":[{\"name\":\"肥\",\"type\":\"尺码\",\"sku_price\":\"50\",\"sku_stock\":\"5\",\"sku_code\":\"\"},{\"name\":\"特别肥\",\"type\":\"尺码\",\"sku_price\":\"60\",\"sku_stock\":\"5\",\"sku_code\":\"\"},{\"name\":\"相当肥\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"54\",\"sku_code\":\"\"}]},{\"name\":\"黄了吧唧\",\"type\":\"颜色\",\"ch\":[{\"name\":\"肥\",\"type\":\"尺码\",\"sku_price\":\"55\",\"sku_stock\":\"5\",\"sku_code\":\"\"},{\"name\":\"特别肥\",\"type\":\"尺码\",\"sku_price\":\"90\",\"sku_stock\":\"5\",\"sku_code\":\"\"},{\"name\":\"相当肥\",\"type\":\"尺码\",\"sku_price\":\"200\",\"sku_stock\":\"54\",\"sku_code\":\"\"}]}]}', 'uk888888888', '128', '0', '1', '0', '0', '<p>22222222222222222222222</p>', '{\"type\":0,\"val\":\"10\"}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('74', '', '', '10', '0', '1', '0', '0', '<p>6546546546<br/></p>', '{\"type\":0,\"val\":0}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('78', '', '', '10', '0', '1', '0', '0', '<p>发到我放大是放大撒放大撒放大撒放大撒放大撒<br/></p>', '{\"type\":0,\"val\":0}', '0');
INSERT INTO `cmswing_document_shop` VALUES ('81', '{\"type\":[\"尺寸\",\"尺码\",\"尺码\"],\"data\":[{\"name\":\"鬼地方\",\"type\":\"尺寸\",\"ch\":[{\"name\":\"mm\",\"type\":\"尺码\",\"ch\":[{\"name\":\"895\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":79,\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"9856\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"8541\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]},{\"name\":\"tt\",\"type\":\"尺码\",\"ch\":[{\"name\":\"895\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"9856\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":66,\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"8541\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":79,\"sku_weight\":\"1000\",\"sku_code\":\"\"}]}]},{\"name\":\"dsdf\",\"type\":\"尺寸\",\"ch\":[{\"name\":\"mm\",\"type\":\"尺码\",\"ch\":[{\"name\":\"895\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"9856\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"8541\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]},{\"name\":\"tt\",\"type\":\"尺码\",\"ch\":[{\"name\":\"895\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"9856\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"8541\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]}]},{\"name\":\"fdsf\",\"type\":\"尺寸\",\"ch\":[{\"name\":\"mm\",\"type\":\"尺码\",\"ch\":[{\"name\":\"895\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"9856\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"8541\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]},{\"name\":\"tt\",\"type\":\"尺码\",\"ch\":[{\"name\":\"895\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"9856\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"8541\",\"type\":\"尺码\",\"sku_price\":\"100\",\"sku_stock\":\"90\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]}]}]}', '', '992', '0', '1', '0', '0', '<p>测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮测试商品重量包邮</p>', '', '0');
INSERT INTO `cmswing_document_shop` VALUES ('84', '{\"type\":[\"颜色\",\"尺寸\"],\"data\":[{\"name\":\"红\",\"type\":\"颜色\",\"ch\":[{\"name\":\"x\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]},{\"name\":\"黑\",\"type\":\"颜色\",\"ch\":[{\"name\":\"x\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]},{\"name\":\"白\",\"type\":\"颜色\",\"ch\":[{\"name\":\"x\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"1\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"\"}]}]}', '146456456', '90', '0', '1', '0', '0', '<p>在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试在线支付测试测试</p>', '', '0');
INSERT INTO `cmswing_document_shop` VALUES ('85', '{\"type\":[\"颜色\",\"尺寸\"],\"data\":[{\"name\":\"红色\",\"type\":\"颜色\",\"pic\":\"186\",\"ch\":[{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"107\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"xczczcz\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"108\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"dsadad\"},{\"name\":\"mm\",\"type\":\"尺寸\",\"sku_price\":\"109\",\"sku_stock\":12,\"sku_weight\":\"1000\",\"sku_code\":\"dasdasd\"}]},{\"name\":\"黄色\",\"type\":\"颜色\",\"pic\":\"187\",\"ch\":[{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"107\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"xczczcz\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"108\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"dsadad\"},{\"name\":\"mm\",\"type\":\"尺寸\",\"sku_price\":\"109\",\"sku_stock\":11,\"sku_weight\":\"1000\",\"sku_code\":\"dasdasd\"}]},{\"name\":\"绿色\",\"type\":\"颜色\",\"pic\":\"188\",\"ch\":[{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"107\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"xczczcz\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"108\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"dsadad\"},{\"name\":\"mm\",\"type\":\"尺寸\",\"sku_price\":\"109\",\"sku_stock\":11,\"sku_weight\":\"1000\",\"sku_code\":\"dasdasd\"}]},{\"name\":\"fdsf\",\"type\":\"颜色\",\"pic\":\"191\",\"ch\":[{\"name\":\"xl\",\"type\":\"尺寸\",\"sku_price\":\"109\",\"sku_stock\":\"10\",\"sku_weight\":\"1000\",\"sku_code\":\"dasdasd\"},{\"name\":\"m\",\"type\":\"尺寸\",\"sku_price\":\"109\",\"sku_stock\":9,\"sku_weight\":\"1000\",\"sku_code\":\"dasdasd\"},{\"name\":\"mm\",\"type\":\"尺寸\",\"sku_price\":\"109\",\"sku_stock\":11,\"sku_weight\":\"1000\",\"sku_code\":\"dasdasd\"}]}],\"is_pic\":\"1\"}', 'wewewqeq', '129', '0', '1', '0', '0', '<p>测试商品规格图片测试商品规格图片测试商品规格图片</p>', '', '0');
INSERT INTO `cmswing_document_shop` VALUES ('86', '', '', '16', '0', '1', '0', '0', '<p>单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试单sku商品测试</p>', '', '500');
INSERT INTO `cmswing_document_shop` VALUES ('87', '{\"type\":[\"选择版本\"],\"data\":[{\"name\":\"[推荐]18-140&35 1.8G（人像）\",\"type\":\"选择版本\",\"sku_price\":\"7199\",\"sku_stock\":6,\"sku_weight\":\"500\",\"sku_code\":\"\"},{\"name\":\"机身\",\"type\":\"选择版本\",\"sku_price\":\"4399\",\"sku_stock\":\"10\",\"sku_weight\":\"500\",\"sku_code\":\"\"},{\"name\":\"18-105\",\"type\":\"选择版本\",\"sku_price\":\"5899\",\"sku_stock\":\"10\",\"sku_weight\":\"500\",\"sku_code\":\"\"},{\"name\":\"50 1.8D\",\"type\":\"选择版本\",\"sku_price\":\"5128\",\"sku_stock\":9,\"sku_weight\":\"500\",\"sku_code\":\"\"}],\"is_pic\":0}', 'a123456', '36', '0', '1', '0', '0', '<p><span style=\"color: rgb(255, 0, 0);\"><strong>系统测试，不要真实付款哦！</strong></span></p><p><img alt=\"56e8fd3bNf826625a.jpg\" src=\"/upload/editor/image/20160331/1459400259784027210.jpg\" title=\"1459400259784027210.jpg\"/></p>', '', '0');
INSERT INTO `cmswing_document_shop` VALUES ('88', '{\"type\":[\"选择颜色\",\"选择版本\"],\"data\":[{\"name\":\"铂光金\",\"type\":\"选择颜色\",\"pic\":\"207\",\"ch\":[{\"name\":\"S7全网通\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":9,\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7移动定制4G\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7edge全网通\",\"type\":\"选择版本\",\"sku_price\":\"5688\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"}]},{\"name\":\"雪晶白\",\"type\":\"选择颜色\",\"pic\":\"208\",\"ch\":[{\"name\":\"S7全网通\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7移动定制4G\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":9,\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7edge全网通\",\"type\":\"选择版本\",\"sku_price\":\"5688\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"}]},{\"name\":\"钛泽银\",\"type\":\"选择颜色\",\"pic\":\"209\",\"ch\":[{\"name\":\"S7全网通\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7移动定制4G\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7edge全网通\",\"type\":\"选择版本\",\"sku_price\":\"5688\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"}]},{\"name\":\"星钻黑\",\"type\":\"选择颜色\",\"pic\":\"210\",\"ch\":[{\"name\":\"S7全网通\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7移动定制4G\",\"type\":\"选择版本\",\"sku_price\":\"4888\",\"sku_stock\":9,\"sku_weight\":\"100\",\"sku_code\":\"\"},{\"name\":\"S7edge全网通\",\"type\":\"选择版本\",\"sku_price\":\"5688\",\"sku_stock\":\"10\",\"sku_weight\":\"100\",\"sku_code\":\"\"}]}],\"is_pic\":\"1\"}', 'sj0000001', '117', '0', '1', '0', '0', '<p><img alt=\"56ef4e2aNa4ee7658_r1_c1.jpg\" src=\"/upload/editor/image/20160331/1459404417026494911.jpg\" title=\"1459404417026494911.jpg\"/><img alt=\"56ef4e2aNa4ee7658_r2_c1.jpg\" src=\"/upload/editor/image/20160331/1459404419942299056.jpg\" title=\"1459404419942299056.jpg\"/><img alt=\"56ef4e2aNa4ee7658_r3_c1.jpg\" src=\"/upload/editor/image/20160331/1459404422647858879.jpg\" title=\"1459404422647858879.jpg\"/></p>', '', '0');

-- ----------------------------
-- Table structure for cmswing_doc_invoice
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_doc_invoice`;
CREATE TABLE `cmswing_doc_invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(50) DEFAULT NULL,
  `order_id` bigint(20) NOT NULL,
  `order_no` varchar(50) NOT NULL,
  `admin` varchar(20) DEFAULT NULL,
  `accept_name` varchar(50) DEFAULT NULL,
  `province` bigint(20) DEFAULT NULL,
  `city` bigint(20) DEFAULT NULL,
  `county` bigint(20) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `addr` varchar(250) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `create_time` bigint(13) DEFAULT NULL,
  `express_no` varchar(50) DEFAULT NULL,
  `express_company_id` bigint(20) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_doc_invoice
-- ----------------------------
INSERT INTO `cmswing_doc_invoice` VALUES ('5', '1458820752241', '49', '1458722260981', 'admin', '晓飞 宁', '370000', '370100', '370102', '250000', '山东省ddddddd', '13589100475', '13589100333', '1458820752241', '888888888888888888', '1', '888888888888888888888');
INSERT INTO `cmswing_doc_invoice` VALUES ('4', '1458819404550', '63', '1458798049251', 'admin', '晓飞 宁', '370000', '370100', '370102', '250000', '山东省ddddddd', '13589100475', '13589100333', '1458819404550', '6546546546546546456', '1', '65465465465464');
INSERT INTO `cmswing_doc_invoice` VALUES ('6', 'k1459078679114', '72', 'd21459078464821', 'admin', '多啦A梦', '610000', '610100', '610113', '710065', '高新路王座国际3号楼8单元 308号', '0298888888', '18681841347', '1459078679114', '34324324', '1', '343');
INSERT INTO `cmswing_doc_invoice` VALUES ('7', 'k1459271089325', '74', 'd21459269259683', 'admin', '郭德纲', '120000', '120100', '120102', '710065', 'fdsafasfdsfsdfdsf', '', '12345678901', '1459271089325', '242342', '1', 'dsfs');

-- ----------------------------
-- Table structure for cmswing_doc_receiving
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_doc_receiving`;
CREATE TABLE `cmswing_doc_receiving` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `admin_id` bigint(20) DEFAULT NULL,
  `amount` float(10,2) DEFAULT '0.00',
  `create_time` bigint(13) DEFAULT NULL,
  `payment_time` bigint(13) DEFAULT NULL,
  `doc_type` tinyint(1) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  `pay_status` tinyint(1) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_doc_receiving
-- ----------------------------
INSERT INTO `cmswing_doc_receiving` VALUES ('10', '68', '2', null, '90.00', '1459074833031', '1459074833031', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('12', '69', '2', null, '120.00', '1459075829735', '1459075829735', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('13', '70', '2', null, '120.00', '1459076018652', '1459076030000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('14', '72', '2', null, '230.00', '1459078479743', '1459078482000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('15', '74', '2', null, '105.00', '1459270332491', '1459270332491', '0', '100', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('9', '67', '2', null, '105.00', '1459072709489', '1459072709489', '0', '100', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('16', '76', '2', null, '414.00', '1459370535566', '1459370533000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('17', '78', '2', null, '556.00', '1459399111186', '1459399111186', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('18', '83', '2', null, '10.00', '1459656646547', '1459664651000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('19', '84', '2', null, '10.00', '1459656649045', '1459666088000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('20', '85', '2', null, '1.00', '1459656748575', '1459664619000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('21', '86', '2', null, '1.00', '1459656748577', '1459656748577', '1', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('22', '87', '2', null, '1.00', '1459656845703', '1459664360000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('23', '88', '2', null, '1.00', '1459656845706', '1459664542000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('24', '89', '2', null, '10.00', '1459656932743', '1459664323000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('25', '90', '2', null, '312.00', '1459660400861', '1459663839000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('26', '90', '2', null, '312.00', '1459663845643', '1459663839000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('27', '91', '2', null, '3.00', '1459664055481', '1459664048000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('28', '92', '2', null, '3.00', '1459664055721', '1459664055721', '1', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('29', '92', '2', null, '3.00', '1459664276954', '1459664276954', '0', '4', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('30', '89', '2', null, '10.00', '1459664330586', '1459664323000', '0', '4', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('31', '87', '2', null, '1.00', '1459664367079', '1459664360000', '0', '4', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('32', '88', '2', null, '1.00', '1459664549179', '1459664542000', '0', '4', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('33', '85', '2', null, '1.00', '1459664627107', '1459664619000', '0', '4', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('34', '83', '2', null, '10.00', '1459664658870', '1459664651000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('35', '86', '2', null, '1.00', '1459664937988', '1459664937988', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('36', '84', '2', null, '10.00', '1459666095277', '1459666088000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('37', '93', '2', null, '10.00', '1459666119462', '1459666111000', '1', '4', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('38', '94', '2', null, '30.00', '1459666207211', '1459666207211', '1', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('39', '95', '2', null, '100.00', '1459667056942', '1459667096000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('40', '95', '2', null, '100.00', '1459667103641', '1459667096000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('41', '96', '2', null, '145.00', '1459667126580', '1459667126580', '1', '4', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('42', '97', '2', null, '14403.00', '1459668482348', '1459668480000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('43', '96', '2', null, '145.00', '1459940211430', '1459940211430', '0', '4', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('44', '96', '2', null, '145.00', '1459940222158', '1459940222158', '0', '4', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('45', '96', '2', null, '145.00', '1459940228882', '1459940228882', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('46', '96', '2', null, '145.00', '1459940238402', '1459940238402', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('47', '96', '2', null, '145.00', '1459940246886', '1459940246886', '0', '1', '0', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('48', '98', '2', null, '1.00', '1459940262544', '1459940253000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('49', '99', '2', null, '1.00', '1459940290920', '1459940292000', '1', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('50', '99', '2', null, '1.00', '1459940301931', '1459940292000', '0', '1', '1', null);
INSERT INTO `cmswing_doc_receiving` VALUES ('51', '100', '2', null, '7229.00', '1459960118576', '1459960109000', '0', '1', '1', null);

-- ----------------------------
-- Table structure for cmswing_doc_refund
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_doc_refund`;
CREATE TABLE `cmswing_doc_refund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_no` varchar(20) NOT NULL,
  `create_time` bigint(13) DEFAULT NULL,
  `refund_type` tinyint(3) DEFAULT '0',
  `account_bank` varchar(100) DEFAULT NULL,
  `account_name` varchar(30) DEFAULT NULL,
  `refund_account` varchar(50) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `pay_status` tinyint(3) DEFAULT '0',
  `content` text,
  `handling_idea` text,
  `handling_time` bigint(13) DEFAULT NULL,
  `channel` varchar(50) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `amount` float(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_doc_refund
-- ----------------------------
INSERT INTO `cmswing_doc_refund` VALUES ('1', '7', '2', '20160305132711904858', '20160308153110', '0', '', '', '', null, '0', 'fdsfdsfdsfdsfsdf', null, null, null, null, '0.00');

-- ----------------------------
-- Table structure for cmswing_doc_returns
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_doc_returns`;
CREATE TABLE `cmswing_doc_returns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_no` varchar(50) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `province` bigint(20) DEFAULT NULL,
  `city` bigint(20) DEFAULT NULL,
  `county` binary(1) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `addr` varchar(250) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `create_time` bigint(13) DEFAULT NULL,
  `express_no` varchar(255) DEFAULT NULL,
  `express` varchar(255) DEFAULT NULL,
  `handling_idea` varchar(255) DEFAULT NULL,
  `status` tinyint(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_doc_returns
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_express
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_express`;
CREATE TABLE `cmswing_express` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `area` text,
  `area_groupid` text,
  `firstprice` text,
  `secondprice` text,
  `type` tinyint(1) DEFAULT NULL,
  `first_weight` int(11) DEFAULT NULL,
  `second_weight` int(11) DEFAULT NULL,
  `first_price` float(10,2) DEFAULT '0.00',
  `second_price` float(10,2) DEFAULT '0.00',
  `status` tinyint(1) DEFAULT '0',
  `sort` int(11) DEFAULT '0',
  `is_save_price` tinyint(1) DEFAULT '0',
  `save_rate` int(11) DEFAULT NULL,
  `low_price` float(10,2) DEFAULT '0.00',
  `price_type` tinyint(1) DEFAULT '0',
  `open_default` tinyint(1) DEFAULT '1',
  `is_delete` tinyint(1) DEFAULT '0',
  `express_company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_express
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_express_company
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_express_company`;
CREATE TABLE `cmswing_express_company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `alias` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `sort` tinyint(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_express_company
-- ----------------------------
INSERT INTO `cmswing_express_company` VALUES ('1', 'CNEMS', 'ems', '中国邮政', 'http://www.ems.com.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('2', 'CNST', 'shentong', '申通快递', 'http://www.sto.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('3', 'CNTT', 'tiantian', '天天快递', 'http://www.ttkd.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('4', 'CNYT', 'yuantong', '圆通速递', 'http://www.yto.net.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('5', 'CNSF', 'shunfeng', '顺丰速运', 'http://www.sf-express.com', '0');
INSERT INTO `cmswing_express_company` VALUES ('6', 'CNYD', 'yunda', '韵达快递', 'http://www.yundaex.com', '0');
INSERT INTO `cmswing_express_company` VALUES ('7', 'CNZT', 'zhongtong', '中通速递', 'http://www.zto.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('8', 'CNLB', 'longbanwuliu', '龙邦物流', 'http://www.lbex.com.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('9', 'CNZJS', 'zhaijisong', '宅急送', 'http://www.zjs.com.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('10', 'CNQY', 'quanyikuaidi', '全一快递', 'http://www.apex100.com', '0');
INSERT INTO `cmswing_express_company` VALUES ('11', 'CNHT', 'huitongkuaidi', '汇通速递', 'http://www.htky365.com', '0');
INSERT INTO `cmswing_express_company` VALUES ('12', 'CNMH', 'minghangkuaidi', '民航快递', 'http://www.cae.com.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('13', 'CNYF', 'yafengsudi', '亚风速递', 'http://www.airfex.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('14', 'CNKJ', 'kuaijiesudi', '快捷速递', 'http://www.fastexpress.com.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('15', 'DDS', 'dsukuaidi', 'DDS快递', 'http://www.qc-dds.net', '0');
INSERT INTO `cmswing_express_company` VALUES ('16', 'CNHY', 'tiandihuayu', '华宇物流', 'http://www.hoau.net', '0');
INSERT INTO `cmswing_express_company` VALUES ('17', 'CNZY', 'zhongtiewuliu', '中铁快运', 'http://www.cre.cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('18', 'FEDEX', 'fedex', 'FedEx', 'http://www.fedex.com/cn', '0');
INSERT INTO `cmswing_express_company` VALUES ('19', 'UPS', 'ups', 'UPS', 'http://www.ups.com', '0');
INSERT INTO `cmswing_express_company` VALUES ('20', 'DHL', 'dhl', 'DHL', 'http://www.cn.dhl.com', '0');

-- ----------------------------
-- Table structure for cmswing_express_template
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_express_template`;
CREATE TABLE `cmswing_express_template` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `content` text,
  `background` varchar(255) DEFAULT NULL,
  `width` int(5) DEFAULT '900',
  `height` int(5) DEFAULT '600',
  `offset_x` int(5) DEFAULT '0',
  `offset_y` int(5) DEFAULT '0',
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_express_template
-- ----------------------------
INSERT INTO `cmswing_express_template` VALUES ('1', '32312', '<div style=\"z-index: 7; top: 42px; left: 53px;\" class=\"item\"><pre>发货点-名称</pre><div class=\"resize\"></div></div><div style=\"z-index: 8; top: 43px; left: 161px;\" class=\"item\"><pre>发货点-地区2级</pre><div class=\"resize\"></div></div>', '', '840', '480', '0', '0', '0');
INSERT INTO `cmswing_express_template` VALUES ('2', 'SYMBOL', '<div style=\"z-index: 4; top: 34px; left: 240px;\" class=\"item\"><pre>时间-日</pre><div class=\"resize\"></div></div><div style=\"z-index: 6; top: 43px; left: 17px;\" class=\"item\"><pre>网站-电话</pre><div class=\"resize\"></div></div><div style=\"z-index: 8; top: 56px; left: 99px;\" class=\"item\"><pre>时间-日</pre><div class=\"resize\"></div></div><div style=\"z-index: 1; top: 135px; left: 141px;\" class=\"item\"><pre>时间-当前日期</pre><div class=\"resize\"></div></div><div style=\"z-index: 10; top: 178px; left: 232px;\" class=\"item\"><pre>√</pre><div class=\"resize\"></div></div><div style=\"z-index: 9; top: 179px; left: 270px;\" class=\"item\"><pre>时间-当前日期</pre><div class=\"resize\"></div></div>', '', '840', '480', '0', '0', '1');

-- ----------------------------
-- Table structure for cmswing_fare
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_fare`;
CREATE TABLE `cmswing_fare` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `first_weight` int(11) NOT NULL,
  `second_weight` int(11) NOT NULL,
  `first_price` float(10,2) NOT NULL,
  `second_price` float(10,2) DEFAULT NULL,
  `zoning` text,
  `is_default` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_fare
-- ----------------------------
INSERT INTO `cmswing_fare` VALUES ('3', '还是测试运费模板啦啦啦', '1000', '1000', '30.00', '30.00', '[{\"area\":\"[\\\"330000_330100_330101\\\",\\\"330000_330100_330102\\\",\\\"330000_330100_330103\\\",\\\"330000_330100_330104\\\",\\\"330000_330100_330105\\\",\\\"330000_330100_330106\\\",\\\"330000_330100_330108\\\",\\\"330000_330100_330109\\\",\\\"330000_330100_330110\\\",\\\"330000_330100_330122\\\",\\\"330000_330100_330127\\\",\\\"330000_330100_330182\\\",\\\"330000_330100_330183\\\",\\\"330000_330100_330185\\\",\\\"330000_330200_330201\\\",\\\"330000_330200_330203\\\",\\\"330000_330200_330204\\\",\\\"330000_330200_330205\\\",\\\"330000_330200_330206\\\",\\\"330000_330200_330211\\\",\\\"330000_330200_330212\\\",\\\"330000_330200_330225\\\",\\\"330000_330200_330226\\\",\\\"330000_330200_330281\\\",\\\"330000_330200_330282\\\",\\\"330000_330200_330283\\\",\\\"330000_330300_330301\\\",\\\"330000_330300_330302\\\",\\\"330000_330300_330303\\\",\\\"330000_330300_330304\\\",\\\"330000_330300_330322\\\",\\\"330000_330300_330324\\\",\\\"330000_330300_330326\\\",\\\"330000_330300_330327\\\",\\\"330000_330300_330328\\\",\\\"330000_330300_330329\\\",\\\"330000_330300_330381\\\",\\\"330000_330300_330382\\\",\\\"330000_330400_330401\\\",\\\"330000_330400_330402\\\",\\\"330000_330400_330411\\\",\\\"330000_330400_330421\\\",\\\"330000_330400_330424\\\",\\\"330000_330400_330481\\\",\\\"330000_330400_330482\\\",\\\"330000_330400_330483\\\",\\\"330000_330500_330501\\\",\\\"330000_330500_330502\\\",\\\"330000_330500_330503\\\",\\\"330000_330500_330521\\\",\\\"330000_330500_330522\\\",\\\"330000_330500_330523\\\",\\\"330000_330600_330601\\\",\\\"330000_330600_330602\\\",\\\"330000_330600_330621\\\",\\\"330000_330600_330624\\\",\\\"330000_330600_330681\\\",\\\"330000_330600_330682\\\",\\\"330000_330600_330683\\\",\\\"330000_330700_330701\\\",\\\"330000_330700_330702\\\",\\\"330000_330700_330703\\\",\\\"330000_330700_330723\\\",\\\"330000_330700_330726\\\",\\\"330000_330700_330727\\\",\\\"330000_330700_330781\\\",\\\"330000_330700_330782\\\",\\\"330000_330700_330783\\\",\\\"330000_330700_330784\\\",\\\"330000_330800_330801\\\",\\\"330000_330800_330802\\\",\\\"330000_330800_330803\\\",\\\"330000_330800_330822\\\",\\\"330000_330800_330824\\\",\\\"330000_330800_330825\\\",\\\"330000_330800_330881\\\",\\\"330000_330900_330901\\\",\\\"330000_330900_330902\\\",\\\"330000_330900_330903\\\",\\\"330000_330900_330921\\\",\\\"330000_330900_330922\\\",\\\"330000_331000_331001\\\",\\\"330000_331000_331002\\\",\\\"330000_331000_331003\\\",\\\"330000_331000_331004\\\",\\\"330000_331000_331021\\\",\\\"330000_331000_331022\\\",\\\"330000_331000_331023\\\",\\\"330000_331000_331024\\\",\\\"330000_331000_331081\\\",\\\"330000_331000_331082\\\",\\\"330000_331100_331101\\\",\\\"330000_331100_331102\\\",\\\"330000_331100_331121\\\",\\\"330000_331100_331122\\\",\\\"330000_331100_331123\\\",\\\"330000_331100_331124\\\",\\\"330000_331100_331125\\\",\\\"330000_331100_331126\\\",\\\"330000_331100_331127\\\",\\\"330000_331100_331181\\\",\\\"340000_340100_340101\\\",\\\"340000_340100_340102\\\",\\\"340000_340100_340103\\\",\\\"340000_340100_340104\\\",\\\"340000_340100_340111\\\",\\\"340000_340100_340121\\\",\\\"340000_340100_340122\\\",\\\"340000_340100_340123\\\",\\\"340000_340100_341401\\\",\\\"340000_340100_341402\\\",\\\"340000_340200_340201\\\",\\\"340000_340200_340202\\\",\\\"340000_340200_340203\\\",\\\"340000_340200_340204\\\",\\\"340000_340200_340207\\\",\\\"340000_340200_340221\\\",\\\"340000_340200_340222\\\",\\\"340000_340200_340223\\\",\\\"340000_340200_341422\\\",\\\"340000_340300_340301\\\",\\\"340000_340300_340302\\\",\\\"340000_340300_340303\\\",\\\"340000_340300_340304\\\",\\\"340000_340300_340311\\\",\\\"340000_340300_340321\\\",\\\"340000_340300_340322\\\",\\\"340000_340300_340323\\\",\\\"340000_340400_340401\\\",\\\"340000_340400_340402\\\",\\\"340000_340400_340403\\\",\\\"340000_340400_340404\\\",\\\"340000_340400_340405\\\",\\\"340000_340400_340406\\\",\\\"340000_340400_340421\\\",\\\"340000_340500_340501\\\",\\\"340000_340500_340502\\\",\\\"340000_340500_340503\\\",\\\"340000_340500_340504\\\",\\\"340000_340500_340521\\\",\\\"340000_340500_341423\\\",\\\"340000_340500_341424\\\",\\\"340000_340600_340601\\\",\\\"340000_340600_340602\\\",\\\"340000_340600_340603\\\",\\\"340000_340600_340604\\\",\\\"340000_340600_340621\\\",\\\"340000_340700_340701\\\",\\\"340000_340700_340702\\\",\\\"340000_340700_340703\\\",\\\"340000_340700_340711\\\",\\\"340000_340700_340721\\\",\\\"340000_340800_340801\\\",\\\"340000_340800_340802\\\",\\\"340000_340800_340803\\\",\\\"340000_340800_340811\\\",\\\"340000_340800_340822\\\",\\\"340000_340800_340823\\\",\\\"340000_340800_340824\\\",\\\"340000_340800_340825\\\",\\\"340000_340800_340826\\\",\\\"340000_340800_340827\\\",\\\"340000_340800_340828\\\",\\\"340000_340800_340881\\\",\\\"340000_341000_341001\\\",\\\"340000_341000_341002\\\",\\\"340000_341000_341003\\\",\\\"340000_341000_341004\\\",\\\"340000_341000_341021\\\",\\\"340000_341000_341022\\\",\\\"340000_341000_341023\\\",\\\"340000_341000_341024\\\",\\\"340000_341100_341101\\\",\\\"340000_341100_341102\\\",\\\"340000_341100_341103\\\",\\\"340000_341100_341122\\\",\\\"340000_341100_341124\\\",\\\"340000_341100_341125\\\",\\\"340000_341100_341126\\\",\\\"340000_341100_341181\\\",\\\"340000_341100_341182\\\",\\\"340000_341200_341201\\\",\\\"340000_341200_341202\\\",\\\"340000_341200_341203\\\",\\\"340000_341200_341204\\\",\\\"340000_341200_341221\\\",\\\"340000_341200_341222\\\",\\\"340000_341200_341225\\\",\\\"340000_341200_341226\\\",\\\"340000_341200_341282\\\",\\\"340000_341300_341301\\\",\\\"340000_341300_341302\\\",\\\"340000_341300_341321\\\",\\\"340000_341300_341322\\\",\\\"340000_341300_341323\\\",\\\"340000_341300_341324\\\",\\\"340000_341500_341501\\\",\\\"340000_341500_341502\\\",\\\"340000_341500_341503\\\",\\\"340000_341500_341521\\\",\\\"340000_341500_341522\\\",\\\"340000_341500_341523\\\",\\\"340000_341500_341524\\\",\\\"340000_341500_341525\\\",\\\"340000_341600_341601\\\",\\\"340000_341600_341602\\\",\\\"340000_341600_341621\\\",\\\"340000_341600_341622\\\",\\\"340000_341600_341623\\\",\\\"340000_341700_341701\\\",\\\"340000_341700_341702\\\",\\\"340000_341700_341721\\\",\\\"340000_341700_341722\\\",\\\"340000_341700_341723\\\",\\\"340000_341800_341801\\\",\\\"340000_341800_341802\\\",\\\"340000_341800_341821\\\",\\\"340000_341800_341822\\\",\\\"340000_341800_341823\\\",\\\"340000_341800_341824\\\",\\\"340000_341800_341825\\\",\\\"340000_341800_341881\\\",\\\"350000_350100_350101\\\",\\\"350000_350100_350102\\\",\\\"350000_350100_350103\\\",\\\"350000_350100_350104\\\",\\\"350000_350100_350105\\\",\\\"350000_350100_350111\\\",\\\"350000_350100_350121\\\",\\\"350000_350100_350122\\\",\\\"350000_350100_350123\\\",\\\"350000_350100_350124\\\",\\\"350000_350100_350125\\\",\\\"350000_350100_350128\\\",\\\"350000_350100_350181\\\",\\\"350000_350100_350182\\\",\\\"350000_350200_350201\\\",\\\"350000_350200_350203\\\",\\\"350000_350200_350205\\\",\\\"350000_350200_350206\\\",\\\"350000_350200_350211\\\",\\\"350000_350200_350212\\\",\\\"350000_350200_350213\\\",\\\"350000_350300_350301\\\",\\\"350000_350300_350302\\\",\\\"350000_350300_350303\\\",\\\"350000_350300_350304\\\",\\\"350000_350300_350305\\\",\\\"350000_350300_350322\\\",\\\"350000_350400_350401\\\",\\\"350000_350400_350402\\\",\\\"350000_350400_350403\\\",\\\"350000_350400_350421\\\",\\\"350000_350400_350423\\\",\\\"350000_350400_350424\\\",\\\"350000_350400_350425\\\",\\\"350000_350400_350426\\\",\\\"350000_350400_350427\\\",\\\"350000_350400_350428\\\",\\\"350000_350400_350429\\\",\\\"350000_350400_350430\\\",\\\"350000_350400_350481\\\",\\\"350000_350500_350501\\\",\\\"350000_350500_350502\\\",\\\"350000_350500_350503\\\",\\\"350000_350500_350504\\\",\\\"350000_350500_350505\\\",\\\"350000_350500_350521\\\",\\\"350000_350500_350524\\\",\\\"350000_350500_350525\\\",\\\"350000_350500_350526\\\",\\\"350000_350500_350527\\\",\\\"350000_350500_350581\\\",\\\"350000_350500_350582\\\",\\\"350000_350500_350583\\\",\\\"350000_350600_350601\\\",\\\"350000_350600_350602\\\",\\\"350000_350600_350603\\\",\\\"350000_350600_350622\\\",\\\"350000_350600_350623\\\",\\\"350000_350600_350624\\\",\\\"350000_350600_350625\\\",\\\"350000_350600_350626\\\",\\\"350000_350600_350627\\\",\\\"350000_350600_350628\\\",\\\"350000_350600_350629\\\",\\\"350000_350600_350681\\\",\\\"350000_350700_350701\\\",\\\"350000_350700_350702\\\",\\\"350000_350700_350721\\\",\\\"350000_350700_350722\\\",\\\"350000_350700_350723\\\",\\\"350000_350700_350724\\\",\\\"350000_350700_350725\\\",\\\"350000_350700_350781\\\",\\\"350000_350700_350782\\\",\\\"350000_350700_350783\\\",\\\"350000_350700_350784\\\",\\\"350000_350800_350801\\\",\\\"350000_350800_350802\\\",\\\"350000_350800_350821\\\",\\\"350000_350800_350822\\\",\\\"350000_350800_350823\\\",\\\"350000_350800_350824\\\",\\\"350000_350800_350825\\\",\\\"350000_350800_350881\\\",\\\"350000_350900_350901\\\",\\\"350000_350900_350902\\\",\\\"350000_350900_350921\\\",\\\"350000_350900_350922\\\",\\\"350000_350900_350923\\\",\\\"350000_350900_350924\\\",\\\"350000_350900_350925\\\",\\\"350000_350900_350926\\\",\\\"350000_350900_350981\\\",\\\"350000_350900_350982\\\",\\\"360000_360100_360101\\\",\\\"360000_360100_360102\\\",\\\"360000_360100_360103\\\",\\\"360000_360100_360104\\\",\\\"360000_360100_360105\\\",\\\"360000_360100_360111\\\",\\\"360000_360100_360121\\\",\\\"360000_360100_360122\\\",\\\"360000_360100_360123\\\",\\\"360000_360100_360124\\\",\\\"360000_360200_360201\\\",\\\"360000_360200_360202\\\",\\\"360000_360200_360203\\\",\\\"360000_360200_360222\\\",\\\"360000_360200_360281\\\",\\\"360000_360300_360301\\\",\\\"360000_360300_360302\\\",\\\"360000_360300_360313\\\",\\\"360000_360300_360321\\\",\\\"360000_360300_360322\\\",\\\"360000_360300_360323\\\",\\\"360000_360400_360401\\\",\\\"360000_360400_360402\\\",\\\"360000_360400_360403\\\",\\\"360000_360400_360421\\\",\\\"360000_360400_360423\\\",\\\"360000_360400_360424\\\",\\\"360000_360400_360425\\\",\\\"360000_360400_360426\\\",\\\"360000_360400_360427\\\",\\\"360000_360400_360428\\\",\\\"360000_360400_360429\\\",\\\"360000_360400_360430\\\",\\\"360000_360400_360481\\\",\\\"360000_360500_360501\\\",\\\"360000_360500_360502\\\",\\\"360000_360500_360521\\\",\\\"360000_360600_360601\\\",\\\"360000_360600_360602\\\",\\\"360000_360600_360622\\\",\\\"360000_360600_360681\\\",\\\"360000_360700_360701\\\",\\\"360000_360700_360702\\\",\\\"360000_360700_360721\\\",\\\"360000_360700_360722\\\",\\\"360000_360700_360723\\\",\\\"360000_360700_360724\\\",\\\"360000_360700_360725\\\",\\\"360000_360700_360726\\\",\\\"360000_360700_360727\\\",\\\"360000_360700_360728\\\",\\\"360000_360700_360729\\\",\\\"360000_360700_360730\\\",\\\"360000_360700_360731\\\",\\\"360000_360700_360732\\\",\\\"360000_360700_360733\\\",\\\"360000_360700_360734\\\",\\\"360000_360700_360735\\\",\\\"360000_360700_360781\\\",\\\"360000_360700_360782\\\",\\\"360000_360800_360801\\\",\\\"360000_360800_360802\\\",\\\"360000_360800_360803\\\",\\\"360000_360800_360821\\\",\\\"360000_360800_360822\\\",\\\"360000_360800_360823\\\",\\\"360000_360800_360824\\\",\\\"360000_360800_360825\\\",\\\"360000_360800_360826\\\",\\\"360000_360800_360827\\\",\\\"360000_360800_360828\\\",\\\"360000_360800_360829\\\",\\\"360000_360800_360830\\\",\\\"360000_360800_360881\\\",\\\"360000_360900_360901\\\",\\\"360000_360900_360902\\\",\\\"360000_360900_360921\\\",\\\"360000_360900_360922\\\",\\\"360000_360900_360923\\\",\\\"360000_360900_360924\\\",\\\"360000_360900_360925\\\",\\\"360000_360900_360926\\\",\\\"360000_360900_360981\\\",\\\"360000_360900_360982\\\",\\\"360000_360900_360983\\\",\\\"360000_361000_361001\\\",\\\"360000_361000_361002\\\",\\\"360000_361000_361021\\\",\\\"360000_361000_361022\\\",\\\"360000_361000_361023\\\",\\\"360000_361000_361024\\\",\\\"360000_361000_361025\\\",\\\"360000_361000_361026\\\",\\\"360000_361000_361027\\\",\\\"360000_361000_361028\\\",\\\"360000_361000_361029\\\",\\\"360000_361000_361030\\\",\\\"360000_361100_361101\\\",\\\"360000_361100_361102\\\",\\\"360000_361100_361121\\\",\\\"360000_361100_361122\\\",\\\"360000_361100_361123\\\",\\\"360000_361100_361124\\\",\\\"360000_361100_361125\\\",\\\"360000_361100_361126\\\",\\\"360000_361100_361127\\\",\\\"360000_361100_361128\\\",\\\"360000_361100_361129\\\",\\\"360000_361100_361130\\\",\\\"360000_361100_361181\\\",\\\"370000_370100_370101\\\",\\\"370000_370100_370102\\\",\\\"370000_370100_370103\\\",\\\"370000_370100_370104\\\",\\\"370000_370100_370105\\\",\\\"370000_370100_370112\\\",\\\"370000_370100_370113\\\",\\\"370000_370100_370124\\\",\\\"370000_370100_370125\\\",\\\"370000_370100_370126\\\",\\\"370000_370100_370181\\\",\\\"370000_370200_370201\\\",\\\"370000_370200_370202\\\",\\\"370000_370200_370203\\\",\\\"370000_370200_370205\\\",\\\"370000_370200_370211\\\",\\\"370000_370200_370212\\\",\\\"370000_370200_370213\\\",\\\"370000_370200_370214\\\",\\\"370000_370200_370281\\\",\\\"370000_370200_370282\\\",\\\"370000_370200_370283\\\",\\\"370000_370200_370284\\\",\\\"370000_370200_370285\\\",\\\"370000_370300_370301\\\",\\\"370000_370300_370302\\\",\\\"370000_370300_370303\\\",\\\"370000_370300_370304\\\",\\\"370000_370300_370305\\\",\\\"370000_370300_370306\\\",\\\"370000_370300_370321\\\",\\\"370000_370300_370322\\\",\\\"370000_370300_370323\\\",\\\"370000_370400_370401\\\",\\\"370000_370400_370402\\\",\\\"370000_370400_370403\\\",\\\"370000_370400_370404\\\",\\\"370000_370400_370405\\\",\\\"370000_370400_370406\\\",\\\"370000_370400_370481\\\",\\\"370000_370500_370501\\\",\\\"370000_370500_370502\\\",\\\"370000_370500_370503\\\",\\\"370000_370500_370521\\\",\\\"370000_370500_370522\\\",\\\"370000_370500_370523\\\",\\\"370000_370600_370601\\\",\\\"370000_370600_370602\\\",\\\"370000_370600_370611\\\",\\\"370000_370600_370612\\\",\\\"370000_370600_370613\\\",\\\"370000_370600_370634\\\",\\\"370000_370600_370681\\\",\\\"370000_370600_370682\\\",\\\"370000_370600_370683\\\",\\\"370000_370600_370684\\\",\\\"370000_370600_370685\\\",\\\"370000_370600_370686\\\",\\\"370000_370600_370687\\\",\\\"370000_370700_370701\\\",\\\"370000_370700_370702\\\",\\\"370000_370700_370703\\\",\\\"370000_370700_370704\\\",\\\"370000_370700_370705\\\",\\\"370000_370700_370724\\\",\\\"370000_370700_370725\\\",\\\"370000_370700_370781\\\",\\\"370000_370700_370782\\\",\\\"370000_370700_370783\\\",\\\"370000_370700_370784\\\",\\\"370000_370700_370785\\\",\\\"370000_370700_370786\\\",\\\"370000_370800_370801\\\",\\\"370000_370800_370802\\\",\\\"370000_370800_370811\\\",\\\"370000_370800_370826\\\",\\\"370000_370800_370827\\\",\\\"370000_370800_370828\\\",\\\"370000_370800_370829\\\",\\\"370000_370800_370830\\\",\\\"370000_370800_370831\\\",\\\"370000_370800_370832\\\",\\\"370000_370800_370881\\\",\\\"370000_370800_370882\\\",\\\"370000_370800_370883\\\",\\\"370000_370900_370901\\\",\\\"370000_370900_370902\\\",\\\"370000_370900_370903\\\",\\\"370000_370900_370921\\\",\\\"370000_370900_370923\\\",\\\"370000_370900_370982\\\",\\\"370000_370900_370983\\\",\\\"370000_371000_371001\\\",\\\"370000_371000_371002\\\",\\\"370000_371000_371081\\\",\\\"370000_371000_371082\\\",\\\"370000_371000_371083\\\",\\\"370000_371100_371101\\\",\\\"370000_371100_371102\\\",\\\"370000_371100_371103\\\",\\\"370000_371100_371121\\\",\\\"370000_371100_371122\\\",\\\"370000_371200_371201\\\",\\\"370000_371200_371202\\\",\\\"370000_371200_371203\\\",\\\"370000_371300_371301\\\",\\\"370000_371300_371302\\\",\\\"370000_371300_371311\\\",\\\"370000_371300_371312\\\",\\\"370000_371300_371321\\\",\\\"370000_371300_371322\\\",\\\"370000_371300_371323\\\",\\\"370000_371300_371324\\\",\\\"370000_371300_371325\\\",\\\"370000_371300_371326\\\",\\\"370000_371300_371327\\\",\\\"370000_371300_371328\\\",\\\"370000_371300_371329\\\",\\\"370000_371400_371401\\\",\\\"370000_371400_371402\\\",\\\"370000_371400_371421\\\",\\\"370000_371400_371422\\\",\\\"370000_371400_371423\\\",\\\"370000_371400_371424\\\",\\\"370000_371400_371425\\\",\\\"370000_371400_371426\\\",\\\"370000_371400_371427\\\",\\\"370000_371400_371428\\\",\\\"370000_371400_371481\\\",\\\"370000_371400_371482\\\",\\\"370000_371500_371501\\\",\\\"370000_371500_371502\\\",\\\"370000_371500_371521\\\",\\\"370000_371500_371522\\\",\\\"370000_371500_371523\\\",\\\"370000_371500_371524\\\",\\\"370000_371500_371525\\\",\\\"370000_371500_371526\\\",\\\"370000_371500_371581\\\",\\\"370000_371600_371601\\\",\\\"370000_371600_371602\\\",\\\"370000_371600_371621\\\",\\\"370000_371600_371622\\\",\\\"370000_371600_371623\\\",\\\"370000_371600_371624\\\",\\\"370000_371600_371625\\\",\\\"370000_371600_371626\\\",\\\"370000_371700_371701\\\",\\\"370000_371700_371702\\\",\\\"370000_371700_371721\\\",\\\"370000_371700_371722\\\",\\\"370000_371700_371723\\\",\\\"370000_371700_371724\\\",\\\"370000_371700_371725\\\",\\\"370000_371700_371726\\\",\\\"370000_371700_371727\\\",\\\"370000_371700_371728\\\",\\\"410000_410100_410101\\\",\\\"410000_410100_410102\\\",\\\"410000_410100_410103\\\",\\\"410000_410100_410104\\\",\\\"410000_410100_410105\\\",\\\"410000_410100_410106\\\",\\\"410000_410100_410108\\\",\\\"410000_410100_410122\\\",\\\"410000_410100_410181\\\",\\\"410000_410100_410182\\\",\\\"410000_410100_410183\\\",\\\"410000_410100_410184\\\",\\\"410000_410100_410185\\\",\\\"410000_410200_410201\\\",\\\"410000_410200_410202\\\",\\\"410000_410200_410203\\\",\\\"410000_410200_410204\\\",\\\"410000_410200_410205\\\",\\\"410000_410200_410211\\\",\\\"410000_410200_410221\\\",\\\"410000_410200_410222\\\",\\\"410000_410200_410223\\\",\\\"410000_410200_410224\\\",\\\"410000_410200_410225\\\",\\\"410000_410300_410301\\\",\\\"410000_410300_410302\\\",\\\"410000_410300_410303\\\",\\\"410000_410300_410304\\\",\\\"410000_410300_410305\\\",\\\"410000_410300_410306\\\",\\\"410000_410300_410307\\\",\\\"410000_410300_410322\\\",\\\"410000_410300_410323\\\",\\\"410000_410300_410324\\\",\\\"410000_410300_410325\\\",\\\"410000_410300_410326\\\",\\\"410000_410300_410327\\\",\\\"410000_410300_410328\\\",\\\"410000_410300_410329\\\",\\\"410000_410300_410381\\\",\\\"410000_410400_410401\\\",\\\"410000_410400_410402\\\",\\\"410000_410400_410403\\\",\\\"410000_410400_410404\\\",\\\"410000_410400_410411\\\",\\\"410000_410400_410421\\\",\\\"410000_410400_410422\\\",\\\"410000_410400_410423\\\",\\\"410000_410400_410425\\\",\\\"410000_410400_410481\\\",\\\"410000_410400_410482\\\",\\\"410000_410500_410501\\\",\\\"410000_410500_410502\\\",\\\"410000_410500_410503\\\",\\\"410000_410500_410505\\\",\\\"410000_410500_410506\\\",\\\"410000_410500_410522\\\",\\\"410000_410500_410523\\\",\\\"410000_410500_410526\\\",\\\"410000_410500_410527\\\",\\\"410000_410500_410581\\\",\\\"410000_410600_410601\\\",\\\"410000_410600_410602\\\",\\\"410000_410600_410603\\\",\\\"410000_410600_410611\\\",\\\"410000_410600_410621\\\",\\\"410000_410600_410622\\\",\\\"410000_410700_410701\\\",\\\"410000_410700_410702\\\",\\\"410000_410700_410703\\\",\\\"410000_410700_410704\\\",\\\"410000_410700_410711\\\",\\\"410000_410700_410721\\\",\\\"410000_410700_410724\\\",\\\"410000_410700_410725\\\",\\\"410000_410700_410726\\\",\\\"410000_410700_410727\\\",\\\"410000_410700_410728\\\",\\\"410000_410700_410781\\\",\\\"410000_410700_410782\\\",\\\"410000_410800_410801\\\",\\\"410000_410800_410802\\\",\\\"410000_410800_410803\\\",\\\"410000_410800_410804\\\",\\\"410000_410800_410811\\\",\\\"410000_410800_410821\\\",\\\"410000_410800_410822\\\",\\\"410000_410800_410823\\\",\\\"410000_410800_410825\\\",\\\"410000_410800_410881\\\",\\\"410000_410800_410882\\\",\\\"410000_410800_410883\\\",\\\"410000_410900_410901\\\",\\\"410000_410900_410902\\\",\\\"410000_410900_410922\\\",\\\"410000_410900_410923\\\",\\\"410000_410900_410926\\\",\\\"410000_410900_410927\\\",\\\"410000_410900_410928\\\",\\\"410000_411000_411001\\\",\\\"410000_411000_411002\\\",\\\"410000_411000_411023\\\",\\\"410000_411000_411024\\\",\\\"410000_411000_411025\\\",\\\"410000_411000_411081\\\",\\\"410000_411000_411082\\\",\\\"410000_411100_411101\\\",\\\"410000_411100_411102\\\",\\\"410000_411100_411103\\\",\\\"410000_411100_411104\\\",\\\"410000_411100_411121\\\",\\\"410000_411100_411122\\\",\\\"410000_411200_411201\\\",\\\"410000_411200_411202\\\",\\\"410000_411200_411221\\\",\\\"410000_411200_411222\\\",\\\"410000_411200_411224\\\",\\\"410000_411200_411281\\\",\\\"410000_411200_411282\\\",\\\"410000_411300_411301\\\",\\\"410000_411300_411302\\\",\\\"410000_411300_411303\\\",\\\"410000_411300_411321\\\",\\\"410000_411300_411322\\\",\\\"410000_411300_411323\\\",\\\"410000_411300_411324\\\",\\\"410000_411300_411325\\\",\\\"410000_411300_411326\\\",\\\"410000_411300_411327\\\",\\\"410000_411300_411328\\\",\\\"410000_411300_411329\\\",\\\"410000_411300_411330\\\",\\\"410000_411300_411381\\\",\\\"410000_411400_411401\\\",\\\"410000_411400_411402\\\",\\\"410000_411400_411403\\\",\\\"410000_411400_411421\\\",\\\"410000_411400_411422\\\",\\\"410000_411400_411423\\\",\\\"410000_411400_411424\\\",\\\"410000_411400_411425\\\",\\\"410000_411400_411426\\\",\\\"410000_411400_411481\\\",\\\"410000_411500_411501\\\",\\\"410000_411500_411502\\\",\\\"410000_411500_411503\\\",\\\"410000_411500_411521\\\",\\\"410000_411500_411522\\\",\\\"410000_411500_411523\\\",\\\"410000_411500_411524\\\",\\\"410000_411500_411525\\\",\\\"410000_411500_411526\\\",\\\"410000_411500_411527\\\",\\\"410000_411500_411528\\\",\\\"410000_411600_411601\\\",\\\"410000_411600_411602\\\",\\\"410000_411600_411621\\\",\\\"410000_411600_411622\\\",\\\"410000_411600_411623\\\",\\\"410000_411600_411624\\\",\\\"410000_411600_411625\\\",\\\"410000_411600_411626\\\",\\\"410000_411600_411627\\\",\\\"410000_411600_411628\\\",\\\"410000_411600_411681\\\",\\\"410000_411700_411701\\\",\\\"410000_411700_411702\\\",\\\"410000_411700_411721\\\",\\\"410000_411700_411722\\\",\\\"410000_411700_411723\\\",\\\"410000_411700_411724\\\",\\\"410000_411700_411725\\\",\\\"410000_411700_411726\\\",\\\"410000_411700_411727\\\",\\\"410000_411700_411728\\\",\\\"410000_411700_411729\\\"]\",\"selectarea\":\"[330000,330100,330101,330102,330103,330104,330105,330106,330108,330109,330110,330122,330127,330182,330183,330185,330200,330201,330203,330204,330205,330206,330211,330212,330225,330226,330281,330282,330283,330300,330301,330302,330303,330304,330322,330324,330326,330327,330328,330329,330381,330382,330400,330401,330402,330411,330421,330424,330481,330482,330483,330500,330501,330502,330503,330521,330522,330523,330600,330601,330602,330621,330624,330681,330682,330683,330700,330701,330702,330703,330723,330726,330727,330781,330782,330783,330784,330800,330801,330802,330803,330822,330824,330825,330881,330900,330901,330902,330903,330921,330922,331000,331001,331002,331003,331004,331021,331022,331023,331024,331081,331082,331100,331101,331102,331121,331122,331123,331124,331125,331126,331127,331181,340000,340100,340101,340102,340103,340104,340111,340121,340122,340123,341401,341402,340200,340201,340202,340203,340204,340207,340221,340222,340223,341422,340300,340301,340302,340303,340304,340311,340321,340322,340323,340400,340401,340402,340403,340404,340405,340406,340421,340500,340501,340502,340503,340504,340521,341423,341424,340600,340601,340602,340603,340604,340621,340700,340701,340702,340703,340711,340721,340800,340801,340802,340803,340811,340822,340823,340824,340825,340826,340827,340828,340881,341000,341001,341002,341003,341004,341021,341022,341023,341024,341100,341101,341102,341103,341122,341124,341125,341126,341181,341182,341200,341201,341202,341203,341204,341221,341222,341225,341226,341282,341300,341301,341302,341321,341322,341323,341324,341500,341501,341502,341503,341521,341522,341523,341524,341525,341600,341601,341602,341621,341622,341623,341700,341701,341702,341721,341722,341723,341800,341801,341802,341821,341822,341823,341824,341825,341881,350000,350100,350101,350102,350103,350104,350105,350111,350121,350122,350123,350124,350125,350128,350181,350182,350200,350201,350203,350205,350206,350211,350212,350213,350300,350301,350302,350303,350304,350305,350322,350400,350401,350402,350403,350421,350423,350424,350425,350426,350427,350428,350429,350430,350481,350500,350501,350502,350503,350504,350505,350521,350524,350525,350526,350527,350581,350582,350583,350600,350601,350602,350603,350622,350623,350624,350625,350626,350627,350628,350629,350681,350700,350701,350702,350721,350722,350723,350724,350725,350781,350782,350783,350784,350800,350801,350802,350821,350822,350823,350824,350825,350881,350900,350901,350902,350921,350922,350923,350924,350925,350926,350981,350982,360000,360100,360101,360102,360103,360104,360105,360111,360121,360122,360123,360124,360200,360201,360202,360203,360222,360281,360300,360301,360302,360313,360321,360322,360323,360400,360401,360402,360403,360421,360423,360424,360425,360426,360427,360428,360429,360430,360481,360500,360501,360502,360521,360600,360601,360602,360622,360681,360700,360701,360702,360721,360722,360723,360724,360725,360726,360727,360728,360729,360730,360731,360732,360733,360734,360735,360781,360782,360800,360801,360802,360803,360821,360822,360823,360824,360825,360826,360827,360828,360829,360830,360881,360900,360901,360902,360921,360922,360923,360924,360925,360926,360981,360982,360983,361000,361001,361002,361021,361022,361023,361024,361025,361026,361027,361028,361029,361030,361100,361101,361102,361121,361122,361123,361124,361125,361126,361127,361128,361129,361130,361181,370000,370100,370101,370102,370103,370104,370105,370112,370113,370124,370125,370126,370181,370200,370201,370202,370203,370205,370211,370212,370213,370214,370281,370282,370283,370284,370285,370300,370301,370302,370303,370304,370305,370306,370321,370322,370323,370400,370401,370402,370403,370404,370405,370406,370481,370500,370501,370502,370503,370521,370522,370523,370600,370601,370602,370611,370612,370613,370634,370681,370682,370683,370684,370685,370686,370687,370700,370701,370702,370703,370704,370705,370724,370725,370781,370782,370783,370784,370785,370786,370800,370801,370802,370811,370826,370827,370828,370829,370830,370831,370832,370881,370882,370883,370900,370901,370902,370903,370921,370923,370982,370983,371000,371001,371002,371081,371082,371083,371100,371101,371102,371103,371121,371122,371200,371201,371202,371203,371300,371301,371302,371311,371312,371321,371322,371323,371324,371325,371326,371327,371328,371329,371400,371401,371402,371421,371422,371423,371424,371425,371426,371427,371428,371481,371482,371500,371501,371502,371521,371522,371523,371524,371525,371526,371581,371600,371601,371602,371621,371622,371623,371624,371625,371626,371700,371701,371702,371721,371722,371723,371724,371725,371726,371727,371728,410000,410100,410101,410102,410103,410104,410105,410106,410108,410122,410181,410182,410183,410184,410185,410200,410201,410202,410203,410204,410205,410211,410221,410222,410223,410224,410225,410300,410301,410302,410303,410304,410305,410306,410307,410322,410323,410324,410325,410326,410327,410328,410329,410381,410400,410401,410402,410403,410404,410411,410421,410422,410423,410425,410481,410482,410500,410501,410502,410503,410505,410506,410522,410523,410526,410527,410581,410600,410601,410602,410603,410611,410621,410622,410700,410701,410702,410703,410704,410711,410721,410724,410725,410726,410727,410728,410781,410782,410800,410801,410802,410803,410804,410811,410821,410822,410823,410825,410881,410882,410883,410900,410901,410902,410922,410923,410926,410927,410928,411000,411001,411002,411023,411024,411025,411081,411082,411100,411101,411102,411103,411104,411121,411122,411200,411201,411202,411221,411222,411224,411281,411282,411300,411301,411302,411303,411321,411322,411323,411324,411325,411326,411327,411328,411329,411330,411381,411400,411401,411402,411403,411421,411422,411423,411424,411425,411426,411481,411500,411501,411502,411503,411521,411522,411523,411524,411525,411526,411527,411528,411600,411601,411602,411621,411622,411623,411624,411625,411626,411627,411628,411681,411700,411701,411702,411721,411722,411723,411724,411725,411726,411727,411728,411729]\",\"title\":\"<span class=\\\"text-dep1\\\">浙江省</span> <span class=\\\"text-dep1\\\">安徽省</span> <span class=\\\"text-dep1\\\">福建省</span> <span class=\\\"text-dep1\\\">江西省</span> <span class=\\\"text-dep1\\\">山东省</span> <span class=\\\"text-dep1\\\">河南省</span>\",\"f_weight\":\"1000\",\"f_price\":\"5.00\",\"s_weight\":\"1000\",\"s_price\":\"5.00\"},{\"area\":\"[\\\"620000_620100_620101\\\",\\\"620000_620100_620102\\\",\\\"620000_620100_620103\\\",\\\"620000_620100_620104\\\",\\\"620000_620100_620105\\\",\\\"620000_620100_620111\\\",\\\"620000_620100_620121\\\",\\\"620000_620100_620122\\\",\\\"620000_620100_620123\\\",\\\"620000_620200_620201\\\",\\\"620000_620300_620301\\\",\\\"620000_620300_620302\\\",\\\"620000_620300_620321\\\",\\\"620000_620400_620401\\\",\\\"620000_620400_620402\\\",\\\"620000_620400_620403\\\",\\\"620000_620400_620421\\\",\\\"620000_620400_620422\\\",\\\"620000_620400_620423\\\",\\\"620000_620500_620501\\\",\\\"620000_620500_620502\\\",\\\"620000_620500_620503\\\",\\\"620000_620500_620521\\\",\\\"620000_620500_620522\\\",\\\"620000_620500_620523\\\",\\\"620000_620500_620524\\\",\\\"620000_620500_620525\\\",\\\"620000_620600_620601\\\",\\\"620000_620600_620602\\\",\\\"620000_620600_620621\\\",\\\"620000_620600_620622\\\",\\\"620000_620600_620623\\\",\\\"620000_620700_620701\\\",\\\"620000_620700_620702\\\",\\\"620000_620700_620721\\\",\\\"620000_620700_620722\\\",\\\"620000_620700_620723\\\",\\\"620000_620700_620724\\\",\\\"620000_620700_620725\\\",\\\"620000_620800_620801\\\",\\\"620000_620800_620802\\\",\\\"620000_620800_620821\\\",\\\"620000_620800_620822\\\",\\\"620000_620800_620823\\\",\\\"620000_620800_620824\\\",\\\"620000_620800_620825\\\",\\\"620000_620800_620826\\\",\\\"620000_620900_620901\\\",\\\"620000_620900_620902\\\",\\\"620000_620900_620921\\\",\\\"620000_620900_620922\\\",\\\"620000_620900_620923\\\",\\\"620000_620900_620924\\\",\\\"620000_620900_620981\\\",\\\"620000_620900_620982\\\",\\\"620000_621000_621001\\\",\\\"620000_621000_621002\\\",\\\"620000_621000_621021\\\",\\\"620000_621000_621022\\\",\\\"620000_621000_621023\\\",\\\"620000_621000_621024\\\",\\\"620000_621000_621025\\\",\\\"620000_621000_621026\\\",\\\"620000_621000_621027\\\",\\\"620000_621100_621101\\\",\\\"620000_621100_621102\\\",\\\"620000_621100_621121\\\",\\\"620000_621100_621122\\\",\\\"620000_621100_621123\\\",\\\"620000_621100_621124\\\",\\\"620000_621100_621125\\\",\\\"620000_621100_621126\\\",\\\"620000_621200_621201\\\",\\\"620000_621200_621202\\\",\\\"620000_621200_621221\\\",\\\"620000_621200_621222\\\",\\\"620000_621200_621223\\\",\\\"620000_621200_621224\\\",\\\"620000_621200_621225\\\",\\\"620000_621200_621226\\\",\\\"620000_621200_621227\\\",\\\"620000_621200_621228\\\",\\\"620000_622900_622901\\\",\\\"620000_622900_622921\\\",\\\"620000_622900_622922\\\",\\\"620000_622900_622923\\\",\\\"620000_622900_622924\\\",\\\"620000_622900_622925\\\",\\\"620000_622900_622926\\\",\\\"620000_622900_622927\\\",\\\"620000_623000_623001\\\",\\\"620000_623000_623021\\\",\\\"620000_623000_623022\\\",\\\"620000_623000_623023\\\",\\\"620000_623000_623024\\\",\\\"620000_623000_623025\\\",\\\"620000_623000_623026\\\",\\\"620000_623000_623027\\\",\\\"630000_630100_630101\\\",\\\"630000_630100_630102\\\",\\\"630000_630100_630103\\\",\\\"630000_630100_630104\\\",\\\"630000_630100_630105\\\",\\\"630000_630100_630121\\\",\\\"630000_630100_630122\\\",\\\"630000_630100_630123\\\",\\\"630000_632100_632121\\\",\\\"630000_632100_632122\\\",\\\"630000_632100_632123\\\",\\\"630000_632100_632126\\\",\\\"630000_632100_632127\\\",\\\"630000_632100_632128\\\",\\\"630000_632200_632221\\\",\\\"630000_632200_632222\\\",\\\"630000_632200_632223\\\",\\\"630000_632200_632224\\\",\\\"630000_632300_632321\\\",\\\"630000_632300_632322\\\",\\\"630000_632300_632323\\\",\\\"630000_632300_632324\\\",\\\"630000_632500_632521\\\",\\\"630000_632500_632522\\\",\\\"630000_632500_632523\\\",\\\"630000_632500_632524\\\",\\\"630000_632500_632525\\\",\\\"630000_632600_632621\\\",\\\"630000_632600_632622\\\",\\\"630000_632600_632623\\\",\\\"630000_632600_632624\\\",\\\"630000_632600_632625\\\",\\\"630000_632600_632626\\\",\\\"630000_632700_632721\\\",\\\"630000_632700_632722\\\",\\\"630000_632700_632723\\\",\\\"630000_632700_632724\\\",\\\"630000_632700_632725\\\",\\\"630000_632700_632726\\\",\\\"630000_632800_632801\\\",\\\"630000_632800_632802\\\",\\\"630000_632800_632821\\\",\\\"630000_632800_632822\\\",\\\"630000_632800_632823\\\",\\\"640000_640100_640101\\\",\\\"640000_640100_640104\\\",\\\"640000_640100_640105\\\",\\\"640000_640100_640106\\\",\\\"640000_640100_640121\\\",\\\"640000_640100_640122\\\",\\\"640000_640100_640181\\\",\\\"640000_640200_640201\\\",\\\"640000_640200_640202\\\",\\\"640000_640200_640205\\\",\\\"640000_640200_640221\\\",\\\"640000_640300_640301\\\",\\\"640000_640300_640302\\\",\\\"640000_640300_640323\\\",\\\"640000_640300_640324\\\",\\\"640000_640300_640381\\\",\\\"640000_640400_640401\\\",\\\"640000_640400_640402\\\",\\\"640000_640400_640422\\\",\\\"640000_640400_640423\\\",\\\"640000_640400_640424\\\",\\\"640000_640400_640425\\\",\\\"640000_640500_640501\\\",\\\"640000_640500_640502\\\",\\\"640000_640500_640521\\\",\\\"640000_640500_640522\\\",\\\"650000_650100_650101\\\",\\\"650000_650100_650102\\\",\\\"650000_650100_650103\\\",\\\"650000_650100_650104\\\",\\\"650000_650100_650105\\\",\\\"650000_650100_650106\\\",\\\"650000_650100_650107\\\",\\\"650000_650100_650108\\\",\\\"650000_650100_650121\\\",\\\"650000_650200_650201\\\",\\\"650000_650200_650202\\\",\\\"650000_650200_650203\\\",\\\"650000_650200_650204\\\",\\\"650000_650200_650205\\\",\\\"650000_652100_652101\\\",\\\"650000_652100_652122\\\",\\\"650000_652100_652123\\\",\\\"650000_652200_652201\\\",\\\"650000_652200_652222\\\",\\\"650000_652200_652223\\\",\\\"650000_652300_652301\\\",\\\"650000_652300_652302\\\",\\\"650000_652300_652303\\\",\\\"650000_652300_652323\\\",\\\"650000_652300_652324\\\",\\\"650000_652300_652325\\\",\\\"650000_652300_652327\\\",\\\"650000_652300_652328\\\",\\\"650000_652700_652701\\\",\\\"650000_652700_652722\\\",\\\"650000_652700_652723\\\",\\\"650000_652800_652801\\\",\\\"650000_652800_652822\\\",\\\"650000_652800_652823\\\",\\\"650000_652800_652824\\\",\\\"650000_652800_652825\\\",\\\"650000_652800_652826\\\",\\\"650000_652800_652827\\\",\\\"650000_652800_652828\\\",\\\"650000_652800_652829\\\",\\\"650000_652900_652901\\\",\\\"650000_652900_652922\\\",\\\"650000_652900_652923\\\",\\\"650000_652900_652924\\\",\\\"650000_652900_652925\\\",\\\"650000_652900_652926\\\",\\\"650000_652900_652927\\\",\\\"650000_652900_652928\\\",\\\"650000_652900_652929\\\",\\\"650000_653000_653001\\\",\\\"650000_653000_653022\\\",\\\"650000_653000_653023\\\",\\\"650000_653000_653024\\\",\\\"650000_653100_653101\\\",\\\"650000_653100_653121\\\",\\\"650000_653100_653122\\\",\\\"650000_653100_653123\\\",\\\"650000_653100_653124\\\",\\\"650000_653100_653125\\\",\\\"650000_653100_653126\\\",\\\"650000_653100_653127\\\",\\\"650000_653100_653128\\\",\\\"650000_653100_653129\\\",\\\"650000_653100_653130\\\",\\\"650000_653100_653131\\\",\\\"650000_653200_653201\\\",\\\"650000_653200_653221\\\",\\\"650000_653200_653222\\\",\\\"650000_653200_653223\\\",\\\"650000_653200_653224\\\",\\\"650000_653200_653225\\\",\\\"650000_653200_653226\\\",\\\"650000_653200_653227\\\",\\\"650000_654000_654002\\\",\\\"650000_654000_654003\\\",\\\"650000_654000_654021\\\",\\\"650000_654000_654022\\\",\\\"650000_654000_654023\\\",\\\"650000_654000_654024\\\",\\\"650000_654000_654025\\\",\\\"650000_654000_654026\\\",\\\"650000_654000_654027\\\",\\\"650000_654000_654028\\\",\\\"650000_654200_654201\\\",\\\"650000_654200_654202\\\",\\\"650000_654200_654221\\\",\\\"650000_654200_654223\\\",\\\"650000_654200_654224\\\",\\\"650000_654200_654225\\\",\\\"650000_654200_654226\\\",\\\"650000_654300_654301\\\",\\\"650000_654300_654321\\\",\\\"650000_654300_654322\\\",\\\"650000_654300_654323\\\",\\\"650000_654300_654324\\\",\\\"650000_654300_654325\\\",\\\"650000_654300_654326\\\",\\\"650000_659000_659001\\\",\\\"650000_659000_659002\\\",\\\"650000_659000_659003\\\",\\\"650000_659000_659004\\\",\\\"710000_710001_710002\\\",\\\"710000_710003_710004\\\"]\",\"selectarea\":\"[620000,620100,620101,620102,620103,620104,620105,620111,620121,620122,620123,620200,620201,620300,620301,620302,620321,620400,620401,620402,620403,620421,620422,620423,620500,620501,620502,620503,620521,620522,620523,620524,620525,620600,620601,620602,620621,620622,620623,620700,620701,620702,620721,620722,620723,620724,620725,620800,620801,620802,620821,620822,620823,620824,620825,620826,620900,620901,620902,620921,620922,620923,620924,620981,620982,621000,621001,621002,621021,621022,621023,621024,621025,621026,621027,621100,621101,621102,621121,621122,621123,621124,621125,621126,621200,621201,621202,621221,621222,621223,621224,621225,621226,621227,621228,622900,622901,622921,622922,622923,622924,622925,622926,622927,623000,623001,623021,623022,623023,623024,623025,623026,623027,630000,630100,630101,630102,630103,630104,630105,630121,630122,630123,632100,632121,632122,632123,632126,632127,632128,632200,632221,632222,632223,632224,632300,632321,632322,632323,632324,632500,632521,632522,632523,632524,632525,632600,632621,632622,632623,632624,632625,632626,632700,632721,632722,632723,632724,632725,632726,632800,632801,632802,632821,632822,632823,640000,640100,640101,640104,640105,640106,640121,640122,640181,640200,640201,640202,640205,640221,640300,640301,640302,640323,640324,640381,640400,640401,640402,640422,640423,640424,640425,640500,640501,640502,640521,640522,650000,650100,650101,650102,650103,650104,650105,650106,650107,650108,650121,650200,650201,650202,650203,650204,650205,652100,652101,652122,652123,652200,652201,652222,652223,652300,652301,652302,652303,652323,652324,652325,652327,652328,652700,652701,652722,652723,652800,652801,652822,652823,652824,652825,652826,652827,652828,652829,652900,652901,652922,652923,652924,652925,652926,652927,652928,652929,653000,653001,653022,653023,653024,653100,653101,653121,653122,653123,653124,653125,653126,653127,653128,653129,653130,653131,653200,653201,653221,653222,653223,653224,653225,653226,653227,654000,654002,654003,654021,654022,654023,654024,654025,654026,654027,654028,654200,654201,654202,654221,654223,654224,654225,654226,654300,654301,654321,654322,654323,654324,654325,654326,659000,659001,659002,659003,659004,710000,710001,710002,710003,710004]\",\"title\":\"<span class=\\\"text-dep1\\\">甘肃省</span> <span class=\\\"text-dep1\\\">青海省</span> <span class=\\\"text-dep1\\\">宁　夏</span> <span class=\\\"text-dep1\\\">新　疆</span> <span class=\\\"text-dep1\\\">台湾省</span>\",\"f_weight\":\"1000\",\"f_price\":\"8.00\",\"s_weight\":\"1000\",\"s_price\":\"9.00\"},{\"area\":\"[\\\"710000_710001_710002\\\"]\",\"selectarea\":\"[710000,710001,710002]\",\"title\":\"<span class=\\\"text-dep1\\\">台湾省</span> [ <span class=\\\"text-dep2\\\">台北市</span> ]\",\"f_weight\":\"1000\",\"f_price\":\"100.00\",\"s_weight\":\"1000\",\"s_price\":\"100.00\"},{\"area\":\"[\\\"120000_120100_120101\\\",\\\"120000_120100_120102\\\",\\\"120000_120100_120103\\\",\\\"120000_120100_120104\\\",\\\"120000_120100_120105\\\",\\\"120000_120100_120106\\\",\\\"120000_120100_120107\\\",\\\"120000_120100_120108\\\",\\\"120000_120100_120109\\\",\\\"120000_120100_120110\\\",\\\"120000_120100_120111\\\",\\\"120000_120100_120112\\\",\\\"120000_120100_120113\\\",\\\"120000_120100_120114\\\",\\\"120000_120100_120115\\\",\\\"120000_120200_120221\\\",\\\"120000_120200_120223\\\",\\\"120000_120200_120225\\\"]\",\"selectarea\":\"[120000,120100,120101,120102,120103,120104,120105,120106,120107,120108,120109,120110,120111,120112,120113,120114,120115,120200,120221,120223,120225]\",\"title\":\"<span class=\\\"text-dep1\\\">天津市</span>\",\"f_weight\":\"1000\",\"f_price\":\"5\",\"s_weight\":\"1000\",\"s_price\":\"5\"}]', '1');
INSERT INTO `cmswing_fare` VALUES ('2', '测试模板哈哈哈更新', '1000', '1000', '20.00', '15.00', '[{\"area\":\"[\\\"610000_610100_610101\\\",\\\"610000_610100_610102\\\",\\\"610000_610100_610103\\\",\\\"610000_610100_610104\\\",\\\"610000_610100_610111\\\",\\\"610000_610100_610112\\\",\\\"610000_610100_610113\\\",\\\"610000_610100_610114\\\",\\\"610000_610100_610115\\\",\\\"610000_610100_610116\\\",\\\"610000_610100_610122\\\",\\\"610000_610100_610124\\\",\\\"610000_610100_610125\\\",\\\"610000_610100_610126\\\",\\\"610000_610200_610201\\\",\\\"610000_610200_610202\\\",\\\"610000_610200_610203\\\",\\\"610000_610200_610204\\\",\\\"610000_610200_610222\\\",\\\"610000_610300_610301\\\",\\\"610000_610300_610302\\\",\\\"610000_610300_610303\\\",\\\"610000_610300_610304\\\",\\\"610000_610300_610322\\\",\\\"610000_610300_610323\\\",\\\"610000_610300_610324\\\",\\\"610000_610300_610326\\\",\\\"610000_610300_610327\\\",\\\"610000_610300_610328\\\",\\\"610000_610300_610329\\\",\\\"610000_610300_610330\\\",\\\"610000_610300_610331\\\",\\\"610000_610400_610401\\\",\\\"610000_610400_610402\\\",\\\"610000_610400_610403\\\",\\\"610000_610400_610404\\\",\\\"610000_610400_610422\\\",\\\"610000_610400_610423\\\",\\\"610000_610400_610424\\\",\\\"610000_610400_610425\\\",\\\"610000_610400_610426\\\",\\\"610000_610400_610427\\\",\\\"610000_610400_610428\\\",\\\"610000_610400_610429\\\",\\\"610000_610400_610430\\\",\\\"610000_610400_610431\\\",\\\"610000_610400_610481\\\",\\\"610000_610500_610501\\\",\\\"610000_610500_610502\\\",\\\"610000_610500_610521\\\",\\\"610000_610500_610522\\\",\\\"610000_610500_610523\\\",\\\"610000_610500_610524\\\",\\\"610000_610500_610525\\\",\\\"610000_610500_610526\\\",\\\"610000_610500_610527\\\",\\\"610000_610500_610528\\\",\\\"610000_610500_610581\\\",\\\"610000_610500_610582\\\",\\\"610000_610600_610601\\\",\\\"610000_610600_610602\\\",\\\"610000_610600_610621\\\",\\\"610000_610600_610622\\\",\\\"610000_610600_610623\\\",\\\"610000_610600_610624\\\",\\\"610000_610600_610625\\\",\\\"610000_610600_610626\\\",\\\"610000_610600_610627\\\",\\\"610000_610600_610628\\\",\\\"610000_610600_610629\\\",\\\"610000_610600_610630\\\",\\\"610000_610600_610631\\\",\\\"610000_610600_610632\\\",\\\"610000_610700_610701\\\",\\\"610000_610700_610702\\\",\\\"610000_610700_610721\\\",\\\"610000_610700_610722\\\",\\\"610000_610700_610723\\\",\\\"610000_610700_610724\\\",\\\"610000_610700_610725\\\",\\\"610000_610700_610726\\\",\\\"610000_610700_610727\\\",\\\"610000_610700_610728\\\",\\\"610000_610700_610729\\\",\\\"610000_610700_610730\\\",\\\"610000_610800_610801\\\",\\\"610000_610800_610802\\\",\\\"610000_610800_610821\\\",\\\"610000_610800_610822\\\",\\\"610000_610800_610823\\\",\\\"610000_610800_610824\\\",\\\"610000_610800_610825\\\",\\\"610000_610800_610826\\\",\\\"610000_610800_610827\\\",\\\"610000_610800_610828\\\",\\\"610000_610800_610829\\\",\\\"610000_610800_610830\\\",\\\"610000_610800_610831\\\",\\\"610000_610900_610901\\\",\\\"610000_610900_610902\\\",\\\"610000_610900_610921\\\",\\\"610000_610900_610922\\\",\\\"610000_610900_610923\\\",\\\"610000_610900_610924\\\",\\\"610000_610900_610925\\\",\\\"610000_610900_610926\\\",\\\"610000_610900_610927\\\",\\\"610000_610900_610928\\\",\\\"610000_610900_610929\\\",\\\"610000_611000_611001\\\",\\\"610000_611000_611002\\\",\\\"610000_611000_611021\\\",\\\"610000_611000_611022\\\",\\\"610000_611000_611023\\\",\\\"610000_611000_611024\\\",\\\"610000_611000_611025\\\",\\\"610000_611000_611026\\\"]\",\"selectarea\":\"[610000,610100,610101,610102,610103,610104,610111,610112,610113,610114,610115,610116,610122,610124,610125,610126,610200,610201,610202,610203,610204,610222,610300,610301,610302,610303,610304,610322,610323,610324,610326,610327,610328,610329,610330,610331,610400,610401,610402,610403,610404,610422,610423,610424,610425,610426,610427,610428,610429,610430,610431,610481,610500,610501,610502,610521,610522,610523,610524,610525,610526,610527,610528,610581,610582,610600,610601,610602,610621,610622,610623,610624,610625,610626,610627,610628,610629,610630,610631,610632,610700,610701,610702,610721,610722,610723,610724,610725,610726,610727,610728,610729,610730,610800,610801,610802,610821,610822,610823,610824,610825,610826,610827,610828,610829,610830,610831,610900,610901,610902,610921,610922,610923,610924,610925,610926,610927,610928,610929,611000,611001,611002,611021,611022,611023,611024,611025,611026]\",\"title\":\"<span class=\\\"text-dep1\\\">陕西省</span>\",\"f_weight\":\"1000\",\"f_price\":\"15.00\",\"s_weight\":\"1000\",\"s_price\":\"15.00\"},{\"area\":\"[\\\"510000_510300_510303\\\",\\\"510000_510400_510411\\\",\\\"520000_520100_520101\\\",\\\"520000_520100_520102\\\",\\\"520000_520100_520103\\\",\\\"520000_520100_520111\\\",\\\"520000_520100_520112\\\",\\\"520000_520100_520113\\\",\\\"520000_520100_520114\\\",\\\"520000_520100_520121\\\",\\\"520000_520100_520122\\\",\\\"520000_520100_520123\\\",\\\"520000_520100_520181\\\",\\\"520000_520200_520201\\\",\\\"520000_520200_520203\\\",\\\"520000_520200_520221\\\",\\\"520000_520200_520222\\\",\\\"520000_520300_520301\\\",\\\"520000_520300_520302\\\",\\\"520000_520300_520303\\\",\\\"520000_520300_520321\\\",\\\"520000_520300_520322\\\",\\\"520000_520300_520323\\\",\\\"520000_520300_520324\\\",\\\"520000_520300_520325\\\",\\\"520000_520300_520326\\\",\\\"520000_520300_520327\\\",\\\"520000_520300_520328\\\",\\\"520000_520300_520329\\\",\\\"520000_520300_520330\\\",\\\"520000_520300_520381\\\",\\\"520000_520300_520382\\\",\\\"520000_520400_520401\\\",\\\"520000_520400_520402\\\",\\\"520000_520400_520421\\\",\\\"520000_520400_520422\\\",\\\"520000_520400_520423\\\",\\\"520000_520400_520424\\\",\\\"520000_520400_520425\\\",\\\"520000_522200_522201\\\",\\\"520000_522200_522222\\\",\\\"520000_522200_522223\\\",\\\"520000_522200_522224\\\",\\\"520000_522200_522225\\\",\\\"520000_522200_522226\\\",\\\"520000_522200_522227\\\",\\\"520000_522200_522228\\\",\\\"520000_522200_522229\\\",\\\"520000_522200_522230\\\",\\\"520000_522300_522301\\\",\\\"520000_522300_522322\\\",\\\"520000_522300_522323\\\",\\\"520000_522300_522324\\\",\\\"520000_522300_522325\\\",\\\"520000_522300_522326\\\",\\\"520000_522300_522327\\\",\\\"520000_522300_522328\\\",\\\"520000_522400_522401\\\",\\\"520000_522400_522422\\\",\\\"520000_522400_522423\\\",\\\"520000_522400_522424\\\",\\\"520000_522400_522425\\\",\\\"520000_522400_522426\\\",\\\"520000_522400_522427\\\",\\\"520000_522400_522428\\\",\\\"520000_522600_522601\\\",\\\"520000_522600_522622\\\",\\\"520000_522600_522623\\\",\\\"520000_522600_522624\\\",\\\"520000_522600_522625\\\",\\\"520000_522600_522626\\\",\\\"520000_522600_522627\\\",\\\"520000_522600_522628\\\",\\\"520000_522600_522629\\\",\\\"520000_522600_522630\\\",\\\"520000_522600_522631\\\",\\\"520000_522600_522632\\\",\\\"520000_522600_522633\\\",\\\"520000_522600_522634\\\",\\\"520000_522600_522635\\\",\\\"520000_522600_522636\\\",\\\"520000_522700_522701\\\",\\\"520000_522700_522702\\\",\\\"520000_522700_522722\\\",\\\"520000_522700_522723\\\",\\\"520000_522700_522725\\\",\\\"520000_522700_522726\\\",\\\"520000_522700_522727\\\",\\\"520000_522700_522728\\\",\\\"520000_522700_522729\\\",\\\"520000_522700_522730\\\",\\\"520000_522700_522731\\\",\\\"520000_522700_522732\\\",\\\"530000_530100_530101\\\",\\\"530000_530100_530102\\\",\\\"530000_530100_530103\\\",\\\"530000_530100_530111\\\",\\\"530000_530100_530112\\\",\\\"530000_530100_530113\\\",\\\"530000_530100_530121\\\",\\\"530000_530100_530122\\\",\\\"530000_530100_530124\\\",\\\"530000_530100_530125\\\",\\\"530000_530100_530126\\\",\\\"530000_530100_530127\\\",\\\"530000_530100_530128\\\",\\\"530000_530100_530129\\\",\\\"530000_530100_530181\\\",\\\"530000_530300_530301\\\",\\\"530000_530300_530302\\\",\\\"530000_530300_530321\\\",\\\"530000_530300_530322\\\",\\\"530000_530300_530323\\\",\\\"530000_530300_530324\\\",\\\"530000_530300_530325\\\",\\\"530000_530300_530326\\\",\\\"530000_530300_530328\\\",\\\"530000_530300_530381\\\",\\\"530000_530400_530401\\\",\\\"530000_530400_530402\\\",\\\"530000_530400_530421\\\",\\\"530000_530400_530422\\\",\\\"530000_530400_530423\\\",\\\"530000_530400_530424\\\",\\\"530000_530400_530425\\\",\\\"530000_530400_530426\\\",\\\"530000_530400_530427\\\",\\\"530000_530400_530428\\\",\\\"530000_530500_530501\\\",\\\"530000_530500_530502\\\",\\\"530000_530500_530521\\\",\\\"530000_530500_530522\\\",\\\"530000_530500_530523\\\",\\\"530000_530500_530524\\\",\\\"530000_530600_530601\\\",\\\"530000_530600_530602\\\",\\\"530000_530600_530621\\\",\\\"530000_530600_530622\\\",\\\"530000_530600_530623\\\",\\\"530000_530600_530624\\\",\\\"530000_530600_530625\\\",\\\"530000_530600_530626\\\",\\\"530000_530600_530627\\\",\\\"530000_530600_530628\\\",\\\"530000_530600_530629\\\",\\\"530000_530600_530630\\\",\\\"530000_530700_530701\\\",\\\"530000_530700_530702\\\",\\\"530000_530700_530721\\\",\\\"530000_530700_530722\\\",\\\"530000_530700_530723\\\",\\\"530000_530700_530724\\\",\\\"530000_530800_530801\\\",\\\"530000_530800_530802\\\",\\\"530000_530800_530821\\\",\\\"530000_530800_530822\\\",\\\"530000_530800_530823\\\",\\\"530000_530800_530824\\\",\\\"530000_530800_530825\\\",\\\"530000_530800_530826\\\",\\\"530000_530800_530827\\\",\\\"530000_530800_530828\\\",\\\"530000_530800_530829\\\",\\\"530000_530900_530901\\\",\\\"530000_530900_530902\\\",\\\"530000_530900_530921\\\",\\\"530000_530900_530922\\\",\\\"530000_530900_530923\\\",\\\"530000_530900_530924\\\",\\\"530000_530900_530925\\\",\\\"530000_530900_530926\\\",\\\"530000_530900_530927\\\",\\\"530000_532300_532301\\\",\\\"530000_532300_532322\\\",\\\"530000_532300_532323\\\",\\\"530000_532300_532324\\\",\\\"530000_532300_532325\\\",\\\"530000_532300_532326\\\",\\\"530000_532300_532327\\\",\\\"530000_532300_532328\\\",\\\"530000_532300_532329\\\",\\\"530000_532300_532331\\\",\\\"530000_532500_532501\\\",\\\"530000_532500_532502\\\",\\\"530000_532500_532522\\\",\\\"530000_532500_532523\\\",\\\"530000_532500_532524\\\",\\\"530000_532500_532525\\\",\\\"530000_532500_532526\\\",\\\"530000_532500_532527\\\",\\\"530000_532500_532528\\\",\\\"530000_532500_532529\\\",\\\"530000_532500_532530\\\",\\\"530000_532500_532531\\\",\\\"530000_532500_532532\\\",\\\"530000_532600_532621\\\",\\\"530000_532600_532622\\\",\\\"530000_532600_532623\\\",\\\"530000_532600_532624\\\",\\\"530000_532600_532625\\\",\\\"530000_532600_532626\\\",\\\"530000_532600_532627\\\",\\\"530000_532600_532628\\\",\\\"530000_532800_532801\\\",\\\"530000_532800_532822\\\",\\\"530000_532800_532823\\\",\\\"530000_532900_532901\\\",\\\"530000_532900_532922\\\",\\\"530000_532900_532923\\\",\\\"530000_532900_532924\\\",\\\"530000_532900_532925\\\",\\\"530000_532900_532926\\\",\\\"530000_532900_532927\\\",\\\"530000_532900_532928\\\",\\\"530000_532900_532929\\\",\\\"530000_532900_532930\\\",\\\"530000_532900_532931\\\",\\\"530000_532900_532932\\\",\\\"530000_533100_533102\\\",\\\"530000_533100_533103\\\",\\\"530000_533100_533122\\\",\\\"530000_533100_533123\\\",\\\"530000_533100_533124\\\",\\\"530000_533300_533321\\\",\\\"530000_533300_533323\\\",\\\"530000_533300_533324\\\",\\\"530000_533300_533325\\\",\\\"530000_533400_533421\\\",\\\"530000_533400_533422\\\",\\\"530000_533400_533423\\\",\\\"540000_540100_540101\\\",\\\"540000_540100_540102\\\",\\\"540000_540100_540121\\\",\\\"540000_540100_540122\\\",\\\"540000_540100_540123\\\",\\\"540000_540100_540124\\\",\\\"540000_540100_540125\\\",\\\"540000_540100_540126\\\",\\\"540000_540100_540127\\\",\\\"540000_542100_542121\\\",\\\"540000_542100_542122\\\",\\\"540000_542100_542123\\\",\\\"540000_542100_542124\\\",\\\"540000_542100_542125\\\",\\\"540000_542100_542126\\\",\\\"540000_542100_542127\\\",\\\"540000_542100_542128\\\",\\\"540000_542100_542129\\\",\\\"540000_542100_542132\\\",\\\"540000_542100_542133\\\",\\\"540000_542200_542221\\\",\\\"540000_542200_542222\\\",\\\"540000_542200_542223\\\",\\\"540000_542200_542224\\\",\\\"540000_542200_542225\\\",\\\"540000_542200_542226\\\",\\\"540000_542200_542227\\\",\\\"540000_542200_542228\\\",\\\"540000_542200_542229\\\",\\\"540000_542200_542231\\\",\\\"540000_542200_542232\\\",\\\"540000_542200_542233\\\",\\\"540000_542300_542301\\\",\\\"540000_542300_542322\\\",\\\"540000_542300_542323\\\",\\\"540000_542300_542324\\\",\\\"540000_542300_542325\\\",\\\"540000_542300_542326\\\",\\\"540000_542300_542327\\\",\\\"540000_542300_542328\\\",\\\"540000_542300_542329\\\",\\\"540000_542300_542330\\\",\\\"540000_542300_542331\\\",\\\"540000_542300_542332\\\",\\\"540000_542300_542333\\\",\\\"540000_542300_542334\\\",\\\"540000_542300_542335\\\",\\\"540000_542300_542336\\\",\\\"540000_542300_542337\\\",\\\"540000_542300_542338\\\",\\\"540000_542400_542421\\\",\\\"540000_542400_542422\\\",\\\"540000_542400_542423\\\",\\\"540000_542400_542424\\\",\\\"540000_542400_542425\\\",\\\"540000_542400_542426\\\",\\\"540000_542400_542427\\\",\\\"540000_542400_542428\\\",\\\"540000_542400_542429\\\",\\\"540000_542400_542430\\\",\\\"540000_542500_542521\\\",\\\"540000_542500_542522\\\",\\\"540000_542500_542523\\\",\\\"540000_542500_542524\\\",\\\"540000_542500_542525\\\",\\\"540000_542500_542526\\\",\\\"540000_542500_542527\\\",\\\"540000_542600_542621\\\",\\\"540000_542600_542622\\\",\\\"540000_542600_542623\\\",\\\"540000_542600_542624\\\",\\\"540000_542600_542625\\\",\\\"540000_542600_542626\\\",\\\"540000_542600_542627\\\"]\",\"selectarea\":\"[510000,510300,510303,510400,510411,520000,520100,520101,520102,520103,520111,520112,520113,520114,520121,520122,520123,520181,520200,520201,520203,520221,520222,520300,520301,520302,520303,520321,520322,520323,520324,520325,520326,520327,520328,520329,520330,520381,520382,520400,520401,520402,520421,520422,520423,520424,520425,522200,522201,522222,522223,522224,522225,522226,522227,522228,522229,522230,522300,522301,522322,522323,522324,522325,522326,522327,522328,522400,522401,522422,522423,522424,522425,522426,522427,522428,522600,522601,522622,522623,522624,522625,522626,522627,522628,522629,522630,522631,522632,522633,522634,522635,522636,522700,522701,522702,522722,522723,522725,522726,522727,522728,522729,522730,522731,522732,530000,530100,530101,530102,530103,530111,530112,530113,530121,530122,530124,530125,530126,530127,530128,530129,530181,530300,530301,530302,530321,530322,530323,530324,530325,530326,530328,530381,530400,530401,530402,530421,530422,530423,530424,530425,530426,530427,530428,530500,530501,530502,530521,530522,530523,530524,530600,530601,530602,530621,530622,530623,530624,530625,530626,530627,530628,530629,530630,530700,530701,530702,530721,530722,530723,530724,530800,530801,530802,530821,530822,530823,530824,530825,530826,530827,530828,530829,530900,530901,530902,530921,530922,530923,530924,530925,530926,530927,532300,532301,532322,532323,532324,532325,532326,532327,532328,532329,532331,532500,532501,532502,532522,532523,532524,532525,532526,532527,532528,532529,532530,532531,532532,532600,532621,532622,532623,532624,532625,532626,532627,532628,532800,532801,532822,532823,532900,532901,532922,532923,532924,532925,532926,532927,532928,532929,532930,532931,532932,533100,533102,533103,533122,533123,533124,533300,533321,533323,533324,533325,533400,533421,533422,533423,540000,540100,540101,540102,540121,540122,540123,540124,540125,540126,540127,542100,542121,542122,542123,542124,542125,542126,542127,542128,542129,542132,542133,542200,542221,542222,542223,542224,542225,542226,542227,542228,542229,542231,542232,542233,542300,542301,542322,542323,542324,542325,542326,542327,542328,542329,542330,542331,542332,542333,542334,542335,542336,542337,542338,542400,542421,542422,542423,542424,542425,542426,542427,542428,542429,542430,542500,542521,542522,542523,542524,542525,542526,542527,542600,542621,542622,542623,542624,542625,542626,542627]\",\"title\":\"<span class=\\\"text-dep1\\\">四川省</span> [ <span class=\\\"text-dep2\\\">自贡市</span> ( <span class=\\\"text-dep3\\\">贡井区</span> ) <span class=\\\"text-dep2\\\">攀枝花市</span> ( <span class=\\\"text-dep3\\\">仁和区</span> ) ] <span class=\\\"text-dep1\\\">贵州省</span> <span class=\\\"text-dep1\\\">云南省</span> <span class=\\\"text-dep1\\\">西　藏</span>\",\"f_weight\":\"1000\",\"f_price\":\"30.00\",\"s_weight\":\"1000\",\"s_price\":\"30.00\"},{\"area\":\"[\\\"120000_120100_120101\\\",\\\"120000_120100_120102\\\",\\\"120000_120100_120103\\\",\\\"120000_120100_120104\\\",\\\"120000_120100_120105\\\",\\\"120000_120100_120106\\\",\\\"120000_120100_120107\\\",\\\"120000_120100_120108\\\",\\\"120000_120100_120109\\\",\\\"120000_120100_120110\\\",\\\"120000_120100_120111\\\",\\\"120000_120100_120112\\\",\\\"120000_120100_120113\\\",\\\"120000_120100_120114\\\",\\\"120000_120100_120115\\\",\\\"120000_120200_120221\\\",\\\"120000_120200_120223\\\",\\\"120000_120200_120225\\\"]\",\"selectarea\":\"[120000,120100,120101,120102,120103,120104,120105,120106,120107,120108,120109,120110,120111,120112,120113,120114,120115,120200,120221,120223,120225]\",\"title\":\"<span class=\\\"text-dep1\\\">天津市</span>\",\"f_weight\":\"1000\",\"f_price\":\"5\",\"s_weight\":\"1000\",\"s_price\":\"3\"}]', '0');
INSERT INTO `cmswing_fare` VALUES ('5', '全国包邮', '1000', '1000', '0.00', '0.00', '[]', '0');

-- ----------------------------
-- Table structure for cmswing_file
-- ----------------------------
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

-- ----------------------------
-- Records of cmswing_file
-- ----------------------------
INSERT INTO `cmswing_file` VALUES ('1', 'moban112.rar', '7oxGhtNhy1_e9VP2Ru4_mzaP.rar', '/upload/download/2015-12-28/', '', 'application/octet-stream', '592673', '2d2dde4c500f81674bd22c9a6338da7a', '', '0', '', '1451307240706');
INSERT INTO `cmswing_file` VALUES ('2', 'phpcms_v9.5.10_UTF8.zip', 'dO_l1-u7cEotnGzHhyTVzsSD.zip', '/upload/download/2015-12-28/', '', '\"application/octet-stream', '8723992', 'c42373e0aa56b52c9e8556e638fe6919', '', '0', '', '1451307241462');
INSERT INTO `cmswing_file` VALUES ('3', '悦蕾网设计文件.zip', 'm5Cui2KNThJXZh06idj9QVD4.zip', '/upload/download/2015-12-28/', '', '\"application/octet-stream', '20521434', 'f87ff613f19c83329445ffde24994b89', '', '0', '', '1451307242115');
INSERT INTO `cmswing_file` VALUES ('4', 'moban112.rar', 'ey3_2TwS5t0-PE1Oya_U4C6r.rar', '/upload/download/2015-12-28/', '', 'application/octet-stream', '592673', 'ab5d018ad9e839bbeb6e4eff04a38d1d', '', '0', '', '1451308335223');
INSERT INTO `cmswing_file` VALUES ('5', 'fex-team-webuploader-0.1.5-56-', 'sa7e06WygQCHs9iWStUoh88P.zip', '/upload/download/2015-12-28/', '', '\"application/octet-stream', '3703904', '889b7f0e638d0048d98d6f794073f58b', '', '0', '', '1451308989436');
INSERT INTO `cmswing_file` VALUES ('6', 'proui(1).rar', 'y-x_4UmVkUJ1X84d8A42OqSP.rar', '/upload/download/2015-12-28/', '', 'application/octet-stream', '7179376', '4744342697b42fa9a0027c4ca264321c', '', '0', '', '1451309847621');
INSERT INTO `cmswing_file` VALUES ('7', '1448609511220.tar.gz', 'MXuucSEw9QTLG5-H36jFLGul.gz', '/upload/download/2015-12-28/', '', 'application/gzip', '8113', '6b60a7131d182c7a97932e5a61d0d8db', '', '0', '', '1451310113941');

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
  `reg_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `reg_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '注册IP',
  `last_login_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `last_login_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '最后登录IP',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) DEFAULT '0' COMMENT '数据状态0禁用，1启用，-1删除',
  `is_admin` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0前台用户 1管理用户',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of cmswing_member
-- ----------------------------
INSERT INTO `cmswing_member` VALUES ('1', 'admin', '7fe293a2a8994cca42668d5a37747d4f', '680', 'arterli@qq.com', '204', '', '1452513965683', '0', '1460039777202', '3232235878', '0', '1', '1');
INSERT INTO `cmswing_member` VALUES ('2', 'cmswing', '877d01a63db292aadf94c7276a246781', '60', 'cmswing@cmswing.com', '53', '13571883577', '1458989485616', '0', '1460132477699', '3232235877', '0', '1', '0');
INSERT INTO `cmswing_member` VALUES ('3', 'test', '7fe293a2a8994cca42668d5a37747d4f', '0', 'test@cmswing.com', '0', '', '1458990106486', '0', '0', '0', '0', '1', '0');
INSERT INTO `cmswing_member` VALUES ('4', 'test1', '7fe293a2a8994cca42668d5a37747d4f', '0', 'test1@cmswing.com', '0', '', '1458990176636', '0', '0', '0', '0', '1', '0');
INSERT INTO `cmswing_member` VALUES ('5', 'user1', '7fe293a2a8994cca42668d5a37747d4f', '0', 'user1@cmswing.com', '0', '', '1458990710203', '0', '0', '0', '0', '1', '0');
INSERT INTO `cmswing_member` VALUES ('7', 'ddd', '7fe293a2a8994cca42668d5a37747d4f', '0', 'ddd@dfsd.com', '0', '', '1458993322584', '0', '0', '0', '0', '-1', '0');
INSERT INTO `cmswing_member` VALUES ('8', 'arterli', '7fe293a2a8994cca42668d5a37747d4f', '10', 'arterli1@qq.com', '1', '', '1458994740328', '0', '1458994930173', '2130706433', '0', '1', '1');
INSERT INTO `cmswing_member` VALUES ('9', 'cmswing.com', '7fe293a2a8994cca42668d5a37747d4f', '0', 'dsada@admin.com', '0', '', '1459707083913', '0', '0', '0', '0', '1', '0');

-- ----------------------------
-- Table structure for cmswing_member_public
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_member_public`;
CREATE TABLE `cmswing_member_public` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `uid` int(10) NOT NULL COMMENT '用户ID',
  `public_name` varchar(50) NOT NULL COMMENT '公众号名称',
  `public_id` varchar(100) NOT NULL COMMENT '公众号原始id',
  `wechat` varchar(100) NOT NULL COMMENT '微信号',
  `interface_url` varchar(255) DEFAULT NULL COMMENT '接口地址',
  `headface_url` varchar(255) DEFAULT NULL COMMENT '公众号头像',
  `area` varchar(50) DEFAULT NULL COMMENT '地区',
  `addon_config` text COMMENT '插件配置',
  `addon_status` text COMMENT '插件状态',
  `token` varchar(100) DEFAULT NULL COMMENT 'Token',
  `type` char(10) NOT NULL DEFAULT '0' COMMENT '公众号类型',
  `appid` varchar(255) NOT NULL COMMENT 'AppID',
  `secret` varchar(255) NOT NULL COMMENT 'AppSecret',
  `status` tinyint(4) DEFAULT '0' COMMENT '2：未审核，1:启用，0：禁用，-1：删除',
  `group_id` int(10) unsigned DEFAULT '0' COMMENT '等级',
  `encodingaeskey` varchar(255) DEFAULT NULL COMMENT 'EncodingAESKey',
  `mchid` varchar(50) NOT NULL COMMENT '商户号（微信支付必须配置）',
  `mchkey` varchar(50) NOT NULL COMMENT '商户支付密钥（微信支付必须配置）',
  `notify_url` varchar(255) DEFAULT NULL COMMENT '接收微信支付异步通知回调地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_member_public
-- ----------------------------
INSERT INTO `cmswing_member_public` VALUES ('1', '1', 'cmswing', 'gh_1dd1d1321b7c', 'cmswing', '', '', '', '', '', '', '3', '', '', '0', '0', '', '', '', '');
INSERT INTO `cmswing_member_public` VALUES ('4', '1', '432', '423', '423', null, null, null, null, null, null, '4', '4234', '4234', '1', '0', '423', '4234', '4234', null);

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
) ENGINE=MyISAM AUTO_INCREMENT=185 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_menu
-- ----------------------------
INSERT INTO `cmswing_menu` VALUES ('1', '首页', '0', '1', 'admin/index/index', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('2', '网站内容', '0', '2', 'article', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('3', '内容管理', '2', '0', 'admin/article/index', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('4', '新增', '3', '0', 'admin/article/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('5', '编辑', '3', '0', 'admin/article/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('6', '改变状态', '3', '0', 'admin/article/setStatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('7', '保存', '3', '0', 'admin/article/update', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('8', '保存草稿', '3', '0', 'admin/article/autoSave', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('9', '移动', '3', '0', 'admin/article/move', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('10', '复制', '3', '0', 'admin/article/copy', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('11', '粘贴', '3', '0', 'admin/article/paste', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('12', '导入', '3', '0', 'admin/article/batchOperate', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('13', '回收站', '2', '2', 'admin/article/recycle', '0', '', '1', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('14', '还原', '13', '0', 'article/permit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('15', '清空', '13', '0', 'article/clear', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('16', '用户管理', '0', '3', 'user', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('17', '用户信息', '16', '1', 'admin/user/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('18', '新增用户', '17', '0', 'admin/user/adduser', '0', '添加新用户', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('19', '用户行为', '16', '3', 'admin/action/index', '0', '', '3', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('43', '扩展', '0', '9', 'Addons/index', '0', '', '0', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('59', '新增', '58', '0', 'admin/model/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('60', '编辑', '58', '0', 'admin/model/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('61', '改变状态', '58', '0', 'admin/model/setstatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('62', '保存数据', '58', '0', 'admin/model/update', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('63', '属性管理', '68', '0', 'admin/attribute/index', '1', '网站属性配置。', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('64', '新增', '63', '0', 'admin/attribute/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('65', '编辑', '63', '0', 'admin/attribute/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('66', '改变状态', '63', '0', 'admin/attribute/setStatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('67', '保存数据', '63', '0', 'admin/attribute/update', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('68', '系统设置', '0', '8', 'setup', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('69', '网站设置', '68', '1', 'admin/setup/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('70', '配置管理', '68', '4', 'admin/setup/group', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('71', '编辑', '70', '0', 'admin/setup/edit', '0', '新增编辑和保存配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('72', '删除', '70', '0', 'admin/setup/del', '0', '删除配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('73', '新增', '70', '0', 'admin/setup/add', '0', '新增配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('74', '保存', '70', '0', 'admin/setup/save', '0', '保存配置', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('75', '菜单管理', '68', '5', 'admin/menu/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('76', '导航管理', '68', '6', 'admin/channel/index', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('77', '新增', '76', '0', 'admin/channel/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('78', '编辑', '76', '0', 'admin/channel/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('79', '删除', '76', '0', 'admin/channel/del', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('80', '分类管理', '2', '1', 'admin/category/index', '0', '', '1', '0', '1');
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
INSERT INTO `cmswing_menu` VALUES ('93', '其他', '0', '100', 'other', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('96', '新增', '75', '0', 'admin/menu/add', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('98', '编辑', '75', '0', 'admin/menu/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('106', '行为日志', '16', '4', 'admin/action/log', '0', '', '3', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('108', '修改密码', '16', '0', 'User/updatePassword', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('109', '修改昵称', '16', '0', 'User/updateNickname', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('110', '查看行为日志', '106', '0', 'action/edit', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('112', '新增数据', '58', '0', 'admin/cms/add', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('113', '编辑数据', '58', '0', 'admin/cms/edit', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('114', '导入', '75', '0', 'admin/menu/import', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('115', '生成', '58', '0', 'Model/generate', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('116', '新增钩子', '57', '0', 'Addons/addHook', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('117', '编辑钩子', '57', '0', 'Addons/edithook', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('118', '文档排序', '3', '0', 'admin/article/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('119', '排序', '70', '0', 'admin/setup/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('120', '排序', '75', '0', 'admin/menu/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('121', '排序', '76', '0', 'admin/channel/sort', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('122', '数据列表', '58', '0', 'admin/cms/list', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('123', '审核列表', '3', '0', 'admin/article/examine', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('127', '微信', '0', '7', 'admin/mpbase/index', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('128', '公共账号管理', '127', '0', 'admin/mpbase/seting', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('129', '群发消息', '127', '0', 'admin/mpbase/mass', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('130', '素材管理', '127', '0', 'admin/mpbase2/fodderlist', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('131', '微信用户管理', '127', '0', 'admin/mpbase/menu', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('155', '营销推广', '0', '4', 'promotion', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('133', '自动回复', '127', '0', 'admin/mpbase2/autoreply', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('134', '支付与配送', '0', '6', 'ecom', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('135', '支付方式', '134', '0', 'admin/ecom/payment', '1', '', '0', '1', '1');
INSERT INTO `cmswing_menu` VALUES ('136', '支付插件', '134', '0', 'admin/ecom/payplugin', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('137', '运费模板', '134', '0', 'admin/ecom/fare', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('138', '快递公司', '134', '0', 'admin/ecom/express', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('139', '订单中心', '0', '5', 'order', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('140', '订单管理', '139', '0', 'admin/order/list', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('141', '查看', '140', '0', 'admin/order/see', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('142', '单据管理', '139', '1', 'admin/order/receiving', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('143', '收款单', '142', '0', 'admin/order/receiving', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('144', '发货单', '142', '0', 'admin/order/invoice', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('145', '退款单', '142', '0', 'admin/order/refund', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('146', '添加运费模板', '137', '0', 'admin/ecom/addfare', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('147', '选择配送地区', '137', '0', 'admin/ecom/farearea', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('148', '自定义菜单', '127', '0', 'admin/mpbase2/custommenu', '0', '', '99', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('149', '编辑运费模板', '137', '0', 'admin/ecom/editfare', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('150', '删除运费模板', '137', '0', 'admin/ecom/delfare', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('151', '设置默认模板', '137', '0', 'admin/ecom/defaulffare', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('152', 'tags', '2', '3', 'admin/tags/index', '1', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('153', '添加tags（ajax）', '152', '0', 'admin/tags/ajaxaddtags', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('154', '获取tags（ajax）', '152', '0', 'admin/tags/ajaxgettags', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('156', '商品促销', '155', '0', 'admin/promotion/goods', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('157', '订单促销', '155', '0', 'admin/promotion/order', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('158', '捆绑销售', '155', '0', 'admin/promotion/bunding', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('159', '团购', '155', '0', 'admin/promotion/tuan', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('160', '限时抢购', '155', '0', 'admin/promotin/flash', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('161', '代金卷', '155', '0', 'admin/promotion/voucher', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('181', '完成', '140', '0', 'admin/order/finish', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('162', '获取用户列表（ajax）', '16', '0', 'admin/user/userlist', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('163', '删除用户', '17', '0', 'admin/user/userdel', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('164', '禁用用户', '17', '0', 'admin/user/chsta', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('165', '验证用户', '17', '0', 'admin/user/parsley', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('166', '会员充值', '16', '0', 'admin/user/recharge', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('167', '财务管理', '0', '7', 'finance', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('168', '财务日志', '167', '0', 'admin/finance/log', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('169', '提现申请', '167', '0', 'admin/finance/withdraw', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('170', '支付配置', '134', '0', 'admin/ecom/pingxx', '0', '', '2', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('171', '设置App_ID', '170', '0', 'admin/ecom/addappid', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('172', '设置Live Secret Key', '170', '0', 'admin/ecom/addlivesecretkey', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('173', '启用/禁用支付渠道', '170', '0', 'admin/ecom/setstatus', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('174', '审核', '140', '0', 'admin/order/audit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('175', '编辑', '140', '0', 'admin/order/edit', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('176', '发货', '140', '0', 'admin/order/ship', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('177', '设置商户私钥', '170', '0', 'admin/ecom/rsa', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('178', 'Webhooks配置', '170', '0', 'admin/ecom/webhokks', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('179', '修改网站设置', '69', '0', 'admin/setup/save', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('180', '上级菜单', '75', '0', 'admin/menu/getmenu', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('182', '作废', '140', '0', 'admin/order/void', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('183', '删除', '140', '0', 'admin/order/del', '0', '', '0', '0', '1');
INSERT INTO `cmswing_menu` VALUES ('184', '备注', '140', '0', 'admin/order/remark', '0', '', '0', '0', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='文档模型表';

-- ----------------------------
-- Records of cmswing_model
-- ----------------------------
INSERT INTO `cmswing_model` VALUES ('1', 'document', '基础模型', '0', '', '1', '{\"1\":[\"2\",\"3\",\"5\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"16\",\"17\",\"19\",\"20\"]}', '1:基础', '', '', '', '', '', 'id:编号\r\ntitle:标题:[EDIT]\r\ntype:类型\r\nupdate_time:最后更新\r\nstatus:状态\r\nview:浏览\r\nid:操作:[EDIT]|编辑,[DELETE]|删除', '0', '', '', '1449340764453', '1455680364521', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('2', 'article', '文章', '1', '', '1', '{\"1\":[\"2\",\"3\",\"5\",\"9\",\"12\",\"24\"],\"2\":[\"10\",\"11\",\"13\",\"14\",\"16\",\"17\",\"19\",\"20\",\"25\",\"26\"]}', '1:基础,2:扩展', '24,25,26,2,3,5,9,10,11,12,13,14,16,17,19,20', '', '', '', '', 'id:编号\r\ntitle:标题:[EDIT]\r\ntype:类型\r\nupdate_time:最后更新\r\nstatus:状态\r\nview:浏览\r\nid:操作:[EDIT]|编辑,[DELETE]|删除', '0', '', '', '1449340764453', '1453711249446', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('3', 'download', '下载', '1', '', '1', '{\"1\":[\"3\",\"28\",\"30\",\"32\",\"2\",\"5\",\"31\"],\"2\":[\"13\",\"10\",\"27\",\"9\",\"12\",\"16\",\"17\",\"19\",\"11\",\"20\",\"14\",\"29\"]}', '1:基础,2:扩展', '', '', '', '', '', '', '0', '', '', '1449340764453', '1387260449', '1', 'MyISAM');
INSERT INTO `cmswing_model` VALUES ('4', 'shop', '商品', '1', '', '1', '{\"1\":[\"3\",\"5\",\"65\",\"67\",\"85\",\"71\",\"81\"],\"2\":[\"63\",\"69\"],\"3\":[\"73\",\"75\",\"77\",\"79\"],\"4\":[\"2\",\"9\",\"10\",\"16\",\"19\"]}', '1:基本信息,2:库存/规格,3:其它设置,4:高级信息', '63,69,71,73,75,77,79,81,85,2,3,5,9,10,16,19,65,67', 'title:商品名称\r\npics:商品图片\r\ndescription:商品简介', '', '', '', 'id:编号\r\npics:商品图\r\ntitle:商品名称:[EDIT]\r\nprice|formatprice:价格\r\ntype:类型\r\nupdate_time:最后更新\r\nstatus:状态\r\ntotal_stock:总库存\r\nview:浏览量\r\nid:操作:[EDIT]|编辑,[DELETE]|删除', '9', '', '', '1455680338771', '1457779731207', '1', 'MyISAM');

-- ----------------------------
-- Table structure for cmswing_order
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_order`;
CREATE TABLE `cmswing_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `pay_code` varchar(255) DEFAULT NULL,
  `payment` bigint(20) NOT NULL,
  `express` bigint(20) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `pay_status` tinyint(1) DEFAULT '0',
  `delivery_status` tinyint(1) DEFAULT '0',
  `accept_name` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `province` bigint(20) DEFAULT NULL,
  `city` bigint(20) DEFAULT NULL,
  `county` bigint(20) DEFAULT NULL,
  `addr` varchar(250) DEFAULT NULL,
  `zip` varchar(6) DEFAULT NULL,
  `payable_amount` float(10,2) DEFAULT NULL,
  `real_amount` float(10,2) DEFAULT '0.00',
  `payable_freight` float(10,2) DEFAULT '0.00',
  `real_freight` float(10,2) DEFAULT '0.00',
  `pay_time` bigint(13) DEFAULT NULL,
  `send_time` bigint(13) DEFAULT NULL,
  `create_time` bigint(13) DEFAULT NULL,
  `completion_time` bigint(13) DEFAULT NULL,
  `user_remark` varchar(255) DEFAULT NULL,
  `admin_remark` varchar(255) DEFAULT NULL,
  `handling_fee` float(10,2) DEFAULT '0.00',
  `is_invoice` tinyint(1) DEFAULT '0',
  `invoice_title` varchar(100) DEFAULT NULL,
  `taxes` float(10,2) DEFAULT '0.00',
  `prom_id` bigint(20) DEFAULT '0',
  `prom` text,
  `discount_amount` float(10,2) DEFAULT '0.00',
  `adjust_amount` float(10,2) DEFAULT '0.00',
  `adjust_note` varchar(255) DEFAULT NULL,
  `order_amount` float(10,2) DEFAULT '0.00',
  `is_print` varchar(255) DEFAULT NULL,
  `accept_time` varchar(80) DEFAULT NULL,
  `point` int(5) unsigned DEFAULT '0',
  `voucher_id` bigint(20) DEFAULT '0',
  `voucher` text,
  `type` int(4) unsigned DEFAULT '0' COMMENT '0-商品订单，1充值订单。',
  `trading_info` varchar(255) DEFAULT NULL,
  `is_del` tinyint(1) DEFAULT '0',
  `pingxx_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_order
-- ----------------------------
INSERT INTO `cmswing_order` VALUES ('64', '1458908875350', '1', null, '100', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '102.00', '0.00', '0.00', null, null, '1458908875418', null, null, '889965', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '102.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('21', '1457418999074', '1', null, '1', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '1000158.00', '0.00', '8.00', null, null, '1457418999078', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '1000166.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('22', '1457428975714', '1', null, '1', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '100.00', '0.00', '8.00', null, null, '1457428975717', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '108.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('23', '1457440997809', '1', null, '1', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '167.00', '0.00', '8.00', null, null, '1457440997812', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '175.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('24', '1458309732036', '1', null, '1', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '400.00', '0.00', '8.00', null, null, '1458309732041', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '408.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('16', '1457325813256', '1', null, '1', null, '4', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '8.00', null, null, '1457325813262', null, null, '3243432432423', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '108.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('17', '1457331894714', '1', null, '5', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '8.00', null, null, '1457331894719', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '108.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('18', '1457334232440', '1', null, '1', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '167.00', '0.00', '8.00', null, null, '1457334232446', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '175.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('19', '1457334431289', '1', null, '1', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '100.00', '0.00', '8.00', null, null, '1457334431294', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '108.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('20', '1457347586722', '1', null, '5', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '1000091.00', '0.00', '8.00', null, null, '1457347586725', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '1000099.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('25', '1458310625384', '1', null, '1', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458310625403', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('26', '1458310708084', '1', null, '1', null, '6', '0', '0', '天津帅小伙', '', '18651569374', '120000', '120100', '120107', '六大街72号', '300021', null, '300.00', '0.00', '11.00', null, null, '1458310708098', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '311.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('27', '1458539992019', '1', null, '1', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '200.00', '0.00', '50.00', null, null, '1458539992030', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '250.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('28', '1458560809305', '1', null, '1', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458560809318', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('29', '1458629345234', '1', null, '1', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458629345244', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('30', '1458631948128', '1', null, '3', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458631948138', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('31', '1458640407305', '1', null, '1', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458640407318', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('32', '1458642571558', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458642571568', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('33', '1458646691243', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '200.00', '0.00', '35.00', null, null, '1458646691255', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '235.00', null, null, '0', '0', null, '0', null, '0', 'ch_LabX54m5C0iLmb54O8004u90');
INSERT INTO `cmswing_order` VALUES ('34', '1458647208025', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '400.00', '0.00', '65.00', null, null, '1458647208040', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '465.00', null, null, '0', '0', null, '0', null, '0', 'ch_Ti1q1GXTynX1Hm90e1LiffbH');
INSERT INTO `cmswing_order` VALUES ('35', '1458648110290', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '500.00', '0.00', '80.00', null, null, '1458648110304', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '580.00', null, null, '0', '0', null, '0', null, '0', 'ch_yfrbPS5OmnfLi9urH894aff9');
INSERT INTO `cmswing_order` VALUES ('36', '1458648723255', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '200.00', '0.00', '35.00', null, null, '1458648723265', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '235.00', null, null, '0', '0', null, '0', null, '0', 'ch_CWT4KG5aHCyD1evrXP94Wb1O');
INSERT INTO `cmswing_order` VALUES ('37', '1458650267855', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458650267864', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_9qj1S0GSqLy1XjfPuHSun9mL');
INSERT INTO `cmswing_order` VALUES ('38', '1458705413038', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458705413048', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_jzDeT4Sen5WDSanDePOyzLW5');
INSERT INTO `cmswing_order` VALUES ('39', '1458709512153', '1', null, '1', null, '3', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458709512201', null, null, 'fsdfdsfdsf', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('40', '1458710819350', '1', null, '1', null, '3', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '300.00', '0.00', '50.00', null, null, '1458710819361', null, null, '1111111111111111111111111111', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '350.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('41', '1458711271423', '1', null, '1', null, '3', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458711271438', null, null, 'sdfdsfgsdgsfdg', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('42', '1458711501948', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458711501999', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_SaL8iLzzP8eL0mzDyPu5mLqL');
INSERT INTO `cmswing_order` VALUES ('43', '1458719186371', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458719186385', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_OG0G04bzbb54uDiDCCu5abD0');
INSERT INTO `cmswing_order` VALUES ('44', '1458719949142', '1', null, '2', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '200.00', '0.00', '35.00', null, null, '1458719949157', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '235.00', null, null, '0', '0', null, '0', null, '0', 'ch_0GefbDSez90OrjLKaHLOmDaH');
INSERT INTO `cmswing_order` VALUES ('45', '1458720588109', '1', null, '2', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458720588123', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_nHK4C4SafjbLqf18yHiXPy9S');
INSERT INTO `cmswing_order` VALUES ('46', '1458721355060', '1', null, '3', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458721355074', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_Cu9Kq9PG8mf9e9GCW9zvbT0K');
INSERT INTO `cmswing_order` VALUES ('47', '1458721606032', '1', null, '4', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458721606047', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '6.00', '66', '126.00', null, null, '0', '0', null, '0', null, '0', 'ch_58iXrPajjn5Oy10KWL4y9K4C');
INSERT INTO `cmswing_order` VALUES ('48', '1458722092073', '1', null, '4', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458722092093', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '5.00', '454545', '125.00', null, null, '0', '0', null, '0', null, '0', 'ch_bfLKK8e9qP8Sij5aP4T8CCS0');
INSERT INTO `cmswing_order` VALUES ('49', '1458722260981', '1', null, '1', null, '3', '0', '1', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '200.00', '0.00', '35.00', null, null, '1458722260995', null, null, 'trtrete', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '235.00', null, null, '0', '0', null, '0', null, '0', 'ch_5Guf50yTWPW5uz5q94mTePW1');
INSERT INTO `cmswing_order` VALUES ('50', '1458722471373', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458722471387', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_vzXTaLXnHib99GGOaDCer9G0');
INSERT INTO `cmswing_order` VALUES ('51', '1458722540719', '1', null, '4', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458722540733', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_WzDKiPezvfnHu1yHe9GSiHGO');
INSERT INTO `cmswing_order` VALUES ('52', '1458725553803', '1', null, '1001', null, '6', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458725553817', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '10.00', '1545456', '130.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('53', '1458726487158', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458726487173', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_iTKaTGC08SiPSu5Sm9yXDOOG');
INSERT INTO `cmswing_order` VALUES ('54', '1458727412291', '1', null, '100', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458727412305', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('55', '1458728497615', '1', null, '100', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458728497629', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('56', '1458728609828', '1', null, '100', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '200.00', '0.00', '35.00', null, null, '1458728609843', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '235.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('57', '1458730678452', '1', null, '1', null, '6', '0', '0', '隔壁老王', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '100.00', '0.00', '20.00', null, null, '1458730678465', null, null, '作废哈哈哈', '0.00', '0', null, '0.00', '0', null, '0.00', '-10.00', '再调整回来吧', '110.00', null, null, '0', '0', null, '0', null, '0', 'ch_bj18u5O4ibXLWbzLWPaPSuvD');
INSERT INTO `cmswing_order` VALUES ('58', '1458730897758', '1', null, '1', null, '4', '0', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '1.00', '0.00', '20.00', null, null, '1458730897772', null, null, '8888', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '21.00', null, null, '0', '0', null, '0', null, '0', 'ch_90OGuHLCWjjLDa9WnP1KSOK8');
INSERT INTO `cmswing_order` VALUES ('60', '1458731841800', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '1.00', '0.00', '0.00', null, null, '1458731841808', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '1.00', null, null, '0', '0', null, '0', null, '0', 'ch_bz5uH0SOyXTOSS8u5Oq1m5mL');
INSERT INTO `cmswing_order` VALUES ('61', '1458732177288', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '1.00', '0.00', '0.00', null, null, '1458732177295', null, null, '12321312fdsfsdfgdsgsgsgds', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '1.00', null, null, '0', '0', null, '0', null, '0', 'ch_rLKCGKO0C4m5CKe1G04GK0iD');
INSERT INTO `cmswing_order` VALUES ('62', '1458788592715', '1', null, '1', null, '3', '1', '0', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '1.00', '0.00', '0.00', null, null, '1458788592728', null, null, '完成订单备注测试', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '1.00', null, null, '0', '0', null, '0', null, '0', 'ch_avH44Gu5Civ5S8i10SOy50iH');
INSERT INTO `cmswing_order` VALUES ('63', '1458798049251', '1', null, '4', null, '3', '1', '1', '晓飞 宁', '13589100475', '13589100333', '370000', '370100', '370102', '山东省ddddddd', '250000', null, '1.00', '0.00', '0.00', null, null, '1458798049268', null, '8888888888888888888', '997842', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '1.00', null, null, '0', '0', null, '0', null, '0', 'ch_S04ynH8Kafv59KCK0KnjnbTG');
INSERT INTO `cmswing_order` VALUES ('68', '1459074816900', '2', null, '1', null, '3', '1', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '60.00', '0.00', '30.00', '1459075539', null, '1459074816907', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '90.00', null, null, '0', '0', null, '0', null, '0', 'ch_vr9enHH4u5aPWfzTSSb1mbLO');
INSERT INTO `cmswing_order` VALUES ('66', '1459070488150', '2', null, '1', null, '3', '1', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '100.00', '0.00', '30.00', null, null, '1459070488158', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '130.00', null, null, '0', '0', null, '0', null, '0', 'ch_9OK8qPHKiHCKOS08KSbTifzH');
INSERT INTO `cmswing_order` VALUES ('67', '1459071640873', '2', null, '100', null, '3', '1', '0', '郭德纲', '', '12345678901', '120000', '120100', '120102', 'fdsafasfdsfsdfdsf', '710065', null, '100.00', '0.00', '5.00', null, null, '1459071640880', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '105.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('69', '1459075824252', '2', null, '1', null, '3', '1', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '90.00', '0.00', '30.00', '1459075840000', null, '1459075824263', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_Da1KG8yHeXXHeTyrnDfLiD0C');
INSERT INTO `cmswing_order` VALUES ('70', '1459076012912', '2', null, '1', null, '3', '1', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '90.00', '0.00', '30.00', '1459076030000', null, '1459076012920', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '120.00', null, null, '0', '0', null, '0', null, '0', 'ch_TanXj1aj5uvTjPOm54erLG00');
INSERT INTO `cmswing_order` VALUES ('71', '1459078418658', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '60.00', '0.00', '30.00', null, null, '1459078418670', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '90.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('72', 'd21459078464821', '2', null, '1', null, '3', '1', '1', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '200.00', '0.00', '30.00', '1459078482000', null, '1459078464830', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '230.00', null, null, '0', '0', null, '0', null, '0', 'ch_yvzLu50ezHaLeHK8WPbXvnX5');
INSERT INTO `cmswing_order` VALUES ('73', 'd21459262767895', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '4.00', '0.00', '120.00', null, null, '1459262767903', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '124.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('74', 'd21459269259683', '2', null, '100', null, '4', '1', '1', '郭德纲', '', '12345678901', '120000', '120100', '120102', 'fdsafasfdsfsdfdsf', '710065', null, '100.00', '0.00', '5.00', null, null, '1459269259689', null, null, 'dsf', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '105.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('75', 'd21459278525943', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '200.00', '0.00', '60.00', null, null, '1459278525952', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '260.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('76', 'd21459370456454', '2', null, '1', null, '3', '1', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '324.00', '0.00', '90.00', '1459370533000', null, '1459370456463', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '414.00', null, null, '0', '0', null, '0', null, '0', 'ch_ufbLOCeXrz1894WLS0f98aTS');
INSERT INTO `cmswing_order` VALUES ('77', 'd21459370800480', '2', null, '1001', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '80.00', '0.00', '30.00', null, null, '1459370800487', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '110.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('78', 'd21459399093766', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '436.00', '0.00', '120.00', null, null, '1459399093777', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '556.00', null, null, '0', '0', null, '0', null, '0', 'ch_080C4K4q1iTCnznXXHaLynPC');
INSERT INTO `cmswing_order` VALUES ('79', 'd21459418382332', '2', null, '100', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '7308.00', '0.00', '60.00', null, null, '1459418382343', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '7368.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('80', 'd21459445701105', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '400.00', '0.00', '120.00', null, null, '1459445701114', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '520.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('81', 'd21459456031568', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '160.00', '0.00', '30.00', null, null, '1459456031575', null, null, '规定时间未付款系统自动作废', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '190.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('82', 'd21459456211388', '2', null, '1', null, '6', '0', '0', '多啦A梦', '0298888888', '18681841347', '610000', '610100', '610113', '高新路王座国际3号楼8单元 308号', '710065', null, '160.00', '0.00', '30.00', null, null, '1459456211397', null, null, 'ddd', '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '190.00', null, null, '0', '0', null, '0', null, '1', null);
INSERT INTO `cmswing_order` VALUES ('96', 'c21459667126179', '2', null, '1', null, '2', '0', '0', null, null, null, null, null, null, null, null, null, '0.00', '0.00', '0.00', null, null, '1459667126179', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '145.00', null, null, '0', '0', null, '1', null, '0', 'ch_mvXbP0qHerDGmPqzbTT00azD');
INSERT INTO `cmswing_order` VALUES ('97', 'd21459668472437', '2', null, '1', null, '3', '1', '0', '郭德纲', '', '12345678901', '120000', '120100', '120102', 'fdsafasfdsfsdfdsf', '710065', null, '14398.00', '0.00', '5.00', '1459668480000', null, '1459668472448', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '14403.00', null, null, '0', '0', null, '0', null, '0', 'ch_Oa1qDOOO8GaLWbPGS4KuzfL0');
INSERT INTO `cmswing_order` VALUES ('100', 'd21459960112184', '2', null, '1', null, '3', '1', '0', '郭德纲', null, '18688888888', '110000', '110100', '110102', '北京德云社吗一路金子一号', '10001', null, '7199.00', '0.00', '30.00', '1459960109000', null, '1459960112192', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '7229.00', null, null, '0', '0', null, '0', null, '0', 'ch_b50OGG0K8KiTG88CGOqjjnjL');
INSERT INTO `cmswing_order` VALUES ('101', 'd21460127833818', '2', null, '1', null, '2', '0', '0', '郭德纲', null, '18688888888', '110000', '110100', '110102', '北京德云社吗一路金子一号', '10001', null, '17084.00', '0.00', '60.00', null, null, '1460127833826', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '17144.00', null, null, '0', '0', null, '0', null, '0', null);
INSERT INTO `cmswing_order` VALUES ('102', 'd21460131928917', '2', null, '1', null, '2', '0', '0', '郭德纲', null, '18688888888', '110000', '110100', '110102', '北京德云社吗一路金子一号', '10001', null, '10016.00', '0.00', '30.00', null, null, '1460131928926', null, null, null, '0.00', '0', null, '0.00', '0', null, '0.00', '0.00', null, '10046.00', null, null, '0', '0', null, '0', null, '0', null);

-- ----------------------------
-- Table structure for cmswing_order_goods
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_order_goods`;
CREATE TABLE `cmswing_order_goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL,
  `goods_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `goods_price` float(10,2) DEFAULT '0.00',
  `real_price` float(10,2) DEFAULT '0.00',
  `goods_nums` int(11) DEFAULT '1',
  `goods_weight` float DEFAULT '0',
  `shipments` int(11) DEFAULT '0',
  `prom_goods` text,
  `spec` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_order_goods
-- ----------------------------
INSERT INTO `cmswing_order_goods` VALUES ('3', '3', '16', '56', '49.00', '49.00', '1', '200', '0', 'a:3:{s:10:\"real_price\";s:5:\"49.00\";s:4:\"note\";s:0:\"\";s:5:\"minus\";s:2:\"-0\";}', 'a:2:{i:2;a:6:{s:2:\"id\";s:1:\"2\";s:4:\"name\";s:6:\"颜色\";s:5:\"value\";a:4:{i:0;s:2:\"10\";i:1;s:6:\"红色\";i:2;s:6:\"红色\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:12:\"基本颜色\";s:6:\"is_del\";s:1:\"0\";}i:6;a:6:{s:2:\"id\";s:1:\"6\";s:4:\"name\";s:6:\"尺码\";s:5:\"value\";a:4:{i:0;s:2:\"46\";i:1;s:2:\"XL\";i:2;s:2:\"XL\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:6:\"女式\";s:6:\"is_del\";s:1:\"0\";}}');
INSERT INTO `cmswing_order_goods` VALUES ('4', '3', '20', '114', '45.00', '45.00', '1', '200', '0', 'a:3:{s:10:\"real_price\";s:5:\"45.00\";s:4:\"note\";s:0:\"\";s:5:\"minus\";s:2:\"-0\";}', 'a:2:{i:2;a:6:{s:2:\"id\";s:1:\"2\";s:4:\"name\";s:6:\"颜色\";s:5:\"value\";a:4:{i:0;s:1:\"5\";i:1;s:6:\"白色\";i:2;s:6:\"白色\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:12:\"基本颜色\";s:6:\"is_del\";s:1:\"0\";}i:6;a:6:{s:2:\"id\";s:1:\"6\";s:4:\"name\";s:6:\"尺码\";s:5:\"value\";a:4:{i:0;s:2:\"44\";i:1;s:1:\"M\";i:2;s:1:\"M\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:6:\"女式\";s:6:\"is_del\";s:1:\"0\";}}');
INSERT INTO `cmswing_order_goods` VALUES ('5', '4', '17', '68', '55.00', '55.00', '3', '200', '0', 'a:3:{s:10:\"real_price\";s:5:\"55.00\";s:4:\"note\";s:0:\"\";s:5:\"minus\";s:2:\"-0\";}', 'a:2:{i:2;a:6:{s:2:\"id\";s:1:\"2\";s:4:\"name\";s:6:\"颜色\";s:5:\"value\";a:4:{i:0;s:1:\"5\";i:1;s:6:\"白色\";i:2;s:6:\"白色\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:12:\"基本颜色\";s:6:\"is_del\";s:1:\"0\";}i:6;a:6:{s:2:\"id\";s:1:\"6\";s:4:\"name\";s:6:\"尺码\";s:5:\"value\";a:4:{i:0;s:2:\"45\";i:1;s:1:\"L\";i:2;s:1:\"L\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:6:\"女式\";s:6:\"is_del\";s:1:\"0\";}}');
INSERT INTO `cmswing_order_goods` VALUES ('6', '5', '19', '105', '49.00', '49.00', '2', '200', '0', 'a:3:{s:10:\"real_price\";s:5:\"49.00\";s:4:\"note\";s:0:\"\";s:5:\"minus\";s:2:\"-0\";}', 'a:2:{i:2;a:6:{s:2:\"id\";s:1:\"2\";s:4:\"name\";s:6:\"颜色\";s:5:\"value\";a:4:{i:0;s:1:\"5\";i:1;s:6:\"白色\";i:2;s:6:\"白色\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:12:\"基本颜色\";s:6:\"is_del\";s:1:\"0\";}i:6;a:6:{s:2:\"id\";s:1:\"6\";s:4:\"name\";s:6:\"尺码\";s:5:\"value\";a:4:{i:0;s:2:\"42\";i:1;s:2:\"XS\";i:2;s:2:\"XS\";i:3;s:0:\"\";}s:4:\"type\";s:1:\"1\";s:4:\"note\";s:6:\"女式\";s:6:\"is_del\";s:1:\"0\";}}');
INSERT INTO `cmswing_order_goods` VALUES ('16', '13', '68', null, '100.00', '0.00', '1', '0', '0', '{\"id\":100,\"uid\":1,\"product_id\":68,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品多个商品图\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg\",\"url\":\"/detail/68\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('15', '12', '69', null, '167.00', '0.00', '1', '0', '0', '{\"id\":98,\"uid\":1,\"product_id\":69,\"qty\":1,\"type\":\"红色,M\",\"price\":167,\"title\":\"测试商品多个规格相同价格\",\"unit_price\":167,\"pic\":\"/upload/picture/2016-02-26/y3ZiHNl29kiNmnWtdJi87gxd.jpg\",\"url\":\"/detail/69\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('17', '14', '68', null, '100.00', '0.00', '1', '0', '0', '{\"id\":102,\"uid\":1,\"product_id\":68,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品多个商品图\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg\",\"url\":\"/detail/68\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('18', '15', '66', null, '100.00', '0.00', '1', '0', '0', '{\"id\":103,\"uid\":1,\"product_id\":66,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品的长度测试商品的长度测试商品的长度测试商品的长度测试商品的长度\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/5ZoCC1EvrqSaHRar81MYZtgC.jpg\",\"url\":\"/detail/66\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('19', '16', '66', null, '100.00', '0.00', '1', '0', '0', '{\"id\":105,\"uid\":1,\"product_id\":66,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品的长度测试商品的长度测试商品的长度测试商品的长度测试商品的长度\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/5ZoCC1EvrqSaHRar81MYZtgC.jpg\",\"url\":\"/detail/66\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('20', '17', '66', null, '100.00', '0.00', '1', '0', '0', '{\"id\":106,\"uid\":1,\"product_id\":66,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品的长度测试商品的长度测试商品的长度测试商品的长度测试商品的长度\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/5ZoCC1EvrqSaHRar81MYZtgC.jpg\",\"url\":\"/detail/66\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('21', '18', '69', null, '167.00', '0.00', '1', '0', '0', '{\"id\":107,\"uid\":1,\"product_id\":69,\"qty\":1,\"type\":\"红色,M\",\"price\":167,\"title\":\"测试商品多个规格相同价格\",\"unit_price\":167,\"pic\":\"/upload/picture/2016-02-26/y3ZiHNl29kiNmnWtdJi87gxd.jpg\",\"url\":\"/detail/69\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('22', '19', '68', null, '100.00', '0.00', '1', '0', '0', '{\"id\":108,\"uid\":1,\"product_id\":68,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品多个商品图\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg\",\"url\":\"/detail/68\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('23', '20', '65', null, '999991.00', '0.00', '1', '0', '0', '{\"id\":109,\"uid\":1,\"product_id\":65,\"qty\":1,\"type\":\"M,红色\",\"price\":999991,\"title\":\"测试商品的价格长度\",\"unit_price\":999991,\"pic\":\"/upload/picture/2016-02-25/GaaxWzxUQukhVipP1cPoFA7b.jpg\",\"url\":\"/detail/65\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('24', '20', '68', null, '100.00', '0.00', '1', '0', '0', '{\"id\":110,\"uid\":1,\"product_id\":68,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品多个商品图\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg\",\"url\":\"/detail/68\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('25', '21', '65', null, '999991.00', '0.00', '1', '0', '0', '{\"id\":111,\"uid\":1,\"product_id\":65,\"qty\":1,\"type\":\"M,红色\",\"price\":999991,\"title\":\"测试商品的价格长度\",\"unit_price\":999991,\"pic\":\"/upload/picture/2016-02-25/GaaxWzxUQukhVipP1cPoFA7b.jpg\",\"url\":\"/detail/65\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('26', '21', '69', null, '167.00', '0.00', '1', '0', '0', '{\"id\":112,\"uid\":1,\"product_id\":69,\"qty\":1,\"type\":\"红色,M\",\"price\":167,\"title\":\"测试商品多个规格相同价格\",\"unit_price\":167,\"pic\":\"/upload/picture/2016-02-26/y3ZiHNl29kiNmnWtdJi87gxd.jpg\",\"url\":\"/detail/69\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('27', '22', '68', null, '100.00', '0.00', '1', '0', '0', '{\"id\":113,\"uid\":1,\"product_id\":68,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品多个商品图\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg\",\"url\":\"/detail/68\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('28', '23', '69', null, '167.00', '0.00', '1', '0', '0', '{\"id\":114,\"uid\":1,\"product_id\":69,\"qty\":1,\"type\":\"红色,M\",\"price\":167,\"title\":\"测试商品多个规格相同价格\",\"unit_price\":167,\"pic\":\"/upload/picture/2016-02-26/y3ZiHNl29kiNmnWtdJi87gxd.jpg\",\"url\":\"/detail/69\"}', null);
INSERT INTO `cmswing_order_goods` VALUES ('29', '24', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":13,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('30', '24', '81', null, '100.00', '0.00', '2', '0', '0', '{\"id\":14,\"uid\":1,\"product_id\":81,\"qty\":2,\"type\":\"鬼地方,tt,895\",\"price\":200,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('31', '24', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":15,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('32', '25', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":17,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('33', '26', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":21,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,mm,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('34', '26', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":22,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"dsdf,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('35', '26', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":23,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('36', '27', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":25,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"dsdf,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('37', '27', '81', null, '100.00', '0.00', '2', '0', '0', '{\"id\":26,\"uid\":1,\"product_id\":81,\"qty\":2,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('38', '28', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":27,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('39', '29', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":28,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('40', '30', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":29,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('41', '31', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":30,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('42', '32', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":31,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('43', '33', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":33,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"dsdf,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('44', '33', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":34,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('45', '34', '81', null, '100.00', '0.00', '3', '0', '0', '{\"id\":40,\"uid\":1,\"product_id\":81,\"qty\":3,\"type\":\"fdsf,mm,8541\",\"price\":300,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('46', '34', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":41,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('47', '35', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":52,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('48', '35', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":53,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"dsdf,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('49', '35', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":54,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('50', '35', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":55,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('51', '35', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":56,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('52', '36', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":58,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,tt,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('53', '36', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":59,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('54', '37', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":60,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('55', '38', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":61,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('56', '39', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":62,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('57', '40', '81', null, '100.00', '0.00', '3', '0', '0', '{\"id\":65,\"uid\":1,\"product_id\":81,\"qty\":3,\"type\":\"鬼地方,mm,9856\",\"price\":300,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('58', '41', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":66,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('59', '42', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":67,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('60', '43', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":68,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('61', '44', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":70,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('62', '44', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":71,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('63', '45', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":72,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('64', '46', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":73,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('65', '47', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":74,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('66', '48', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":75,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('67', '49', '81', null, '100.00', '0.00', '2', '0', '0', '{\"id\":77,\"uid\":1,\"product_id\":81,\"qty\":2,\"type\":\"鬼地方,mm,9856\",\"price\":200,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('68', '50', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":78,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('69', '51', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":79,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('70', '52', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":80,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('71', '53', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":81,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('72', '54', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":82,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('73', '55', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":83,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('74', '56', '81', null, '100.00', '0.00', '2', '0', '0', '{\"id\":85,\"uid\":1,\"product_id\":81,\"qty\":2,\"type\":\"鬼地方,mm,9856\",\"price\":200,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('75', '57', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":86,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('76', '58', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":87,\"uid\":1,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('77', '59', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":88,\"uid\":1,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('78', '60', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":89,\"uid\":1,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('79', '61', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":90,\"uid\":1,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('80', '62', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":91,\"uid\":1,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('81', '63', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":92,\"uid\":1,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('82', '64', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":97,\"uid\":1,\"product_id\":81,\"qty\":1,\"type\":\"dsdf,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('83', '64', '84', null, '1.00', '0.00', '2', '0', '0', '{\"id\":98,\"uid\":1,\"product_id\":84,\"qty\":2,\"type\":\"红,xl\",\"price\":2,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('84', '65', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":103,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,mm,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('85', '65', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":104,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,mm,9856\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('86', '65', '81', null, '100.00', '0.00', '2', '0', '0', '{\"id\":105,\"uid\":2,\"product_id\":81,\"qty\":2,\"type\":\"鬼地方,mm,9856\",\"price\":200,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('87', '66', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":106,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('88', '67', '68', null, '100.00', '0.00', '1', '0', '0', '{\"id\":107,\"uid\":2,\"product_id\":68,\"qty\":1,\"type\":\"\",\"price\":100,\"title\":\"测试商品多个商品图\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg\",\"url\":\"/detail/68\",\"weight\":0}', null);
INSERT INTO `cmswing_order_goods` VALUES ('89', '68', '70', null, '60.00', '0.00', '1', '0', '0', '{\"id\":108,\"uid\":2,\"product_id\":70,\"qty\":1,\"type\":\"紫不溜秋,特别肥\",\"price\":60,\"title\":\"测试商品多规格多价格\",\"unit_price\":60,\"pic\":\"/upload/picture/2016-02-26/PCQbaNF7m06EHWmXnMu7cYXE.jpg\",\"url\":\"/detail/70\",\"weight\":0}', null);
INSERT INTO `cmswing_order_goods` VALUES ('90', '69', '70', null, '90.00', '0.00', '1', '0', '0', '{\"id\":109,\"uid\":2,\"product_id\":70,\"qty\":1,\"type\":\"黄了吧唧,特别肥\",\"price\":90,\"title\":\"测试商品多规格多价格\",\"unit_price\":90,\"pic\":\"/upload/picture/2016-02-26/PCQbaNF7m06EHWmXnMu7cYXE.jpg\",\"url\":\"/detail/70\",\"weight\":0}', null);
INSERT INTO `cmswing_order_goods` VALUES ('91', '70', '70', null, '90.00', '0.00', '1', '0', '0', '{\"id\":110,\"uid\":2,\"product_id\":70,\"qty\":1,\"type\":\"黄了吧唧,特别肥\",\"price\":90,\"title\":\"测试商品多规格多价格\",\"unit_price\":90,\"pic\":\"/upload/picture/2016-02-26/PCQbaNF7m06EHWmXnMu7cYXE.jpg\",\"url\":\"/detail/70\",\"weight\":0}', null);
INSERT INTO `cmswing_order_goods` VALUES ('92', '71', '70', null, '60.00', '0.00', '1', '0', '0', '{\"id\":112,\"uid\":2,\"product_id\":70,\"qty\":1,\"type\":\"紫不溜秋,特别肥\",\"price\":60,\"title\":\"测试商品多规格多价格\",\"unit_price\":60,\"pic\":\"/upload/picture/2016-02-26/PCQbaNF7m06EHWmXnMu7cYXE.jpg\",\"url\":\"/detail/70\",\"weight\":0}', null);
INSERT INTO `cmswing_order_goods` VALUES ('93', '72', '70', null, '200.00', '0.00', '1', '0', '0', '{\"id\":113,\"uid\":2,\"product_id\":70,\"qty\":1,\"type\":\"黄了吧唧,相当肥\",\"price\":200,\"title\":\"测试商品多规格多价格\",\"unit_price\":200,\"pic\":\"/upload/picture/2016-02-26/PCQbaNF7m06EHWmXnMu7cYXE.jpg\",\"url\":\"/detail/70\",\"weight\":0}', null);
INSERT INTO `cmswing_order_goods` VALUES ('94', '73', '84', null, '1.00', '0.00', '2', '0', '0', '{\"id\":124,\"uid\":2,\"product_id\":84,\"qty\":2,\"type\":\"白,xl\",\"price\":2,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('95', '73', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":125,\"uid\":2,\"product_id\":84,\"qty\":1,\"type\":\"红,xl\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('96', '73', '84', null, '1.00', '0.00', '1', '0', '0', '{\"id\":126,\"uid\":2,\"product_id\":84,\"qty\":1,\"type\":\"白,m\",\"price\":1,\"title\":\"在线支付测试测试\",\"unit_price\":1,\"pic\":\"/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg\",\"url\":\"/detail/84\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('97', '74', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":127,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('98', '75', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":129,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"fdsf,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('99', '75', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":130,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('100', '76', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":4,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"fdsf,mm\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/BTkU6TMSzk7tlmFSL8sICHNv.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('101', '76', '85', null, '108.00', '0.00', '1', '0', '0', '{\"id\":5,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"黄色,m\",\"price\":108,\"title\":\"测试商品规格图片1\",\"unit_price\":108,\"pic\":\"/upload/picture/2016-03-31/G38y0D3wRA6J83bVMZ30eway.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('102', '76', '85', null, '107.00', '0.00', '1', '0', '0', '{\"id\":6,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"红色,xl\",\"price\":107,\"title\":\"测试商品规格图片1\",\"unit_price\":107,\"pic\":\"/upload/picture/2016-03-31/9Ik_-eBoXrhS0zGu7ld9b-fE.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('103', '77', '86', null, '80.00', '0.00', '1', '0', '0', '{\"id\":7,\"uid\":2,\"product_id\":86,\"qty\":1,\"type\":\"\",\"price\":80,\"title\":\"单sku商品测试\",\"unit_price\":80,\"pic\":\"/upload/picture/2016-03-31/ErEe3cnsbIfuJPkrz1Gjmkto.jpg\",\"url\":\"/detail/86\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('104', '78', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":8,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"fdsf,mm\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/BTkU6TMSzk7tlmFSL8sICHNv.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('105', '78', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":9,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"绿色,mm\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/BirA5X6nNaDjzXeFKQEs8V5w.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('106', '78', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":10,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"黄色,mm\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/G38y0D3wRA6J83bVMZ30eway.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('107', '78', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":11,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"红色,mm\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/9Ik_-eBoXrhS0zGu7ld9b-fE.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('108', '79', '87', null, '7199.00', '0.00', '1', '0', '0', '{\"id\":12,\"uid\":2,\"product_id\":87,\"qty\":1,\"type\":\"[推荐]18-140&35 1.8G（人像）\",\"price\":7199,\"title\":\"系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色\",\"unit_price\":7199,\"pic\":\"/upload/picture/2016-03-31/WH_vpPQS7nOxQDXdDD8RnK3k.jpg\",\"url\":\"/detail/87\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('109', '79', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":13,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"红色,mm\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/9Ik_-eBoXrhS0zGu7ld9b-fE.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('110', '80', '81', null, '100.00', '0.00', '2', '0', '0', '{\"id\":17,\"uid\":2,\"product_id\":81,\"qty\":2,\"type\":\"鬼地方,tt,9856\",\"price\":200,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('111', '80', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":18,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,tt,8541\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('112', '80', '81', null, '100.00', '0.00', '1', '0', '0', '{\"id\":19,\"uid\":2,\"product_id\":81,\"qty\":1,\"type\":\"鬼地方,mm,895\",\"price\":100,\"title\":\"测试商品重量包邮\",\"unit_price\":100,\"pic\":\"/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg\",\"url\":\"/detail/81\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('113', '81', '86', null, '80.00', '0.00', '2', '0', '0', '{\"id\":21,\"uid\":2,\"product_id\":86,\"qty\":2,\"type\":\"\",\"price\":160,\"title\":\"单sku商品测试\",\"unit_price\":80,\"pic\":\"/upload/picture/2016-03-31/ErEe3cnsbIfuJPkrz1Gjmkto.jpg\",\"url\":\"/detail/86\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('114', '82', '86', null, '80.00', '0.00', '2', '0', '0', '{\"id\":22,\"uid\":2,\"product_id\":86,\"qty\":2,\"type\":\"\",\"price\":160,\"title\":\"单sku商品测试\",\"unit_price\":80,\"pic\":\"/upload/picture/2016-03-31/ErEe3cnsbIfuJPkrz1Gjmkto.jpg\",\"url\":\"/detail/86\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('115', '97', '87', null, '7199.00', '0.00', '2', '0', '0', '{\"id\":2,\"uid\":2,\"product_id\":87,\"qty\":2,\"type\":\"[推荐]18-140&35 1.8G（人像）\",\"price\":14398,\"title\":\"系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色\",\"unit_price\":7199,\"pic\":\"/upload/picture/2016-03-31/WH_vpPQS7nOxQDXdDD8RnK3k.jpg\",\"url\":\"/detail/87\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('116', '100', '87', null, '7199.00', '0.00', '2', '0', '0', '{\"id\":3,\"uid\":2,\"product_id\":87,\"qty\":2,\"type\":\"[推荐]18-140&35 1.8G（人像）\",\"price\":7199,\"title\":\"系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色\",\"unit_price\":7199,\"pic\":\"/upload/picture/2016-03-31/WH_vpPQS7nOxQDXdDD8RnK3k.jpg\",\"url\":\"/detail/87\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('117', '101', '87', null, '7199.00', '0.00', '1', '0', '0', '{\"id\":7,\"uid\":2,\"product_id\":87,\"qty\":1,\"type\":\"[推荐]18-140&35 1.8G（人像）\",\"price\":7199,\"title\":\"系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色\",\"unit_price\":7199,\"pic\":\"/upload/picture/2016-03-31/WH_vpPQS7nOxQDXdDD8RnK3k.jpg\",\"url\":\"/detail/87\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('118', '101', '85', null, '109.00', '0.00', '1', '0', '0', '{\"id\":8,\"uid\":2,\"product_id\":85,\"qty\":1,\"type\":\"fdsf,m\",\"price\":109,\"title\":\"测试商品规格图片1\",\"unit_price\":109,\"pic\":\"/upload/picture/2016-03-31/BTkU6TMSzk7tlmFSL8sICHNv.jpg\",\"url\":\"/detail/85\",\"weight\":1000}', null);
INSERT INTO `cmswing_order_goods` VALUES ('119', '101', '88', null, '4888.00', '0.00', '1', '0', '0', '{\"id\":9,\"uid\":2,\"product_id\":88,\"qty\":1,\"type\":\"星钻黑,S7移动定制4G\",\"price\":4888,\"title\":\"三星 Galaxy S7（G9300）32G版  移动联通电信4G手机 双卡双待 骁龙820手机\",\"unit_price\":4888,\"pic\":\"/upload/picture/2016-03-31/wZK3Lc7NWkByRnwdGUK29VqP.jpg\",\"url\":\"/detail/88\",\"weight\":100}', null);
INSERT INTO `cmswing_order_goods` VALUES ('120', '101', '88', null, '4888.00', '0.00', '1', '0', '0', '{\"id\":10,\"uid\":2,\"product_id\":88,\"qty\":1,\"type\":\"铂光金,S7全网通\",\"price\":4888,\"title\":\"三星 Galaxy S7（G9300）32G版  移动联通电信4G手机 双卡双待 骁龙820手机\",\"unit_price\":4888,\"pic\":\"/upload/picture/2016-03-31/QcTrSKlA8EiaxeQvI144kYwa.jpg\",\"url\":\"/detail/88\",\"weight\":100}', null);
INSERT INTO `cmswing_order_goods` VALUES ('121', '102', '87', null, '5128.00', '0.00', '1', '0', '0', '{\"id\":12,\"uid\":2,\"product_id\":87,\"qty\":1,\"type\":\"50 1.8D\",\"price\":5128,\"title\":\"系统测试：尼康（Nikon） D7100 单反双镜头套机（18-140mmf/3.5-5.6G 镜头 + DX 35mm f/1.8G自动对焦镜头）黑色\",\"unit_price\":5128,\"pic\":\"/upload/picture/2016-03-31/WH_vpPQS7nOxQDXdDD8RnK3k.jpg\",\"url\":\"/detail/87\",\"weight\":500}', null);
INSERT INTO `cmswing_order_goods` VALUES ('122', '102', '88', null, '4888.00', '0.00', '1', '0', '0', '{\"id\":13,\"uid\":2,\"product_id\":88,\"qty\":1,\"type\":\"雪晶白,S7移动定制4G\",\"price\":4888,\"title\":\"三星 Galaxy S7（G9300）32G版  移动联通电信4G手机 双卡双待 骁龙820手机\",\"unit_price\":4888,\"pic\":\"/upload/picture/2016-03-31/BsjXxab1pS1KPtNVOSIPFzef.jpg\",\"url\":\"/detail/88\",\"weight\":100}', null);

-- ----------------------------
-- Table structure for cmswing_order_log
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_order_log`;
CREATE TABLE `cmswing_order_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `user` varchar(20) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `result` varchar(10) DEFAULT NULL,
  `note` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_order_log
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_payment
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_payment`;
CREATE TABLE `cmswing_payment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `plugin_id` varchar(32) NOT NULL,
  `pay_name` varchar(100) NOT NULL,
  `config` text,
  `client_type` int(1) DEFAULT '0',
  `description` text,
  `note` text,
  `pay_fee` float(10,2) DEFAULT '0.00',
  `fee_type` tinyint(1) DEFAULT '0',
  `sort` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '0' COMMENT '0禁用，1启用，-1删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_payment
-- ----------------------------
INSERT INTO `cmswing_payment` VALUES ('1', '1', '预存款支付', '{\"partner_id\":\"456456456\",\"partner_key\":\"456546464\"}', '2', '预存款是客户在您网站上的虚拟资金帐户。', '', '0.00', '1', '1', '1');
INSERT INTO `cmswing_payment` VALUES ('5', '5', '腾讯财付通', '{\"partner_id\":\"635645645\",\"partner_key\":\"64565464564\"}', '2', '<p>费率最低至<span style=\"color: #FF0000;font-weight: bold;\">0.61%</span>，并赠送价值千元企业QQ <a style=\"color:blue\" href=\"http://union.tenpay.com/mch/mch_register.shtml\" target=\"_blank\">立即申请</a></p>', '<p>111215855<br/></p>', '15.00', '1', '3', '1');
INSERT INTO `cmswing_payment` VALUES ('7', '7', '货到付款', '{\"partner_id\":\"1115555\",\"partner_key\":\"22224445\"}', '0', '<p>客户收到商品时，再进行付款，让客户更放心。</p>', '<p>2121321<br/></p>', '0.00', '1', '0', '1');
INSERT INTO `cmswing_payment` VALUES ('8', '5', '腾讯财付通8888', '{\"partner_id\":\"56546\",\"partner_key\":\"5465465466\"}', '0', '<p>费率最低至<span style=\"color: #FF0000;font-weight: bold;\">0.61%</span>，并赠送价值千元企业QQ <a style=\"color:blue\" href=\"http://union.tenpay.com/mch/mch_register.shtml\" target=\"_blank\">立即申请</a></p>', '<p>6546546</p>', '0.00', '1', '0', '1');

-- ----------------------------
-- Table structure for cmswing_pay_plugin
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_pay_plugin`;
CREATE TABLE `cmswing_pay_plugin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `class_name` varchar(30) NOT NULL,
  `description` text,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_pay_plugin
-- ----------------------------
INSERT INTO `cmswing_pay_plugin` VALUES ('1', '预存款支付', 'balance', '预存款是客户在您网站上的虚拟资金帐户。', '/static/admin/img/payments/logos/pay_deposit.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('5', '腾讯财付通', 'tenpay', '费率最低至<span style=\"color: #FF0000;font-weight: bold;\">0.61%</span>，并赠送价值千元企业QQ <a style=\"color:blue\" href=\"http://union.tenpay.com/mch/mch_register.shtml\" target=\"_blank\">立即申请</a>', '/static/admin/img/payments/logos/pay_tenpay.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('2', '支付宝[担保交易]', 'alipaytrad', '淘宝买家最熟悉的付款方式：买家先将交易资金存入支付宝并通知卖家发货，买家确认收货后资金自动进入卖家支付宝账户，完成交易 <a style=\"color:blue\" href=\"https://b.alipay.com/order/productDetail.htm?productId=2012111200373121\" target=\"_blank\">立即申请</a>', '/static/admin/img//payments/logos/pay_alipaytrad.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('3', '支付宝[双向接口]', 'alipay', '买家付款时，可选择担保交易或即时到账中的任一支付方式进行付款，完成交易。<a style=\"color:blue\" href=\"https://b.alipay.com/order/productDetail.htm?productId=2012111300373136\" target=\"_blank\">立即申请</a>', '/static/admin/img//payments/logos/pay_alipay.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('6', 'PayPal', 'paypal', 'PayPal 是全球最大的在线支付平台，同时也是目前全球贸易网上支付标准。', '/static/admin/img//payments/logos/pay_paypal.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('4', '支付宝[即时到帐]', 'alipaydirect', '网上交易时，买家的交易资金直接打入卖家支付宝账户，快速回笼交易资金。 <a style=\"color:blue\" href=\"https://b.alipay.com/order/productDetail.htm?productId=2012111200373124\" target=\"_blank\">立即申请</a>', '/static/admin/img//payments/logos/pay_alipay.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('7', '货到付款', 'received', '客户收到商品时，再进行付款，让客户更放心。', '/static/admin/img//payments/logos/pay_received.gif');
INSERT INTO `cmswing_pay_plugin` VALUES ('8', '支付宝[银行支付]', 'alipaygateway', null, '/static/admin/img//payments/logos/pay_alipay.gif');

-- ----------------------------
-- Table structure for cmswing_picture
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_picture`;
CREATE TABLE `cmswing_picture` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id自增',
  `path` varchar(255) NOT NULL DEFAULT '' COMMENT '路径',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '图片链接',
  `md5` char(32) NOT NULL DEFAULT '' COMMENT '文件md5',
  `sha1` char(40) NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `type` int(2) DEFAULT '0' COMMENT '图片来源，或模块区分 1:微信',
  `source_id` varchar(255) DEFAULT '' COMMENT '来源id，当关联其他平台时该平台生产的id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=216 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_picture
-- ----------------------------
INSERT INTO `cmswing_picture` VALUES ('1', '/Uploads/Picture/2015-12-25/567cf54a36ea6.png', '', 'f3eaa6c12a36de8a052d1d77cd9dc1e1', 'd4a24c871be2dc3be7607d3102b42523b1f4a683', '1', '1451029834', null, null);
INSERT INTO `cmswing_picture` VALUES ('2', '/Uploads/Picture/2015-12-25/567d3a8788fe6.png', '', 'ca283b4bfceaf203177b9e9acf3241c3', '9ff89de6ae933c3b0de83652c101fb1b284e0d65', '1', '1451047559', null, null);
INSERT INTO `cmswing_picture` VALUES ('3', '/upload/picture/2015-12-25/rbLGp9vjY1DemXO0DRY7JzVT.png', '', '', '', '1', '1451051924514', null, null);
INSERT INTO `cmswing_picture` VALUES ('4', '/upload/picture/2015-12-25/2sSUNAWwQ-yPaPS9boIcBY2K.jpg', '', '', '', '1', '1451051961775', null, null);
INSERT INTO `cmswing_picture` VALUES ('5', '/upload/picture/2015-12-25/1KlWY4ut1DqYl6bmX_DoQ6B1.png', '', '', '', '1', '1451052022238', null, null);
INSERT INTO `cmswing_picture` VALUES ('6', '/upload/picture/2015-12-25/4HLlzNvjnlyUnKY8X6Y-U6h1.jpg', '', '', '', '1', '1451052030761', null, null);
INSERT INTO `cmswing_picture` VALUES ('7', '/upload/picture/2015-12-25/gax_wWo9sZR-JZ_b0DBiugta.jpg', '', '', '', '1', '1451052354530', null, null);
INSERT INTO `cmswing_picture` VALUES ('8', '/upload/picture/2015-12-25/NZ4-YBz5LHnCqp2sqDFwIfWs.png', '', '', '', '1', '1451052483035', null, null);
INSERT INTO `cmswing_picture` VALUES ('9', '/upload/picture/2015-12-26/BUNOS_nHpdGFKtdZvYKDRQ49.png', '', '', '', '1', '1451110257877', null, null);
INSERT INTO `cmswing_picture` VALUES ('10', '/upload/picture/2015-12-26/VD4YVQCeo2mvRJ_KkMGYHKSW.png', '', '', '', '1', '1451110401131', null, null);
INSERT INTO `cmswing_picture` VALUES ('11', '/upload/picture/2015-12-28/eoBllez-pPPyHe1Lj-pWxr7W.jpg', '', '', '', '1', '1451301404071', null, null);
INSERT INTO `cmswing_picture` VALUES ('12', '/upload/picture/2015-12-28/_K9Z1B2lCgpRsXhRou2dwdlg.jpg', '', '', '', '1', '1451303946844', null, null);
INSERT INTO `cmswing_picture` VALUES ('13', '/upload/picture/2015-12-28/rk4XLHU1fZ_XsS1YA6atoOWB.jpg', '', '', '', '1', '1451303973834', null, null);
INSERT INTO `cmswing_picture` VALUES ('14', '/upload/picture/2015-12-28/9keT7MphBbnHeWjHIIqRaXdj.jpg', '', '', '', '1', '1451307702105', null, null);
INSERT INTO `cmswing_picture` VALUES ('15', '/upload/picture/2015-12-28/FlgennevswlBDjJUcr0RtRTP.jpg', '', '', '', '1', '1451307713630', null, null);
INSERT INTO `cmswing_picture` VALUES ('16', '/upload/picture/2015-12-28/otYhAIEH88KXND-CWLYB-Vbc.png', '', '', '', '1', '1451309044762', null, null);
INSERT INTO `cmswing_picture` VALUES ('17', '/upload/picture/2015-12-29/eSiieCg7cLbJClblvYeklqF7.jpg', '', '', '', '1', '1451395596202', null, null);
INSERT INTO `cmswing_picture` VALUES ('18', '/upload/picture/2015-12-30/dR7zwL2u8nMHxkpmJLDH-6Ht.png', '', '', '', '1', '1451464802409', null, null);
INSERT INTO `cmswing_picture` VALUES ('19', '/upload/picture/2016-01-04/G5cGMPq8xeUIPmAIli83-HdK.png', '', '', '', '1', '1451878852719', null, null);
INSERT INTO `cmswing_picture` VALUES ('20', '/upload/picture/2016-01-13/9TLUUw6FONF2lLRLwMknhzLN.png', '', '', '', '1', '1452690230397', null, null);
INSERT INTO `cmswing_picture` VALUES ('21', '/upload/picture/2016-01-15/QqIiJShMeQ_EpAI_ebRZdXfq.png', '', '', '', '1', '1452839151989', null, null);
INSERT INTO `cmswing_picture` VALUES ('22', '/upload/picture/2016-01-15/H0axv1GKpLYhrnDTye86lZxV.png', '', '', '', '1', '1452839162017', null, null);
INSERT INTO `cmswing_picture` VALUES ('23', '/upload/picture/2016-01-15/9sUsetciafo39OXxRz4mxlru.png', '', '', '', '1', '1452839189799', null, null);
INSERT INTO `cmswing_picture` VALUES ('24', '/upload/picture/2016-01-15/YlshdvV8jGEdn4RvLFxlzGRS.png', '', '', '', '1', '1452839942254', null, null);
INSERT INTO `cmswing_picture` VALUES ('25', '/upload/picture/2016-01-15/Hho7m8ZiOpsvTOX6qX2i2oPq.png', '', '', '', '1', '1452840007315', null, null);
INSERT INTO `cmswing_picture` VALUES ('26', '/upload/picture/2016-01-15/Tlp9bAaVOO1ytcJ-2tz9cZl9.png', '', '', '', '1', '1452840130366', null, null);
INSERT INTO `cmswing_picture` VALUES ('27', '/upload/picture/2016-01-15/I6NNoG58d-FYJfWV2eUhe7iJ.png', '', '', '', '1', '1452840489639', null, null);
INSERT INTO `cmswing_picture` VALUES ('28', '/upload/picture/2016-01-16/LkPB5Z4AZfaGtMoVVbJwqzMW.jpg', '', '', '', '1', '1452919474738', null, null);
INSERT INTO `cmswing_picture` VALUES ('29', '/upload/picture/2016-01-16/FCkGU9Nteynkd6k6Vxj98Llq.JPG', '', '', '', '1', '1452919524092', null, null);
INSERT INTO `cmswing_picture` VALUES ('30', '/upload/picture/2016-01-16/uDdVHERiQP9HSPeVV1BBehm-.jpg', '', '', '', '1', '1452919681703', null, null);
INSERT INTO `cmswing_picture` VALUES ('31', '/upload/picture/2016-01-16/B6s5nw1H4ia9AzxC5tXjU7MV.png', '', '', '', '1', '1452919791633', null, null);
INSERT INTO `cmswing_picture` VALUES ('32', '/upload/picture/2016-01-16/4AUwAgwK0MM_McU6tZYQuG5H.png', '', '', '', '1', '1452920302896', null, null);
INSERT INTO `cmswing_picture` VALUES ('33', '/upload/picture/2016-01-25/Oqefa8OlJGa9tYQAOn4LzDNo.png', '', '', '', '1', '1453694903926', null, null);
INSERT INTO `cmswing_picture` VALUES ('34', '/upload/picture/2016-01-25/YgJNn-vAHrTojIMJaa5b_NZF.png', '', '', '', '1', '1453703626503', null, null);
INSERT INTO `cmswing_picture` VALUES ('35', '/upload/picture/2016-02-17/upcIkYfahsrA2v91WVrnwnnT.png', '', '', '', '1', '1455685465490', null, null);
INSERT INTO `cmswing_picture` VALUES ('36', '/upload/picture/2016-02-17/9x8ATjsn0yWCOD12-Sg8IZ9b.png', '', '', '', '1', '1455685468060', null, null);
INSERT INTO `cmswing_picture` VALUES ('37', '/upload/picture/2016-02-17/WuD6azDV2nzjpsuw0THr9H8Z.png', '', '', '', '1', '1455697076519', null, null);
INSERT INTO `cmswing_picture` VALUES ('38', '/upload/picture/2016-02-17/NJ6ZrgTPMiIdq2jwG4D2oW57.png', '', '', '', '1', '1455697076555', null, null);
INSERT INTO `cmswing_picture` VALUES ('39', '/upload/picture/2016-02-17/GVVfiEt7mJx3ythCiusaF1Bd.png', '', '', '', '1', '1455697076630', null, null);
INSERT INTO `cmswing_picture` VALUES ('40', '/upload/picture/2016-02-17/bByJqpKt_0LIhxW0HCOfevST.png', '', '', '', '1', '1455697076728', null, null);
INSERT INTO `cmswing_picture` VALUES ('41', '/upload/picture/2016-02-17/XIbYnHMsBQDJPzLI3wnwtpwy.png', '', '', '', '1', '1455697076749', null, null);
INSERT INTO `cmswing_picture` VALUES ('42', '/upload/picture/2016-02-17/h5SYnoyk2Zdb8vOBAbuK-jkh.png', '', '', '', '1', '1455697076807', null, null);
INSERT INTO `cmswing_picture` VALUES ('43', '/upload/picture/2016-02-17/hOf9UPDW8x8PfP-y2tGluL-y.png', '', '', '', '1', '1455697076920', null, null);
INSERT INTO `cmswing_picture` VALUES ('44', '/upload/picture/2016-02-17/yZ-lYx4grjwjnUaCkGgStK_x.png', '', '', '', '1', '1455697076973', null, null);
INSERT INTO `cmswing_picture` VALUES ('45', '/upload/picture/2016-02-17/Z-flFprPTM2NjKjUUG-2JNQR.png', '', '', '', '1', '1455698404323', null, null);
INSERT INTO `cmswing_picture` VALUES ('46', '/upload/picture/2016-02-17/E_LFQxuWpam9uDfN0fLMML8v.png', '', '', '', '1', '1455698404405', null, null);
INSERT INTO `cmswing_picture` VALUES ('47', '/upload/picture/2016-02-17/FXWeBn2e3p_w7_4ovPI_JqQz.png', '', '', '', '1', '1455698404446', null, null);
INSERT INTO `cmswing_picture` VALUES ('48', '/upload/picture/2016-02-17/8JAxQijhowZNgUSGCtCeBvmV.png', '', '', '', '1', '1455698477924', null, null);
INSERT INTO `cmswing_picture` VALUES ('49', '/upload/picture/2016-02-17/GtcJUi6Z58qRaSfprJtcA2xP.png', '', '', '', '1', '1455698478060', null, null);
INSERT INTO `cmswing_picture` VALUES ('50', '/upload/picture/2016-02-17/fJT_8mv42Eza2tefFg8c57F-.png', '', '', '', '1', '1455698478095', null, null);
INSERT INTO `cmswing_picture` VALUES ('51', '/upload/picture/2016-02-17/yjXlg40MFFfX2tmWuoFNHCX_.png', '', '', '', '1', '1455698912408', null, null);
INSERT INTO `cmswing_picture` VALUES ('52', '/upload/picture/2016-02-17/vs_6iKCSkezHgFLqWrGo_yG6.png', '', '', '', '1', '1455698912510', null, null);
INSERT INTO `cmswing_picture` VALUES ('53', '/upload/picture/2016-02-17/sitYEDcx3KXnAO9Soa9-3n1Z.png', '', '', '', '1', '1455698912516', null, null);
INSERT INTO `cmswing_picture` VALUES ('54', '/upload/picture/2016-02-17/5Vepdn_g1ZCn0ZxlbkCrJLx0.png', '', '', '', '1', '1455698912552', null, null);
INSERT INTO `cmswing_picture` VALUES ('55', '/upload/picture/2016-02-17/wUexvivri6hdozn5s4nGG-6l.png', '', '', '', '1', '1455698994835', null, null);
INSERT INTO `cmswing_picture` VALUES ('56', '/upload/picture/2016-02-17/EF8xNu270Hibe6AjVD9ZNFn_.png', '', '', '', '1', '1455698994908', null, null);
INSERT INTO `cmswing_picture` VALUES ('57', '/upload/picture/2016-02-17/GgxHP6rDiZapWid3a0lOycGt.png', '', '', '', '1', '1455698994979', null, null);
INSERT INTO `cmswing_picture` VALUES ('58', '/upload/picture/2016-02-17/shnPDRcYY92WRiZnyYSymwWV.png', '', '', '', '1', '1455698995013', null, null);
INSERT INTO `cmswing_picture` VALUES ('59', '/upload/picture/2016-02-17/3t5RrngSZy-Eyavdgfonb6pC.png', '', '', '', '1', '1455698995068', null, null);
INSERT INTO `cmswing_picture` VALUES ('60', '/upload/picture/2016-02-17/y8YSTPw5PA1bjpVM2NydM9UO.png', '', '', '', '1', '1455698995147', null, null);
INSERT INTO `cmswing_picture` VALUES ('61', '/upload/picture/2016-02-17/plyovRYkXbFfE2kU_KUVN4Qk.png', '', '', '', '1', '1455698995178', null, null);
INSERT INTO `cmswing_picture` VALUES ('62', '/upload/picture/2016-02-17/L7FaMEY2fipWoIY6aDamQPFH.png', '', '', '', '1', '1455699100368', null, null);
INSERT INTO `cmswing_picture` VALUES ('63', '/upload/picture/2016-02-17/OT8G_tuLQfIf6BuP9nZWq7Tq.png', '', '', '', '1', '1455699100421', null, null);
INSERT INTO `cmswing_picture` VALUES ('64', '/upload/picture/2016-02-17/Jb8ux4j2x4rbO4-Sz4Z3ZJfL.png', '', '', '', '1', '1455699126352', null, null);
INSERT INTO `cmswing_picture` VALUES ('65', '/upload/picture/2016-02-17/ogwNEUNphebpL1jPGt4Y3d3s.png', '', '', '', '1', '1455699126412', null, null);
INSERT INTO `cmswing_picture` VALUES ('66', '/upload/picture/2016-02-17/hbrF4GZBm4XNCW4WEXYOpDN0.png', '', '', '', '1', '1455699126457', null, null);
INSERT INTO `cmswing_picture` VALUES ('67', '/upload/picture/2016-02-17/N05WpPOegd79k3x22kDITuzH.png', '', '', '', '1', '1455699126528', null, null);
INSERT INTO `cmswing_picture` VALUES ('68', '/upload/picture/2016-02-17/FECkq195UjlNHw_TMs8zzDHE.png', '', '', '', '1', '1455699167743', null, null);
INSERT INTO `cmswing_picture` VALUES ('69', '/upload/picture/2016-02-17/GniOHS1QY2ddoe0Wnc0N4Uei.png', '', '', '', '1', '1455699167792', null, null);
INSERT INTO `cmswing_picture` VALUES ('70', '/upload/picture/2016-02-17/P9-IYSXgs1gTkQX-0jjbdM6M.png', '', '', '', '1', '1455699167863', null, null);
INSERT INTO `cmswing_picture` VALUES ('71', '/upload/picture/2016-02-17/iDlgPDtaWAnqRv9dGuGHUHzS.png', '', '', '', '1', '1455699167891', null, null);
INSERT INTO `cmswing_picture` VALUES ('72', '/upload/picture/2016-02-17/vcj2HR7Y3luK4M1Jk72YpjUU.png', '', '', '', '1', '1455708689996', null, null);
INSERT INTO `cmswing_picture` VALUES ('73', '/upload/picture/2016-02-17/Y_83VJuAlZVYWc7fOCO6B8rh.png', '', '', '', '1', '1455708690066', null, null);
INSERT INTO `cmswing_picture` VALUES ('74', '/upload/picture/2016-02-17/JQ5VJcVR3YRsgtxam6lg9wV7.png', '', '', '', '1', '1455708690070', null, null);
INSERT INTO `cmswing_picture` VALUES ('75', '/upload/picture/2016-02-23/4oG7lGGocXEDbM3LT-ESGqwt.jpg', '', '', '', '1', '1456236833650', null, null);
INSERT INTO `cmswing_picture` VALUES ('76', '/upload/picture/2016-02-23/Nw4N4viqLvUJrg_ewYRd8sN0.jpg', '', '', '', '1', '1456236833735', null, null);
INSERT INTO `cmswing_picture` VALUES ('77', '/upload/picture/2016-02-24/T5E0Gb_7LVHEMZrP8yDzqKb6.png', '', '', '', '1', '1456290063424', null, null);
INSERT INTO `cmswing_picture` VALUES ('78', '/upload/picture/2016-02-24/t4OJv1qpjTUfBIU5YbK_3dZy.jpg', '', '', '', '1', '1456290063442', null, null);
INSERT INTO `cmswing_picture` VALUES ('79', '/upload/picture/2016-02-24/bE22Yn_xZtzDaCBRpjqm4Smq.png', '', '', '', '1', '1456290102319', null, null);
INSERT INTO `cmswing_picture` VALUES ('80', '/upload/picture/2016-02-24/iXADeXYxj-dqUsUdqZkLB-tO.png', '', '', '', '1', '1456290102431', null, null);
INSERT INTO `cmswing_picture` VALUES ('81', '/upload/picture/2016-02-24/ZwMTBjoh_K7xFBjw0Z5iyJ1-.jpg', '', '', '', '1', '1456290128970', null, null);
INSERT INTO `cmswing_picture` VALUES ('82', '/upload/picture/2016-02-24/BBCDgD4bL2ZmqYKE85cza_Ku.jpg', '', '', '', '1', '1456290146439', null, null);
INSERT INTO `cmswing_picture` VALUES ('83', '/upload/picture/2016-02-24/B_uAOKyaGh_REFH5rnwRhuZV.jpg', '', '', '', '1', '1456306069801', null, null);
INSERT INTO `cmswing_picture` VALUES ('84', '/upload/picture/2016-02-24/7dsjUWMwil4X36NwwO5CjOrz.png', '', '', '', '1', '1456306769396', null, null);
INSERT INTO `cmswing_picture` VALUES ('85', '/upload/picture/2016-02-24/Z4WW6sicGmpzHdc-TjzyFxjC.jpg', '', '', '', '1', '1456307138230', null, null);
INSERT INTO `cmswing_picture` VALUES ('86', '/upload/picture/2016-02-24/d_6cQjY2Upfs1JH-IB3aN8Jn.jpg', '', '', '', '1', '1456307197896', null, null);
INSERT INTO `cmswing_picture` VALUES ('87', '/upload/picture/2016-02-25/AI9935U42KDQeJwjEDbEenq2.png', '', '', '', '1', '1456390485523', null, null);
INSERT INTO `cmswing_picture` VALUES ('88', '/upload/picture/2016-02-25/GaaxWzxUQukhVipP1cPoFA7b.jpg', '', '', '', '1', '1456394032645', null, null);
INSERT INTO `cmswing_picture` VALUES ('89', '/upload/picture/2016-02-25/qcqxmZ773WoIGMPeJi9NrN7i.jpg', '', '', '', '1', '1456394032891', null, null);
INSERT INTO `cmswing_picture` VALUES ('90', '/upload/picture/2016-02-25/tGfsacJrfU-IGUPoyOnBa_A3.jpg', '', '', '', '1', '1456394033042', null, null);
INSERT INTO `cmswing_picture` VALUES ('91', '/upload/picture/2016-02-25/-rHapXzhi2nv6vSvVxsa7QeJ.jpg', '', '', '', '1', '1456394033174', null, null);
INSERT INTO `cmswing_picture` VALUES ('92', '/upload/picture/2016-02-25/a3mW2IUP0gyNK_F9VBU-CDnl.jpg', '', '', '', '1', '1456396319612', null, null);
INSERT INTO `cmswing_picture` VALUES ('93', '/upload/picture/2016-02-25/NYyh-sChqwXkfIw7Wj00vu4D.jpg', '', '', '', '1', '1456396319946', null, null);
INSERT INTO `cmswing_picture` VALUES ('94', '/upload/picture/2016-02-25/UsozucdB94Yyu7pd0-Bpdsmm.jpg', '', '', '', '1', '1456396320256', null, null);
INSERT INTO `cmswing_picture` VALUES ('95', '/upload/picture/2016-02-25/4QI5lJWnqyOW07OlLlDpVb8k.jpg', '', '', '', '1', '1456396320413', null, null);
INSERT INTO `cmswing_picture` VALUES ('96', '/upload/picture/2016-02-25/XDmOIKEoMgWdkxd6ymaTdCFG.jpg', '', '', '', '1', '1456396320615', null, null);
INSERT INTO `cmswing_picture` VALUES ('97', '/upload/picture/2016-02-25/hwKQTB3uOCvp8zJBd8ZGUgPa.jpg', '', '', '', '1', '1456396320743', null, null);
INSERT INTO `cmswing_picture` VALUES ('98', '/upload/picture/2016-02-25/68T5qhK0UKrZ4IzUov5P7Fv0.jpg', '', '', '', '1', '1456396320865', null, null);
INSERT INTO `cmswing_picture` VALUES ('99', '/upload/picture/2016-02-25/q8AVyFtsWng-YeUCcygEs3GX.jpg', '', '', '', '1', '1456396320976', null, null);
INSERT INTO `cmswing_picture` VALUES ('100', '/upload/picture/2016-02-25/yZTUfSB_ACj8M-7xzpXPF2yC.jpg', '', '', '', '1', '1456396321138', null, null);
INSERT INTO `cmswing_picture` VALUES ('101', '/upload/picture/2016-02-25/BSTiRb49Kkl1pj8OFmJtYTxL.jpg', '', '', '', '1', '1456396321258', null, null);
INSERT INTO `cmswing_picture` VALUES ('102', '/upload/picture/2016-02-25/c7EhQZ6DBqnvQp2eKHGluS4t.jpg', '', '', '', '1', '1456396321394', null, null);
INSERT INTO `cmswing_picture` VALUES ('103', '/upload/picture/2016-02-25/xoDO5YmxqUmvo6UVQcnKQ6ye.jpg', '', '', '', '1', '1456396321490', null, null);
INSERT INTO `cmswing_picture` VALUES ('104', '/upload/picture/2016-02-25/m-seuHTLjuuyqpBOOGZfXX0a.jpg', '', '', '', '1', '1456396321619', null, null);
INSERT INTO `cmswing_picture` VALUES ('105', '/upload/picture/2016-02-25/0bCgkzjur_kv-fkIsuC-6h_5.jpg', '', '', '', '1', '1456396321784', null, null);
INSERT INTO `cmswing_picture` VALUES ('106', '/upload/picture/2016-02-26/5ZoCC1EvrqSaHRar81MYZtgC.jpg', '', '', '', '1', '1456459679579', null, null);
INSERT INTO `cmswing_picture` VALUES ('107', '/upload/picture/2016-02-26/iRuL7cWSXq2nGugZD-UUjXQm.jpg', '', '', '', '1', '1456460626835', null, null);
INSERT INTO `cmswing_picture` VALUES ('108', '/upload/picture/2016-02-26/FhXzoJlRXlh4kew-3ErOaFyb.jpg', '', '', '', '1', '1456460626870', null, null);
INSERT INTO `cmswing_picture` VALUES ('109', '/upload/picture/2016-02-26/0KZWd7jZygj8ZvcWds6kMRcE.jpg', '', '', '', '1', '1456467143191', null, null);
INSERT INTO `cmswing_picture` VALUES ('110', '/upload/picture/2016-02-26/rYFzL5wmYwAscCm6DgWzRZ2p.jpg', '', '', '', '1', '1456467143278', null, null);
INSERT INTO `cmswing_picture` VALUES ('111', '/upload/picture/2016-02-26/dsU37BoOnRlgGLX-7xunE-zb.jpg', '', '', '', '1', '1456467143369', null, null);
INSERT INTO `cmswing_picture` VALUES ('112', '/upload/picture/2016-02-26/RoqIK96VedfIplTWaVdnt3Hq.jpg', '', '', '', '1', '1456467143452', null, null);
INSERT INTO `cmswing_picture` VALUES ('113', '/upload/picture/2016-02-26/0En7my_7ip_cita-jkOv-7T3.jpg', '', '', '', '1', '1456467143514', null, null);
INSERT INTO `cmswing_picture` VALUES ('114', '/upload/picture/2016-02-26/owCi6MqvZzAONlxUZJNe1nXB.jpg', '', '', '', '1', '1456467143612', null, null);
INSERT INTO `cmswing_picture` VALUES ('115', '/upload/picture/2016-02-26/C1Hv5Ewz8JIIXmvNofiCK0AR.jpg', '', '', '', '1', '1456467143685', null, null);
INSERT INTO `cmswing_picture` VALUES ('116', '/upload/picture/2016-02-26/QtWCJoqLDAuJqMtDXMQbSJm7.jpg', '', '', '', '1', '1456467143767', null, null);
INSERT INTO `cmswing_picture` VALUES ('117', '/upload/picture/2016-02-26/m0fzi2FxtQyT_xT5msvkvzFE.jpg', '', '', '', '1', '1456467143845', null, null);
INSERT INTO `cmswing_picture` VALUES ('118', '/upload/picture/2016-02-26/LlXhaPE4jBnkGlcHBLb4W_DQ.jpg', '', '', '', '1', '1456467143941', null, null);
INSERT INTO `cmswing_picture` VALUES ('119', '/upload/picture/2016-02-26/0_A3UhB2SMAPuTyvF6EGxs1X.jpg', '', '', '', '1', '1456467143999', null, null);
INSERT INTO `cmswing_picture` VALUES ('120', '/upload/picture/2016-02-26/daHi2ELprmXWL7FVUblhny1x.jpg', '', '', '', '1', '1456467144112', null, null);
INSERT INTO `cmswing_picture` VALUES ('121', '/upload/picture/2016-02-26/V5WWrW4vvR6jIfqQ1gKewONr.jpg', '', '', '', '1', '1456467144140', null, null);
INSERT INTO `cmswing_picture` VALUES ('122', '/upload/picture/2016-02-26/LkJDOVPlhqRlM_YuwZFeskmz.jpg', '', '', '', '1', '1456467144233', null, null);
INSERT INTO `cmswing_picture` VALUES ('123', '/upload/picture/2016-02-26/y3ZiHNl29kiNmnWtdJi87gxd.jpg', '', '', '', '1', '1456467366632', null, null);
INSERT INTO `cmswing_picture` VALUES ('124', '/upload/picture/2016-02-26/5YUpFuw_uPb5sU-UMtOh9UVG.jpg', '', '', '', '1', '1456467366710', null, null);
INSERT INTO `cmswing_picture` VALUES ('125', '/upload/picture/2016-02-26/PCQbaNF7m06EHWmXnMu7cYXE.jpg', '', '', '', '1', '1456468194336', null, null);
INSERT INTO `cmswing_picture` VALUES ('126', '/upload/picture/2016-02-26/iJ-GwDggGfzfMI9RkF5kZmaI.jpg', '', '', '', '1', '1456468194418', null, null);
INSERT INTO `cmswing_picture` VALUES ('127', '/upload/picture/2016-03-02/bRjow4pnaCqgaMpoOo8h6OXn.jpg', '', '', '', '1', '1456891559436', '0', 'wc0LsqkZlrXnMNstWxP4bHmG-UyzdwtMcuY2wFmWH68');
INSERT INTO `cmswing_picture` VALUES ('128', '/upload/picture/2016-03-03/23Xpu3B-m6pvp1lr49Syzp1c.png', '', '', '', '1', '1456973153509', '0', 'Pi0Cuuy_spnDgDCEsbVSgIyVWr7sNlOC3n2_op23J6M');
INSERT INTO `cmswing_picture` VALUES ('129', '/upload/picture/2016-03-03/5k4rgSCzUTbtjE7S0it9cUOV.jpg', '', '', '', '1', '1456995648406', '0', 'tMnUi4E7UQtt-hn3WJc2AX4wuNZPy6HOpTOvnIl05Do');
INSERT INTO `cmswing_picture` VALUES ('130', '/upload/picture/2016-03-03/PRmw_LzOUt2_YT_cKvFpYal1.png', '', '', '', '1', '1456999712491', '0', 'rYTK-hn-e5tZ8LXb3ncWVmIXbkt7LYka-TMhTP7ao4o');
INSERT INTO `cmswing_picture` VALUES ('131', '/upload/picture/2016-03-05/ORumm4ua0wP8VFVX2U_q_smf.gif', '', '', '', '1', '1457150738985', '0', 'WHaDQ3y1CKv2E53_pazWIeMAv9lb3G5B-0milOTSTDM');
INSERT INTO `cmswing_picture` VALUES ('132', '/upload/picture/2016-03-07/6ziUDB3F195pPTTGsVnStrVv.jpg', '', '', '', '1', '1457331431066', '0', '9Cr2Bm9hgX-KU4W60VwU8mkfxAG8JLHlmuyTwJVj-9A');
INSERT INTO `cmswing_picture` VALUES ('133', '/upload/picture/2016-03-07/iZ_Svh6AD1xCeqngAwH10k4p.jpg', '', '', '', '1', '1457331519567', '0', '9Cr2Bm9hgX-KU4W60VwU8k9ONjoUn27-hhBPIwsLKzI');
INSERT INTO `cmswing_picture` VALUES ('134', '/upload/picture/2016-03-07/blJ0zuTKHv1dtTKZAkgLcHhq.jpg', '', '', '', '1', '1457331779015', '0', '9Cr2Bm9hgX-KU4W60VwU8sKERMFMOIo4s4GQ54n0wL4');
INSERT INTO `cmswing_picture` VALUES ('135', '/upload/picture/2016-03-07/ODddgKiSyiEDEnyjVFVx6SU9.jpg', '', '', '', '1', '1457337665402', '0', '9Cr2Bm9hgX-KU4W60VwU8kp1fx7wWbj6rTTjkQE5JkQ');
INSERT INTO `cmswing_picture` VALUES ('136', '/upload/picture/2016-03-07/7GZ2xU1sJe6nF8UQl_0BvhMD.jpg', '', '', '', '1', '1457346917637', '0', '');
INSERT INTO `cmswing_picture` VALUES ('137', '/upload/picture/2016-03-07/2Vx93lzXDLvHcismS9Dp4V7E.jpg', '', '', '', '1', '1457346977414', '0', 'dfqKqVVCQira496OgJtSr9X23RHtPULtMo6QIIGlnVE');
INSERT INTO `cmswing_picture` VALUES ('138', '/upload/picture/2016-03-07/k9qRxNOqSS_THYKZnDJ9m9y2.jpg', '', '', '', '1', '1457347427741', '0', 'dfqKqVVCQira496OgJtSr4mMCOILHSaiul5NBSfceD8');
INSERT INTO `cmswing_picture` VALUES ('139', '/upload/picture/2016-03-07/-U8YWBhU77WyqU40ElpuJANW.jpg', '', '', '', '1', '1457348279241', '0', 'dfqKqVVCQira496OgJtSr7Rh9-vNLPeb99JKpi-iILg');
INSERT INTO `cmswing_picture` VALUES ('140', '/upload/picture/2016-03-07/WlZsGNAWo2u6yrghZU4kpBbI.jpg', '', '', '', '1', '1457348300148', '0', 'dfqKqVVCQira496OgJtSr--b0QxwOapfFi9W8H28tHM');
INSERT INTO `cmswing_picture` VALUES ('141', '/upload/picture/2016-03-09/3MRXHgMaRAcz15zlTSgIjGn2.jpg', '', '', '', '1', '1457507790612', '0', 'nReUM8N9suZg9NrlSsnZKIVAAsKufk5y-16ZTASBe9g');
INSERT INTO `cmswing_picture` VALUES ('142', '/upload/picture/2016-03-09/rOujthEadT7SZjT0-1GC9X4g.jpg', '', '', '', '1', '1457507813810', '0', 'nReUM8N9suZg9NrlSsnZKL9C5tfXuLw32-46z9160fs');
INSERT INTO `cmswing_picture` VALUES ('143', '/upload/picture/2016-03-09/yjmwTjMXRj69wrKDTacMJf0m.jpg', '', '', '', '1', '1457510521874', '0', '');
INSERT INTO `cmswing_picture` VALUES ('144', '/upload/picture/2016-03-09/L2tLsshtkUuhnR7ZTU0ms7sS.jpg', '', '', '', '1', '1457510592417', '0', '');
INSERT INTO `cmswing_picture` VALUES ('145', '/upload/picture/2016-03-09/6R30in8Dgq4FhSlCAK8UwMi4.jpg', '', '', '', '1', '1457511148657', '0', '');
INSERT INTO `cmswing_picture` VALUES ('146', '/upload/picture/2016-03-09/js6ptNLSwlaTM7PLuuH_m8IF.jpg', '', '', '', '1', '1457511227562', '0', '');
INSERT INTO `cmswing_picture` VALUES ('147', '/upload/picture/2016-03-09/0PPHDvZ6OMH1_1f1geMkmjAU.jpg', '', '', '', '1', '1457512860444', '0', '');
INSERT INTO `cmswing_picture` VALUES ('148', '/upload/picture/2016-03-09/7wrrhOKo3DSV8KzbmQqBLODb.jpg', '', '', '', '1', '1457512949131', '0', '');
INSERT INTO `cmswing_picture` VALUES ('149', '/upload/picture/2016-03-09/3IUXx0-pG9Zt_NUWYn4h0MDr.jpg', '', '', '', '1', '1457513295466', '0', 'xD7IA7_unlgzvzsav48XtDoPqrqsKpHBKkLlrs1LCZQ');
INSERT INTO `cmswing_picture` VALUES ('150', '/upload/picture/2016-03-09/8qxqdgcjB6NV-57v9ahcoED7.jpg', '', '', '', '1', '1457514108616', '0', '');
INSERT INTO `cmswing_picture` VALUES ('151', '/upload/picture/2016-03-09/t9BmVVdDbBd-rn9Uj7zqAY0d.jpg', '', '', '', '1', '1457514108875', '0', '');
INSERT INTO `cmswing_picture` VALUES ('152', '/upload/picture/2016-03-09/v2IHCkilYRjI5NqAO9LfQWOx.jpg', '', '', '', '1', '1457519909627', '0', '');
INSERT INTO `cmswing_picture` VALUES ('153', '/upload/picture/2016-03-09/EuQzzpnqUrITt2g9IbMqQ6Kv.jpg', '', '', '', '1', '1457519919421', '0', '');
INSERT INTO `cmswing_picture` VALUES ('154', '/upload/picture/2016-03-09/exO0UiSVIt6qbqcgPvBlfAGN.jpg', '', '', '', '1', '1457519935713', '0', '');
INSERT INTO `cmswing_picture` VALUES ('155', '/upload/picture/2016-03-09/JrYI8h4mYTvqgod6f7fvvDPJ.jpg', '', '', '', '1', '1457519948581', '0', '');
INSERT INTO `cmswing_picture` VALUES ('156', '/upload/picture/2016-03-10/_cOfeRcqlq6yvLaUk-w_H-2d.jpg', 'https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwqyDia4xwc1YkHOG51gybfED82emuKjwhX8aExKonc8dbIABSZKRXnsCmzvjPxH6smjmQcTDica5Lpw/0?wx_fmt=jpeg', '', '', '1', '1457595229718', '0', '-_v9RtdDFiYrshNDq72B4KLdbo1D9cuaIYOiDZdlc1E');
INSERT INTO `cmswing_picture` VALUES ('157', '/upload/picture/2016-03-10/1EDXu1LTrY7RmXzC6HcMhEE8.jpg', '', '', '', '1', '1457614849316', '0', '');
INSERT INTO `cmswing_picture` VALUES ('158', '/upload/picture/2016-03-11/NPocvKUSuyjGkUlgCjFMU80N.jpg', '', '', '', '1', '1457699189365', '0', '');
INSERT INTO `cmswing_picture` VALUES ('159', '/upload/picture/2016-03-12/6awgVt90g_RngnrY4rH0En-E.jpg', '', '', '', '1', '1457780357277', '0', '');
INSERT INTO `cmswing_picture` VALUES ('160', '/upload/picture/2016-03-12/AJSmuw4SORF8_KEJrJVxxJ3W.jpg', '', '', '', '1', '1457780357377', '0', '');
INSERT INTO `cmswing_picture` VALUES ('161', '/upload/picture/2016-03-12/FRAvnchlDf-U_cTt870epnv6.jpg', '', '', '', '1', '1457780357588', '0', '');
INSERT INTO `cmswing_picture` VALUES ('162', '/upload/picture/2016-03-12/BwYC5a4RTGzpTnX3UnKqJLIa.jpg', '', '', '', '1', '1457780357751', '0', '');
INSERT INTO `cmswing_picture` VALUES ('163', '/upload/picture/2016-03-12/IGSF05tWvTSigCj27Hud8aKd.jpg', '', '', '', '1', '1457780357883', '0', '');
INSERT INTO `cmswing_picture` VALUES ('164', '/upload/picture/2016-03-12/djDYUewqhH6-flkOkHV0QfGz.jpg', '', '', '', '1', '1457780358000', '0', '');
INSERT INTO `cmswing_picture` VALUES ('165', '/upload/picture/2016-03-12/cOBiwtHP-hAwaeLbbQZZMcP_.jpg', '', '', '', '1', '1457780690178', '0', '');
INSERT INTO `cmswing_picture` VALUES ('166', '/upload/picture/2016-03-12/Ya-aE89fT6Wi_Hw6Dt3-5Lbo.jpg', '', '', '', '1', '1457780690481', '0', '');
INSERT INTO `cmswing_picture` VALUES ('167', '/upload/picture/2016-03-12/8GX-DMGAwTA266rV2vGGT232.jpg', '', '', '', '1', '1457780690629', '0', '');
INSERT INTO `cmswing_picture` VALUES ('168', '/upload/picture/2016-03-12/EdsIwnK4Xh2sXmkOvnmFu38t.jpg', '', '', '', '1', '1457780690819', '0', '');
INSERT INTO `cmswing_picture` VALUES ('169', '/upload/picture/2016-03-12/kLvZZTr3TCizLW-yzHbiMk72.jpg', '', '', '', '1', '1457780690977', '0', '');
INSERT INTO `cmswing_picture` VALUES ('170', '/upload/picture/2016-03-12/piU3scMcOoGwU0ixjMpcapti.jpg', '', '', '', '1', '1457780691123', '0', '');
INSERT INTO `cmswing_picture` VALUES ('171', '/upload/picture/2016-03-12/iwoLtdzcnwUAScj0fJWeZOo2.jpg', '', '', '', '1', '1457785645966', '0', '');
INSERT INTO `cmswing_picture` VALUES ('172', '/upload/picture/2016-03-12/LBwzPsqBAmahUIZybiFKK2db.jpg', '', '', '', '1', '1457785646149', '0', '');
INSERT INTO `cmswing_picture` VALUES ('173', '/upload/picture/2016-03-12/GDuHmNV5PKhd7CXPSZxb7KOY.jpg', '', '', '', '1', '1457785646320', '0', '');
INSERT INTO `cmswing_picture` VALUES ('174', '/upload/picture/2016-03-12/5nW5nJcB8UwqYVEE7cHYJsk3.jpg', '', '', '', '1', '1457785646525', '0', '');
INSERT INTO `cmswing_picture` VALUES ('175', '/upload/picture/2016-03-18/DgJY6yOxYvjkSSttZTS5dy2R.jpg', '', '', '', '1', '1458298081009', '0', '');
INSERT INTO `cmswing_picture` VALUES ('176', '/upload/picture/2016-03-19/XrTToceoLGg0v_K6CUVOglWr.jpg', '', '', '', '1', '1458395909405', '0', '');
INSERT INTO `cmswing_picture` VALUES ('177', '/upload/picture/2016-03-23/Vz37HDM50y7iTLqe9LbQ6Ppc.jpg', '', '', '', '1', '1458730791302', '0', '');
INSERT INTO `cmswing_picture` VALUES ('178', '/upload/picture/2016-03-23/OiA8ohlhPjENLoGErjAs3y2R.jpg', '', '', '', '1', '1458730791454', '0', '');
INSERT INTO `cmswing_picture` VALUES ('179', '/upload/picture/2016-03-30/tLvkWN-UW7_oCg2LPzC65IWc.jpg', '', '', '', '1', '1459349431761', '0', '');
INSERT INTO `cmswing_picture` VALUES ('180', '/upload/picture/2016-03-30/jlFoJfEXSu49DHQ_j3a0RsVx.jpg', '', '', '', '1', '1459349458665', '0', '');
INSERT INTO `cmswing_picture` VALUES ('181', '/upload/picture/2016-03-30/AvqGBs4_aAw1CtuQo_sR-5t_.jpg', '', '', '', '1', '1459349705876', '0', '');
INSERT INTO `cmswing_picture` VALUES ('182', '/upload/picture/2016-03-31/UjsZIcsPAslOGYnIzDn6B3GV.jpg', '', '', '', '1', '1459354905930', '0', '');
INSERT INTO `cmswing_picture` VALUES ('183', '/upload/picture/2016-03-31/p5Iich4grLoRd3knliD1PbF-.jpg', '', '', '', '1', '1459356402267', '0', '');
INSERT INTO `cmswing_picture` VALUES ('184', '/upload/picture/2016-03-31/lx8QyKQp1vPl7iU_kQnLy8Z6.jpg', '', '', '', '1', '1459356402526', '0', '');
INSERT INTO `cmswing_picture` VALUES ('185', '/upload/picture/2016-03-31/DUhPT0NMTEuuUewi-irGUR7T.jpg', '', '', '', '1', '1459356402758', '0', '');
INSERT INTO `cmswing_picture` VALUES ('186', '/upload/picture/2016-03-31/9Ik_-eBoXrhS0zGu7ld9b-fE.jpg', '', '', '', '1', '1459356445366', '0', '');
INSERT INTO `cmswing_picture` VALUES ('187', '/upload/picture/2016-03-31/G38y0D3wRA6J83bVMZ30eway.jpg', '', '', '', '1', '1459356448168', '0', '');
INSERT INTO `cmswing_picture` VALUES ('188', '/upload/picture/2016-03-31/BirA5X6nNaDjzXeFKQEs8V5w.jpg', '', '', '', '1', '1459356451281', '0', '');
INSERT INTO `cmswing_picture` VALUES ('189', '/upload/picture/2016-03-31/r5Q7YaqGCW-dqMzmeAKcpN53.jpg', '', '', '', '1', '1459359517530', '0', '');
INSERT INTO `cmswing_picture` VALUES ('190', '/upload/picture/2016-03-31/zymymvStsYSEhaa7d0qt5Oqi.jpg', '', '', '', '1', '1459362087767', '0', '');
INSERT INTO `cmswing_picture` VALUES ('191', '/upload/picture/2016-03-31/BTkU6TMSzk7tlmFSL8sICHNv.jpg', '', '', '', '1', '1459365385732', '0', '');
INSERT INTO `cmswing_picture` VALUES ('192', '/upload/picture/2016-03-31/ErEe3cnsbIfuJPkrz1Gjmkto.jpg', '', '', '', '1', '1459370752344', '0', '');
INSERT INTO `cmswing_picture` VALUES ('193', '/upload/picture/2016-03-31/WH_vpPQS7nOxQDXdDD8RnK3k.jpg', '', '', '', '1', '1459400514007', '0', '');
INSERT INTO `cmswing_picture` VALUES ('194', '/upload/picture/2016-03-31/2XtRRcR8BS26Po6_qk9Aj9lp.jpg', '', '', '', '1', '1459400514162', '0', '');
INSERT INTO `cmswing_picture` VALUES ('195', '/upload/picture/2016-03-31/x0qZYH62-4bJtqNVDEbMdUXJ.jpg', '', '', '', '1', '1459400514267', '0', '');
INSERT INTO `cmswing_picture` VALUES ('196', '/upload/picture/2016-03-31/no0kd242AFZUnmjT_PJ22yYZ.jpg', '', '', '', '1', '1459400514389', '0', '');
INSERT INTO `cmswing_picture` VALUES ('197', '/upload/picture/2016-03-31/KPsh7OKSv8WuY6JI0_VDXp2B.jpg', '', '', '', '1', '1459400514531', '0', '');
INSERT INTO `cmswing_picture` VALUES ('198', '/upload/picture/2016-03-31/C6wQ_obvdjLcKYHCiBUmBUWn.jpg', '', '', '', '1', '1459403711788', '0', '');
INSERT INTO `cmswing_picture` VALUES ('199', '/upload/picture/2016-03-31/xrCaTlf_-nSBJ7WQvbAAkWlh.jpg', '', '', '', '1', '1459403711989', '0', '');
INSERT INTO `cmswing_picture` VALUES ('200', '/upload/picture/2016-03-31/b3CQxdbJZLR6pr2Ico5AM0fK.jpg', '', '', '', '1', '1459403712133', '0', '');
INSERT INTO `cmswing_picture` VALUES ('201', '/upload/picture/2016-03-31/wXc1ji5TvNaktXImLFKI7I3q.jpg', '', '', '', '1', '1459403712253', '0', '');
INSERT INTO `cmswing_picture` VALUES ('202', '/upload/picture/2016-03-31/---ZVkzM7Tqv7T6OgYy3Fx5w.jpg', '', '', '', '1', '1459403712392', '0', '');
INSERT INTO `cmswing_picture` VALUES ('203', '/upload/picture/2016-03-31/VmqN1AjSetdA23XogIXUt3xW.jpg', '', '', '', '1', '1459403844837', '0', '');
INSERT INTO `cmswing_picture` VALUES ('204', '/upload/picture/2016-03-31/HL7iRarUhhg3caopaLAYQVrp.jpg', '', '', '', '1', '1459403902606', '0', '');
INSERT INTO `cmswing_picture` VALUES ('205', '/upload/picture/2016-03-31/HX9MoM9tfjuppg-AzwXnHavT.jpg', '', '', '', '1', '1459403937554', '0', '');
INSERT INTO `cmswing_picture` VALUES ('206', '/upload/picture/2016-03-31/eCjcrbf5bGDTJAbpyTM-7qCQ.jpg', '', '', '', '1', '1459403971594', '0', '');
INSERT INTO `cmswing_picture` VALUES ('207', '/upload/picture/2016-03-31/QcTrSKlA8EiaxeQvI144kYwa.jpg', '', '', '', '1', '1459404770054', '0', '');
INSERT INTO `cmswing_picture` VALUES ('208', '/upload/picture/2016-03-31/BsjXxab1pS1KPtNVOSIPFzef.jpg', '', '', '', '1', '1459404773071', '0', '');
INSERT INTO `cmswing_picture` VALUES ('209', '/upload/picture/2016-03-31/giTz07otM2zz4oGYoaPWP0VW.jpg', '', '', '', '1', '1459404776461', '0', '');
INSERT INTO `cmswing_picture` VALUES ('210', '/upload/picture/2016-03-31/wZK3Lc7NWkByRnwdGUK29VqP.jpg', '', '', '', '1', '1459404778155', '0', '');
INSERT INTO `cmswing_picture` VALUES ('211', '/upload/picture/2016-03-31/uHZhuZ6yVHg0HieYyINytVC6.jpg', '', '', '', '1', '1459405071340', '0', '');
INSERT INTO `cmswing_picture` VALUES ('212', '/upload/picture/2016-03-31/RK7AsIAzzAmJz9EelXcp8sU0.jpg', '', '', '', '1', '1459405071444', '0', '');
INSERT INTO `cmswing_picture` VALUES ('213', '/upload/picture/2016-03-31/Esp8lWcbDJYEsGvcWNEQ4Nyh.jpg', '', '', '', '1', '1459405071608', '0', '');
INSERT INTO `cmswing_picture` VALUES ('214', '/upload/picture/2016-03-31/EP-yItW0U2hCfkqgufvZ69Xz.jpg', '', '', '', '1', '1459405071742', '0', '');
INSERT INTO `cmswing_picture` VALUES ('215', '/upload/picture/2016-03-31/5XvyecN_j5zgWv-JqRDj3gaY.jpg', '', '', '', '1', '1459405071826', '0', '');

-- ----------------------------
-- Table structure for cmswing_pingxx
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_pingxx`;
CREATE TABLE `cmswing_pingxx` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `channel` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `type` int(2) DEFAULT NULL,
  `info` text,
  `sort` int(10) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '0关闭1开启',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_pingxx
-- ----------------------------
INSERT INTO `cmswing_pingxx` VALUES ('1', '支付宝 PC 网页支付', 'alipay_pc_direct', '/static/admin/img/pingxx/alipay.png', '1', 'alipay_pc_direct 适用于 PC 网页支付，需要开通支付宝即时到账服务。', '1', '1');
INSERT INTO `cmswing_pingxx` VALUES ('2', '微信扫码支付', 'wx_pub_qr', '/static/admin/img/pingxx/wx.png', '1', 'wx_pub_qr 是微信公众账号扫码支付，需要开通微信公众账号支付。', '2', '1');
INSERT INTO `cmswing_pingxx` VALUES ('3', '支付宝扫码支付', 'alipay_qr', '/static/admin/img/pingxx/alipay.png', '1', 'alipay_qr 是支付宝扫码支付，因为二维码的特殊性，所以其可以用于 PC 的支付场景。', '3', '1');
INSERT INTO `cmswing_pingxx` VALUES ('4', '银联网关支付', 'upacp_pc', '/static/admin/img/pingxx/upacp.png', '1', 'upacp_pc 适用于 PC 网页支付，需要开通银联网关支付服务', '4', '1');
INSERT INTO `cmswing_pingxx` VALUES ('5', '微信支付', 'wx_pub', '/static/admin/img/pingxx/wx.png', '2', 'wx_pub 是微信公众账号支付，只能用于微信内置浏览器内，而且只有服务号才能申请该支付功能。', '5', '0');
INSERT INTO `cmswing_pingxx` VALUES ('6', '支付宝手机支付', 'alipay_wap', '/static/admin/img/pingxx/alipay.png', '2', 'alipay_wap 适用于手机网页支付，需开通支付宝手机网页支付服务', '6', '0');
INSERT INTO `cmswing_pingxx` VALUES ('7', '银联手机支付', 'upacp_wap', '/static/admin/img/pingxx/upacp.png', '2', 'upacp_wap 适用于手机网页支付，限 2015 年元旦后的银联新商户使用，需要开通银联全渠道手机网页支付。', '7', '0');
INSERT INTO `cmswing_pingxx` VALUES ('8', '百度钱包手机支付', 'bfb_wap', '/static/admin/img/pingxx/bfb.png', '2', 'bfb_wap 适用于手机网页支付，需要开通百度钱包手机网页支付。', '8', '0');
INSERT INTO `cmswing_pingxx` VALUES ('9', '易宝一键支付', 'yeepay_wap', '/static/admin/img/pingxx/yeepay.png', '2', 'yeepay_wap 适用于移动端网页支付，需要与易宝当地分公司签署「易宝一键支付」服务协议。', '9', '0');
INSERT INTO `cmswing_pingxx` VALUES ('10', '京东支付', 'jdpay_wap', '/static/admin/img/pingxx/jdpay.png', '2', 'jdpay_wap 适用于手机网页支付，需开通京东支付移动版的服务。', '10', '0');
INSERT INTO `cmswing_pingxx` VALUES ('11', '支付宝支付', 'alipay', '/static/admin/img/pingxx/alipay.png', '3', 'alipay 适用于 App 支付，需要开通支付宝手机支付服务。', '11', '0');
INSERT INTO `cmswing_pingxx` VALUES ('12', '微信支付', 'wx', '/static/admin/img/pingxx/wx.png', '3', 'wx 适用于 App 支付，需要开通微信 App 支付服务。', '12', '0');
INSERT INTO `cmswing_pingxx` VALUES ('13', '百度钱包支付', 'bfb', '/static/admin/img/pingxx/bfb.png', '3', 'bfb 适用于 App 支付，需开通百度钱包移动快捷支付服务。', '13', '0');
INSERT INTO `cmswing_pingxx` VALUES ('14', ' Apple Pay', 'applepay_upacp', '/static/admin/img/pingxx/applepay.png', '3', 'applepay_upacp 即 Apple Pay ，适用于 App 支付，需要开通银联手机支付。', '15', '0');
INSERT INTO `cmswing_pingxx` VALUES ('15', '银联支付', 'upacp', '/static/admin/img/pingxx/upacp.png', '3', 'upacp 适用于 App 支付，限 2015 年元旦后的银联新商户使用。需要开通银联全渠道支付服务。', '14', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_session
-- ----------------------------
INSERT INTO `cmswing_session` VALUES ('1', 'YoUuj3CUtQtsprNrdGGlMqgx5UWUT8PR', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1457941130824},\"backup_config\":null,\"backup_file\":null,\"backup_tables\":null}', '1458028791398');
INSERT INTO `cmswing_session` VALUES ('3', 'o_qNDqumudkAciCieYz1pbMtJkFMJN_0', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1458111147356},\"webuser\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1458303801713},\"cart_goods_item\":null}', '1458398151823');
INSERT INTO `cmswing_session` VALUES ('4', 'x62BKfQ53PDof_xq27aTT25_vhPUrJtl', null, '1458437331934');
INSERT INTO `cmswing_session` VALUES ('5', 'FYhWrW4I_349Emxwg8V8_B96g2QfacAE', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1458311254131}}', '1458440238341');
INSERT INTO `cmswing_session` VALUES ('6', '9S85bSso2X_X1Ysp29zUt11dMO6UAXq6', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1458351108852}}', '1458483174086');

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
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `value` text COMMENT '配置值',
  `sort` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`),
  KEY `type` (`type`),
  KEY `group` (`group`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_setup
-- ----------------------------
INSERT INTO `cmswing_setup` VALUES ('1', 'WEB_SITE_TITLE', '1', '网站标题', '1', '', '网站标题前台显示标题', '4294967295', '1379235274', '1', 'CmsWing内容管理框架', '0');
INSERT INTO `cmswing_setup` VALUES ('2', 'WEB_SITE_DESCRIPTION', '2', '网站描述', '1', '', '网站搜索引擎描述', '1378898976', '1379235841', '1', 'CmsWing内容管理框架', '1');
INSERT INTO `cmswing_setup` VALUES ('3', 'WEB_SITE_KEYWORD', '2', '网站关键字', '1', '', '网站搜索引擎关键字', '1378898976', '1381390100', '1', 'nodej,comswing,内容管理框架,thinkjs22', '8');
INSERT INTO `cmswing_setup` VALUES ('4', 'WEB_SITE_CLOSE', '4', '关闭站点', '1', '0:关闭,1:开启', '站点关闭后其他用户不能访问，管理员可以正常访问', '1378898976', '1379235296', '1', '1', '1');
INSERT INTO `cmswing_setup` VALUES ('9', 'CONFIG_TYPE_LIST', '3', '配置类型列表', '4', '', '主要用于数据解析和页面表单的生成', '1378898976', '1379235348', '1', '0:数字\r\n1:字符\r\n2:文本\r\n3:数组\r\n4:枚举', '2');
INSERT INTO `cmswing_setup` VALUES ('10', 'WEB_SITE_ICP', '1', '网站备案号', '1', '', '设置在网站底部显示的备案号，如“陕ICP备16000909号“', '4294967295', '1379235859', '1', '陕ICP备16000909号-2', '9');
INSERT INTO `cmswing_setup` VALUES ('11', 'DOCUMENT_POSITION', '3', '文档推荐位', '2', '', '文档推荐位，推荐到多个位置KEY值相加即可', '1379053380', '1379235329', '1', '1:列表推荐\r\n2:频道推荐\r\n4:首页推荐', '3');
INSERT INTO `cmswing_setup` VALUES ('12', 'DOCUMENT_DISPLAY', '3', '文档可见性', '2', '', '文章可见性仅影响前台显示，后台不收影响', '1379056370', '1379235322', '1', '0:所有人可见\r\n1:仅注册会员可见\r\n2:仅管理员可见', '4');
INSERT INTO `cmswing_setup` VALUES ('13', 'COLOR_STYLE', '4', '后台色系', '1', 'default_color:默认\r\nblue_color:紫罗兰', '后台颜色风格', '1379122533', '1379235904', '1', 'default_color', '10');
INSERT INTO `cmswing_setup` VALUES ('20', 'CONFIG_GROUP_LIST', '3', '配置分组', '4', '', '配置分组', '1379228036', '1384418383', '1', '1:基本\r\n2:内容\r\n3:用户\r\n4:系统\r\n5:商城', '4');
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
INSERT INTO `cmswing_setup` VALUES ('35', 'REPLY_LIST_ROWS', '0', '回复列表每页条数', '2', '', '', '4294967295', '1387178083', '1', '10', '0');
INSERT INTO `cmswing_setup` VALUES ('36', 'ADMIN_ALLOW_IP', '2', '后台允许访问IP', '4', '', '多个用逗号分隔，如果不配置表示不限制IP访问', '1387165454', '1387165553', '1', '', '12');
INSERT INTO `cmswing_setup` VALUES ('37', 'SHOW_PAGE_TRACE', '4', '是否显示页面Trace', '4', '0:关闭\r\n1:开启', '是否显示页面Trace信息', '1387165685', '1387165685', '1', '0', '1');
INSERT INTO `cmswing_setup` VALUES ('56', 'MENU_GROUP', '3', '后台菜单分组', '4', '', '后台菜单分组，左侧栏显示', '4294967295', '4294967295', '1', '0:不分组\r\n1:内容\r\n2:电商\r\n3:系统\r\n99:微信', '33');
INSERT INTO `cmswing_setup` VALUES ('59', 'SYMBOL', '1', '货币符号', '5', '', '例如：人民币“￥”', '0', '1457158431682', '1', '￥', '1');
INSERT INTO `cmswing_setup` VALUES ('60', 'UNIT', '1', '货币单位', '5', '', '例如：人民币“元”', '0', '1457158524941', '1', '元', '2');
INSERT INTO `cmswing_setup` VALUES ('61', 'IS_INVOICE', '4', '发票功能', '5', '0:关闭\r\n1:开启', '', '0', '1457158685756', '1', '0', '3');
INSERT INTO `cmswing_setup` VALUES ('62', 'TAX', '0', '税率', '5', '', '填写数字不带\"%\"', '0', '1457158841664', '1', '0', '4');
INSERT INTO `cmswing_setup` VALUES ('63', 'GRADE_DAYS', '0', '消费时长', '5', '', '（天）默认365天，会员升级，消费金额需要统计的最近时长。', '0', '1457159118296', '1', '365', '6');
INSERT INTO `cmswing_setup` VALUES ('64', 'ORDER_DELAY_FLASH', '0', '抢购订单作废时长', '5', '', '（分钟）默认120分钟，自下单之时起，用户在多长时间内没有支付，订单将自动作废。', '0', '1457159218435', '1', '120', '7');
INSERT INTO `cmswing_setup` VALUES ('65', 'ORDER_DELAY_GROUP', '0', '团购订单作废时长', '5', '', '（分钟）默认120分钟，自下单之时起，用户在多长时间内没有支付，订单将自动作废。', '0', '1457159279852', '1', '120', '8');
INSERT INTO `cmswing_setup` VALUES ('66', 'ORDER_DELAY_BUND', '0', '捆绑订单作废时长', '5', '', '（分钟）默认不限制（0表示不限制），自下单之时起，用户在多长时间内没有支付，订单将自动作废。', '0', '1457159346456', '1', '0', '9');
INSERT INTO `cmswing_setup` VALUES ('67', 'ORDER_DELAY', '0', '默认订单作废时长', '5', '', '（分钟）默认不限制（0表示不限制），自下单之时起，用户在多长时间内没有支付，订单将自动作废。', '0', '1457159425148', '1', '1440', '11');
INSERT INTO `cmswing_setup` VALUES ('68', 'PINGXX_APP_ID', '1', 'Ping++ ID(APP_ID)', '0', '', '在ping++ 平台申请的app_id', '1458613275294', '1458613220792', '1', 'app_eDW9GK5uLiHSHCmj', '0');
INSERT INTO `cmswing_setup` VALUES ('69', 'PINGXX_LIVE_SECRET_KEY', '1', 'Live Secret Key', '0', '', '', '0', '1458704598345', '1', 'sk_test_10unXHm9WPeD54OaT8Cubz9K', '0');
INSERT INTO `cmswing_setup` VALUES ('70', 'COD', '4', '货到付款', '5', '0:支持货到付款\r\n1:不支持货到付款', '货到付款只针对实物商品', '0', '1458706395582', '1', '0', '0');
INSERT INTO `cmswing_setup` VALUES ('71', 'PREPAID', '4', '预付款消费', '5', '0:支持预付款消费\r\n1:不支持预付款消费', '网站是否支持预付款消费，默认支持。', '1458707195813', '1458706636445', '1', '0', '0');

-- ----------------------------
-- Table structure for cmswing_tags
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_tags`;
CREATE TABLE `cmswing_tags` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `num` bigint(20) DEFAULT '0',
  `type` int(2) NOT NULL DEFAULT '0' COMMENT '0文档，1suk,',
  `sort` int(11) DEFAULT '0',
  `is_hot` int(1) DEFAULT '0',
  `pid` int(11) NOT NULL DEFAULT '0',
  `model_id` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_tags
-- ----------------------------
INSERT INTO `cmswing_tags` VALUES ('1', '颜色', '1', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('2', '尺寸', '0', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('3', '尺码', '0', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('4', '克重', '0', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('5', '款式', '0', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('6', '测试', '0', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('7', '再测试', '0', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('8', '选择版本', '1', '1', '0', '0', '0', '4');
INSERT INTO `cmswing_tags` VALUES ('9', '选择颜色', '0', '1', '0', '0', '0', '4');

-- ----------------------------
-- Table structure for cmswing_wx_custom_menu
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_custom_menu`;
CREATE TABLE `cmswing_wx_custom_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `custom_menu` text COMMENT '自定义菜单数据',
  `personality` int(2) DEFAULT NULL COMMENT '个性菜单筛选条件--->\r\n1、用户分组（开发者的业务需求可以借助用户分组来完成）\r\n2、性别\r\n3、手机操作系统\r\n4、地区（用户在微信客户端设置的地区）\r\n5、语言（用户在微信客户端设置的语言）',
  `create_time` bigint(13) DEFAULT NULL COMMENT '创建时间',
  `web_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_wx_custom_menu
-- ----------------------------
INSERT INTO `cmswing_wx_custom_menu` VALUES ('8', '{\"version\":1459414877845,\"button\":[{\"name\":\"菜单名称\",\"type\":1,\"act_list\":[],\"sub_button\":[]},{\"name\":\"菜单名称\",\"type\":1,\"act_list\":[],\"sub_button\":[]},{\"name\":\"菜单名称\",\"type\":1,\"act_list\":[],\"sub_button\":[]}]}', null, '1459414878170', '0');

-- ----------------------------
-- Table structure for cmswing_wx_keywords
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_keywords`;
CREATE TABLE `cmswing_wx_keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword_name` varchar(50) NOT NULL DEFAULT '',
  `match_type` int(1) DEFAULT '1' COMMENT '1:全匹配，2:模糊',
  `rule_id` int(11) DEFAULT NULL COMMENT '所属规则id',
  `create_time` bigint(13) DEFAULT NULL COMMENT '创建时间',
  `web_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `keyword_name` (`keyword_name`),
  UNIQUE KEY `keyword_name_2` (`keyword_name`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_wx_keywords
-- ----------------------------
INSERT INTO `cmswing_wx_keywords` VALUES ('39', '3333', '1', '2', '1457166661206', '0');
INSERT INTO `cmswing_wx_keywords` VALUES ('40', 'a', '1', '5', '1457167002260', '0');
INSERT INTO `cmswing_wx_keywords` VALUES ('41', 'b', '1', '5', '1457167004975', '0');
INSERT INTO `cmswing_wx_keywords` VALUES ('42', 'c', '1', '5', '1457167007693', '0');
INSERT INTO `cmswing_wx_keywords` VALUES ('43', 'aaa', '1', '2', '1457313848014', '0');
INSERT INTO `cmswing_wx_keywords` VALUES ('44', 'fds', '1', '2', '1457423788130', '0');
INSERT INTO `cmswing_wx_keywords` VALUES ('45', 'dsda', '1', '2', '1457589851489', '0');

-- ----------------------------
-- Table structure for cmswing_wx_keywords_rule
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_keywords_rule`;
CREATE TABLE `cmswing_wx_keywords_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rule_name` varchar(100) DEFAULT NULL,
  `keywords_id` varchar(255) DEFAULT '' COMMENT '关键词id',
  `reply_id` varchar(255) DEFAULT '' COMMENT '自动回复id',
  `web_token` varchar(255) DEFAULT NULL,
  `create_time` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_wx_keywords_rule
-- ----------------------------
INSERT INTO `cmswing_wx_keywords_rule` VALUES ('2', 'AK47', ',39,43,44,45', ',20,53', null, '1457746290930');
INSERT INTO `cmswing_wx_keywords_rule` VALUES ('5', 'M4A1', ',40,41,42', ',39', null, '1457338079900');

-- ----------------------------
-- Table structure for cmswing_wx_masssend
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_masssend`;
CREATE TABLE `cmswing_wx_masssend` (
  `msg_id` bigint(15) NOT NULL COMMENT '已发送消息ID',
  `mate_id` int(11) DEFAULT NULL COMMENT '素材表ID',
  `create_time` bigint(13) DEFAULT NULL COMMENT '发送时间',
  `sent_count` int(11) DEFAULT NULL COMMENT '发送成功人数',
  `error_count` int(11) DEFAULT NULL COMMENT '发送失败人数',
  `material_content` text COMMENT '素材详细内容',
  `material_wx_content` text COMMENT '微信素材详细内容',
  `type` varchar(50) DEFAULT NULL COMMENT '发送类型',
  `del_status` int(11) DEFAULT '0' COMMENT '删除状态 0:未删除，1：删除',
  PRIMARY KEY (`msg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_wx_masssend
-- ----------------------------
INSERT INTO `cmswing_wx_masssend` VALUES ('402477905', '15', null, null, null, '{\"articles\":[{\"title\":\"新建一个素材\",\"thumb_media_id\":\"wc0LsqkZlrXnMNstWxP4bHmG-UyzdwtMcuY2wFmWH68\",\"author\":\"abc\",\"digest\":\"\",\"show_cover_pic\":0,\"content\":\"<p>新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":127,\"hs_image_src\":\"/upload/picture/2016-03-02/bRjow4pnaCqgaMpoOo8h6OXn.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44Dultwric4l8k0iaALRJWFicDuYwH5galJS1o34U98jMkBkU05yn5E4zdkKyD3g8h19lMib9HcQyoydJqhM7bA/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"新建一个素材\",\"author\":\"abc\",\"digest\":\"\",\"content\":\"<p>新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108503980627\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402419576&idx=1&sn=f29bef9f1cdbf5884fdaf1d643491297#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44Dultwric4l8k0iaALRJWFicDuYwH5gzafJ84ezEvpFgfrFYgIZlHusLrrcoAibQMrmZ5z3t3z7xI6h1WkJOeg\\/0?wx_fmt=jpeg\"}]}', 'newsArea', '1');
INSERT INTO `cmswing_wx_masssend` VALUES ('2549930555', '19', null, null, null, '{\"articles\":[{\"title\":\"web\",\"thumb_media_id\":\"rYTK-hn-e5tZ8LXb3ncWVmIXbkt7LYka-TMhTP7ao4o\",\"author\":\"at\",\"digest\":\"fasdfasdfdasf\",\"show_cover_pic\":0,\"content\":\"<p>fasdfasdfasdfasdffasdfdsaf</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":130,\"hs_image_src\":\"/upload/picture/2016-03-03/PRmw_LzOUt2_YT_cKvFpYal1.png\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoL7ibeGpeLt1m6y6Y2ZdiakibH2Hbgn0qibHic0FBlAmgosnK5KVrhiceFUicyBkia9s5Y33qRFAiaZkiciaqicQ/0?wx_fmt=png\"}]}', '{\"news_item\":[{\"title\":\"web\",\"author\":\"at\",\"digest\":\"fasdfasdfdasf\",\"content\":\"<p>fasdfasdfasdfasdffasdfdsaf<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108504009259\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402446899&idx=1&sn=aafae322605e2d5beb5e50c3720dc31d#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoL7ibeGpeLt1m6y6Y2Zdiakib1RKuKUROfiaVm47qN6eNhc9WlNNVtDaevAgxMC8VHGTdWxbb1JmrCbA\\/0?wx_fmt=jpeg\"}]}', 'newsArea', '1');
INSERT INTO `cmswing_wx_masssend` VALUES ('2549930583', '19', null, null, null, '{\"articles\":[{\"title\":\"web\",\"thumb_media_id\":\"rYTK-hn-e5tZ8LXb3ncWVmIXbkt7LYka-TMhTP7ao4o\",\"author\":\"at\",\"digest\":\"fasdfasdfdasf\",\"show_cover_pic\":0,\"content\":\"<p>fasdfasdfasdfasdffasdfdsaf</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":130,\"hs_image_src\":\"/upload/picture/2016-03-03/PRmw_LzOUt2_YT_cKvFpYal1.png\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoL7ibeGpeLt1m6y6Y2ZdiakibH2Hbgn0qibHic0FBlAmgosnK5KVrhiceFUicyBkia9s5Y33qRFAiaZkiciaqicQ/0?wx_fmt=png\"}]}', '{\"news_item\":[{\"title\":\"web\",\"author\":\"at\",\"digest\":\"fasdfasdfdasf\",\"content\":\"<p>fasdfasdfasdfasdffasdfdsaf<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108504009259\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402446899&idx=1&sn=aafae322605e2d5beb5e50c3720dc31d#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoL7ibeGpeLt1m6y6Y2Zdiakib1RKuKUROfiaVm47qN6eNhc9WlNNVtDaevAgxMC8VHGTdWxbb1JmrCbA\\/0?wx_fmt=jpeg\"}]}', 'newsArea', '0');
INSERT INTO `cmswing_wx_masssend` VALUES ('2550086108', null, null, null, null, null, 'gdfsgdfsg', 'textArea', '0');
INSERT INTO `cmswing_wx_masssend` VALUES ('2550086115', null, null, null, null, null, 'fsdfsdf', 'textArea', '0');
INSERT INTO `cmswing_wx_masssend` VALUES ('2550086123', null, null, null, null, null, 'fsdfsdf', 'textArea', '0');
INSERT INTO `cmswing_wx_masssend` VALUES ('2550086136', '15', null, null, null, '{\"articles\":[{\"title\":\"新建一个素材\",\"thumb_media_id\":\"wc0LsqkZlrXnMNstWxP4bHmG-UyzdwtMcuY2wFmWH68\",\"author\":\"abc\",\"digest\":\"\",\"show_cover_pic\":0,\"content\":\"<p>新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":127,\"hs_image_src\":\"/upload/picture/2016-03-02/bRjow4pnaCqgaMpoOo8h6OXn.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44Dultwric4l8k0iaALRJWFicDuYwH5galJS1o34U98jMkBkU05yn5E4zdkKyD3g8h19lMib9HcQyoydJqhM7bA/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"新建一个素材\",\"author\":\"abc\",\"digest\":\"\",\"content\":\"<p>新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108503980627\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402419576&idx=1&sn=f29bef9f1cdbf5884fdaf1d643491297#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44Dultwric4l8k0iaALRJWFicDuYwH5gzafJ84ezEvpFgfrFYgIZlHusLrrcoAibQMrmZ5z3t3z7xI6h1WkJOeg\\/0?wx_fmt=jpeg\"}]}', 'newsArea', '0');
INSERT INTO `cmswing_wx_masssend` VALUES ('2556300611', null, null, null, null, null, '哦怕p\'风格化', 'textArea', '0');
INSERT INTO `cmswing_wx_masssend` VALUES ('2556305274', null, null, null, null, null, 'fsdsdf[微笑]sdfsdf[得意]', 'textArea', '1');
INSERT INTO `cmswing_wx_masssend` VALUES ('2556306296', '17', null, null, null, '{\"articles\":[{\"title\":\"dddd\",\"thumb_media_id\":\"Pi0Cuuy_spnDgDCEsbVSgIyVWr7sNlOC3n2_op23J6M\",\"author\":\"ddd\",\"digest\":\"发大水范德萨分士大夫犯得上发\",\"show_cover_pic\":0,\"content\":\"<p>fsdfdsfdsf犯得上发射点发大水范德萨分</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":128,\"hs_image_src\":\"/upload/picture/2016-03-03/23Xpu3B-m6pvp1lr49Syzp1c.png\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMEMOpdJBnhYLFdhOIN0oAYqGhAHlZ77fS7tMEicwHvIAibUFibHa6TIpBw/0?wx_fmt=png\"}]}', '{\"news_item\":[{\"title\":\"dddd\",\"author\":\"ddd\",\"digest\":\"发大水范德萨分士大夫犯得上发\",\"content\":\"<p>fsdfdsfdsf犯得上发射点发大水范德萨分<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108510379183\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzI3NjA3NDgzNw==&mid=408816884&idx=1&sn=dd8ccdfbd7d0fd8785f63ed41a1f908d#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMos8AcWWBvpB16DKSHg5iaqW02dFG08sCeEzNXqVQicJCp8vLqib56FdXg\\/0?wx_fmt=jpeg\"}]}', 'newsArea', '1');
INSERT INTO `cmswing_wx_masssend` VALUES ('2556307496', '18', null, null, null, '{\"articles\":[{\"title\":\"房价上涨\",\"thumb_media_id\":\"tMnUi4E7UQtt-hn3WJc2AX4wuNZPy6HOpTOvnIl05Do\",\"author\":\"二师兄\",\"digest\":\"发士大夫大师傅\",\"show_cover_pic\":0,\"content\":\"<p>但是犯得上犯得上法士大夫大师傅</p>\",\"content_source_url\":\"http://www.qq.com\",\"hs_image_id\":129,\"hs_image_src\":\"/upload/picture/2016-03-03/5k4rgSCzUTbtjE7S0it9cUOV.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMeNzdFx7VFVl0FtWvTuVkPVmabI41zs0VJMtX7OkC9lPNyv4NAjPWXA/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"房价上涨\",\"author\":\"二师兄\",\"digest\":\"发士大夫大师傅\",\"content\":\"<p>但是犯得上犯得上法士大夫大师傅<\\/p>\",\"content_source_url\":\"http:\\/\\/www.qq.com\",\"thumb_media_id\":\"1108510386186\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzI3NjA3NDgzNw==&mid=408823830&idx=1&sn=405224e4e5a646c2f19a588bcfe46c6a#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMCn7nlFYTKPjWsYCeGT15PAmHJ2QsN1LXGeFLZ5wv2nmiaZ3fGpxzUiaA\\/0?wx_fmt=jpeg\"}]}', 'newsArea', '0');

-- ----------------------------
-- Table structure for cmswing_wx_material
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_material`;
CREATE TABLE `cmswing_wx_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `media_id` varchar(255) DEFAULT NULL COMMENT '微信素材media_id',
  `material_content` text COMMENT '素材详细内容',
  `material_wx_content` text COMMENT '微信同步的素材信息',
  `web_token` varchar(255) DEFAULT '0' COMMENT '该素材所从属的微信公众号id,  0为测试或发生错误的数据',
  `add_time` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_wx_material
-- ----------------------------
INSERT INTO `cmswing_wx_material` VALUES ('15', 'wc0LsqkZlrXnMNstWxP4bNz1iPPpmGyfwGJ2wgJgkcY', '{\"articles\":[{\"title\":\"新建一个素材\",\"thumb_media_id\":\"wc0LsqkZlrXnMNstWxP4bHmG-UyzdwtMcuY2wFmWH68\",\"author\":\"abc\",\"digest\":\"\",\"show_cover_pic\":0,\"content\":\"<p>新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":127,\"hs_image_src\":\"/upload/picture/2016-03-02/bRjow4pnaCqgaMpoOo8h6OXn.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44Dultwric4l8k0iaALRJWFicDuYwH5galJS1o34U98jMkBkU05yn5E4zdkKyD3g8h19lMib9HcQyoydJqhM7bA/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"新建一个素材\",\"author\":\"abc\",\"digest\":\"\",\"content\":\"<p>新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材新建一个素材<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108503980627\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402419576&idx=1&sn=f29bef9f1cdbf5884fdaf1d643491297#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44Dultwric4l8k0iaALRJWFicDuYwH5gzafJ84ezEvpFgfrFYgIZlHusLrrcoAibQMrmZ5z3t3z7xI6h1WkJOeg\\/0?wx_fmt=jpeg\"}]}', '0', '1456896104387');
INSERT INTO `cmswing_wx_material` VALUES ('17', 'Pi0Cuuy_spnDgDCEsbVSgGz_7_fR7NEZ1cP4x99_75Y', '{\"articles\":[{\"title\":\"dddd\",\"thumb_media_id\":\"Pi0Cuuy_spnDgDCEsbVSgIyVWr7sNlOC3n2_op23J6M\",\"author\":\"ddd\",\"digest\":\"发大水范德萨分士大夫犯得上发\",\"show_cover_pic\":0,\"content\":\"<p>fsdfdsfdsf犯得上发射点发大水范德萨分</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":128,\"hs_image_src\":\"/upload/picture/2016-03-03/23Xpu3B-m6pvp1lr49Syzp1c.png\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMEMOpdJBnhYLFdhOIN0oAYqGhAHlZ77fS7tMEicwHvIAibUFibHa6TIpBw/0?wx_fmt=png\"}]}', '{\"news_item\":[{\"title\":\"dddd\",\"author\":\"ddd\",\"digest\":\"发大水范德萨分士大夫犯得上发\",\"content\":\"<p>fsdfdsfdsf犯得上发射点发大水范德萨分<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108510379183\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzI3NjA3NDgzNw==&mid=408816884&idx=1&sn=dd8ccdfbd7d0fd8785f63ed41a1f908d#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMos8AcWWBvpB16DKSHg5iaqW02dFG08sCeEzNXqVQicJCp8vLqib56FdXg\\/0?wx_fmt=jpeg\"}]}', '0', '1456973404507');
INSERT INTO `cmswing_wx_material` VALUES ('18', 'tMnUi4E7UQtt-hn3WJc2AWPLlC8vDXHio-86LjOd1_w', '{\"articles\":[{\"title\":\"房价上涨\",\"thumb_media_id\":\"tMnUi4E7UQtt-hn3WJc2AX4wuNZPy6HOpTOvnIl05Do\",\"author\":\"二师兄\",\"digest\":\"发士大夫大师傅\",\"show_cover_pic\":0,\"content\":\"<p>但是犯得上犯得上法士大夫大师傅</p>\",\"content_source_url\":\"http://www.qq.com\",\"hs_image_id\":129,\"hs_image_src\":\"/upload/picture/2016-03-03/5k4rgSCzUTbtjE7S0it9cUOV.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMeNzdFx7VFVl0FtWvTuVkPVmabI41zs0VJMtX7OkC9lPNyv4NAjPWXA/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"房价上涨\",\"author\":\"二师兄\",\"digest\":\"发士大夫大师傅\",\"content\":\"<p>但是犯得上犯得上法士大夫大师傅<\\/p>\",\"content_source_url\":\"http:\\/\\/www.qq.com\",\"thumb_media_id\":\"1108510386186\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzI3NjA3NDgzNw==&mid=408823830&idx=1&sn=405224e4e5a646c2f19a588bcfe46c6a#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/yNHpDQhqmZlyDdIz7HsuBxC9Na7Ria9XMCn7nlFYTKPjWsYCeGT15PAmHJ2QsN1LXGeFLZ5wv2nmiaZ3fGpxzUiaA\\/0?wx_fmt=jpeg\"}]}', '0', '1456995670824');
INSERT INTO `cmswing_wx_material` VALUES ('19', 'rYTK-hn-e5tZ8LXb3ncWVq34nywh3T5vb78AdQ41zUY', '{\"articles\":[{\"title\":\"web\",\"thumb_media_id\":\"rYTK-hn-e5tZ8LXb3ncWVmIXbkt7LYka-TMhTP7ao4o\",\"author\":\"at\",\"digest\":\"fasdfasdfdasf\",\"show_cover_pic\":0,\"content\":\"<p>fasdfasdfasdfasdffasdfdsaf</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":130,\"hs_image_src\":\"/upload/picture/2016-03-03/PRmw_LzOUt2_YT_cKvFpYal1.png\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoL7ibeGpeLt1m6y6Y2ZdiakibH2Hbgn0qibHic0FBlAmgosnK5KVrhiceFUicyBkia9s5Y33qRFAiaZkiciaqicQ/0?wx_fmt=png\"}]}', '{\"news_item\":[{\"title\":\"web\",\"author\":\"at\",\"digest\":\"fasdfasdfdasf\",\"content\":\"<p>fasdfasdfasdfasdffasdfdsaf<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108504009259\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402446899&idx=1&sn=aafae322605e2d5beb5e50c3720dc31d#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoL7ibeGpeLt1m6y6Y2Zdiakib1RKuKUROfiaVm47qN6eNhc9WlNNVtDaevAgxMC8VHGTdWxbb1JmrCbA\\/0?wx_fmt=jpeg\"}]}', '0', '1456999730715');
INSERT INTO `cmswing_wx_material` VALUES ('20', 'WHaDQ3y1CKv2E53_pazWIVY3E4LrPQcM6-iGh-otUfk', '{\"articles\":[{\"title\":\"mawt\",\"thumb_media_id\":\"WHaDQ3y1CKv2E53_pazWIeMAv9lb3G5B-0milOTSTDM\",\"author\":\"\",\"digest\":\"fdsfdsafdsafdasfa\",\"show_cover_pic\":0,\"content\":\"<p>fdsfdsadfsa&nbsp;</p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":131,\"hs_image_src\":\"/upload/picture/2016-03-05/ORumm4ua0wP8VFVX2U_q_smf.gif\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwqO95lFLgR0r32eqOhRwRm16mvMegFJLT14SsPKRoiaOWNnFm5Ttv9qIJqAD87GvMqDuvVwgS6dF0A/0?wx_fmt=gif\"}]}', '{\"news_item\":[{\"title\":\"mawt\",\"author\":\"\",\"digest\":\"fdsfdsafdsafdasfa\",\"content\":\"<p>fdsfdsadfsa&nbsp;<\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108504043141\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402480783&idx=1&sn=ba123a5566719f12d7468c117d833c50#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwqO95lFLgR0r32eqOhRwRm18pkQ40UKakkoTlE0B54mKmKy87ibkiaoSesbYLMVxrzQVzjXZibYENwrg\\/0?wx_fmt=jpeg\"}]}', '0', '1457150761226');
INSERT INTO `cmswing_wx_material` VALUES ('21', '9Cr2Bm9hgX-KU4W60VwU8rafcbZElvnh5chbHQx2t8M', '{\"articles\":[{\"title\":\"新测试一个图文CJL\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8mkfxAG8JLHlmuyTwJVj-9A\",\"author\":\"陈金龙\",\"digest\":\"这一次我填写了摘要\",\"show_cover_pic\":0,\"content\":\"<p>这是我新测试的一个图文消息。<span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span></p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":132,\"hs_image_src\":\"/upload/picture/2016-03-07/6ziUDB3F195pPTTGsVnStrVv.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OGyD4pQgAW8oBrEV0ILu1icBnJZgha4cp2tZMicxibP3tyYFYhLUnmEBibA/0?wx_fmt=jpeg\"},{\"title\":\"多加几个图文\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8k9ONjoUn27-hhBPIwsLKzI\",\"author\":\"陈金龙\",\"digest\":\"多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文\",\"show_cover_pic\":0,\"content\":\"<p>多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文</p>\",\"content_source_url\":\"\",\"hs_image_id\":133,\"hs_image_src\":\"/upload/picture/2016-03-07/iZ_Svh6AD1xCeqngAwH10k4p.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OiaLicS4pFTdIibqmMDhkz5UZFH52eeL9qG9RibMqUk69l06CAdvtVjyR1w/0?wx_fmt=jpeg\"},{\"title\":\"再来一个\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8sKERMFMOIo4s4GQ54n0wL4\",\"author\":\"陈金龙\",\"digest\":\"再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个\",\"show_cover_pic\":0,\"content\":\"<p>再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个</p>\",\"content_source_url\":\"\",\"hs_image_id\":134,\"hs_image_src\":\"/upload/picture/2016-03-07/blJ0zuTKHv1dtTKZAkgLcHhq.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3Ooib5kNLDtxnCLCrm9L4wPlSg6MYGx0arJOtG9cCfsmYtrRgZf9XP2kw/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"新测试一个图文CJL\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>这是我新测试的一个图文消息。<span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108504088194\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402525923&idx=1&sn=48be99574d3e3b1484ad7e32260e3967#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3O7fPGssYzJ865gOy4Impqs487AAgWMrh4hE3nZK9PAm4oJnqS0DuFFA\\/0?wx_fmt=jpeg\"},{\"title\":\"多加几个图文\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"1108504088214\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402525923&idx=2&sn=5e8de06a639e776d5862aaa62f4edc6a#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3O6q2CnL1exvLhW43h7libhxWXl9GGibuzBTBZRcDtNdicqmicAC3Sm4sFicQ\\/0?wx_fmt=jpeg\"},{\"title\":\"再来一个\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"1108504088282\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402525923&idx=3&sn=a5b486d5f8a6d985f33d09126258dd23#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OHlh71ia0D2Nf0l7buZQqnyiaD17wicH8KqNrtRtBlLGCm6fNIGnWVmoLA\\/0?wx_fmt=jpeg\"}]}', '0', '1457331786530');
INSERT INTO `cmswing_wx_material` VALUES ('25', '9Cr2Bm9hgX-KU4W60VwU8sPa-J9e4vo3TJG1JgXNIZs', '{\"articles\":[{\"title\":\"新测试一个图文CJL-002\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8mkfxAG8JLHlmuyTwJVj-9A\",\"author\":\"陈金龙\",\"digest\":\"这一次我填写了摘要\",\"show_cover_pic\":0,\"content\":\"<p>这是我新测试的一个图文消息。<span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span></p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":132,\"hs_image_src\":\"/upload/picture/2016-03-07/6ziUDB3F195pPTTGsVnStrVv.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OGyD4pQgAW8oBrEV0ILu1icBnJZgha4cp2tZMicxibP3tyYFYhLUnmEBibA/0?wx_fmt=jpeg\"},{\"title\":\"多加几个图文\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8k9ONjoUn27-hhBPIwsLKzI\",\"author\":\"陈金龙\",\"digest\":\"多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文\",\"show_cover_pic\":0,\"content\":\"<p>多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文</p>\",\"content_source_url\":\"\",\"hs_image_id\":133,\"hs_image_src\":\"/upload/picture/2016-03-07/iZ_Svh6AD1xCeqngAwH10k4p.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OiaLicS4pFTdIibqmMDhkz5UZFH52eeL9qG9RibMqUk69l06CAdvtVjyR1w/0?wx_fmt=jpeg\"},{\"title\":\"再来一个\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8sKERMFMOIo4s4GQ54n0wL4\",\"author\":\"陈金龙\",\"digest\":\"再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个\",\"show_cover_pic\":0,\"content\":\"<p>再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个</p>\",\"content_source_url\":\"\",\"hs_image_id\":134,\"hs_image_src\":\"/upload/picture/2016-03-07/blJ0zuTKHv1dtTKZAkgLcHhq.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3Ooib5kNLDtxnCLCrm9L4wPlSg6MYGx0arJOtG9cCfsmYtrRgZf9XP2kw/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"新测试一个图文CJL-002\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>这是我新测试的一个图文消息。<span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"1108504088194\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402526805&idx=1&sn=a705b7ecd003d3c534eb44a8cf74e309#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3O7fPGssYzJ865gOy4Impqs487AAgWMrh4hE3nZK9PAm4oJnqS0DuFFA\\/0?wx_fmt=jpeg\"},{\"title\":\"多加几个图文\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"1108504088214\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402526805&idx=2&sn=452d657cae01a10d5b6f9cb07bb80dd9#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3O6q2CnL1exvLhW43h7libhxWXl9GGibuzBTBZRcDtNdicqmicAC3Sm4sFicQ\\/0?wx_fmt=jpeg\"},{\"title\":\"再来一个\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"1108504088282\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402526805&idx=3&sn=cb342bf344a93e8e19d406a9d4d7db39#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OHlh71ia0D2Nf0l7buZQqnyiaD17wicH8KqNrtRtBlLGCm6fNIGnWVmoLA\\/0?wx_fmt=jpeg\"}]}', '0', '1457333920814');
INSERT INTO `cmswing_wx_material` VALUES ('29', 'dfqKqVVCQira496OgJtSr_RNzrZSt33zAWYv_SWxi30', '{\"articles\":[{\"title\":\"产出测试\",\"thumb_media_id\":\"dfqKqVVCQira496OgJtSr4mMCOILHSaiul5NBSfceD8\",\"author\":\"啊啊\",\"digest\":\"\",\"show_cover_pic\":0,\"content\":\"<p>啊但是发射点法阿斯顿发射点</p>\",\"content_source_url\":\"\",\"hs_image_id\":138,\"hs_image_src\":\"/upload/picture/2016-03-07/k9qRxNOqSS_THYKZnDJ9m9y2.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3O85zuOsAC7Fzr778PCakrTQBVHjW8bmglkW2Kh2SAHWBpGV0Tjjfypw/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"产出测试\",\"author\":\"啊啊\",\"digest\":\"\",\"content\":\"<p>啊但是发射点法阿斯顿发射点<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"1108504094648\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402532288&idx=1&sn=9c74d4360c48b34fec81e7d6701ecb9a#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OFO3CwWrxIo0r4UrcicyhFYBXxujkFJoys7xLRk1fjiaQiaxpWy5p0R8fQ\\/0?wx_fmt=jpeg\"}]}', '0', '1457347432507');
INSERT INTO `cmswing_wx_material` VALUES ('30', 'dfqKqVVCQira496OgJtSr5-mwnewX-nCLxF_MN2nGOc', '{\"articles\":[{\"title\":\"啊啊啊\",\"thumb_media_id\":\"dfqKqVVCQira496OgJtSr7Rh9-vNLPeb99JKpi-iILg\",\"author\":\"顶顶顶\",\"digest\":\"\",\"show_cover_pic\":0,\"content\":\"<p>蒂法蒂法</p>\",\"content_source_url\":\"\",\"hs_image_id\":139,\"hs_image_src\":\"/upload/picture/2016-03-07/-U8YWBhU77WyqU40ElpuJANW.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3Ooib5kNLDtxnCLCrm9L4wPlSg6MYGx0arJOtG9cCfsmYtrRgZf9XP2kw/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"啊啊啊\",\"author\":\"顶顶顶\",\"digest\":\"\",\"content\":\"<p>蒂法蒂法<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"1108504094904\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402532543&idx=1&sn=4bceba85b5972c0e0aa12b3636edc082#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OHlh71ia0D2Nf0l7buZQqnyiaD17wicH8KqNrtRtBlLGCm6fNIGnWVmoLA\\/0?wx_fmt=jpeg\"}]}', '0', '1457348282845');
INSERT INTO `cmswing_wx_material` VALUES ('32', 'xD7IA7_unlgzvzsav48XtNgW51_z9ldDt2EYe3AU2mM', '{\"articles\":[{\"title\":\"新测试一个图文CJL001\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8mkfxAG8JLHlmuyTwJVj-9A\",\"author\":\"陈金龙\",\"digest\":\"这一次我填写了摘要\",\"show_cover_pic\":0,\"content\":\"<p>这是我新测试的一个图文消息。<span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。</span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。121</span></p>\",\"content_source_url\":\"http://www.baidu.com\",\"hs_image_id\":132,\"hs_image_src\":\"/upload/picture/2016-03-07/6ziUDB3F195pPTTGsVnStrVv.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OGyD4pQgAW8oBrEV0ILu1icBnJZgha4cp2tZMicxibP3tyYFYhLUnmEBibA/0?wx_fmt=jpeg\"},{\"title\":\"多加几个图文\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8k9ONjoUn27-hhBPIwsLKzI\",\"author\":\"陈金龙\",\"digest\":\"多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文\",\"show_cover_pic\":0,\"content\":\"<p>多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文</p>\",\"content_source_url\":\"\",\"hs_image_id\":133,\"hs_image_src\":\"/upload/picture/2016-03-07/iZ_Svh6AD1xCeqngAwH10k4p.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3OiaLicS4pFTdIibqmMDhkz5UZFH52eeL9qG9RibMqUk69l06CAdvtVjyR1w/0?wx_fmt=jpeg\"},{\"title\":\"再来一个\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8sKERMFMOIo4s4GQ54n0wL4\",\"author\":\"陈金龙\",\"digest\":\"再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个\",\"show_cover_pic\":0,\"content\":\"<p>再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个</p>\",\"content_source_url\":\"\",\"hs_image_id\":134,\"hs_image_src\":\"/upload/picture/2016-03-07/blJ0zuTKHv1dtTKZAkgLcHhq.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwoHa8aJ8CQ54qPKuPugtE3Ooib5kNLDtxnCLCrm9L4wPlSg6MYGx0arJOtG9cCfsmYtrRgZf9XP2kw/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"新测试一个图文CJL001\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>这是我新测试的一个图文消息。<span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。<\\/span><span style=\\\"line-height: 22.4px; white-space: normal;\\\">这是我新测试的一个图文消息。121<\\/span><\\/p>\",\"content_source_url\":\"http:\\/\\/www.baidu.com\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8mkfxAG8JLHlmuyTwJVj-9A\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402570117&idx=1&sn=df89f6b1da8b33ae7dd8e8e3c9ad89de#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwqHhHVOVktfxuPpfTjxYha2xxWspn9vmcrrPCHAZtkoBJHN6p70YhZaeljn7gunfMAGCaFCz6AEiaw\\/0?wx_fmt=jpeg\"},{\"title\":\"多加几个图文\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8k9ONjoUn27-hhBPIwsLKzI\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402570117&idx=2&sn=9b6e571ab204f7e3d8f5785435b62c22#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwqHhHVOVktfxuPpfTjxYha2MNYUtCNxK6mTic82MrDXyEC6dbUc9AD6OUic93NABgxWbAFrYnFxMicIQ\\/0?wx_fmt=jpeg\"},{\"title\":\"再来一个\",\"author\":\"陈金龙\",\"digest\":\"\",\"content\":\"<p>再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"9Cr2Bm9hgX-KU4W60VwU8sKERMFMOIo4s4GQ54n0wL4\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402570117&idx=3&sn=501cb1bc798905102ee6e614501f93f7#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwqHhHVOVktfxuPpfTjxYha2P6RFvpA6uicf878E6aPTKXFkPt0b5WKYqtr2vBLP960cW1tRmd6HADQ\\/0?wx_fmt=jpeg\"}]}', '0', '1457513770505');
INSERT INTO `cmswing_wx_material` VALUES ('33', '-_v9RtdDFiYrshNDq72B4PqnUmJogESsGc8TvF8OjiA', '{\"articles\":[{\"title\":\"啊啊阿三地方\",\"thumb_media_id\":\"-_v9RtdDFiYrshNDq72B4KLdbo1D9cuaIYOiDZdlc1E\",\"author\":\"阿德\",\"digest\":\"\",\"show_cover_pic\":0,\"content\":\"<p>发手动阀手动阀手动阀 爱的色放</p>\",\"content_source_url\":\"\",\"hs_image_id\":156,\"hs_image_src\":\"/upload/picture/2016-03-10/_cOfeRcqlq6yvLaUk-w_H-2d.jpg\",\"hs_image_wx_src\":\"https://mmbiz.qlogo.cn/mmbiz/tibZ44DultwqyDia4xwc1YkHOG51gybfED82emuKjwhX8aExKonc8dbIABSZKRXnsCmzvjPxH6smjmQcTDica5Lpw/0?wx_fmt=jpeg\"}]}', '{\"news_item\":[{\"title\":\"啊啊阿三地方\",\"author\":\"阿德\",\"digest\":\"\",\"content\":\"<p>发手动阀手动阀手动阀 爱的色放<\\/p>\",\"content_source_url\":\"\",\"thumb_media_id\":\"-_v9RtdDFiYrshNDq72B4KLdbo1D9cuaIYOiDZdlc1E\",\"show_cover_pic\":0,\"url\":\"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MzA3NDUyMTU2Nw==&mid=402589545&idx=1&sn=f2418e7109a6a47da76a78136ff5ab9c#rd\",\"thumb_url\":\"http:\\/\\/mmbiz.qpic.cn\\/mmbiz\\/tibZ44DultwqyDia4xwc1YkHOG51gybfEDwNndZ1YLj2ycHwic0JBbkK5aibJibaA4ZEBsSmYMpZG9tb15zuvbiaZJVw\\/0?wx_fmt=jpeg\"}]}', '0', '1457595235615');

-- ----------------------------
-- Table structure for cmswing_wx_menu
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_menu`;
CREATE TABLE `cmswing_wx_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `m_id` varchar(50) DEFAULT NULL COMMENT '微信菜单ID',
  `sort` tinyint(4) DEFAULT '0' COMMENT '菜单排序字段',
  `pid` varchar(30) DEFAULT '0' COMMENT '0: 一级菜单 1：二级菜单',
  `title` varchar(50) DEFAULT NULL COMMENT '菜单名',
  `keyword` varchar(100) DEFAULT NULL COMMENT '关联关键词',
  `url` varchar(255) DEFAULT NULL COMMENT '关联URL',
  `web_token` varchar(255) DEFAULT NULL COMMENT '公众号Token',
  `type` varchar(30) DEFAULT 'click' COMMENT 'click:点击推送事件 \r\nview：点击跳转URL\r\nscancode_push:扫码推事件\r\nscancode_waitmsg：扫码推事件且弹出“消息接收中”提示框\r\npic_sysphoto：弹出系统拍照发图\r\npic_photo_or_album：弹出拍照或者相册发图\r\npic_weixin：弹出微信相册发图器\r\nlocation_select：弹出地理位置选择器\r\nmedia_id：下发消息（除文本消息）\r\nview_limited：跳转图文消息URL\r\n',
  `status` tinyint(11) DEFAULT NULL,
  `media_id` varchar(50) DEFAULT NULL COMMENT '永久素材ID',
  `key` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=146 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cmswing_wx_menu
-- ----------------------------
INSERT INTO `cmswing_wx_menu` VALUES ('138', 'bbb', '1457572811161', '1', '0', null, null, '', '', 'click', null, '', null);
INSERT INTO `cmswing_wx_menu` VALUES ('140', '111', '1457572832661', '1', '1457572798672', null, null, '', '', 'click', null, '', null);
INSERT INTO `cmswing_wx_menu` VALUES ('141', '222', '1457572843502', '2', '1457572798672', null, null, '', '', 'click', null, '', null);
INSERT INTO `cmswing_wx_menu` VALUES ('142', 'b11', '1457572851470', '1', '1457572811161', null, null, '', '', 'click', null, '', null);
INSERT INTO `cmswing_wx_menu` VALUES ('143', 'c11', '1457572861534', '1', '1457572820610', null, null, '', '', 'click', null, '', null);
INSERT INTO `cmswing_wx_menu` VALUES ('145', 'a11', '1457572969805', '1', '1457572930910', null, null, '', '', 'media_id', null, '', null);

-- ----------------------------
-- Table structure for cmswing_wx_replylist
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_replylist`;
CREATE TABLE `cmswing_wx_replylist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` bigint(13) DEFAULT NULL,
  `type` enum('news','music','video','voice','image','text') DEFAULT NULL,
  `content` text,
  `media_id` varchar(255) DEFAULT NULL COMMENT '通过素材管理接口上传多媒体文件，得到的id',
  `title` varchar(200) DEFAULT NULL COMMENT '消息标题',
  `description` text COMMENT '消息描述',
  `music_url` varchar(255) DEFAULT NULL COMMENT '音乐链接',
  `hq_music_url` varchar(255) DEFAULT NULL COMMENT '高质量音乐链接，WIFI环境优先使用该链接播放音乐',
  `thumb_media_id` varchar(255) DEFAULT NULL COMMENT '缩略图的媒体id，通过素材管理接口上传多媒体文件，得到的id',
  `article_count` int(2) DEFAULT '0' COMMENT '图文消息个数，限制为10条以内',
  `articles` text COMMENT '多条图文消息信息，默认第一个item为大图,注意，如果图文数超过10，则将会无响应',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200',
  `url` varchar(255) DEFAULT NULL COMMENT '点击图文消息跳转链接',
  `web_token` varchar(255) DEFAULT NULL,
  `reply_type` int(11) DEFAULT '0' COMMENT '回复类型 1：关注自动回复 2：消息自动回复 3：关键词自动回复',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_wx_replylist
-- ----------------------------
INSERT INTO `cmswing_wx_replylist` VALUES ('2', null, 'image', '', null, null, null, null, null, null, '0', null, null, null, null, null);
INSERT INTO `cmswing_wx_replylist` VALUES ('4', '1456999923044', 'text', 'kasdfjj', null, null, null, null, null, null, '0', null, null, null, '0', null);
INSERT INTO `cmswing_wx_replylist` VALUES ('5', '1457054837059', 'text', 'asdfsa', null, null, null, null, null, null, '0', null, null, null, '0', null);
INSERT INTO `cmswing_wx_replylist` VALUES ('6', '1457057377461', 'text', '啊打发', null, null, null, null, null, null, '0', null, null, null, '0', null);
INSERT INTO `cmswing_wx_replylist` VALUES ('7', '1457087578779', 'text', 'adsf&nbsp;', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('9', '1457145351006', 'text', 'asdfad', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('19', '1457147389088', 'text', 'adfa', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('20', '1458031709827', 'text', 'adfa', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('32', '1457162747756', 'text', '445', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('39', '1457331225316', 'text', '测试abc的自动回复功能，ok?', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('53', '1457313862901', 'text', 'fsdfsdfsdf', null, null, null, null, null, null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_wx_replylist` VALUES ('92', null, 'news', '[{\"title\":\"新测试一个图文CJL-002\",\"description\":\"这一次我填写了摘要\",\"pic_url\":\"/upload/picture/2016-03-07/6ziUDB3F195pPTTGsVnStrVv.jpg\",\"url\":\"http://www.baidu.com\"},{\"title\":\"多加几个图文\",\"description\":\"多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文多加几个图文\",\"pic_url\":\"/upload/picture/2016-03-07/iZ_Svh6AD1xCeqngAwH10k4p.jpg\",\"url\":\"\"},{\"title\":\"再来一个\",\"description\":\"再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个再来一个\",\"pic_url\":\"/upload/picture/2016-03-07/blJ0zuTKHv1dtTKZAkgLcHhq.jpg\",\"url\":\"\"}]', null, null, null, null, null, null, '0', null, null, null, null, '2');
INSERT INTO `cmswing_wx_replylist` VALUES ('93', null, 'text', '你好，欢迎！！！', null, null, null, null, null, null, '0', null, null, null, null, '1');

-- ----------------------------
-- Table structure for cmswing_wx_user
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_wx_user`;
CREATE TABLE `cmswing_wx_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '粉丝ID',
  `subscribe` int(11) DEFAULT NULL COMMENT '用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。',
  `openid` varchar(100) DEFAULT NULL COMMENT '用户的标识，对当前公众号唯一',
  `nickname` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户的昵称',
  `sex` int(11) DEFAULT NULL COMMENT '用户的性别，值为1时是男性，值为2时是女性，值为0时是未知',
  `city` varchar(50) DEFAULT NULL COMMENT '用户所在城市',
  `country` varchar(50) DEFAULT NULL COMMENT '用户所在国家',
  `province` varchar(50) DEFAULT NULL COMMENT '用户所在省份',
  `language` varchar(50) DEFAULT NULL COMMENT '用户的语言，简体中文为zh_CN',
  `headimgurl` text COMMENT '用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。',
  `subscribe_time` bigint(13) DEFAULT NULL COMMENT '用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间',
  `unionid` varchar(100) DEFAULT NULL COMMENT '只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。',
  `remark` text COMMENT '公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注',
  `groupid` int(11) DEFAULT NULL COMMENT '用户所在的分组ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1744 DEFAULT CHARSET=utf8 COMMENT='微信粉丝表';

-- ----------------------------
-- Records of cmswing_wx_user
-- ----------------------------
INSERT INTO `cmswing_wx_user` VALUES ('1554', '1', 'o33lBt0Pz3rEXUARWtUUO5GxuUG0', ' 阿 特 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr6pFXjQd4NEO1dWC8Atlib6Y5pLdxQHNiaWqpxcZmA5mnxzicYejNoU7uTSuw29sQG04mjwIEO4rBUw/0', '1445592951000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1555', '1', 'o33lBt-rbaJuS11dbRUjNeR12wn4', ' 地 球 屋 零 食 驿 站 ', '1', '淮北', '中国', '安徽', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELaEUaXdAGrwVV5ykBGM1poDywic7dNuesdhUqH31ic3fdf70GXhS9zQkRZ7wNdfMvYKZQZkxyKwdsw/0', '1440583938000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1556', '1', 'o33lBt0nWQQQD3Yq3pdysE24ambA', ' 峰 『 沃 』 梅 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nyQZ4D4KRialkCj0d4SM4WmDOziclbafaQQXuXUKriawyPsNRbWvpIpsibicuqDkYl5ic3hbkJkxLa6V0A/0', '1445592972000', null, '', '100');
INSERT INTO `cmswing_wx_user` VALUES ('1557', '1', 'o33lBt5x6w-nsEam58BUdGMfkeDA', ' V I P ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM5Mvs7yibR3AXdrU71WnNw8ArZ2q76bznibXicFGVwibkd5Nv5J6nQVKMhZqjIlH15aRpcJpPibPibeW4Gw/0', '1438741015000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1558', '1', 'o33lBt80WXrW2V_-KZ7cSAXwF9P4', ' 头 狼 电 商 C E O 朱 加 宝 ', '1', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJKw5ZcWLxofQJUHhKtpiaqXE5z5wVbUNOb97TzNLcAMzG23FsxIBKm4ZpDjAF4gXXa1KffcdIjNlTY/0', '1428995926000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1559', '1', 'o33lBt2cS_90vF0TKWaIY1Eh13nM', ' � �   B e a r x i w i   � � ', '2', '武汉', '中国', '湖北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM5Vq0KjBjDgpr0RZCxhhHFJcNaBwjTvej04L2lTQKslj1eQwt5xib9HQrQ034NK3Zt4iaK2TNp3f3icQ/0', '1432717201000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1560', '1', 'o33lBt78cAEU6twkkGX8ymvJmD5s', '  金  ', '2', '洛阳', '中国', '河南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1mQbb7yJ3rGeHFQskYaFmdqOIC1ZARDRrzNjbUXYianm43KurjM2hmfyjOGq5Su8hMAy0awVcIo7cw/0', '1443108841000', null, '金', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1561', '1', 'o33lBtwyePBtiyBzgHdmQN3bXEAY', ' 杜 喜 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuialiaBbYXI6sEHW3tibnRpZiaice1m5CzqRklTmft5T94MPwqC8LxqJyUoJibehPnymfsy9jA1ssQIwUTHVO2MPKkwE/0', '1427964371000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1562', '1', 'o33lBt6seqBYZKgh7__dysE_hUoY', ' A d u ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJK0zHQ3avLfIiaSicFvbjvYsFxdf8GGOricibkGzrSdJiasopxfEiajwWaicxfKPK1aGoD9F6DXvIcFvLia6N/0', '1429611499000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1563', '1', 'o33lBt4eBBFFO2u4hfY28Ry9vN-U', ' 安 静 ', '1', '徐汇', '中国', '上海', 'zh_CN', 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLA4sLtic6pgG7zUaCzjlhwaYibN3EWrJM3fVrgzZsicXgnmdtric9DlhyibzDx0SHnpedwXcBBaE2icUE3A/0', '1429947807000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1564', '1', 'o33lBt1Hv-EjBBCMsVvWhbrz8lKY', ' 花 久 美 ', '1', '泰州', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEIPt0Erg6HKiaYL3XXyBiblEabkYRSiaiauCtNmo6MQKHheeSiat4lF8IGbrmyavib15KLlEq1qvLfpHOWQ/0', '1440408128000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1565', '1', 'o33lBt-zyAy1Humy_NW8lplcBH3c', ' 可 可 ', '2', '柳州', '中国', '广西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJK0icfwytVEedvicwQ3FiaFVMC7gvSn1Oxv5ibR0nP9aHaEWsL4qtic1SvXqKRUdV0WHsHSTXV2ClNRIlz/0', '1432717169000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1566', '1', 'o33lBt_L0lpsBx9Etdh9MrlKKXd4', ' 夜 未 央 ', '1', '朝阳', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELSfbvMgyDgqEB6jnFt5a29ry1TFjIKTVcs5mxMZ0deVpgWjGqoJibjficz7KYUCMufrb7vAnNNnPsA/0', '1439127019000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1567', '1', 'o33lBtyC4whTOlC_RcZJB8ci_mPI', ' 萱 萱 ', '2', '昆明', '中国', '云南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpED4laKMoWDztWzxATdC6s9lIQZRHtpQ4UzFdQM7jnuYYszgUaV3m0WIz6cW0gmzN07NXwgVTuAwANGiagKEAbz/0', '1432716862000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1568', '1', 'o33lBt3ohgQvuJjrr6MG0LCw3dA0', ' G G ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEJNuLtPiaF79IpYqMKSbktcz2TRfygu6YM2JuOFgzwDlVicLz8ickbtRFSnCN99w0G14dYW8zvW5wD4w/0', '1440585547000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1569', '1', 'o33lBt0-x92aL7YFkVMWuYtUjzE0', ' 童 话 @ @ @ ', '1', '濮阳', '中国', '河南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nYwicVOdicEmgryd6XhSgGaHFJDm4zb2icKAEb7MrUUPEElqONaia4dyrLeUmwGxYQib2y0Ue94W59CoA/0', '1432606299000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1570', '1', 'o33lBt5H3g0lOrxSbNEMjUyz5CUE', ' 领 金 财 务 ', '2', '', '中国', '重庆', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJKib8Bt1wBxUNag472pUrAkBjSwoXUqPKQvZZuWdiax95QBsrBX5ypibzOh1Nd2PFjfNEApibZjF7m0icA/0', '1440583574000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1571', '1', 'o33lBtx2Qm7V-QrugPOa4ehzy6wI', ' 花 宝 宝  ', '2', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpED4laKMoWDwY7vfPqrx7ympzbFwCBsuo877b9B1HtnGSQ8GdIHib5XicibhXLxFuKyaibTuf1AKcJqnkyA77r1bqn/0', '1440584169000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1572', '1', 'o33lBtwLArbUSMCxWf9nAZnVLK4o', ' 高 雯 ', '2', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpED4laKMoWDz9s7uTdGyvZI3U6hicPG7Zwib8ez4nibhl6x9oY32nCQAUm8bCdd7KH4wXjjSNMqNeEibPhXnGtbzDN/0', '1432286488000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1573', '1', 'o33lBtyJ6izaBZ3Qzp2Cci8h-2nI', ' 啊 磊 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaELqFicTtzP8ViaImLUsewiakFuYeDs6icric4xEbiccmhvmkhBp1tEb5iazvqnU3ia81ulUmYNNPhPUN4TppA/0', '1432286537000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1574', '1', 'o33lBty-CkPeLKzkXywj1xrRGL4E', ' 1 2 3 z ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJK3oNCBx9476ibfBgcwqdO7y0aRtIImVcJDWdKaDVy3iagUDNweMR0JUsIkgbkHB0jO9pWIaCzHDaxK/0', '1432286457000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1575', '1', 'o33lBt8HZ6gTPyk2pdrgHRPKmfaY', ' 一 切 的 一 切   � � ', '2', '朝阳', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJKyhvpvhWick59EJaWq86GdhTxFLW7AFczPbfDrGoKUNar8jtfYWJymUeYqlFRDC9oRNBf7xdNiaeHJ/0', '1440587002000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1576', '1', 'o33lBt8xJcPqHjluPPXFVTporE_U', ' 淘 宝 店 铺 号         1 8 7 9 9 9 9 ', '2', '金华', '中国', '浙江', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpED4laKMoWD1xUbbiakZeiawgjR5IPLJkbefBPicPDJhXreHnczytzVQicvY41tqicPPtFibjiaLdicjH028ywECiafIVlK/0', '1440583690000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1577', '1', 'o33lBtzwXTYvexNXc2PMAf-jkxjw', ' a r n o ', '1', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1mianubgat840YsFEnTUX0m87PFBhssmwxkzRg6aCRpdXowiaZLsJHOAtzdpnDuoCGTwsgZcmqjBhFg/0', '1432717729000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1578', '1', 'o33lBt-KbgpHJK7qGEnnh5gd4WOU', ' 旺 旺 旺 ', '1', '柳州', '中国', '广西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEI0Nltqq9ChWXa7DEJQZygPRPbb7xTYrZUn7OxWIlqu37RF8tTFpbctqUopEknEADSqFw1x7E4Cibw/0', '1432716908000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1579', '1', 'o33lBt6iNEvu2FfWOfDeIzRt6vyA', ' � � V i c k y   � � ', '2', '朝阳', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuialiaBbYXI6sMkszeajO8M7V8rrAf8JhSiaOoicicEeiba6kicRaIeQOKhK1UBaTv2qicvLGmhXdrL0SmVdbwVdlIVYrB/0', '1440585071000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1580', '1', 'o33lBt_ZcVP7ifRWDKfNTdFTm9GQ', ' m i 雨 泪 ❤ ️ 碎 ', '2', '邯郸', '中国', '河北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/h5ndnicia3Rkw9R27OlfWPHoW6He1w9Oq1C8s8vUibUiawzPic1UmicIzy2atfVL3bljxAFaPPPcnJY5z4FvzKv9aGUO1hl9tWWELO/0', '1432286422000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1581', '1', 'o33lBt1wRrNLHUBVICPGjigMiaAI', ' 杨 丹 ', '1', '', '中国', '贵州', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM52vG8V5veNKjU8e5kMnGCcuESTnTILItovhHfzqrmueR7Qm3psdY9OmWvUKxEibXiaxXqvNibg0B12KnGKwicMeqWwXKU8jXfG9Us/0', '1440584791000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1582', '1', 'o33lBt4bAG5kQ7hvRSD-lgSgwrtU', ' 亚 洲 杯 ', '2', '东莞', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuialiaBbYXI6sPXlgtsXC1icib5B2FbXOlMM4r5cfeicLsOAox3DQstJRtUCKJCc7zv6Oa51As7icdHrujgAfYY97FJZ/0', '1440586427000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1583', '1', 'o33lBtwF6Jhle1tx6YjAO37vj1No', ' 龙 哥 ', '1', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPFA3ibXdOJK4b1pWicZoTX0mKIyEJpibSWkIjrdibrtps5gdQmG3icrWy3HhNicmQEiasd400tGEnXQ7UfL5IJySGwGF/0', '1440584548000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1584', '1', 'o33lBtzoWgoHZP4F1rf2qHDYTVoo', ' 一 二 三 亖 ', '1', '北帕默斯顿', '澳大利亚', '北部地区', 'zh_CN', 'http://wx.qlogo.cn/mmopen/sdXe7M2egibW5MjcC0HIUgOAzkw1tbdfZsY5oBARSpSomZnpx8jm5sZlTBWTJ5sTZWxiamJ08NBN8lfdw5L1LdtbEjjZV0ibqtP/0', '1440585672000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1585', '1', 'o33lBt90dhhy50dH2dT_niVMBRMU', ' 王 庆 阳 ', '1', '渭南', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpED4laKMoWD0G4qvyUCqPcOtpfueKXZMtGn0JkaQrxh1AwJiaA7Zm7IMbYbqBYVqjb12JlflaPEhTZGKGDpVVPw/0', '1431234155000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1586', '1', 'o33lBtwwTpfseijaBjGvr85vgzsI', ' 一 事 无 成 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/sdXe7M2egibW5MjcC0HIUgJYjMjxWv3jgJp9J84ss7VlqibUmDpicSqxNPclcGFvawpibz095X7xTV7PTpqumAQ7x6FOQdMSCLhD/0', '1432286438000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1587', '1', 'o33lBtwsgr0qUHM5sEmmzZkUwylk', ' 怪 我 过 份 美 丽 ', '2', '', '中国香港', '黄大仙区', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1lHL3ibjzPCIO23pahb7f50LibXj7XKc4tUOZWiaIecAtJw1OQB6jLT7bnaWtvFXoYfglsLmOHmxtzLl4Ro2KmleoD/0', '1440584857000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1588', '1', 'o33lBtzQPWTc9X-kPoNQpl4v2dbA', ' ☞ 你 真 逗 ☜ ', '1', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr4ftSnibBTfMibgqOR3JCbhCEMROfavmHKNTHqWmJhqJT4sffIUVg1lq9sGGicFpyXiaTEbaDRYNnxpBETH23kHpl8/0', '1440583711000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1589', '1', 'o33lBt2ylyphz9buW9ShRRwybJsQ', ' 孙 竹 伟 ', '1', '徐汇', '中国', '上海', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabWNNSj9H6v5cT6ATWw8wuFe97N307CHeELu2JnCfVhcYuYCWK8GtfJxNGUGsf7uTevoFibQU3E8EZ/0', '1432946516000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1590', '1', 'o33lBt49EqK4_J05FkzV5XwI5fzE', ' v g g j v f ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCsbKtnG0ZvoaQibAUFX9dib5WMyp0mjmnFP5RSZW9BGeP9n4OQXj6iaqicyBpcFpUibO0q8Kzb8DNA5ZUSicXCHvmCS46/0', '1440583600000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1591', '1', 'o33lBt9t4iY6yhJxmisY1fZU2mdg', '   1 2 3 4 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/0vN7h0icqp66sxkGns8JKvsibiaOICsdLgK8XgGEV1tvtib5h9JPics04hmq9LzQ39D0b9dUcUIVIUlwmaia106JJoxEo6oWRa4c1o/0', '1432286453000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1592', '1', 'o33lBt8WJcBmziIcbOEc3J1Kh3qA', ' 破 哥 ', '1', '泉州', '中国', '福建', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabSqOB2CVPsvl1dWsUCibuLP5OONJ6EZtOIVPAeAg4nzahrBVqZfC80UKcrSQGFHVibwtm1wfvZw7uy/0', '1440585293000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1593', '1', 'o33lBt4VOcpqOQEUxPPUS9DLoN30', ' 女 汉 子 也 有 柔 情 时 ', '2', '大兴', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpjfyfOTa6ZNicxT6Obriatr1XRbg6JrYM5ulEibsskkTteYarlMKx0ThjIovgqdDSmkMSRwju8dmwaZO6FficlgEjib/0', '1440586073000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1594', '1', 'o33lBtwmmiPGk3GuTRfMDEuSUANk', '  ', '1', '', '安道尔', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBgplv4qJqAs9lkZdptQEA5KFP5y4nqxRfmjUunurTOxcjXoUK1FK3XZxVeGaOSPiasGBCCHo8FZ7BstxGWry5ic9E4M46y7StRA/0', '1440583893000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1595', '1', 'o33lBtwXO3Na5dHJyg_4zoL8YkHY', ' 约 驾 客 服 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsjFLYXuFSeicvibn99K31plhIxntG6c1ZISqWm0mWMExXcSX2N2vnXjtJwHYkAs4nBBG8cZIcxfeUmKZyzYmEvLfa/0', '1440586721000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1596', '1', 'o33lBtzrZUxGTahubqAzsm6SaSdg', ' 我 不 是 土 豪 ', '2', '', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuyha6jTsbyRUOW6AgNLRv9ESEcSw97l757TUDYbpNfQGybIXuPdm8YY16eagh7aria0qFgbq6PAUefqTJgaiaKEy/0', '1440586905000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1597', '1', 'o33lBt026HsWV4hxUizc_SDlPy0c', ' 峰 ', '1', '南京', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHore5YPzUic8FJdL5o5U1gR9RmiaibJCFmFiarQdu2FL8BVxaOUouPgE831nze8ZIR4WrSTN4MXuS00P3huVwvEMVGh/0', '1432606271000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1598', '1', 'o33lBt8zL_YUkncWq4yjx__LhMio', ' 娇 香 世 家 ', '2', '', '中国', '天津', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM5AGrn2EpHCLrlUHibd6t4ODxIaBGdtqHaqF0F6lpFJoPqeBTzlSA5iaDiaJM3Jaiae1AzzwZNE1EofOPialhQicucwBGLAx6BOh3nPo/0', '1440585964000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1599', '1', 'o33lBt7D08S0GXeaYOaw3sOVzJrg', ' R a i n b o w ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1E5Pq34EiaY8vcSlVDibs0sfqevTmvvvib9G05iayJB22lO0wQ3Dh6FfKh9MUOArT4VKcKIWpPhB89YL/0', '1429600474000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1600', '1', 'o33lBt1FdLB0HaaTBpBFMDgguP9k', ' d r a g o n - 惰 ', '1', '杨浦', '中国', '上海', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Nc5ibKmjHqIUy2vnibXu3EEoWdGZqASEBW7reVVcQTnrskW29KUrIpeT9XkHdHNIyXhOQUvtOcQOYyljQkO4FPQ1ngIdwvlyhM/0', '1432717000000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1601', '1', 'o33lBtxYEsMGN0YZaI2J-Jcn2gak', ' 心 阳 ', '1', '杭州', '中国', '浙江', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpKkgT9h4KZpoQ7y0cBkHa9ZrcvVxJ9EnJYOYwicwKE6xJ4kqMnJC2wvkebGTTT0DORsg2YMYyW584sNWyRRkJey/0', '1432716914000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1602', '1', 'o33lBt4M4yzALjWAxf0EWW3xpVzI', ' 蕾 拉 小 姐 ', '2', '望德堂区', '中国', '澳门', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaTjQQKPriaSvqcBPIr7uB72LhPmnlODoPHkbHuBnsiaMgxQaZchldt4QuzFeJWyoGDltu5NI1G2icbzzevRvlhb89/0', '1440584835000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1603', '1', 'o33lBtwQfaoz4VFrxd_drP7qrT_Y', ' 世 界 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM46ONANGNjhU0KFzJIndnmo29gvQcQ9VNBUd6U5wb3ibBY8oiaEeslKiaDpyvwArCIdWotRPT59pbSH8sLE3IgW6vt84Vc5z3C6gY/0', '1432717024000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1604', '1', 'o33lBt1bVHvfbsTEPlriNPYU4GIQ', ' 多 么 哇 塞 的 姑 娘 ', '2', '佛山', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsjPlq6RAwBKKibxFSQy8clicT2AoImdFshtMEny4BUD2dNNBZZWnPiakxFqTc8wSbmW1yMn9xzAJpPTYQf6WTKgibDZ/0', '1440585328000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1605', '1', 'o33lBtx9sl2HRvd5tjxPbdtuScVw', ' 幸 福 来 敲 门 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaMIcmtJialKLeDZYNfeG3U0bG5HvYxsyf5tyu0iauGTJUNyNlOyFjOicicamWGtU0a1LAR3uFyfsroA9j1KS3e0CPq/0', '1432286526000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1606', '1', 'o33lBt2rnpEzLwCryhy0QrZb1xQk', ' 郁 . 轻 . 砂 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCtYXmrALIPwDOW4kFOTYGGSa7toY3AF4icnZqnFKAZvic4TGw6A55GrXzDteSpHtAESB9yAYkicb1zLQnRQeLU5WxU/0', '1432717179000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1607', '1', 'o33lBtyeBYwnYxNQwhLW-eZmmrQo', ' 快 乐 女 人 ', '2', '东莞', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaBSFWG6E1y9sX09vNHDibDIfzLmLzByJO7WsnBYFxRhjNxajJUanTibLUFibRW1Fjn379YpXcK40Cib2u6uObK0sGu/0', '1432286532000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1608', '1', 'o33lBtxWqkEyiT8EYyCDaVKbx--Q', ' 榆 木 。 ', '2', '', '捷克共和国', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabaSb5OX7dCa9mtoiamAAg53W7BDe1GYibicHUXBGR1S6wAJBuVhpOAsq7gR5ohnOBcKqjAENATNeDn7/0', '1432286474000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1609', '1', 'o33lBt6Zey0M52UM5EWYLZgXDE0E', ' 陈 金 龙 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2picglhRiaZcwUJLxMV5ChvxH1ntppe0LdgvTQSibRb3jvSLp6udxdqicwnkLSsp9bsicLBIWJwtEpgUyR/0', '1455930727000', null, '', '100');
INSERT INTO `cmswing_wx_user` VALUES ('1610', '1', 'o33lBt6VlJLy9ZMRRDAP17YHMszI', ' 无 敌 大 美 兔 ', '2', '朝阳', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHqG70am30u0xjnmRzYE4ULibxiaia76OibXRYd1rv6dcKdDF1N5rnN6tCibPxErVAqPUbCe5QRHA19pAFhupXicn6hF9Y/0', '1440585978000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1611', '1', 'o33lBt9tafiPIfOKhvQEpmOdyDlc', ' 蝴 蝶 效 应 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1kyFicdCmdln2pficG62icB6vxSlZ4hcHYiagzagU5rrLsRQXibFOIhQveLvaOen6CgPz0uQ38kNN6If74Wc3TSzYNz9/0', '1440585620000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1612', '1', 'o33lBt7QRYM5NcZ8DNgV0io9a7Fw', ' 卢 � � 静 宸 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHqjK3pRW6ReF6Tapw4NLVQkMtcAEGvTNfA5xbBIHxaTjcKzxBOibDBHIEkx90PZjOtjds1Mf6auB5vDSU9LVhkMp/0', '1440585023000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1613', '1', 'o33lBt0vJC-CX0fGXzUs7ZUZDdOI', ' 阿 金 ', '2', '金华', '中国', '浙江', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHqNcLBwyJrGnvzFyeV8ia49ZfyeJrtQmickytRgwpnrnZJkpBtqUg6sXdKibq3pkXasLsT7hzicf1Klq0YAu0KstjSD/0', '1448908622000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1614', '1', 'o33lBt0vLQF0je3NLvCP8xRSsNyc', ' 不 潮 不 酷 不 帅 气 ', '1', '石嘴山', '中国', '宁夏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1tsejm1Aod3V752cn6tAApTjpsPfweG8ViasfESPbKG4eiaVocz3z4PML9YbibFJkRCicgOWnt8ULNmr2/0', '1447868819000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1615', '1', 'o33lBt5rDWwP568rq1YaOpGQph_4', ' 程 程 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHrgvYVVl35WIXiaVK23PP69g2e8NfyqJHvkQoaTIJTyoHLjR2ONUftggOc2gJ1gLKe1avYHBD61NlfXvKG5vg9HH/0', '1432717167000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1616', '1', 'o33lBt_whLcW4teLSWRLSP1PbIws', ' A 兰 敏 ', '2', '武汉', '中国', '湖北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2pice0WOpLv95Rqia8Lr1DUExlI2UUiaLIMyMHEo610ibaWfOdSEuCgAtK6fDCa86U8HuTOOTnR4kLicKib/0', '1453306766000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1617', '1', 'o33lBt-RK6WVJhOMP0hL73zpf0FU', ' 1 2 3 ', '1', '', '丹麦', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsj5RVdtHJkjSt5Z3vDbbcdL3N4kD4nSKUy2gZ1qcQM7eHD7egG1BeWHpB0Yf987x6hSGsCDWzJ1xmhC3tRtOlA3/0', '1432716976000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1618', '1', 'o33lBt2nOy_Osh2NziXnzLIBQALk', ' 残 阳 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/oG5Aqnzg8ozrLfrcRvicQYcXFricOT5bStAUBOaKsIIdtEHbicK2l8Vnhr4WPE8KbMGZM0wWwIWpZLrogL4ibk9TNiaoOWxAN8SXD/0', '1440583798000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1619', '1', 'o33lBtz7dWN12qaCBGq1uDGJYBiI', ' B o n n i e ', '2', '', '博茨瓦纳', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/39vnA4SRXWj8moyMV1c4RwlOtvX9DuhV4XicBn0NPK39XibK15MiaMcpEtgbgVVedbIVnGBxahUDMbItQItVpeAcspIEHljQIOic/0', '1429564000000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1620', '1', 'o33lBtwmp2Auunk0XixOUBnTJmgs', ' 沐 汐 ', '1', '', '毛里求斯', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p2vcRPKH8177jTwUKgpaKTMjKMTM58G2DHRohAKTkiaNb5Gt810Lpox9ap3CjxTwruRzn0icVCMP4C/0', '1432717028000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1621', '1', 'o33lBt3cmgS-ngqkx4AV1_Cjzxi8', ' 臻 磊 文 化 - 国 栋 ', '1', '杭州', '中国', '浙江', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM5YGCiaCLzcLkLpIvL8heGY9jQKgnicoquCCghOw0NZyGmHhibNLC0dZl53T8LBIgafELQcWM6c5w0j6HicndGotPSnXOsVqD4n7AE/0', '1440585165000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1622', '1', 'o33lBt9-N3N8Grp-dPxeJYY-xNPo', ' 守 望 & 人 生 ', '1', '苏州', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCup6kRBBiamqp7waYovHYtNER71hA5PFxHFJFF2ibKh6AO9UiagTo2ASQYIACQp5zvxGjicuYl4OaBibibllJ6S9w7l45/0', '1427980681000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1623', '1', 'o33lBt3KPbUXnVPFRWELZUw3ZqTs', ' 桃 夭 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2pyAokfLDl4vQRbJ5SVmzqQibgibQatuFZ5picO1ISyic8dfJgRpmXI4olWe19gDhjhwyG99qjHds1BKf/0', '1442807791000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1624', '1', 'o33lBtwfcvSBrzDbRN03V0PN-duE', ' M ', '2', '衡阳', '中国', '湖南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabTg0N7oBq4E1ic0yPaunCfFQvld2yiak8JsZq9nLPxSeMibuZM4oYuf8vNSnuS814bzFiameiaSCLIX9R/0', '1440585361000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1625', '1', 'o33lBt8jQaNNxYn5mjisjvK_X5r0', ' 心 情 ', '2', '怀化', '中国', '湖南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaBSFWG6E1y9sjYazhADp0icXa6a7IR3wic8BB8VtV5icVfEL1NiaJQKEuRKg4VgrB0nw7S331pCXekkGV29Fs8ic7oz/0', '1440585825000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1626', '1', 'o33lBt6i-XfEpVN0iVrXru-ulOfA', ' 小 黑 子 ', '2', '', '爱尔兰', '奥法利', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsg5NgkIryPqOgmyKgVzf0kAz36nOuTCiby8ibIDxUAnjdtJThhxtamdFgEEqnuZCGOoulykcsiaBfN9t3DNkW6DNOic/0', '1440584249000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1627', '1', 'o33lBt0woCBjMPcQKht2Nf9yVgLA', ' 小 钱 钱 ， 好 甜 甜 ', '2', '廊坊', '中国', '河北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1tuZbT0YNwLm10ktQ1Yia8h2Ooxx7gqLmLsicoCdvKR6aEviazATIvEzvlTIFhibvUFHdxz3ic382wFPIW/0', '1432179894000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1628', '1', 'o33lBt9lWZA8cW0P9HUWqsEfLnJM', ' C r a z y   Z h a n g ', '1', '淮安', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/39vnA4SRXWhNecoatPajp7LUaN7U2Cr76b2ay1uSt9FGicdCu0CJDDVGxIakaMqBUIR4A18e1tEmZdeaUexumtO01S4Mk0Kbg/0', '1431612869000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1629', '1', 'o33lBt7gpmhntNflAEWdwQUeUmz0', ' ✨ 杨 梅 果 ✨ ', '2', '长沙', '中国', '湖南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabfpG2BrZnVibcuibHqicfISz4VJBjG96jEY9Gc28JD6h6XtObEKfTjQiaiba3fPWM9wr1ZKiaNC2RKiawCR/0', '1435329112000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1630', '1', 'o33lBt2U_o4vQb_BVxvnLHaXTbSE', ' 邻 家 小 妹 ', '2', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1keV7j0646usR4Apbsbe7ElLeITjictDfk5ZHoamicJWSfFohGCVaRlz4VYx157ESvUyNgj50vtYWUBuL4icNuKZDe/0', '1432605927000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1631', '1', 'o33lBtxlRUkZlx-T-fn3xCu3s6MQ', ' ゝ β ī n ｇ   ゞ ', '1', '东莞', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/2rmYeSicd841EtN7EUyjYWFWGwadic4sic0PVv9ibkRACLQ8ll4VgRe24zyaq91GSY8BFEZWpOqRzib1UVls8uQDxlZ9rl2knxibTb/0', '1440583784000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1632', '1', 'o33lBt5hTzOja017Sy9kN_-86gNI', ' 朱 洁 ', '2', '武汉', '中国', '湖北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabQZ6BAIwpXmORGRJic80KBFpkqvA3kG7YxcTJE2GDemia24WIeZmsQMOrNGBx56u8FKrK3B9Jiblgs6/0', '1435216422000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1633', '1', 'o33lBt5IixEOAXIoH34f-Q11Hsbg', ' 花 好 月 圆 ', '1', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCsGOhLqIduyy7ICjfRZco8t9Xs4xaKkzqibsGroK0w8g0gjeicTlR1pFRYNj3bibHze3bdP2BzpQJ6Ry1Y9pve4bIN/0', '1429549904000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1634', '1', 'o33lBt23-TwyPdQ_U7lHgwmzxsiM', ' 陈 嘉 欣 ', '1', '徐汇', '中国', '上海', 'zh_CN', 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEIaGg41670MuDibCjZToVKdhxibhPH1PMc13uqO5xV9gY7znq0nD8kbM6C8xAB6HB00BUholWDEW72VuPnTRz7tYtCick2Tj4cLTY/0', '1432019959000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1635', '1', 'o33lBt9sPEn46zscYbzLFr5Md5QE', ' 翟 菀 通 ', '0', '清远', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgWa4kJc1piciaKVE2ktcZDHRDCV1OIR96ibXjWBASBTJzO1HF73z3MqYvmEiaB4sNUmLMvgo1d8s8FjFiaqh3FeBV2l/0', '1432606151000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1636', '1', 'o33lBt0JtRX8iJwMirUIbOBrQmN0', ' 奔 波 ', '1', '苏州', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabcmhjL4zve2kmDqicDFvpFfpABicWXbU52NHcicJdPicib4PN0q7mRSFMBBQcSTzCylVYqPibNkgsIDa6x/0', '1427986478000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1637', '1', 'o33lBt7jG1MDppCf4ZEGrwYx3oaw', ' S O R B O 官 方 微 信 号 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1mxaqAknWGymsWu7HS5eDQa5T8NPedZAYwHPRqEhvRaQxnvcnaTgXogrV8xsI68UiaPtFhV5QEGfqhCRHVCrALJE/0', '1432716733000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1638', '1', 'o33lBt_RbpHyJYLr906kOZBdQ6Zk', ' 刘 钰 ', '2', '朝阳', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4bqRTES5uxdryA9LIgzxJazv4haYQtso8GmwxtRUSDaVCsKjH23NicVPLazQnQ2luGpibbnfQDuzpbB0BjxiaFg38Fzra1xjHOj8/0', '1440586811000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1639', '1', 'o33lBtxnF4ye6M_SBJbfmKa5Qg1o', ' 霖 ', '1', '东莞', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshuEt7PzpB8zQ4FicXrnt0FkmYhY60WFtN701pnWIlhOZFJHv6eWEuX8UnoLlcYFUxI0gyBVcGxM0S1b3tuzSyal/0', '1427971527000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1640', '1', 'o33lBtz0WMKYgrwabtz_iGlTl8tU', ' 小 嫩 肉 ', '2', '朝阳', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCulpYNsjW4Homs7pTBbGCKBrEloLBG1knRuOmy3P7hnUw3LWHrF1XJGkPYvHiceaOTp2AtKZ9CwGUkSGGdy8Xia7N/0', '1440584972000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1641', '1', 'o33lBt3IPARLo2oQfitKvm5TUAyY', ' 嫣 然 ', '2', '桂林', '中国', '广西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/EibjpUjmSl19nwq5hDR0GaAoI66ZKqq9Uq3ncofStc770FLS534BjkEJVNTOLcUXhibP24ppIjrODpWPMZpYOc6JgEeyMcoiaLL/0', '1432716931000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1642', '1', 'o33lBt2yEAgfgc24qrfcOJZd8HDU', ' 屹 舟 音 响 — — 骆 珍 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsj9hf9dFoR3lG7gZKhZfibibLmk2VKqCv0ksmjy8GCHRS22l1ERzmuyF3FkazWW9zd7u3KNdpibpwpxOGanicFZjc39/0', '1440585547000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1643', '1', 'o33lBtxPOnHwSQoHhqo8ilwBdfBk', ' 转 身 遇 到 你 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/0X16uwiauYicArXwcUAYk6HnnsIUxMTOR9lcvzDYz9P9NnNA75QO5ojU8v6cDcspibvGeG5wWXpuj5Ixll8G0A4F6GegzEtcFMb/0', '1427684103000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1644', '1', 'o33lBt4bHJdg9tT7niCIJNwJSVRY', ' 可 可 ', '2', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsg7B7KDUDg2hLAluMicsJlbPLguoI9ic3OHLewqsqCErMOJspQPfp2Q62ooL0dxX0ePylQW1Dyibh04rCLVBP4dohF/0', '1440584376000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1645', '1', 'o33lBtwBkQbQAuGdyCzyxYwp_bvw', ' 图 图 饰 品 3 0 2 2 - 1 ', '1', '成都', '中国', '四川', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p038kVb4EuGrnrQAvC82LTqzRfMbBGEt9y2epibGLkY3MtmMBqLeK3ZkqRveHibibSLu2meWaiawlldY/0', '1453057823000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1646', '1', 'o33lBt9A91IZktr_apfh7aKB09Wk', ' 周 梦 琦    ', '2', '常州', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabdGOsAZJhiaicLfCJm2nEagtVOOQ7ib7F6DeJuibbQZvOZ6Wmvv5TbVm8eialeRV2RBqicqHVDc82JjIDd/0', '1429503549000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1647', '1', 'o33lBt4dRpiREVG9SXfNlnqqWHCg', ' 小 马 哥 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabXkxk1H9cmyHhwTWIqmerb5ou2hjDOBibTrE6Olv0XtZdjHmzZqbDGw6jRON2lwGOJwfOPkHxwF8c/0', '1456127477000', null, '小马哥', '100');
INSERT INTO `cmswing_wx_user` VALUES ('1648', '1', 'o33lBtxKhdY8CJlSspkQ1tMCs-uc', ' 南 宫 宇 轩 ', '1', '太原', '中国', '山西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p6qKlaSEkvCPWR3l9ZEsWugpTbXiaANc9swxTNlRc1QOxsic8Adf1KzRxibSZq766dBd9EuOpiaiaEX9X/0', '1440238518000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1649', '1', 'o33lBt8mLR4wJmH6nHSNAoISowCQ', ' 9 头 身 美 女 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHqkYC6dPtIdEZqlhQDy34A3JnXKELmTrffQVsrT8DqSYg8SplKdmu8HVVjP9krIC4UicY9ibWQN8PcicjoD8TEtCgE/0', '1440584689000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1650', '1', 'o33lBt35oTip-vBsRgJky_kMgf54', ' 一 曲 微 茫 ', '1', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCslAz03U5t5LQNia5am3Yf9teuKp4ia605lkBExatXzkuTHKMJe0pPSgpGmawMVuIjV3pcC30G0EonFW9njuXFqN4/0', '1441939167000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1651', '1', 'o33lBt8akMgPKz9Dx-Cj2Ib8ZIZw', ' 红 发 旗 舰 店 ', '2', '苏州', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/S7uPXqWxo0gjzl0hpJfMmAG3sGlCSLj6OwAzCT0HPsYKoCTD3Cx0t1XWQlEj4QwJ1YU1upD6aQuSVo1MFiaYNAIaAMpibsKDZQ/0', '1431596730000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1652', '1', 'o33lBt3jij0WS6-ra26Ve8-TIrMA', ' 静 静 ', '2', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsg0DIWMjkeoFstuVheOothG3PwjElLGR6HI3MsDDUVqCLicdDCsqBZiaLwNuaFY5h0WmAF0icFVeUYV7TNFy3wTkmk/0', '1440583638000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1653', '1', 'o33lBt4Q6gvl4HDLJp4oJUS9sThs', ' 起 风 了 ', '1', '昆明', '中国', '云南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgMegW8FF1VSBrhvEoHqsg4t0ghlX5PqZK0Bn6dQBicaLMbCoKbaFiaE67yajkulWX6ehnGZNrIjsvEAFLibLsSYnia/0', '1440583651000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1654', '1', 'o33lBt5qTBET8zJ7rjg3hVrkUkV4', ' S u n n y - s o o b ', '1', '', '法国', '阿尔勒', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsjt2zMtDTibp31IWCsdwCosFwZKtor33Z9gFPaSUAtEcDdcJjicchRodRHROpSyOlkA1vqiaATNCpZmTicufbQSVicBk/0', '1432716701000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1655', '1', 'o33lBt-WjCm1PdBuugz34hq_SJpI', ' 小 翠 ', '2', '石家庄', '中国', '河北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1tmCOnzQFMGISwITSSMl2dAEF2eILucwuibrjiaKBd6NPyToXeGSUAgs6icPCRkj1ImIzN0tAvQGsx8ib/0', '1452043760000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1656', '1', 'o33lBt9tBC5EPnTNyWChKvZnzYNI', ' 孤 ┏   ( ^ ω ^ ) = ☞ 娜 ', '2', '', '奥地利', '萨尔茨堡', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabXs05Qfy4DPVuOYms1mLRIGEDpxDHWhNaq4XIatIhv1mZ80fDFlm0pnaqYeEGsq2Nfib2dicm8Qgos/0', '1427684365000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1657', '1', 'o33lBtwoBTIobd1dC-ChYKg8mEAk', ' 蔡 蔡 ', '2', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Nc5ibKmjHqIUy2vnibXu3EEuagJBfR7crHxIqUt2hfO1PUvO4TFORRyHLsRYibJq8ibr5MLHTqlah2jJfqHD92XccnaxGhia9BStA/0', '1427768734000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1658', '1', 'o33lBt8wuWxJGY2-B4OPET-Ef-t0', ' t h e   s a l t w a t e r   r o o m ', '2', '', '阿尔及利亚', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpC2zFdLCQS8Ipf7e2EDQ07ZBvLpK3leTickwJicTLMvSWw2neZkA6Ro8Yiamp53AgRt52xYTQicvhOxKMe06x97icJq/0', '1432716934000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1659', '1', 'o33lBt_cM-YWAHtbUG5X7Je57brY', ' 与 我 共 梦 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1AicQEs2w0xNiaT32MIIBa7icKF7Sw2LiaTAGrBvmdzdIlhM5c8JzDicwlOhMW96QQuhTjSayX1qvBicF6/0', '1432286408000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1660', '1', 'o33lBt_VzBFHkLKCE8Xf8U_6ipnk', ' 安 远 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaeBRqhYJia1tuFjtwZmZT25ZrYXUhMgMYa8mzJfx41Z2lzjIEGXMEYzmRPaldBicmWSByafRTo2tiaiawWTVyiahia8T/0', '1432286505000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1661', '1', 'o33lBt01bvGr7NLKGMWrOGh9G25I', ' 婷 子 ', '2', '吉安', '中国', '江西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1tn0jYFlcWB1RRAmx4NhkXDU7WLhXD8slBHC2Siaj6FruozloibdO3YgPhH12MSUEdCjABlLNuBrPJP/0', '1440587015000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1662', '1', 'o33lBtxTZpoexCU0JKly-J5uygKI', ' 爱 情 乞 丐 ', '1', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsj0J8wTXCrjYNMnkO8u598FIes2uW4xzehg3ZqVzsyN4K0Ucrclzpfr65zpG7EnBjV3LzR6fVgO2kpuovKLyrEl/0', '1440585076000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1663', '1', 'o33lBt0rbze-XWuDffsyFMxDlpYw', ' 结 结 ', '2', '沙坪坝', '中国', '重庆', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiatt6sicqSN1dYQcqczbeMz8uwPq5FicnMDreCvNugDf1K1sMFsCrJjFiaCgdePB2gj4tEicZ9MUPLG39W2YbvicyhIT/0', '1432019649000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1664', '1', 'o33lBt7uw3CLwEH6w9ikv91BZmFQ', ' 不 二 周 助 ', '2', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1D07RZ1sXp7SYAqmHDv0pR7AeP2brpYJjMADd9yVX43JREvkdbflBNofCrrA5nicYLgqU42YcOpB8/0', '1429611454000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1665', '1', 'o33lBt2wxk33vPtD1pMU72JRBLDU', ' N o   p r o m i s e s ', '1', '惠州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1Dl59fd2GrUicjfIRrCafl0tPqU1Gqfo4pdW3DxVXGn7qVWPAZBhmTKu6BD570rnFxBuTj8DpOL9N/0', '1440587005000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1666', '1', 'o33lBt1tB1ToiddIRckg1TVYoSv0', ' 江 南 名 媛 ', '2', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCs4fULwibACmvaK6eFkuchZKFdBGKiak8FtK8hERoJVAHnhhEN0ckZoYcHfzmOzZR0ZYicZfXHC7icKn9vTnJss2B22/0', '1432286477000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1667', '1', 'o33lBt4ovMZuUnWRXtPPaOKq7iTs', ' 薛 丽 ', '2', '', '中国', '香港', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHrPjcnMI1yytISVJvUyqrpMYg5qEicV9IcOrbsHqYWmSu70ZpfaUSe1bgSfHxfb08ldQdCNQyLqE8RicpSC3aQtgp/0', '1440586856000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1668', '1', 'o33lBt8gTtAKiciZgADWwCrtsBzA', ' A   小 龙 ', '1', '珠海', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p0ibQu3mkQtFL435UianVjicnQc6thicB3m86gUW2kyiaz37cdpb0qzwzguslicvstnnoqeSFVGUAKic6gY/0', '1440586757000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1669', '1', 'o33lBt9-6O7etK9Vj3Sj2HuGlZ3g', ' A N   楠 ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabY0K3vstZPKKayAh15VosvJTZ8giaD4l6cXWibCRRibBSKjribFibkCH9sGTuQLJlIgCrSOrUuFCQ9bl2/0', '1429840314000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1670', '1', 'o33lBt8BJ_YipJc4DaYLCOPzaqSg', ' 工 作 小 号 朋 友 勿 加 ', '1', '揭阳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLCZic8lU6ppxW8WOBlrp4O8grb7wXCiaLpkmkpUn11tP1tMRP0d5xkku2dbqg9MAASz4FgOhmTpauXmRNbNIGxtdNEd6lVSytMcU/0', '1432716935000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1671', '1', 'o33lBtx1elfCUN9eUfi0xOnMRG0A', ' P r i s o n e r  ', '2', '', '中国', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaFMqibibVhDpopUbaaCaVJvYS4BrMXyPt4qt3gvL5r9BvcreFywEy3RctNicw3WabLD0kI1l8xEUhlOGleEtwaeso/0', '1440585657000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1672', '1', 'o33lBtydRZqLCjAh1qFdhdmCxEwo', ' 泓 盛 壁 纸 （ 沐 沐 ） ', '2', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpHEpnW8CE9Hwl46nFesa2UMFIY8BndLibyC3pE3XWQ2mXXZ681gQXuDTCLWBy2QVcx4Z6DDzSE2Ntg1jWmkTMibp/0', '1429331262000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1673', '1', 'o33lBt6bBvfv7VkfWFU6uKRFyR94', ' 沈 阳 田 律 师 ', '2', '沈阳', '中国', '辽宁', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabfw21uXUKsKkTF6hhJHjM89sB3vWiaibnk9WUjo5ib1SjywouyNktJhEpv5iaIdrMicfMbZdWldpUKPEe/0', '1431938987000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1674', '1', 'o33lBt1pfqCI59QrQK_YP_Mh9yjQ', ' 陌 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/MHHethDRz5JD2UicNBxCdnJyZOufetKQsfz5ibMAjooComd2q45W5VSibR0DoibVH0SqMsmBa3hDaTRaA8eWhTgn94LicXtDAQJ50/0', '1440586106000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1675', '1', 'o33lBt50KJZQfhCqjQOl69I36wf0', ' 科 学 养 猪 ', '2', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCsb5ywUiaYBbnz3KvpmVm5UBkeRcRibQ1672BY8UXt2vsOwNypGffTtBfgtRPjABC8gJuQyoZOwqazA5A0H6xromN/0', '1432606264000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1676', '1', 'o33lBt2fj_qSVrAOB6An3IMg1rSY', ' 龙 城 行 者 ', '1', '湘潭', '中国', '湖南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiaEDoxH6QDXknwrpxOuDnbrGt7ZibxulC6mnkboanf1ge02EPoXORaY6ibqZXjkZt5ibcG3rdUwNibA17YxSv7osGns/0', '1432286442000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1677', '1', 'o33lBt6corOUHUwW8AggGOIaxF7M', ' 招 工 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHqC42lzd0M6Y2BwjaTYqLoZq8u3dulAl9ajqWEUJZ3ia0ghfIPicqGiafLVIYJDPCzyOh5Rib2Iq76RsoE8NUx7SeVF/0', '1440584865000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1678', '1', 'o33lBt0zLwx8Qb3YJyi8LhVqdnoE', ' L J H . 贵 云 ', '1', '厦门', '中国', '福建', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2pyljXheBye7tVnPk9PyXvTsWTbLqjeK37kwk71VCnyCUPpbDIWSk6vBAlfRfLgGBicarCul53Chf0/0', '1447222768000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1679', '1', 'o33lBt1LmZUg5PQWQuN02Ww010_U', ' 阿 阿 阿 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM6iceIOlCw7oKkABQajyOwPGH5n43nkS45TibEgmSSpjRparR3EgnJEWFj0nFmetOQujibCvlsbLCRt2WVhYAOLOZnU86srdz0drQ/0', '1440583753000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1680', '1', 'o33lBt9AcrB_ayjphdo-t_cTEW1M', ' 迪 塞 尔 ● 瑟 克 赛 斯 ', '1', '檀香山', '美国', '夏威夷', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1tkbHUlDmZ7vfXr9JtDJhUg2G3ofuBDtRc8cGDRN0ypkNIxxb84CCt57GGKdow31WtfWWR9K1FTtC/0', '1442912833000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1681', '1', 'o33lBtzSQcXjInF91oIfWOCf71ak', ' 周 菁 ', '2', '', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1kGyn96Iv8CT1MqcQeupialZMPyiaI8BL4QlBKVYKOtz6XBqzgqZmGiccNRFwnfHPvnth3Gz7bzatH25s9cbTaoGicS/0', '1440586992000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1682', '1', 'o33lBtypksLinnVt1U0091SuVHo8', ' 狐 狸 未 出 嫁 ', '2', '大庆', '中国', '黑龙江', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsj5W8ibiangtyH1OhN9K7tpOYxicTIUjaqU32ytpa4KaibHojxkSk7qJXUpUeOE7GoNczEmjDnlVickuNmUQFxnicmwaD/0', '1432716982000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1683', '1', 'o33lBt_fXR2W1jnW9--DdHrsHkPA', ' 嘉 嘉 ', '2', '深圳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p3JiatWRiaIcFrAibMM2sUAFNvTHhSasVEP83O5QrSKHxNaHY6eluol2PgcHib23FB5qLCADLUAHr8DT/0', '1440586191000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1684', '1', 'o33lBt_NxUCwoJe2iYLbriwfa8Ss', ' b a b y ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/dTLpCOsPWicCww62P1QMclLSsxx9cacKUcIfoA9kAoE4z6dXdicc7Zy7z12vr6HZ6WCYDkar9RtFY3ZOl2yWALMnZlkQ4vt33A/0', '1432716698000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1685', '1', 'o33lBt_nyiJ-ENpDiEv2Zt3eMz00', ' 1 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Nc5ibKmjHqIUy2vnibXu3EEp5h3x40C8BibGtxkE4Cib3uYVjwRoljRk5McbZHtMQZ22lb8KWf9lpnH1fj7fqyHRWKRAp71apSOx/0', '1440586136000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1686', '1', 'o33lBt9aOjU6WxvUW5L-M2odnkPw', ' 媚 不 可 挡 ', '2', '', '智利', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCvkdnTHOxnAE9icwpEk9xxKDBRJpndvp3WM7Zwr8nWyLib45stJbrkhPZwR6ZE2ZnbicvicmINQ3BB8wZ0XnHFu3Sicq/0', '1440584627000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1687', '1', 'o33lBt3dE9ABSqO2PeWXrldccRq0', ' 达 舒 妮 ， 休 闲 鞋 著 名 品 牌 ', '2', '揭阳', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM4QeOw76sbibm2wEJkesdF4FkJfEa0MyQnFEEHSB7RJKUg6KppBpd03k9JUZfeRYaoj8RTP5DoWWf3qxRGvRaXyerrGQYlmHcGQ/0', '1444845234000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1688', '1', 'o33lBtxuADJ5vJyBsVXpnfiSk3uQ', ' 旭 ', '2', '邢台', '中国', '河北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM7lLW4aW2EREBeicScWzCCicfsNr2ZdY7RiaqDrRNYqvIAQEAriaM55EaSqEPbuyh1BNIE9eia8AvzuGhDaA1ib9wlfU3P5GaUu2qT0o/0', '1427942394000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1689', '1', 'o33lBt2HzEvcSqLPQGku3fHI2WTk', ' 广 播 站 9 号 站 � � � � ', '1', '营口', '中国', '辽宁', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabY2qGlbiaTUjYbkF1EAuicOiczr8byhZ4dck4icRTibcUkRQaek3tTuDpiawwSIOib9eGuUcGX75eG5sStR/0', '1432621343000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1690', '1', 'o33lBt1ynkXRGG3Y6aO9jd21e39s', ' 晟 鑫 发 品 全 涛 ', '1', '厦门', '中国', '福建', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabTtz4kAAd6dcnu3HDDVFv4ibc0RxbkO5t1ovjGUe74KNeCOd4zMIah8etmWcssxXFj1IK9m3Dr5tU/0', '1442504750000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1691', '1', 'o33lBtx9yuOaQXqN65LABtWNd7NE', ' 酷 海 风 波 ', '1', '株洲', '中国', '湖南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHo0DsjV0jJqt4ow0Fsaa5H5q46SeWJ2ibb377DEtaBqsnbxIRClOXxjJvuiabzWqUcEvg3iaWzfO3ibWVaycJmMHepY/0', '1432472051000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1692', '1', 'o33lBt4RlT4f6E8MdWXV3TpQ_P9Q', ' J i n i w u M i n i ', '1', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1Mw5zEiatNqRicYKDK9czItWIRdmNibzOUAicScqAe3QJozKX8vLLWYkBpiaKCZ9ic3eLpmM8rcQCmZiafv/0', '1440584086000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1693', '1', 'o33lBt7nYaSgoiqgzJ4JSD6hKTOc', ' 淘 宝 运 营 ， 李 ', '1', '合肥', '中国', '安徽', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshERPmTMe3UBeIostk24WXxqaE0DnDfI6TV1gziaLcxBCMejWyHuYtxuoJdB3TKW4ibX0Rxp2ic0DcqR9AxpqKw0FS/0', '1429235593000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1694', '1', 'o33lBt8K5_qH39OK28LBJ5LY4ccA', ' 春 暖 花 开 ', '2', '武威', '中国', '甘肃', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHrTibeDlfr8rEzwgh2icJOY5JK9WPy3L1yx2tzH8urEc0DsD79duxc3ibltKf2YrF50YO9UKUeQNW2hYTCUsRXLJUl/0', '1432717181000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1695', '1', 'o33lBt1c9t-4KaPc9l9C4gQH4Nfk', ' A l b e r t - L ', '1', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCtwAnlQsvnSody4ib1vhC4AIiaRJJFo54cztUBe8MFZ8ZlZNAWMrlGwVC8nzal7sDRII9FxczLcSf3yhtIYExJeaL/0', '1446792078000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1696', '1', 'o33lBt0CgfQ8hntVEgkp0CpXlYr0', ' C h r i s t y ', '0', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p7heBJUyyvUfUCmqvZx8Bw9150HcmCMhAcysX4ZT7iacj5V788wVQEANZGVk5eL1fF6fkuJeDuVpl/0', '1438500889000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1697', '1', 'o33lBt7zLaKwIUbCgJYV6BI5PQSo', ' 时 事 关 注 ', '1', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHrlRBWogs4vQSFiaD8CKjzEdpeJeOR76Tet63UTO33YxQpRrWXD2u9aCABR7kLto5QDQRgw0CHTssVJCicMVk934X/0', '1444787353000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1698', '1', 'o33lBt8E7Ipn34nw31LhTFQsIySw', ' P O T A T O ', '1', '营口', '中国', '辽宁', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1CI4qNtGAu8P6Dc5G8962bD4XwFVWgmVwM4T93ticicXyOR4PicbIanujT0iapwZwfQqJKqSubsS6UmX/0', '1430077802000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1699', '1', 'o33lBtwxT_yvvy4r8RzjJ5FHz_oI', ' 二 马 ', '1', '海淀', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p30EF29iboicIuichrhFESaa9HjwVMRb9Xl9QTk1jSibx4ib56jTk0WSS1uuPialLQf1EZjQPcIKcZhLoE/0', '1432544726000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1700', '1', 'o33lBt9NKq2gW0IEFUIJC2nZyJ3c', ' j h b s b b ', '1', '', '阿拉伯联合酋长国', '迪拜', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuot1V3MIOm4tTtV1bdMryJbmtolH5drMqZWlRzN9tcoQ0zR4aPgxNK0R7Ax7iauMPw0ic8HFEJOicaicxvFiclTtIKB/0', '1452509042000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1701', '1', 'o33lBt0fTj-VIqr7ObpLtO9toxrs', ' 威 尼 斯 的 湖 ', '2', '温州', '中国', '浙江', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1K0UhOYMJnbsmnz7XhT0ehNjp9IPeIczicgYaNsjfxZ6dWshOh5xyicDMl8ckwazo02YIMEGQVhQlS/0', '1432606823000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1702', '1', 'o33lBt2OTgwHcsM78Gv1Xxecq3KU', ' 简 ', '1', '沙坪坝', '中国', '重庆', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1thtZdbD9EE2KBwgVvjc0PpuNibX4qudasm1YkFoNwMnmoetmPhe3kib1T4bqLgk0oAhyxwv7nKG1t4/0', '1433220464000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1703', '1', 'o33lBt8yYLYRvfMlITL43r1DzvS4', ' A 呦 喂 � � 二 姐 来 了 ', '2', '', '阿尔巴尼亚', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1IWgkghnauEeja0uh0pAYs7rUSPamgqu9c3cCkU91xyhn1ukxdaeg2RRAVYhib7YjAJk71Wjeryuh/0', '1440586446000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1704', '1', 'o33lBt9k5lyOgDdvqXYM5qnhvMxE', ' 微 语 ', '2', '', '埃及', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCs2lZCXB5ExC0plvyZUCGtCNPLxf311lrRQNRAGXxY5ugljdovNpmNpkfyVgLq8v6xUcTgTvJTficRiacDY6Tdz5y/0', '1440584658000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1705', '1', 'o33lBt86GvmIS0dhDt4sat-1gboc', ' 胡 y i _ m i k o ', '2', '', '阿尔巴尼亚', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsjHvT8CgDlk2TJDfrd4KaHgIj5K6AN6RpzZdFk76sOA3GNtGKEa1qzqj26ScnVEVN119QgTlB5hYT24nmnRC9jD/0', '1432717036000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1706', '1', 'o33lBt_OHIJcBsvksQcpQeXxY4Zk', '   丁 颜 男 ', '0', '清远', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHrLc0aJCqatLXzyZDo5OBOrJ0oVPqicETn3ks3YzsicAC6iamRpXfV9dmfweENicsEaibfMp1SD4pMVAq5I5BDmOmfAp/0', '1432544671000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1707', '1', 'o33lBt1lTSYG75inEZDMny_FQPOY', ' 陈 唯 忆 ', '2', '安庆', '中国', '安徽', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p0TsWnVK5C4HhWBBHHWgDgYNQ1oY2oh8TcQ9rELdNCWcek4RLvr4RxCpibroXWe5bEXZlDkTm4MaE/0', '1432716929000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1708', '1', 'o33lBt63KCrD2nXpVQhRBXnrOEZ4', ' 阿 让 ', '2', '西安', '中国', '陕西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nMMlcFv9o1tod6h2crozw3BvckQml8JODg5XKxRibvNbtwnoqszdkYH5WXd9R7tUiaEatp2Zuur42r2vZqrdNDSy/0', '1429611498000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1709', '1', 'o33lBt6ihAItTWZecr5S1OZhKbxs', ' 居 然 ', '1', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHpqSicffsc1Ix3t8RzzTSllO41alialw2r9jrF3leyoQygI4HRZMUtiaGTt0nfRdHptNSMISGBWCiaCq9xAmxicymz68/0', '1440583621000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1710', '1', 'o33lBt5xtfvdEZ3xC9XZwJhpezfc', ' 小 雅 ', '2', '盐城', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1mC9gASz98WEluICu5YiavsB0eJdReiazV2plGbaNlImOJKBfohQssvmVBQDH1xqwoLUrzn1Yq4AtcLUGxkVKg46R/0', '1440583792000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1711', '1', 'o33lBt5MfbEQqKie90E4AR1Gl3aQ', ' 小 白 兔 ', '2', '巴南', '中国', '重庆', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHr8iaXsf8YlB1Nibvt3dhMepKLhSCaQva6Z8fibgb8WuJVib0Qxic73NNcRWwfljQYXmwy18ergbricybHYGiatJEWxG6x/0', '1432621259000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1712', '1', 'o33lBtz2GmUyFnrbClDOvxSSFWSM', ' 两 碗 正 能 量 • H e n r y ', '1', '', '新西兰', '北岸', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p9B7NBib9fsS8YWr4XwPIsbnbvicjhJ13zDLqPSz7Hhq8iczBL5Fd26THuS12SzMuCTcVZIEyDyZLt8/0', '1444832579000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1713', '1', 'o33lBt4WmmoFUUWbViOIUA0PEy4A', ' 子 雲 ', '1', '九江', '中国', '江西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiaba0tewhlmZpyftApbY15M42iba69w9IAyZ3FoicOLmI3pypBiaMtXhNMfy9uZQOw8JWbL5Ib2bffMJT/0', '1441337603000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1714', '1', 'o33lBt5UXyTihSDnT1aCoEgATwVs', ' 阿 丁 ', '1', '柳州', '中国', '广西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2pzHJMqxVsCeKEUyZ1WbdFfibuqjKic2hiczr5FuCMvr3nSgwOAYkJskg1PeDy6A9GoKE7VbfviaNhhpx/0', '1440585422000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1715', '1', 'o33lBt1KbBtCnh_wUN90Rig_WQKE', ' 灵 ', '2', '', '中国香港', '南区', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsiasOd4TXj1HWzYpxhsiarvWx6N6KpTdsHQYC0T7ZCnxDlD76kr9eUcACiawIehWibJGxr7Q4XyrI2EUpGkuoy1iaZeV/0', '1432716779000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1716', '1', 'o33lBt9hLXTDMG_PRxqO6fWJlmcA', ' 六 月 。 ', '2', '广州', '中国', '广东', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCvOzrV4IxKmpQfeb1BPE32PWJQQ36uRg0k8jARXmbrDxr93iaialRW8u4pWvMvlTGcoSpRic7IL5gv1moj9IMD7BYr/0', '1432716940000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1717', '1', 'o33lBt-Z0ym6qbTQWDN7eUPecoJo', '       海 阔 天 空 ', '1', '亳州', '中国', '安徽', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsgrIx3NJyK2p1V48Zgicky9qooYqDMmypHKcJdqmSCQaLgf5L0unibmaoDHF6pVbzmjV8TgUhcHsBxkqDqdwQmFQ2/0', '1432742439000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1718', '1', 'o33lBtzEolPxQ8IWTntzFytvkNBI', ' S h i n i n g  财 务 ', '2', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Nc5ibKmjHqIUy2vnibXu3EEsLeveguOVibCia5ETTgGpMBcAutrHBK3arsrAXiaraupYyL7LxhiboG4SGp7XkhCTQBTj6tzDIBwc8m/0', '1440585081000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1719', '1', 'o33lBt7hiJzJmoJliHWeUrWbLTqs', ' 大 加 一 起 玩 ', '1', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/sEAesBFgsjSwPDKTRTzn7DJsVMCjl0r0KY1MqRDMzmzFDHJInY74jiaf2icfUoLITJ2atAhic09v04IFVJflCjSF7c5HyFKiajJQ/0', '1440585424000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1720', '1', 'o33lBt9ebdo7uQj-PeMdJDI9Q360', ' 木 茜 ', '2', '', '法国', '巴黎', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM5AGrn2EpHCLrlUHibd6t4OD5WTF9p2Yj02RfY9Q81f2yicnlX81vjLW7WDswoOHia6nNMhSwe2es4tW0U19iaXwIrMu1gGKKeiaLUI/0', '1432716856000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1721', '1', 'o33lBt7HasIvzYZ8mivYX7bDbDyk', ' 么 么  ε  � � ', '1', '柳州', '中国', '广西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHqDX3tqAc1Stia3ECdNPz9XNu2UTETSBqNvVoJE14n5BuY9jcJen0XVNXgibMUtPhZ3n3Rkg7T3UM4klvyk73iatox/0', '1432606139000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1722', '1', 'o33lBtyMt3rVgh4cP6J9Y1cluxNc', ' 小 明 ', '2', '', '挪威', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshDlQQBOoibUYNbn9mtC24eDj3oAOoN6J5R7juX1dw8YRdib4uMDOxpvwBb31sfhR7zPxFMKglCK6lsOA6O8OXNdz/0', '1446041966000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1723', '1', 'o33lBt_-eaTAuJ6JtYamefa8db-8', ' ︶    子 明 ℡ ', '1', '', '泰国', '普吉', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Xp4GibCIbZHp5QfMp08hbywWGrz6VdGnuVHD1csGZmTVlNMwrzcMhVtpic9xrHia59cxand41ypictfUxYN9sGUZ8IxdV3TOOU61/0', '1445887298000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1724', '1', 'o33lBt_8y8Xlm-RT8mXm8c90IJos', ' 静 夜 无 痕 ', '2', '漯河', '中国', '河南', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuc26zx2tSiabd3xU3Om9ueoTBXpaR7vP2KRwKJjknF01qGGAKTiaibwT7WtIBoN9Y7t3GSnNUVaiaMiax2c43WstSka/0', '1440584300000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1725', '1', 'o33lBt6mpbSHX8LFPAxxD8az2rvM', ' 明 洞 优 汇 红 包 跨 年 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshtsflBCld4yiaClnXlK5tXdYuFybO4wwObMnhtYZZsTIRPev82QrewGdFcEVwGsr8Yw2ic84ZIeic6mgTvicOEjn8G/0', '1440584720000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1726', '1', 'o33lBt947S1ZPKpYQ_Out3qYNWhg', ' 彬 彬 ', '2', '贺州', '中国', '广西', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsjt2zMtDTibp36X91NEeibibicGeXFPe6DEwReEK5UZSIXbmQDPjZcexfcs9KgicPGQsPm2U6TLibDiccc7kOqQz2dWWFF/0', '1432716880000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1727', '1', 'o33lBt1m3pt3cHoOHmb0JmiG882Y', ' 咀 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCts4CyVxDVQku7SKVTiafhLuQYOjxtGbKcs1WnjFB5u5hciaer1tvOiaia26FW1plQOjcLUwJeXiaCepoaMGUIib0Eodib/0', '1440586240000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1728', '1', 'o33lBt7KIYTGlzPrRLxOZ8LT9s-Q', ' 一 个 人 的 寂 寞 ', '2', '', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/GAu2xIQCMOYSWdkBFaY778Vdua5SJzaHmHlJ6dA6dgV4YiapPibvlB0ick1bwPcrKp2tXYE3Pug8BqgNe40pdqrRHkPlibEXFXSic/0', '1440583914000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1729', '1', 'o33lBtwyVlFfP4iDgz-z9MZbIJrg', ' 我 就 擦 了 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCsAro2KFW8uickAw8Kqtb99TUQh0SfibicfM8m2a52vx5bC6ZUchyOwqx7PI5T6mpkRoDoTTtyqdSjabNB6vNWFvf1/0', '1432621326000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1730', '1', 'o33lBt-gX0ErKUwko80UWzuWgA5g', ' 静 静 ', '2', '', '阿尔巴尼亚', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLAKpRWicMbNbaUYB5xvGJpKaz1Bosiak2eQEBmTn2s9EppwsB5uhWxgY2pz8HKaDqgmeG9sZC8RU5DbDYp9Eib4ZZP36jYHMhqibaI/0', '1440585498000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1731', '1', 'o33lBt9N3tLOiH73HzZZoX1keC2g', ' 阿 丹 ', '2', '', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshPskMg7bGfuJiaz88ZOX7W6nIgwJfpc4otPctO0IMbkbgngsWicu0ibicEUfq2YrX533zrZsluNNdpKVlSbM5KQf0ia/0', '1432606154000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1732', '1', 'o33lBtzkqddJwvFCc5xGXmwU3mUk', ' 李 艳 ', '2', '东城', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1kF6btvbzpCAxQvGWbEfXERLibe9FGaSk5dZxBbnVPhnHhKhzSW1KkJ0roQJuBJcLK4vpxxW6nzRzjWHE8tr7DuX/0', '1440584614000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1733', '1', 'o33lBtxKFRzcN9qCqxOpD23BHs38', ' 傻 瓜 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCvEGbJY7ImPmgnRbOGmFm7fiacjE2e6iakephDrCfxQH1rpbnxg1gUa7QVKBicZLEcic9rHV9434Q3kEcIIbUaeeh8E/0', '1432716680000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1734', '1', 'o33lBt9P9hbpWhqURZn83tP5Yr0s', ' 百 花 谷 ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCsueSwMh3oyZFFic8WOfib6y5wohuBk6giaI9CY599XUYokVILGvEppFWmPicgMTylZZ3uCMJpVAib9uFOMIxruTC6jic/0', '1440585575000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1735', '1', 'o33lBt1MBH34FJ8VA5YVUWzo-5Ak', ' l o l i ', '0', '', '', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/3icaBo1PsEFWzdDH1vshS8tVVS8Ly4gCsiaxvq4DcuenvawGDZJITJx6E16MmBjWyG7P0BYNT9ppkiajSibFz7o8LDNZqog2lHwj/0', '1440586934000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1736', '1', 'o33lBt5KkyElTwiwga46DXePvcrQ', ' V C 速 度 ', '1', '', '中国', '', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMsjW1L26LW0Xjeb8CGOVC06ftSsr2T69ARUBloWXMVbDhicVepa6SFOPZEibVWNmPtloNv5R0SxNuqNENh5OCXwSdb/0', '1440585768000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1737', '1', 'o33lBt2z3ViC_GrF3TgPN_C9Y7hE', ' 红 发 旗 舰 店 ', '1', '苏州', '中国', '江苏', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCuXcvStwc05Pls9IJRibSxuDSjxW761IAbx1zLl4BmUzDO2N0kgDibbq1eXASS12fb8x9tJ5HrqRiblAruXO8hYxUI/0', '1431647212000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1738', '1', 'o33lBt9UMDQADei_UTi0WbBov9cg', ' 易 方 达 ', '2', '', '爱尔兰', '都柏林', 'zh_CN', 'http://wx.qlogo.cn/mmopen/RonyQJdLyCsE3e6x8MDGkGc8HvkgnYeXg5epXW1Z2jrwHib4M7gWq6MejyicMnicXibsTyNmwSQAdgehPhkYK7MI8RwXWORJnc0a/0', '1440585266000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1739', '1', 'o33lBt44AAJXHkxTbVcfIUGiZ76g', ' 九 久 竹 心 ', '1', '武汉', '中国', '湖北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM5ZOJc7aSAUC8PJQL6tf8icZL0G9roCKgVshQcyf545JLia7DTjlGibEdZnezwmuMay5XibtEoaJaNbuRLRbibQCmahDSe0q70tLv3w/0', '1440583644000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1740', '1', 'o33lBt9engNFDVfzKn_CpSH-oQwo', ' 每 天 能 有 您 而 H A P P Y ', '1', '武汉', '中国', '湖北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/fW7UrE4OMshaS9mcGS7BXProCRVmaa6LZuRicuB0VNUdekMGasIWODYwBjueToO8yyUad8AYNia60MAmh9X7ZGthiaSba2ZVOAt/0', '1440584191000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1741', '1', 'o33lBtwG7y_dhqdfNdl2ThG55njs', ' 筱 幽 ', '2', '', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/tqRiaNianNl1nZWqUlDfkfGu8D8qVQ1oCOLY83lz6s9cF3Wia0FmR7fJ3A4ssaLVWmfh16ico7f4CeSkNwTy9axTkicEcoyUPlnnC/0', '1440584323000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1742', '1', 'o33lBt2sWA229EzwT-ZAysCEmTlI', ' 陈 晨 ', '2', '', '中国', '北京', 'zh_CN', 'http://wx.qlogo.cn/mmopen/z1rcoMwS0kYFia88Q4ZZ4iathXgFb1iaGFDu1upUwj64AgGBzicBibGC4EzTgzR84nao9UBYR4LbsQmMeBPricEDE6n3LJd75kpIps/0', '1440586950000', null, '', '0');
INSERT INTO `cmswing_wx_user` VALUES ('1743', '1', 'o33lBt9Y9Dx2FZcKU3o_o8xDDbFw', ' M o o n c h e r r y ', '1', '武汉', '中国', '湖北', 'zh_CN', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM6cYDypRBYFtic0VaDVu8DqlX1N5iaribVenAqdUn4zajVpseqfAaTTmS0xRndxC8eUnO0M1ZgCoPnVibcicgAq5jfGxIAtn6aN5Uyk/0', '1440583567000', null, '', '0');

-- ----------------------------
-- Table structure for cmswing_zoning
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_zoning`;
CREATE TABLE `cmswing_zoning` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `provinces` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cmswing_zoning
-- ----------------------------
INSERT INTO `cmswing_zoning` VALUES ('12', '华东', '310000,320000,330000,340000,360000');
INSERT INTO `cmswing_zoning` VALUES ('13', '华北', '110000,120000,130000,140000,150000,370000');
INSERT INTO `cmswing_zoning` VALUES ('14', '华中', '410000,420000,430000');
INSERT INTO `cmswing_zoning` VALUES ('15', '华南', '350000,440000,450000,460000');
INSERT INTO `cmswing_zoning` VALUES ('16', '东北', '210000,220000,230000');
INSERT INTO `cmswing_zoning` VALUES ('17', '西北', '610000,620000,630000,640000,650000');
INSERT INTO `cmswing_zoning` VALUES ('18', '西南', '500000,510000,520000,530000,540000');
INSERT INTO `cmswing_zoning` VALUES ('20', '港澳台', '710000,810000,820000');
