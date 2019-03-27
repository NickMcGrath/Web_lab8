//  Assignment documentation
// 2.	One server-side JavaScript script that will answer requests and return JSON and HTML code

// For this lab, you are going to get build a simple app with Node. So far, you’ve been shown Node.js, Express.js (and how to route), the HTTP methods (GET, POST), and how to download modules with NPM. 


// from Web examples week 9 / week 10 / ajax-app.js 
//  requires
var firebase = require("firebase");
//const firebase = require('./firebaseHandler.js');
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
  //grabFantasyJSON();
  response.send(homepage);
});

app.use('/js', express.static('static/js'));
app.use('/css', express.static('static/css'));
app.use('/img', express.static('static/img'));


// app.get("/get_bookList", function (request, response) {

//   //find the requested format
//   let formatOfResponse = request.query['format'];

//   if (formatOfResponse == "json-list") {
//     response.setHeader("Content-Type", "application/json");
//     response.send(list.getJSON);

//   } else if (formatOfResponse == "html-list") {
//     response.setHeader("Content-Type", "text/html");
//     response.send(list.getHTML);
//   } else {
//     response.sent({ msg: "Incorrect Format Requested" });
//   }
// });

//sends a JSON file of books.json
// app.get('/bookReview-JSON', function (request, response) {
//   let booksListJSON = fs.readFileSync("/books.json", "JSON");
//   response.header("Content-Type", "application/json");
//   response.send(booksListJSON);
// });


// run server
let port = 8000;
app.listen(port, function () {
  console.log("App is listening on port: " + port);
});


//firebase 
var config = {
  apiKey: "AIzaSyC1vdsdqR3xku17VLLTGgcyJOENjtH9Nb4",
  authDomain: "lab-8-book-review.firebaseapp.com",
  databaseURL: "https://lab-8-book-review.firebaseio.com",
  projectId: "lab-8-book-review",
  storageBucket: "lab-8-book-review.appspot.com",
  messagingSenderId: "955822866019"
};
firebase.initializeApp(config);

var database = firebase.database();

// var grabFantasyJSON = function () {
//   let dbRef = firebase.database().ref("fantasy");
//   console.log(dbRef);
//   var promise = dbRef.once("value", function (snap) {
//     list = snap.val();
//     console.log(snap.val());
//   });
//   promise.then(function () {
//     return list;
//   })
//
// }