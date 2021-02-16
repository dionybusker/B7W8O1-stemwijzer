const startContainer = document.getElementById("startContainer");
show(startContainer);

// buttons
const startButton = document.getElementById("startBtn");
// const nextBtn = document.getElementById("nextBtn");
// const previousBtn = document.getElementById("previousBtn");

const voteButtons = document.querySelectorAll(".voteBtn");

console.log(voteButtons);

voteButtons.forEach(element => {
    element.onclick = nextStatement;
});

var votes = [];

// content
const title = document.getElementById("title");
const statement = document.getElementById("statement");

startButton.onclick = clickStartButton;
// nextBtn.onclick = clickChangeButton;
// previousBtn.onclick = clickChangeButton;

let currentSubject = 0;

// functies hide en show mogelijk in 1 functie?
function hide (element) {
    element.classList.add("hidden");
}

function show (element) {
    element.classList.remove("hidden");
}

// when startButton has been clicked
function clickStartButton () {
    const startContainer = document.getElementById("startContainer");
    hide(startContainer);
    console.log("button clicked");

    const elementId = this.getAttribute("id");

    if (elementId == "startBtn") {
        console.log("this is the start button");
    }

    const container = document.getElementById("container");
    show(container);

    changeContent(currentSubject);
}

function changeContent (currentSubject) {
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    } else {
        console.log("no more data")
    }
}

function nextStatement () {
    switch (this.innerHTML) {
        case "Eens":
            // console.log("pro");
            if (currentSubject < (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("pro");
            }
            break;
        case "Geen van beide":
            // console.log("geen");
            if (currentSubject < (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("geen");
            }
            break;
        case "Oneens":
            // console.log("contra");
            if (currentSubject < (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("contra");
            }
            break;
    }
}

function userChoice (x) {
    if (currentSubject > 0) {
        votes.push(x);
        console.log(votes);
    }
}