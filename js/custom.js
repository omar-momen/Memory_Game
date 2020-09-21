(function () {
  "use strict";

  /****************************  Start Memory_Game ****************************/
  let StartBuut = document.querySelector(".start_game span");
  StartBuut.onclick = function () {
    let playerName = prompt("Your Name");
    if (playerName == null || playerName == "") {
      document.querySelector(".memory_game .info .name span").innerHTML =
        "Unknown";
    } else {
      document.querySelector(
        ".memory_game .info .name span"
      ).innerHTML = playerName;
    }
    document.querySelector(".start_game").remove();
    document.querySelector("body").classList.add("noClick");
    document.getElementById("drums").play();
    setTimeout(() => {
      document.querySelector("body").classList.remove("noClick");
    }, 4000);
  };

  let blockContainer = document.querySelector(".game_blocks"),
    blocks = Array.from(blockContainer.children),
    duration = 1000,
    tries = document.querySelector(".memory_game .wrongTries span");

  let orderRange = Array.from(Array(blocks.length).keys());
  // Suffle Cards
  let suffleArray = shuffle(orderRange);
  blocks.forEach((block, index) => {
    block.style.order = suffleArray[index];
    block.addEventListener("click", function () {
      flipBlock(block);
    });
  });

  function shuffle(arr) {
    let current = arr.length - 1,
      random,
      temp;
    while (current >= 0) {
      random = Math.floor(Math.random() * current);
      temp = arr[current];
      arr[current] = arr[random];
      arr[random] = temp;
      current--;
    }
    return arr;
  }

  function stopClicking() {
    blockContainer.classList.add("noClick");
    setTimeout(() => {
      blockContainer.classList.remove("noClick");
    }, duration);
  }

  function checkMatchedBlocks(firstBlock, SecondBlock) {
    if (firstBlock.dataset.technology === SecondBlock.dataset.technology) {
      firstBlock.classList.remove("isFlibbed");
      SecondBlock.classList.remove("isFlibbed");
      setTimeout(() => {
        document.getElementById("success").play();
      }, duration / 2);
      firstBlock.classList.add("has_match");
      SecondBlock.classList.add("has_match");
      firstBlock.classList.add("noClick");
      SecondBlock.classList.add("noClick");
    } else {
      setTimeout(() => {
        tries.textContent = parseInt(tries.textContent) + 1;
        document.getElementById("fail").play();
      }, duration / 2);
      setTimeout(() => {
        firstBlock.classList.remove("isFlibbed");
        SecondBlock.classList.remove("isFlibbed");
      }, duration);
    }
  }

  function flipBlock(selectedBlock) {
    // Add The Class
    selectedBlock.classList.add("isFlibbed");
    // check For To Fliped Blocks
    let allFlipedBlocks = blocks.filter((flipedBlock) =>
      flipedBlock.classList.contains("isFlibbed")
    );
    if (allFlipedBlocks.length == 2) {
      stopClicking();
      checkMatchedBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
    let GameEnd = blocks.filter((allBlocks) =>
      allBlocks.classList.contains("has_match")
    );
    if (GameEnd.length == blocks.length) {
      document.getElementById("message").textContent = "You Win";
      setTimeout(() => {
        document.getElementById("GameEndSuccess").play();
        document.getElementById("endGamePopup").style.opacity = "1";
        document.getElementById("endGamePopup").style.zIndex = "100";
      }, 400);
      document.getElementById("playAgain").onclick = function () {
        location.reload();
      };
    }
  }

  /****************************  End Memory_Game ****************************/
})();
