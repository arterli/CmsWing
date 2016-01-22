var wechatMiddleware = require('think-wechat');

think.middleware('parse_wechat', wechatMiddleware({
    wechat: {
        token: '微信公众号token',
        appid: '微信公众号ID',
        encodingAESKey: '消息安全加密串'
    }
}));