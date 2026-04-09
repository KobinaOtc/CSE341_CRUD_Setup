const express = require('express');
const router = express.Router();

const researchersController = require('../controllers/researchers');
const { researcherValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', researchersController.getAll);
router.get('/:id', researchersController.getSingle);

// Protected and Validated Routes
router.post('/', isAuthenticated, researcherValidationRules(), validate, researchersController.createResearcher);
// #swagger.security = [{ "githubOAuth": [] }]

router.put('/:id', isAuthenticated, researcherValidationRules(), validate, researchersController.updateResearcher);
// #swagger.security = [{ "githubOAuth": [] }]

router.delete('/:id', isAuthenticated, researchersController.deleteResearcher);
// #swagger.security = [{ "githubOAuth": [] }]

module.exports = router;