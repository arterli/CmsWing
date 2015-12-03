'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    init(http) {
        super.init(http);
        // http.action = http.method.toLowerCase();
        //console.log(http.method.toLowerCase())

    }

    async __before(action) {
        //登陆验证
        let is_login = await this.islogin();
        if (!is_login) {
            this.redirect('/admin/public/signin');
        }
        //用户信息
        let user = await this.session('userInfo');
        this.assign("userinfo",user);
        //网站配置
        this.setup = await this.model("setup").getset();
        //后台菜单
        this.adminmenu = await this.model('menu').adminmenu();
        this.assign("setup",this.setup);
        //菜单当前状态
        let http = this.http;
        this.active=http.pathname.replace(/admin\//,""),
        //this.active = http.controller+'/'+http.action;
            think.log(this.active);
        this.assign({
            "navxs": false,
            "active": "/admin",
            "tactive": "/admin",
            "selfjs": "admin",
            "datatables": false,
            "bg": "bg-black"

        })
    }

    async islogin() {
        //判断是否登录
        let user = await this.session('userInfo');

        let res = think.isEmpty(user) ? false : true;
        return res;
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
    async returnnodes(tree = true) {
        let http = this.http;
        let modelname = http.module;
        let tree_nodes = [];
        if (tree && !think.isEmpty(tree_nodes)) {
            return tree_nodes;
        }
        let nodes;
        if (tree) {
            var list = await this.model('menu').field('id,pid,title,url,tip,hide').order('sort asc').select();
            list.forEach(value => {
                let url = value.url.toLocaleLowerCase()
                if (url.indexOf(modelname) !== 0) {
                    value.url = modelname + '/' + value['url'];
                }
                //console.log(value['url']);
            })

            nodes = get_children(list, 0);
            //nodes.forEachach ( value => {
            //    if(!empty($value['operator'])){
            //        $nodes[$key]['child'] = $value['operator'];
            //        unset($nodes[$key]['operator']);
            //    }
            //})
        } else {
            nodes = await this.model('menu').field('title,url,tip,pid').order('sort asc').select();
            nodes.forEach(value => {
                let url = value.url.toLocaleLowerCase()
                if (url.indexOf(modelname) !== 0) {
                    value.url = modelname + '/' + value['url'];
                }
            })
            //console.log(nodes);
        }
        tree_nodes = nodes;
        return nodes;
    }
}