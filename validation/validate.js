const { body, validationResult } = require('express-validator');

// Validate TOPPING
const ToppingValidationRules = () => {
  return [
    // topping name must not be null string
    body('name')
    .exists({ checkFalsy: true })
    .withMessage("Topping name is required")
    .isString()
    .withMessage("Topping name should be string")
    .isLength({ min: 3 })
    .withMessage("Topping name should be at least 3 characters"),
    // type should be not null string
    body('type')
    .exists({ checkFalsy: true })
    .withMessage("Topping type is required")
    .isString()
    .withMessage("Topping type should be string")
    .isLength({ min: 3 })
    .withMessage("Topping type should be at least 3 characters")
  ]
}

// Validate FLAVOR
const FlavorValidationRules = () => {
    return [
      // flavor name must not be null string
      body('flavor')
      .exists({ checkFalsy: true })
      .withMessage("Flavor name is required")
      .isString()
      .withMessage("Flavor name should be string")
      .isLength({ min: 3 })
      .withMessage("Flavor name should be at least 3 characters"),
      body('brand')
      .exists({ checkFalsy: true })
      .withMessage("Flavor brand is required")
      .isString()
      .withMessage("Flavor brand should be string")
      .isLength({ min: 3 })
      .withMessage("Flavor brand should be at least 3 characters"),
      body('type')
      .exists({ checkFalsy: true })
      .withMessage("Flavor type is required")
      .isString()
      .withMessage("Flavor type should be string")
      .isLength({ min: 3 })
      .withMessage("Flavor type should be at least 3 characters"),
      body('quantity')
      .exists({ checkFalsy: true })
      .withMessage("Flavor quantity is required")
      .isString()
      .withMessage("Flavor quantity should be string")
      .isLength({ min: 4 })
      .withMessage("Flavor quantity should be at least 4 characters"),
      body('price')
      .exists({ checkFalsy: true })
      .withMessage("Flavor price is required")
      .isString()
      .withMessage("Flavor price should be string")
      .isLength({ min: 3 })
      .withMessage("Flavor price should be at least 3 characters"),
    ]
  }

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  ToppingValidationRules,
  FlavorValidationRules,
  validate,
}