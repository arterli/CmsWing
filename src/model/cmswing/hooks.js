module.exports = class extends think.Model {
  /**
   * 获取 缓存插件信息
   * @param extname
   * @param fields
   * @returns {Promise.<void>}
   */
  async hookscache(hook = null, key = null){
    let data = await think.cache('hookscache', () => {
      return this.select();
    });
    if (!think.isEmpty(hook)) {
      data = think._.find(data, {name: hook});
    }
    if (!think.isEmpty(key) && !think.isEmpty(data)){
      if (key === 'ext'){
        data = think.isEmpty(data[key]) ? [] : data[key].split(',');
      } else {
        data = data[key];
      }
    }

    return data;
  }
};
