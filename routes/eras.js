const express = require('express');
const router = express.Router();

const erasController = require('../controllers/eras');
const { eraValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', erasController.getAll);
router.get('/:id', erasController.getSingle);

router.post('/', isAuthenticated, eraValidationRules(), validate, erasController.createEra);
// #swagger.security = [{ "githubOAuth": [] }]

router.put('/:id', isAuthenticated, eraValidationRules(), validate, erasController.updateEra);
// #swagger.security = [{ "githubOAuth": [] }]

router.delete('/:id', isAuthenticated, erasController.deleteEra);
// #swagger.security = [{ "githubOAuth": [] }]

module.exports = router;