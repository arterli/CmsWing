'use strict';
/**
 * config
 */
export default {
  //key: value
    //port:8888
    route_on: true,
    resource_on: true,
    resource_reg: /^(upload\/|backup\/|static\/|[^\/]+\.(?!js|html)\w+$)/,
    /* 文档模型配置 (文档模型核心配置，请勿更改) */
    document_model_type: {2 : '主题', 1 : '目录', 3 : '段落'},
    user_administrator :[1],//数组格式，可以配置多个[1,2,3]
};