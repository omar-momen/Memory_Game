(function () {
  "use strict";

  /****************************  Start Todo List ****************************/
  // Main Variables
  let todo_input = document.querySelector(".add_todo input"),
    todo_add_butt = document.querySelector(".add_todo span"),
    no_tasks_messgae = document.querySelector(".no_tasks_messgae"),
    todo_tasks = document.querySelector(".tasks"),
    all_tasks_value = [],
    todo_tasks_arr = [],
    all_finished_tasks = [],
    delete_all = document.querySelector(".deleteAll"),
    finish_all = document.querySelector(".finishAll"),
    tasks_count = document.getElementById("tasksCount"),
    tasks_completed = document.getElementById("tasksCompleted");

  // Localstorage
  function localStoraag() {
    if (localStorage.getItem("tasks") != null) {
      let arr_tasks = JSON.parse(localStorage.getItem("tasks"));
      for (let x = 0; x < arr_tasks.length; x++) {
        let value = arr_tasks[x];
        // Elements
        let my_task_span = document.createElement("span"),
          task_content_span = document.createElement("span"),
          delete_butt = document.createElement("button"),
          // Text Nodes
          task_content = document.createTextNode(value),
          delete_butt_content = document.createTextNode("Delete");
        // Add Classes
        my_task_span.classList.add("task_box");
        task_content_span.classList.add("task_span_content");
        delete_butt.classList.add("delete");
        // Append
        task_content_span.appendChild(task_content);
        delete_butt.appendChild(delete_butt_content);
        my_task_span.appendChild(task_content_span);
        my_task_span.appendChild(delete_butt);
        todo_tasks.insertBefore(
          my_task_span,
          todo_tasks.children[todo_tasks.children.length - 1]
        );
        // re fill Matching Method
        all_tasks_value.push(value);
      }
    }
  }
  // Count Tasks
  function countTasks() {
    todo_tasks_arr = Array.from(document.querySelectorAll(".tasks .task_box"));
    all_finished_tasks = todo_tasks_arr.filter((task) =>
      task.classList.contains("finished")
    );
    tasks_count.innerHTML = todo_tasks_arr.length;
    tasks_completed.innerHTML = all_finished_tasks.length;
  }
  // Focus
  window.onload = function () {
    todo_input.focus();
    localStoraag();
    countTasks();
    checkDelete();
    checkFinished();
  };
  // Add Task
  todo_add_butt.onclick = function () {
    if (todo_input.value == "") {
      swal({
        title: "Input Empty",
        text: "Task Can't be empty",
        icon: "warning",
        button: "Ok",
      });
    } else {
      if (all_tasks_value.indexOf(todo_input.value) != -1) {
        swal({
          title: "Matching",
          text: "Task Can't be Dublicated",
          icon: "warning",
          button: "Ok",
        });
      } else {
        all_tasks_value.push(todo_input.value);
        // Elements
        let my_task_span = document.createElement("span"),
          task_content_span = document.createElement("span"),
          delete_butt = document.createElement("button"),
          // Text Nodes
          task_content = document.createTextNode(todo_input.value),
          delete_butt_content = document.createTextNode("Delete");
        // Add Classes
        my_task_span.classList.add("task_box");
        task_content_span.classList.add("task_span_content");
        delete_butt.classList.add("delete");
        // Append
        task_content_span.appendChild(task_content);
        delete_butt.appendChild(delete_butt_content);
        my_task_span.appendChild(task_content_span);
        my_task_span.appendChild(delete_butt);
        todo_tasks.insertBefore(
          my_task_span,
          todo_tasks.children[todo_tasks.children.length - 1]
        );
        // localStorage
        let new_data = todo_input.value;
        if (localStorage.getItem("tasks") == null) {
          localStorage.setItem("tasks", "[]");
        }
        let old_data = JSON.parse(localStorage.getItem("tasks"));
        old_data.push(new_data);
        localStorage.setItem("tasks", JSON.stringify(old_data));
        // Check Delete
        checkDelete();
        // Check Finish
        checkFinished();
        // Empty the Input
        todo_input.value = "";
      }
    }
    // Focus
    todo_input.focus();
  };
  // Enter key To submit
  window.addEventListener("keypress", function (key) {
    if (key.keyCode == "13") {
      todo_add_butt.click();
    }
  });
  // Delete & Finish Task
  function checkDelete() {
    countTasks();
    if (todo_tasks_arr.length == 0) {
      no_tasks_messgae.style.display = "block";
      delete_all.classList.add("disabled");
    } else {
      no_tasks_messgae.style.display = "none";
      delete_all.classList.remove("disabled");
    }
    countTasks();
  }
  function checkFinished() {
    countTasks();
    if (all_finished_tasks.length == todo_tasks_arr.length) {
      finish_all.classList.add("disabled");
    } else {
      finish_all.classList.remove("disabled");
    }
    countTasks();
  }
  document.addEventListener("click", function (e) {
    // *********** Finish ***********
    if (e.target.className == "task_span_content") {
      e.target.parentElement.classList.toggle("finished");
      checkFinished();
    }
    if (e.target.className == "finishAll") {
      todo_tasks_arr.forEach((task) => {
        task.classList.add("finished");
      });
      checkFinished();
    }
    // *********** Delete ***********
    if (e.target.className == "delete") {
      e.target.parentElement.remove();
      // localStorage
      let text_to_remove = e.target.parentElement.children[0].textContent;
      let task_arr = JSON.parse(localStorage.getItem("tasks"));
      let index_to_remove = task_arr.indexOf(text_to_remove);
      task_arr.splice(index_to_remove, 1);
      localStorage.setItem("tasks", JSON.stringify(task_arr));

      checkDelete();
      checkFinished();
    }
    if (e.target.classList.contains("deleteAll")) {
      todo_tasks_arr.forEach((task) => {
        task.remove();
      });
      localStorage.clear();
      checkDelete();
      checkFinished();
    }
  });

  /****************************  End Todo List ****************************/
})();
