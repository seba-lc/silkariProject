const { check, validationResult } = require("express-validator");

exports.bookingValidations = [
  check('name').exists().not().isEmpty().isLength({min: 2, max: 35}),
  check('emailContact').exists().isEmail().isLength({min: 8, max: 50}),
  (req, res, next) => {
    checkValidations(req, res, next)
  }
]

//ACA EN EL FUTURO VOY A HACER UN CHECKEO DE QUE EL TELEFONO SEA ACTUALLY UN TELEFONO AUSTRALIANO AL QUE SE LE PUEDA MANDAR UN MENSAJE

const checkValidations = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors.array());
      return res.status(400).json({errors: errors.array()})
    }else{
      next()
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({errors: error.array()})
  }
}