const express = require("express");
const router = express.Router();

const photoController = require("../controllers/photos.controller.js");
//const auth = require("../middlewares/auth.middleware.js");
const fileLoader = require("../middlewares/diskStorage.middleware.js");
//const validate = require("../middlewares/validator.middleware.js");

router.get("/", photoController.get)
        .post("/", fileLoader, photoController.post )
        .put("/:id", fileLoader, photoController.put)
        .delete("/:id", photoController.delete);
        
module.exports = router;