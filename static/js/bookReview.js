// Create row of fiction books as default
$.ajax({
  url: "/get_bookList",
  dataType: "json",
  type: "GET",
  data: {
    format: "json",
    category: "fiction"
  },
  success: function (data) {
    console.log("SUCCESS:", data);
    var $row = $('.row');
    for (let i = 0; i < 5; i++) {
      var cover = data[i].cover;
      $row.append(`<div class="book"><img class="cover" id="${"fiction_" + i}" src="${cover}"></div>`)
    }

  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log("ERROR:", jqXHR, textStatus, errorThrown);
  }
});

/************************ Functions for nav bar items **************************/
var onListingPage = false;

$('#icon').on('click', function () {
  changeActiveIndicator('fiction');
  showHomePage('fiction');
});

$('#home').on('click', function () {
  changeActiveIndicator('fiction');
  showHomePage('fiction');
});

$('#best2018').on('click', function () {
  if (!onListingPage) {
    listAllCategories();
    onListingPage = true;
  }
});

function showHomePage(category) {
  $showcase.empty().append('<h1>Meet your next favorite book.</h1>')
    .css('background', 'none');
  $showcase.show();
  $('#categories').show();
  var $row = $('.row').eq(0);
  $('#rows').empty().append($row);
  getBooks(category, (data) => {
    changeCategory(category, data, $row)
  });
  onListingPage = false;
}

function listAllCategories() {
  var $rows = $('#rows');
  var $rowCopy = $('.row').clone();

  $showcase.hide();
  $('#categories').hide();

  $rows.prepend('<div class="category">best fiction</div>');
  getBooks('fiction', (data) => {
    changeCategory('fiction', data, $('.row'))
  });

  $rows.append('<div class="category">best mystery&thriller</div>');
  var $mystery = $rowCopy.clone();
  getBooks('mystery&thriller', (data) => {
    changeCategory('mystery&thriller', data, $mystery)
  });
  $rows.append($mystery);

  $rows.append('<div class="category">best horror</div>');
  var $horror = $rowCopy.clone();
  getBooks('horror', (data) => {
    changeCategory('horror', data, $horror)
  });
  $rows.append($horror);

  $rows.append('<div class="category">best fantasy</div>');
  var $fantasy = $rowCopy.clone();
  getBooks('fantasy', (data) => {
    changeCategory('fantasy', data, $fantasy)
  });
  $rows.append($fantasy);
}

/************************** Funtions for categories  ******************************/

// Categories onclick listener
$('#categories div').on('click', function () {
  $('.active').removeClass('active');
  $(this).addClass('active');
  let category = $(this).text();
  getBooks(category, (data) => {
    changeCategory(category, data, $('.row'))
  });
});

function changeActiveIndicator(category) {
  $('.active').removeClass('active');
  if (category == 'mystery&thriller') {
    $('#mystery').addClass('active');
  } else {
    $('#' + category).addClass('active');
  }
}

function changeCategory(category, books, row) {
  if (typeof books == 'string') {
    row.html(books);
  } else {
    var $covers = row.find('.cover');
    for (let i = 0; i < 5; i++) {
      var cover = books[i].cover;
      $covers.eq(i).attr('src', cover).attr('id', `${category + "_" + i}`);
    };
  }

};

/************************** Funtions for book detail  ******************************/

// Books onclick listener
$('#rows').on('click', '.book', function () {
  var category = $(this).children().attr('id').split('_')[0];
  showHomePage(category);
  changeActiveIndicator(category);
  displayBookDetail($(this))
});

var $showcase = $('#showcase');

function displayBookDetail(book) {
  $showcase.empty().css('background', 'rgba(255, 255, 255, 0.8)');
  createBookDetail(book);
};

// Create the book detail layout in the showcase area
function createBookDetail(book) {
  $showcase.append('<div id="book_detail"></div>');

  var bookID = book.children().attr('id');
  var category = bookID.split("_")[0];
  var index = bookID.split("_")[1];
  var $bookDetail = $showcase.find('#book_detail');
  var lengthLimit;
  var windowWidth = $(window).width();

  if (windowWidth < 750) {
    lengthLimit = 400;
  } else if (windowWidth < 900) {
    lengthLimit = 600;
  } else {
    lengthLimit = 800;
  }

  getBookDetail(category, index, (bookDetail) => {
    var description = bookDetail.description;

    $bookDetail.append(`<img src="${book.children().attr('src')}"></div>`)
      .append(`<p class="title">${bookDetail.title}</p>`)
      .append(`<p class="author">By ${bookDetail.author}</p>`);

    if (description.length < lengthLimit) {
      $bookDetail.append(`<p class="description">${description}</p>`);
      $('.description').hide().fadeIn(500);
      $('#book_detail img').hide().fadeIn(500);
      $('.title').hide().fadeIn(500);
      $('.author').hide().fadeIn(500);
    } else {
      var descriptionPart1 = description.substring(0, lengthLimit);
      var descriptionPart2 = description.substring(lengthLimit, description.length);

      $bookDetail.append(`<p class="description">${descriptionPart1} <span class="more">...more</span></p>`)
        .append(`<p id="hidden_description">${descriptionPart2}</p>`);

      $bookDetail.find('#hidden_description').css('display', 'none');
      $('.description').hide().fadeIn(500);
      $("#book_detail img").hide().fadeIn(500);
      $('.title').hide().fadeIn(500);
      $('.author').hide().fadeIn(500);
    };
  });
};

// Click eventlistener for more and less on book description
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

/********************************** AJAX calls *************************************/
function getBooks(category, callback) {
  let format = 'json';
  if (category == 'horror' || category == 'fantasy') {
    format = 'html';
  }

  $.ajax({
    url: "/get_bookList",
    dataType: format,
    type: "GET",
    data: {
      format: format,
      category: category
    },
    success: function (data) {
      console.log("SUCCESS:", data);
      callback(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}

function getBookDetail(category, index, callback) {
  $.ajax({
    url: "/get_bookDetail",
    dataType: "json",
    type: "GET",
    data: {
      category: category,
      index: index
    },
    success: function (data) {
      console.log("SUCCESS:", data);
      callback(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
