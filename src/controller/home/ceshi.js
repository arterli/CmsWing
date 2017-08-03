// ceshi
const fs = require('fs');
module.exports= class extends think.Controller{
   async fetchAction(){
       //  const res = await this.fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png');
       // const dest = fs.createWriteStream('./octocat.png');
       // res.body.pipe(dest);
       return this.body="ccc";
    }
}