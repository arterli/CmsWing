'use strict';

import Base from './base.js';
import API from 'wechat-api';

export default class extends Base{
    
    init(http){
        this.api = new API('wxe8c1b5ac7db990b6', 'ebcd685e93715b3470444cf6b7e763e6');
        super.init(http);
    }
    
    /**
     * 新建素材默认首页
     */
    fodderAction(){
        this.assign({"navxs": true,"bg": "bg-dark"});
        return this.display();
    }
    
    /**
     * 给微信上传临时素材 /图片 更新本地库
     */
    async wxuploadtmpAction(){
        //上传图片
        // this.end("暂不开发");
        let thumb_id = this.get('thumb_id');
        let model = this.model('picture');
        let data = await model.where({id:thumb_id}).find();
 
        let wx = function(api, data){
            let deferred = think.defer();
            api.uploadMaterial(think.ROOT_PATH+'/www/'+data.path, 'thumb', (err,result)=>{
                if(!think.isEmpty(result)){
                    deferred.resolve(result);
                }else{
                    console.error(err);
                }
            });
            return deferred.promise;
        } 
        
        let img_result = await wx(this.api, data);
        if(img_result){
            await model.where({id:thumb_id}).update({url: img_result, source_id: img_result.media_id});
            img_result.hs_image_src = data.path;
            this.end(img_result);
        }else{
            this.end("");
        }
    }
    
    /**
     * 上传保存永久素材
     */
    async savefodderAction(){
        let self = this;
        let params = self.post("params");
        let edit_id = self.get("edit_id");
        if(edit_id){
            self.success({"name":"编辑暂未开通", url:""});
        }
        try{
            var anews = JSON.parse(params);
        
            let wx = function(api, data) {
                let deferred = think.defer();
                api.uploadNewsMaterial(data, (err, result)=>{
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
                });
                return deferred.promise;
            }
            let wxres = await wx(self.api, anews);
            let model = self.model('wx_material');
            if(wxres){
                console.log(anews)
                let data = {
                    "media_id": wxres.media_id,
                    "material_content": params,
                    "wxgzh": 0,
                    "add_time": new Date().getTime()
                }
                let effect = await model.add(data);
                if(effect){
                    self.success({"name":"上传成功！", url:""});
                }
            }
            self.error({"name":"上传失败！", url:""});
        }catch(e){
            self.error({"name":"上传失败！", url:""});
        }
    }
    
    /**
     * 素材列表
     */
    async fodderlistAction(){
        let self = this;
        self.meta_title = "微信素材列表";
        self.assign({"navxs": true, "bg": "bg-dark"});
        let model = self.model("wx_material");
        let data = await model.page(this.get('page')).countSelect();
        let Pages = think.adapter("pages","page");
        let pages = new Pages();
        let page = pages.pages(data);
        self.assign('pagerData', page);
        self.assign('fodder_list', data.data);
        return this.display();
    }
    
    async asyncfodderlistAction(){
        let self = this;
        let model = self.model("wx_material");
        let data = await model.page(this.get('page')).countSelect();
        self.end(data);
    }
    
    /**
     * 编辑
     */  
    async foddereditAction(){
        let id = this.get('id');
        //this.end(id)
        let model = this.model("wx_material");
        let data = await model.where({'id': id}).find();
        this.assign('data', JSON.stringify(data));
        //this.end(data);
        return this.display('fodder');
    }
    
}