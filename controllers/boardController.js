const Board = require('../db/models/Board');
const boardService = require('../service/boardService');

exports.getAllBoards = async (req, res) => {
        res.json(await boardService.getAllBoards());
}

exports.getLatestBoard = async (req, res) => {
        res.json(await boardService.getLatestBoard());
}

exports.addBoard = async (req, res) => {
    res.json(await boardService.addBoard(req));
}

exports.deleteAllBoards = async (req, res) => {
    res.json(await boardService.deleteAllBoards());
}

exports.getWinner = async (req, res) => {
    res.json(await boardService.getWinner());
}