// Listen for form submit

document.getElementById('myForm').addEventListener('submit',saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    // get the form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }


    // Store the input values in the object
    var bookmark = {
        name : siteName,
        url: siteUrl
    };


    if(localStorage.getItem('bookmarks') === null){

         // init empty bookmarks list
        var bookmarks = [];
        // pushing entered values into bookmarks array or adding the values to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else {
         // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // reset back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    //refetch bookmarks
    showBookmarks();
    // prevent form from submitting
    e.preventDefault();
}


 // Delete the saved bookmark
function deleteBookmark(url) {
   // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   // loop through out bookmarks
    for(var i=0;i < bookmarks.length ; i++){
        if(bookmarks[i].url == url) {
   //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // resest back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    // Refetch bookmarks
    showBookmarks();
}


// Show bookamarks list
function showBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML= ' ';

    for(var i=0; i<bookmarks.length; i++){

        var name = bookmarks[i].name;
        var url = bookmarks[i].url;


        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h4>'+name+
                                          '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                          '<a onclick="deleteBookmark(\''+url+ '\') " class="btn btn-danger" href="#">Delete</a>'+
                                         '</h4>'+
                                        '</div>';
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}