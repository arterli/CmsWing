/**
 * Created by arter on 2016/3/31.
 * 定时执行任务
 */
import crontab from "node-crontab";

let fn = () => {
    //定时任务具体逻辑
    //调用一个 Action
    //订单在规定时间位付款自动作废方法
    think.http("/admin/crontab/cloa", true);
}

//1 分钟执行一次
let jobId = crontab.scheduleJob("*/1 * * * *", fn);
// 开发环境下立即执行一次看效果
// if(think.env === "development"){
//     fn();
// }
