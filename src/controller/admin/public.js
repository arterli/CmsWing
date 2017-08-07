// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Controller {
    /**
     * public action
     * @return {Promise} []
     */
    async signinAction() {

        //用户登录
        let is_login = await this.islogin();
        if (this.isAjax()) {
            //console.log(this.isAjax());
           // console.log(this.post());
            //验证码
            if (1 == this.config('setup.GEETEST_IS_ADMLOGIN')) {
                const geetest = this.service("geetest");
                let res = await geetest.validate(this.ctx,this.post());
                //console.log(res);
                if ("success" != res.status) {
                    const error = this.controller('common/error');
                    return error.noAction("验证码不正确");
                }
            }

            let username = this.post('username');
            let password = this.post('password');
            password = encryptPassword(password);
            let res = await this.model("member").signin(username, password, this.ip, 1, 1);
            if (0 < res.uid) {
                //记录用户登录行为
                //await this.model("action").log("user_login","member",res.uid,res.uid,this.ip,this.ctx.url);
                //console.log(11111111111111);
                await this.session('userInfo', res);
                //TODO 用户密钥
                // this.redirect('/admin/index');
                return this.success({name:"登陆成功!",url:"/admin/index"});
            } else { //登录失败
                let fail;
                switch (res) {
                    case -1:
                        fail = '用户不存在或被禁用';
                        break; //系统级别禁用
                    case -2:
                        fail = '密码错误';
                        break;
                    case -3:
                        fail = '您无权登陆后台！';
                        break;
                    default:
                        fail = '未知错误';  // 0-接口参数错误（调试阶段使用）
                }
                const error = this.controller('common/error');
                return error.noAction(fail);
            }

        } else {
            if (is_login) {
                this.redirect('/admin/index');
            } else {
                return this.display();
            }
        }
    }

    /**
     * 退出登陆
     * @returns {Promise.<void>}
     */
    async logoutAction() {
        //退出登录
        let is_login = await this.islogin();
        if (is_login) {
            await this.session('userInfo', null);
            this.redirect('/admin/public/signin');
        } else {
            this.redirect('/admin/public/signin');
        }
    }

    async islogin() {
        let user = await this.session('userInfo');
        let res = think.isEmpty(user) ? false : true;
        return res;
    }

    verAction() {
        this.end("df11df")
    }

    //验证菜单标示是否重复
    async categorynameAction() {
        let name = this.get('name');
        let pid = this.get('pid');
        let res = await this.model("category").where({name: name, pid: pid}).find();
        if (!think.isEmpty(res)) {
            return this.json({"message": "your custom message"});
        } else {
            return this.json(1);
        }

    }

    //选择分离
    async selectcateAction() {
        this.meta_title = "选择分类"
        return this.display();
    }

    //获取分类
    async getmenuAction() {
        let cate = await this.model("category").get_all_category();
        //console.log(cate);
        //生成菜单

        for (let val of cate) {
            let id = think.isEmpty(val.title) ? val.id : val.title;
            val.url = `/${id}`;

        }
        //think.log(cate);
        return this.json(arr_to_tree(cate, 0))
    }

//验证码
    async geetestAction() {
        let geetest = this.service("geetest"); //加载 commoon 模块下的 geetset service
        if (this.isPost) {
            let post = this.post();
            //console.log(post);
            let res = await geetest.validate(this.ctx,post);
            return this.json(res);
        } else {
            let res = await geetest.register(this.ctx);
            //console.log(res);
            return this.json(res);
        }


    }

    async validate(data) {
        let deferred = think.defer();
        geetest.validate({

            challenge: data.geetest_challenge,
            validate: data.geetest_validate,
            seccode: data.geetest_seccode

        }, function (err, result) {
            console.log(result);
            var data = {status: "success"};

            if (err || !result) {
                console.log(err);
                data.status = "fail";
            }

            deferred.resolve(data);
        });
        return deferred.promise;
    }

    /**
     * 关键词自动完成
     */
    async getkeywordAction() {
        let term = this.get("term");
        let data = await this.model("keyword").where({keyname: ["LIKE", `%${term}%`]}).field("id,keyname as label,keyname as value").select()
        return this.json(data);
    }

    /**
     * 关联字段
     * @returns {Promise<PreventPromise>}
     */
    async getrelationAction() {
        let model = this.get("model");
        let id = this.get("id");
        let val = this.get("val");
        let key = this.get("key");
        let map = {};
        map[val] = ["like", "%" + key + "%"]
        let data = await this.model(model).where(map).field(`${id} as id, ${val} as data`).select();
        return this.end(data);
    }

    /**
     * 验证表内字段是否重复
     * /public/remote/table/要验证的表名
     * @returns {Promise<PreventPromise>}
     */
    async remoteAction() {
        let data = this.get();
        let table = this.get('table');
        for (let v in data) {
            data[v] = think._.trim(data[v]);
        }
        delete data.table;
        let res = await this.model(table).where(data).find();
        if (think.isEmpty(res)) {
            return this.json(1);
        } else {
            return this.json(0);
        }
    }
}