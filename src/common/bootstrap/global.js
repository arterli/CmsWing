// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 *
 *global.xxx = async () => {
 *   let data = await Promise.resolve(111)
 *}
 */

/**
 * ip转数字
 * @param ip
 * @returns {number}
 * @private
 */
/* global _ip2int(ip)*/
global._ip2int = function(ip) {
    var num = 0;
    ip = ip.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
}
/**
 * 数字转ip
 * @param num
 * @returns {string|*}
 * @private
 */
/*global _int2ip(num: number) */
global._int2iP = function(num) {
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}

/**
 * 密码加密
 * @param password 加密的密码
 * @param md5encoded true-密码不加密，默认加密
 * @returns {*}
 */
/*global encryptPassword */
global.encryptPassword = function(password, md5encoded) {
    md5encoded = md5encoded || false;
    password = md5encoded ? password : think.md5(password);
    return think.md5(think.md5('www.cmswing.com') + password + think.md5('Arterli'));
}

/**
 * 数组去重
 * @param arr
 * @returns {Array}
 */
/* global unique */
global.unique = function(arr) {
    // var result = [], hash = {};
    // for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    //     if (!hash[elem]) {
    //         result.push(elem);
    //         hash[elem] = true;
    //     }
    // }
    // return result;
    return Array.from(new Set(arr));
}
/**
 * in_array
 * @param stringToSearch
 * @param arrayToSearch
 * @returns {boolean}
 */
