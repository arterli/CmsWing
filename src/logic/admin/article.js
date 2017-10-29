module.exports = class extends think.Logic {
  async updateAction() {
    // 先完成新建验证
    const model_id = this.post('model_id');
    const fields = await this.model('cmswing/attribute').get_model_attribute(model_id, true);

    // 验证数据合法 -- 只要有一个不合法就返回
    for (const key in fields) {
      for (const item of fields[key]) {
        const res = this.fieldValidate(item);
        if (res != null) {
          return this.fail('validate error', res);
        }
      }
    }

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

  // 进行数据验证
  fieldValidate(field) {
    // 先验证一个长度试一下
    if (field.validate_type == 'length') {
      // 规则
      let obj = {}, rules = {};
      obj[field.validate_type] = JSON.parse(field.validate_rule);
      obj.aliasName = field.title;
      rules[field.name] = obj;
      // 消息
      const msgs = {};
      msgs[field.validate_type] = `{name}:  ${field.error_info || ''}`;
      const flag = this.validate(rules, msgs);
      // console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=", flag, rules);
      if (!flag) {
        return this.validateErrors;
      }
    }
    return null;
  }
};
