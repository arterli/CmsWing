'use strict';

import Base from './base.js';
import fs from 'fs';
export default class extends Base {
 async init(http) {
    super.init(http);
    this.tactive = "template";
    // 当前使用的模版组
    this.gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    //获取模板组
    await this.get_temp_group();
    this.meta_title= '模板管理';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }

  /**
   * 网站首页模版编辑
   * @returns {*}
     */
  async homeAction(){
    let map ={
      module:"home",
      controller:"index",
      action:"index",
      type:this.param("type")||1,
      gid:this.gid
    }
    let temp = await this.model("temp").where(map).find();
    let templateFile = `${think.ROOT_PATH}/view/${temp.module}/${temp.controller}${think.config("view.file_depr",undefined,"home")}${temp.action}${this.config("view.file_ext")}`;
     if(this.isPost()){
       let data = this.post();
       data.id= temp.id;
       data.module = map.module;
       data.controller= map.container;
       data.action = map.action;
       data.name = temp.name;
       data.type = temp.type;
       data.gid = temp.gid;
       console.log(data);
       //await this.model("temp").add(data);
       temp.pid = temp.id;
       delete temp.id;
       temp.baktime = new Date().getTime();
       temp.lastuser = this.user.uid;
       console.log(temp);
       //修改前先备份
       if(data.html!=temp.html){
         let bak = await this.model("temp_bak").add(temp);
         let res = await this.model("temp").update(data);
         if(!think.isEmpty(res)){
           fs.writeFileSync(templateFile, data.html);
           return this.success({name:"修改成功!"})
         }
       }else {
         return this.fail("请先修改模板!")
       }

     }else {
       //首页网站编辑
       //console.log(this.adminmenu["10"]);
       this.meta_title= '首页模板';

       console.log(templateFile)
       //let tempcon = fs.readFileSync(templateFile,"utf8");
       //获取模板组
       await this.get_temp_group();
       console.log(temp);
       this.assign({
         "navxs":true,
         "temp":temp,
       });
       return this.display();
     }

  }
//模板修改记录
 async tempbakAction(){
    let map = this.get();
    map.gid = this.gid;
    let list = await this.model("temp_bak").where(map).limit(20).order("baktime DESC").select();
   this.assign("list",list);
   this.assign("title","修改记录");
    return this.display();
  }
  //还原模板
  async tempreplyAction(){
    let id = this.get("id");
    let bak =await this.model("temp_bak").where({pid:id}).find();
    if(!think.isEmpty(bak)){
      delete bak.id;
      await this.model("temp").where({id:id}).update(bak);
      let templateFile = `${think.ROOT_PATH}/view/${bak.module}/${bak.controller}${think.config("view.file_depr",undefined,"home")}${bak.action}${this.config("view.file_ext")}`;
      fs.writeFileSync(templateFile, bak.html);
    }
    return this.success({name:"还原成功!"})
  }
  channelAction(){
    this.meta_title= '封面模板';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
  columnAction(){
    this.meta_title= '列表模板';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
  detailAction(){
    this.meta_title='内容模板'
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
  incAction(){
    this.meta_title='公共模板'
  }
  // 获取模版组
  async get_temp_group(){
    let group = this.model("temp_group").select();
    this.assign("temp_group",group);
  }
}