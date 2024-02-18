const Joi = require("joi");

module.exports = async function validateRegistrationInput(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .pattern(/^\d{11}$/)
      .required(),
    address: Joi.string(),
    age: Joi.number().integer().min(18).max(120),
    name: Joi.string().required(),
    source: Joi.string().valid("Google", "Email").required(),
  });

  return schema.validate(data);
};
