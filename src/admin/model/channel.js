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
}