const { body, validationsResult } = require('express-validator');

const createUserValidations = [
    body('name')
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Must be a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
];

const createRepairsValidations = [
    body('date')
        .notEmpty()
        .withMessage('Date cannot be empty')
        .isDate()
        .withMessage('Must be a valid date'),
    body('computerNumber')
        .notEmpty()
        .withMessage('Computer number cannot be empty')
        .isNumeric()
        .withMessage('Must be a number'),
    body('comments')
        .isLength({ max: 1000 })
        .withMessage('Comment must not exceed 1000 characters')
];

const checkValidations = (req, res, next) => {
    const errors = validationsResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);
        const errorMsg = messages.join('. ');
        return res.status(400).json({
            status: 'error',
            message: errorMsg
        });
    }
    next();
};

module.exports = { createUserValidations, createRepairsValidations, checkValidations };