import express from 'express';

import { 
  getAllUsers,
  getUser,                  
  createUser, 
  updateUser, 
  deleteUser,
  getPost,
  createPost,
  deletePost,
  editPost,
  replyPost
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

//create a PRPost


//show PRPost
userRouter.route('/user/post')
.get(getPost);

//edit PRPost
//delete PRPost

//reply to a PRPost

export default userRouter;