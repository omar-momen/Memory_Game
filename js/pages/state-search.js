(function () {
  "use strict";

  const search_input = document.getElementById("search");
  const output_elem = document.querySelector(".output");

  search_input.addEventListener("input", () =>
    state_search(search_input.value)
  );

  const state_search = (search_value) => {
    output_elem.innerHTML = "";
    let matches = [];
    fetch("../JSON/states_info.json")
      .then((response) => response.json())
      .then((states) => {
        matches = states.filter((state) => {
          const regEx = new RegExp(`^${search_value}`, "gi");
          return state.name.match(regEx) || state.abbr.match(regEx);
        });
        if (search_value.length == 0) {
          matches = [];
        }
        matches.forEach((state) => {
          output_elem.innerHTML += `
            <div class="card card-body mb-1">
              <h4>${state.name} (${state.abbr}) <span class="text-primary">${state.capital}</span></h4>
              <small>Lat: ${state.lat} /Long: ${state.long}</small>
            </div>
            `;
        });
      });
  };
})();
