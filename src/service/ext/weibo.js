
// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const superagent = require('superagent');
module.exports = class extends think.Service {
  constructor(code, redirect_uri, ctx) {
    super(ctx);
    this.code = code;
    this.baseUrl = 'https://api.weibo.com';
    this.redirect_uri = redirect_uri;
  }

  // 获取
  async gettoken() {
    const setup = think.config('ext.weibo');
    const client_id = setup.appkey;
    const client_secret = setup.appsecre;
    const grant_type = 'authorization_code';
    const code = this.code;
    const redirect_uri = this.redirect_uri;
    const URL_GET_USERINFO = this.baseUrl + `/oauth2/access_token`;
    const gettoken = (URL_GET_USERINFO) => {
      const deferred = think.defer();
      superagent.post(`${URL_GET_USERINFO}?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`).send({}).end(function(err, res) {
        // console.log(res);
        if (res.ok) {
          if (think.isEmpty(res.body)) {
            deferred.resolve(JSON.parse(res.text));
          } else {
            deferred.resolve(res.body);
          }
        } else {
          console.log('Oh no! error ' + res.text);
          deferred.resolve(res.text);
        }
      });
      return deferred.promise;
    };
    return await gettoken(URL_GET_USERINFO);
  }
  async getuserinfo(token, uid) {
    const getuserinfo = () => {
      const deferred = think.defer();
      superagent
        .get(`${this.baseUrl}/2/users/show.json?access_token=${token}&uid=${uid}`)
        .end(function(err, res) {
          deferred.resolve(JSON.parse(res.text));
        });
      return deferred.promise;
    };
    return await getuserinfo();
  }
};
