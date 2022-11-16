const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
// The only difference is thgat here we used arrays that makes it very easy algorithm
const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const playersTurn = document.querySelector('[data-player-turn]');
const winningMessageElement = document.querySelector('.winning-message');
const winningMessageText=document.querySelector('[data-winning-message-text]');
const restartGame = document.querySelector('#restart-game');

let totalMoves = 0;
const p1 = "circle";
const p2 = "x";


startGame();
// startGame is like a main fucntions in programming languages 
function startGame(){
    board.classList.toggle(p1);
    cells.forEach(cell=>{
        cell.addEventListener('click',clickHandler,{once:true});
    })
}


function clickHandler(e){
    this.classList.toggle(currPlayer());
    totalMoves++;
    if(totalMoves>4){
        if(checkWinner()){
            gameOver();
            return;
        }
    }

    if(totalMoves >=  9)
    gameDraw();

    swapTurns();
}

function currPlayer(){
    const isX = board.classList.contains("x");
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

function checkWinner(){
    return winConditions.some(winCondition => {
        return winCondition.every(index =>{
           return cells[index].classList.contains(currPlayer());
        });
    });
}

function gameOver(){
    showWinnigMessage();
    winningMessageText.innerHTML=currPlayer()+" win's!!";
}

function gameDraw(){
    showWinnigMessage();
    winningMessageText.innerHTML="Game Draw!";
}

function showWinnigMessage() {
    winningMessageElement.classList.add("show");
}

function hideWinnigMessage() {
    winningMessageElement.classList.remove("show");
}

restartGame.addEventListener('click',clearBoard);

// removes eventListner And Call Start Game Function 
function clearBoard(){
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
}