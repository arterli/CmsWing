'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  __before(action){

    this.assign({
      "navxs":false,
      "bg":"bg-black"
    });
  }
}