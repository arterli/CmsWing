'use strict';
/**
 * model
 */
export default class extends think.model.base {

    /**
     * 更新或者新增一个文档
     * @param data 手动传入的数据
     * @returns boolean fasle 失败 ， int  成功 返回完整的数据
     */
    async updates(data,time=new Date().getTime()){
        //console.log(data);
        data=data||null;
        //添加或者新增基础内容
        if(think.isEmpty(data.id)){//新增数据
            if(think.isEmpty(data.create_time)){
                data.create_time = time;
            }else{
                data.create_time = data.create_time!=0? new Date(data.create_time).valueOf():time;
            }
            data.update_time=new Date().getTime();
            data.status = 1;
            console.log(data);
            //return false;
            var id = await this.add(data);//添加基础数据
            //let id = 100;
            if(!id){
                this.error = '新增基础内容出错！';
                return false
            }else {
                //添加分类信息
                if(data.sort_id !=0 && !think.isEmpty(data.sort_id)){
                    let sortarr = [];
                    let sortdata = {};
                    for(let k in data){
                        let arr = k.split("_");
                        if(arr[0]=="sortid" && !think.isEmpty(arr[1])){
                            let obj ={}
                            obj.value = think.isArray(data[k])?JSON.stringify(data[k]):data[k];
                            obj.optionid = await this.model("typeoption").where({identifier:arr[1]}).getField("optionid",true);
                            obj.sortid = data.sort_id;
                            obj.fid = data.category_id;
                            obj.tid = id;
                            sortarr.push(obj);
                            sortdata[arr[1]] = think.isArray(data[k])?JSON.stringify(data[k]):data[k];
                            sortdata.tid = id;
                            sortdata.fid = data.category_id;
                        }
                    }
                    //console.log(sortarr);
                    //console.log(sortdata);
                    //return false;
                    //添加分类
                    this.model("typeoptionvar").addMany(sortarr);
                    this.model("type_optionvalue"+data.sort_id).add(sortdata);
                }
                //添加关键词
                //添加关键词
                /**
                 * 添加话题
                 * @param keyname "话题1,话题2.话题3"
                 * @param id  "主题id"
                 * @param uid "用户id"
                 * @param mod_id "模型id"
                 * @param mod_type "模型类型 0系统模型，1独立模型"
                 */
               //await this.model("keyword").addkey(data.keyname,id,data.uid,data.model_id,0);
                //添加到搜索
                await this.model("search").addsearch(data.model_id,id,data);
            }
        }else {//更新内容
            data.update_time=new Date().getTime();
            if(!think.isEmpty(data.create_time)){
                data.create_time = data.create_time!=0? new Date(data.create_time).valueOf():new Date().getTime();
            }
            // //更新关键词
            // await this.model("keyword").updatekey(data.keyname,data.id,data.userid,data.model_id,0);
            let status = this.update(data);
            if(!status){
                this.error = '更新基础内容出错！';
                return false;
            }else {
                //更新搜索
                await this.model("search").updatesearch(data.model_id,data);
                if(data.sort_id !=0 && !think.isEmpty(data.sort_id)){
                    let sortdata = {};
                    let sortarr = [];
                    for(let k in data){
                        let arr = k.split("_");
                        if(arr[0]=="sortid" && !think.isEmpty(arr[1])){
                            let obj ={}
                            obj.value = think.isArray(data[k])?JSON.stringify(data[k]):data[k];
                            obj.optionid = await this.model("typeoption").where({identifier:arr[1]}).getField("optionid",true);
                            obj.sortid = data.sort_id;
                            obj.fid = data.category_id;
                            obj.tid = data.id;
                            sortarr.push(obj);
                            sortdata[arr[1]] = think.isArray(data[k])?JSON.stringify(data[k]):data[k];
                            sortdata.tid = data.id;
                            sortdata.fid = data.category_id;
                        }
                    }
                    //console.log(sortarr);
                    //console.log(sortdata);
                    let cou = await this.model("type_optionvalue"+data.sort_id).where({tid:data.id}).count("tid");
                    if(cou > 0){
                        await this.model("type_optionvalue"+data.sort_id).where({tid:data.id}).update(sortdata);
                    }else {
                        await this.model("type_optionvalue"+data.sort_id).add(sortdata);
                    }
                    this.model("typeoptionvar").where({tid:data.id}).delete();
                    //添加分类
                    this.model("typeoptionvar").addMany(sortarr);
                }
            }

        }

        return {data:data,id:id};
    }

}