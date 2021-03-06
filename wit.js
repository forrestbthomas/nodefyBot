var request = require('request');
var keys;

if(!process.env.PORT){
  keys = require('./API_KEYS_GIT_IGNORE_THIS.js');
} 


var wit = {
  getWitForMessage: function(message, callback) {


    var url = 'https://api.wit.ai/message?v=20140721&q=' +
              encodeURIComponent(message.text);

    var options = {
      url: url,
      headers: {
        'Authorization': process.env.witAuth || keys.wit.access_token
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        console.log("Error getting Wit: " + error);
      } else {
        body = JSON.parse(body);
        callback({message: message, intent: body["outcomes"][0]["intent"]});
      }

    });
  }
};



module.exports = wit;