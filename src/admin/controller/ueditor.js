// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
export default class extends Base {
  init(http) {
    super.init(http);
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    this.config = this.config("ueditor");
    let action = this.get("action");
    //think.log(action);
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

        result =await this.uploads();
        //console.log(result);
        break;

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
    //返回结果
    this.jsonp(result);

  }

  async uploads(){
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
    let action = this.get("action");
    let base64 = "upload";
    let config = {};
    let fieldName;
    //console.log(setup);
    switch (action) {
      case 'uploadimage':
        config = {
          pathFormat: this.config['imagePathFormat'],
          maxSize: this.config['imageMaxSize'],
          allowFiles: this.config['imageAllowFiles'],
        };
        fieldName = this.config['imageFieldName'];
        break;
      case 'uploadscrawl':
        config = {
          "pathFormat": this.config['scrawlPathFormat'],
          "maxSize": this.config['scrawlMaxSize'],
          "allowFiles": this.config['scrawlAllowFiles'],
          "oriName": "scrawl.png"
        };
        fieldName = this.config['scrawlFieldName'];
        base64 = "base64";
        break;
      case 'uploadvideo':
        config = {
          "pathFormat": this.config['videoPathFormat'],
          "maxSize": this.config['videoMaxSize'],
          "allowFiles": this.config['videoAllowFiles']
        };
        fieldName = this.config['videoFieldName'];
        break;
      case 'uploadfile':
      default:
        config = {
          "pathFormat": this.config['filePathFormat'],
          "maxSize": this.config['fileMaxSize'],
          "allowFiles": this.config['fileAllowFiles']
        };
        fieldName = this.config['fileFieldName'];
        break;
    }
     //加入七牛接口
     if(this.setup.IS_QINIU==1 && base64=="upload"){
       let file = think.extend({}, this.file(fieldName));
       // console.log(file);
       let filepath = file.path;
       let basename = path.basename(filepath);
       let qiniu = think.service("qiniu");
       let instance = new qiniu();
       let uppic = await instance.uploadpic(filepath,basename);
       if(!think.isEmpty(uppic)){
         return {
           "state" : "SUCCESS",
           "url" : `//${this.setup.QINIU_DOMAIN_NAME}/${uppic.key}`,
           "title" : uppic.hash,
           "original" : file.originalFilename,
           "type" : ".jpg",
           "size" : 0
         };
       }
     } else {
       //return self.uploader(fieldName, config, oriName, size, path, base64);
       let up = think.adapter("editor", "ueditor"); //加载名为 ueditor 的 editor Adapter
       let upload = new up(fieldName, config, base64, this.http); //实例化 Adapter
       return upload.getFileInfo();
     }
  }

  //抓取远程图片
  async crawler(){
    /* 上传配置 */
    let config = {
      "pathFormat" : this.config['catcherPathFormat'],
      "maxSize" : this.config['catcherMaxSize'],
      "allowFiles" : this.config['catcherAllowFiles'],
      "oriName" : "remote.png"
    };
    let fieldName = this.config['catcherFieldName'];
    let source = this.post(fieldName+"[]");
    if(think.isArray(source)) {
      source = source;
    }else{
      source = [source];
    }
    let list = [];
    for(let imgUrl of source){
      let up = think.adapter("editor", "ueditor"); //加载名为 ueditor 的 editor Adapter
      let upload = new up(imgUrl, config, "remote"); //实例化 Adapter
      let info =  await upload.saveRemote();
      //console.log(info);
      list.push({"state":"SUCCESS","url":info.url,"size":431521,"title":info.title,"original":info.original,"source":imgUrl});
    }
    //console.log(think.isEmpty(list));
    return {
      state:!think.isEmpty(list) ? 'SUCCESS':'ERROR',
      list:list
    }
  }

  /**
   * 获取已上传的文件列表
   */
  uploadlist() {
    var allowFiles, listSize, path;
    //判断类型
    switch (this.get("action")) {
        //列出文件
      case 'listfile':
        allowFiles = this.config['fileManagerAllowFiles'];
        listSize = this.config['fileManagerListSize'];
        path = this.config['fileManagerListPath'];
        break;
        //列出图片
      case 'listimage':
      default:
        allowFiles = this.config['imageManagerAllowFiles'];
        listSize = this.config['imageManagerListSize'];
        path = this.config['imageManagerListPath'];
    }
    //allowFiles = allowFiles.join("").replace(/[.]/g,"|").substr(1);
    /* 获取参数 */
    var size = this.get('size') ? this.get('size') : listSize;
    var start = this.get('start') ? this.get('start') : 0;
    var end = parseInt(size) + parseInt(start);
    /* 获取文件列表 */
    path = path.substr(0, path.lastIndexOf("/"));
    var files = this.scanFolder(path).files;
    if (files.length == 0) {
      return {
        "state": "no match file",
        "list": [],
        "start": start,
        "total": files.length
      }
    }
    /* 获取指定范围的列表 */
    var len = files.length;
    var files_n=[];
    for(var i = 0; i<len ; i++){
      var t= files[i].substr(files[i].lastIndexOf(".")).toLocaleLowerCase();
      if(in_array(t,allowFiles)){
        files_n.push(files[i])
      }
    }

    var lenn=files_n.length;
    for (var i = Math.min(end, lenn) - 1,list=[]; i < lenn && i >= 0 && i >= start; i--) {
      var f=files_n[i];
      list.push({url:f});
    }

    return {
      "state": "SUCCESS",
      "list": list,
      "start": start,
      "total": files.length
    };

  }
  /**
   * 遍历获取目录下的指定类型的文件
   */
  scanFolder(path) {
    var fileList = [],
        folderList = [],
        walk = function (path, fileList, folderList) {
          let files = fs.readdirSync(think.RESOURCE_PATH+"/"+path);
          files.forEach(function (item) {
            var tmpPath = path + '/' + item,
                stats = fs.statSync(think.RESOURCE_PATH+"/"+tmpPath);

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
    }
  }
}
