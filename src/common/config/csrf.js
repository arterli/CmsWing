/**
 * Created by arter on 2016/3/29.
 */
export default {
    session_name: "__CSRF__", // Token 值存在 session 的名字
    form_name: "__CSRF__", // CSRF 字段名字，从该字段获取值校验
    errno: 400, //错误号
    errmsg: "token error" // 错误信息
};