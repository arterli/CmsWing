const superagent = require('superagent')
module.exports = class extends think.Service {
  constructor(code, state, ctx) {
    super(ctx)
    this.code = code
    this.baseUrl = 'https://api.weixin.qq.com/sns'
    this.state = state
  }

  // 获取
  async gettoken() {
    const setup = think.config('ext.weixin')
    const APPID = setup.appid
    const SECRET = setup.secret
    const GRANT_TYPE = 'authorization_code'
    const code = this.code
    // const REDIRECT_URI = this.redirect_uri
    const URL_GET_TOKEN = `${this.baseUrl}/oauth2/access_token`
    const gettoken = (URL_GET_TOKEN) => {
      const deferred = think.defer()
      superagent
        .get(`${URL_GET_TOKEN}?appid=${APPID}&secret=${SECRET}&code=${code}&grant_type=${GRANT_TYPE}`)
        .end(function(err, res) {
          // console.log(res);
          if (err) {
            deferred.resolve(err.message)
          }
          if (res.ok) {
            if (think.isEmpty(res.body)) {
              deferred.resolve(JSON.parse(res.text))
            } else {
              deferred.resolve(res.body)
            }
          } else {
            console.log('Oh no! error ' + res.text)
            deferred.resolve(res.text)
          }
        })
      return deferred.promise
    }
    return await gettoken(URL_GET_TOKEN)
  }
  async getuserinfo(token, openid) {
    const URL_GET_USERINFO = `${this.baseUrl}/userinfo?access_token=${token}&openid=${openid}`
    const getuserinfo = () => {
      const deferred = think.defer()
      superagent.get(URL_GET_USERINFO).end(function(err, res) {
        if (err) {
          deferred.resolve(err.message)
        }
        deferred.resolve(JSON.parse(res.text))
      })
      return deferred.promise
    }
    return await getuserinfo()
  }
}
