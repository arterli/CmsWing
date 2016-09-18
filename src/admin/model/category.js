'use strict';
/**
 * model
 */
export default class extends think.model.base {

    async info(id){
        //获取分类信息
        console.log(id);
        let map = {};
        if(think.isNumber(id)){
            map.id = id;
        }else{
            map.name = id;
        }
        return await this.where(map).find();
    }
    /**
     * 获取分类树，指定分类则返回指定分类及其子分类，不指定则返回所有分类树
     *
     */
    async gettree(id , field,where={}){
        id = id||0,field=field||true;
         /*获取当前分类信息*/

        //if(id){
        //    console.log(id);
        //    let ids = id;
        //    let info = await this.info(ids);
        //    console.log(info);
        //    let id   = info.id;
        //}

        //获取所有分类
        let map = think.extend({"status":{">":-1}},where)
        console.log(map);
        let list = await this.field(field).where(map).order('sort ASC').select();
        for(let v of list) {
            if (v.allow_publish == 0){
                if (!think.isEmpty(v.name)) {
                    v.url = `/channel/${v.name}`
                } else {
                    v.url = `/channel/${v.id}`
                }
            }else {
                if (!think.isEmpty(v.name)) {
                    v.url = `/column/${v.name}`
                } else {
                    v.url = `/column/${v.id}`
                }
            }
        }
        //console.log(list);
        list = get_children(list,id);
        let info = list;

        return info;
     }
    /**
     * 获取分类信息并缓存分类
     * @param  integer id    分类ID
     * @param  string  field 要获取的字段名
     * @return string         分类信息
     */
    async get_category(id, field){
        field=field||null;

            let list = await think.cache("sys_category_list", () => {
              return this.getallcate();
            }, {timeout: 365 * 24 * 3600});
        /* 非法分类ID */
        if(think.isEmpty(id) || !think.isNumberString(id)){
            return list;
        }else{
        if(think.isEmpty(list) || 1 != list[id].status){//不存在分类，或分类被禁用
            return '';
        }
       //// console.log(list);
       // console.log(list[id]);
        //console.log(think.isNumber(field));
        return think.isEmpty(field) ? list[id] : list[id][field];
        }
    }

    async getallcate(){
        let lists = {}
        let cate=  await this.select()
        for(let v of cate) {
            if (v.allow_publish == 0){
                if (!think.isEmpty(v.name)) {
                    v.url = `/channel/${v.name}`
                } else {
                    v.url = `/channel/${v.id}`
                }
        }else {
                if (!think.isEmpty(v.name)) {
                    v.url = `/column/${v.name}`
                } else {
                    v.url = `/column/${v.id}`
                }
            }
            lists[v.id] = v
        }
        return lists;
    }
    /**
     * 获取参数的所有父级分类
     * @param int id 分类id
     * @param true true 带url
     * @return array 参数分类和父类的信息集合
     * @author
     */
    async get_parent_category(id,url){
        let breadcrumb = []
        while (id!=0)
        {
            let nav = await this.where({'id':id,'status':1}).field("id,title,pid,allow_publish,name,mold").find();
            if(url){
                    if(nav.mold == 2){
                        if (!think.isEmpty(nav.name)) {
                            nav.url = `/sp/${nav.name}`
                        } else {
                            nav.url = `/sp/${nav.id}`
                        }
                    }else {
                        if (nav.allow_publish == 0){
                            if (!think.isEmpty(nav.name)) {
                                nav.url = `/channel/${nav.name}`
                            } else {
                                nav.url = `/channel/${nav.id}`
                            }
                        }else {
                            if (!think.isEmpty(nav.name)) {
                                nav.url = `/column/${nav.name}`
                            } else {
                                nav.url = `/column/${nav.id}`
                            }
                        }
                    }

            }
            breadcrumb.push(nav);
            id = nav.pid;

        }
        return breadcrumb.reverse()
    }
    async get_sub_category(id){
        let cat = await this.select();
        let data = sub_cate(cat,id);
        //console.log(data);
        let arr=[];
        for (let v of data){
            if(think.isString(v)){
                for(let val of v.split(",")){
                    arr.push(Number(val));
                };
            }else {
                arr.push(v);
            }
        }

        return arr;
    }
    /**
     * 验证分类是否允许发布内容
     * @param id 分类id
     * @returns {boolean} true-允许发布内容，false-不允许发布内容
     */
    async check_category(id){
        if(think.isObject(id)){
            id.type = !think.isEmpty(id.type)?id.type:2;
            let type = await this.get_category(id.category_id,'type');
            type = type.split(",");
            return in_array(id.type,type);
        }else {
            let publish = await this.get_category(id,'allow_publish');
            return publish ? true : false;
        }
    }

