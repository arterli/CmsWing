// hooks
const Os = require('os');
module.exports = class extends think.cmswing.extIndex {
  /**
   * 实现的AdminIndex钩子方法
   * 【视图】
   * @param ...val
   */
  async AdminIndex(...val) {
    // 钩子业务处理
    const mysqlv = await this.model('mysql').query('select version()');

    const node = process.versions;
    this.assign({
      'version': think.cmswing.info.version,
      'OS': Os.type(),
      'nodejs_v': node.node,
      'thinkjs': think.version,
      'mysqlv': mysqlv[0]['version()']
    });
    // console.log(mysqlv);
    // return this.body=mysqlv[0]['version()'];
    const html = await this.hookRender('AdminIndex', 'sysinfo');
    return html;
  }
};
