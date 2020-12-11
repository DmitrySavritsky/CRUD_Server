const multer = require("multer");
const uuid = require("uuid");

const storageConfig = multer.diskStorage({
    destination: (request, file, callback) =>{
        callback(null,"public");
    },
    filename: (request, file, callback) =>{
        const arr = file.originalname.split(".");
        callback(null,`${uuid.v4()}.${arr[arr.length - 1]}`);
    }
});

module.exports = multer({storage: storageConfig}).single("filedata");