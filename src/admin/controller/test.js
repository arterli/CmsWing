/**
 * Created by arter on 2015/11/3.
 */
import Auth from './../../common/controller/auth.js';
var Url = require('url');
export default class extends Auth {
    init(http) {
        super.init(http);
        // http.action = http.method.toLowerCase();
        //console.log(http.method.toLowerCase())

    }
   async indexAction(){
        //let a={};
        //a.s11="dfsd";
        let aa=[]
        aa.push(1)

        let bb=aa.join(",")
        let cc=!(typeof(a) == "undefined")
        //console.log(cc)
       let check=await this.check("Admin/AuthManager/changeStatus?method=forbidGroup","2");
       let url = "Admin/AuthManager/changeStatus?method=forbidGroup";
       let url1=Url.parse(url,true).query;

       console.log(check);
       //console.log(JSON.stringify(this.param()));
       let REQUEST = JSON.stringify(this.param()).toLowerCase()
      // console.log(Object.is(JSON.stringify(url1).toLowerCase(), JSON.stringify(this.param()).toLowerCase()));
        this.end("dd");

    }


}