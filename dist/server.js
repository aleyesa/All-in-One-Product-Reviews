'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _appMiddleware = require('./middleware/appMiddleware');

var _appMiddleware2 = _interopRequireDefault(_appMiddleware);

var _api = require('./api/api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config/config');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//Use static assets
app.use(_express2.default.static('public'));

//Connect to test database
_mongoose2.default.connect(_config.PRODUCTION_DATABASE, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('database has been connected.');
  }
});

//load and use middlewares
(0, _appMiddleware2.default)(app, _express2.default);
//use express application and connect
(0, _api2.default)(app);

exports.default = app;