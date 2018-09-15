//require is equal to import
// const user = require('./api/resources/users/user');
import userRouter from './resources/user/userRouter';
import authRouter from './resources/auth/authRouter';
//use users http request methods from userRouter file.

export default (app) => {
  app.use('/api', userRouter);
  app.use('/api', authRouter);
}

