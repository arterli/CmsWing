'use strict';
/**
 * error controller
 */

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _default = (function (_think$controller$base) {
  _inherits(_default, _think$controller$base);

  function _default() {
    _classCallCheck(this, _default);

    _think$controller$base.apply(this, arguments);
  }

  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */

  _default.prototype.displayErrorPage = function displayErrorPage(status) {
    var module = 'common';
    if (think.mode !== think.mode_module) {
      module = this.config('default_module');
    }
    var file = module + '/error/' + status + '.html';
    var options = this.config('tpl');
    options = think.extend({}, options, { type: 'ejs' });
    return this.display(file, options);
  };

  /**
   * Bad Request 
   * @return {Promise} []
   */

  _default.prototype._400Action = function _400Action() {
    return this.displayErrorPage(400);
  };

  /**
   * Forbidden 
   * @return {Promise} []
   */

  _default.prototype._403Action = function _403Action() {
    return this.displayErrorPage(403);
  };

  /**
   * Not Found 
   * @return {Promise}      []
   */

  _default.prototype._404Action = function _404Action() {
    return this.displayErrorPage(404);
  };

  /**
   * Internal Server Error
   * @return {Promise}      []
   */

  _default.prototype._500Action = function _500Action() {
    return this.displayErrorPage(500);
  };

  /**
   * Service Unavailable
   * @return {Promise}      []
   */

  _default.prototype._503Action = function _503Action() {
    return this.displayErrorPage(503);
  };

  return _default;
})(think.controller.base);

exports['default'] = _default;
module.exports = exports['default'];