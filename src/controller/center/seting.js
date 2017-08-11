// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Home = require('../common/home');
const Jimp = require('jimp')
module.exports = class extends Home {
  /**
   * index action
   * @return {Promise} []
   */
  //   用户设置
  async indexAction() {
    //判断是否登陆
    await this.weblogin();
    //获取用户信息
    let userInfo = await this.model("member").find(this.user.uid);
      console.log(userInfo);
      //console.log(userInfo);
    this.assign("userInfo", userInfo);
    let province, city, county;
    //获取省份
    if (this.isMobile) {
      province = await this.model('area').where({id: userInfo.province}).getField("name", true);
      city = await this.model('area').where({id: userInfo.city}).getField("name", true);
      county = await this.model('area').where({id: userInfo.county}).getField("name", true);
    } else {
      province = await this.model('area').where({parent_id: 0}).select();
      city = await this.model('area').where({parent_id: userInfo.province}).select();
      county = await this.model('area').where({parent_id: userInfo.city}).select();
    }

    this.assign("province", province);
    this.assign("city", city);
    this.assign("county", county);
    this.meta_title = "用户设置";
    //判断浏览客户端
    if (this.isMobile) {
      this.active = "user/index";
      return this.display(this.mtpl())
    } else {
      return this.display();
    }
  }

  //更新用户信息
  async updateinfoAction() {
    //判断是否登陆
    await this.weblogin();
    let data = this.post();
    // think.log(data);
    let member = {
      email: data.email,
      mobile: data.mobile,
      real_name: data.real_name,
      sex: data.sex,
      birthday: new Date(data.birthday).getTime(),
      province: data.province,
      city: data.city,
      county: data.county,
      addr: data.addr
    }

    //判断浏览客户端
    if (this.isMobile) {
      if (!think.isEmpty(data.city_picke)) {
        let city_picke = data.city_picke.split(" ");
          member.province = await this.model("area").where({
          name: ["like", `%${city_picke[0]}%`],
          parent_id: 0
        }).getField("id", true);
          member.city = await this.model("area").where({
          name: ["like", `%${city_picke[1]}%`],
          parent_id: member.province
        }).getField("id", true);
          member.county = await this.model("area").where({
          name: ["like", `%${city_picke[2]}%`],
          parent_id: member.city
        }).getField("id", true);
      }
    }

    let update = await this.model("member").where({id: this.user.uid}).update(member);
    // think.log(customer);
    if (update ) {
      return this.success({name: "更新用户资料成功！"})
    } else {
      return this.fail("更新失败！")
    }

  }

  //修改密码
  async updatepasswordAction() {
    //判断是否登陆
    await this.weblogin();
    let data = this.post();
    if(think.isEmpty(data.password)){
      return this.fail("请填写新密码！")
    }
    let password = await this.model("member").where({id: this.user.uid}).getField("password", true);
    if (password === encryptPassword(data.oldpassword)) {
      await this.model("member").where({id: this.user.uid}).update({password: encryptPassword(data.password)})
      return this.success({name: "密码修改成功，请用新密码重新登陆！"});
    } else {
      return this.fail("旧密码不正确，请重新输入。")
    }

  }

  //上传头像
  async updateavatarAction() {
    //判断是否登陆
    await this.weblogin();
    let file = think.extend({}, this.file('file'));
    //console.log(file);
    //think.log(avatar_data);
    var filepath = file.path;
    //文件上传后，需要将文件移动到项目其他地方，否则会在请求结束时删除掉该文件
    var uploadPath = think.resource + '/upload/avatar/' + this.user.uid;
    think.mkdir(uploadPath);
    let res;
    if (this.isMobile) {
      let jimp2 = ()=> {
        console.log(111)
        let deferred = think.defer();
        let self = this;
        Jimp.read(filepath, function (err, lenna) {
          if (err) throw err;
          lenna.resize(200, 200)            // resize
              .quality(60)                 // set JPEG quality
              .write(uploadPath + "/avatar.png", function (e, r) {
                deferred.resolve('/upload/avatar/' + self.user.uid + "/avatar.png");
              }); // save
        });
        return deferred.promise;
      }
      res = await jimp2();
    } else {
      let post = this.post();
      let avatar_data = JSON.parse(post.avatar_data);
      let jimp = () => {
        let deferred = think.defer();
        let self = this;
        Jimp.read(filepath, function (err, lenna) {
          //console.log(lenna)

          if (err) throw err;
          lenna.crop(avatar_data.x, avatar_data.y, avatar_data.width, avatar_data.height)            // resize
              .quality(60)
              .write(uploadPath + "/avatar.png", function (e, r) {
                deferred.resolve('/upload/avatar/' + self.user.uid + "/avatar.png");
              }); // save

        });
        return deferred.promise;
      }
      res = await jimp();
    }


    //think.log(res);
    let data = {
      "result": res,
      "errno": 0,
      "message": "头像上传成功！"
    }
    return this.json(data);
  }
}