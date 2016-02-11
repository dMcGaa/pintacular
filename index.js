require('dotenv').load(); //load .env variables as soon as possible!
var express = require('express');
var app = express();

//MongoDB
var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
var ObjectId = require('mongodb').ObjectId;
var userName = process.env.MONGOLAB_USER || "null";
var userPw = process.env.MONGOLAB_UPW || "null";
var dbUrl = 'mongodb://' + userName + ":" + userPw + "@" + "ds039125.mongolab.com:39125/mylonelydb";
var dbCollection = "pintacular";

var session = require('express-session')
var Grant = require('grant-express');

var bodyParser = require('body-parser');

var config = {
  "server": {
    "protocol": "http",
    // "host": "fullstack-basejumps-2016-01-01-dmcgaa.c9users.io" //without port
    "host": "pintacular.herokuapp.com"
    //"callback": "/handle_twitter_callback"
  },
  "twitter": {
    "key": process.env.TWITTER_KEY,
    "secret": process.env.TWITTER_SECRET,
    "callback": "/handle_twitter_callback"
  }
}

var dbConn;
mongoConnect();

// console.log(JSON.stringify(config.server));
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post("/pinta-new-add", function(req, res) {
  var addPinta = {
    pintaUser: req.body.userName,
    pintaName: req.body.pName,
    pintaHtml: req.body.pHtml,
    pintaLikes: 0
  };
  // console.log(JSON.stringify(req.body));
  console.log("adding pinta post " + JSON.stringify(addPinta));
  mongoAddPinta(addPinta, function(){
    res.render('pages/new-pinta');
  })
})

app.post("/pintas-recent-get", function(req, res) {
  console.log("retrieving...");
  // var reqPoll = req.body.pollNumber;
  mongoFindLatestPintas(12, function(foundPintas) {
    res.send(foundPintas);
  });
})

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/new-pinta', function (req, res) {
  res.render('pages/new-pinta');
})

app.get('/view-pintas', function (req, res) {
  mongoFindAllPintas(function(tempData) {
    console.log("done loading");
    res.send(tempData);
  });
})

app.get('/view-pintas-latest', function (req, res) {
  mongoFindLatestPintas(2, function(tempData) {
    console.log("done loading");
    res.send(tempData);
  });
})

app.get('/userProfileView/:userName', function(request, response, next) {
  var requestedUser = request.params.userName;
  console.log(requestedUser);
  mongoFindUserPintas(requestedUser, function(foundPintas, err) {
    if (err) throw err;
    console.log("Found data: " + JSON.stringify(foundPintas));
    response.render('pages/user-profile-view', {
      requestedUser: requestedUser,
      foundPintas: foundPintas
    });
  });
});

app.get('/handle_twitter_callback', function (req, res) {
  console.log(req.query);
  res.cookie('userName', req.query.raw.screen_name, { expires: new Date(Date.now() + 900000), httpOnly: false });
  res.render('pages/home', {userName: req.query.raw.screen_name});
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// Connect using MongoClient
function mongoConnect() {
  MongoClient.connect(dbUrl, function(err, db) {
    test.equal(null, err);
    dbConn = db; //mongodb connection instance
    // db.close();  //no need to close, let application termination handle this
  });
}

function mongoAddPinta(addPinta, callback) {
  var pintaDB = {
    pinta_user: addPinta.pintaUser,
    pinta_name: addPinta.pintaName,
    pinta_html: addPinta.pintaHtml,
    pinta_likes: addPinta.pintaLikes
  }
  // console.log(dbCollection);
  var collection = dbConn.collection(dbCollection);
  //insert to collection
  console.log("adding " + JSON.stringify(pintaDB));
  collection.insert(pintaDB);
  //catch WriteConcernException
  callback();
}

function mongoFindUserPintas(userName, callback) {
  var collection = dbConn.collection(dbCollection);
  //read from collection
  collection.find({
    pinta_name: {
      $exists: true
    },
    pinta_user: userName
  }).toArray(function(err, docs) {
    if (err) throw err;
    // console.log(JSON.stringify(docs));
    callback(docs); //callback once response is obtained (Asynchronous)
  })
}

function mongoFindAllPintas(callback) {
  var collection = dbConn.collection(dbCollection);
  //read from collection
  collection.find({
    pinta_name: {
      $exists: true
    }
  }).toArray(function(err, docs) {
    if (err) throw err;
    console.log(JSON.stringify(docs));
    callback(docs); //callback once response is obtained (Asynchronous)
  })
}

function mongoFindLatestPintas(findNum, callback) {
  var collection = dbConn.collection(dbCollection);
  //read from collection
  collection.find({
    pinta_name: {
      $exists: true
    }
  }).limit(findNum).sort({$natural:-1}).toArray(function(err, docs) {
    if (err) throw err;
    console.log(JSON.stringify(docs));
    callback(docs); //callback once response is obtained (Asynchronous)
  })
}
