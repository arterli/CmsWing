/**
 * Created by arter on 2017/7/9.
 */
const moment = require('moment');
moment.locale('zh-cn');
const pagination = require('think-pagination');
const path = require('path');
module.exports = {
  get isMobile() {
    return this.ctx.isMobile;
  },
  moment: moment,
  mtpl(action = this.ctx.action) {
    const c = this.ctx.controller.split('/');
    c.splice((this.ctx.controller.split('/').length - 1), 0, 'mobile');
    return temp = `${c.join('/')}_${action}`;
  },
  para(param) {
    return this.get(param) || this.post(param);
  },
  pagination(data, config = {}) {
    const ops = think.extend({
      desc: true, // show description
      pageNum: 2,
      url: '', // page url, when not set, it will auto generated
      class: 'nomargin', // pagenation extra class
      text: {
        next: '下一页',
        prev: '上一页',
        total: '总数: __COUNT__ , 页数: __PAGE__'
      }}, config);
    return pagination(data, this.ctx, ops);
  },
  get isweixin() {
    let flag = false;
    const agent = this.userAgent.toLowerCase();
    // let key = ["mqqbrowser","micromessenger"];
    const key = ['micromessenger'];
    // 排除 Windows 桌面系统
    if (!(agent.indexOf('windows nt') > -1) || (agent.indexOf('windows nt') > -1 && agent.indexOf('compatible; msie 9.0;') > -1)) {
      // 排除苹果桌面系统
      if (!(agent.indexOf('windows nt') > -1) && !agent.indexOf('macintosh') > -1) {
        for (const item of key) {
          if (agent.indexOf(item) > -1) {
            flag = true;
            break;
          }
        }
      }
    }
    return flag;
  },
  extModel(modelName = '', extName = '', config = this.config('model.mysql'), prefix = 'ext_') {
    const p = this.ctx.controller.split('/');
    extName = think.isEmpty(extName) ? p[1] : extName;
    return think.extModel(modelName, extName, config, prefix);
  },
  extService(name = '', ser = '', ...args) {
    const p = this.ctx.controller.split('/');
    ser = think.isEmpty(ser) ? p[1] : ser;
    return think.extService(name, ser, ...args);
  },
  extDisplay(p = this.ctx.action, m = '') {
    // console.log(this.ctx.controller);
    const c = this.ctx.controller.split('/');
    if (p === 'm' || !think.isEmpty(m)) {
      if (p === 'm') p = this.ctx.action;
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'ext', c[1], 'view', 'mobile', c[2]);
      return this.display(`${pp}_${p}`);
    } else {
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'ext', c[1], 'view', 'pc', c[2]);
      return this.display(`${pp}_${p}`);
    }
  },
  modModel(modelName = '', extName = '', config = this.config('model.mysql'), prefix = '') {
    let p = this.ctx.controller.split('/');
    if (this.ctx.controller === 'cmswing/route' || this.ctx.controller === 'cmswing/modadminbase') {
      p = `mod/${this.mod.name}/index`.split('/');
    }
    extName = think.isEmpty(extName) ? p[1] : extName;
    return think.modModel(modelName, extName, config, prefix);
  },
  modService(name = '', ser = '', ...args) {
    let p = this.ctx.controller.split('/');
    if (this.ctx.controller === 'cmswing/route' || this.ctx.controller === 'cmswing/modadminbase') {
      p = `mod/${this.mod.name}/index`.split('/');
    }
    ser = think.isEmpty(ser) ? p[1] : ser;
    return think.modService(name, ser, ...args);
  },
  async hook(hooks, ...args) {
    try {
      const h = await this.model('cmswing/hooks').hookscache(hooks);
      if (!think.isEmpty(h.ext)) {
        const ext = h.ext.split(',');
        const hookarr = [];
        for (const c of ext) {
          // 查询插件状态
          const status = await this.extConfig(c, 'status');
          if (Number(status) === 1) {
            const ep = `ext/${c}/hooks`;
            const Cls = this.controller(ep);
            if (Number(h.type) === 1) {
              hookarr.push(await Cls[hooks](...args));
            } else {
              return Cls[hooks](...args);
            }
          } else {
            const models = await this.model('cmswing/model').get_model(null, null, {name: c});
            // console.log(models);
            if (!think.isEmpty(models)) {
              const ep = `mod/${c}/hooks`;
              const Cls = this.controller(ep);
              if (Number(h.type) === 1) {
                hookarr.push(await Cls[hooks](...args));
              } else {
                return Cls[hooks](...args);
              }
            }
          }
        }

        const type = think._.last(args);
        if (think.isObject(type) && !think.isEmpty(type.$hook_key) && !think.isEmpty(type.$hook_type)) {
          const cachehook = await think.cache(`hooks_${hooks}${type.$hook_type}${this.cookie('thinkjs')}`);
          const hookobj = think.isEmpty(cachehook) ? {} : cachehook;
          if (!think.isEmpty(hookarr)) {
            hookobj[type.$hook_key] = hookarr.join('');
          }
          await think.cache(`hooks_${hooks}${type.$hook_type}${this.cookie('thinkjs')}`, hookobj);
          return this.assign(`HOOKS@${hooks}@${type.$hook_type}`, await think.cache(`hooks_${hooks}${type.$hook_type}${this.cookie('thinkjs')}`));
        }
        if (think.isObject(type) && !think.isEmpty(type.$hook_type)) {
          return this.assign(`HOOK@${hooks}@${type.$hook_type}`, hookarr.join(''));
        }
        if (think.isObject(type) && !think.isEmpty(type.$hook_key)) {
          const hookobj = think.isEmpty(await think.cache(`hooks_${hooks}${this.cookie('thinkjs')}`)) ? {} : await think.cache(`hooks_${hooks}${this.cookie('thinkjs')}`);
          if (!think.isEmpty(hookarr)) {
            hookobj[type.$hook_key] = hookarr.join('');
          }
          await think.cache(`hooks_${hooks}${this.cookie('thinkjs')}`, hookobj);
          return this.assign(`HOOKS@${hooks}`, await think.cache(`hooks_${hooks}${this.cookie('thinkjs')}`));
        }
        this.assign(`HOOK@${hooks}`, hookarr.join(''));
      }
    } catch (e) {
      think.logger.error(e);
    }
  },
  async extConfig(extname, key) {
    return await this.model('cmswing/ext').extcache(extname, key);
  }
};
