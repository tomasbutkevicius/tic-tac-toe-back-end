const Board = require('../db/models/Board');
const logger = require('../logger/index');

var data = [
    {
        squares: [
            null,
            "X",
            "O",
            null,
            "X",
            "O",
            null,
            "X",
            null
        ],
        xIsNext: false,
        winner: "X",
        lastAction: "X to position #8"
    },
    {
        squares: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        xIsNext: true,
        winner: null,
        lastAction: "Clean board"
    },
    {
        squares: [
            null,
            "O",
            "X",
            null,
            null,
            null,
            null,
            null,
            null
        ],
        xIsNext: true,
        winner: null,
        lastAction: "O to position #2"
    }
]

async function seedDB() {
    await Board.deleteMany();
    data.forEach(function (seed) {
        Board.create(seed, function (err, board) {
            if (err) {
                logger.error(err);
            } else {
                logger.info("added a board from seed");
            }
        });
    });
}

module.exports = seedDB;