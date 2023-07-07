import { Board } from "./board.js";


const main = () => {
    const board = new Board(8);
    board.createCheckers();
    board.draw();
};

main();
