//import
import { 
  User,
  ProductReviewPost,
  Comment
 } from './userModels';
import { EWOULDBLOCK } from 'constants';

//used for get request to get all users and some of the users account info.
const getAllUsers = (req, res) => {
  //need check for required keys first
  User
    .find()
    .select(['-__v'])
    .then(user => res.json(user))
    .catch(err => res.status(400).log(err.message));
};

//used for another get request to get a specific user by id.
const getUser = (req, res) => {
  User
  .findById(req.params.id)
  .then(user => {
    res.json(user);
  })
  .catch(err => {
    res.json(`${err}, user id not found.`)
    console.log(`${err}, user id not found.`)
  });
};

  const createUser = (req, res) => {
    // User.comparePw(req.body.password, User.hashPassword(req.body.password));
    User.hashPassword(req.body.password, 10)
    .then(hash => {
      User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hash,
        email: req.body.email
      })
      .then(user =>
        res.json(user + ' has been created.')
      )
      .catch(err => res.status(400).json(err.message));
    });
  };

//Used for put request to update a users account info.
const updateUser = (req, res) => {
  //check if req body has unspecified keys
  User
  .findByIdAndUpdate(req.params.id, req.body)
  .select(['-password', '-__v'])
  .then(user => res.json(user))
  .catch(err => res.status(400).json(err.message));
};

//Used for delete request to delete a specified user by username and password.
const deleteUser = (req, res) => {
  //to delete user we need to get the username and password
  User
  .findByIdAndRemove(req.params.id)
  .then(user => res.json(`The user ${user.username} account has been deleted.`))
  .catch(err => {
    res.status(400).json('Incorrect username or password, could not delete.')
  });
};

const getPost = (req, res) => {
  res.json('getting a selected user posts');
 };

const getPosts = (req, res) => {
  ProductReviewPost
  .find()
  .then(posts => res.json(posts));
 };

const createPost = (req, res) => {
  ProductReviewPost
  .create(req.body)
  .then(post => {
    res.json(post);
  });
};

const deletePost = (req, res) => {
  res.json('delete post response works');
};

const editPost = (req, res) => {
  res.json('edit post response works');
};

const replyPost = (req, res) => {
  const newComment = 
    Comment
    .create({comment: req.body.comment})
    .then(comment => comment);

  // ProductReviewPost.findByIdAndUpdate(req.params.id, req.body)
  // .then(post => res.json(post));
};

//create new comment document then update the post document?
const addReply = (req, res) => {
  ProductReviewPost.find(req.params.id)
  .then(comment => res.json(comment));
};

export { 
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
  replyPost,
  addReply
};
