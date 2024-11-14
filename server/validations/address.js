const Joi = require("joi");

const addressValidationSchema = Joi.object({
  userId: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  pincode: Joi.string().regex(/^\d+$/).required().messages({
    "string.pattern.base": "Pincode must be numeric",
  }),
  phone: Joi.string().regex(/^\d{10}$/).required().messages({
    "string.pattern.base": "Phone must be a 10-digit number",
  }),
  notes: Joi.string().optional(),
});

module.exports.validateAddress = (req, res, next) => {
  const { error } = addressValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
