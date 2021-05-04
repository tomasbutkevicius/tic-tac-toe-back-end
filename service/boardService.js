const Board = require('../db/models/Board');
const logger = require('../logger/index');
const seedDB = require('../seed/seed');

exports.getAllBoards = async () => {
    try {
        logger.info("Get all boards called");
        const boards = await Board.find();
        logger.debug(boards);
        return boards;
    } catch (err) {
        logger.error(err);
        return { message: err };
    }
}


exports.getLatestBoard = async () => {
    try {
        logger.info("Get latest board called");
        const boards = await Board.find().sort({ _id: -1 }).limit(1);
        logger.debug(boards[0]);
        return boards[0];
    } catch (err) {
        logger.error(err);
        return { message: err };
    }
}

exports.addBoard = async (req) => {
    logger.info("Add board called");
    let board;
    try {
        board = getBoardFromRequest(req);
    } catch (err) {
        return { message: err };
    }

    try {
        const savedBoard = await board.save();
        logger.debug("Saved board: " + JSON.stringify(req.body));
        return savedBoard;
    } catch (err) {
        logger.error(err);
        return { message: err };
    }
}

exports.deleteAllBoards = async () => {
    logger.info("Delete all boards called");
    try {
        await Board.deleteMany();
        return { message: "Game data is deleted" };
    } catch (err) {
        logger.error(err);
        return { message: err };
    }
}

exports.getWinner = async (req) => {
    logger.info("Get winner called");
    let board;
    try {
        board = getBoardFromRequest(req);
    } catch (err) {
        return { message: err };
    }
    try {
        const winner = getWinnerFromBoard(board);
        logger.debug("Winner: " + winner);
        return getWinnerFromBoard(board);
    } catch (err) {
        logger.error(err);
        return { message: err };
    }
}

exports.getLatestWinner = async (req) => {
    logger.info("Get latest winner called");
    try {
        const board = await this.getLatestBoard();
        const winner = getWinnerFromBoard(board);
        logger.debug("Winner: " + winner);
        return getWinnerFromBoard(board);
    } catch (err) {
        logger.error(err);
        return { message: err };
    }
}

exports.seed = async () => {
    logger.info("Seed database called");
    try {
        await seedDB();
        return { message: "database reset with seed" };
    } catch (err) {
        logger.error(err);
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

function getBoardFromRequest(req) {
    const { squares, xIsNext, winner, lastAction } = req.body;
    logger.debug("REQ_BODY: " + JSON.stringify(req.body));

    if (squares !== undefined && xIsNext !== undefined && winner !== undefined && lastAction !== undefined) {
        return new Board({
            squares: req.body.squares,
            xIsNext: req.body.xIsNext,
            winner: req.body.winner,
            lastAction: req.body.lastAction
        });
    }
    throw "Request body is invalid";
}
