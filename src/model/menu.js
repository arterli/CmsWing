module.exports = class extends think.Model {
    async adminmenu(){
        let menu = await think.cache("adminenu", () => {
            return this.getallmenu();
        }, {timeout: 365 * 24 * 3600});

        return menu;
    }
    //获取后台全部菜单
    async getallmenu(uid,is_admin){
        let where = {}
        where.hide = 0;
        let setup = await this.model("setup").getset();
        if(!setup.DEVELOP_MODE){// 是否开发者模式
            where.is_dev    =   0;
        }
        let groups = setup.MENU_GROUP;
        //think.log(group)
        //let pid = await this.topmenu();
        var arr = {};
        for(var v of Object.keys(groups)){
            //let obj = {}

            where.group=v;
            let menu=[];
            if( where.group != 0){
                menu =await this.where(where).order('sort asc').select();
            }
            if(!think.isEmpty(menu)){
                //arr.push(obj[v.id]=menu)
                let nmenu=[];
                //验证权限，根据权限进行显示控制
                if (!is_admin) {
                    for(let m of menu){
                        let Auth = think.adapter("auth", "rbac");
                        let auth = new Auth(uid);
                        let res = await auth.check(m.url);
                        //console.log(res);
                        if(res){
                            nmenu.push(m);
                        }
                    }}else {
                    nmenu=menu;
                }
                arr[v]=arr_to_tree(nmenu,0);
            }


        }

        //let menu = get_children(menu,0)
        //console.log(menu);
        return arr;
    }
    //获取顶级菜单
    async topmenu(){
        let where = {}
        where.hide = 0;
        where.pid = 0;
        let setup = await this.model("setup").getset();
        if(!setup.DEVELOP_MODE){// 是否开发者模式
            where.is_dev    =   0;
        }
        let menu =await this.where(where).order('sort asc').select();
        //console.log(menu);
        return menu;
    }

    //获取顶级菜单分组
    async group(id){
        let where = {}
        where.hide = 0;
        where.pid = id;
        let setup = await this.model("setup").getset();
        if(!setup.DEVELOP_MODE){// 是否开发者模式
            where.is_dev    =   0;
        }
        let groups =await this.where(where).field("group").order('sort asc').select();
        //console.log(menu);
        return groups;
    }
}