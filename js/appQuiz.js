(function () {
  "use strict";

  // Main variables
  let q_count_elem = document.querySelector(".qiuz_info .questions_count span");
  let spans_container = document.querySelector(".bullets .spans");
  let quiz_area_container = document.querySelector(".quiz_area");
  let answers_container = document.querySelector(".answers");
  let submit_button = document.querySelector(".submit");
  let bullets_container = document.querySelector(".bullets");
  let results_elem = document.querySelector(".results");

  // Globals
  let q_obj;
  let q_count;
  let currentIndex = 0;
  let right_answers = 0;
  let countdown_interval;

  // Ajax Request Function
  function get_Questions() {
    let questionsJson = new XMLHttpRequest();

    questionsJson.onreadystatechange = () => {
      if (questionsJson.readyState == 4 && questionsJson.status == 200) {
        q_obj = JSON.parse(questionsJson.responseText);

        // Object Lenght
        q_count = q_obj.length;

        // Call make_Bullets Function
        make_Bullets(q_count);

        // Call Add Data Fcuntion
        add_Data(q_obj[currentIndex], q_count);

        // Call CountDown Fucntion
        count_Down(10, q_count);
      }
    };

    questionsJson.open("GET", "../JSon/questions_answers.json", true);
    questionsJson.send();
  }
  // Make Bullets Function
  function make_Bullets(num) {
    // The Number Of Questions In info
    q_count_elem.innerHTML = num;

    // make spans
    for (let i = 0; i < num; i++) {
      // creat a span
      let created_span = document.createElement("span");
      // check For On Class
      if (i == 0) {
        created_span.classList.add("on");
      }
      spans_container.appendChild(created_span);
    }
  }

  // click On Submit Button Function
  submit_button.onclick = function () {
    // check Answer
    check_Answer(q_obj[currentIndex], q_count);

    // CountDown
    clearInterval(countdown_interval);
    count_Down(10, q_count);

    // Empty Data From Html
    quiz_area_container.innerHTML = "";
    answers_container.innerHTML = "";

    // Increes To Next Question
    currentIndex++;

    // handle Bullets
    handle_Bullets();

    // Call Add Data once more
    add_Data(q_obj[currentIndex], q_count);

    // Show Result
    show_results(q_count);
  };

  // Add Data Function
  function add_Data(obj, count) {
    if (currentIndex < count) {
      // Set Question value
      let question = document.createElement("h2");
      question.appendChild(document.createTextNode(obj["title"]));
      quiz_area_container.appendChild(question);

      // Set Answers
      for (let i = 1; i <= 4; i++) {
        // Main Div
        let answer_div = document.createElement("div");
        answer_div.classList.add("answer");

        // Input
        let answer_input = document.createElement("input");
        answer_input.id = `answer${i}`;
        answer_input.type = "radio";
        answer_input.name = "question";
        answer_input.dataset.answer = obj[`answer_${i}`];
        // checked For First Input
        if (i == 1) {
          answer_input.checked = true;
        }

        // label
        let answer_label = document.createElement("label");
        answer_label.setAttribute("for", `answer${i}`);
        answer_label.textContent = obj[`answer_${i}`];

        // Appned Input And Label To Answer Div
        answer_div.appendChild(answer_input);
        answer_div.appendChild(answer_label);

        // Appned Answer Div To Answer
        answers_container.appendChild(answer_div);
      }
    }
  }

  // Check Answer Fucntion
  function check_Answer(obj, count) {
    if (currentIndex < count) {
      let answers = Array.from(document.getElementsByName("question"));
      let r_answer = obj["right_answer"];
      let choosen_answer;

      // find the Right Answer
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
          choosen_answer = answers[i].dataset.answer;
        }
      }

      // increes right_answers by (1) if The Answer is true
      if (choosen_answer == r_answer) {
        right_answers++;
      }
    }
  }

  // Handle Bullets Function
  function handle_Bullets() {
    let bulltes_spans = Array.from(
      document.querySelectorAll(".bullets .spans span")
    );
    bulltes_spans.forEach((span, index) => {
      if (index == currentIndex) {
        span.classList.add("on");
      }
    });
  }

  // Show Results Function
  function show_results(count) {
    // Check If No more Questions
    if (currentIndex == count) {
      quiz_area_container.remove();
      answers_container.remove();
      submit_button.remove();
      bullets_container.remove();

      // Show Result Element
      results_elem.style.display = "block";

      // handle The grade
      if (right_answers > count / 2) {
        results_elem.innerHTML = `<span class="good">Good</span> You Answerd ${right_answers} of ${count} Correct`;
      } else if (right_answers == count) {
        results_elem.innerHTML = `<span class="perfect">Perfect</span> You Answerd ${right_answers} of ${count} Correct`;
      } else {
        results_elem.innerHTML = `<span class="bad">Bad</span> You Answerd ${right_answers} of ${count} Correct`;
      }
    }
  }

  // CountDown Function
  function count_Down(duration, count) {
    if (currentIndex < count) {
      let seconds = duration;
      let countdown_elem = document.querySelector(".countdown");
      let minutes, rem_seconds;

      countdown_interval = setInterval(() => {
        minutes = Math.floor(seconds / 60);
        rem_seconds = seconds % 60;

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        rem_seconds = rem_seconds < 10 ? `0${rem_seconds}` : rem_seconds;

        if (--seconds < 0) {
          clearInterval(countdown_interval);
          submit_button.click();
        }

        countdown_elem.innerHTML = `<span>${minutes}</span>:<span>${rem_seconds}</span>`;
      }, 1000);
    }
  }

  // Call Ajax Request Function
  get_Questions();
})();