    /**
     * 获取当前分类的文档类型
     * @param id
     * @returns {*}文档类型对象
     */
   async get_type_bycate(id){
        id=id||null;
        if(think.isEmpty(id)){
            return false
        }
       let type_list = think.config("document_model_type");
       let model_type = await this.where({id:id}).getField("type",1);

       model_type = model_type[0].split(",");

      for (let key in type_list){
          if(!in_array(key,model_type)){
              delete type_list[key];
          }
      }
  return type_list;
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    async updates(data){
        if(think.isEmpty(data)){
            return false;
        }
        let res;
        /* 添加或更新数据 */
        if(think.isEmpty(data.id)){
            data.create_time=new Date().getTime();
            data.model =think.isArray(data.model)? data.model.join(","):data.model;
            data.model_sub = think.isArray(data.model_sub)?data.model_sub.join(","):data.model_sub;
            data.type = think.isArray(data.type)?data.type.join(","):data.model;
            //console.log(data);
            res =await this.add(data);
            if(res){
                //构造权限
                let priv =[]
                if(!think.isEmpty(data.priv_roleid)){
                    if(think.isArray(data.priv_roleid)){
                        //构造 角色权限
                        for (let v of data.priv_roleid){
                            let arr = v.split(",")
                            let obj = {};
                            obj.catid = res;
                            obj.siteid=1;
                            obj.roleid= arr[1];
                            obj.action = arr[0];
                            obj.is_admin = 1;
                            priv.push(obj)
                        }
                    }else {
                        let arr = (data.priv_roleid).split(",")
                        priv.push({ catid:res, siteid: 1, roleid: arr[1], action: arr[0], is_admin: 1 })
                    }

                }
                if(!think.isEmpty(data.priv_groupid)){
                    //构造 用户组权限
                    if(think.isArray(data.priv_groupid)){
                        for (let v of data.priv_groupid){
                            let arr = v.split(",")
                            let obj = {};
                            obj.catid = res;
                            obj.siteid=1;
                            obj.roleid= arr[1];
                            obj.action = arr[0];
                            obj.is_admin = 0;
                            priv.push(obj)
                        }
                    }else {
                        let arr = (data.priv_groupid).split(",")
                        priv.push({ catid:res, siteid: 1, roleid: arr[1], action: arr[0], is_admin: 0 })
                    }

                }

                if(!think.isEmpty(priv)){
                    await this.model("category_priv").addMany(priv)
                }
            }
        }else{
            data.update_time=new Date().getTime();
            data.model =think.isArray(data.model)? data.model.join(","):data.model;
            data.model_sub = think.isArray(data.model_sub)?data.model_sub.join(","):data.model_sub;
            data.type = think.isArray(data.type)?data.type.join(","):"";
            res = await this.update(data);
            if(res){
                //构造权限
                let priv =[]
                if(!think.isEmpty(data.priv_roleid)){
                    if(think.isArray(data.priv_roleid)){
                        //构造 角色权限
                        for (let v of data.priv_roleid){
                            let arr = v.split(",")
                            let obj = {};
                            obj.catid = data.id;
                            obj.siteid=1;
                            obj.roleid= arr[1];
                            obj.action = arr[0];
                            obj.is_admin = 1;
                            priv.push(obj)
                        }
                    }else {
                        let arr = (data.priv_roleid).split(",")
                        priv.push({ catid:data.id, siteid: 1, roleid: arr[1], action: arr[0], is_admin: 1 })
                    }

                }
                if(!think.isEmpty(data.priv_groupid)){
                    //构造 用户组权限
                    if(think.isArray(data.priv_groupid)){
                        for (let v of data.priv_groupid){
                            let arr = v.split(",")
                            let obj = {};
                            obj.catid = data.id;
                            obj.siteid=1;
                            obj.roleid= arr[1];
                            obj.action = arr[0];
                            obj.is_admin = 0;
                            priv.push(obj)
                        }
                    }else {
                        let arr = (data.priv_groupid).split(",")
                        priv.push({ catid:data.id, siteid: 1, roleid: arr[1], action: arr[0], is_admin: 0 })
                    }

                }
                await this.model("category_priv").delete({where:{catid:data.id}});
                if(!think.isEmpty(priv)){
                    await this.model("category_priv").addMany(priv)
                }
            }
        }
        //清除缓存
        think.cache("sys_category_list",null); //栏目缓存
        think.cache("all_category",null); //栏目缓存
        think.cache("all_priv",null);//栏目权限缓存
        return res;

    }

    /**
     *
     */
    async get_all_category(map={}){
        //let list ="22";
        let list = await think.cache("all_category", () => {
            return this.get_colunm();
        }, {timeout: 365 * 24 * 3600});
        if(think.isEmpty(map)){
            return list;
        }else {
            return think._.filter(list, map);
        }

    }

    async get_colunm(){
        let lists= await this.where({status: 1}).field('id,title as name,name as title,pid,allow_publish,isapp,mold').order('pid,sort').select();
        for(let v of lists) {
            if(v.mold == 2){
                if (!think.isEmpty(v.title)) {
                    v.url = `/sp/${v.title}`
                } else {
                    v.url = `/sp/${v.id}`
                }
            }else {
                if (v.allow_publish == 0){
                    if (!think.isEmpty(v.title)) {
                        v.url = `/channel/${v.title}`
                    } else {
                        v.url = `/channel/${v.id}`
                    }
                }else {
                    if (!think.isEmpty(v.title)) {
                        v.url = `/column/${v.title}`
                    } else {
                        v.url = `/column/${v.id}`
                    }
                }
            }

        }
        // console.log(lists);
        return lists;
    }
}