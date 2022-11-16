const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const playersTurn = document.querySelector('[data-player-turn]');
const winningMessageElement = document.querySelector('.winning-message');
const winningMessageText=document.querySelector('[data-winning-message-text]');
const restartGame = document.querySelector('#restart-game');
const keepPlaying = document.querySelector('#keep-playing');
const player1Score = document.querySelector('[data-player1-score]');
const player2Score = document.querySelector('[data-player2-score]');

let totalMoves = 0;
const p1 = "circle";
const p2 = "x";
// Calling to make default scores 
startGame();

// startGame is like a main fucntions in programming languages 
function startGame(){
    board.classList.toggle(p1);
    cells.forEach(cell=>{
        cell.addEventListener('click',clickHandler,{once:true});
    })
}

// onclick we should add class of currplayer to the cell

function clickHandler(e){
    this.classList.toggle(currPlayer());
    const cell_no = this.getAttribute('data-cell');
    totalMoves++;
    if(totalMoves>4){
        if(checkWinner(cell_no)){
            gameOver();
            return;
        }
    }

    if(totalMoves >= 9)
    gameDraw();

    swapTurns();
}

function currPlayer(){
    const isX =board.classList.contains("x");
    if(isX) return "x";
    const isCircle =board.classList.contains("circle");
    if(isCircle) return  "circle";
}

function swapTurns(){
    board.classList.toggle(p1);
    board.classList.toggle(p2);

    if(playersTurn.innerHTML==1)
    playersTurn.innerHTML=2;
    else
    playersTurn.innerHTML=1;
}

function checkWinner(cell_no){
    const row = findRow(cell_no);
    const col = findCol(cell_no);
    return checkColumnWise(col) || checkRowWise(row) || checkDiagonally();
}

function findRow(cell_no){
    if(cell_no>=1 && cell_no<=3)
    return 1;

    if(cell_no>=4 && cell_no<=6)
    return 2;

    if(cell_no>=7 && cell_no<=9)
    return 3;
}

function findCol(cell_no){
    switch (Number(cell_no)) {
        case 1: case 4: case 7: 
            return 1; 
        break;

        case 2: case 8: case 5: 
            return 2;
        break;

        case 3: case 6: case 9: 
            return 3;
        
    }
}

function checkRowWise(row){
    const currentPlayer = currPlayer();
    let i = null;
    if(row==1) i=1;
    else if(row==2) i=4;
    else i=7;

    for(let j=0;j<3;j++){
        if(cells[i+j-1].classList.contains(currentPlayer)){}
        else return false;
    }
    return true  
}

function checkColumnWise(col){
    const currentPlayer = currPlayer();
    for(let j=col;j<=(col+6);j+=3){
        if(cells[j-1].classList.contains(currentPlayer)) {}
        else return false;
    }
    return true;
}

function checkDiagonally(){
    return checkLeftDiagonal() || checkRightDiagonal();
}

function checkRightDiagonal(){
    for(let j=3;j<=7;j+=2){
        if(cells[j-1].classList.contains(currPlayer())){}
        else return false;
    }
    return true;
}

function checkLeftDiagonal(){
    for(let i=1;i<=9;i+=4){
        if(cells[i-1].classList.contains(currPlayer())){}
        else return false;
    }
    return true;
}

function gameOver(){
    showWinnigMessage();
    winningMessageText.innerHTML=currPlayer()+" win's!!";
}

function gameDraw(){
    showWinnigMessage();
    winningMessageText.innerHTML="Game Draw!";
}

// sets default scores of : 0 

function showWinnigMessage() {
    winningMessageElement.classList.add("show");
}

function hideWinnigMessage() {
    winningMessageElement.classList.remove("show");
}

restartGame.addEventListener('click',function (){
    board.classList.remove(p1);
    board.classList.remove(p2);
    playersTurn.innerHTML=1;
    cells.forEach(cell => {
        cell.classList.remove(p1);
        cell.classList.remove(p2);
        cell.removeEventListener('click',clickHandler);
    });
    hideWinnigMessage();
    totalMoves=0;
    startGame();
});
