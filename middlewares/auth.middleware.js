const jwt = require('jsonwebtoken');

const auth = function (req,res,next){
    try{
        const [strategy,token] = req.headers.authorization.split(" ");
        const result = jwt.verify(token, "veryStrongSecretKey");
        req.login = result.login;
        next();
    }
    catch(err){
        res.status(403).send(err.message);
    }
}

module.exports = auth;