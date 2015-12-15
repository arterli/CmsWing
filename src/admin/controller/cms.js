// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
import Base from './base.js';
/**
 * 模型数据管理控制器
 * @author 阿特 <arterli@qq.com>
 * http://www.cmswing.com
 */
export default class extends Base {
    init(http) {
        super.init(http);
        this.tactive = "setup"
    }
    /**
     * list action
     * @return {Promise} []
     */
    //id:编号
    //title:标题:[EDIT]
    //type:类型
    //update_time:最后更新
    //status:状态
    //view:浏览
    //id:操作:[EDIT]|编辑,[DELETE]|删除
    async listAction(){
        //auto render template file index_index.html
        let model = this.get('model')
         !think.isEmpty(model)|| this.fail("模型名标识必须有！");

        //获取模型信息
        model = await this.model('model').where({name:model}).find();
        !think.isEmpty(model) || this.fail("模型不存在！");
        //解析列表规则
        let fields = [];
        let grids  = trim(model.list_grid).split('\r\n');
        console.log(grids)
        let ngrids=[];
        for (var value of grids){
            if(trim(value) === ''){
                continue;
            }
            // 字段:标题:链接
            let val      = value.split(':');
            // 支持多个字段显示
            let field   = val[0].split(',');
            let values    = {'field' : field, 'title': val[1]};
            if(!think.isEmpty(val[2])){
                values.href	=	val[2];
            }
            if(val[1].indexOf('|') > -1){
                // 显示格式定义
                [values.title,values.format]    =   val[1].split('|');
            }
            for( var v  of field){
                let array	=	v.split('|');
                fields.push(array[0]) ;
            }
            ngrids.push(values);
        }

        console.log(ngrids)
        // 过滤重复字段信息
        fields=unique(fields);
        console.log(fields)
        this.meta_title=model.title + '列表';
        this.active = "admin/model/index";
        this.assign('list_grids', ngrids);
        return this.display();
    }
}
