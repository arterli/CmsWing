// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const path = require('path');
const fs = require('fs');
module.exports = class extends think.Controller {
  async __before() {
    // 登陆验证
    const is_login = await this.islogin();
    if (!is_login) {
      return this.fail('非法操作!');
    }
  }
  /**
     * 判断是否登录
     * @returns {boolean}
     */
  async islogin() {
    // 判断是否登录
    const user = await this.session('userInfo');
    const res = think.isEmpty(user) ? false : user.uid;
    return res;
  }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    // auto render template file index_index.html
    return this.display();
  }
  // 上传文件
  async uploadAction() {
    const file = think.extend({}, this.file('file'));
    // console.log(file);
    const filepath = file.path;
    const extname = path.extname(file.name);
    const basename = path.basename(filepath) + extname;
    let data;
    // 强势插入七牛
    if (this.config('setup.IS_QINIU') == 1) {
      const qiniu = this.service('qiniu');
      const uppic = await qiniu.uploadpic(filepath, basename);
      // console.log(uppic);
      // { fieldName: 'file',
      //     originalFilename: '2015-07-06_BaiduPlayerNetSetup_100.exe',
      //     path: '/Users/Arterli/Projects/CmsWing/runtime/upload/EPKRrpZvCsSV73J-7kuDiiEY.exe',
      //     headers:
      //     { 'content-disposition': 'form-data; name="file"; filename="2015-07-06_BaiduPlayerNetSetup_100.exe"',
      //         'content-type': 'application/x-msdownload' },
      //     size: 1292280 }
      if (!think.isEmpty(uppic)) {
        data = {
          create_time: new Date().getTime(),
          name: file.name,
          savename: basename,
          mime: file.type,
          size: file.size,
          location: 1,
          sha1: uppic.hash,
          md5: think.md5(basename)
        };
      }
      // return false;
    } else {
      const uploadPath = think.resource + '/upload/download/' + dateformat('Y-m-d', new Date().getTime());
      think.mkdir(uploadPath);
      fs.renameSync(filepath, uploadPath + '/' + basename);
      file.path = uploadPath + '/' + basename;
      if (think.isFile(file.path)) {
        data = {
          savepath: '/upload/download/' + dateformat('Y-m-d', new Date().getTime()) + '/',
          create_time: new Date().getTime(),
          name: file.name,
          savename: basename,
          mime: file.type,
          size: file.size,
          md5: think.md5(basename)
        };
      }
    }
    // console.log(data);
    var res = await this.model('file').add(data);
    return this.json({id: res, size: file.size});
  }

  // 上传图片
  async uploadpicAction() {
    const file = think.extend({}, this.file('file'));
    // console.log(file);
    const filepath = file.path;
    const extname = path.extname(file.name);
    const basename = path.basename(filepath) + extname;
    // console.log(basename);
    const ret = {'status': 1, 'info': '上传成功', 'data': ''};
    let res;
    // 加入七牛接口
    if (this.config('setup.IS_QINIU') == 1) {
      const qiniu = this.service('qiniu');
      const uppic = await qiniu.uploadpic(filepath, basename);
      if (!think.isEmpty(uppic)) {
        const data = {
          create_time: new Date().getTime(),
          status: 1,
          type: 2,
          sha1: uppic.hash,
          path: uppic.key

        };
        res = await this.model('picture').add(data);
      }
    } else {
      const uploadPath = think.resource + '/upload/picture/' + dateformat('Y-m-d', new Date().getTime());
      think.mkdir(uploadPath);
      if (think.isFile(filepath)) {
        fs.renameSync(filepath, uploadPath + '/' + basename);
      } else {
        console.log('文件不存在！');
      }
      file.path = uploadPath + '/' + basename;
      if (think.isFile(file.path)) {
        const data = {
          path: '/upload/picture/' + dateformat('Y-m-d', new Date().getTime()) + '/' + basename,
          create_time: new Date().getTime(),
          status: 1

        };
        res = await this.model('picture').add(data);
      } else {
        console.log('not exist');
      }
    }

    this.json(res);
  }
  // 上传多图
  picsAction() {
    const file = think.extend({}, this.file('file'));
    console.log(file);
  }
  // 图片选择
  async selectpicAction() {
    const pics = await this.model('picture').limit(2, 15).select();
    this.assign('pics', pics);
    this.assign('field', {'name': 'uploadimg'});
    this.display();
  }

  // 链接选择
  selecturlAction() {
    this.assign('articles', [1, 2, 3, 4, 5, 6]);
    this.display();
  }

  async savenetpicAction() {
    // 抓取远程图片
    /* 上传配置 */
    this.config = this.config('ueditor');
    const config = {
      'pathFormat': this.config['catcherPathFormat'],
      'maxSize': this.config['catcherMaxSize'],
      'allowFiles': this.config['catcherAllowFiles'],
      'oriName': 'remote.png'
    };
    const fieldName = this.config['catcherFieldName'];
    const urlstr = this.post('picurl');
    const up = think.adapter('editor', 'ueditor'); // 加载名为 ueditor 的 editor Adapter
    const upload = new up(urlstr, config, 'remote'); // 实例化 Adapter
    const info = await upload.saveRemote();
    // console.log(info);
    // let obj = {"state":"SUCCESS","url":info.url,"size":431521,"title":info.title,"original":info.original,"source":imgUrl};
    const data = {
      path: info.url,
      create_time: new Date().getTime(),
      status: 1
    };
    const res = await this.model('picture').add(data);
    if (res) {
      data.id = res;
      return this.json(data);
    } else {
      return this.json({'status': 0});
    }
  }

  // 根据图片id获取图片信息
  async getpicAction() {
    const id = this.post('id');
    // let pic = await this.model("picture").where({"id":parseInt(this.post("id"))}).find();
    const pic = await get_cover(id);
    this.end(pic);
  }
  // 获取七牛token
  async getqiniuuptokenAction() {
    const qiniu = this.service('qiniu');
    const key = think.uuid();
    const uptoken = await qiniu.uploadpic(null, key, true);
    this.json({
      'uptoken': uptoken
    });
  }
  // 添加
  async qiniuaddAction() {
    const post = this.post();
    const data = {
      create_time: new Date().getTime(),
      name: post.key,
      savename: post.key,
      mime: post.mime,
      size: post.size,
      location: 1,
      sha1: post.hash,
      md5: think.md5(post.id)
    };
    // console.log(data);
    const res = await this.model('file').add(data);
    return this.json(res);
  }
  // 删除七牛资源
  async delqiniufileAction() {
    const id = this.get('id');
    const file = await this.model('file').find(id);
    const qiniu = this.service('qiniu');
    const res = await qiniu.remove(file.savename);
    if (res) {
      this.model('file').where({id: id}).delete();
      return this.success({name: '删除文件成功!'});
    } else {
      return this.fail('删除文件失败!');
    }
  }
};
