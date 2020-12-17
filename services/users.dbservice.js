const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const fs = require("fs");
const mongoose = require('mongoose');

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
        if(user === undefined || user === null){
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

    async getUsers(page,count){
       if(page === undefined || count === undefined){
            return await this.User.find({});
       }
       else{
            return {
                content: [await this.User.find({}).skip(page*count).limit(+count)],
                page: +page,
                count: +count,
                totalCount : await this.User.countDocuments({})
            }
       }
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
        if(oldUser === null || oldUser === undefined) return "User not found!";
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
       if(user === null || user === undefined) return "User not found!";
       const imagePath = user.avatar;

       this.deleteImage(imagePath);
       await this.User.deleteOne({_id : id});
       return "User deleted successfully!";
    }

    deleteImage(path){
       fs.unlink(path,(err) => {
        if (err) {
          console.error(err)
          return;
        }
      })
    }

    async getUserById(id){
        return await this.User.aggregate([
                            {
                                $match: {
                                "_id" : new mongoose.Types.ObjectId(id)
                                }
                            },
                            {
                                $lookup: {
                                    from: "photos",
                                    localField: "_id",
                                    foreignField: "user_id",
                                    as: "photos"
                                }
                            }
                    ]);
    }

    initializeDatabase(){
        this.User = userSchema;
    }
}

module.exports = new dbService();