/**
 * Created by arter on 2015/11/3.
 */
export default class extends think.controller.base {
    init(http) {
        super.init(http);
        // http.action = http.method.toLowerCase();
        //console.log(http.method.toLowerCase())

    }
   async indexAction(){
        //let a={};
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
    funAction(){
        function add(a,b)
        {
            add.call(sub,3,1);
        }
        function sub(a,b)
        {
            console.log(a-b);
        }


    }
}