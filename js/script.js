// Constants
const startContainer = document.getElementById("startContainer");
const statementContainer = document.getElementById("statementContainer");
const partyContainer = document.getElementById("partyContainer");
const startButton = document.getElementById("startButton");
const goBackButton = document.getElementById("goBackButton");
const title = document.getElementById("title");
const statement = document.getElementById("statement");
const buttons = document.querySelectorAll(".buttons");

// Variables
var currentSubject = 0;
var currentContainer = 0; // Always start with startContainer (0)

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
    if (currentSubject < 0) {
        currentSubject = 0;
    }

    if (currentContainer == 0) {
        hide(startContainer);
        show(statementContainer);
        show(goBackButton);
    } else if (currentContainer == 2) {
        hide(statementContainer);
        show(partyContainer);
    }
    
    currentContainer++;
    
    viewContent(currentSubject);
    
    // console.log("startButton: " + startButton);
    // console.log(currentSubject);
    console.log("currentContainer: " + currentContainer);
}

// Display the different statements
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
            // console.log("Ga terug");
            goToPreviousStatement();
            break;
        case "proButton":
            // console.log("Eens");
            addUserVote("pro")
            goToNextStatement();
            break;
        case "neitherButton":
            // console.log("Geen van beide");
            addUserVote("geen");
            goToNextStatement();
            break;
        case "contraButton":
            // console.log("Oneens");
            addUserVote("contra");
            goToNextStatement();
            break;
        case "skipButton":
            // console.log("Sla deze vraag over");
            addUserVote("");
            goToNextStatement();
            break;
        default:
            break;
    }
    // console.log(subjects);
}

// Go to the next statement
function goToNextStatement() {
    if (currentContainer == 1) {
        if (currentSubject < (subjects.length - 1)) {
            currentSubject++;
            viewContent(currentSubject);
        }
    }

    //  else {
    //     /* verbergen van de statementContainer, zichtbaar maken van de volgende container */
    //     hide(statementContainer);
    //     show(partyContainer);
    // }
    console.log("currentSubject: " + currentSubject)
    console.log("currentContainer: " + currentContainer)
}

// Go back to the previous statement
function goToPreviousStatement() {
    /**
     * deze functie wordt gebruikt op de "Ga terug"-knop
     * de "Ga terug"-knop wordt weergegeven in de statementsContainer
     * de "Ga terug"-knop wordt gebruikt om te kunnen navigeren tussen de statements (door naar de vorige statement(s) te gaan)
     * 
     */
    // if (currentContainer != 0) {
        if (currentSubject > 0) {
            // show(statementContainer);
            currentSubject--;
            
            viewContent(currentSubject);
        } else {
            if (currentSubject == 0 && currentContainer == 1) {
                currentContainer--;

                hide(statementContainer);
                hide(goBackButton);
                hide(partyContainer);
                show(startContainer);
            }
        }
    // }

    // if (currentSubject > 0 && currentSubject < subjects.length) {
    //     hide(partyContainer);
    //     show(statementContainer);
    // }

    console.log("currentSubject: " + currentSubject)
    console.log("currentContainer: " + currentContainer)
}

function addUserVote(vote) {
    subjects[currentSubject].vote = vote;
}


/**
 * startContainer       => 0
 * statementContainer   => 1
 * partyContainer       => 2
 * 
 * currentSubject kan 0, 1, 2 of 3 zijn (met de huidige testdata)
 * 
 * op basis van de "Ga terug"-knop:
 *   als currentSubject 0 is EN de currentContainer is 1 (statementContainer)
 *     dan wordt currentContainer met 1 verminderd (currentContainer--)
 * 
 * 
 */