/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-06 18:37:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_ext_weixin
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_weixin`;
CREATE TABLE `cmswing_ext_weixin` (
  `openid` varchar(50) NOT NULL COMMENT 'OopenId',
  `unionid` varchar(50) NOT NULL COMMENT 'UnionId',
  `nickname` varchar(255) DEFAULT NULL COMMENT '微信昵称',
  `sex` int(5) DEFAULT NULL COMMENT '性别',
  `language` varchar(20) DEFAULT NULL COMMENT '用户的语言',
  `city` varchar(50) DEFAULT NULL COMMENT '城市',
  `province` varchar(50) DEFAULT NULL COMMENT '省',
  `country` varchar(50) DEFAULT NULL COMMENT '国家',
  `headimgurl` varchar(255) DEFAULT NULL COMMENT '头像url',
  `access_token` varchar(255) DEFAULT NULL COMMENT 'access_token',
  `refresh_token` varchar(255) DEFAULT NULL COMMENT 'refresh_token',
  `uid` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
