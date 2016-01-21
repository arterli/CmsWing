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
            prerender: function (nunjucks, env) {
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

                    return JSON.parse(str);

                })
                env.addFilter("strToArray", function (srt) {
                    if (srt) {
                        var s = "abc,abcd,aaa";
                        console.log(srt)
                        let ss = s.split(",");// 在每个逗号(,)处进行分解。
                        return ss;
                    }
                })

                env.addFilter("in_Array", function (str, arr) {
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
                /**
                 * 时间戳格式化 dateformat()
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
               env.addFilter("stj",function(str){  
                   return eval('(' + str + ')');
               })
                env.addExtension('mytas', {
                    tags: ['mytas'],
                    parse: function *(parser, nodes, lexer) {
                        //     var node;
                        //     var endBlock;


                        //     var tag = parser.nextToken();//当前定义的tags
                        //    // var tok = parser.peekToken();

                        //     console.log(tag)
                        //    // console.log(tok);
                        //     var args = parser.parseSignature(null, true);
                        //     parser.advanceAfterBlockEnd(tag.value);

                        //     var body = parser.parseUntilBlocks('else', 'endtruncate');
                        //     var errorBody = null;

                        //     if (parser.skipSymbol('else')) {
                        //         parser.skip(lexer.TOKEN_BLOCK_END);
                        //         errorBody = parser.parseUntilBlocks('endmytas');
                        //     }

                        //     parser.advanceAfterBlockEnd();

                        // get the tag token
                        // var tag = parser.nextToken();
                        // //var tok = parser.peekToken();
                        // console.log(tag);
                        // //console.log(tok);
                        // // parse the args and move after the block end. passing true
                        // // as the second arg is required if there are no parentheses
                        // //console.log(parser.parsePrimary())
                        // var args = parser.parseSignature(null, true);
                        // parser.advanceAfterBlockEnd(tag.value);
                        // console.log(args);
                        // var node = new nodes.Set(tag.lineno, tag.colno, []);
                        // var target;
                        // while ((target = parser.parsePrimary())) {
                        //     node.targets.push(target);

                        //     if (!parser.skip(lexer.TOKEN_COMMA)) {
                        //         break;
                        //     }
                        // }
                        // // parse the body and possibly the error block, which is optional
                        // var body = parser.parseUntilBlocks('else', 'endtruncate');
                        // var errorBody = null;

                        // if (parser.skipSymbol('else')) {
                        //     parser.skip(lexer.TOKEN_BLOCK_END);
                        //     errorBody = parser.parseUntilBlocks('endmytas');
                        // }

                        // parser.advanceAfterBlockEnd();
                        // return "ddd";
                        // See above for notes about CallExtension
                        /// return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
                        var tag = parser.peekToken();
                        if (!parser.skipSymbol('mytas')) {
                            parser.fail('parseSet: expected set', tag.lineno, tag.colno);
                        }

                        var node = new nodes.Set(tag.lineno, tag.colno, []);

                        var target;
                        while ((target = parser.parsePrimary())) {
                            node.targets.push(target);

                            if (!parser.skip(lexer.TOKEN_COMMA)) {
                                break;
                            }
                        }

                        if (!parser.skipValue(lexer.TOKEN_OPERATOR, '=')) {
                            parser.fail('parseSet: expected = in set tag',
                                tag.lineno,
                                tag.colno);
                        }
                        
                        node.value = parser.parseExpression();
                        let aa =  think.model('action_log', think.config("db"))
                                .select().then(data=>{
                                    return data;
                                    //node.value.value ='[{ a: 1 }, { a: 2 }]';
                                });
                        console.log(aa);
                        node.value.value ='[{ a: 1 }, { a: 2 }]';
                        console.log(node.value);
                        parser.advanceAfterBlockEnd(tag.value);

                        return node;

                    },
                    run: function (context, arg, body, errorBody) {
                        // let ar = args.split(',')
                        console.log(arg)
                        //let aa = think.model('action', think.config("db")).select();   
                        //console.log(aa);
                        // console.log(errorBody())
                        //console.log(body())
                        
                        return [{ a: 1 }, { a: 2 }];

                    }
                });
                //console.log(env);
            }
        }
    }
};