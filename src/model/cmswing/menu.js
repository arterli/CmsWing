module.exports = class extends think.Model {
  async adminmenu() {
    const menu = await think.cache('adminenu', () => {
      return this.getallmenu();
    }, {timeout: 365 * 24 * 3600});

    return menu;
  }
  // 获取后台全部菜单
  async getallmenu(uid, is_admin) {
    const where = {};
    where.hide = 0;
    if (think.config('setup.DEVELOP_MODE')==1) { // 是否开发者模式
      where.is_dev = 0;
    }
    const groups = think.config('setup.MENU_GROUP');
    // think.log(group)
    // let pid = await this.topmenu();
    var arr = {};
    for (var v of Object.keys(groups)) {
      // let obj = {}

      where.group = v;
      let menu = [];
      if (where.group != 0) {
        menu = await this.where(where).order('sort asc').select();
      }
      if (!think.isEmpty(menu)) {
        // arr.push(obj[v.id]=menu)
        let nmenu = [];
        // 验证权限，根据权限进行显示控制
        if (!is_admin) {
          for (const m of menu) {
            const auth = think.service('cmswing/rbac', uid);
            const res = await auth.check(m.url);
            // console.log(res);
            if (res) {
              nmenu.push(m);
            }
          }
        } else {
          nmenu = menu;
        }
        arr[v] = arr_to_tree(nmenu, 0);
      }
    }

    // let menu = get_children(menu,0)
    // console.log(menu);
    return arr;
  }
  // 获取顶级菜单
  async topmenu() {
    const where = {};
    where.hide = 0;
    where.pid = 0;
    if (think.config('setup.DEVELOP_MODE')==1) { // 是否开发者模式
      where.is_dev = 0;
    }
    const menu = await this.where(where).order('sort asc').select();
    // console.log(menu);
    return menu;
  }

  // 获取顶级菜单分组
  async group(id) {
    const where = {};
    where.hide = 0;
    where.pid = id;
    if (think.config('setup.DEVELOP_MODE')==1) { // 是否开发者模式
      where.is_dev = 0;
    }
    const groups = await this.where(where).field('group').order('sort asc').select();
    // console.log(menu);
    return groups;
  }
};
