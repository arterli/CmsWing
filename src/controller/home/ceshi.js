// ceshi
const fs = require('fs');
module.exports = class extends think.Controller {
  async fetchAction() {
    //  const res = await this.fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png');
    // const dest = fs.createWriteStream('./octocat.png');
    // res.body.pipe(dest);
    return this.body = 'ccc';
  }
  async donatesAction() {
    return this.body = 'donates';
  }
  async emailAction() {
    const transport = {
      service: 'qq',
      auth: {
        user: 'arterli@qq.com', // your account
        pass: 'vxheoipkldjgbhgi' // authorization code, not the email password
      }
    };
    const options = {
      from: 'arterli@qq.com', // sender address
      to: 'cmswing@126.com', // list of receivers
      subject: 'this is subject', // subject line
      html: '<b>this is HTML content <img src="cid:00000001"/></b>' // html content

    };
    const send = await this.sendEmail(transport, options).then(info => {
      console.log(info);
    }, err => {
      console.log(err);
    });
    console.log(send);
    return this.body = 'emial';
  }

  cookAction() {
    // this.cookie("hz", 'sfs|dfg|fdsfs');
    // $yCode = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
    // $orderSn = $yCode[intval(date('Y')) - 2011] . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
    const d = new Date();
    const ycode = ['C', 'M', 'S', 'W', 'I', 'N', 'G', 'N', 'E', 'T'];
    // return this.body= ycode[this.moment().format('YYYY')-2017]+ (d.getMonth()+1).toString(16).toUpperCase()+this.moment().format('DD')+m.substr(8);
    const m = new Date().getTime().toString();
    return this.body = think._.padEnd('1', 10, '0') + m.substr(8);
  }
  async addAction() {
    const data = { group_id: '0',
      name: '',
      title: 'fdsafsafa',
      description: '',
      type: '2',
      cover_id: '0',
      keyname: '',
      link_id: '0',
      display: '1',
      'date|||deadline': '',
      view: '0',
      comment: '0',
      level: '0',
      'date|||create_time': '',
      bookmark: '0',
      template: '',
      pid: '0',
      topid: '0',
      model_id: '2',
      category_id: '1',
      uid: '1',
      content: '<p>请填写内容...</p>',
      position: 0,
      deadline: 0,
      create_time: 1504000783284,
      update_time: 1504000783284,
      status: 1,
      id: 251 };
    return await this.model('document_ttt').add(data);
  }
  ipAction() {
    return this.body = this.ip;
  }

  async extAction() {
    return this.body = this.config('ext.qq.appkey');
  }
  async hooksAction() {
    const res = await this.hook('signinBefore');
    if (res === 'no') {
      const error = this.controller('cmswing/error');
      return error.noAction('验证码不正确');
    }
    return this.body = 'ddd';
  }
};
