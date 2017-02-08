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
}