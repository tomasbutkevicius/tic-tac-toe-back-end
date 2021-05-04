const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

router.get("/", boardController.getAllBoards);

router.get("/latest", boardController.getLatestBoard);

router.post("/", boardController.addBoard);

router.delete("/", boardController.deleteAllBoards);

router.post("/winner", boardController.winner);

router.get("/latest/winner", boardController.getLatestWinner);

router.get("/seed", boardController.seed);

module.exports = router;