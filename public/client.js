$('.login').on('submit', (event) => {
  event.preventDefault();
  const username = $('#user').val();
  const password = $('#password').val();
  console.log(username);
  console.log(password);
  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    url: '/api/users',
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