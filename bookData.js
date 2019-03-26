const list = require('books.json');

//public methods to select format of books 
module.exports = {
    getHTML: function () {
        return (bookJSON);
    },
    getJSON: function () {
        return list
    }
};

var makeHTML = function (bookJSON) {
    //todo take the json file and convert it to html
}