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
const subjectTitle = document.getElementById("subjectTitle");
const partySelection = document.getElementById("partySelection");

const partySelectionOptions = [{"title": "Grote partijen"}, {"title": "Seculiere partijen"}];

const partySize = 15;

// Variables
var currentSubject = 0;
var currentContainer = 0; // Always start with startContainer (0)

var subjectCheckboxesCreated = false;
var partyCheckboxesCreated = false;

startButton.onclick = changeView;

buttons.forEach(element => {
    element.onclick = switchStatement;
});

/**
 * Add Bootstrap class "d-none"
 * 
 * @param {*} element
 */
function hide(element) {
    element.classList.add("d-none");
}

/**
 * Remove Bootstrap class "d-none"
 * 
 * @param {*} element
 */
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

        if (!subjectCheckboxesCreated) {
            viewStatementWithCheckbox();
        }
    } else if (currentContainer == 3) {
        hide(importantStatementsContainer);
        show(importantPartiesContainer);
        show(nextStepButton);

        // createCheckbox();
        if (!partyCheckboxesCreated) {
            viewPartySelectionWithCheckbox();
        }
    } else if (currentContainer == 4) {
        // const checkboxes = document.querySelectorAll("input[name='subject']:checked");
        
        hide(importantPartiesContainer);
        hide(nextStepButton);
        show(resultContainer);
        
        checkStatementImportance();
        changeSettingForParties();
        compareVotes();
        viewPartiesOnScreen();
    }
    
    viewContent(currentSubject);

    // console.log("currentContainer: " + currentContainer);
}

/**
 * Display statements on the page
 * 
 * @param {number} currentSubject 
 */
function viewContent(currentSubject) {
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    }
}

// Switch between multiple statements
function switchStatement() {
    switch (this.id) {
        case "goBackButton":
            goToPreviousStatement();
            break;
        case "pro":
            addUserVote("pro")
            goToNextStatement();
            break;
        case "neither":
            addUserVote("neither");
            goToNextStatement();
            break;
        case "contra":
            addUserVote("contra");
            goToNextStatement();
            break;
        case "skip":
            addUserVote("");
            goToNextStatement();
            break;
        case "nextStepButton":
            goToNextContainer();
            break;
        default:
            break;
    }
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
}

function addUserVote(vote) {
    subjects[currentSubject].vote = vote;
}

function checkVote() {
    buttons.forEach(element => {
        if (subjects[currentSubject].vote != "" && element.id == subjects[currentSubject].vote) {
            element.classList.add("btn-primary");
        } else {
            element.classList.remove("btn-primary");
        }
    });
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
                if (subject.important == true) {
                    addPointsToParties(subjectParty);
                }
            }
        });
    });
    // console.log(parties)
}

function addPointsToParties(subjectParty) {
    parties.forEach(party => {
        if (party.name == subjectParty.name) {
            party.points++;
        }
    });
}

function viewPartiesOnScreen() {
    removeChildNode(partyName);

    if (currentContainer == 4) {
        parties.sort((partyA, partyB) => partyB.points - partyA.points);
        
        parties.forEach(party => {
            if (party.display != false) {
                var li = document.createElement("li");
                    li.innerHTML += party.name + ", " + party.points + " punten";
                
                partyName.appendChild(li);
            }
        });
    }
}

/**
 * 
 * @param {object} object subjects from viewStatementWithCheckbox and options from viewPartySelectionWithCheckbox
 */
function createCheckbox(object) {
    var div = document.createElement("div");

    var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "object";
        checkbox.className = "statementCheckboxes";
        checkbox.value = object.title;
        checkbox.id = object.title;

    var label = document.createElement("label");
        label.htmlFor = object.title;
        label.appendChild(document.createTextNode(object.title));

    div.appendChild(checkbox);
    div.appendChild(label);

    if (currentContainer == 2) {
        subjectTitle.appendChild(div);
    }

    if (currentContainer == 3) {
        partySelection.appendChild(div);
    }
}

// checkboxen worden nu steeds opnieuw aangemaakt omdat deze functie steeds opnieuw wordt aangeroepen
function viewStatementWithCheckbox() {
    removeChildNode(subjectTitle);

    if (currentContainer == 2) {
        subjects.forEach(subject => {
            createCheckbox(subject);
        });
        subjectCheckboxesCreated = true;
    }
}

function viewPartySelectionWithCheckbox() {
    removeChildNode(partySelection);

    if (currentContainer == 3) {
        partySelectionOptions.forEach(option => {
            createCheckbox(option);
        });
        partyCheckboxesCreated = true;
    }
}

// instellen dat de gebruiker alleen grote partijen, of alleen seculiere partijen wilt zien
// niks aangevinkt betekent alle partijen inzien
function changeSettingForParties() {
    parties.forEach(party => {
        party.display = true;
    });

    doSomethingWithCheckbox();
}

/**
 * remove firstChild from div/li to prevent duplicates
 * 
 * @param {*} childNode subjectTitle (from viewStatementWithCheckbox()) / partySelection (from viewPartySelectionWithCheckbox())
 */
function removeChildNode(childNode) {
    while (childNode.firstChild) {
        childNode.removeChild(childNode.firstChild);
    }
}

function checkStatementImportance() {
    subjects.forEach(subject => {
        subject.important = false;
    });

    doSomethingWithCheckbox();
}

function doSomethingWithCheckbox() {
    const checkboxes = document.querySelectorAll("input[name='object']:checked");

    checkboxes.forEach(checkbox => {
        console.log(checkbox.value);

        subjects.forEach(subject => {
            if (subject.title == checkbox.value) {
                subject.important = true;
                
            }
        });

        parties.forEach(party => {
            if (checkbox.value == "Seculiere partijen") {
                if (party.secular != true) {
                    party.display = false;
                }
            }

            if (checkbox.value == "Grote partijen") {
                if (party.size < partySize) {
                    party.display = false;
                }
            }
        });
    });
}

/**
 * Korte omschrijving wat de functie doet
 * 
 * @param {string} parameter (de naam van de param) - betekenis van de string
 * @param {object} parameter (de naam van de param) - wat er in het object zit
 * @return {string}
 */