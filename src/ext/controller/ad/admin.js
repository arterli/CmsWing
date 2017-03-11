'use strict';
/**
 * 插件后台控制器
 * 如果插件有后台管理业务写在这个控制器里面
 */
import Base from '../admin.js';
export default class extends Base {
  /**
   * index action
   * 插件管理入口
   * 广告管理列表
   * @return {Promise} []
   */
  async indexAction(){
    //获取广告位置列表
      let data = await this.model("ext_ad_space").page(this.get('page')).order("spaceid DESC").countSelect();
    //console.log(data);
    let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    let pages = new Pages(this.http); //实例化 Adapter
    let page = pages.pages(data);
    this.assign('pagerData', page); //分页展示使用
    this.assign('list', data.data);
    return this.display();
  }

    /**
     * 添加广告位
     */
    async addspaceAction(){
        if(this.isPost()){
            let data = this.post();
            let res = await this.model('ext_ad_space').add(data);
            if(res){
                return this.success({name:"添加成功!"})
            }else {
                return this.fail("添加失败!")
            }
        }else {
            let temp = await this.model('ext_ad_temp').field("tempid,title,name").select();
            //console.log(temp);
            this.assign("temp",temp);
            this.meta_title="添加广告位"
            return this.display();
        }

    }

    /**
     * 编辑广告位
     * @returns {Promise.<void>}
     */
    async editspaceAction(){
        if(this.isPost()){
            let data = this.post();
            let res = await this.model('ext_ad_space').where({spaceid:data.spaceid}).update(data);
            if(res){
                return this.success({name:"更新成功!"})
            }else {
                return this.fail("更新失败!")
            }
        }else {
            let spaceid = this.get("spaceid");
            let temp = await this.model('ext_ad_temp').field("tempid,title,name").select();
            //console.log(temp);
            this.assign("temp",temp);
            let space = await this.model('ext_ad_space').find({where:{spaceid:spaceid}});
            this.assign("space",space);
            this.meta_title="添加广告位"
            return this.display();
        }
    }
    /**
     * 调用代码
     * @returns {Promise.<void>}
     */
    async codeAction(){
        let spaceid = this.get("spaceid");
        let space = await this.model("ext_ad_space").find({where:{spaceid:spaceid}});
        this.assign("space",space);
        return this.display();
    }

    /**
     * 预览广告
     * @returns {Promise.<void>}
     */
    async showadAction(){
        let spaceid = this.get("spaceid");
        let ad = await this.model("ext_ad_space").find({where:{spaceid:spaceid}});
        this.assign("ad",ad);
        return this.display();
    }
    /**
     * 删除广告
     * @returns {Promise.<void>}
     */
    async delspaceAction(){
        let ids = this.param('ids');
        //return this.fail(ids);
        if(think.isEmpty(ids)){
            return this.fail("缺少参数!")
        }
        //删除广告位
        let res = await this.model('ext_ad_space').where({spaceid:['IN',ids]}).delete();
        await this.model("ext_ad").where({spaceid:['IN',ids]}).delete();
        if(res){
            //todo 广告缓存后续
            return this.success({name:"删除成功!"});
        }else {
            return this.fail("删除成功!");
        }

    }
    /**
     * 更新广告缓存
     * @returns {Promise.<void>}
     */
   async adcacheAction(){
        //获取所有广告位
       let space = await this.model("ext_ad_space").order("spaceid DESC").select();
       for(let v of space){
           await this.model("ext_ad_space").upad(v.spaceid);
       }
        return this.success({name:"更新广告缓存成功!"})
    }
    /**
     * 获取广告模板
     * @returns {Promise.<void>}
     */
   async gettempAction(){
        let name = this.get('name');
        let res = await this.model('ext_ad_temp').fieldReverse("temp").where({name:name}).find();
        return this.json(res);
   }

    /**
     * 广告列表
     * @returns {Promise.<void>}
     */
   async adlistAction(){
       let spaceid = this.get('spaceid');
       let space = await this.model('ext_ad_space').find({where:{spaceid:spaceid}});
       this.assign('space',space);
       let map = {};
       map.spaceid = spaceid;
       //map.status = 1;
       //获取广告位置列表
       let data = await this.model("ext_ad").page(this.get('page')).where(map).order("sort ASC,addtime DESC").countSelect();
       //console.log(data);
       let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
       let pages = new Pages(this.http); //实例化 Adapter
       let page = pages.pages(data);
       this.assign('pagerData', page); //分页展示使用
       this.assign('list', data.data);
       return this.display();
   }

