// Create row of fiction books as default
$.ajax({
  url: "/get_bookList",
  dataType: "json",
  type: "GET",
  data: { category: "fiction" },
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
$('#home').on('click', function () {
  $showcase.empty().append('<h1>Meet your next favorite book.</h1>')
    .css('background', 'none');
  showHomePage('fiction');
});

$('#best2018').on('click', function () {
  listAllCategories();
});

function showHomePage(category) {
  $showcase.show();
  $('#categories').show();
  var $row = $('.row').eq(0);
  $('#rows').empty().append($row);
  getBooks(category, (data) => {
    changeCategory(category, data, $row)
  });
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

function changeCategory(category, books, row) {
  var $covers = row.find('.cover');
  for (let i = 0; i < 5; i++) {
    var cover = books[i].cover;
    $covers.eq(i).attr('src', cover).attr('id', `${category + "_" + i}`);
  };
};
/************************** Funtions for book detail  ******************************/

// Books onclick listener
$('#rows').on('click', '.book', function () {
  displayBookDetail($(this))
  var category = $(this).children().attr('id').split('_')[0];
  showHomePage(category);
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

  getBooks(category, (books) => {
    var description = books[index].description;

    $bookDetail.append(`<img src="${book.children().attr('src')}"></div>`)
      .append(`<p class="title">${books[index].title}</p>`)
      .append(`<p class="author">By ${books[index].author}</p>`);

    if (description.length < lengthLimit) {
      $bookDetail.append(`<p class="description">${description}</p>`);
    } else {
      var descriptionPart1 = description.substring(0, lengthLimit);
      var descriptionPart2 = description.substring(lengthLimit, description.length);

      $bookDetail.append(`<p class="description">${descriptionPart1} <span class="more">...more</span></p>`)
        .append(`<p id="hidden_description">${descriptionPart2}</p>`);

      $bookDetail.find('#hidden_description').css('display', 'none');
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

// AJAX call
function getBooks(category, callback) {
  $.ajax({
    url: "/get_bookList",
    dataType: "json",
    type: "GET",
    data: { category: category },
    success: function (data) {
      console.log("SUCCESS:", data);
      callback(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
