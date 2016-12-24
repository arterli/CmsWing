'use strict';

import Base from './base.js';
import Segment from 'segment';
import pagination from 'think-pagination';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
      let q = this.get("q");
      this.meta_title="搜索";
      if(think.isEmpty(q)){
          return this.display();
      }else {
          let time = this.get("d");
          let search_time,sql_time,sql;
          let q = this.get('q');
          let m_id = this.get('m')||0;
          //按时间搜索
          if(time=='day'){
              search_time = new Date().getTime() - 86400000;
              sql_time = ` AND add_time > ${search_time}`;
          }else if(time=='week'){
              search_time = new Date().getTime() - 604800000;
              sql_time = ` AND add_time > ${search_time}`;
          }else if(time=='month'){
              search_time = new Date().getTime() - 2592000000;
              sql_time = ` AND add_time > ${search_time}`;
          }else if(time=='year'){
              search_time = new Date().getTime() - 31536000000;
              sql_time = ` AND add_time > ${search_time}`;
          }else {
              search_time=0;
              sql_time='';
          }
          let segment = new Segment();
          // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
          segment.useDefault();
          // 开始分词
          let segment_q= segment.doSegment(q, {
              simple: true,
              stripPunctuation: true
          });
          //检查全文搜索配置
          let variables = await this.model("mysql").query(`show variables`);
          let ft_min_word_len =think._.find(variables, ['Variable_name', 'ft_min_word_len']).Value;
          if(ft_min_word_len ==1){
              console.log(segment_q.join(" "));
              sql = "";
              sql = `MATCH (data) AGAINST ('${segment_q.join(" ")}' IN BOOLEAN MODE)`;
              if(m_id){
                  sql += ` AND m_id=${m_id}`
              }
              if(search_time !=0){
                  sql += sql_time
              }
          }else {
              sql = "";
              sql +='('
              for (let k=0; k<segment_q.length ;k++){
                  sql +="`data` like '%"+segment_q[k]+"%'";
                  if(segment_q[k+1]){
                      sql +=' OR '
                  }
              }
              sql +=')'
              if(m_id){
                  sql += ` AND m_id=${m_id}`
              }
              if(search_time !=0){
                  sql += sql_time
              }
              console.log(q+"dddddddddd");
          }
          console.log(sql);
          let numsPerPage =10;
          let currentPage = Number(this.get("page"))||1;
          let count = await this.model("mysql").query(`SELECT count(search_id) FROM __SEARCH__ WHERE ${sql}`)
          let res = await this.model("mysql").query(`SELECT * FROM __SEARCH__ WHERE ${sql} order by search_id DESC LIMIT ${(currentPage-1)*numsPerPage},${numsPerPage}`);
          let hs = this.cookie("cmswing_historical_search");
          this.assign("hs",hs.split("|").reverse());
          //搜索记录
          if(count[0]['count(search_id)']>0){


              let hsq;
              if(think.isEmpty(hs)){
                  this.cookie("cmswing_historical_search", q);
              }else {
                  if(!in_array(q,hs.split("|"))){
                      hsq = hs+'|'+q;
                      this.cookie("cmswing_historical_search", hsq);
                  }

              }

          }

          let modlist = await this.model("search_model").order('sort ASC').select();
          //console.log(modlist);
          let data = [];
          for(let v of res){
              let extend = await this.model("model").get_model(v.m_id,"extend");
              v.m_type =extend;
              let table;
              if(extend==0){
                  table= await this.model("model").get_model(v.m_id,"name");
              }else {
                  table="document";
              }
              let pk = await this.model("search_model").where({mod:v.m_id}).getField('pk', true)
              let map = {}
               map[pk] = v.d_id;
              data.push(think.extend(await this.model(table).where(map).find(),v))
          }
          //console.log(data);
          let list = {
              numsPerPage: numsPerPage, //每页显示的条数
                  currentPage: currentPage, //当前页
              count: count[0]['count(search_id)'], //总条数
              totalPages: Math.ceil(count[0]['count(search_id)']/numsPerPage), //总页数
              data:data
          }
          //查询数据

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
          this.assign("modlist",modlist);
          this.assign("list",list);
        return this.display("result");
      }

  }
}