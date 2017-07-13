(function(){
var
  version = "2.0.8",
  hasOwn = {}.hasOwnProperty,
  PingppSDK = function(){},
  cfg = {
    PINGPP_NOTIFY_URL: 'https://api.pingxx.com/notify/charges/',
    PINGPP_MOCK_URL: 'http://sissi.pingxx.com/mock.php',
    ALIPAY_PC_DIRECT_URL: 'https://mapi.alipay.com/gateway.do',
    UPACP_PC_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
    CP_B2B_URL: 'https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0'
  },
  channels = {
    alipay_pc_direct: 'alipay_pc_direct',
    upacp_pc: 'upacp_pc',
    cp_b2b: 'cp_b2b'
  };

PingppSDK.prototype = {

  version: version,

  _resultCallback: undefined,

  _debug: false,

  createPayment: function(charge_json, callback, debug) {
    if (typeof callback == "function") {
      this._resultCallback = callback;
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
    if (channel == channels.upacp_pc) {
      form_submit(cfg.UPACP_PC_URL, 'post', credential);
    } else if (channel == channels.alipay_pc_direct) {
      if (!hasOwn.call(credential, "_input_charset")) {
        credential["_input_charset"] = 'utf-8';
      }
      var query = stringify_data(credential, channel, true);
      window.location.href = cfg.ALIPAY_PC_DIRECT_URL + "?" + query;
    } else if (channel == channels.cp_b2b) {
      form_submit(cfg.CP_B2B_URL, 'post', credential);
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
window.pingppPc = new PingppSDK();
})();
