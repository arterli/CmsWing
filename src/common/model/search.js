'use strict';
/**
 * model
 */
import Segment from 'segment';
export default class extends think.model.base {
    /**
     * 添加搜索
     * await this.model("search").addsearch(m_id,d_id,data);
     * @param m_id
     * @param d_id
     * @param data
     * @returns {Promise.<void>}
     */
    async addsearch(m_id,d_id,data){
    let  search_model = await this.model("search_model").where({mod:m_id}).find();
    if(!think.isEmpty(search_model)){
        let obj ={};
        obj.m_id=m_id;
        obj.d_id=d_id;
        obj.add_time=data[search_model.addtime]||new Date().getTime();
        let dataarr=[];
        for (let v of search_model.data.split(",")){
            dataarr.push(data[v]);
        }
        //obj.data = dataarr.join(" ");
        let segment = new Segment();
        // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
        segment.useDefault();
        // 开始分词
        let segment_q= segment.doSegment(dataarr.join(" "), {
            simple: true,
            stripPunctuation: true
        });
        obj.data = dataarr.join(" ")+" "+segment_q.join(" ");
        await this.add(obj);
    }

 }

    /**
     * 更新搜索
     * await this.model("search").updatesearch(m_id,data);
     * @param m_id
     * @param data
     * @returns {Promise.<void>}
     */
 async updatesearch(m_id,data){
     let  search_model = await this.model("search_model").where({mod:m_id}).find();
     if(!think.isEmpty(search_model)){
         let obj ={};
         obj.m_id=m_id;
         obj.d_id=data[search_model.pk];
         let dataarr=[];
         for (let v of search_model.data.split(",")){
             dataarr.push(data[v]);
         }
         //obj.data = dataarr.join(" ");
         let segment = new Segment();
         // 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
         segment.useDefault();
         // 开始分词
         let segment_q= segment.doSegment(dataarr.join(" "), {
             simple: true,
             stripPunctuation: true
         });
         obj.data = dataarr.join(" ")+" "+segment_q.join(" ");
         await this.where({d_id:obj.d_id,m_id:m_id}).update(obj);
     }
 }

    /**
     * 删除搜索
     * await this.model('search').delsearch(m_id,d_id)
     * @param d_id
     * @param m_id
     * @returns {Promise.<void>}
     */
 async delsearch(m_id,d_id){
     if(!think.isEmpty(d_id)){
         await this.where({d_id:d_id,m_id:m_id}).delete();
     }
 }
}