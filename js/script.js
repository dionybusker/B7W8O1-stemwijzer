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
        hide(partyContainer);
    } else if (currentContainer == 2) {
        hide(statementContainer);
        show(partyContainer);
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
    console.log(this.id + " button");

    // if (this.id == subjects[currentSubject].vote) {
    //     console.log("test")
    // }

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
        default:
            break;
    }
    console.log(subjects);
}

// Go to the next statement/container
function goToNextStatement() {
    checkVote();
    /**
     * als de currentContainer de statementsContainer (1) is en currentSubject is hetzelfde als het aantal subjects
     * dan wordt currentContainer met 1 opgehoogd, zodat het partyContainer (2) wordt
     */
    if (currentContainer == 1 && currentSubject == (subjects.length - 1)) {
        currentContainer++;
        changeView();
    }

    if (currentSubject < (subjects.length - 1)) {
        currentSubject++;
        viewContent(currentSubject);
    }

    console.log("currentSubject: " + currentSubject)
    console.log("currentContainer: " + currentContainer)
}

// Go back to the previous statement/container
function goToPreviousStatement() {
    checkVote();
    if (currentSubject > 0 && currentContainer == 1) {
        currentSubject--;
        
        viewContent(currentSubject);
    } else if (currentSubject == 0 && currentContainer == 1) {
        currentContainer--;

        hide(statementContainer);
        hide(goBackButton);
        hide(partyContainer);
        show(startContainer);

        // changeView();
    } else if (currentSubject == (subjects.length - 1) && currentContainer == 2) {
        /**
         * als currentSubject hetzelfde is als het aantal subjects en de currentContainer is de partyContainer (2)
         * dan wordt currentContainer met 1 verlaagd (zodat je in de statementsContainer komt)
         * en wordt met changeView() de view aangepast
         */
        currentContainer--;

        changeView();
    }

    console.log("currentSubject: " + currentSubject)
    console.log("currentContainer: " + currentContainer)
}

function addUserVote(vote) {
    subjects[currentSubject].vote = vote;
}


function checkVote() {
    // buttons.forEach(element => {
    //     if (element.id == subjects[currentSubject].vote) {
    //         element.style.backgroundColor = "blue";
    //     } else {
    //         element.style.backgroundColor = "";
    //     }
    // });

    // console.log(subjects)

    subjects.forEach(subject => {
        console.log(subject.vote)
    })


    buttons.forEach(element => {
        subjects.forEach(subject => {
            if (subject.vote == element.id) {
                element.style.backgroundColor = "blue";
            } else {
                element.style.backgroundColor = "";
            }
        })
    })
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