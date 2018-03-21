/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// Player class
class Player {
  constructor (token){
    this.token = token;
  }
}

// Create Tic tac toe game class to set up a board, players, and other game functions.
// Glyphicons can be set to 'heart', 'star', 'remove-sign', 'unchecked', 'bell','certificate', etc

class TicTacToe {
    constructor(){
      this.player1 = new Player('remove-sign');
      this.player2 = new Player('unchecked');
      this.currentPlayer = null;
      this.gameStatus = null;
      this.winner = null;
      this.moveCount = 0;
      this.startPrompt = document.querySelector('#start-prompt');
      this.movePrompt = document.querySelector('#move-prompt');
      this.currentPlayerToken = document.querySelector('#player-token');
      this.gameboard = document.querySelector('#gameboard');
      this.winScreen = document.querySelector('#win-screen');
      this.winnerToken = document.querySelector('#winnerToken');
      this.drawScreen = document.querySelector ('#draw-screen');
        
      //state of the gameboard here.
      this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        //DF: each item in the [] array represents a win state of X,Y coordinates. 
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }
  
      checkForWinner(){
      console.log('Checking for Winner.');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
          //current player's game status below (if winning condition is met) :
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;
              //Win event causes a pop up window ('win') here.
                let winEvent = new Event ('win');
                document.dispatchEvent(winEvent);
                return true; // Return a value to stop processing the additional move count check.
            }
        }
        
        //DF: The number of moves start being counted here. 
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';
            let drawEvent = new Event('draw');
            document.dispatchEvent(drawEvent);
        }
    }
 
    recordMove(event){
      console.log('Recording move.');
      let tileX = event.target.dataset.x;
      let tileY = event.target.dataset.y;      
      this.gameState[tileX][tileY] = this.currentPlayer.token;
      
      event.target.setAttribute('class',`tile played glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    
    switchPlayer(){
      console.log('Switching Player.');
        //DF: setting conditionals for player 1 vs. player 2, and back
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
      } else {
            this.currentPlayer = this.player1;
      }

      this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayerToken}`);
    }
  
    setUpTileListeners(){
      console.log('Setting up Tile Listeners.');
      let tileElements = document.querySelectorAll('.tile');
      for (let tile of tileElements){
        tile.addEventListener('click',handleMove);
      }
        }
  
    showWinScreen(){
        // DF: Displaying the end game screen for a Win.
      console.log('Now showing Win screen.');
      this.winScreen.setAttribute('class','show');
      this.winnerToken.setAttribute('class',`glyphicon ${this.winner.token}`);
    }
    showDrawScreen(){
        // DF: Displaying the end game screen for a Draw.
      console.log('Now showing Draw screen.');
      this.drawScreen.setAttribute('class','show');
    }
  
     setUpBoard(){
      console.log('Setting up gameboard.');
        this.gameboard.innerHTML = '';     
        for (let i=0; i<3; i++){
        let newRow = document.createElement('div');
        newRow.setAttribute('class','row');
          for (let j=0; j<3; j++){
          let newCol = document.createElement('div');
          newCol.setAttribute('class', 'col-xs-3');
   
   let newTile = document.createElement('span');
   newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');
   newTile.dataset.x = i;
   newTile.dataset.y = j;   
   newCol.appendChild(newTile);
   newRow.appendChild(newCol);
            this.gameboard.appendChild(newRow);
   
 }   
        }
        this.setUpTileListeners();

    }
  
    initializeMovePrompt(){    
        //Starts functions after "start game" is called. 
        console.log('Intitializing Move Prompt.');
        this.startPrompt.setAttribute('class','hidden');
        this.movePrompt.setAttribute('class','');
        this.currentPlayer = this.player1;       
        this.currentPlayerToken.setAttribute('class',`glyphicon glyphicon-${this.currentPlayerToken}`);       
    }
    start(){    
      console.log('Starting game.');
      //DF: this is a new game board below. 
      this.setUpBoard();
      this.initializeMovePrompt();

    }
} // End of the Tic Tac Toe Class definition.

let game;
console.log('Game code starting now.');
document.addEventListener('DOMContentLoaded',function(event){
console.log('DOM Content has loaded.');
  
let startButton = document.querySelector('#start-button');

startButton.addEventListener('click',function(event){
  game = new TicTacToe();
  game.start();
});

}); //End DOMContentLoaded Event Listener

document.addEventListener('win',function(event){
  console.log('Detected win event.');
  game.showWinScreen();
});

//DF: Draw event listener
document.addEventListener('draw',function(event){
  console.log('Detected draw event.');
  game.showDrawScreen();
});
//End of draw here. 

//DF: Recording player's move here, to check who is the winner. If one player is not the winner, it will switch. 
function handleMove(event){
  console.log('Handling player move.');
    // Record the move for the current player.
    game.recordMove(event);
    // Check to see if the last move was a winning move.
    game.checkForWinner();
    game.switchPlayer();
}
