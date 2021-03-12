// Constants
const startContainer = document.getElementById("startContainer");
const statementContainer = document.getElementById("statementContainer");
const startButton = document.getElementById("startButton");
const title = document.getElementById("title");
const statement = document.getElementById("statement");
const nextButton = document.getElementById("nextButton");

// Variables
var currentSubject = 0;

startButton.onclick = changeView;
nextButton.onclick = switchStatement;


// Add Bootstrap class "d-none"
function hide(element) {
    element.classList.add("d-none");
}

// Remove Bootstrap class "d-none"
function show(element) {
    element.classList.remove("d-none");
}

// Hide startContainer and show statementContainer
function changeView() {
    hide(startContainer);
    show(statementContainer);
    changeContent(currentSubject);
}

function changeContent(currentSubject) {
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    }
}

// Switch between multiple statements
function switchStatement() {
    switch (this.innerHTML) {
        case "Next":
            currentSubject++;
            changeContent(currentSubject);
            break;
        default:
            break;
    }
}