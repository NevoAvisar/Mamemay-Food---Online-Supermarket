const Joi = require("joi");

const cartValidationSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports.validateCart = (req, res, next) => {
  const { error } = cartValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
