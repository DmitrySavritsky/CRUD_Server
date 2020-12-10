const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/users";

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
        this.initializeDatabase(connectionString);
    }

    async login(login, password){

        const user = await this.findUser(login);
        const isMatch = await checkPassword(password, user.password);
        console.log(isMatch);

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
        const addedUser = new this.User();
        addedUser.name = user.name;
        addedUser.password = await createHash(user.password);
        await addedUser.save();
        return "User added successfully!";
    }

    async findUser(login){
       return await this.User.find({name : login});
    }

    async changeUser(id,user){
       await this.User.updateOne({_id : id},{name : user.name});
       return "User changed successfully!";
    }

    async deleteUser(id){
       await this.User.deleteOne({_id : id});
       return "User deleted successfully!";
    }

    initializeDatabase(connectionString){
        mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        const userSchema = mongoose.Schema({
            name: {
                type: String,
                required: true,
                dropDups: true
            },
            password:{
                type: String,
                required: true
            }
        });
        this.User = mongoose.model('User', userSchema);
    }
}

module.exports = new dbService();