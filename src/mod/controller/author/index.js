'use strict';
import Base from '../index.js';
import pagination from 'think-pagination';
import moment from "moment"
moment.locale('zh-cn');
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     * 封面入口
     */
    indexAction() {
        //console.log(this);
        //auto render template file index_index.html

        this.end(2222)
        return this.display();
    }
    /**
     * 列表入口
     * @returns {*}
     */
    async listAction(){
        //跨域
        let method = this.http.method.toLowerCase();
        if(method === "options"){
            this.setCorsHeader();
            this.end();
            return;
        }
        this.setCorsHeader();
        let get = this.get('category') || 0;
        let id=0;
        let query = get.split("-");
        if(get != 0){
            id = query[0];
        }
        //获取栏目信息
        let cate = this.m_cate;
        cate = think.extend({}, cate);

        //栏目权限验证
        await this.c_verify("visit");

        // 获取当前栏目的模型
        let model = this.mod;
        this.assign('model', model);

        //获取当前分类的所有子栏目
        let subcate = await this.model('category').get_sub_category(cate.id);
        subcate.push(cate.id);

        //当前栏目列表每页行数
        let num = this.page_num();

        //获取面包屑信息
        let breadcrumb = await this.model('category').get_parent_category(cate.id,true);

        //获取列表数据
        //条件
        let map = {
            'category_id': ['IN', subcate]
        };
        //排序
        let o = {};

        let order = this.modget(1)||0;
        order = Number(order);
        switch (order){
            case 1:
                o.popular_value = 'DESC';
                break;
            case 2:
                map.is_recommend = 1;
                o.id='DESC';
                break;
            case 3:
                map.answer_count = 0;
                o.id='DESC';
                break;
            default:
                o.update_time = 'DESC';
        }
        this.assign('order',order);
        // 获取分类信息
        let sortid = query[3]||0;
        if(!think.isEmpty(sortid)){
            map.sort_id = sortid;
        }
        let sortarr = query[4]||null;
        let nsobj = {};
        let sort = await this.model("category").get_category(cate.id, 'documentsorts');
        if (sort) {
            this.assign("sorturl",get.split("-")[4])
            sort = JSON.parse(sort);
            if(sortid==0){
                sortid=sort.defaultshow;
            }
            let typevar = await this.model("typevar").where({sortid:sortid}).order('displayorder ASC').select();
            for (let val of typevar){

                val.option= await this.model("typeoption").where({optionid:val.optionid}).find();
                if(val.option.type == 'select' ||val.option.type == 'radio'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=parse_type_attr(val.option.rules.choices);
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        //console.log(val.rules);
                    }

                }else if(val.option.type == 'checkbox'){
                    if(!think.isEmpty(val.option.rules)){
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=parse_type_attr(val.option.rules.choices);
                        console.log(val.rules);
                        for(let v of val.rules){
                            v.id = "l>"+v.id
                        }
                        val.option.rules.choices = parse_config_attr(val.option.rules.choices);
                        //console.log(val.rules);
                    }
                }else if(val.option.type == 'range'){
                    if(!think.isEmpty(val.option.rules)){
                        let searchtxt = JSON.parse(val.option.rules).searchtxt;
                        let searcharr = []
                        if(!think.isEmpty(searchtxt)){
                            let arr = searchtxt.split(",");
                            let len = arr.length;
                            for (var i=0;i<len;i++)
                            {
                                let obj = {}
                                if (!think.isEmpty(arr[i-1])){
                                    if(i==1){
                                        obj.id = 'd>'+arr[i];
                                        obj.name = '低于'+arr[i];
                                        obj.pid=0
                                        searcharr.push(obj);
                                    }else {
                                        obj.id = arr[i-1]+'>'+arr[i];
                                        obj.name = arr[i-1]+"-"+arr[i];
                                        obj.pid=0
                                        searcharr.push(obj)
                                    }

                                }

                            }
                            searcharr.push({id:'u>'+arr[len-1],name:'高于'+arr[len-1],pid:0})
                        }
                        //console.log(searcharr);
                        val.option.rules = JSON.parse(val.option.rules);
                        val.rules=searcharr;
                        // val.option.rules.choices = parse_config_attr(val.option.rules.choices);

                    }
                }
            }
            // console.log(typevar);
            this.assign("typevar",typevar);
        }
        if(!think.isEmpty(sortarr)) {
            sortarr = sortarr.split("|");
            nsobj = {}
            let optionidarr = [];
            let valuearr = [];
            for (let v of sortarr) {
                let qarr = v.split("_");
                nsobj[qarr[0]] = qarr[1];
                if(qarr[1] !=0){
                    let vv = qarr[1].split(">");
                    //console.log(vv);
                    if(vv[0]=="d" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["<",vv[1]];
                    }else if(vv[0]=="u" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = [">",vv[1]];
                    }else if(vv[0]=="l" && !think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["like",`%"${vv[1]}"%`];
                    }else if(!think.isEmpty(vv[0])&&!think.isEmpty(vv[1])){
                        map["t."+qarr[0]] = ["BETWEEN", Number(vv[0]), Number(vv[1])];
                    }else {
                        map["t."+qarr[0]] = qarr[1];
                    }

                }
            }
            map.fid = cate.id;
            // where.optionid = ["IN",optionidarr];
            // where['value'] = ["IN",valuearr];
            // let type= await this.model("typeoptionvar").where(where).select();
            //  console.log(type);
            // console.log(map);

        }
        //console.log(map);
        //return false;
        //console.log(sort);
        this.assign("sort",sort);
        this.assign("nsobj",nsobj);

        this.assign("sortid",sortid);
        //分组
        let group_id = 0;
        if(!think.isEmpty(this.modget(2)) && this.modget(2) !=0){
            map.group_id=this.modget(2);
            group_id = map.group_id;
        }
        let data;
        if(!think.isEmpty(sortarr)){
            data = await this.model(this.mod.name).join({
                table: "type_optionvalue"+sortid,
                join: "left", // 有 left,right,inner 3 个值
                as: "t",
                on: ["id", "tid"]

            }).where(map).page(this.param('page'),num).order(o).countSelect();
        }else {
            data = await this.model(this.mod.name).where(map).page(this.param('page'),num).order(o).countSelect();
        }

        //分页
        let html = pagination(data, this.http, {
            desc: false, //show description
            pageNum: 2,
            url: '', //page url, when not set, it will auto generated
            class: 'nomargin', //pagenation extra class
            text: {
                next: '下一页',
                prev: '上一页',
                total: 'count: ${count} , pages: ${pages}'
            }
        });
        this.assign('pagination', html);
        /* 模板赋值并渲染模板 */
        this.assign("group_id",group_id);
        this.assign('category', cate);
        this.assign('list', data.data);
        this.assign('count',data.count);
        this.assign('breadcrumb', breadcrumb);

        //跨屏
        if(checkMobile(this.userAgent())){
            if(this.isAjax("get")){
                for (let v of data.data){
                    v.nickname= await get_nickname(v.uid);
                    v.create_time=moment(v.create_time).fromNow();
                    v.catename = await this.model("category").get_category(v.category_id,"title");
                    v.detail=(v.detail).replace(/<[^>]+>/g, "");
                    v.answer_username = await get_nickname(v.answer_users);
                    v.update_time = moment(v.update_time).fromNow();
                }

                return this.json(data);
            }
            //手机端模版
            return this.modtemp(this.mod.name,"mobile");
        }else{
            //console.log(temp);
            // return this.display(temp);
            return this.modtemp(this.mod.name);
        }

    }

    /**
     * 详情入口
     * @returns {*}
     */
    async detailAction(){
        //获取详情id
        let id =this.get("id");
        // //判断请求参数是否合法。
        if(think.isEmpty(id)){
            this.http.error = new Error("请求参数不合法！");
            return think.statusAction(702, this.http);
        }
        if(!think.isNumberString(id)){
           id = await this.model("author").where({pinyin:id}).getField("id",true);
        }
        // //判断请求参数是否合法。
        // if(!think.isNumberString(id)){
        //     this.http.error = new Error("请求参数不合法！");
        //     return think.statusAction(702, this.http);
        // }
        //获取详情信息
        let info = await this.model("author").find(id);
        //判断信息是否存在
        if(think.isEmpty(info)){
            this.http.error = new Error("信息不存在！");
            return think.statusAction(702, this.http);
        }
        //TODO
        //访问控制
        //await this.c_verify("visit",info.category_id);

        this.assign("info",info);

        //seo
        this.meta_title = info.title; //标题
        this.keywords = info.keyname ? info.keyname : ''; //seo关键词
        this.description = info.description ? info.description : ""; //seo描述

        //获取面包屑信息
        let breadcrumb = await this.model('category').get_parent_category(info.category_id,true);
        this.assign('breadcrumb', breadcrumb);
        //获取栏目信息
        let cate = await this.category(info.category_id);
        this.assign('category', cate);
        //当前用户是否关注
        if(this.is_login){
            let focus = await this.model("question_focus").where({question_id:id,uid:this.user.uid}).find();
            this.assign("focus",focus);
        }
        //获取当前主题所有关注的用户
        let focususer = await this.model("question_focus").where({question_id:id}).getField("uid");
        this.assign("focususer",focususer);
        //访问统计
        await this.model("author").where({id:info.id}).increment('view');
        //话题
        // let topicid = await this.model("keyword_data").where({docid:id,mod_type:1,mod_id:cate.model}).getField("tagid");
        // if(!think.isEmpty(topicid)){
        //     let topic = await this.model("keyword").where({id:["IN",topicid]}).select();
        //     console.log(topic);
        // }
        //获取回复
        let answer = await this.model("question_answer").where({question_id:id}).select();
        for(let a of answer){
            a.ccount = await this.model("question_answer_comments").where({answer_id:a.answer_id}).count("id");
        }
        this.assign("answer",answer);
        //console.log(cate);
        //相关问题
        let where ={docid:id,mod_type:1,mod_id:cate.model}
        //获取相关tagid
        let tagid =  await this.model("keyword_data").where(where).getField("tagid");
        if(!think.isEmpty(tagid)){
            //找出相关的tagid
            let rtid = await this.model("keyword_data").where({tagid:["IN",tagid],mod_id:cate.model}).getField("docid");
            //相关问题
            let rq = await this.model("question").where({id:["IN",rtid]}).limit(10).select();
            this.assign("rq",rq);
        }

        //不同的设备,压缩不同的图片尺寸
        let str = info.detail;
        if(!think.isEmpty(str)){
            let img;
            if(checkMobile(this.userAgent())){
                //手机端
                img = image_view(str,640,4);
            }else {
                //pc端

                img = image_view(str,847,0);
            }
            info.detail=img
        }
        if(checkMobile(this.userAgent())){
            if(this.isAjax("get")){
                for (let v of data.data){
                    v.nickname= await get_nickname(v.uid);
                    v.create_time=moment(v.create_time).fromNow();
                    v.catename = await this.model("category").get_category(v.category_id,"title");
                    v.detail=(v.detail).replace(/<[^>]+>/g, "");
                    v.answer_username = await get_nickname(v.answer_users);
                    v.update_time = moment(v.update_time).fromNow();
                }
                return this.json(data);
            }
            //手机端模版
            return this.modtemp("question","mobile");
        }else{
            //console.log(temp);
            // return this.display(temp);
            return this.modtemp();
        }
    }

    async infoAction(){
        let author_id = this.get('author_id');
        let model_id = this.get("model_id");
        //获取详情信息
        let info = await this.model("author").find(author_id);
        //判断信息是否存在
        if(think.isEmpty(info)){
            this.http.error = new Error("信息不存在！");
            return think.statusAction(702, this.http);
        }
        this.assign("info",info);
        //seo
        this.meta_title = info.title; //标题
        this.keywords = info.keyname ? info.keyname : ''; //seo关键词
        this.description = info.description ? info.description : ""; //seo描述
        //获取面包屑信息
        let breadcrumb = await this.model('category').get_parent_category(info.category_id,true);
        this.assign('breadcrumb', breadcrumb);
        //获取栏目信息
        let cate = await this.category(info.category_id);
        this.assign('category', cate);
        
        //排序
        let o = {};
        o.level = 'DESC';
        let order = this.get("order");
        order = Number(order);
        switch (order){
            case 1:
                o.update_time = 'ASC';
                break;
            case 2:
                o.view = 'DESC';
                break;
            case 3:
                o.view = 'ASC';
                break;
            default:
                o.update_time = 'DESC';
        }
        this.assign('order',order);
        let list = await this.model("document").where({model_id:model_id,author_id:author_id}).page(this.param('page'),10).order(o).countSelect();
        this.assign("list",list);
        //分页
        let html = pagination(list, this.http, {
            desc: false, //show description
            pageNum: 2,
            url: '', //page url, when not set, it will auto generated
            class: 'nomargin', //pagenation extra class
            text: {
                next: '下一页',
                prev: '上一页',
                total: 'count: ${count} , pages: ${pages}'
            }
        });
        this.assign('pagination', html);
        console.log(list);
        return this.modtemp();
    }
}