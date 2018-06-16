// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const path = require('path');
const fs = require('fs');
const superagent = require('superagent');
module.exports = class extends think.Service {
  /**
     * init
     * @return {[]}         []
     */
  constructor(fileField, config, type, http) {
    super(http);
    type = type || 'upload';
    // super.init(http);
    this.http = http;
    this.fileField = fileField;
    this.config = config;
    this.type = type;
    // console.log(fileField);
    // console.log(http);
    // if (type === 'remote') {
    //   // this.saveRemote();
    // } else if (type === 'base64') {
    //   this.upBase64();
    // } else {
    //   this.upFile();
    // }
  }
  async up() {
    if (this.type === 'base64') {
      this.upBase64();
    } else {
      await this.upFile();
    }
  }
  /**
     * 上传文件的主处理方法
     * @return mixed
     */
  async upFile() {
    const http = this.http;
    const file = http.file(this.fileField);
    console.log(file);
    if (!think.isFile(file.path)) {
      this.stateInfo = '找不到临时文件';
      return;
    }

    this.oriName = file.name;
    this.fileSize = file.size;
    this.fileType = this.getFileExt;
    this.fullName = this.getFullName;
    this.filePath = this.getFilePath;
    this.fileName = this.getFileName;
    think.mkdir(this.filePath.replace(this.fileName, ''));
    // 检查文件大小是否超出限制
    if (!this.checkSize) {
      this.stateInfo = '文件大小超出网站限制';
      return;
    }
    // 检查是否不允许的文件格式
    if (!this.checkType) {
      this.stateInfo = '文件类型不允许';
      return;
    }
    // 移动文件
    try {
      fs.renameSync(file.path, this.filePath);
    } catch (err) {
      await this.streamup(file.path, this.filePath);
    }
    // 添加水印
    if (this.config.mark == true) {
      const mark = think.extService('mark', 'attachment');
      mark.mark(this.filePath);
    }
    if (think.isFile(this.filePath)) {
      this.stateInfo = 'SUCCESS';
    } else {
      this.stateInfo = '文件保存时出错';
    }
  }
  /**
     * 处理base64编码的图片上传
     * @return mixed
     */
  upBase64() {
    const http = this.http;
    const base64Data = http.post(this.fileField);
    // console.log(base64Data);
    const img = Buffer.from(base64Data, 'base64');
    // console.log(img);
    this.oriName = this.config['oriName'];
    // console.log(this.oriName);
    this.fileSize = img.length;
    this.fileType = this.getFileExt;
    this.fullName = this.getFullName;
    this.filePath = this.getFilePath;
    this.fileName = this.getFileName;
    think.mkdir(this.filePath.replace(this.fileName, ''));

    // 检查文件大小是否超出限制
    // if (!this.checkSize()) {
    //  this.stateInfo = "文件大小超出网站限制";
    //  return;
    // }
    /// /检查是否不允许的文件格式
    // if (!this.checkType()) {
    //  this.stateInfo = "文件类型不允许";
    //  return;
    // }
    // 移动文件
    // fs.renameSync(img, this.filePath);
    fs.writeFileSync(this.filePath, img);
    // 添加水印
    if (this.config.mark == true) {
      const mark = think.extService('mark', 'attachment');
      mark.mark(this.filePath);
    }
    if (think.isFile(this.filePath)) {
      this.stateInfo = 'SUCCESS';
    } else {
      this.stateInfo = '文件保存时出错';
    }
  }
  // 使用stream 移动文件解决跨盘问题
  streamup(filepath, newpath) {
    const defer = think.defer();
    const readStream = fs.createReadStream(filepath);
    const writeStream = fs.createWriteStream(newpath);
    readStream.pipe(writeStream);
    readStream.on('end', () => {
      defer.resolve('1');
    });
    return defer.promise;
  }
  spiderImage(imgUrl, filePath) {
    const deferred = think.defer();
    superagent
      .get(imgUrl) // 这里的URL也可以是绝对路径
      .end(function(req, res) {
        fs.writeFileSync(filePath, res.body);
        deferred.resolve(filePath);
      });
    return deferred.promise;
  }
  /**
     * 拉取远程图片
     * @return mixed
     */
  async saveRemote() {
    // think.log("dddddd")
    const imgUrl = this.fileField;
    // imgUrl = imgUrl.replace(/&amp;/,"&");
    // http开头验证
    if (imgUrl.indexOf('http') !== 0) {
      this.stateInfo = '链接不是http链接';
      return;
    }
    // TODO 各种验证后面弄
    const m = imgUrl.match(/[\/]([^\/]*)[\.]?[^\.\/]*$/)[1];
    this.oriName = m || '';
    // console.log(this.oriName);
    this.fileSize = imgUrl.length;// TODO 这里有问题，后面弄
    this.fileType = this.getFileExt;
    this.fullName = this.getFullName;
    this.filePath = this.getFilePath;
    this.fileName = this.getFileName;
    const filePath = this.filePath;
    const fullName = this.fullName;
    think.mkdir(this.filePath.replace(this.fileName, ''));
    const promises = await this.spiderImage(imgUrl, filePath);
    // console.log(promises);
    if (think.isFile(promises)) {
      this.stateInfo = 'SUCCESS';
    } else {
      this.stateInfo = '文件保存时出错';
    }
    return {
      'state': this.stateInfo,
      'url': this.fullName,
      'title': this.fileName,
      'original': this.oriName,
      'type': this.fileType,
      'size': this.fileSize
    };
  }

  /**
     * 获取文件扩展名
     * @return string
     */
  get getFileExt() {
    return path.extname(this.oriName);
  }

  /**
     * 重命名文件
     * @return string
     */
  get getFullName() {
    // 替换目录日期事件
    /// ueditor/php/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}
    var self = this;
    // var filename= this.filed;
    var format = this.config.pathFormat;
    var d = new Date();
    var t = d.getTime();
    var date = {};
    date.yyyy = d.getFullYear();
    date.mm = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    date.dd = (d.getDate() < 10 ? '0' : '') + d.getDate();
    format = format.replace('{yyyy}', date.yyyy);
    format = format.replace('{mm}', date.mm);
    format = format.replace('{dd}', date.dd);
    format = format.replace('{time}', t);
    // 计算随机数
    var str = format.match(/\{rand\:[\d]*\}/i);
    var index = str[0].search(/:/) + 1;
    index = str[0].charAt(index);
    var rand = Math.random();
    rand = rand.toString();
    rand = rand.substr(2, index);
    // 替换随机数
    format = format.replace(str[0], rand);
    var ext = this.getFileExt;
    return format + ext;
  }

  /**
     * 获取文件完整路径
     * @return string
     */
  get getFilePath() {
    if (this.fullName.substr(0, 1) != '/') {
      this.fullName = '/' + this.fullName;
    }

    return think.resource + this.fullName;
  }
  /**
     * 获取文件名
     * @return string
     */
  get getFileName() {
    return path.basename(this.filePath);
  }

  /**
     * 文件类型检测
     * @return bool
     */
  get checkType() {
    return think._.includes(this.config['allowFiles'], this.getFileExt);
  }

  /**
     * 文件大小检测
     * @return bool
     */
  get checkSize() {
    return this.fileSize <= (this.config['maxSize']);
  }
  /**
     * 获取当前上传成功文件的各项信息
     * @return array
     */
  get getFileInfo() {
    return {
      'state': this.stateInfo,
      'url': this.fullName,
      'title': this.fileName,
      'original': this.oriName,
      'type': this.fileType,
      'size': this.fileSize
    };
  }
};
