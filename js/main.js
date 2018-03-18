/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// TODO: Create a class called `Player`. The `constructor()` should look for a
class Player {
  constructor (token){
    this.token = token;
  }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        // TODO: Set up `this.player1` and `this.player2` properties.
        // These properties should be new Player class instances.
        // You may set the "token" to anything that corresponds to a Glyphicon
        // icon name ('heart', 'star', 'remove-sign', 'unchecked', 'bell',
        // 'certificate', etc.)
this.player1 = new Player('remove-sign');
      this.player2 = new Player('unchecked');
      

        // TODO: Initialize several  properties that will be used to track game
        // progress.

        // TODO: Set `this.currentPlayer` equal to `null`
this.currentPlayer = null;
        // TODO: Set `this.gameStatus` equal to `null`
this.gameStatus = null;
        // TODO: Set `this.winner` equal to `null`
this.winner = null;
        // TODO: Set `this.moveCount` equal to `0`
this.moveCount = 0;
        // TODO: Set up DOM elements used in game as Class properties

        // TODO: Set `this.startPrompt` equal to the `#start-prompt` element
this.startPrompt = document.querySelector('#start-prompt');
        // TODO: Set `this.movePrompt` equal to the `#move-prompt` element
this.movePrompt = document.querySelector('#move-prompt');

        // TODO: Set `this.currentPlayerToken` equal to the `#player-token` element
this.currentPlayerToken = document.querySelector('#player-token');
        // TODO: Set `this.gameboard` equal to the `#gameboard` element
this.gameboard = document.querySelector('#gameboard');
        // TODO: Set `this.winScreen` equal to the `#win-screen` element
this.winScreen = document.querySelector('#win-screen');
        // TODO: Set `this.winnerToken` equal to the `#winner-token` element
this.winnerToken = document.querySelector('#winner-token');
        // TODO: Set `this.drawScreen` equal to the `#draw-screen` element
this.drawScreen = document.querySelector ('#draw-screen');
        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
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

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
      console.log('Checking for Winner.');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // TODO: Create a new event called `winEvent` that will dispatch the signal "win".
              let winEvent = new Event ('win');

                // TODO: Dispatch the winEvent using the `document.dispatchEvent()` method.
              document.dispatchEvent(winEvent);

                return true; // Return a value to stop processing the additional move count check.
            }
        }
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

      this.currentPlayerToken.setAttribute('class',`glyphicon glyphicon-${this.currentPlayerToken}`);
    }
    setUpTileListeners(){
      console.log('Setting up Tile Listeners.');

      let tileElements = document.querySelectorAll('.tile');

      for (tile of tileElements){
        tile.addEventListener('click',handleMove);
      }
    
    }
    showWinScreen(){
        // This method displays the end game screen for a Win.
      console.log('Now showing Win screen.');

      this.winScreen.setAttribute('class','show');

      this.winnerToken.setAttribute('class',`glyphicon ${this.winner.token}`);
    }
    showDrawScreen(){
        // This method displays the end game screen for a Draw.

      this.drawScreen.setAttribute('class','show');
    }
    setUpBoard(){
      console.log('Setting up gameboard.');
this.gameboard.innerHTML = '';     
for (let i=0; i=3; i++){

        let newRow = document.createElement('div');

        newRow.setAttribute('class','row');
  
 for (let j=0; j=3; j++){
   let newCol = document.createElement('div');

   newCol.setAttribute('class', 'col-xs-3');
   
   let newTile = document.createElement('span');

   newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');

   newTile.dataset.x = i;

   newTile.dataset.y = j;
   
   newCol.appendChild(newTile);

   newRow.appendChild(newCol);
   
 }          // Second `for` loop should end here.

  this.gameboard.appendChild(newRow);

      } // Your first `for` loop should end here.

      this.setUpTileListeners();

    }
    initializeMovePrompt(){
       
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


function handleMove(event){
  console.log('Handling player move.');
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
