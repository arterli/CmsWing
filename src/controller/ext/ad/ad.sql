/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : cmswing

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-06 19:16:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cmswing_ext_ad
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_ad`;
CREATE TABLE `cmswing_ext_ad` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `spaceid` smallint(5) unsigned NOT NULL DEFAULT '0',
  `type` varchar(10) NOT NULL,
  `setting` text NOT NULL,
  `startdate` bigint(13) unsigned NOT NULL DEFAULT '0',
  `enddate` bigint(13) unsigned NOT NULL DEFAULT '0',
  `addtime` bigint(13) unsigned NOT NULL DEFAULT '0',
  `hits` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `clicks` smallint(5) unsigned NOT NULL DEFAULT '0',
  `sort` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '0：禁用，1：启用',
  PRIMARY KEY (`id`),
  KEY `spaceid` (`spaceid`,`status`,`sort`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cmswing_ext_ad
-- ----------------------------
INSERT INTO `cmswing_ext_ad` VALUES ('24', '代码1', '15', 'code', '[{\"code\":\"<div class=\\\"box-flip box-icon box-icon-center box-icon-round box-icon-large text-center\\\">\\r\\n\\t\\t\\t<div class=\\\"front\\\">\\r\\n\\t\\t\\t\\t<div class=\\\"box1\\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\\"box-icon-title\\\">\\r\\n\\t\\t\\t\\t\\t\\t<i class=\\\"fa fa-check\\\"></i>\\r\\n\\t\\t\\t\\t\\t\\t<h2>Full Width</h2>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<p>Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<div class=\\\"back\\\">\\r\\n\\t\\t\\t\\t<div class=\\\"box2\\\">\\r\\n\\t\\t\\t\\t\\t<h4>BACK SIDE</h4>\\r\\n\\t\\t\\t\\t\\t<hr />\\r\\n\\t\\t\\t\\t\\t<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas metus nulla, commodo a sodales sed, dignissim pretium nunc. Nam et lacus neque. Ut enim massa, sodales tempor convallis et, iaculis ac massa. Maecenas metus nulla, commodo a sodales sed, dignissim pretium nunc. Nam et lacus neque.</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\"}]', '1489167480000', '1490895480000', '1489167627733', '0', '0', '0', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('21', '文字广告三', '14', 'text', '[{\"alt\":\"支持自定义用户行为\",\"info\":\"为您的运营决策提供有效参考数据\",\"ico\":\"fa-group\"}]', '1489113480000', '1490927880000', '1489113600600', '0', '0', '3', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('19', '文字广告一', '14', 'text', '[{\"alt\":\"全新的架构和模块化开发机制\",\"info\":\"便于灵活扩展和二次开发\",\"ico\":\"fa-cubes\"}]', '1489108320000', '1490922720000', '1489108510299', '0', '0', '1', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('20', '文字广告二', '14', 'text', '[{\"alt\":\"模型/栏目/分类信息体系\",\"info\":\"轻松实现差异化的功能\",\"ico\":\"fa-tasks\"}]', '1489109400000', '1490923800000', '1489109589707', '0', '0', '2', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('17', '轮播广告第一个', '13', 'images', '[{\"url\":\"http://www.sina.com\",\"alt\":\"轮播第一个\",\"att\":\"818\"}]', '1489052460000', '1490953260000', '1489052709516', '0', '0', '0', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('18', '轮播广告第二个', '13', 'images', '[{\"url\":\"http://www.baidu.com\",\"alt\":\"第二个\",\"att\":\"819\"}]', '1489052760000', '1490953560000', '1489052916332', '0', '0', '0', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('22', '文字广告四', '14', 'text', '[{\"alt\":\"云存储、云安全等服务\",\"info\":\"更多贴心的服务让您的网站更安心\",\"ico\":\"fa-soundcloud\"}]', '1489113780000', '1490928180000', '1489113849154', '0', '0', '4', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('16', 'cmswing图片广告', '11', 'images', '[{\"url\":\"http://www.cmswing.com\",\"alt\":\"fdsafdsafdsaf\",\"att\":\"817\"}]', '1488935640000', '1490836440000', '1488937997050', '0', '0', '0', '1');
INSERT INTO `cmswing_ext_ad` VALUES ('25', '测试广告', '16', 'images', '[{\"url\":\"http://www.baidu.com\",\"alt\":\"fdsfdsa\"}]', '1493281686040', '1495873686040', '1493281686040', '0', '0', '0', '1');

-- ----------------------------
-- Table structure for cmswing_ext_ad_space
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_ad_space`;
CREATE TABLE `cmswing_ext_ad_space` (
  `spaceid` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `type` char(30) NOT NULL,
  `path` char(40) NOT NULL DEFAULT '',
  `width` smallint(4) unsigned NOT NULL DEFAULT '0',
  `height` smallint(4) unsigned NOT NULL DEFAULT '0',
  `setting` char(100) NOT NULL DEFAULT '',
  `description` char(100) NOT NULL,
  `items` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `code` text,
  `json` text,
  PRIMARY KEY (`spaceid`),
  KEY `disabled` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cmswing_ext_ad_space
-- ----------------------------
INSERT INTO `cmswing_ext_ad_space` VALUES ('14', '文字广告', 'text', '', '0', '0', '', '文字广告一排四个', '4', '0', '<div class=\"info-bar info-bar-clean info-bar-bordered nomargin\">\r\n		<div class=\"container\">\r\n			<div class=\"row\">\r\n\r\n				<div class=\"col-sm-3\">\r\n					<i class=\"fa fa-cubes\"></i>\r\n					<h3><a herf=\"javascript:void(0)\">全新的架构和模块化开发机制</a></h3>\r\n					<p>便于灵活扩展和二次开发</p>\r\n				</div>\r\n\r\n				<div class=\"col-sm-3\">\r\n					<i class=\"fa fa-tasks\"></i>\r\n					<h3><a herf=\"javascript:void(0)\">模型/栏目/分类信息体系</a></h3>\r\n					<p>轻松实现差异化的功能</p>\r\n				</div>\r\n\r\n				<div class=\"col-sm-3\">\r\n					<i class=\"fa fa-group\"></i>\r\n					<h3><a herf=\"javascript:void(0)\">支持自定义用户行为</a></h3>\r\n					<p>为您的运营决策提供有效参考数据</p>\r\n				</div>\r\n\r\n				<div class=\"col-sm-3\">\r\n					<i class=\"fa fa-soundcloud\"></i>\r\n					<h3><a herf=\"javascript:void(0)\">云存储、云安全等服务</a></h3>\r\n					<p>更多贴心的服务让您的网站更安心</p>\r\n				</div>\r\n\r\n			</div>\r\n		</div>\r\n	</div>', '[{\"alt\":\"全新的架构和模块化开发机制\",\"info\":\"便于灵活扩展和二次开发\",\"ico\":\"fa-cubes\",\"width\":0,\"height\":0},{\"alt\":\"模型/栏目/分类信息体系\",\"info\":\"轻松实现差异化的功能\",\"ico\":\"fa-tasks\",\"width\":0,\"height\":0},{\"alt\":\"支持自定义用户行为\",\"info\":\"为您的运营决策提供有效参考数据\",\"ico\":\"fa-group\",\"width\":0,\"height\":0},{\"alt\":\"云存储、云安全等服务\",\"info\":\"更多贴心的服务让您的网站更安心\",\"ico\":\"fa-soundcloud\",\"width\":0,\"height\":0}]');
INSERT INTO `cmswing_ext_ad_space` VALUES ('11', '首页通栏横幅', 'banner', '', '1140', '120', '', '首页通栏横幅', '1', '0', '<a class=\"margin-bottom-20 block thumbnail\" href=\"http://www.cmswing.com\" target = \"_blank\" title = \"fdsafdsafdsaf\" >\r\n<img class=\"img-responsive\" src=\"//odhs9iog7.qnssl.com/JPwL5tlUW298XZ_cx_KN3xue.jpg\" alt=\"fdsafdsafdsaf\" style=\"height:120px;width:100%\">\r\n</a>', '{\"url\":\"http://www.cmswing.com\",\"alt\":\"fdsafdsafdsaf\",\"att\":\"817\",\"width\":1140,\"height\":120}');
INSERT INTO `cmswing_ext_ad_space` VALUES ('13', '小侧栏轮换广告', 'imagechange', '', '270', '350', '', '小侧栏轮换广告', '2', '0', '<!-- BANNER ROTATOR -->\r\n<div class=\"owl-carousel buttons-autohide controlls-over margin-bottom-20 text-center\" data-plugin-options=\'{\"singleItem\": true, \"autoPlay\": 4000, \"navigation\": true, \"pagination\": true, \"transitionStyle\":\"goDown\"}\'>\r\n\r\n<a href=\"http://www.baidu.com\">\r\n<img class=\"img-responsive\" src=\"//odhs9iog7.qnssl.com/Slvp5DCKoEPngTPvBnCBrEDU.png\" width=\"270\" height=\"350\" alt=\"第二个\">\r\n</a>\r\n\r\n<a href=\"http://www.sina.com\">\r\n<img class=\"img-responsive\" src=\"//odhs9iog7.qnssl.com/K13Q_mJEocdF9QZKsY-HnPVr.png\" width=\"270\" height=\"350\" alt=\"轮播第一个\">\r\n</a>\r\n\r\n</div>\r\n<!-- /BANNER ROTATOR -->', '[{\"url\":\"http://www.baidu.com\",\"alt\":\"第二个\",\"att\":\"819\",\"width\":270,\"height\":350},{\"url\":\"http://www.sina.com\",\"alt\":\"轮播第一个\",\"att\":\"818\",\"width\":270,\"height\":350}]');
INSERT INTO `cmswing_ext_ad_space` VALUES ('15', '代码广告', 'code', '', '0', '0', '', '代码广告', '1', '0', '<div class=\"box-flip box-icon box-icon-center box-icon-round box-icon-large text-center\">\r\n			<div class=\"front\">\r\n				<div class=\"box1\">\r\n					<div class=\"box-icon-title\">\r\n						<i class=\"fa fa-check\"></i>\r\n						<h2>Full Width</h2>\r\n					</div>\r\n					<p>Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere</p>\r\n				</div>\r\n			</div>\r\n\r\n			<div class=\"back\">\r\n				<div class=\"box2\">\r\n					<h4>BACK SIDE</h4>\r\n					<hr />\r\n					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas metus nulla, commodo a sodales sed, dignissim pretium nunc. Nam et lacus neque. Ut enim massa, sodales tempor convallis et, iaculis ac massa. Maecenas metus nulla, commodo a sodales sed, dignissim pretium nunc. Nam et lacus neque.</p>\r\n				</div>\r\n			</div>\r\n		</div>', '{\"code\":\"<div class=\\\"box-flip box-icon box-icon-center box-icon-round box-icon-large text-center\\\">\\r\\n\\t\\t\\t<div class=\\\"front\\\">\\r\\n\\t\\t\\t\\t<div class=\\\"box1\\\">\\r\\n\\t\\t\\t\\t\\t<div class=\\\"box-icon-title\\\">\\r\\n\\t\\t\\t\\t\\t\\t<i class=\\\"fa fa-check\\\"></i>\\r\\n\\t\\t\\t\\t\\t\\t<h2>Full Width</h2>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<p>Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<div class=\\\"back\\\">\\r\\n\\t\\t\\t\\t<div class=\\\"box2\\\">\\r\\n\\t\\t\\t\\t\\t<h4>BACK SIDE</h4>\\r\\n\\t\\t\\t\\t\\t<hr />\\r\\n\\t\\t\\t\\t\\t<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas metus nulla, commodo a sodales sed, dignissim pretium nunc. Nam et lacus neque. Ut enim massa, sodales tempor convallis et, iaculis ac massa. Maecenas metus nulla, commodo a sodales sed, dignissim pretium nunc. Nam et lacus neque.</p>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\",\"width\":0,\"height\":0}');
INSERT INTO `cmswing_ext_ad_space` VALUES ('16', '测试广告位', 'banner', '', '100', '100', '', '111', '1', '0', '<a class=\"margin-bottom-20 block thumbnail\" href=\"http://www.baidu.com\" target = \"_blank\" title = \"fdsfdsa\" >\r\n<img class=\"img-responsive\" src=\"/static/noimg.jpg\" alt=\"fdsfdsa\" style=\"height:100px;width:100%\">\r\n</a>', '{\"url\":\"http://www.baidu.com\",\"alt\":\"fdsfdsa\",\"width\":100,\"height\":100}');

-- ----------------------------
-- Table structure for cmswing_ext_ad_temp
-- ----------------------------
DROP TABLE IF EXISTS `cmswing_ext_ad_temp`;
CREATE TABLE `cmswing_ext_ad_temp` (
  `tempid` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8 NOT NULL,
  `title` char(100) CHARACTER SET utf8 NOT NULL,
  `align` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0:无，1：全屏居中，2：随屏滚动',
  `select` tinyint(2) NOT NULL DEFAULT '0',
  `padding` tinyint(2) NOT NULL DEFAULT '0',
  `size` tinyint(2) NOT NULL DEFAULT '0',
  `option` tinyint(2) NOT NULL DEFAULT '0',
  `num` tinyint(2) NOT NULL DEFAULT '0',
  `iscore` tinyint(2) NOT NULL DEFAULT '1',
  `type` varchar(255) NOT NULL DEFAULT '',
  `temp` text CHARACTER SET utf8mb4,
  PRIMARY KEY (`tempid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cmswing_ext_ad_temp
-- ----------------------------
INSERT INTO `cmswing_ext_ad_temp` VALUES ('1', 'banner', '矩形横幅', '0', '0', '0', '1', '0', '1', '1', '{\"images\":\"1\",\"flash\":0,\"text\":0,\"code\":0}', '<a class=\"margin-bottom-20 block thumbnail\" href=\"[url]\" target = \"_blank\" title = \"[alt]\" >\r\n<img class=\"img-responsive\" src=\"[att|get_pic]\" alt=\"[alt]\" style=\"height:[height]px;width:100%\">\r\n</a>');
INSERT INTO `cmswing_ext_ad_temp` VALUES ('2', 'imagechange', '图片轮换广告', '0', '0', '0', '1', '1', '1', '1', '{\"images\":\"1\",\"flash\":0,\"text\":0,\"code\":0}', '<!-- BANNER ROTATOR -->\r\n<div class=\"owl-carousel buttons-autohide controlls-over margin-bottom-20 text-center\" data-plugin-options=\'{\"singleItem\": true, \"autoPlay\": 4000, \"navigation\": true, \"pagination\": true, \"transitionStyle\":\"goDown\"}\'>\r\n{loop}\r\n<a href=\"[url]\">\r\n<img class=\"img-responsive\" src=\"[att|get_pic]\" width=\"[width]\" height=\"[height]\" alt=\"[alt]\">\r\n</a>\r\n{/loop}\r\n</div>\r\n<!-- /BANNER ROTATOR -->');
INSERT INTO `cmswing_ext_ad_temp` VALUES ('3', 'code', '代码广告', '0', '0', '0', '0', '0', '1', '1', '{\"code\":\"1\",\"images\":0,\"flash\":0,\"text\":0}', '[code]');
INSERT INTO `cmswing_ext_ad_temp` VALUES ('4', 'text', '文字广告', '0', '0', '0', '0', '1', '1', '1', '{\"text\":\"1\",\"images\":0,\"flash\":0,\"code\":0}', '<div class=\"info-bar info-bar-clean info-bar-bordered nomargin\">\r\n		<div class=\"container\">\r\n			<div class=\"row\">\r\n{loop}\r\n				<div class=\"col-sm-3\">\r\n					<i class=\"fa [ico]\"></i>\r\n					<h3><a herf=\"[url]\">[alt]</a></h3>\r\n					<p>[info]</p>\r\n				</div>\r\n{/loop}\r\n			</div>\r\n		</div>\r\n	</div>');
