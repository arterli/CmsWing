'use strict';
const Service = require('egg').Service;
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

}
module.exports = serverService;
