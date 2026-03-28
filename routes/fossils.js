const express = require('express');
const router = express.Router();

const fossilsController = require('../controllers/fossils');
const { fossilValidationRules, validate } = require('../middleware/validate');

router.get('/', fossilsController.getAll);
router.get('/:id', fossilsController.getSingle);
router.post('/', fossilValidationRules(), validate, fossilsController.createFossil);
router.put('/:id', fossilValidationRules(), validate, fossilsController.updateFossil);
router.delete('/:id', fossilsController.deleteFossil);

module.exports = router;
