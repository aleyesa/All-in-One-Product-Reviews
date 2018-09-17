import express from 'express';

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
.post(addComment)
.put(editPost)
.delete(deletePost);

userRouter.put('/reply/:id', addReply);

export default userRouter;