    /**
     * 添加广告
     * @returns {Promise.<void>}
     */
   async addadAction(){
        if(this.isPost()){
           let data = this.post();
           data.addtime = new Date().getTime();
           data.startdate= think.isEmpty(data.startdate)?new Date().getTime():new Date(data.startdate).valueOf();
           data.enddate = think.isEmpty(data.enddate)?new Date(data.startdate).getTime()+(86400000*30):new Date(data.enddate).valueOf();
           if(!think.isEmpty(data.code)){
               let arr = [];
               let obj = {};
               obj.code = data.code;
               arr.push(obj)
               data.setting=JSON.stringify(arr);
           }
            // console.log(data);
           // return this.fail(1);
            let res = await this.model("ext_ad").add(data);
            // let res =1;
            if(res){
                //更新广告位
                await this.model('ext_ad_space').upad(data.spaceid);
                // return this.fail(1)
                return this.success({name:"添加成功!",url:"/ext/ad/admin/adlist/spaceid/"+data.spaceid})
            }else {
                return this.success("添加失败!")
            }

       }else {
            //获取广告位
            let spaceid = this.get('spaceid');
            let space = await this.model('ext_ad_space').find({where:{spaceid:spaceid}});
            //获取广告模板
            let temp = await this.model('ext_ad_temp').find({where:{name:space.type}});
           this.assign('space',space);
           this.assign('temp',temp);
           this.meta_title="添加广告"
           return this.display();
       }

   }
    /**
     * 编辑广告
     * @returns {Promise.<void>}
     */
    async editadAction(){
        if(this.isPost()){
            let data = this.post();
            data.startdate= think.isEmpty(data.startdate)?new Date().getTime():new Date(data.startdate).valueOf();
            data.enddate = think.isEmpty(data.enddate)?new Date(data.startdate).getTime()+(86400000*30):new Date(data.enddate).valueOf();

            // console.log(data);
            // return this.fail(1);
            let res = await this.model("ext_ad").where({id:data.id}).update(data);
            // let res =1;
            if(res){
                //更新广告位
                await this.model('ext_ad_space').upad(data.spaceid);
                // return this.fail(1)
                return this.success({name:"编辑成功!",url:"/ext/ad/admin/adlist/spaceid/"+data.spaceid})
            }else {
                return this.success("编辑失败!")
            }

        }else {
            let id = this.get("id");
            let ad = await this.model("ext_ad").find(id);
            this.assign("ad",ad);
            //获取广告位
            let spaceid = ad.spaceid;
            let space = await this.model('ext_ad_space').find({where:{spaceid:spaceid}});
            //获取广告模板
            let temp = await this.model('ext_ad_temp').find({where:{name:space.type}});
            this.assign('space',space);
            this.assign('temp',temp);
            this.meta_title="编辑广告"
            return this.display();
        }

    }
    /**
     * 删除广告
     * @returns {Promise.<void>}
     */
   async deladAction(){
       let ids = this.param('ids');
       if(think.isEmpty(ids)){
           return this.fail("缺少参数!")
       }
       let res = await this.model('ext_ad').where({id:['IN',ids]}).delete();
       if(res){
           //todo 广告缓存后续
           return this.success({name:"删除成功!"});
       }else {
           return this.fail("删除成功!");
       }

   }
    /**
     * 广告模板
     * @returns {Promise.<void>}
     */
    async tempAction(){
        //获取广告位置列表
        let data = await this.model("ext_ad_temp").page(this.get('page')).countSelect();
        //console.log(data);
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(this.http); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //分页展示使用
        this.assign('list', data.data);
        return this.display();
    }

    /**
     * 添加广告模板
     *
     */
    async addtempAction(){
        if(this.isPost()){
            let data = this.post();
            data.type_images= data.type_images||0;
            data.type_flash= data.type_flash||0;
            data.type_text= data.type_text||0;
            data.type_code= data.type_code||0;
            //console.log(data);
            let type = {}
            for(let v in data){
                if(v.split("_")[0]=="type"){
                    type[v.split("_")[1]]=data[v]
                }
            }
            data.type = JSON.stringify(type);
            let res = await this.model('ext_ad_temp').add(data);
            if(res){

                return this.success({name:"添加成功！",url:"/ext/ad/admin/temp"})
            }else {
                return this.fail("添加失败!");
            }

        }else {
            this.meta_title="添加广告模板";
            return this.display();
        }

    }

    /**
     * 编辑模板
     * @returns {Promise.<void>}
     */
    async edittempAction(){
        if(this.isPost()){
            let data = this.post();
            data.type_images= data.type_images||0;
            data.type_flash= data.type_flash||0;
            data.type_text= data.type_text||0;
            data.type_code= data.type_code||0;
            //console.log(data);
            let type = {}
            for(let v in data){
                if(v.split("_")[0]=="type"){
                    type[v.split("_")[1]]=data[v]
                }
            }
            data.type = JSON.stringify(type);
            let res = await this.model('ext_ad_temp').where({tempid:data.tempid}).update(data);
            if(res){
                return this.success({name:"编辑成功！",url:"/ext/ad/admin/temp"})
            }else {
                return this.fail("编辑失败!");
            }

        }else {
            let tempid = this.get("tempid");
            let temp = await this.model("ext_ad_temp").find({where:{tempid:tempid}});
            this.assign("temp",temp);
            this.meta_title="添加广告模板";
            return this.display();
        }
    }


}