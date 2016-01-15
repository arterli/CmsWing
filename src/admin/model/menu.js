'use strict';
/**
 * model
 */
export default class extends think.model.base {

    * adminmenu(){
        let menu = yield think.cache("adminenu", () => {
            return this.getallmenu();
        }, {timeout: 365 * 24 * 3600});

        return menu;
    }
    //获取后台全部菜单
    * getallmenu(){
        let where = {}
        where.hide = 0;
        let setup = yield this.model("setup").getset();
        if(!setup.DEVELOP_MODE){// 是否开发者模式
            where.is_dev    =   0;
        }
        let groups = setup.MENU_GROUP;
        //think.log(group)
        //let pid = yield this.topmenu();
        var arr = {};
            for(var v of Object.keys(groups)){
                //let obj = {}

                where.group=v;
                if( where.group != 0){
              var menu =yield this.where(where).order('sort asc').select();
                }
                if(!think.isEmpty(menu)){
                    //arr.push(obj[v.id]=menu)
                    arr[v]=arr_to_tree(menu,0);
                }


            }

       //let menu = get_children(menu,0)
        //console.log(menu);
        return arr;
    }
    //获取顶级菜单
   * topmenu(){
       let where = {}
       where.hide = 0;
       where.pid = 0;
       let setup = yield this.model("setup").getset();
       if(!setup.DEVELOP_MODE){// 是否开发者模式
           where.is_dev    =   0;
       }
       let menu =yield this.where(where).order('sort asc').select();
       //console.log(menu);
       return menu;
   }

    //获取顶级菜单分组
    * group(id){
        let where = {}
        where.hide = 0;
        where.pid = id;
        let setup = yield this.model("setup").getset();
        if(!setup.DEVELOP_MODE){// 是否开发者模式
            where.is_dev    =   0;
        }
        let groups =yield this.where(where).field("group").order('sort asc').select();
        //console.log(menu);
        return groups;
    }
}