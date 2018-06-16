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
  async indexAction() {
    // auto render template file index_index.html
    this.config = {
      /* 上传图片配置项 */
      'imageActionName': 'uploadimage', /* 执行上传图片的action名称 */
      'imageFieldName': 'upfile', /* 提交的图片表单名称 */
      'imageMaxSize': 2048000, /* 上传大小限制，单位B */
      'imageAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], /* 上传图片格式显示 */
      'imageCompressEnable': true, /* 是否压缩图片,默认是true */
      'imageCompressBorder': 1600, /* 图片压缩最长边限制 */
      'imageInsertAlign': 'none', /* 插入的图片浮动方式 */
      'imageUrlPrefix': '', /* 图片访问路径前缀 */
      'imagePathFormat': '/upload/editor/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
      /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
      /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
      /* {time} 会替换成时间戳 */
      /* {yyyy} 会替换成四位年份 */
      /* {yy} 会替换成两位年份 */
      /* {mm} 会替换成两位月份 */
      /* {dd} 会替换成两位日期 */
      /* {hh} 会替换成两位小时 */
      /* {ii} 会替换成两位分钟 */
      /* {ss} 会替换成两位秒 */
      /* 非法字符 \ : * ? " < > | */
      /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */

      /* 涂鸦图片上传配置项 */
      'scrawlActionName': 'uploadscrawl', /* 执行上传涂鸦的action名称 */
      'scrawlFieldName': 'upfile', /* 提交的图片表单名称 */
      'scrawlPathFormat': '/upload/editor/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
      'scrawlMaxSize': 2048000, /* 上传大小限制，单位B */
      'scrawlUrlPrefix': '', /* 图片访问路径前缀 */
      'scrawlInsertAlign': 'none',

      /* 截图工具上传 */
      'snapscreenActionName': 'uploadimage', /* 执行上传截图的action名称 */
      'snapscreenPathFormat': '/upload/editor/image/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
      'snapscreenUrlPrefix': '', /* 图片访问路径前缀 */
      'snapscreenInsertAlign': 'none', /* 插入的图片浮动方式 */

      /* 抓取远程图片配置 */
      'catcherLocalDomain': ['127.0.0.1', 'localhost', 'img.baidu.com'],
      'catcherActionName': 'catchimage', /* 执行抓取远程图片的action名称 */
      'catcherFieldName': 'source', /* 提交的图片列表表单名称 */
      'catcherPathFormat': '/upload/editor/image/catcher/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
      'catcherUrlPrefix': '', /* 图片访问路径前缀 */
      'catcherMaxSize': 2048000, /* 上传大小限制，单位B */
      'catcherAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], /* 抓取图片格式显示 */

      /* 上传视频配置 */
      'videoActionName': 'uploadvideo', /* 执行上传视频的action名称 */
      'videoFieldName': 'upfile', /* 提交的视频表单名称 */
      'videoPathFormat': '/upload/editor/video/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
      'videoUrlPrefix': '', /* 视频访问路径前缀 */
      'videoMaxSize': 102400000, /* 上传大小限制，单位B，默认100MB */
      'videoAllowFiles': [
        '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
        '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid'], /* 上传视频格式显示 */

      /* 上传文件配置 */
      'fileActionName': 'uploadfile', /* controller里,执行上传视频的action名称 */
      'fileFieldName': 'upfile', /* 提交的文件表单名称 */
      'filePathFormat': '/upload/editor/file/{yyyy}{mm}{dd}/{time}{rand:6}', /* 上传保存路径,可以自定义保存路径和文件名格式 */
      'fileUrlPrefix': '', /* 文件访问路径前缀 */
      'fileMaxSize': 51200000, /* 上传大小限制，单位B，默认50MB */
      'fileAllowFiles': [
        '.png', '.jpg', '.jpeg', '.gif', '.bmp',
        '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
        '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid',
        '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso',
        '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml'
      ], /* 上传文件格式显示 */

      /* 列出指定目录下的图片 */
      'imageManagerActionName': 'listimage', /* 执行图片管理的action名称 */
      'imageManagerListPath': '/upload/editor/image/', /* 指定要列出图片的目录 */
      'imageManagerListSize': 20, /* 每次列出文件数量 */
      'imageManagerUrlPrefix': '', /* 图片访问路径前缀 */
      'imageManagerInsertAlign': 'none', /* 插入的图片浮动方式 */
      'imageManagerAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], /* 列出的文件类型 */

      /* 列出指定目录下的文件 */
      'fileManagerActionName': 'listfile', /* 执行文件管理的action名称 */
      'fileManagerListPath': '/upload/editor/file/', /* 指定要列出文件的目录 */
      'fileManagerUrlPrefix': '', /* 文件访问路径前缀 */
      'fileManagerListSize': 20, /* 每次列出文件数量 */
      'fileManagerAllowFiles': [
        '.png', '.jpg', '.jpeg', '.gif', '.bmp',
        '.flv', '.swf', '.mkv', '.avi', '.rm', '.rmvb', '.mpeg', '.mpg',
        '.ogg', '.ogv', '.mov', '.wmv', '.mp4', '.webm', '.mp3', '.wav', '.mid',
        '.rar', '.zip', '.tar', '.gz', '.7z', '.bz2', '.cab', '.iso',
        '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.md', '.xml'
      ] /* 列出的文件类型 */

    };
    const action = this.get('action') || this.get('editorid');
    // think.log(action);
    let result;
    switch (action) {
      case 'config':
        result = this.config;

        break;

        /* 上传图片 */
      case 'uploadimage':
        /* 上传涂鸦 */
      case 'uploadscrawl':
        /* 上传视频 */
      case 'uploadvideo':
        /* 上传文件 */
      case 'uploadfile':
        result = await this.uploads();
        // console.log(result);
        break;
      case 'myEditor':
        const p = await this.uploads();
        result = {
          'originalName': p.original,
          'name': p.title,
          'url': p.url,
          'size': p.size,
          'type': p.type,
          'state': p.state
        };
        this.header('Content-Type', 'text/html');
        return this.body = JSON.stringify(result);

        /* 列出图片 */
      case 'listimage':
        result = this.uploadlist();
        break;
        /* 列出文件 */
      case 'listfile':
        result = this.uploadlist();
        break;

        /* 抓取远程文件 */
      case 'catchimage':
        result = await this.crawler();
        break;

      default:
        result = {
          state: '请求地址出错'
        };

        break;
    }
    // 返回结果
    return this.json(result);
  }

  async uploads() {
    /**
     * 得到上传文件所对应的各个参数,数组结构
     * obj={
     *     "state" : "",          //上传状态，上传成功时必须返回"SUCCESS"
     *     "url" : "",            //返回的地址
     *     "title" : "",          //新文件名
     *     "original" : "",       //原始文件名
     *     "type" : "" ,           //文件类型
     *     "size" : "",           //文件大小
     * }
     */
    const action = this.get('action');
    let base64 = 'upload';
    let config = {};
    let fieldName;
    // console.log(setup);
    switch (action) {
      case 'uploadimage':
        config = {
          pathFormat: this.config['imagePathFormat'],
          maxSize: this.config['imageMaxSize'],
          allowFiles: this.config['imageAllowFiles'],
          mark: true
        };
        fieldName = this.config['imageFieldName'];
        break;
      case 'uploadscrawl':
        config = {
          'pathFormat': this.config['scrawlPathFormat'],
          'maxSize': this.config['scrawlMaxSize'],
          'allowFiles': this.config['scrawlAllowFiles'],
          'oriName': 'scrawl.png'
        };
        fieldName = this.config['scrawlFieldName'];
        base64 = 'base64';
        break;
      case 'uploadvideo':
        config = {
          'pathFormat': this.config['videoPathFormat'],
          'maxSize': this.config['videoMaxSize'],
          'allowFiles': this.config['videoAllowFiles']
        };
        fieldName = this.config['videoFieldName'];
        break;
      case 'uploadfile':
      default:
        config = {
          'pathFormat': this.config['filePathFormat'],
          'maxSize': this.config['fileMaxSize'],
          'allowFiles': this.config['fileAllowFiles']
        };
        fieldName = this.config['fileFieldName'];
        break;
    }
    // 加入七牛接口
    if (Number(think.config('ext.qiniu.is')) === 1 && base64 === 'upload') {
      const file = think.extend({}, this.file(fieldName));
      // console.log(file);
      const filepath = file.path;
      const extname = path.extname(file.name);
      const basename = path.basename(filepath) + extname;
      const qiniu = this.extService('qiniu', 'qiniu');
      const uppic = await qiniu.uploadpic(filepath, basename);
      if (!think.isEmpty(uppic)) {
        return {
          'state': 'SUCCESS',
          'url': `//${think.config('ext.qiniu.domain')}/${uppic.key}`,
          'title': uppic.hash,
          'original': file.name,
          'type': extname,
          'size': file.size
        };
      }
    } else {
      // return self.uploader(fieldName, config, oriName, size, path, base64);
      const up = this.extService('ueditor', 'editor', fieldName, config, base64, this.ctx); // 加载名为 ueditor 的 editor Adapter
      await up.up();
      // console.log("ddddddd"+upload.getFileInfo);
      return up.getFileInfo;
    }
  }

  // 抓取远程图片
  async crawler() {
    /* 上传配置 */
    const config = {
      'pathFormat': this.config['catcherPathFormat'],
      'maxSize': this.config['catcherMaxSize'],
      'allowFiles': this.config['catcherAllowFiles'],
      'oriName': 'remote.png'
    };
    const fieldName = this.config['catcherFieldName'];
    let source = this.post(fieldName + '[]');
    if (think.isArray(source)) {
      source = source;
    } else {
      source = [source];
    }
    const list = [];
    for (const imgUrl of source) {
      const up = this.extService('ueditor', 'editor', imgUrl, config, 'remote'); // 加载名为 ueditor 的 editor Adapter
      const info = await up.saveRemote();
      // console.log(info);
      list.push({'state': 'SUCCESS', 'url': info.url, 'size': 431521, 'title': info.title, 'original': info.original, 'source': imgUrl});
    }
    // console.log(think.isEmpty(list));
    return {
      state: !think.isEmpty(list) ? 'SUCCESS' : 'ERROR',
      list: list
    };
  }

  /**
   * 获取已上传的文件列表
   */
  uploadlist() {
    var allowFiles, listSize, path;
    // 判断类型
    switch (this.get('action')) {
      // 列出文件
      case 'listfile':
        allowFiles = this.config['fileManagerAllowFiles'];
        listSize = this.config['fileManagerListSize'];
        path = this.config['fileManagerListPath'];
        break;
        // 列出图片
      case 'listimage':
      default:
        allowFiles = this.config['imageManagerAllowFiles'];
        listSize = this.config['imageManagerListSize'];
        path = this.config['imageManagerListPath'];
    }
    // allowFiles = allowFiles.join("").replace(/[.]/g,"|").substr(1);
    /* 获取参数 */
    var size = this.get('size') ? this.get('size') : listSize;
    var start = this.get('start') ? this.get('start') : 0;
    var end = parseInt(size) + parseInt(start);
    /* 获取文件列表 */
    path = path.substr(0, path.lastIndexOf('/'));
    console.log(path);
    var files = this.scanFolder(path).files;
    if (files.length == 0) {
      return {
        'state': 'no match file',
        'list': [],
        'start': start,
        'total': files.length
      };
    }
    /* 获取指定范围的列表 */
    var len = files.length;
    var files_n = [];
    for (var i = 0; i < len; i++) {
      var t = files[i].substr(files[i].lastIndexOf('.')).toLocaleLowerCase();
      if (in_array(t, allowFiles)) {
        files_n.push(files[i]);
      }
    }

    var lenn = files_n.length;
    for (var i = Math.min(end, lenn) - 1, list = []; i < lenn && i >= 0 && i >= start; i--) {
      var f = files_n[i];
      list.push({url: f});
    }

    return {
      'state': 'SUCCESS',
      'list': list,
      'start': start,
      'total': files.length
    };
  }
  /**
   * 遍历获取目录下的指定类型的文件
   */
  scanFolder(path) {
    var fileList = [],
      folderList = [],
      walk = function(path, fileList, folderList) {
        const files = fs.readdirSync(think.resource + '/' + path);
        files.forEach(function(item) {
          var tmpPath = path + '/' + item,
            stats = fs.statSync(think.resource + '/' + tmpPath);

          if (stats.isDirectory()) {
            walk(tmpPath, fileList, folderList);
            folderList.push(tmpPath);
          } else {
            fileList.push(tmpPath);
          }
        });
      };

    walk(path, fileList, folderList);

    console.log('扫描' + path + '成功');

    return {
      'files': fileList,
      'folders': folderList
    };
  }
};
