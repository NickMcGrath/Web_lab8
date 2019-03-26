//  Assignment documentation
// 2.	One server-side JavaScript script that will answer requests and return JSON and HTML code

// For this lab, you are going to get build a simple app with Node. So far, you’ve been shown Node.js, Express.js (and how to route), the HTTP methods (GET, POST), and how to download modules with NPM. 


// from Web examples week 9 / week 10 / ajax-app.js 
//  requires
const list = require('bookData');
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
  let homepage = fs.readFileSync("bookReview.html", "utf8");
  res.send(homepage);
});

app.get("/get_bookList", function (request, response) {

  //find the requested format
  let formatOfResponse = request.query['format'];

  if (formatOfResponse == "json-list") {
    response.setHeader("Content-Type", "application/json");
    response.send(list.getJSON);

  } else if (formatOfResponse == "html-list") {
    response.setHeader("Content-Type", "text/html");
    response.send(list.getHTML);
  } else {
    response.sent({ msg: "Incorrect Format Requested" });
  }
});

// ** was shown on example, unsure exactly what it does
// app.use('/js', express.static('static/js'))
// app.use('/css', express.static('static/css'))

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