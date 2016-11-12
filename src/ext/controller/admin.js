'use strict';
import Base from '../../admin/controller/base.js';
export default class extends Base {
  /**
   * some base method in here
   */
  async __before(){
    await  super.__before();
    this.tactive = "ext";
    this.active ='admin/ext/index';
    this.ext = await this.model("ext").where({ext:this.http.controller.split("/")[0]}).find();
    //console.log(this.ext);
    this.meta_title = this.ext.name+"管理";
    if(!think.isEmpty(this.ext.setting)){
      this.setting = JSON.parse(this.ext.setting)
    }else {
      this.setting = {}
    }
  }

  /**
   * 获取当前插件分类
   * @returns {*}
   */
  async gettype(){
    let data = await this.model("ext_type").where({ext:this.ext.ext}).order("sort ASC").select();
    return data;
  }

  /**
   * 排序
   * @param self
   * @param model 表名
   * @param id 主键
   * @returns {*}
   */
  async sortAction(self,table,id='id'){
    table = table||"ext_"+this.http.controller.split("/")[0];
    let param = this.param();
    let sort = JSON.parse(param.sort);
    let data =[]
    for(let v of sort){
      let map={}
      map[id]=v.id;
      map.sort =v.sort;
      data.push(map)
    }
    let res = await this.model(table).updateMany(data);
    if (res>0) {
      return this.success({ name: "更新排序成功！"});
    } else {
      return this.fail("排序失败！");
    }
  }

  /**
   *  插件配置管理。
   */
  async settingAction(){
    if(this.isPost()){
      let data = this.post();
      if(think.isEmpty(data.ext)){
        data.ext = this.ext.ext;
      }
     // console.log(data);
      let res = await this.model("ext").where({ext:this.ext.ext}).update({setting:JSON.stringify(data)});
      if (res) {
        return this.success({ name: "更新成功！"});
      } else {
        return this.fail("更新失败！");
      }
    }else {
      this.assign("setting",this.setting);
      return this.display();
    }

  }
  /**
   * 插件分类管理
   * @returns {*}
   */
 async typeAction(){
    //获取友情链接
    let data = await this.model("ext_type").where({ext:this.ext.ext}).page(this.get('page')).order("sort ASC").countSelect();
    //console.log(data);
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(this.http); //实例化 Adapter
    let page = pages.pages(data);
    this.assign('pagerData', page); //分页展示使用
    this.assign('list', data.data);
    return this.display();
  }
  /**
   * 排序
   * @param self
   * @param model 表名
   * @param id 主键
   * @returns {*}
   */
  async typesortAction(){
    let param = this.param();
    let sort = JSON.parse(param.sort);
    let data =[]
    for(let v of sort){
      let map={}
      map.typeid=v.id;
      map.sort =v.sort;
      data.push(map)
    }
    let res = await this.model("ext_type").updateMany(data);
    if (res>0) {
      return this.success({ name: "更新排序成功！"});
    } else {
      return this.fail("排序失败！");
    }
  }

  /**
   * 删除分类
   * @returns {*}
   */
  async typedelAction(){
    let ids = this.param("ids");
    //console.log(ids);
    let res = await this.model("ext_type").where({typeid:["IN",ids]}).delete()
    if(res){
      return this.success({name:"删除成功!"})
    }else {
      return this.fail("删除失败！")
    }
  }
  /**
   * 添加类别
   * @returns {*}
   */
  async typeaddAction(){
    if(this.isPost()){
      let data = this.post();
      data.ext = this.ext.ext;
      let res = await this.model("ext_type").add(data);
      if(res){
        return this.success({name:"添加成功!"})
      }else {
        return this.fail("添加失败！")
      }
    }else {
      this.meta_title="添加类别";
      return this.display();
    }

  }
  /**
   * 修改友情链接
   */
  async typeeditAction(){
    if(this.isPost()){
      let data = this.post();
      data.ext = this.ext.ext;
      let res = await this.model("ext_type").where({typeid:data.typeid}).update(data);
      if(res){
        return this.success({name:"修改成功!"})
      }else {
        return this.fail("修改失败！")
      }
    }else {
      let id = this.get("id");
      let type = await this.model("ext_type").where({typeid:id}).find();
      console.log(type);
      this.assign("type",type);
      //获取当前插件的分类
      this.meta_title="修改类别";
      return this.display();
    }

  }
}