let currJWT = '';

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
      "username": username,
      "password": password
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
      "username": username,
      "password": password
    }),
    dataType: 'json',
    success: function (response) {
      console.log(response.authToken);
      $('.test p').text('user created');
      sessionStorage.setItem('currJWT', response.authToken);
      currJWT = sessionStorage.getItem('currJWT');
    }
  });
});

$('.testReq').on('click', (event) => {
  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: '/api/protected',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('currJWT')}`
    },
    dataType: 'json',
    success: function (response) {
      $('.test p').text('Authorized');
    }
  });
});


