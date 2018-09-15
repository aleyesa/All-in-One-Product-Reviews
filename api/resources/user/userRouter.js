import express from 'express';

import { 
  getAllUsers,
  getUser,                  
  createUser, 
  updateUser, 
  deleteUser 
} from './userController';

//import userRouter
const userRouter = express.Router();

//route to get a list of all users
userRouter.get('/user', getAllUsers);
userRouter.post('/user', createUser);

//main route for requests in regards to users by id
userRouter.route('/user/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

export default userRouter;