/* global in_array */
global.in_array = function(stringToSearch, arrayToSearch) {
    for (let s = 0; s < arrayToSearch.length; s++) {
        let thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}
/**
 * global times
 * 时间格式化
 * @param d
 * @returns {string}
 */
global.times = function(d, sec) {
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
}

/**
 * 排序函数
 */
function sort_node(v, w) {
    return v["sort"] - w["sort"];
}
function sort_node1(v, w) {
    return w["sort"] - v["sort"];
}
/**
 * global get_children
 * 获取子集分类 （这里是获取所有子集）
 */
global.get_children = function(nodes, parent , sn=0) {
   // console.log(11);
    var children = [];
    var last = [];
    /* 未访问的节点 */
    /*
     * 获取根分类列表。
     * 创建一个虚拟父级分类亦可
     **/
    var node = null;
    for (var i in nodes) {
        node = nodes[i];
        if (node["pid"] == parent) {
            node["deep"] = 0;
            children.push(node);
        } else {
            last.push(node);
        }
    }
    if(sn==0){
        children.sort(sort_node);
    }else {
        children.sort(sort_node1);
    }


    /* 同级排序 */
    var jumper = 0;
    var stack = children.slice(0);
    /* easy clone */

    while (stack.length > 0
        /* just in case */ && jumper++ < 1000) {
        var shift_node = stack.shift();
        var list = [];
        /* 当前子节点列表 */
        var last_static = last.slice(0);
        last = [];
        for (var i in last_static) {
            node = last_static[i];
            if (node["pid"] == shift_node["id"]) {
                node["deep"] = shift_node["deep"] + 1;
                list.push(node);
            } else {
                last.push(node);
            }
        }
        if(sn==0){
            list.sort(sort_node);
        }else {
            list.sort(sort_node1);
        }


        for (var i in list) {
            node = list[i];
            stack.push(node);
            children.push(node);
        }
    }
    /*
     * 有序树非递归前序遍历
     *
     * */
    var stack = [];
    /* 前序操作栈 - 分类编号 */
    var top = null;
    /* 操作栈顶 */
    var tree = children.slice(0);
    /* 未在前序操作栈内弹出的节点 */
    var has_child = false;
    /* 是否有子节点，如无子节点则弹出栈顶 */
    var children = [];
    /* 清空结果集 */
    var jumper = 0;
    last = [];
    /* 未遍历的节点 */
    var current = null;
    /* 当前节点 */
    stack.push(parent);
    /* 建立根节点 */

    while (stack.length > 0) {
        if (jumper++ > 1000) {
            break;
        }
        top = stack[stack.length - 1];
        has_child = false;
        last = [];

        for (var i in tree) {
            current = tree[i];
            if (current["pid"] == top) {
                top = current["id"];
                stack.push(top);
                children.push(current);
                has_child = true;
            } else {
                last.push(current);
            }
        }
        tree = last.slice(0);
        if (!has_child) {
            stack.pop();
            top = stack[stack.length - 1];
        }
    }
    return children;
}
/**
 * obj_values(obj);
 * 获取对象中的所有的值，并返回数组
 * @param obj
 * @returns {Array}
 */
/* global obj_values */
global.obj_values = function(obj) {
    let objkey = Object.keys(obj);
    let objarr = [];
    objkey.forEach(key => {
        objarr.push(obj[key]);
    })
    return objarr;
}
/**
 * 判断对象是否相等
 * @param a
 * @param b
 * @returns {boolean}
 */
/* global isObjectValueEqual */
global.isObjectValueEqual = function(a, b) {
    // Of course, we can do it use for in
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}
/**
 * trim()
 * @param str [删除左右两端的空格]
 * @returns {*|void|string|XML}
 */
/* global trim */
global.trim = function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 分析枚举类型配置值 格式 a:名称1,b:名称2
 * @param str
 * @returns {*}
 */
/* global parse_config_attr */
global.parse_config_attr = function(str) {
    let strs;
    if (str.search(/\r\n/ig) > -1) {
        strs = str.split("\r\n");
    } else if (str.search(/,/ig) > -1) {
        strs = str.split(",");
    } else if(str.search(/\n/ig) > -1){
        strs = str.split("\n");
    }else {
        strs = [str];
    }
    if (think.isArray(strs)) {
        let obj = {}
        strs.forEach(n => {
            n = n.split(":");
            obj[n[0]] = n[1];
        })
        return obj;
    }

}
global.parse_type_attr = function (str) {
    let strs;
    if (str.search(/\r\n/ig) > -1) {
        strs = str.split("\r\n");
    } else if (str.search(/,/ig) > -1) {
        strs = str.split(",");
    } else if(str.search(/\n/ig) > -1){
        strs = str.split("\n");
    }else {
        strs = [str];
    }
    if(think.isArray(strs)){
            let arr = [];
            for (let v of strs){
                let obj = {};
                v = v.split(":");
                if(!think.isEmpty(v[0])&&!think.isEmpty(v[1])){
                obj.id = v[0];
                obj.name = v[1];
                if(obj.id.split(".").length ==1){
                    obj.pid = 0
                }else {
                    obj.pid = obj.id.split(".").splice(0,obj.id.split(".").length-1).join(".");
                }
                arr.push(obj);
                }
            }
        //console.log(arr);
        let tree = arr_to_tree(arr,0)
       //think.log(tree);
        return tree;
    }

}
/**
 * ltrim()
 * @param str [删除左边的空格]
 * @returns {*|void|string|XML}
 */
/* global ltrim */
global.ltrim = function(str) {
    return str.replace(/(^\s*)/g, "");
}
/**
 *
 * rtrim()
 * @param str [删除右边的空格]
 * @returns {*|void|string|XML}
 */
/* global rtrim */
global.rtrim = function(str) {
    return str.replace(/(\s*$)/g, "");
}
/**
 * 把返回的数据集转换成Tree
 * @param array data 要转换的数据集
 * @param string pid parent标记字段
 * @return array
 */
/* global arr_to_tree */
global.arr_to_tree = function(data, pid) {
    var result = [], temp;
    var length=data.length;
    for(var i=0;i<length;i++) {
        if (data[i].pid == pid) {
            result.push(data[i]);
            temp = arr_to_tree(data, data[i].id);
            if (temp.length > 0) {
                data[i].children = temp;
                data[i].chnum =data[i].children.length
            }
        }
    }
    return result;
}
//计算分类信息当前状态
global.sanjiao = (arr)=>{
    var result = [];
    for(var i = 0,len = arr.length;i<len;i++){
        result.push(result[i - 1]!==undefined?result[i - 1]+'.'+arr[i]:arr[i]);
    }
    return result;
}
/* global arr_to_tree */
global.sub_cate = function(data, pid) {
    var result = [], temp;
    var length=data.length;
    for(var i=0;i<length;i++) {
        if (data[i].pid == pid) {
            //console.log(data[i]);
            result.push(data[i].id);
            temp = sub_cate(data, data[i].id);
            if (temp.length > 0) {
                result.push(temp.join(','));
            }
        }
    }
    return result;
}
// 获取属性类型信息
/* global get_attribute_type */
global.get_attribute_type = function(type) {
    // TODO 可以加入系统配置
    let _type = {
        'num': ['数字', 'int(10) unsigned NOT NULL'],
        'string': ['字符串', 'varchar(255) NOT NULL'],
        'textarea': ['文本框', 'text NOT NULL'],
        'date': ['日期', 'bigint(13) NOT NULL'],
        'datetime': ['时间', 'bigint(13) NOT NULL'],
        'bool': ['布尔', 'tinyint(2) NOT NULL'],
        'select': ['枚举', 'char(50) NOT NULL'],
        'radio': ['单选', 'char(10) NOT NULL'],
        'checkbox': ['多选', 'varchar(100) NOT NULL'],
        'editor': ['编辑器', 'text NOT NULL'],
        'picture': ['上传图片', 'int(10) unsigned NOT NULL'],
        'file': ['上传附件', 'int(10) unsigned NOT NULL'],
        'suk': ['商品规格', 'text NOT NULL'],
        'pics': ['多图上传', 'varchar(255) NOT NULL'],
        'price': ['价格', 'varchar(255) NOT NULL'],
        'freight': ['运费', 'varchar(255) NOT NULL']
    }
    return type ? _type[type][0] : _type;
}
/**
 * 时间戳格式化 dateformat()
 * @param extra 'Y-m-d H:i:s'
 * @param date  时间戳
 * @return  '2015-12-17 15:39:44'
 */
/* global dateformat */
global.dateformat = function(extra, date) {
    let D = new Date(date);
    let time = {
        "Y": D.getFullYear(),
        'm': D.getMonth() + 1,
        'd': D.getDate(),
        'H': D.getHours(),
        'i': D.getMinutes(),
        's': D.getSeconds()
    }
    let key = extra.split(/\W/);
    let _date;
    for (let k of key) {
        time[k] = time[k] < 10 ? "0" + time[k] : time[k]
        _date = extra.replace(k, time[k])
        extra = _date;
    }
    return _date;
}
/* global array_search */
global.array_search = function(arr, str) {
    // 如果可以的话，调用原生方法
    if (arr && arr.indexOf) {
        return arr.indexOf(str);
    }

    var len = arr.length;
    for (var i = 0; i < len; i++) {
        // 定位该元素位置
        if (arr[i] == str) {
            return i;
        }
    }

    // 数组中不存在该元素
    return false;
}
/* global array_diff */
global.array_diff = function(arr1, arr2) {
    //var arr1 = ["i", "b", "c", "d", "e", "f","x",""]; //数组A
    //var arr2 = ["a", "b", "c", "d", "e", "f", "g"];//数组B
    var temp = []; //临时数组1
    var temparray = [];//临时数组2
    for (var i = 0; i < arr2.length; i++) {
        temp[arr2[i]] = true;//巧妙地方：把数组B的值当成临时数组1的键并赋值为真
    }
    for (var i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i]]) {
            temparray.push(arr1[i]);//巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
        }
    }
    ;
    //if(think.isEmpty(temparray)){
    //    return 
    //}
    return temparray;
}
//global.call_user_func = function (cb, params) {
//    let func = global.cb;
//    func.apply(cb, params);
//}
/* 解析列表定义规则*/
/* global get_list_field */
global.get_list_field = function(data, grid, controller, module) {
    module = module || "admin";
    //console.log(module);
    let data2 = {};
    let value;

    // 获取当前字段数据
    //console.log(grid);
    for (let field of grid.field) {
        let temp;
        let array = field.split('|');//TODO
        //console.log(array);
        temp = data[array[0]];
        //console.log(temp);
        // 函数支持
        if (!think.isEmpty(array[1])) {
            temp = call_user_func(array[1], temp);
        }
        data2[array[0]] = temp;
    }
    //console.log(data2);
    if (!think.isEmpty(grid.format)) {
        // value  =   preg_replace_callback('/\[([a-z_]+)\]/', function($match) use($data2){return $data2[$match[1]];}, $grid['format']);
    } else {
        value = data2[Object.keys(data2)];
    }

    // 链接支持
    if ('title' == grid.field[0] && '目录' == data.type) {
        // 目录类型自动设置子文档列表链接
        grid.href = '[LIST]';
    } else if ('title' == grid.field[0]) {
        grid.href = '[EDIT]';
    }

    if (!think.isEmpty(grid.href)) {

        let links = grid.href.split(',');

        let val = []
        for (let link of links) {
            let array = link.split('|');
            let href = array[0];

            //console.log(href);
            let matches = href.match(/^\[([a-z_]+)\]$/);
            if (matches) {
                val.push(data2[matches[1]])
                // console.log(val);
            } else {
                let show = !think.isEmpty(array[1]) ? array[1] : value;
                // console.log(show)
                // 替换系统特殊字符串
                let hrefs = {
                    '[DELETE]': 'setstatus/status/-1/ids/[id]',
                    '[EDIT]': 'edit/id/[id]/model/[model_id]/cate_id/[category_id]',
                    '[LIST]': 'index/pid/[id]/model/[model_id]/cate_id/[category_id]'
                }
                let match = hrefs[href].match(/\[(\S+?)\]/g);
                // console.log(match);
                let u = [];
                for (let k of match) {
                    let key = k.replace(/(^\[)|(\]$)/g, "");
                    u.push(data[key]);
                }
                // console.log(u);
                let query = str_replace(match, u, hrefs[href]);
                let href1 = `/${module}/${controller}/${query}`;
                //console.log(query);
                if (href == "[DELETE]") {
                    val.push('<a href="' + href1 + '" class="text-info ajax-get confirm">' + show + '</a> ');
                } else {
                    val.push('<a href="' + href1 + '" class="text-info">' + show + '</a> ');
                }
            }
        }
        value = val.join(" ");
    }
    //console.log(value)
    return value;
}

