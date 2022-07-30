'use strict';

let field = document.querySelector('.field');
let winPicture = document.querySelector('.win');
let losePicture = document.querySelector('.lose')
let drawPicture = document.querySelector('.draw')

let radioEasyBtn = document.querySelector('.easyBtn');
let radioNormalBtn = document.querySelector('.normalBtn');
let radioHardBtn = document.querySelector('.hardBtn');

let computerLevel = "easy";

let yourScorePlace = document.querySelector('.options__result__picture__1');
let compScorePlace = document.querySelector('.options__result__picture__2');

let yourScore = 0;
let compScore = 0;

radioEasyBtn.addEventListener('change', function(){
    computerLevel = "easy"})

radioNormalBtn.addEventListener('change', function(){
    computerLevel = "normal"})

radioHardBtn.addEventListener('change', function(){
    computerLevel = "hard"})

let countTurn = 0;
let checkWinIdent = false;

let user = {
    cell1: 0,
    cell2: 0,
    cell3: 0,
    cell4: 0,
    cell5: 0,
    cell6: 0,
    cell7: 0,
    cell8: 0,
    cell9: 0,
};

field.addEventListener("click", playerTurn);

function playerTurn(e){
    let a = e.target.getAttribute('id');
    if (user[a]) return;   
    e.target.firstElementChild.classList.add('unhidden');
    e.target.firstElementChild.classList.remove('hidden');
    user[a] = 1;
    countTurn++;
    checkWin();
    field.removeEventListener("click", playerTurn);
    setTimeout(computerTurn, 400, computerLevel);
}

function computerTurn(computerLevel){
    field.addEventListener("click", playerTurn);
    switch (computerLevel) {
        case 'easy':
            computerTurnRandom();
            break;
        case 'normal':
            computerTurnSmart()
            break;
        case 'hard':
            computerTurnSmartest()
            break;
    }
}

function computerTurnRandom(){
    let freeCell = 0;
    while (!freeCell && countTurn < 8 && !checkWinIdent) {
        let b = "cell" + getRandom();
        if (user[b]!=1 && user[b]!='x'){
            let c = document.getElementById(b);
            c.lastElementChild.classList.add('unhidden');
            c.lastElementChild.classList.remove('hidden');
            user[b]='x';
            freeCell = 1;
            countTurn++;
            checkWin();
        }
    }
}

function computerTurnSmart(){
    let freeCell = 0;
    let b;
    while (!freeCell && countTurn < 8 && !checkWinIdent) {
        
        if (smartCheck()) {b = smartCheck();}
        else {b = "cell" + getRandom();}
        
        if (user[b]!=1 && user[b]!='x'){
            let c = document.getElementById(b);
            c.lastElementChild.classList.add('unhidden');
            c.lastElementChild.classList.remove('hidden');
            user[b]='x';
            freeCell = 1;
            countTurn++;
            checkWin();
        }
    }
}

function computerTurnSmartest(){
    let freeCell = 0;
    let b;
    
    while (!freeCell && countTurn < 8 && !checkWinIdent) {
        if (smartestCheck()) {b = smartestCheck();}
        else if (smartCheck()) {b = smartCheck();}
        else if (!user['cell5']) {b = "cell5";}
        else if (!user['cell1']) {b = "cell1";}
        else if (!user['cell3']) {b = "cell3";}
        else if (!user['cell7']) {b = "cell7";}
        else if (!user['cell9']) {b = "cell9";}
        else {b = "cell" + getRandom();}
        console.log(user['cell5']);
        
        if (user[b]!=1 && user[b]!='x'){
            let c = document.getElementById(b);
            c.lastElementChild.classList.add('unhidden');
            c.lastElementChild.classList.remove('hidden');
            user[b]='x';
            freeCell = 1;
            countTurn++;
            checkWin();
        }
    }
}

function smartCheck(){
    if (user.cell1+user.cell2+user.cell3 == 2) {
        if (!user.cell1) return ('cell1');
        if (!user.cell2) return ('cell2');
        if (!user.cell3) return ('cell3');
    };
    if (user.cell4+user.cell5+user.cell6 == 2) {
        if (!user.cell4) return ('cell4');
        if (!user.cell5) return ('cell5');
        if (!user.cell6) return ('cell6');
    };
    if (user.cell7+user.cell8+user.cell9 == 2) {
        if (!user.cell7) return ('cell7');
        if (!user.cell8) return ('cell8');
        if (!user.cell9) return ('cell9');
    };
    if (user.cell1+user.cell4+user.cell7 == 2){
        if (!user.cell1) return ('cell1');
        if (!user.cell4) return ('cell4');
        if (!user.cell7) return ('cell7');
    };
    if (user.cell2+user.cell5+user.cell8 == 2){
        if (!user.cell2) return ('cell2');
        if (!user.cell5) return ('cell5');
        if (!user.cell8) return ('cell8');
    };
    if (user.cell3+user.cell6+user.cell9 == 2){
        if (!user.cell3) return ('cell3');
        if (!user.cell6) return ('cell6');
        if (!user.cell9) return ('cell9');
    };
    if (user.cell1+user.cell5+user.cell9 == 2){
        if (!user.cell1) return ('cell1');
        if (!user.cell5) return ('cell5');
        if (!user.cell9) return ('cell9');
    };
    if (user.cell3+user.cell5+user.cell7 == 2){
        if (!user.cell3) return ('cell3');
        if (!user.cell5) return ('cell5');
        if (!user.cell7) return ('cell7');
    };    
}

