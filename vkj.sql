/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : vkj

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-11-06 11:04:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for vkj_auth_group
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_group`;
CREATE TABLE `vkj_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(100) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `rules` char(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_group
-- ----------------------------
INSERT INTO `vkj_auth_group` VALUES ('1', '默认用户组', '1', '1,2,34');
INSERT INTO `vkj_auth_group` VALUES ('2', '222', '1', '444');

-- ----------------------------
-- Table structure for vkj_auth_group_access
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_group_access`;
CREATE TABLE `vkj_auth_group_access` (
  `uid` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_group_access
-- ----------------------------
INSERT INTO `vkj_auth_group_access` VALUES ('0', '0');
INSERT INTO `vkj_auth_group_access` VALUES ('1', '1');
INSERT INTO `vkj_auth_group_access` VALUES ('3', '2');

-- ----------------------------
-- Table structure for vkj_auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `vkj_auth_rule`;
CREATE TABLE `vkj_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL DEFAULT '',
  `title` char(20) NOT NULL DEFAULT '',
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `condition` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_auth_rule
-- ----------------------------
INSERT INTO `vkj_auth_rule` VALUES ('1', 'Admin/Index/index', '首页', '1', '1', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of vkj_member
-- ----------------------------
INSERT INTO `vkj_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', '0', 'fdsa@fasf.com', '0', '', '1446275814', '0', '1446742563230', '2130706433', '1446275814', '1');
INSERT INTO `vkj_member` VALUES ('2', 'aaa', '11111', '0', 'fdsa@fsaf.com', '0', '', '0', '0', '0', '0', '0', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_session
-- ----------------------------
INSERT INTO `vkj_session` VALUES ('1', '3ocIZzvSl0k6skwSoq7A3QxKAP30fzPM', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446555423834');
INSERT INTO `vkj_session` VALUES ('3', 'yZuxLCCHGECOpXDEsotJgGhaVYsQbTBt', '{}', '1446570480864');
INSERT INTO `vkj_session` VALUES ('4', '0WyQne6OH4cNbrWBIkhAg4waIj0_ktE8', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446653768943');
INSERT INTO `vkj_session` VALUES ('5', '4P5t_UI7Lubf3Vi0K7EvZqY7I4T1vOtl', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446739895468');
INSERT INTO `vkj_session` VALUES ('6', 'tpbFM1dSA2mEnhaLabHezkek5Vqr5FiW', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":1446742351795}}', '1446832519885');
INSERT INTO `vkj_session` VALUES ('7', 'ZcvKAh_F59FLLztUmPc7OI0B_ERx6zGC', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446820287416');
