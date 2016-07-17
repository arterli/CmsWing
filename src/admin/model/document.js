'use strict';
/**
 * model
 */
export default class extends think.model.base {


    /**
     * 获取详情页数据
     * @param id
     * @returns {*}
     */
  async details(id){
        //获取基础数据
      let info=await this.field(true).find(id);
      if(! (think.isObject(info) || 1 !== info.status)){
          this.fail('文档被禁用或已删除！');
          return false;
      }
     //获取模型数据
      let table =await this.model("model").get_table_name(info.model_id);
        let detail = await this.model(table).find(id)
         info = think.extend({},info,detail);
        return info;
  }

    /**
     * 更新或者新增一个文档
     * @param data 手动传入的数据
     * @returns boolean fasle 失败 ， int  成功 返回完整的数据
     */
    async updates(data){
        //console.log(data.sort_id);

       //return false;
        data=data||null;
        //检查文档类型是否符合要求
        let type = data.type||2;
        let pid = data.pid;
        let res = await this.checkdoctype(type,pid);
         if(res.errno>0){
             this.error = res.errmsg;
             return false;
         }
        //添加或者新增基础内容
         if(think.isEmpty(data.id)){//新增数据
             data.create_time = !think.isEmpty( data.create_time)? new Date(data.create_time).valueOf():new Date().getTime();
             data.update_time=new Date().getTime();
             data.status= await this.getStatus(data.id,data.category_id);
             var id = await this.add(data);//添加基础数据
             //let id = 100;
             if(!id){
                 this.error = '新增基础内容出错！';
                 return false
             }else {
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
             }
         }else {//更新内容
             data.update_time=new Date().getTime();
             data.status= await this.getStatus(data.id,data.category_id);
             data.create_time = !think.isEmpty( data.create_time)? new Date(data.create_time).valueOf():new Date().getTime();
             let status = this.update(data);
             if(!status){
                 this.error = '更新基础内容出错！';
                 return false;
             }else {
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
                    this.model("typeoptionvar").where({tid:data.id}).delete();
                     await this.model("type_optionvalue"+data.sort_id).where({tid:data.id}).update(sortdata);
                     //添加分类
                     this.model("typeoptionvar").addMany(sortarr);
                 }
             }

         }


        /**
         * 添加或者新增扩展内容
         * 获取当前扩模型表名字
         * @type {array}
         */
       let modelinfo = await this.model('model','admin').get_document_model(data.model_id);
        let model;
        if (modelinfo.extend==1){
            model = `document_${modelinfo.name}`;
        }else {
            model = modelinfo.name;
        }

        if (think.isEmpty(data.id)) {//新增数据
            data.id=id;
            let ids = this.model(model).add(data);
            data.id=null;
            if (!ids) {
                this.delete(id);
                this.error = '新增数据失败！';
                return false;
            }
        } else { //更新数据
            let status = this.model(model).update(data);
            if(!status){
                this.error = '更新数据失败！';
                return false;
            }
        }
        return {data:data,id:id};
    }

    /**
     * 检擦指定文档下面自文档的类型
     * @param type 子文档的类型
     * @param pid  父文档类型
     * @returns {errno: 0,errmsg: "",data: {name: ""}}
     */

   async checkdoctype(type,pid){
        type=type||null,pid=pid||null;
        let res = {
            errno: 0,
            errmsg: "",
            data: {
                name: ""
            }
        };
        if(think.isEmpty(type)){
            return {
                errno: 100,
                errmsg: "文档类型不能为空",
                data: ""
            };
        }
        if(think.isEmpty(pid)||pid==0){
            return res;
        }
       //查询父文档的类型
       let ptype = think.isNumberString(pid) ? await this.where({id:pid}).getField('type',true):await this.where({name:pid}).getField('type',true);
       // console.log(ptype);
       //父文档为目录时
       switch(ptype){
           case 1: // 目录
           case 2: // 主题
               break;
           case 3: // 段落
               return {
                   errno: 100,
                   errmsg: "段落下面不允许再添加子内容",
                   data: ""
               };
           default:
               return {
                   errno: 100,
                   errmsg: "父文档类型不正确",
                   data: ""
               };
       }
       return res;
    }

    /**
     * 获取数据状态
     * @param id  文章id
     * @param cid 分类id
     * @returns {*}
     */
    async getStatus(id, cid){
        id=id||null;
        let status;
        if(think.isEmpty(id)){	//新增
            let check 	=	await this.model('category').where({id:cid}).getField('check',true);
            status = 	check ? 2 : 1;
        }else{				//更新
            status = await this.where({id:id}).getField('status',true);
            //编辑草稿改变状态
            if(status == 3){
                status = 1;
            }
        }
        return status;
    }

    /**
     * 返回模型的错误信息
     * @access public
     * @return string
     */
      getError(){
        return this.error;
    }
}