function smartestCheck(){
    let a1 = user.cell1+user.cell2+user.cell3; 
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell1) return ('cell1');
        if (!user.cell2) return ('cell2');
        if (!user.cell3) return ('cell3');
    };
    a1 = user.cell4+user.cell5+user.cell6;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell4) return ('cell4');
        if (!user.cell5) return ('cell5');
        if (!user.cell6) return ('cell6');
    };
    a1 = user.cell7+user.cell8+user.cell9;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell7) return ('cell7');
        if (!user.cell8) return ('cell8');
        if (!user.cell9) return ('cell9');
    };
    a1 = user.cell1+user.cell4+user.cell7;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell1) return ('cell1');
        if (!user.cell4) return ('cell4');
        if (!user.cell7) return ('cell7');
    };
    a1 = user.cell2+user.cell5+user.cell8;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell2) return ('cell2');
        if (!user.cell5) return ('cell5');
        if (!user.cell8) return ('cell8');
    };
    a1 = user.cell3+user.cell6+user.cell9;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell3) return ('cell3');
        if (!user.cell6) return ('cell6');
        if (!user.cell9) return ('cell9');
    };
    a1 = user.cell1+user.cell5+user.cell9;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell1) return ('cell1');
        if (!user.cell5) return ('cell5');
        if (!user.cell9) return ('cell9');
    };
    a1 = user.cell3+user.cell5+user.cell7;
    if (a1 == "0xx" || a1 == "x0x" || a1 == "xx0") {
        if (!user.cell3) return ('cell3');
        if (!user.cell5) return ('cell5');
        if (!user.cell7) return ('cell7');
    };    
}

function getRandom(){
    return  Math.round((Math.random()*8 + 1));
}

function win(){
    for (let i = 1; i < 10; i++) {
        user['cell'+i] = 1;
    }
    yourScore++;
    yourScorePlace.innerText = yourScore;
    checkWinIdent=true; 
    winPicture.classList.add("unhidden"); 
    winPicture.classList.remove("hidden");
    setTimeout (restart, 3000)
};

function lose(){
    for (let i = 1; i < 10; i++) {
        user['cell'+i] = 1;
    }
    compScore++;
    compScorePlace.innerText = compScore;
    checkWinIdent=true; 
    losePicture.classList.add("unhidden"); 
    losePicture.classList.remove("hidden");
    setTimeout (restart, 3000)
};

function draw (){
    checkWinIdent=true; 
    drawPicture.classList.add("unhidden"); 
    drawPicture.classList.remove("hidden");
    setTimeout (restart, 3000)
}

function restart(){
    countTurn = 0;
    for (let i = 1; i < 10; i++){
        user["cell"+i] = 0;
    };
    
    checkWinIdent=false; 
    let allPictures = document.querySelectorAll('.picture');  
    for (let one of allPictures){
        if (one.classList.contains("unhidden")) {
            one.classList.add('hidden');
            one.classList.remove('unhidden');
        }
    }
}

function checkWin(){
    if (user.cell1+user.cell2+user.cell3 == 3) {win();return};
    if (user.cell4+user.cell5+user.cell6 == 3) {win();return};
    if (user.cell7+user.cell8+user.cell9 == 3) {win();return};
    if (user.cell1+user.cell4+user.cell7 == 3) {win();return};
    if (user.cell2+user.cell5+user.cell8 == 3) {win();return};
    if (user.cell3+user.cell6+user.cell9 == 3) {win();return};
    if (user.cell1+user.cell5+user.cell9 == 3) {win();return};
    if (user.cell3+user.cell5+user.cell7 == 3) {win();return};
    
    if (user.cell1+user.cell2+user.cell3 == 'xxx') {lose();return};
    if (user.cell4+user.cell5+user.cell6 == 'xxx') {lose();return};
    if (user.cell7+user.cell8+user.cell9 == 'xxx') {lose();return};
    if (user.cell1+user.cell4+user.cell7 == 'xxx') {lose();return};
    if (user.cell2+user.cell5+user.cell8 == 'xxx') {lose();return};
    if (user.cell3+user.cell6+user.cell9 == 'xxx') {lose();return};
    if (user.cell1+user.cell5+user.cell9 == 'xxx') {lose();return};
    if (user.cell3+user.cell5+user.cell7 == 'xxx') {lose();return};

    if (countTurn == 9 && !checkWinIdent) draw();
}


