var $setUsername = $(".set-username-input");
var connected = false;

$setUsername.keypress(function (e) {
  if (e.which == 13) {
    console.log('send login req');
    socket.emit('set username', $setUsername.val());
  }
});

socket.on('login', function() {
  console.log('user loggedin');
  connected = true;
  $('.bs-example-modal-sm').modal('hide');
});
