const { check } = require('express-validator');

exports.signupValidator = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage("First Name field is required !")
        .isLength({ max: 20 })
        .withMessage('First Name should not longer than 20 character'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage("Last Name field is required !")
        .isLength({ max: 20 })
        .withMessage('Last Name should not longer than 20 character'),
    check('email')
        .isEmail().withMessage('Enter valid email address.')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
        .matches(/\d/).withMessage('Password must contain a number')

];

exports.signinValidator = [
    check('email')
        .isEmail().withMessage('Enter valid email address.')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
        .matches(/\d/).withMessage('Password must contain a number')
];