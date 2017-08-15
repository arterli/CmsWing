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
}