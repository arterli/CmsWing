const Home = require('../common/home');
module.exports = class extends Home {

    /**
     * 解析路由，判断是频道页面还是列表页面
     */
    async indexAction(){

        //  let p = this.get();
        // return this.body=p;
        // this.end( this.get('category'));
        let cate = await this.category(this.get('category').split("-")[0]);
        if(think.isEmpty(cate)){
            return cate;
        }
        let type = cate.allow_publish;
        if(cate.mold == 2){
            type = 'sp';
        }

        switch (type){
            case 0:
                if(cate.mold==1){
                    await this.action("mod/index","index");
                }else {
                    const cover = this.controller('home/cover');
                    return cover.indexAction();
                    //let ccc = new cc();
                    // console.log(cc.index);
                    //await this.action("cover","index");
                }
                break;
            case 1:
            case 2:
                if(cate.mold==1){
                    // await this.action('question/list', 'index', 'mod')
                    //await this.action("mod/index","list");
                    const mod = this.controller('mod/index');
                    return mod.listAction();
                }else {
                    const list = this.controller('home/list');
                    return list.indexAction();
                    //await this.action("list","index");
                }
                break;
            case 'sp':
                await this.action("sp","index");
                break;
            default:
                this.end(111)
        }
        //this.end(cate.allow_publish)
        // 获取当前栏目的模型
        //let models = await this.model("category",{},'admin').get_category(cate.id, 'model');
    }
}