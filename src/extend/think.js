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
  }
};
