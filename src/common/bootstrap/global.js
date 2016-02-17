

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
 */
//global.xxx = async () => {
//    let data = await Promise.resolve(111)
//}
/**
 * ip转数字
 * @param ip
 * @returns {number}
 * @private
 */
/* global _ip2int(ip)*/
global._ip2int = function (ip) {
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
global._int2iP = function (num) {
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
 * @param password
 * @param md5encoded
 * @returns {*}
 */
/*global encryptPassword */
global.encryptPassword = function (password, md5encoded) {
    md5encoded = md5encoded||false;
    password = md5encoded ? password : think.md5(password);
    return think.md5(think.md5('vkj.ren') + password + think.md5('arterli'));
}

/**
 * 数组去重
 * @param arr
 * @returns {Array}
 */
/* global unique */
global.unique = function (arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
/**
 * in_array
 * @param stringToSearch
 * @param arrayToSearch
 * @returns {boolean}
 */
/* global in_array */
global.in_array = function (stringToSearch, arrayToSearch) {
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
global.times = function (d, sec) {
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

/**
 * global get_children
 * 获取子集分类 （这里是获取所有子集）
 */
global.get_children = function (nodes, parent) {
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
    children.sort(sort_node);

    /* 同级排序 */
    var jumper = 0;
    var stack = children.slice(0);
    /* easy clone */

    while (stack.length > 0
        /* just in case */ && jumper++ < 400) {
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
        list.sort(sort_node);

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
        if (jumper++ > 400) {
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
global.obj_values = function (obj) {
    let objkey = Object.keys(obj);
    let objarr = [];
    objkey.forEach(key=> {
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
global.isObjectValueEqual = function (a, b) {
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
global.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 分析枚举类型配置值 格式 a:名称1,b:名称2
 * @param str
 * @returns {*}
 */
/* global parse_config_attr */
global.parse_config_attr = function (str) {
    let strs;
    if (str.search(/\r\n/ig) > -1) {
        strs = str.split("\r\n");
    } else if (str.search(/,/ig) > -1) {
        strs = str.split(",");
    } else {
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
/**
 * ltrim()
 * @param str [删除左边的空格]
 * @returns {*|void|string|XML}
 */
/* global ltrim */
global.ltrim = function (str) {
    return str.replace(/(^\s*)/g, "");
}
/**
 * 
 * rtrim()
 * @param str [删除右边的空格]
 * @returns {*|void|string|XML}
 */
/* global rtrim */
global.rtrim = function (str) {
    return str.replace(/(\s*$)/g, "");
}
/**
 * 把返回的数据集转换成Tree
 * @param array data 要转换的数据集
 * @param string pid parent标记字段
 * @return array
 */
/* global arr_to_tree */
global.arr_to_tree = function (data, pid) {
    var result = [], temp;
    for (var i in data) {
        if (data[i].pid == pid) {
            result.push(data[i]);
            temp = arr_to_tree(data, data[i].id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
}
/* global arr_to_tree */
global.sub_cate = function (data, pid) {
    var result = [], temp;
    for (var i in data) {
        if (data[i].pid == pid) {
            //console.log(data[i]);
            result.push(data[i].id);
            temp = sub_cate(data, data[i].id);
            if (temp.length > 0) {
                result.push(temp.join(',')) ;
            }
        }
    }
    return result;
}
// 获取属性类型信息
/* global get_attribute_type */
global.get_attribute_type = function (type){
    // TODO 可以加入系统配置
    let _type = {
        'num'       :  ['数字','int(10) UNSIGNED NOT NULL'],
        'string'    :  ['字符串','varchar(255) NOT NULL'],
        'textarea'  :  ['文本框','text NOT NULL'],
        'date'      :  ['日期','bigint(13) NOT NULL'],
        'datetime'  :  ['时间','bigint(13) NOT NULL'],
        'bool'      :  ['布尔','tinyint(2) NOT NULL'],
        'select'    :  ['枚举','char(50) NOT NULL'],
        'radio'     :  ['单选','char(10) NOT NULL'],
        'checkbox'  :  ['多选','varchar(100) NOT NULL'],
        'editor'    :  ['编辑器','text NOT NULL'],
        'picture'   :  ['上传图片','int(10) UNSIGNED NOT NULL'],
        'file'      :  ['上传附件','int(10) UNSIGNED NOT NULL'],
        'suk'       :  ['商品规格','text NOT NULL'],
        'pics'      :  ['多图上传','varchar(255) NOT NULL']
}
    return type?_type[type][0]:_type;
}
/**
 * 时间戳格式化 dateformat()
 * @param extra 'Y-m-d H:i:s'
 * @param date  时间戳
 * @return  '2015-12-17 15:39:44'
 */
/* global dateformat */
  global.dateformat=function(extra,date){
      let D = new Date(date);
      let time={
          "Y":D.getFullYear(),
          'm':D.getMonth() + 1,
          'd':D.getDate(),
          'H':D.getHours(),
          'i':D.getMinutes(),
          's':D.getSeconds()
      }
      let key = extra.split(/\W/);
      let _date;
      for(let k of key){
        time[k] = time[k] < 10 ? "0" + time[k] : time[k]
         _date=extra.replace(k,time[k])
        extra=_date;
      }
      return _date;
 }
 /* global array_search */
global.array_search=function (arr, str){
    // 如果可以的话，调用原生方法
    if(arr && arr.indexOf){
        return arr.indexOf(str);
    }

    var len = arr.length;
    for(var i = 0; i < len; i++){
        // 定位该元素位置
        if(arr[i] == str){
            return i;
        }
    }

    // 数组中不存在该元素
    return false;
}
 /* global array_diff */
global.array_diff=function (arr1,arr2){
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
    };
    //if(think.isEmpty(temparray)){
    //    return false
    //}
    return temparray;
}
//global.call_user_func = function (cb, params) {
//    let func = global.cb;
//    func.apply(cb, params);
//}
/* 解析列表定义规则*/
 /* global get_list_field */
global.get_list_field=function (data, grid, controller,module){
    module = module||"admin";
    //console.log(module);
    let data2={};
    let value;

    // 获取当前字段数据
    //console.log(grid);
    for( let field of grid.field){
           let temp;
           let array = field.split('|');//TODO
           //console.log(array);
           temp = data[array[0]];
           //console.log(temp);
            // 函数支持
            if(!think.isEmpty(array[1])){
                temp = call_user_func(array[1], temp);
            }
            data2[array[0]]    =   temp;
    }
    //console.log(data2);
    if(!think.isEmpty(grid.format)){
     // value  =   preg_replace_callback('/\[([a-z_]+)\]/', function($match) use($data2){return $data2[$match[1]];}, $grid['format']);
    }else{
        value  =  data2[Object.keys(data2)];
    }

    // 链接支持
    if('title' == grid.field[0] && '目录' == data.type ){
        // 目录类型自动设置子文档列表链接
        grid.href   =   '[LIST]';
    }else if('title' == grid.field[0]){
        grid.href = '[EDIT]';
    }

    if(!think.isEmpty(grid.href)){

        let links  =   grid.href.split(',');

        let val =[]
        for(let link of links){
            let array  =   link.split('|');
            let href   =   array[0];

            //console.log(href);
            let matches = href.match(/^\[([a-z_]+)\]$/);
            if(matches){
                val.push(data2[matches[1]])
               // console.log(val);
            }else{
                let show   =  !think.isEmpty(array[1])?array[1]:value;
               // console.log(show)
                // 替换系统特殊字符串
                let hrefs={
                    '[DELETE]':'setstatus/status/-1/ids/[id]',
                    '[EDIT]': 'edit/id/[id]/model/[model_id]/cate_id/[category_id]',
                    '[LIST]': 'index/pid/[id]/model/[model_id]/cate_id/[category_id]'
                }
                let match = hrefs[href].match(/\[(\S+?)\]/g);
               // console.log(match);
                let u = [];
                for(let k of match){
                    let key =k.replace(/(^\[)|(\]$)/g, "");
                    u.push( data[key]);
                }
              // console.log(u);
                let query = str_replace(match,u,hrefs[href]);
                let href1 =`/${module}/${controller}/${query}`;
                //console.log(query);
                if(href == "[DELETE]"){
                    val.push( '<a href="'+href1+'" class="text-info ajax-get confirm">'+show+'</a> ') ;
                }else {
                    val.push( '<a href="'+href1+'" class="text-info">'+show+'</a> ') ;
                }

            }
        }
        value  =   val.join(" ");
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
global.get_action_type=function (type, all){
 all=all||false;
    let list = {
        1:'系统',
        2:'用户',
      };
    if(all){
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
global.call_user_func=function(cb, params) {
    let func = eval(cb);
    if(!think.isArray(params)){
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
global.get_nickname =async (uid) => {
    //console.log(uid);
    let data = await think.model('member',think.config("db"),'admin').get_nickname(uid)
    return data;
}
//时间格式
/* global time_format */
global.time_format = (time)=>{
    return dateformat('Y-m-d H:i:s',time);
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
global.str_replace=function(search, replace, subject, count){
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if(count){
        this.window[count] = 0;
    }

    for(i=0, sl=s.length; i < sl; i++){
        if(s[i] === ''){
            continue;
        }
        for(j=0, fl=f.length; j < fl; j++){
            temp = s[i]+'';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if(count && s[i] !== temp){
                this.window[count] += (temp.length-s[i].length)/f[j].length;}
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
global.get_url=(name,id)=>{

    if(!think.isEmpty(name)){
        return `/detail/${name}`;
    }else {
        return `/detail/${id}`;
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
global.get_cover=async (cover_id,field)=>{

    if(think.isEmpty(cover_id)){
        return false;
    }
    let picture = await think.model('picture',think.config("db")).where({'status':1}).find(cover_id);
    return think.isEmpty(field) ? picture : picture[field];
}