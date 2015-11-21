'use strict';
/**
 * model
 */
export default class extends think.model.base {

    async info(id){
        //获取分类信息
        console.log(id);
        let map = {};
        if(think.isNumber(id)){
            map.id = id;
        }else{
            map.name = id;
        }
        return await this.where(map).find();
    }
    /**
     * 获取分类树，指定分类则返回指定分类及其子分类，不指定则返回所有分类树
     *
     */
     async gettree(id = 0 , field = true){
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
        let list = await this.field(field).where(map).order('sort').select();
        //console.log(list);
        list = get_children(list,id);
        let info = list;

        return info;
     }


}