// YOUR CODE HERE:

// App ID: 72b8e073a4abde10221ce95f38ed1c63bd7f3d6b
// API Key: cf1ce23a61e2a40702c347b7dc1e0af8c28f6c7a
var message = {
  username: undefined,
  text: undefined, 
  roomname: undefined
};

const app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',

  init () {

  },

  send(message) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch() {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET'
    });
  },

  clearMessages() {
    $('#chats').empty();
  },

  renderMessage(message) {
    //  let newDiv = document.createElement('div');
    //  let content = document.createTextNode(message.text);

    // newDiv.append(content);
    // console.log(newDiv);
    // console.log(content); 
    // $('#chats').html(newDiv);
    // let element = document.getElementById('chats');
    // console.log(element);
    // element.appendChild(newDiv);
    // debugger;
    $('#chats').append(`<div>${message.text}</div>`);
  }

};
