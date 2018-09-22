import userRouter from './resources/user/userRouter';
import authRouter from './resources/auth/authRouter';

export default (app) => {
  app.use('/api', userRouter);
  app.use('/api', authRouter);
}

