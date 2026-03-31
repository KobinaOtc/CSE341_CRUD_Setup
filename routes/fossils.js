const express = require('express');
const router = express.Router();

const fossilsController = require('../controllers/fossils');
const { fossilValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', fossilsController.getAll);
router.get('/:id', fossilsController.getSingle);
router.post('/', isAuthenticated, fossilValidationRules(), validate, fossilsController.createFossil);
router.put('/:id', isAuthenticated, fossilValidationRules(), validate, fossilsController.updateFossil);
router.delete('/:id', isAuthenticated, fossilsController.deleteFossil);

module.exports = router;
