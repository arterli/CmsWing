/**
 * Created by arter on 2015/11/16.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http){
        super.init(http);
        this.db = this.model('channel');
        this.tactive = "setup"
    }

    /**
     * 导航管理首页
     * @returns {*}
     */
    indexAction(){
        //auto render template file index_index.html
        this.meta_title = "导航管理";
        return this.display();
    }

    /**
     * 获取全部导航ajax
     * @returns {*}
     */
    async getchannelAction(){
        let tree = await this.db.get_channel_cache();
        return this.json(tree);
    }

     addAction(){
        //添加导航
          this.meta_title = "添加导航";
          this.active="admin/channel/index";
          return this.display();

    }
    async editAction(){
        //编辑导航
        let id = this.get('cid');
        let info = await this.model('channel').find(id);
        if(think.isEmpty(info)){
          this.fail("获取配置信息错误");
        }
        this.assign('info',info);
        this.meta_title = "编辑导航";
        this.active="admin/channel/index";
        return this.display('add');
    }
    //更新或者新增导航
   async updatesAction(){
      let data = this.post();
      let res = await this.model("channel").updates(data);
      switch (res.err) {
        case 1:
          await this.model("action").log("update_channel","channel",res.id,this.user.uid,this.ip(),this.http.url);//记录行为
          return this.success({name:"新增成功！",url:"/admin/channel/index"});
          break;
        case 2:
          return this.fail("新增失败！")
          break;
        case 3:
          await this.model("action").log("update_channel","channel",res.id,this.user.uid,this.ip(),this.http.url);//记录行为
          return this.success({name:"更新成功！",url:"/admin/channel/index"})
          break;
        default:
          return this.fail("更新失败！")
      }
    }

    //删除导航
    async delAction(){
      let id = this.get('id');
      id = id.split(",");
      if(think.isEmpty(id)){
        this.fail("请选择要操作的数据！");
      }
      let map = {id:['IN',id]};
      let res = await this.model('channel').where(map).delete();
      if(res){
        await this.model("action").log("update_channel","channel",id,this.user.uid,this.ip(),this.http.url);//记录行为
        think.cache("get_channel_cache",null);//更新频道缓存信息
        return this.success({name:"删除成功！"});
      }else {
      return this.fail("删除失败！");
      }
    }
}