/**
 * 获取行为类型
 * @param intger type 类型
 * @param bool all 是否返回全部类型
 * @author arterli <arterli@qq.com>
 */
/* global get_action_type */
global.get_action_type = function(type, all) {
    all = all || false;
    let list = {
        1: '系统',
        2: '用户',
    };
    if (all) {
        return list;
    }
    return list[type];
}


/**
 * 返回一个自定义用户函数给出的第一个参数
 *  call_user_func（回调 函数名， [参数]）
 * @param cb  函数名
 * @param params 数组格式传入参数
 */
/* global call_user_func */
global.call_user_func = function(cb, params) {
    let func = eval(cb);
    if (!think.isArray(params)) {
        params = [params];
    }
    return func.apply(cb, params);
}

/**
 *根据uid获取用户昵称
 * @param uid 用户id
 * @returns Promise {*}
 */
/* global get_nickname */
global.get_nickname = async (uid) => {
    //console.log(uid);
    let data = await think.model('member', think.config("db"), 'admin').cache({
        timeout: 1000,
        type: "file" //使用文件方式缓存
    }).get_nickname(uid)
    return data;
}
//时间格式
/* global time_format */
global.time_format = (time) => {
    return dateformat('Y-m-d H:i:s', time);
}
/* global str_replace()
 * str_replace(条件[]，替换内容[],被替换的内容)
 * @param search
 * @param replace
 * @param subject
 * @param count
 * @returns {*}
 */
