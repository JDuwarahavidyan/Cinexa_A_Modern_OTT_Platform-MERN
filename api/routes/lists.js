const router = require('express').Router();
const List = require('../models/List');
const verify = require("../verifyToken");


// CREATE

router.post("/", verify, async (req, res) => {
    if ( req.user.isAdmin){
        const newList = new List(req.body);

        try{
            const savedList = await newList.save();
            res.status(201).json(savedList);

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("You are not allowed to update a List!");
    
    }
});


// DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json("The list has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
});



// GET
// GET
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                // Retrieve all lists matching type and genre
                list = await List.find({ type: typeQuery, genre: genreQuery });
            } else {
                // Retrieve all lists matching type
                list = await List.find({ type: typeQuery });
            }
        } else {
            // Retrieve all lists
            list = await List.find();
        }

        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});




// Update List
router.put('/:id', async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


module.exports = router;