//listener
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark function
function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if (!validateForm(siteName, siteURL)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  }

  //test if bookmark is null
  if (localStorage.getItem('bookmarks') === null){
    // initialise array
    var bookmarks = [];
    // add bookmark to array
    bookmarks.push(bookmark);
    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    //reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //re-fetch bookmarks
  fetchBookmarks();

  // prevent form from submitting
  e.preventDefault();
}

  //delete bookmarks
function deleteBookmark(url) {
  // get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //loop through bookmarks
  for(var i=0; i < bookmarks.length; i++){
    if (bookmarks[i].url === url); // note bookmarks[i] means "if the current iteration"
    // remove from array
    bookmarks.splice(i, 1);
  }

  //clear form
  document.getElementById('myForm').reset();

  //reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //re-fetch bookmarks
  fetchBookmarks();
}

  // fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    var bookmarkResults = document.getElementById('bookmarkResults');

    // build output
    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarkResults.innerHTML += '<div class = "well">' +
                                   '<h4>' + name + ' ' +
                                   '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                   '<a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
                                   '</h4>' +
                                   '</div>';
    }
}

function validateForm(siteName, siteURL) {
  // validation to enforce legit entries
  if (!siteName || !siteURL){
    alert('Please fill in all section of the form.');
    return false;
  }

  // using RegExp to pattern match url input
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  // if value in siteURL field is not in format of url
  if(!siteURL.match(regex)){
    alert('Please enter a valid URL.');
    return false;
  }

  return true;
}