/* global str_replace */
global.str_replace = function(search, replace, subject, count) {
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}
/**
 * 获取文档地址
 * @param name 文档表示
 * @param id   文档id
 * @returns {*}
 */
global.get_url = (name, id) => {

    if (!think.isEmpty(name)) {
        return `/p/${name}.html`;
    } else {
        return `/p/${id}.html`;
    }
}
/**
 * 获取文档封面图片
 * @param int cover_id
 * @param string field
 * @return 完整的数据  或者  指定的field字段值
 * @author arterli <arterli@qq.com>
 */
/*global get_cover*/
global.get_cover = async (cover_id, field) => {

    if (think.isEmpty(cover_id)) {
        return false;
    }
    let picture = await think.model('picture', think.config("db")).where({ 'status': 1 }).find(cover_id);
    return think.isEmpty(field) ? picture : picture[field];
}
/**
 *
 * @param id
 * @param m
 * /0/w/<LongEdge>/h/<ShortEdge> 	限定缩略图的长边最多为<LongEdge>，短边最多为<ShortEdge>，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定长边（短边自适应），只指定 h 参数则表示限定短边（长边自适应）。
 * /1/w/<Width>/h/<Height> 	限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，居中裁剪。转后的缩略图通常恰好是 <Width>x<Height> 的大小（有一个边缩放的时候会因为超出矩形框而被裁剪掉多余部分）。如果只指定 w 参数或只指定 h 参数，代表限定为长宽相等的正方图。
 * /2/w/<Width>/h/<Height> 	限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定宽（长自适应），只指定 h 参数则表示限定长（宽自适应）。它和模式0类似，区别只是限定宽和高，不是限定长边和短边。从应用场景来说，模式0适合移动设备上做缩略图，模式2适合PC上做缩略图。
 * /3/w/<Width>/h/<Height> 	限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，代表长宽限定为同样的值。你可以理解为模式1是模式3的结果再做居中裁剪得到的。
 * /4/w/<LongEdge>/h/<ShortEdge> 	限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。这个模式很适合在手持设备做图片的全屏查看（把这里的长边短边分别设为手机屏幕的分辨率即可），生成的图片尺寸刚好充满整个屏幕（某一个边可能会超出屏幕）。
 * /5/w/<LongEdge>/h/<ShortEdge> 	限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，居中裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。同上模式4，但超出限定的矩形部分会被裁剪。
 * @param w 宽
 * @param h 高
 */
