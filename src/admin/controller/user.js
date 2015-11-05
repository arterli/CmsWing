/**
 * Created by Arterli on 2015/11/2.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    init(http) {
        super.init(http);
        this.db=this.model("member")
    }

    indexAction(){
        this.assign({
            "datatables":true,
            "active":""
        })
        return this.display();
    }

    async userlistAction(){
        let gets = this.get()
        let start = parseInt(gets.start)+1;
        let length = gets.length;
        let draw = gets.draw;

            console.log(start);
        let userList =await this.db.page(start, length).field("id,username,score,login,last_login_ip,last_login_time,status").countSelect()
        userList.data.forEach(v=>{
            v.last_login_time=times(v.last_login_time)
            v.last_login_ip=_int2iP(v.last_login_ip)
        })
        console.log(userList)
        let data={
            "draw": draw,
            "recordsTotal": userList.count,
            "recordsFiltered": userList.count,
            "data": userList.data
        }
       return this.json(data);
    }
}