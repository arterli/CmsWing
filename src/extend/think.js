/**
 * Created by arter on 2017/7/9.
 */
const lodash = require('lodash');
const path = require('path');
module.exports = {
  _: lodash,
  resource: path.join(think.ROOT_PATH, 'www'),
  cmswing: {
    info: require(path.join(think.ROOT_PATH, 'package.json')),
    admin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'admin')),
    home: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'home')),
    center: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'center')),
    modIndex: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'modindexbase')),
    modAdmin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'modadminbase')),
    extIndex: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'extindexbase')),
    extAdmin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'extadminbase')),
    rest: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'rest'))
  },
  extModel(modelName = '', extName = '', config = think.config('model.mysql'), prefix = 'ext_') {
    try {
      const Cls = think.app.controllers[`ext/${extName}/model/${modelName}`];
      return new Cls(`${prefix}${modelName}`, config);
    } catch (e) {
      return think.model(`${prefix}${modelName}`);
    }
  },
  extService(name = '', ser = '', ...args) {
    const Cls = think.app.controllers[`ext/${ser}/service/${name}`];
    if (think.isFunction(Cls)) return new Cls(...args);
    return Cls;
  },
  modModel(modelName = '', extName = '', config = think.config('model.mysql'), prefix = '') {
    try {
      const Cls = think.app.controllers[`mod/${extName}/model/${modelName}`];
      return new Cls(`${prefix}${modelName}`, config);
    } catch (e) {
      return think.model(`${prefix}${modelName}`);
    }
  },
  modService(name = '', ser = '', ...args) {
    const Cls = think.app.controllers[`mod/${ser}/service/${name}`];
    if (think.isFunction(Cls)) return new Cls(...args);
    return Cls;
  }
};
