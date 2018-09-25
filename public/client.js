let currJWT = '';
let currUser = '';

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
    type: 'GET',
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
      console.log(response);
      $('.test p').text(response);
    }
  });
});




