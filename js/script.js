const startContainer = document.getElementById("startContainer");
show(startContainer);

// buttons
const startButton = document.getElementById("startBtn");
// const nextBtn = document.getElementById("nextBtn");
// const previousBtn = document.getElementById("previousBtn");

const voteButtons = document.querySelectorAll(".voteBtn");

console.log(voteButtons);

voteButtons.forEach(element => {
    element.onclick = switchStatement;
});

const previousStatement = document.getElementById("previousStatement");
const skipStatement = document.getElementById("skipStatement");

// content
const title = document.getElementById("title");
const statement = document.getElementById("statement");

startButton.onclick = clickStartButton;
// nextBtn.onclick = clickChangeButton;
// previousBtn.onclick = clickChangeButton;

previousStatement.onclick = switchStatement;
skipStatement.onclick = switchStatement;

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
    }
}

function switchStatement () {
    console.log(this.getAttribute("id"))
    switch (this.innerHTML) {
        case "Eens":
            // console.log("pro");
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("pro");
            }
            break;
        case "Geen van beide":
            // console.log("geen");
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("geen");
            }
            break;
        case "Oneens":
            // console.log("contra");
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("contra");
            }
            break;
    }
    switch (this.getAttribute("id")) {
        case "previousStatement":
            if (currentSubject > 0 && currentSubject <= (subjects.length - 1)) {
                currentSubject--;
                changeContent(currentSubject);
            }
            break;
        case "skipStatement":
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("");
            }
            break;
    }
}

function userChoice (vote) {
    subjects[currentSubject - 1].voted = vote;

    console.log(subjects);
}

function previous () {
    const elementId = this.getAttribute("id");

    if (elementId == "previousStatement") {
        if (currentSubject > 0) {
            currentSubject--;
            changeContent(currentSubject);
        }
    }
}