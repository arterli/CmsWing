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
                 env.addFilter("jsonToStr", function (json) {
                   if(!think.isEmpty(json)){
                        return JSON.stringify(json);   
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
               
                //获取字段类型信息
                env.addFilter("get_attribute_type", function (str) {
                    return get_attribute_type(str);
                })
                //格式化字段列表
                env.addFilter("get_list_field", function (data, grid, controller, module) {
                    return get_list_field(data, grid, controller, module);
                })
                //表情图标正则替换
                env.addFilter("get_bq", function (wx_bq,emoji) {
                    for(let key in emoji){
                        let img = '<img src="https:\/\/res.wx.qq.com/mpres/htmledition/images/icon/emotion/'+key+'.gif" />';
                        let reg = new RegExp('\\['+ emoji[key] + '\\]' ,'g');
                        wx_bq = wx_bq.replace(reg, img);
                    }
                    return wx_bq;
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
                 * 获取模型字段信息 
                 * @param model_id 模型id 或 模型名称
                 * @param id 数据id
                 * @param field 字段
                 * @param return 整条数据或字段数据
                 * @author arterli <arterli@qq.com>
                 */
                env.addFilter("getmodelfield", async(id,model_id,field, callback) => {
                    let data = await getmodelfield(model_id,id,field);
                    callback(null,data);
                 }, true)
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
                /**
                 * {{id|get_pic("m=1,w=200,h=200")}}
                 */
                env.addFilter('get_pic', async(id,type,callback)=>{
                    let m,w,h;
                    console.log(type);
                    let obj ={};
                    for(let v of type.split(",")){
                       v = v.split("=");
                        obj[v[0]]=v[1];
                    }
                    m=obj.m;
                    w=obj.w;
                    h=obj.h;
                  let data = await get_pic(id,m,w,h);
                    callback(null,data);
                },true)
         //价格格式化
                env.addFilter("get_price_format", function (price,type) {
                    return get_price_format(price,type);
                })
                /**
                 * is_weixin
                 * 判断是否是微信访问
                 */
                env.addFilter("is_weixin",(agent)=>{
                    return is_weixin(agent);
                })
                /** 
     * 将数值四舍五入(保留1位小数)后格式化成金额形式 
     * 
     * @param num 数值(Number或者String) 
     * @return 金额格式的字符串,如'1,234,567.4' 
     * @type String 
     */  
          env.addFilter("formatCurrency",function (num) {
              if(!think.isEmpty(num)) {
                  return formatCurrency(num);
              }
          })
        /**
         * 获取商品价格不格式
         */
        env.addFilter('get_price',function (price,type){
            return get_price(price,type);
        })
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
