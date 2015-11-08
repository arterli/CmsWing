/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : vkj

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-11-09 00:45:05
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
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_role
-- ----------------------------
INSERT INTO `vkj_auth_role` VALUES ('1', '规则', '分身', '1', '1,2');
INSERT INTO `vkj_auth_role` VALUES ('2', '测试用户组', '', '1', '');
INSERT INTO `vkj_auth_role` VALUES ('3', '2222', '', '1', '');
INSERT INTO `vkj_auth_role` VALUES ('18', 'rrrrrr', 'ccccccc22222', '1', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_rule
-- ----------------------------
INSERT INTO `vkj_auth_rule` VALUES ('1', '/admin/index', '规则名称', '0', '1', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_user_role
-- ----------------------------
INSERT INTO `vkj_auth_user_role` VALUES ('1', '1', '1');
INSERT INTO `vkj_auth_user_role` VALUES ('2', '1', '2');

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
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of vkj_member
-- ----------------------------
INSERT INTO `vkj_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '0', 'fdsa@fasf.com', '0', '', '1446275814', '0', '1447000477979', '2130706433', '1446275814', '1');
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
