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

    /**
     * 记录行为日志，并执行该行为的规则
     * @param string action 行为标识
     * @param string model 触发行为的模型名
     * @param int record_id 触发行为的记录id
     * @param int user_id 执行行为的用户id
     * @return boolean
     * @author arterli <arterli@qq.com>
     */
   async log(action = null, model = null, record_id = null, user_id = null, ip){

        //参数检查
        if(think.isEmpty(action) || think.isEmpty(model) || think.isEmpty(record_id)){
            return '参数不能为空';
        }

        if(think.isEmpty(user_id)){
            let user = await this.session('userInfo');
            let id = user.id;
            user_id = id;
        }

        //查询行为，判断是否执行

        let action_info = await this.where({name:action}).find();
        if(action_info.status != 1){
            return '改行为被禁用';
        }

        //插入行为日志

        let data = {
            action_id:action_info.id,
            user_id:user_id,
            action_ip:_ip2int(ip),
            model:model,
            record_id:record_id,
            create_time:new Date().valueOf()
        }
       if(!think.isEmpty(action_info.log)){

       }
    }
}