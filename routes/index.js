const router = require('express').Router();

router.use('/fossils', require('./fossils'));
router.use('/', require('./swagger')); 
router.get('/', (req, res) => {
    res.send("Home page listening");
})

module.exports = router;