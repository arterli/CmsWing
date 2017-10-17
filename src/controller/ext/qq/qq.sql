/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-06 16:39:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_ext_qq
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_qq`;
CREATE TABLE `cmswing_ext_qq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ret` int(11) DEFAULT NULL COMMENT '返回码',
  `msg` varchar(255) DEFAULT NULL COMMENT '如果ret<0，会有相应的错误信息提示，返回数据全部用UTF-8编码。',
  `nickname` varchar(100) DEFAULT NULL COMMENT '用户在QQ空间的昵称。',
  `figureurl` varchar(255) DEFAULT NULL COMMENT '大小为30×30像素的QQ空间头像URL。',
  `figureurl_1` varchar(255) DEFAULT NULL COMMENT '大小为50×50像素的QQ空间头像URL。',
  `figureurl_2` varchar(255) DEFAULT NULL COMMENT '大小为100×100像素的QQ空间头像URL。',
  `figureurl_qq_1` varchar(255) DEFAULT NULL COMMENT '大小为40×40像素的QQ头像URL。',
  `figureurl_qq_2` varchar(255) DEFAULT NULL COMMENT '大小为100×100像素的QQ头像URL。需要注意，不是所有的用户都拥有QQ的100x100的头像，但40x40像素则是一定会有。',
  `gender` varchar(10) DEFAULT NULL COMMENT '性别。 如果获取不到则默认返回"男"',
  `is_yellow_vip` int(2) DEFAULT '0' COMMENT '标识用户是否为黄钻用户（0：不是；1：是）。',
  `vip` int(2) DEFAULT '0' COMMENT '标识用户是否为黄钻用户（0：不是；1：是）',
  `yellow_vip_level` int(2) DEFAULT '0' COMMENT '黄钻等级',
  `level` int(2) DEFAULT '0' COMMENT '黄钻等级',
  `is_yellow_year_vip` int(2) DEFAULT '0' COMMENT '标识是否为年费黄钻用户（0：不是； 1：是）',
  `uid` int(11) DEFAULT NULL COMMENT '关联用户id',
  `openid` varchar(50) DEFAULT NULL COMMENT 'openid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
