import express from 'express';
import {
  jwtAuthenticate
} from '../../../middleware/passportMiddleware';

import { 
  getAllUsers,
  getUser,                  
  updateUser, 
  deleteUser,
  getPost,
  getPosts,
  createPost,
  deletePost,
  editPost,
  addComment,
  addReply
} from './userController';

//import userRouter
const userRouter = express.Router();

//route to get a list of all users
userRouter.get('/user', getAllUsers);

//main route for requests in regards to users by id
userRouter.get('/user/:id', getUser);
userRouter.put('/user/:id', jwtAuthenticate, updateUser);
userRouter.delete('/user/:id', jwtAuthenticate, deleteUser);

//show PRPost
userRouter.get('/post', getPosts);
userRouter.post('/post', jwtAuthenticate, createPost);

userRouter.get('/post/:id', getPost)
userRouter.post('/post/:id', jwtAuthenticate, addComment);
userRouter.put('/post/:id', jwtAuthenticate, editPost);
userRouter.delete('/post/:id', jwtAuthenticate, deletePost);

userRouter.put('/reply/:id', jwtAuthenticate, addReply);

export default userRouter;