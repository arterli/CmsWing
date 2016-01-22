'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  //上传文件
  async uploadAction(){
    let file = think.extend({}, this.file('file'));
    console.log(file);
    let filepath = file.path;
    let uploadPath = think.RESOURCE_PATH + '/upload/download/'+dateformat("Y-m-d",new Date().getTime());
    think.mkdir(uploadPath);
    let basename = path.basename(filepath);
    fs.renameSync(filepath, uploadPath + '/' + basename);
    file.path = uploadPath + '/' + basename;
    if(think.isFile(file.path)){
      let data ={
        savepath:'/upload/download/'+dateformat("Y-m-d",new Date().getTime())+ '/',
        create_time:new Date().getTime(),
        name:file.originalFilename,
        savename:basename,
        mime:file.headers["content-type"],
        size:file.size,
        md5:think.md5(basename)
      }
      console.log(data);
      var res = await this.model("file").data(data).add();
    }else{
      console.log('not exist')
    }
    this.json({id:res,size:file.size});
  }

  //上传图片
  async uploadpicAction(){
    let file = think.extend({}, this.file('file'));

    let filepath = file.path;
    console.log(file);
    let ret = {'status':1,'info':'上传成功','data':""}
    let uploadPath = think.RESOURCE_PATH + '/upload/picture/'+dateformat("Y-m-d",new Date().getTime());
    think.mkdir(uploadPath);
    let basename = path.basename(filepath);
    if(think.isFile(filepath)){
    fs.renameSync(filepath, uploadPath + '/' + basename);
    }else {
      console.log("文件不存在！")
    }
    file.path = uploadPath + '/' + basename;
    if(think.isFile(file.path)){
      let data ={
        path:'/upload/picture/'+dateformat("Y-m-d",new Date().getTime())+ '/' + basename,
      create_time:new Date().getTime(),
        status:1,

      }
     var res = await this.model("picture").data(data).add();
    }else{
      console.log('not exist')
    }
    this.json(res);
  }
}