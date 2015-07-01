var moment = require('moment-timezone');
var random = require('random-item');

var now = moment().tz('America/New_York');

function getMessage() {
  var messages = [
    'rock n roll!',
    'time to leaveb0t?',
    'gotta go guys',
    'ride\'s leaving, peace',
    'gotta get home and find parking',
    'it\'s not time for chickidega but it is'
  ];

  var day = now.format('dddd');
  if (day == 'Thursday') {
    messages.push('it\'s thursday so have a drink in the courtyard for me!');
  } else if (day == 'Friday') {
    messages.push('have great weekend, chasezor out!');
  }

  return random(messages);
}

module.exports = getMessage;
