import userRouter from './resources/user/userRouter';
import authRouter from './resources/auth/authRouter';

export default (app) => {
  app.use('/api', userRouter);
  app.use('/api', authRouter);
  // app.listen(8080, (err) => {
  //   if(!err){
  //     console.log('listening to port 8080.');
  //   }else {
  //     console.log(err.message);
  //   }
  // })
}

