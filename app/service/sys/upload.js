'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');
const ObsClient = require('esdk-obs-nodejs');
const path = require('path');
const fs = require('fs/promises');
const fsSync = require('fs');
class cwUploadService extends Service {
  constructor(app) {
    super(app);
    this.con = this.config.upload;
    this.type = this.config.upload.type;
  }
  async upload(body, file) {
    const res = {};
    const type = body.type ? body.type : this.type;
    const config = this.con[type];
    console.log(config);
    const localFile = file.filepath;
    const key = path.basename(localFile);
    const filestat = await fs.stat(localFile);
    res.name = file.filename;
    res.mime = file.mimeType;
    res.size = Math.round(filestat.size / 1024);
    res.location = type;
    if (type === 'local') { // 本地上传
      const exist = fsSync.existsSync(path.join(this.app.baseDir, 'app', 'public', config.path));
      if (!exist) {
        await fs.mkdir(path.join(this.app.baseDir, 'app', 'public', config.path));
      }
      // await fs.rename(localFile, path.join(this.app.baseDir, 'app', 'public', config.path, key));
      await fs.copyFile(localFile, path.join(this.app.baseDir, 'app', 'public', config.path, key));
      res.savename = path.join('public', config.path, key);
      res.hash = this.ctx.helper.cw.cipher(file.filename);
    } else if (type === 'qiniu') { // 七牛上传
      const mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
      const options = {
        scope: config.Bucket,
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken = putPolicy.uploadToken(mac);
      const upconfig = new qiniu.conf.Config();
      const formUploader = new qiniu.form_up.FormUploader(upconfig);
      const putExtra = new qiniu.form_up.PutExtra();
      // 文件上传
      const uploadFile = async () => new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
          respBody, respInfo) {
          if (respErr) {
            reject(respErr);
            throw respErr;
          }
          if (respInfo.statusCode === 200) {
            console.log(respBody);
            resolve(respBody);
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            resolve(respInfo.statusCode);
          }
        });
      });
      try {
        const up = await uploadFile();
        res.savename = up.key;
        res.hash = up.hash;
      } catch (error) {
        return false;
      }
    } else if (type === 'huawei') { // 华为云
      const obsClient = new ObsClient({
        access_key_id: config.access_key_id,
        secret_access_key: config.secret_access_key,
        server: config.server,
      });
      const dconfig = {
        Bucket: config.Bucket,
        Key: key,
        SourceFile: localFile,
      };
      const uploadFile = () => new Promise((resolve, reject) => {
        obsClient.putObject(dconfig, (err, result) => {
          if (err) {
            console.error('Error-->' + err);
            reject(err);
          } else {
            console.log('Status-->' + result.CommonMsg.Status);
            result.key = key;
            resolve(result);
          }
        });
      });
      try {
        const up = await uploadFile();
        res.savename = up.key;
        res.hash = up.CommonMsg.RequestId;
      } catch (error) {
        return false;
      }
    }
    return res;
  }
  // 获取文件地址
  async getFile(info) {
    const type = info.location;
    const config = this.con[type];
    const domain = config.domain;
    return `${domain}/${info.savename}`;
  }
  async edit(data) {
    console.log(data);
    const config = this.config.upload;
    console.log(config);
    const nc = Object.assign(config, data);
    console.log(nc);
    const routerData = `'use strict';
// eslint-disable-next-line eol-last, object-curly-spacing, quotes, quote-props, key-spacing, comma-spacing
module.exports = {upload: ${JSON.stringify(nc)}};`;
    const appDir = path.join(this.app.baseDir, 'config');
    const fileName = 'upload.config.js';
    const file = path.join(appDir, fileName);
    try {
      const data = new Uint8Array(Buffer.from(routerData));
      await fs.writeFile(file, data);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }
  }
}
module.exports = cwUploadService;
