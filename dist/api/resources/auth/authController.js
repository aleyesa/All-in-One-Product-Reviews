"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newJWT = exports.validateLogin = exports.registerUser = void 0;

var _userModels = require("../user/userModels");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../../../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createAuthToken = function createAuthToken(user) {
  return _jsonwebtoken.default.sign({
    user: user
  }, _config.JWT_SECRET, {
    subject: user.username,
    expiresIn: _config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
}; //request to register a new user, with a given username and password


var registerUser = function registerUser(req, res) {
  var requiredFields = ['username', 'password'];
  var missingField = requiredFields.find(function (field) {
    return !(field in req.body);
  }); //check if username and password values are strings

  if (!missingField) {
    if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
      req.body.username = req.body.username.trim();

      _userModels.User.find({
        username: req.body.username
      }).then(function (user) {
        if (!user) {
          console.log("The user '".concat(user.username, " has already been taken."));
        } else {
          if (req.body.password !== req.body.password.trim()) {
            console.log('no spaces allowed in the beginning or end of password.');
          } else {
            if (req.body.password.length < 8) {
              console.log('Password needs to be at least 8 characters long.');
            } else {
              _userModels.User.hashPassword(req.body.password).then(function (pw) {
                req.body.password = pw;

                _userModels.User.create(req.body).then(function (user) {
                  return res.status(201).json("".concat(user.username, " has been created."));
                });
              }).catch(function (err) {
                return console.log("failed to create user. \n ".concat(err.message, " "));
              });
            }
          }
        }
      });
    } else {
      console.log('username or password is not a string value.');
    }
  } else {
    console.log("".concat(missingField, " field is missing."));
  }
}; //request a JWT/ A valid username and password are required, and a new token is given in exchange.


exports.registerUser = registerUser;

var validateLogin = function validateLogin(req, res) {
  var authToken = createAuthToken({
    username: req.body.username
  });
  res.status(202).json({
    authToken: authToken
  });
}; //request a new JWT with a laster expiry date. A valid, non-expired JWT is required.


exports.validateLogin = validateLogin;

var newJWT = function newJWT(req, res) {
  var authToken = createAuthToken(req.user);
  res.status(202).json({
    authToken: authToken
  });
};

exports.newJWT = newJWT;