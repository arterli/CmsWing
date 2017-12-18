var images = require('images');
var path = require('path');

module.exports = class extends think.Service {
  // 初始化构造函数
  constructor(...para) {
    super(para);
    // 白名单
    this.suffixs = ['png', 'jpg'];
    // 边距
    this.edge = {
      right: 10,
      bottom: 10,
      minLeft: 100,
      minTop: 100
    };
    // 水印路径
    this.markpath = '/Users/zzu/Desktop/demo/mark.png';
  }

  // 添加水印
  mark(imgPath, option) {
    try {
      return this.draw(imgPath);
    } catch (e) {
      return false;
    }
  }

  // 绘制
  draw(imgPath) {
    // 存在且是图片
    if (think.isFile(imgPath) && in_array(path.extname(imgPath), this.suffixs)) {
      // 加载资源
      const sourceImg = images(imgPath);
      const markImg = images(this.markpath);
      // 计算水印位置
      const markX = sourceImg.width() - markImg.width() - this.edge.right;
      const markY = sourceImg.height() - markImg.height() - this.edge.bottom;
      // 判断最小范围
      if (markX < this.edge.minLeft || markY < this.edge.minTop) {
        return false;
      }
      // 绘制水印
      images(sourceImg)
      // 设置绘制的坐标位置，右下角距离 10px
        .draw(markImg, markX, markY)
        // 保存格式会自动识别
        .save(imgPath);
    }
    return true;
  }
};
