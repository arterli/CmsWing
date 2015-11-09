/**
 * Created by arter on 2015/11/9.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
   indexAction(){
        this.assign({
            "datatables":true,
            "active":"/admin/auth/index",
            "tactive":"/admin/user",
            "selfjs":"auth"
        })

        return this.display();
    }

    async roleAction(){
        let gets = this.get();
        let draw = gets.draw;
        let res = await this.model('auth_role').field("id,desc,status,description").order("id ASC").select();
        let data={
            "draw": draw,
            "data": res
        }
        //console.log(data);
        return this.json(data);
    }

    async roleeditAction(){
        if(this.isAjax("post")){
            let id=this.post("id");
            let desc = this.post("desc");
            let description = this.post("description");
            let data = await this.model('auth_role').where({id:id}).update({desc:desc,description:description});
            return this.json(data);
        }else{
            let id = this.get("id");
            let res = await this.model('auth_role').where({id:id}).find();
            this.assign({
                data:res
            })
            return this.display();
        }
    }

    async roleaddAction(){
        let data=this.post();
        //console.log(1111111111111111)
        let res = await this.model('auth_role').add(data);

        if(res){
            return this.json(1);
        }else{
            return this.json(0)
        }
    }
    async roledelAction(){
        let id = this.post("id");
        //console.log(id);
        let res = await this.model('auth_role').where({id:id}).delete();
        return this.json(res);
    }
    accessAction(){
        //访问授权
        this.assign({
            "datatables":true,
            "active":"/admin/auth",
            "tactive":"/admin/user",
            "selfjs":"auth"
        })
        return this.display();
    }
    async testAction(){
      console.log(1111111111111);
     await this.returnNodes(false);
        this.end();
  }
    /**
     * 返回后台节点数据
     * @param boolean $tree    是否返回多维数组结构(生成菜单时用到),为false返回一维数组(生成权限节点时用到)
     * @retrun array
     *
     * 注意,返回的主菜单节点数组中有'controller'元素,以供区分子节点和主节点
     *
     * @author
     */
     async returnNodes(tree=true){
        let http = this.http;
        let modelname = http.module;
        let tree_nodes = {};
        //if ( tree && !think.isEmpty(tree_nodes) ) {
        //    return tree_nodes;
        //}
       if(tree){
            let list =await this.model('menu').field('id,pid,title,url,tip,hide').order('sort asc').select();
            list.forEach (value => {
                let url =value.url.toLocaleLowerCase()
                if( url.indexOf(modelname)!==0 ){
                    value.url = modelname+'/'+value['url'];
                }
               //console.log(value['url']);
            })

            let nodes = get_children(list,0);
            //nodes.forEachach ( value => {
            //    if(!empty($value['operator'])){
            //        $nodes[$key]['child'] = $value['operator'];
            //        unset($nodes[$key]['operator']);
            //    }
            //})
        }else{
            let nodes = await this.model('menu').field('title,url,tip,pid').order('sort asc').select();
            nodes.forEach ( value => {
                let url =value.url.toLocaleLowerCase()
                if( url.indexOf(modelname)!==0 ){
                    value.url = modelname+'/'+value['url'];
                }
            })
           console.log(nodes);
        }
        //tree_nodes   = nodes;
       // return nodes;
    }

}