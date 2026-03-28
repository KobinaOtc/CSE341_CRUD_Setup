const { body, validationResult } = require('express-validator');

const fossilValidationRules = () => {
    return [
    body('name').notEmpty().withMessage('Name is required'),
    body('scientificName').notEmpty().withMessage('Scientific name is required'),
    body('period').notEmpty().withMessage('Period is required'),
    body('ageMillions').isNumeric().withMessage('ageMillions must be a number'),
    body('locationFound').notEmpty().withMessage('locationFound is required'),
    body('type').notEmpty().withMessage('type is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('imageUrl').notEmpty().withMessage('imageUrl is required'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    fossilValidationRules,
    validate,
}