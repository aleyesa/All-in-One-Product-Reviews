import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//Tasks: 
// -regular expression if a user wants to add images.

//User Schema to hold username and password
const userSchema = new Schema({
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
  }
});

//Reply Schema to hold replies
const replySchema = new Schema({
  reply: String
});

//Comment Schema to hold a main comment followed by a set of replies
const commentSchema = new Schema({
  comment: String,
  replies: [replySchema]
});

//Product Review Post Schema to hold the 
//title, images, pros, cons, rating, date, and comments
const productReviewPostSchema = new Schema({
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
  date: Date,
  comments: [commentSchema]
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

