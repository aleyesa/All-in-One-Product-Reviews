"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWT_EXPIRY = exports.JWT_SECRET = exports.PORT = exports.TEST_DATABASE = exports.PRODUCTION_DATABASE = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var PRODUCTION_DATABASE = 'mongodb://owner:productreview1@ds111063.mlab.com:11063/productreviewdb';
exports.PRODUCTION_DATABASE = PRODUCTION_DATABASE;
var TEST_DATABASE = 'mongodb://localhost/api-user-test';
exports.TEST_DATABASE = TEST_DATABASE;
var JWT_SECRET = process.env.JWT_SECRET || 'password';
exports.JWT_SECRET = JWT_SECRET;
var JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.JWT_EXPIRY = JWT_EXPIRY;
var PORT = process.env.PORT || 8080;
exports.PORT = PORT;