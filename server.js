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
  let format = req.query['format'];
  let category = req.query['category'];

  if (format == 'json') {
    res.setHeader('Content-Type', 'application/json');
    database.ref(category).once('value').then(function (snap) {
      res.send(snap.val());
    });
  } else if (format == 'html') {
    res.setHeader('Content-Type', 'text/html');
    database.ref(category).once('value').then(function (snap) {
      let books = snap.val();
      let bookHTML = '';
      for (let i = 0; i < 5; i++) {
        var cover = books[i].cover;
        bookHTML += `<div class="book"><img class="cover" id="${category + "_" + i}" src="${cover}"></div>`;
      }

      res.send(bookHTML);
    });
  } else {
    res.send({ msg: 'Wrong format!' });
  }
});

app.get('/get_bookDetail', function (req, res) {
  let category = req.query['category'];
  let index = req.query['index'];

  res.setHeader('Content-Type', 'application/json');
  database.ref(category + '/' + index).once('value').then(function (snap) {
    res.send(snap.val());
  });

});

// for page not found (i.e., 404)
app.use(function (req, res, next) {
  res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
})

// run server
let port = 8000;
app.listen(port, function () {
  console.log("App is listening on port: " + port);
});