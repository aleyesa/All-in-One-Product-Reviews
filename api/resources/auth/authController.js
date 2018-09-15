import User from '../user/userModels';
import jwt from 'jsonwebtoken';
import {  
  JWT_SECRET,
  JWT_EXPIRY
} from '../../../config/config';

const createAuthToken = (user) => {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

//request to register a new user, with a given username and password
const registerUser = (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
    //check if username and password values are strings
  if(!missingField) {
    if(typeof req.body.username === 'string' &&
    typeof req.body.password === 'string'){
      
      req.body.username = req.body.username.trim();
  
      User.find({ username: req.body.username })
      .then(user => {
        if(!user) {
          console.log(`The user '${user.username} has already been taken.`);
        }else {
          if(req.body.password !== req.body.password.trim()){
            console.log('no spaces allowed in the beginning or end of password.');
          }else {
            if(req.body.password.length < 8){
              console.log('Password needs to be at least 8 characters long.');
            }else { 
              User.hashPassword(req.body.password)
              .then(pw => {
                req.body.password = pw;
                User.create(req.body)
                .then(user => res.status(201).json(`${user.username} has been created.`))
              })
              .catch(err => console.log(`failed to create user. \n ${err.message} `));
            }
          }
        }
      })
    }else {
      console.log('username or password is not a string value.');
    }
  }else {
    console.log(`${missingField} field is missing.`);
  }
};

//request a JWT/ A valid username and password are required, and a new token is given in exchange.
const validateLogin = (req, res) => {
        const authToken = createAuthToken({username: req.body.username});
        res.status(202).json({authToken});
};

//request a new JWT with a laster expiry date. A valid, non-expired JWT is required.
const newJWT = (req, res) => {
  const authToken = createAuthToken(req.user);
  res.status(202).json({authToken});
};

export {
  registerUser,
  validateLogin,
  newJWT
};