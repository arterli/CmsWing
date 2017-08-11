module.exports = class extends think.Model {
    /**
     * 缓存网站配置
     * @returns {*}
     */
    async getset(){
        let value = await think.cache("setup", () => {
            return this.lists();
        }, {timeout: 365 * 24 * 3600});

        return value;
    }

    /**
     * 获取网站配置
     * @returns {{}}
     */
    async lists (){
        let map = {}
        map.status = 1;
        let list = await this.where(map).order("sort ASC").field(["name","value","type"]).select();
        let obj = {}
        list.forEach(v =>{
            if(v.value.search(/\r\n/ig)>-1 && v.type !=2){
                v.value=v.value.split("\r\n");
                let obj ={}
                v.value.forEach(n =>{
                    n=n.split(":");
                    obj[n[0]]=n[1];
                })

                v.value = obj;
            }
            obj[v.name]=v.value;


        })
        return obj;
    }
}