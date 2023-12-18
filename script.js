"use strict";
const btnAddBook = document.querySelector(".btn-add");
const formAddBook = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const bookContainer = document.querySelector(".book-container");
const btnRead = document.querySelectorAll(".btn-read");

const myLibrary = [];

const openForm = function () {
  formAddBook.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeForm = function () {
  formAddBook.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnAddBook.addEventListener("click", openForm);
overlay.addEventListener("click", closeForm);

let bookTitle, bookAuthor, bookPages, bookRead;

const form = document.querySelector(".form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeRead = function () {
  this.read = !this.read;
};

function changeRead(index) {
  myLibrary[index].changeRead();
  displayBook(myLibrary);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  bookTitle = document.getElementById("title").value;
  bookAuthor = document.getElementById("author").value;
  bookPages = document.getElementById("pages").value;
  bookRead = document.getElementById("read").checked;
  // number of pages should be int and >0
  if (Number.isInteger(Number(bookPages)) && Number(bookPages) > 0) {
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
    displayBook(myLibrary);
    this.reset(); //reset form
    closeForm();
  }
  return;
});

function displayBook(arr) {
  bookContainer.innerHTML = "";
  arr.forEach(function (book, index, arr) {
    bookContainer.insertAdjacentHTML(
      "beforeend",
      ` 
    <div data-index=${index} class="card">
      <h4>Title:</h4>
      <span>${book.title}</span>
      <h4>Author:</h4>
      <span>${book.author}</span>
      <h4>Pages:</h4>
      <span>${book.pages}</span>
      <button onclick='changeRead(${index})' class="btn-read ${
        book.read ? "read" : ""
      }">Read</button>
      <button onclick="removeBook(${index})" class="btn-remove">Remove</button>
    </div>`
    );
  });
}

function removeBook(item) {
  myLibrary.splice(item, 1);
  bookContainer.innerHTML = "";
  displayBook(myLibrary);
  closeForm();
}
