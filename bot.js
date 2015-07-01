var Slack = require('slack-client');
var CronJob = require('cron').CronJob;
var uniqueRandomArray = require('unique-random-array');

var messages = uniqueRandomArray(require('./config/messages'));
var token = require('./config/token'); // if dne, make file with syntax: module.exports = 'slack-token';
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

slack.on('open', function() {
  console.log('Joined ' + slack.team.name + '@Slack as ' + slack.self.name);
});

slack.on('error', function(error) {
  console.error("Error: " + error);
});

var job = new CronJob('0 * 15 * * 1-5', function() {
    /* job begin */
    slack.getDMByName('gregbot').send(messages() + ' #6pm');
  }, function () {
    /* job end */
  },
  true,
  'America/New_York'
);

slack.login();
