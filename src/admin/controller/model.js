// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
'use strict';
import Base from './base.js';
import url from 'url';
/**
 * 模型管理控制器
 * @author arterli <arterli@qq.com>
 */
export default class extends Base {
    init(http) {
        super.init(http);
        this.db = this.model('model');
        this.tactive = "setup"
    }

    async indexAction() {
        let map = {'status': ['>', -1]}
        let data = await this.db.where(map).page(this.get('page')).countSelect();
        let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
        let pages = new Pages(); //实例化 Adapter
        let page = pages.pages(data);
        this.assign('pagerData', page); //这里assign的变量必须为pagerData，分页展示使用
        this.assign('list', data.data);
        this.meta_title = "模型管理";
        return this.display()
    }

    /**
     * 新建模型
     * @returns {*}
     */
    addAction(){
       this.active="admin/model/index"
       this.meta_title = "新建模型"
       return this.display()
    }

    /**
     * 生成模型
     * @returns {*}
     */
    generateAction(){
        this.active="admin/model/index"
        this.meta_title = "生成模型"
        return this.display()
    }

}