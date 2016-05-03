'use strict';

import Base from './base.js';
import fs from 'fs';
export default class extends Base {
 async init(http) {
    super.init(http);
    this.tactive = "template";
    // 当前使用的模版组

     //获取模板组
     await this.get_temp_group();
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
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
      let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
    let map ={
      module:"home",
      controller:"index",
      action:"index",
      type:this.param("type")||1,
      gid:gid
    }
    let temp = await this.model("temp").where(map).find();
      let temppath;
      if(temp.type==2){
           temppath = `${think.ROOT_PATH}/view/${temp.module}/mobile/`;
      }else {
          temppath = `${think.ROOT_PATH}/view/${temp.module}/`;
      }
    let templateFile = `${temppath}${temp.controller}${think.config("view.file_depr",undefined,"home")}${temp.action}${this.config("view.file_ext")}`;
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
         // return false;
       //修改前先备份
       if(data.html!=temp.html){
         let bak = await this.model("temp_bak").add(temp);
         let res = await this.model("temp").update(data);
         if(!think.isEmpty(res)){
           fs.writeFileSync(templateFile, data.html);
           return this.success({name:"添加成功!"})
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
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
    let map = this.get();
    map.gid = gid;
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
        let temppath;
        if(bak.type==2){
            temppath = `${think.ROOT_PATH}/view/${bak.module}/mobile/`;
        }else {
            temppath = `${think.ROOT_PATH}/view/${bak.module}/`;
        }
      let templateFile = `${temppath}${bak.controller}${think.config("view.file_depr",undefined,"home")}${bak.action}${this.config("view.file_ext")}`;
      fs.writeFileSync(templateFile, bak.html);
    }
    return this.success({name:"还原成功!"})
  }
    //封面模板
 async channelAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"home",
         controller:"topic",
         action:["like", "index%"],
         type:this.param("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(); //实例化 Adapter
     let page = pages.pages(temp);
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', temp.data);
     
    this.meta_title= '封面模板';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
 async columnAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"home",
         controller:"topic",
         action:["like", "list%"],
         type:this.param("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(); //实例化 Adapter
     let page = pages.pages(temp);
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', temp.data);
    this.meta_title= '列表模板';
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
 async detailAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
      let map ={
          module:"home",
          controller:"topic",
          action:["like", "detail%"],
          type:this.param("type")||1,
          gid:gid
      }
      let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
      let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
      let pages = new Pages(); //实例化 Adapter
      let page = pages.pages(temp);
      this.assign('pagerData', page); //分页展示使用
      this.assign('list', temp.data);
    this.meta_title='内容模板'
    this.assign({
      "navxs":true,
    });
    return this.display();
  }
 async incAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"home",
         controller:"inc",
         type:this.param("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(); //实例化 Adapter
     let page = pages.pages(temp);
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', temp.data);
    this.meta_title='公共模板'
     this.assign({
         "navxs":true,
     });
      return this.display();
  }
    //编辑模板
  async editAction(){
      let id = this.param("id");
      let temp = await this.model("temp").find(id);
      if(this.isPost()){
          temp.pid = temp.id;
          delete temp.id;
          temp.baktime = new Date().getTime();
          temp.lastuser = this.user.uid;
       let data = this.post();
          let temppath;
          if(temp.type==2){
              temppath = `${think.ROOT_PATH}/view/${temp.module}/mobile/`;
          }else {
              temppath = `${think.ROOT_PATH}/view/${temp.module}/`;
          }
          let templateFile = `${temppath}${temp.controller}${think.config("view.file_depr",undefined,"home")}${temp.action}${this.config("view.file_ext")}`;
          console.log(data);
          console.log(temp);
          console.log(templateFile);
          //检查是否修改内容
          if(data.html==temp.html){
              return this.fail("请先修改模板!")
          }else {
              let bak = await this.model("temp_bak").add(temp);
              let res = await this.model("temp").update(data);
              if(!think.isEmpty(res)){
                  fs.writeFileSync(templateFile, data.html);
                  return this.success({name:"修改成功!"})
              }
          }
      }else {

          if(temp.action.indexOf("index")==0){
              this.active = "admin/template/channel"
          }
          if(temp.action.indexOf("list")==0){
              this.active = "admin/template/column"
          }
          if(temp.action.indexOf("detail")==0){
              this.active = "admin/template/detail"
          }
          this.meta_title="修改模板"
          this.assign({
              "navxs":true,
              "temp":temp
          });
          return this.display();
      }

    }
    //添加模板
    async addAction(){
        let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
        if(this.isPost()){
            let data = this.post();
            if(data.temptype=="channel"){
                data.module= 'home';
                data.controller= 'topic';
                data.action= 'index_'+data.action;
                data.gid= gid;
            }
            if(data.temptype=="column"){
                data.module= 'home';
                data.controller= 'topic';
                data.action= 'list_'+data.action;
                data.gid= gid;
            }
            if(data.temptype=="detail"){
                data.module= 'home';
                data.controller= 'topic';
                data.action= 'detail_'+data.action;
                data.gid= gid;
            }
            if(data.temptype=="inc"){
                data.module= 'home';
                data.controller= 'inc';
                data.gid= gid;
            }
            console.log(data);
            let temppath;
            if(data.type==2){
                temppath = `${think.ROOT_PATH}/view/${data.module}/mobile/`;
            }else {
                temppath = `${think.ROOT_PATH}/view/${data.module}/`;
            }
            let templateFile = `${temppath}${data.controller}${think.config("view.file_depr",undefined,"home")}${data.action}${this.config("view.file_ext")}`;
            console.log(templateFile);
            let res = await this.model("temp").add(data);
            if(!think.isEmpty(res)){
                fs.writeFileSync(templateFile, data.html);
                return this.success({name:"添加成功!"})
            }
        }else {
            let type = this.get("type");
            let temptype = this.get("temptype");
            if(temptype=="channel"){
                this.assign("title","封面模板");
            }
            if(temptype=="column"){
                this.assign("title","列表模板");
            }
            if(temptype == "detail"){
                this.assign("title","内容模板");
            }
            if(temptype == "inc"){
                this.assign("title","公共模板");
            }
            this.active = "admin/template/"+temptype;
            this.meta_title = "添加模板"
            this.assign({
                "navxs":true,
                "type":type,
                "temptype":temptype
            });
            return this.display();
        }

    }
  // 获取模版组
  async get_temp_group(){
    let group = this.model("temp_group").select();
    this.assign("temp_group",group);
  }
}