const Joi = require("joi");

const registrationValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports.validateRegistration = (req, res, next) => {
  const { error } = registrationValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports.validateLogin = (req, res, next) => {
  const { error } = loginValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
