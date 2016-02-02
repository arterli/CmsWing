/**
 * Created by arter on 2015/11/3.
 */
import Base from './base.js'
export default class extends Base {
    init(http) {
        super.init(http);
        // http.action = http.method.toLowerCase();
        //console.log(http.method.toLowerCase())

    }
   async indexAction(){
        //let a={};///
        //a.s11="dfsd";
        //let aa=[]
        //aa.push(1)
        //let bb=aa.join(",")
        //let cc=!(typeof(a) == "undefined")
        //console.log(cc)
       //let check=await this.check("/Admin/test","1");
       //console.log(check);
       //console.log(JSON.stringify(this.param()));
       //let REQUEST = JSON.stringify(this.param()).toLowerCase()
      // console.log(Object.is(JSON.stringify(url1).toLowerCase(), JSON.stringify(this.param()).toLowerCase()));
      //  this.end("dd");
       let Auth = think.adapter("auth", "rbac");
       let auth = new Auth(14);
       let res = await auth.check("/admin/test1");
       //let roles =this.model();
       // console.log(roles);
       let http = this.http;
       console.log(http.action);
       this.end();
    }

    nunjucksAction(){

        this.assign("date",new Date().valueOf());
        return this.display()
    }


       async tesfAction(){
          let model = this.model('sfsfsdf');
          let affectedRows = await model.where({id: ['>', 100]}).delete();
          }

    async funAction(){


    let str = "[user|get_nickname]在[time|time_format]登录了后台[model]";
        let match = str.match(/\[(\S+?)\]/g);
        //console.log(match);
        if(!think.isEmpty(match)){
            let user_id = 1;
            let record_id = 3;
            let model = "mmm";

            let log={
                user :user_id,
                record:record_id,
                model:model,
                time: new Date().valueOf(),
                data:{
                    user :user_id,
                    record:record_id,
                    model:model,
                    time: new Date().valueOf(),
                }
            }

            let replace = []
            for(let val of match){
                val= val.replace(/(^\[)|(\]$)/g, "");
                let param = val.split('|');
                //console.log(param);
                if(!think.isEmpty(param[1])){
                    replace.push(await call_user_func(param[1],log[param[0]]))
                }else {
                    replace.push(log[param[0]])
                }
            }
            let data= replace;
            let ss= str_replace(match,replace,str);
            //for (let i=0 ; i < match.length;i++ ){
            //    let nstr = str.replace(match[i],replace[i]);
            //    console.log(nstr);
            //}
            console.log(ss);
        }else {
            let ss = str;
        }
        console.log(this.http.url);
        //var funcs = ['test1', 'test2'];
        //for(var i=0;i<funcs.length;i++) {
        //    call_user_func(funcs[i], ["ddd", "cc"]);
        //}
        //
        //let test1=function(a, b) {
        //    console.log(a + b + 'is a good gay');
        //}
        //let test2=function(a) {
        //    console.log(a+" is sb");
        //}
    }
    momentAction(){
        // let moment = require('moment');
        // let datetime = moment().unix();
        // moment(1318874398806).unix();
        // console.log( moment(1318874398806).format("dddd, MMMM Do YYYY, h:mm:ss a"));
        think.log(this.setup.WEIXIN_TYPE['2'],"配置输出");
        this.end();
    }
}
