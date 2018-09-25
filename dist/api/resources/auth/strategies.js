"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtStrategy = exports.localStrategy = void 0;

var _userModels = require("../user/userModels");

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _config = require("../../../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = _passportJwt.default.Strategy,
    ExtractJwt = _passportJwt.default.ExtractJwt;
var localStrategy = new _passportLocal.default.Strategy(function (username, password, callbackfn) {
  _userModels.User.findOne({
    username: username
  }).then(function (user) {
    user.comparePw(password, user.password).then(function (user) {
      if (user) {
        console.log('Login was successful.');
        return callbackfn(null, user);
      } else {
        console.log('Login was not successful, invalid password.');
        return callbackfn(null, false);
      }
    });
  });
});
exports.localStrategy = localStrategy;
var jwtStrategy = new Strategy({
  secretOrKey: _config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
}, function (payload, done) {
  console.log(payload);
  done(null, payload);
});
exports.jwtStrategy = jwtStrategy;