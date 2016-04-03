// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
import crontab from "node-crontab";

let fn = () => {
    //定时任务具体逻辑
    //调用一个 Action
    //订单在规定时间位付款自动作废方法
    think.http("/admin/crontab/cloa", true);
}

//1 分钟执行一次
// let jobId = crontab.scheduleJob("*/1 * * * *", fn);
// 开发环境下立即执行一次看效果
// if(think.env === "development"){
//     fn();
// }
