const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#newbtn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let moveCount = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showMessage(`${val1} Wins! 🎉`);
      disableBoxes();
      return true;
    }
  }

  if (moveCount === 9) {
    showMessage("It's a Draw! 🤝");
    return true;
  }

  return false;
};

const showMessage = (message) => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    box.style.color = turnO ? "#00ffc6" : "#ff5e78";
    turnO = !turnO;
    box.disabled = true;
    moveCount++;
    checkWinner();
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);