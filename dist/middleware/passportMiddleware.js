'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtAuthenticate = exports.localAuthenticate = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _strategies = require('../api/resources/auth/strategies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use(_strategies.jwtStrategy);
_passport2.default.use(_strategies.localStrategy);

var localAuthenticate = _passport2.default.authenticate('local', { session: false });
var jwtAuthenticate = _passport2.default.authenticate('jwt', { session: false });

exports.localAuthenticate = localAuthenticate;
exports.jwtAuthenticate = jwtAuthenticate;