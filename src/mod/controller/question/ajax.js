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

        return this.display();
    }

    /**
     * ajax获取栏目分组
     * @param cid 栏目id
     * @returns {*}
     */
    async getgroupsAction(){
        let cid = this.get("cid");
        let groups = await this.model('category').get_groups(cid);
        if(think.isEmpty(groups)){
            groups=false;
        }
        return this.json(groups);
    }
}