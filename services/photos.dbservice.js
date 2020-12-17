const fs = require("fs");
const photoSchema = require("../models/photo.model.js");

class dbService{
    Photo = null;

    constructor(){
        this.initializeDatabase();
    }

    async getPhotos(){
       return await this.Photo.find({});
    }

    async addPhoto(photo){
        const addedPhoto = new this.Photo(photo);
        await addedPhoto.save();
        return "Photo added successfully!";
    }

    async findPhoto(id){
       return await this.Photo.findOne({_id : id});
    }

    async updatePhoto(id, photo){
        const oldPhoto = await this.Photo.findOne({_id : id});  
        if(oldPhoto === null || oldPhoto === undefined) return "Photo not found!";      
        this.deleteImage(oldPhoto.filepath);
        await this.Photo.updateOne({_id : id},
              {
                ...photo
              });
        return "Photo changed successfully!";
    }

    async deletePhoto(id){
        const photo = await this.findPhoto(id);

        if(photo === null || photo === undefined) return "User not found!";

        this.deleteImage(photo.filepath);
        await this.Photo.deleteOne({_id : id});
        return "Photo deleted successfully!";
    }

    async deleteImage(path){
        fs.unlink(path,(err) => {
         if (err) {
           console.error(err)
           return;
         }
       });
    }

    initializeDatabase(){
        this.Photo = photoSchema;
    }
}

module.exports = new dbService();