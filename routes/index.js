const router = require('express').Router();

router.use('/', (req, res) => {
    res.send("Home page listening");
})

router.use('/fossils', require('./fossils'));

module.exports = router;