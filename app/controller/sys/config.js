/* eslint-disable jsdoc/check-tag-names */
'use strict';
const fs = require('fs/promises');
const path = require('path');
const Controller = require('../../core/base_controller');
class ConfigController extends Controller {
  // 获取对象储存配置
  /**
  * @summary 获取系统配置
  * @description 获取系统配置
  * @router get /admin/sys/config/info
  * @response 200 baseRes desc
  */
  async info() {
    this.success(this.config.sys);
  }
  /**
  * @summary 修改系统配置
  * @description 修改系统配置
  * @router post /admin/sys/config/edit
  * @response 200 baseRes desc
  */
  async edit() {
    const data = this.ctx.request.body;
    if (!data) return this.fail('参数不正确');
    const dataStr = `'use strict';
// eslint-disable-next-line eol-last, object-curly-spacing, quotes, quote-props, key-spacing, comma-spacing
module.exports = ${JSON.stringify(data)};`;
    // console.log(dataStr);
    const appDir = path.join(this.app.baseDir, 'config');
    const fileName = 'sys.config.js';
    const file = path.join(appDir, fileName);
    try {
      const data = new Uint8Array(Buffer.from(dataStr));
      await fs.writeFile(file, data);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
    this.success(1);
  }
}
module.exports = ConfigController;
