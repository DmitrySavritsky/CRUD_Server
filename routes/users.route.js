const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller.js");
const auth = require("../middlewares/auth.middleware.js");
const fileLoader = require("../middlewares/diskStorage.middleware.js");

router.get("/", auth, userController.get)
        .get("/me", auth, userController.userInfo)
        .post("/", fileLoader, userController.post)
        .post("/login", userController.login)
        .put("/:id", auth, fileLoader,userController.put)
        .delete("/:id", auth, userController.delete);
        
module.exports = router;