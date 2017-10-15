/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : www.cmswing.com

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-06 15:12:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_ext_link
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_link`;
CREATE TABLE `cmswing_ext_link` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `typeid` smallint(5) NOT NULL DEFAULT '0' COMMENT '类别id',
  `linktype` tinyint(1) NOT NULL DEFAULT '0' COMMENT '链接类型 1 logo，0文字',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '网站名称',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '网站地址',
  `logo` varchar(255) NOT NULL DEFAULT '' COMMENT '网站logo',
  `introduce` text COMMENT '网站介绍',
  `username` varchar(255) NOT NULL DEFAULT '' COMMENT '申请者',
  `sort` smallint(5) NOT NULL DEFAULT '0' COMMENT '排序',
  `elite` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否推荐 0 不推荐，1推荐',
  `passed` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0没有审核，1通过审核',
  `addtime` bigint(13) NOT NULL DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cmswing_ext_link
-- ----------------------------
INSERT INTO `cmswing_ext_link` VALUES ('1', '0', '1', 'CmsWing', 'http://www.cmswing.com', '/static/assets/images/logo.svg', '', '', '1', '0', '1', '1450621131');
INSERT INTO `cmswing_ext_link` VALUES ('2', '1', '1', 'ThinkJS', 'https://thinkjs.org', 'https://thinkjs.org/static/img/logo.svg', 'ThinkJS 是一款使用 ES6/7 特性全新开发的 Node.js MVC 框架，使用 ES7 中 async/await，或者 ES6 中的 */yield 特性彻底解决了 Node.js 中异步嵌套的问题。同时吸收了国内外众多框架的设计理念和思想，让开发 Node.js 项目更加简单、高效。', '', '2', '0', '1', '0');
INSERT INTO `cmswing_ext_link` VALUES ('3', '0', '0', 'CMSWing系统演示', 'http://www.cmswing.net', '', '', '', '3', '0', '1', '0');
