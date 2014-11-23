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

/**
 * Global chat
 */

var globalChatBox = $('#global-chat').find('.chat-box');
$('#global-chat').on('keydown', '.chat-box', function(e) {
  if (e.which == 13) {
    if(globalChatBox.val().length > 0) {
      socket.emit('user global message', globalChatBox.val());
      globalChatBox.val('');
      console.log('send global message');
    }
  }
});

$globalChat = $('#global-chat');
$globaltext = $globalChat.find('.chat-text');
socket.on('display global message', function(data) {
  console.log('display global message');
  $globaltext.append('<li><strong>'+ data.username +': </strong> '+ data.message +'</li>');

  $globaltext.scrollTop($globaltext.prop("scrollHeight"));
});

/**
 * Local chat
 */

var lobbyChatBox = $('#lobby-chat').find('.chat-box');
$('#lobby-chat').on('keydown', '.chat-box', function(e) {
  if (e.which == 13) {
    if(lobbyChatBox.val().length > 0) {
      socket.emit('user lobby message', lobbyChatBox.val());
      lobbyChatBox.val('');
      console.log('send lobby message');
    }
  }
});

$lobbyChat = $('#lobby-chat');
$lobbytext = $lobbyChat.find('.chat-text');
socket.on('display lobby message', function(data) {
  console.log('display lobby message');
  $lobbytext.append('<li><strong>'+ data.username +': </strong> '+ data.message +'</li>');

  $lobbytext.scrollTop($lobbytext.prop("scrollHeight"));
});
