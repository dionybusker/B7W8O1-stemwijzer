// Constants
const startContainer = document.getElementById("startContainer");
const statementContainer = document.getElementById("statementContainer");
const startButton = document.getElementById("startButton");
const title = document.getElementById("title");
const statement = document.getElementById("statement");
const buttons = document.querySelectorAll(".buttons");

// Variables
var currentSubject = 0;

startButton.onclick = changeView;

buttons.forEach(element => {
    element.onclick = switchStatement;
})

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
        case "Ga terug":
            console.log("Ga terug");
            goToPreviousStatement();
            break;
        case "Eens":
            console.log("Eens");
            goToNextStatement();
            break;
        case "Geen van beide":
            console.log("Geen van beide");
            goToNextStatement();
            break;
        case "Oneens":
            console.log("Oneens");
            goToNextStatement();
            break;
        case "Sla deze vraag over":
            console.log("Sla deze vraag over");
            goToNextStatement();
            break;
        default:
            break;
    }
}

// Go to the next statement
function goToNextStatement() {
    currentSubject++;
    changeContent(currentSubject);
}

// Go back to the previous statement
function goToPreviousStatement() {
    currentSubject--;
    changeContent(currentSubject);
}