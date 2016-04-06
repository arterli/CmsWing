/*!
 * =====================================================
 * light7 V0.4.3 - http://light7.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function ($) {

    $.smConfig.rawCitiesData = [{
        "id": 110000,
        "name": "北京市",
        "parent_id": 0,
        "sort": 1,
        "sub": [{
            "id": 110100,
            "name": "北京市",
            "parent_id": 110000,
            "sort": 1,
            "sub": [{"id": 110101, "name": "东城区", "parent_id": 110100, "sort": 1}, {
                "id": 110102,
                "name": "西城区",
                "parent_id": 110100,
                "sort": 2
            }, {"id": 110103, "name": "崇文区", "parent_id": 110100, "sort": 3}, {
                "id": 110104,
                "name": "宣武区",
                "parent_id": 110100,
                "sort": 4
            }, {"id": 110105, "name": "朝阳区", "parent_id": 110100, "sort": 5}, {
                "id": 110106,
                "name": "丰台区",
                "parent_id": 110100,
                "sort": 6
            }, {"id": 110107, "name": "石景山区", "parent_id": 110100, "sort": 7}, {
                "id": 110108,
                "name": "海淀区",
                "parent_id": 110100,
                "sort": 8
            }, {"id": 110109, "name": "门头沟区", "parent_id": 110100, "sort": 9}, {
                "id": 110111,
                "name": "房山区",
                "parent_id": 110100,
                "sort": 10
            }, {"id": 110112, "name": "通州区", "parent_id": 110100, "sort": 11}, {
                "id": 110113,
                "name": "顺义区",
                "parent_id": 110100,
                "sort": 12
            }, {"id": 110114, "name": "昌平区", "parent_id": 110100, "sort": 13}, {
                "id": 110115,
                "name": "大兴区",
                "parent_id": 110100,
                "sort": 14
            }, {"id": 110116, "name": "怀柔区", "parent_id": 110100, "sort": 15}, {
                "id": 110117,
                "name": "平谷区",
                "parent_id": 110100,
                "sort": 16
            }],
            "type": 0
        }, {
            "id": 110200,
            "name": "县",
            "parent_id": 110000,
            "sort": 2,
            "sub": [{"id": 110228, "name": "密云县", "parent_id": 110200, "sort": 1}, {
                "id": 110229,
                "name": "延庆县",
                "parent_id": 110200,
                "sort": 2
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 120000,
        "name": "天津市",
        "parent_id": 0,
        "sort": 2,
        "sub": [{
            "id": 120100,
            "name": "市辖区",
            "parent_id": 120000,
            "sort": 1,
            "sub": [{"id": 120101, "name": "和平区", "parent_id": 120100, "sort": 1}, {
                "id": 120102,
                "name": "河东区",
                "parent_id": 120100,
                "sort": 2
            }, {"id": 120103, "name": "河西区", "parent_id": 120100, "sort": 3}, {
                "id": 120104,
                "name": "南开区",
                "parent_id": 120100,
                "sort": 4
            }, {"id": 120105, "name": "河北区", "parent_id": 120100, "sort": 5}, {
                "id": 120106,
                "name": "红桥区",
                "parent_id": 120100,
                "sort": 6
            }, {"id": 120107, "name": "塘沽区", "parent_id": 120100, "sort": 7}, {
                "id": 120108,
                "name": "汉沽区",
                "parent_id": 120100,
                "sort": 8
            }, {"id": 120109, "name": "大港区", "parent_id": 120100, "sort": 9}, {
                "id": 120110,
                "name": "东丽区",
                "parent_id": 120100,
                "sort": 10
            }, {"id": 120111, "name": "西青区", "parent_id": 120100, "sort": 11}, {
                "id": 120112,
                "name": "津南区",
                "parent_id": 120100,
                "sort": 12
            }, {"id": 120113, "name": "北辰区", "parent_id": 120100, "sort": 13}, {
                "id": 120114,
                "name": "武清区",
                "parent_id": 120100,
                "sort": 14
            }, {"id": 120115, "name": "宝坻区", "parent_id": 120100, "sort": 15}],
            "type": 0
        }, {
            "id": 120200,
            "name": "县",
            "parent_id": 120000,
            "sort": 2,
            "sub": [{"id": 120221, "name": "宁河县", "parent_id": 120200, "sort": 1}, {
                "id": 120223,
                "name": "静海县",
                "parent_id": 120200,
                "sort": 2
            }, {"id": 120225, "name": "蓟　县", "parent_id": 120200, "sort": 3}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 130000,
        "name": "河北省",
        "parent_id": 0,
        "sort": 3,
        "sub": [{
            "id": 130100,
            "name": "石家庄市",
            "parent_id": 130000,
            "sort": 1,
            "sub": [{"id": 130101, "name": "市辖区", "parent_id": 130100, "sort": 1}, {
                "id": 130102,
                "name": "长安区",
                "parent_id": 130100,
                "sort": 2
            }, {"id": 130103, "name": "桥东区", "parent_id": 130100, "sort": 3}, {
                "id": 130104,
                "name": "桥西区",
                "parent_id": 130100,
                "sort": 4
            }, {"id": 130105, "name": "新华区", "parent_id": 130100, "sort": 5}, {
                "id": 130107,
                "name": "井陉矿区",
                "parent_id": 130100,
                "sort": 6
            }, {"id": 130108, "name": "裕华区", "parent_id": 130100, "sort": 7}, {
                "id": 130121,
                "name": "井陉县",
                "parent_id": 130100,
                "sort": 8
            }, {"id": 130123, "name": "正定县", "parent_id": 130100, "sort": 9}, {
                "id": 130124,
                "name": "栾城县",
                "parent_id": 130100,
                "sort": 10
            }, {"id": 130125, "name": "行唐县", "parent_id": 130100, "sort": 11}, {
                "id": 130126,
                "name": "灵寿县",
                "parent_id": 130100,
                "sort": 12
            }, {"id": 130127, "name": "高邑县", "parent_id": 130100, "sort": 13}, {
                "id": 130128,
                "name": "深泽县",
                "parent_id": 130100,
                "sort": 14
            }, {"id": 130129, "name": "赞皇县", "parent_id": 130100, "sort": 15}, {
                "id": 130130,
                "name": "无极县",
                "parent_id": 130100,
                "sort": 16
            }, {"id": 130131, "name": "平山县", "parent_id": 130100, "sort": 17}, {
                "id": 130132,
                "name": "元氏县",
                "parent_id": 130100,
                "sort": 18
            }, {"id": 130133, "name": "赵　县", "parent_id": 130100, "sort": 19}, {
                "id": 130181,
                "name": "辛集市",
                "parent_id": 130100,
                "sort": 20
            }, {"id": 130182, "name": "藁城市", "parent_id": 130100, "sort": 21}, {
                "id": 130183,
                "name": "晋州市",
                "parent_id": 130100,
                "sort": 22
            }, {"id": 130184, "name": "新乐市", "parent_id": 130100, "sort": 23}, {
                "id": 130185,
                "name": "鹿泉市",
                "parent_id": 130100,
                "sort": 24
            }],
            "type": 0
        }, {
            "id": 130200,
            "name": "唐山市",
            "parent_id": 130000,
            "sort": 2,
            "sub": [{"id": 130201, "name": "市辖区", "parent_id": 130200, "sort": 1}, {
                "id": 130202,
                "name": "路南区",
                "parent_id": 130200,
                "sort": 2
            }, {"id": 130203, "name": "路北区", "parent_id": 130200, "sort": 3}, {
                "id": 130204,
                "name": "古冶区",
                "parent_id": 130200,
                "sort": 4
            }, {"id": 130205, "name": "开平区", "parent_id": 130200, "sort": 5}, {
                "id": 130207,
                "name": "丰南区",
                "parent_id": 130200,
                "sort": 6
            }, {"id": 130208, "name": "丰润区", "parent_id": 130200, "sort": 7}, {
                "id": 130223,
                "name": "滦　县",
                "parent_id": 130200,
                "sort": 8
            }, {"id": 130224, "name": "滦南县", "parent_id": 130200, "sort": 9}, {
                "id": 130225,
                "name": "乐亭县",
                "parent_id": 130200,
                "sort": 10
            }, {"id": 130227, "name": "迁西县", "parent_id": 130200, "sort": 11}, {
                "id": 130229,
                "name": "玉田县",
                "parent_id": 130200,
                "sort": 12
            }, {"id": 130230, "name": "唐海县", "parent_id": 130200, "sort": 13}, {
                "id": 130281,
                "name": "遵化市",
                "parent_id": 130200,
                "sort": 14
            }, {"id": 130283, "name": "迁安市", "parent_id": 130200, "sort": 15}],
            "type": 0
        }, {
            "id": 130300,
            "name": "秦皇岛市",
            "parent_id": 130000,
            "sort": 3,
            "sub": [{"id": 130301, "name": "市辖区", "parent_id": 130300, "sort": 1}, {
                "id": 130302,
                "name": "海港区",
                "parent_id": 130300,
                "sort": 2
            }, {"id": 130303, "name": "山海关区", "parent_id": 130300, "sort": 3}, {
                "id": 130304,
                "name": "北戴河区",
                "parent_id": 130300,
                "sort": 4
            }, {"id": 130321, "name": "青龙满族自治县", "parent_id": 130300, "sort": 5}, {
                "id": 130322,
                "name": "昌黎县",
                "parent_id": 130300,
                "sort": 6
            }, {"id": 130323, "name": "抚宁县", "parent_id": 130300, "sort": 7}, {
                "id": 130324,
                "name": "卢龙县",
                "parent_id": 130300,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 130400,
            "name": "邯郸市",
            "parent_id": 130000,
            "sort": 4,
            "sub": [{"id": 130401, "name": "市辖区", "parent_id": 130400, "sort": 1}, {
                "id": 130402,
                "name": "邯山区",
                "parent_id": 130400,
                "sort": 2
            }, {"id": 130403, "name": "丛台区", "parent_id": 130400, "sort": 3}, {
                "id": 130404,
                "name": "复兴区",
                "parent_id": 130400,
                "sort": 4
            }, {"id": 130406, "name": "峰峰矿区", "parent_id": 130400, "sort": 5}, {
                "id": 130421,
                "name": "邯郸县",
                "parent_id": 130400,
                "sort": 6
            }, {"id": 130423, "name": "临漳县", "parent_id": 130400, "sort": 7}, {
                "id": 130424,
                "name": "成安县",
                "parent_id": 130400,
                "sort": 8
            }, {"id": 130425, "name": "大名县", "parent_id": 130400, "sort": 9}, {
                "id": 130426,
                "name": "涉　县",
                "parent_id": 130400,
                "sort": 10
            }, {"id": 130427, "name": "磁　县", "parent_id": 130400, "sort": 11}, {
                "id": 130428,
                "name": "肥乡县",
                "parent_id": 130400,
                "sort": 12
            }, {"id": 130429, "name": "永年县", "parent_id": 130400, "sort": 13}, {
                "id": 130430,
                "name": "邱　县",
                "parent_id": 130400,
                "sort": 14
            }, {"id": 130431, "name": "鸡泽县", "parent_id": 130400, "sort": 15}, {
                "id": 130432,
                "name": "广平县",
                "parent_id": 130400,
                "sort": 16
            }, {"id": 130433, "name": "馆陶县", "parent_id": 130400, "sort": 17}, {
                "id": 130434,
                "name": "魏　县",
                "parent_id": 130400,
                "sort": 18
            }, {"id": 130435, "name": "曲周县", "parent_id": 130400, "sort": 19}, {
                "id": 130481,
                "name": "武安市",
                "parent_id": 130400,
                "sort": 20
            }],
            "type": 0
        }, {
            "id": 130500,
            "name": "邢台市",
            "parent_id": 130000,
            "sort": 5,
            "sub": [{"id": 130501, "name": "市辖区", "parent_id": 130500, "sort": 1}, {
                "id": 130502,
                "name": "桥东区",
                "parent_id": 130500,
                "sort": 2
            }, {"id": 130503, "name": "桥西区", "parent_id": 130500, "sort": 3}, {
                "id": 130521,
                "name": "邢台县",
                "parent_id": 130500,
                "sort": 4
            }, {"id": 130522, "name": "临城县", "parent_id": 130500, "sort": 5}, {
                "id": 130523,
                "name": "内丘县",
                "parent_id": 130500,
                "sort": 6
            }, {"id": 130524, "name": "柏乡县", "parent_id": 130500, "sort": 7}, {
                "id": 130525,
                "name": "隆尧县",
                "parent_id": 130500,
                "sort": 8
            }, {"id": 130526, "name": "任　县", "parent_id": 130500, "sort": 9}, {
                "id": 130527,
                "name": "南和县",
                "parent_id": 130500,
                "sort": 10
            }, {"id": 130528, "name": "宁晋县", "parent_id": 130500, "sort": 11}, {
                "id": 130529,
                "name": "巨鹿县",
                "parent_id": 130500,
                "sort": 12
            }, {"id": 130530, "name": "新河县", "parent_id": 130500, "sort": 13}, {
                "id": 130531,
                "name": "广宗县",
                "parent_id": 130500,
                "sort": 14
            }, {"id": 130532, "name": "平乡县", "parent_id": 130500, "sort": 15}, {
                "id": 130533,
                "name": "威　县",
                "parent_id": 130500,
                "sort": 16
            }, {"id": 130534, "name": "清河县", "parent_id": 130500, "sort": 17}, {
                "id": 130535,
                "name": "临西县",
                "parent_id": 130500,
                "sort": 18
            }, {"id": 130581, "name": "南宫市", "parent_id": 130500, "sort": 19}, {
                "id": 130582,
                "name": "沙河市",
                "parent_id": 130500,
                "sort": 20
            }],
            "type": 0
        }, {
            "id": 130600,
            "name": "保定市",
            "parent_id": 130000,
            "sort": 6,
            "sub": [{"id": 130601, "name": "市辖区", "parent_id": 130600, "sort": 1}, {
                "id": 130602,
                "name": "新市区",
                "parent_id": 130600,
                "sort": 2
            }, {"id": 130603, "name": "北市区", "parent_id": 130600, "sort": 3}, {
                "id": 130604,
                "name": "南市区",
                "parent_id": 130600,
                "sort": 4
            }, {"id": 130621, "name": "满城县", "parent_id": 130600, "sort": 5}, {
                "id": 130622,
                "name": "清苑县",
                "parent_id": 130600,
                "sort": 6
            }, {"id": 130623, "name": "涞水县", "parent_id": 130600, "sort": 7}, {
                "id": 130624,
                "name": "阜平县",
                "parent_id": 130600,
                "sort": 8
            }, {"id": 130625, "name": "徐水县", "parent_id": 130600, "sort": 9}, {
                "id": 130626,
                "name": "定兴县",
                "parent_id": 130600,
                "sort": 10
            }, {"id": 130627, "name": "唐　县", "parent_id": 130600, "sort": 11}, {
                "id": 130628,
                "name": "高阳县",
                "parent_id": 130600,
                "sort": 12
            }, {"id": 130629, "name": "容城县", "parent_id": 130600, "sort": 13}, {
                "id": 130630,
                "name": "涞源县",
                "parent_id": 130600,
                "sort": 14
            }, {"id": 130631, "name": "望都县", "parent_id": 130600, "sort": 15}, {
                "id": 130632,
                "name": "安新县",
                "parent_id": 130600,
                "sort": 16
            }, {"id": 130633, "name": "易　县", "parent_id": 130600, "sort": 17}, {
                "id": 130634,
                "name": "曲阳县",
                "parent_id": 130600,
                "sort": 18
            }, {"id": 130635, "name": "蠡　县", "parent_id": 130600, "sort": 19}, {
                "id": 130636,
                "name": "顺平县",
                "parent_id": 130600,
                "sort": 20
            }, {"id": 130637, "name": "博野县", "parent_id": 130600, "sort": 21}, {
                "id": 130638,
                "name": "雄　县",
                "parent_id": 130600,
                "sort": 22
            }, {"id": 130681, "name": "涿州市", "parent_id": 130600, "sort": 23}, {
                "id": 130682,
                "name": "定州市",
                "parent_id": 130600,
                "sort": 24
            }, {"id": 130683, "name": "安国市", "parent_id": 130600, "sort": 25}, {
                "id": 130684,
                "name": "高碑店市",
                "parent_id": 130600,
                "sort": 26
            }],
            "type": 0
        }, {
            "id": 130700,
            "name": "张家口市",
            "parent_id": 130000,
            "sort": 7,
            "sub": [{"id": 130701, "name": "市辖区", "parent_id": 130700, "sort": 1}, {
                "id": 130702,
                "name": "桥东区",
                "parent_id": 130700,
                "sort": 2
            }, {"id": 130703, "name": "桥西区", "parent_id": 130700, "sort": 3}, {
                "id": 130705,
                "name": "宣化区",
                "parent_id": 130700,
                "sort": 4
            }, {"id": 130706, "name": "下花园区", "parent_id": 130700, "sort": 5}, {
                "id": 130721,
                "name": "宣化县",
                "parent_id": 130700,
                "sort": 6
            }, {"id": 130722, "name": "张北县", "parent_id": 130700, "sort": 7}, {
                "id": 130723,
                "name": "康保县",
                "parent_id": 130700,
                "sort": 8
            }, {"id": 130724, "name": "沽源县", "parent_id": 130700, "sort": 9}, {
                "id": 130725,
                "name": "尚义县",
                "parent_id": 130700,
                "sort": 10
            }, {"id": 130726, "name": "蔚　县", "parent_id": 130700, "sort": 11}, {
                "id": 130727,
                "name": "阳原县",
                "parent_id": 130700,
                "sort": 12
            }, {"id": 130728, "name": "怀安县", "parent_id": 130700, "sort": 13}, {
                "id": 130729,
                "name": "万全县",
                "parent_id": 130700,
                "sort": 14
            }, {"id": 130730, "name": "怀来县", "parent_id": 130700, "sort": 15}, {
                "id": 130731,
                "name": "涿鹿县",
                "parent_id": 130700,
                "sort": 16
            }, {"id": 130732, "name": "赤城县", "parent_id": 130700, "sort": 17}, {
                "id": 130733,
                "name": "崇礼县",
                "parent_id": 130700,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 130800,
            "name": "承德市",
            "parent_id": 130000,
            "sort": 8,
            "sub": [{"id": 130801, "name": "市辖区", "parent_id": 130800, "sort": 1}, {
                "id": 130802,
                "name": "双桥区",
                "parent_id": 130800,
                "sort": 2
            }, {"id": 130803, "name": "双滦区", "parent_id": 130800, "sort": 3}, {
                "id": 130804,
                "name": "鹰手营子矿区",
                "parent_id": 130800,
                "sort": 4
            }, {"id": 130821, "name": "承德县", "parent_id": 130800, "sort": 5}, {
                "id": 130822,
                "name": "兴隆县",
                "parent_id": 130800,
                "sort": 6
            }, {"id": 130823, "name": "平泉县", "parent_id": 130800, "sort": 7}, {
                "id": 130824,
                "name": "滦平县",
                "parent_id": 130800,
                "sort": 8
            }, {"id": 130825, "name": "隆化县", "parent_id": 130800, "sort": 9}, {
                "id": 130826,
                "name": "丰宁满族自治县",
                "parent_id": 130800,
                "sort": 10
            }, {"id": 130827, "name": "宽城满族自治县", "parent_id": 130800, "sort": 11}, {
                "id": 130828,
                "name": "围场满族蒙古族自治县",
                "parent_id": 130800,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 130900,
            "name": "沧州市",
            "parent_id": 130000,
            "sort": 9,
            "sub": [{"id": 130901, "name": "市辖区", "parent_id": 130900, "sort": 1}, {
                "id": 130902,
                "name": "新华区",
                "parent_id": 130900,
                "sort": 2
            }, {"id": 130903, "name": "运河区", "parent_id": 130900, "sort": 3}, {
                "id": 130921,
                "name": "沧　县",
                "parent_id": 130900,
                "sort": 4
            }, {"id": 130922, "name": "青　县", "parent_id": 130900, "sort": 5}, {
                "id": 130923,
                "name": "东光县",
                "parent_id": 130900,
                "sort": 6
            }, {"id": 130924, "name": "海兴县", "parent_id": 130900, "sort": 7}, {
                "id": 130925,
                "name": "盐山县",
                "parent_id": 130900,
                "sort": 8
            }, {"id": 130926, "name": "肃宁县", "parent_id": 130900, "sort": 9}, {
                "id": 130927,
                "name": "南皮县",
                "parent_id": 130900,
                "sort": 10
            }, {"id": 130928, "name": "吴桥县", "parent_id": 130900, "sort": 11}, {
                "id": 130929,
                "name": "献　县",
                "parent_id": 130900,
                "sort": 12
            }, {"id": 130930, "name": "孟村回族自治县", "parent_id": 130900, "sort": 13}, {
                "id": 130981,
                "name": "泊头市",
                "parent_id": 130900,
                "sort": 14
            }, {"id": 130982, "name": "任丘市", "parent_id": 130900, "sort": 15}, {
                "id": 130983,
                "name": "黄骅市",
                "parent_id": 130900,
                "sort": 16
            }, {"id": 130984, "name": "河间市", "parent_id": 130900, "sort": 17}],
            "type": 0
        }, {
            "id": 131000,
            "name": "廊坊市",
            "parent_id": 130000,
            "sort": 10,
            "sub": [{"id": 131001, "name": "市辖区", "parent_id": 131000, "sort": 1}, {
                "id": 131002,
                "name": "安次区",
                "parent_id": 131000,
                "sort": 2
            }, {"id": 131003, "name": "广阳区", "parent_id": 131000, "sort": 3}, {
                "id": 131022,
                "name": "固安县",
                "parent_id": 131000,
                "sort": 4
            }, {"id": 131023, "name": "永清县", "parent_id": 131000, "sort": 5}, {
                "id": 131024,
                "name": "香河县",
                "parent_id": 131000,
                "sort": 6
            }, {"id": 131025, "name": "大城县", "parent_id": 131000, "sort": 7}, {
                "id": 131026,
                "name": "文安县",
                "parent_id": 131000,
                "sort": 8
            }, {"id": 131028, "name": "大厂回族自治县", "parent_id": 131000, "sort": 9}, {
                "id": 131081,
                "name": "霸州市",
                "parent_id": 131000,
                "sort": 10
            }, {"id": 131082, "name": "三河市", "parent_id": 131000, "sort": 11}],
            "type": 0
        }, {
            "id": 131100,
            "name": "衡水市",
            "parent_id": 130000,
            "sort": 11,
            "sub": [{"id": 131101, "name": "市辖区", "parent_id": 131100, "sort": 1}, {
                "id": 131102,
                "name": "桃城区",
                "parent_id": 131100,
                "sort": 2
            }, {"id": 131121, "name": "枣强县", "parent_id": 131100, "sort": 3}, {
                "id": 131122,
                "name": "武邑县",
                "parent_id": 131100,
                "sort": 4
            }, {"id": 131123, "name": "武强县", "parent_id": 131100, "sort": 5}, {
                "id": 131124,
                "name": "饶阳县",
                "parent_id": 131100,
                "sort": 6
            }, {"id": 131125, "name": "安平县", "parent_id": 131100, "sort": 7}, {
                "id": 131126,
                "name": "故城县",
                "parent_id": 131100,
                "sort": 8
            }, {"id": 131127, "name": "景　县", "parent_id": 131100, "sort": 9}, {
                "id": 131128,
                "name": "阜城县",
                "parent_id": 131100,
                "sort": 10
            }, {"id": 131181, "name": "冀州市", "parent_id": 131100, "sort": 11}, {
                "id": 131182,
                "name": "深州市",
                "parent_id": 131100,
                "sort": 12
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 140000,
        "name": "山西省",
        "parent_id": 0,
        "sort": 4,
        "sub": [{
            "id": 140100,
            "name": "太原市",
            "parent_id": 140000,
            "sort": 1,
            "sub": [{"id": 140101, "name": "市辖区", "parent_id": 140100, "sort": 1}, {
                "id": 140105,
                "name": "小店区",
                "parent_id": 140100,
                "sort": 2
            }, {"id": 140106, "name": "迎泽区", "parent_id": 140100, "sort": 3}, {
                "id": 140107,
                "name": "杏花岭区",
                "parent_id": 140100,
                "sort": 4
            }, {"id": 140108, "name": "尖草坪区", "parent_id": 140100, "sort": 5}, {
                "id": 140109,
                "name": "万柏林区",
                "parent_id": 140100,
                "sort": 6
            }, {"id": 140110, "name": "晋源区", "parent_id": 140100, "sort": 7}, {
                "id": 140121,
                "name": "清徐县",
                "parent_id": 140100,
                "sort": 8
            }, {"id": 140122, "name": "阳曲县", "parent_id": 140100, "sort": 9}, {
                "id": 140123,
                "name": "娄烦县",
                "parent_id": 140100,
                "sort": 10
            }, {"id": 140181, "name": "古交市", "parent_id": 140100, "sort": 11}],
            "type": 0
        }, {
            "id": 140200,
            "name": "大同市",
            "parent_id": 140000,
            "sort": 2,
            "sub": [{"id": 140201, "name": "市辖区", "parent_id": 140200, "sort": 1}, {
                "id": 140202,
                "name": "城　区",
                "parent_id": 140200,
                "sort": 2
            }, {"id": 140203, "name": "矿　区", "parent_id": 140200, "sort": 3}, {
                "id": 140211,
                "name": "南郊区",
                "parent_id": 140200,
                "sort": 4
            }, {"id": 140212, "name": "新荣区", "parent_id": 140200, "sort": 5}, {
                "id": 140221,
                "name": "阳高县",
                "parent_id": 140200,
                "sort": 6
            }, {"id": 140222, "name": "天镇县", "parent_id": 140200, "sort": 7}, {
                "id": 140223,
                "name": "广灵县",
                "parent_id": 140200,
                "sort": 8
            }, {"id": 140224, "name": "灵丘县", "parent_id": 140200, "sort": 9}, {
                "id": 140225,
                "name": "浑源县",
                "parent_id": 140200,
                "sort": 10
            }, {"id": 140226, "name": "左云县", "parent_id": 140200, "sort": 11}, {
                "id": 140227,
                "name": "大同县",
                "parent_id": 140200,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 140300,
            "name": "阳泉市",
            "parent_id": 140000,
            "sort": 3,
            "sub": [{"id": 140301, "name": "市辖区", "parent_id": 140300, "sort": 1}, {
                "id": 140302,
                "name": "城　区",
                "parent_id": 140300,
                "sort": 2
            }, {"id": 140303, "name": "矿　区", "parent_id": 140300, "sort": 3}, {
                "id": 140311,
                "name": "郊　区",
                "parent_id": 140300,
                "sort": 4
            }, {"id": 140321, "name": "平定县", "parent_id": 140300, "sort": 5}, {
                "id": 140322,
                "name": "盂　县",
                "parent_id": 140300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 140400,
            "name": "长治市",
            "parent_id": 140000,
            "sort": 4,
            "sub": [{"id": 140401, "name": "市辖区", "parent_id": 140400, "sort": 1}, {
                "id": 140402,
                "name": "城　区",
                "parent_id": 140400,
                "sort": 2
            }, {"id": 140411, "name": "郊　区", "parent_id": 140400, "sort": 3}, {
                "id": 140421,
                "name": "长治县",
                "parent_id": 140400,
                "sort": 4
            }, {"id": 140423, "name": "襄垣县", "parent_id": 140400, "sort": 5}, {
                "id": 140424,
                "name": "屯留县",
                "parent_id": 140400,
                "sort": 6
            }, {"id": 140425, "name": "平顺县", "parent_id": 140400, "sort": 7}, {
                "id": 140426,
                "name": "黎城县",
                "parent_id": 140400,
                "sort": 8
            }, {"id": 140427, "name": "壶关县", "parent_id": 140400, "sort": 9}, {
                "id": 140428,
                "name": "长子县",
                "parent_id": 140400,
                "sort": 10
            }, {"id": 140429, "name": "武乡县", "parent_id": 140400, "sort": 11}, {
                "id": 140430,
                "name": "沁　县",
                "parent_id": 140400,
                "sort": 12
            }, {"id": 140431, "name": "沁源县", "parent_id": 140400, "sort": 13}, {
                "id": 140481,
                "name": "潞城市",
                "parent_id": 140400,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 140500,
            "name": "晋城市",
            "parent_id": 140000,
            "sort": 5,
            "sub": [{"id": 140501, "name": "市辖区", "parent_id": 140500, "sort": 1}, {
                "id": 140502,
                "name": "城　区",
                "parent_id": 140500,
                "sort": 2
            }, {"id": 140521, "name": "沁水县", "parent_id": 140500, "sort": 3}, {
                "id": 140522,
                "name": "阳城县",
                "parent_id": 140500,
                "sort": 4
            }, {"id": 140524, "name": "陵川县", "parent_id": 140500, "sort": 5}, {
                "id": 140525,
                "name": "泽州县",
                "parent_id": 140500,
                "sort": 6
            }, {"id": 140581, "name": "高平市", "parent_id": 140500, "sort": 7}],
            "type": 0
        }, {
            "id": 140600,
            "name": "朔州市",
            "parent_id": 140000,
            "sort": 6,
            "sub": [{"id": 140601, "name": "市辖区", "parent_id": 140600, "sort": 1}, {
                "id": 140602,
                "name": "朔城区",
                "parent_id": 140600,
                "sort": 2
            }, {"id": 140603, "name": "平鲁区", "parent_id": 140600, "sort": 3}, {
                "id": 140621,
                "name": "山阴县",
                "parent_id": 140600,
                "sort": 4
            }, {"id": 140622, "name": "应　县", "parent_id": 140600, "sort": 5}, {
                "id": 140623,
                "name": "右玉县",
                "parent_id": 140600,
                "sort": 6
            }, {"id": 140624, "name": "怀仁县", "parent_id": 140600, "sort": 7}],
            "type": 0
        }, {
            "id": 140700,
            "name": "晋中市",
            "parent_id": 140000,
            "sort": 7,
            "sub": [{"id": 140701, "name": "市辖区", "parent_id": 140700, "sort": 1}, {
                "id": 140702,
                "name": "榆次区",
                "parent_id": 140700,
                "sort": 2
            }, {"id": 140721, "name": "榆社县", "parent_id": 140700, "sort": 3}, {
                "id": 140722,
                "name": "左权县",
                "parent_id": 140700,
                "sort": 4
            }, {"id": 140723, "name": "和顺县", "parent_id": 140700, "sort": 5}, {
                "id": 140724,
                "name": "昔阳县",
                "parent_id": 140700,
                "sort": 6
            }, {"id": 140725, "name": "寿阳县", "parent_id": 140700, "sort": 7}, {
                "id": 140726,
                "name": "太谷县",
                "parent_id": 140700,
                "sort": 8
            }, {"id": 140727, "name": "祁　县", "parent_id": 140700, "sort": 9}, {
                "id": 140728,
                "name": "平遥县",
                "parent_id": 140700,
                "sort": 10
            }, {"id": 140729, "name": "灵石县", "parent_id": 140700, "sort": 11}, {
                "id": 140781,
                "name": "介休市",
                "parent_id": 140700,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 140800,
            "name": "运城市",
            "parent_id": 140000,
            "sort": 8,
            "sub": [{"id": 140801, "name": "市辖区", "parent_id": 140800, "sort": 1}, {
                "id": 140802,
                "name": "盐湖区",
                "parent_id": 140800,
                "sort": 2
            }, {"id": 140821, "name": "临猗县", "parent_id": 140800, "sort": 3}, {
                "id": 140822,
                "name": "万荣县",
                "parent_id": 140800,
                "sort": 4
            }, {"id": 140823, "name": "闻喜县", "parent_id": 140800, "sort": 5}, {
                "id": 140824,
                "name": "稷山县",
                "parent_id": 140800,
                "sort": 6
            }, {"id": 140825, "name": "新绛县", "parent_id": 140800, "sort": 7}, {
                "id": 140826,
                "name": "绛　县",
                "parent_id": 140800,
                "sort": 8
            }, {"id": 140827, "name": "垣曲县", "parent_id": 140800, "sort": 9}, {
                "id": 140828,
                "name": "夏　县",
                "parent_id": 140800,
                "sort": 10
            }, {"id": 140829, "name": "平陆县", "parent_id": 140800, "sort": 11}, {
                "id": 140830,
                "name": "芮城县",
                "parent_id": 140800,
                "sort": 12
            }, {"id": 140881, "name": "永济市", "parent_id": 140800, "sort": 13}, {
                "id": 140882,
                "name": "河津市",
                "parent_id": 140800,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 140900,
            "name": "忻州市",
            "parent_id": 140000,
            "sort": 9,
            "sub": [{"id": 140901, "name": "市辖区", "parent_id": 140900, "sort": 1}, {
                "id": 140902,
                "name": "忻府区",
                "parent_id": 140900,
                "sort": 2
            }, {"id": 140921, "name": "定襄县", "parent_id": 140900, "sort": 3}, {
                "id": 140922,
                "name": "五台县",
                "parent_id": 140900,
                "sort": 4
            }, {"id": 140923, "name": "代　县", "parent_id": 140900, "sort": 5}, {
                "id": 140924,
                "name": "繁峙县",
                "parent_id": 140900,
                "sort": 6
            }, {"id": 140925, "name": "宁武县", "parent_id": 140900, "sort": 7}, {
                "id": 140926,
                "name": "静乐县",
                "parent_id": 140900,
                "sort": 8
            }, {"id": 140927, "name": "神池县", "parent_id": 140900, "sort": 9}, {
                "id": 140928,
                "name": "五寨县",
                "parent_id": 140900,
                "sort": 10
            }, {"id": 140929, "name": "岢岚县", "parent_id": 140900, "sort": 11}, {
                "id": 140930,
                "name": "河曲县",
                "parent_id": 140900,
                "sort": 12
            }, {"id": 140931, "name": "保德县", "parent_id": 140900, "sort": 13}, {
                "id": 140932,
                "name": "偏关县",
                "parent_id": 140900,
                "sort": 14
            }, {"id": 140981, "name": "原平市", "parent_id": 140900, "sort": 15}],
            "type": 0
        }, {
            "id": 141000,
            "name": "临汾市",
            "parent_id": 140000,
            "sort": 10,
            "sub": [{"id": 141001, "name": "市辖区", "parent_id": 141000, "sort": 1}, {
                "id": 141002,
                "name": "尧都区",
                "parent_id": 141000,
                "sort": 2
            }, {"id": 141021, "name": "曲沃县", "parent_id": 141000, "sort": 3}, {
                "id": 141022,
                "name": "翼城县",
                "parent_id": 141000,
                "sort": 4
            }, {"id": 141023, "name": "襄汾县", "parent_id": 141000, "sort": 5}, {
                "id": 141024,
                "name": "洪洞县",
                "parent_id": 141000,
                "sort": 6
            }, {"id": 141025, "name": "古　县", "parent_id": 141000, "sort": 7}, {
                "id": 141026,
                "name": "安泽县",
                "parent_id": 141000,
                "sort": 8
            }, {"id": 141027, "name": "浮山县", "parent_id": 141000, "sort": 9}, {
                "id": 141028,
                "name": "吉　县",
                "parent_id": 141000,
                "sort": 10
            }, {"id": 141029, "name": "乡宁县", "parent_id": 141000, "sort": 11}, {
                "id": 141030,
                "name": "大宁县",
                "parent_id": 141000,
                "sort": 12
            }, {"id": 141031, "name": "隰　县", "parent_id": 141000, "sort": 13}, {
                "id": 141032,
                "name": "永和县",
                "parent_id": 141000,
                "sort": 14
            }, {"id": 141033, "name": "蒲　县", "parent_id": 141000, "sort": 15}, {
                "id": 141034,
                "name": "汾西县",
                "parent_id": 141000,
                "sort": 16
            }, {"id": 141081, "name": "侯马市", "parent_id": 141000, "sort": 17}, {
                "id": 141082,
                "name": "霍州市",
                "parent_id": 141000,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 141100,
            "name": "吕梁市",
            "parent_id": 140000,
            "sort": 11,
            "sub": [{"id": 141101, "name": "市辖区", "parent_id": 141100, "sort": 1}, {
                "id": 141102,
                "name": "离石区",
                "parent_id": 141100,
                "sort": 2
            }, {"id": 141121, "name": "文水县", "parent_id": 141100, "sort": 3}, {
                "id": 141122,
                "name": "交城县",
                "parent_id": 141100,
                "sort": 4
            }, {"id": 141123, "name": "兴　县", "parent_id": 141100, "sort": 5}, {
                "id": 141124,
                "name": "临　县",
                "parent_id": 141100,
                "sort": 6
            }, {"id": 141125, "name": "柳林县", "parent_id": 141100, "sort": 7}, {
                "id": 141126,
                "name": "石楼县",
                "parent_id": 141100,
                "sort": 8
            }, {"id": 141127, "name": "岚　县", "parent_id": 141100, "sort": 9}, {
                "id": 141128,
                "name": "方山县",
                "parent_id": 141100,
                "sort": 10
            }, {"id": 141129, "name": "中阳县", "parent_id": 141100, "sort": 11}, {
                "id": 141130,
                "name": "交口县",
                "parent_id": 141100,
                "sort": 12
            }, {"id": 141181, "name": "孝义市", "parent_id": 141100, "sort": 13}, {
                "id": 141182,
                "name": "汾阳市",
                "parent_id": 141100,
                "sort": 14
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 150000,
        "name": "内蒙古",
        "parent_id": 0,
        "sort": 5,
        "sub": [{
            "id": 150100,
            "name": "呼和浩特市",
            "parent_id": 150000,
            "sort": 1,
            "sub": [{"id": 150101, "name": "市辖区", "parent_id": 150100, "sort": 1}, {
                "id": 150102,
                "name": "新城区",
                "parent_id": 150100,
                "sort": 2
            }, {"id": 150103, "name": "回民区", "parent_id": 150100, "sort": 3}, {
                "id": 150104,
                "name": "玉泉区",
                "parent_id": 150100,
                "sort": 4
            }, {"id": 150105, "name": "赛罕区", "parent_id": 150100, "sort": 5}, {
                "id": 150121,
                "name": "土默特左旗",
                "parent_id": 150100,
                "sort": 6
            }, {"id": 150122, "name": "托克托县", "parent_id": 150100, "sort": 7}, {
                "id": 150123,
                "name": "和林格尔县",
                "parent_id": 150100,
                "sort": 8
            }, {"id": 150124, "name": "清水河县", "parent_id": 150100, "sort": 9}, {
                "id": 150125,
                "name": "武川县",
                "parent_id": 150100,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 150200,
            "name": "包头市",
            "parent_id": 150000,
            "sort": 2,
            "sub": [{"id": 150201, "name": "市辖区", "parent_id": 150200, "sort": 1}, {
                "id": 150202,
                "name": "东河区",
                "parent_id": 150200,
                "sort": 2
            }, {"id": 150203, "name": "昆都仑区", "parent_id": 150200, "sort": 3}, {
                "id": 150204,
                "name": "青山区",
                "parent_id": 150200,
                "sort": 4
            }, {"id": 150205, "name": "石拐区", "parent_id": 150200, "sort": 5}, {
                "id": 150206,
                "name": "白云矿区",
                "parent_id": 150200,
                "sort": 6
            }, {"id": 150207, "name": "九原区", "parent_id": 150200, "sort": 7}, {
                "id": 150221,
                "name": "土默特右旗",
                "parent_id": 150200,
                "sort": 8
            }, {"id": 150222, "name": "固阳县", "parent_id": 150200, "sort": 9}, {
                "id": 150223,
                "name": "达尔罕茂明安联合旗",
                "parent_id": 150200,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 150300,
            "name": "乌海市",
            "parent_id": 150000,
            "sort": 3,
            "sub": [{"id": 150301, "name": "市辖区", "parent_id": 150300, "sort": 1}, {
                "id": 150302,
                "name": "海勃湾区",
                "parent_id": 150300,
                "sort": 2
            }, {"id": 150303, "name": "海南区", "parent_id": 150300, "sort": 3}, {
                "id": 150304,
                "name": "乌达区",
                "parent_id": 150300,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 150400,
            "name": "赤峰市",
            "parent_id": 150000,
            "sort": 4,
            "sub": [{"id": 150401, "name": "市辖区", "parent_id": 150400, "sort": 1}, {
                "id": 150402,
                "name": "红山区",
                "parent_id": 150400,
                "sort": 2
            }, {"id": 150403, "name": "元宝山区", "parent_id": 150400, "sort": 3}, {
                "id": 150404,
                "name": "松山区",
                "parent_id": 150400,
                "sort": 4
            }, {"id": 150421, "name": "阿鲁科尔沁旗", "parent_id": 150400, "sort": 5}, {
                "id": 150422,
                "name": "巴林左旗",
                "parent_id": 150400,
                "sort": 6
            }, {"id": 150423, "name": "巴林右旗", "parent_id": 150400, "sort": 7}, {
                "id": 150424,
                "name": "林西县",
                "parent_id": 150400,
                "sort": 8
            }, {"id": 150425, "name": "克什克腾旗", "parent_id": 150400, "sort": 9}, {
                "id": 150426,
                "name": "翁牛特旗",
                "parent_id": 150400,
                "sort": 10
            }, {"id": 150428, "name": "喀喇沁旗", "parent_id": 150400, "sort": 11}, {
                "id": 150429,
                "name": "宁城县",
                "parent_id": 150400,
                "sort": 12
            }, {"id": 150430, "name": "敖汉旗", "parent_id": 150400, "sort": 13}],
            "type": 0
        }, {
            "id": 150500,
            "name": "通辽市",
            "parent_id": 150000,
            "sort": 5,
            "sub": [{"id": 150501, "name": "市辖区", "parent_id": 150500, "sort": 1}, {
                "id": 150502,
                "name": "科尔沁区",
                "parent_id": 150500,
                "sort": 2
            }, {"id": 150521, "name": "科尔沁左翼中旗", "parent_id": 150500, "sort": 3}, {
                "id": 150522,
                "name": "科尔沁左翼后旗",
                "parent_id": 150500,
                "sort": 4
            }, {"id": 150523, "name": "开鲁县", "parent_id": 150500, "sort": 5}, {
                "id": 150524,
                "name": "库伦旗",
                "parent_id": 150500,
                "sort": 6
            }, {"id": 150525, "name": "奈曼旗", "parent_id": 150500, "sort": 7}, {
                "id": 150526,
                "name": "扎鲁特旗",
                "parent_id": 150500,
                "sort": 8
            }, {"id": 150581, "name": "霍林郭勒市", "parent_id": 150500, "sort": 9}],
            "type": 0
        }, {
            "id": 150600,
            "name": "鄂尔多斯市",
            "parent_id": 150000,
            "sort": 6,
            "sub": [{"id": 150602, "name": "东胜区", "parent_id": 150600, "sort": 1}, {
                "id": 150621,
                "name": "达拉特旗",
                "parent_id": 150600,
                "sort": 2
            }, {"id": 150622, "name": "准格尔旗", "parent_id": 150600, "sort": 3}, {
                "id": 150623,
                "name": "鄂托克前旗",
                "parent_id": 150600,
                "sort": 4
            }, {"id": 150624, "name": "鄂托克旗", "parent_id": 150600, "sort": 5}, {
                "id": 150625,
                "name": "杭锦旗",
                "parent_id": 150600,
                "sort": 6
            }, {"id": 150626, "name": "乌审旗", "parent_id": 150600, "sort": 7}, {
                "id": 150627,
                "name": "伊金霍洛旗",
                "parent_id": 150600,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 150700,
            "name": "呼伦贝尔市",
            "parent_id": 150000,
            "sort": 7,
            "sub": [{"id": 150701, "name": "市辖区", "parent_id": 150700, "sort": 1}, {
                "id": 150702,
                "name": "海拉尔区",
                "parent_id": 150700,
                "sort": 2
            }, {"id": 150721, "name": "阿荣旗", "parent_id": 150700, "sort": 3}, {
                "id": 150722,
                "name": "莫力达瓦达斡尔族自治旗",
                "parent_id": 150700,
                "sort": 4
            }, {"id": 150723, "name": "鄂伦春自治旗", "parent_id": 150700, "sort": 5}, {
                "id": 150724,
                "name": "鄂温克族自治旗",
                "parent_id": 150700,
                "sort": 6
            }, {"id": 150725, "name": "陈巴尔虎旗", "parent_id": 150700, "sort": 7}, {
                "id": 150726,
                "name": "新巴尔虎左旗",
                "parent_id": 150700,
                "sort": 8
            }, {"id": 150727, "name": "新巴尔虎右旗", "parent_id": 150700, "sort": 9}, {
                "id": 150781,
                "name": "满洲里市",
                "parent_id": 150700,
                "sort": 10
            }, {"id": 150782, "name": "牙克石市", "parent_id": 150700, "sort": 11}, {
                "id": 150783,
                "name": "扎兰屯市",
                "parent_id": 150700,
                "sort": 12
            }, {"id": 150784, "name": "额尔古纳市", "parent_id": 150700, "sort": 13}, {
                "id": 150785,
                "name": "根河市",
                "parent_id": 150700,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 150800,
            "name": "巴彦淖尔市",
            "parent_id": 150000,
            "sort": 8,
            "sub": [{"id": 150801, "name": "市辖区", "parent_id": 150800, "sort": 1}, {
                "id": 150802,
                "name": "临河区",
                "parent_id": 150800,
                "sort": 2
            }, {"id": 150821, "name": "五原县", "parent_id": 150800, "sort": 3}, {
                "id": 150822,
                "name": "磴口县",
                "parent_id": 150800,
                "sort": 4
            }, {"id": 150823, "name": "乌拉特前旗", "parent_id": 150800, "sort": 5}, {
                "id": 150824,
                "name": "乌拉特中旗",
                "parent_id": 150800,
                "sort": 6
            }, {"id": 150825, "name": "乌拉特后旗", "parent_id": 150800, "sort": 7}, {
                "id": 150826,
                "name": "杭锦后旗",
                "parent_id": 150800,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 150900,
            "name": "乌兰察布市",
            "parent_id": 150000,
            "sort": 9,
            "sub": [{"id": 150901, "name": "市辖区", "parent_id": 150900, "sort": 1}, {
                "id": 150902,
                "name": "集宁区",
                "parent_id": 150900,
                "sort": 2
            }, {"id": 150921, "name": "卓资县", "parent_id": 150900, "sort": 3}, {
                "id": 150922,
                "name": "化德县",
                "parent_id": 150900,
                "sort": 4
            }, {"id": 150923, "name": "商都县", "parent_id": 150900, "sort": 5}, {
                "id": 150924,
                "name": "兴和县",
                "parent_id": 150900,
                "sort": 6
            }, {"id": 150925, "name": "凉城县", "parent_id": 150900, "sort": 7}, {
                "id": 150926,
                "name": "察哈尔右翼前旗",
                "parent_id": 150900,
                "sort": 8
            }, {"id": 150927, "name": "察哈尔右翼中旗", "parent_id": 150900, "sort": 9}, {
                "id": 150928,
                "name": "察哈尔右翼后旗",
                "parent_id": 150900,
                "sort": 10
            }, {"id": 150929, "name": "四子王旗", "parent_id": 150900, "sort": 11}, {
                "id": 150981,
                "name": "丰镇市",
                "parent_id": 150900,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 152200,
            "name": "兴安盟",
            "parent_id": 150000,
            "sort": 10,
            "sub": [{"id": 152201, "name": "乌兰浩特市", "parent_id": 152200, "sort": 1}, {
                "id": 152202,
                "name": "阿尔山市",
                "parent_id": 152200,
                "sort": 2
            }, {"id": 152221, "name": "科尔沁右翼前旗", "parent_id": 152200, "sort": 3}, {
                "id": 152222,
                "name": "科尔沁右翼中旗",
                "parent_id": 152200,
                "sort": 4
            }, {"id": 152223, "name": "扎赉特旗", "parent_id": 152200, "sort": 5}, {
                "id": 152224,
                "name": "突泉县",
                "parent_id": 152200,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 152500,
            "name": "锡林郭勒盟",
            "parent_id": 150000,
            "sort": 11,
            "sub": [{"id": 152501, "name": "二连浩特市", "parent_id": 152500, "sort": 1}, {
                "id": 152502,
                "name": "锡林浩特市",
                "parent_id": 152500,
                "sort": 2
            }, {"id": 152522, "name": "阿巴嘎旗", "parent_id": 152500, "sort": 3}, {
                "id": 152523,
                "name": "苏尼特左旗",
                "parent_id": 152500,
                "sort": 4
            }, {"id": 152524, "name": "苏尼特右旗", "parent_id": 152500, "sort": 5}, {
                "id": 152525,
                "name": "东乌珠穆沁旗",
                "parent_id": 152500,
                "sort": 6
            }, {"id": 152526, "name": "西乌珠穆沁旗", "parent_id": 152500, "sort": 7}, {
                "id": 152527,
                "name": "太仆寺旗",
                "parent_id": 152500,
                "sort": 8
            }, {"id": 152528, "name": "镶黄旗", "parent_id": 152500, "sort": 9}, {
                "id": 152529,
                "name": "正镶白旗",
                "parent_id": 152500,
                "sort": 10
            }, {"id": 152530, "name": "正蓝旗", "parent_id": 152500, "sort": 11}, {
                "id": 152531,
                "name": "多伦县",
                "parent_id": 152500,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 152900,
            "name": "阿拉善盟",
            "parent_id": 150000,
            "sort": 12,
            "sub": [{"id": 152921, "name": "阿拉善左旗", "parent_id": 152900, "sort": 1}, {
                "id": 152922,
                "name": "阿拉善右旗",
                "parent_id": 152900,
                "sort": 2
            }, {"id": 152923, "name": "额济纳旗", "parent_id": 152900, "sort": 3}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 210000,
        "name": "辽宁省",
        "parent_id": 0,
        "sort": 6,
        "sub": [{
            "id": 210100,
            "name": "沈阳市",
            "parent_id": 210000,
            "sort": 1,
            "sub": [{"id": 210101, "name": "市辖区", "parent_id": 210100, "sort": 1}, {
                "id": 210102,
                "name": "和平区",
                "parent_id": 210100,
                "sort": 2
            }, {"id": 210103, "name": "沈河区", "parent_id": 210100, "sort": 3}, {
                "id": 210104,
                "name": "大东区",
                "parent_id": 210100,
                "sort": 4
            }, {"id": 210105, "name": "皇姑区", "parent_id": 210100, "sort": 5}, {
                "id": 210106,
                "name": "铁西区",
                "parent_id": 210100,
                "sort": 6
            }, {"id": 210111, "name": "苏家屯区", "parent_id": 210100, "sort": 7}, {
                "id": 210112,
                "name": "东陵区",
                "parent_id": 210100,
                "sort": 8
            }, {"id": 210113, "name": "新城子区", "parent_id": 210100, "sort": 9}, {
                "id": 210114,
                "name": "于洪区",
                "parent_id": 210100,
                "sort": 10
            }, {"id": 210122, "name": "辽中县", "parent_id": 210100, "sort": 11}, {
                "id": 210123,
                "name": "康平县",
                "parent_id": 210100,
                "sort": 12
            }, {"id": 210124, "name": "法库县", "parent_id": 210100, "sort": 13}, {
                "id": 210181,
                "name": "新民市",
                "parent_id": 210100,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 210200,
            "name": "大连市",
            "parent_id": 210000,
            "sort": 2,
            "sub": [{"id": 210201, "name": "市辖区", "parent_id": 210200, "sort": 1}, {
                "id": 210202,
                "name": "中山区",
                "parent_id": 210200,
                "sort": 2
            }, {"id": 210203, "name": "西岗区", "parent_id": 210200, "sort": 3}, {
                "id": 210204,
                "name": "沙河口区",
                "parent_id": 210200,
                "sort": 4
            }, {"id": 210211, "name": "甘井子区", "parent_id": 210200, "sort": 5}, {
                "id": 210212,
                "name": "旅顺口区",
                "parent_id": 210200,
                "sort": 6
            }, {"id": 210213, "name": "金州区", "parent_id": 210200, "sort": 7}, {
                "id": 210224,
                "name": "长海县",
                "parent_id": 210200,
                "sort": 8
            }, {"id": 210281, "name": "瓦房店市", "parent_id": 210200, "sort": 9}, {
                "id": 210282,
                "name": "普兰店市",
                "parent_id": 210200,
                "sort": 10
            }, {"id": 210283, "name": "庄河市", "parent_id": 210200, "sort": 11}],
            "type": 0
        }, {
            "id": 210300,
            "name": "鞍山市",
            "parent_id": 210000,
            "sort": 3,
            "sub": [{"id": 210301, "name": "市辖区", "parent_id": 210300, "sort": 1}, {
                "id": 210302,
                "name": "铁东区",
                "parent_id": 210300,
                "sort": 2
            }, {"id": 210303, "name": "铁西区", "parent_id": 210300, "sort": 3}, {
                "id": 210304,
                "name": "立山区",
                "parent_id": 210300,
                "sort": 4
            }, {"id": 210311, "name": "千山区", "parent_id": 210300, "sort": 5}, {
                "id": 210321,
                "name": "台安县",
                "parent_id": 210300,
                "sort": 6
            }, {"id": 210323, "name": "岫岩满族自治县", "parent_id": 210300, "sort": 7}, {
                "id": 210381,
                "name": "海城市",
                "parent_id": 210300,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 210400,
            "name": "抚顺市",
            "parent_id": 210000,
            "sort": 4,
            "sub": [{"id": 210401, "name": "市辖区", "parent_id": 210400, "sort": 1}, {
                "id": 210402,
                "name": "新抚区",
                "parent_id": 210400,
                "sort": 2
            }, {"id": 210403, "name": "东洲区", "parent_id": 210400, "sort": 3}, {
                "id": 210404,
                "name": "望花区",
                "parent_id": 210400,
                "sort": 4
            }, {"id": 210411, "name": "顺城区", "parent_id": 210400, "sort": 5}, {
                "id": 210421,
                "name": "抚顺县",
                "parent_id": 210400,
                "sort": 6
            }, {"id": 210422, "name": "新宾满族自治县", "parent_id": 210400, "sort": 7}, {
                "id": 210423,
                "name": "清原满族自治县",
                "parent_id": 210400,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 210500,
            "name": "本溪市",
            "parent_id": 210000,
            "sort": 5,
            "sub": [{"id": 210501, "name": "市辖区", "parent_id": 210500, "sort": 1}, {
                "id": 210502,
                "name": "平山区",
                "parent_id": 210500,
                "sort": 2
            }, {"id": 210503, "name": "溪湖区", "parent_id": 210500, "sort": 3}, {
                "id": 210504,
                "name": "明山区",
                "parent_id": 210500,
                "sort": 4
            }, {"id": 210505, "name": "南芬区", "parent_id": 210500, "sort": 5}, {
                "id": 210521,
                "name": "本溪满族自治县",
                "parent_id": 210500,
                "sort": 6
            }, {"id": 210522, "name": "桓仁满族自治县", "parent_id": 210500, "sort": 7}],
            "type": 0
        }, {
            "id": 210600,
            "name": "丹东市",
            "parent_id": 210000,
            "sort": 6,
            "sub": [{"id": 210601, "name": "市辖区", "parent_id": 210600, "sort": 1}, {
                "id": 210602,
                "name": "元宝区",
                "parent_id": 210600,
                "sort": 2
            }, {"id": 210603, "name": "振兴区", "parent_id": 210600, "sort": 3}, {
                "id": 210604,
                "name": "振安区",
                "parent_id": 210600,
                "sort": 4
            }, {"id": 210624, "name": "宽甸满族自治县", "parent_id": 210600, "sort": 5}, {
                "id": 210681,
                "name": "东港市",
                "parent_id": 210600,
                "sort": 6
            }, {"id": 210682, "name": "凤城市", "parent_id": 210600, "sort": 7}],
            "type": 0
        }, {
            "id": 210700,
            "name": "锦州市",
            "parent_id": 210000,
            "sort": 7,
            "sub": [{"id": 210701, "name": "市辖区", "parent_id": 210700, "sort": 1}, {
                "id": 210702,
                "name": "古塔区",
                "parent_id": 210700,
                "sort": 2
            }, {"id": 210703, "name": "凌河区", "parent_id": 210700, "sort": 3}, {
                "id": 210711,
                "name": "太和区",
                "parent_id": 210700,
                "sort": 4
            }, {"id": 210726, "name": "黑山县", "parent_id": 210700, "sort": 5}, {
                "id": 210727,
                "name": "义　县",
                "parent_id": 210700,
                "sort": 6
            }, {"id": 210781, "name": "凌海市", "parent_id": 210700, "sort": 7}, {
                "id": 210782,
                "name": "北宁市",
                "parent_id": 210700,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 210800,
            "name": "营口市",
            "parent_id": 210000,
            "sort": 8,
            "sub": [{"id": 210801, "name": "市辖区", "parent_id": 210800, "sort": 1}, {
                "id": 210802,
                "name": "站前区",
                "parent_id": 210800,
                "sort": 2
            }, {"id": 210803, "name": "西市区", "parent_id": 210800, "sort": 3}, {
                "id": 210804,
                "name": "鲅鱼圈区",
                "parent_id": 210800,
                "sort": 4
            }, {"id": 210811, "name": "老边区", "parent_id": 210800, "sort": 5}, {
                "id": 210881,
                "name": "盖州市",
                "parent_id": 210800,
                "sort": 6
            }, {"id": 210882, "name": "大石桥市", "parent_id": 210800, "sort": 7}],
            "type": 0
        }, {
            "id": 210900,
            "name": "阜新市",
            "parent_id": 210000,
            "sort": 9,
            "sub": [{"id": 210901, "name": "市辖区", "parent_id": 210900, "sort": 1}, {
                "id": 210902,
                "name": "海州区",
                "parent_id": 210900,
                "sort": 2
            }, {"id": 210903, "name": "新邱区", "parent_id": 210900, "sort": 3}, {
                "id": 210904,
                "name": "太平区",
                "parent_id": 210900,
                "sort": 4
            }, {"id": 210905, "name": "清河门区", "parent_id": 210900, "sort": 5}, {
                "id": 210911,
                "name": "细河区",
                "parent_id": 210900,
                "sort": 6
            }, {"id": 210921, "name": "阜新蒙古族自治县", "parent_id": 210900, "sort": 7}, {
                "id": 210922,
                "name": "彰武县",
                "parent_id": 210900,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 211000,
            "name": "辽阳市",
            "parent_id": 210000,
            "sort": 10,
            "sub": [{"id": 211001, "name": "市辖区", "parent_id": 211000, "sort": 1}, {
                "id": 211002,
                "name": "白塔区",
                "parent_id": 211000,
                "sort": 2
            }, {"id": 211003, "name": "文圣区", "parent_id": 211000, "sort": 3}, {
                "id": 211004,
                "name": "宏伟区",
                "parent_id": 211000,
                "sort": 4
            }, {"id": 211005, "name": "弓长岭区", "parent_id": 211000, "sort": 5}, {
                "id": 211011,
                "name": "太子河区",
                "parent_id": 211000,
                "sort": 6
            }, {"id": 211021, "name": "辽阳县", "parent_id": 211000, "sort": 7}, {
                "id": 211081,
                "name": "灯塔市",
                "parent_id": 211000,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 211100,
            "name": "盘锦市",
            "parent_id": 210000,
            "sort": 11,
            "sub": [{"id": 211101, "name": "市辖区", "parent_id": 211100, "sort": 1}, {
                "id": 211102,
                "name": "双台子区",
                "parent_id": 211100,
                "sort": 2
            }, {"id": 211103, "name": "兴隆台区", "parent_id": 211100, "sort": 3}, {
                "id": 211121,
                "name": "大洼县",
                "parent_id": 211100,
                "sort": 4
            }, {"id": 211122, "name": "盘山县", "parent_id": 211100, "sort": 5}],
            "type": 0
        }, {
            "id": 211200,
            "name": "铁岭市",
            "parent_id": 210000,
            "sort": 12,
            "sub": [{"id": 211201, "name": "市辖区", "parent_id": 211200, "sort": 1}, {
                "id": 211202,
                "name": "银州区",
                "parent_id": 211200,
                "sort": 2
            }, {"id": 211204, "name": "清河区", "parent_id": 211200, "sort": 3}, {
                "id": 211221,
                "name": "铁岭县",
                "parent_id": 211200,
                "sort": 4
            }, {"id": 211223, "name": "西丰县", "parent_id": 211200, "sort": 5}, {
                "id": 211224,
                "name": "昌图县",
                "parent_id": 211200,
                "sort": 6
            }, {"id": 211281, "name": "调兵山市", "parent_id": 211200, "sort": 7}, {
                "id": 211282,
                "name": "开原市",
                "parent_id": 211200,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 211300,
            "name": "朝阳市",
            "parent_id": 210000,
            "sort": 13,
            "sub": [{"id": 211301, "name": "市辖区", "parent_id": 211300, "sort": 1}, {
                "id": 211302,
                "name": "双塔区",
                "parent_id": 211300,
                "sort": 2
            }, {"id": 211303, "name": "龙城区", "parent_id": 211300, "sort": 3}, {
                "id": 211321,
                "name": "朝阳县",
                "parent_id": 211300,
                "sort": 4
            }, {"id": 211322, "name": "建平县", "parent_id": 211300, "sort": 5}, {
                "id": 211324,
                "name": "喀喇沁左翼蒙古族自治县",
                "parent_id": 211300,
                "sort": 6
            }, {"id": 211381, "name": "北票市", "parent_id": 211300, "sort": 7}, {
                "id": 211382,
                "name": "凌源市",
                "parent_id": 211300,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 211400,
            "name": "葫芦岛市",
            "parent_id": 210000,
            "sort": 14,
            "sub": [{"id": 211401, "name": "市辖区", "parent_id": 211400, "sort": 1}, {
                "id": 211402,
                "name": "连山区",
                "parent_id": 211400,
                "sort": 2
            }, {"id": 211403, "name": "龙港区", "parent_id": 211400, "sort": 3}, {
                "id": 211404,
                "name": "南票区",
                "parent_id": 211400,
                "sort": 4
            }, {"id": 211421, "name": "绥中县", "parent_id": 211400, "sort": 5}, {
                "id": 211422,
                "name": "建昌县",
                "parent_id": 211400,
                "sort": 6
            }, {"id": 211481, "name": "兴城市", "parent_id": 211400, "sort": 7}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 220000,
        "name": "吉林省",
        "parent_id": 0,
        "sort": 7,
        "sub": [{
            "id": 220100,
            "name": "长春市",
            "parent_id": 220000,
            "sort": 1,
            "sub": [{"id": 220101, "name": "市辖区", "parent_id": 220100, "sort": 1}, {
                "id": 220102,
                "name": "南关区",
                "parent_id": 220100,
                "sort": 2
            }, {"id": 220103, "name": "宽城区", "parent_id": 220100, "sort": 3}, {
                "id": 220104,
                "name": "朝阳区",
                "parent_id": 220100,
                "sort": 4
            }, {"id": 220105, "name": "二道区", "parent_id": 220100, "sort": 5}, {
                "id": 220106,
                "name": "绿园区",
                "parent_id": 220100,
                "sort": 6
            }, {"id": 220112, "name": "双阳区", "parent_id": 220100, "sort": 7}, {
                "id": 220122,
                "name": "农安县",
                "parent_id": 220100,
                "sort": 8
            }, {"id": 220181, "name": "九台市", "parent_id": 220100, "sort": 9}, {
                "id": 220182,
                "name": "榆树市",
                "parent_id": 220100,
                "sort": 10
            }, {"id": 220183, "name": "德惠市", "parent_id": 220100, "sort": 11}],
            "type": 0
        }, {
            "id": 220200,
            "name": "吉林市",
            "parent_id": 220000,
            "sort": 2,
            "sub": [{"id": 220201, "name": "市辖区", "parent_id": 220200, "sort": 1}, {
                "id": 220202,
                "name": "昌邑区",
                "parent_id": 220200,
                "sort": 2
            }, {"id": 220203, "name": "龙潭区", "parent_id": 220200, "sort": 3}, {
                "id": 220204,
                "name": "船营区",
                "parent_id": 220200,
                "sort": 4
            }, {"id": 220211, "name": "丰满区", "parent_id": 220200, "sort": 5}, {
                "id": 220221,
                "name": "永吉县",
                "parent_id": 220200,
                "sort": 6
            }, {"id": 220281, "name": "蛟河市", "parent_id": 220200, "sort": 7}, {
                "id": 220282,
                "name": "桦甸市",
                "parent_id": 220200,
                "sort": 8
            }, {"id": 220283, "name": "舒兰市", "parent_id": 220200, "sort": 9}, {
                "id": 220284,
                "name": "磐石市",
                "parent_id": 220200,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 220300,
            "name": "四平市",
            "parent_id": 220000,
            "sort": 3,
            "sub": [{"id": 220301, "name": "市辖区", "parent_id": 220300, "sort": 1}, {
                "id": 220302,
                "name": "铁西区",
                "parent_id": 220300,
                "sort": 2
            }, {"id": 220303, "name": "铁东区", "parent_id": 220300, "sort": 3}, {
                "id": 220322,
                "name": "梨树县",
                "parent_id": 220300,
                "sort": 4
            }, {"id": 220323, "name": "伊通满族自治县", "parent_id": 220300, "sort": 5}, {
                "id": 220381,
                "name": "公主岭市",
                "parent_id": 220300,
                "sort": 6
            }, {"id": 220382, "name": "双辽市", "parent_id": 220300, "sort": 7}],
            "type": 0
        }, {
            "id": 220400,
            "name": "辽源市",
            "parent_id": 220000,
            "sort": 4,
            "sub": [{"id": 220401, "name": "市辖区", "parent_id": 220400, "sort": 1}, {
                "id": 220402,
                "name": "龙山区",
                "parent_id": 220400,
                "sort": 2
            }, {"id": 220403, "name": "西安区", "parent_id": 220400, "sort": 3}, {
                "id": 220421,
                "name": "东丰县",
                "parent_id": 220400,
                "sort": 4
            }, {"id": 220422, "name": "东辽县", "parent_id": 220400, "sort": 5}],
            "type": 0
        }, {
            "id": 220500,
            "name": "通化市",
            "parent_id": 220000,
            "sort": 5,
            "sub": [{"id": 220501, "name": "市辖区", "parent_id": 220500, "sort": 1}, {
                "id": 220502,
                "name": "东昌区",
                "parent_id": 220500,
                "sort": 2
            }, {"id": 220503, "name": "二道江区", "parent_id": 220500, "sort": 3}, {
                "id": 220521,
                "name": "通化县",
                "parent_id": 220500,
                "sort": 4
            }, {"id": 220523, "name": "辉南县", "parent_id": 220500, "sort": 5}, {
                "id": 220524,
                "name": "柳河县",
                "parent_id": 220500,
                "sort": 6
            }, {"id": 220581, "name": "梅河口市", "parent_id": 220500, "sort": 7}, {
                "id": 220582,
                "name": "集安市",
                "parent_id": 220500,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 220600,
            "name": "白山市",
            "parent_id": 220000,
            "sort": 6,
            "sub": [{"id": 220601, "name": "市辖区", "parent_id": 220600, "sort": 1}, {
                "id": 220602,
                "name": "八道江区",
                "parent_id": 220600,
                "sort": 2
            }, {"id": 220621, "name": "抚松县", "parent_id": 220600, "sort": 3}, {
                "id": 220622,
                "name": "靖宇县",
                "parent_id": 220600,
                "sort": 4
            }, {"id": 220623, "name": "长白朝鲜族自治县", "parent_id": 220600, "sort": 5}, {
                "id": 220625,
                "name": "江源县",
                "parent_id": 220600,
                "sort": 6
            }, {"id": 220681, "name": "临江市", "parent_id": 220600, "sort": 7}],
            "type": 0
        }, {
            "id": 220700,
            "name": "松原市",
            "parent_id": 220000,
            "sort": 7,
            "sub": [{"id": 220701, "name": "市辖区", "parent_id": 220700, "sort": 1}, {
                "id": 220702,
                "name": "宁江区",
                "parent_id": 220700,
                "sort": 2
            }, {"id": 220721, "name": "前郭尔罗斯蒙古族自治县", "parent_id": 220700, "sort": 3}, {
                "id": 220722,
                "name": "长岭县",
                "parent_id": 220700,
                "sort": 4
            }, {"id": 220723, "name": "乾安县", "parent_id": 220700, "sort": 5}, {
                "id": 220724,
                "name": "扶余县",
                "parent_id": 220700,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 220800,
            "name": "白城市",
            "parent_id": 220000,
            "sort": 8,
            "sub": [{"id": 220801, "name": "市辖区", "parent_id": 220800, "sort": 1}, {
                "id": 220802,
                "name": "洮北区",
                "parent_id": 220800,
                "sort": 2
            }, {"id": 220821, "name": "镇赉县", "parent_id": 220800, "sort": 3}, {
                "id": 220822,
                "name": "通榆县",
                "parent_id": 220800,
                "sort": 4
            }, {"id": 220881, "name": "洮南市", "parent_id": 220800, "sort": 5}, {
                "id": 220882,
                "name": "大安市",
                "parent_id": 220800,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 222400,
            "name": "延边朝鲜族自治州",
            "parent_id": 220000,
            "sort": 9,
            "sub": [{"id": 222401, "name": "延吉市", "parent_id": 222400, "sort": 1}, {
                "id": 222402,
                "name": "图们市",
                "parent_id": 222400,
                "sort": 2
            }, {"id": 222403, "name": "敦化市", "parent_id": 222400, "sort": 3}, {
                "id": 222404,
                "name": "珲春市",
                "parent_id": 222400,
                "sort": 4
            }, {"id": 222405, "name": "龙井市", "parent_id": 222400, "sort": 5}, {
                "id": 222406,
                "name": "和龙市",
                "parent_id": 222400,
                "sort": 6
            }, {"id": 222424, "name": "汪清县", "parent_id": 222400, "sort": 7}, {
                "id": 222426,
                "name": "安图县",
                "parent_id": 222400,
                "sort": 8
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 230000,
        "name": "黑龙江",
        "parent_id": 0,
        "sort": 8,
        "sub": [{
            "id": 230100,
            "name": "哈尔滨市",
            "parent_id": 230000,
            "sort": 1,
            "sub": [{"id": 230101, "name": "市辖区", "parent_id": 230100, "sort": 1}, {
                "id": 230102,
                "name": "道里区",
                "parent_id": 230100,
                "sort": 2
            }, {"id": 230103, "name": "南岗区", "parent_id": 230100, "sort": 3}, {
                "id": 230104,
                "name": "道外区",
                "parent_id": 230100,
                "sort": 4
            }, {"id": 230106, "name": "香坊区", "parent_id": 230100, "sort": 5}, {
                "id": 230107,
                "name": "动力区",
                "parent_id": 230100,
                "sort": 6
            }, {"id": 230108, "name": "平房区", "parent_id": 230100, "sort": 7}, {
                "id": 230109,
                "name": "松北区",
                "parent_id": 230100,
                "sort": 8
            }, {"id": 230111, "name": "呼兰区", "parent_id": 230100, "sort": 9}, {
                "id": 230123,
                "name": "依兰县",
                "parent_id": 230100,
                "sort": 10
            }, {"id": 230124, "name": "方正县", "parent_id": 230100, "sort": 11}, {
                "id": 230125,
                "name": "宾　县",
                "parent_id": 230100,
                "sort": 12
            }, {"id": 230126, "name": "巴彦县", "parent_id": 230100, "sort": 13}, {
                "id": 230127,
                "name": "木兰县",
                "parent_id": 230100,
                "sort": 14
            }, {"id": 230128, "name": "通河县", "parent_id": 230100, "sort": 15}, {
                "id": 230129,
                "name": "延寿县",
                "parent_id": 230100,
                "sort": 16
            }, {"id": 230181, "name": "阿城市", "parent_id": 230100, "sort": 17}, {
                "id": 230182,
                "name": "双城市",
                "parent_id": 230100,
                "sort": 18
            }, {"id": 230183, "name": "尚志市", "parent_id": 230100, "sort": 19}, {
                "id": 230184,
                "name": "五常市",
                "parent_id": 230100,
                "sort": 20
            }],
            "type": 0
        }, {
            "id": 230200,
            "name": "齐齐哈尔市",
            "parent_id": 230000,
            "sort": 2,
            "sub": [{"id": 230201, "name": "市辖区", "parent_id": 230200, "sort": 1}, {
                "id": 230202,
                "name": "龙沙区",
                "parent_id": 230200,
                "sort": 2
            }, {"id": 230203, "name": "建华区", "parent_id": 230200, "sort": 3}, {
                "id": 230204,
                "name": "铁锋区",
                "parent_id": 230200,
                "sort": 4
            }, {"id": 230205, "name": "昂昂溪区", "parent_id": 230200, "sort": 5}, {
                "id": 230206,
                "name": "富拉尔基区",
                "parent_id": 230200,
                "sort": 6
            }, {"id": 230207, "name": "碾子山区", "parent_id": 230200, "sort": 7}, {
                "id": 230208,
                "name": "梅里斯达斡尔族区",
                "parent_id": 230200,
                "sort": 8
            }, {"id": 230221, "name": "龙江县", "parent_id": 230200, "sort": 9}, {
                "id": 230223,
                "name": "依安县",
                "parent_id": 230200,
                "sort": 10
            }, {"id": 230224, "name": "泰来县", "parent_id": 230200, "sort": 11}, {
                "id": 230225,
                "name": "甘南县",
                "parent_id": 230200,
                "sort": 12
            }, {"id": 230227, "name": "富裕县", "parent_id": 230200, "sort": 13}, {
                "id": 230229,
                "name": "克山县",
                "parent_id": 230200,
                "sort": 14
            }, {"id": 230230, "name": "克东县", "parent_id": 230200, "sort": 15}, {
                "id": 230231,
                "name": "拜泉县",
                "parent_id": 230200,
                "sort": 16
            }, {"id": 230281, "name": "讷河市", "parent_id": 230200, "sort": 17}],
            "type": 0
        }, {
            "id": 230300,
            "name": "鸡西市",
            "parent_id": 230000,
            "sort": 3,
            "sub": [{"id": 230301, "name": "市辖区", "parent_id": 230300, "sort": 1}, {
                "id": 230302,
                "name": "鸡冠区",
                "parent_id": 230300,
                "sort": 2
            }, {"id": 230303, "name": "恒山区", "parent_id": 230300, "sort": 3}, {
                "id": 230304,
                "name": "滴道区",
                "parent_id": 230300,
                "sort": 4
            }, {"id": 230305, "name": "梨树区", "parent_id": 230300, "sort": 5}, {
                "id": 230306,
                "name": "城子河区",
                "parent_id": 230300,
                "sort": 6
            }, {"id": 230307, "name": "麻山区", "parent_id": 230300, "sort": 7}, {
                "id": 230321,
                "name": "鸡东县",
                "parent_id": 230300,
                "sort": 8
            }, {"id": 230381, "name": "虎林市", "parent_id": 230300, "sort": 9}, {
                "id": 230382,
                "name": "密山市",
                "parent_id": 230300,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 230400,
            "name": "鹤岗市",
            "parent_id": 230000,
            "sort": 4,
            "sub": [{"id": 230401, "name": "市辖区", "parent_id": 230400, "sort": 1}, {
                "id": 230402,
                "name": "向阳区",
                "parent_id": 230400,
                "sort": 2
            }, {"id": 230403, "name": "工农区", "parent_id": 230400, "sort": 3}, {
                "id": 230404,
                "name": "南山区",
                "parent_id": 230400,
                "sort": 4
            }, {"id": 230405, "name": "兴安区", "parent_id": 230400, "sort": 5}, {
                "id": 230406,
                "name": "东山区",
                "parent_id": 230400,
                "sort": 6
            }, {"id": 230407, "name": "兴山区", "parent_id": 230400, "sort": 7}, {
                "id": 230421,
                "name": "萝北县",
                "parent_id": 230400,
                "sort": 8
            }, {"id": 230422, "name": "绥滨县", "parent_id": 230400, "sort": 9}],
            "type": 0
        }, {
            "id": 230500,
            "name": "双鸭山市",
            "parent_id": 230000,
            "sort": 5,
            "sub": [{"id": 230501, "name": "市辖区", "parent_id": 230500, "sort": 1}, {
                "id": 230502,
                "name": "尖山区",
                "parent_id": 230500,
                "sort": 2
            }, {"id": 230503, "name": "岭东区", "parent_id": 230500, "sort": 3}, {
                "id": 230505,
                "name": "四方台区",
                "parent_id": 230500,
                "sort": 4
            }, {"id": 230506, "name": "宝山区", "parent_id": 230500, "sort": 5}, {
                "id": 230521,
                "name": "集贤县",
                "parent_id": 230500,
                "sort": 6
            }, {"id": 230522, "name": "友谊县", "parent_id": 230500, "sort": 7}, {
                "id": 230523,
                "name": "宝清县",
                "parent_id": 230500,
                "sort": 8
            }, {"id": 230524, "name": "饶河县", "parent_id": 230500, "sort": 9}],
            "type": 0
        }, {
            "id": 230600,
            "name": "大庆市",
            "parent_id": 230000,
            "sort": 6,
            "sub": [{"id": 230601, "name": "市辖区", "parent_id": 230600, "sort": 1}, {
                "id": 230602,
                "name": "萨尔图区",
                "parent_id": 230600,
                "sort": 2
            }, {"id": 230603, "name": "龙凤区", "parent_id": 230600, "sort": 3}, {
                "id": 230604,
                "name": "让胡路区",
                "parent_id": 230600,
                "sort": 4
            }, {"id": 230605, "name": "红岗区", "parent_id": 230600, "sort": 5}, {
                "id": 230606,
                "name": "大同区",
                "parent_id": 230600,
                "sort": 6
            }, {"id": 230621, "name": "肇州县", "parent_id": 230600, "sort": 7}, {
                "id": 230622,
                "name": "肇源县",
                "parent_id": 230600,
                "sort": 8
            }, {"id": 230623, "name": "林甸县", "parent_id": 230600, "sort": 9}, {
                "id": 230624,
                "name": "杜尔伯特蒙古族自治县",
                "parent_id": 230600,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 230700,
            "name": "伊春市",
            "parent_id": 230000,
            "sort": 7,
            "sub": [{"id": 230701, "name": "市辖区", "parent_id": 230700, "sort": 1}, {
                "id": 230702,
                "name": "伊春区",
                "parent_id": 230700,
                "sort": 2
            }, {"id": 230703, "name": "南岔区", "parent_id": 230700, "sort": 3}, {
                "id": 230704,
                "name": "友好区",
                "parent_id": 230700,
                "sort": 4
            }, {"id": 230705, "name": "西林区", "parent_id": 230700, "sort": 5}, {
                "id": 230706,
                "name": "翠峦区",
                "parent_id": 230700,
                "sort": 6
            }, {"id": 230707, "name": "新青区", "parent_id": 230700, "sort": 7}, {
                "id": 230708,
                "name": "美溪区",
                "parent_id": 230700,
                "sort": 8
            }, {"id": 230709, "name": "金山屯区", "parent_id": 230700, "sort": 9}, {
                "id": 230710,
                "name": "五营区",
                "parent_id": 230700,
                "sort": 10
            }, {"id": 230711, "name": "乌马河区", "parent_id": 230700, "sort": 11}, {
                "id": 230712,
                "name": "汤旺河区",
                "parent_id": 230700,
                "sort": 12
            }, {"id": 230713, "name": "带岭区", "parent_id": 230700, "sort": 13}, {
                "id": 230714,
                "name": "乌伊岭区",
                "parent_id": 230700,
                "sort": 14
            }, {"id": 230715, "name": "红星区", "parent_id": 230700, "sort": 15}, {
                "id": 230716,
                "name": "上甘岭区",
                "parent_id": 230700,
                "sort": 16
            }, {"id": 230722, "name": "嘉荫县", "parent_id": 230700, "sort": 17}, {
                "id": 230781,
                "name": "铁力市",
                "parent_id": 230700,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 230800,
            "name": "佳木斯市",
            "parent_id": 230000,
            "sort": 8,
            "sub": [{"id": 230801, "name": "市辖区", "parent_id": 230800, "sort": 1}, {
                "id": 230802,
                "name": "永红区",
                "parent_id": 230800,
                "sort": 2
            }, {"id": 230803, "name": "向阳区", "parent_id": 230800, "sort": 3}, {
                "id": 230804,
                "name": "前进区",
                "parent_id": 230800,
                "sort": 4
            }, {"id": 230805, "name": "东风区", "parent_id": 230800, "sort": 5}, {
                "id": 230811,
                "name": "郊　区",
                "parent_id": 230800,
                "sort": 6
            }, {"id": 230822, "name": "桦南县", "parent_id": 230800, "sort": 7}, {
                "id": 230826,
                "name": "桦川县",
                "parent_id": 230800,
                "sort": 8
            }, {"id": 230828, "name": "汤原县", "parent_id": 230800, "sort": 9}, {
                "id": 230833,
                "name": "抚远县",
                "parent_id": 230800,
                "sort": 10
            }, {"id": 230881, "name": "同江市", "parent_id": 230800, "sort": 11}, {
                "id": 230882,
                "name": "富锦市",
                "parent_id": 230800,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 230900,
            "name": "七台河市",
            "parent_id": 230000,
            "sort": 9,
            "sub": [{"id": 230901, "name": "市辖区", "parent_id": 230900, "sort": 1}, {
                "id": 230902,
                "name": "新兴区",
                "parent_id": 230900,
                "sort": 2
            }, {"id": 230903, "name": "桃山区", "parent_id": 230900, "sort": 3}, {
                "id": 230904,
                "name": "茄子河区",
                "parent_id": 230900,
                "sort": 4
            }, {"id": 230921, "name": "勃利县", "parent_id": 230900, "sort": 5}],
            "type": 0
        }, {
            "id": 231000,
            "name": "牡丹江市",
            "parent_id": 230000,
            "sort": 10,
            "sub": [{"id": 231001, "name": "市辖区", "parent_id": 231000, "sort": 1}, {
                "id": 231002,
                "name": "东安区",
                "parent_id": 231000,
                "sort": 2
            }, {"id": 231003, "name": "阳明区", "parent_id": 231000, "sort": 3}, {
                "id": 231004,
                "name": "爱民区",
                "parent_id": 231000,
                "sort": 4
            }, {"id": 231005, "name": "西安区", "parent_id": 231000, "sort": 5}, {
                "id": 231024,
                "name": "东宁县",
                "parent_id": 231000,
                "sort": 6
            }, {"id": 231025, "name": "林口县", "parent_id": 231000, "sort": 7}, {
                "id": 231081,
                "name": "绥芬河市",
                "parent_id": 231000,
                "sort": 8
            }, {"id": 231083, "name": "海林市", "parent_id": 231000, "sort": 9}, {
                "id": 231084,
                "name": "宁安市",
                "parent_id": 231000,
                "sort": 10
            }, {"id": 231085, "name": "穆棱市", "parent_id": 231000, "sort": 11}],
            "type": 0
        }, {
            "id": 231100,
            "name": "黑河市",
            "parent_id": 230000,
            "sort": 11,
            "sub": [{"id": 231101, "name": "市辖区", "parent_id": 231100, "sort": 1}, {
                "id": 231102,
                "name": "爱辉区",
                "parent_id": 231100,
                "sort": 2
            }, {"id": 231121, "name": "嫩江县", "parent_id": 231100, "sort": 3}, {
                "id": 231123,
                "name": "逊克县",
                "parent_id": 231100,
                "sort": 4
            }, {"id": 231124, "name": "孙吴县", "parent_id": 231100, "sort": 5}, {
                "id": 231181,
                "name": "北安市",
                "parent_id": 231100,
                "sort": 6
            }, {"id": 231182, "name": "五大连池市", "parent_id": 231100, "sort": 7}],
            "type": 0
        }, {
            "id": 231200,
            "name": "绥化市",
            "parent_id": 230000,
            "sort": 12,
            "sub": [{"id": 231201, "name": "市辖区", "parent_id": 231200, "sort": 1}, {
                "id": 231202,
                "name": "北林区",
                "parent_id": 231200,
                "sort": 2
            }, {"id": 231221, "name": "望奎县", "parent_id": 231200, "sort": 3}, {
                "id": 231222,
                "name": "兰西县",
                "parent_id": 231200,
                "sort": 4
            }, {"id": 231223, "name": "青冈县", "parent_id": 231200, "sort": 5}, {
                "id": 231224,
                "name": "庆安县",
                "parent_id": 231200,
                "sort": 6
            }, {"id": 231225, "name": "明水县", "parent_id": 231200, "sort": 7}, {
                "id": 231226,
                "name": "绥棱县",
                "parent_id": 231200,
                "sort": 8
            }, {"id": 231281, "name": "安达市", "parent_id": 231200, "sort": 9}, {
                "id": 231282,
                "name": "肇东市",
                "parent_id": 231200,
                "sort": 10
            }, {"id": 231283, "name": "海伦市", "parent_id": 231200, "sort": 11}],
            "type": 0
        }, {
            "id": 232700,
            "name": "大兴安岭地区",
            "parent_id": 230000,
            "sort": 13,
            "sub": [{"id": 232721, "name": "呼玛县", "parent_id": 232700, "sort": 1}, {
                "id": 232722,
                "name": "塔河县",
                "parent_id": 232700,
                "sort": 2
            }, {"id": 232723, "name": "漠河县", "parent_id": 232700, "sort": 3}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 310000,
        "name": "上海市",
        "parent_id": 0,
        "sort": 9,
        "sub": [{
            "id": 310100,
            "name": "市辖区",
            "parent_id": 310000,
            "sort": 1,
            "sub": [{"id": 310101, "name": "黄浦区", "parent_id": 310100, "sort": 1}, {
                "id": 310103,
                "name": "卢湾区",
                "parent_id": 310100,
                "sort": 2
            }, {"id": 310104, "name": "徐汇区", "parent_id": 310100, "sort": 3}, {
                "id": 310105,
                "name": "长宁区",
                "parent_id": 310100,
                "sort": 4
            }, {"id": 310106, "name": "静安区", "parent_id": 310100, "sort": 5}, {
                "id": 310107,
                "name": "普陀区",
                "parent_id": 310100,
                "sort": 6
            }, {"id": 310108, "name": "闸北区", "parent_id": 310100, "sort": 7}, {
                "id": 310109,
                "name": "虹口区",
                "parent_id": 310100,
                "sort": 8
            }, {"id": 310110, "name": "杨浦区", "parent_id": 310100, "sort": 9}, {
                "id": 310112,
                "name": "闵行区",
                "parent_id": 310100,
                "sort": 10
            }, {"id": 310113, "name": "宝山区", "parent_id": 310100, "sort": 11}, {
                "id": 310114,
                "name": "嘉定区",
                "parent_id": 310100,
                "sort": 12
            }, {"id": 310115, "name": "浦东新区", "parent_id": 310100, "sort": 13}, {
                "id": 310116,
                "name": "金山区",
                "parent_id": 310100,
                "sort": 14
            }, {"id": 310117, "name": "松江区", "parent_id": 310100, "sort": 15}, {
                "id": 310118,
                "name": "青浦区",
                "parent_id": 310100,
                "sort": 16
            }, {"id": 310119, "name": "南汇区", "parent_id": 310100, "sort": 17}, {
                "id": 310120,
                "name": "奉贤区",
                "parent_id": 310100,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 310200,
            "name": "县",
            "parent_id": 310000,
            "sort": 2,
            "sub": [{"id": 310230, "name": "崇明县", "parent_id": 310200, "sort": 1}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 320000,
        "name": "江苏省",
        "parent_id": 0,
        "sort": 10,
        "sub": [{
            "id": 320100,
            "name": "南京市",
            "parent_id": 320000,
            "sort": 1,
            "sub": [{"id": 320101, "name": "市辖区", "parent_id": 320100, "sort": 1}, {
                "id": 320102,
                "name": "玄武区",
                "parent_id": 320100,
                "sort": 2
            }, {"id": 320103, "name": "白下区", "parent_id": 320100, "sort": 3}, {
                "id": 320104,
                "name": "秦淮区",
                "parent_id": 320100,
                "sort": 4
            }, {"id": 320105, "name": "建邺区", "parent_id": 320100, "sort": 5}, {
                "id": 320106,
                "name": "鼓楼区",
                "parent_id": 320100,
                "sort": 6
            }, {"id": 320107, "name": "下关区", "parent_id": 320100, "sort": 7}, {
                "id": 320111,
                "name": "浦口区",
                "parent_id": 320100,
                "sort": 8
            }, {"id": 320113, "name": "栖霞区", "parent_id": 320100, "sort": 9}, {
                "id": 320114,
                "name": "雨花台区",
                "parent_id": 320100,
                "sort": 10
            }, {"id": 320115, "name": "江宁区", "parent_id": 320100, "sort": 11}, {
                "id": 320116,
                "name": "六合区",
                "parent_id": 320100,
                "sort": 12
            }, {"id": 320124, "name": "溧水县", "parent_id": 320100, "sort": 13}, {
                "id": 320125,
                "name": "高淳县",
                "parent_id": 320100,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 320200,
            "name": "无锡市",
            "parent_id": 320000,
            "sort": 2,
            "sub": [{"id": 320201, "name": "市辖区", "parent_id": 320200, "sort": 1}, {
                "id": 320202,
                "name": "崇安区",
                "parent_id": 320200,
                "sort": 2
            }, {"id": 320203, "name": "南长区", "parent_id": 320200, "sort": 3}, {
                "id": 320204,
                "name": "北塘区",
                "parent_id": 320200,
                "sort": 4
            }, {"id": 320205, "name": "锡山区", "parent_id": 320200, "sort": 5}, {
                "id": 320206,
                "name": "惠山区",
                "parent_id": 320200,
                "sort": 6
            }, {"id": 320211, "name": "滨湖区", "parent_id": 320200, "sort": 7}, {
                "id": 320281,
                "name": "江阴市",
                "parent_id": 320200,
                "sort": 8
            }, {"id": 320282, "name": "宜兴市", "parent_id": 320200, "sort": 9}],
            "type": 0
        }, {
            "id": 320300,
            "name": "徐州市",
            "parent_id": 320000,
            "sort": 3,
            "sub": [{"id": 320301, "name": "市辖区", "parent_id": 320300, "sort": 1}, {
                "id": 320302,
                "name": "鼓楼区",
                "parent_id": 320300,
                "sort": 2
            }, {"id": 320303, "name": "云龙区", "parent_id": 320300, "sort": 3}, {
                "id": 320304,
                "name": "九里区",
                "parent_id": 320300,
                "sort": 4
            }, {"id": 320305, "name": "贾汪区", "parent_id": 320300, "sort": 5}, {
                "id": 320311,
                "name": "泉山区",
                "parent_id": 320300,
                "sort": 6
            }, {"id": 320321, "name": "丰　县", "parent_id": 320300, "sort": 7}, {
                "id": 320322,
                "name": "沛　县",
                "parent_id": 320300,
                "sort": 8
            }, {"id": 320323, "name": "铜山县", "parent_id": 320300, "sort": 9}, {
                "id": 320324,
                "name": "睢宁县",
                "parent_id": 320300,
                "sort": 10
            }, {"id": 320381, "name": "新沂市", "parent_id": 320300, "sort": 11}, {
                "id": 320382,
                "name": "邳州市",
                "parent_id": 320300,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 320400,
            "name": "常州市",
            "parent_id": 320000,
            "sort": 4,
            "sub": [{"id": 320401, "name": "市辖区", "parent_id": 320400, "sort": 1}, {
                "id": 320402,
                "name": "天宁区",
                "parent_id": 320400,
                "sort": 2
            }, {"id": 320404, "name": "钟楼区", "parent_id": 320400, "sort": 3}, {
                "id": 320405,
                "name": "戚墅堰区",
                "parent_id": 320400,
                "sort": 4
            }, {"id": 320411, "name": "新北区", "parent_id": 320400, "sort": 5}, {
                "id": 320412,
                "name": "武进区",
                "parent_id": 320400,
                "sort": 6
            }, {"id": 320481, "name": "溧阳市", "parent_id": 320400, "sort": 7}, {
                "id": 320482,
                "name": "金坛市",
                "parent_id": 320400,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 320500,
            "name": "苏州市",
            "parent_id": 320000,
            "sort": 5,
            "sub": [{"id": 320501, "name": "市辖区", "parent_id": 320500, "sort": 1}, {
                "id": 320502,
                "name": "沧浪区",
                "parent_id": 320500,
                "sort": 2
            }, {"id": 320503, "name": "平江区", "parent_id": 320500, "sort": 3}, {
                "id": 320504,
                "name": "金阊区",
                "parent_id": 320500,
                "sort": 4
            }, {"id": 320505, "name": "虎丘区", "parent_id": 320500, "sort": 5}, {
                "id": 320506,
                "name": "吴中区",
                "parent_id": 320500,
                "sort": 6
            }, {"id": 320507, "name": "相城区", "parent_id": 320500, "sort": 7}, {
                "id": 320581,
                "name": "常熟市",
                "parent_id": 320500,
                "sort": 8
            }, {"id": 320582, "name": "张家港市", "parent_id": 320500, "sort": 9}, {
                "id": 320583,
                "name": "昆山市",
                "parent_id": 320500,
                "sort": 10
            }, {"id": 320584, "name": "吴江市", "parent_id": 320500, "sort": 11}, {
                "id": 320585,
                "name": "太仓市",
                "parent_id": 320500,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 320600,
            "name": "南通市",
            "parent_id": 320000,
            "sort": 6,
            "sub": [{"id": 320601, "name": "市辖区", "parent_id": 320600, "sort": 1}, {
                "id": 320602,
                "name": "崇川区",
                "parent_id": 320600,
                "sort": 2
            }, {"id": 320611, "name": "港闸区", "parent_id": 320600, "sort": 3}, {
                "id": 320621,
                "name": "海安县",
                "parent_id": 320600,
                "sort": 4
            }, {"id": 320623, "name": "如东县", "parent_id": 320600, "sort": 5}, {
                "id": 320681,
                "name": "启东市",
                "parent_id": 320600,
                "sort": 6
            }, {"id": 320682, "name": "如皋市", "parent_id": 320600, "sort": 7}, {
                "id": 320683,
                "name": "通州市",
                "parent_id": 320600,
                "sort": 8
            }, {"id": 320684, "name": "海门市", "parent_id": 320600, "sort": 9}],
            "type": 0
        }, {
            "id": 320700,
            "name": "连云港市",
            "parent_id": 320000,
            "sort": 7,
            "sub": [{"id": 320701, "name": "市辖区", "parent_id": 320700, "sort": 1}, {
                "id": 320703,
                "name": "连云区",
                "parent_id": 320700,
                "sort": 2
            }, {"id": 320705, "name": "新浦区", "parent_id": 320700, "sort": 3}, {
                "id": 320706,
                "name": "海州区",
                "parent_id": 320700,
                "sort": 4
            }, {"id": 320721, "name": "赣榆县", "parent_id": 320700, "sort": 5}, {
                "id": 320722,
                "name": "东海县",
                "parent_id": 320700,
                "sort": 6
            }, {"id": 320723, "name": "灌云县", "parent_id": 320700, "sort": 7}, {
                "id": 320724,
                "name": "灌南县",
                "parent_id": 320700,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 320800,
            "name": "淮安市",
            "parent_id": 320000,
            "sort": 8,
            "sub": [{"id": 320801, "name": "市辖区", "parent_id": 320800, "sort": 1}, {
                "id": 320802,
                "name": "清河区",
                "parent_id": 320800,
                "sort": 2
            }, {"id": 320803, "name": "楚州区", "parent_id": 320800, "sort": 3}, {
                "id": 320804,
                "name": "淮阴区",
                "parent_id": 320800,
                "sort": 4
            }, {"id": 320811, "name": "清浦区", "parent_id": 320800, "sort": 5}, {
                "id": 320826,
                "name": "涟水县",
                "parent_id": 320800,
                "sort": 6
            }, {"id": 320829, "name": "洪泽县", "parent_id": 320800, "sort": 7}, {
                "id": 320830,
                "name": "盱眙县",
                "parent_id": 320800,
                "sort": 8
            }, {"id": 320831, "name": "金湖县", "parent_id": 320800, "sort": 9}],
            "type": 0
        }, {
            "id": 320900,
            "name": "盐城市",
            "parent_id": 320000,
            "sort": 9,
            "sub": [{"id": 320901, "name": "市辖区", "parent_id": 320900, "sort": 1}, {
                "id": 320902,
                "name": "亭湖区",
                "parent_id": 320900,
                "sort": 2
            }, {"id": 320903, "name": "盐都区", "parent_id": 320900, "sort": 3}, {
                "id": 320921,
                "name": "响水县",
                "parent_id": 320900,
                "sort": 4
            }, {"id": 320922, "name": "滨海县", "parent_id": 320900, "sort": 5}, {
                "id": 320923,
                "name": "阜宁县",
                "parent_id": 320900,
                "sort": 6
            }, {"id": 320924, "name": "射阳县", "parent_id": 320900, "sort": 7}, {
                "id": 320925,
                "name": "建湖县",
                "parent_id": 320900,
                "sort": 8
            }, {"id": 320981, "name": "东台市", "parent_id": 320900, "sort": 9}, {
                "id": 320982,
                "name": "大丰市",
                "parent_id": 320900,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 321000,
            "name": "扬州市",
            "parent_id": 320000,
            "sort": 10,
            "sub": [{"id": 321001, "name": "市辖区", "parent_id": 321000, "sort": 1}, {
                "id": 321002,
                "name": "广陵区",
                "parent_id": 321000,
                "sort": 2
            }, {"id": 321003, "name": "邗江区", "parent_id": 321000, "sort": 3}, {
                "id": 321011,
                "name": "郊　区",
                "parent_id": 321000,
                "sort": 4
            }, {"id": 321023, "name": "宝应县", "parent_id": 321000, "sort": 5}, {
                "id": 321081,
                "name": "仪征市",
                "parent_id": 321000,
                "sort": 6
            }, {"id": 321084, "name": "高邮市", "parent_id": 321000, "sort": 7}, {
                "id": 321088,
                "name": "江都市",
                "parent_id": 321000,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 321100,
            "name": "镇江市",
            "parent_id": 320000,
            "sort": 11,
            "sub": [{"id": 321101, "name": "市辖区", "parent_id": 321100, "sort": 1}, {
                "id": 321102,
                "name": "京口区",
                "parent_id": 321100,
                "sort": 2
            }, {"id": 321111, "name": "润州区", "parent_id": 321100, "sort": 3}, {
                "id": 321112,
                "name": "丹徒区",
                "parent_id": 321100,
                "sort": 4
            }, {"id": 321181, "name": "丹阳市", "parent_id": 321100, "sort": 5}, {
                "id": 321182,
                "name": "扬中市",
                "parent_id": 321100,
                "sort": 6
            }, {"id": 321183, "name": "句容市", "parent_id": 321100, "sort": 7}],
            "type": 0
        }, {
            "id": 321200,
            "name": "泰州市",
            "parent_id": 320000,
            "sort": 12,
            "sub": [{"id": 321201, "name": "市辖区", "parent_id": 321200, "sort": 1}, {
                "id": 321202,
                "name": "海陵区",
                "parent_id": 321200,
                "sort": 2
            }, {"id": 321203, "name": "高港区", "parent_id": 321200, "sort": 3}, {
                "id": 321281,
                "name": "兴化市",
                "parent_id": 321200,
                "sort": 4
            }, {"id": 321282, "name": "靖江市", "parent_id": 321200, "sort": 5}, {
                "id": 321283,
                "name": "泰兴市",
                "parent_id": 321200,
                "sort": 6
            }, {"id": 321284, "name": "姜堰市", "parent_id": 321200, "sort": 7}],
            "type": 0
        }, {
            "id": 321300,
            "name": "宿迁市",
            "parent_id": 320000,
            "sort": 13,
            "sub": [{"id": 321301, "name": "市辖区", "parent_id": 321300, "sort": 1}, {
                "id": 321302,
                "name": "宿城区",
                "parent_id": 321300,
                "sort": 2
            }, {"id": 321311, "name": "宿豫区", "parent_id": 321300, "sort": 3}, {
                "id": 321322,
                "name": "沭阳县",
                "parent_id": 321300,
                "sort": 4
            }, {"id": 321323, "name": "泗阳县", "parent_id": 321300, "sort": 5}, {
                "id": 321324,
                "name": "泗洪县",
                "parent_id": 321300,
                "sort": 6
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 330000,
        "name": "浙江省",
        "parent_id": 0,
        "sort": 11,
        "sub": [{
            "id": 330100,
            "name": "杭州市",
            "parent_id": 330000,
            "sort": 1,
            "sub": [{"id": 330101, "name": "市辖区", "parent_id": 330100, "sort": 1}, {
                "id": 330102,
                "name": "上城区",
                "parent_id": 330100,
                "sort": 2
            }, {"id": 330103, "name": "下城区", "parent_id": 330100, "sort": 3}, {
                "id": 330104,
                "name": "江干区",
                "parent_id": 330100,
                "sort": 4
            }, {"id": 330105, "name": "拱墅区", "parent_id": 330100, "sort": 5}, {
                "id": 330106,
                "name": "西湖区",
                "parent_id": 330100,
                "sort": 6
            }, {"id": 330108, "name": "滨江区", "parent_id": 330100, "sort": 7}, {
                "id": 330109,
                "name": "萧山区",
                "parent_id": 330100,
                "sort": 8
            }, {"id": 330110, "name": "余杭区", "parent_id": 330100, "sort": 9}, {
                "id": 330122,
                "name": "桐庐县",
                "parent_id": 330100,
                "sort": 10
            }, {"id": 330127, "name": "淳安县", "parent_id": 330100, "sort": 11}, {
                "id": 330182,
                "name": "建德市",
                "parent_id": 330100,
                "sort": 12
            }, {"id": 330183, "name": "富阳市", "parent_id": 330100, "sort": 13}, {
                "id": 330185,
                "name": "临安市",
                "parent_id": 330100,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 330200,
            "name": "宁波市",
            "parent_id": 330000,
            "sort": 2,
            "sub": [{"id": 330201, "name": "市辖区", "parent_id": 330200, "sort": 1}, {
                "id": 330203,
                "name": "海曙区",
                "parent_id": 330200,
                "sort": 2
            }, {"id": 330204, "name": "江东区", "parent_id": 330200, "sort": 3}, {
                "id": 330205,
                "name": "江北区",
                "parent_id": 330200,
                "sort": 4
            }, {"id": 330206, "name": "北仑区", "parent_id": 330200, "sort": 5}, {
                "id": 330211,
                "name": "镇海区",
                "parent_id": 330200,
                "sort": 6
            }, {"id": 330212, "name": "鄞州区", "parent_id": 330200, "sort": 7}, {
                "id": 330225,
                "name": "象山县",
                "parent_id": 330200,
                "sort": 8
            }, {"id": 330226, "name": "宁海县", "parent_id": 330200, "sort": 9}, {
                "id": 330281,
                "name": "余姚市",
                "parent_id": 330200,
                "sort": 10
            }, {"id": 330282, "name": "慈溪市", "parent_id": 330200, "sort": 11}, {
                "id": 330283,
                "name": "奉化市",
                "parent_id": 330200,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 330300,
            "name": "温州市",
            "parent_id": 330000,
            "sort": 3,
            "sub": [{"id": 330301, "name": "市辖区", "parent_id": 330300, "sort": 1}, {
                "id": 330302,
                "name": "鹿城区",
                "parent_id": 330300,
                "sort": 2
            }, {"id": 330303, "name": "龙湾区", "parent_id": 330300, "sort": 3}, {
                "id": 330304,
                "name": "瓯海区",
                "parent_id": 330300,
                "sort": 4
            }, {"id": 330322, "name": "洞头县", "parent_id": 330300, "sort": 5}, {
                "id": 330324,
                "name": "永嘉县",
                "parent_id": 330300,
                "sort": 6
            }, {"id": 330326, "name": "平阳县", "parent_id": 330300, "sort": 7}, {
                "id": 330327,
                "name": "苍南县",
                "parent_id": 330300,
                "sort": 8
            }, {"id": 330328, "name": "文成县", "parent_id": 330300, "sort": 9}, {
                "id": 330329,
                "name": "泰顺县",
                "parent_id": 330300,
                "sort": 10
            }, {"id": 330381, "name": "瑞安市", "parent_id": 330300, "sort": 11}, {
                "id": 330382,
                "name": "乐清市",
                "parent_id": 330300,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 330400,
            "name": "嘉兴市",
            "parent_id": 330000,
            "sort": 4,
            "sub": [{"id": 330401, "name": "市辖区", "parent_id": 330400, "sort": 1}, {
                "id": 330402,
                "name": "秀城区",
                "parent_id": 330400,
                "sort": 2
            }, {"id": 330411, "name": "秀洲区", "parent_id": 330400, "sort": 3}, {
                "id": 330421,
                "name": "嘉善县",
                "parent_id": 330400,
                "sort": 4
            }, {"id": 330424, "name": "海盐县", "parent_id": 330400, "sort": 5}, {
                "id": 330481,
                "name": "海宁市",
                "parent_id": 330400,
                "sort": 6
            }, {"id": 330482, "name": "平湖市", "parent_id": 330400, "sort": 7}, {
                "id": 330483,
                "name": "桐乡市",
                "parent_id": 330400,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 330500,
            "name": "湖州市",
            "parent_id": 330000,
            "sort": 5,
            "sub": [{"id": 330501, "name": "市辖区", "parent_id": 330500, "sort": 1}, {
                "id": 330502,
                "name": "吴兴区",
                "parent_id": 330500,
                "sort": 2
            }, {"id": 330503, "name": "南浔区", "parent_id": 330500, "sort": 3}, {
                "id": 330521,
                "name": "德清县",
                "parent_id": 330500,
                "sort": 4
            }, {"id": 330522, "name": "长兴县", "parent_id": 330500, "sort": 5}, {
                "id": 330523,
                "name": "安吉县",
                "parent_id": 330500,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 330600,
            "name": "绍兴市",
            "parent_id": 330000,
            "sort": 6,
            "sub": [{"id": 330601, "name": "市辖区", "parent_id": 330600, "sort": 1}, {
                "id": 330602,
                "name": "越城区",
                "parent_id": 330600,
                "sort": 2
            }, {"id": 330621, "name": "绍兴县", "parent_id": 330600, "sort": 3}, {
                "id": 330624,
                "name": "新昌县",
                "parent_id": 330600,
                "sort": 4
            }, {"id": 330681, "name": "诸暨市", "parent_id": 330600, "sort": 5}, {
                "id": 330682,
                "name": "上虞市",
                "parent_id": 330600,
                "sort": 6
            }, {"id": 330683, "name": "嵊州市", "parent_id": 330600, "sort": 7}],
            "type": 0
        }, {
            "id": 330700,
            "name": "金华市",
            "parent_id": 330000,
            "sort": 7,
            "sub": [{"id": 330701, "name": "市辖区", "parent_id": 330700, "sort": 1}, {
                "id": 330702,
                "name": "婺城区",
                "parent_id": 330700,
                "sort": 2
            }, {"id": 330703, "name": "金东区", "parent_id": 330700, "sort": 3}, {
                "id": 330723,
                "name": "武义县",
                "parent_id": 330700,
                "sort": 4
            }, {"id": 330726, "name": "浦江县", "parent_id": 330700, "sort": 5}, {
                "id": 330727,
                "name": "磐安县",
                "parent_id": 330700,
                "sort": 6
            }, {"id": 330781, "name": "兰溪市", "parent_id": 330700, "sort": 7}, {
                "id": 330782,
                "name": "义乌市",
                "parent_id": 330700,
                "sort": 8
            }, {"id": 330783, "name": "东阳市", "parent_id": 330700, "sort": 9}, {
                "id": 330784,
                "name": "永康市",
                "parent_id": 330700,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 330800,
            "name": "衢州市",
            "parent_id": 330000,
            "sort": 8,
            "sub": [{"id": 330801, "name": "市辖区", "parent_id": 330800, "sort": 1}, {
                "id": 330802,
                "name": "柯城区",
                "parent_id": 330800,
                "sort": 2
            }, {"id": 330803, "name": "衢江区", "parent_id": 330800, "sort": 3}, {
                "id": 330822,
                "name": "常山县",
                "parent_id": 330800,
                "sort": 4
            }, {"id": 330824, "name": "开化县", "parent_id": 330800, "sort": 5}, {
                "id": 330825,
                "name": "龙游县",
                "parent_id": 330800,
                "sort": 6
            }, {"id": 330881, "name": "江山市", "parent_id": 330800, "sort": 7}],
            "type": 0
        }, {
            "id": 330900,
            "name": "舟山市",
            "parent_id": 330000,
            "sort": 9,
            "sub": [{"id": 330901, "name": "市辖区", "parent_id": 330900, "sort": 1}, {
                "id": 330902,
                "name": "定海区",
                "parent_id": 330900,
                "sort": 2
            }, {"id": 330903, "name": "普陀区", "parent_id": 330900, "sort": 3}, {
                "id": 330921,
                "name": "岱山县",
                "parent_id": 330900,
                "sort": 4
            }, {"id": 330922, "name": "嵊泗县", "parent_id": 330900, "sort": 5}],
            "type": 0
        }, {
            "id": 331000,
            "name": "台州市",
            "parent_id": 330000,
            "sort": 10,
            "sub": [{"id": 331001, "name": "市辖区", "parent_id": 331000, "sort": 1}, {
                "id": 331002,
                "name": "椒江区",
                "parent_id": 331000,
                "sort": 2
            }, {"id": 331003, "name": "黄岩区", "parent_id": 331000, "sort": 3}, {
                "id": 331004,
                "name": "路桥区",
                "parent_id": 331000,
                "sort": 4
            }, {"id": 331021, "name": "玉环县", "parent_id": 331000, "sort": 5}, {
                "id": 331022,
                "name": "三门县",
                "parent_id": 331000,
                "sort": 6
            }, {"id": 331023, "name": "天台县", "parent_id": 331000, "sort": 7}, {
                "id": 331024,
                "name": "仙居县",
                "parent_id": 331000,
                "sort": 8
            }, {"id": 331081, "name": "温岭市", "parent_id": 331000, "sort": 9}, {
                "id": 331082,
                "name": "临海市",
                "parent_id": 331000,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 331100,
            "name": "丽水市",
            "parent_id": 330000,
            "sort": 11,
            "sub": [{"id": 331101, "name": "市辖区", "parent_id": 331100, "sort": 1}, {
                "id": 331102,
                "name": "莲都区",
                "parent_id": 331100,
                "sort": 2
            }, {"id": 331121, "name": "青田县", "parent_id": 331100, "sort": 3}, {
                "id": 331122,
                "name": "缙云县",
                "parent_id": 331100,
                "sort": 4
            }, {"id": 331123, "name": "遂昌县", "parent_id": 331100, "sort": 5}, {
                "id": 331124,
                "name": "松阳县",
                "parent_id": 331100,
                "sort": 6
            }, {"id": 331125, "name": "云和县", "parent_id": 331100, "sort": 7}, {
                "id": 331126,
                "name": "庆元县",
                "parent_id": 331100,
                "sort": 8
            }, {"id": 331127, "name": "景宁畲族自治县", "parent_id": 331100, "sort": 9}, {
                "id": 331181,
                "name": "龙泉市",
                "parent_id": 331100,
                "sort": 10
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 340000,
        "name": "安徽省",
        "parent_id": 0,
        "sort": 12,
        "sub": [{
            "id": 340100,
            "name": "合肥市",
            "parent_id": 340000,
            "sort": 1,
            "sub": [{"id": 340101, "name": "市辖区", "parent_id": 340100, "sort": 1}, {
                "id": 340102,
                "name": "瑶海区",
                "parent_id": 340100,
                "sort": 2
            }, {"id": 340103, "name": "庐阳区", "parent_id": 340100, "sort": 3}, {
                "id": 340104,
                "name": "蜀山区",
                "parent_id": 340100,
                "sort": 4
            }, {"id": 340111, "name": "包河区", "parent_id": 340100, "sort": 5}, {
                "id": 340121,
                "name": "长丰县",
                "parent_id": 340100,
                "sort": 6
            }, {"id": 340122, "name": "肥东县", "parent_id": 340100, "sort": 7}, {
                "id": 340123,
                "name": "肥西县",
                "parent_id": 340100,
                "sort": 8
            }, {"id": 341401, "name": "庐江县", "parent_id": 340100, "sort": 9}, {
                "id": 341402,
                "name": "巢湖市",
                "parent_id": 340100,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 340200,
            "name": "芜湖市",
            "parent_id": 340000,
            "sort": 2,
            "sub": [{"id": 340201, "name": "市辖区", "parent_id": 340200, "sort": 1}, {
                "id": 340202,
                "name": "镜湖区",
                "parent_id": 340200,
                "sort": 2
            }, {"id": 340203, "name": "马塘区", "parent_id": 340200, "sort": 3}, {
                "id": 340204,
                "name": "新芜区",
                "parent_id": 340200,
                "sort": 4
            }, {"id": 340207, "name": "鸠江区", "parent_id": 340200, "sort": 5}, {
                "id": 340221,
                "name": "芜湖县",
                "parent_id": 340200,
                "sort": 6
            }, {"id": 340222, "name": "繁昌县", "parent_id": 340200, "sort": 7}, {
                "id": 340223,
                "name": "南陵县",
                "parent_id": 340200,
                "sort": 8
            }, {"id": 341422, "name": "无为县", "parent_id": 340200, "sort": 9}],
            "type": 0
        }, {
            "id": 340300,
            "name": "蚌埠市",
            "parent_id": 340000,
            "sort": 3,
            "sub": [{"id": 340301, "name": "市辖区", "parent_id": 340300, "sort": 1}, {
                "id": 340302,
                "name": "龙子湖区",
                "parent_id": 340300,
                "sort": 2
            }, {"id": 340303, "name": "蚌山区", "parent_id": 340300, "sort": 3}, {
                "id": 340304,
                "name": "禹会区",
                "parent_id": 340300,
                "sort": 4
            }, {"id": 340311, "name": "淮上区", "parent_id": 340300, "sort": 5}, {
                "id": 340321,
                "name": "怀远县",
                "parent_id": 340300,
                "sort": 6
            }, {"id": 340322, "name": "五河县", "parent_id": 340300, "sort": 7}, {
                "id": 340323,
                "name": "固镇县",
                "parent_id": 340300,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 340400,
            "name": "淮南市",
            "parent_id": 340000,
            "sort": 4,
            "sub": [{"id": 340401, "name": "市辖区", "parent_id": 340400, "sort": 1}, {
                "id": 340402,
                "name": "大通区",
                "parent_id": 340400,
                "sort": 2
            }, {"id": 340403, "name": "田家庵区", "parent_id": 340400, "sort": 3}, {
                "id": 340404,
                "name": "谢家集区",
                "parent_id": 340400,
                "sort": 4
            }, {"id": 340405, "name": "八公山区", "parent_id": 340400, "sort": 5}, {
                "id": 340406,
                "name": "潘集区",
                "parent_id": 340400,
                "sort": 6
            }, {"id": 340421, "name": "凤台县", "parent_id": 340400, "sort": 7}],
            "type": 0
        }, {
            "id": 340500,
            "name": "马鞍山市",
            "parent_id": 340000,
            "sort": 5,
            "sub": [{"id": 340501, "name": "市辖区", "parent_id": 340500, "sort": 1}, {
                "id": 340502,
                "name": "金家庄区",
                "parent_id": 340500,
                "sort": 2
            }, {"id": 340503, "name": "花山区", "parent_id": 340500, "sort": 3}, {
                "id": 340504,
                "name": "雨山区",
                "parent_id": 340500,
                "sort": 4
            }, {"id": 340521, "name": "当涂县", "parent_id": 340500, "sort": 5}, {
                "id": 341423,
                "name": "含山县",
                "parent_id": 340500,
                "sort": 6
            }, {"id": 341424, "name": "和　县", "parent_id": 340500, "sort": 7}],
            "type": 0
        }, {
            "id": 340600,
            "name": "淮北市",
            "parent_id": 340000,
            "sort": 6,
            "sub": [{"id": 340601, "name": "市辖区", "parent_id": 340600, "sort": 1}, {
                "id": 340602,
                "name": "杜集区",
                "parent_id": 340600,
                "sort": 2
            }, {"id": 340603, "name": "相山区", "parent_id": 340600, "sort": 3}, {
                "id": 340604,
                "name": "烈山区",
                "parent_id": 340600,
                "sort": 4
            }, {"id": 340621, "name": "濉溪县", "parent_id": 340600, "sort": 5}],
            "type": 0
        }, {
            "id": 340700,
            "name": "铜陵市",
            "parent_id": 340000,
            "sort": 7,
            "sub": [{"id": 340701, "name": "市辖区", "parent_id": 340700, "sort": 1}, {
                "id": 340702,
                "name": "铜官山区",
                "parent_id": 340700,
                "sort": 2
            }, {"id": 340703, "name": "狮子山区", "parent_id": 340700, "sort": 3}, {
                "id": 340711,
                "name": "郊　区",
                "parent_id": 340700,
                "sort": 4
            }, {"id": 340721, "name": "铜陵县", "parent_id": 340700, "sort": 5}],
            "type": 0
        }, {
            "id": 340800,
            "name": "安庆市",
            "parent_id": 340000,
            "sort": 8,
            "sub": [{"id": 340801, "name": "市辖区", "parent_id": 340800, "sort": 1}, {
                "id": 340802,
                "name": "迎江区",
                "parent_id": 340800,
                "sort": 2
            }, {"id": 340803, "name": "大观区", "parent_id": 340800, "sort": 3}, {
                "id": 340811,
                "name": "郊　区",
                "parent_id": 340800,
                "sort": 4
            }, {"id": 340822, "name": "怀宁县", "parent_id": 340800, "sort": 5}, {
                "id": 340823,
                "name": "枞阳县",
                "parent_id": 340800,
                "sort": 6
            }, {"id": 340824, "name": "潜山县", "parent_id": 340800, "sort": 7}, {
                "id": 340825,
                "name": "太湖县",
                "parent_id": 340800,
                "sort": 8
            }, {"id": 340826, "name": "宿松县", "parent_id": 340800, "sort": 9}, {
                "id": 340827,
                "name": "望江县",
                "parent_id": 340800,
                "sort": 10
            }, {"id": 340828, "name": "岳西县", "parent_id": 340800, "sort": 11}, {
                "id": 340881,
                "name": "桐城市",
                "parent_id": 340800,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 341000,
            "name": "黄山市",
            "parent_id": 340000,
            "sort": 9,
            "sub": [{"id": 341001, "name": "市辖区", "parent_id": 341000, "sort": 1}, {
                "id": 341002,
                "name": "屯溪区",
                "parent_id": 341000,
                "sort": 2
            }, {"id": 341003, "name": "黄山区", "parent_id": 341000, "sort": 3}, {
                "id": 341004,
                "name": "徽州区",
                "parent_id": 341000,
                "sort": 4
            }, {"id": 341021, "name": "歙　县", "parent_id": 341000, "sort": 5}, {
                "id": 341022,
                "name": "休宁县",
                "parent_id": 341000,
                "sort": 6
            }, {"id": 341023, "name": "黟　县", "parent_id": 341000, "sort": 7}, {
                "id": 341024,
                "name": "祁门县",
                "parent_id": 341000,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 341100,
            "name": "滁州市",
            "parent_id": 340000,
            "sort": 10,
            "sub": [{"id": 341101, "name": "市辖区", "parent_id": 341100, "sort": 1}, {
                "id": 341102,
                "name": "琅琊区",
                "parent_id": 341100,
                "sort": 2
            }, {"id": 341103, "name": "南谯区", "parent_id": 341100, "sort": 3}, {
                "id": 341122,
                "name": "来安县",
                "parent_id": 341100,
                "sort": 4
            }, {"id": 341124, "name": "全椒县", "parent_id": 341100, "sort": 5}, {
                "id": 341125,
                "name": "定远县",
                "parent_id": 341100,
                "sort": 6
            }, {"id": 341126, "name": "凤阳县", "parent_id": 341100, "sort": 7}, {
                "id": 341181,
                "name": "天长市",
                "parent_id": 341100,
                "sort": 8
            }, {"id": 341182, "name": "明光市", "parent_id": 341100, "sort": 9}],
            "type": 0
        }, {
            "id": 341200,
            "name": "阜阳市",
            "parent_id": 340000,
            "sort": 11,
            "sub": [{"id": 341201, "name": "市辖区", "parent_id": 341200, "sort": 1}, {
                "id": 341202,
                "name": "颍州区",
                "parent_id": 341200,
                "sort": 2
            }, {"id": 341203, "name": "颍东区", "parent_id": 341200, "sort": 3}, {
                "id": 341204,
                "name": "颍泉区",
                "parent_id": 341200,
                "sort": 4
            }, {"id": 341221, "name": "临泉县", "parent_id": 341200, "sort": 5}, {
                "id": 341222,
                "name": "太和县",
                "parent_id": 341200,
                "sort": 6
            }, {"id": 341225, "name": "阜南县", "parent_id": 341200, "sort": 7}, {
                "id": 341226,
                "name": "颍上县",
                "parent_id": 341200,
                "sort": 8
            }, {"id": 341282, "name": "界首市", "parent_id": 341200, "sort": 9}],
            "type": 0
        }, {
            "id": 341300,
            "name": "宿州市",
            "parent_id": 340000,
            "sort": 12,
            "sub": [{"id": 341301, "name": "市辖区", "parent_id": 341300, "sort": 1}, {
                "id": 341302,
                "name": "墉桥区",
                "parent_id": 341300,
                "sort": 2
            }, {"id": 341321, "name": "砀山县", "parent_id": 341300, "sort": 3}, {
                "id": 341322,
                "name": "萧　县",
                "parent_id": 341300,
                "sort": 4
            }, {"id": 341323, "name": "灵璧县", "parent_id": 341300, "sort": 5}, {
                "id": 341324,
                "name": "泗　县",
                "parent_id": 341300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 341500,
            "name": "六安市",
            "parent_id": 340000,
            "sort": 13,
            "sub": [{"id": 341501, "name": "市辖区", "parent_id": 341500, "sort": 1}, {
                "id": 341502,
                "name": "金安区",
                "parent_id": 341500,
                "sort": 2
            }, {"id": 341503, "name": "裕安区", "parent_id": 341500, "sort": 3}, {
                "id": 341521,
                "name": "寿　县",
                "parent_id": 341500,
                "sort": 4
            }, {"id": 341522, "name": "霍邱县", "parent_id": 341500, "sort": 5}, {
                "id": 341523,
                "name": "舒城县",
                "parent_id": 341500,
                "sort": 6
            }, {"id": 341524, "name": "金寨县", "parent_id": 341500, "sort": 7}, {
                "id": 341525,
                "name": "霍山县",
                "parent_id": 341500,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 341600,
            "name": "亳州市",
            "parent_id": 340000,
            "sort": 14,
            "sub": [{"id": 341601, "name": "市辖区", "parent_id": 341600, "sort": 1}, {
                "id": 341602,
                "name": "谯城区",
                "parent_id": 341600,
                "sort": 2
            }, {"id": 341621, "name": "涡阳县", "parent_id": 341600, "sort": 3}, {
                "id": 341622,
                "name": "蒙城县",
                "parent_id": 341600,
                "sort": 4
            }, {"id": 341623, "name": "利辛县", "parent_id": 341600, "sort": 5}],
            "type": 0
        }, {
            "id": 341700,
            "name": "池州市",
            "parent_id": 340000,
            "sort": 15,
            "sub": [{"id": 341701, "name": "市辖区", "parent_id": 341700, "sort": 1}, {
                "id": 341702,
                "name": "贵池区",
                "parent_id": 341700,
                "sort": 2
            }, {"id": 341721, "name": "东至县", "parent_id": 341700, "sort": 3}, {
                "id": 341722,
                "name": "石台县",
                "parent_id": 341700,
                "sort": 4
            }, {"id": 341723, "name": "青阳县", "parent_id": 341700, "sort": 5}],
            "type": 0
        }, {
            "id": 341800,
            "name": "宣城市",
            "parent_id": 340000,
            "sort": 16,
            "sub": [{"id": 341801, "name": "市辖区", "parent_id": 341800, "sort": 1}, {
                "id": 341802,
                "name": "宣州区",
                "parent_id": 341800,
                "sort": 2
            }, {"id": 341821, "name": "郎溪县", "parent_id": 341800, "sort": 3}, {
                "id": 341822,
                "name": "广德县",
                "parent_id": 341800,
                "sort": 4
            }, {"id": 341823, "name": "泾　县", "parent_id": 341800, "sort": 5}, {
                "id": 341824,
                "name": "绩溪县",
                "parent_id": 341800,
                "sort": 6
            }, {"id": 341825, "name": "旌德县", "parent_id": 341800, "sort": 7}, {
                "id": 341881,
                "name": "宁国市",
                "parent_id": 341800,
                "sort": 8
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 350000,
        "name": "福建省",
        "parent_id": 0,
        "sort": 13,
        "sub": [{
            "id": 350100,
            "name": "福州市",
            "parent_id": 350000,
            "sort": 1,
            "sub": [{"id": 350101, "name": "市辖区", "parent_id": 350100, "sort": 1}, {
                "id": 350102,
                "name": "鼓楼区",
                "parent_id": 350100,
                "sort": 2
            }, {"id": 350103, "name": "台江区", "parent_id": 350100, "sort": 3}, {
                "id": 350104,
                "name": "仓山区",
                "parent_id": 350100,
                "sort": 4
            }, {"id": 350105, "name": "马尾区", "parent_id": 350100, "sort": 5}, {
                "id": 350111,
                "name": "晋安区",
                "parent_id": 350100,
                "sort": 6
            }, {"id": 350121, "name": "闽侯县", "parent_id": 350100, "sort": 7}, {
                "id": 350122,
                "name": "连江县",
                "parent_id": 350100,
                "sort": 8
            }, {"id": 350123, "name": "罗源县", "parent_id": 350100, "sort": 9}, {
                "id": 350124,
                "name": "闽清县",
                "parent_id": 350100,
                "sort": 10
            }, {"id": 350125, "name": "永泰县", "parent_id": 350100, "sort": 11}, {
                "id": 350128,
                "name": "平潭县",
                "parent_id": 350100,
                "sort": 12
            }, {"id": 350181, "name": "福清市", "parent_id": 350100, "sort": 13}, {
                "id": 350182,
                "name": "长乐市",
                "parent_id": 350100,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 350200,
            "name": "厦门市",
            "parent_id": 350000,
            "sort": 2,
            "sub": [{"id": 350201, "name": "市辖区", "parent_id": 350200, "sort": 1}, {
                "id": 350203,
                "name": "思明区",
                "parent_id": 350200,
                "sort": 2
            }, {"id": 350205, "name": "海沧区", "parent_id": 350200, "sort": 3}, {
                "id": 350206,
                "name": "湖里区",
                "parent_id": 350200,
                "sort": 4
            }, {"id": 350211, "name": "集美区", "parent_id": 350200, "sort": 5}, {
                "id": 350212,
                "name": "同安区",
                "parent_id": 350200,
                "sort": 6
            }, {"id": 350213, "name": "翔安区", "parent_id": 350200, "sort": 7}],
            "type": 0
        }, {
            "id": 350300,
            "name": "莆田市",
            "parent_id": 350000,
            "sort": 3,
            "sub": [{"id": 350301, "name": "市辖区", "parent_id": 350300, "sort": 1}, {
                "id": 350302,
                "name": "城厢区",
                "parent_id": 350300,
                "sort": 2
            }, {"id": 350303, "name": "涵江区", "parent_id": 350300, "sort": 3}, {
                "id": 350304,
                "name": "荔城区",
                "parent_id": 350300,
                "sort": 4
            }, {"id": 350305, "name": "秀屿区", "parent_id": 350300, "sort": 5}, {
                "id": 350322,
                "name": "仙游县",
                "parent_id": 350300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 350400,
            "name": "三明市",
            "parent_id": 350000,
            "sort": 4,
            "sub": [{"id": 350401, "name": "市辖区", "parent_id": 350400, "sort": 1}, {
                "id": 350402,
                "name": "梅列区",
                "parent_id": 350400,
                "sort": 2
            }, {"id": 350403, "name": "三元区", "parent_id": 350400, "sort": 3}, {
                "id": 350421,
                "name": "明溪县",
                "parent_id": 350400,
                "sort": 4
            }, {"id": 350423, "name": "清流县", "parent_id": 350400, "sort": 5}, {
                "id": 350424,
                "name": "宁化县",
                "parent_id": 350400,
                "sort": 6
            }, {"id": 350425, "name": "大田县", "parent_id": 350400, "sort": 7}, {
                "id": 350426,
                "name": "尤溪县",
                "parent_id": 350400,
                "sort": 8
            }, {"id": 350427, "name": "沙　县", "parent_id": 350400, "sort": 9}, {
                "id": 350428,
                "name": "将乐县",
                "parent_id": 350400,
                "sort": 10
            }, {"id": 350429, "name": "泰宁县", "parent_id": 350400, "sort": 11}, {
                "id": 350430,
                "name": "建宁县",
                "parent_id": 350400,
                "sort": 12
            }, {"id": 350481, "name": "永安市", "parent_id": 350400, "sort": 13}],
            "type": 0
        }, {
            "id": 350500,
            "name": "泉州市",
            "parent_id": 350000,
            "sort": 5,
            "sub": [{"id": 350501, "name": "市辖区", "parent_id": 350500, "sort": 1}, {
                "id": 350502,
                "name": "鲤城区",
                "parent_id": 350500,
                "sort": 2
            }, {"id": 350503, "name": "丰泽区", "parent_id": 350500, "sort": 3}, {
                "id": 350504,
                "name": "洛江区",
                "parent_id": 350500,
                "sort": 4
            }, {"id": 350505, "name": "泉港区", "parent_id": 350500, "sort": 5}, {
                "id": 350521,
                "name": "惠安县",
                "parent_id": 350500,
                "sort": 6
            }, {"id": 350524, "name": "安溪县", "parent_id": 350500, "sort": 7}, {
                "id": 350525,
                "name": "永春县",
                "parent_id": 350500,
                "sort": 8
            }, {"id": 350526, "name": "德化县", "parent_id": 350500, "sort": 9}, {
                "id": 350527,
                "name": "金门县",
                "parent_id": 350500,
                "sort": 10
            }, {"id": 350581, "name": "石狮市", "parent_id": 350500, "sort": 11}, {
                "id": 350582,
                "name": "晋江市",
                "parent_id": 350500,
                "sort": 12
            }, {"id": 350583, "name": "南安市", "parent_id": 350500, "sort": 13}],
            "type": 0
        }, {
            "id": 350600,
            "name": "漳州市",
            "parent_id": 350000,
            "sort": 6,
            "sub": [{"id": 350601, "name": "市辖区", "parent_id": 350600, "sort": 1}, {
                "id": 350602,
                "name": "芗城区",
                "parent_id": 350600,
                "sort": 2
            }, {"id": 350603, "name": "龙文区", "parent_id": 350600, "sort": 3}, {
                "id": 350622,
                "name": "云霄县",
                "parent_id": 350600,
                "sort": 4
            }, {"id": 350623, "name": "漳浦县", "parent_id": 350600, "sort": 5}, {
                "id": 350624,
                "name": "诏安县",
                "parent_id": 350600,
                "sort": 6
            }, {"id": 350625, "name": "长泰县", "parent_id": 350600, "sort": 7}, {
                "id": 350626,
                "name": "东山县",
                "parent_id": 350600,
                "sort": 8
            }, {"id": 350627, "name": "南靖县", "parent_id": 350600, "sort": 9}, {
                "id": 350628,
                "name": "平和县",
                "parent_id": 350600,
                "sort": 10
            }, {"id": 350629, "name": "华安县", "parent_id": 350600, "sort": 11}, {
                "id": 350681,
                "name": "龙海市",
                "parent_id": 350600,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 350700,
            "name": "南平市",
            "parent_id": 350000,
            "sort": 7,
            "sub": [{"id": 350701, "name": "市辖区", "parent_id": 350700, "sort": 1}, {
                "id": 350702,
                "name": "延平区",
                "parent_id": 350700,
                "sort": 2
            }, {"id": 350721, "name": "顺昌县", "parent_id": 350700, "sort": 3}, {
                "id": 350722,
                "name": "浦城县",
                "parent_id": 350700,
                "sort": 4
            }, {"id": 350723, "name": "光泽县", "parent_id": 350700, "sort": 5}, {
                "id": 350724,
                "name": "松溪县",
                "parent_id": 350700,
                "sort": 6
            }, {"id": 350725, "name": "政和县", "parent_id": 350700, "sort": 7}, {
                "id": 350781,
                "name": "邵武市",
                "parent_id": 350700,
                "sort": 8
            }, {"id": 350782, "name": "武夷山市", "parent_id": 350700, "sort": 9}, {
                "id": 350783,
                "name": "建瓯市",
                "parent_id": 350700,
                "sort": 10
            }, {"id": 350784, "name": "建阳市", "parent_id": 350700, "sort": 11}],
            "type": 0
        }, {
            "id": 350800,
            "name": "龙岩市",
            "parent_id": 350000,
            "sort": 8,
            "sub": [{"id": 350801, "name": "市辖区", "parent_id": 350800, "sort": 1}, {
                "id": 350802,
                "name": "新罗区",
                "parent_id": 350800,
                "sort": 2
            }, {"id": 350821, "name": "长汀县", "parent_id": 350800, "sort": 3}, {
                "id": 350822,
                "name": "永定县",
                "parent_id": 350800,
                "sort": 4
            }, {"id": 350823, "name": "上杭县", "parent_id": 350800, "sort": 5}, {
                "id": 350824,
                "name": "武平县",
                "parent_id": 350800,
                "sort": 6
            }, {"id": 350825, "name": "连城县", "parent_id": 350800, "sort": 7}, {
                "id": 350881,
                "name": "漳平市",
                "parent_id": 350800,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 350900,
            "name": "宁德市",
            "parent_id": 350000,
            "sort": 9,
            "sub": [{"id": 350901, "name": "市辖区", "parent_id": 350900, "sort": 1}, {
                "id": 350902,
                "name": "蕉城区",
                "parent_id": 350900,
                "sort": 2
            }, {"id": 350921, "name": "霞浦县", "parent_id": 350900, "sort": 3}, {
                "id": 350922,
                "name": "古田县",
                "parent_id": 350900,
                "sort": 4
            }, {"id": 350923, "name": "屏南县", "parent_id": 350900, "sort": 5}, {
                "id": 350924,
                "name": "寿宁县",
                "parent_id": 350900,
                "sort": 6
            }, {"id": 350925, "name": "周宁县", "parent_id": 350900, "sort": 7}, {
                "id": 350926,
                "name": "柘荣县",
                "parent_id": 350900,
                "sort": 8
            }, {"id": 350981, "name": "福安市", "parent_id": 350900, "sort": 9}, {
                "id": 350982,
                "name": "福鼎市",
                "parent_id": 350900,
                "sort": 10
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 360000,
        "name": "江西省",
        "parent_id": 0,
        "sort": 14,
        "sub": [{
            "id": 360100,
            "name": "南昌市",
            "parent_id": 360000,
            "sort": 1,
            "sub": [{"id": 360101, "name": "市辖区", "parent_id": 360100, "sort": 1}, {
                "id": 360102,
                "name": "东湖区",
                "parent_id": 360100,
                "sort": 2
            }, {"id": 360103, "name": "西湖区", "parent_id": 360100, "sort": 3}, {
                "id": 360104,
                "name": "青云谱区",
                "parent_id": 360100,
                "sort": 4
            }, {"id": 360105, "name": "湾里区", "parent_id": 360100, "sort": 5}, {
                "id": 360111,
                "name": "青山湖区",
                "parent_id": 360100,
                "sort": 6
            }, {"id": 360121, "name": "南昌县", "parent_id": 360100, "sort": 7}, {
                "id": 360122,
                "name": "新建县",
                "parent_id": 360100,
                "sort": 8
            }, {"id": 360123, "name": "安义县", "parent_id": 360100, "sort": 9}, {
                "id": 360124,
                "name": "进贤县",
                "parent_id": 360100,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 360200,
            "name": "景德镇市",
            "parent_id": 360000,
            "sort": 2,
            "sub": [{"id": 360201, "name": "市辖区", "parent_id": 360200, "sort": 1}, {
                "id": 360202,
                "name": "昌江区",
                "parent_id": 360200,
                "sort": 2
            }, {"id": 360203, "name": "珠山区", "parent_id": 360200, "sort": 3}, {
                "id": 360222,
                "name": "浮梁县",
                "parent_id": 360200,
                "sort": 4
            }, {"id": 360281, "name": "乐平市", "parent_id": 360200, "sort": 5}],
            "type": 0
        }, {
            "id": 360300,
            "name": "萍乡市",
            "parent_id": 360000,
            "sort": 3,
            "sub": [{"id": 360301, "name": "市辖区", "parent_id": 360300, "sort": 1}, {
                "id": 360302,
                "name": "安源区",
                "parent_id": 360300,
                "sort": 2
            }, {"id": 360313, "name": "湘东区", "parent_id": 360300, "sort": 3}, {
                "id": 360321,
                "name": "莲花县",
                "parent_id": 360300,
                "sort": 4
            }, {"id": 360322, "name": "上栗县", "parent_id": 360300, "sort": 5}, {
                "id": 360323,
                "name": "芦溪县",
                "parent_id": 360300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 360400,
            "name": "九江市",
            "parent_id": 360000,
            "sort": 4,
            "sub": [{"id": 360401, "name": "市辖区", "parent_id": 360400, "sort": 1}, {
                "id": 360402,
                "name": "庐山区",
                "parent_id": 360400,
                "sort": 2
            }, {"id": 360403, "name": "浔阳区", "parent_id": 360400, "sort": 3}, {
                "id": 360421,
                "name": "九江县",
                "parent_id": 360400,
                "sort": 4
            }, {"id": 360423, "name": "武宁县", "parent_id": 360400, "sort": 5}, {
                "id": 360424,
                "name": "修水县",
                "parent_id": 360400,
                "sort": 6
            }, {"id": 360425, "name": "永修县", "parent_id": 360400, "sort": 7}, {
                "id": 360426,
                "name": "德安县",
                "parent_id": 360400,
                "sort": 8
            }, {"id": 360427, "name": "星子县", "parent_id": 360400, "sort": 9}, {
                "id": 360428,
                "name": "都昌县",
                "parent_id": 360400,
                "sort": 10
            }, {"id": 360429, "name": "湖口县", "parent_id": 360400, "sort": 11}, {
                "id": 360430,
                "name": "彭泽县",
                "parent_id": 360400,
                "sort": 12
            }, {"id": 360481, "name": "瑞昌市", "parent_id": 360400, "sort": 13}],
            "type": 0
        }, {
            "id": 360500,
            "name": "新余市",
            "parent_id": 360000,
            "sort": 5,
            "sub": [{"id": 360501, "name": "市辖区", "parent_id": 360500, "sort": 1}, {
                "id": 360502,
                "name": "渝水区",
                "parent_id": 360500,
                "sort": 2
            }, {"id": 360521, "name": "分宜县", "parent_id": 360500, "sort": 3}],
            "type": 0
        }, {
            "id": 360600,
            "name": "鹰潭市",
            "parent_id": 360000,
            "sort": 6,
            "sub": [{"id": 360601, "name": "市辖区", "parent_id": 360600, "sort": 1}, {
                "id": 360602,
                "name": "月湖区",
                "parent_id": 360600,
                "sort": 2
            }, {"id": 360622, "name": "余江县", "parent_id": 360600, "sort": 3}, {
                "id": 360681,
                "name": "贵溪市",
                "parent_id": 360600,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 360700,
            "name": "赣州市",
            "parent_id": 360000,
            "sort": 7,
            "sub": [{"id": 360701, "name": "市辖区", "parent_id": 360700, "sort": 1}, {
                "id": 360702,
                "name": "章贡区",
                "parent_id": 360700,
                "sort": 2
            }, {"id": 360721, "name": "赣　县", "parent_id": 360700, "sort": 3}, {
                "id": 360722,
                "name": "信丰县",
                "parent_id": 360700,
                "sort": 4
            }, {"id": 360723, "name": "大余县", "parent_id": 360700, "sort": 5}, {
                "id": 360724,
                "name": "上犹县",
                "parent_id": 360700,
                "sort": 6
            }, {"id": 360725, "name": "崇义县", "parent_id": 360700, "sort": 7}, {
                "id": 360726,
                "name": "安远县",
                "parent_id": 360700,
                "sort": 8
            }, {"id": 360727, "name": "龙南县", "parent_id": 360700, "sort": 9}, {
                "id": 360728,
                "name": "定南县",
                "parent_id": 360700,
                "sort": 10
            }, {"id": 360729, "name": "全南县", "parent_id": 360700, "sort": 11}, {
                "id": 360730,
                "name": "宁都县",
                "parent_id": 360700,
                "sort": 12
            }, {"id": 360731, "name": "于都县", "parent_id": 360700, "sort": 13}, {
                "id": 360732,
                "name": "兴国县",
                "parent_id": 360700,
                "sort": 14
            }, {"id": 360733, "name": "会昌县", "parent_id": 360700, "sort": 15}, {
                "id": 360734,
                "name": "寻乌县",
                "parent_id": 360700,
                "sort": 16
            }, {"id": 360735, "name": "石城县", "parent_id": 360700, "sort": 17}, {
                "id": 360781,
                "name": "瑞金市",
                "parent_id": 360700,
                "sort": 18
            }, {"id": 360782, "name": "南康市", "parent_id": 360700, "sort": 19}],
            "type": 0
        }, {
            "id": 360800,
            "name": "吉安市",
            "parent_id": 360000,
            "sort": 8,
            "sub": [{"id": 360801, "name": "市辖区", "parent_id": 360800, "sort": 1}, {
                "id": 360802,
                "name": "吉州区",
                "parent_id": 360800,
                "sort": 2
            }, {"id": 360803, "name": "青原区", "parent_id": 360800, "sort": 3}, {
                "id": 360821,
                "name": "吉安县",
                "parent_id": 360800,
                "sort": 4
            }, {"id": 360822, "name": "吉水县", "parent_id": 360800, "sort": 5}, {
                "id": 360823,
                "name": "峡江县",
                "parent_id": 360800,
                "sort": 6
            }, {"id": 360824, "name": "新干县", "parent_id": 360800, "sort": 7}, {
                "id": 360825,
                "name": "永丰县",
                "parent_id": 360800,
                "sort": 8
            }, {"id": 360826, "name": "泰和县", "parent_id": 360800, "sort": 9}, {
                "id": 360827,
                "name": "遂川县",
                "parent_id": 360800,
                "sort": 10
            }, {"id": 360828, "name": "万安县", "parent_id": 360800, "sort": 11}, {
                "id": 360829,
                "name": "安福县",
                "parent_id": 360800,
                "sort": 12
            }, {"id": 360830, "name": "永新县", "parent_id": 360800, "sort": 13}, {
                "id": 360881,
                "name": "井冈山市",
                "parent_id": 360800,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 360900,
            "name": "宜春市",
            "parent_id": 360000,
            "sort": 9,
            "sub": [{"id": 360901, "name": "市辖区", "parent_id": 360900, "sort": 1}, {
                "id": 360902,
                "name": "袁州区",
                "parent_id": 360900,
                "sort": 2
            }, {"id": 360921, "name": "奉新县", "parent_id": 360900, "sort": 3}, {
                "id": 360922,
                "name": "万载县",
                "parent_id": 360900,
                "sort": 4
            }, {"id": 360923, "name": "上高县", "parent_id": 360900, "sort": 5}, {
                "id": 360924,
                "name": "宜丰县",
                "parent_id": 360900,
                "sort": 6
            }, {"id": 360925, "name": "靖安县", "parent_id": 360900, "sort": 7}, {
                "id": 360926,
                "name": "铜鼓县",
                "parent_id": 360900,
                "sort": 8
            }, {"id": 360981, "name": "丰城市", "parent_id": 360900, "sort": 9}, {
                "id": 360982,
                "name": "樟树市",
                "parent_id": 360900,
                "sort": 10
            }, {"id": 360983, "name": "高安市", "parent_id": 360900, "sort": 11}],
            "type": 0
        }, {
            "id": 361000,
            "name": "抚州市",
            "parent_id": 360000,
            "sort": 10,
            "sub": [{"id": 361001, "name": "市辖区", "parent_id": 361000, "sort": 1}, {
                "id": 361002,
                "name": "临川区",
                "parent_id": 361000,
                "sort": 2
            }, {"id": 361021, "name": "南城县", "parent_id": 361000, "sort": 3}, {
                "id": 361022,
                "name": "黎川县",
                "parent_id": 361000,
                "sort": 4
            }, {"id": 361023, "name": "南丰县", "parent_id": 361000, "sort": 5}, {
                "id": 361024,
                "name": "崇仁县",
                "parent_id": 361000,
                "sort": 6
            }, {"id": 361025, "name": "乐安县", "parent_id": 361000, "sort": 7}, {
                "id": 361026,
                "name": "宜黄县",
                "parent_id": 361000,
                "sort": 8
            }, {"id": 361027, "name": "金溪县", "parent_id": 361000, "sort": 9}, {
                "id": 361028,
                "name": "资溪县",
                "parent_id": 361000,
                "sort": 10
            }, {"id": 361029, "name": "东乡县", "parent_id": 361000, "sort": 11}, {
                "id": 361030,
                "name": "广昌县",
                "parent_id": 361000,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 361100,
            "name": "上饶市",
            "parent_id": 360000,
            "sort": 11,
            "sub": [{"id": 361101, "name": "市辖区", "parent_id": 361100, "sort": 1}, {
                "id": 361102,
                "name": "信州区",
                "parent_id": 361100,
                "sort": 2
            }, {"id": 361121, "name": "上饶县", "parent_id": 361100, "sort": 3}, {
                "id": 361122,
                "name": "广丰县",
                "parent_id": 361100,
                "sort": 4
            }, {"id": 361123, "name": "玉山县", "parent_id": 361100, "sort": 5}, {
                "id": 361124,
                "name": "铅山县",
                "parent_id": 361100,
                "sort": 6
            }, {"id": 361125, "name": "横峰县", "parent_id": 361100, "sort": 7}, {
                "id": 361126,
                "name": "弋阳县",
                "parent_id": 361100,
                "sort": 8
            }, {"id": 361127, "name": "余干县", "parent_id": 361100, "sort": 9}, {
                "id": 361128,
                "name": "鄱阳县",
                "parent_id": 361100,
                "sort": 10
            }, {"id": 361129, "name": "万年县", "parent_id": 361100, "sort": 11}, {
                "id": 361130,
                "name": "婺源县",
                "parent_id": 361100,
                "sort": 12
            }, {"id": 361181, "name": "德兴市", "parent_id": 361100, "sort": 13}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 370000,
        "name": "山东省",
        "parent_id": 0,
        "sort": 15,
        "sub": [{
            "id": 370100,
            "name": "济南市",
            "parent_id": 370000,
            "sort": 1,
            "sub": [{"id": 370101, "name": "市辖区", "parent_id": 370100, "sort": 1}, {
                "id": 370102,
                "name": "历下区",
                "parent_id": 370100,
                "sort": 2
            }, {"id": 370103, "name": "市中区", "parent_id": 370100, "sort": 3}, {
                "id": 370104,
                "name": "槐荫区",
                "parent_id": 370100,
                "sort": 4
            }, {"id": 370105, "name": "天桥区", "parent_id": 370100, "sort": 5}, {
                "id": 370112,
                "name": "历城区",
                "parent_id": 370100,
                "sort": 6
            }, {"id": 370113, "name": "长清区", "parent_id": 370100, "sort": 7}, {
                "id": 370124,
                "name": "平阴县",
                "parent_id": 370100,
                "sort": 8
            }, {"id": 370125, "name": "济阳县", "parent_id": 370100, "sort": 9}, {
                "id": 370126,
                "name": "商河县",
                "parent_id": 370100,
                "sort": 10
            }, {"id": 370181, "name": "章丘市", "parent_id": 370100, "sort": 11}],
            "type": 0
        }, {
            "id": 370200,
            "name": "青岛市",
            "parent_id": 370000,
            "sort": 2,
            "sub": [{"id": 370201, "name": "市辖区", "parent_id": 370200, "sort": 1}, {
                "id": 370202,
                "name": "市南区",
                "parent_id": 370200,
                "sort": 2
            }, {"id": 370203, "name": "市北区", "parent_id": 370200, "sort": 3}, {
                "id": 370205,
                "name": "四方区",
                "parent_id": 370200,
                "sort": 4
            }, {"id": 370211, "name": "黄岛区", "parent_id": 370200, "sort": 5}, {
                "id": 370212,
                "name": "崂山区",
                "parent_id": 370200,
                "sort": 6
            }, {"id": 370213, "name": "李沧区", "parent_id": 370200, "sort": 7}, {
                "id": 370214,
                "name": "城阳区",
                "parent_id": 370200,
                "sort": 8
            }, {"id": 370281, "name": "胶州市", "parent_id": 370200, "sort": 9}, {
                "id": 370282,
                "name": "即墨市",
                "parent_id": 370200,
                "sort": 10
            }, {"id": 370283, "name": "平度市", "parent_id": 370200, "sort": 11}, {
                "id": 370284,
                "name": "胶南市",
                "parent_id": 370200,
                "sort": 12
            }, {"id": 370285, "name": "莱西市", "parent_id": 370200, "sort": 13}],
            "type": 0
        }, {
            "id": 370300,
            "name": "淄博市",
            "parent_id": 370000,
            "sort": 3,
            "sub": [{"id": 370301, "name": "市辖区", "parent_id": 370300, "sort": 1}, {
                "id": 370302,
                "name": "淄川区",
                "parent_id": 370300,
                "sort": 2
            }, {"id": 370303, "name": "张店区", "parent_id": 370300, "sort": 3}, {
                "id": 370304,
                "name": "博山区",
                "parent_id": 370300,
                "sort": 4
            }, {"id": 370305, "name": "临淄区", "parent_id": 370300, "sort": 5}, {
                "id": 370306,
                "name": "周村区",
                "parent_id": 370300,
                "sort": 6
            }, {"id": 370321, "name": "桓台县", "parent_id": 370300, "sort": 7}, {
                "id": 370322,
                "name": "高青县",
                "parent_id": 370300,
                "sort": 8
            }, {"id": 370323, "name": "沂源县", "parent_id": 370300, "sort": 9}],
            "type": 0
        }, {
            "id": 370400,
            "name": "枣庄市",
            "parent_id": 370000,
            "sort": 4,
            "sub": [{"id": 370401, "name": "市辖区", "parent_id": 370400, "sort": 1}, {
                "id": 370402,
                "name": "市中区",
                "parent_id": 370400,
                "sort": 2
            }, {"id": 370403, "name": "薛城区", "parent_id": 370400, "sort": 3}, {
                "id": 370404,
                "name": "峄城区",
                "parent_id": 370400,
                "sort": 4
            }, {"id": 370405, "name": "台儿庄区", "parent_id": 370400, "sort": 5}, {
                "id": 370406,
                "name": "山亭区",
                "parent_id": 370400,
                "sort": 6
            }, {"id": 370481, "name": "滕州市", "parent_id": 370400, "sort": 7}],
            "type": 0
        }, {
            "id": 370500,
            "name": "东营市",
            "parent_id": 370000,
            "sort": 5,
            "sub": [{"id": 370501, "name": "市辖区", "parent_id": 370500, "sort": 1}, {
                "id": 370502,
                "name": "东营区",
                "parent_id": 370500,
                "sort": 2
            }, {"id": 370503, "name": "河口区", "parent_id": 370500, "sort": 3}, {
                "id": 370521,
                "name": "垦利县",
                "parent_id": 370500,
                "sort": 4
            }, {"id": 370522, "name": "利津县", "parent_id": 370500, "sort": 5}, {
                "id": 370523,
                "name": "广饶县",
                "parent_id": 370500,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 370600,
            "name": "烟台市",
            "parent_id": 370000,
            "sort": 6,
            "sub": [{"id": 370601, "name": "市辖区", "parent_id": 370600, "sort": 1}, {
                "id": 370602,
                "name": "芝罘区",
                "parent_id": 370600,
                "sort": 2
            }, {"id": 370611, "name": "福山区", "parent_id": 370600, "sort": 3}, {
                "id": 370612,
                "name": "牟平区",
                "parent_id": 370600,
                "sort": 4
            }, {"id": 370613, "name": "莱山区", "parent_id": 370600, "sort": 5}, {
                "id": 370634,
                "name": "长岛县",
                "parent_id": 370600,
                "sort": 6
            }, {"id": 370681, "name": "龙口市", "parent_id": 370600, "sort": 7}, {
                "id": 370682,
                "name": "莱阳市",
                "parent_id": 370600,
                "sort": 8
            }, {"id": 370683, "name": "莱州市", "parent_id": 370600, "sort": 9}, {
                "id": 370684,
                "name": "蓬莱市",
                "parent_id": 370600,
                "sort": 10
            }, {"id": 370685, "name": "招远市", "parent_id": 370600, "sort": 11}, {
                "id": 370686,
                "name": "栖霞市",
                "parent_id": 370600,
                "sort": 12
            }, {"id": 370687, "name": "海阳市", "parent_id": 370600, "sort": 13}],
            "type": 0
        }, {
            "id": 370700,
            "name": "潍坊市",
            "parent_id": 370000,
            "sort": 7,
            "sub": [{"id": 370701, "name": "市辖区", "parent_id": 370700, "sort": 1}, {
                "id": 370702,
                "name": "潍城区",
                "parent_id": 370700,
                "sort": 2
            }, {"id": 370703, "name": "寒亭区", "parent_id": 370700, "sort": 3}, {
                "id": 370704,
                "name": "坊子区",
                "parent_id": 370700,
                "sort": 4
            }, {"id": 370705, "name": "奎文区", "parent_id": 370700, "sort": 5}, {
                "id": 370724,
                "name": "临朐县",
                "parent_id": 370700,
                "sort": 6
            }, {"id": 370725, "name": "昌乐县", "parent_id": 370700, "sort": 7}, {
                "id": 370781,
                "name": "青州市",
                "parent_id": 370700,
                "sort": 8
            }, {"id": 370782, "name": "诸城市", "parent_id": 370700, "sort": 9}, {
                "id": 370783,
                "name": "寿光市",
                "parent_id": 370700,
                "sort": 10
            }, {"id": 370784, "name": "安丘市", "parent_id": 370700, "sort": 11}, {
                "id": 370785,
                "name": "高密市",
                "parent_id": 370700,
                "sort": 12
            }, {"id": 370786, "name": "昌邑市", "parent_id": 370700, "sort": 13}],
            "type": 0
        }, {
            "id": 370800,
            "name": "济宁市",
            "parent_id": 370000,
            "sort": 8,
            "sub": [{"id": 370801, "name": "市辖区", "parent_id": 370800, "sort": 1}, {
                "id": 370802,
                "name": "市中区",
                "parent_id": 370800,
                "sort": 2
            }, {"id": 370811, "name": "任城区", "parent_id": 370800, "sort": 3}, {
                "id": 370826,
                "name": "微山县",
                "parent_id": 370800,
                "sort": 4
            }, {"id": 370827, "name": "鱼台县", "parent_id": 370800, "sort": 5}, {
                "id": 370828,
                "name": "金乡县",
                "parent_id": 370800,
                "sort": 6
            }, {"id": 370829, "name": "嘉祥县", "parent_id": 370800, "sort": 7}, {
                "id": 370830,
                "name": "汶上县",
                "parent_id": 370800,
                "sort": 8
            }, {"id": 370831, "name": "泗水县", "parent_id": 370800, "sort": 9}, {
                "id": 370832,
                "name": "梁山县",
                "parent_id": 370800,
                "sort": 10
            }, {"id": 370881, "name": "曲阜市", "parent_id": 370800, "sort": 11}, {
                "id": 370882,
                "name": "兖州市",
                "parent_id": 370800,
                "sort": 12
            }, {"id": 370883, "name": "邹城市", "parent_id": 370800, "sort": 13}],
            "type": 0
        }, {
            "id": 370900,
            "name": "泰安市",
            "parent_id": 370000,
            "sort": 9,
            "sub": [{"id": 370901, "name": "市辖区", "parent_id": 370900, "sort": 1}, {
                "id": 370902,
                "name": "泰山区",
                "parent_id": 370900,
                "sort": 2
            }, {"id": 370903, "name": "岱岳区", "parent_id": 370900, "sort": 3}, {
                "id": 370921,
                "name": "宁阳县",
                "parent_id": 370900,
                "sort": 4
            }, {"id": 370923, "name": "东平县", "parent_id": 370900, "sort": 5}, {
                "id": 370982,
                "name": "新泰市",
                "parent_id": 370900,
                "sort": 6
            }, {"id": 370983, "name": "肥城市", "parent_id": 370900, "sort": 7}],
            "type": 0
        }, {
            "id": 371000,
            "name": "威海市",
            "parent_id": 370000,
            "sort": 10,
            "sub": [{"id": 371001, "name": "市辖区", "parent_id": 371000, "sort": 1}, {
                "id": 371002,
                "name": "环翠区",
                "parent_id": 371000,
                "sort": 2
            }, {"id": 371081, "name": "文登市", "parent_id": 371000, "sort": 3}, {
                "id": 371082,
                "name": "荣成市",
                "parent_id": 371000,
                "sort": 4
            }, {"id": 371083, "name": "乳山市", "parent_id": 371000, "sort": 5}],
            "type": 0
        }, {
            "id": 371100,
            "name": "日照市",
            "parent_id": 370000,
            "sort": 11,
            "sub": [{"id": 371101, "name": "市辖区", "parent_id": 371100, "sort": 1}, {
                "id": 371102,
                "name": "东港区",
                "parent_id": 371100,
                "sort": 2
            }, {"id": 371103, "name": "岚山区", "parent_id": 371100, "sort": 3}, {
                "id": 371121,
                "name": "五莲县",
                "parent_id": 371100,
                "sort": 4
            }, {"id": 371122, "name": "莒　县", "parent_id": 371100, "sort": 5}],
            "type": 0
        }, {
            "id": 371200,
            "name": "莱芜市",
            "parent_id": 370000,
            "sort": 12,
            "sub": [{"id": 371201, "name": "市辖区", "parent_id": 371200, "sort": 1}, {
                "id": 371202,
                "name": "莱城区",
                "parent_id": 371200,
                "sort": 2
            }, {"id": 371203, "name": "钢城区", "parent_id": 371200, "sort": 3}],
            "type": 0
        }, {
            "id": 371300,
            "name": "临沂市",
            "parent_id": 370000,
            "sort": 13,
            "sub": [{"id": 371301, "name": "市辖区", "parent_id": 371300, "sort": 1}, {
                "id": 371302,
                "name": "兰山区",
                "parent_id": 371300,
                "sort": 2
            }, {"id": 371311, "name": "罗庄区", "parent_id": 371300, "sort": 3}, {
                "id": 371312,
                "name": "河东区",
                "parent_id": 371300,
                "sort": 4
            }, {"id": 371321, "name": "沂南县", "parent_id": 371300, "sort": 5}, {
                "id": 371322,
                "name": "郯城县",
                "parent_id": 371300,
                "sort": 6
            }, {"id": 371323, "name": "沂水县", "parent_id": 371300, "sort": 7}, {
                "id": 371324,
                "name": "苍山县",
                "parent_id": 371300,
                "sort": 8
            }, {"id": 371325, "name": "费　县", "parent_id": 371300, "sort": 9}, {
                "id": 371326,
                "name": "平邑县",
                "parent_id": 371300,
                "sort": 10
            }, {"id": 371327, "name": "莒南县", "parent_id": 371300, "sort": 11}, {
                "id": 371328,
                "name": "蒙阴县",
                "parent_id": 371300,
                "sort": 12
            }, {"id": 371329, "name": "临沭县", "parent_id": 371300, "sort": 13}],
            "type": 0
        }, {
            "id": 371400,
            "name": "德州市",
            "parent_id": 370000,
            "sort": 14,
            "sub": [{"id": 371401, "name": "市辖区", "parent_id": 371400, "sort": 1}, {
                "id": 371402,
                "name": "德城区",
                "parent_id": 371400,
                "sort": 2
            }, {"id": 371421, "name": "陵　县", "parent_id": 371400, "sort": 3}, {
                "id": 371422,
                "name": "宁津县",
                "parent_id": 371400,
                "sort": 4
            }, {"id": 371423, "name": "庆云县", "parent_id": 371400, "sort": 5}, {
                "id": 371424,
                "name": "临邑县",
                "parent_id": 371400,
                "sort": 6
            }, {"id": 371425, "name": "齐河县", "parent_id": 371400, "sort": 7}, {
                "id": 371426,
                "name": "平原县",
                "parent_id": 371400,
                "sort": 8
            }, {"id": 371427, "name": "夏津县", "parent_id": 371400, "sort": 9}, {
                "id": 371428,
                "name": "武城县",
                "parent_id": 371400,
                "sort": 10
            }, {"id": 371481, "name": "乐陵市", "parent_id": 371400, "sort": 11}, {
                "id": 371482,
                "name": "禹城市",
                "parent_id": 371400,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 371500,
            "name": "聊城市",
            "parent_id": 370000,
            "sort": 15,
            "sub": [{"id": 371501, "name": "市辖区", "parent_id": 371500, "sort": 1}, {
                "id": 371502,
                "name": "东昌府区",
                "parent_id": 371500,
                "sort": 2
            }, {"id": 371521, "name": "阳谷县", "parent_id": 371500, "sort": 3}, {
                "id": 371522,
                "name": "莘　县",
                "parent_id": 371500,
                "sort": 4
            }, {"id": 371523, "name": "茌平县", "parent_id": 371500, "sort": 5}, {
                "id": 371524,
                "name": "东阿县",
                "parent_id": 371500,
                "sort": 6
            }, {"id": 371525, "name": "冠　县", "parent_id": 371500, "sort": 7}, {
                "id": 371526,
                "name": "高唐县",
                "parent_id": 371500,
                "sort": 8
            }, {"id": 371581, "name": "临清市", "parent_id": 371500, "sort": 9}],
            "type": 0
        }, {
            "id": 371600,
            "name": "滨州市",
            "parent_id": 370000,
            "sort": 16,
            "sub": [{"id": 371601, "name": "市辖区", "parent_id": 371600, "sort": 1}, {
                "id": 371602,
                "name": "滨城区",
                "parent_id": 371600,
                "sort": 2
            }, {"id": 371621, "name": "惠民县", "parent_id": 371600, "sort": 3}, {
                "id": 371622,
                "name": "阳信县",
                "parent_id": 371600,
                "sort": 4
            }, {"id": 371623, "name": "无棣县", "parent_id": 371600, "sort": 5}, {
                "id": 371624,
                "name": "沾化县",
                "parent_id": 371600,
                "sort": 6
            }, {"id": 371625, "name": "博兴县", "parent_id": 371600, "sort": 7}, {
                "id": 371626,
                "name": "邹平县",
                "parent_id": 371600,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 371700,
            "name": "菏泽市",
            "parent_id": 370000,
            "sort": 17,
            "sub": [{"id": 371701, "name": "市辖区", "parent_id": 371700, "sort": 1}, {
                "id": 371702,
                "name": "牡丹区",
                "parent_id": 371700,
                "sort": 2
            }, {"id": 371721, "name": "曹　县", "parent_id": 371700, "sort": 3}, {
                "id": 371722,
                "name": "单　县",
                "parent_id": 371700,
                "sort": 4
            }, {"id": 371723, "name": "成武县", "parent_id": 371700, "sort": 5}, {
                "id": 371724,
                "name": "巨野县",
                "parent_id": 371700,
                "sort": 6
            }, {"id": 371725, "name": "郓城县", "parent_id": 371700, "sort": 7}, {
                "id": 371726,
                "name": "鄄城县",
                "parent_id": 371700,
                "sort": 8
            }, {"id": 371727, "name": "定陶县", "parent_id": 371700, "sort": 9}, {
                "id": 371728,
                "name": "东明县",
                "parent_id": 371700,
                "sort": 10
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 410000,
        "name": "河南省",
        "parent_id": 0,
        "sort": 16,
        "sub": [{
            "id": 410100,
            "name": "郑州市",
            "parent_id": 410000,
            "sort": 1,
            "sub": [{"id": 410101, "name": "市辖区", "parent_id": 410100, "sort": 1}, {
                "id": 410102,
                "name": "中原区",
                "parent_id": 410100,
                "sort": 2
            }, {"id": 410103, "name": "二七区", "parent_id": 410100, "sort": 3}, {
                "id": 410104,
                "name": "管城回族区",
                "parent_id": 410100,
                "sort": 4
            }, {"id": 410105, "name": "金水区", "parent_id": 410100, "sort": 5}, {
                "id": 410106,
                "name": "上街区",
                "parent_id": 410100,
                "sort": 6
            }, {"id": 410108, "name": "邙山区", "parent_id": 410100, "sort": 7}, {
                "id": 410122,
                "name": "中牟县",
                "parent_id": 410100,
                "sort": 8
            }, {"id": 410181, "name": "巩义市", "parent_id": 410100, "sort": 9}, {
                "id": 410182,
                "name": "荥阳市",
                "parent_id": 410100,
                "sort": 10
            }, {"id": 410183, "name": "新密市", "parent_id": 410100, "sort": 11}, {
                "id": 410184,
                "name": "新郑市",
                "parent_id": 410100,
                "sort": 12
            }, {"id": 410185, "name": "登封市", "parent_id": 410100, "sort": 13}],
            "type": 0
        }, {
            "id": 410200,
            "name": "开封市",
            "parent_id": 410000,
            "sort": 2,
            "sub": [{"id": 410201, "name": "市辖区", "parent_id": 410200, "sort": 1}, {
                "id": 410202,
                "name": "龙亭区",
                "parent_id": 410200,
                "sort": 2
            }, {"id": 410203, "name": "顺河回族区", "parent_id": 410200, "sort": 3}, {
                "id": 410204,
                "name": "鼓楼区",
                "parent_id": 410200,
                "sort": 4
            }, {"id": 410205, "name": "南关区", "parent_id": 410200, "sort": 5}, {
                "id": 410211,
                "name": "郊　区",
                "parent_id": 410200,
                "sort": 6
            }, {"id": 410221, "name": "杞　县", "parent_id": 410200, "sort": 7}, {
                "id": 410222,
                "name": "通许县",
                "parent_id": 410200,
                "sort": 8
            }, {"id": 410223, "name": "尉氏县", "parent_id": 410200, "sort": 9}, {
                "id": 410224,
                "name": "开封县",
                "parent_id": 410200,
                "sort": 10
            }, {"id": 410225, "name": "兰考县", "parent_id": 410200, "sort": 11}],
            "type": 0
        }, {
            "id": 410300,
            "name": "洛阳市",
            "parent_id": 410000,
            "sort": 3,
            "sub": [{"id": 410301, "name": "市辖区", "parent_id": 410300, "sort": 1}, {
                "id": 410302,
                "name": "老城区",
                "parent_id": 410300,
                "sort": 2
            }, {"id": 410303, "name": "西工区", "parent_id": 410300, "sort": 3}, {
                "id": 410304,
                "name": "廛河回族区",
                "parent_id": 410300,
                "sort": 4
            }, {"id": 410305, "name": "涧西区", "parent_id": 410300, "sort": 5}, {
                "id": 410306,
                "name": "吉利区",
                "parent_id": 410300,
                "sort": 6
            }, {"id": 410307, "name": "洛龙区", "parent_id": 410300, "sort": 7}, {
                "id": 410322,
                "name": "孟津县",
                "parent_id": 410300,
                "sort": 8
            }, {"id": 410323, "name": "新安县", "parent_id": 410300, "sort": 9}, {
                "id": 410324,
                "name": "栾川县",
                "parent_id": 410300,
                "sort": 10
            }, {"id": 410325, "name": "嵩　县", "parent_id": 410300, "sort": 11}, {
                "id": 410326,
                "name": "汝阳县",
                "parent_id": 410300,
                "sort": 12
            }, {"id": 410327, "name": "宜阳县", "parent_id": 410300, "sort": 13}, {
                "id": 410328,
                "name": "洛宁县",
                "parent_id": 410300,
                "sort": 14
            }, {"id": 410329, "name": "伊川县", "parent_id": 410300, "sort": 15}, {
                "id": 410381,
                "name": "偃师市",
                "parent_id": 410300,
                "sort": 16
            }],
            "type": 0
        }, {
            "id": 410400,
            "name": "平顶山市",
            "parent_id": 410000,
            "sort": 4,
            "sub": [{"id": 410401, "name": "市辖区", "parent_id": 410400, "sort": 1}, {
                "id": 410402,
                "name": "新华区",
                "parent_id": 410400,
                "sort": 2
            }, {"id": 410403, "name": "卫东区", "parent_id": 410400, "sort": 3}, {
                "id": 410404,
                "name": "石龙区",
                "parent_id": 410400,
                "sort": 4
            }, {"id": 410411, "name": "湛河区", "parent_id": 410400, "sort": 5}, {
                "id": 410421,
                "name": "宝丰县",
                "parent_id": 410400,
                "sort": 6
            }, {"id": 410422, "name": "叶　县", "parent_id": 410400, "sort": 7}, {
                "id": 410423,
                "name": "鲁山县",
                "parent_id": 410400,
                "sort": 8
            }, {"id": 410425, "name": "郏　县", "parent_id": 410400, "sort": 9}, {
                "id": 410481,
                "name": "舞钢市",
                "parent_id": 410400,
                "sort": 10
            }, {"id": 410482, "name": "汝州市", "parent_id": 410400, "sort": 11}],
            "type": 0
        }, {
            "id": 410500,
            "name": "安阳市",
            "parent_id": 410000,
            "sort": 5,
            "sub": [{"id": 410501, "name": "市辖区", "parent_id": 410500, "sort": 1}, {
                "id": 410502,
                "name": "文峰区",
                "parent_id": 410500,
                "sort": 2
            }, {"id": 410503, "name": "北关区", "parent_id": 410500, "sort": 3}, {
                "id": 410505,
                "name": "殷都区",
                "parent_id": 410500,
                "sort": 4
            }, {"id": 410506, "name": "龙安区", "parent_id": 410500, "sort": 5}, {
                "id": 410522,
                "name": "安阳县",
                "parent_id": 410500,
                "sort": 6
            }, {"id": 410523, "name": "汤阴县", "parent_id": 410500, "sort": 7}, {
                "id": 410526,
                "name": "滑　县",
                "parent_id": 410500,
                "sort": 8
            }, {"id": 410527, "name": "内黄县", "parent_id": 410500, "sort": 9}, {
                "id": 410581,
                "name": "林州市",
                "parent_id": 410500,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 410600,
            "name": "鹤壁市",
            "parent_id": 410000,
            "sort": 6,
            "sub": [{"id": 410601, "name": "市辖区", "parent_id": 410600, "sort": 1}, {
                "id": 410602,
                "name": "鹤山区",
                "parent_id": 410600,
                "sort": 2
            }, {"id": 410603, "name": "山城区", "parent_id": 410600, "sort": 3}, {
                "id": 410611,
                "name": "淇滨区",
                "parent_id": 410600,
                "sort": 4
            }, {"id": 410621, "name": "浚　县", "parent_id": 410600, "sort": 5}, {
                "id": 410622,
                "name": "淇　县",
                "parent_id": 410600,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 410700,
            "name": "新乡市",
            "parent_id": 410000,
            "sort": 7,
            "sub": [{"id": 410701, "name": "市辖区", "parent_id": 410700, "sort": 1}, {
                "id": 410702,
                "name": "红旗区",
                "parent_id": 410700,
                "sort": 2
            }, {"id": 410703, "name": "卫滨区", "parent_id": 410700, "sort": 3}, {
                "id": 410704,
                "name": "凤泉区",
                "parent_id": 410700,
                "sort": 4
            }, {"id": 410711, "name": "牧野区", "parent_id": 410700, "sort": 5}, {
                "id": 410721,
                "name": "新乡县",
                "parent_id": 410700,
                "sort": 6
            }, {"id": 410724, "name": "获嘉县", "parent_id": 410700, "sort": 7}, {
                "id": 410725,
                "name": "原阳县",
                "parent_id": 410700,
                "sort": 8
            }, {"id": 410726, "name": "延津县", "parent_id": 410700, "sort": 9}, {
                "id": 410727,
                "name": "封丘县",
                "parent_id": 410700,
                "sort": 10
            }, {"id": 410728, "name": "长垣县", "parent_id": 410700, "sort": 11}, {
                "id": 410781,
                "name": "卫辉市",
                "parent_id": 410700,
                "sort": 12
            }, {"id": 410782, "name": "辉县市", "parent_id": 410700, "sort": 13}],
            "type": 0
        }, {
            "id": 410800,
            "name": "焦作市",
            "parent_id": 410000,
            "sort": 8,
            "sub": [{"id": 410801, "name": "市辖区", "parent_id": 410800, "sort": 1}, {
                "id": 410802,
                "name": "解放区",
                "parent_id": 410800,
                "sort": 2
            }, {"id": 410803, "name": "中站区", "parent_id": 410800, "sort": 3}, {
                "id": 410804,
                "name": "马村区",
                "parent_id": 410800,
                "sort": 4
            }, {"id": 410811, "name": "山阳区", "parent_id": 410800, "sort": 5}, {
                "id": 410821,
                "name": "修武县",
                "parent_id": 410800,
                "sort": 6
            }, {"id": 410822, "name": "博爱县", "parent_id": 410800, "sort": 7}, {
                "id": 410823,
                "name": "武陟县",
                "parent_id": 410800,
                "sort": 8
            }, {"id": 410825, "name": "温　县", "parent_id": 410800, "sort": 9}, {
                "id": 410881,
                "name": "济源市",
                "parent_id": 410800,
                "sort": 10
            }, {"id": 410882, "name": "沁阳市", "parent_id": 410800, "sort": 11}, {
                "id": 410883,
                "name": "孟州市",
                "parent_id": 410800,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 410900,
            "name": "濮阳市",
            "parent_id": 410000,
            "sort": 9,
            "sub": [{"id": 410901, "name": "市辖区", "parent_id": 410900, "sort": 1}, {
                "id": 410902,
                "name": "华龙区",
                "parent_id": 410900,
                "sort": 2
            }, {"id": 410922, "name": "清丰县", "parent_id": 410900, "sort": 3}, {
                "id": 410923,
                "name": "南乐县",
                "parent_id": 410900,
                "sort": 4
            }, {"id": 410926, "name": "范　县", "parent_id": 410900, "sort": 5}, {
                "id": 410927,
                "name": "台前县",
                "parent_id": 410900,
                "sort": 6
            }, {"id": 410928, "name": "濮阳县", "parent_id": 410900, "sort": 7}],
            "type": 0
        }, {
            "id": 411000,
            "name": "许昌市",
            "parent_id": 410000,
            "sort": 10,
            "sub": [{"id": 411001, "name": "市辖区", "parent_id": 411000, "sort": 1}, {
                "id": 411002,
                "name": "魏都区",
                "parent_id": 411000,
                "sort": 2
            }, {"id": 411023, "name": "许昌县", "parent_id": 411000, "sort": 3}, {
                "id": 411024,
                "name": "鄢陵县",
                "parent_id": 411000,
                "sort": 4
            }, {"id": 411025, "name": "襄城县", "parent_id": 411000, "sort": 5}, {
                "id": 411081,
                "name": "禹州市",
                "parent_id": 411000,
                "sort": 6
            }, {"id": 411082, "name": "长葛市", "parent_id": 411000, "sort": 7}],
            "type": 0
        }, {
            "id": 411100,
            "name": "漯河市",
            "parent_id": 410000,
            "sort": 11,
            "sub": [{"id": 411101, "name": "市辖区", "parent_id": 411100, "sort": 1}, {
                "id": 411102,
                "name": "源汇区",
                "parent_id": 411100,
                "sort": 2
            }, {"id": 411103, "name": "郾城区", "parent_id": 411100, "sort": 3}, {
                "id": 411104,
                "name": "召陵区",
                "parent_id": 411100,
                "sort": 4
            }, {"id": 411121, "name": "舞阳县", "parent_id": 411100, "sort": 5}, {
                "id": 411122,
                "name": "临颍县",
                "parent_id": 411100,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 411200,
            "name": "三门峡市",
            "parent_id": 410000,
            "sort": 12,
            "sub": [{"id": 411201, "name": "市辖区", "parent_id": 411200, "sort": 1}, {
                "id": 411202,
                "name": "湖滨区",
                "parent_id": 411200,
                "sort": 2
            }, {"id": 411221, "name": "渑池县", "parent_id": 411200, "sort": 3}, {
                "id": 411222,
                "name": "陕　县",
                "parent_id": 411200,
                "sort": 4
            }, {"id": 411224, "name": "卢氏县", "parent_id": 411200, "sort": 5}, {
                "id": 411281,
                "name": "义马市",
                "parent_id": 411200,
                "sort": 6
            }, {"id": 411282, "name": "灵宝市", "parent_id": 411200, "sort": 7}],
            "type": 0
        }, {
            "id": 411300,
            "name": "南阳市",
            "parent_id": 410000,
            "sort": 13,
            "sub": [{"id": 411301, "name": "市辖区", "parent_id": 411300, "sort": 1}, {
                "id": 411302,
                "name": "宛城区",
                "parent_id": 411300,
                "sort": 2
            }, {"id": 411303, "name": "卧龙区", "parent_id": 411300, "sort": 3}, {
                "id": 411321,
                "name": "南召县",
                "parent_id": 411300,
                "sort": 4
            }, {"id": 411322, "name": "方城县", "parent_id": 411300, "sort": 5}, {
                "id": 411323,
                "name": "西峡县",
                "parent_id": 411300,
                "sort": 6
            }, {"id": 411324, "name": "镇平县", "parent_id": 411300, "sort": 7}, {
                "id": 411325,
                "name": "内乡县",
                "parent_id": 411300,
                "sort": 8
            }, {"id": 411326, "name": "淅川县", "parent_id": 411300, "sort": 9}, {
                "id": 411327,
                "name": "社旗县",
                "parent_id": 411300,
                "sort": 10
            }, {"id": 411328, "name": "唐河县", "parent_id": 411300, "sort": 11}, {
                "id": 411329,
                "name": "新野县",
                "parent_id": 411300,
                "sort": 12
            }, {"id": 411330, "name": "桐柏县", "parent_id": 411300, "sort": 13}, {
                "id": 411381,
                "name": "邓州市",
                "parent_id": 411300,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 411400,
            "name": "商丘市",
            "parent_id": 410000,
            "sort": 14,
            "sub": [{"id": 411401, "name": "市辖区", "parent_id": 411400, "sort": 1}, {
                "id": 411402,
                "name": "梁园区",
                "parent_id": 411400,
                "sort": 2
            }, {"id": 411403, "name": "睢阳区", "parent_id": 411400, "sort": 3}, {
                "id": 411421,
                "name": "民权县",
                "parent_id": 411400,
                "sort": 4
            }, {"id": 411422, "name": "睢　县", "parent_id": 411400, "sort": 5}, {
                "id": 411423,
                "name": "宁陵县",
                "parent_id": 411400,
                "sort": 6
            }, {"id": 411424, "name": "柘城县", "parent_id": 411400, "sort": 7}, {
                "id": 411425,
                "name": "虞城县",
                "parent_id": 411400,
                "sort": 8
            }, {"id": 411426, "name": "夏邑县", "parent_id": 411400, "sort": 9}, {
                "id": 411481,
                "name": "永城市",
                "parent_id": 411400,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 411500,
            "name": "信阳市",
            "parent_id": 410000,
            "sort": 15,
            "sub": [{"id": 411501, "name": "市辖区", "parent_id": 411500, "sort": 1}, {
                "id": 411502,
                "name": "师河区",
                "parent_id": 411500,
                "sort": 2
            }, {"id": 411503, "name": "平桥区", "parent_id": 411500, "sort": 3}, {
                "id": 411521,
                "name": "罗山县",
                "parent_id": 411500,
                "sort": 4
            }, {"id": 411522, "name": "光山县", "parent_id": 411500, "sort": 5}, {
                "id": 411523,
                "name": "新　县",
                "parent_id": 411500,
                "sort": 6
            }, {"id": 411524, "name": "商城县", "parent_id": 411500, "sort": 7}, {
                "id": 411525,
                "name": "固始县",
                "parent_id": 411500,
                "sort": 8
            }, {"id": 411526, "name": "潢川县", "parent_id": 411500, "sort": 9}, {
                "id": 411527,
                "name": "淮滨县",
                "parent_id": 411500,
                "sort": 10
            }, {"id": 411528, "name": "息　县", "parent_id": 411500, "sort": 11}],
            "type": 0
        }, {
            "id": 411600,
            "name": "周口市",
            "parent_id": 410000,
            "sort": 16,
            "sub": [{"id": 411601, "name": "市辖区", "parent_id": 411600, "sort": 1}, {
                "id": 411602,
                "name": "川汇区",
                "parent_id": 411600,
                "sort": 2
            }, {"id": 411621, "name": "扶沟县", "parent_id": 411600, "sort": 3}, {
                "id": 411622,
                "name": "西华县",
                "parent_id": 411600,
                "sort": 4
            }, {"id": 411623, "name": "商水县", "parent_id": 411600, "sort": 5}, {
                "id": 411624,
                "name": "沈丘县",
                "parent_id": 411600,
                "sort": 6
            }, {"id": 411625, "name": "郸城县", "parent_id": 411600, "sort": 7}, {
                "id": 411626,
                "name": "淮阳县",
                "parent_id": 411600,
                "sort": 8
            }, {"id": 411627, "name": "太康县", "parent_id": 411600, "sort": 9}, {
                "id": 411628,
                "name": "鹿邑县",
                "parent_id": 411600,
                "sort": 10
            }, {"id": 411681, "name": "项城市", "parent_id": 411600, "sort": 11}],
            "type": 0
        }, {
            "id": 411700,
            "name": "驻马店市",
            "parent_id": 410000,
            "sort": 17,
            "sub": [{"id": 411701, "name": "市辖区", "parent_id": 411700, "sort": 1}, {
                "id": 411702,
                "name": "驿城区",
                "parent_id": 411700,
                "sort": 2
            }, {"id": 411721, "name": "西平县", "parent_id": 411700, "sort": 3}, {
                "id": 411722,
                "name": "上蔡县",
                "parent_id": 411700,
                "sort": 4
            }, {"id": 411723, "name": "平舆县", "parent_id": 411700, "sort": 5}, {
                "id": 411724,
                "name": "正阳县",
                "parent_id": 411700,
                "sort": 6
            }, {"id": 411725, "name": "确山县", "parent_id": 411700, "sort": 7}, {
                "id": 411726,
                "name": "泌阳县",
                "parent_id": 411700,
                "sort": 8
            }, {"id": 411727, "name": "汝南县", "parent_id": 411700, "sort": 9}, {
                "id": 411728,
                "name": "遂平县",
                "parent_id": 411700,
                "sort": 10
            }, {"id": 411729, "name": "新蔡县", "parent_id": 411700, "sort": 11}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 420000,
        "name": "湖北省",
        "parent_id": 0,
        "sort": 17,
        "sub": [{
            "id": 420100,
            "name": "武汉市",
            "parent_id": 420000,
            "sort": 1,
            "sub": [{"id": 420101, "name": "市辖区", "parent_id": 420100, "sort": 1}, {
                "id": 420102,
                "name": "江岸区",
                "parent_id": 420100,
                "sort": 2
            }, {"id": 420103, "name": "江汉区", "parent_id": 420100, "sort": 3}, {
                "id": 420104,
                "name": "乔口区",
                "parent_id": 420100,
                "sort": 4
            }, {"id": 420105, "name": "汉阳区", "parent_id": 420100, "sort": 5}, {
                "id": 420106,
                "name": "武昌区",
                "parent_id": 420100,
                "sort": 6
            }, {"id": 420107, "name": "青山区", "parent_id": 420100, "sort": 7}, {
                "id": 420111,
                "name": "洪山区",
                "parent_id": 420100,
                "sort": 8
            }, {"id": 420112, "name": "东西湖区", "parent_id": 420100, "sort": 9}, {
                "id": 420113,
                "name": "汉南区",
                "parent_id": 420100,
                "sort": 10
            }, {"id": 420114, "name": "蔡甸区", "parent_id": 420100, "sort": 11}, {
                "id": 420115,
                "name": "江夏区",
                "parent_id": 420100,
                "sort": 12
            }, {"id": 420116, "name": "黄陂区", "parent_id": 420100, "sort": 13}, {
                "id": 420117,
                "name": "新洲区",
                "parent_id": 420100,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 420200,
            "name": "黄石市",
            "parent_id": 420000,
            "sort": 2,
            "sub": [{"id": 420201, "name": "市辖区", "parent_id": 420200, "sort": 1}, {
                "id": 420202,
                "name": "黄石港区",
                "parent_id": 420200,
                "sort": 2
            }, {"id": 420203, "name": "西塞山区", "parent_id": 420200, "sort": 3}, {
                "id": 420204,
                "name": "下陆区",
                "parent_id": 420200,
                "sort": 4
            }, {"id": 420205, "name": "铁山区", "parent_id": 420200, "sort": 5}, {
                "id": 420222,
                "name": "阳新县",
                "parent_id": 420200,
                "sort": 6
            }, {"id": 420281, "name": "大冶市", "parent_id": 420200, "sort": 7}],
            "type": 0
        }, {
            "id": 420300,
            "name": "十堰市",
            "parent_id": 420000,
            "sort": 3,
            "sub": [{"id": 420301, "name": "市辖区", "parent_id": 420300, "sort": 1}, {
                "id": 420302,
                "name": "茅箭区",
                "parent_id": 420300,
                "sort": 2
            }, {"id": 420303, "name": "张湾区", "parent_id": 420300, "sort": 3}, {
                "id": 420321,
                "name": "郧　县",
                "parent_id": 420300,
                "sort": 4
            }, {"id": 420322, "name": "郧西县", "parent_id": 420300, "sort": 5}, {
                "id": 420323,
                "name": "竹山县",
                "parent_id": 420300,
                "sort": 6
            }, {"id": 420324, "name": "竹溪县", "parent_id": 420300, "sort": 7}, {
                "id": 420325,
                "name": "房　县",
                "parent_id": 420300,
                "sort": 8
            }, {"id": 420381, "name": "丹江口市", "parent_id": 420300, "sort": 9}],
            "type": 0
        }, {
            "id": 420500,
            "name": "宜昌市",
            "parent_id": 420000,
            "sort": 4,
            "sub": [{"id": 420501, "name": "市辖区", "parent_id": 420500, "sort": 1}, {
                "id": 420502,
                "name": "西陵区",
                "parent_id": 420500,
                "sort": 2
            }, {"id": 420503, "name": "伍家岗区", "parent_id": 420500, "sort": 3}, {
                "id": 420504,
                "name": "点军区",
                "parent_id": 420500,
                "sort": 4
            }, {"id": 420505, "name": "猇亭区", "parent_id": 420500, "sort": 5}, {
                "id": 420506,
                "name": "夷陵区",
                "parent_id": 420500,
                "sort": 6
            }, {"id": 420525, "name": "远安县", "parent_id": 420500, "sort": 7}, {
                "id": 420526,
                "name": "兴山县",
                "parent_id": 420500,
                "sort": 8
            }, {"id": 420527, "name": "秭归县", "parent_id": 420500, "sort": 9}, {
                "id": 420528,
                "name": "长阳土家族自治县",
                "parent_id": 420500,
                "sort": 10
            }, {"id": 420529, "name": "五峰土家族自治县", "parent_id": 420500, "sort": 11}, {
                "id": 420581,
                "name": "宜都市",
                "parent_id": 420500,
                "sort": 12
            }, {"id": 420582, "name": "当阳市", "parent_id": 420500, "sort": 13}, {
                "id": 420583,
                "name": "枝江市",
                "parent_id": 420500,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 420600,
            "name": "襄樊市",
            "parent_id": 420000,
            "sort": 5,
            "sub": [{"id": 420601, "name": "市辖区", "parent_id": 420600, "sort": 1}, {
                "id": 420602,
                "name": "襄城区",
                "parent_id": 420600,
                "sort": 2
            }, {"id": 420606, "name": "樊城区", "parent_id": 420600, "sort": 3}, {
                "id": 420607,
                "name": "襄阳区",
                "parent_id": 420600,
                "sort": 4
            }, {"id": 420624, "name": "南漳县", "parent_id": 420600, "sort": 5}, {
                "id": 420625,
                "name": "谷城县",
                "parent_id": 420600,
                "sort": 6
            }, {"id": 420626, "name": "保康县", "parent_id": 420600, "sort": 7}, {
                "id": 420682,
                "name": "老河口市",
                "parent_id": 420600,
                "sort": 8
            }, {"id": 420683, "name": "枣阳市", "parent_id": 420600, "sort": 9}, {
                "id": 420684,
                "name": "宜城市",
                "parent_id": 420600,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 420700,
            "name": "鄂州市",
            "parent_id": 420000,
            "sort": 6,
            "sub": [{"id": 420701, "name": "市辖区", "parent_id": 420700, "sort": 1}, {
                "id": 420702,
                "name": "梁子湖区",
                "parent_id": 420700,
                "sort": 2
            }, {"id": 420703, "name": "华容区", "parent_id": 420700, "sort": 3}, {
                "id": 420704,
                "name": "鄂城区",
                "parent_id": 420700,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 420800,
            "name": "荆门市",
            "parent_id": 420000,
            "sort": 7,
            "sub": [{"id": 420801, "name": "市辖区", "parent_id": 420800, "sort": 1}, {
                "id": 420802,
                "name": "东宝区",
                "parent_id": 420800,
                "sort": 2
            }, {"id": 420804, "name": "掇刀区", "parent_id": 420800, "sort": 3}, {
                "id": 420821,
                "name": "京山县",
                "parent_id": 420800,
                "sort": 4
            }, {"id": 420822, "name": "沙洋县", "parent_id": 420800, "sort": 5}, {
                "id": 420881,
                "name": "钟祥市",
                "parent_id": 420800,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 420900,
            "name": "孝感市",
            "parent_id": 420000,
            "sort": 8,
            "sub": [{"id": 420901, "name": "市辖区", "parent_id": 420900, "sort": 1}, {
                "id": 420902,
                "name": "孝南区",
                "parent_id": 420900,
                "sort": 2
            }, {"id": 420921, "name": "孝昌县", "parent_id": 420900, "sort": 3}, {
                "id": 420922,
                "name": "大悟县",
                "parent_id": 420900,
                "sort": 4
            }, {"id": 420923, "name": "云梦县", "parent_id": 420900, "sort": 5}, {
                "id": 420981,
                "name": "应城市",
                "parent_id": 420900,
                "sort": 6
            }, {"id": 420982, "name": "安陆市", "parent_id": 420900, "sort": 7}, {
                "id": 420984,
                "name": "汉川市",
                "parent_id": 420900,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 421000,
            "name": "荆州市",
            "parent_id": 420000,
            "sort": 9,
            "sub": [{"id": 421001, "name": "市辖区", "parent_id": 421000, "sort": 1}, {
                "id": 421002,
                "name": "沙市区",
                "parent_id": 421000,
                "sort": 2
            }, {"id": 421003, "name": "荆州区", "parent_id": 421000, "sort": 3}, {
                "id": 421022,
                "name": "公安县",
                "parent_id": 421000,
                "sort": 4
            }, {"id": 421023, "name": "监利县", "parent_id": 421000, "sort": 5}, {
                "id": 421024,
                "name": "江陵县",
                "parent_id": 421000,
                "sort": 6
            }, {"id": 421081, "name": "石首市", "parent_id": 421000, "sort": 7}, {
                "id": 421083,
                "name": "洪湖市",
                "parent_id": 421000,
                "sort": 8
            }, {"id": 421087, "name": "松滋市", "parent_id": 421000, "sort": 9}],
            "type": 0
        }, {
            "id": 421100,
            "name": "黄冈市",
            "parent_id": 420000,
            "sort": 10,
            "sub": [{"id": 421101, "name": "市辖区", "parent_id": 421100, "sort": 1}, {
                "id": 421102,
                "name": "黄州区",
                "parent_id": 421100,
                "sort": 2
            }, {"id": 421121, "name": "团风县", "parent_id": 421100, "sort": 3}, {
                "id": 421122,
                "name": "红安县",
                "parent_id": 421100,
                "sort": 4
            }, {"id": 421123, "name": "罗田县", "parent_id": 421100, "sort": 5}, {
                "id": 421124,
                "name": "英山县",
                "parent_id": 421100,
                "sort": 6
            }, {"id": 421125, "name": "浠水县", "parent_id": 421100, "sort": 7}, {
                "id": 421126,
                "name": "蕲春县",
                "parent_id": 421100,
                "sort": 8
            }, {"id": 421127, "name": "黄梅县", "parent_id": 421100, "sort": 9}, {
                "id": 421181,
                "name": "麻城市",
                "parent_id": 421100,
                "sort": 10
            }, {"id": 421182, "name": "武穴市", "parent_id": 421100, "sort": 11}],
            "type": 0
        }, {
            "id": 421200,
            "name": "咸宁市",
            "parent_id": 420000,
            "sort": 11,
            "sub": [{"id": 421201, "name": "市辖区", "parent_id": 421200, "sort": 1}, {
                "id": 421202,
                "name": "咸安区",
                "parent_id": 421200,
                "sort": 2
            }, {"id": 421221, "name": "嘉鱼县", "parent_id": 421200, "sort": 3}, {
                "id": 421222,
                "name": "通城县",
                "parent_id": 421200,
                "sort": 4
            }, {"id": 421223, "name": "崇阳县", "parent_id": 421200, "sort": 5}, {
                "id": 421224,
                "name": "通山县",
                "parent_id": 421200,
                "sort": 6
            }, {"id": 421281, "name": "赤壁市", "parent_id": 421200, "sort": 7}],
            "type": 0
        }, {
            "id": 421300,
            "name": "随州市",
            "parent_id": 420000,
            "sort": 12,
            "sub": [{"id": 421301, "name": "市辖区", "parent_id": 421300, "sort": 1}, {
                "id": 421302,
                "name": "曾都区",
                "parent_id": 421300,
                "sort": 2
            }, {"id": 421381, "name": "广水市", "parent_id": 421300, "sort": 3}],
            "type": 0
        }, {
            "id": 422800,
            "name": "恩施土家族苗族自治州",
            "parent_id": 420000,
            "sort": 13,
            "sub": [{"id": 422801, "name": "恩施市", "parent_id": 422800, "sort": 1}, {
                "id": 422802,
                "name": "利川市",
                "parent_id": 422800,
                "sort": 2
            }, {"id": 422822, "name": "建始县", "parent_id": 422800, "sort": 3}, {
                "id": 422823,
                "name": "巴东县",
                "parent_id": 422800,
                "sort": 4
            }, {"id": 422825, "name": "宣恩县", "parent_id": 422800, "sort": 5}, {
                "id": 422826,
                "name": "咸丰县",
                "parent_id": 422800,
                "sort": 6
            }, {"id": 422827, "name": "来凤县", "parent_id": 422800, "sort": 7}, {
                "id": 422828,
                "name": "鹤峰县",
                "parent_id": 422800,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 429000,
            "name": "省直辖行政单位",
            "parent_id": 420000,
            "sort": 14,
            "sub": [{"id": 429004, "name": "仙桃市", "parent_id": 429000, "sort": 1}, {
                "id": 429005,
                "name": "潜江市",
                "parent_id": 429000,
                "sort": 2
            }, {"id": 429006, "name": "天门市", "parent_id": 429000, "sort": 3}, {
                "id": 429021,
                "name": "神农架林区",
                "parent_id": 429000,
                "sort": 4
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 430000,
        "name": "湖南省",
        "parent_id": 0,
        "sort": 18,
        "sub": [{
            "id": 430100,
            "name": "长沙市",
            "parent_id": 430000,
            "sort": 1,
            "sub": [{"id": 430101, "name": "市辖区", "parent_id": 430100, "sort": 1}, {
                "id": 430102,
                "name": "芙蓉区",
                "parent_id": 430100,
                "sort": 2
            }, {"id": 430103, "name": "天心区", "parent_id": 430100, "sort": 3}, {
                "id": 430104,
                "name": "岳麓区",
                "parent_id": 430100,
                "sort": 4
            }, {"id": 430105, "name": "开福区", "parent_id": 430100, "sort": 5}, {
                "id": 430111,
                "name": "雨花区",
                "parent_id": 430100,
                "sort": 6
            }, {"id": 430121, "name": "长沙县", "parent_id": 430100, "sort": 7}, {
                "id": 430122,
                "name": "望城县",
                "parent_id": 430100,
                "sort": 8
            }, {"id": 430124, "name": "宁乡县", "parent_id": 430100, "sort": 9}, {
                "id": 430181,
                "name": "浏阳市",
                "parent_id": 430100,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 430200,
            "name": "株洲市",
            "parent_id": 430000,
            "sort": 2,
            "sub": [{"id": 430201, "name": "市辖区", "parent_id": 430200, "sort": 1}, {
                "id": 430202,
                "name": "荷塘区",
                "parent_id": 430200,
                "sort": 2
            }, {"id": 430203, "name": "芦淞区", "parent_id": 430200, "sort": 3}, {
                "id": 430204,
                "name": "石峰区",
                "parent_id": 430200,
                "sort": 4
            }, {"id": 430211, "name": "天元区", "parent_id": 430200, "sort": 5}, {
                "id": 430221,
                "name": "株洲县",
                "parent_id": 430200,
                "sort": 6
            }, {"id": 430223, "name": "攸　县", "parent_id": 430200, "sort": 7}, {
                "id": 430224,
                "name": "茶陵县",
                "parent_id": 430200,
                "sort": 8
            }, {"id": 430225, "name": "炎陵县", "parent_id": 430200, "sort": 9}, {
                "id": 430281,
                "name": "醴陵市",
                "parent_id": 430200,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 430300,
            "name": "湘潭市",
            "parent_id": 430000,
            "sort": 3,
            "sub": [{"id": 430301, "name": "市辖区", "parent_id": 430300, "sort": 1}, {
                "id": 430302,
                "name": "雨湖区",
                "parent_id": 430300,
                "sort": 2
            }, {"id": 430304, "name": "岳塘区", "parent_id": 430300, "sort": 3}, {
                "id": 430321,
                "name": "湘潭县",
                "parent_id": 430300,
                "sort": 4
            }, {"id": 430381, "name": "湘乡市", "parent_id": 430300, "sort": 5}, {
                "id": 430382,
                "name": "韶山市",
                "parent_id": 430300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 430400,
            "name": "衡阳市",
            "parent_id": 430000,
            "sort": 4,
            "sub": [{"id": 430401, "name": "市辖区", "parent_id": 430400, "sort": 1}, {
                "id": 430405,
                "name": "珠晖区",
                "parent_id": 430400,
                "sort": 2
            }, {"id": 430406, "name": "雁峰区", "parent_id": 430400, "sort": 3}, {
                "id": 430407,
                "name": "石鼓区",
                "parent_id": 430400,
                "sort": 4
            }, {"id": 430408, "name": "蒸湘区", "parent_id": 430400, "sort": 5}, {
                "id": 430412,
                "name": "南岳区",
                "parent_id": 430400,
                "sort": 6
            }, {"id": 430421, "name": "衡阳县", "parent_id": 430400, "sort": 7}, {
                "id": 430422,
                "name": "衡南县",
                "parent_id": 430400,
                "sort": 8
            }, {"id": 430423, "name": "衡山县", "parent_id": 430400, "sort": 9}, {
                "id": 430424,
                "name": "衡东县",
                "parent_id": 430400,
                "sort": 10
            }, {"id": 430426, "name": "祁东县", "parent_id": 430400, "sort": 11}, {
                "id": 430481,
                "name": "耒阳市",
                "parent_id": 430400,
                "sort": 12
            }, {"id": 430482, "name": "常宁市", "parent_id": 430400, "sort": 13}],
            "type": 0
        }, {
            "id": 430500,
            "name": "邵阳市",
            "parent_id": 430000,
            "sort": 5,
            "sub": [{"id": 430501, "name": "市辖区", "parent_id": 430500, "sort": 1}, {
                "id": 430502,
                "name": "双清区",
                "parent_id": 430500,
                "sort": 2
            }, {"id": 430503, "name": "大祥区", "parent_id": 430500, "sort": 3}, {
                "id": 430511,
                "name": "北塔区",
                "parent_id": 430500,
                "sort": 4
            }, {"id": 430521, "name": "邵东县", "parent_id": 430500, "sort": 5}, {
                "id": 430522,
                "name": "新邵县",
                "parent_id": 430500,
                "sort": 6
            }, {"id": 430523, "name": "邵阳县", "parent_id": 430500, "sort": 7}, {
                "id": 430524,
                "name": "隆回县",
                "parent_id": 430500,
                "sort": 8
            }, {"id": 430525, "name": "洞口县", "parent_id": 430500, "sort": 9}, {
                "id": 430527,
                "name": "绥宁县",
                "parent_id": 430500,
                "sort": 10
            }, {"id": 430528, "name": "新宁县", "parent_id": 430500, "sort": 11}, {
                "id": 430529,
                "name": "城步苗族自治县",
                "parent_id": 430500,
                "sort": 12
            }, {"id": 430581, "name": "武冈市", "parent_id": 430500, "sort": 13}],
            "type": 0
        }, {
            "id": 430600,
            "name": "岳阳市",
            "parent_id": 430000,
            "sort": 6,
            "sub": [{"id": 430601, "name": "市辖区", "parent_id": 430600, "sort": 1}, {
                "id": 430602,
                "name": "岳阳楼区",
                "parent_id": 430600,
                "sort": 2
            }, {"id": 430603, "name": "云溪区", "parent_id": 430600, "sort": 3}, {
                "id": 430611,
                "name": "君山区",
                "parent_id": 430600,
                "sort": 4
            }, {"id": 430621, "name": "岳阳县", "parent_id": 430600, "sort": 5}, {
                "id": 430623,
                "name": "华容县",
                "parent_id": 430600,
                "sort": 6
            }, {"id": 430624, "name": "湘阴县", "parent_id": 430600, "sort": 7}, {
                "id": 430626,
                "name": "平江县",
                "parent_id": 430600,
                "sort": 8
            }, {"id": 430681, "name": "汨罗市", "parent_id": 430600, "sort": 9}, {
                "id": 430682,
                "name": "临湘市",
                "parent_id": 430600,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 430700,
            "name": "常德市",
            "parent_id": 430000,
            "sort": 7,
            "sub": [{"id": 430701, "name": "市辖区", "parent_id": 430700, "sort": 1}, {
                "id": 430702,
                "name": "武陵区",
                "parent_id": 430700,
                "sort": 2
            }, {"id": 430703, "name": "鼎城区", "parent_id": 430700, "sort": 3}, {
                "id": 430721,
                "name": "安乡县",
                "parent_id": 430700,
                "sort": 4
            }, {"id": 430722, "name": "汉寿县", "parent_id": 430700, "sort": 5}, {
                "id": 430723,
                "name": "澧　县",
                "parent_id": 430700,
                "sort": 6
            }, {"id": 430724, "name": "临澧县", "parent_id": 430700, "sort": 7}, {
                "id": 430725,
                "name": "桃源县",
                "parent_id": 430700,
                "sort": 8
            }, {"id": 430726, "name": "石门县", "parent_id": 430700, "sort": 9}, {
                "id": 430781,
                "name": "津市市",
                "parent_id": 430700,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 430800,
            "name": "张家界市",
            "parent_id": 430000,
            "sort": 8,
            "sub": [{"id": 430801, "name": "市辖区", "parent_id": 430800, "sort": 1}, {
                "id": 430802,
                "name": "永定区",
                "parent_id": 430800,
                "sort": 2
            }, {"id": 430811, "name": "武陵源区", "parent_id": 430800, "sort": 3}, {
                "id": 430821,
                "name": "慈利县",
                "parent_id": 430800,
                "sort": 4
            }, {"id": 430822, "name": "桑植县", "parent_id": 430800, "sort": 5}],
            "type": 0
        }, {
            "id": 430900,
            "name": "益阳市",
            "parent_id": 430000,
            "sort": 9,
            "sub": [{"id": 430901, "name": "市辖区", "parent_id": 430900, "sort": 1}, {
                "id": 430902,
                "name": "资阳区",
                "parent_id": 430900,
                "sort": 2
            }, {"id": 430903, "name": "赫山区", "parent_id": 430900, "sort": 3}, {
                "id": 430921,
                "name": "南　县",
                "parent_id": 430900,
                "sort": 4
            }, {"id": 430922, "name": "桃江县", "parent_id": 430900, "sort": 5}, {
                "id": 430923,
                "name": "安化县",
                "parent_id": 430900,
                "sort": 6
            }, {"id": 430981, "name": "沅江市", "parent_id": 430900, "sort": 7}],
            "type": 0
        }, {
            "id": 431000,
            "name": "郴州市",
            "parent_id": 430000,
            "sort": 10,
            "sub": [{"id": 431001, "name": "市辖区", "parent_id": 431000, "sort": 1}, {
                "id": 431002,
                "name": "北湖区",
                "parent_id": 431000,
                "sort": 2
            }, {"id": 431003, "name": "苏仙区", "parent_id": 431000, "sort": 3}, {
                "id": 431021,
                "name": "桂阳县",
                "parent_id": 431000,
                "sort": 4
            }, {"id": 431022, "name": "宜章县", "parent_id": 431000, "sort": 5}, {
                "id": 431023,
                "name": "永兴县",
                "parent_id": 431000,
                "sort": 6
            }, {"id": 431024, "name": "嘉禾县", "parent_id": 431000, "sort": 7}, {
                "id": 431025,
                "name": "临武县",
                "parent_id": 431000,
                "sort": 8
            }, {"id": 431026, "name": "汝城县", "parent_id": 431000, "sort": 9}, {
                "id": 431027,
                "name": "桂东县",
                "parent_id": 431000,
                "sort": 10
            }, {"id": 431028, "name": "安仁县", "parent_id": 431000, "sort": 11}, {
                "id": 431081,
                "name": "资兴市",
                "parent_id": 431000,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 431100,
            "name": "永州市",
            "parent_id": 430000,
            "sort": 11,
            "sub": [{"id": 431101, "name": "市辖区", "parent_id": 431100, "sort": 1}, {
                "id": 431102,
                "name": "芝山区",
                "parent_id": 431100,
                "sort": 2
            }, {"id": 431103, "name": "冷水滩区", "parent_id": 431100, "sort": 3}, {
                "id": 431121,
                "name": "祁阳县",
                "parent_id": 431100,
                "sort": 4
            }, {"id": 431122, "name": "东安县", "parent_id": 431100, "sort": 5}, {
                "id": 431123,
                "name": "双牌县",
                "parent_id": 431100,
                "sort": 6
            }, {"id": 431124, "name": "道　县", "parent_id": 431100, "sort": 7}, {
                "id": 431125,
                "name": "江永县",
                "parent_id": 431100,
                "sort": 8
            }, {"id": 431126, "name": "宁远县", "parent_id": 431100, "sort": 9}, {
                "id": 431127,
                "name": "蓝山县",
                "parent_id": 431100,
                "sort": 10
            }, {"id": 431128, "name": "新田县", "parent_id": 431100, "sort": 11}, {
                "id": 431129,
                "name": "江华瑶族自治县",
                "parent_id": 431100,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 431200,
            "name": "怀化市",
            "parent_id": 430000,
            "sort": 12,
            "sub": [{"id": 431201, "name": "市辖区", "parent_id": 431200, "sort": 1}, {
                "id": 431202,
                "name": "鹤城区",
                "parent_id": 431200,
                "sort": 2
            }, {"id": 431221, "name": "中方县", "parent_id": 431200, "sort": 3}, {
                "id": 431222,
                "name": "沅陵县",
                "parent_id": 431200,
                "sort": 4
            }, {"id": 431223, "name": "辰溪县", "parent_id": 431200, "sort": 5}, {
                "id": 431224,
                "name": "溆浦县",
                "parent_id": 431200,
                "sort": 6
            }, {"id": 431225, "name": "会同县", "parent_id": 431200, "sort": 7}, {
                "id": 431226,
                "name": "麻阳苗族自治县",
                "parent_id": 431200,
                "sort": 8
            }, {"id": 431227, "name": "新晃侗族自治县", "parent_id": 431200, "sort": 9}, {
                "id": 431228,
                "name": "芷江侗族自治县",
                "parent_id": 431200,
                "sort": 10
            }, {"id": 431229, "name": "靖州苗族侗族自治县", "parent_id": 431200, "sort": 11}, {
                "id": 431230,
                "name": "通道侗族自治县",
                "parent_id": 431200,
                "sort": 12
            }, {"id": 431281, "name": "洪江市", "parent_id": 431200, "sort": 13}],
            "type": 0
        }, {
            "id": 431300,
            "name": "娄底市",
            "parent_id": 430000,
            "sort": 13,
            "sub": [{"id": 431301, "name": "市辖区", "parent_id": 431300, "sort": 1}, {
                "id": 431302,
                "name": "娄星区",
                "parent_id": 431300,
                "sort": 2
            }, {"id": 431321, "name": "双峰县", "parent_id": 431300, "sort": 3}, {
                "id": 431322,
                "name": "新化县",
                "parent_id": 431300,
                "sort": 4
            }, {"id": 431381, "name": "冷水江市", "parent_id": 431300, "sort": 5}, {
                "id": 431382,
                "name": "涟源市",
                "parent_id": 431300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 433100,
            "name": "湘西土家族苗族自治州",
            "parent_id": 430000,
            "sort": 14,
            "sub": [{"id": 433101, "name": "吉首市", "parent_id": 433100, "sort": 1}, {
                "id": 433122,
                "name": "泸溪县",
                "parent_id": 433100,
                "sort": 2
            }, {"id": 433123, "name": "凤凰县", "parent_id": 433100, "sort": 3}, {
                "id": 433124,
                "name": "花垣县",
                "parent_id": 433100,
                "sort": 4
            }, {"id": 433125, "name": "保靖县", "parent_id": 433100, "sort": 5}, {
                "id": 433126,
                "name": "古丈县",
                "parent_id": 433100,
                "sort": 6
            }, {"id": 433127, "name": "永顺县", "parent_id": 433100, "sort": 7}, {
                "id": 433130,
                "name": "龙山县",
                "parent_id": 433100,
                "sort": 8
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 440000,
        "name": "广东省",
        "parent_id": 0,
        "sort": 19,
        "sub": [{
            "id": 440100,
            "name": "广州市",
            "parent_id": 440000,
            "sort": 1,
            "sub": [{"id": 440101, "name": "市辖区", "parent_id": 440100, "sort": 1}, {
                "id": 440102,
                "name": "东山区",
                "parent_id": 440100,
                "sort": 2
            }, {"id": 440103, "name": "荔湾区", "parent_id": 440100, "sort": 3}, {
                "id": 440104,
                "name": "越秀区",
                "parent_id": 440100,
                "sort": 4
            }, {"id": 440105, "name": "海珠区", "parent_id": 440100, "sort": 5}, {
                "id": 440106,
                "name": "天河区",
                "parent_id": 440100,
                "sort": 6
            }, {"id": 440107, "name": "芳村区", "parent_id": 440100, "sort": 7}, {
                "id": 440111,
                "name": "白云区",
                "parent_id": 440100,
                "sort": 8
            }, {"id": 440112, "name": "黄埔区", "parent_id": 440100, "sort": 9}, {
                "id": 440113,
                "name": "番禺区",
                "parent_id": 440100,
                "sort": 10
            }, {"id": 440114, "name": "花都区", "parent_id": 440100, "sort": 11}, {
                "id": 440183,
                "name": "增城市",
                "parent_id": 440100,
                "sort": 12
            }, {"id": 440184, "name": "从化市", "parent_id": 440100, "sort": 13}],
            "type": 0
        }, {
            "id": 440200,
            "name": "韶关市",
            "parent_id": 440000,
            "sort": 2,
            "sub": [{"id": 440201, "name": "市辖区", "parent_id": 440200, "sort": 1}, {
                "id": 440203,
                "name": "武江区",
                "parent_id": 440200,
                "sort": 2
            }, {"id": 440204, "name": "浈江区", "parent_id": 440200, "sort": 3}, {
                "id": 440205,
                "name": "曲江区",
                "parent_id": 440200,
                "sort": 4
            }, {"id": 440222, "name": "始兴县", "parent_id": 440200, "sort": 5}, {
                "id": 440224,
                "name": "仁化县",
                "parent_id": 440200,
                "sort": 6
            }, {"id": 440229, "name": "翁源县", "parent_id": 440200, "sort": 7}, {
                "id": 440232,
                "name": "乳源瑶族自治县",
                "parent_id": 440200,
                "sort": 8
            }, {"id": 440233, "name": "新丰县", "parent_id": 440200, "sort": 9}, {
                "id": 440281,
                "name": "乐昌市",
                "parent_id": 440200,
                "sort": 10
            }, {"id": 440282, "name": "南雄市", "parent_id": 440200, "sort": 11}],
            "type": 0
        }, {
            "id": 440300,
            "name": "深圳市",
            "parent_id": 440000,
            "sort": 3,
            "sub": [{"id": 440301, "name": "市辖区", "parent_id": 440300, "sort": 1}, {
                "id": 440303,
                "name": "罗湖区",
                "parent_id": 440300,
                "sort": 2
            }, {"id": 440304, "name": "福田区", "parent_id": 440300, "sort": 3}, {
                "id": 440305,
                "name": "南山区",
                "parent_id": 440300,
                "sort": 4
            }, {"id": 440306, "name": "宝安区", "parent_id": 440300, "sort": 5}, {
                "id": 440307,
                "name": "龙岗区",
                "parent_id": 440300,
                "sort": 6
            }, {"id": 440308, "name": "盐田区", "parent_id": 440300, "sort": 7}],
            "type": 0
        }, {
            "id": 440400,
            "name": "珠海市",
            "parent_id": 440000,
            "sort": 4,
            "sub": [{"id": 440401, "name": "市辖区", "parent_id": 440400, "sort": 1}, {
                "id": 440402,
                "name": "香洲区",
                "parent_id": 440400,
                "sort": 2
            }, {"id": 440403, "name": "斗门区", "parent_id": 440400, "sort": 3}, {
                "id": 440404,
                "name": "金湾区",
                "parent_id": 440400,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 440500,
            "name": "汕头市",
            "parent_id": 440000,
            "sort": 5,
            "sub": [{"id": 440501, "name": "市辖区", "parent_id": 440500, "sort": 1}, {
                "id": 440507,
                "name": "龙湖区",
                "parent_id": 440500,
                "sort": 2
            }, {"id": 440511, "name": "金平区", "parent_id": 440500, "sort": 3}, {
                "id": 440512,
                "name": "濠江区",
                "parent_id": 440500,
                "sort": 4
            }, {"id": 440513, "name": "潮阳区", "parent_id": 440500, "sort": 5}, {
                "id": 440514,
                "name": "潮南区",
                "parent_id": 440500,
                "sort": 6
            }, {"id": 440515, "name": "澄海区", "parent_id": 440500, "sort": 7}, {
                "id": 440523,
                "name": "南澳县",
                "parent_id": 440500,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 440600,
            "name": "佛山市",
            "parent_id": 440000,
            "sort": 6,
            "sub": [{"id": 440601, "name": "市辖区", "parent_id": 440600, "sort": 1}, {
                "id": 440604,
                "name": "禅城区",
                "parent_id": 440600,
                "sort": 2
            }, {"id": 440605, "name": "南海区", "parent_id": 440600, "sort": 3}, {
                "id": 440606,
                "name": "顺德区",
                "parent_id": 440600,
                "sort": 4
            }, {"id": 440607, "name": "三水区", "parent_id": 440600, "sort": 5}, {
                "id": 440608,
                "name": "高明区",
                "parent_id": 440600,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 440700,
            "name": "江门市",
            "parent_id": 440000,
            "sort": 7,
            "sub": [{"id": 440701, "name": "市辖区", "parent_id": 440700, "sort": 1}, {
                "id": 440703,
                "name": "蓬江区",
                "parent_id": 440700,
                "sort": 2
            }, {"id": 440704, "name": "江海区", "parent_id": 440700, "sort": 3}, {
                "id": 440705,
                "name": "新会区",
                "parent_id": 440700,
                "sort": 4
            }, {"id": 440781, "name": "台山市", "parent_id": 440700, "sort": 5}, {
                "id": 440783,
                "name": "开平市",
                "parent_id": 440700,
                "sort": 6
            }, {"id": 440784, "name": "鹤山市", "parent_id": 440700, "sort": 7}, {
                "id": 440785,
                "name": "恩平市",
                "parent_id": 440700,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 440800,
            "name": "湛江市",
            "parent_id": 440000,
            "sort": 8,
            "sub": [{"id": 440801, "name": "市辖区", "parent_id": 440800, "sort": 1}, {
                "id": 440802,
                "name": "赤坎区",
                "parent_id": 440800,
                "sort": 2
            }, {"id": 440803, "name": "霞山区", "parent_id": 440800, "sort": 3}, {
                "id": 440804,
                "name": "坡头区",
                "parent_id": 440800,
                "sort": 4
            }, {"id": 440811, "name": "麻章区", "parent_id": 440800, "sort": 5}, {
                "id": 440823,
                "name": "遂溪县",
                "parent_id": 440800,
                "sort": 6
            }, {"id": 440825, "name": "徐闻县", "parent_id": 440800, "sort": 7}, {
                "id": 440881,
                "name": "廉江市",
                "parent_id": 440800,
                "sort": 8
            }, {"id": 440882, "name": "雷州市", "parent_id": 440800, "sort": 9}, {
                "id": 440883,
                "name": "吴川市",
                "parent_id": 440800,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 440900,
            "name": "茂名市",
            "parent_id": 440000,
            "sort": 9,
            "sub": [{"id": 440901, "name": "市辖区", "parent_id": 440900, "sort": 1}, {
                "id": 440902,
                "name": "茂南区",
                "parent_id": 440900,
                "sort": 2
            }, {"id": 440903, "name": "茂港区", "parent_id": 440900, "sort": 3}, {
                "id": 440923,
                "name": "电白县",
                "parent_id": 440900,
                "sort": 4
            }, {"id": 440981, "name": "高州市", "parent_id": 440900, "sort": 5}, {
                "id": 440982,
                "name": "化州市",
                "parent_id": 440900,
                "sort": 6
            }, {"id": 440983, "name": "信宜市", "parent_id": 440900, "sort": 7}],
            "type": 0
        }, {
            "id": 441200,
            "name": "肇庆市",
            "parent_id": 440000,
            "sort": 10,
            "sub": [{"id": 441201, "name": "市辖区", "parent_id": 441200, "sort": 1}, {
                "id": 441202,
                "name": "端州区",
                "parent_id": 441200,
                "sort": 2
            }, {"id": 441203, "name": "鼎湖区", "parent_id": 441200, "sort": 3}, {
                "id": 441223,
                "name": "广宁县",
                "parent_id": 441200,
                "sort": 4
            }, {"id": 441224, "name": "怀集县", "parent_id": 441200, "sort": 5}, {
                "id": 441225,
                "name": "封开县",
                "parent_id": 441200,
                "sort": 6
            }, {"id": 441226, "name": "德庆县", "parent_id": 441200, "sort": 7}, {
                "id": 441283,
                "name": "高要市",
                "parent_id": 441200,
                "sort": 8
            }, {"id": 441284, "name": "四会市", "parent_id": 441200, "sort": 9}],
            "type": 0
        }, {
            "id": 441300,
            "name": "惠州市",
            "parent_id": 440000,
            "sort": 11,
            "sub": [{"id": 441301, "name": "市辖区", "parent_id": 441300, "sort": 1}, {
                "id": 441302,
                "name": "惠城区",
                "parent_id": 441300,
                "sort": 2
            }, {"id": 441303, "name": "惠阳区", "parent_id": 441300, "sort": 3}, {
                "id": 441322,
                "name": "博罗县",
                "parent_id": 441300,
                "sort": 4
            }, {"id": 441323, "name": "惠东县", "parent_id": 441300, "sort": 5}, {
                "id": 441324,
                "name": "龙门县",
                "parent_id": 441300,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 441400,
            "name": "梅州市",
            "parent_id": 440000,
            "sort": 12,
            "sub": [{"id": 441401, "name": "市辖区", "parent_id": 441400, "sort": 1}, {
                "id": 441402,
                "name": "梅江区",
                "parent_id": 441400,
                "sort": 2
            }, {"id": 441421, "name": "梅　县", "parent_id": 441400, "sort": 3}, {
                "id": 441422,
                "name": "大埔县",
                "parent_id": 441400,
                "sort": 4
            }, {"id": 441423, "name": "丰顺县", "parent_id": 441400, "sort": 5}, {
                "id": 441424,
                "name": "五华县",
                "parent_id": 441400,
                "sort": 6
            }, {"id": 441426, "name": "平远县", "parent_id": 441400, "sort": 7}, {
                "id": 441427,
                "name": "蕉岭县",
                "parent_id": 441400,
                "sort": 8
            }, {"id": 441481, "name": "兴宁市", "parent_id": 441400, "sort": 9}],
            "type": 0
        }, {
            "id": 441500,
            "name": "汕尾市",
            "parent_id": 440000,
            "sort": 13,
            "sub": [{"id": 441501, "name": "市辖区", "parent_id": 441500, "sort": 1}, {
                "id": 441502,
                "name": "城　区",
                "parent_id": 441500,
                "sort": 2
            }, {"id": 441521, "name": "海丰县", "parent_id": 441500, "sort": 3}, {
                "id": 441523,
                "name": "陆河县",
                "parent_id": 441500,
                "sort": 4
            }, {"id": 441581, "name": "陆丰市", "parent_id": 441500, "sort": 5}],
            "type": 0
        }, {
            "id": 441600,
            "name": "河源市",
            "parent_id": 440000,
            "sort": 14,
            "sub": [{"id": 441601, "name": "市辖区", "parent_id": 441600, "sort": 1}, {
                "id": 441602,
                "name": "源城区",
                "parent_id": 441600,
                "sort": 2
            }, {"id": 441621, "name": "紫金县", "parent_id": 441600, "sort": 3}, {
                "id": 441622,
                "name": "龙川县",
                "parent_id": 441600,
                "sort": 4
            }, {"id": 441623, "name": "连平县", "parent_id": 441600, "sort": 5}, {
                "id": 441624,
                "name": "和平县",
                "parent_id": 441600,
                "sort": 6
            }, {"id": 441625, "name": "东源县", "parent_id": 441600, "sort": 7}],
            "type": 0
        }, {
            "id": 441700,
            "name": "阳江市",
            "parent_id": 440000,
            "sort": 15,
            "sub": [{"id": 441701, "name": "市辖区", "parent_id": 441700, "sort": 1}, {
                "id": 441702,
                "name": "江城区",
                "parent_id": 441700,
                "sort": 2
            }, {"id": 441721, "name": "阳西县", "parent_id": 441700, "sort": 3}, {
                "id": 441723,
                "name": "阳东县",
                "parent_id": 441700,
                "sort": 4
            }, {"id": 441781, "name": "阳春市", "parent_id": 441700, "sort": 5}],
            "type": 0
        }, {
            "id": 441800,
            "name": "清远市",
            "parent_id": 440000,
            "sort": 16,
            "sub": [{"id": 441801, "name": "市辖区", "parent_id": 441800, "sort": 1}, {
                "id": 441802,
                "name": "清城区",
                "parent_id": 441800,
                "sort": 2
            }, {"id": 441821, "name": "佛冈县", "parent_id": 441800, "sort": 3}, {
                "id": 441823,
                "name": "阳山县",
                "parent_id": 441800,
                "sort": 4
            }, {"id": 441825, "name": "连山壮族瑶族自治县", "parent_id": 441800, "sort": 5}, {
                "id": 441826,
                "name": "连南瑶族自治县",
                "parent_id": 441800,
                "sort": 6
            }, {"id": 441827, "name": "清新县", "parent_id": 441800, "sort": 7}, {
                "id": 441881,
                "name": "英德市",
                "parent_id": 441800,
                "sort": 8
            }, {"id": 441882, "name": "连州市", "parent_id": 441800, "sort": 9}],
            "type": 0
        }, {
            "id": 441900,
            "name": "东莞市",
            "parent_id": 440000,
            "sort": 17,
            "sub": [{"id": 910006, "name": "东莞市", "parent_id": 441900, "sort": 1}],
            "type": 0
        }, {
            "id": 442000,
            "name": "中山市",
            "parent_id": 440000,
            "sort": 18,
            "sub": [{"id": 910005, "name": "中山市", "parent_id": 442000, "sort": 1}],
            "type": 0
        }, {
            "id": 445100,
            "name": "潮州市",
            "parent_id": 440000,
            "sort": 19,
            "sub": [{"id": 445101, "name": "市辖区", "parent_id": 445100, "sort": 1}, {
                "id": 445102,
                "name": "湘桥区",
                "parent_id": 445100,
                "sort": 2
            }, {"id": 445121, "name": "潮安县", "parent_id": 445100, "sort": 3}, {
                "id": 445122,
                "name": "饶平县",
                "parent_id": 445100,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 445200,
            "name": "揭阳市",
            "parent_id": 440000,
            "sort": 20,
            "sub": [{"id": 445201, "name": "市辖区", "parent_id": 445200, "sort": 1}, {
                "id": 445202,
                "name": "榕城区",
                "parent_id": 445200,
                "sort": 2
            }, {"id": 445221, "name": "揭东县", "parent_id": 445200, "sort": 3}, {
                "id": 445222,
                "name": "揭西县",
                "parent_id": 445200,
                "sort": 4
            }, {"id": 445224, "name": "惠来县", "parent_id": 445200, "sort": 5}, {
                "id": 445281,
                "name": "普宁市",
                "parent_id": 445200,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 445300,
            "name": "云浮市",
            "parent_id": 440000,
            "sort": 21,
            "sub": [{"id": 445301, "name": "市辖区", "parent_id": 445300, "sort": 1}, {
                "id": 445302,
                "name": "云城区",
                "parent_id": 445300,
                "sort": 2
            }, {"id": 445321, "name": "新兴县", "parent_id": 445300, "sort": 3}, {
                "id": 445322,
                "name": "郁南县",
                "parent_id": 445300,
                "sort": 4
            }, {"id": 445323, "name": "云安县", "parent_id": 445300, "sort": 5}, {
                "id": 445381,
                "name": "罗定市",
                "parent_id": 445300,
                "sort": 6
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 450000,
        "name": "广西省",
        "parent_id": 0,
        "sort": 20,
        "sub": [{
            "id": 450100,
            "name": "南宁市",
            "parent_id": 450000,
            "sort": 1,
            "sub": [{"id": 450101, "name": "市辖区", "parent_id": 450100, "sort": 1}, {
                "id": 450102,
                "name": "兴宁区",
                "parent_id": 450100,
                "sort": 2
            }, {"id": 450103, "name": "青秀区", "parent_id": 450100, "sort": 3}, {
                "id": 450105,
                "name": "江南区",
                "parent_id": 450100,
                "sort": 4
            }, {"id": 450107, "name": "西乡塘区", "parent_id": 450100, "sort": 5}, {
                "id": 450108,
                "name": "良庆区",
                "parent_id": 450100,
                "sort": 6
            }, {"id": 450109, "name": "邕宁区", "parent_id": 450100, "sort": 7}, {
                "id": 450122,
                "name": "武鸣县",
                "parent_id": 450100,
                "sort": 8
            }, {"id": 450123, "name": "隆安县", "parent_id": 450100, "sort": 9}, {
                "id": 450124,
                "name": "马山县",
                "parent_id": 450100,
                "sort": 10
            }, {"id": 450125, "name": "上林县", "parent_id": 450100, "sort": 11}, {
                "id": 450126,
                "name": "宾阳县",
                "parent_id": 450100,
                "sort": 12
            }, {"id": 450127, "name": "横　县", "parent_id": 450100, "sort": 13}],
            "type": 0
        }, {
            "id": 450200,
            "name": "柳州市",
            "parent_id": 450000,
            "sort": 2,
            "sub": [{"id": 450201, "name": "市辖区", "parent_id": 450200, "sort": 1}, {
                "id": 450202,
                "name": "城中区",
                "parent_id": 450200,
                "sort": 2
            }, {"id": 450203, "name": "鱼峰区", "parent_id": 450200, "sort": 3}, {
                "id": 450204,
                "name": "柳南区",
                "parent_id": 450200,
                "sort": 4
            }, {"id": 450205, "name": "柳北区", "parent_id": 450200, "sort": 5}, {
                "id": 450221,
                "name": "柳江县",
                "parent_id": 450200,
                "sort": 6
            }, {"id": 450222, "name": "柳城县", "parent_id": 450200, "sort": 7}, {
                "id": 450223,
                "name": "鹿寨县",
                "parent_id": 450200,
                "sort": 8
            }, {"id": 450224, "name": "融安县", "parent_id": 450200, "sort": 9}, {
                "id": 450225,
                "name": "融水苗族自治县",
                "parent_id": 450200,
                "sort": 10
            }, {"id": 450226, "name": "三江侗族自治县", "parent_id": 450200, "sort": 11}],
            "type": 0
        }, {
            "id": 450300,
            "name": "桂林市",
            "parent_id": 450000,
            "sort": 3,
            "sub": [{"id": 450301, "name": "市辖区", "parent_id": 450300, "sort": 1}, {
                "id": 450302,
                "name": "秀峰区",
                "parent_id": 450300,
                "sort": 2
            }, {"id": 450303, "name": "叠彩区", "parent_id": 450300, "sort": 3}, {
                "id": 450304,
                "name": "象山区",
                "parent_id": 450300,
                "sort": 4
            }, {"id": 450305, "name": "七星区", "parent_id": 450300, "sort": 5}, {
                "id": 450311,
                "name": "雁山区",
                "parent_id": 450300,
                "sort": 6
            }, {"id": 450321, "name": "阳朔县", "parent_id": 450300, "sort": 7}, {
                "id": 450322,
                "name": "临桂县",
                "parent_id": 450300,
                "sort": 8
            }, {"id": 450323, "name": "灵川县", "parent_id": 450300, "sort": 9}, {
                "id": 450324,
                "name": "全州县",
                "parent_id": 450300,
                "sort": 10
            }, {"id": 450325, "name": "兴安县", "parent_id": 450300, "sort": 11}, {
                "id": 450326,
                "name": "永福县",
                "parent_id": 450300,
                "sort": 12
            }, {"id": 450327, "name": "灌阳县", "parent_id": 450300, "sort": 13}, {
                "id": 450328,
                "name": "龙胜各族自治县",
                "parent_id": 450300,
                "sort": 14
            }, {"id": 450329, "name": "资源县", "parent_id": 450300, "sort": 15}, {
                "id": 450330,
                "name": "平乐县",
                "parent_id": 450300,
                "sort": 16
            }, {"id": 450331, "name": "荔蒲县", "parent_id": 450300, "sort": 17}, {
                "id": 450332,
                "name": "恭城瑶族自治县",
                "parent_id": 450300,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 450400,
            "name": "梧州市",
            "parent_id": 450000,
            "sort": 4,
            "sub": [{"id": 450401, "name": "市辖区", "parent_id": 450400, "sort": 1}, {
                "id": 450403,
                "name": "万秀区",
                "parent_id": 450400,
                "sort": 2
            }, {"id": 450404, "name": "蝶山区", "parent_id": 450400, "sort": 3}, {
                "id": 450405,
                "name": "长洲区",
                "parent_id": 450400,
                "sort": 4
            }, {"id": 450421, "name": "苍梧县", "parent_id": 450400, "sort": 5}, {
                "id": 450422,
                "name": "藤　县",
                "parent_id": 450400,
                "sort": 6
            }, {"id": 450423, "name": "蒙山县", "parent_id": 450400, "sort": 7}, {
                "id": 450481,
                "name": "岑溪市",
                "parent_id": 450400,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 450500,
            "name": "北海市",
            "parent_id": 450000,
            "sort": 5,
            "sub": [{"id": 450501, "name": "市辖区", "parent_id": 450500, "sort": 1}, {
                "id": 450502,
                "name": "海城区",
                "parent_id": 450500,
                "sort": 2
            }, {"id": 450503, "name": "银海区", "parent_id": 450500, "sort": 3}, {
                "id": 450512,
                "name": "铁山港区",
                "parent_id": 450500,
                "sort": 4
            }, {"id": 450521, "name": "合浦县", "parent_id": 450500, "sort": 5}],
            "type": 0
        }, {
            "id": 450600,
            "name": "防城港市",
            "parent_id": 450000,
            "sort": 6,
            "sub": [{"id": 450601, "name": "市辖区", "parent_id": 450600, "sort": 1}, {
                "id": 450602,
                "name": "港口区",
                "parent_id": 450600,
                "sort": 2
            }, {"id": 450603, "name": "防城区", "parent_id": 450600, "sort": 3}, {
                "id": 450621,
                "name": "上思县",
                "parent_id": 450600,
                "sort": 4
            }, {"id": 450681, "name": "东兴市", "parent_id": 450600, "sort": 5}],
            "type": 0
        }, {
            "id": 450700,
            "name": "钦州市",
            "parent_id": 450000,
            "sort": 7,
            "sub": [{"id": 450701, "name": "市辖区", "parent_id": 450700, "sort": 1}, {
                "id": 450702,
                "name": "钦南区",
                "parent_id": 450700,
                "sort": 2
            }, {"id": 450703, "name": "钦北区", "parent_id": 450700, "sort": 3}, {
                "id": 450721,
                "name": "灵山县",
                "parent_id": 450700,
                "sort": 4
            }, {"id": 450722, "name": "浦北县", "parent_id": 450700, "sort": 5}],
            "type": 0
        }, {
            "id": 450800,
            "name": "贵港市",
            "parent_id": 450000,
            "sort": 8,
            "sub": [{"id": 450801, "name": "市辖区", "parent_id": 450800, "sort": 1}, {
                "id": 450802,
                "name": "港北区",
                "parent_id": 450800,
                "sort": 2
            }, {"id": 450803, "name": "港南区", "parent_id": 450800, "sort": 3}, {
                "id": 450804,
                "name": "覃塘区",
                "parent_id": 450800,
                "sort": 4
            }, {"id": 450821, "name": "平南县", "parent_id": 450800, "sort": 5}, {
                "id": 450881,
                "name": "桂平市",
                "parent_id": 450800,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 450900,
            "name": "玉林市",
            "parent_id": 450000,
            "sort": 9,
            "sub": [{"id": 450901, "name": "市辖区", "parent_id": 450900, "sort": 1}, {
                "id": 450902,
                "name": "玉州区",
                "parent_id": 450900,
                "sort": 2
            }, {"id": 450921, "name": "容　县", "parent_id": 450900, "sort": 3}, {
                "id": 450922,
                "name": "陆川县",
                "parent_id": 450900,
                "sort": 4
            }, {"id": 450923, "name": "博白县", "parent_id": 450900, "sort": 5}, {
                "id": 450924,
                "name": "兴业县",
                "parent_id": 450900,
                "sort": 6
            }, {"id": 450981, "name": "北流市", "parent_id": 450900, "sort": 7}],
            "type": 0
        }, {
            "id": 451000,
            "name": "百色市",
            "parent_id": 450000,
            "sort": 10,
            "sub": [{"id": 451001, "name": "市辖区", "parent_id": 451000, "sort": 1}, {
                "id": 451002,
                "name": "右江区",
                "parent_id": 451000,
                "sort": 2
            }, {"id": 451021, "name": "田阳县", "parent_id": 451000, "sort": 3}, {
                "id": 451022,
                "name": "田东县",
                "parent_id": 451000,
                "sort": 4
            }, {"id": 451023, "name": "平果县", "parent_id": 451000, "sort": 5}, {
                "id": 451024,
                "name": "德保县",
                "parent_id": 451000,
                "sort": 6
            }, {"id": 451025, "name": "靖西县", "parent_id": 451000, "sort": 7}, {
                "id": 451026,
                "name": "那坡县",
                "parent_id": 451000,
                "sort": 8
            }, {"id": 451027, "name": "凌云县", "parent_id": 451000, "sort": 9}, {
                "id": 451028,
                "name": "乐业县",
                "parent_id": 451000,
                "sort": 10
            }, {"id": 451029, "name": "田林县", "parent_id": 451000, "sort": 11}, {
                "id": 451030,
                "name": "西林县",
                "parent_id": 451000,
                "sort": 12
            }, {"id": 451031, "name": "隆林各族自治县", "parent_id": 451000, "sort": 13}],
            "type": 0
        }, {
            "id": 451100,
            "name": "贺州市",
            "parent_id": 450000,
            "sort": 11,
            "sub": [{"id": 451101, "name": "市辖区", "parent_id": 451100, "sort": 1}, {
                "id": 451102,
                "name": "八步区",
                "parent_id": 451100,
                "sort": 2
            }, {"id": 451121, "name": "昭平县", "parent_id": 451100, "sort": 3}, {
                "id": 451122,
                "name": "钟山县",
                "parent_id": 451100,
                "sort": 4
            }, {"id": 451123, "name": "富川瑶族自治县", "parent_id": 451100, "sort": 5}],
            "type": 0
        }, {
            "id": 451200,
            "name": "河池市",
            "parent_id": 450000,
            "sort": 12,
            "sub": [{"id": 451201, "name": "市辖区", "parent_id": 451200, "sort": 1}, {
                "id": 451202,
                "name": "金城江区",
                "parent_id": 451200,
                "sort": 2
            }, {"id": 451221, "name": "南丹县", "parent_id": 451200, "sort": 3}, {
                "id": 451222,
                "name": "天峨县",
                "parent_id": 451200,
                "sort": 4
            }, {"id": 451223, "name": "凤山县", "parent_id": 451200, "sort": 5}, {
                "id": 451224,
                "name": "东兰县",
                "parent_id": 451200,
                "sort": 6
            }, {"id": 451225, "name": "罗城仫佬族自治县", "parent_id": 451200, "sort": 7}, {
                "id": 451226,
                "name": "环江毛南族自治县",
                "parent_id": 451200,
                "sort": 8
            }, {"id": 451227, "name": "巴马瑶族自治县", "parent_id": 451200, "sort": 9}, {
                "id": 451228,
                "name": "都安瑶族自治县",
                "parent_id": 451200,
                "sort": 10
            }, {"id": 451229, "name": "大化瑶族自治县", "parent_id": 451200, "sort": 11}, {
                "id": 451281,
                "name": "宜州市",
                "parent_id": 451200,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 451300,
            "name": "来宾市",
            "parent_id": 450000,
            "sort": 13,
            "sub": [{"id": 451301, "name": "市辖区", "parent_id": 451300, "sort": 1}, {
                "id": 451302,
                "name": "兴宾区",
                "parent_id": 451300,
                "sort": 2
            }, {"id": 451321, "name": "忻城县", "parent_id": 451300, "sort": 3}, {
                "id": 451322,
                "name": "象州县",
                "parent_id": 451300,
                "sort": 4
            }, {"id": 451323, "name": "武宣县", "parent_id": 451300, "sort": 5}, {
                "id": 451324,
                "name": "金秀瑶族自治县",
                "parent_id": 451300,
                "sort": 6
            }, {"id": 451381, "name": "合山市", "parent_id": 451300, "sort": 7}],
            "type": 0
        }, {
            "id": 451400,
            "name": "崇左市",
            "parent_id": 450000,
            "sort": 14,
            "sub": [{"id": 451401, "name": "市辖区", "parent_id": 451400, "sort": 1}, {
                "id": 451402,
                "name": "江洲区",
                "parent_id": 451400,
                "sort": 2
            }, {"id": 451421, "name": "扶绥县", "parent_id": 451400, "sort": 3}, {
                "id": 451422,
                "name": "宁明县",
                "parent_id": 451400,
                "sort": 4
            }, {"id": 451423, "name": "龙州县", "parent_id": 451400, "sort": 5}, {
                "id": 451424,
                "name": "大新县",
                "parent_id": 451400,
                "sort": 6
            }, {"id": 451425, "name": "天等县", "parent_id": 451400, "sort": 7}, {
                "id": 451481,
                "name": "凭祥市",
                "parent_id": 451400,
                "sort": 8
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 460000,
        "name": "海南省",
        "parent_id": 0,
        "sort": 21,
        "sub": [{
            "id": 460100,
            "name": "海口市",
            "parent_id": 460000,
            "sort": 1,
            "sub": [{"id": 460101, "name": "市辖区", "parent_id": 460100, "sort": 1}, {
                "id": 460105,
                "name": "秀英区",
                "parent_id": 460100,
                "sort": 2
            }, {"id": 460106, "name": "龙华区", "parent_id": 460100, "sort": 3}, {
                "id": 460107,
                "name": "琼山区",
                "parent_id": 460100,
                "sort": 4
            }, {"id": 460108, "name": "美兰区", "parent_id": 460100, "sort": 5}],
            "type": 0
        }, {
            "id": 460200,
            "name": "三亚市",
            "parent_id": 460000,
            "sort": 2,
            "sub": [{"id": 460201, "name": "市辖区", "parent_id": 460200, "sort": 1}],
            "type": 0
        }, {
            "id": 469000,
            "name": "省直辖县级行政单位",
            "parent_id": 460000,
            "sort": 3,
            "sub": [{"id": 469001, "name": "五指山市", "parent_id": 469000, "sort": 1}, {
                "id": 469002,
                "name": "琼海市",
                "parent_id": 469000,
                "sort": 2
            }, {"id": 469003, "name": "儋州市", "parent_id": 469000, "sort": 3}, {
                "id": 469005,
                "name": "文昌市",
                "parent_id": 469000,
                "sort": 4
            }, {"id": 469006, "name": "万宁市", "parent_id": 469000, "sort": 5}, {
                "id": 469007,
                "name": "东方市",
                "parent_id": 469000,
                "sort": 6
            }, {"id": 469025, "name": "定安县", "parent_id": 469000, "sort": 7}, {
                "id": 469026,
                "name": "屯昌县",
                "parent_id": 469000,
                "sort": 8
            }, {"id": 469027, "name": "澄迈县", "parent_id": 469000, "sort": 9}, {
                "id": 469028,
                "name": "临高县",
                "parent_id": 469000,
                "sort": 10
            }, {"id": 469030, "name": "白沙黎族自治县", "parent_id": 469000, "sort": 11}, {
                "id": 469031,
                "name": "昌江黎族自治县",
                "parent_id": 469000,
                "sort": 12
            }, {"id": 469033, "name": "乐东黎族自治县", "parent_id": 469000, "sort": 13}, {
                "id": 469034,
                "name": "陵水黎族自治县",
                "parent_id": 469000,
                "sort": 14
            }, {"id": 469035, "name": "保亭黎族苗族自治县", "parent_id": 469000, "sort": 15}, {
                "id": 469036,
                "name": "琼中黎族苗族自治县",
                "parent_id": 469000,
                "sort": 16
            }, {"id": 469037, "name": "西沙群岛", "parent_id": 469000, "sort": 17}, {
                "id": 469038,
                "name": "南沙群岛",
                "parent_id": 469000,
                "sort": 18
            }, {"id": 469039, "name": "中沙群岛的岛礁及其海域", "parent_id": 469000, "sort": 19}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 500000,
        "name": "重庆市",
        "parent_id": 0,
        "sort": 22,
        "sub": [{
            "id": 500100,
            "name": "市辖区",
            "parent_id": 500000,
            "sort": 1,
            "sub": [{"id": 500101, "name": "万州区", "parent_id": 500100, "sort": 1}, {
                "id": 500102,
                "name": "涪陵区",
                "parent_id": 500100,
                "sort": 2
            }, {"id": 500103, "name": "渝中区", "parent_id": 500100, "sort": 3}, {
                "id": 500104,
                "name": "大渡口区",
                "parent_id": 500100,
                "sort": 4
            }, {"id": 500105, "name": "江北区", "parent_id": 500100, "sort": 5}, {
                "id": 500106,
                "name": "沙坪坝区",
                "parent_id": 500100,
                "sort": 6
            }, {"id": 500107, "name": "九龙坡区", "parent_id": 500100, "sort": 7}, {
                "id": 500108,
                "name": "南岸区",
                "parent_id": 500100,
                "sort": 8
            }, {"id": 500109, "name": "北碚区", "parent_id": 500100, "sort": 9}, {
                "id": 500110,
                "name": "万盛区",
                "parent_id": 500100,
                "sort": 10
            }, {"id": 500111, "name": "双桥区", "parent_id": 500100, "sort": 11}, {
                "id": 500112,
                "name": "渝北区",
                "parent_id": 500100,
                "sort": 12
            }, {"id": 500113, "name": "巴南区", "parent_id": 500100, "sort": 13}, {
                "id": 500114,
                "name": "黔江区",
                "parent_id": 500100,
                "sort": 14
            }, {"id": 500115, "name": "长寿区", "parent_id": 500100, "sort": 15}],
            "type": 0
        }, {
            "id": 500200,
            "name": "县",
            "parent_id": 500000,
            "sort": 2,
            "sub": [{"id": 500222, "name": "綦江县", "parent_id": 500200, "sort": 1}, {
                "id": 500223,
                "name": "潼南县",
                "parent_id": 500200,
                "sort": 2
            }, {"id": 500224, "name": "铜梁县", "parent_id": 500200, "sort": 3}, {
                "id": 500225,
                "name": "大足县",
                "parent_id": 500200,
                "sort": 4
            }, {"id": 500226, "name": "荣昌县", "parent_id": 500200, "sort": 5}, {
                "id": 500227,
                "name": "璧山县",
                "parent_id": 500200,
                "sort": 6
            }, {"id": 500228, "name": "梁平县", "parent_id": 500200, "sort": 7}, {
                "id": 500229,
                "name": "城口县",
                "parent_id": 500200,
                "sort": 8
            }, {"id": 500230, "name": "丰都县", "parent_id": 500200, "sort": 9}, {
                "id": 500231,
                "name": "垫江县",
                "parent_id": 500200,
                "sort": 10
            }, {"id": 500232, "name": "武隆县", "parent_id": 500200, "sort": 11}, {
                "id": 500233,
                "name": "忠　县",
                "parent_id": 500200,
                "sort": 12
            }, {"id": 500234, "name": "开　县", "parent_id": 500200, "sort": 13}, {
                "id": 500235,
                "name": "云阳县",
                "parent_id": 500200,
                "sort": 14
            }, {"id": 500236, "name": "奉节县", "parent_id": 500200, "sort": 15}, {
                "id": 500237,
                "name": "巫山县",
                "parent_id": 500200,
                "sort": 16
            }, {"id": 500238, "name": "巫溪县", "parent_id": 500200, "sort": 17}, {
                "id": 500240,
                "name": "石柱土家族自治县",
                "parent_id": 500200,
                "sort": 18
            }, {"id": 500241, "name": "秀山土家族苗族自治县", "parent_id": 500200, "sort": 19}, {
                "id": 500242,
                "name": "酉阳土家族苗族自治县",
                "parent_id": 500200,
                "sort": 20
            }, {"id": 500243, "name": "彭水苗族土家族自治县", "parent_id": 500200, "sort": 21}],
            "type": 0
        }, {
            "id": 500300,
            "name": "市",
            "parent_id": 500000,
            "sort": 3,
            "sub": [{"id": 500381, "name": "江津市", "parent_id": 500300, "sort": 1}, {
                "id": 500382,
                "name": "合川市",
                "parent_id": 500300,
                "sort": 2
            }, {"id": 500383, "name": "永川市", "parent_id": 500300, "sort": 3}, {
                "id": 500384,
                "name": "南川市",
                "parent_id": 500300,
                "sort": 4
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 510000,
        "name": "四川省",
        "parent_id": 0,
        "sort": 23,
        "sub": [{
            "id": 510100,
            "name": "成都市",
            "parent_id": 510000,
            "sort": 1,
            "sub": [{"id": 510101, "name": "市辖区", "parent_id": 510100, "sort": 1}, {
                "id": 510104,
                "name": "锦江区",
                "parent_id": 510100,
                "sort": 2
            }, {"id": 510105, "name": "青羊区", "parent_id": 510100, "sort": 3}, {
                "id": 510106,
                "name": "金牛区",
                "parent_id": 510100,
                "sort": 4
            }, {"id": 510107, "name": "武侯区", "parent_id": 510100, "sort": 5}, {
                "id": 510108,
                "name": "成华区",
                "parent_id": 510100,
                "sort": 6
            }, {"id": 510112, "name": "龙泉驿区", "parent_id": 510100, "sort": 7}, {
                "id": 510113,
                "name": "青白江区",
                "parent_id": 510100,
                "sort": 8
            }, {"id": 510114, "name": "新都区", "parent_id": 510100, "sort": 9}, {
                "id": 510115,
                "name": "温江区",
                "parent_id": 510100,
                "sort": 10
            }, {"id": 510121, "name": "金堂县", "parent_id": 510100, "sort": 11}, {
                "id": 510122,
                "name": "双流县",
                "parent_id": 510100,
                "sort": 12
            }, {"id": 510124, "name": "郫　县", "parent_id": 510100, "sort": 13}, {
                "id": 510129,
                "name": "大邑县",
                "parent_id": 510100,
                "sort": 14
            }, {"id": 510131, "name": "蒲江县", "parent_id": 510100, "sort": 15}, {
                "id": 510132,
                "name": "新津县",
                "parent_id": 510100,
                "sort": 16
            }, {"id": 510181, "name": "都江堰市", "parent_id": 510100, "sort": 17}, {
                "id": 510182,
                "name": "彭州市",
                "parent_id": 510100,
                "sort": 18
            }, {"id": 510183, "name": "邛崃市", "parent_id": 510100, "sort": 19}, {
                "id": 510184,
                "name": "崇州市",
                "parent_id": 510100,
                "sort": 20
            }],
            "type": 0
        }, {
            "id": 510300,
            "name": "自贡市",
            "parent_id": 510000,
            "sort": 2,
            "sub": [{"id": 510301, "name": "市辖区", "parent_id": 510300, "sort": 1}, {
                "id": 510302,
                "name": "自流井区",
                "parent_id": 510300,
                "sort": 2
            }, {"id": 510303, "name": "贡井区", "parent_id": 510300, "sort": 3}, {
                "id": 510304,
                "name": "大安区",
                "parent_id": 510300,
                "sort": 4
            }, {"id": 510311, "name": "沿滩区", "parent_id": 510300, "sort": 5}, {
                "id": 510321,
                "name": "荣　县",
                "parent_id": 510300,
                "sort": 6
            }, {"id": 510322, "name": "富顺县", "parent_id": 510300, "sort": 7}],
            "type": 0
        }, {
            "id": 510400,
            "name": "攀枝花市",
            "parent_id": 510000,
            "sort": 3,
            "sub": [{"id": 510401, "name": "市辖区", "parent_id": 510400, "sort": 1}, {
                "id": 510402,
                "name": "东　区",
                "parent_id": 510400,
                "sort": 2
            }, {"id": 510403, "name": "西　区", "parent_id": 510400, "sort": 3}, {
                "id": 510411,
                "name": "仁和区",
                "parent_id": 510400,
                "sort": 4
            }, {"id": 510421, "name": "米易县", "parent_id": 510400, "sort": 5}, {
                "id": 510422,
                "name": "盐边县",
                "parent_id": 510400,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 510500,
            "name": "泸州市",
            "parent_id": 510000,
            "sort": 4,
            "sub": [{"id": 510501, "name": "市辖区", "parent_id": 510500, "sort": 1}, {
                "id": 510502,
                "name": "江阳区",
                "parent_id": 510500,
                "sort": 2
            }, {"id": 510503, "name": "纳溪区", "parent_id": 510500, "sort": 3}, {
                "id": 510504,
                "name": "龙马潭区",
                "parent_id": 510500,
                "sort": 4
            }, {"id": 510521, "name": "泸　县", "parent_id": 510500, "sort": 5}, {
                "id": 510522,
                "name": "合江县",
                "parent_id": 510500,
                "sort": 6
            }, {"id": 510524, "name": "叙永县", "parent_id": 510500, "sort": 7}, {
                "id": 510525,
                "name": "古蔺县",
                "parent_id": 510500,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 510600,
            "name": "德阳市",
            "parent_id": 510000,
            "sort": 5,
            "sub": [{"id": 510601, "name": "市辖区", "parent_id": 510600, "sort": 1}, {
                "id": 510603,
                "name": "旌阳区",
                "parent_id": 510600,
                "sort": 2
            }, {"id": 510623, "name": "中江县", "parent_id": 510600, "sort": 3}, {
                "id": 510626,
                "name": "罗江县",
                "parent_id": 510600,
                "sort": 4
            }, {"id": 510681, "name": "广汉市", "parent_id": 510600, "sort": 5}, {
                "id": 510682,
                "name": "什邡市",
                "parent_id": 510600,
                "sort": 6
            }, {"id": 510683, "name": "绵竹市", "parent_id": 510600, "sort": 7}],
            "type": 0
        }, {
            "id": 510700,
            "name": "绵阳市",
            "parent_id": 510000,
            "sort": 6,
            "sub": [{"id": 510701, "name": "市辖区", "parent_id": 510700, "sort": 1}, {
                "id": 510703,
                "name": "涪城区",
                "parent_id": 510700,
                "sort": 2
            }, {"id": 510704, "name": "游仙区", "parent_id": 510700, "sort": 3}, {
                "id": 510722,
                "name": "三台县",
                "parent_id": 510700,
                "sort": 4
            }, {"id": 510723, "name": "盐亭县", "parent_id": 510700, "sort": 5}, {
                "id": 510724,
                "name": "安　县",
                "parent_id": 510700,
                "sort": 6
            }, {"id": 510725, "name": "梓潼县", "parent_id": 510700, "sort": 7}, {
                "id": 510726,
                "name": "北川羌族自治县",
                "parent_id": 510700,
                "sort": 8
            }, {"id": 510727, "name": "平武县", "parent_id": 510700, "sort": 9}, {
                "id": 510781,
                "name": "江油市",
                "parent_id": 510700,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 510800,
            "name": "广元市",
            "parent_id": 510000,
            "sort": 7,
            "sub": [{"id": 510801, "name": "市辖区", "parent_id": 510800, "sort": 1}, {
                "id": 510802,
                "name": "市中区",
                "parent_id": 510800,
                "sort": 2
            }, {"id": 510811, "name": "元坝区", "parent_id": 510800, "sort": 3}, {
                "id": 510812,
                "name": "朝天区",
                "parent_id": 510800,
                "sort": 4
            }, {"id": 510821, "name": "旺苍县", "parent_id": 510800, "sort": 5}, {
                "id": 510822,
                "name": "青川县",
                "parent_id": 510800,
                "sort": 6
            }, {"id": 510823, "name": "剑阁县", "parent_id": 510800, "sort": 7}, {
                "id": 510824,
                "name": "苍溪县",
                "parent_id": 510800,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 510900,
            "name": "遂宁市",
            "parent_id": 510000,
            "sort": 8,
            "sub": [{"id": 510901, "name": "市辖区", "parent_id": 510900, "sort": 1}, {
                "id": 510903,
                "name": "船山区",
                "parent_id": 510900,
                "sort": 2
            }, {"id": 510904, "name": "安居区", "parent_id": 510900, "sort": 3}, {
                "id": 510921,
                "name": "蓬溪县",
                "parent_id": 510900,
                "sort": 4
            }, {"id": 510922, "name": "射洪县", "parent_id": 510900, "sort": 5}, {
                "id": 510923,
                "name": "大英县",
                "parent_id": 510900,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 511000,
            "name": "内江市",
            "parent_id": 510000,
            "sort": 9,
            "sub": [{"id": 511001, "name": "市辖区", "parent_id": 511000, "sort": 1}, {
                "id": 511002,
                "name": "市中区",
                "parent_id": 511000,
                "sort": 2
            }, {"id": 511011, "name": "东兴区", "parent_id": 511000, "sort": 3}, {
                "id": 511024,
                "name": "威远县",
                "parent_id": 511000,
                "sort": 4
            }, {"id": 511025, "name": "资中县", "parent_id": 511000, "sort": 5}, {
                "id": 511028,
                "name": "隆昌县",
                "parent_id": 511000,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 511100,
            "name": "乐山市",
            "parent_id": 510000,
            "sort": 10,
            "sub": [{"id": 511101, "name": "市辖区", "parent_id": 511100, "sort": 1}, {
                "id": 511102,
                "name": "市中区",
                "parent_id": 511100,
                "sort": 2
            }, {"id": 511111, "name": "沙湾区", "parent_id": 511100, "sort": 3}, {
                "id": 511112,
                "name": "五通桥区",
                "parent_id": 511100,
                "sort": 4
            }, {"id": 511113, "name": "金口河区", "parent_id": 511100, "sort": 5}, {
                "id": 511123,
                "name": "犍为县",
                "parent_id": 511100,
                "sort": 6
            }, {"id": 511124, "name": "井研县", "parent_id": 511100, "sort": 7}, {
                "id": 511126,
                "name": "夹江县",
                "parent_id": 511100,
                "sort": 8
            }, {"id": 511129, "name": "沐川县", "parent_id": 511100, "sort": 9}, {
                "id": 511132,
                "name": "峨边彝族自治县",
                "parent_id": 511100,
                "sort": 10
            }, {"id": 511133, "name": "马边彝族自治县", "parent_id": 511100, "sort": 11}, {
                "id": 511181,
                "name": "峨眉山市",
                "parent_id": 511100,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 511300,
            "name": "南充市",
            "parent_id": 510000,
            "sort": 11,
            "sub": [{"id": 511301, "name": "市辖区", "parent_id": 511300, "sort": 1}, {
                "id": 511302,
                "name": "顺庆区",
                "parent_id": 511300,
                "sort": 2
            }, {"id": 511303, "name": "高坪区", "parent_id": 511300, "sort": 3}, {
                "id": 511304,
                "name": "嘉陵区",
                "parent_id": 511300,
                "sort": 4
            }, {"id": 511321, "name": "南部县", "parent_id": 511300, "sort": 5}, {
                "id": 511322,
                "name": "营山县",
                "parent_id": 511300,
                "sort": 6
            }, {"id": 511323, "name": "蓬安县", "parent_id": 511300, "sort": 7}, {
                "id": 511324,
                "name": "仪陇县",
                "parent_id": 511300,
                "sort": 8
            }, {"id": 511325, "name": "西充县", "parent_id": 511300, "sort": 9}, {
                "id": 511381,
                "name": "阆中市",
                "parent_id": 511300,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 511400,
            "name": "眉山市",
            "parent_id": 510000,
            "sort": 12,
            "sub": [{"id": 511401, "name": "市辖区", "parent_id": 511400, "sort": 1}, {
                "id": 511402,
                "name": "东坡区",
                "parent_id": 511400,
                "sort": 2
            }, {"id": 511421, "name": "仁寿县", "parent_id": 511400, "sort": 3}, {
                "id": 511422,
                "name": "彭山县",
                "parent_id": 511400,
                "sort": 4
            }, {"id": 511423, "name": "洪雅县", "parent_id": 511400, "sort": 5}, {
                "id": 511424,
                "name": "丹棱县",
                "parent_id": 511400,
                "sort": 6
            }, {"id": 511425, "name": "青神县", "parent_id": 511400, "sort": 7}],
            "type": 0
        }, {
            "id": 511500,
            "name": "宜宾市",
            "parent_id": 510000,
            "sort": 13,
            "sub": [{"id": 511501, "name": "市辖区", "parent_id": 511500, "sort": 1}, {
                "id": 511502,
                "name": "翠屏区",
                "parent_id": 511500,
                "sort": 2
            }, {"id": 511521, "name": "宜宾县", "parent_id": 511500, "sort": 3}, {
                "id": 511522,
                "name": "南溪县",
                "parent_id": 511500,
                "sort": 4
            }, {"id": 511523, "name": "江安县", "parent_id": 511500, "sort": 5}, {
                "id": 511524,
                "name": "长宁县",
                "parent_id": 511500,
                "sort": 6
            }, {"id": 511525, "name": "高　县", "parent_id": 511500, "sort": 7}, {
                "id": 511526,
                "name": "珙　县",
                "parent_id": 511500,
                "sort": 8
            }, {"id": 511527, "name": "筠连县", "parent_id": 511500, "sort": 9}, {
                "id": 511528,
                "name": "兴文县",
                "parent_id": 511500,
                "sort": 10
            }, {"id": 511529, "name": "屏山县", "parent_id": 511500, "sort": 11}],
            "type": 0
        }, {
            "id": 511600,
            "name": "广安市",
            "parent_id": 510000,
            "sort": 14,
            "sub": [{"id": 511601, "name": "市辖区", "parent_id": 511600, "sort": 1}, {
                "id": 511602,
                "name": "广安区",
                "parent_id": 511600,
                "sort": 2
            }, {"id": 511621, "name": "岳池县", "parent_id": 511600, "sort": 3}, {
                "id": 511622,
                "name": "武胜县",
                "parent_id": 511600,
                "sort": 4
            }, {"id": 511623, "name": "邻水县", "parent_id": 511600, "sort": 5}, {
                "id": 511681,
                "name": "华莹市",
                "parent_id": 511600,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 511700,
            "name": "达州市",
            "parent_id": 510000,
            "sort": 15,
            "sub": [{"id": 511701, "name": "市辖区", "parent_id": 511700, "sort": 1}, {
                "id": 511702,
                "name": "通川区",
                "parent_id": 511700,
                "sort": 2
            }, {"id": 511721, "name": "达　县", "parent_id": 511700, "sort": 3}, {
                "id": 511722,
                "name": "宣汉县",
                "parent_id": 511700,
                "sort": 4
            }, {"id": 511723, "name": "开江县", "parent_id": 511700, "sort": 5}, {
                "id": 511724,
                "name": "大竹县",
                "parent_id": 511700,
                "sort": 6
            }, {"id": 511725, "name": "渠　县", "parent_id": 511700, "sort": 7}, {
                "id": 511781,
                "name": "万源市",
                "parent_id": 511700,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 511800,
            "name": "雅安市",
            "parent_id": 510000,
            "sort": 16,
            "sub": [{"id": 511801, "name": "市辖区", "parent_id": 511800, "sort": 1}, {
                "id": 511802,
                "name": "雨城区",
                "parent_id": 511800,
                "sort": 2
            }, {"id": 511821, "name": "名山县", "parent_id": 511800, "sort": 3}, {
                "id": 511822,
                "name": "荥经县",
                "parent_id": 511800,
                "sort": 4
            }, {"id": 511823, "name": "汉源县", "parent_id": 511800, "sort": 5}, {
                "id": 511824,
                "name": "石棉县",
                "parent_id": 511800,
                "sort": 6
            }, {"id": 511825, "name": "天全县", "parent_id": 511800, "sort": 7}, {
                "id": 511826,
                "name": "芦山县",
                "parent_id": 511800,
                "sort": 8
            }, {"id": 511827, "name": "宝兴县", "parent_id": 511800, "sort": 9}],
            "type": 0
        }, {
            "id": 511900,
            "name": "巴中市",
            "parent_id": 510000,
            "sort": 17,
            "sub": [{"id": 511901, "name": "市辖区", "parent_id": 511900, "sort": 1}, {
                "id": 511902,
                "name": "巴州区",
                "parent_id": 511900,
                "sort": 2
            }, {"id": 511921, "name": "通江县", "parent_id": 511900, "sort": 3}, {
                "id": 511922,
                "name": "南江县",
                "parent_id": 511900,
                "sort": 4
            }, {"id": 511923, "name": "平昌县", "parent_id": 511900, "sort": 5}],
            "type": 0
        }, {
            "id": 512000,
            "name": "资阳市",
            "parent_id": 510000,
            "sort": 18,
            "sub": [{"id": 512001, "name": "市辖区", "parent_id": 512000, "sort": 1}, {
                "id": 512002,
                "name": "雁江区",
                "parent_id": 512000,
                "sort": 2
            }, {"id": 512021, "name": "安岳县", "parent_id": 512000, "sort": 3}, {
                "id": 512022,
                "name": "乐至县",
                "parent_id": 512000,
                "sort": 4
            }, {"id": 512081, "name": "简阳市", "parent_id": 512000, "sort": 5}],
            "type": 0
        }, {
            "id": 513200,
            "name": "阿坝藏族羌族自治州",
            "parent_id": 510000,
            "sort": 19,
            "sub": [{"id": 513221, "name": "汶川县", "parent_id": 513200, "sort": 1}, {
                "id": 513222,
                "name": "理　县",
                "parent_id": 513200,
                "sort": 2
            }, {"id": 513223, "name": "茂　县", "parent_id": 513200, "sort": 3}, {
                "id": 513224,
                "name": "松潘县",
                "parent_id": 513200,
                "sort": 4
            }, {"id": 513225, "name": "九寨沟县", "parent_id": 513200, "sort": 5}, {
                "id": 513226,
                "name": "金川县",
                "parent_id": 513200,
                "sort": 6
            }, {"id": 513227, "name": "小金县", "parent_id": 513200, "sort": 7}, {
                "id": 513228,
                "name": "黑水县",
                "parent_id": 513200,
                "sort": 8
            }, {"id": 513229, "name": "马尔康县", "parent_id": 513200, "sort": 9}, {
                "id": 513230,
                "name": "壤塘县",
                "parent_id": 513200,
                "sort": 10
            }, {"id": 513231, "name": "阿坝县", "parent_id": 513200, "sort": 11}, {
                "id": 513232,
                "name": "若尔盖县",
                "parent_id": 513200,
                "sort": 12
            }, {"id": 513233, "name": "红原县", "parent_id": 513200, "sort": 13}],
            "type": 0
        }, {
            "id": 513300,
            "name": "甘孜藏族自治州",
            "parent_id": 510000,
            "sort": 20,
            "sub": [{"id": 513321, "name": "康定县", "parent_id": 513300, "sort": 1}, {
                "id": 513322,
                "name": "泸定县",
                "parent_id": 513300,
                "sort": 2
            }, {"id": 513323, "name": "丹巴县", "parent_id": 513300, "sort": 3}, {
                "id": 513324,
                "name": "九龙县",
                "parent_id": 513300,
                "sort": 4
            }, {"id": 513325, "name": "雅江县", "parent_id": 513300, "sort": 5}, {
                "id": 513326,
                "name": "道孚县",
                "parent_id": 513300,
                "sort": 6
            }, {"id": 513327, "name": "炉霍县", "parent_id": 513300, "sort": 7}, {
                "id": 513328,
                "name": "甘孜县",
                "parent_id": 513300,
                "sort": 8
            }, {"id": 513329, "name": "新龙县", "parent_id": 513300, "sort": 9}, {
                "id": 513330,
                "name": "德格县",
                "parent_id": 513300,
                "sort": 10
            }, {"id": 513331, "name": "白玉县", "parent_id": 513300, "sort": 11}, {
                "id": 513332,
                "name": "石渠县",
                "parent_id": 513300,
                "sort": 12
            }, {"id": 513333, "name": "色达县", "parent_id": 513300, "sort": 13}, {
                "id": 513334,
                "name": "理塘县",
                "parent_id": 513300,
                "sort": 14
            }, {"id": 513335, "name": "巴塘县", "parent_id": 513300, "sort": 15}, {
                "id": 513336,
                "name": "乡城县",
                "parent_id": 513300,
                "sort": 16
            }, {"id": 513337, "name": "稻城县", "parent_id": 513300, "sort": 17}, {
                "id": 513338,
                "name": "得荣县",
                "parent_id": 513300,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 513400,
            "name": "凉山彝族自治州",
            "parent_id": 510000,
            "sort": 21,
            "sub": [{"id": 513401, "name": "西昌市", "parent_id": 513400, "sort": 1}, {
                "id": 513422,
                "name": "木里藏族自治县",
                "parent_id": 513400,
                "sort": 2
            }, {"id": 513423, "name": "盐源县", "parent_id": 513400, "sort": 3}, {
                "id": 513424,
                "name": "德昌县",
                "parent_id": 513400,
                "sort": 4
            }, {"id": 513425, "name": "会理县", "parent_id": 513400, "sort": 5}, {
                "id": 513426,
                "name": "会东县",
                "parent_id": 513400,
                "sort": 6
            }, {"id": 513427, "name": "宁南县", "parent_id": 513400, "sort": 7}, {
                "id": 513428,
                "name": "普格县",
                "parent_id": 513400,
                "sort": 8
            }, {"id": 513429, "name": "布拖县", "parent_id": 513400, "sort": 9}, {
                "id": 513430,
                "name": "金阳县",
                "parent_id": 513400,
                "sort": 10
            }, {"id": 513431, "name": "昭觉县", "parent_id": 513400, "sort": 11}, {
                "id": 513432,
                "name": "喜德县",
                "parent_id": 513400,
                "sort": 12
            }, {"id": 513433, "name": "冕宁县", "parent_id": 513400, "sort": 13}, {
                "id": 513434,
                "name": "越西县",
                "parent_id": 513400,
                "sort": 14
            }, {"id": 513435, "name": "甘洛县", "parent_id": 513400, "sort": 15}, {
                "id": 513436,
                "name": "美姑县",
                "parent_id": 513400,
                "sort": 16
            }, {"id": 513437, "name": "雷波县", "parent_id": 513400, "sort": 17}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 520000,
        "name": "贵州省",
        "parent_id": 0,
        "sort": 24,
        "sub": [{
            "id": 520100,
            "name": "贵阳市",
            "parent_id": 520000,
            "sort": 1,
            "sub": [{"id": 520101, "name": "市辖区", "parent_id": 520100, "sort": 1}, {
                "id": 520102,
                "name": "南明区",
                "parent_id": 520100,
                "sort": 2
            }, {"id": 520103, "name": "云岩区", "parent_id": 520100, "sort": 3}, {
                "id": 520111,
                "name": "花溪区",
                "parent_id": 520100,
                "sort": 4
            }, {"id": 520112, "name": "乌当区", "parent_id": 520100, "sort": 5}, {
                "id": 520113,
                "name": "白云区",
                "parent_id": 520100,
                "sort": 6
            }, {"id": 520114, "name": "小河区", "parent_id": 520100, "sort": 7}, {
                "id": 520121,
                "name": "开阳县",
                "parent_id": 520100,
                "sort": 8
            }, {"id": 520122, "name": "息烽县", "parent_id": 520100, "sort": 9}, {
                "id": 520123,
                "name": "修文县",
                "parent_id": 520100,
                "sort": 10
            }, {"id": 520181, "name": "清镇市", "parent_id": 520100, "sort": 11}],
            "type": 0
        }, {
            "id": 520200,
            "name": "六盘水市",
            "parent_id": 520000,
            "sort": 2,
            "sub": [{"id": 520201, "name": "钟山区", "parent_id": 520200, "sort": 1}, {
                "id": 520203,
                "name": "六枝特区",
                "parent_id": 520200,
                "sort": 2
            }, {"id": 520221, "name": "水城县", "parent_id": 520200, "sort": 3}, {
                "id": 520222,
                "name": "盘　县",
                "parent_id": 520200,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 520300,
            "name": "遵义市",
            "parent_id": 520000,
            "sort": 3,
            "sub": [{"id": 520301, "name": "市辖区", "parent_id": 520300, "sort": 1}, {
                "id": 520302,
                "name": "红花岗区",
                "parent_id": 520300,
                "sort": 2
            }, {"id": 520303, "name": "汇川区", "parent_id": 520300, "sort": 3}, {
                "id": 520321,
                "name": "遵义县",
                "parent_id": 520300,
                "sort": 4
            }, {"id": 520322, "name": "桐梓县", "parent_id": 520300, "sort": 5}, {
                "id": 520323,
                "name": "绥阳县",
                "parent_id": 520300,
                "sort": 6
            }, {"id": 520324, "name": "正安县", "parent_id": 520300, "sort": 7}, {
                "id": 520325,
                "name": "道真仡佬族苗族自治县",
                "parent_id": 520300,
                "sort": 8
            }, {"id": 520326, "name": "务川仡佬族苗族自治县", "parent_id": 520300, "sort": 9}, {
                "id": 520327,
                "name": "凤冈县",
                "parent_id": 520300,
                "sort": 10
            }, {"id": 520328, "name": "湄潭县", "parent_id": 520300, "sort": 11}, {
                "id": 520329,
                "name": "余庆县",
                "parent_id": 520300,
                "sort": 12
            }, {"id": 520330, "name": "习水县", "parent_id": 520300, "sort": 13}, {
                "id": 520381,
                "name": "赤水市",
                "parent_id": 520300,
                "sort": 14
            }, {"id": 520382, "name": "仁怀市", "parent_id": 520300, "sort": 15}],
            "type": 0
        }, {
            "id": 520400,
            "name": "安顺市",
            "parent_id": 520000,
            "sort": 4,
            "sub": [{"id": 520401, "name": "市辖区", "parent_id": 520400, "sort": 1}, {
                "id": 520402,
                "name": "西秀区",
                "parent_id": 520400,
                "sort": 2
            }, {"id": 520421, "name": "平坝县", "parent_id": 520400, "sort": 3}, {
                "id": 520422,
                "name": "普定县",
                "parent_id": 520400,
                "sort": 4
            }, {"id": 520423, "name": "镇宁布依族苗族自治县", "parent_id": 520400, "sort": 5}, {
                "id": 520424,
                "name": "关岭布依族苗族自治县",
                "parent_id": 520400,
                "sort": 6
            }, {"id": 520425, "name": "紫云苗族布依族自治县", "parent_id": 520400, "sort": 7}],
            "type": 0
        }, {
            "id": 522200,
            "name": "铜仁地区",
            "parent_id": 520000,
            "sort": 5,
            "sub": [{"id": 522201, "name": "铜仁市", "parent_id": 522200, "sort": 1}, {
                "id": 522222,
                "name": "江口县",
                "parent_id": 522200,
                "sort": 2
            }, {"id": 522223, "name": "玉屏侗族自治县", "parent_id": 522200, "sort": 3}, {
                "id": 522224,
                "name": "石阡县",
                "parent_id": 522200,
                "sort": 4
            }, {"id": 522225, "name": "思南县", "parent_id": 522200, "sort": 5}, {
                "id": 522226,
                "name": "印江土家族苗族自治县",
                "parent_id": 522200,
                "sort": 6
            }, {"id": 522227, "name": "德江县", "parent_id": 522200, "sort": 7}, {
                "id": 522228,
                "name": "沿河土家族自治县",
                "parent_id": 522200,
                "sort": 8
            }, {"id": 522229, "name": "松桃苗族自治县", "parent_id": 522200, "sort": 9}, {
                "id": 522230,
                "name": "万山特区",
                "parent_id": 522200,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 522300,
            "name": "黔西南布依族苗族自治州",
            "parent_id": 520000,
            "sort": 6,
            "sub": [{"id": 522301, "name": "兴义市", "parent_id": 522300, "sort": 1}, {
                "id": 522322,
                "name": "兴仁县",
                "parent_id": 522300,
                "sort": 2
            }, {"id": 522323, "name": "普安县", "parent_id": 522300, "sort": 3}, {
                "id": 522324,
                "name": "晴隆县",
                "parent_id": 522300,
                "sort": 4
            }, {"id": 522325, "name": "贞丰县", "parent_id": 522300, "sort": 5}, {
                "id": 522326,
                "name": "望谟县",
                "parent_id": 522300,
                "sort": 6
            }, {"id": 522327, "name": "册亨县", "parent_id": 522300, "sort": 7}, {
                "id": 522328,
                "name": "安龙县",
                "parent_id": 522300,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 522400,
            "name": "毕节地区",
            "parent_id": 520000,
            "sort": 7,
            "sub": [{"id": 522401, "name": "毕节市", "parent_id": 522400, "sort": 1}, {
                "id": 522422,
                "name": "大方县",
                "parent_id": 522400,
                "sort": 2
            }, {"id": 522423, "name": "黔西县", "parent_id": 522400, "sort": 3}, {
                "id": 522424,
                "name": "金沙县",
                "parent_id": 522400,
                "sort": 4
            }, {"id": 522425, "name": "织金县", "parent_id": 522400, "sort": 5}, {
                "id": 522426,
                "name": "纳雍县",
                "parent_id": 522400,
                "sort": 6
            }, {"id": 522427, "name": "威宁彝族回族苗族自治县", "parent_id": 522400, "sort": 7}, {
                "id": 522428,
                "name": "赫章县",
                "parent_id": 522400,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 522600,
            "name": "黔东南苗族侗族自治州",
            "parent_id": 520000,
            "sort": 8,
            "sub": [{"id": 522601, "name": "凯里市", "parent_id": 522600, "sort": 1}, {
                "id": 522622,
                "name": "黄平县",
                "parent_id": 522600,
                "sort": 2
            }, {"id": 522623, "name": "施秉县", "parent_id": 522600, "sort": 3}, {
                "id": 522624,
                "name": "三穗县",
                "parent_id": 522600,
                "sort": 4
            }, {"id": 522625, "name": "镇远县", "parent_id": 522600, "sort": 5}, {
                "id": 522626,
                "name": "岑巩县",
                "parent_id": 522600,
                "sort": 6
            }, {"id": 522627, "name": "天柱县", "parent_id": 522600, "sort": 7}, {
                "id": 522628,
                "name": "锦屏县",
                "parent_id": 522600,
                "sort": 8
            }, {"id": 522629, "name": "剑河县", "parent_id": 522600, "sort": 9}, {
                "id": 522630,
                "name": "台江县",
                "parent_id": 522600,
                "sort": 10
            }, {"id": 522631, "name": "黎平县", "parent_id": 522600, "sort": 11}, {
                "id": 522632,
                "name": "榕江县",
                "parent_id": 522600,
                "sort": 12
            }, {"id": 522633, "name": "从江县", "parent_id": 522600, "sort": 13}, {
                "id": 522634,
                "name": "雷山县",
                "parent_id": 522600,
                "sort": 14
            }, {"id": 522635, "name": "麻江县", "parent_id": 522600, "sort": 15}, {
                "id": 522636,
                "name": "丹寨县",
                "parent_id": 522600,
                "sort": 16
            }],
            "type": 0
        }, {
            "id": 522700,
            "name": "黔南布依族苗族自治州",
            "parent_id": 520000,
            "sort": 9,
            "sub": [{"id": 522701, "name": "都匀市", "parent_id": 522700, "sort": 1}, {
                "id": 522702,
                "name": "福泉市",
                "parent_id": 522700,
                "sort": 2
            }, {"id": 522722, "name": "荔波县", "parent_id": 522700, "sort": 3}, {
                "id": 522723,
                "name": "贵定县",
                "parent_id": 522700,
                "sort": 4
            }, {"id": 522725, "name": "瓮安县", "parent_id": 522700, "sort": 5}, {
                "id": 522726,
                "name": "独山县",
                "parent_id": 522700,
                "sort": 6
            }, {"id": 522727, "name": "平塘县", "parent_id": 522700, "sort": 7}, {
                "id": 522728,
                "name": "罗甸县",
                "parent_id": 522700,
                "sort": 8
            }, {"id": 522729, "name": "长顺县", "parent_id": 522700, "sort": 9}, {
                "id": 522730,
                "name": "龙里县",
                "parent_id": 522700,
                "sort": 10
            }, {"id": 522731, "name": "惠水县", "parent_id": 522700, "sort": 11}, {
                "id": 522732,
                "name": "三都水族自治县",
                "parent_id": 522700,
                "sort": 12
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 530000,
        "name": "云南省",
        "parent_id": 0,
        "sort": 25,
        "sub": [{
            "id": 530100,
            "name": "昆明市",
            "parent_id": 530000,
            "sort": 1,
            "sub": [{"id": 530101, "name": "市辖区", "parent_id": 530100, "sort": 1}, {
                "id": 530102,
                "name": "五华区",
                "parent_id": 530100,
                "sort": 2
            }, {"id": 530103, "name": "盘龙区", "parent_id": 530100, "sort": 3}, {
                "id": 530111,
                "name": "官渡区",
                "parent_id": 530100,
                "sort": 4
            }, {"id": 530112, "name": "西山区", "parent_id": 530100, "sort": 5}, {
                "id": 530113,
                "name": "东川区",
                "parent_id": 530100,
                "sort": 6
            }, {"id": 530121, "name": "呈贡县", "parent_id": 530100, "sort": 7}, {
                "id": 530122,
                "name": "晋宁县",
                "parent_id": 530100,
                "sort": 8
            }, {"id": 530124, "name": "富民县", "parent_id": 530100, "sort": 9}, {
                "id": 530125,
                "name": "宜良县",
                "parent_id": 530100,
                "sort": 10
            }, {"id": 530126, "name": "石林彝族自治县", "parent_id": 530100, "sort": 11}, {
                "id": 530127,
                "name": "嵩明县",
                "parent_id": 530100,
                "sort": 12
            }, {"id": 530128, "name": "禄劝彝族苗族自治县", "parent_id": 530100, "sort": 13}, {
                "id": 530129,
                "name": "寻甸回族彝族自治县",
                "parent_id": 530100,
                "sort": 14
            }, {"id": 530181, "name": "安宁市", "parent_id": 530100, "sort": 15}],
            "type": 0
        }, {
            "id": 530300,
            "name": "曲靖市",
            "parent_id": 530000,
            "sort": 2,
            "sub": [{"id": 530301, "name": "市辖区", "parent_id": 530300, "sort": 1}, {
                "id": 530302,
                "name": "麒麟区",
                "parent_id": 530300,
                "sort": 2
            }, {"id": 530321, "name": "马龙县", "parent_id": 530300, "sort": 3}, {
                "id": 530322,
                "name": "陆良县",
                "parent_id": 530300,
                "sort": 4
            }, {"id": 530323, "name": "师宗县", "parent_id": 530300, "sort": 5}, {
                "id": 530324,
                "name": "罗平县",
                "parent_id": 530300,
                "sort": 6
            }, {"id": 530325, "name": "富源县", "parent_id": 530300, "sort": 7}, {
                "id": 530326,
                "name": "会泽县",
                "parent_id": 530300,
                "sort": 8
            }, {"id": 530328, "name": "沾益县", "parent_id": 530300, "sort": 9}, {
                "id": 530381,
                "name": "宣威市",
                "parent_id": 530300,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 530400,
            "name": "玉溪市",
            "parent_id": 530000,
            "sort": 3,
            "sub": [{"id": 530401, "name": "市辖区", "parent_id": 530400, "sort": 1}, {
                "id": 530402,
                "name": "红塔区",
                "parent_id": 530400,
                "sort": 2
            }, {"id": 530421, "name": "江川县", "parent_id": 530400, "sort": 3}, {
                "id": 530422,
                "name": "澄江县",
                "parent_id": 530400,
                "sort": 4
            }, {"id": 530423, "name": "通海县", "parent_id": 530400, "sort": 5}, {
                "id": 530424,
                "name": "华宁县",
                "parent_id": 530400,
                "sort": 6
            }, {"id": 530425, "name": "易门县", "parent_id": 530400, "sort": 7}, {
                "id": 530426,
                "name": "峨山彝族自治县",
                "parent_id": 530400,
                "sort": 8
            }, {"id": 530427, "name": "新平彝族傣族自治县", "parent_id": 530400, "sort": 9}, {
                "id": 530428,
                "name": "元江哈尼族彝族傣族自治县",
                "parent_id": 530400,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 530500,
            "name": "保山市",
            "parent_id": 530000,
            "sort": 4,
            "sub": [{"id": 530501, "name": "市辖区", "parent_id": 530500, "sort": 1}, {
                "id": 530502,
                "name": "隆阳区",
                "parent_id": 530500,
                "sort": 2
            }, {"id": 530521, "name": "施甸县", "parent_id": 530500, "sort": 3}, {
                "id": 530522,
                "name": "腾冲县",
                "parent_id": 530500,
                "sort": 4
            }, {"id": 530523, "name": "龙陵县", "parent_id": 530500, "sort": 5}, {
                "id": 530524,
                "name": "昌宁县",
                "parent_id": 530500,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 530600,
            "name": "昭通市",
            "parent_id": 530000,
            "sort": 5,
            "sub": [{"id": 530601, "name": "市辖区", "parent_id": 530600, "sort": 1}, {
                "id": 530602,
                "name": "昭阳区",
                "parent_id": 530600,
                "sort": 2
            }, {"id": 530621, "name": "鲁甸县", "parent_id": 530600, "sort": 3}, {
                "id": 530622,
                "name": "巧家县",
                "parent_id": 530600,
                "sort": 4
            }, {"id": 530623, "name": "盐津县", "parent_id": 530600, "sort": 5}, {
                "id": 530624,
                "name": "大关县",
                "parent_id": 530600,
                "sort": 6
            }, {"id": 530625, "name": "永善县", "parent_id": 530600, "sort": 7}, {
                "id": 530626,
                "name": "绥江县",
                "parent_id": 530600,
                "sort": 8
            }, {"id": 530627, "name": "镇雄县", "parent_id": 530600, "sort": 9}, {
                "id": 530628,
                "name": "彝良县",
                "parent_id": 530600,
                "sort": 10
            }, {"id": 530629, "name": "威信县", "parent_id": 530600, "sort": 11}, {
                "id": 530630,
                "name": "水富县",
                "parent_id": 530600,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 530700,
            "name": "丽江市",
            "parent_id": 530000,
            "sort": 6,
            "sub": [{"id": 530701, "name": "市辖区", "parent_id": 530700, "sort": 1}, {
                "id": 530702,
                "name": "古城区",
                "parent_id": 530700,
                "sort": 2
            }, {"id": 530721, "name": "玉龙纳西族自治县", "parent_id": 530700, "sort": 3}, {
                "id": 530722,
                "name": "永胜县",
                "parent_id": 530700,
                "sort": 4
            }, {"id": 530723, "name": "华坪县", "parent_id": 530700, "sort": 5}, {
                "id": 530724,
                "name": "宁蒗彝族自治县",
                "parent_id": 530700,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 530800,
            "name": "思茅市",
            "parent_id": 530000,
            "sort": 7,
            "sub": [{"id": 530801, "name": "市辖区", "parent_id": 530800, "sort": 1}, {
                "id": 530802,
                "name": "翠云区",
                "parent_id": 530800,
                "sort": 2
            }, {"id": 530821, "name": "普洱哈尼族彝族自治县", "parent_id": 530800, "sort": 3}, {
                "id": 530822,
                "name": "墨江哈尼族自治县",
                "parent_id": 530800,
                "sort": 4
            }, {"id": 530823, "name": "景东彝族自治县", "parent_id": 530800, "sort": 5}, {
                "id": 530824,
                "name": "景谷傣族彝族自治县",
                "parent_id": 530800,
                "sort": 6
            }, {"id": 530825, "name": "镇沅彝族哈尼族拉祜族自治县", "parent_id": 530800, "sort": 7}, {
                "id": 530826,
                "name": "江城哈尼族彝族自治县",
                "parent_id": 530800,
                "sort": 8
            }, {"id": 530827, "name": "孟连傣族拉祜族佤族自治县", "parent_id": 530800, "sort": 9}, {
                "id": 530828,
                "name": "澜沧拉祜族自治县",
                "parent_id": 530800,
                "sort": 10
            }, {"id": 530829, "name": "西盟佤族自治县", "parent_id": 530800, "sort": 11}],
            "type": 0
        }, {
            "id": 530900,
            "name": "临沧市",
            "parent_id": 530000,
            "sort": 8,
            "sub": [{"id": 530901, "name": "市辖区", "parent_id": 530900, "sort": 1}, {
                "id": 530902,
                "name": "临翔区",
                "parent_id": 530900,
                "sort": 2
            }, {"id": 530921, "name": "凤庆县", "parent_id": 530900, "sort": 3}, {
                "id": 530922,
                "name": "云　县",
                "parent_id": 530900,
                "sort": 4
            }, {"id": 530923, "name": "永德县", "parent_id": 530900, "sort": 5}, {
                "id": 530924,
                "name": "镇康县",
                "parent_id": 530900,
                "sort": 6
            }, {"id": 530925, "name": "双江拉祜族佤族布朗族傣族自治县", "parent_id": 530900, "sort": 7}, {
                "id": 530926,
                "name": "耿马傣族佤族自治县",
                "parent_id": 530900,
                "sort": 8
            }, {"id": 530927, "name": "沧源佤族自治县", "parent_id": 530900, "sort": 9}],
            "type": 0
        }, {
            "id": 532300,
            "name": "楚雄彝族自治州",
            "parent_id": 530000,
            "sort": 9,
            "sub": [{"id": 532301, "name": "楚雄市", "parent_id": 532300, "sort": 1}, {
                "id": 532322,
                "name": "双柏县",
                "parent_id": 532300,
                "sort": 2
            }, {"id": 532323, "name": "牟定县", "parent_id": 532300, "sort": 3}, {
                "id": 532324,
                "name": "南华县",
                "parent_id": 532300,
                "sort": 4
            }, {"id": 532325, "name": "姚安县", "parent_id": 532300, "sort": 5}, {
                "id": 532326,
                "name": "大姚县",
                "parent_id": 532300,
                "sort": 6
            }, {"id": 532327, "name": "永仁县", "parent_id": 532300, "sort": 7}, {
                "id": 532328,
                "name": "元谋县",
                "parent_id": 532300,
                "sort": 8
            }, {"id": 532329, "name": "武定县", "parent_id": 532300, "sort": 9}, {
                "id": 532331,
                "name": "禄丰县",
                "parent_id": 532300,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 532500,
            "name": "红河哈尼族彝族自治州",
            "parent_id": 530000,
            "sort": 10,
            "sub": [{"id": 532501, "name": "个旧市", "parent_id": 532500, "sort": 1}, {
                "id": 532502,
                "name": "开远市",
                "parent_id": 532500,
                "sort": 2
            }, {"id": 532522, "name": "蒙自县", "parent_id": 532500, "sort": 3}, {
                "id": 532523,
                "name": "屏边苗族自治县",
                "parent_id": 532500,
                "sort": 4
            }, {"id": 532524, "name": "建水县", "parent_id": 532500, "sort": 5}, {
                "id": 532525,
                "name": "石屏县",
                "parent_id": 532500,
                "sort": 6
            }, {"id": 532526, "name": "弥勒县", "parent_id": 532500, "sort": 7}, {
                "id": 532527,
                "name": "泸西县",
                "parent_id": 532500,
                "sort": 8
            }, {"id": 532528, "name": "元阳县", "parent_id": 532500, "sort": 9}, {
                "id": 532529,
                "name": "红河县",
                "parent_id": 532500,
                "sort": 10
            }, {"id": 532530, "name": "金平苗族瑶族傣族自治县", "parent_id": 532500, "sort": 11}, {
                "id": 532531,
                "name": "绿春县",
                "parent_id": 532500,
                "sort": 12
            }, {"id": 532532, "name": "河口瑶族自治县", "parent_id": 532500, "sort": 13}],
            "type": 0
        }, {
            "id": 532600,
            "name": "文山壮族苗族自治州",
            "parent_id": 530000,
            "sort": 11,
            "sub": [{"id": 532621, "name": "文山县", "parent_id": 532600, "sort": 1}, {
                "id": 532622,
                "name": "砚山县",
                "parent_id": 532600,
                "sort": 2
            }, {"id": 532623, "name": "西畴县", "parent_id": 532600, "sort": 3}, {
                "id": 532624,
                "name": "麻栗坡县",
                "parent_id": 532600,
                "sort": 4
            }, {"id": 532625, "name": "马关县", "parent_id": 532600, "sort": 5}, {
                "id": 532626,
                "name": "丘北县",
                "parent_id": 532600,
                "sort": 6
            }, {"id": 532627, "name": "广南县", "parent_id": 532600, "sort": 7}, {
                "id": 532628,
                "name": "富宁县",
                "parent_id": 532600,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 532800,
            "name": "西双版纳傣族自治州",
            "parent_id": 530000,
            "sort": 12,
            "sub": [{"id": 532801, "name": "景洪市", "parent_id": 532800, "sort": 1}, {
                "id": 532822,
                "name": "勐海县",
                "parent_id": 532800,
                "sort": 2
            }, {"id": 532823, "name": "勐腊县", "parent_id": 532800, "sort": 3}],
            "type": 0
        }, {
            "id": 532900,
            "name": "大理白族自治州",
            "parent_id": 530000,
            "sort": 13,
            "sub": [{"id": 532901, "name": "大理市", "parent_id": 532900, "sort": 1}, {
                "id": 532922,
                "name": "漾濞彝族自治县",
                "parent_id": 532900,
                "sort": 2
            }, {"id": 532923, "name": "祥云县", "parent_id": 532900, "sort": 3}, {
                "id": 532924,
                "name": "宾川县",
                "parent_id": 532900,
                "sort": 4
            }, {"id": 532925, "name": "弥渡县", "parent_id": 532900, "sort": 5}, {
                "id": 532926,
                "name": "南涧彝族自治县",
                "parent_id": 532900,
                "sort": 6
            }, {"id": 532927, "name": "巍山彝族回族自治县", "parent_id": 532900, "sort": 7}, {
                "id": 532928,
                "name": "永平县",
                "parent_id": 532900,
                "sort": 8
            }, {"id": 532929, "name": "云龙县", "parent_id": 532900, "sort": 9}, {
                "id": 532930,
                "name": "洱源县",
                "parent_id": 532900,
                "sort": 10
            }, {"id": 532931, "name": "剑川县", "parent_id": 532900, "sort": 11}, {
                "id": 532932,
                "name": "鹤庆县",
                "parent_id": 532900,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 533100,
            "name": "德宏傣族景颇族自治州",
            "parent_id": 530000,
            "sort": 14,
            "sub": [{"id": 533102, "name": "瑞丽市", "parent_id": 533100, "sort": 1}, {
                "id": 533103,
                "name": "潞西市",
                "parent_id": 533100,
                "sort": 2
            }, {"id": 533122, "name": "梁河县", "parent_id": 533100, "sort": 3}, {
                "id": 533123,
                "name": "盈江县",
                "parent_id": 533100,
                "sort": 4
            }, {"id": 533124, "name": "陇川县", "parent_id": 533100, "sort": 5}],
            "type": 0
        }, {
            "id": 533300,
            "name": "怒江傈僳族自治州",
            "parent_id": 530000,
            "sort": 15,
            "sub": [{"id": 533321, "name": "泸水县", "parent_id": 533300, "sort": 1}, {
                "id": 533323,
                "name": "福贡县",
                "parent_id": 533300,
                "sort": 2
            }, {"id": 533324, "name": "贡山独龙族怒族自治县", "parent_id": 533300, "sort": 3}, {
                "id": 533325,
                "name": "兰坪白族普米族自治县",
                "parent_id": 533300,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 533400,
            "name": "迪庆藏族自治州",
            "parent_id": 530000,
            "sort": 16,
            "sub": [{"id": 533421, "name": "香格里拉县", "parent_id": 533400, "sort": 1}, {
                "id": 533422,
                "name": "德钦县",
                "parent_id": 533400,
                "sort": 2
            }, {"id": 533423, "name": "维西傈僳族自治县", "parent_id": 533400, "sort": 3}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 540000,
        "name": "西　藏",
        "parent_id": 0,
        "sort": 26,
        "sub": [{
            "id": 540100,
            "name": "拉萨市",
            "parent_id": 540000,
            "sort": 1,
            "sub": [{"id": 540101, "name": "市辖区", "parent_id": 540100, "sort": 1}, {
                "id": 540102,
                "name": "城关区",
                "parent_id": 540100,
                "sort": 2
            }, {"id": 540121, "name": "林周县", "parent_id": 540100, "sort": 3}, {
                "id": 540122,
                "name": "当雄县",
                "parent_id": 540100,
                "sort": 4
            }, {"id": 540123, "name": "尼木县", "parent_id": 540100, "sort": 5}, {
                "id": 540124,
                "name": "曲水县",
                "parent_id": 540100,
                "sort": 6
            }, {"id": 540125, "name": "堆龙德庆县", "parent_id": 540100, "sort": 7}, {
                "id": 540126,
                "name": "达孜县",
                "parent_id": 540100,
                "sort": 8
            }, {"id": 540127, "name": "墨竹工卡县", "parent_id": 540100, "sort": 9}],
            "type": 0
        }, {
            "id": 542100,
            "name": "昌都地区",
            "parent_id": 540000,
            "sort": 2,
            "sub": [{"id": 542121, "name": "昌都县", "parent_id": 542100, "sort": 1}, {
                "id": 542122,
                "name": "江达县",
                "parent_id": 542100,
                "sort": 2
            }, {"id": 542123, "name": "贡觉县", "parent_id": 542100, "sort": 3}, {
                "id": 542124,
                "name": "类乌齐县",
                "parent_id": 542100,
                "sort": 4
            }, {"id": 542125, "name": "丁青县", "parent_id": 542100, "sort": 5}, {
                "id": 542126,
                "name": "察雅县",
                "parent_id": 542100,
                "sort": 6
            }, {"id": 542127, "name": "八宿县", "parent_id": 542100, "sort": 7}, {
                "id": 542128,
                "name": "左贡县",
                "parent_id": 542100,
                "sort": 8
            }, {"id": 542129, "name": "芒康县", "parent_id": 542100, "sort": 9}, {
                "id": 542132,
                "name": "洛隆县",
                "parent_id": 542100,
                "sort": 10
            }, {"id": 542133, "name": "边坝县", "parent_id": 542100, "sort": 11}],
            "type": 0
        }, {
            "id": 542200,
            "name": "山南地区",
            "parent_id": 540000,
            "sort": 3,
            "sub": [{"id": 542221, "name": "乃东县", "parent_id": 542200, "sort": 1}, {
                "id": 542222,
                "name": "扎囊县",
                "parent_id": 542200,
                "sort": 2
            }, {"id": 542223, "name": "贡嘎县", "parent_id": 542200, "sort": 3}, {
                "id": 542224,
                "name": "桑日县",
                "parent_id": 542200,
                "sort": 4
            }, {"id": 542225, "name": "琼结县", "parent_id": 542200, "sort": 5}, {
                "id": 542226,
                "name": "曲松县",
                "parent_id": 542200,
                "sort": 6
            }, {"id": 542227, "name": "措美县", "parent_id": 542200, "sort": 7}, {
                "id": 542228,
                "name": "洛扎县",
                "parent_id": 542200,
                "sort": 8
            }, {"id": 542229, "name": "加查县", "parent_id": 542200, "sort": 9}, {
                "id": 542231,
                "name": "隆子县",
                "parent_id": 542200,
                "sort": 10
            }, {"id": 542232, "name": "错那县", "parent_id": 542200, "sort": 11}, {
                "id": 542233,
                "name": "浪卡子县",
                "parent_id": 542200,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 542300,
            "name": "日喀则地区",
            "parent_id": 540000,
            "sort": 4,
            "sub": [{"id": 542301, "name": "日喀则市", "parent_id": 542300, "sort": 1}, {
                "id": 542322,
                "name": "南木林县",
                "parent_id": 542300,
                "sort": 2
            }, {"id": 542323, "name": "江孜县", "parent_id": 542300, "sort": 3}, {
                "id": 542324,
                "name": "定日县",
                "parent_id": 542300,
                "sort": 4
            }, {"id": 542325, "name": "萨迦县", "parent_id": 542300, "sort": 5}, {
                "id": 542326,
                "name": "拉孜县",
                "parent_id": 542300,
                "sort": 6
            }, {"id": 542327, "name": "昂仁县", "parent_id": 542300, "sort": 7}, {
                "id": 542328,
                "name": "谢通门县",
                "parent_id": 542300,
                "sort": 8
            }, {"id": 542329, "name": "白朗县", "parent_id": 542300, "sort": 9}, {
                "id": 542330,
                "name": "仁布县",
                "parent_id": 542300,
                "sort": 10
            }, {"id": 542331, "name": "康马县", "parent_id": 542300, "sort": 11}, {
                "id": 542332,
                "name": "定结县",
                "parent_id": 542300,
                "sort": 12
            }, {"id": 542333, "name": "仲巴县", "parent_id": 542300, "sort": 13}, {
                "id": 542334,
                "name": "亚东县",
                "parent_id": 542300,
                "sort": 14
            }, {"id": 542335, "name": "吉隆县", "parent_id": 542300, "sort": 15}, {
                "id": 542336,
                "name": "聂拉木县",
                "parent_id": 542300,
                "sort": 16
            }, {"id": 542337, "name": "萨嘎县", "parent_id": 542300, "sort": 17}, {
                "id": 542338,
                "name": "岗巴县",
                "parent_id": 542300,
                "sort": 18
            }],
            "type": 0
        }, {
            "id": 542400,
            "name": "那曲地区",
            "parent_id": 540000,
            "sort": 5,
            "sub": [{"id": 542421, "name": "那曲县", "parent_id": 542400, "sort": 1}, {
                "id": 542422,
                "name": "嘉黎县",
                "parent_id": 542400,
                "sort": 2
            }, {"id": 542423, "name": "比如县", "parent_id": 542400, "sort": 3}, {
                "id": 542424,
                "name": "聂荣县",
                "parent_id": 542400,
                "sort": 4
            }, {"id": 542425, "name": "安多县", "parent_id": 542400, "sort": 5}, {
                "id": 542426,
                "name": "申扎县",
                "parent_id": 542400,
                "sort": 6
            }, {"id": 542427, "name": "索　县", "parent_id": 542400, "sort": 7}, {
                "id": 542428,
                "name": "班戈县",
                "parent_id": 542400,
                "sort": 8
            }, {"id": 542429, "name": "巴青县", "parent_id": 542400, "sort": 9}, {
                "id": 542430,
                "name": "尼玛县",
                "parent_id": 542400,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 542500,
            "name": "阿里地区",
            "parent_id": 540000,
            "sort": 6,
            "sub": [{"id": 542521, "name": "普兰县", "parent_id": 542500, "sort": 1}, {
                "id": 542522,
                "name": "札达县",
                "parent_id": 542500,
                "sort": 2
            }, {"id": 542523, "name": "噶尔县", "parent_id": 542500, "sort": 3}, {
                "id": 542524,
                "name": "日土县",
                "parent_id": 542500,
                "sort": 4
            }, {"id": 542525, "name": "革吉县", "parent_id": 542500, "sort": 5}, {
                "id": 542526,
                "name": "改则县",
                "parent_id": 542500,
                "sort": 6
            }, {"id": 542527, "name": "措勤县", "parent_id": 542500, "sort": 7}],
            "type": 0
        }, {
            "id": 542600,
            "name": "林芝地区",
            "parent_id": 540000,
            "sort": 7,
            "sub": [{"id": 542621, "name": "林芝县", "parent_id": 542600, "sort": 1}, {
                "id": 542622,
                "name": "工布江达县",
                "parent_id": 542600,
                "sort": 2
            }, {"id": 542623, "name": "米林县", "parent_id": 542600, "sort": 3}, {
                "id": 542624,
                "name": "墨脱县",
                "parent_id": 542600,
                "sort": 4
            }, {"id": 542625, "name": "波密县", "parent_id": 542600, "sort": 5}, {
                "id": 542626,
                "name": "察隅县",
                "parent_id": 542600,
                "sort": 6
            }, {"id": 542627, "name": "朗　县", "parent_id": 542600, "sort": 7}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 610000,
        "name": "陕西省",
        "parent_id": 0,
        "sort": 27,
        "sub": [{
            "id": 610100,
            "name": "西安市",
            "parent_id": 610000,
            "sort": 1,
            "sub": [{"id": 610101, "name": "市辖区", "parent_id": 610100, "sort": 1}, {
                "id": 610102,
                "name": "新城区",
                "parent_id": 610100,
                "sort": 2
            }, {"id": 610103, "name": "碑林区", "parent_id": 610100, "sort": 3}, {
                "id": 610104,
                "name": "莲湖区",
                "parent_id": 610100,
                "sort": 4
            }, {"id": 610111, "name": "灞桥区", "parent_id": 610100, "sort": 5}, {
                "id": 610112,
                "name": "未央区",
                "parent_id": 610100,
                "sort": 6
            }, {"id": 610113, "name": "雁塔区", "parent_id": 610100, "sort": 7}, {
                "id": 610114,
                "name": "阎良区",
                "parent_id": 610100,
                "sort": 8
            }, {"id": 610115, "name": "临潼区", "parent_id": 610100, "sort": 9}, {
                "id": 610116,
                "name": "长安区",
                "parent_id": 610100,
                "sort": 10
            }, {"id": 610122, "name": "蓝田县", "parent_id": 610100, "sort": 11}, {
                "id": 610124,
                "name": "周至县",
                "parent_id": 610100,
                "sort": 12
            }, {"id": 610125, "name": "户　县", "parent_id": 610100, "sort": 13}, {
                "id": 610126,
                "name": "高陵县",
                "parent_id": 610100,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 610200,
            "name": "铜川市",
            "parent_id": 610000,
            "sort": 2,
            "sub": [{"id": 610201, "name": "市辖区", "parent_id": 610200, "sort": 1}, {
                "id": 610202,
                "name": "王益区",
                "parent_id": 610200,
                "sort": 2
            }, {"id": 610203, "name": "印台区", "parent_id": 610200, "sort": 3}, {
                "id": 610204,
                "name": "耀州区",
                "parent_id": 610200,
                "sort": 4
            }, {"id": 610222, "name": "宜君县", "parent_id": 610200, "sort": 5}],
            "type": 0
        }, {
            "id": 610300,
            "name": "宝鸡市",
            "parent_id": 610000,
            "sort": 3,
            "sub": [{"id": 610301, "name": "市辖区", "parent_id": 610300, "sort": 1}, {
                "id": 610302,
                "name": "渭滨区",
                "parent_id": 610300,
                "sort": 2
            }, {"id": 610303, "name": "金台区", "parent_id": 610300, "sort": 3}, {
                "id": 610304,
                "name": "陈仓区",
                "parent_id": 610300,
                "sort": 4
            }, {"id": 610322, "name": "凤翔县", "parent_id": 610300, "sort": 5}, {
                "id": 610323,
                "name": "岐山县",
                "parent_id": 610300,
                "sort": 6
            }, {"id": 610324, "name": "扶风县", "parent_id": 610300, "sort": 7}, {
                "id": 610326,
                "name": "眉　县",
                "parent_id": 610300,
                "sort": 8
            }, {"id": 610327, "name": "陇　县", "parent_id": 610300, "sort": 9}, {
                "id": 610328,
                "name": "千阳县",
                "parent_id": 610300,
                "sort": 10
            }, {"id": 610329, "name": "麟游县", "parent_id": 610300, "sort": 11}, {
                "id": 610330,
                "name": "凤　县",
                "parent_id": 610300,
                "sort": 12
            }, {"id": 610331, "name": "太白县", "parent_id": 610300, "sort": 13}],
            "type": 0
        }, {
            "id": 610400,
            "name": "咸阳市",
            "parent_id": 610000,
            "sort": 4,
            "sub": [{"id": 610401, "name": "市辖区", "parent_id": 610400, "sort": 1}, {
                "id": 610402,
                "name": "秦都区",
                "parent_id": 610400,
                "sort": 2
            }, {"id": 610403, "name": "杨凌区", "parent_id": 610400, "sort": 3}, {
                "id": 610404,
                "name": "渭城区",
                "parent_id": 610400,
                "sort": 4
            }, {"id": 610422, "name": "三原县", "parent_id": 610400, "sort": 5}, {
                "id": 610423,
                "name": "泾阳县",
                "parent_id": 610400,
                "sort": 6
            }, {"id": 610424, "name": "乾　县", "parent_id": 610400, "sort": 7}, {
                "id": 610425,
                "name": "礼泉县",
                "parent_id": 610400,
                "sort": 8
            }, {"id": 610426, "name": "永寿县", "parent_id": 610400, "sort": 9}, {
                "id": 610427,
                "name": "彬　县",
                "parent_id": 610400,
                "sort": 10
            }, {"id": 610428, "name": "长武县", "parent_id": 610400, "sort": 11}, {
                "id": 610429,
                "name": "旬邑县",
                "parent_id": 610400,
                "sort": 12
            }, {"id": 610430, "name": "淳化县", "parent_id": 610400, "sort": 13}, {
                "id": 610431,
                "name": "武功县",
                "parent_id": 610400,
                "sort": 14
            }, {"id": 610481, "name": "兴平市", "parent_id": 610400, "sort": 15}],
            "type": 0
        }, {
            "id": 610500,
            "name": "渭南市",
            "parent_id": 610000,
            "sort": 5,
            "sub": [{"id": 610501, "name": "市辖区", "parent_id": 610500, "sort": 1}, {
                "id": 610502,
                "name": "临渭区",
                "parent_id": 610500,
                "sort": 2
            }, {"id": 610521, "name": "华　县", "parent_id": 610500, "sort": 3}, {
                "id": 610522,
                "name": "潼关县",
                "parent_id": 610500,
                "sort": 4
            }, {"id": 610523, "name": "大荔县", "parent_id": 610500, "sort": 5}, {
                "id": 610524,
                "name": "合阳县",
                "parent_id": 610500,
                "sort": 6
            }, {"id": 610525, "name": "澄城县", "parent_id": 610500, "sort": 7}, {
                "id": 610526,
                "name": "蒲城县",
                "parent_id": 610500,
                "sort": 8
            }, {"id": 610527, "name": "白水县", "parent_id": 610500, "sort": 9}, {
                "id": 610528,
                "name": "富平县",
                "parent_id": 610500,
                "sort": 10
            }, {"id": 610581, "name": "韩城市", "parent_id": 610500, "sort": 11}, {
                "id": 610582,
                "name": "华阴市",
                "parent_id": 610500,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 610600,
            "name": "延安市",
            "parent_id": 610000,
            "sort": 6,
            "sub": [{"id": 610601, "name": "市辖区", "parent_id": 610600, "sort": 1}, {
                "id": 610602,
                "name": "宝塔区",
                "parent_id": 610600,
                "sort": 2
            }, {"id": 610621, "name": "延长县", "parent_id": 610600, "sort": 3}, {
                "id": 610622,
                "name": "延川县",
                "parent_id": 610600,
                "sort": 4
            }, {"id": 610623, "name": "子长县", "parent_id": 610600, "sort": 5}, {
                "id": 610624,
                "name": "安塞县",
                "parent_id": 610600,
                "sort": 6
            }, {"id": 610625, "name": "志丹县", "parent_id": 610600, "sort": 7}, {
                "id": 610626,
                "name": "吴旗县",
                "parent_id": 610600,
                "sort": 8
            }, {"id": 610627, "name": "甘泉县", "parent_id": 610600, "sort": 9}, {
                "id": 610628,
                "name": "富　县",
                "parent_id": 610600,
                "sort": 10
            }, {"id": 610629, "name": "洛川县", "parent_id": 610600, "sort": 11}, {
                "id": 610630,
                "name": "宜川县",
                "parent_id": 610600,
                "sort": 12
            }, {"id": 610631, "name": "黄龙县", "parent_id": 610600, "sort": 13}, {
                "id": 610632,
                "name": "黄陵县",
                "parent_id": 610600,
                "sort": 14
            }],
            "type": 0
        }, {
            "id": 610700,
            "name": "汉中市",
            "parent_id": 610000,
            "sort": 7,
            "sub": [{"id": 610701, "name": "市辖区", "parent_id": 610700, "sort": 1}, {
                "id": 610702,
                "name": "汉台区",
                "parent_id": 610700,
                "sort": 2
            }, {"id": 610721, "name": "南郑县", "parent_id": 610700, "sort": 3}, {
                "id": 610722,
                "name": "城固县",
                "parent_id": 610700,
                "sort": 4
            }, {"id": 610723, "name": "洋　县", "parent_id": 610700, "sort": 5}, {
                "id": 610724,
                "name": "西乡县",
                "parent_id": 610700,
                "sort": 6
            }, {"id": 610725, "name": "勉　县", "parent_id": 610700, "sort": 7}, {
                "id": 610726,
                "name": "宁强县",
                "parent_id": 610700,
                "sort": 8
            }, {"id": 610727, "name": "略阳县", "parent_id": 610700, "sort": 9}, {
                "id": 610728,
                "name": "镇巴县",
                "parent_id": 610700,
                "sort": 10
            }, {"id": 610729, "name": "留坝县", "parent_id": 610700, "sort": 11}, {
                "id": 610730,
                "name": "佛坪县",
                "parent_id": 610700,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 610800,
            "name": "榆林市",
            "parent_id": 610000,
            "sort": 8,
            "sub": [{"id": 610801, "name": "市辖区", "parent_id": 610800, "sort": 1}, {
                "id": 610802,
                "name": "榆阳区",
                "parent_id": 610800,
                "sort": 2
            }, {"id": 610821, "name": "神木县", "parent_id": 610800, "sort": 3}, {
                "id": 610822,
                "name": "府谷县",
                "parent_id": 610800,
                "sort": 4
            }, {"id": 610823, "name": "横山县", "parent_id": 610800, "sort": 5}, {
                "id": 610824,
                "name": "靖边县",
                "parent_id": 610800,
                "sort": 6
            }, {"id": 610825, "name": "定边县", "parent_id": 610800, "sort": 7}, {
                "id": 610826,
                "name": "绥德县",
                "parent_id": 610800,
                "sort": 8
            }, {"id": 610827, "name": "米脂县", "parent_id": 610800, "sort": 9}, {
                "id": 610828,
                "name": "佳　县",
                "parent_id": 610800,
                "sort": 10
            }, {"id": 610829, "name": "吴堡县", "parent_id": 610800, "sort": 11}, {
                "id": 610830,
                "name": "清涧县",
                "parent_id": 610800,
                "sort": 12
            }, {"id": 610831, "name": "子洲县", "parent_id": 610800, "sort": 13}],
            "type": 0
        }, {
            "id": 610900,
            "name": "安康市",
            "parent_id": 610000,
            "sort": 9,
            "sub": [{"id": 610901, "name": "市辖区", "parent_id": 610900, "sort": 1}, {
                "id": 610902,
                "name": "汉滨区",
                "parent_id": 610900,
                "sort": 2
            }, {"id": 610921, "name": "汉阴县", "parent_id": 610900, "sort": 3}, {
                "id": 610922,
                "name": "石泉县",
                "parent_id": 610900,
                "sort": 4
            }, {"id": 610923, "name": "宁陕县", "parent_id": 610900, "sort": 5}, {
                "id": 610924,
                "name": "紫阳县",
                "parent_id": 610900,
                "sort": 6
            }, {"id": 610925, "name": "岚皋县", "parent_id": 610900, "sort": 7}, {
                "id": 610926,
                "name": "平利县",
                "parent_id": 610900,
                "sort": 8
            }, {"id": 610927, "name": "镇坪县", "parent_id": 610900, "sort": 9}, {
                "id": 610928,
                "name": "旬阳县",
                "parent_id": 610900,
                "sort": 10
            }, {"id": 610929, "name": "白河县", "parent_id": 610900, "sort": 11}],
            "type": 0
        }, {
            "id": 611000,
            "name": "商洛市",
            "parent_id": 610000,
            "sort": 10,
            "sub": [{"id": 611001, "name": "市辖区", "parent_id": 611000, "sort": 1}, {
                "id": 611002,
                "name": "商州区",
                "parent_id": 611000,
                "sort": 2
            }, {"id": 611021, "name": "洛南县", "parent_id": 611000, "sort": 3}, {
                "id": 611022,
                "name": "丹凤县",
                "parent_id": 611000,
                "sort": 4
            }, {"id": 611023, "name": "商南县", "parent_id": 611000, "sort": 5}, {
                "id": 611024,
                "name": "山阳县",
                "parent_id": 611000,
                "sort": 6
            }, {"id": 611025, "name": "镇安县", "parent_id": 611000, "sort": 7}, {
                "id": 611026,
                "name": "柞水县",
                "parent_id": 611000,
                "sort": 8
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 620000,
        "name": "甘肃省",
        "parent_id": 0,
        "sort": 28,
        "sub": [{
            "id": 620100,
            "name": "兰州市",
            "parent_id": 620000,
            "sort": 1,
            "sub": [{"id": 620101, "name": "市辖区", "parent_id": 620100, "sort": 1}, {
                "id": 620102,
                "name": "城关区",
                "parent_id": 620100,
                "sort": 2
            }, {"id": 620103, "name": "七里河区", "parent_id": 620100, "sort": 3}, {
                "id": 620104,
                "name": "西固区",
                "parent_id": 620100,
                "sort": 4
            }, {"id": 620105, "name": "安宁区", "parent_id": 620100, "sort": 5}, {
                "id": 620111,
                "name": "红古区",
                "parent_id": 620100,
                "sort": 6
            }, {"id": 620121, "name": "永登县", "parent_id": 620100, "sort": 7}, {
                "id": 620122,
                "name": "皋兰县",
                "parent_id": 620100,
                "sort": 8
            }, {"id": 620123, "name": "榆中县", "parent_id": 620100, "sort": 9}],
            "type": 0
        }, {
            "id": 620200,
            "name": "嘉峪关市",
            "parent_id": 620000,
            "sort": 2,
            "sub": [{"id": 620201, "name": "市辖区", "parent_id": 620200, "sort": 1}],
            "type": 0
        }, {
            "id": 620300,
            "name": "金昌市",
            "parent_id": 620000,
            "sort": 3,
            "sub": [{"id": 620301, "name": "市辖区", "parent_id": 620300, "sort": 1}, {
                "id": 620302,
                "name": "金川区",
                "parent_id": 620300,
                "sort": 2
            }, {"id": 620321, "name": "永昌县", "parent_id": 620300, "sort": 3}],
            "type": 0
        }, {
            "id": 620400,
            "name": "白银市",
            "parent_id": 620000,
            "sort": 4,
            "sub": [{"id": 620401, "name": "市辖区", "parent_id": 620400, "sort": 1}, {
                "id": 620402,
                "name": "白银区",
                "parent_id": 620400,
                "sort": 2
            }, {"id": 620403, "name": "平川区", "parent_id": 620400, "sort": 3}, {
                "id": 620421,
                "name": "靖远县",
                "parent_id": 620400,
                "sort": 4
            }, {"id": 620422, "name": "会宁县", "parent_id": 620400, "sort": 5}, {
                "id": 620423,
                "name": "景泰县",
                "parent_id": 620400,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 620500,
            "name": "天水市",
            "parent_id": 620000,
            "sort": 5,
            "sub": [{"id": 620501, "name": "市辖区", "parent_id": 620500, "sort": 1}, {
                "id": 620502,
                "name": "秦城区",
                "parent_id": 620500,
                "sort": 2
            }, {"id": 620503, "name": "北道区", "parent_id": 620500, "sort": 3}, {
                "id": 620521,
                "name": "清水县",
                "parent_id": 620500,
                "sort": 4
            }, {"id": 620522, "name": "秦安县", "parent_id": 620500, "sort": 5}, {
                "id": 620523,
                "name": "甘谷县",
                "parent_id": 620500,
                "sort": 6
            }, {"id": 620524, "name": "武山县", "parent_id": 620500, "sort": 7}, {
                "id": 620525,
                "name": "张家川回族自治县",
                "parent_id": 620500,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 620600,
            "name": "武威市",
            "parent_id": 620000,
            "sort": 6,
            "sub": [{"id": 620601, "name": "市辖区", "parent_id": 620600, "sort": 1}, {
                "id": 620602,
                "name": "凉州区",
                "parent_id": 620600,
                "sort": 2
            }, {"id": 620621, "name": "民勤县", "parent_id": 620600, "sort": 3}, {
                "id": 620622,
                "name": "古浪县",
                "parent_id": 620600,
                "sort": 4
            }, {"id": 620623, "name": "天祝藏族自治县", "parent_id": 620600, "sort": 5}],
            "type": 0
        }, {
            "id": 620700,
            "name": "张掖市",
            "parent_id": 620000,
            "sort": 7,
            "sub": [{"id": 620701, "name": "市辖区", "parent_id": 620700, "sort": 1}, {
                "id": 620702,
                "name": "甘州区",
                "parent_id": 620700,
                "sort": 2
            }, {"id": 620721, "name": "肃南裕固族自治县", "parent_id": 620700, "sort": 3}, {
                "id": 620722,
                "name": "民乐县",
                "parent_id": 620700,
                "sort": 4
            }, {"id": 620723, "name": "临泽县", "parent_id": 620700, "sort": 5}, {
                "id": 620724,
                "name": "高台县",
                "parent_id": 620700,
                "sort": 6
            }, {"id": 620725, "name": "山丹县", "parent_id": 620700, "sort": 7}],
            "type": 0
        }, {
            "id": 620800,
            "name": "平凉市",
            "parent_id": 620000,
            "sort": 8,
            "sub": [{"id": 620801, "name": "市辖区", "parent_id": 620800, "sort": 1}, {
                "id": 620802,
                "name": "崆峒区",
                "parent_id": 620800,
                "sort": 2
            }, {"id": 620821, "name": "泾川县", "parent_id": 620800, "sort": 3}, {
                "id": 620822,
                "name": "灵台县",
                "parent_id": 620800,
                "sort": 4
            }, {"id": 620823, "name": "崇信县", "parent_id": 620800, "sort": 5}, {
                "id": 620824,
                "name": "华亭县",
                "parent_id": 620800,
                "sort": 6
            }, {"id": 620825, "name": "庄浪县", "parent_id": 620800, "sort": 7}, {
                "id": 620826,
                "name": "静宁县",
                "parent_id": 620800,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 620900,
            "name": "酒泉市",
            "parent_id": 620000,
            "sort": 9,
            "sub": [{"id": 620901, "name": "市辖区", "parent_id": 620900, "sort": 1}, {
                "id": 620902,
                "name": "肃州区",
                "parent_id": 620900,
                "sort": 2
            }, {"id": 620921, "name": "金塔县", "parent_id": 620900, "sort": 3}, {
                "id": 620922,
                "name": "安西县",
                "parent_id": 620900,
                "sort": 4
            }, {"id": 620923, "name": "肃北蒙古族自治县", "parent_id": 620900, "sort": 5}, {
                "id": 620924,
                "name": "阿克塞哈萨克族自治县",
                "parent_id": 620900,
                "sort": 6
            }, {"id": 620981, "name": "玉门市", "parent_id": 620900, "sort": 7}, {
                "id": 620982,
                "name": "敦煌市",
                "parent_id": 620900,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 621000,
            "name": "庆阳市",
            "parent_id": 620000,
            "sort": 10,
            "sub": [{"id": 621001, "name": "市辖区", "parent_id": 621000, "sort": 1}, {
                "id": 621002,
                "name": "西峰区",
                "parent_id": 621000,
                "sort": 2
            }, {"id": 621021, "name": "庆城县", "parent_id": 621000, "sort": 3}, {
                "id": 621022,
                "name": "环　县",
                "parent_id": 621000,
                "sort": 4
            }, {"id": 621023, "name": "华池县", "parent_id": 621000, "sort": 5}, {
                "id": 621024,
                "name": "合水县",
                "parent_id": 621000,
                "sort": 6
            }, {"id": 621025, "name": "正宁县", "parent_id": 621000, "sort": 7}, {
                "id": 621026,
                "name": "宁　县",
                "parent_id": 621000,
                "sort": 8
            }, {"id": 621027, "name": "镇原县", "parent_id": 621000, "sort": 9}],
            "type": 0
        }, {
            "id": 621100,
            "name": "定西市",
            "parent_id": 620000,
            "sort": 11,
            "sub": [{"id": 621101, "name": "市辖区", "parent_id": 621100, "sort": 1}, {
                "id": 621102,
                "name": "安定区",
                "parent_id": 621100,
                "sort": 2
            }, {"id": 621121, "name": "通渭县", "parent_id": 621100, "sort": 3}, {
                "id": 621122,
                "name": "陇西县",
                "parent_id": 621100,
                "sort": 4
            }, {"id": 621123, "name": "渭源县", "parent_id": 621100, "sort": 5}, {
                "id": 621124,
                "name": "临洮县",
                "parent_id": 621100,
                "sort": 6
            }, {"id": 621125, "name": "漳　县", "parent_id": 621100, "sort": 7}, {
                "id": 621126,
                "name": "岷　县",
                "parent_id": 621100,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 621200,
            "name": "陇南市",
            "parent_id": 620000,
            "sort": 12,
            "sub": [{"id": 621201, "name": "市辖区", "parent_id": 621200, "sort": 1}, {
                "id": 621202,
                "name": "武都区",
                "parent_id": 621200,
                "sort": 2
            }, {"id": 621221, "name": "成　县", "parent_id": 621200, "sort": 3}, {
                "id": 621222,
                "name": "文　县",
                "parent_id": 621200,
                "sort": 4
            }, {"id": 621223, "name": "宕昌县", "parent_id": 621200, "sort": 5}, {
                "id": 621224,
                "name": "康　县",
                "parent_id": 621200,
                "sort": 6
            }, {"id": 621225, "name": "西和县", "parent_id": 621200, "sort": 7}, {
                "id": 621226,
                "name": "礼　县",
                "parent_id": 621200,
                "sort": 8
            }, {"id": 621227, "name": "徽　县", "parent_id": 621200, "sort": 9}, {
                "id": 621228,
                "name": "两当县",
                "parent_id": 621200,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 622900,
            "name": "临夏回族自治州",
            "parent_id": 620000,
            "sort": 13,
            "sub": [{"id": 622901, "name": "临夏市", "parent_id": 622900, "sort": 1}, {
                "id": 622921,
                "name": "临夏县",
                "parent_id": 622900,
                "sort": 2
            }, {"id": 622922, "name": "康乐县", "parent_id": 622900, "sort": 3}, {
                "id": 622923,
                "name": "永靖县",
                "parent_id": 622900,
                "sort": 4
            }, {"id": 622924, "name": "广河县", "parent_id": 622900, "sort": 5}, {
                "id": 622925,
                "name": "和政县",
                "parent_id": 622900,
                "sort": 6
            }, {"id": 622926, "name": "东乡族自治县", "parent_id": 622900, "sort": 7}, {
                "id": 622927,
                "name": "积石山保安族东乡族撒拉族自治县",
                "parent_id": 622900,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 623000,
            "name": "甘南藏族自治州",
            "parent_id": 620000,
            "sort": 14,
            "sub": [{"id": 623001, "name": "合作市", "parent_id": 623000, "sort": 1}, {
                "id": 623021,
                "name": "临潭县",
                "parent_id": 623000,
                "sort": 2
            }, {"id": 623022, "name": "卓尼县", "parent_id": 623000, "sort": 3}, {
                "id": 623023,
                "name": "舟曲县",
                "parent_id": 623000,
                "sort": 4
            }, {"id": 623024, "name": "迭部县", "parent_id": 623000, "sort": 5}, {
                "id": 623025,
                "name": "玛曲县",
                "parent_id": 623000,
                "sort": 6
            }, {"id": 623026, "name": "碌曲县", "parent_id": 623000, "sort": 7}, {
                "id": 623027,
                "name": "夏河县",
                "parent_id": 623000,
                "sort": 8
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 630000,
        "name": "青海省",
        "parent_id": 0,
        "sort": 29,
        "sub": [{
            "id": 630100,
            "name": "西宁市",
            "parent_id": 630000,
            "sort": 1,
            "sub": [{"id": 630101, "name": "市辖区", "parent_id": 630100, "sort": 1}, {
                "id": 630102,
                "name": "城东区",
                "parent_id": 630100,
                "sort": 2
            }, {"id": 630103, "name": "城中区", "parent_id": 630100, "sort": 3}, {
                "id": 630104,
                "name": "城西区",
                "parent_id": 630100,
                "sort": 4
            }, {"id": 630105, "name": "城北区", "parent_id": 630100, "sort": 5}, {
                "id": 630121,
                "name": "大通回族土族自治县",
                "parent_id": 630100,
                "sort": 6
            }, {"id": 630122, "name": "湟中县", "parent_id": 630100, "sort": 7}, {
                "id": 630123,
                "name": "湟源县",
                "parent_id": 630100,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 632100,
            "name": "海东地区",
            "parent_id": 630000,
            "sort": 2,
            "sub": [{"id": 632121, "name": "平安县", "parent_id": 632100, "sort": 1}, {
                "id": 632122,
                "name": "民和回族土族自治县",
                "parent_id": 632100,
                "sort": 2
            }, {"id": 632123, "name": "乐都县", "parent_id": 632100, "sort": 3}, {
                "id": 632126,
                "name": "互助土族自治县",
                "parent_id": 632100,
                "sort": 4
            }, {"id": 632127, "name": "化隆回族自治县", "parent_id": 632100, "sort": 5}, {
                "id": 632128,
                "name": "循化撒拉族自治县",
                "parent_id": 632100,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 632200,
            "name": "海北藏族自治州",
            "parent_id": 630000,
            "sort": 3,
            "sub": [{"id": 632221, "name": "门源回族自治县", "parent_id": 632200, "sort": 1}, {
                "id": 632222,
                "name": "祁连县",
                "parent_id": 632200,
                "sort": 2
            }, {"id": 632223, "name": "海晏县", "parent_id": 632200, "sort": 3}, {
                "id": 632224,
                "name": "刚察县",
                "parent_id": 632200,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 632300,
            "name": "黄南藏族自治州",
            "parent_id": 630000,
            "sort": 4,
            "sub": [{"id": 632321, "name": "同仁县", "parent_id": 632300, "sort": 1}, {
                "id": 632322,
                "name": "尖扎县",
                "parent_id": 632300,
                "sort": 2
            }, {"id": 632323, "name": "泽库县", "parent_id": 632300, "sort": 3}, {
                "id": 632324,
                "name": "河南蒙古族自治县",
                "parent_id": 632300,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 632500,
            "name": "海南藏族自治州",
            "parent_id": 630000,
            "sort": 5,
            "sub": [{"id": 632521, "name": "共和县", "parent_id": 632500, "sort": 1}, {
                "id": 632522,
                "name": "同德县",
                "parent_id": 632500,
                "sort": 2
            }, {"id": 632523, "name": "贵德县", "parent_id": 632500, "sort": 3}, {
                "id": 632524,
                "name": "兴海县",
                "parent_id": 632500,
                "sort": 4
            }, {"id": 632525, "name": "贵南县", "parent_id": 632500, "sort": 5}],
            "type": 0
        }, {
            "id": 632600,
            "name": "果洛藏族自治州",
            "parent_id": 630000,
            "sort": 6,
            "sub": [{"id": 632621, "name": "玛沁县", "parent_id": 632600, "sort": 1}, {
                "id": 632622,
                "name": "班玛县",
                "parent_id": 632600,
                "sort": 2
            }, {"id": 632623, "name": "甘德县", "parent_id": 632600, "sort": 3}, {
                "id": 632624,
                "name": "达日县",
                "parent_id": 632600,
                "sort": 4
            }, {"id": 632625, "name": "久治县", "parent_id": 632600, "sort": 5}, {
                "id": 632626,
                "name": "玛多县",
                "parent_id": 632600,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 632700,
            "name": "玉树藏族自治州",
            "parent_id": 630000,
            "sort": 7,
            "sub": [{"id": 632721, "name": "玉树县", "parent_id": 632700, "sort": 1}, {
                "id": 632722,
                "name": "杂多县",
                "parent_id": 632700,
                "sort": 2
            }, {"id": 632723, "name": "称多县", "parent_id": 632700, "sort": 3}, {
                "id": 632724,
                "name": "治多县",
                "parent_id": 632700,
                "sort": 4
            }, {"id": 632725, "name": "囊谦县", "parent_id": 632700, "sort": 5}, {
                "id": 632726,
                "name": "曲麻莱县",
                "parent_id": 632700,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 632800,
            "name": "海西蒙古族藏族自治州",
            "parent_id": 630000,
            "sort": 8,
            "sub": [{"id": 632801, "name": "格尔木市", "parent_id": 632800, "sort": 1}, {
                "id": 632802,
                "name": "德令哈市",
                "parent_id": 632800,
                "sort": 2
            }, {"id": 632821, "name": "乌兰县", "parent_id": 632800, "sort": 3}, {
                "id": 632822,
                "name": "都兰县",
                "parent_id": 632800,
                "sort": 4
            }, {"id": 632823, "name": "天峻县", "parent_id": 632800, "sort": 5}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 640000,
        "name": "宁　夏",
        "parent_id": 0,
        "sort": 30,
        "sub": [{
            "id": 640100,
            "name": "银川市",
            "parent_id": 640000,
            "sort": 1,
            "sub": [{"id": 640101, "name": "市辖区", "parent_id": 640100, "sort": 1}, {
                "id": 640104,
                "name": "兴庆区",
                "parent_id": 640100,
                "sort": 2
            }, {"id": 640105, "name": "西夏区", "parent_id": 640100, "sort": 3}, {
                "id": 640106,
                "name": "金凤区",
                "parent_id": 640100,
                "sort": 4
            }, {"id": 640121, "name": "永宁县", "parent_id": 640100, "sort": 5}, {
                "id": 640122,
                "name": "贺兰县",
                "parent_id": 640100,
                "sort": 6
            }, {"id": 640181, "name": "灵武市", "parent_id": 640100, "sort": 7}],
            "type": 0
        }, {
            "id": 640200,
            "name": "石嘴山市",
            "parent_id": 640000,
            "sort": 2,
            "sub": [{"id": 640201, "name": "市辖区", "parent_id": 640200, "sort": 1}, {
                "id": 640202,
                "name": "大武口区",
                "parent_id": 640200,
                "sort": 2
            }, {"id": 640205, "name": "惠农区", "parent_id": 640200, "sort": 3}, {
                "id": 640221,
                "name": "平罗县",
                "parent_id": 640200,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 640300,
            "name": "吴忠市",
            "parent_id": 640000,
            "sort": 3,
            "sub": [{"id": 640301, "name": "市辖区", "parent_id": 640300, "sort": 1}, {
                "id": 640302,
                "name": "利通区",
                "parent_id": 640300,
                "sort": 2
            }, {"id": 640323, "name": "盐池县", "parent_id": 640300, "sort": 3}, {
                "id": 640324,
                "name": "同心县",
                "parent_id": 640300,
                "sort": 4
            }, {"id": 640381, "name": "青铜峡市", "parent_id": 640300, "sort": 5}],
            "type": 0
        }, {
            "id": 640400,
            "name": "固原市",
            "parent_id": 640000,
            "sort": 4,
            "sub": [{"id": 640401, "name": "市辖区", "parent_id": 640400, "sort": 1}, {
                "id": 640402,
                "name": "原州区",
                "parent_id": 640400,
                "sort": 2
            }, {"id": 640422, "name": "西吉县", "parent_id": 640400, "sort": 3}, {
                "id": 640423,
                "name": "隆德县",
                "parent_id": 640400,
                "sort": 4
            }, {"id": 640424, "name": "泾源县", "parent_id": 640400, "sort": 5}, {
                "id": 640425,
                "name": "彭阳县",
                "parent_id": 640400,
                "sort": 6
            }],
            "type": 0
        }, {
            "id": 640500,
            "name": "中卫市",
            "parent_id": 640000,
            "sort": 5,
            "sub": [{"id": 640501, "name": "市辖区", "parent_id": 640500, "sort": 1}, {
                "id": 640502,
                "name": "沙坡头区",
                "parent_id": 640500,
                "sort": 2
            }, {"id": 640521, "name": "中宁县", "parent_id": 640500, "sort": 3}, {
                "id": 640522,
                "name": "海原县",
                "parent_id": 640500,
                "sort": 4
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 650000,
        "name": "新　疆",
        "parent_id": 0,
        "sort": 31,
        "sub": [{
            "id": 650100,
            "name": "乌鲁木齐市",
            "parent_id": 650000,
            "sort": 1,
            "sub": [{"id": 650101, "name": "市辖区", "parent_id": 650100, "sort": 1}, {
                "id": 650102,
                "name": "天山区",
                "parent_id": 650100,
                "sort": 2
            }, {"id": 650103, "name": "沙依巴克区", "parent_id": 650100, "sort": 3}, {
                "id": 650104,
                "name": "新市区",
                "parent_id": 650100,
                "sort": 4
            }, {"id": 650105, "name": "水磨沟区", "parent_id": 650100, "sort": 5}, {
                "id": 650106,
                "name": "头屯河区",
                "parent_id": 650100,
                "sort": 6
            }, {"id": 650107, "name": "达坂城区", "parent_id": 650100, "sort": 7}, {
                "id": 650108,
                "name": "东山区",
                "parent_id": 650100,
                "sort": 8
            }, {"id": 650121, "name": "乌鲁木齐县", "parent_id": 650100, "sort": 9}],
            "type": 0
        }, {
            "id": 650200,
            "name": "克拉玛依市",
            "parent_id": 650000,
            "sort": 2,
            "sub": [{"id": 650201, "name": "市辖区", "parent_id": 650200, "sort": 1}, {
                "id": 650202,
                "name": "独山子区",
                "parent_id": 650200,
                "sort": 2
            }, {"id": 650203, "name": "克拉玛依区", "parent_id": 650200, "sort": 3}, {
                "id": 650204,
                "name": "白碱滩区",
                "parent_id": 650200,
                "sort": 4
            }, {"id": 650205, "name": "乌尔禾区", "parent_id": 650200, "sort": 5}],
            "type": 0
        }, {
            "id": 652100,
            "name": "吐鲁番地区",
            "parent_id": 650000,
            "sort": 3,
            "sub": [{"id": 652101, "name": "吐鲁番市", "parent_id": 652100, "sort": 1}, {
                "id": 652122,
                "name": "鄯善县",
                "parent_id": 652100,
                "sort": 2
            }, {"id": 652123, "name": "托克逊县", "parent_id": 652100, "sort": 3}],
            "type": 0
        }, {
            "id": 652200,
            "name": "哈密地区",
            "parent_id": 650000,
            "sort": 4,
            "sub": [{"id": 652201, "name": "哈密市", "parent_id": 652200, "sort": 1}, {
                "id": 652222,
                "name": "巴里坤哈萨克自治县",
                "parent_id": 652200,
                "sort": 2
            }, {"id": 652223, "name": "伊吾县", "parent_id": 652200, "sort": 3}],
            "type": 0
        }, {
            "id": 652300,
            "name": "昌吉回族自治州",
            "parent_id": 650000,
            "sort": 5,
            "sub": [{"id": 652301, "name": "昌吉市", "parent_id": 652300, "sort": 1}, {
                "id": 652302,
                "name": "阜康市",
                "parent_id": 652300,
                "sort": 2
            }, {"id": 652303, "name": "米泉市", "parent_id": 652300, "sort": 3}, {
                "id": 652323,
                "name": "呼图壁县",
                "parent_id": 652300,
                "sort": 4
            }, {"id": 652324, "name": "玛纳斯县", "parent_id": 652300, "sort": 5}, {
                "id": 652325,
                "name": "奇台县",
                "parent_id": 652300,
                "sort": 6
            }, {"id": 652327, "name": "吉木萨尔县", "parent_id": 652300, "sort": 7}, {
                "id": 652328,
                "name": "木垒哈萨克自治县",
                "parent_id": 652300,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 652700,
            "name": "博尔塔拉蒙古自治州",
            "parent_id": 650000,
            "sort": 6,
            "sub": [{"id": 652701, "name": "博乐市", "parent_id": 652700, "sort": 1}, {
                "id": 652722,
                "name": "精河县",
                "parent_id": 652700,
                "sort": 2
            }, {"id": 652723, "name": "温泉县", "parent_id": 652700, "sort": 3}],
            "type": 0
        }, {
            "id": 652800,
            "name": "巴音郭楞蒙古自治州",
            "parent_id": 650000,
            "sort": 7,
            "sub": [{"id": 652801, "name": "库尔勒市", "parent_id": 652800, "sort": 1}, {
                "id": 652822,
                "name": "轮台县",
                "parent_id": 652800,
                "sort": 2
            }, {"id": 652823, "name": "尉犁县", "parent_id": 652800, "sort": 3}, {
                "id": 652824,
                "name": "若羌县",
                "parent_id": 652800,
                "sort": 4
            }, {"id": 652825, "name": "且末县", "parent_id": 652800, "sort": 5}, {
                "id": 652826,
                "name": "焉耆回族自治县",
                "parent_id": 652800,
                "sort": 6
            }, {"id": 652827, "name": "和静县", "parent_id": 652800, "sort": 7}, {
                "id": 652828,
                "name": "和硕县",
                "parent_id": 652800,
                "sort": 8
            }, {"id": 652829, "name": "博湖县", "parent_id": 652800, "sort": 9}],
            "type": 0
        }, {
            "id": 652900,
            "name": "阿克苏地区",
            "parent_id": 650000,
            "sort": 8,
            "sub": [{"id": 652901, "name": "阿克苏市", "parent_id": 652900, "sort": 1}, {
                "id": 652922,
                "name": "温宿县",
                "parent_id": 652900,
                "sort": 2
            }, {"id": 652923, "name": "库车县", "parent_id": 652900, "sort": 3}, {
                "id": 652924,
                "name": "沙雅县",
                "parent_id": 652900,
                "sort": 4
            }, {"id": 652925, "name": "新和县", "parent_id": 652900, "sort": 5}, {
                "id": 652926,
                "name": "拜城县",
                "parent_id": 652900,
                "sort": 6
            }, {"id": 652927, "name": "乌什县", "parent_id": 652900, "sort": 7}, {
                "id": 652928,
                "name": "阿瓦提县",
                "parent_id": 652900,
                "sort": 8
            }, {"id": 652929, "name": "柯坪县", "parent_id": 652900, "sort": 9}],
            "type": 0
        }, {
            "id": 653000,
            "name": "克孜勒苏柯尔克孜自治州",
            "parent_id": 650000,
            "sort": 9,
            "sub": [{"id": 653001, "name": "阿图什市", "parent_id": 653000, "sort": 1}, {
                "id": 653022,
                "name": "阿克陶县",
                "parent_id": 653000,
                "sort": 2
            }, {"id": 653023, "name": "阿合奇县", "parent_id": 653000, "sort": 3}, {
                "id": 653024,
                "name": "乌恰县",
                "parent_id": 653000,
                "sort": 4
            }],
            "type": 0
        }, {
            "id": 653100,
            "name": "喀什地区",
            "parent_id": 650000,
            "sort": 10,
            "sub": [{"id": 653101, "name": "喀什市", "parent_id": 653100, "sort": 1}, {
                "id": 653121,
                "name": "疏附县",
                "parent_id": 653100,
                "sort": 2
            }, {"id": 653122, "name": "疏勒县", "parent_id": 653100, "sort": 3}, {
                "id": 653123,
                "name": "英吉沙县",
                "parent_id": 653100,
                "sort": 4
            }, {"id": 653124, "name": "泽普县", "parent_id": 653100, "sort": 5}, {
                "id": 653125,
                "name": "莎车县",
                "parent_id": 653100,
                "sort": 6
            }, {"id": 653126, "name": "叶城县", "parent_id": 653100, "sort": 7}, {
                "id": 653127,
                "name": "麦盖提县",
                "parent_id": 653100,
                "sort": 8
            }, {"id": 653128, "name": "岳普湖县", "parent_id": 653100, "sort": 9}, {
                "id": 653129,
                "name": "伽师县",
                "parent_id": 653100,
                "sort": 10
            }, {"id": 653130, "name": "巴楚县", "parent_id": 653100, "sort": 11}, {
                "id": 653131,
                "name": "塔什库尔干塔吉克自治县",
                "parent_id": 653100,
                "sort": 12
            }],
            "type": 0
        }, {
            "id": 653200,
            "name": "和田地区",
            "parent_id": 650000,
            "sort": 11,
            "sub": [{"id": 653201, "name": "和田市", "parent_id": 653200, "sort": 1}, {
                "id": 653221,
                "name": "和田县",
                "parent_id": 653200,
                "sort": 2
            }, {"id": 653222, "name": "墨玉县", "parent_id": 653200, "sort": 3}, {
                "id": 653223,
                "name": "皮山县",
                "parent_id": 653200,
                "sort": 4
            }, {"id": 653224, "name": "洛浦县", "parent_id": 653200, "sort": 5}, {
                "id": 653225,
                "name": "策勒县",
                "parent_id": 653200,
                "sort": 6
            }, {"id": 653226, "name": "于田县", "parent_id": 653200, "sort": 7}, {
                "id": 653227,
                "name": "民丰县",
                "parent_id": 653200,
                "sort": 8
            }],
            "type": 0
        }, {
            "id": 654000,
            "name": "伊犁哈萨克自治州",
            "parent_id": 650000,
            "sort": 12,
            "sub": [{"id": 654002, "name": "伊宁市", "parent_id": 654000, "sort": 1}, {
                "id": 654003,
                "name": "奎屯市",
                "parent_id": 654000,
                "sort": 2
            }, {"id": 654021, "name": "伊宁县", "parent_id": 654000, "sort": 3}, {
                "id": 654022,
                "name": "察布查尔锡伯自治县",
                "parent_id": 654000,
                "sort": 4
            }, {"id": 654023, "name": "霍城县", "parent_id": 654000, "sort": 5}, {
                "id": 654024,
                "name": "巩留县",
                "parent_id": 654000,
                "sort": 6
            }, {"id": 654025, "name": "新源县", "parent_id": 654000, "sort": 7}, {
                "id": 654026,
                "name": "昭苏县",
                "parent_id": 654000,
                "sort": 8
            }, {"id": 654027, "name": "特克斯县", "parent_id": 654000, "sort": 9}, {
                "id": 654028,
                "name": "尼勒克县",
                "parent_id": 654000,
                "sort": 10
            }],
            "type": 0
        }, {
            "id": 654200,
            "name": "塔城地区",
            "parent_id": 650000,
            "sort": 13,
            "sub": [{"id": 654201, "name": "塔城市", "parent_id": 654200, "sort": 1}, {
                "id": 654202,
                "name": "乌苏市",
                "parent_id": 654200,
                "sort": 2
            }, {"id": 654221, "name": "额敏县", "parent_id": 654200, "sort": 3}, {
                "id": 654223,
                "name": "沙湾县",
                "parent_id": 654200,
                "sort": 4
            }, {"id": 654224, "name": "托里县", "parent_id": 654200, "sort": 5}, {
                "id": 654225,
                "name": "裕民县",
                "parent_id": 654200,
                "sort": 6
            }, {"id": 654226, "name": "和布克赛尔蒙古自治县", "parent_id": 654200, "sort": 7}],
            "type": 0
        }, {
            "id": 654300,
            "name": "阿勒泰地区",
            "parent_id": 650000,
            "sort": 14,
            "sub": [{"id": 654301, "name": "阿勒泰市", "parent_id": 654300, "sort": 1}, {
                "id": 654321,
                "name": "布尔津县",
                "parent_id": 654300,
                "sort": 2
            }, {"id": 654322, "name": "富蕴县", "parent_id": 654300, "sort": 3}, {
                "id": 654323,
                "name": "福海县",
                "parent_id": 654300,
                "sort": 4
            }, {"id": 654324, "name": "哈巴河县", "parent_id": 654300, "sort": 5}, {
                "id": 654325,
                "name": "青河县",
                "parent_id": 654300,
                "sort": 6
            }, {"id": 654326, "name": "吉木乃县", "parent_id": 654300, "sort": 7}],
            "type": 0
        }, {
            "id": 659000,
            "name": "省直辖行政单位",
            "parent_id": 650000,
            "sort": 15,
            "sub": [{"id": 659001, "name": "石河子市", "parent_id": 659000, "sort": 1}, {
                "id": 659002,
                "name": "阿拉尔市",
                "parent_id": 659000,
                "sort": 2
            }, {"id": 659003, "name": "图木舒克市", "parent_id": 659000, "sort": 3}, {
                "id": 659004,
                "name": "五家渠市",
                "parent_id": 659000,
                "sort": 4
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 710000,
        "name": "台湾省",
        "parent_id": 0,
        "sort": 32,
        "sub": [{
            "id": 710001,
            "name": "台北市",
            "parent_id": 710000,
            "sort": 1,
            "sub": [{"id": 710002, "name": "台北县", "parent_id": 710001, "sort": 1}],
            "type": 0
        }, {
            "id": 710003,
            "name": "基隆市",
            "parent_id": 710000,
            "sort": 2,
            "sub": [{"id": 710004, "name": "花莲县", "parent_id": 710003, "sort": 1}],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 810000,
        "name": "香　港",
        "parent_id": 0,
        "sort": 33,
        "sub": [{
            "id": 810001,
            "name": "香港",
            "parent_id": 810000,
            "sort": 1,
            "sub": [{"id": 810002, "name": "中西区", "parent_id": 810001, "sort": 1}, {
                "id": 810003,
                "name": "九龙城区",
                "parent_id": 810001,
                "sort": 2
            }, {"id": 810004, "name": "南区", "parent_id": 810001, "sort": 3}, {
                "id": 810005,
                "name": "黄大仙区",
                "parent_id": 810001,
                "sort": 4
            }, {"id": 810006, "name": "油尖旺区", "parent_id": 810001, "sort": 5}, {
                "id": 810007,
                "name": "葵青区",
                "parent_id": 810001,
                "sort": 6
            }, {"id": 810008, "name": "西贡区", "parent_id": 810001, "sort": 7}, {
                "id": 810009,
                "name": "屯门区",
                "parent_id": 810001,
                "sort": 8
            }, {"id": 810010, "name": "荃湾区", "parent_id": 810001, "sort": 9}, {
                "id": 810011,
                "name": "东区",
                "parent_id": 810001,
                "sort": 10
            }, {"id": 810012, "name": "观塘区", "parent_id": 810001, "sort": 11}, {
                "id": 810013,
                "name": "深水步区",
                "parent_id": 810001,
                "sort": 12
            }, {"id": 810014, "name": "湾仔区", "parent_id": 810001, "sort": 13}, {
                "id": 810015,
                "name": "离岛区",
                "parent_id": 810001,
                "sort": 14
            }, {"id": 810016, "name": "北区", "parent_id": 810001, "sort": 15}, {
                "id": 810017,
                "name": "沙田区",
                "parent_id": 810001,
                "sort": 16
            }, {"id": 810018, "name": "大埔区", "parent_id": 810001, "sort": 17}, {
                "id": 810019,
                "name": "元朗区",
                "parent_id": 810001,
                "sort": 18
            }],
            "type": 0
        }],
        "type": 0
    }, {
        "id": 820000,
        "name": "澳　门",
        "parent_id": 0,
        "sort": 34,
        "sub": [{
            "id": 820001,
            "name": "澳门",
            "parent_id": 820000,
            "sort": 1,
            "sub": [{"id": 820002, "name": "澳门", "parent_id": 820001, "sort": 1}],
            "type": 0
        }],
        "type": 0
    }];

}($);
// jshint ignore: end

/* global $:true */
/* jshint unused:false*/

+function ($) {
    "use strict";

    $.fn.cityPicker = function (params) {
        return this.each(function () {
            if (!this) return;
            var format = function (data) {
                var result = [];
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    if (d.name === "请选择") continue;
                    result.push(d.name);
                }
                if (result.length) return result;
                return [""];
            };

            var sub = function (data) {
                if (!data.sub) return [""];
                return format(data.sub);
            };

            var getCities = function (d) {
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].name === d) return sub(raw[i]);
                }
                return [""];
            };

            var getDistricts = function (p, c) {
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].name === p) {
                        for (var j = 0; j < raw[i].sub.length; j++) {
                            if (raw[i].sub[j].name === c) {
                                return sub(raw[i].sub[j]);
                            }
                        }
                    }
                }
                return [""];
            };

            var raw = $.smConfig.rawCitiesData;
            var provinces = raw.map(function (d) {
                return d.name;
            });
            var initCities = sub(raw[0]);
            var initDistricts = [""];

            var currentProvince = provinces[0];
            var currentCity = initCities[0];
            var currentDistrict = initDistricts[0];

            var defaults = {

                cssClass: "city-picker",
                rotateEffect: false,  //为了性能

                onChange: function (picker, values, displayValues) {
                    var newProvince = values[0];
                    var newCity;
                    if (newProvince !== currentProvince) {
                        var newCities = getCities(newProvince);
                        newCity = newCities[0];
                        var newDistricts = getDistricts(newProvince, newCity);
                        picker.cols[1].replaceValues(newCities);
                        picker.cols[2].replaceValues(newDistricts);
                        currentProvince = newProvince;
                        currentCity = newCity;
                        picker.updateValue();
                        return;
                    }
                    newCity = picker.cols[1].value;
                    if (newCity !== currentCity) {
                        picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                        currentCity = newCity;
                        picker.updateValue();
                    }
                },

                cols: [
                    {
                        values: provinces,
                        cssClass: "col-province"
                    },
                    {
                        values: initCities,
                        cssClass: "col-city"
                    },
                    {
                        values: initDistricts,
                        cssClass: "col-district"
                    }
                ]
            };

            var p = $.extend(defaults, params);
            //计算value
            var val = $(this).val();
            if (val) {
                p.value = val.split(" ");
                if (p.value[0]) {
                    currentProvince = p.value[0];
                    p.cols[1].values = getCities(p.value[0]);
                }
                if (p.value[1]) {
                    currentCity = p.value[1];
                    p.cols[2].values = getDistricts(p.value[0], p.value[1]);
                } else {
                    currentDistrict = p.value[2];
                    p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]);
                }
            }
            $(this).picker(p);
        });
    };

}($);
