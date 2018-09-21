'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReply = exports.addComment = exports.editPost = exports.deletePost = exports.createPost = exports.getPosts = exports.getPost = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = undefined;

var _userModels = require('./userModels');

//used for get request to get all users and some of the users account info.
var getAllUsers = function getAllUsers(req, res) {
  //need check for required keys first
  _userModels.User.find().select(['-__v']).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    return res.status(400).log(err.message);
  });
};

//used for another get request to get a specific user by id.
//import
var getUser = function getUser(req, res) {
  _userModels.User.findById(req.params.id).then(function (user) {
    res.json(user);
  }).catch(function (err) {
    res.json(err + ', user id not found.');
    console.log(err + ', user id not found.');
  });
};

//Used for put request to update a users account info.
//Task: ***If changing password must encrypt it.
var updateUser = function updateUser(req, res) {
  //check if req body has unspecified keys
  _userModels.User.findByIdAndUpdate(req.params.id, req.body).select(['-password', '-__v']).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    return res.status(400).json(err.message);
  });
};

//Used for delete request to delete a specified user by username and password.
var deleteUser = function deleteUser(req, res) {
  //to delete user we need to get the username and password
  _userModels.User.findByIdAndRemove(req.params.id).then(function (user) {
    return res.json('The user ' + user.username + ' account has been deleted.');
  }).catch(function (err) {
    res.status(400).json('Incorrect username or password, could not delete.');
  });
};

var getPost = function getPost(req, res) {
  _userModels.ProductReviewPost.findById(req.params.id).then(function (post) {
    return res.json(post);
  });
};

var getPosts = function getPosts(req, res) {
  _userModels.ProductReviewPost.find().populate('user').populate('comments').populate('replies').then(function (posts) {
    return res.json(posts);
  });
};

var findUser = function findUser(req) {
  return _userModels.User.findOne(req.user);
};

//Task: when creating post we link the user id.
var createPost = function createPost(req, res) {
  findUser(req).then(function (user) {
    req.body.user = user._id;

    _userModels.ProductReviewPost.create(req.body).then(function (post) {
      res.json(post);
    });
  });
};

//TASK: Remove post id from user?
var deletePost = function deletePost(req, res) {
  _userModels.ProductReviewPost.findByIdAndRemove(req.params.id).then(function (post) {
    return res.json(post.title + ' has been deleted.');
  });
};

var editPost = function editPost(req, res) {
  _userModels.ProductReviewPost.findByIdAndUpdate(req.params.id, req.body).then(function (post) {
    return res.json(post.title + ' post has been updated');
  });
};

var addComment = function addComment(req, res) {
  findUser(req).then(function (user) {
    req.body.user = user._id;

    _userModels.Comment.create(req.body).then(function (comment) {
      _userModels.ProductReviewPost.findByIdAndUpdate(req.params.id).then(function (post) {
        post.comments.push(comment);
        _userModels.ProductReviewPost.findByIdAndUpdate(req.params.id, { comments: post.comments }).then(res.json(post));
      });
    });
  });
};

//create new comment document then update the post document?
var addReply = function addReply(req, res) {
  findUser(req).then(function (user) {
    req.body.user = user._id;

    _userModels.Reply.create(req.body).then(function (reply) {
      _userModels.Comment.findById(req.params.id).then(function (comment) {
        comment.replies.push(reply);
        _userModels.Comment.findByIdAndUpdate(req.params.id, { replies: comment.replies }).then(res.json(comment));
      });
    });
  });
};

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getPost = getPost;
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.editPost = editPost;
exports.addComment = addComment;
exports.addReply = addReply;