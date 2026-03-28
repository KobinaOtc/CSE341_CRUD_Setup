const express = require('express');
const router = express.Router();

const fossilsController = require('../controllers/fossils');

router.get('/', fossilsController.getAll);
router.get('/:id', fossilsController.getSingle);
router.post('/', fossilsController.createFossil);
router.put('/:id', fossilsController.updateFossil);
router.delete('/:id', fossilsController.deleteFossil);

module.exports = router;
