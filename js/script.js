// Constants
const startContainer = document.getElementById("startContainer");
const statementContainer = document.getElementById("statementContainer");
const importantStatementsContainer = document.getElementById("importantStatementsContainer");
const importantPartiesContainer = document.getElementById("importantPartiesContainer");
const resultContainer = document.getElementById("resultContainer");


const startButton = document.getElementById("startButton");
const goBackButton = document.getElementById("goBackButton");
const nextStepButton = document.getElementById("nextStepButton");

const title = document.getElementById("title");
const statement = document.getElementById("statement");
const buttons = document.querySelectorAll(".buttons");
const partyName = document.getElementById("partyName");

// Variables
var currentSubject = 0;
var currentContainer = 0; // Always start with startContainer (0)

startButton.onclick = changeView;

buttons.forEach(element => {
    element.onclick = switchStatement;
});

// give each party array a new value "points"
// parties.forEach(party => {
//     party.points = 0;
// })

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

    /**
     * er wordt bepaald wat currentContainer is
     * op basis hiervan wordt er een view weergegeven
     */
    if (currentContainer == 0) {
        hide(startContainer);
        show(statementContainer);
        show(goBackButton);
        currentContainer++;
    } else if (currentContainer == 1) {
        show(statementContainer);
        hide(resultContainer);
    } else if (currentContainer == 2) {
        hide(statementContainer);
        show(importantStatementsContainer);
        show(nextStepButton);
    } else if (currentContainer == 3) {
        hide(importantStatementsContainer);
        show(importantPartiesContainer);
        show(nextStepButton);
    } else if (currentContainer == 4) {
        hide(importantPartiesContainer);
        hide(nextStepButton);
        show(resultContainer);
        compareVotes();
        viewPartiesOnScreen();
    }
    
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
    // console.log(this.id + " button");

    switch (this.id) {
        case "goBackButton":
            // console.log("Ga terug");
            goToPreviousStatement();
            break;
        case "pro":
            // console.log("Eens");
            addUserVote("pro")
            goToNextStatement();
            break;
        case "neither":
            // console.log("Geen van beide");
            addUserVote("neither");
            goToNextStatement();
            break;
        case "contra":
            // console.log("Oneens");
            addUserVote("contra");
            goToNextStatement();
            break;
        case "skip":
            // console.log("Sla deze vraag over");
            addUserVote("");
            goToNextStatement();
            break;
        case "nextStepButton":
            goToNextContainer();
            break;
        default:
            break;
    }
    // console.log(subjects);
}

function goToNextContainer() {
    if (currentContainer == 1 && currentSubject == (subjects.length - 1)) {
        currentContainer++;
        changeView();
        checkVote();
    } else if (currentContainer == 2 || currentContainer == 3) {
        currentContainer++;
        changeView();
    }
}

// Go to the next statement/container
function goToNextStatement() {
     goToNextContainer();

    if (currentSubject < (subjects.length - 1)) {
        currentSubject++;
        viewContent(currentSubject);
        checkVote();
    }

    // console.log("currentSubject: " + currentSubject)
    // console.log("currentContainer: " + currentContainer)
}

// Go back to the previous statement/container
function goToPreviousStatement() {
    if (currentSubject > 0 && currentContainer == 1) {
        currentSubject--;
        checkVote();
        viewContent(currentSubject);
    } else if (currentSubject == 0 && currentContainer == 1) {
        currentContainer--;

        hide(statementContainer);
        hide(goBackButton);
        
        hide(resultContainer);
        show(startContainer);
    } else if (currentSubject == (subjects.length - 1) && currentContainer == 2) {
        /**
         * als currentSubject hetzelfde is als het aantal subjects en de currentContainer is de importantStatementsContainer (2)
         * dan wordt currentContainer met 1 verlaagd (zodat je in de statementsContainer komt)
         * en wordt met changeView() de view aangepast
         */
        currentContainer--;
        hide(importantStatementsContainer);
        hide(nextStepButton);
        changeView();
    } else if (currentContainer == 3 || currentContainer || 4) {
        currentContainer--;
        hide(importantPartiesContainer);
        hide(resultContainer);
        changeView();
    }

    // console.log("currentSubject: " + currentSubject)
    // console.log("currentContainer: " + currentContainer)
}

function addUserVote(vote) {
    subjects[currentSubject].vote = vote;
}


function checkVote() {
    buttons.forEach(element => {
        if (subjects[currentSubject].vote != "" && element.id == subjects[currentSubject].vote) {
            element.style.backgroundColor = "blue";
        } else {
            element.style.backgroundColor = "";
        }
    });

    // subjects.forEach(subject => {
    //     console.log("**" + subject.title + ": " + subject.vote)
    // })
}

// Compare the user's votes with the votes of the parties
function compareVotes() {
    parties.forEach(party => {
        party.points = 0;
    });
    subjects.forEach(subject => {
        subject.parties.forEach(subjectParty => {
            if (subject.vote == subjectParty.position) {
                addPointsToParties(subjectParty);
            }
        });
    });
    console.log(parties)
}

function addPointsToParties(subjectParty) {
    parties.forEach(party => {
        if (party.name == subjectParty.name) {
            // party.points = 0;
            party.points++;
        }
    });
}

function viewPartiesOnScreen() {
    if (currentContainer == 4) {
        parties.sort((partyA, partyB) => partyB.points - partyA.points);
        
        parties.forEach(party => {
            var li = document.createElement("li");
                li.innerHTML += party.name + ", " + party.points + " punten";
            
            partyName.appendChild(li);
        });
    }
}