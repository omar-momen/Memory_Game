(function () {
  "use strict";

  // Gnerate Letters
  function gnerate_letters() {
    let string_letters = "abcdefghijklmnopqrstuvwxyz",
      string_arr = [...string_letters];
    string_arr.forEach((letter) => {
      // span_letter
      let letter_span = document.createElement("span");
      letter_span.classList.add("letter");
      letter_span.appendChild(document.createTextNode(letter));
      document.querySelector(".letters").appendChild(letter_span);
    });
  }
  // Your Words
  const words = {
    programming: [
      "php",
      "javascript",
      "go",
      "scala",
      "fortran",
      "assembly",
      "mysql",
      "python",
    ],
    movies: [
      "Prestige",
      "Inception",
      "Parasite",
      "Interstellar",
      "Whiplash",
      "Memento",
      "Coco",
      "Up",
    ],
    people: [
      "Albert Einstein",
      "Hitchcock",
      "Alexander",
      "Cleopatra",
      "Mahatma Ghandi",
    ],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
  };
  // Keys
  let allKeys = Object.keys(words),
    randomKeyIndex = Math.floor(Math.random() * allKeys.length),
    randomKey = allKeys[randomKeyIndex];
  // values
  let allValues = words[randomKey],
    randomValueIndex = Math.floor(Math.random() * allValues.length),
    randomValue = allValues[randomValueIndex];
  // Set the buzzle word to html
  document.querySelector(
    ".hangmanContent .game_info .category span"
  ).innerHTML = randomKey;
  // Create Array_of_letters From The value
  let arr_of_letters = [...randomValue];
  // create span forEach letter
  let letters_section = document.querySelector(".hangmanContent .letter_guess");
  arr_of_letters.forEach((letter) => {
    let letter_span = document.createElement("span");
    if (letter == " ") {
      letter_span.classList.add("space_letter");
    }
    letters_section.appendChild(letter_span);
  });
  // gusse array of spans
  let gusse_spans = Array.from(
    document.querySelectorAll(".hangmanContent .letter_guess span")
  );
  // add eventListner to each letter
  let theDraw = document.querySelector(".the_draw"),
    wrongAttempts = 0,
    rightAttempt = 0;
  document.addEventListener("click", (e) => {
    let status = false;
    let clicked_letter = e.target.innerHTML.toLowerCase();
    let theChossenWord = Array.from(randomValue.toLowerCase());
    theChossenWord.forEach((wordLetter, wordIndex) => {
      if (wordLetter == clicked_letter) {
        status = true;
        rightAttempt++;
        gusse_spans.forEach((span, spanIndex) => {
          if (spanIndex == wordIndex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });
    if (e.target.classList.contains("letter")) {
      // check for wrong choose
      if (status !== true) {
        wrongAttempts++;
        theDraw.classList.add(`wrong_${wrongAttempts}`);
        document.getElementById("fail").play();
      } else {
        document.getElementById("success").play();
      }
      if (wrongAttempts == 7) {
        document.getElementById("EndgameFail").play();
        document.querySelector(".popUpContainer").style.display = "block";
        document.querySelector(".popUpContainer .header i").classList =
          "far fa-times-circle fail";
        document.querySelector(
          ".popUpContainer .body .text"
        ).innerHTML = `you lost with ${wrongAttempts} wrong tries`;
        document.querySelector(
          ".popUpContainer .footer button"
        ).onclick = function () {
          location.reload();
        };
      }
      if (rightAttempt == theChossenWord.length) {
        document.getElementById("GameEndSuccess").play();
        document.querySelector(".popUpContainer").style.display = "block";
        document.querySelector(".popUpContainer .header i").classList =
          "far fa-check-circle success";
        document.querySelector(
          ".popUpContainer .body .text"
        ).innerHTML = `you win with ${wrongAttempts} wrong tries`;
        document.querySelector(
          ".popUpContainer .footer button"
        ).onclick = function () {
          location.reload();
        };
      }
      e.target.classList.add("clicked");
    }
  });

  // Call
  gnerate_letters();
})();
