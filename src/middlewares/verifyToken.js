const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { 
        const authHeader = req.headers.authorization;
        if(authHeader){
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
                if(err){
                    return res.status(403).json({ error: "Forbidden" });
                }
                req.user = user;
                next();
            });
        }else{
            res.status(401).json({ error: "Unauthorized" });
        }
 } 

 const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json({ error: "Forbidden" });
        }
    });
 }

 const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json({ error: "Forbidden" });
        }
    });
 }

module.exports = {verifyToken,verifyTokenAndAuthorization ,verifyTokenAndAdmin};
