(function () {
  "use strict";

  const url = "../../pages/pdf_test.pdf";

  let pdfDoc = null,
    pageNum = 1,
    page_is_rendering = false,
    page_num_is_pendenig = null;

  const scale = 1.5,
    canvas = document.getElementById("pdf_render"),
    ctx = canvas.getContext("2d");

  pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    console.log(pdfDoc);
  });
})();
