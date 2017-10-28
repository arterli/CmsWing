// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const fs = require('fs');
module.exports = class extends think.cmswing.center {
  // 详情页[核心]
  async indexAction() {
    /* 标识正确性检测 */
    const id = this.get('id') || 0;
    // if(!(id && think.isString(id))){
    //    this.fail('文档ID错误！');
    // } //if(!(id && think.isString(id))){
    //    this.fail('文档ID错误！');
    // }
    /* 获取详细信息 */
    const document = this.model('cmswing/document');
    let info = await document.detail(id);
    if (info.errno == 702) {
      const error = this.controller('cmswing/error');
      return error.noAction(info.errmsg);
    }
    /* 页码检测 */
    // TODO
    let roleid = 8;// 游客
    // 访问控制
    if (this.is_login) {
      roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
    }
    const priv = await this.model('cmswing/category_priv').priv(info.category_id, roleid, 'visit');
    if (!priv) {
      const error = this.controller('cmswing/error');
      return error.noAction('您所在的用户组,禁止访问本栏目！');
    }

    // 不同的设备,压缩不同的图片尺寸
    const str = info.content;
    if (!think.isEmpty(str)) {
      let img;
      if (this.isMobile) {
        // 手机端
        img = image_view(str, 640, 4);
      } else {
        // pc端

        img = image_view(str, 847, 0);
      }
      info.content = img;
    }
    // console.log(info);
    // 分类信息
    let cate = await this.category(info.category_id);
    cate = think.extend({}, cate);
    // seo
    this.meta_title = info.title; // 标题
    this.keywords = info.keyname ? info.keyname : ''; // seo关键词
    this.description = info.description ? info.description : ''; // seo描述
    // keywords
    let keywords;
    if (!think.isEmpty(info.keyname)) {
      keywords = (info.keyname).split(',');
    }
    this.assign('keywords', keywords);
    // 访问统计
    await document.where({id: info.id}).increment('view');
    // 外链
    if (!think.isEmpty(info.link_id) && info.link_id != 0) {
      return this.redirect(info.link_id);
    }
    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(cate.id, true);
    this.assign('breadcrumb', breadcrumb);

    // 上一篇
    const previous = await document.where({id: ['>', info.id], category_id: info.category_id, 'pid': 0, 'status': 1}).order('id DESC').find();
    this.assign('previous', previous);
    // 下一篇
    const next = await document.where({id: ['<', info.id], category_id: info.category_id, 'pid': 0, 'status': 1}).order('id DESC').find();
    this.assign('next', next);

    // 获取模板
    let temp;
    const model = await this.model('cmswing/model').get_model(info.model_id, 'name');
    // 详情模版 TODO
    // 手机版模版

    this.assign('category', cate);
    // console.log(info);
    // 目录/文章/段落
    let pid;
    let pinfo;
    if (info.pid != 0) {
      let i = info.id;
      //
      while (i != 0) {
        const nav = await document.where({id: i}).find();
        if (nav.pid == 0) {
          pinfo = nav;
          pid = nav.id;
        }
        i = nav.pid;
      }
    } else {
      pinfo = info;
      pid = info.id;
    }
    // 获取最后更新时间
    const lastinfo = await document.where({topid: pid}).order('update_time DESC').find();
    // console.log(lasttime);
    this.assign('lastinfo', lastinfo);
    // console.log(pid);
    const plist = await document.where({pid: pid}).order('level DESC').select();
    this.assign('pinfo', pinfo);
    this.assign('plist', plist);
    // console.log(plist);
    if (plist[0]) {
      // let lastlevel = plist[0].level;
      // console.log(lastlevel);
      this.assign('lastlevel', plist[0]);
    }
    // console.log(plist);
    // 文档无限级目录
    const ptree_ = await document.where({topid: pid}).field('id,title,pid,name,level as sort').order('level DESC,create_time ASC').select();
    const ptree = get_children(ptree_, pid, 1);
    const ptree2 = arr_to_tree(ptree_, pid);
    // console.log(ptree);
    this.assign('topid', pid);
    this.assign('ptree', ptree);
    this.assign('ptree2',ptree2)

    // 如果是目录并且模板为空,模块为视频时，目录id，显示最后更新的主题
    if (info.type == 1 && (think.isEmpty(info.template) || info.template == 0) && info.model_id == 6) {
      if (plist[0]) {
        // console.log(111111);
        const model_id = plist[0].model_id;
        const p_id = plist[0].id;
        const table = await this.model('cmswing/model').get_table_name(model_id);
        const p_info = await this.model(table).find(p_id);
        info = think.extend(info, p_info);
      }
    }
    // console.log(info);
    this.assign('info', info);
    // 文档内容底部钩子钩子
    await this.hook('documentDetailAfter', info);
    // 视频播放器钩子
    await this.hook('videoPlayer', info);
    // 加载页面头部底部钩子
    const editor = !think.isEmpty(info.editor) ? info.editor : await this.model('cmswing/model').get_model(info.model_id, 'editor');
    const field_group = await this.model('cmswing/model').get_model(info.model_id, 'field_group');
    const fields = await this.model('cmswing/attribute').get_model_attribute(info.model_id, true);
    const fg = parse_config_attr(field_group);
    const farr = [];
    for (const key in fg) {
      for (const f of fields[key]) {
        if (f.type === 'editor') {
          farr.push(f);
          // 添加编辑器钩子
          if (editor === '0') {
            await this.hook('pageHeader', f.name, f.value, {$hook_key: f.name});
            await this.hook('pageFooter', f.name, f.value, {$hook_key: f.name});
            await this.hook('pageContent', f.name, info[f.name], {$hook_key: f.name});
          } else {
            await this.hook('pageHeader', f.name, f.value, {$hook_key: f.name, $hook_type: editor});
            await this.hook('pageFooter', f.name, f.value, {$hook_key: f.name, $hook_type: editor});
            await this.hook('pageContent', f.name, info[f.name], {$hook_key: f.name, $hook_type: editor});
          }
        };
      };
    };
    this.assign('pagehook', {editor: editor, fields: farr});
    // 判断浏览客户端
    if (this.isMobile) {
      // 手机模版
      if (!think.isEmpty(info.template) && info.template != 0) {
        temp = info.template; // todo 已设置详情模板
      } else if (!think.isEmpty(cate.template_m_detail)) {
        temp = cate.template_m_detail; // 分类已经设置模板
      } else {
        temp = model;
      }
      // console.log(temp);
      // 内容分页
      // if (!think.isEmpty(info.content)) {
      //   info.content = info.content.split('_ueditor_page_break_tag_');
      // }
      return this.display(this.mtpl(temp));
    } else {
      if (!think.isEmpty(info.template) && info.template != 0) {
        temp = info.template; // 已设置详情模板
      } else if (!think.isEmpty(cate.template_detail)) {
        temp = cate.template_detail; // 分类已经设置模板
      } else {
        temp = model;
      }
      // console.log(temp);
      // console.log(info);
      // 内容分页
      // if (!think.isEmpty(info.content)) {
      //   info.content = info.content.split('_ueditor_page_break_tag_');
      // }
      return this.display(`home/detail_${temp}`);
    }
  }

  /**
     * 下载
     */
  async downloadgetidAction() {
    const id = decodeURIComponent(this.get('id')).split('||');
    const db = this.model('document_download');
    const info = await db.find(id[0]);
    // console.log(info);
    const file_id = info.file_id;
    // console.log(file_id);
    let dlink;
    if (Number(id[1]) === 1) {
      // const location = await this.model('file').where({id: file_id}).getField('location', true);
      // console.log(location);
      const d = await get_file(file_id);
      if (Number(this.config('ext.qiniu.is')) === 1) {
        // 七牛下载
        // dlink = await get_file(file_id,"savename",true);
        const qiniu = this.extService('qiniu', 'qiniu');
        dlink = await qiniu.download(d.savename);
      } else {
        // 本地下载
        dlink = `http://${this.ctx.host}/download/${d.id}/${d.name}`;
      }
      // console.log(dlink);
      // 访问统计
      await db.where({id: info.id}).increment('download');
      // return this.redirect(dlink);
      this.assign('durl', dlink);
      if (this.isMobile) {
        // 手机模版
        return this.display(`home/mobile/detail_downloadgetid`);
      } else {
        return this.display();
      }
    } else if (id[1] == 2) {
      dlink = id[2];
      await db.where({id: info.id}).increment('download');
      return this.redirect(dlink);
    } else if (id[1] == 3) {
      // 返回网盘提取码
      const pan = info.panurl.split('\r\n');
      for (const v of pan) {
        const varr = v.split('|');
        console.log(varr[1]);
        if (!think.isEmpty(varr[2]) && think._.trim(id[2]) == think._.trim(varr[1])) {
          this.assign({
            title: varr[0],
            durl: varr[1],
            sn: varr[2]
          });
        }
      }
      await db.where({id: info.id}).increment('download');
      if (this.isMobile) {
        // 手机模版
        return this.display(`home/mobile/detail_downloadgetid`);
      } else {
        return this.display();
      }
    }
  }
  // 下载文件
  async downloadAction(){
    const file = await get_file(this.get('id'));
    this.header('Content-Disposition', `attachment; filename=${file.name}`);
    const filePath = `${think.ROOT_PATH}/www${file.savename}`;
    this.body = fs.readFileSync(filePath);
  }
};
