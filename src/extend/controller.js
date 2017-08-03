/**
 * Created by arter on 2017/7/9.
 */
const moment = require('moment');
moment.locale('zh-cn');
const pagination = require('think-pagination');
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
    },
    pagination(data,config={}){
        let ops = think.extend({
            desc: true, //show description
            pageNum: 2,
            url: '', //page url, when not set, it will auto generated
            class: 'nomargin', //pagenation extra class
            text: {
                next: '下一页',
                prev: '上一页',
                total: '总数: __COUNT__ , 页数: __PAGE__'
            }},config);
       return pagination(data, this.ctx, ops);
    },
    get isweixin(){
        let flag = false;
        let agent = this.userAgent.toLowerCase();
        //let key = ["mqqbrowser","micromessenger"];
        let key = ["micromessenger"];
        //排除 Windows 桌面系统
        if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
            //排除苹果桌面系统
            if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1) {
                for (let item of key) {
                    if (agent.indexOf(item) > -1) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        return flag;
    }
}