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

const researcherValidationRules = () => {
    return [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('institution').notEmpty().withMessage('Institution is required'),
        body('specialty').notEmpty().withMessage('Specialty is required'),
        body('yearsActive').isNumeric().withMessage('yearsActive must be a number'),
    ];
};

const digSiteValidationRules = () => {
    return [
        body('siteName').notEmpty().withMessage('Site name is required'),
        body('country').notEmpty().withMessage('Country is required'),
        body('region').notEmpty().withMessage('Region is required'),
        body('geologicalFormation').notEmpty().withMessage('Geological formation is required'),
        body('yearDiscovered').isNumeric().withMessage('Year discovered must be a number'),
    ];
};

const eraValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('startAgeMillions').isNumeric().withMessage('Start age must be a number'),
        body('endAgeMillions').isNumeric().withMessage('End age must be a number'),
        body('majorEvents').notEmpty().withMessage('Major events description is required'),
        body('climate').notEmpty().withMessage('Climate description is required'),
    ];
};

module.exports = {
    fossilValidationRules,
    researcherValidationRules,
    digSiteValidationRules,
    eraValidationRules,
    validate,
}