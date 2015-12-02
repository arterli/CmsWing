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


/**
 * ip转数字
 * @param ip
 * @returns {number}
 * @private
 */
global._ip2int=function (ip)
{
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
global._int2iP=function (num)
{
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
global.encryptPassword=function(password, md5encoded = false) {
    password = md5encoded ? password : think.md5(password);
    return think.md5(think.md5('vkj.ren') + password + think.md5('arterli'));
}

/**
 * 数组去重
 * @param arr
 * @returns {Array}
 */
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
global.in_array=function (stringToSearch, arrayToSearch) {
    for (let s = 0; s < arrayToSearch.length; s++) {
        let thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}
/**
 * 时间格式化
 * @param d
 * @returns {string}
 */
global.times = function (d,sec) {
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
    if(sec){
        time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
    }else{
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
global.obj_values=function (obj){
        let objkey=Object.keys(obj);
        let objarr=[];
        objkey.forEach(key=>{
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
global.isObjectValueEqual=function(a, b) {
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
global.trim = function (str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 分析枚举类型配置值 格式 a:名称1,b:名称2
 * @param str
 * @returns {*}
 */
global.parse_config_attr = function (str){
    let strs;
    if(str.search(/\r\n/ig)>-1){
        strs=str.split("\r\n");
    }else if(str.search(/,/ig)>-1){
        strs=str.split(",");
    }else{
        return str;
    }
    if(think.isArray(strs)){
        let obj ={}
        strs.forEach(n =>{
            n=n.split(":");
            obj[n[0]]=n[1];
        })
        return obj;
    }

}
/**
 * ltrim()
 * @param str [删除左边的空格]
 * @returns {*|void|string|XML}
 */
global.ltrim = function (str){
    return str.replace(/(^\s*)/g,"");
}
/**
 * rtrim()
 * @param str [删除右边的空格]
 * @returns {*|void|string|XML}
 */
global.rtrim = function (str){
    return str.replace(/(\s*$)/g,"");
}
/**
 * 把返回的数据集转换成Tree
 * @param array $list 要转换的数据集
 * @param string $pid parent标记字段
 * @param string $level level标记字段
 * @return array

global.list_to_tree=function (list, pk='id', pid = 'pid', child = '_child', root = 0) {
    // 创建Tree
    let tree =[];
    let parent = {};
        parent[child] =[];
    let arr = [];
    if(think.isArray(list)) {
        // 创建基于主键的数组引用
        let refer = {};
        list.forEach((data,key)=>{
            refer[data[pk]] =list[key];
        })
        list.forEach((data,key)=>{
            let parendId = data[pid];
            if(root == parendId){
                tree.push(list[key])
            }else{
                if(!think.isEmpty(refer[parendId])){
                    parent = refer[parendId];
                    arr.push(list[key]);
                    parent[child] =arr;
                }
            }
        })
        //foreach ($list as $key => $data) {
        //    // 判断是否存在parent
        //    $parentId =  $data[$pid];
        //    if ($root == $parentId) {
        //        $tree[] =& $list[$key];
        //    }else{
        //        if (isset($refer[$parentId])) {
        //            $parent =& $refer[$parentId];
        //            $parent[$child][] =& $list[$key];
        //        }
        //    }
        //}
    }
    return tree;
}
 */