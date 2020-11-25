(function () {
  "use strict";

  let outPutDiv = document.getElementById("output");
  outPutDiv.style.visibility = "hidden";
  document.addEventListener("input", function (e) {
    let pounds = e.target.value;
    if (!pounds == "") {
      outPutDiv.style.visibility = "visible";
    } else {
      outPutDiv.style.visibility = "hidden";
    }
    let kilograms = document.getElementById("kilos_output");
    let grmas = document.getElementById("grams_output");
    let ounces = document.getElementById("ounces_output");

    kilograms.innerHTML = pounds / 2.2046;
    grmas.innerHTML = pounds / 0.0022046;
    ounces.innerHTML = pounds * 16;
  });
})();
