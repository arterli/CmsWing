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
  indexAction(){
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
    //分组
    let group_id = 0;
    if(!think.isEmpty(this.modget(2)) && this.modget(2) !=0){
      map.group_id=this.modget(2);
      group_id = map.group_id;
    }

    let data = await this.model(this.mod.name).where(map).page(this.param('page'),num).order(o).countSelect();
     for (let v of data.data){
         v.imgs = img_text_view(v.detail,200,120);
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
      //判断请求参数是否合法。
      if(!think.isNumberString(id)){
          this.http.error = new Error("请求参数不合法！");
          return think.statusAction(702, this.http);
      }
      //获取详情信息
      let info = await this.model("question").find(id);
      //判断信息是否存在
      if(think.isEmpty(info)){
              this.http.error = new Error("信息不存在！");
              return think.statusAction(702, this.http);
      }
      //TODO
      let roleid=8;//游客
      //访问控制
      if(this.is_login){
          roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
      }
      let priv = await this.model("category_priv").priv(info.category_id,roleid,'visit');
      if(!priv){
          this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
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
      //当前用户是否关注
      if(this.is_login){
          let focus = await this.model("question_focus").where({question_id:id,uid:this.user.uid}).find();
          this.assign("focus",focus);
      }
      //获取当前主题所有关注的用户
      let focususer = await this.model("question_focus").where({question_id:id}).getField("uid");
      this.assign("focususer",focususer);
      //访问统计
      await this.model("question").where({id:info.id}).increment('view');
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
}