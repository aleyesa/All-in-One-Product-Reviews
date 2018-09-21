'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtStrategy = exports.localStrategy = undefined;

var _userModels = require('../user/userModels');

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _config = require('../../../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = _passportJwt2.default.Strategy,
    ExtractJwt = _passportJwt2.default.ExtractJwt;


var localStrategy = new _passportLocal2.default.Strategy(function (username, password, callbackfn) {
  _userModels.User.findOne({ username: username }).then(function (user) {
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

var jwtStrategy = new Strategy({
  secretOrKey: _config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
}, function (payload, done) {
  done(null, payload.user);
});

exports.localStrategy = localStrategy;
exports.jwtStrategy = jwtStrategy;