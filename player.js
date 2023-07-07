export class Player {
    constructor(playerNumber, board) {
        this.playerNumber = playerNumber;
        this.board = board;
    }

    createPieces() {
        const checkerRows = Math.floor((this.board.size - 2) / 2);
        const startingRow = this.playerNumber === 1 ? 0 : this.board.size - checkerRows;
        for (let y = startingRow; y < startingRow + checkerRows; y++) {
            for (let x = 0; x < this.board.size; x++) {
                if ((y % 2 === 0 && x % 2 !== 0) || (y % 2 !== 0 && x % 2 === 0)) {
                    this.board.tiles[y * this.board.size + x] = this.playerNumber;
                }
            }
        }
    }
}
  