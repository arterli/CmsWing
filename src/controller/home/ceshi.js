// ceshi
const fs = require('fs');
module.exports= class extends think.Controller{
   async fetchAction(){
       //  const res = await this.fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png');
       // const dest = fs.createWriteStream('./octocat.png');
       // res.body.pipe(dest);
       return this.body="ccc";
    }
    async emailAction(){
       let transport ={
           service: 'qq',
           auth: {
               user: 'arterli@qq.com', // your account
               pass: 'vxheoipkldjgbhgi'       // authorization code, not the email password
           }
       }
       let options ={
           from: 'arterli@qq.com',          // sender address
           to: 'cmswing@126.com',  // list of receivers
           subject: 'this is subject',   // subject line
           html: '<b>this is HTML content <img src="cid:00000001"/></b>', // html content

       }
       let send =await this.sendEmail(transport, options).then(info => {
            console.log(info);
        }, err => {
            console.log(err);
        });
        console.log(send);
        return this.body="emial"
    }

    cookAction(){
        //this.cookie("hz", 'sfs|dfg|fdsfs');
        // $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
        // $orderSn = $yCode[intval(date('Y')) - 2011] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
        let d = new Date();
        let ycode  = ['C', 'M', 'S', 'W', 'I', 'N', 'G', 'N', 'E', 'T'];
        //return this.body= ycode[this.moment().format('YYYY')-2017]+ (d.getMonth()+1).toString(16).toUpperCase()+this.moment().format('DD')+m.substr(8);
        let m = new Date().getTime().toString();
        return this.body = think._.padEnd('1', 10, '0')+m.substr(8);
    }
}