const { JWT_PASS } = require("./config")
const jwt = require("jsonwebtoken")

const authmiddleware = (req,res,next) =>{
    
    const authheader = req.body.authoriztion;

    if(!authheader || !authheader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token = authheader.split(' ')[1];
    
    try{
        const decode = jwt.verify(token,JWT_PASS);
        req.userID = decode.userid;
        next();
    }catch{
        return res.status(403).json({});
    }

}

module.exports = {
    authmiddleware
}