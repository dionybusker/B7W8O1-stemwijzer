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
    
    /**
     * als de currentContainer de statementsContainer (1) is en currentSubject is hetzelfde als het aantal subjects
     * dan wordt currentContainer met 1 opgehoogd, zodat het partyContainer (2) wordt
     */
    if (currentContainer == 1 && currentSubject == (subjects.length - 1)) {
        currentContainer++;
        changeView();
        checkVote();
    }

    if (currentSubject < (subjects.length - 1)) {
        currentSubject++;
        viewContent(currentSubject);
        checkVote();
    }

    console.log("currentSubject: " + currentSubject)
    console.log("currentContainer: " + currentContainer)
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
    buttons.forEach(element => {
        if (subjects[currentSubject].vote != "" && element.id == subjects[currentSubject].vote) {
            element.style.backgroundColor = "blue";
        } else {
            element.style.backgroundColor = "";
        }
    });

    // console.log(subjects)

    subjects.forEach(subject => {
        console.log("**" + subject.title + ": " + subject.vote)
    })

    // buttons.forEach(element => { // wordt hierdoor steeds de laatst gekozen button gepakt?
    //     subjects.forEach(subject => { // zorgt dit ervoor dat de kleur wordt weergegeven nadat de laatste statement een vote heeft?
    //         if (subject.vote == element.id) {
    //             element.style.backgroundColor = "blue";
    //         } else {
    //             element.style.backgroundColor = "";
    //         }
    //     })
    // })
}



/**
 * op het moment wordt de laatste vote genomen en wordt hiermee de kleur van de button aangepast
 * daarbij wordt de kleur ook pas weergegeven zodra je voorbij de laatste statement bent geweest
 * 
 * !!!
 *  alle data wordt meteen weergegeven (in console) en alles heeft standaard "undefined"
 *  als de laatste statement al een vote waarde krijgt dan wordt hiervan ook meteen die button gekleurd
 *  dus alleen de vote van de laatste statement wordt gebruikt
 * !!!
 * 
 * het is de bedoeling dat de vote wordt onthouden en wordt vergeleken op de plek waar je nu zit
 * als je dan een statement teruggaat, dan wordt die vote onthouden en wordt de kleur op de knop weergegeven
 * 
 */