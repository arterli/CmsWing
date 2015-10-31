'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 用户登录认证
     * @param  string  $username 用户名
     * @param  string  $password 用户密码
     * @param  integer $type     用户名类型 （1-用户名，2-邮箱，3-手机，4-UID）
     * @return integer           登录成功-用户ID，登录失败-错误编号
     */
    async signin(username, password, type = 1){
        let map={};
        switch (type) {
            case 1:
                map.username = username;
                break;
            case 2:
                map.email = username;
                break;
            case 3:
                map.mobile = username;
                break;
            case 4:
                map.id = username;
                break;
            default:
                return 0; //参数错误
        }
        let user = await this.where(map).find();
        if(!think.isEmpty(user) && user.status){
            /* 验证用户密码 */
            if(password === user.password){
                this.updateLogin(user.id);//更新用户登录信息
                return user.id; //登录成功，返回用户ID
            } else {
                return -2; //密码错误
            }
        } else {
            return -1; //用户不存在或被禁用
        }
  }

    /**
     * 更新用户登录信息
     * @param  integer $uid 用户ID
     */
    updateLogin(uid){
        let data = {
            'id'              : uid,
            'last_login_time' : Date.now(),
            'last_login_ip'   : "11",
    };
            this.update(data);
    }
}