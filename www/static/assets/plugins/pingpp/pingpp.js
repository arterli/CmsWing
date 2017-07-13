(function(){
var
  version = "2.0.7",
  hasOwn = {}.hasOwnProperty,
  PingppSDK = function(){},
  cfg = {
    PINGPP_NOTIFY_URL: 'https://api.pingxx.com/notify/charges/',
    UPACP_WAP_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
    ALIPAY_WAP_URL: 'http://wappaygw.alipay.com/service/rest.htm',
    UPMP_WAP_URL: 'uppay://uppayservice/?style=token&paydata=',
    JDPAY_WAP_URL: 'https://m.jdpay.com/wepay/web/pay',
    YEEPAY_WAP_URL: 'https://ok.yeepay.com/paymobile/api/pay/request',
    YEEPAY_WAP_TEST_URL: 'http://mobiletest.yeepay.com/paymobile/api/pay/request',
    PINGPP_MOCK_URL: 'http://sissi.pingxx.com/mock.php'
  },
  channels = {
    alipay_wap: 'alipay_wap',
    upmp_wap: 'upmp_wap',
    upacp_wap: 'upacp_wap',
    bfb_wap: 'bfb_wap',
    wx_pub: 'wx_pub',
    yeepay_wap: 'yeepay_wap',
    jdpay_wap: 'jdpay_wap'
  };

PingppSDK.prototype = {

  version: version,

  _resultCallback: undefined,

  _jsApiParameters: {},

  _debug: false,

  _signature: undefined,

  createPayment: function(charge_json, callback, signature, debug) {
    if (typeof callback == "function") {
      this._resultCallback = callback;
    }
    if (typeof signature != "undefined") {
      this._signature = signature;
    }
    if (typeof debug == "boolean") {
      this._debug = debug;
    }
    var charge;
    if(typeof charge_json == "string"){
      try{
        charge = JSON.parse(charge_json);
      }catch(err){
        this._innerCallback("fail", this._error("json_decode_fail"));
        return;
      }
    }else{
      charge = charge_json;
    }
    if(typeof charge == "undefined"){
      this._innerCallback("fail", this._error("json_decode_fail"));
      return;
    }
    if(!hasOwn.call(charge, 'id')){
      this._innerCallback("fail", this._error("invalid_charge", "no_charge_id"));
      return;
    }
    if(!hasOwn.call(charge, 'channel')){
      this._innerCallback("fail", this._error("invalid_charge", "no_channel"));
      return;
    }
    var channel = charge['channel'];
    if(!hasOwn.call(charge, 'credential')){
      this._innerCallback("fail", this._error("invalid_charge", "no_credential"));
      return;
    }
    if (!charge['credential']) {
      this._innerCallback("fail", this._error("invalid_credential", "credential_is_undefined"));
      return;
    }
    if (!hasOwn.call(channels, channel)) {
      this._innerCallback("fail", this._error("invalid_charge", "no_such_channel:" + channel));
      return;
    }
    if (!hasOwn.call(charge['credential'], channel)) {
      this._innerCallback("fail", this._error("invalid_credential", "no_valid_channel_credential"));
      return;
    }
    if(!hasOwn.call(charge, 'livemode')){
      this._innerCallback("fail", this._error("invalid_charge", "no_livemode"));
      return;
    }
    if (charge['livemode'] == false) {
      this._testModeNotify(charge);
      return;
    }
    var credential = charge['credential'][channel];
    if (channel == channels.upmp_wap) {  // 调起银联支付控件，客户端需要安装银联支付控件才能调起
      location.href = cfg.UPMP_WAP_URL + credential['paydata'];
    } else if (channel == channels.upacp_wap) {
      form_submit(cfg.UPACP_WAP_URL, 'post', credential);
    } else if (channel == channels.alipay_wap) {  // 调起支付宝手机网页支付
      credential['_input_charset'] = 'utf-8';
      if (typeof _AP != "undefined") {
        var query = stringify_data(credential, channel, true);
        _AP.pay(cfg.ALIPAY_WAP_URL + "?" + query);
      } else {
        form_submit(cfg.ALIPAY_WAP_URL, 'get', credential);
      }
    } else if (channel == channels.bfb_wap) {
      if (!hasOwn.call(credential, 'url')) {
        this._innerCallback("fail", this._error("invalid_credential", "missing_field:url"));
        return;
      }
      location.href = credential['url'] + '?' + stringify_data(credential, channel);
    } else if (channel == channels.yeepay_wap) {
      var fields = ["merchantaccount", "encryptkey", "data"];
      for (var k = 0; k < fields.length; k++) {
        if(!hasOwn.call(credential, fields[k])){
          this._innerCallback("fail", this._error("invalid_credential", "missing_field_"+fields[k]));
          return;
        }
      }
      if (hasOwn.call(credential, "mode") && credential["mode"] == "test") {
        location.href = cfg.YEEPAY_WAP_TEST_URL + '?' + stringify_data(credential, channel, true);
      } else {
        location.href = cfg.YEEPAY_WAP_URL + '?' + stringify_data(credential, channel, true);
      }
    } else if (channel == channels.wx_pub) {
      var fields = ["appId", "timeStamp", "nonceStr", "package", "signType", "paySign"];
      for (var k = 0; k < fields.length; k++) {
        if (!hasOwn.call(credential, fields[k])) {
          this._innerCallback("fail", this._error("invalid_credential", "missing_field_"+fields[k]));
          return;
        }
      }
      this._jsApiParameters = credential;
      this._callpay();
    } else if (channel == channels.jdpay_wap) {
      form_submit(cfg.JDPAY_WAP_URL, 'post', credential);
    }
  },

  _jsApiCall: function(){
    var self = this;
    if(self._jsApiParameters != {}){
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        self._jsApiParameters,
        function(res){
          if(res.err_msg == 'get_brand_wcpay_request:ok'){
            self._innerCallback("success");
          }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
            self._innerCallback("cancel");
          }else{
            self._innerCallback("fail", self._error("wx_result_fail", res.err_msg));
          }
        }
      );
    }
  },

  _callpay: function(){
    var self = this;
    if (typeof wx != "undefined" && typeof self._signature != "undefined") {
      var wxConfigFailed = false;
      wx.config({
        debug: self._debug,
        appId: self._jsApiParameters["appId"],
        timestamp: self._jsApiParameters["timeStamp"],
        nonceStr: self._jsApiParameters["nonceStr"],
        signature: self._signature,
        jsApiList: ['chooseWXPay']
      });
      wx.ready(function(){
        if (wxConfigFailed) {
          return;
        }
        wx.chooseWXPay({
          timestamp: self._jsApiParameters["timeStamp"],
          nonceStr: self._jsApiParameters["nonceStr"],
          "package": self._jsApiParameters["package"],
          signType: self._jsApiParameters["signType"],
          paySign: self._jsApiParameters["paySign"],
          success: function(res) {
            if (res.errMsg == "chooseWXPay:ok") {
              self._innerCallback("success");
            } else {
              self._innerCallback("fail", self._error("wx_result_fail", res.errMsg));
            }
          },
          cancel: function(res) {
            self._innerCallback("cancel");
          },
          fail: function(res) {
            self._innerCallback("fail", self._error("wx_result_fail", res.errMsg));
          }
        });
      });
      wx.error(function(res){
        wxConfigFailed = true;
        self._innerCallback("fail", self._error("wx_config_error", res.errMsg));
      });
    } else if (typeof WeixinJSBridge == "undefined") {
      function eventCallback(){
        self._jsApiCall();
      }
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', eventCallback, false);
      } else if(document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', eventCallback);
        document.attachEvent('onWeixinJSBridgeReady', eventCallback);
      }
    }else{
      this._jsApiCall();
    }
  },

  _error: function(msg, extra) {
    msg = (typeof msg == "undefined") ? "" : msg;
    extra = (typeof extra == "undefined") ? "" : extra;
    return {
      msg:msg,
      extra:extra
    };
  },

  _innerCallback: function(result, err) {
    if (typeof this._resultCallback == "function") {
      if (typeof err == "undefined") {
        err = this._error();
      }
      this._resultCallback(result, err);
    }
  },

  _testModeNotify: function(charge) {
    var self = this;
    if (charge['channel'] == channels.wx_pub) {
      var dopay = confirm("模拟付款？");
      if (dopay) {
        var request = new XMLHttpRequest();
        request.open('GET', cfg.PINGPP_NOTIFY_URL+charge['id']+'?livemode=false', true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400 && request.responseText == "success"){
            self._innerCallback("success");
          } else {
            var extra = 'http_code:'+request.status+';response:'+request.responseText;
            self._innerCallback("fail", self._error("testmode_notify_fail", extra));
          }
        };
        request.onerror = function() {
          self._innerCallback("fail", self._error("network_err"));
        };
        request.send();
      } else {
        self._innerCallback("cancel");
      }
    } else {
      var params = {
        'ch_id': charge['id'],
        'scheme': 'http',
        'channel': charge['channel']
      };
      if (hasOwn.call(charge, 'order_no')) {
        params['order_no'] = charge['order_no'];
      } else if (hasOwn.call(charge, 'orderNo')) {
        params['order_no'] = charge['orderNo'];
      }
      if (hasOwn.call(charge, 'time_expire')) {
        params['time_expire'] = charge['time_expire'];
      } else if (hasOwn.call(charge, 'timeExpire')) {
        params['time_expire'] = charge['timeExpire'];
      }
      if (hasOwn.call(charge, 'extra')) {
        params['extra'] = encodeURIComponent(JSON.stringify(charge['extra']));
      }
      location.href = cfg.PINGPP_MOCK_URL+'?'+stringify_data(params);
    }
  }
};

function form_submit(url, method, params) {
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", url);

  for (var key in params) {
    if (hasOwn.call(params, key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

function stringify_data(data, channel, urlencode) {
  if (typeof urlencode == "undefined") {
    urlencode = false;
  }
  var output = [];
  for (var i in data) {
    if (channel == "bfb_wap" && i == "url") {
      continue;
    }
    if (channel == "yeepay_wap" && i == "mode") {
      continue;
    }
    output.push(i + '=' + (urlencode ? encodeURIComponent(data[i]) : data[i]));
  }
  return output.join('&');
}

PingppSDK.prototype.payment = PingppSDK.prototype.createPayment;
window.pingpp = new PingppSDK();
// aliases
window.PINGPP_PAY_SDK = window.PINGPP_WX_PUB = window.pingpp;
})();
