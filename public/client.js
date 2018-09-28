let currJWT = '';
let currUser = '';


/*Tasks:
User requests
1) Create User [DONE]
2) Update User by Id []
3) Delete User by Id []
4) Get User []
5) Get User by Id []
User Authenticated Requests
6) Create JWT when logging in [DONE]
7) Get Protected API Endpoint [DONE]
8) Create New JWT from Existing JWT
Post request
9) Create Post
10) Get all Posts from all users
11) Get Post by Id
12) Add Comment 
13) Add Reply
14) Edit Post by Id
15) Delete Post by Id
*/

$('.signup').on('submit', (event) => {
  event.preventDefault();
  const username = $('#user').val();
  const password = $('#password').val();
  console.log(username);
  console.log(password);

  //register user
  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    url: '/api/users/',
    data: JSON.stringify({
      username,
      password
    }),
    dataType: 'json',
    success: function (response) {
      console.log(response);
      $('.test p').text('user created');
    }
  });
});

$('.login').on('submit', (event) => {
  event.preventDefault();
  const username = $('#user').val();
  const password = $('#password').val();
  console.log(username);
  console.log(password);

  //login user
  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    url: '/api/auth/login',
    data: JSON.stringify({
      username,
      password
    }),
    dataType: 'json',
    success: function (response) {
      console.log(response.authToken);
      console.log(response);
      $('.test p').text('user created');
      sessionStorage.setItem('currJWT', response.authToken);
      currJWT = sessionStorage.getItem('currJWT');
      sessionStorage.setItem('currUser', username);
      currUser = sessionStorage.getItem('currUser');
    }
  });
});

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
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
    },
    data: JSON.stringify({
      title,
      images,
      theGood,
      theBad,
      rating
    }),
    dataType: 'json',
    success: function (response) {
      console.log('Another test: ' + response);
      $('.test p').text(`${response.title} product review has been created.`);
    }
  });
});

//show posts
//When user clicks on a specific 
//product review title
//That title <a> tag should hold the title name
//or hold the 'prID'.
//Then we will use the data given from response
//to create a user friendly post.
$('.getPostBtn').on('click', (event) => {

  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: '/api/post',
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
    // },
    success: (response) => {
      console.log(response);
      $('.showPost p').text(response.map(obj => {
        return obj.title;
      }));
    }
  })

});





