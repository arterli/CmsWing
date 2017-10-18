/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost
 Source Database       : cmswing

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : utf-8

 Date: 10/17/2017 21:04:20 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cmswing_demo`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_demo`;
CREATE TABLE `cmswing_demo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` char(80) NOT NULL COMMENT '标题',
  `category_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '栏目目录',
  `group_id` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '所属分组',
  `model_id` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '内容模型ID',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态0禁用，1启用，-1删除',
  `sort_id` smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '分类信息关联id',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `group_id` (`group_id`),
  KEY `status` (`status`),
  KEY `sort_id` (`sort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
