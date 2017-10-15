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
-- Table structure for cmswing_ext_weibo
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_weibo`;
CREATE TABLE `cmswing_ext_weibo` (
  `id` bigint(11) NOT NULL COMMENT '用户UID',
  `screen_name` varchar(100) NOT NULL COMMENT '用户昵称',
  `name` varchar(255) DEFAULT NULL COMMENT '友好显示名称',
  `province` int(5) DEFAULT NULL COMMENT '用户所在省级ID',
  `city` int(5) DEFAULT NULL COMMENT '用户所在城市ID',
  `location` varchar(200) DEFAULT NULL COMMENT '用户所在地',
  `description` varchar(225) DEFAULT NULL COMMENT '用户个人描述',
  `url` varchar(200) DEFAULT NULL COMMENT '用户博客地址',
  `profile_image_url` varchar(225) DEFAULT NULL COMMENT '用户头像地址（中图），50×50像素',
  `profile_url` varchar(200) DEFAULT NULL COMMENT '用户的微博统一URL地址',
  `domain` varchar(200) DEFAULT '' COMMENT '用户的个性化域名',
  `weihao` varchar(100) DEFAULT NULL COMMENT '用户的微号',
  `gender` varchar(20) DEFAULT NULL COMMENT '性别，m：男、f：女、n：未知',
  `followers_count` int(10) NOT NULL DEFAULT '0' COMMENT '粉丝数',
  `friends_count` int(10) NOT NULL DEFAULT '0' COMMENT '关注数',
  `statuses_count` int(10) NOT NULL DEFAULT '0' COMMENT '微博数',
  `favourites_count` int(10) NOT NULL DEFAULT '0' COMMENT '收藏数',
  `created_at` varchar(50) DEFAULT NULL COMMENT '用户创建（注册）时间',
  `verified_type` int(1) NOT NULL DEFAULT '0' COMMENT '暂未支持\n暂未支持\n暂未支持\n暂未支持\n暂未支持',
  `remark` varchar(100) DEFAULT '' COMMENT '用户备注信息，只有在查询用户关系时才返回此字段',
  `avatar_large` varchar(225) DEFAULT '' COMMENT '用户头像地址（大图），180×180像素',
  `avatar_hd` varchar(225) DEFAULT '' COMMENT '用户头像地址（高清），高清头像原图',
  `verified_reason` varchar(200) DEFAULT NULL COMMENT '认证原因',
  `online_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户的在线状态，0：不在线、1：在线',
  `bi_followers_coun` int(10) NOT NULL DEFAULT '0' COMMENT '用户的互粉数',
  `lang` varchar(10) DEFAULT NULL COMMENT '用户当前的语言版本，zh-cn：简体中文，zh-tw：繁体中文，en：英语',
  `uid` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
