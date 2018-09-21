'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passportMiddleware = require('../../../middleware/passportMiddleware');

var _userController = require('./userController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import userRouter
var userRouter = _express2.default.Router();

//route to get a list of all users
userRouter.get('/user', _userController.getAllUsers);

//main route for requests in regards to users by id
userRouter.get('/user/:id', _userController.getUser);
userRouter.put('/user/:id', _passportMiddleware.jwtAuthenticate, _userController.updateUser);
userRouter.delete('/user/:id', _passportMiddleware.jwtAuthenticate, _userController.deleteUser);

//show PRPost
userRouter.get('/post', _userController.getPosts);
userRouter.post('/post', _passportMiddleware.jwtAuthenticate, _userController.createPost);

userRouter.get('/post/:id', _userController.getPost);
userRouter.post('/post/:id', _passportMiddleware.jwtAuthenticate, _userController.addComment);
userRouter.put('/post/:id', _passportMiddleware.jwtAuthenticate, _userController.editPost);
userRouter.delete('/post/:id', _passportMiddleware.jwtAuthenticate, _userController.deletePost);

userRouter.put('/reply/:id', _passportMiddleware.jwtAuthenticate, _userController.addReply);

exports.default = userRouter;