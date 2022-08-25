'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    this.ctx.body = {
      status: 0,
      msg: 'ok',
      data,
    };
  }
  fail(msg, errorCode = 1000, data) {
    this.ctx.body = {
      status: errorCode,
      msg,
      data,
    };
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
