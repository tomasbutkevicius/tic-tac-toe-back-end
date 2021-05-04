const Board = require('../db/models/Board');

exports.getAllBoards = async () => {
    try {
        const boards = await Board.find();
        return boards;
    } catch (err) {
        return { message: err };
    }
}


exports.getLatestBoard = async () => {
    try {
        const boards = await Board.find().sort({ _id: -1 }).limit(1);
        return boards[0];
    } catch (err) {
        return { message: err };
    }
}

exports.addBoard = async (req) => {

    const { squares, xIsNext, winner, lastAction } = req.body;

    if (squares !== undefined && xIsNext !== undefined && winner !== undefined && lastAction !== undefined) {
        const board = new Board({
            squares: req.body.squares,
            xIsNext: req.body.xIsNext,
            winner: req.body.winner,
            lastAction: req.body.lastAction
        });

        try {
            return await board.save();
        } catch (err) {
            return { message: err };
        }
    } else {
        return { message: "Invalid request body field names" };
    }
}

exports.deleteAllBoards = async () => {
    try{
        await Board.deleteMany();
        return { message: "Game data is deleted" };
    } catch (err) {
       return { message: err };
    }
}

exports.getWinner = async () => {
    try {
        const board = await this.getLatestBoard();
        return getWinnerFromBoard(board);
    } catch (err) {
        return { message: err };
    }
}

function getWinnerFromBoard(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            board.squares[a] &&
            board.squares[a] === board.squares[b] &&
            board.squares[a] === board.squares[c]
        ) {
            return board.squares[a];
        }
    }
    return null;
}