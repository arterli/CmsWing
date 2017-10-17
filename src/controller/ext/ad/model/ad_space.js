module.exports = class extends think.Model {
  get pk() {
    return 'spaceid';
  }
  /**
     * 更新广告
     *
     * @param spaceid 广告位id
     * @returns {Promise.<void>}
     */

  async upad(spaceid) {
    // 获取广告模板
    let json, replace = [], adtemp = '', info, setting;
    const space = await this.find({where: {spaceid: spaceid}});
    const temp = await this.model('ext_ad_temp').find({where: {name: space.type}});
    // console.log(temp);
    const match = temp.temp.match(/\[(\S+?)\]/g);
    if (!think.isEmpty(match)) {
      if (temp.num == 1 && temp.option == 0) {
        info = await this.model('ext_ad').where({spaceid: space.spaceid, status: 1}).order('sort ASC,addtime DESC').find();
        if (!think.isEmpty(info.setting)) {
          setting = JSON.parse(info.setting);
          setting[0].width = space.width;
          setting[0].height = space.height;
          json = JSON.stringify(setting[0]);
          for (let val of match) {
            val = val.replace(/(^\[)|(\]$)/g, '');
            const param = val.split('|');
            // console.log(param);
            if (param[0] === 'url') {
              if (think.isEmpty(setting[0].url)) {
                replace.push('javascript:void(0)');
              } else {
                replace.push(setting[0][param[0]]);
              }
            } else if (!think.isEmpty(param[1])) {
              replace.push(await call_user_func(param[1], setting[0][param[0]]));
            } else {
              replace.push(setting[0][param[0]]);
            }
          }
          adtemp = str_replace(match, replace, temp.temp);
        } else {

        }
      } else if (temp.num == 1 && temp.option == 1) {
        info = await this.model('ext_ad').where({spaceid: space.spaceid, status: 1}).order('sort ASC,addtime DESC').select();
        const loop = temp.temp.match(/\{loop\}([\S\s]*?){\/loop\}/);
        // let loop = temp.temp.split("{loop}");
        const loopmatch = loop[1].match(/\[(\S+?)\]/g);
        const looparr = [];
        const jsonarr = [];
        for (const v of info) {
          if (!think.isEmpty(v.setting)) {
            setting = JSON.parse(v.setting);
            setting[0].width = space.width;
            setting[0].height = space.height;
            console.log(setting);
            jsonarr.push(setting[0]);
            json = JSON.stringify(jsonarr);
            const reparr = [];
            for (let val of loopmatch) {
              val = val.replace(/(^\[)|(\]$)/g, '');
              const param = val.split('|');
              // console.log(param);
              if (param[0] == 'url') {
                console.log(22222222222);
                if (think.isEmpty(setting[0].url)) {
                  reparr.push('javascript:void(0)');
                } else {
                  reparr.push(setting[0][param[0]]);
                }
              } else if (!think.isEmpty(param[1])) {
                reparr.push(await call_user_func(param[1], setting[0][param[0]]));
              } else {
                reparr.push(setting[0][param[0]]);
              }
            }
            console.log(reparr);
            const loopstr = str_replace(loopmatch, reparr, loop[1]);
            looparr.push(loopstr);
          }
        }
        // console.log(looparr.join(""));
        adtemp = temp.temp.replace(loop[0], looparr.join(''));
        // console.log(adtemp);
      }
    }
    // 更新本广告位的广告数量
    const items = await this.model('ext_ad').where({spaceid: space.spaceid}).count();
    await this.where({spaceid: space.spaceid}).update({code: adtemp, json: json, items: items});
    // 清除广告缓存
    think.cache('all_ad', null);
  }

  async showad(spaceid) {
    // let list ="22";
    const list = await think.cache('all_ad', () => {
      return this.select();
    }, {timeout: 365 * 24 * 3600});
    // console.log(list);
    if (think.isEmpty(spaceid)) {
      return list;
    } else {
      return think._.filter(list, {spaceid: Number(spaceid)});
    }
  }
};
