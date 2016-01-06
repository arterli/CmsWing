'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 获取行为数据
     * @param string id 行为id
     * @param string field 需要获取的字段
     * @author arterli <arterli@qq.com>
     */
    async get_action(id = null, field = null){
        if(think.isEmpty(id) && !think.isNumberString(id)){
            return false;
        }
       let list = {}
            let map = {'status':['>', -1], 'id':id};
            list[id] = await this.where(map).field(true).find();

        return think.isEmpty(field) ? list[id] : list[id][field];
    }
}