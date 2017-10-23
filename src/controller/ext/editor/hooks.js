// hooks
module.exports = class extends think.cmswing.extIndex {
  /**
   * 后台编辑器钩子方法
   * 【视图】
   * @param ...val
   */
  async adminEdit(name, value, type = false) {
    // 钩子业务处理
    const setting = await this.extConfig('editor','setting');
    if (type && !think.isEmpty(type.$hook_type)) {
      const t = type.$hook_type.split('_');
      if (!think.isEmpty(t[0])) {
        setting.type = t[0];
      }
      if (!think.isEmpty(t[1])) {
        setting.wysiwyg = t[1];
      }
      if (!think.isEmpty(t[2])) {
        setting.height = `${t[2]}px`;
      }
    }
    this.assign({
      name: name,
      value: value,
      setting: setting
    });
    const html = await this.hookRender('adminEdit', 'editor');
    return html;
  }
  /**
     * 后台编辑器钩子方法
     * 【视图】
     * @param ...val
     */
  async homeEdit(name, value, type = false) {
      // 钩子业务处理
    const setting = await this.extConfig('editor','setting');
    if (type && !think.isEmpty(type.$hook_type)) {
      const t = type.$hook_type.split('_');
      if (!think.isEmpty(t[0])) {
        setting.type = t[0];
      }
      if (!think.isEmpty(t[1])) {
        setting.wysiwyg = t[1];
      }
      if (!think.isEmpty(t[2])) {
        setting.height = `${t[2]}px`;
      }
    }
    this.assign({
      name: name,
      value: value,
      setting: setting
    });
    const html = await this.hookRender('homeEdit', 'editor');
    return html;
  }

  /**
     * 页面header钩子，一般用于加载插件CSS文件和代码
     * @param name
     * @param value
     * @param type
     * @returns {Promise.<void>}
     */
  async pageHeader(name, value, type = false) {
    // 钩子业务处理
    const setting = await this.extConfig('editor','setting');
    if (type && !think.isEmpty(type.$hook_type)) {
      const t = type.$hook_type.split('_');
      if (!think.isEmpty(t[0])) {
        setting.type = t[0];
      }
      if (!think.isEmpty(t[1])) {
        setting.wysiwyg = t[1];
      }
      if (!think.isEmpty(t[2])) {
        setting.height = `${t[2]}px`;
      }
    }
    this.assign({
      name: name,
      value: value,
      setting: setting
    });
    const html = await this.hookRender('pageHeader', 'editor');
    return html;
  }

  /**
     * 页面footer钩子，一般用于加载插件JS文件和JS代码
     * @param name
     * @param value
     * @param type
     * @returns {Promise.<*>}
     */
  async pageFooter(name, value, type = false) {
    // 钩子业务处理
    const setting = await this.extConfig('editor','setting');
    if (type && !think.isEmpty(type.$hook_type)) {
      const t = type.$hook_type.split('_');
      if (!think.isEmpty(t[0])) {
        setting.type = t[0];
      }
      if (!think.isEmpty(t[1])) {
        setting.wysiwyg = t[1];
      }
      if (!think.isEmpty(t[2])) {
        setting.height = `${t[2]}px`;
      }
    }
    this.assign({
      name: name,
      value: value,
      setting: setting
    });
    const html = await this.hookRender('pageFooter', 'editor');
    return html;
  }

  /**
     *
     * @param name
     * @param value
     * @param type
     * @returns {Promise.<*>}
     */
  async pageContent(name, value, type = false) {
    // 钩子业务处理
    const setting = await this.extConfig('editor','setting');
    if (type && !think.isEmpty(type.$hook_type)) {
      const t = type.$hook_type.split('_');
      if (!think.isEmpty(t[0])) {
        setting.type = t[0];
      }
      if (!think.isEmpty(t[1])) {
        setting.wysiwyg = t[1];
      }
      if (!think.isEmpty(t[2])) {
        setting.height = `${t[2]}px`;
      }
    }
    if (setting.type == 2 && setting.wysiwyg == 1) {
      value = value.split('_ueditor_page_break_tag_');
    }
    this.assign({
      name: name,
      value: value,
      setting: setting
    });
    const html = await this.hookRender('pageContent', 'editor');
    return html;
  }
};
