'use strict';

import Base from './base.js';
import Segment from 'segment';
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
          let m_id = this.get('m_id')||0;
          //按时间搜索
          if(time=='day'){
              search_time = new Date().getTime() - 86400000;
              sql_time = `AND addtime > ${search_time}`;
          }else if(time=='week'){
              search_time = new Date().getTime() - 604800000;
              sql_time = `AND addtime > ${search_time}`;
          }else if(time=='month'){
              search_time = new Date().getTime() - 2592000000;
              sql_time = `AND addtime > ${search_time}`;
          }else if(time=='year'){
              search_time = new Date().getTime() - 31536000000;
              sql_time = `AND addtime > ${search_time}`;
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
          if(!think.isEmpty(segment_q)){
              console.log(segment_q.join(" "));
              sql = "";
              sql = `MATCH (data) AGAINST ('${segment_q.join(" ")}' IN BOOLEAN MODE) order by id DESC`;
              if(m_id){
                  sql += `AND m_id=${m_id}`
              }
          }else {
              console.log(q+"dddddddddd");
          }
          console.log(sql);
          let res = await this.model("mysql").query(`SELECT * FROM __SEARCH__ WHERE ${sql}`);
          console.log(res);
          let modlist = await this.model("search_model").order('sort ASC').select();
          //console.log(modlist);
          this.assign("modlist",modlist);
        return this.display("result");
      }

  }
}