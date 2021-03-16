// Constants
const startContainer = document.getElementById("startContainer");
const statementContainer = document.getElementById("statementContainer");
const startButton = document.getElementById("startButton");
const title = document.getElementById("title");
const statement = document.getElementById("statement");
const buttons = document.querySelectorAll(".buttons");

// Variables
var currentSubject = 0;

/* ik moet dit nog een keer uit zien te voeren zodra de startContainer weer zichtbaar is en de statementContainer is verborgen */
startButton.onclick = changeView;

buttons.forEach(element => {
    element.onclick = switchStatement;
});

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
    /* BUG -- wanneer je bij de laatste statement bent, dan telt currentSubject steeds op */
    if (currentSubject < 0) {
        currentSubject = 0;
    }

    hide(startContainer);
    show(statementContainer);
    
    viewContent(currentSubject);
    console.log(startButton);
    console.log(currentSubject);
}

function viewContent(currentSubject) {
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    }
}

// Switch between multiple statements
function switchStatement() {
    /* in de verschillende statements moeten er ook nog een extra vote toegevoegd worden op basis van welke knop er is ingedrukt */

    switch (this.id) {
        case "goBackButton":
            console.log("Ga terug");
            goToPreviousStatement();
            break;
        case "proButton":
            console.log("Eens");
            goToNextStatement();
            break;
        case "noneButton":
            console.log("Geen van beide");
            goToNextStatement();
            break;
        case "contraButton":
            console.log("Oneens");
            goToNextStatement();
            break;
        case "skipButton":
            console.log("Sla deze vraag over");
            goToNextStatement();
            break;
        default:
            break;
    }
    console.log(currentSubject)
}

// Go to the next statement
function goToNextStatement() {
    if (currentSubject < (subjects.length - 1)) {
        currentSubject++;
        viewContent(currentSubject);
    }
    // else {
    //     /* verbergen van de statementContainer, zichtbaar maken van de volgende container */
    //     hide(statementContainer);
    //     show(...);
    // }
}

// Go back to the previous statement
function goToPreviousStatement() {
    if (currentSubject > 0) {
        currentSubject--;
        viewContent(currentSubject);
    } else {
        hide(statementContainer);
        show(startContainer);
    }
}