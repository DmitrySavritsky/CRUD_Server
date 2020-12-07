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
            res.status(500).send(err);
        }
    }
    async post(req,res,next){
        try{
            res
            .status(201)
            .send(await dbService.addUser(req.body));
        }
        catch(err){
            res.status(500).send(err);
        }
    }
    async put(req,res,next){
        try{
            res
            .status(201)
            .send(await dbService.changeUser(req.params.id,req.body));
        }
        catch(err){
            res.status(500).send(err);
        }
    }
    async delete(req,res,next){
        try{
            res
            .status(201)
            .send(await dbService.deleteUser(req.params.id));
        }
        catch(err){
            res.status(500).send(err);
        }
    }
}

module.exports = new UsersController();