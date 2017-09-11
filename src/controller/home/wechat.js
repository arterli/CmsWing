// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const DEFULT_AUTO_REPLY = '功能正在开发中~';
module.exports = class extends think.Controller {
  indexAction() {
    const echostr = this.get('echostr');
    return this.body = echostr;
  }
  // 关键词消息回复
  async textAction() {
    // console.log(this.http);
    const message = this.post();
    // console.log(message);
    const key = message.Content.trim();
    const kmodel = this.model('wx_keywords');
    const isKey = await kmodel.field('rule_id').where({keyword_name: key}).find();
    if (!think.isEmpty(isKey)) {
      // 是关键字
      const rulemodel = this.model('wx_keywords_rule');
      const replyliststr = await rulemodel.where({id: isKey.rule_id}).getField('reply_id', true);
      const replylisttmp = replyliststr.split(',');
      const replylist = [];
      for (const i in replylisttmp) {
        if (replylisttmp[i] != '') {
          replylist.push(replylisttmp[i]);
        }
      }
      if (!think.isEmpty(replylist)) {
        const randomi = parseInt(Math.random() * replylist.length);
        const replymodel = this.model('wx_replylist');
        const data = await replymodel.where({id: replylist[randomi]}).getField('content', true);
        return this.success(data);
      }
    }
    // 普通消息回复
    const replymodel = this.model('wx_replylist');
    const datas = await replymodel.where({reply_type: 2}).order('create_time DESC').select();
    const data = datas[0];
    let content;
    switch (data.type) {
      case 'text':
        content = data.content;
        break;
      case 'news':
        content = JSON.parse(data.content);
        break;
    }
    return this.success(content);
  }

  // 事件关注
  async eventAction() {
    const message = this.post();
    switch (message.Event) {
      case 'subscribe': // 首次关注
        const datas = await this.model('wx_replylist').where({reply_type: 1}).order('create_time DESC').select();
        const data = datas[0];
        let content;
        switch (data.type) {
          case 'text':
            content = data.content;
            break;
          case 'news':
            content = JSON.parse(data.content);
            break;
        }
        this.success(content);
        break;
      case 'unsubscribe':// 取消关注
        // todo
        break;
      case 'CLICK':// click事件坚挺
        const res = await this.model('wx_material').find(message.EventKey);
        const news_item = JSON.parse(res.material_wx_content);
        const list = news_item.news_item;
        for (const v of list) {
          v.picurl = v.thumb_url;
        }
        this.success(list);
        // todo
        break;
      case 'SCAN':// 扫码事件监听
        // todo
        console.log(message);
        break;
      default:
        console.log(message);
        break;
    }
    // this.reply(JSON.stringify(message));
  }
  __call() {
    return this.success(DEFULT_AUTO_REPLY);
  }
};
