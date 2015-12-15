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
    async listAction(){
        //auto render template file index_index.html
        let model = this.get('model')
         !think.isEmpty(model)|| this.fail("模型名标识必须有！");

        //获取模型信息
        model = await this.model('model').where({name:model}).find();
        !think.isEmpty(model) || this.fail("模型不存在！");
        console.log(model)
        this.meta_title=model.title + '列表';
        this.active = "admin/model/index";
        return this.display();
    }
}
