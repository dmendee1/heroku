'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var regexResult = /^[\w](?:[\w-]{0,61}[\w])?$/.test(name);

  return opts.blacklist ? regexResult && _data2.default.blacklist.indexOf(name) === -1 : regexResult;
};

var _data = require('../data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }