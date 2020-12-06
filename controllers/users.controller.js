const service = require("../services/users.service.js");

class UsersController{
    get(req,res,next){
       res
        .status(200)
        .send(service.getUsers());
    }
    post(req,res,next){
        res
        .status(201)
        .send(service.addUser(req.body));
    }
    put(req,res,next){
        res
        .status(201)
        .send(service.changeUser(req.params.id,req.body));
    }
    delete(req,res,next){
        res
        .status(201)
        .send(service.deleteUser(req.params.id));
    }
}

module.exports = new UsersController();