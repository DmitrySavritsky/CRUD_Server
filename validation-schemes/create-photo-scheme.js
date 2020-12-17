const Joi = require("joi");

const createPhotoScheme = Joi.object({
    name: Joi.string()
          .alphanum()
          .min(3)
          .max(30),
    user_id: Joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]{24}$')),
});

module.exports = createPhotoScheme;