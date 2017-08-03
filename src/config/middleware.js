const path = require('path');
const isDev = think.env === 'development';
const wechat = require('think-wechat');
module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|upload|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: wechat,
    match: '/home/wechat',
    options: {
      token:"cmswing",
      appid:"wxadce60f0c68b9b58",
      encodingAESKey:"",
      checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: 'router', 
    options: {optimizeHomepageRouter:false}
  },
  'logic',
  'controller'
];