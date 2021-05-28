/**
 * Constants used in this project
 */
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
const statementsLengthText = document.getElementById("statementsLengthText");

const partySelectionOptions = [{"title": "Grote partijen"}, {"title": "Seculiere partijen"}];

const partySize = 15;

/**
 * Variables used in this project
 */
var currentSubject = 0;
var currentContainer = 0;

var subjectCheckboxesCreated = false;
var partyCheckboxesCreated = false;

var statementsLength = subjects.length;
statementsLengthText.innerText = statementsLength;

startButton.onclick = changeView;

buttons.forEach(element => {
    element.onclick = switchStatement;
});

/**
 * Add Bootstrap class "d-none" to hide e.g. the current container
 * 
 * @param {*} element
 */
function hide(element) {
    element.classList.add("d-none");
}

/**
 * Remove Bootstrap class "d-none" to display e.g. the current container
 * 
 * @param {*} element
 */
function show(element) {
    element.classList.remove("d-none");
}

/**
 * Hide and show different container based on currentContainer
 */
function changeView() {
    if (currentSubject < 0) {
        currentSubject = 0;
    }

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

        if (!partyCheckboxesCreated) {
            viewPartySelectionWithCheckbox();
        }
    } else if (currentContainer == 4) {
        hide(importantPartiesContainer);
        hide(nextStepButton);
        show(resultContainer);
        
        checkStatementImportance();
        changeSettingForParties();
        compareVotes();
        viewPartiesOnScreen();
    }
    
    viewContent(currentSubject);
}

/**
 * Display statements with the correct title and statement
 * 
 * @param {number} currentSubject position of the current subject to display
 */
function viewContent(currentSubject) {
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = (currentSubject + 1) + ". " + subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    }
}

/**
 * Functionality for the buttons to switch between statements and containers
 */
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

/**
 * Go to the next container, e.g. when you've clicked through all statements
 */
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

/**
 * Go to the next statement, if you've clicked through all statements you go to the next container
 */
function goToNextStatement() {
     goToNextContainer();

    if (currentSubject < (subjects.length - 1)) {
        currentSubject++;
        viewContent(currentSubject);
        checkVote();
    }
}

/**
 * Go to the previous statement, if you've clicked through all statements you go to the previous container
 */
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

/**
 * When clicked on a button, a vote will be added to the subjects object
 * 
 * @param {string} vote a string based on what button has been clicked in switchStatement()
 */
function addUserVote(vote) {
    subjects[currentSubject].vote = vote;
}

/**
 * Check which button has been clicked and keep this selected
 */
function checkVote() {
    buttons.forEach(element => {
        if (element.id != "goBackButton" && element.id != "nextStepButton") {
            if (subjects[currentSubject].vote != "" && element.id == subjects[currentSubject].vote) {
                element.classList.add("btn-primary");
                element.classList.remove("btn-dark");
            } else {
                element.classList.remove("btn-primary");
                element.classList.add("btn-dark");
            }

        }
    });
}

/**
 * Compare the user's votes with the parties' votes to add points
 * Add extra points when a statement (subject) has been marked as important
 */
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
}

/**
 * Add points to the correct party when a user's vote is the same as the party's vote
 * 
 * @param {object} subjectParty parties object inside the subjects object
 */
function addPointsToParties(subjectParty) {
    parties.forEach(party => {
        if (party.name == subjectParty.name) {
            party.points++;
        }
    });
}

/**
 * Display all parties on screen, ordered from most points to least points
 */
function viewPartiesOnScreen() {
    removeChildNode(partyName);

    if (currentContainer == 4) {
        parties.sort((partyA, partyB) => partyB.points - partyA.points);
        
        parties.forEach(party => {
            if (party.display != false) {
                var li = document.createElement("li");
                    li.innerHTML += party.name + " - " + party.points + " punten";
                    li.classList.add("list-group-item");
                
                partyName.appendChild(li);
            }
        });
    }
}

/**
 * Create a checkbox
 * 
 * @param {object} object "subjects" object from viewStatementWithCheckbox and "options" object from viewPartySelectionWithCheckbox
 */
function createCheckbox(object) {
    var div = document.createElement("div");
        div.classList.add("col-4");

    var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "object";
        checkbox.className = "statementCheckboxes";
        checkbox.value = object.title;
        checkbox.id = object.title;
        checkbox.classList.add("m-1");

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

/**
 * Display checkboxes with statements for importantStatementsContainer
 */
function viewStatementWithCheckbox() {
    removeChildNode(subjectTitle);

    if (currentContainer == 2) {
        subjects.forEach(subject => {
            createCheckbox(subject);
        });
        subjectCheckboxesCreated = true;
    }
}

/**
 * Display checkboxes with options for importantPartiesContainer
 */
function viewPartySelectionWithCheckbox() {
    removeChildNode(partySelection);

    if (currentContainer == 3) {
        partySelectionOptions.forEach(option => {
            createCheckbox(option);
        });
        partyCheckboxesCreated = true;
    }
}

/**
 * Display parties based on user's choice for "Grote partijen" or "Seculiere partijen"
 * If none selected, all parties will be displayed
 */
function changeSettingForParties() {
    parties.forEach(party => {
        party.display = true;
    });

    checkSelectedCheckboxes();
}

/**
 * Remove firstChild from childNode to prevent duplicates
 * 
 * @param {*} childNode subjectTitle (from viewStatementWithCheckbox()) / partySelection (from viewPartySelectionWithCheckbox())
 */
function removeChildNode(childNode) {
    while (childNode.firstChild) {
        childNode.removeChild(childNode.firstChild);
    }
}

/**
 * Check importance of the statements
 */
function checkStatementImportance() {
    subjects.forEach(subject => {
        subject.important = false;
    });

    checkSelectedCheckboxes();
}

/**
 * Check selected checkboxes to display the correct parties on screen and to mark the correct subjects as important
 */
function checkSelectedCheckboxes() {
    const checkboxes = document.querySelectorAll("input[name='object']:checked");

    checkboxes.forEach(checkbox => {
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