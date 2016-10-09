'use strict';
import Base from '../index.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
  indexAction(){
    //console.log(this);
    //auto render template file index_index.html

   this.end(2222)
   return this.display();
  }

  /**
   * 列表入口
   * @returns {*}
   */
 async listAction(){
    //跨域
    let method = this.http.method.toLowerCase();
    if(method === "options"){
      this.setCorsHeader();
      this.end();
      return;
    }
    this.setCorsHeader();

    //获取栏目信息
    let cate = this.m_cate;
    cate = think.extend({}, cate);

      //栏目权限验证
    await this.c_verify("visit");

    // 获取当前栏目的模型
    let model = this.mod;
    this.assign('model', model);

    //获取当前分类的所有子栏目
    let subcate = await this.model('category').get_sub_category(cate.id);
        subcate.push(cate.id);

    //当前栏目列表每页行数
     let num = this.page_num();

      //获取面包屑信息
    let breadcrumb = await this.model('category').get_parent_category(cate.id,true);

    //获取列表数据
      //条件
    let map = {
      'category_id': ['IN', subcate]
    };
    //排序
    let o = {};
    let order = this.modget(1)||0;
    order = Number(order);
    switch (order){
      case 1:
        o.popular_value = 'DESC';
        break;
      case 2:
        map.is_recommend = 1;
        break;
      case 3:
        map.answer_count = 0;
        break;
      default:
        o.create_time = 'DESC';
    }
    this.assign('order',order);
    //分组
    let group_id = 0;
    if(!think.isEmpty(this.modget(2)) && this.modget(2) !=0){
      map.group_id=this.modget(2);
      group_id = map.group_id;
    }

    let data = await this.model(this.mod.name).where(map).page(this.param('page'),num).order(o).countSelect();

    /* 模板赋值并渲染模板 */
      this.assign("group_id",group_id);
      this.assign('category', cate);
      this.assign('list', data.data);
      this.assign('count',data.count);
      this.assign('breadcrumb', breadcrumb);

    //跨屏
    if(checkMobile(this.userAgent())){
      if(this.isAjax("get")){
        return this.json(data);
      }
      //手机端模版
      return this.modtemp(this.mod.name,"mobile");
    }else{
      //console.log(temp);
     // return this.display(temp);
      return this.modtemp(this.mod.name);
    }

  }

  /**
   * 详情入口
   * @returns {*}
   */
  detailAction(){

    return this.display();
  }
}