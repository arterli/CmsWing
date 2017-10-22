/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : localhost
 Source Database       : cmswing

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : utf-8

 Date: 10/23/2017 00:39:06 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cmswing_ext_attachment`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_attachment`;
CREATE TABLE `cmswing_ext_attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(80) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `create_time` bigint(13) NOT NULL,
  `type` tinyint(3) NOT NULL DEFAULT '0' COMMENT '0:图片,1:文件',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '数据状态0禁用，1启用，-1删除',
  `sort` int(8) NOT NULL DEFAULT '0',
  `rule` text NOT NULL,
  `use` tinyint(3) NOT NULL DEFAULT '0' COMMENT '0:后台,1:前台',
  `dis` char(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `cmswing_ext_attachment`
-- ----------------------------
BEGIN;
INSERT INTO `cmswing_ext_attachment` VALUES ('1', '', 'wangEditor 图片上传接口', '1508682182987', '0', '1', '0', '{\"errno\": 0,\"data\": [\"${url}\"]}', '0', 'wangEditor'), ('2', 'editormd-image-file', 'Editor.md 图片上传返回接口', '1508687544227', '0', '1', '0', '{ \"success\": 1,\"message\": \"上传成功\",\"url\": \"${url}\"}', '0', 'editormd'), ('3', '', 'wangEditor  手机端图片上传返回接口', '1508688874449', '0', '1', '0', '${url}', '0', 'mwangEditor');
COMMIT;

-- ----------------------------
--  Table structure for `cmswing_ext_attachment_file`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_attachment_file`;
CREATE TABLE `cmswing_ext_attachment_file` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '文件ID',
  `name` char(200) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '原始文件名',
  `savename` char(200) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '保存名称',
  `savepath` char(100) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件保存路径',
  `ext` char(5) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件后缀',
  `mime` char(100) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件mime类型',
  `size` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小',
  `md5` char(32) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件md5',
  `sha1` char(40) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '文件保存位置 1微信，2，七牛',
  `url` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '远程地址',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '上传时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_md5` (`md5`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='文件表';

-- ----------------------------
--  Table structure for `cmswing_ext_attachment_pic`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_attachment_pic`;
CREATE TABLE `cmswing_ext_attachment_pic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id自增',
  `path` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '路径',
  `url` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '图片链接',
  `md5` char(32) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件md5',
  `sha1` char(40) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `type` int(2) DEFAULT '0' COMMENT '图片来源，或模块区分 1:微信2:七牛',
  `source_id` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '来源id，当关联其他平台时该平台生产的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=903 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
