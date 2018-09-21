'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWT_EXPIRY = exports.JWT_SECRET = exports.TEST_DATABASE = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var TEST_DATABASE = 'mongodb://localhost/api-user-test';
// exports.DATABASE_URL =
//     process.env.DATABASE_URL ||
//     global.DATABASE_URL ||
//     'mongodb://localhost/jwt-auth-demo';
// exports.PORT = process.env.PORT || 8080;
var JWT_SECRET = process.env.JWT_SECRET;
var JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.TEST_DATABASE = TEST_DATABASE;
exports.JWT_SECRET = JWT_SECRET;
exports.JWT_EXPIRY = JWT_EXPIRY;