const Joi = require("joi");

const createUserScheme = Joi.object({
    name: Joi.string()
          .alphanum()
          .min(3)
          .max(30),
    password: Joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')),
});

module.exports = createUserScheme;