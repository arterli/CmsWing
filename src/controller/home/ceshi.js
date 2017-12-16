// ceshi
const fs = require('fs');
module.exports = class extends think.Controller {
  async fetchAction() {
    const res = await this.fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png');
   // console.log(res);
    // const dest = fs.createWriteStream('./octocat.png');
    // res.body.pipe(dest);
    this.header('Content-Type', 'image/png');
    return this.body = res.body;
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
    console.log(parse_config_attr(think.config('ext.attachment.loactionurl'), '@')[1]);
    return this.body = this.config('ext.qq.appkey');
  }
  async hooksAction() {
    // 带 $hook_type 参数的 视图钩子调用， 参数1，参数2，...{'$hook_type':1},如果由多个参数，{'$hook_type':1} 放最后一个。
    await this.hook('adminArticleEdit', '风的撒风的撒风的撒发达富啊222', '的撒风大师傅撒', {'$hook_type': 1});
    // 带 $hook_key 参数的 视图钩子调用， 参数1，参数2，...{'$hook_key':'aaaa'},如果由多个参数，{'$hook_key':'aaaa'} 放最后一个。
    await this.hook('adminArticleEdit', 'aaaa', '的撒风大师傅撒', {'$hook_key': 'aaaa'});
    await this.hook('adminArticleEdit', 'bbbb', '的撒风大师傅撒', {'$hook_key': 'bbbb'});
    // 带 $hook_key 和 $hook_type 参数的 视图钩子调用， 参数1，参数2，...{'$hook_key':'bbbb','$hook_type':2},如果由多个参数，{'$hook_key':'bbbb','$hook_type':2} 放最后一个。
    await this.hook('adminArticleEdit', 'bbbb', '的撒风大师傅撒', {'$hook_key': 'bbbb', '$hook_type': 2});
    // 普通调用
    await this.hook('adminArticleEdit', {'$hook_key2': 'bbbb', '$hook_type2': 2});
    return this.display();
  }
  async cacheAction() {
    const data = await this.model('cmswing/ext').extcache('editor', 'setting');

    // console.log(data);
    return this.body = data;
  }
  async topicsAction() {
    const list = await this.model('document_picture').where({id: ['!=', 311]}).select();
    for (const v of list) {
      const arr = [];
      if (v.pictureurls) {
        for (const vv of v.pictureurls.split(',')) {
          const obj = {};
          obj.id = vv;
          obj.name = vv;
          obj.src = vv;
          obj.info = vv;
          arr.push(obj);
        }
      }
      console.log(arr);
      const data = {atlas: JSON.stringify(arr)};
      await this.model('document_picture').where({id: v.id}).update(data);
    }
    return this.body = 22;
  }
};
