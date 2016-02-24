'use strict';
/**
 * template config
 */
export default {
    type: 'nunjucks',
    content_type: 'text/html',
    file_ext: '.html',
    file_depr: '_',
    root_path: think.ROOT_PATH + '/view',
    adapter: {
        nunjucks: {
            prerender: (nunjucks, env) => {
                /**
                 * 格式化字节大小
                 * @param  number size      字节数
                 * @param  string delimiter 数字和单位分隔符
                 * @return string            格式化后的带单位的大小
                 */
                env.addFilter("format_bytes", function (size, delimiter = '') {
                    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
                    for (var i = 0; size >= 1024 && i < 5; i++) size /= 1024;
                    return Math.round(size * 100) / 100 + delimiter + units[i];
                });

                /**
                 * 格式化时间
                 */
                env.addFilter("format_time", function (d, sec) {
                    var time;
                    var date = new Date(d);
                    var y = date.getFullYear();
                    var M = date.getMonth() + 1;
                    M = M < 10 ? "0" + M : M;
                    var d = date.getDate();
                    d = d < 10 ? "0" + d : d;
                    var h = date.getHours();
                    h = h < 10 ? "0" + h : h;
                    var m = date.getMinutes();
                    m = m < 10 ? "0" + m : m;
                    var s = date.getSeconds();
                    s = s < 10 ? "0" + s : s;
                    if (sec) {
                        time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
                    } else {
                        time = y + "-" + M + "-" + d + " " + h + ":" + m;
                    }
                    return time;
                })

                /**
                 *分析枚举类型配置值 格式 a:名称1,b:名称2
                 */
                env.addFilter("parse_config_attr", function (str) {
                    return parse_config_attr(str)
                })
                env.addFilter("show_status_op", function (status) {
                    // 获取数据的状态操作
                    switch (status) {
                        case 0: return '启用'; break;
                        case 1: return '禁用'; break;
                        case 2: return '审核'; break;
                        default: return false; break;

                    }
                })
                /**
                 * 获取文档的类型文字
                 */
                env.addFilter("get_document_type", function (type = null) {
                    if (think.isEmpty(type)) {
                        return false;
                    }
                    switch (type) {
                        case 1: return '目录'; break;
                        case 2: return '主题'; break;
                        case 3: return '段落'; break;
                        default: return false; break;
                    }
                })
                env.addFilter("strToJson", function (str) {
                   if(!think.isEmpty(str)){
                        return JSON.parse(str);
                   }      
                })
                env.addFilter("strToArray", function (str) {
                    if (!think.isEmpty(str)) {
                        let ss = str.split(",");// 在每个逗号(,)处进行分解。
                        return ss;
                    }
                })

                env.addFilter("in_Array", function (str, arr) {
                    if (!think.isArray(arr)) {
                        arr = arr.split(",");
                    }
                    console.log(arr);
                    return in_array(str, arr);
                })

                env.addFilter("isempty", function (any) {
                    return think.isEmpty(any);
                })
                //价格格式化
                env.addFilter("present_price", function (price,type) {
                    return present_price(price,type);
                })
                
                //获取字段类型信息
                env.addFilter("get_attribute_type", function (str) {
                    return get_attribute_type(str);
                })
                //格式化字段列表
                env.addFilter("get_list_field", function (data, grid, controller, module) {
                    return get_list_field(data, grid, controller, module);
                })
                /**
                 * 时间戳格式化 dateformat('Y-m-d H:i:s')
                 * @param extra 'Y-m-d H:i:s'
                 * @param date  时间戳
                 * @return  '2015-12-17 15:39:44'
                 */
                env.addFilter("dateformat", function (extra, date) {
                    return dateformat(date, extra);
                })
                
                /**
                 * 获取行为类型
                 * @param intger type 类型
                 * @param bool all 是否返回全部类型
                 * @author arterli <arterli@qq.com>
                 */
                env.addFilter("get_action_type", function (type, all = false) {
                    return get_action_type(type, all);
                })

                /**
                 * 获取用户名称
                 */
                env.addFilter("get_nickname", async(uid, callback) => {
                    let data = await get_nickname(uid);
                    callback(null,data);
            }, true)
            /**
             * 获取文档url
             */
            env.addFilter('get_url', (name, id) => {
                return get_url(name, id)
            })
                /**
                 * 获取文档封面图
                 */
                env.addFilter('get_cover', async(cover_id, field, callback) => {

                let data = await get_cover(cover_id, field);
                    callback(null,data);

        }, true)
        env.addExtension('tagtest', new mytags(), true);
        /**
         * 获取分类标签
         */
        env.addExtension('column', new column(), true);
        /**
         * 获取导航标签
         */
        env.addExtension('channel', new channel(), true);
        /**
         * 获取数据标签
         */
        env.addExtension('topic', new topic(), true);
    }
}
    }
};
