var bookList;

// Importing data by jquery, should do by Node.js
$.getJSON('books.json').done(function (json) {
  bookList = json;
  var $row = $('.row');
  for (let i = 0; i < 5; i++) {
    var cover = bookList['fiction'][i].cover;
    $row.append(`<div class="book"><img class="cover" id="${"fiction_" + i}" src="${cover}"></div>`)
  }
});

// Categories onclick listener
$('#categories div').on('click', function () {
  $('.active').removeClass('active');
  $(this).addClass('active');

  changeCategory($(this).text());
});

function changeCategory(category) {
  var $covers = $('.row').find('.cover');
  for (let i = 0; i < 5; i++) {
    var cover = bookList[`${category}`][i].cover;
    $covers.eq(i).attr('src', cover).attr('id', `${category + "_" + i}`);
  };
};

/************************** Funtions for book detail  ******************************/

// Books onclick listener
$('.row').on('click', '.book', function () {
  displayBookDetail($(this))
});

var $showcase = $('#showcase');

function displayBookDetail(book) {
  $showcase.empty().css('background', 'rgba(255, 255, 255, 0.8)');
  createBookDetail(book);
};

function createBookDetail(book) {
  $showcase.append('<div id="book_detail"></div>');

  var cover = book.children().attr('src');
  var bookID = book.children().attr('id');
  var category = bookID.split("_")[0];
  var index = bookID.split("_")[1];
  var description = bookList[category][index].description;
  var $bookDetail = $showcase.find('#book_detail');
  const lengthLimit = 850;

  $bookDetail.append(`<img src="${cover}"></div>`)
    .append(`<p class="title">${bookList[category][index].title}</p>`)
    .append(`<p class="author">By ${bookList[category][index].author}</p>`);


  if (description.length < lengthLimit) {
    $bookDetail.append(`<p class="description">${description}</p>`);
  } else {
    var descriptionPart1 = description.substring(0, lengthLimit);
    var descriptionPart2 = description.substring(lengthLimit, description.length);

    $bookDetail.append(`<p class="description">${descriptionPart1} <span class="more">...more</span></p>`)
      .append(`<p id="hidden_description">${descriptionPart2}</p>`);

    $bookDetail.find('#hidden_description').css('display', 'none');
  }
}

$('#showcase').on('click', '.more', function () {
  var text = $('.description').text();
  var newText = text.substring(0, text.length - 8) + $('#hidden_description').text();
  $('.description').text(newText).append('<span class="less">(less)</span');
});

$('#showcase').on('click', '.less', function () {
  var text = $('.description').text();
  var newText = text.substring(0, 850);
  $('.description').text(newText).append('<span class="more">...more</span>');
});

$('#home').on('click', function () {
  $showcase.empty().append('<h1>Meet your next favorite book.</h1>')
    .css('background', 'none');
});

$('#best2018').on('click', function () {

});