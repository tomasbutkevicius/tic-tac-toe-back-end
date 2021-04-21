const Board = require('../db/models/Board');

exports.getAllBoards = async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.getLatestBoard = async (req, res) => {
    try {
        const boards = await Board.find().sort({ _id: -1 }).limit(1);
        res.json(boards[0]);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.addBoard = async (req, res) => {

    const { squares, xIsNext, winner, lastAction } = req.body;

    if (squares !== undefined && xIsNext !== undefined && winner !== undefined && lastAction !== undefined) {
        const board = new Board({
            squares: req.body.squares,
            xIsNext: req.body.xIsNext,
            winner: req.body.winner,
            lastAction: req.body.lastAction
        });

        try {
            const savedBoard = await board.save();
            res.json(savedBoard);
        } catch (err) {
            res.json({ message: err });
        }
    } else {
        res.json({ message: "Invalid request body field names" });
    }
}

exports.deleteAllBoards = async (req, res) => {
    try{
        await Board.deleteMany();
        res.json({ message: "Game data is deleted" });
    } catch (err) {
        res.json({ message: err });
    }
}