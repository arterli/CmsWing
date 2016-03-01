'use strict'
/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */

global.mytags= function(){

        this.tags= ['tagtest'];
        this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args)
        };
        this.run = async function (context, args, callback) {
             console.log(args);

            for (var arg in args) {
                console.log(arg);
                if (arg !== '__keywords') {
                  let map = args[arg].split(",");
                   let maps={}
                    for(let val of map){
                        val=val.split("=");
                          console.log(val[1].indexOf("["));
                        if(val[1].indexOf("[")===0){
                            val[1]=val[1].replace("[", "").replace("]", "").split("-");
                            console.log(val[1]);
                        }
                        maps[val[0]]=val[1]
                    }
                    console.log(maps);
                    let model_id;
                    //model
                    if(think.isEmpty(maps.mid)){
                        model_id = 1;
                    }else {
                        model_id=maps.mid;
                        delete maps.mid;
                    }
                    let model = await think.model("model", think.config("db"),'admin').get_table_name(model_id);
                    console.log(model);
                    //limit
                    let offset,length;
                    if(think.isEmpty(maps.limit)){
                        offset = 10;
                    }else {
                        if(think.isArray(maps.limit)){
                            offset=parseInt(maps.limit[0]);
                            length=parseInt(maps.limit[1]);
                        }else {
                            offset = parseInt(maps.limit);
                        }
                        delete maps.limit;
                    }
                    //where
                    let where={};
                    if(!think.isEmpty(maps.cid) && think.isNumberString(maps.cid)){
                        where.category_id = maps.cid;
                    }
                    let order ;
                    if(!think.isEmpty(maps.order)){
                        order = maps.order;
                    }
                    console.log(maps);
                    console.log(offset);
                    let data = await think.model(model, think.config("db")).where(where).limit(offset,length).order(order).select();
                    //console.log(data);
                    context.ctx[arg] = data;
                }
            }
           return callback(null,'');
        };

}
/**
 * 获取同一级栏目标签
 *
 * @param data:接受返回数据的变量名称，例: data = "list"
 *  {% colum data="list",pid=1 %}
 * @param pid: 获取同级栏目
 * {% colum data="list",pid=1 %}
 * @param cid: 获取里栏目
 * {% colum data="list",tree=1 %}
 * @param tree:获取栏目的树结构 tree="0",从pid为0开始获取
 */
global.column= function(){

    this.tags= ['column'];
    this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args)
    };
    this.run = async function (context, args, callback) {
        console.log(args);
        let data = think.isEmpty(args.data) ?"data":args.data;
        let pid = !think.isEmpty(args.pid) ?args.pid:false;
        let cid = !think.isEmpty(args.cid) ?args.cid:false;
        let tree = !think.isEmpty(args.tree) ?args.tree:false;
        let column = await think.model('category', think.config("db"),'admin').get_all_category();
        let arr=[];
        //获取同级栏目
        
        if(pid){
            for (let val of column){
               if(val.pid == pid){
                   arr.push(val);
               }
            }
             context.ctx[data] = !think.isEmpty(arr)?arr:false;
        }else if(cid){
            for (let val of column){
                if(val.pid == cid){
                    arr.push(val);
                }
            }
             context.ctx[data] = !think.isEmpty(arr)?arr:false;
        }else if(tree){
            let trees = arr_to_tree(column,tree);
            console.log(trees)
            context.ctx[data] = !think.isEmpty(trees)?trees:false;
        }
       
        return callback(null,'');
    };

}

/**
 *获取导航标签
 */

 global.channel = function(){
   this.tags = ['channel'];
   this.parse = function (parser,nodes,lexer) {
     var tok = parser.nextToken();
     var args = parser.parseSignature(null, true);
     parser.advanceAfterBlockEnd(tok.value);
     return new nodes.CallExtensionAsync(this, 'run', args)
   };
   this.run = async function (context, args, callback) {
     let data = think.isEmpty(args.data) ?"data":args.data;
     let channel = await think.model('channel', think.config("db"),'admin').get_channel_cache();
     channel = arr_to_tree(channel,0);
    // console.log(channel);
     context.ctx[data] = channel;
     return callback(null,'');
   }
 }


/**
 * 获取数据标签
 * {% topic data = "data"%}
 * topic:标签名称
 * data:接受返回数据的变量名称，例: data = "data"
 * limit: 设置查询结果的条数，例: limit="10",limit="3,10"
 * cid: 栏目id ,单个栏目 cid="1",多个栏目 cid = "1,2,3,4" , 不写调取全部栏目
 * {{name|get_url(id)}}文章链接
 */
global.topic = function(){
    this.tags = ['topic'];
    this.parse = function (parser, nodes, lexer) {
        let tok = parser.nextToken();
        let args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args);
    };
    this.run = async function (context, args, callback) {
        console.log(args);
        let where = {'status':1};
        let data = think.isEmpty(args.data) ? "data" : args.data;
        let limit = think.isEmpty(args.limit) ? "10" : args.limit;
        let cid = think.isEmpty(args.cid) ? false :{'category_id':['IN',args.cid]};
        if(cid){
            where = think.extend({},where,cid);
        }
    
        console.log(where);
        let topic = await think.model('document', think.config("db")).where(where).limit(limit).select();
        //console.log(topic)
        context.ctx[data] = topic;
        return callback(null, '');
    }
}