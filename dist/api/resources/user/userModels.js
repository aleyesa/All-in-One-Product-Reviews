"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = exports.Reply = exports.ProductReviewPost = exports.User = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_mongoose.default.Promise = global.Promise;
var Schema = _mongoose.default.Schema; //Tasks: 
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
    default: new _mongoose.default.Types.ObjectId()
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
}); //Reply Schema to hold replies

var replySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose.default.Types.ObjectId()
  },
  reply: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}); //Comment Schema to hold a main comment followed by a set of replies

var commentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose.default.Types.ObjectId()
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
}); //Product Review Post Schema to hold the 
//title, images, pros, cons, rating, date, and comments

var productReviewPostSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new _mongoose.default.Types.ObjectId()
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
}); //functions to help validate and secure passwords.

userSchema.methods.comparePw = function (pw, pwHash) {
  return _bcryptjs.default.compare(pw, pwHash);
};

userSchema.statics.hashPassword = function (password) {
  return _bcryptjs.default.hash(password, 10);
}; //creates a model for each schema


var User = _mongoose.default.model('User', userSchema);

exports.User = User;

var ProductReviewPost = _mongoose.default.model('PRPost', productReviewPostSchema);

exports.ProductReviewPost = ProductReviewPost;

var Reply = _mongoose.default.model('Reply', replySchema);

exports.Reply = Reply;

var Comment = _mongoose.default.model('Comment', commentSchema);

exports.Comment = Comment;
userSchema.post('save', function (err, user, next) {
  console.log(err);
  next();
});