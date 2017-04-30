'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  __before(){

  }
    async getAction(){
        // console.log(this.get("aa"));
        // let user = await this.model("member").select();
        // console.log(user);
        let data;
        if (this.id) {
            let pk = await this.modelInstance.getPk();
            data = await this.modelInstance.where({[pk]: this.id}).find();
            return this.success(data);
        }
        data = await this.modelInstance.get_all_category();
        return this.success(arr_to_tree(data,0));
    }
    async postAction(){
        return this.fail(think.locale('ACTION_INVALID', this.http.action, this.http.url));
        let pk = await this.modelInstance.getPk();
        let data = this.get();
        delete data[pk];
        if(think.isEmpty(data)){
            return this.fail('data is empty');
        }
        let insertId = await this.modelInstance.add(data);
        return this.success({id: insertId});
    }
    async deleteAction(){
        return this.fail(think.locale('ACTION_INVALID', this.http.action, this.http.url));
        if (!this.id) {
            return this.fail('params error');
        }
        let pk = await this.modelInstance.getPk();
        let rows = await this.modelInstance.where({[pk]: this.id}).delete();
        return this.success({affectedRows: rows});
    }
    async putAction(){
        return this.fail(think.locale('ACTION_INVALID', this.http.action, this.http.url));
        if (!this.id) {
            return this.fail('params error');
        }
        let pk = await this.modelInstance.getPk();
        let data = this.get();
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        let rows = await this.modelInstance.where({[pk]: this.id}).update(data);
        return this.success({affectedRows: rows});
    }
    __call(){
        return this.fail(think.locale('ACTION_INVALID', this.http.action, this.http.url));
    }
}