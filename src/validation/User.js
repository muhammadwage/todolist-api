const Joi = require("joi");

const registerValidation = (data) => {
  const shcema = Joi.object({
    username: Joi.string().min(7).trim().required(),
    email: Joi.string().min(7).trim().email().required(),
    password: Joi.string().min(7).trim().required(),
    job: Joi.string().trim(),
  });
  return shcema.validateAsync(data);
};

const loginValidation = (data) => {
  const shcema = Joi.object({
    email: Joi.string().min(7).trim().email().required(),
    password: Joi.string().min(7).trim().required(),
  });
  return shcema.validateAsync(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