global.get_pic = async(id,m=null,w=null,h=null)=>{
    if(think.isEmpty(id)){
        return "/static/noimg.jpg";
    }
    let map={};
    map.status=1;
    if(think.isNumberString(id)){
       map.id=id;
    }else {
        map.path = id;
    }
    let picture = await think.model('picture', think.config("db")).where(map).find();
    let q="";
    if(picture.type > 0){
       if(m !=null){
           m="/"+m
       }else {
           m=""
       }
        if(w != null){
            w="/w/"+w
        }else {
            w=""
        }
        if(h !=null){
            h = "/h/"+h
        }else {
            h=""
        }
        if(m != "" || w != "" || h != ""){
             q = `?imageView2${m}${w}${h}`
        }
        let name = await think.cache("setup");
        return `//${name.QINIU_DOMAIN_NAME}/${picture.path}${q}`;
    }else {
        return picture.path
    }
}
/**
 * 获取多图封面
 * @param array arr_id
 * @param string field
 * @return 完整的数据或者 指定的field字段值
 * @author arterli <arterli@qq.com>
 */
/*global get_pics_one */
global.get_pics_one = async (arr_id, field) => {
    if (think.isEmpty(arr_id)) {
        return false;
    }
    var arr = arr_id.split(",");
    return get_cover(arr[0], field);

}
//{present_price:100,discount_price:80}
global.formatprice = function(price) {
    let pr = JSON.parse(price);
    var present_price;
    //console.log(pr);
    if (think.isNumber(pr.present_price)) {
        pr.present_price = pr.present_price.toString();
    }
    var price = pr.present_price.split("-");
    if (price.length > 1) {
        present_price = formatCurrency(price[0]) + "-" + formatCurrency(price[1]);
    } else {
        present_price = formatCurrency(price[0])
    }
    if (pr.discount_price == 0) {
        return `<span class="text-xs"><span class="text-danger">现价:￥${present_price}</span></span>`;
    } else {
        return `<span class="text-xs"><span class="text-danger">现价:￥${present_price}</span> <br>原价:￥${formatCurrency(pr.discount_price)}</span>`;
    }

}
//获取价格格式化
global.get_price_format = function(price, type) {
    let pr = JSON.parse(price);

    if (1 == type) {
        if (think.isNumber(pr.present_price)) {
            pr.present_price = pr.present_price.toString();
        }
        let prices = pr.present_price.split("-");
        let present_price;
        if (prices.length > 1) {
            present_price = formatCurrency(prices[0]) + "-" + formatCurrency(prices[1]);
        } else {
            present_price = formatCurrency(prices[0])
        }
        price = present_price;
    } else {

        if (pr.discount_price == 0) {
            price = "";
        } else {
            price = formatCurrency(pr.discount_price);
        }

    }
    return price;
}
//获取价格不格式化
global.get_price = function(price, type) {
    if (price) {
        price = JSON.parse(price);
        if (1 == type) {
            return price.present_price;
        } else {
            if (price.discount_price == 0) {
                return "";
            } else {
                return price.discount_price;
            }

        }
    }
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
/*global formatCurrency */
global.formatCurrency = function(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    let cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * 将数值四舍五入(保留1位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.4'
 * @type String
 */
/*global formatCurrencyTenThou */
global.formatCurrencyTenThou = function(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 10 + 0.50000000001);
    let cents = num % 10;
    num = Math.floor(num / 10).toString();
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
/**
 * 获取商品suk suk, arr:类型数组
 */

/*global getsuk */
global.getsuk = function(suk, arr) {
    //console.log(suk);
    var suk_;
    suk.forEach(function(v, k) {

        if (v.name == arr[0]) {
            if (v.ch) {
                v.ch.forEach(function(v_, k_) {
                    if (v_.name == arr[1]) {
                        if (v_.ch) {
                            v_.ch.forEach(function(v__, k__) {
                                if (v__.name == arr[2]) {

                                    suk_ =think.extend( v__,v_,v);
                                }
                            })
                        } else {
                            suk_ = think.extend( v_,v);
                        }

                    }
                })
            } else {
                suk_ = v;
            }
        }
    })
    return suk_;
}

/**
 * 构建微信菜单数据结构
 * @param data
 * @returns {{menu: {button: Array}}}
 */
global.createSelfMenu = function(data) {
    let menu = {
        "menu": {
            "button": []
        }
    };
    let button = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].pid == '0') {
            let item = {
                "id": data[i].id,
                "m_id": data[i].m_id,
                "pid": data[i].pid,
                "type": data[i].type,
                "name": data[i].name,
                "sort": data[i].sort,
                "sub_button": []
            };
            menu.menu.button.push(item);
            button.push(item);
        }
    }
    for (var x = 0; x < button.length; x++) {
        for (var y = 0; y < data.length; y++) {
            if (data[y].pid == button[x].m_id) {
                let sitem = {
                    "type": data[y].type,
                    "m_id":data[y].m_id,
                    "sort": data[y].sort,
                    "name": data[y].name,
                    "url": data[y].url,
                    "media_id": data[y].media_id
                };
                button[x].sub_button.push(sitem);
            }
        }
    }
    return menu;
};

