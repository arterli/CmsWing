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

 Date: 10/17/2017 02:05:57 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cmswing_question`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question`;
CREATE TABLE `cmswing_question` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(255) NOT NULL COMMENT '问题内容',
  `category_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类 ID',
  `detail` text NOT NULL COMMENT '问题说明',
  `create_time` bigint(13) NOT NULL COMMENT '添加时间',
  `update_time` bigint(13) NOT NULL COMMENT '更新时间',
  `uid` int(10) unsigned NOT NULL COMMENT '发布用户UID',
  `answer_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '回答计数',
  `answer_users` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '回答者',
  `view` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `focus_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '关注数',
  `comment_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '评论数',
  `action_history_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '动作的记录表的关连id',
  `agree_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '回复赞同数总和',
  `against_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '回复反对数总和',
  `best_answer` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最佳回复 ID',
  `has_attach` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否存在附件',
  `unverified_modify` text COMMENT '未经证实的修改',
  `unverified_modify_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '未经证实的修改数',
  `ip` bigint(13) NOT NULL COMMENT '发布者ip',
  `last_answer` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后回答 ID',
  `popular_value` double NOT NULL DEFAULT '0',
  `popular_value_update` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新热度',
  `lock` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否锁定',
  `anonymous` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否匿名',
  `thanks_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '答谢数',
  `question_content_fulltext` text COMMENT '问题内容全文',
  `is_recommend` tinyint(2) NOT NULL DEFAULT '0' COMMENT '谁否推荐',
  `weibo_msg_id` bigint(20) DEFAULT NULL,
  `received_email_id` int(10) DEFAULT NULL,
  `chapter_id` int(10) unsigned DEFAULT NULL,
  `sort` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `group_id` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '所属分组',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `cmswing_question_answer`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_answer`;
CREATE TABLE `cmswing_question_answer` (
  `answer_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回答id',
  `question_id` int(11) NOT NULL COMMENT '问题id',
  `answer_content` text COMMENT '回答内容',
  `add_time` bigint(13) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `against_count` int(11) NOT NULL DEFAULT '0' COMMENT '反对人数',
  `agree_count` int(11) NOT NULL DEFAULT '0' COMMENT '支持人数',
  `uid` int(11) DEFAULT '0' COMMENT '发布问题用户ID',
  `comment_count` int(11) DEFAULT '0' COMMENT '评论总数',
  `uninterested_count` int(11) DEFAULT '0' COMMENT '不感兴趣',
  `thanks_count` int(11) DEFAULT '0' COMMENT '感谢数量',
  `category_id` int(11) DEFAULT '0' COMMENT '分类id',
  `has_attach` tinyint(1) DEFAULT '0' COMMENT '是否存在附件',
  `ip` bigint(11) DEFAULT NULL,
  `force_fold` tinyint(1) DEFAULT '0' COMMENT '强制折叠',
  `anonymous` tinyint(1) DEFAULT '0',
  `publish_source` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `question_id` (`question_id`),
  KEY `agree_count` (`agree_count`),
  KEY `against_count` (`against_count`),
  KEY `add_time` (`add_time`),
  KEY `uid` (`uid`),
  KEY `uninterested_count` (`uninterested_count`),
  KEY `force_fold` (`force_fold`),
  KEY `anonymous` (`anonymous`),
  KEY `publich_source` (`publish_source`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='回答';

-- ----------------------------
--  Table structure for `cmswing_question_answer_comments`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_answer_comments`;
CREATE TABLE `cmswing_question_answer_comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `answer_id` int(11) DEFAULT '0',
  `uid` int(11) DEFAULT '0',
  `message` text,
  `time` bigint(13) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `answer_id` (`answer_id`),
  KEY `time` (`time`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `cmswing_question_answer_thanks`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_answer_thanks`;
CREATE TABLE `cmswing_question_answer_thanks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0',
  `answer_id` int(11) DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `answer_id` (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `cmswing_question_answer_uninterested`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_answer_uninterested`;
CREATE TABLE `cmswing_question_answer_uninterested` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0',
  `answer_id` int(11) DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `answer_id` (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `cmswing_question_answer_vote`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_answer_vote`;
CREATE TABLE `cmswing_question_answer_vote` (
  `voter_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动ID',
  `answer_id` int(11) DEFAULT NULL COMMENT '回复id',
  `answer_uid` int(11) DEFAULT NULL COMMENT '回复作者id',
  `vote_uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `vote_value` tinyint(4) NOT NULL COMMENT '-1反对 1 支持',
  `reputation_factor` int(10) DEFAULT '0',
  PRIMARY KEY (`voter_id`),
  KEY `answer_id` (`answer_id`),
  KEY `vote_value` (`vote_value`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `cmswing_question_focus`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_focus`;
CREATE TABLE `cmswing_question_focus` (
  `focus_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `question_id` int(11) DEFAULT NULL COMMENT '话题ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `add_time` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`focus_id`),
  KEY `question_id` (`question_id`),
  KEY `question_uid` (`question_id`,`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='问题关注表';

-- ----------------------------
--  Table structure for `cmswing_question_user`
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_question_user`;
CREATE TABLE `cmswing_question_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `friend_count` int(10) NOT NULL DEFAULT '0' COMMENT '观众数',
  `invite_count` int(10) NOT NULL DEFAULT '0' COMMENT '邀请我回答数量',
  `question_count` int(10) NOT NULL DEFAULT '0' COMMENT '问题数量',
  `answer_count` int(10) NOT NULL DEFAULT '0' COMMENT '回答数量',
  `topic_focus_count` int(10) NOT NULL DEFAULT '0' COMMENT '关注话题数量',
  `invitation_available` int(10) NOT NULL DEFAULT '0' COMMENT '邀请数量',
  `agree_count` int(10) DEFAULT '0' COMMENT '赞同数量',
  `thanks_count` int(10) DEFAULT '0' COMMENT '感谢数量',
  `uid` int(10) NOT NULL DEFAULT '0' COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

SET FOREIGN_KEY_CHECKS = 1;
