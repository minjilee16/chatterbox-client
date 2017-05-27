// YOUR CODE HERE:

// App ID: 72b8e073a4abde10221ce95f38ed1c63bd7f3d6b
// API Key: cf1ce23a61e2a40702c347b7dc1e0af8c28f6c7a
var message = {
  username: undefined,
  text: undefined, 
  roomname: undefined
};


const getText = function (data) {
  let storage = [];
  for ( let i = 0; i < data.results.length; i++) {
    storage.push(data.results[i].text);
  }
  return storage;
};



class App {

  constructor () {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    this.friends = {};
  }

  init () {
    this.fetch();
    this.clearMessages(); 
    this.handleUsernameClick(); 
  }

  send(message) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (err) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', err);
      }
    });
  }

  fetch() {
    let that = this;
   
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        let message = getText(data); 
        for ( let i = 0; i < message.length; i++) {
          that.renderMessage(message[i]);
        }
        console.log('chatterbox: Message received', data);
      },
      error: function (err) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', err);
      }
    });
  }

  // getText (data) {
  //   let storage = [];
  //   for ( let i = 0; i < data.results.length; i++) {
  //     storage.push(data.results[i].text);
  //   }
  //   return storage;
  // }

  clearMessages() {
    $('#chats').empty();
  }

  renderMessage(message) {
    $('#chats').append(`<div>${message.text}</div>`);
  }

  renderRoom(roomName) {
    $('#roomSelect').append(`<option value=${roomName}>${roomName}</option>`);
  }
  
  handleUsernameClick() {
    var username = document.getElementsByClassName('username');
    // username.addEventListener('click', function (name) {
    //   if (!friends[name]) {
    //     friends[name] = true; 
    //   } 
    // }); 
  }
}


const app = new App();
app.init();

