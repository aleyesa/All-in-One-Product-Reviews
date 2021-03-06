"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _appMiddleware = _interopRequireDefault(require("./middleware/appMiddleware"));

var _api = _interopRequireDefault(require("./api/api"));

var _config = require("./config/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var server; //Use static assets

app.use(_express.default.static('public')); //load and use middlewares

(0, _appMiddleware.default)(app, _express.default); //use express application and connect

(0, _api.default)(app);

if (require.main === module) {
  _mongoose.default.connect(_config.PRODUCTION_DATABASE, function (err) {
    console.log('db connected.');

    if (err) {
      return console.log(err);
    }

    server = app.listen(_config.PORT, function () {
      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.PORT;
      console.log("Your app is listening on port ".concat(port));
    }).on('error', function (err) {
      _mongoose.default.disconnect();

      console.log(err);
    });
  });
}

var _default = app;
exports.default = _default;