/**
 * 微信创建自定义菜单接口
 * 数据构建
 */

global.buildselfmenu = function(data){
    let menu = {
                  "button": []
                };
    let button = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].pid == '0') {
            let item = {
                "id": data[i].id,
                "m_id": data[i].m_id,
                "pid": data[i].pid,
                "type": data[i].type,
                "name": data[i].name,
                "sort": data[i].sort,
                "sub_button": []
            };
            menu.menu.button.push(item);
            button.push(item);
        }
    }
    for (var x = 0; x < button.length; x++) {
        for (var y = 0; y < data.length; y++) {
            if (data[y].pid == button[x].m_id) {
                let sitem = {
                    "type": data[y].type,
                    "sort": data[y].sort,
                    "name": data[y].name,
                    "url": data[y].url,
                    "media_id": data[y].media_id
                };
                button[x].sub_button.push(sitem);
            }
        }
    }
    return menu;
}

/**
 * 验证是否为智能手机
 * @ param {string} data :this.userAgent;
 * @ return {bool}
 */
/** global checkMobile */
global.checkMobile = function(agent) {
    let flag = false;
    agent = agent.toLowerCase();
    let keywords = ["android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser"];

    //排除 Windows 桌面系统  
    if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
        //排除苹果桌面系统  
        if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1 && !(agent.indexOf("ipad")>-1)) {
            for (let item of keywords) {
                if (agent.indexOf(item) > -1) {
                    flag = true;
                    break;
                }
            }
        }
    }
    return flag;
}
/**
 * 验证时否是微信
 *
 */
