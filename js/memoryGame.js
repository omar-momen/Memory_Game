(function () {
  "use strict";

  /****************************  Start Memory_Game ****************************/
  let StartBuut = document.querySelector(".start_game span");
  StartBuut.onclick = function () {
    let playerName = prompt("Your Name");
    let time = prompt("Time in Seconds", 60);
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
      // Timer
      if (time == null || time == "") {
        window.seconds = 60;
      } else {
        window.seconds = time;
      }
      let timeDiv = document.getElementById("time");
      window.Timer = setInterval(() => {
        let minutes = Math.floor(window.seconds / 60),
          remSeconds = window.seconds % 60;
        if (remSeconds < 10) {
          remSeconds = "0" + remSeconds;
        }
        if (window.minutes < 10) {
          minutes = "0" + minutes;
        }
        if (window.seconds <= 0) {
          clearInterval(Timer);
          // Game End
          document.getElementById("message").textContent = "You lose";
          setTimeout(() => {
            document.getElementById("EndgameFail").play();
            document.getElementById("endGamePopup").style.opacity = "1";
            document.getElementById("endGamePopup").style.zIndex = "100";
          }, 400);
          document.getElementById("playAgain").onclick = function () {
            location.reload();
          };
        } else {
          window.seconds = window.seconds - 1;
        }
        timeDiv.innerHTML = `${minutes}:${remSeconds}`;
      }, 1000);
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
    // Game End Fail

    // Game End Success
    let GameEnd = blocks.filter((allBlocks) =>
      allBlocks.classList.contains("has_match")
    );
    if (GameEnd.length == blocks.length) {
      clearInterval(window.Timer);
      // localStorage
      let key = document.getElementById("WiningPlayerName").textContent;
      let value = tries.textContent;
      localStorage.setItem(key, value);
      /************/
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
  // locaStorage
  let outPutDiv = document.getElementById("previousWiningPlayers");
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    outPutDiv.innerHTML += `<div class="player">
    <span>Name: <span>${key}</span></span>
    <span>Wrong_Tries: <span>${value}</span></span>
    </div>`;
  }
  if (localStorage.length > 0) {
    outPutDiv.classList.add("ok");
  }

  /****************************  End Memory_Game ****************************/
})();
