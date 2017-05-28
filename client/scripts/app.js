// YOUR CODE HERE:

// App ID: 72b8e073a4abde10221ce95f38ed1c63bd7f3d6b
// API Key: cf1ce23a61e2a40702c347b7dc1e0af8c28f6c7a
var message = {
  username: undefined,
  text: undefined, 
  roomname: undefined
};


// const getText = function (data) {
//   let storage = {};
//   for (let i = 0; i < data.results.length; i++) {
//     storage[data.results[i].username] = data.results[i].text;
//   }
//   // for ( let i = 0; i < data.results.length; i++) {
//   //   storage.push(data.results[i].text);
//   // }
//   return storage;
// };
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var escapeHTML = function (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
};

class App {

  constructor () {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby',
    this.friends = {};
  }

  init () {
    
    this.fetch();
    // setInterval(this.fetch.bind(this), 2000);
    this.handleSubmit(); 
  }

  // reference () {
  //   document.getElementsByClassName('sdlfkjs')
  // }

  send(message) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby',
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
    // setTimeout(function () {
    this.clearMessages();
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby',
      type: 'GET',
      data: {limit: 200, order: '-createdAt'},
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        that.renderMessage(data);
        console.log('chatterbox: Message received', data);
        // this.fetch(); 
      },
      error: function (err) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', err);
      }
    });
    // }, 1000); 
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

  getText(data) {
    let storage = {};
    for (let i = 0; i < data.results.length; i++) {
      data.results[i].text = escapeHTML(data.results[i].text);
      storage[data.results[i].username] = [data.results[i].text, data.results[i].roomname];
    }
    return storage;
  }


  renderMessage(data) {
    console.log(data);
    var storage = this.getText(data);
//if the roomname matches the right roomname selected then display the messages of that room!! 
    // if ()
    for (let username in storage) {
      $('#chats').append(`<div> <b>${decodeURI(username)}:</b> <br>${storage[username][0]} </div>`);
    }
  }

  renderRoom(roomName) {
    $('#roomSelect').append(`<option value=${roomName}>${roomName}</option>`);
  }
  
  handleUsernameClick() {
    //var username = document.getElementsByClassName('username');
    // username.addEventListener('click', function (name) {
    //   if (!friends[name]) {
    //     friends[name] = true; 
    //   } 
    // }); 
  }

  handleSubmit() {
    //get whatever we type into the input field
    // var input = $('#emptyTextBox').val();
    //sets the text to the button
    // $('#submitButton').val(input);
    //when the button is clicked, the message will display
    // $('#submitButt').on('submit', function() {
    //   console.log("please");
    // });
    // var x = function() {
    //   return $('#submitButton').val();
    // }
    console.log($('#submitButton'));
    // var button = $('#submitButton').val();
    // $('#submitButton').val(button)
    // console.log(button, 'sdfsdfs');
    // $('#submitButton').click( function () {
    //   $('#chats').preppend(`<div> <b></b> <br>${x()} </div>`);
    // });
  


    // x();

    // grab what is typed into input box
    //DecodeURI whatever we type s
    //PREPEND into #chats
  }
  
  
}


const app = new App();
app.init();

// $(this).on('click', '#submitButton', function() {
//       console.log('clicked!');
//     });
$(document).ready(function () {
    $('#submitButton').on('click', function() {
      app.handleSubmit();
    }); 
    
});

// var button= function (submitButton) {
//   var text = ($'#emptyTextBox').val(); 
  
// }
