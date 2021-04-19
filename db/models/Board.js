const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
    squares: [{
        type: String,
        require: true,
        default: [null, null, null, null, null, null, null, null, null]
    },],
    xIsNext: {
        type: Boolean,
        require: true,
        default: true
    },
    winner: {
        type: String,
        require: true,
        default: null
    },
    lastAction: {
        type: String,
        require: true,
        default: "No action recorded"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Boards", BoardSchema);