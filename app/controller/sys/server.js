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
  /**
  * @summary 获取中间件
  * @description 获取中间件
  * @router get /admin/sys/server/getMiddleware
  * @response 200 baseRes desc
  */
  async getMiddleware() {
    const list = await this.ctx.service.sys.server.getMiddleware();
    this.success(list);
  }
  /**
  * @summary 获取控制器
  * @description 获取控制器
  * @router get /admin/sys/server/getController
  * @response 200 baseRes desc
  */
  async getController() {
    const list = await this.ctx.service.sys.server.getController();
    this.success(list);
  }
  /**
  * @summary 获取控制器方法
  * @description 获取控制器方法
  * @router get /admin/sys/server/getAction
  * @request query integer *c 控制器名称
  * @response 200 baseRes errorCode:0成功
  */
  async getAction() {
    const { c } = this.ctx.query;
    const data = await this.ctx.service.sys.server.getAction(c);
    this.success(data);
  }
}
module.exports = ServerController;
