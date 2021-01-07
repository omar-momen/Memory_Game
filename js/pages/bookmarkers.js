(function () {
  "use strict";
  document
    .getElementById("bookmark_form")
    .addEventListener("submit", submit_function);

  document.addEventListener("click", delete_Bookmark);

  function submit_function(e) {
    let site_name = document.getElementById("siteName").value;
    let site_url = document.getElementById("siteUrl").value;

    // Validation
    if (!validation(site_name, site_url)) {
      return false;
    }

    // Create New Obj
    let bookmarke = {
      sitename: site_name,
      siteurl: site_url,
    };

    // Local Storage
    set_Bookmarks_Storage(bookmarke);

    // Empty The Inputs
    document.getElementById("bookmark_form").reset();

    // Display Content
    display_content();
  }

  function validation(site_name, site_url) {
    if (!site_name || !site_url) {
      alert("Please Fill The Tow Fields");
      return false;
    }

    let expresion = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    let regEx = new RegExp(expresion);

    if (!site_url.match(regEx)) {
      alert("Please Enter A Valid Url");
      return false;
    }
    return true;
  }

  function get_Bookmarks_Storage() {
    let bookmarks;
    if (localStorage.getItem("bookmarks") === null) {
      bookmarks = [];
    } else {
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
    return bookmarks;
  }

  function set_Bookmarks_Storage(obj) {
    let bookmark_arr = get_Bookmarks_Storage();
    bookmark_arr.push(obj);
    localStorage.setItem("bookmarks", JSON.stringify(bookmark_arr));
  }

  function delete_Bookmark(e) {
    let theElemetn = e.target;
    if (theElemetn.classList.contains("deleteSite")) {
      let bookmark_arr = get_Bookmarks_Storage();
      bookmark_arr.forEach((bookmark, index) => {
        if (bookmark.sitename == theElemetn.dataset.name) {
          bookmark_arr.splice(index, 1);
          localStorage.setItem("bookmarks", JSON.stringify(bookmark_arr));
          display_content();
        }
      });
    }
  }

  function display_content() {
    let output = document.querySelector(".content .output");
    output.innerHTML = "";
    let bookmark_arr = get_Bookmarks_Storage();
    bookmark_arr.forEach((bookmark) => {
      output.innerHTML += `
        <div class="bookmark">
          <h3>
            <span>${bookmark.sitename}</span>
            <a href="${bookmark.siteurl}" target="_blank" class="btn btn-default">Visit</a>
            <a href="#" data-name="${bookmark.sitename}" class="btn btn-danger deleteSite">Delete</a>
          </h3>
        </div>
      `;
    });
  }

  display_content();
})();
