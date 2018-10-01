import mongoose, { MongooseDocument } from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//Tasks: 
// -regular expression if a user wants to add images.
//Created post date
//Updated post date
//Some type of general filter for more organization of different product review posts.
//Link user to their posts, comments and replies

//add email with regex
//notification
//validate through front end and back end
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//User Schema to hold username and password
const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId
  },
  username: { 
    type: String,
    required: 'Username is required.',
    minlength: 1,
    unique: true,
    validate: {
      validator: (username) => {
       return emailRegex.test(username);
      },
      message: username => `${username.value} is not a valid username.`
    }
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
const replySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId
  },
  reply: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

//Comment Schema to hold a main comment followed by a set of replies
const commentSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId
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
const productReviewPostSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId
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
userSchema.methods.comparePw = function(pw, pwHash) {
  return bcrypt.compare(pw, pwHash);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

//creates a model for each schema
const User = mongoose.model('User', userSchema);
const ProductReviewPost = mongoose.model('PRPost', productReviewPostSchema);
const Reply = mongoose.model('Reply', replySchema);
const Comment = mongoose.model('Comment', commentSchema);

userSchema.post('save', (err, user, next) => {
  console.log(err);
  next();
});

export { User, ProductReviewPost, Reply, Comment };

