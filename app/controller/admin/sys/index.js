'use strict';
const Controller = require('../../../core/base_controller');
class IndexController extends Controller {
  async index() {
    this.success(1);
  }
}
module.exports = IndexController;
