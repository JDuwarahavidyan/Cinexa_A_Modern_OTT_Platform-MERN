const jwt = require("jsonwebtoken");

function verify(req, res, next){
    //jwt token is send thorugh the header
    const authhHeader = req.headers.authorization;

    if(authhHeader){
        const token = authhHeader.split(" ")[1]; 

        jwt.verify(token, process.env.SECRET_KEY, (err,user) => {
            if(err){
               
                return res.status(403).json("Token is not valid!");
            }

            //if the token is valid
            req.user = user;
            next(); 
        })

    }else{
        res.status(401).json("You are not authenticated"); 
    }
}

module.exports = verify;