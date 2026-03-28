const express = require('express');
const router = express.Router();

const fossilsController = require('../controllers/fossils');

router.get('/', fossilsController.getAll);

module.exports = router;
