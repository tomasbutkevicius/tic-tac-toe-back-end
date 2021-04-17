const express = require("express");
const router = express.Router();
const Board = require("../persistence/models/Board");
const boardController = require("../controllers/boardController");

router.get("/", async (req,res) =>{
    console.log("boards route hit");
    try{
        const boards = await Board.find();
        res.json(boards);
    } catch(err){
        res.json({message: err});
    }
});

router.get("/latest", async (req,res) =>{
    console.log("latest board route hit");
    try{
        const boards = await Board.find().sort({_id: -1}).limit(1);
        res.json(boards[0]);
    } catch(err){
        res.json({message: err});
    }
});

router.post("/new", async (req,res) =>{
    console.log("Create clean board route hit");
    console.log(req.body);
    await boardController.addCleanBoard(req,res);
});

router.post("/", async (req,res) =>{
    console.log("Add board route hit");
    console.log(req.body);
    await boardController.addBoard(req,res);
});

router.delete("/", async (req,res) =>{
    console.log("Delete all boards route hit");
    try{
        await Board.deleteMany();
        res.send("Game data is deleted");
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;