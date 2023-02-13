'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');
const ObsClient = require('esdk-obs-nodejs');
const OSS = require('ali-oss');
const COS = require('cos-nodejs-sdk-v5');
const path = require('path');
const fs = require('fs/promises');
const fsSync = require('fs');
class objectStorageService extends Service {
  constructor(app) {
    super(app);
    this.con = this.config.objectStorage;
    this.type = this.config.objectStorage.type;
  }
  // 上传接口
  async upload(body, file) {
    const res = {};
    const type = body.type ? body.type : this.type;
    const config = this.con[type];
    console.log(config);
    const localFile = file.filepath;
    let key = path.basename(localFile);
    if (config.path) {
      key = path.join(config.path, key);
    }
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
      await fs.copyFile(localFile, path.join(this.app.baseDir, 'app', 'public', key));
      let keyname = path.basename(localFile);
      if (config.path) {
        keyname = `${config.path}/${keyname}`;
      }
      res.savename = keyname;
      res.url = `${config.domain}/public/${keyname}`;
      res.result = {};
    } else if (type === 'kodo') { // 七牛上传
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
        const result = await uploadFile();
        res.savename = result.key;
        res.url = `${config.domain}/${result.key}`;
        res.result = result;
      } catch (error) {
        return false;
      }
    } else if (type === 'obs') { // 华为云

      const obsClient = new ObsClient({
        access_key_id: config.AccessKey,
        secret_access_key: config.SecretKey,
        server: `https://obs.${config.Region}.myhuaweicloud.com`,
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
        const result = await uploadFile();
        res.savename = result.key;
        res.url = `${config.domain}/${result.key}`;
        res.result = result;
      } catch (error) {
        return false;
      }
    } else if (type === 'oss') { // 阿里云oss
      const client = new OSS({
        // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: config.Region,
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: config.AccessKey,
        accessKeySecret: config.SecretKey,
        // 填写Bucket名称。
        bucket: config.Bucket,
      });
      try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        const result = await client.put(key, path.normalize(localFile)
        // 自定义headers
        // ,{headers}
        );
        // console.log(result);
        res.savename = result.name;
        res.url = `${config.domain}/${result.name}`;
        res.result = result;
      } catch (e) {
        console.log(e);
      }
    } else if (type === 'cos') { // 腾讯云上传
      // SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
      const cos = new COS({
        SecretId: config.AccessKey,
        SecretKey: config.SecretKey,
      });
      const uploadFile = () => new Promise((resolve, reject) => {
        cos.uploadFile({
          Bucket: config.Bucket, /* 填入您自己的存储桶，必须字段 */
          Region: config.Region, /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: key, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          FilePath: localFile, /* 必须 */
          SliceSize: 1024 * 1024 * 500, /* 触发分块上传的阈值，超过500MB使用分块上传，非必须 */
          onTaskReady(taskId) { /* 非必须 */
            console.log(taskId);
          },
          onProgress(progressData) { /* 非必须 */
            console.log(JSON.stringify(progressData));
          },
          onFileFinish(err, data, options) { /* 非必须 */
            console.log(options.Key + '上传' + (err ? '失败' : '完成'));
          },
        }, function(err, data) {
          console.log(err || data);
          if (err) {
            console.error('Error-->' + err);
            reject(err);
          } else {
            console.log('Status-->' + data);
            data.key = key;
            resolve(data);
          }
        });
      });
      try {
        const result = await uploadFile();
        // console.log(result);
        res.savename = result.key;
        res.url = `${config.domain}/${result.key}`;
        res.result = result;
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
module.exports = objectStorageService;
