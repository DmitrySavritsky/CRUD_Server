//const userService = require("../services/users.service.js");
const dbService = require("../services/users.dbservice.js");

class UsersController{
    async get(req,res,next){
        try{
            res
            .status(200)
            .send(await dbService.getUsers());
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    async post(req,res,next){
        try{
            req.body.avatarPath = req.file.path;

            res
            .status(201)
            .send(await dbService.addUser(req.body));
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    async put(req,res,next){
        try{
            req.body.avatarPath = req.file.path;

            res
            .status(201)
            .send(await dbService.changeUser(req.params.id,req.body));
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    async delete(req,res,next){
        try{
            res
            .status(201)
            .send(await dbService.deleteUser(req.params.id));
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }

    async login(req, res, next){
        try{
            res
            .status(200)
            .send(await dbService.login(req.body.name,req.body.password));
        }
        catch(err){
            res.status(403).send(err.message);
        }
    }

    async userInfo(req, res, next){
        try{
           res.status(200).send(`Current user = ${req.login}`);
        }
        catch(err){
            res.status(403).send(err.message);
        }
    }

    async getUserById(req, res, next) {
        try{
            res.status(200).send(await dbService.getUserById(req.params.id));
        }
        catch(err){
            res.status(403).send(err.message);
        }
    }
}

module.exports = new UsersController();