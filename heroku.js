var appName = process.env.APP_NAME;
if (!appName) {
  console.log('Please set environment variable APP_NAME');
  return;
}

var token = process.env.HEROKU_TOKEN;
if (!token) {
  console.log('Please set environment variable HEROKU_TOKEN');
  return;
}

var Heroku = require('heroku-client');
var heroku = new Heroku({ token: token });

var args = require('minimist')(process.argv.slice(2))._;
var data = {
  updates: [
    {
      process: 'web',
      quantity: args[0]
    }
  ]
};

heroku.patch('/apps/' + appName + '/formation', data, function (err, app) {
  if (err) {
    console.log(err);
  }
});
