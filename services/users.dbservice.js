const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const fs = require("fs");

const userSchema = require("../models/user.model.js");

async function createHash(password){
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function checkPassword(password,hash) {
    return await bcrypt.compare(password, hash);
}

class dbService{
    User = null;

    constructor(){
        this.initializeDatabase();
    }

    async login(login, password){

        const user = await this.findUser(login);
        if( user === undefined){
            throw new Error("User not found!");
        }
        const isMatch = await checkPassword(password, user.password);

        if(!isMatch){
            throw new Error("Password mismatch!");
        }
        else{
            const token = jwt.sign({login}, "veryStrongSecretKey",{expiresIn: "1h"});
            return token;
        }
    }

    async getUsers(){
       return await this.User.find({});
    }

    async addUser(user){
        const addedUser = new this.User({
            ...user,
            password: await createHash(user.password),
            avatar: user.avatarPath
        });

        await addedUser.save();
        return "User added successfully!";
    }

    async findUser(login){
       return await this.User.findOne({name : login});
    }

    async changeUser(id,user){
        const oldUser = await this.User.findOne({_id : id});
        const imagePath = oldUser.avatar;
        
        this.deleteImage(imagePath);
        await this.User.updateOne({_id : id},
                                    {
                                        ...user,
                                        password: await createHash(user.password),
                                        avatar: user.avatarPath
                                    }
                                 );
        return "User changed successfully!";
    }

    async deleteUser(id){
       const user = await this.User.findOne({_id : id});
       const imagePath = user.avatar;

       this.deleteImage(imagePath);
       await this.User.deleteOne({_id : id});
       return "User deleted successfully!";
    }

    async deleteImage(path){
       await fs.unlink(path,(err) => {
        if (err) {
          console.error(err)
          return;
        }
      })
    }

    async getUserById(id){
        return await this.User
            .findOne({_id : id})
            .populate("photos")
            .exec(function (err, photo) {
                if (err) return handleError(err);
                return photo;
            });
    }

    initializeDatabase(){
        this.User = mongoose.model('User', userSchema);
    }
}

module.exports = new dbService();