module.exports = class extends think.Model {
  // 前台权限验证
  /**
     *缓存权限列表 all_priv
     * @param catid 要验证的栏目id
     * @param roleid 用户组
     * @param action 权限类型
     * @param is_admin 谁否前台
     * @returns {number} 返回0 或1 0:没权限，1有权限。
     */
  async priv(catid, roleid, action, is_admin = 0, type = true) {
    const list = await think.cache('all_priv', () => {
      return this.select();
    }, {timeout: 365 * 24 * 3600});
    // console.log(list);
    let res = 0;

    const isadd = think._.filter(list, {catid: Number(catid), is_admin: Number(is_admin), action: action});

    if (think.isEmpty(isadd) && type) {
      res = 1;
    } else {
      const priv = think._.filter(isadd, {roleid: Number(roleid)});
      res = priv.length;
    }
    return res;
  }
};
