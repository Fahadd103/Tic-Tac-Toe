let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;
let flag = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    flag = 0;
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.classList.contains("clicked")) {
            if (turn0) {
                box.innerText = "o";
                box.style.color = "#eae0d5";
                box.style.backgroundColor = "#124559";
                box.classList.add("clicked");
                turn0 = false;
                count++;
            } else {
                box.innerText = "x";
                box.style.color = "#0a0908";
                box.style.backgroundColor = "#eae0d5";
                box.classList.add("clicked");
                turn0 = true;
                count++;
            }

            checkWinner();


        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
        box.classList.remove("clicked");
    }
};

const showWinner = (winner) => {
    let winnerName = winner === "o" ? "Player O" : "Player X";
    msg.innerText = `Congratulations, Winner is ${winnerName}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    document.querySelector(".container").classList.remove("hide");
    document.querySelector("#reset-btn").classList.remove("hide");
    document.querySelector(".header").classList.add("hide");
};

const showDraw = () => {
    msg.innerText = `Match is Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    document.querySelector(".container").classList.remove("hide");
    document.querySelector("#reset-btn").classList.remove("hide");
    document.querySelector(".header").classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val) {
                showWinner(pos1Val);
                flag = 1;
            }
        }
        if (count===9 && flag===0) {
            showDraw();
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

