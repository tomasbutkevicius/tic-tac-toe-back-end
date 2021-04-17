const Board = require('../persistence/models/Board');

exports.addBoard = async (req, res) => {
  
  const { squares, xIsNext, winner, lastAction } = req.body;

  console.log(squares);
  
  if (squares !== undefined && xIsNext !== undefined && winner !== undefined && lastAction !== undefined) { 
    const board = new Board({
        squares: req.body.squares,
        xIsNext: req.body.xIsNext,
        winner: req.body.winner,
        lastAction: req.body.lastAction
    });

    try{
    const savedBoard = await board.save();
    res.json(savedBoard);
    } catch(err){
        res.json({message: err});
    }
  } else {
      res.json({message: "Invalid request body field names"});
  }
}

exports.addCleanBoard = async (req, res) => {
      const board = new Board();
      try{
      const savedBoard = await board.save();
      res.json(savedBoard);
      } catch(err){
          res.json({message: err});
      }
  }