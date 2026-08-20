let gameSeq=[];
let userSeq=[];
let btns = ["one", "two", "three", "four"];

let userClick = false;
let start = false;
let score = 0;
let level = 0;

let h2 = document.querySelector("h2");
let button = document.querySelector("#button");
let p1 = document.querySelector(".highest");
let p2 = document.querySelector(".score");
let body = document.querySelector("body");
let message = document.querySelector(".message")

button.addEventListener("click", function() {
    if(start === false) {
        start = true;
        userClick = false;
        body.style.backgroundColor = "black";
        gameSeq = [];
        userSeq = [];
        level = 0;
        p1.innerText = "";
        levelUp();
    }
    
});

function gameFlash() {
    message.textContent = "Watch the Sequence...";
    userClick = false;
    for(let i=0; i<gameSeq.length; i++) {
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        setTimeout(() => {
            btn.classList.add("flash");
            setTimeout(() => {
                btn.classList.remove("flash");
            }, 250);
        }, i*1000);
    }
    setTimeout(() => {
        userClick = true;
        message.textContent = "Your Turn!"
    }, (gameSeq.length-1) * 1000+250);
    
}

function userFlash(btn) {
    btn.classList.add("flash");
    setTimeout(()=> {
        btn.classList.remove("flash")
    }, 250);

}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let random = Math.floor(Math.random() * 4);
    let randColor = btns[random];
    gameSeq.push(randColor);
    gameFlash();
    
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
            message.textContent = "correct! Next sequence";
        }
        
    }

    else {
        h2.innerText = `GAME OVER! Enter start button to replay`;
        p1.innerText = `Current Score: ${level}`
        body.style.backgroundColor = "rgb(123, 33, 33)";
        button.innerText = "Restart Game";
        if(level > score) {
            score = level;
        }
        p2.innerText = `Highest Score: ${score}`;
        start = false;
        userClick = false;
        message.textContent = "Game Over!"
        
    }

}

function btnPress() {

    if(userClick == false) {
        return;
    }
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}














