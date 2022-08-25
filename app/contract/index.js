'use strict';
// a.position.参数的位置,该值可以是body/path/query/header/formData.
// b.Type.参数类型，body之外位置目前只支持基础类型,integer/string/boolean/number，及基础类型构成的数组，body中则支持contract中定义的类型。如果position是formData还将支持 file 类型
// c.Name.参数名称.如果参数名称以*开头则表示必要，否则非必要。
// d.Description.参数描述
// c.如果你想给query或者path的参数设置example，你可以在Description前添加以'eg:'开头的参数，实例如下
module.exports = {
  tokenReq: {
    token: { type: 'string', description: '用户token', required: true, example: 'fdsafaslfjdsafjdadsafkjhfjdakj' },
  },
  baseRes: {
    status: { type: 'integer', required: true, example: 0 },
    data: { type: 'string', required: true, example: '请求成功' },
    msg: { type: 'string', required: true, example: 'ok' },
  },
  loginPost: {
    username: { type: 'string', required: true, example: 'username' },
    password: { type: 'string', required: true, example: 'password' },
  },
};
