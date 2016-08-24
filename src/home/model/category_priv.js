'use strict';
/**
 * model
 */
export default class extends think.model.base {
//前台权限验证
   async priv(catid,roleid,action,is_admin=0){
        let res=0;
        let isadd = await this.where({catid:catid,is_admin:is_admin,action:action}).count('catid');

       if(isadd == 0){
            res =1;
        }else {
            let priv = await this.where({catid:catid,is_admin:is_admin,roleid:roleid,action:action}).count('catid');
            res =priv
        }
        return res;
    }
}