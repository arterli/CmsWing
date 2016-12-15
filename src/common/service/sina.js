'use strict';
import superagent from 'superagent';
import querystring  from 'querystring';
export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(code,redirect_uri){
    //super.init(...args);
      this.code = code;
      this.baseUrl="https://api.weibo.com";
      this.redirect_uri = redirect_uri;
  }
  async gettoken(){
      let setup = await think.cache("setup");
      let client_id = setup.SINA_APPKEY;
      let client_secret = setup.SINA_APPSECRET;
      let grant_type = 'authorization_code';
      let code = this.code;
      let redirect_uri=this.redirect_uri;
      let URL_GET_USERINFO = this.baseUrl + `/oauth2/access_token`;
      let gettoken=(URL_GET_USERINFO)=>{
          let deferred = think.defer();
          superagent.post( `${URL_GET_USERINFO}?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`).send({}).end(function(err,res){
             // console.log(res);
              if (res.ok) {
                  if(think.isEmpty(res.body)){
                      deferred.resolve(JSON.parse(res.text));
                  }else {
                      deferred.resolve(res.body);
                  }
                  } else {
                      console.log('Oh no! error ' + res.text);
                  deferred.resolve(res.text);
                  }
              });

          // https.get(URL_GET_USERINFO, (res) => {
          //     //console.log('statusCode: ', res.statusCode);
          //     // console.log('headers: ', res.headers);
          //
          //     var body = [];
          //     res.on('data', (d) => {
          //         //process.stdout.write(d);
          //         body.push(d);
          //     });
          //     res.on("end", function (d) {
          //         body = Buffer.concat(body) ;
          //         //console.log(body) ;
          //         deferred.resolve(JSON.parse(body));
          //         //boday+=d;
          //     });
          //
          // }).on('error', (e) => {
          //     console.error(e);
          // });
          return deferred.promise;
      }
      return await gettoken(URL_GET_USERINFO);
  }

}