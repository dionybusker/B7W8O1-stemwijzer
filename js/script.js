const startContainer = document.getElementById("startContainer");
// show(startContainer);

// buttons
const startButton = document.getElementById("startBtn");

const voteButtons = document.querySelectorAll(".voteBtn");

// console.log(voteButtons);

voteButtons.forEach(element => {
    element.onclick = switchStatement;
});

const previousStatement = document.getElementById("previousStatement");
const skipStatement = document.getElementById("skipStatement");

// content
const title = document.getElementById("title");
const statement = document.getElementById("statement");

startButton.onclick = clickStartButton;

previousStatement.onclick = switchStatement;
skipStatement.onclick = switchStatement;

let currentSubject = 0;

// functies hide en show mogelijk in 1 functie?
function hide (element) {
    element.classList.add("d-none");
}

function show (element) {
    element.classList.remove("d-none");
}

// when startButton has been clicked
function clickStartButton () {
    // const startContainer = document.getElementById("startContainer");
    hide(startContainer);
    // console.log("button clicked");

    // const elementId = this.getAttribute("id");

    // if (elementId == "startBtn") {
    //     console.log("this is the start button");
    // }

    const container = document.getElementById("container");
    show(container);

    changeContent(currentSubject);
}

function changeContent (currentSubject) {
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = (currentSubject + 1) + '. ' + subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    }
}

// dit kan mogelijk korter, eventueel splitsen in meerdere functies
function switchStatement () {
    // console.log(this.getAttribute("id"))
    switch (this.innerHTML) {
        case "Eens":
            // console.log("pro");
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("pro");
                this.style.backgroundColor = "blue";
            }
            break;
        case "Geen van beide":
            // console.log("geen");
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("geen");
                this.style.backgroundColor = "blue";
            }
            break;
        case "Oneens":
            // console.log("contra");
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("contra");
                this.style.backgroundColor = "blue";
            }
            break;
    }

    switch (this.getAttribute("id")) {
        // Go to previous statement
        case "previousStatement":
            if (currentSubject > 0 && currentSubject <= (subjects.length - 1)) {
                currentSubject--;
                changeContent(currentSubject);

                console.log(subjects[currentSubject].vote)
                
                // if (subjects[currentSubject].vote == "pro") {

                // }
            }
            break;
        // Skip the current statement
        case "skipStatement":
            if (currentSubject <= (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
                userChoice("");
            }
            break;
    }
}

// Add vote to subjects array
function userChoice (vote) {
    subjects[currentSubject - 1].vote = vote;
    subjects[currentSubject - 1].score = 0;

    // subjects.forEach(function(subject, index) {
    //     if (subject.vote == subject.parties.position) {
    //         console.log("test")
    //     }
    // })

    console.log(subjects);
}

// dit zou mogelijk pas moeten gebeuren zodra alle statements gedaan zijn
function match () {
    subjects.forEach(function(myVote, index) {
        if (myVote.vote == subjects[index].parties.opinion) {
            myVote.score++;
        }
    })
}

subjects.forEach(function(subject, index) {
    console.log(subject);
    console.log(subjects[index].parties);
});

/*
    STAPPENPLAN

    stap 1. checken of je voorbij de laatste vraag bent
    stap 2. subjects.votes vergelijken met subjects.parties.position
    stap 3. score toekennen 

*/

/*
    let fruits = ["apple", "orange", "lemon"];

    let myFruits = [
        { name: "lemon", points: 0 },
        { name: "orange", points: 0 },
        { name: "apple", points: 0 }
    ];

    myFruits.forEach(function(myFruit, index){
        if (myFruit.name == fruits[index]) {
            myFruit.points++;
            console.log("fruit: " + myFruit.name);
        }
    });


    fruits -> subjects
    myFruits -> subjects

    subjects.forEach(function(myVote, index) {
        if (myVote.vote == subjects[index]) {
            myVote.points++;
        }
    });

*/