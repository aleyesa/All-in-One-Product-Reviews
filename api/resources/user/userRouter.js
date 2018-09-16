import express from 'express';

import { 
  getAllUsers,
  getUser,                  
  createUser, 
  updateUser, 
  deleteUser,
  getPost,
  getPosts,
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

//show PRPost
userRouter.route('/post')
.get(getPosts)
.post(createPost);

userRouter.route('/post/:id')
.get(getPost)
.post(replyPost)
.put(editPost)
.delete(deletePost);

export default userRouter;