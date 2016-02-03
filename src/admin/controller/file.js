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

  //图片选择
  async selectpicAction(){
    let pics = await this.model("picture").limit(2, 15).select();
    this.assign("pics", pics);
    this.assign("field", {"name":"uploadimg"});
    this.display();
  }

  //链接选择
  selecturlAction(){
    this.assign("articles", [1, 2, 3, 4, 5, 6]);
    this.display();
  }

  async savenetpicAction(){
    //抓取远程图片
      /* 上传配置 */
      this.config = this.config("ueditor");
      let config = {
        "pathFormat" : this.config['catcherPathFormat'],
        "maxSize" : this.config['catcherMaxSize'],
        "allowFiles" : this.config['catcherAllowFiles'],
        "oriName" : "remote.png"
      };
      let fieldName = this.config['catcherFieldName'];
      let urlstr = this.post("picurl");
      let up = think.adapter("editor", "ueditor"); //加载名为 ueditor 的 editor Adapter
      let upload = new up(urlstr, config, "remote"); //实例化 Adapter
      let info =  await upload.saveRemote();
      console.log(info);
     // let obj = {"state":"SUCCESS","url":info.url,"size":431521,"title":info.title,"original":info.original,"source":imgUrl};
      let data ={
        path:info.url,
        create_time:new Date().getTime(),
        status:1
      }
      let res = await this.model("picture").data(data).add();
      if(res)
      {
        data.id = res;
       return this.json(data);
      }
      else
      {
        return this.json({"status":0});
      }

  }

  //根据图片id获取图片信息
  async getpicAction(){
      let id = this.post("id");
    //let pic = await this.model("picture").where({"id":parseInt(this.post("id"))}).find();
      let pic = await get_cover(id);
    this.end(pic);
  }
}
