let currJWT = '';
let currUser = '';

//Creating User
const createUser = () => {
  $('.signup').on('submit', () => {
    event.preventDefault();
    event.stopPropagation();
    const username = $('#user').val();
    const password = $('#password').val();
    console.log(username, password);

    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: 'api/users/',
      data: JSON.stringify({
        username,
        password
      }),
      dataType: 'json',
      success: function (response) {
        $('.userRequest .test').text(response);
      }
    });
  });
};

//Update User by Id
const updateUserById = () => {
  $('.updateUserById').on('submit', () => {
    const updatedUsername = $('#updateUsername').val();
    const updatedPw = $('#updatePassword').val();
    const userId = '';

    //create condition to see if text field is empty, if it is ignore.

    $.ajax({
      contentType: 'application/json',
      type: 'PUT',
      url: `api/user/${userId}`,
      data: JSON.stringify({
        username: updatedUsername,
        password: updatedPw
      }),
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        $('.updateUserById .test').text(response);
      }    
    });
  });
};

//Delete User by Id
const deleteUserById = () => {
  $('.deleteUserById').on('click', '.delAccountBtn', () => {
    $.ajax({
      contentType: 'application/json',
      type: 'DELETE',
      url: `api/user/${userId}`,
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        $('.deleteUserById .test').text(response);
      }    
    });
  });
};

//Get Users
const getUser = () => {
  $('.getUser').on('click', '.getUsersBtn', () => {
    $.ajax({
      contentType: 'application/json',
      type: 'GET',
      url: `api/user`,
      dataType: 'json',
      success: function (response) {
        console.log(response.length)
        $('.getUser .test').text(response[0].username);
      }    
    });
  });
};

//Get User by Id
const getUserById = () => {
$('.getUserById').on('click', '.getUserByIdBtn', () => {
  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: `api/user/${userId}`,
    dataType: 'json',
    success: function (response) {
      $('.getUserById .test').text(response);
    }    
  });
});
};

//CreateJWT when user logs in
const login = () => {
  $('.createJWT').on('submit', () => {
    event.preventDefault();
    const loginUser = $('#loginUser').val();
    const loginPw = $('#loginPw').val();

    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: `api/auth/login`,
      data: JSON.stringify({
        username: loginUser,
        password: loginPw
      }),
      dataType: 'json',
      success: function (response) {
        sessionStorage.setItem('currJWT', response.authToken);
        currJWT = sessionStorage.getItem('currJWT');
        $('.createJWT .test').text(currJWT);
      }    
    });
  });
};

//Get Protected End point
const testProtected = () => {
  $('.getToProtectedEndpoint').on('click', '.protectedEnd', () => {
    $.ajax({
      contentType: 'application/json',
      type: 'GET',
      url: 'api/protected',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        $('.getToProtectedEndpoint .test').text(response.username);
      }
    });
  });
};

//Create New JWT
const createNewJWT = () => {
  $('.createNewJwtFromOld').on('click', '.newJwtBtn', () => {
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: 'api/auth/refresh',
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        $('.createNewJwtFromOld .test').text(response.authToken);
      }   
    });
  });
};

//Create Post
const createPost = () => {
  $('.postCreation').on('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const title = $('#title').val();
    const images = $('#images').val();
    const theGood = $('#theGood').val();
    const theBad = $('#theBad').val();
    const rating = $('#rating').val();
    
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: '/api/post',
      data: JSON.stringify({
        title,
        images,
        theGood,
        theBad,
        rating
      }),
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        console.log('Another test: ' + response);
        $('.createPost .test').text(`${response.title} product review has been created.`);
      }
    });
  });
};

//Get Posts
const getPosts = () => {
  $('.getPosts').on('click', '.getPostBtn', () => {
    $.ajax({
      type: 'GET',
      url: 'api/post',
      dataType: 'json',
      success: function (response) {
        let i;
        let combine = '';
        for(i = 0; i < response.length; i++)
        {
          combine += response[i].toString();
        }

        console.log(combine);
      }
    });
  });
};

//Get Posts by Id
const getPostById = () => {
  $('.getPostById').on('click', '.getPostByIdBtn', () => {
    let postId = '';
    $.ajax({
      contentType: 'application/json',
      type: 'GET',
      url: `api/post/${postId}`,
      dataType: 'json',
      success: function (response) {
        $('.getPostById .test').text(response);
      }    
    });
  });
};

//Add a comment to a post by id
const addComment = () => {
  $('.addComment').on('submit', () => {
    const postId = '';
    const comment = $('#comment').val();
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: `/api/post/${postId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      data: JSON.stringify({
        comment
      }),
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        console.log(response);
        $('.addComment .test').text(response);
      }
    });
  });
};

//Add reply
const addReply = () => {
  $('.addReply').on('submit', () => {
    const commentId = '';
    const reply = $('#reply').val();
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: `/api/reply/${commentId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      data: JSON.stringify({
        reply
      }),
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        console.log(response);
        $('.addReply .test').text(response);
      }
    });
  });
};

//Edit Post by Id
const editPost = () => {
  $('.editPostById').on('submit', () => {
    let postId = '';
    //Check which field are empty.
    $.ajax({
      contentType: 'application/json',
      type: 'PUT',
      url: `api/post/${postId}`,
      data: JSON.stringify({
        title,
        images,
        theGood,
        theBad,
        rating
      }),
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        $('.editPostById .test').text(response);
      }    
    });
  });
};

//Delet Post 
const deletePost = () => {
  $('.deletePostById').on('click', '.deletePostBtn', () => {
    let postId = '5ba411f504ffb00cdc35f24a';
    //Check which field are empty.
    $.ajax({
      contentType: 'application/json',
      type: 'DELETE',
      url: `api/post/${postId}`,
      dataType: 'json',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
      },
      success: function (response) {
        console.log(response);
        $('.deletePostById .test p').text(response);
      }    
    });
  });
};

const startApi = () => {
  createUser();
  updateUserById();
  deleteUserById();
  getUser();
  getUserById();
  login();
  testProtected();
  createNewJWT();
  createPost();
  getPosts();
  getPostById();
  addComment();
  addReply();
  editPost();
  deletePost();
};

startApi();