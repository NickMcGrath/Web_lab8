//  Assignment documentation
// 1.	One client-side JavaScript script that will handle AJAX calls in the browser (external to the HTML)

// For this lab, you are going to get build a simple app with Node. So far, you’ve been shown Node.js, Express.js (and how to route), the HTTP methods (GET, POST), and how to download modules with NPM. 


// from Web examples week 9 / week 10 / ajax-app.js 
//  requires
const lists = require('./core/data');
const express = require("express");
// as of Express 4, you need this:
// https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
const app = express();
// https://www.npmjs.com/package/jsdom
const { JSDOM } = require('jsdom');
const fs = require("fs");


// respond to root url request with homepage
app.get("/", function (req, res) {
  let homepage = fs.readFileSync("markup.html", "utf8");
  res.send(homepage);
});

// ** was shown on example, unsure exactly what it does
// app.use('/js', express.static('static/js'))
// app.use('/css', express.static('static/css'))


// run server
let port = 8000;
app.listen(port, function () {
  console.log("App is listening on port: " + port);
})