const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js"); //to hash the password
const verify = require("../verifyToken");

// UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin){

        if(req.body.password){
                req.body.password = CryptoJS.AES.encrypt(
                req.body.password, 
                process.env.SECRET_KEY
            ).toString();  //encrypt
        }
        
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body, //update the all the fields
            }, 
                {new: true}, //return the updated user
            );
            res.status(200).json(updatedUser);

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("You can update only your account!");
    
    }
});




// DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
});

// GET

router.get("/find/:id", async (req, res) => {

    try{
        const user = await User.findById(req.params.id);
        const {password, ...info} = user._doc; //remove password from the user object
        res.status(200).json(info);

    }catch(err){
        res.status(500).json(err);
    }

});


// GET ALL = ADMIN ONLY

router.get("/", verify, async (req, res) => {

    const query = req.query.new; // without query, it will return all the users
    if (req.user.isAdmin) {
      try {
        // id:-1 used fetcg latest user
        const users = query ? await User.find().sort({_id:-1}).limit(7): await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
});



// GET USER STATS = MONTHLY USERS REGISTERED

router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }, //extract month from the date of creation //$year will return the users in the year
        },
      },
      {
        $group: {
          _id: "$month", // month is the id
          total: { $sum: 1 }, // return the total number of users per month
        },
      },
    ]);

    res.status(200).json(data)

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;