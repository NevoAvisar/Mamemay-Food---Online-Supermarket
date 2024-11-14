const Joi = require("joi");

const productValidationSchema = Joi.object({
  image: Joi.string().uri().optional(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  salePrice: Joi.number().optional(),
  totalStock: Joi.number().integer().min(0).required(),
});

module.exports.validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
