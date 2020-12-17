const dbService = require("../services/photos.dbservice.js");

class PhotosController{
    async get(req,res,next){
        try{
            res
            .status(200)
            .send(await dbService.getPhotos());
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    async post(req,res,next){
        try{
            req.body.filepath = req.file.path;

            res
            .status(201)
            .send(await dbService.addPhoto(req.body));
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    async put(req,res,next){
        try{
            req.body.filepath = req.file.path;

            res
            .status(201)
            .send(await dbService.updatePhoto(req.params.id,req.body));
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
    async delete(req,res,next){
        try{
            res
            .status(201)
            .send(await dbService.deletePhoto(req.params.id));
        }
        catch(err){
            res.status(500).send(err.message);
        }
    }
}

module.exports = new PhotosController();