'use strict';
import https from 'https';
export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(access_token,openid){
    //super.init(...args);
    this.baseUrl = "https://graph.qq.com";
    this.access_token=access_token;
    this.openid =openid;
    this.oauth_consumer_key="101309492"
  }
  async get_user_info(){

    let URL_GET_USERINFO = this.baseUrl + `/user/get_user_info?access_token=${this.access_token}&oauth_consumer_key=${this.oauth_consumer_key}&openid=${this.openid}`;
    let getuserinfo=(URL_GET_USERINFO)=>{
      let deferred = think.defer();
      https.get(URL_GET_USERINFO, (res) => {
        //console.log('statusCode: ', res.statusCode);
       // console.log('headers: ', res.headers);
        var body = [];
        res.on('data', (d) => {
          //process.stdout.write(d);
          body.push(d);
        });
        res.on("end", function (d) {
          body = Buffer.concat(body) ;
          //console.log(body) ;
          deferred.resolve(JSON.parse(body));
          //boday+=d;
        });

      }).on('error', (e) => {
        console.error(e);
      });
      return deferred.promise;
    }
    return await getuserinfo(URL_GET_USERINFO);
  }
}