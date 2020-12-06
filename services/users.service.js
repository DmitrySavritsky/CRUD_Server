const fs = require("fs");
const uuid = require("uuid");

const filePath = "./users.json";

class UserService{
    usersList = [];

    constructor(){
        if(fs.existsSync(filePath)){
            const rawdata = fs.readFileSync(filePath);
            this.usersList = JSON.parse(rawdata);
        }
    }

    getUsers(){
        return this.usersList;
    }

    addUser(user){
        user.id = uuid.v4();
        this.usersList.push(user);
        this.updateFile();
        return "User added successfully!";
    }

    changeUser(id,user){
       const index =  this.usersList.findIndex(x=>x.id === id);
       if(index!==-1){
           this.usersList[index].name = user.name;
           this.updateFile();
           return "User changed successfully!";
       }
       else return "User not found!";
    }

    deleteUser(id){
        const index = this.usersList.findIndex(x=>x.id === id);
        if(index!==-1){
            this.usersList = this.usersList.filter(x=>x.id!==id);
            this.updateFile();
            return "User deleted successfully!";
        }
        else return "User not found!";
    }

    updateFile(){
        const data = JSON.stringify(this.usersList);
        fs.writeFile(filePath, data, (err) => {
            if (err) throw err;
        });
    }
}

module.exports = new UserService();