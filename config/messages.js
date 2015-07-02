var moment = require('moment-timezone');
var random = require('random-item');
var request = require('request');

var now = moment().tz('America/New_York');
var lastMessage;

function getMessage(channels) {
  request({
    uri: 'https://api.github.com/gists/1499b5c6c242ce79567d',
    headers: {
      'User-Agent': 'gswalden'
    },
    json: true
  }, function(err, res, body) {
    if (err) {
      console.log(err);
      return;
    }

    var messages = JSON.parse(body.files['messages.json'].content);
    var list = buildList(messages);

    channels.forEach(function(channel) {
      if (!channel) return;

      var message;
      do {
        message = random(list);
      } while (list.length > 1 && message === lastMessage);
      lastMessage = message;

      channel.send(message + ' #6pm');
    });
  });
}

function buildList(messages) {
  var list;
  if (messages.Special) {
    return messages.Special;
  }
  var list = messages.Everyday;
  var day = now.format('dddd');
  if (messages[day]) {
    list = list.concat(messages[day]);
  }
  return list;
}

module.exports = getMessage;
