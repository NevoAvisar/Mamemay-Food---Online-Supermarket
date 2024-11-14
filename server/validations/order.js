const Joi = require("joi");

const orderValidationSchema = Joi.object({
  userId: Joi.string().required(),
  cartId: Joi.string().required(),
  cartItems: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        title: Joi.string().required(),
        image: Joi.string().uri().optional(),
        price: Joi.number().required(),
        quantity: Joi.number().integer().required(),
      })
    )
    .required(),
  addressInfo: Joi.object({
    addressId: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.string().regex(/^\d+$/).required(),
    phone: Joi.string()
      .regex(/^\d{10}$/)
      .required(),
    notes: Joi.string().optional(),
  }).required(),
  orderStatus: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  paymentStatus: Joi.string().required(),
  totalAmount: Joi.number().required(),
  orderDate: Joi.date().required(),
  orderUpdateDate: Joi.date().optional(),
  paymentId: Joi.string().allow("").optional(),
  payerId: Joi.string().allow("").optional(),
});

module.exports.validateOrder = (req, res, next) => {
  const { error } = orderValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
