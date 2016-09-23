'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 获取参数的所有父级导航
     * @param int id 导航id
     * @return array 参数导航和导航的信息集合
     * @author
     */
    async get_parent_channel(id){
        let breadcrumb = []
        while (id!=0)
        {
            let nav = await this.where({'id':id,'status':1}).find();
            breadcrumb.push(nav);
            id = nav.pid;

        }
        return breadcrumb.reverse()
    }
}