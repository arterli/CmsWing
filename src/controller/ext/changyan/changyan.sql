/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-06 23:35:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_ext_changyan
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_changyan`;
CREATE TABLE `cmswing_ext_changyan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `callback` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nickname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `profile_url` varchar(200) DEFAULT '',
  `user_id` int(11) DEFAULT NULL,
  `sign` varchar(50) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `cy_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
