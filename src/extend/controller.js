/**
 * Created by arter on 2017/7/9.
 */
const moment = require('moment');
moment.locale('zh-cn');
module.exports = {
     isMobile: function(){
        return this.ctx.isMobile();
    },
    moment:moment
}