global.is_weixin=(agent)=>{
    let flag = false;
    agent = agent.toLowerCase();
    //let key = ["mqqbrowser","micromessenger"];
    let key = ["micromessenger"];
    //排除 Windows 桌面系统
    if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
        //排除苹果桌面系统
        if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1) {
            for (let item of key) {
                if (agent.indexOf(item) > -1) {
                    flag = true;
                    break;
                }
            }
        }
    }
    return flag;

}
/**
 *
 * @param time
 * @returns {string}'January 31, 2018 15:03:26'
 */
global.date_from=(time)=>{
    // January 31, 2018 15:03:26
    let months = ["January","February","March","April","May","June","July","August", "September","October","November","December"]
    let d = new Date(time)
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours()<10?`0${d.getHours()}`:d.getHours();
    let min =d.getMinutes()<10?`0${d.getMinutes()}`:d.getMinutes();
    let sec =d.getSeconds()<10?`0${d.getSeconds()}`:d.getSeconds();
    let res = `${month} ${day}, ${year} ${hour}:${min}:${sec}`;
    return res;
}

global.image_view=(str,w,m)=>{
    //console.log(info);
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = str.match(imgReg);
    if(!think.isEmpty(arr)){
        let narr=[];
        for(let img of arr){
            let _img = img.match(srcReg)
            //console.log(_img);
            let nimg = _img[1]+'?imageView2/'+m+'/w/'+w;
            //console.log(nimg)
            let inputimg = _img['input'].replace(_img[1],nimg)
            narr.push(inputimg);
        }
        return str_replace(arr, narr, str);
    }else {
        return str;
    }
}

/**
 * 获取文件信息
 * @param file_id 文件id
 * @param field 字段名,如果为空则返回整个记录集
 * @returns {*}
 */
global.get_file=async (file_id,field,key=false)=>{

    if (think.isEmpty(file_id)) {
        return false;
    }
    let file = await think.model('file', think.config("db")).find(file_id);
    if(file.location==1 && key){
        let name = await think.cache("setup");
        file.savename = `http://${name.QINIU_DOMAIN_NAME}/${file.savename}?download/${file.savename}`
    }
    return think.isEmpty(field) ? file : file[field];
}
/**
 *
 * 根据栏目ID获取栏目信息
 * @param cid
 * @returns {*}
 */
global.get_cate=async(cid)=>{
    let column = await think.model('category', think.config("db"),'admin').get_all_category();

    for(let v of column){
        if(v.id==cid){
           // console.log(v)
           return v;
        }
    }
}
/**
 * 获取分类信息url
 * @param id
 * @param val
 * @param arr
 */
global.sort_url = (id,val,arr,http)=>{
    //console.log(http.get(val))
    let url;
        url=`${val}_${id}`;
        for(let v of arr){
            if(v.option.identifier != val){
                url += `|${v.option.identifier}_${http[v.option.identifier]||0}`
            }
        }
    //console.log(url);
    return url;
}
/*
 *比较数组是否完全相同
 */
global.a2a = function (a1,a2){
    if(!(think.isArray(a1) && think.isArray(a2))){
        return false;
    }
    if(a1.length != a2.length){
        return false;
    }

    a1.sort();
    a2.sort();
    for(var i=0;i<a1.length;i++){
        if(typeof a1[i] != typeof a2[i]){
            return false;
        }
        if(think.isObject(a1[i]) && think.isObject(a2[i])){
            var retVal = o2o(a1[i],a2[i]);
            if(!retVal){
                return false;
            }
        }else if(think.isArray(a1[i]) && think.isArray(a2[i]) ){//recursion
            if(!a2a(a1[i],a2[i])){
                return false;
            }
        }else if(a1[i] !== a2[i]){
            return false;
        }
    }
    return true;
}
//生成6位的随机数
global.MathRand = function ()
{
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}

