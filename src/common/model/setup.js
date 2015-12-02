'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     * 缓存网站配置
     * @returns {*}
     */
    async getset(){
        let value = await think.cache("setup", () => {
            return this.list();
        }, {timeout: 365 * 24 * 3600});

        return value;
    }

    /**
     * 获取网站配置
     * @returns {{}}
     */
    async list (){
        let map = {}
        map.status = 1;
        let list = await this.where(map).order("sort ASC").field(["name","value"]).select();
        let obj = {}
        list.forEach(v =>{
            obj[v.name]=parse_config_attr(v.value);
        })
        return obj;
    }
}