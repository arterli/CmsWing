/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : vkj

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-11-02 18:43:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for vkj_member
-- ----------------------------
DROP TABLE IF EXISTS `vkj_member`;
CREATE TABLE `vkj_member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` char(16) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `email` char(32) NOT NULL COMMENT '用户邮箱',
  `mobile` char(15) NOT NULL DEFAULT '' COMMENT '用户手机',
  `reg_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `reg_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '注册IP',
  `last_login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `last_login_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '最后登录IP',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) DEFAULT '0' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of vkj_member
-- ----------------------------
INSERT INTO `vkj_member` VALUES ('1', 'admin', 'e051070da90d8f227ee2eb0805abce79', 'fdsa@fasf.com', '', '1446275814', '0', '4294967295', '2130706433', '1446275814', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vkj_session
-- ----------------------------
INSERT INTO `vkj_session` VALUES ('1', '3ocIZzvSl0k6skwSoq7A3QxKAP30fzPM', '{\"userInfo\":{\"uid\":1,\"username\":\"admin\",\"last_login_time\":4294967295}}', '1446545408102');
