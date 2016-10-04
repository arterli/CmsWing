'use strict';

import Base from './base.js';

export default class extends Base {
  //详情页[核心]
  async indexAction() {
    /* 标识正确性检测*/
    let id = this.get('id') || 0;
    //if(!(id && think.isString(id))){
    //    this.fail('文档ID错误！');
    //} //if(!(id && think.isString(id))){
    //    this.fail('文档ID错误！');
    //}
    /* 获取详细信息*/
    let document = this.model('document');
    let info = await document.detail(id);
    if(info.errno==702){
      this.http.error = new Error(info.errmsg);
      return think.statusAction(702, this.http);
    }
    /* 页码检测*/
    //TODO
    let roleid=8;//游客
    //访问控制
    if(this.is_login){
      roleid = await this.model("member").where({id:this.is_login}).getField('groupid', true);
    }
    let priv = await this.model("category_priv").priv(info.category_id,roleid,'visit');
    if(!priv){
      this.http.error = new Error('您所在的用户组,禁止访问本栏目！');
      return think.statusAction(702, this.http);
    }


    //不同的设备,压缩不同的图片尺寸
    let str = info.content;
    if(!think.isEmpty(str)){
      let img;
      if(checkMobile(this.userAgent())){
        //手机端
        img = image_view(str,640,4);
      }else {
        //pc端

        img = image_view(str,847,0);
      }
      info.content=img
    }
    //console.log(info);
    //分类信息
    let cate = await this.category(info.category_id);
    cate = think.extend({}, cate);
    //seo
    this.meta_title = info.title; //标题
    this.keywords = info.keyname ? info.keyname : ''; //seo关键词
    this.description = info.description ? info.description : ""; //seo描述
    //keywords
    let keywords;
    if(!think.isEmpty(info.keyname)){
      keywords = (info.keyname).split(",");
    }
    this.assign("keywords",keywords);
    //访问统计
    await document.where({id:info.id}).increment('view');
    //外链
    if(!think.isEmpty(info.link_id)&&info.link_id!=0){
      return this.redirect(info.link_id);
    }
    //获取面包屑信息
    let breadcrumb = await this.model('category',{},'admin').get_parent_category(cate.id,true);
    this.assign('breadcrumb', breadcrumb);

    // 上一篇
    let previous = await document.where({id:['>',info.id],category_id:info.category_id,'pid':0, 'status': 1}).order('id DESC').find();
    this.assign('previous',previous)
    // 下一篇
    let next = await document.where({id:['<',info.id],category_id:info.category_id,'pid':0, 'status': 1}).order('id DESC').find();
    this.assign('next',next)

    //获取模板
    let temp;
    let model = await this.model('model', {}, 'admin').get_document_model(info.model_id, 'name');

    //详情模版 TODO
    //手机版模版


    this.assign('category', cate);

    //console.log(info);
    //目录/文章/段落
    let pid;
    let pinfo;
    if(info.pid !=0){
      let i = info.id;
      //
      while (i!=0)
      {
        let nav = await document.where({id:i}).find();
        if(nav.pid==0) {
          pinfo = nav;
          pid= nav.id;
        }
        i = nav.pid;

      }

    }else {
      pinfo = info;
      pid= info.id;
    }
    //获取最后更新时间
    let lastinfo = await document.where({topid:pid}).order("update_time DESC").find();
    //console.log(lasttime);
    this.assign("lastinfo",lastinfo);
    //console.log(pid);
    let plist = await document.where({pid:pid}).order("level DESC").select();
    this.assign("pinfo",pinfo);
    this.assign("plist",plist);
    //console.log(plist);
    if(plist[0]){
      let lastlevel = plist[0].level;
      //console.log(lastlevel);
      this.assign("lastlevel",lastlevel);
    }
    //console.log(plist);
    //文档无限级目录
    let ptree_ = await document.where({topid:pid}).field('id,title,pid,name,level as sort').select();
    let ptree = get_children(ptree_,pid,1);
    //console.log(ptree);
    this.assign('topid',pid);
    this.assign("ptree",ptree);

    //如果是目录并且模板为空,模块为视频时，目录id，显示最后更新的主题
    if(info.type == 1 && (think.isEmpty(info.template)||info.template==0)&&info.model_id==6){
      if(plist[0]){
        console.log(111111);
        let model_id =  plist[0].model_id;
        let p_id = plist[0].id;
        let table = await this.model("model",{},"admin").get_table_name(model_id);
        let p_info = await this.model(table).find(p_id);
        info = think.extend(info,p_info);

      }
    }
    //console.log(info);
    this.assign('info', info);
    //判断浏览客户端
    if(checkMobile(this.userAgent())){
      //手机模版
      if (!think.isEmpty(info.template) && info.template !=0) {
        temp = info.template; //todo 已设置详情模板
      } else if (!think.isEmpty(cate.template_detail)) {
        temp = cate.template_m_detail; //分类已经设置模板
      } else {
        temp = model;
      }

      //内容分页
      if(!think.isEmpty(info.content)){
        info.content=info.content.split("_ueditor_page_break_tag_");
      }
      return this.display(`mobile/${this.http.controller}/${temp}`)
    }else{
      if (!think.isEmpty(info.template) && info.template !=0) {
        temp = info.template; //已设置详情模板
      } else if (!think.isEmpty(cate.template_detail)) {
        temp = cate.template_detail; //分类已经设置模板
      } else {
        temp = model;
      }
       // console.log(temp);
        //console.log(info);
      //内容分页
      if(!think.isEmpty(info.content)){
        info.content=info.content.split("_ueditor_page_break_tag_");
      }
      return this.display(temp);
    }
  }

  /**
   * 下载
   */
  async downloadgetidAction(){
    let id = this.get("id").split("||");
      let db = this.model('document_download');
      let info =await db.find(id[0]);
      console.log(info);
      let file_id = info.file_id;
      console.log(file_id);
      let dlink;
      if(id[1]==1){
          let location = await this.model('file').where({id:file_id}).getField("location",true);
          console.log(location);
          let d = await get_file(file_id);
          if(this.setup.IS_QINIU==1 && location==1){
            //七牛下载
             // dlink = await get_file(file_id,"savename",true);
            let qiniu = think.service("qiniu");
            let instance = new qiniu();
                dlink = await instance.download(d.savename);
          }else {
              // 本地下载
              dlink = d.savepath+d.savename+"?attname="
          }
          console.log(dlink);
          //访问统计
        await db.where({id:info.id}).increment('download');
        //return this.redirect(dlink);
        this.assign("durl",dlink);
        return this.display()
      }else if(id[1]==2){
          dlink = id[2];
        await db.where({id:info.id}).increment('download');
        return this.redirect(dlink);
      }else if(id[1]==3){
        //返回网盘提取码
        let pan = info.panurl.split("\r\n");
        for(let v of pan){
          let varr=v.split("|");
          console.log(varr[1]);
          if(!think.isEmpty(varr[2]) && think._.trim(id[2])==think._.trim(varr[1])){
            this.assign({
              title:varr[0],
              durl:varr[1],
              sn:varr[2]
            })
          }
        }
        return this.display()
      }

  }
}