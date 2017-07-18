// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
const fs = require('fs');
module.exports = class extends Base {

    constructor(ctx){
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
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
      module:"home",
      controller:"index",
      action:"index",
      type:this.para("type")||1,
      gid:gid
    }
    let temp = await this.model("temp").where(map).find();
      let temppath;
      if(temp.type==2){
           temppath = `${think.ROOT_PATH}/view/${temp.module}/mobile/`;
      }else {
          temppath = `${think.ROOT_PATH}/view/${temp.module}/`;
      }
    let templateFile = `${temppath}${temp.controller}${this.config("view.nunjucks.sep")}${temp.action}${this.config("view.nunjucks.extname")}`;
     if(this.isPost){
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

       if(think.isFile(templateFile)){
           let tempcon = fs.readFileSync(templateFile,"utf8");
           temp.html=tempcon;
       }
       //console.log(temp);
       this.assign('temp',temp);
       return this.display();
     }

  }
//模板修改记录
 async tempbakAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
    let map = this.get();
    map.gid = gid;
     console.log(map);
     let list = await this.model("temp_bak").where(map).limit(20).order("baktime DESC").select();
   this.assign("list",list);
   this.assign("title","修改记录");
    return this.display();
  }
  //还原模板
  async tempreplyAction(){
    let id = this.get("id");
    let bak =await this.model("temp_bak").find(id);
    if(!think.isEmpty(bak)){
      delete bak.id;
      await this.model("temp").where({id:id}).update(bak);
        let temppath;
        if(bak.type==2){
            temppath = `${think.ROOT_PATH}/view/${bak.module}/mobile/`;
        }else {
            temppath = `${think.ROOT_PATH}/view/${bak.module}/`;
        }
        let templateFile = `${temppath}${bak.controller}${this.config("view.nunjucks.sep")}${bak.action}${this.config("view.nunjucks.extname")}`;
      fs.writeFileSync(templateFile, bak.html);
    }
    return this.success({name:"还原成功!"})
  }
    //封面模板
 async channelAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"home",
         controller:"cover",
         type:this.para("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Page = this.service('pagination');
     let page = new Page();
     let html = page.page(temp,this.ctx,{
         desc: true, //show description
         pageNum: 2,
         url: '', //page url, when not set, it will auto generated
         class: 'nomargin', //pagenation extra class
         text: {
             next: '下一页',
             prev: '上一页',
             total: '总数: ${count} , 页数: ${pages}'
         }
     });
     this.assign('pagerData', html); //分页展示使用
     this.assign('list', temp.data);
     
    this.meta_title= '封面模板';

    return this.display();
  }
  //栏目模版
 async columnAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"home",
         controller:"list",
         type:this.para("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Page = this.service('pagination');
     let page = new Page();
     let html = page.page(temp,this.ctx,{
         desc: true, //show description
         pageNum: 2,
         url: '', //page url, when not set, it will auto generated
         class: 'nomargin', //pagenation extra class
         text: {
             next: '下一页',
             prev: '上一页',
             total: '总数: ${count} , 页数: ${pages}'
         }
     });
     this.assign('pagerData', html); //分页展示使用
     this.assign('list', temp.data);
    this.meta_title= '列表模板';

    return this.display();
  }
  //详情模版
 async detailAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
      let map ={
          module:"home",
          controller:"detail",
          type:this.para("type")||1,
          gid:gid
      }
      let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Page = this.service('pagination');
     let page = new Page();
     let html = page.page(temp,this.ctx,{
         desc: true, //show description
         pageNum: 2,
         url: '', //page url, when not set, it will auto generated
         class: 'nomargin', //pagenation extra class
         text: {
             next: '下一页',
             prev: '上一页',
             total: '总数: ${count} , 页数: ${pages}'
         }
     });
      this.assign('pagerData', html); //分页展示使用
      this.assign('list', temp.data);
    this.meta_title='内容模板'

    return this.display();
  }
  //单页模版
    async spAction(){
        let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
        let map = {
            module:"home",
            controller:"sp",
            type:this.para("type")||1,
            gid:gid
        }
        console.log(map);
        let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
        console.log(temp);
        let Page = this.service('pagination');
        let page = new Page();
        let html = page.page(temp,this.ctx,{
            desc: true, //show description
            pageNum: 2,
            url: '', //page url, when not set, it will auto generated
            class: 'nomargin', //pagenation extra class
            text: {
                next: '下一页',
                prev: '上一页',
                total: '总数: ${count} , 页数: ${pages}'
            }
        });
        this.assign('pagerData',html);
        this.assign('list',temp.data);
        this.meta_title='单页模版';
        return this.display();
    }
  //公共模版
 async incAction(){
     let gid = await this.model("temp_group").where({isdefault:1}).getField("gid",true);
     let map ={
         module:"home",
         controller:"inc",
         type:this.para("type")||1,
         gid:gid
     }
     let temp = await this.model("temp").where(map).page(this.get('page')).countSelect();
     let Page = this.service('pagination');
     let page = new Page();
     let html = page.page(temp,this.ctx,{
         desc: true, //show description
         pageNum: 2,
         url: '', //page url, when not set, it will auto generated
         class: 'nomargin', //pagenation extra class
         text: {
             next: '下一页',
             prev: '上一页',
             total: '总数: ${count} , 页数: ${pages}'
         }
     });
     this.assign('pagerData', html); //分页展示使用
     this.assign('list', temp.data);
    this.meta_title='公共模板';

      return this.display();
  }
    //编辑模板
  async editAction(){
      let id = this.para("id");
      let temp = await this.model("temp").find(id);
      let temppath;
      if(temp.type==2){
          temppath = `${think.ROOT_PATH}/view/${temp.module}/mobile/`;
      }else {
          temppath = `${think.ROOT_PATH}/view/${temp.module}/`;
      }
      let templateFile = `${temppath}${temp.controller}${this.config("view.nunjucks.sep")}${temp.action}${this.config("view.nunjucks.extname")}`;
      if(this.isPost){
          temp.pid = temp.id;
          delete temp.id;
          temp.baktime = new Date().getTime();
          temp.lastuser = this.user.uid;
       let data = this.post();

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

          if(temp.action.indexOf("index")==0&&temp.controller=='home'){
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
          this.meta_title="修改模板";
          if(think.isFile(templateFile)){
              let tempcon = fs.readFileSync(templateFile,"utf8");
              temp.html=tempcon;
          }
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
        if(this.isPost){
            let data = this.post();
            switch (data.temptype){
                case "channel":
                    data.module= 'home';
                    data.controller= 'cover';
                    data.gid= gid;
                    break;
                case "column":
                    data.module= 'home';
                    data.controller= 'list';
                    data.gid= gid;
                    break;
                case "detail":
                    data.module= 'home';
                    data.controller= 'detail';
                    data.gid= gid;
                    break;
                case "inc":
                    data.module= 'home';
                    data.controller= 'inc';
                    data.gid= gid;
                    break;
                case "sp":
                    data.module = 'home';
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
            let templateFile = `${temppath}${data.controller}${this.config("view.nunjucks.sep")}${data.action}${this.config("view.nunjucks.extname")}`;
            // console.log(templateFile);
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
    let group = await this.model("temp_group").select();
    this.assign("temp_group",group);
  }
}