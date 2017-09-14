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
    ModIndex: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'modindexbase')),
    ModAdmin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'modadminbase')),
    ExtIndex: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'extindexbase')),
    ExtAdmin: require(path.join(think.ROOT_PATH, 'src', 'controller', 'cmswing', 'extadminbase'))
  }
};
