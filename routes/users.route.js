const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller.js");
const auth = require("../middlewares/auth.middleware.js");
const fileLoader = require("../middlewares/diskStorage.middleware.js");
const validate = require("../middlewares/validator.middleware.js");

const createUserSchema = require("../validation-schemes/create-user-scheme.js");
const loginUserSchema = require("../validation-schemes/login-user-scheme.js");

router.get("/", auth, userController.get)
        .get("/me", auth, userController.userInfo)
        .get("/:id", auth, userController.getUserById)
        .post("/", fileLoader, validate(createUserSchema) , userController.post)
        .post("/login", validate(loginUserSchema), userController.login)
        .put("/:id", auth, fileLoader,userController.put)
        .delete("/:id", auth, userController.delete);
        
module.exports = router;