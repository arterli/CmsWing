// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
    /**
     * 获取模版
     * @param type
     * @returns {{template_lists: Array, template_detail: Array, template_index: Array}}
     */
    async gettemp(type=1){
        //获取模版列表
        let temp = await this.where({type:type}).select();
        //封面模版
        let template_index =[]
        for(let v of temp){
            let obj = {}
            //let action = v.action.split("_")
            //console.log(action[1]);
            if(v.module=='home' &&  v.controller=='cover'){
                obj.name=v.name;
                obj.action=v.action;
                template_index.push(obj);
            }

        }
        //列表模版
        let template_lists =[]
        for(let v of temp){
            let obj = {}
            // let action = v.action.split("_");
            //console.log(action[1]);
            if(v.module=='home' &&  v.controller=='list'){
                obj.name=v.name;
                obj.action=v.action;
                template_lists.push(obj);
            }

        }
        //详情页模版
        let template_detail =[];
        for(let v of temp){
            let obj ={};
            if(v.module=='home' &&  v.controller=='detail'){
                obj.name=v.name;
                obj.action=v.action;
                template_detail.push(obj);
            }
        };
        //单页模版
        let sp = await this.where({type:type,module:"home",controller:"sp",}).field("name,action").select();
        for (let v of sp ){
            v.action =v.action
        }
        return{
            template_lists:template_lists,
            template_detail:template_detail,
            template_index:template_index,
            template_sp:sp
        };

    }
}