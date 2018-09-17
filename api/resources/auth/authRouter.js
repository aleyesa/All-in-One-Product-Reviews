import express from 'express';
import passport from 'passport';
import strategies from './strategies';
import { 
  registerUser,
  validateLogin,
  newJWT
} from './authController';

strategies(passport);

const authRouter = express.Router();

// POST /api/users/ to request to register a new user, with a given username and password
authRouter.post('/users/', registerUser);

// POST /api/auth/login to request a JWT/ A valid username and password are required, 
//and a new token is given in exchange.
authRouter.post('/auth/login', 
  passport.authenticate('local', { session: false }), validateLogin);

// GET /api/protected to make a request for a protected API endpoint. 
// A valid, non-expired JWT is required. 
// You use the same JWT to make as many requests as you like until it expires.
authRouter.get('/protected', passport.authenticate('jwt', { session: false } ), (req, res) => {
   return res.json('logged in');
});

// POST /api/auth/refresh to request a new JWT with a laster expiry date. A valid, non-expired JWT is required.
authRouter.post('/auth/refresh', passport.authenticate('jwt', { session: false } ), newJWT);

export default authRouter;