const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js"); //to hash the password
const jwt = require("jsonwebtoken"); //to create a token


// REGISTER

router.post("/register",async (req, res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        // password:req.body.password,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_KEY
        ).toString()  //encrypt
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
})

// LOGIN

router.post("/login", async (req,res)=> {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Wrong password or username" });
            
        }
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY); //decrypt
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password){
           return res.status(401).json({ message: "Wrong password or username" });
        }

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, // hide the id and isAdmin
            process.env.SECRET_KEY,
            { expiresIn: "5d" } // token expires in 5 days
        );

        const { password, ...info } = user._doc; //remove password from the response

        res.status(200).json({...info, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;

// Now we create JWT token to authenticate the user since if someone knows the userID
// they can access the data.
//To prevent this we create a token that is sent to the user when they login
// and they have to send this token to access the data.

// if we sent accessToken to the user, they can access the data but never create same token again