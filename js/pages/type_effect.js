const TypeWriter = function (text_element, words, wait) {
  this.text_element = text_element;
  this.words = words;
  this.wait = parseInt(wait, 10);
  this.txt = "";
  this.wordIndex = 0;
  this.isDeleting = false;
  this.type();
};

// Type Method
TypeWriter.prototype.type = function () {
  // Current Index
  const current = this.wordIndex % this.words.length;
  // Get Full_Text Of Current Index
  const full_Text = this.words[current];

  // Check if Deleting
  if (this.isDeleting) {
    // Delete Char
    this.txt = full_Text.slice(0, this.txt.length - 1);
  } else {
    // Add Char
    this.txt = full_Text.slice(0, this.txt.length + 1);
  }

  // init Type_Speed
  let type_Speed = 200;
  if (this.isDeleting) {
    type_Speed /= 2;
  }

  // Check if complete
  if (!this.isDeleting && full_Text === this.txt) {
    // Make a Pause
    type_Speed = this.wait;
    // Set isDeleteing to True
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    // Make a Pause
    type_Speed = 500;
    // Return To Adding
    this.isDeleting = false;
    // Move To the Next word
    this.wordIndex++;
  }

  // Insert Txt To Span Dom Span
  this.text_element.innerHTML = `<span class="txt">${this.txt}</span>`;

  setTimeout(() => this.type(), type_Speed);
};

// Init On Dom Loade
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const text_Element = document.querySelector(".text_type");
  const words = JSON.parse(text_Element.getAttribute("data-words"));
  const wait = text_Element.getAttribute("data-wait");
  // Init Type Writer
  new TypeWriter(text_Element, words, wait);
}
