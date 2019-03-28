//  Assignment documentation
// 2.	One server-side JavaScript script that will answer requests and return JSON and HTML code

// For this lab, you are going to get build a simple app with Node. So far, you’ve been shown Node.js, Express.js (and how to route), the HTTP methods (GET, POST), and how to download modules with NPM. 


// from Web examples week 9 / week 10 / ajax-app.js 
//  requires
const firebase = require("firebase");
const express = require("express");
// as of Express 4, you need this:
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
const app = express();
// https://www.npmjs.com/package/jsdom
const { JSDOM } = require('jsdom');
const fs = require("fs");


// respond to root url request with homepage
app.get("/", function (request, response) {
  let homepage = fs.readFileSync("./static/html/bookReview.html", "utf8");
  response.send(homepage);
});

app.use('/js', express.static('static/js'));
app.use('/css', express.static('static/css'));
app.use('/img', express.static('static/img'));


//sends a fantasy JSON file on /fantasyJSON request
app.get('/fantasyJSON', function (request, response) {
  response.header("Content-Type", "application/json");
  var db = admin.database();
  var ref = db.ref("fantasy");
  ref.once("value", function (snapshot) {
    response.send(snapshot.val());
  });
});

//sends a fantasy JSON file on /fantasyJSON request
app.get('/fictionJSON', function (request, response) {
  response.header("Content-Type", "application/json");
  var db = admin.database();
  var ref = db.ref("fiction");
  ref.once("value", function (snapshot) {
    response.send(snapshot.val());
  });
});

//get horror json and convert to html then send 




// run server
let port = 8000;
app.listen(port, function () {
  console.log("App is listening on port: " + port);
});


//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./core/serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lab-8-book-review.firebaseio.com"
});
