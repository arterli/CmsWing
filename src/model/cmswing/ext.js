module.exports = class extends think.Model {
  get pk() {
    return 'ext';
  }
  // 获取插件配置
  async getset(extname = false) {
    const ext = await this.select();
    const extset = {};
    let sets = {};
    for (const v of ext) {
      if (!think.isEmpty(v.setting)) {
        sets = JSON.parse(v.setting);
      } else {
        sets.setting = {};
      }
      extset[v.ext] = sets;
    }
    return extname ? extset[extname] : extset;
  }
};
