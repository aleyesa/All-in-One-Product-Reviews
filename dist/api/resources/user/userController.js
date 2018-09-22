"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReply = exports.addComment = exports.editPost = exports.deletePost = exports.createPost = exports.getPosts = exports.getPost = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;

var _userModels = require("./userModels");

//import
//used for get request to get all users and some of the users account info.
var getAllUsers = function getAllUsers(req, res) {
  //need check for required keys first
  _userModels.User.find().select(['-__v']).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    return res.status(400).log(err.message);
  });
}; //used for another get request to get a specific user by id.


exports.getAllUsers = getAllUsers;

var getUser = function getUser(req, res) {
  _userModels.User.findById(req.params.id).then(function (user) {
    res.json(user);
  }).catch(function (err) {
    res.json("".concat(err, ", user id not found."));
    console.log("".concat(err, ", user id not found."));
  });
}; //Used for put request to update a users account info.
//Task: ***If changing password must encrypt it.


exports.getUser = getUser;

var updateUser = function updateUser(req, res) {
  //check if req body has unspecified keys
  _userModels.User.findByIdAndUpdate(req.params.id, req.body).select(['-password', '-__v']).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    return res.status(400).json(err.message);
  });
}; //Used for delete request to delete a specified user by username and password.


exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res) {
  //to delete user we need to get the username and password
  _userModels.User.findByIdAndRemove(req.params.id).then(function (user) {
    return res.json("The user ".concat(user.username, " account has been deleted."));
  }).catch(function (err) {
    res.status(400).json('Incorrect username or password, could not delete.');
  });
};

exports.deleteUser = deleteUser;

var getPost = function getPost(req, res) {
  _userModels.ProductReviewPost.findById(req.params.id).then(function (post) {
    return res.json(post);
  });
};

exports.getPost = getPost;

var getPosts = function getPosts(req, res) {
  _userModels.ProductReviewPost.find().populate('user').populate('comments').populate('replies').then(function (posts) {
    return res.json(posts);
  });
};

exports.getPosts = getPosts;

var findUser = function findUser(req) {
  return _userModels.User.findOne(req.user);
}; //Task: when creating post we link the user id.


var createPost = function createPost(req, res) {
  findUser(req).then(function (user) {
    req.body.user = user._id;

    _userModels.ProductReviewPost.create(req.body).then(function (post) {
      res.json(post);
    });
  });
}; //TASK: Remove post id from user?


exports.createPost = createPost;

var deletePost = function deletePost(req, res) {
  _userModels.ProductReviewPost.findByIdAndRemove(req.params.id).then(function (post) {
    return res.json("".concat(post.title, " has been deleted."));
  });
};

exports.deletePost = deletePost;

var editPost = function editPost(req, res) {
  _userModels.ProductReviewPost.findByIdAndUpdate(req.params.id, req.body).then(function (post) {
    return res.json("".concat(post.title, " post has been updated"));
  });
};

exports.editPost = editPost;

var addComment = function addComment(req, res) {
  findUser(req).then(function (user) {
    req.body.user = user._id;

    _userModels.Comment.create(req.body).then(function (comment) {
      _userModels.ProductReviewPost.findByIdAndUpdate(req.params.id).then(function (post) {
        post.comments.push(comment);

        _userModels.ProductReviewPost.findByIdAndUpdate(req.params.id, {
          comments: post.comments
        }).then(res.json(post));
      });
    });
  });
}; //create new comment document then update the post document?


exports.addComment = addComment;

var addReply = function addReply(req, res) {
  findUser(req).then(function (user) {
    req.body.user = user._id;

    _userModels.Reply.create(req.body).then(function (reply) {
      _userModels.Comment.findById(req.params.id).then(function (comment) {
        comment.replies.push(reply);

        _userModels.Comment.findByIdAndUpdate(req.params.id, {
          replies: comment.replies
        }).then(res.json(comment));
      });
    });
  });
};

exports.addReply = addReply;