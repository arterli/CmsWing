const path = require('path');
const Jimp = require('jimp');

module.exports = class extends think.Service {
  // 初始化构造函数
  constructor(...para) {
    super(para);
    // 白名单
    this.suffixs = ['.png', '.jpg'];
    // 边距
    this.edge = {
      right: think.config('ext.attachment.right'),
      bottom: think.config('ext.attachment.bottom'),
      minLeft: think.config('ext.attachment.left'),
      minTop: think.config('ext.attachment.top')
    };
    // 水印路径
    this.markpic = think.config('ext.attachment.mark');
    // 状态
    this.state = think.config('ext.attachment.state');
    this.markpath = '/Users/zzu/Desktop/demo/mark.png';
  }

  // 添加水印
  async mark(imgPath, option) {
    try {
      return this.draw(imgPath);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // 绘制
  async draw(imgPath) {
    // 存在且是图片
    if (think.isFile(imgPath) && in_array(path.extname(imgPath), this.suffixs) && this.state == 1) {
      // 加载资源
      const sourceImg = await this.LoadImage(imgPath);
      this.markpath = await this.GetPath(this.markpic);
      const markImg = await this.LoadImage(this.markpath);
      // 计算水印位置
      const markX = sourceImg.bitmap.width - markImg.bitmap.width - this.edge.right;
      const markY = sourceImg.bitmap.height - markImg.bitmap.height - this.edge.bottom;
      // 判断最小范围
      if (markX < this.edge.minLeft || markY < this.edge.minTop) {
        return false;
      }
      // 绘制水印
      sourceImg
      // 设置绘制的坐标位置，右下角距离 10px
        .mask(markImg, markX, markY)
        // 保存格式会自动识别
        .write(imgPath);
      return false;
    }
    return false;
  }

  // 加载图片
  async LoadImage(path) {
    const deferred = think.defer();
    Jimp.read(path, function(err, lenna) {
      if (err) throw err;
      deferred.resolve(lenna);
    });
    return deferred.promise;
  }

  // 获得水印路径
  async GetPath(pic) {
    const path = await get_pic(pic);
    return `${think.resource}/${path}`;
  }
};
