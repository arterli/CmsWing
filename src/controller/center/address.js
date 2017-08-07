// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../common/home');
module.exports = class extends Home {
    constructor(ctx){
        super(ctx);
    }
    /**
     * 收货地址管理
     * @returns {PreventPromise}
     */
    async indexAction() {
        //判断是否登陆
        await this.weblogin();
        let data = await this.model("address").where({user_id: this.user.uid}).page(this.get('page')).order("is_default DESC,id DESC").countSelect();
        let html = this.pagination(data);
        this.assign('pagination', html);
        if (!think.isEmpty(data.data)) {
            for (let val of data.data) {
                val.province_num = val.province;
                val.city_num = val.city;
                val.county_num = val.county;
                val.province = await this.model("area").where({id: val.province}).getField("name", true);
                val.city = await this.model("area").where({id: val.city}).getField("name", true);
                val.county = await this.model("area").where({id: val.county}).getField("name", true);
            }
        }
        this.assign("list", data.data);
        this.meta_title = "收货地址";
        //判断浏览客户端
        if (this.isMobile) {
            this.active = "user/index";
            return this.display(this.mtpl())
        } else {
            return this.display();
        }
    }

    //获取省市三级联动
    async getareaAction(){
        let pid = this.get("pid");
        let area = await this.model('area').where({parent_id:pid}).select()
        return this.json(area);
    }
    //选择收货地址（仅手机端用）
    async selectaddrAction(){
        await this.weblogin();
        let get = this.get();
        let data = await this.model("address").where({user_id: this.user.uid}).order("is_default DESC,id DESC").select();
        if (!think.isEmpty(data)) {
            for (let val of data) {
                val.province_num = val.province;
                val.city_num = val.city;
                val.county_num = val.county;
                val.province = await this.model("area").where({id: val.province}).getField("name", true);
                val.city = await this.model("area").where({id: val.city}).getField("name", true);
                val.county = await this.model("area").where({id: val.county}).getField("name", true);
            }
        }
        this.assign("list", data);
        this.assign("goodsget",get.goodslist);
        this.assign("id",get.id);
        this.meta_title = "选择收货地址";
        if (this.isMobile) {
            return this.display(this.mtpl())
        } else {
            return this.display();
        }
    }
    //添加或者更新联系人地址
    async addaddrAction(){
        await this.weblogin();

        let data = this.post();
        data.user_id = this.user.uid;
        if(data.is_default == 1){
            let find = await this.model("address").where({user_id:this.user.uid,is_default:1}).select();
            for(let val of find){
                val.is_default = 0;
                await this.model("address").update(val);
            }
        }
        //判断浏览客户端
        if (this.isMobile) {
            if (!think.isEmpty(data.city_picke)) {
                let city_picke = data.city_picke.split(" ");
                data.province = await this.model("area").where({
                    name: ["like", `%${city_picke[0]}%`],
                    parent_id: 0
                }).getField("id", true);
                data.city = await this.model("area").where({
                    name: ["like", `%${city_picke[1]}%`],
                    parent_id: data.province
                }).getField("id", true);
                data.county = await this.model("area").where({
                    name: ["like", `%${city_picke[2]}%`],
                    parent_id: data.city
                }).getField("id", true);
            }
        }
        let res
        if(think.isEmpty(data.id)){
            res =await this.model("address").add(data);
        }else{
            res = await this.model("address").update(data);
        }

        if(res){

            //判断浏览客户端
            if (this.isMobile) {

                return this.success({name:'操作成功',url:data.resurl});
            } else {
                let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC,id DESC").select();
                for(let val of addrlist){
                    val.province = await this.model("area").where({id:val.province}).getField("name",true);
                    val.city = await this.model("area").where({id:val.city}).getField("name",true);
                    val.county = await this.model("area").where({id:val.county}).getField("name",true);
                }
                return this.success({name:'操作成功',data:addrlist,type:data.type});
            }

        }else{
            return this.fail( '操作失败！');

        }

    }

    //联系人设置为默认
    async addrisdefaultAction(){
        await this.weblogin();
        let id = this.get("id");
        let find = await this.model("address").where({user_id:this.user.uid}).order("is_default ASC").select();
        for(let val of find){
            if(val.id == id){
                val.is_default = 1;
            }else{
                val.is_default = 0;
            }
            await this.model("address").update(val);
            val.province = await this.model("area").where({id:val.province}).getField("name",true);
            val.city = await this.model("area").where({id:val.city}).getField("name",true);
            val.county = await this.model("area").where({id:val.county}).getField("name",true);
        }
        return this.success({name:'设置成功！',data:find});

    }
    //获取当前选择的地址
    async getaddrAction(){
        await this.weblogin();
        let id = this.get("id");
        let addr = await this.model("address").where({user_id:this.user.uid}).find(id);
        addr.province = await this.model("area").where({id:addr.province}).getField("name",true);
        addr.city = await this.model("area").where({id:addr.city}).getField("name",true);
        addr.county = await this.model("area").where({id:addr.county}).getField("name",true);
        return this.success({name:"选择地址！",data:addr});
    }
    //删除地址
    async deladdrAction(){
        await this.weblogin();
        let id = this.para("id");
        let res = await this.model("address").where({user_id:this.user.uid,id:id}).delete();
        if(res){
            let addrlist = await this.model("address").where({user_id:this.user.uid}).order("is_default DESC").select();
            for(let val of addrlist){
                val.province = await this.model("area").where({id:val.province}).getField("name",true);
                val.city = await this.model("area").where({id:val.city}).getField("name",true);
                val.county = await this.model("area").where({id:val.county}).getField("name",true);
            }
            //判断浏览客户端
            if (this.isMobile) {
                return this.success({name:'删除成功',url:this.post("resurl")});
            } else {
                return this.success({name:'删除成功！',data:addrlist});
            }

        }else{
            return this.fail( '删除失败！');

        }
    }
//编辑地址
    async editaddrmodalAction(){
        await this.weblogin();
        let id = this.get("id");
        if(!think.isEmpty(id)){

            //获取地址信息
            let address = await this.model("address").where({user_id:this.user.uid}).find(id);

            let province, city, county;
            //获取省份
            if (this.isMobile) {
                province = await this.model('area').where({id: address.province}).getField("name", true);
                city = await this.model('area').where({id: address.city}).getField("name", true);
                county = await this.model('area').where({id: address.county}).getField("name", true);
            } else {
                province = await this.model('area').where({parent_id: 0}).select();
                city = await this.model('area').where({parent_id: address.province}).select();
                county = await this.model('area').where({parent_id: address.city}).select();
            }
            this.assign("province",province);
            this.assign("city",city);
            this.assign("county",county);
            this.assign("info",address);
            this.assign("type",this.get("type"));
            this.meta_title="编辑地址"
        }else {
            this.meta_title="添加地址"
        }

        if (this.isMobile) {
            this.active = "user/index";
            return this.display(this.mtpl())
        } else {
            return this.display();
        }
    }
}