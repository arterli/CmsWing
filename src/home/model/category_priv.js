'use strict';
/**
 * model
 */
export default class extends think.model.base {
//前台权限验证
    /**
     *缓存权限列表 all_priv
     * @param catid 要验证的栏目id
     * @param roleid 用户组
     * @param action 权限类型
     * @param is_admin 谁否前台
     * @returns {number} 返回0 或1 0:没权限，1有权限。
     */
   async priv(catid,roleid,action,is_admin=0){
       let list = await think.cache("all_priv", () => {
           return this.select();
       }, {timeout: 365 * 24 * 3600});
        let res=0;
        let isadd = think._.filter(list, {catid:catid,is_admin:is_admin,action:action});
       if(think.isEmpty(isadd)){
            res =1;
        }else {
            let priv =  think._.filter(isadd,{roleid:roleid});
            res =priv.length;
       }
        return res;
    }

}