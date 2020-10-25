(function () {
  "use strict";

  // *** Book Class: Represent a book
  class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

  // *** UI Class
  class UI {
    // Display Books fucntion
    static display_Books() {
      // LoclaStorag Books
      let books = Store.get_Books();

      // Loop On Eeach Book And add it To the list
      books.forEach((book) => {
        // Add
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>`;
        list.appendChild(row);
      });
    }

    // Add To the List Fucntion
    static add_Book_To_List(myBook) {
      // validate
      let status = "yes";
      let books = Store.get_Books();
      books.forEach((book) => {
        if (book.isbn == myBook.isbn) {
          status = "no";
          UI.show_alerts("isbn Must be Uniqe", "danger");
        }
      });
      if (myBook.title == "" || myBook.author == "" || myBook.isbn == "") {
        // show alert
        UI.show_alerts("all fields must be set", "danger");
      } else {
        if (status == "yes") {
          // Add
          const list = document.getElementById("book-list");
          const row = document.createElement("tr");
          row.innerHTML = `
        <td>${myBook.title}</td>
        <td>${myBook.author}</td>
        <td>${myBook.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>`;
          list.appendChild(row);

          // show Alert
          UI.show_alerts("book Added Successfuly", "info");

          // clear inputs Value
          document.getElementById("title").value = "";
          document.getElementById("author").value = "";
          document.getElementById("isbn").value = "";
        }
      }
    }

    // Remove a Book
    static remove_Book(el) {
      if (el.classList.contains("delete")) {
        el.parentElement.parentElement.remove();
        // show alert
        UI.show_alerts("book has been delete successfuly", "info");
        // Remove form LocalStorage
        Store.remove_Book(el.parentElement.previousElementSibling.textContent);
      }
    }

    // Show Alerts
    static show_alerts(message, type) {
      const my_div = document.createElement("div");
      const my_message = document.createTextNode(message);
      my_div.appendChild(my_message);
      my_div.className = `alert alert-${type}`;
      const form = document.getElementById("form-books");
      form.insertBefore(my_div, form.firstChild);
      setTimeout(function () {
        my_div.remove();
      }, 3000);
    }
  }

  // *** Store Class: Handle Storage
  class Store {
    static get_Books() {
      let books;
      if (localStorage.getItem("books") === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem("books"));
      }
      return books;
    }
    static set_Book(book) {
      let books = Store.get_Books();
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    }
    static remove_Book(isbn) {
      let books = Store.get_Books();
      books.forEach((book, index) => {
        if (book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
    }
    static remove_All_Books() {
      let books = Store.get_Books();
      books.splice(0, books.length);
      localStorage.setItem("books", JSON.stringify(books));
    }
  }

  // *** Event: Display Books
  document.addEventListener("DOMContentLoaded", UI.display_Books());

  // *** Evet: Add Book
  const submit_button = document.getElementById("form-books");
  submit_button.addEventListener("submit", function (e) {
    // prevetn Default for submitng relode
    e.preventDefault();

    // Form Values
    let title_value = document.getElementById("title").value;
    let author_value = document.getElementById("author").value;
    let isbn_value = document.getElementById("isbn").value;

    // instatiate a book
    let book_to_add = new Book(title_value, author_value, isbn_value);

    // Add book To the List
    UI.add_Book_To_List(book_to_add);
    // Add To localStorage
    Store.set_Book(book_to_add);
  });

  // *** Event: Remove Book
  const table = document.getElementById("table-books");
  table.addEventListener("click", function (e) {
    UI.remove_Book(e.target);
  });
})();
