/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-14 08:03:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_question
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
-- Records of cmswing_question
-- ----------------------------
INSERT INTO `cmswing_question` VALUES ('10', '很多图片上传分组三测试', '124', '<p>很多图片上传分组三测试很多图片上传分组三测试很多图片上传分组三测试很多图片上传分组三测试很多图片上传分组三测试很多图片上传分组三测试葫芦娃</p><p><img src=\"//odhs9iog7.qnssl.com/Xfa7UG937kqSIBN9HOY8U_i1.jpg\" alt=\"14-min\" style=\"max-width:100%;\"><img src=\"//odhs9iog7.qnssl.com/XvJolnNk5CUsdlAVrMgBUGTT.jpg\" alt=\"12-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/mrvEAVgSgxhIkug4CEPewAqK.jpg\" alt=\"11-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/rWtk0L2TJYoJ_wZu0IYOjcqn.jpg\" alt=\"18-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/sF7tMkpMPXO6i2JoyMDD0BHW.jpg\" alt=\"23-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/mOe6bCtlQbrztcogqz9lFrfP.jpg\" alt=\"27-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/gIZ8nJnk_hZOXnJ2vlN5wSAs.jpg\" alt=\"20-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/HPpR7Z_c3oZKQtU74ana1LPR.jpg\" alt=\"21-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/PFu-ZFO_HluIgk4rtVy2fvDF.jpg\" alt=\"13-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/XQzeAb3g91-5TqGlBMHluHB1.jpg\" alt=\"24-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/32j7MvKLuoHE4WXLNzUc1kah.jpg\" alt=\"22-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/K5fypRf2lpEibFfH7av2CKhr.jpg\" alt=\"26-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/Cp5FWZ5F73AbYcpB4eAifN7n.jpg\" alt=\"17-min\" style=\"line-height: 1; max-width: 100%;\"><img src=\"//odhs9iog7.qnssl.com/qKkYCWoWi0JO6alj0FHB3-eA.jpg\" alt=\"25-min\" style=\"line-height: 1; max-width: 100%;\"><br></p><p><br></p>', '1476195674831', '1505339693648', '2', '5', '2', '331', '2', '0', '0', '0', '0', '0', '0', null, '0', '2130706433', '44', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '3');
INSERT INTO `cmswing_question` VALUES ('11', '分组二测试', '124', '<p>分组二测试分组二测试分组二测试分组二测试分组二测试分组二测试分组二测试分组二测试</p><p><br></p>', '1476201079243', '1476201079243', '2', '0', '0', '178', '0', '0', '0', '0', '0', '0', '0', null, '0', '2130706433', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '2');
INSERT INTO `cmswing_question` VALUES ('12', '关注测试', '124', '<p>关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试关注测试</p><p><br></p>', '1476202235196', '1476202235196', '2', '0', '0', '124', '0', '0', '0', '0', '0', '0', '0', null, '0', '2130706433', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '3');
INSERT INTO `cmswing_question` VALUES ('33', '手机发布测试', '124', '<p>狗狗一只</p><p><br></p><img src=\"//odhs9iog7.qnssl.com/8B1mC0WJezG4HD2Y7iBTEOMj\" style=\"max-width: 100%;\"><p><br></p>', '1477908334481', '1503947911686', '2', '3', '2', '289', '1', '0', '0', '0', '0', '0', '0', null, '0', '3708501258', '43', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '1');
INSERT INTO `cmswing_question` VALUES ('39', '每次下拉多出列表', '125', '            <p>请输入内容...</p>\n        ', '1484333489627', '1488699194246', '103', '2', '235', '274', '1', '0', '0', '0', '0', '0', '0', null, '0', '1886730872', '40', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('40', '检测到有一个重建任务正在执行，请稍后再试！', '123', '<p>建立索引的时候 一直提示 <br></p><p>检测到有一个重建任务正在执行，请稍后再试！</p><p>请问这个是BUG 吗？<br></p><p><br></p>', '1485229307267', '1487771034219', '131', '1', '1', '256', '2', '0', '0', '0', '0', '0', '0', null, '0', '3729739408', '36', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('41', '测试', '123', '<p>请输入内哈哈哈?&nbsp;容...</p><p><br></p>', '1485229319846', '1486001139562', '149', '1', '200', '190', '1', '0', '0', '0', '0', '0', '0', null, '0', '3658778819', '32', '0', '0', '0', '1', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('42', '34543', '123', '<p>534534</p>', '1487231629134', '1487231650833', '1', '2', '1', '63', '1', '0', '0', '0', '0', '0', '0', null, '0', '3746061070', '35', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('44', 'ffsfs', '124', '<p>请输入内容...</p><p>sfsfsfsf</p>', '1502216303443', '1502216023177', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '2130706433', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('45', 'gfdgsd', '123', '<p>请输入内容...</p><p>gfdsgfdsgdsgs</p>', '1502216327059', '1502216053523', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '2130706433', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('46', '成都市一下发f', '125', '<p>范德萨富士达</p>', '1505443107136', '1507534589631', '2', '1', '1', '9', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '45', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('47', 'fgsdgfsgf', '123', '<p>dsgfdsgfdsgsd</p>', '1507539398753', '1507538757386', '1', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('48', 'fgsdgfsgf', '123', '<p>dsgfdsgfdsgsd</p>', '1507539695697', '1507538757386', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('49', 'fgsdgfsgf', '123', '<p>dsgfdsgfdsgsd</p>', '1507539716851', '1507538757386', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('50', 'gfdsgfdsg', '123', '<p>fgdsgfds</p>', '1507539725733', '1507538720483', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('51', '测试一下', '124', '<p>范德萨发达发阿三</p>', '1507539842851', '1505443093165', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('52', '测试一下', '124', '<p>范德萨发达发阿三</p>', '1507539849704', '1505443093165', '2', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('53', '测试一下', '124', '<p>范德萨发达发阿三</p>', '1507539895286', '1505443093165', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('54', '测试一下', '124', '<p>范德萨发达发阿三</p>', '1507539949239', '1505443093165', '2', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');
INSERT INTO `cmswing_question` VALUES ('55', '2222222222222fdsff', '125', '<p>2222222222222222</p>', '1507540202787', '1507540213687', '1', '0', '0', '5', '1', '0', '0', '0', '0', '0', '0', null, '0', '0', '0', '0', '0', '0', '0', '0', null, '0', null, null, null, '0', '0');

-- ----------------------------
-- Table structure for cmswing_question_answer
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
-- Records of cmswing_question_answer
-- ----------------------------
INSERT INTO `cmswing_question_answer` VALUES ('1', '1', 'FDSAFDSAF DSAFDSA FSAF\nFDSAFDSAFASFA', '1474389274', '0', '0', '1', '0', '0', '0', '1', '0', '2130706433', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('2', '1', '刚刚发的是电风扇放大撒萨弗迪发', '1475704637', '0', '0', '1', '0', '0', '0', '1', '0', '2130706433', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('3', '1', '法大师傅大师傅萨法倒萨放大撒阿发倒萨 ', '1475704740', '0', '0', '1', '0', '0', '0', '1', '0', '2130706433', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('24', '0', '<p>3334555555</p>', '1477218217217', '0', '0', '2', '0', '0', '0', '0', '0', '2130706433', '0', '1', null);
INSERT INTO `cmswing_question_answer` VALUES ('29', '33', '<p>请输入内容...</p><p>测试</p>', '1484333388914', '0', '0', '103', '0', '0', '0', '124', '0', '1886730872', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('30', '39', '<p>手机端的下拉事件，放了个默认的demo，可以根据自己的情况，修改。</p>', '1484361374867', '0', '0', '2', '0', '0', '0', '125', '0', '1780800148', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('31', '40', '<p>www/backup/createindex.lock 手动删除这个文件就好了,<font color=\"#880000\">后台已经加入手动解锁按钮。</font></p><p><br></p>', '1485401019023', '0', '0', '2', '0', '0', '0', '123', '0', '1965261974', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('32', '41', '<p>请输入内容...</p><p>c测试<br></p>', '1486001139562', '0', '0', '200', '0', '0', '0', '123', '0', '1894681476', '0', '1', null);
INSERT INTO `cmswing_question_answer` VALUES ('33', '10', '<p>测试一下回复</p>', '1486967677469', '0', '0', '86', '0', '0', '0', '124', '0', '1875384106', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('34', '42', '<p>sadfasdfasdf</p>', '1487231646121', '0', '0', '1', '0', '0', '0', '123', '0', '3746061070', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('35', '42', '<p>sadfasdf</p>', '1487231650833', '0', '0', '1', '0', '0', '0', '123', '0', '3746061070', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('37', '10', '<h2>asfsdf ddas sdfas</h2><p>sdfaasdfasdfasdf&nbsp;</p><table class=\"\"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;dasfas</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;fdsa&nbsp;</td><td><br></td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p><br></p>', '1487771263101', '0', '0', '1', '0', '0', '0', '124', '0', '1034623257', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('38', '10', '<h1>fdas&nbsp;</h1><p>fasdf&nbsp;</p><h1>asdfasdf&nbsp;</h1><h5>asdf</h5><p><br></p>', '1487771300814', '0', '0', '1', '0', '0', '0', '124', '0', '1034623257', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('40', '39', '            <p>请输入内容...</p>\n        ', '1488699194246', '0', '0', '235', '0', '0', '0', '125', '0', '2883558550', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('41', '10', '<p>请输入内容...</p><p>dgdgdg</p>', '1502216116983', '0', '0', '2', '0', '0', '0', '124', '0', '2130706433', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('42', '33', '<p>打发范德萨</p>', '1503944625737', '0', '0', '2', '0', '0', '0', '124', '0', '2130706433', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('43', '33', '<p>gsgfs</p><p>fds</p><p>fdsaf</p><p>dsaf</p><p>dsa</p><p>fddsaf</p><p>fdsaf</p><p>da</p>', '1503947796556', '0', '0', '2', '0', '0', '0', '124', '0', '2130706433', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('44', '10', '<p>gfdsgdsgds</p><p><img src=\"//odhs9iog7.qnssl.com/upload_b4ba3d3e4d69c560bb93455c0e034720.png\" alt=\"logo_100x100\" style=\"max-width:100%;\"><br></p><p><br></p>', '1505339693648', '0', '0', '2', '0', '0', '0', '124', '0', '0', '0', '0', null);
INSERT INTO `cmswing_question_answer` VALUES ('45', '46', '<p>gfsdgfsdgfs</p>', '1507534589631', '0', '0', '1', '0', '0', '0', '125', '0', '0', '0', '0', null);

-- ----------------------------
-- Table structure for cmswing_question_answer_comments
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
-- Records of cmswing_question_answer_comments
-- ----------------------------
INSERT INTO `cmswing_question_answer_comments` VALUES ('62', '33', '86', '对回复进行评论', '1486967704227');
INSERT INTO `cmswing_question_answer_comments` VALUES ('64', '29', '86', '测试对评论的评论', '1486974720356');
INSERT INTO `cmswing_question_answer_comments` VALUES ('65', '33', '1', '手动阀是打发第三方', '1487771117723');
INSERT INTO `cmswing_question_answer_comments` VALUES ('66', '33', '1', '@tb3816517:撒旦法师打发', '1487771122414');
INSERT INTO `cmswing_question_answer_comments` VALUES ('67', '33', '1', '@admin:撒打发第三方', '1487771130600');
INSERT INTO `cmswing_question_answer_comments` VALUES ('70', '29', '2', 'dsfsddfs', '1503946647011');
INSERT INTO `cmswing_question_answer_comments` VALUES ('71', '45', '1', 'hgfhgfd', '1507534604401');

-- ----------------------------
-- Table structure for cmswing_question_answer_thanks
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
-- Records of cmswing_question_answer_thanks
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_question_answer_uninterested
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
-- Records of cmswing_question_answer_uninterested
-- ----------------------------

-- ----------------------------
-- Table structure for cmswing_question_answer_vote
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
-- Records of cmswing_question_answer_vote
-- ----------------------------
INSERT INTO `cmswing_question_answer_vote` VALUES ('1', '4', '2', '1', '1476215736', '1', '1');

-- ----------------------------
-- Table structure for cmswing_question_focus
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
-- Records of cmswing_question_focus
-- ----------------------------
INSERT INTO `cmswing_question_focus` VALUES ('1', '1', '1', '1474388992');
INSERT INTO `cmswing_question_focus` VALUES ('2', '2', '1', '1475621291');
INSERT INTO `cmswing_question_focus` VALUES ('3', '3', '1', '1475703549');
INSERT INTO `cmswing_question_focus` VALUES ('4', '4', '2', '1476201186');
INSERT INTO `cmswing_question_focus` VALUES ('5', '12', '2', '1476202235230');
INSERT INTO `cmswing_question_focus` VALUES ('6', '13', '2', null);
INSERT INTO `cmswing_question_focus` VALUES ('7', '14', '2', '1476203654554');
INSERT INTO `cmswing_question_focus` VALUES ('8', '15', '2', '1476213148778');
INSERT INTO `cmswing_question_focus` VALUES ('9', '16', '2', '1476288576601');
INSERT INTO `cmswing_question_focus` VALUES ('10', '17', '2', '1476293796988');
INSERT INTO `cmswing_question_focus` VALUES ('11', '18', '2', '1476348689198');
INSERT INTO `cmswing_question_focus` VALUES ('12', '19', '2', '1476371780062');
INSERT INTO `cmswing_question_focus` VALUES ('13', '20', '2', '1476464566997');
INSERT INTO `cmswing_question_focus` VALUES ('14', '21', '2', '1476464639320');
INSERT INTO `cmswing_question_focus` VALUES ('15', '22', '2', '1476465165857');
INSERT INTO `cmswing_question_focus` VALUES ('16', '23', '2', '1476465296290');
INSERT INTO `cmswing_question_focus` VALUES ('17', '24', '2', '1476466247148');
INSERT INTO `cmswing_question_focus` VALUES ('18', '25', '2', '1476466276223');
INSERT INTO `cmswing_question_focus` VALUES ('25', '25', '8', '1476539035970');
INSERT INTO `cmswing_question_focus` VALUES ('26', '26', '2', '1476569871481');
INSERT INTO `cmswing_question_focus` VALUES ('27', '27', '8', '1476893035862');
INSERT INTO `cmswing_question_focus` VALUES ('28', '28', '2', '1477034028883');
INSERT INTO `cmswing_question_focus` VALUES ('29', '29', '2', '1477063515915');
INSERT INTO `cmswing_question_focus` VALUES ('30', '30', '2', '1477073757235');
INSERT INTO `cmswing_question_focus` VALUES ('31', '31', '2', '1477073798748');
INSERT INTO `cmswing_question_focus` VALUES ('32', '32', '2', '1477884551279');
INSERT INTO `cmswing_question_focus` VALUES ('33', '33', '2', '1477908334484');
INSERT INTO `cmswing_question_focus` VALUES ('34', '34', '2', '1482387786905');
INSERT INTO `cmswing_question_focus` VALUES ('35', '35', '2', '1482387934861');
INSERT INTO `cmswing_question_focus` VALUES ('36', '36', '2', '1482487049007');
INSERT INTO `cmswing_question_focus` VALUES ('37', '34', '2', '1483802100417');
INSERT INTO `cmswing_question_focus` VALUES ('38', '35', '2', '1483802764408');
INSERT INTO `cmswing_question_focus` VALUES ('39', '36', '2', '1483889250181');
INSERT INTO `cmswing_question_focus` VALUES ('40', '37', '2', '1483954312259');
INSERT INTO `cmswing_question_focus` VALUES ('41', '38', '2', '1483954764080');
INSERT INTO `cmswing_question_focus` VALUES ('42', '39', '103', '1484333489633');
INSERT INTO `cmswing_question_focus` VALUES ('43', '40', '131', '1485229307271');
INSERT INTO `cmswing_question_focus` VALUES ('44', '41', '149', '1485229319849');
INSERT INTO `cmswing_question_focus` VALUES ('45', '40', '2', '1485404014339');
INSERT INTO `cmswing_question_focus` VALUES ('46', '42', '1', '1487231629139');
INSERT INTO `cmswing_question_focus` VALUES ('47', '10', '1', '1487673254332');
INSERT INTO `cmswing_question_focus` VALUES ('48', '43', '2', '1502216249669');
INSERT INTO `cmswing_question_focus` VALUES ('49', '44', '2', '1502216303827');
INSERT INTO `cmswing_question_focus` VALUES ('50', '45', '2', '1502216327103');
INSERT INTO `cmswing_question_focus` VALUES ('51', '46', '2', '1502216374295');
INSERT INTO `cmswing_question_focus` VALUES ('52', '10', '2', '1503942977912');
INSERT INTO `cmswing_question_focus` VALUES ('53', '46', '2', '1505443107531');
INSERT INTO `cmswing_question_focus` VALUES ('54', '47', '1', '1507539399143');
INSERT INTO `cmswing_question_focus` VALUES ('55', '48', '1', '1507539696088');
INSERT INTO `cmswing_question_focus` VALUES ('56', '49', '1', '1507539716947');
INSERT INTO `cmswing_question_focus` VALUES ('57', '50', '1', '1507539725821');
INSERT INTO `cmswing_question_focus` VALUES ('58', '51', '2', '1507539843250');
INSERT INTO `cmswing_question_focus` VALUES ('59', '52', '2', '1507539849784');
INSERT INTO `cmswing_question_focus` VALUES ('60', '53', '2', '1507539895375');
INSERT INTO `cmswing_question_focus` VALUES ('61', '54', '2', '1507539949622');
INSERT INTO `cmswing_question_focus` VALUES ('62', '55', '1', '1507540202884');

-- ----------------------------
-- Table structure for cmswing_question_user
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

-- ----------------------------
-- Records of cmswing_question_user
-- ----------------------------
INSERT INTO `cmswing_question_user` VALUES ('1', '0', '0', '2', '7', '0', '0', '0', '0', '8');
INSERT INTO `cmswing_question_user` VALUES ('2', '0', '0', '20', '15', '0', '0', '0', '0', '2');
INSERT INTO `cmswing_question_user` VALUES ('3', '0', '0', '1', '1', '0', '0', '0', '0', '103');
INSERT INTO `cmswing_question_user` VALUES ('4', '0', '0', '1', '0', '0', '0', '0', '0', '131');
INSERT INTO `cmswing_question_user` VALUES ('5', '0', '0', '1', '0', '0', '0', '0', '0', '149');
INSERT INTO `cmswing_question_user` VALUES ('6', '0', '0', '0', '1', '0', '0', '0', '0', '200');
INSERT INTO `cmswing_question_user` VALUES ('7', '0', '0', '0', '1', '0', '0', '0', '0', '86');
INSERT INTO `cmswing_question_user` VALUES ('8', '0', '0', '5', '0', '0', '0', '0', '0', '1');
INSERT INTO `cmswing_question_user` VALUES ('9', '0', '0', '0', '1', '0', '0', '0', '0', '235');
