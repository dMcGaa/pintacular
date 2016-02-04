require('dotenv').load(); //load .env variables as soon as possible!
var express = require('express');
var app = express();
var session = require('express-session')

var Grant = require('grant-express');

var config = {
  "server": {
    "protocol": "http",
    "host": "fullstack-basejumps-2016-01-01-dmcgaa.c9users.io" //without port
    //"callback": "/handle_twitter_callback"
  },
  "twitter": {
    "key": process.env.TWITTER_KEY,
    "secret": process.env.TWITTER_SECRET,
    "callback": "/handle_twitter_callback"
    // "callback": "/twit_callback"//"/handle_twitter_callback"
  }
}
console.log(JSON.stringify(config.server));
// console.log(process.env.PORT);
// console.log(process.env.TWITTER_KEY);
// console.log(process.env.TWITTER_SECRET);

app.set('port', process.env.PORT);

app.use(express.static(__dirname + '/public'));
// REQUIRED for grant:
app.use(session({
  secret:'very secret',
  resave: true,
  saveUninitialized: true
}));
// mount grant
app.use(new Grant(config));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/handle_twitter_callback', function (req, res) {
  console.log(req.query);
  res.send(JSON.stringify(req.query, null, 2));
})

app.get('/twit_callback', function (req, res) {
  res.render('pages/login');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});