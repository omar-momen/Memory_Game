(function () {
  "use strict";

  let filtre_input = document.getElementById("filter-input");
  // Add Event Listner On input
  filtre_input.addEventListener("keyup", function () {
    let filter_value = filtre_input.value;
    let lis = document.querySelectorAll(
      ".list-group .list-group-item:not(.active)"
    );
    lis.forEach((li) => {
      if (li.textContent.indexOf(filter_value) > -1) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  });
})();
