"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userRouter = _interopRequireDefault(require("./resources/user/userRouter"));

var _authRouter = _interopRequireDefault(require("./resources/auth/authRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  app.use('/api', _userRouter.default);
  app.use('/api', _authRouter.default);
};

exports.default = _default;