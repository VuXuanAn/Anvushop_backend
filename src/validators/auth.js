const { check, validationResult } = require('express-validator');

exports.validateSignUpRequest =
    [
        check('firstName').notEmpty().withMessage('first name is require'),
        check('lastName').notEmpty().withMessage('last name is require'),
        check('email').isEmail().withMessage('email is invalid'),
        check('password').isLength({ min: 6 }).withMessage('password is at least 6 character'),
    ];

exports.validateSignInRequest =
    [
        check('email').isEmail().withMessage('email is invalid'),
        check('password').isLength({ min: 6 }).withMessage('password is at least 6 character'),
    ];
exports.isRequestValidate = (req, res, next) => {
    const error = validationResult(req);
    if (error.array().length > 0) {
        return res.status(400).json({ error: error.array()[0].msg })
    }
    next();
}