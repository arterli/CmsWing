'use strict';
/**
* @controller admin/sys/server 系统服务
*/
const Controller = require('../../core/base_controller');
class ServerController extends Controller {
  async index() {
    this.success(1);
  }
  /**
  * @summary 重启服务
  * @description 重启服务
  * @router post admin/sys/server/restart
  * @response 200 baseRes desc
  */
  async restart() {
    // await this.ctx.helper.waitTime(2000);
    this.ctx.status = 200;
    this.ctx.set('Content-Type', 'text/plain');
    this.ctx.res.write('🚗服务重启中... \n');
    await this.service.sys.server.restart();
    this.ctx.res.write('🚗关闭服务... \n');
    await this.ctx.helper.waitTime(1500);
    this.ctx.res.write('🚗重新启动服务... \n');
    await this.ctx.helper.waitTime(1000);
    this.ctx.res.end('\n🚗执行成功!!!!!!');
  }
}
module.exports = ServerController;
