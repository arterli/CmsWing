'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 缓存频道信息
     * @returns {Promise}
     */
    async get_channel_cache(){
        let channel=await think.cache('get_channel_cache',()=>{
            return this.get_channel(0);
         }, {timeout: 365 * 24 * 3600});
        return channel;
    }
    /**
     * 获取分类树，指定分类则返回指定分类及其子分类，不指定则返回所有分类树
     *
     */
    async get_channel(id){
        id = id||0;
        /*获取当前分类信息*/

        //if(id){
        //    console.log(id);
        //    let ids = id;
        //    let info = await this.info(ids);
        //    console.log(info);
        //    let id   = info.id;
        //}

        //获取所有分类

        let map = {"status":{">":-1}}
        let list = await this.where(map).order('sort').select();
        //console.log(list);
        list = get_children(list,id);
        let info = list;

        return info;
    }

    /**
     * 更新或者编辑信息
     * @param data
     * @returns {*}
     */
    async updates(data){
        if(think.isEmpty(data)){
            return false;
        }
        let res;
        /* 添加或更新数据 */
        if(think.isEmpty(data.id)){
            console.log(data);
            res = this.add(data);

        }else{
            res = this.update(data);
        }
        think.cache("get_channel_cache",null);//更新频道缓存信息
        return res;

    }
}