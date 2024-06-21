const jwt = require("jsonwebtoken");

function verify(req, res, next){
    //jwt token is send thorugh the header
    const authhHeader = req.headers.authorization;

    if(authhHeader){
        const token = authhHeader.split(" ")[1]; //Bearer token is split into two parts

        jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
            if(err){
                // if the token is not valid or expired
                return res.status(403).json("Token is not valid!");
            }

            //if the token is valid
            req.user = user;
            next(); //move to the next actual route
        })

    }else{
        res.status(401).json("You are not authenticated"); //if there is no token
    }
}

module.exports = verify;