import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//User schema that looks for username, password, email
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

//create a new schema that holds comments made by users
//This schema basically holds an id to help get to that
//specific comment
//I can also use this comment id to get the blog post it
// is listed on
const commentSchema = new Schema({
  comment: String,
  replies: {
    reply: [String]
  }
});

const productReviewPostSchema = new Schema({
  title: String,
  images: [
    String
    ],
  theGood: String,
  theBad: String,
  rating: String,
  date: Date,
  comments: [commentSchema]
});

userSchema.methods.comparePw = function(pw, pwHash) {
  return bcrypt.compare(pw, pwHash);
};

userSchema.methods.serialize = function(user) {
  return {
    username: user.username
  } 
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

//creates a model of userSchema
const User = mongoose.model('User', userSchema);
const ProductReviewPost = mongoose.model('PRPost', productReviewPostSchema);
const Comment = mongoose.model('Comment', commentSchema);

userSchema.post('save', (err, user, next) => {
  console.log(err);
  next();
});

// const headPhones = new ProductReviewPost({
//   title: 'Jaybirds X3',
//   images: ['123.jpg'],
//   theGood: 'Water resistant, Great sound quality, Great design.',
//   theBad: 'Certain technique to get earbuds to stay in ear.',
//   date: Date.now(),
//   comments: ''
// });
export { User, ProductReviewPost, Comment };

