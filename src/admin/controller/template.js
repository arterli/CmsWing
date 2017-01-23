'use strict';

import Base from './base.js';
import fs from 'fs';
export default class extends Base {
 async init(http) {
    super.init(http);
    this.tactive = "template";
    // 当前使用的模版组

  }
  //init
  async __before(){
      await super.__before();
      //获取模板组
      await this.get_temp_group();
      this.assign({
          "navxs":true,
      });
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    this.meta_title= '模板管理';
    return this.display();
  }

  /**
   * 网站首页模版编辑
   * @returns {*}
     */
  async homeAction(){
      let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
    let map ={
      module:"topic",
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
    let templateFile = `${temppath}${temp.controller}${think.config("view.file_depr",undefined,"topic")}${temp.action}${this.config("view.file_ext")}`;
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
       this.assign('temp',temp);
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
      let templateFile = `${temppath}${bak.controller}${think.config("view.file_depr",undefined,"topic")}${bak.action}${this.config("view.file_ext")}`;
      fs.writeFileSync(templateFile, bak.html);
    }
    return this.success({name:"还原成功!"})
  }
    //封面模板
 async channelAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"topic",
         controller:"cover",
         type:this.param("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(this.http); //实例化 Adapter
     let page = pages.pages(temp);
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', temp.data);
     
    this.meta_title= '封面模板';

    return this.display();
  }
  //栏目模版
 async columnAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"topic",
         controller:"list",
         type:this.param("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(this.http); //实例化 Adapter
     let page = pages.pages(temp);
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', temp.data);
    this.meta_title= '列表模板';

    return this.display();
  }
  //详情模版
 async detailAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
      let map ={
          module:"topic",
          controller:"detail",
          type:this.param("type")||1,
          gid:gid
      }
      let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
      let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
      let pages = new Pages(this.http); //实例化 Adapter
      let page = pages.pages(temp);
      this.assign('pagerData', page); //分页展示使用
      this.assign('list', temp.data);
    this.meta_title='内容模板'

    return this.display();
  }
  //单页模版
    async spAction(){
        let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
        let map = {
            module:"topic",
            controller:"sp",
            type:this.param("type")||1,
            gid:gid
        }
        console.log(map);
        let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
        console.log(temp);
        let Pages = think.adapter("pages","page");
        let pages = new Pages();
        let page = pages.pages(temp);
        this.assign('pagerData',page);
        this.assign('list',temp.data);
        this.meta_title='单页模版';
        return this.display();
    }
  //公共模版
 async incAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"topic",
         controller:"inc",
         type:this.param("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
     let pages = new Pages(this.http); //实例化 Adapter
     let page = pages.pages(temp);
     this.assign('pagerData', page); //分页展示使用
     this.assign('list', temp.data);
    this.meta_title='公共模板';

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
          let templateFile = `${temppath}${temp.controller}${think.config("view.file_depr",undefined,"topic")}${temp.action}${this.config("view.file_ext")}`;
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

          if(temp.action.indexOf("index")==0&&temp.controller=='topic'){
              this.active = "admin/template/channel"
          }
          if(temp.action.indexOf("list")==0){
              this.active = "admin/template/column"
          }
          if(temp.action.indexOf("detail")==0){
              this.active = "admin/template/detail"
          }
          if(temp.controller=='sp'){
              this.active = "admin/template/sp"
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
            switch (data.temptype){
                case "channel":
                    data.module= 'topic';
                    data.controller= 'cover';
                    data.gid= gid;
                    break;
                case "column":
                    data.module= 'topic';
                    data.controller= 'list';
                    data.gid= gid;
                    break;
                case "detail":
                    data.module= 'topic';
                    data.controller= 'detail';
                    data.gid= gid;
                    break;
                case "inc":
                    data.module= 'topic';
                    data.controller= 'inc';
                    data.gid= gid;
                    break;
                case "sp":
                    data.module = 'topic';
                    data.controller = 'sp';
                    data.gid = gid;
                    break;
            }

            let temppath;
            if(data.type==2){
                temppath = `${think.ROOT_PATH}/view/${data.module}/mobile/`;
            }else {
                temppath = `${think.ROOT_PATH}/view/${data.module}/`;
            }
            let templateFile = `${temppath}${data.controller}${think.config("view",undefined,"topic").file_depr}${data.action}${this.config("view.file_ext")}`;
            console.log(templateFile);
            let res = await this.model("temp").add(data);
            if(!think.isEmpty(res)){
                fs.writeFileSync(templateFile, data.html);
                return this.success({name:"添加成功!"})
            }
        }else {
            let type = this.get("type");
            let temptype = this.get("temptype");
            switch (temptype){
                case "channel":
                    this.assign("title","封面模板");
                    break;
                case "column":
                    this.assign("title","列表模板");
                    break;
                case "detail":
                    this.assign("title","内容模板");
                    break;
                case "inc":
                    this.assign("title","公共模板");
                    break;
                case "sp":
                    this.assign("title","单页模版");
                    break
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

    /**
     * 删除模版
     */
    async delAction(){
        let id = this.get("id");
        let temp = await this.model("temp").find(id);
        //console.log(temp);
        let temppath;
        if(temp.type==2){
            temppath = `${think.ROOT_PATH}/view/${temp.module}/mobile/`;
        }else {
            temppath = `${think.ROOT_PATH}/view/${temp.module}/`;
        }
        let templateFile = `${temppath}${temp.controller}${think.config("view",undefined,"topic").file_depr}${temp.action}${this.config("view.file_ext")}`;
        //console.log(templateFile);
        if(think.isFile(templateFile)){
            fs.unlinkSync(templateFile);
        }
        let isdel = await this.model("temp").delete(id);
        if(isdel){
            return this.success({name:"删除成功!"});
        }else {
            return this.fail("删除失败!")
        }
    }
  // 获取模版组
  async get_temp_group(){
    let group = this.model("temp_group").select();
    this.assign("temp_group",group);
  }
}