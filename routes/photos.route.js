const express = require("express");
const router = express.Router();

const photoController = require("../controllers/photos.controller.js");
const auth = require("../middlewares/auth.middleware.js");
const fileLoader = require("../middlewares/diskStorage.middleware.js");
const validate = require("../middlewares/validator.middleware.js");

const createPhotoScheme = require("../validation-schemes/create-photo-scheme.js");

router.get("/", auth, photoController.get)
        .post("/", auth, fileLoader, validate(createPhotoScheme), photoController.post )
        .put("/:id", auth, fileLoader, photoController.put)
        .delete("/:id", auth, photoController.delete);
        
module.exports = router;