const jwt = require('jsonwebtoken');

async function userExists(login, request){
    const userSchema = require("../models/user.model.js");
    const user = await userSchema.findOne({name : login});
    if(user !== null && user !== undefined){
        request.user = user;
        return true;
    }
    else return false;
}

const auth = async function (req,res,next){
    try{
        const [strategy,token] = req.headers.authorization.split(" ");
        const result = jwt.verify(token, "veryStrongSecretKey");
        req.login = result.login;

        const isExists = await userExists(result.login, req);
        if(!isExists){
            throw new Error("User not exists!");
        }
        next();
    }
    catch(err){
        res.status(403).send(err.message);
    }
}

module.exports = auth;