/**
 * Created by arter on 2015/11/3.
 */
import Auth from './auth.js';
export default class extends Auth {
    init(http) {
        super.init(http);
        // http.action = http.method.toLowerCase();
        //console.log(http.method.toLowerCase())

    }
    indexAction(){
        //let a={};
        //a.s11="dfsd";
        let aa=[]

        aa.push(1)

        let bb=aa.join(",")
        let cc=!(typeof(a) == "undefined")
        //console.log(cc)
        this.check("/admin/user/index","2");
        this.end("dd");
    }

}