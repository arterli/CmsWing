'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
 async snAction(){
    // let date = new Date();
    // let y = date.getFullYear();
    // let m = date.getMonth()+1 <10 ?"0"+(date.getMonth()+1):date.getMonth()+1;
    // let d = date.getDate()<10?"0"+date.getDate():date.getDate();
    // let v_timestr = y+m+d;
    let prefix=think.parseConfig(true,think.config("db")).prefix;
    let oo = await this.model().query(`call seq_no(1)`);//TODO
    // let order_no= await this.query(`SELECT CONCAT(${v_timestr},LPAD(order_sn,7,0)) AS order_sn FROM cmswing_order_seq WHERE timestr=${v_timestr}`);
    this.end(oo[0][0]["order_sn"])
  }
}