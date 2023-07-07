import { Player } from "./player.js";

/***
 * Fix movement of the tiles to not go back, unless they have reached the end of the board (checker)
 * Assign turns (line 35 and line 56)
 * Add symbol to checker when reaches opposite board side
 */

export class Board {
  constructor(size) {
    this.size = size;
    this.tiles = Array(size * size).fill(0);
    this.elem = document.getElementById("board");
  }

  draw() {
    this.elem.innerHTML = "";
    this.elem.style.setProperty("--size", this.size);
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const tileValue = this.tiles[y * this.size + x];
        const tileElem = document.createElement("div");
        tileElem.dataset.x = x;
        tileElem.dataset.y = y;
        tileElem.classList.add("tile");

        if (tileValue > 0) {
          const checkerElem = document.createElement("div");
          checkerElem.classList.add("checker");
          checkerElem.classList.add(`player-${tileValue}`);
          tileElem.appendChild(checkerElem);
        }
      this.elem.appendChild(tileElem);
      tileElem.addEventListener("click", () => {
        if (this.initialPlayer === this.player1) { //this statement will allow movement
          this.movePiece(x, y);
        } else console.log('It`s not your turn')
      });
      }

    }

  }

  getTile(x, y) {
    if (x < 0 || y < 0 || x >= this.size || y >= this.size) { return null }
    return this.tiles[y * this.size + x];
  }

  movePiece(x, y) {
    const tileValue = this.getTile(x, y);
  
    // Check if there is a selected piece and the clicked tile is empty
    if (this.selectedTile !== 0 && tileValue === 0) {
      const selectedTileValue = this.selectedTile;
      const currentPlayer = (this.selectedTile === this.player1.playerNumber) ? this.player1 : this.player2; //switch system, needs to be changed here
      if (currentPlayer.playerNumber !== this.selectedTile) {
        return console.log('It`s not your turn')
      }
  
      // Determine the valid movement direction based on the player's turn and the player's piece
      const direction = (selectedTileValue === 1) ? 1 : -1;
  
      // Calculate the difference in x and y
      const deltaX = Math.abs(x - this.selectedX);
      const deltaY = Math.abs(y - this.selectedY);
  
      // Check if the movement is diagonal and has the valid range
      if (deltaX === deltaY && deltaX > 0 && deltaX <= 2) {
        // Check if the movement is a valid jump
        if (deltaX === 2) {
          // Calculate the coordinates of the jumped tile
          const jumpedX = (x > this.selectedX) ? this.selectedX + 1 : this.selectedX - 1;
          const jumpedY = (y > this.selectedY) ? this.selectedY + 1 : this.selectedY - 1;
  
          // Check if the jumped tile has an opponent's piece
          const jumpedTileValue = this.getTile(jumpedX, jumpedY);
          if (jumpedTileValue !== 0 && jumpedTileValue !== selectedTileValue) {
            // Remove the opponent's piece by setting its value to 0
            this.tiles[jumpedY * this.size + jumpedX] = 0;
          } else {
            return console.log('Invalid Movement')
          }
        }
  
        // Update the tiles array and clear the selectedTile value
        this.tiles[y * this.size + x] = selectedTileValue;
        this.tiles[this.selectedY * this.size + this.selectedX] = 0;
        this.selectedTile = 0;
        this.currentPlayer = (currentPlayer === 1) ? 2 : 1; 
        this.draw(); // Updates board
        
      }
    } else {
      this.selectedTile = tileValue;
      this.selectedX = x;
      this.selectedY = y;
    }
  }
  

  createCheckers() {
    this.player1 = new Player(1, this);
    this.player2 = new Player(2, this);
    //console.log(this.player1, this.player2)
    this.player1.createPieces();
    this.player2.createPieces();


    this.initialPlayer = this.player1;
  }
}
  