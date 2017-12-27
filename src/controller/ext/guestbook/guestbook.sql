SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_ext_guestbook
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_guestbook`;
CREATE TABLE `cmswing_ext_guestbook` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` char(16) NOT NULL COMMENT '用户名',
  `title` char(80) CHARACTER SET utf8 NOT NULL COMMENT '标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '留言内容',
  `create_time` bigint(13) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
