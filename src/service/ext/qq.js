
// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const https = require('https');
module.exports = class extends think.Service {
  constructor(access_token, openid, ctx) {
    super(ctx);
    this.baseUrl = 'https://graph.qq.com';
    this.access_token = access_token;
    this.openid = openid;
  }

  async get_user_info() {
    const setup = think.config('ext.qq');
    const oauth_consumer_key = setup.appid;
    const URL_GET_USERINFO = this.baseUrl + `/user/get_user_info?access_token=${this.access_token}&oauth_consumer_key=${oauth_consumer_key}&openid=${this.openid}`;
    const getuserinfo = (URL_GET_USERINFO) => {
      const deferred = think.defer();
      https.get(URL_GET_USERINFO, (res) => {
        // console.log('statusCode: ', res.statusCode);
        // console.log('headers: ', res.headers);

        var body = [];
        res.on('data', (d) => {
          // process.stdout.write(d);
          body.push(d);
        });
        res.on('end', function(d) {
          body = Buffer.concat(body);
          // console.log(body) ;
          deferred.resolve(JSON.parse(body));
          // boday+=d;
        });
      }).on('error', (e) => {
        console.error(e);
      });
      return deferred.promise;
    };
    return await getuserinfo(URL_GET_USERINFO);
  }
};
