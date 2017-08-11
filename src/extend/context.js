/**
 * Created by arter on 2017/7/11.
 */
const moment = require('moment');
moment.locale('zh-cn');
module.exports = {
     get isMobile(){
        const userAgent = this.userAgent.toLowerCase();
        const mList = ['iphone', 'android'];
        return mList.some(item => userAgent.indexOf(item) > -1);
    },
     moment:moment
}