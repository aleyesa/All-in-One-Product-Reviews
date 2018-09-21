'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userRouter = require('./resources/user/userRouter');

var _userRouter2 = _interopRequireDefault(_userRouter);

var _authRouter = require('./resources/auth/authRouter');

var _authRouter2 = _interopRequireDefault(_authRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/api', _userRouter2.default);
  app.use('/api', _authRouter2.default);
  app.listen(8080, function (err) {
    if (!err) {
      console.log('listening to port 8080.');
    } else {
      console.log(err.message);
    }
  });
};