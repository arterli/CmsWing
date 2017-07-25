/**
 * Created by arter on 2017/7/9.
 */
const moment = require('moment');
moment.locale('zh-cn');
module.exports = {
     get isMobile(){
        return this.ctx.isMobile;
    },
    moment:moment,
     mtpl(action=this.ctx.action){
        let c = this.ctx.controller.split('/');
        c.splice((this.ctx.controller.split('/').length-1),0,'mobile');
        return temp = `${c.join("/")}_${action}`;
    },
    para(param){

         return this.get(param)||this.post(param)
    }
}