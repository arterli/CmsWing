'use strict';

import Base from './base.js';

export default class extends Base {
     init(http) {
        super.init(http);
        this.tactive = "shop"
    }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  
   async goodsAction(){
    // let model = this.model('menu');
    // let data = await model.select();
    // data= arr_to_tree(data,0)
    //this.end(data);
    //data returns [{name: 'thinkjs', email: 'admin@thinkjs.org', ...},...]
    
      return this.display();
      }
      
    ipAction(){
        let ip = this.http.ip();
        ip=_ip2int(ip);
        ip = _int2iP(ip);
        this.end(ip);
    }
    editAction(){
        if(this.isPost()){
            let post = this.post();
            console.log(post);
            //this.end(post);
        }else{
             return this.display();
        }
      
    }
}