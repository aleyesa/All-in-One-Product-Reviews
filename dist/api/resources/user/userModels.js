'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = exports.Reply = exports.ProductReviewPost = exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var Schema = _mongoose2.default.Schema;

//Tasks: 
// -regular expression if a user wants to add images.
//Created post date
//Updated post date
//Some type of general filter for more organization of different product review posts.
//Link user to their posts, comments and replies

//add email with regex
//notification
//validate through front end and back end

//User Schema to hold username and password
var userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose2.default.Types.ObjectId()
  },
  username: {
    type: String,
    required: 'Username is required.',
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required.',
    minlength: 8,
    maxlength: 72,
    trim: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'PRPost'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }]
});

//Reply Schema to hold replies
var replySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose2.default.Types.ObjectId()
  },
  reply: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

//Comment Schema to hold a main comment followed by a set of replies
var commentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose2.default.Types.ObjectId()
  },
  comment: String,
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

//Product Review Post Schema to hold the 
//title, images, pros, cons, rating, date, and comments
var productReviewPostSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose2.default.Types.ObjectId()
  },
  title: {
    type: String,
    required: 'Title is needed for product review post.'
  },
  images: [String],
  theGood: {
    type: String,
    required: 'Need input on what makes this product awesome.'
  },
  theBad: {
    type: String,
    required: 'Need input on the bad parts of this product.'
  },
  rating: {
    type: String,
    required: 'Please input your rating on this product.'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

//functions to help validate and secure passwords.
userSchema.methods.comparePw = function (pw, pwHash) {
  return _bcryptjs2.default.compare(pw, pwHash);
};

userSchema.statics.hashPassword = function (password) {
  return _bcryptjs2.default.hash(password, 10);
};

//creates a model for each schema
var User = _mongoose2.default.model('User', userSchema);
var ProductReviewPost = _mongoose2.default.model('PRPost', productReviewPostSchema);
var Reply = _mongoose2.default.model('Reply', replySchema);
var Comment = _mongoose2.default.model('Comment', commentSchema);

userSchema.post('save', function (err, user, next) {
  console.log(err);
  next();
});

exports.User = User;
exports.ProductReviewPost = ProductReviewPost;
exports.Reply = Reply;
exports.Comment = Comment;