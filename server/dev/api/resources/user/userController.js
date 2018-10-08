//import
import { 
  User,
  ProductReviewPost,
  Reply,
  Comment
 } from './userModels';

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

//Used for put request to update a users account info.
//Task: ***If changing password must encrypt it.
const updateUser = (req, res) => {
  //check if req body has unspecified keys
  User
  .findByIdAndUpdate(req.params.id, req.body, (err, update) => 
    { 
      return update;
    }
  )
  .select(['-password', '-__v'])
  .then(update => res.json(update))
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
  ProductReviewPost
  .findById(req.params.id)
  .then(post => res.json(post))
  .catch(error => {
    console.log(error.message);
    response.status(400).json('No posts found.');
  });
 };

const getPosts = (req, res) => {
  ProductReviewPost
  .find()
  .populate('user')
  .populate('comments')
  .populate('replies')
  .then(posts => res.json(posts))
  .catch((error) => {
    console.log(error.message);
    res.status(400).json('No posts found.');
  });
 };

const findUser = (username) => User.findOne({username: username});

//Task: when creating post we link the user id.
const createPost = (req, res) => {
  console.log('Testing create post: ' + req.body);
  findUser(req)
  .then(user => { 
    req.body.user = user._id;
    console.log(user);
    ProductReviewPost
      .create(req.body)
      .then(post => {
        res.json(post);
    });
  })
  .catch((error) => {
    console.log(error.message);
    res.status(400).json('Could not create post do to missing fields.');
  });
};

//TASK: Remove post id from user?
const deletePost = (req, res) => {
  ProductReviewPost
  .findByIdAndRemove(req.params.id)
  .then(post => res.json(`${post.title} has been deleted.`))
  .catch((error) => {
    console.log(error.message);
    res.status(400).json('Post could not be deleted.');
  });
};

const editPost = (req, res) => {
  ProductReviewPost
  .findByIdAndUpdate(req.params.id, req.body)
  .then(post => res.json(`${post.title} post has been updated`))
  .catch((error) => {
    console.log(error.message);
    res.status(400).json('Unable to save updates on post.');
  });
};

const addComment = (req, res) => {
  findUser(req)
  .then(user => {
    req.body.user = user._id;

    Comment
    .create(req.body)
    .then(comment => {
      ProductReviewPost
      .findByIdAndUpdate(req.params.id)
      .then(post => {
        post.comments.push(comment);
        ProductReviewPost
        .findByIdAndUpdate(req.params.id, {comments: post.comments})
        .then(res.json(post));
      })  
    });
  })
  .catch((error) => {
    console.log(error.message);
    res.status(400).json('Adding comment to post unexpectedly failed.');
  });
};

//create new comment document then update the post document?
const addReply = (req, res) => {
  findUser(req)
  .then(user => {
    req.body.user = user._id;

    Reply
    .create(req.body)
    .then(reply => {
      Comment.findById(req.params.id)
      .then(comment => {
        comment.replies.push(reply);
        Comment.findByIdAndUpdate(req.params.id, { replies: comment.replies } )
        .then(res.json(comment));
      });
    });
  })
  .catch((error) => {
    console.log(error.message);
    res.status(400).json('Error adding a reply.')
  });
};

export { 
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
  addReply,
  findUser
};
