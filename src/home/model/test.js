'use strict';
/**
 * model
 */
export default class extends think.model.base {
   async test(){
       let date = new Date();
       let y = date.getFullYear();
       let m = date.getMonth()+1 <10 ?"0"+(date.getMonth()+1):date.getMonth()+1;
       let d = date.getDate()<10?"0"+date.getDate():date.getDate();
       let v_timestr = y+m+d;
       // let v_timestr =;
       let prefix=think.parseConfig(true,think.config("db")).prefix;
       await this.execute(`call seq_no(1)`);
       let order_no= await this.query(`SELECT CONCAT(${v_timestr},LPAD(order_sn,7,0)) AS order_sn FROM cmswing_order_seq WHERE timestr=${v_timestr}`);
       return order_no[0].order_sn;
   }
}