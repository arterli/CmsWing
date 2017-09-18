module.exports = class extends think.Logic {
  updateAction() {
    const rules = {
      name: {
        alphaNumericDash: true
      },
      title: {
        required: true
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
      // 如果出错，返回
      // {"errno":1000,"errmsg":"validate error","data":{"username":"username can not be blank"}}
    }
  }
};
