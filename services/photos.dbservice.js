const mongoose = require('mongoose');
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
        await this.deleteImage(oldPhoto.filepath);
        await this.Photo.updateOne({_id : id},
              {
                name : photo.name,
                filepath: photo.filepath,
                user_id: photo.user_id
              });
        return "User changed successfully!";
    }

    async deletePhoto(id){
        const photo = await this.findPhoto(id);
        this.deleteImage(photo.filepath);
        await this.Photo.deleteOne({_id : id});
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
        this.Photo = mongoose.model('Photo', photoSchema);
    }
}

module.exports = new dbService();