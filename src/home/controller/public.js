'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    think.log(this.referrer())
    return this.display();
  }
  /**
   * 更新微信头像
   */
  spiderImage(imgUrl,filePath) {
    let deferred = think.defer();
    http.get(imgUrl, function (res) {
      var imgData = "";
      res.setEncoding("binary");
      res.on("data", function (chunk) {
        imgData += chunk;
      });

      res.on("end", function () {
        fs.writeFileSync(filePath, imgData, "binary");
        deferred.resolve(filePath);
      });
    });
    return deferred.promise;
  }
  /**qq登陆回掉地址 */
  qccallbackAction(){
     return this.display();

  }
  /**获取qq登陆信息 */
  async loginresultAction(){
    let res = this.get();
     let qqapi = think.service("qqapi");
     let qq = new qqapi(res.access_token,res.openid);
     let userinfo =await qq.get_user_info();
     let qq_user=await this.model("qq_user").where({openid:res.openid}).find();
    if(think.isEmpty(qq_user)){
      userinfo.openid=res.openid;
      //think.log(userinfo);
      await this.model("qq_user").add(userinfo);
      this.redirect(`/public/qqlogin/id/${res.openid}`);
    }else {
      await this.model("qq_user").where({openid:res.openid}).update(userinfo);
      //检查qq号是否跟网站会员绑定
      if(think.isEmpty(qq_user.uid)){
        //没绑定跳转绑定页面
        this.redirect(`/public/qqlogin/id/${res.openid}`);

      }else {
        //更qq信头像
        let filePath=think.RESOURCE_PATH + '/upload/avatar/' + qq_user.uid;
        think.mkdir(filePath);
        //如果没有用户没有图像，使用QQ头像
        if(!think.isFile(filePath+'/avatar.png')){
          await this.spiderImage(userinfo.figureurl_qq_2||userinfo.figureurl_qq_1,filePath+'/avatar.png')
        }
        //绑定直接登陆
        let last_login_time = await this.model("member").where({id:qq_user.uid}).getField("last_login_time",true);
        let qq_userInfo = {
          'uid': qq_user.uid,
          'username': userinfo.nickname,
          'last_login_time': last_login_time,
        };
        await this.session('webuser', qq_userInfo);
        await this.model("member",{},"admin").autoLogin({id:qq_user.uid}, this.ip());//更新用户登录信息，自动登陆
        this.redirect("/user/index");
      }
    }
  }
  //qq用户绑定页面
  async qqloginAction(){
    let openid = this.get("id");
    let qq_user=await this.model("qq_user").where({openid:openid}).find();
    this.assign("qq_user",qq_user);
    this.meta_title="账号绑定"
    return this.display();
  }
  /**完善资料绑定 */
  async organizingAction(){
    let data = this.post();
    //验证
    let res;
    if(think.isEmpty(data.username)){
      return this.fail("用户昵称不能为空！");
    }else{
      res = await this.model("member").where({username:ltrim(data.username)}).find();
      if(!think.isEmpty(res)){
        return this.fail("用户昵称已存在，请重新填写！")
      }
    }
    if(think.isEmpty(data.mobile)){
      return this.fail("手机号码不能为空！")
    }else{
      res = await this.model("member").where({mobile:data.mobile}).find();
      if(!think.isEmpty(res)){
        return this.fail("手机号码已存在，请重新填写！")
      }
    }
    if(think.isEmpty(data.email)){
      return this.fail("电子邮箱不能为空！")
    }else{
      res = await this.model("member").where({email:data.email}).find();
      if(!think.isEmpty(res)){
        return this.fail("电子邮箱已存在，请重新填写！")
      }
    }
    if(think.isEmpty(data.password) && think.isEmpty(data.password2)){
      return this.fail("密码不能为空！")
    }else{

      if(data.password != data.password2){
        return this.fail("两次输入的密码不一致，请重新填写！")
      }
    }
    data.status = 1;
    data.reg_time = new Date().valueOf();
    data.reg_ip = _ip2int(this.ip());
    data.password = encryptPassword(data.password);
    let reg = await this.model("member").add(data);
    if(!think.isEmpty(reg)){
      await this.model("qq_user").where({openid:data.openid}).update({uid:reg});
      //更新微信头像
      let filePath=think.RESOURCE_PATH + '/upload/avatar/' +reg;
      think.mkdir(filePath)
      if(!think.isFile(filePath+'/avatar.png')){
        await this.spiderImage(data.headimgurl,filePath+'/avatar.png')
      }
    }
    console.log(data);
    await this.model("member",{},"admin").autoLogin({id:reg}, this.ip());//更新用户登录信息，自动登陆
    let wx_userInfo = {
      'uid':reg,
      'username': data.username,
      'last_login_time': data.reg_time,
    };
    await this.session('webuser', wx_userInfo);
    return this.success({name:"绑定成功",url:"/user/index"});


  }
}