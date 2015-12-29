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
  indexAction(){
    //auto render template file index_index.html
    this.config = this.config("ueditor");
    let action = this.get("action");
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

        result = this.upload();
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
        result = this.crawler();
        break;

      default:
        result = {
          state: '请求地址出错'
        };

        break;
    }
   console.log(this.get("callback")) ;
    //返回结果
    this.jsonp(result);

  }

  upload(){
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
    //let obj={
    //     "state" : "SUCCESS",          //上传状态，上传成功时必须返回"SUCCESS"
    //     "url" : "",            //返回的地址
    //     "title" : "",          //新文件名
    //     "original" : "",       //原始文件名
    //     "type" : "" ,           //文件类型
    //       "size" : "",           //文件大小
    // }


      //var filed = this.file("upfile");
      //var oriName = filed.originalFilename;
      //var size = filed.size;
      //var path = filed.path;
      let action = this.get("action");
      let base64 = "upload";
      let config = {};
      let fieldName;
      switch (action) {
        case 'uploadimage':
          config = {
            pathFormat: this.config['imagePathFormat'],
            maxSize: this.config['imageMaxSize'],
            allowFiles: this.config['imageAllowFiles']
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
      //return self.uploader(fieldName, config, oriName, size, path, base64);
    let up = think.adapter("editor", "ueditor"); //加载名为 ueditor 的 editor Adapter
    let upload = new up(fieldName, config, base64,this.http); //实例化 Adapter

    return upload.getFileInfo();
  }

  //抓取远程图片
  crawler(){
    /* 上传配置 */
    let config = {
      "pathFormat" : this.config['catcherPathFormat'],
      "maxSize" : this.config['catcherMaxSize'],
      "allowFiles" : this.config['catcherAllowFiles'],
      "oriName" : "remote.png"
    };
    let fieldName = this.config['catcherFieldName'];
    let source = this.post(fieldName+"[]");
    for(let imgUrl of source){
      let up = think.adapter("editor", "ueditor"); //加载名为 ueditor 的 editor Adapter
      let upload = new up(imgUrl, config, "remote"); //实例化 Adapter
      let info =  upload.getFileInfo();
      //TODO
    }
  }
}