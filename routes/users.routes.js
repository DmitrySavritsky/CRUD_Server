const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller.js");

router.get("/",userController.get)
        .post("/",userController.post)
        .put("/:id", userController.put)
        .delete("/:id",userController.delete);
        
module.exports = router;