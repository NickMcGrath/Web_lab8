const express = require('express');
const app = express();
const fs = require('fs')
const firebase = require('firebase');
const config = {
  apiKey: "AIzaSyC1vdsdqR3xku17VLLTGgcyJOENjtH9Nb4",
  authDomain: "lab-8-book-review.firebaseapp.com",
  databaseURL: "https://lab-8-book-review.firebaseio.com",
  projectId: "lab-8-book-review",
  storageBucket: "lab-8-book-review.appspot.com",
  messagingSenderId: "955822866019"
};
firebase.initializeApp(config);
var database = firebase.database();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// respond to root url request with homepage
app.get("/", function (request, response) {
  let homepage = fs.readFileSync("./static/html/bookReview.html", "utf8");
  response.send(homepage);
});

app.use('/js', express.static('static/js'));
app.use('/css', express.static('static/css'));
app.use('/img', express.static('static/img'));


app.get('/get_bookList', function (req, res) {
  let category = req.query['category'];

  res.setHeader('Content-Type', 'application/json');
  database.ref(category).once('value').then(function (snap) {
    res.send(snap.val());
  });
});

// run server
let port = 8000;
app.listen(port, function () {
  console.log("App is listening on port: " + port);
});