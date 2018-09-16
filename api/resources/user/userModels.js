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

const productReviewPostSchema = new Schema({
  title: String,
  images: [
    String
    ],
  main: String,
  rating: String,
  date: Date,
  comments: [String]
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

userSchema.post('save', (err, user, next) => {
  console.log(err);
  next();
});

export default { User, ProductReviewPost };