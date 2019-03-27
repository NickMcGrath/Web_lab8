//prerequisite
// $ npm install firebase --save

var firebase = require("firebase");
//import firebase from "firebase";
module.exports = {
    getFantasyJSON: function () {
        return grabFantasyJSON;
    },
    getFictionJSON: function () {
        return // * to do add return
    },
    getHorrorHTML: function () {
        return // * to do add return
    },
    getMysteryHTML: function () {
        return // * to do add return
    }
}
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

var grabFantasyJSON = function () {
    let dbRef = firebase.database().ref("fantasy");
    console.log(dbRef);
    return dbRef

}
var grabFictionJSON = function () {

}
var grabHorrorHTML = function () {

}
var grabMysteryHTML = function () {

}
