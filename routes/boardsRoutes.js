const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

router.get("/", boardController.getAllBoards);

router.get("/latest", boardController.getLatestBoard);

router.post("/", boardController.addBoard);

router.delete("/", boardController.deleteAllBoards);

module.exports = router;