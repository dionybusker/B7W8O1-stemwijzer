// buttons
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");

// content
const title = document.getElementById("title");
const statement = document.getElementById("statement");

startBtn.onclick = clickStartBtn;
nextBtn.onclick = changeStatement;
previousBtn.onclick = changeStatement;

let currentSubject = 0;

// functies hide en show mogelijk in 1 functie?
function hide (element) {
    element.classList.add("hidden");
}

function show (element) {
    element.classList.remove("hidden");
}

function clickStartBtn () {
    console.log("button clicked");

    const elementId = this.getAttribute("id");

    if (elementId == "startBtn") {
        console.log("this is the start button");
    }

    const container = document.getElementById("container");
    show(container);

    changeContent(currentSubject);
}

function changeStatement () {
    const elementId = this.getAttribute("id");

    switch (elementId) {
        case 'nextBtn':
            currentSubject++;
            
            changeContent(currentSubject);
            
            console.log(currentSubject);
            break;
        case 'previousBtn':
            currentSubject--;
            
            changeContent(currentSubject);
            
            console.log(currentSubject);
            break;
    }

    // if (elementId == "nextBtn") {
    //     console.log("you clicked next");
    // }
    // if (elementId == "previousBtn") {
    //     console.log("you clicked previous");
    // }
}

function changeContent (currentSubject) {
    title.innerHTML = subjects[currentSubject].title;
    statement.innerHTML = subjects[currentSubject].statement;
}