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
        this.assign({
            "active":"/admin/channel/index",
        })
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

    async addAction(){
        //添加导航
        return this.display();
    }
    async editAction(){
        //编辑导航
        return this.display();
    }
    aabbAction(){
        console.log(1)
    }
}