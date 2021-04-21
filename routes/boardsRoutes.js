const express = require("express");
const router = express.Router();
const Board = require("../db/models/Board");
const boardController = require("../controllers/boardController");

router.get("/", async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/latest", async (req, res) => {
    try {
        const boards = await Board.find().sort({ _id: -1 }).limit(1);
        res.json(boards[0]);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post("/", async (req, res) => {
    await boardController.addBoard(req, res);
});

router.delete("/", async (req, res) => {
    try {
        await Board.deleteMany();
        res.send("Game data is deleted");
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;