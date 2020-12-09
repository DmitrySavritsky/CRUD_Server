const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/users";

class dbService{
    User = null;

    constructor(){
        this.initializeDatabase(connectionString);
    }

    async getUsers(){
       return await this.User.find({});
    }

    async addUser(user){
        const addedUser = new this.User();
        addedUser.name = user.name;
        await addedUser.save();
        return "User added successfully!";
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
            }
        });
        this.User = mongoose.model('User', userSchema);
    }
}

module.exports = new dbService();