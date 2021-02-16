const startContainer = document.getElementById("startContainer");
show(startContainer);

// buttons
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");

// content
const title = document.getElementById("title");
const statement = document.getElementById("statement");

startBtn.onclick = clickStartBtn;
nextBtn.onclick = clickChangeBtn;
previousBtn.onclick = clickChangeBtn;

let currentSubject = 0;

// functies hide en show mogelijk in 1 functie?
function hide (element) {
    element.classList.add("hidden");
}

function show (element) {
    element.classList.remove("hidden");
}

// when startBtn has been clicked
function clickStartBtn () {
    const startContainer = document.getElementById("startContainer");
    hide(startContainer);
    console.log("button clicked");

    const elementId = this.getAttribute("id");

    if (elementId == "startBtn") {
        console.log("this is the start button");
    }

    const container = document.getElementById("container");
    show(container);

    changeContent(currentSubject);
}

// when nextBtn or previousBtn has been clicked
function clickChangeBtn () {
    const elementId = this.getAttribute("id");

    switch (elementId) {
        case 'nextBtn':
            if (currentSubject < (subjects.length - 1)) {
                currentSubject++;
                changeContent(currentSubject);
            }
            
            console.log(currentSubject);

            break;
        case 'previousBtn':
            if (currentSubject > 0) {
                currentSubject--;
                changeContent(currentSubject);
            }
            
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
    if (currentSubject >= 0 && currentSubject < subjects.length) {
        title.innerHTML = subjects[currentSubject].title;
        statement.innerHTML = subjects[currentSubject].statement;
    } else {
        console.log("no more data")
    }
}