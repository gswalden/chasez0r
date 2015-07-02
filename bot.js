var Slack = require('slack-client');
var CronJob = require('cron').CronJob;

var messages = require('./config/messages');
var token = require('./config/token'); // if dne, make file with syntax: module.exports = 'slack-token';
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);
var channels = [];

slack.on('open', function() {
  console.log('Joined ' + slack.team.name + '@Slack as ' + slack.self.name);
  channels = channels.concat([
    slack.getChannelByName('is'),
    slack.getChannelByName('web')
  ]);
  slack.getChannelByName('general').leave();
});

slack.on('error', function(error) {
  console.error('Error', error);
});

var job = new CronJob('10 0 18 * * 1-5', function() {
    // job begin
    if (channels.length) {
      messages(channels);
    }
  }, function () {
    // job end
  },
  true,
  'America/New_York'
);

slack.on('message', function(message) {
  if (message.getChannelType() == 'DM') {
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    channel.send('help me speak better https://github.com/gswalden/chasez0r/blob/master/config/messages.js');
  }
});

slack.login();
