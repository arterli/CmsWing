/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : vkj

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-11-06 21:23:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for vkj_auth_role
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_role`;
CREATE TABLE `vkj_auth_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `status` tinyint(11) NOT NULL DEFAULT '1',
  `rule_ids` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_role
-- ----------------------------
INSERT INTO `vkj_auth_role` VALUES ('1', '规则', '1', '1,2');

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
INSERT INTO `vkj_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '0', 'fdsa@fasf.com', '0', '', '1446275814', '0', '1446779193061', '2130706433', '1446275814', '1');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_session
-- ----------------------------
INSERT INTO `vkj_session` VALUES ('8', 'cxMuvu16OXQ0H0RJzO7jTdhxZRXoBpdQ', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446810438696');
INSERT INTO `vkj_session` VALUES ('9', 'q7awxcI7ZoSzmwsdIeWB_01G_eBKbvQ9', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1446742563230}}', '1446886816922');
