// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Model {
    /**
     * 添加审核
     * @param model
     * @param uid
     * @param title
     * @param data
     * @returns {Promise}
     */
  async adds(model,uid,title,data){
      let res = await this.add({model:model,uid:uid,title:title,data:JSON.stringify(data),time:new Date().getTime()});
      return res;
  }
}