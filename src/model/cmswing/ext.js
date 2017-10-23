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

  /**
   * 获取 缓存插件信息
   * @param extname
   * @param fields
   * @returns {Promise.<void>}
   */
  async extcache(extname = null, fields = null){
    let data = await think.cache('extcache', () => {
      return this.select();
    });
    if(!think.isEmpty(extname)){
      data = think._.find(data,{ext:extname})
    }
    if(!think.isEmpty(fields) && !think.isEmpty(data)){
      if(fields==='setting'){
        data =think.isEmpty(data[fields])?{}: JSON.parse(data[fields]);
      }else {
        data = data[fields];
      }
    }
    return data;
  }
};
