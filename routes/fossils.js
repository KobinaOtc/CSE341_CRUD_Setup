const express = require('express');
const router = express.Router();

const fossilsController = require('../controllers/fossils');
const { fossilValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', fossilsController.getAll);
router.get('/:id', fossilsController.getSingle);
router.post('/', isAuthenticated, fossilValidationRules(), validate, fossilsController.createFossil);
// #swagger.security = [{ "githubOAuth": [] }]
router.put('/:id', isAuthenticated, fossilValidationRules(), validate, fossilsController.updateFossil);
// #swagger.security = [{ "githubOAuth": [] }]
router.delete('/:id', isAuthenticated, fossilsController.deleteFossil);
// #swagger.security = [{ "githubOAuth": [] }]

module.exports = router;
