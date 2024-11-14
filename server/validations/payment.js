const Joi = require("joi");

const capturePaymentValidationSchema = Joi.object({
  paymentId: Joi.string().required(),
  payerId: Joi.string().required(),
  orderId: Joi.string().required(),
});

module.exports.validateCapturePayment = (req, res, next) => {
  const { error } = capturePaymentValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
