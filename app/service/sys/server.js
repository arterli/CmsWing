'use strict';
const Service = require('egg').Service;
const path = require('path');
const child_process = require('child_process');
class serverService extends Service {
  async restart() {
    if (this.config.env !== 'prod') return '开发环境无需重启服务...';
    return new Promise((resolve, reject) => {
      child_process.exec('npm run stop', (error1, stdout1) => {
        child_process.exec('npm run start', (error, stdout) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(stdout1 + stdout);
        });
      });
    });
  }
  // 获取中间件
  async getMiddleware() {
    const appDir = path.join(this.app.baseDir, 'app', 'middleware');
    const getFiles = await this.ctx.helper.getFiles(appDir);
    const res = [];
    for (const file of getFiles) {
      const obj = {};
      obj.label = file.name;
      obj.value = file.name;
      res.push(obj);
    }
    return res;
  }
  // 获取控制器
  async getController() {
    const appDir = path.join(this.app.baseDir, 'app', 'controller');
    const getFiles = await this.ctx.helper.getFiles(appDir);
    const res = [];
    for (const file of getFiles) {
      const obj = {};
      obj.label = file.name;
      obj.value = file.name;
      res.push(obj);
    }
    return res;
  }
  async getAction(c = '') {
    const cl = c.split('.');
    const clc = cl.length;
    let co = {};
    try {
      if (clc === 1) {
        co = this.app.controller[cl[0]];
      } else if (clc === 2) {
        co = this.app.controller[cl[0]][cl[1]];
      } else if (clc === 3) {
        co = this.app.controller[cl[0]][cl[1]][cl[2]];
      } else if (clc === 4) {
        co = this.app.controller[cl[0]][cl[1]][cl[2]][cl[3]];
      }
    } catch (e) {
      console.log(e);
    }
    const res = [];
    for (const v in co) {
      const obj = {};
      obj.label = v;
      obj.value = v;
      res.push(obj);
    }
    return res;
  }
}
module.exports = serverService;
