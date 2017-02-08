'use strict';

export default class extends think.controller.base {
    init(http) {
        super.init(http);
    }

    async checkAction(){
        let map = this.get();
        let c = await this.model("author").where(map).find();
        if(think.isEmpty(c)){
            return this.json(1);
        }else {
            return this.json(0);
        }
    }
}