const express = require('express');
const router = express.Router();

const digSitesController = require('../controllers/digSites');
const { digSiteValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', digSitesController.getAll);
router.get('/:id', digSitesController.getSingle);

router.post('/', isAuthenticated, digSiteValidationRules(), validate, digSitesController.createDigSite);
// #swagger.security = [{ "githubOAuth": [] }]

router.put('/:id', isAuthenticated, digSiteValidationRules(), validate, digSitesController.updateDigSite);
// #swagger.security = [{ "githubOAuth": [] }]

router.delete('/:id', isAuthenticated, digSitesController.deleteDigSite);
// #swagger.security = [{ "githubOAuth": [] }]

module.exports = router;